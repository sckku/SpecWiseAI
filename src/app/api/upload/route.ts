import { NextRequest, NextResponse } from "next/server";
import { uploadAttachment } from "@/lib/storage/minio";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const type = formData.get("type") as string;
    const requestId = (formData.get("requestId") as string) || "draft";

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = file.name;
    const fileSize = file.size;
    const contentType = file.type;

    // Strict validation
    if (type === "PHOTO_EQUIPMENT") {
      if (!contentType.startsWith("image/")) {
        return NextResponse.json(
          { error: "รูปภาพครุภัณฑ์ต้องเป็นไฟล์ภาพ (JPG, PNG, WEBP) เท่านั้น" },
          { status: 400 }
        );
      }
      if (fileSize > 10 * 1024 * 1024) {
        return NextResponse.json({ error: "ขนาดไฟล์ภาพต้องไม่เกิน 10MB" }, { status: 400 });
      }
    } else if (["SPEC_PDF", "QUOTATIONS_3_PDF", "FEASIBILITY_PDF"].includes(type)) {
      if (contentType !== "application/pdf" && !fileName.endsWith(".pdf")) {
        return NextResponse.json(
          { error: "เอกสารต้องเป็นไฟล์ PDF เพียง 1 ไฟล์เท่านั้น (รวมใบเสนอราคา 3 บริษัทในไฟล์เดียว)" },
          { status: 400 }
        );
      }
      if (fileSize > 25 * 1024 * 1024) {
        return NextResponse.json({ error: "ขนาดไฟล์ PDF ต้องไม่เกิน 25MB" }, { status: 400 });
      }
    }

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
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message || "Failed to upload" }, { status: 500 });
  }
}
