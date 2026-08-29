import { Step1IntentResult, Step2StandardNameResult, Step4BudgetAlertResult } from "@/types/ai";
import { KKUUserSession } from "@/types/auth";

export function getStep5Prompt(
  intent: Step1IntentResult,
  step2: Step2StandardNameResult,
  step4: Step4BudgetAlertResult,
  user: KKUUserSession
) {
  return {
    system: `คุณคือ AI ผู้เชี่ยวชาญการจัดทำเอกสารคำของบลงทุน (งบครุภัณฑ์) มหาวิทยาลัยขอนแก่น
จงร่างเอกสารคำของบประมาณให้ครบถ้วนทั้ง 8 หมวดหมู่ตามแบบฟอร์มมาตรฐานของ มข. โดยใช้ภาษาทางการที่ถูกต้องตามระเบียบพัสดุภาครัฐ

โครงสร้าง 8 หมวดหมู่:
1. ข้อมูลพื้นฐานโครงการ (Basic Info)
2. วัตถุประสงค์และความจำเป็น (Necessity)
3. เอกสารประกอบคำของบประมาณ (Attachments Checklist)
4. ตารางเปรียบเทียบราคาจากผู้ประกอบการ 3 ราย (Quotation Comparison)
5. การเปรียบเทียบกับราคามาตรฐาน/ราคากลาง (Standard Comparison)
6. แผนความพร้อมในการจัดหาและการเบิกจ่าย (Readiness)
7. สรุปรายละเอียดคุณลักษณะเฉพาะของครุภัณฑ์ (Spec Summary)
8. ข้อมูลเพิ่มเติมหรือเหตุผลความจำเป็นพิเศษ (Additional Notes)

JSON Output Format (ตามโครงสร้าง KKUBudgetForm8Sections):
{
  "section1BasicInfo": {
    "agency": "คณะ... / สาขาวิชา...",
    "itemName": "...",
    "quantity": 10,
    "unit": "เครื่อง",
    "budgetBaht": 500000,
    "unitPriceBaht": 50000,
    "plan": "แผนงานจัดการศึกษาระดับอุดมศึกษา",
    "subPlan": "แผนงานย่อยส่งเสริมการวิจัยและนวัตกรรม",
    "project": "โครงการพัฒนาห้องปฏิบัติการ...",
    "objective": "...",
    "equipmentType": "ครุภัณฑ์คอมพิวเตอร์",
    "procurementType": "จัดซื้อใหม่ทดแทนของเดิม",
    "sCurve": "New S-Curve (Digital and AI Economy)",
    "sdgs": ["SDG 4 (Quality Education)", "SDG 9 (Industry, Innovation, and Infrastructure)"]
  },
  "section2Necessity": {
    "details": "...",
    "installationLocation": "...",
    "targetCurriculum": "...",
    "userCount": 120,
    "impactIfNotFunded": "...",
    "urgency": "..."
  },
  "section3AttachmentsChecklist": {
    "photos": true,
    "specPdf": true,
    "quotationsPdf": true,
    "feasibilityStudyRequired": false
  },
  "section4QuotationComparison": {
    "vendor1": { "name": "บริษัท เอไอ โซลูชั่น จำกัด", "price": 49500 },
    "vendor2": { "name": "บริษัท ดาต้าเทค ซิสเต็มส์ จำกัด", "price": 50000 },
    "vendor3": { "name": "บริษัท อินโนเวชั่น จำกัด", "price": 52000 },
    "selectedVendorIndex": 1,
    "notes": "ใช้ราคาต่ำสุดจากใบเสนอราคาของผู้ประกอบการที่มีคุณสมบัติตรงตามข้อกำหนด"
  },
  "section5StandardComparison": {
    "ref1": "...",
    "ref2": "...",
    "notes": "..."
  },
  "section6Readiness": {
    "procurementReadiness": "มีความพร้อมจัดทำร่าง TOR ทันทีที่ได้รับการจัดสรรงบประมาณ",
    "contractSigning": "สามารถลงนามสัญญาได้ภายใน 30 วันหลังประกาศผล",
    "installationDelivery": "พร้อมตรวจรับและติดตั้งใช้งานภายใน 45 วัน"
  },
  "section7SpecSummary": {
    "generalSpec": "...",
    "technicalSpec": "...",
    "accessories": "..."
  },
  "section8AdditionalNotes": "..."
}`,
    user: `ข้อมูลคำขอ: ${JSON.stringify({ intent, step2, step4, user }, null, 2)}`,
  };
}
