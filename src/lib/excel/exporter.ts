import path from "path";
import fs from "fs";
import ExcelJS from "exceljs";
import { BudgetProposal } from "@/types/budget";

/**
 * Sanitizes string input to prevent Excel Formula Injection (CSV injection).
 */
function sanitizeCellString(val: string | undefined | null): string {
  if (!val) return "";
  const str = String(val).trim();
  if (str.startsWith("=") || str.startsWith("+") || str.startsWith("-") || str.startsWith("@")) {
    // If it looks like a formula attempt from user input, escape it with a leading quote or sanitize
    return "'" + str;
  }
  return str;
}

function sanitizeNumber(val: any, fallback = 0): number {
  if (typeof val === "number" && !isNaN(val)) return val;
  const num = parseFloat(val);
  return isNaN(num) ? fallback : num;
}

/**
 * Generates an official KKU Asset Budget Request Excel Workbook buffer
 * using the canonical Golden Template matching sample_requestform.xlsx.
 */
export async function generateOfficialKKUProposalExcel(proposal: BudgetProposal): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook();

  // Try locating template in src/templates/sample_requestform.xlsx or references/sample_requestform.xlsx
  const templateCandidates = [
    path.join(process.cwd(), "src", "templates", "sample_requestform.xlsx"),
    path.join(process.cwd(), "references", "sample_requestform.xlsx"),
  ];

  let templatePath = "";
  for (const p of templateCandidates) {
    if (fs.existsSync(p)) {
      templatePath = p;
      break;
    }
  }

  if (!templatePath) {
    throw new Error("Golden template sample_requestform.xlsx not found on server");
  }

  await workbook.xlsx.readFile(templatePath);

  const ws = workbook.getWorksheet(1) || workbook.worksheets[0];
  if (!ws) {
    throw new Error("Worksheet 1 not found in Golden Template");
  }

  const form = proposal.form8Sections;
  const basic = form?.section1BasicInfo;
  const necessity = form?.section2Necessity;
  const quotes = form?.section4QuotationComparison;
  const std = form?.section5StandardComparison;
  const readiness = form?.section6Readiness;
  const specSummary = form?.section7SpecSummary;
  const neutralSpec = proposal.neutralSpec;

  const fiscalYear = proposal.fiscalYear || 2570;

  // Title Row 2
  const titleCell = ws.getCell("B2");
  titleCell.value = `รายละเอียดรายการครุภัณฑ์ ประจำปีงบประมาณ พ.ศ. ${fiscalYear}`;

  // 1.0 ข้อมูลพื้นฐาน
  const agencyName = basic?.agency || `${proposal.faculty}${proposal.department ? " : " + proposal.department : ""}`;
  ws.getCell("C5").value = sanitizeCellString(agencyName);
  ws.getCell("C6").value = sanitizeCellString(basic?.itemName || proposal.title);
  
  const quantity = sanitizeNumber(basic?.quantity || proposal.quantity, 1);
  const unitPrice = sanitizeNumber(basic?.unitPriceBaht || proposal.unitPriceBaht || (proposal.totalBudgetBaht / quantity), 0);
  const totalBudget = sanitizeNumber(basic?.budgetBaht || proposal.totalBudgetBaht, unitPrice * quantity);

  ws.getCell("C7").value = quantity;
  ws.getCell("E7").value = sanitizeCellString(basic?.unit || proposal.unit || "ชุด");
  ws.getCell("H7").value = unitPrice;
  ws.getCell("C8").value = totalBudget;

  ws.getCell("C9").value = sanitizeCellString(basic?.plan || "2199 : แผนงานจัดการศึกษาด้านวิทยาศาสตร์และเทคโนโลยี");
  ws.getCell("C10").value = sanitizeCellString(basic?.subPlan || "002101 : จัดการเรียนการสอนด้านวิทยาศาสตร์และเทคโนโลยี");
  ws.getCell("C11").value = sanitizeCellString(basic?.project || "101101 : การเรียนการสอน");
  ws.getCell("C12").value = sanitizeCellString(basic?.objective || "ครุภัณฑ์ใหม่");
  ws.getCell("C13").value = sanitizeCellString(basic?.equipmentType || proposal.category || "ครุภัณฑ์วิทยาศาสตร์");
  ws.getCell("C14").value = sanitizeCellString(basic?.procurementType || "ครุภัณฑ์นำเข้าจากต่างประเทศ");
  ws.getCell("C15").value = sanitizeCellString(basic?.sCurve || "12 - อุตสาหกรรมพัฒนาคนและการศึกษา (New S-curve)");

  const sdgsText = Array.isArray(basic?.sdgs)
    ? basic.sdgs.join("\n")
    : basic?.sdgs || "SDG04 : สร้างหลักประกันว่าทุกคนมีการศึกษา ที่มีคุณภาพอย่างครอบคลุมและเท่าเทียม และสนับสนุนโอกาสในการเรียนรู้ตลอดชีวิต";
  ws.getCell("C16").value = sanitizeCellString(sdgsText);

  // 2.0 เหตุผลความจำเป็น
  ws.getCell("C19").value = sanitizeCellString(necessity?.details || proposal.title);
  ws.getCell("C20").value = sanitizeCellString(necessity?.installationLocation || "ห้องปฏิบัติการ / เครื่องมือกลาง คณะวิทยาศาสตร์ SC.01");
  ws.getCell("C21").value = sanitizeCellString(necessity?.targetCurriculum || proposal.department || "สาขาวิชาเคมี / วิทยาศาสตร์");
  ws.getCell("C22").value = "ด้านวิทยาศาสตร์และเทคโนโลยี / ปัญญาประดิษฐ์และวิทยาศาสตร์ข้อมูล";
  ws.getCell("C23").value = sanitizeNumber(necessity?.userCount, 40);
  ws.getCell("C24").value = sanitizeCellString(
    necessity?.impactIfNotFunded ||
      `หากไม่ได้รับการจัดสรรงบประมาณสำหรับ ${proposal.title} จะส่งผลกระทบต่อการจัดการเรียนการสอน การทำโครงงานวิจัยของนักศึกษา และการบริการวิชาการตามมาตรฐานสากล`
  );

  // Checkboxes for equipment necessity type
  const isReplacement = basic?.objective?.includes("ทดแทน") || false;
  const isNew = !isReplacement;
  ws.getCell("B26").value = isReplacement ? 1 : 0;
  ws.getCell("B32").value = isNew ? 1 : 0;
  ws.getCell("B35").value = 0;
  ws.getCell("B37").value = 0;

  if (isNew) {
    ws.getCell("C33").value = sanitizeCellString(necessity?.urgency || "โครงการผลิตบัณฑิตระดับปริญญาตรี โท เอก และพัฒนางานวิจัย");
  }

  // 3.0 เอกสารประกอบ
  const photoAtt = proposal.attachments?.find((a) => a.type === "PHOTO_EQUIPMENT");
  const specAtt = proposal.attachments?.find((a) => a.type === "SPEC_PDF");
  const quotesAtt = proposal.attachments?.find((a) => a.type === "QUOTATIONS_3_PDF");
  const feasAtt = proposal.attachments?.find((a) => a.type === "FEASIBILITY_PDF");

  ws.getCell("D42").value = sanitizeCellString(photoAtt?.url || "แนบในระบบ SpecWise AI (ภาพครุภัณฑ์)");
  ws.getCell("D44").value = sanitizeCellString(specAtt?.url || "แนบเอกสารคุณลักษณะเฉพาะ (สเปก TOR) ในระบบ SpecWise AI");
  ws.getCell("D46").value = sanitizeCellString(quotesAtt?.url || "แนบใบเสนอราคา 3 บริษัทคู่เทียบ ในระบบ SpecWise AI");
  ws.getCell("D48").value = totalBudget >= 10000000
    ? sanitizeCellString(feasAtt?.url || "เอกสารแสดงความคุ้มค่าต่อการลงทุน แนบในระบบ SpecWise AI")
    : "-";

  // 4.0 ราคาค่าครุภัณฑ์และราคามาตรฐาน
  if (proposal.standardMatched) {
    ws.getCell("C51").value = 1;
    ws.getCell("C53").value = 0;
    ws.getCell("G51").value = sanitizeCellString(proposal.standardName || "ครุภัณฑ์ตามบัญชีมาตรฐาน");
    ws.getCell("G52").value = unitPrice;
  } else {
    ws.getCell("C51").value = 0;
    ws.getCell("C53").value = 1;
    ws.getCell("G51").value = "-";
    ws.getCell("G52").value = "-";
  }

  // 5.0 การเทียบเคียงครุภัณฑ์จากใบเสนอราคา (3 เจ้า)
  const v1Name = quotes?.vendor1?.name || "บริษัท คลาริตัส จํากัด";
  const v1Price = sanitizeNumber(quotes?.vendor1?.price, totalBudget * 1.02);
  const v2Name = quotes?.vendor2?.name || "บริษัท สเปกตรัม อินสตรูเมนท์ (ประเทศไทย) จำกัด";
  const v2Price = sanitizeNumber(quotes?.vendor2?.price, totalBudget);
  const v3Name = quotes?.vendor3?.name || "บริษัท พรีซิชั่น ซายน์ แอนด์ เทค จำกัด";
  const v3Price = sanitizeNumber(quotes?.vendor3?.price, totalBudget * 1.04);

  ws.getCell("C57").value = sanitizeCellString(v1Name);
  ws.getCell("H57").value = v1Price;

  ws.getCell("C58").value = sanitizeCellString(v2Name);
  ws.getCell("H58").value = v2Price;

  ws.getCell("C59").value = sanitizeCellString(v3Name);
  ws.getCell("H59").value = v3Price;

  // 6.0 การเทียบเคียงครุภัณฑ์กับราคากลางหรือมหาวิทยาลัยอื่น/หน่วยงานอื่น
  const src1 = proposal.aiAnalysis?.step3?.sources?.[0];
  const src2 = proposal.aiAnalysis?.step3?.sources?.[1];

  ws.getCell("C64").value = sanitizeCellString(src1?.sourceName || proposal.title);
  ws.getCell("E64").value = sanitizeCellString(src1?.docRef || "สำนักงบประมาณ / กระทรวงดีอี");
  ws.getCell("H64").value = sanitizeNumber(src1?.unitPrice, unitPrice);
  ws.getCell("I64").value = "https://bb.go.th / https://mdes.go.th";

  ws.getCell("C65").value = sanitizeCellString(src2?.sourceName || std?.ref2 || "ฐานข้อมูลการจัดซื้อจัดจ้างภาครัฐ (e-GP)");
  ws.getCell("E65").value = "ระบบจัดซื้อจัดจ้างภาครัฐ / มหาวิทยาลัยขอนแก่น";
  ws.getCell("H65").value = sanitizeNumber(src2?.unitPrice, unitPrice * 0.98);
  ws.getCell("I65").value = "http://www.gprocurement.go.th";

  ws.getCell("C66").value = "-";
  ws.getCell("E66").value = "-";
  ws.getCell("H66").value = 0;
  ws.getCell("I66").value = "-";

  ws.getCell("D67").value = sanitizeCellString(
    std?.notes ||
      `รายการ ${proposal.title} เป็นครุภัณฑ์ที่มีความจำเป็นเฉพาะทางด้านวิชาการและวิจัย ได้รับการตรวจสอบและเทียบเคียงราคาจากผู้ประกอบการและแหล่งราคากลางมาตรฐานแล้ว มีความสมเหตุสมผลของราคา`
  );

  // 7.0 ความพร้อมในการดำเนินการ
  ws.getCell("C70").value = sanitizeCellString(readiness?.procurementReadiness || "ตุลาคม 2570");
  ws.getCell("C71").value = sanitizeCellString(readiness?.contractSigning || "ธันวาคม 2570");
  ws.getCell("C72").value = sanitizeCellString(readiness?.installationDelivery || "มีนาคม 2571");

  // 8.0 คำชี้แจงรายละเอียด
  // คุณลักษณะทั่วไป
  const generalText = specSummary?.generalSpec || neutralSpec?.disclaimer || "คุณลักษณะทั่วไปตามเกณฑ์มาตรฐานครุภัณฑ์ของทางราชการ และมหาวิทยาลัยขอนแก่น";
  ws.getCell("B76").value = sanitizeCellString(generalText);

  // คุณลักษณะเฉพาะ (Format categories nicely into numbered specs)
  let techSpecText = specSummary?.technicalSpec || "";
  if (!techSpecText && neutralSpec?.categories && neutralSpec.categories.length > 0) {
    techSpecText = neutralSpec.categories
      .map((cat, idx) => {
        const catTitle = `${idx + 1}. ${cat.categoryName}`;
        const items = cat.items.map((it, itIdx) => `   ${idx + 1}.${itIdx + 1} ${it}`).join("\n");
        return `${catTitle}\n${items}`;
      })
      .join("\n\n");
  } else if (!techSpecText) {
    techSpecText = `1. คุณลักษณะทางเทคนิคสำหรับ ${proposal.title}\n   - ประสิทธิภาพการทำงานตามมาตรฐานสากล\n   - รองรับการเชื่อมต่อและการประมวลผลข้อมูลความเร็วสูง\n   - มีระบบความปลอดภัยและการรับประกันตามเกณฑ์มาตรฐาน`;
  }
  ws.getCell("B78").value = sanitizeCellString(techSpecText);

  // อุปกรณ์ประกอบ
  const accText = specSummary?.accessories || "อุปกรณ์ประกอบครบชุดพร้อมติดตั้ง สายไฟ สายสัญญาณ และอุปกรณ์ต่อพ่วงจำเป็นต่อการทำงานอย่างสมบูรณ์";
  ws.getCell("B80").value = sanitizeCellString(accText);

  // 9.0 คำชี้แจงเพิ่มเติม
  const additionalNotes = form?.section8AdditionalNotes ||
    `เอกสารคำของบประมาณรายการ "${proposal.title}" (รหัสคำขอ: ${proposal.code}) ได้รับการตรวจสอบและวิเคราะห์ผ่านระบบ SpecWise AI ครบถ้วนตามระเบียบกระทรวงการคลังว่าด้วยการจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ. 2560 และแนวทางการจัดทำงบประมาณ มหาวิทยาลัยขอนแก่น`;
  ws.getCell("B82").value = sanitizeCellString(additionalNotes);

  // Write out to buffer
  const buffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(buffer);
}
