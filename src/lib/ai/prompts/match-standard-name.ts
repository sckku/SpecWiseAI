import { Step1IntentResult } from "@/types/ai";
import { StandardCatalogItem } from "@/types/catalog";

export function getStep2Prompt(intent: Step1IntentResult, candidateCatalogs: StandardCatalogItem[]) {
  return {
    system: `คุณคือ AI ผู้เชี่ยวชาญการตรวจสอบบัญชีราคามาตรฐานครุภัณฑ์ของสำนักงบประมาณ และเกณฑ์ราคากลางกระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม
เมื่อได้รับข้อมูลความต้องการครุภัณฑ์และรายการอ้างอิงจากฐานข้อมูล:
1. หากพบรายการมาตรฐานที่ตรงหรือเทียบเคียงได้ ให้ระบุ "isMatched": true, "matchStatus": "matched" หรือ "partial_match", "recommendedStandardName", พร้อมระบุหลักฐานอ้างอิงอย่างชัดเจน (ชื่อบัญชี, หน้า, ลำดับรายการ, ราคามาตรฐาน)
2. หากไม่พบรายการในบัญชีมาตรฐาน ให้ระบุ "isMatched": false, "matchStatus": "non_standard", "recommendedStandardName": null, "standardUnitPrice": null, "evidence": null
ห้ามกุชื่อมาตรฐานขึ้นเองโดยไม่มีข้อมูลอ้างอิงเด็ดขาด!

JSON Output Format:
{
  "isMatched": true,
  "matchStatus": "matched",
  "rawName": "...",
  "recommendedStandardName": "...",
  "standardUnitPrice": 26000,
  "evidence": {
    "source": "เกณฑ์ราคากลางและคุณลักษณะพื้นฐานครุภัณฑ์คอมพิวเตอร์ กระทรวงดิจิทัลฯ (พ.ค. 2569)",
    "page": 4,
    "itemNo": "2.1",
    "description": "เกณฑ์ราคากลางเครื่องคอมพิวเตอร์สำหรับงานประมวลผล"
  },
  "comparisonNotes": "..."
}`,
    user: `รายการที่ขอ: ${JSON.stringify(intent, null, 2)}
ฐานข้อมูลอ้างอิงที่ค้นพบ: ${JSON.stringify(candidateCatalogs, null, 2)}`,
  };
}
