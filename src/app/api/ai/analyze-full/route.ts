import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/auth-options";
import { sanitizePromptInput } from "@/lib/security/anti-prompt-injection";
import { runFull6StepPipeline } from "@/lib/ai/mock-ai-engine";
import { intelSphereClient, INTELSPHERE_MODEL } from "@/lib/ai/intelsphere-client";
import { getStep1Prompt } from "@/lib/ai/prompts/parse-intent";
import { Step1IntentSchema } from "@/lib/ai/parsers";

const isMockAi = process.env.ENABLE_MOCK_AI === "true";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

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
  } catch (error: any) {
    console.error("AI Analysis error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
