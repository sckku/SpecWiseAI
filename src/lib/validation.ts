import { z } from "zod";

/**
 * Shared request-body schemas for API routes.
 * Keep loose-but-bounded: nested AI/form payloads are validated for size
 * and shape at the edges, while their internal contracts live in src/types.
 */

const MAX_BODY_BYTES = 2 * 1024 * 1024; // 2MB JSON cap

const trimmedString = (max: number) => z.string().trim().min(1).max(max);

export const moneyBaht = z
  .number()
  .min(0, "จำนวนเงินต้องไม่ติดลบ")
  .max(10_000_000_000, "วงเงินเกินเพดานที่ระบบรองรับ")
  .finite();

const requestStatusEnum = z.enum([
  "DRAFT",
  "AI_ANALYZED",
  "DEPT_REVIEW",
  "SUBMITTED",
  "REVISED",
  "APPROVED",
  "REJECTED",
]);

const attachmentSchema = z
  .object({
    id: trimmedString(100),
    type: z.enum(["PHOTO_EQUIPMENT", "SPEC_PDF", "QUOTATIONS_3_PDF", "FEASIBILITY_PDF"]),
    fileName: trimmedString(500),
    fileSize: z.number().int().min(0).max(100 * 1024 * 1024),
    contentType: trimmedString(100),
    storageKey: trimmedString(1000),
    url: z.string().max(2000).optional(),
    uploadedAt: trimmedString(50),
  })
  .strict();

export const createProposalSchema = z
  .object({
    title: z.string().trim().max(500).optional(),
    category: z.string().trim().max(200).optional(),
    unit: z.string().trim().max(50).optional(),
    unitPriceBaht: moneyBaht.optional(),
    totalBudgetBaht: moneyBaht.optional(),
    quantity: z.number().int().min(1).max(1_000_000).optional(),
    standardMatched: z.boolean().optional(),
    standardName: z.string().trim().max(500).optional(),
    alertLevel: z.enum(["GREEN_MATCH", "AMBER_ALERT", "CUSTOM_NON_STANDARD"]).optional(),
    form8Sections: z.record(z.unknown()).optional(),
    neutralSpec: z.record(z.unknown()).optional(),
    aiAnalysis: z.record(z.unknown()).optional(),
    attachments: z.array(attachmentSchema).max(20).optional(),
  })
  .strict();

export const updateProposalSchema = z
  .object({
    title: z.string().trim().max(500).optional(),
    totalBudgetBaht: moneyBaht.optional(),
    form8Sections: z.record(z.unknown()).optional(),
    neutralSpec: z.record(z.unknown()).optional(),
    attachments: z.array(attachmentSchema).max(20).optional(),
    targetStatus: requestStatusEnum.optional(),
  })
  .strict();

export const commentActionEnum = z.enum([
  "COMMENT",
  "REQUEST_CHANGE",
  "APPROVE",
  "REJECT",
]);

export const createCommentSchema = z
  .object({
    content: trimmedString(5000),
    action: commentActionEnum.optional(),
  })
  .strict();

export const mockSwitchSchema = z
  .object({
    role: trimmedString(50),
  })
  .strict();

export const analyzeFullSchema = z
  .object({
    prompt: trimmedString(5000),
  })
  .strict();

/** Parse a JSON request body with byte-size guard. Throws on violation. */
export async function parseJsonBody(req: Request): Promise<unknown> {
  const contentLength = Number(req.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_BYTES) {
    throw new BodyTooLargeError();
  }
  const text = await req.text();
  if (text.length > MAX_BODY_BYTES) {
    throw new BodyTooLargeError();
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new InvalidJsonError();
  }
}

export class BodyTooLargeError extends Error {
  constructor() {
    super("Payload มีขนาดใหญ่เกินที่กำหนด");
    this.name = "BodyTooLargeError";
  }
}

export class InvalidJsonError extends Error {
  constructor() {
    super("รูปแบบข้อมูล JSON ไม่ถูกต้อง");
    this.name = "InvalidJsonError";
  }
}

/** Format ZodError into a compact Thai message for API responses. */
export function formatZodError(error: z.ZodError): string {
  return error.issues
    .slice(0, 5)
    .map((issue) => `${issue.path.join(".") || "body"}: ${issue.message}`)
    .join("; ");
}
