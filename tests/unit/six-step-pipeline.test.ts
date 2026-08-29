import { describe, it, expect } from "vitest";
import { runFull6StepPipeline } from "@/lib/ai/mock-ai-engine";
import { MOCK_USERS } from "@/lib/auth/mock-auth";
import {
  Step1IntentSchema,
  Step2StandardMatchSchema,
  Step3PriceCrossCheckSchema,
  Step4BudgetAlertSchema,
  Step5BudgetFormSchema,
  Step6NeutralSpecSchema,
} from "@/lib/ai/parsers";

describe("6-Step AI Procurement Pipeline", () => {
  const mockUser = MOCK_USERS.requester;

  it("should process Data Science Workstation request across all 6 steps and pass Zod validations", () => {
    const input = "ต้องการจัดซื้อเครื่องคอมพิวเตอร์ สำหรับงานประมวลผล ด้าน Data Science จำนวน 10 เครื่อง งบประมาณ 500,000 บาท";
    const result = runFull6StepPipeline(input, mockUser);

    // Step 1 Check
    expect(result.step1.quantity).toBe(10);
    expect(result.step1.unitProposedPrice).toBe(50000);
    expect(result.step1.totalProposedBudget).toBe(500000);
    expect(() => Step1IntentSchema.parse(result.step1)).not.toThrow();

    // Step 2 Check
    expect(result.step2.isMatched).toBe(true);
    expect(result.step2.recommendedStandardName).toContain("ประมวลผล");
    expect(() => Step2StandardMatchSchema.parse(result.step2)).not.toThrow();

    // Step 3 Check
    expect(result.step3.sources.length).toBe(4);
    expect(result.step3.minStandardPrice).toBe(26000);
    expect(() => Step3PriceCrossCheckSchema.parse(result.step3)).not.toThrow();

    // Step 4 Check (Amber Alert due to 50k > 26k)
    expect(result.step4.alertLevel).toBe("AMBER_ALERT");
    expect(result.step4.requiredAttachments.threeQuotationsRequired).toBe(true);
    expect(() => Step4BudgetAlertSchema.parse(result.step4)).not.toThrow();

    // Step 5 Check (8-Section Form)
    expect(result.step5.section1BasicInfo.quantity).toBe(10);
    expect(result.step5.section4QuotationComparison.vendor1.price).toBeLessThanOrEqual(50000);
    expect(() => Step5BudgetFormSchema.parse(result.step5)).not.toThrow();

    // Step 6 Check (Neutral TOR)
    expect(result.step6.specTitle).toContain("คุณลักษณะเฉพาะ");
    expect(result.step6.categories.length).toBeGreaterThanOrEqual(5);
    expect(() => Step6NeutralSpecSchema.parse(result.step6)).not.toThrow();
  });
});
