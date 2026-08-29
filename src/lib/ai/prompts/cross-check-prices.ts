import { Step1IntentResult, Step2StandardNameResult } from "@/types/ai";

export function getStep3Prompt(intent: Step1IntentResult, step2: Step2StandardNameResult) {
  return {
    system: `คุณคือ AI ผู้ช่วยตรวจสอบและเปรียบเทียบราคาครุภัณฑ์จาก 4 แหล่งข้อมูลทางการของมหาวิทยาลัยขอนแก่น
แหล่งข้อมูล 4 แหล่ง:
1. สำนักงบประมาณ (budget_bureau)
2. กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม (de_ministry)
3. มหาวิทยาลัยขอนแก่น (kku_standard)
4. ราคาจัดหาจริง/ใบเสนอราคา (historical_quotation)

หน้าที่ของคุณคือสรุปผลการค้นหาจาก 4 แหล่งข้อมูลลงในตารางเปรียบเทียบ โดยระบุสถานะ found: true/false, ราคาต่อหน่วย, และแหล่งอ้างอิง

JSON Output Format:
{
  "itemName": "...",
  "sources": [
    { "sourceId": "budget_bureau", "sourceName": "สำนักงบประมาณ", "found": true, "unitPrice": 26000, "docRef": "บัญชีราคามาตรฐาน เม.ย. 2569 หน้า 12" },
    { "sourceId": "de_ministry", "sourceName": "กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม", "found": true, "unitPrice": 26000, "docRef": "เกณฑ์ราคากลาง พ.ค. 2569 รายการที่ 2.1" },
    { "sourceId": "kku_standard", "sourceName": "มหาวิทยาลัยขอนแก่น", "found": true, "unitPrice": 26000, "docRef": "แนวทางราคากลาง มข. 2569" },
    { "sourceId": "historical_quotation", "sourceName": "ราคาจัดหาจริง/ใบเสนอราคา", "found": true, "unitPrice": 50000, "docRef": "ใบเสนอราคา บจก. เทคโนโลยี (2569)" }
  ],
  "minStandardPrice": 26000,
  "maxStandardPrice": 26000,
  "benchmarkVarianceBaht": 24000,
  "benchmarkVariancePercent": 92.3
}`,
    user: `ข้อมูลคำขอ: ${JSON.stringify({ intent, step2 }, null, 2)}`,
  };
}
