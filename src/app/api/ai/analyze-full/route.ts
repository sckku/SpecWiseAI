import { NextRequest, NextResponse } from "next/server";
import { requireUser, AuthError } from "@/lib/auth/auth-options";
import { sanitizePromptInput } from "@/lib/security/anti-prompt-injection";
import { runFull6StepPipeline } from "@/lib/ai/mock-ai-engine";
import { intelSphereClient, INTELSPHERE_MODEL } from "@/lib/ai/intelsphere-client";
import { getStep1Prompt } from "@/lib/ai/prompts/parse-intent";
import { Step1IntentSchema } from "@/lib/ai/parsers";
import { checkRateLimit, clientKeyFromHeaders } from "@/lib/security/rate-limit";
import { analyzeFullSchema, parseJsonBody, formatZodError } from "@/lib/validation";
import { z } from "zod";

const isMockAi = process.env.ENABLE_MOCK_AI === "true";

// AI analysis calls an external LLM: cap usage to protect cost & capacity.
const AI_RATE_LIMIT = 10;
const AI_RATE_WINDOW_MS = 60_000;

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();

    const limit = checkRateLimit(
      clientKeyFromHeaders(req.headers, `ai:${user.id}`),
      AI_RATE_LIMIT,
      AI_RATE_WINDOW_MS
    );
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "เรียกใช้งาน AI ถี่เกินไป กรุณารอสักครู่แล้วลองใหม่" },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
      );
    }

    const { prompt } = analyzeFullSchema.parse(await parseJsonBody(req));

    // Security sanitization check
    const sanitization = sanitizePromptInput(prompt);
    if (!sanitization.isSafe) {
      return NextResponse.json(
        {
          error: "Input contains flagged patterns or potential prompt injection",
          flaggedPatterns: sanitization.flaggedPatterns,
        },
        { status: 400 }
      );
    }

    // If Mock AI is enabled or offline fallback is needed
    if (isMockAi) {
      const fullAnalysis = runFull6StepPipeline(sanitization.sanitizedText, user);
      return NextResponse.json({
        success: true,
        mode: "mock_engine",
        analysis: fullAnalysis,
      });
    }

    // Try calling KKU IntelSphere LLM
    try {
      const step1Prompts = getStep1Prompt(sanitization.sanitizedText);
      const completion = await intelSphereClient.chat.completions.create({
        model: INTELSPHERE_MODEL,
        messages: [
          { role: "system", content: step1Prompts.system },
          { role: "user", content: step1Prompts.user },
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
      });

      const rawJson = completion.choices[0]?.message?.content || "{}";
      const parsedIntent = Step1IntentSchema.parse(JSON.parse(rawJson));

      // Combine with simulation for subsequent steps
      const fullAnalysis = runFull6StepPipeline(sanitization.sanitizedText, user);
      fullAnalysis.step1 = parsedIntent;

      return NextResponse.json({
        success: true,
        mode: "kku_intelsphere",
        analysis: fullAnalysis,
      });
    } catch (llmErr) {
      console.warn("KKU IntelSphere failed, falling back to local simulation engine:", llmErr);
      const fullAnalysis = runFull6StepPipeline(sanitization.sanitizedText, user);
      return NextResponse.json({
        success: true,
        mode: "fallback_simulation",
        analysis: fullAnalysis,
      });
    }
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: formatZodError(error) }, { status: 400 });
    }
    console.error("AI Analysis error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการวิเคราะห์ด้วย AI กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}
