import { NextRequest, NextResponse } from "next/server";
import { requireUser, AuthError } from "@/lib/auth/auth-options";
import { uploadAttachment } from "@/lib/storage/minio";
import { checkRateLimit, clientKeyFromHeaders } from "@/lib/security/rate-limit";

const UPLOAD_TYPES = ["PHOTO_EQUIPMENT", "SPEC_PDF", "QUOTATIONS_3_PDF", "FEASIBILITY_PDF"] as const;

const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10MB
const MAX_PDF_BYTES = 25 * 1024 * 1024; // 25MB

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

/** Verify file signature (magic bytes) instead of trusting client MIME. */
function sniffType(buffer: Buffer): "pdf" | "jpeg" | "png" | "webp" | "unknown" {
  if (buffer.length < 12) return "unknown";
  // %PDF-
  if (
    buffer[0] === 0x25 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x44 &&
    buffer[3] === 0x46 &&
    buffer[4] === 0x2d
  ) {
    return "pdf";
  }
  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "jpeg";
  }
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return "png";
  }
  // WEBP: RIFF....WEBP
  if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    return "webp";
  }
  return "unknown";
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();

    const limit = checkRateLimit(
      clientKeyFromHeaders(req.headers, `upload:${user.id}`),
      30,
      60_000
    );
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "อัปโหลดถี่เกินไป กรุณารอสักครู่" },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
      );
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const type = formData.get("type") as string;
    const rawRequestId = (formData.get("requestId") as string) || "draft";

    // requestId becomes a storage path segment: keep it strictly alphanumeric.
    const requestId = rawRequestId.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 64) || "draft";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!UPLOAD_TYPES.includes(type as (typeof UPLOAD_TYPES)[number])) {
      return NextResponse.json(
        { error: "ประเภทไฟล์แนบไม่ถูกต้อง" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name || "attachment";
    const fileSize = file.size;
    const detected = sniffType(buffer);

    if (type === "PHOTO_EQUIPMENT") {
      if (!["jpeg", "png", "webp"].includes(detected)) {
        return NextResponse.json(
          { error: "รูปภาพครุภัณฑ์ต้องเป็นไฟล์ภาพ (JPG, PNG, WEBP) ที่ถูกต้องเท่านั้น" },
          { status: 400 }
        );
      }
      if (fileSize > MAX_IMAGE_BYTES) {
        return NextResponse.json({ error: "ขนาดไฟล์ภาพต้องไม่เกิน 10MB" }, { status: 400 });
      }
    } else {
      // PDF document types
      if (detected !== "pdf") {
        return NextResponse.json(
          { error: "เอกสารต้องเป็นไฟล์ PDF จริงเพียง 1 ไฟล์เท่านั้น (รวมใบเสนอราคา 3 บริษัทในไฟล์เดียว)" },
          { status: 400 }
        );
      }
      if (fileSize > MAX_PDF_BYTES) {
        return NextResponse.json({ error: "ขนาดไฟล์ PDF ต้องไม่เกิน 25MB" }, { status: 400 });
      }
    }

    const contentTypeByDetected: Record<string, string> = {
      pdf: "application/pdf",
      jpeg: "image/jpeg",
      png: "image/png",
      webp: "image/webp",
    };
    const contentType = contentTypeByDetected[detected];

    const objectKey = `${requestId}/${Date.now()}_${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const uploadResult = await uploadAttachment(objectKey, buffer, contentType);

    const attachmentRecord = {
      id: `att-${Date.now()}`,
      type,
      fileName,
      fileSize,
      contentType,
      storageKey: uploadResult.storageKey,
      url: uploadResult.url,
      uploadedAt: new Date().toISOString(),
    };

    return NextResponse.json({ success: true, attachment: attachmentRecord });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการอัปโหลดไฟล์ กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}
