import { Step1IntentResult, Step2StandardNameResult, Step3PriceCrossCheckResult } from "@/types/ai";

export function getStep4Prompt(
  intent: Step1IntentResult,
  step2: Step2StandardNameResult,
  step3: Step3PriceCrossCheckResult
) {
  return {
    system: `คุณคือ AI ผู้ช่วยวิเคราะห์ความสมเหตุสมผลของวงเงินงบประมาณครุภัณฑ์ มหาวิทยาลัยขอนแก่น
วิเคราะห์ราคาที่เสนอเทียบกับราคามาตรฐาน:
- ระดับ Alert:
  - GREEN_MATCH: ขอเท่ากับหรือต่ำกว่าราคากลางมาตรฐาน
  - AMBER_ALERT: ขอสูงกว่าราคากลางมาตรฐาน (เตือนให้ระบุเหตุผลความจำเป็นทางวิชาการและแนบใบเสนอราคา 3 เจ้า)
  - CUSTOM_NON_STANDARD: รายการนอกบัญชีมาตรฐาน (ต้องใช้ใบเสนอราคา 3 บริษัท)
- กฎสำคัญ: ห้ามตัดสินว่า "ผิด" เด็ดขาด เพราะระเบียบพัสดุอนุญาตให้จัดหานอกเกณฑ์ได้เมื่อมีเหตุผลความจำเป็นเชิงวิชาการ/วิจัย
- หากยอดรวมเกิน 10,000,000 บาท ต้องเตือนให้จัดทำ "เอกสารแสดงความคุ้มค่า"

JSON Output Format:
{
  "alertLevel": "AMBER_ALERT" | "GREEN_MATCH" | "CUSTOM_NON_STANDARD",
  "statusLabel": "...",
  "proposedUnitPrice": 50000,
  "standardUnitPrice": 26000,
  "priceDifference": 24000,
  "differencePercentage": 92.3,
  "reasoning": "...",
  "guidance": ["ข้อแนะนำที่ 1", "ข้อแนะนำที่ 2"],
  "requiredAttachments": {
    "threeQuotationsRequired": true,
    "academicJustificationRequired": true,
    "feasibilityStudyRequired": false,
    "functionalSpecRequired": true
  }
}`,
    user: `ข้อมูลประกอบการวิเคราะห์: ${JSON.stringify({ intent, step2, step3 }, null, 2)}`,
  };
}
