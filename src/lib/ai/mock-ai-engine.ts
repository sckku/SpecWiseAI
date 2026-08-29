import {
  Full6StepAnalysis,
  Step1IntentResult,
  Step2StandardNameResult,
  Step3PriceCrossCheckResult,
  Step4BudgetAlertResult,
  KKUBudgetForm8Sections,
  Step6NeutralSpecResult,
} from "@/types/ai";
import { KKUUserSession } from "@/types/auth";
import { matchStandardNameHeuristic } from "../catalogs/matcher";
import { lintProcurementSpec } from "../security/procurement-linter";

export function simulateStep1(promptText: string): Step1IntentResult {
  const lower = promptText.toLowerCase();

  // Check for quantity
  const qtyMatch = promptText.match(/(\d+)\s*(เครื่อง|ชุด|ตัว|จอ|อัน|โหล)/);
  const qty = qtyMatch ? parseInt(qtyMatch[1], 10) : 10;
  const unit = qtyMatch ? qtyMatch[2] : "เครื่อง";

  // Check for total or unit price
  let totalBudget = 500000;
  let unitPrice = 50000;

  const budgetMatch = promptText.match(/งบประมาณ\s*([\d,]+)\s*บาท/);
  if (budgetMatch) {
    totalBudget = parseInt(budgetMatch[1].replace(/,/g, ""), 10);
    unitPrice = totalBudget / qty;
  } else {
    const unitMatch = promptText.match(/เครื่องละ\s*([\d,]+)\s*บาท/);
    if (unitMatch) {
      unitPrice = parseInt(unitMatch[1].replace(/,/g, ""), 10);
      totalBudget = unitPrice * qty;
    }
  }

  let itemCategory = "ครุภัณฑ์คอมพิวเตอร์";
  let rawItemName = "เครื่องคอมพิวเตอร์ประสิทธิภาพสูงสำหรับงาน Data Science และ AI";
  let objective = "เพื่อใช้ในการประมวลผลข้อมูลขนาดใหญ่ การเรียนการสอน และงานวิจัยด้าน Data Science และ AI";

  if (lower.includes("notebook") || lower.includes("laptop") || lower.includes("พกพา")) {
    itemCategory = "ครุภัณฑ์คอมพิวเตอร์";
    rawItemName = "เครื่องคอมพิวเตอร์พกพา (Notebook) สำหรับงานวิจัยภาคสนาม";
    objective = "เพื่อใช้ในการเก็บข้อมูลและประมวลผลการวิจัยภาคสนาม";
    if (!budgetMatch) {
      unitPrice = 38000;
      totalBudget = unitPrice * qty;
    }
  } else if (lower.includes("centrifuge") || lower.includes("ปั่นเหวี่ยง") || lower.includes("วิทยาศาสตร์")) {
    itemCategory = "ครุภัณฑ์วิทยาศาสตร์";
    rawItemName = "เครื่องปั่นเหวี่ยงตกตะกอนควบคุมอุณหภูมิความเร็วรอบสูง";
    objective = "เพื่อใช้ในการแยกสารชีวโมเลกุลในงานวิจัยด้านเทคโนโลยีชีวภาพ";
    if (!budgetMatch) {
      unitPrice = 350000;
      totalBudget = unitPrice * qty;
    }
  }

  return {
    itemCategory,
    rawItemName,
    objective,
    quantity: qty,
    unit,
    totalProposedBudget: totalBudget,
    unitProposedPrice: unitPrice,
    urgencyReason: "เพื่อรองรับการเปิดภาคการศึกษาใหม่และโครงการวิจัยทุนภายนอก",
    targetDepartment: "สาขาวิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์",
  };
}

export function simulateStep2(intent: Step1IntentResult): Step2StandardNameResult {
  return matchStandardNameHeuristic(intent.rawItemName, intent.itemCategory);
}

export function simulateStep3(
  intent: Step1IntentResult,
  step2: Step2StandardNameResult
): Step3PriceCrossCheckResult {
  const stdPrice = step2.standardUnitPrice || 26000;
  const isComputer = intent.itemCategory.includes("คอมพิวเตอร์");

  const sources = [
    {
      sourceId: "budget_bureau" as const,
      sourceName: "สำนักงบประมาณ",
      found: true,
      unitPrice: isComputer ? 26000 : stdPrice,
      docRef: "บัญชีราคามาตรฐานครุภัณฑ์ ฉบับ เม.ย. 2569 หน้า 14",
      notes: "เกณฑ์ราคามาตรฐานสำหรับหน่วยงานภาครัฐ",
    },
    {
      sourceId: "de_ministry" as const,
      sourceName: "กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม",
      found: isComputer,
      unitPrice: isComputer ? stdPrice : undefined,
      docRef: "เกณฑ์ราคากลางและคุณลักษณะพื้นฐาน พ.ค. 2569 ข้อ 2.1",
      notes: "เกณฑ์มาตรฐานระบบคอมพิวเตอร์ภาครัฐ",
    },
    {
      sourceId: "kku_standard" as const,
      sourceName: "มหาวิทยาลัยขอนแก่น",
      found: true,
      unitPrice: stdPrice,
      docRef: "แนวทางราคากลางครุภัณฑ์ มข. ประจำปี 2569",
      notes: "สอดคล้องตามเกณฑ์มาตรฐานกลางของมหาวิทยาลัย",
    },
    {
      sourceId: "historical_quotation" as const,
      sourceName: "ราคาจัดหาจริง/ใบเสนอราคาตลาด",
      found: true,
      unitPrice: intent.unitProposedPrice,
      docRef: "ใบเสนอราคา บจก. ซิลิคอน เทคโนโลยี (ราคาต่ำสุด)",
      notes: "ราคาจริงจากการสืบราคาตลาดพร้อมการรับประกัน On-site 3 ปี",
    },
  ];

  const varianceBaht = intent.unitProposedPrice - stdPrice;
  const variancePercent = stdPrice > 0 ? Number(((varianceBaht / stdPrice) * 100).toFixed(1)) : 0;

  return {
    itemName: step2.recommendedStandardName || intent.rawItemName,
    sources,
    minStandardPrice: stdPrice,
    maxStandardPrice: stdPrice,
    benchmarkVarianceBaht: varianceBaht,
    benchmarkVariancePercent: variancePercent,
  };
}

export function simulateStep4(
  intent: Step1IntentResult,
  step2: Step2StandardNameResult,
  step3: Step3PriceCrossCheckResult
): Step4BudgetAlertResult {
  const stdPrice = step2.standardUnitPrice || 26000;
  const diff = intent.unitProposedPrice - stdPrice;
  const diffPercent = step3.benchmarkVariancePercent;

  let alertLevel: "GREEN_MATCH" | "AMBER_ALERT" | "CUSTOM_NON_STANDARD" = "GREEN_MATCH";
  let statusLabel = "Green Match: ขอตั้งงบประมาณสอดคล้องตามราคามาตรฐาน";
  let reasoning = `ราคาที่ขอเสนอ (${intent.unitProposedPrice.toLocaleString()} บาท) สอดคล้องกับเกณฑ์ราคากลางมาตรฐาน (${stdPrice.toLocaleString()} บาท)`;
  const guidance: string[] = [
    "สามารถจัดทำคำของบประมาณตามขั้นตอนปกติได้ทันที",
    "ใช้รายละเอียดคุณลักษณะเฉพาะเชิงหน้าที่ตามเกณฑ์มาตรฐาน",
  ];

  if (!step2.isMatched || step2.matchStatus === "non_standard") {
    alertLevel = "CUSTOM_NON_STANDARD";
    statusLabel = "Non-Standard: รายการนอกบัญชีราคามาตรฐาน";
    reasoning = "รายการนี้ไม่มีในบัญชีมาตรฐานของสำนักงบประมาณและกระทรวง DE จึงต้องใช้ราคาจากการสืบราคาตลาด";
    guidance.push("ต้องแนบใบเสนอราคาจากผู้ประกอบการที่มีคุณสมบัติไม่น้อยกว่า 3 ราย");
    guidance.push("ต้องจัดทำเอกสารแสดงเหตุผลความจำเป็นและความคุ้มค่าทางวิชาการ");
  } else if (diff > 0) {
    alertLevel = "AMBER_ALERT";
    statusLabel = "Budget Alert: วงเงินที่ขอสูงกว่าราคามาตรฐานอ้างอิง";
    reasoning = `วงเงินที่ขอเสนอ (${intent.unitProposedPrice.toLocaleString()} บาท) สูงกว่าราคามาตรฐาน (${stdPrice.toLocaleString()} บาท) จำนวน ${diff.toLocaleString()} บาท/หน่วย (+${diffPercent}%) เนื่องจากต้องการสมรรถนะการประมวลผลขั้นสูง`;
    guidance.length = 0;
    guidance.push("ระเบียบพัสดุฯ อนุญาตให้ตั้งคำขอสูงกว่าเกณฑ์มาตรฐานได้ โดยต้องชี้แจงเหตุผลความจำเป็นเชิงวิชาการ/วิจัย");
    guidance.push("ต้องแนบใบเสนอราคาจากผู้ประกอบการอย่างน้อย 3 รายเพื่อยืนยันราคาตลาด");
    guidance.push("ห้ามระบุชื่อตราสินค้า/ยี่ห้อ (Brand) ในรายละเอียดคุณลักษณะเฉพาะ ต้องระบุเป็น Functional Specs และใช้คำว่า 'หรือเทียบเท่า'");
  }

  const isFeasibilityRequired = intent.totalProposedBudget >= 10000000;
  if (isFeasibilityRequired) {
    guidance.push("คำขอมีวงเงินรวมตั้งแต่ 10 ล้านบาทขึ้นไป ต้องแนบเอกสารแสดงความคุ้มค่าและความพร้อมในการบริหารโครงการ");
  }

  return {
    alertLevel,
    statusLabel,
    proposedUnitPrice: intent.unitProposedPrice,
    standardUnitPrice: stdPrice,
    priceDifference: diff,
    differencePercentage: diffPercent,
    reasoning,
    guidance,
    requiredAttachments: {
      threeQuotationsRequired: diff > 0 || !step2.isMatched,
      academicJustificationRequired: diff > 0,
      feasibilityStudyRequired: isFeasibilityRequired,
      functionalSpecRequired: true,
    },
  };
}

export function simulateStep5(
  intent: Step1IntentResult,
  step2: Step2StandardNameResult,
  step4: Step4BudgetAlertResult,
  user: KKUUserSession
): KKUBudgetForm8Sections {
  const p = intent.unitProposedPrice;
  return {
    section1BasicInfo: {
      agency: `${user.faculty} / ${user.department}`,
      itemName: `${step2.recommendedStandardName || intent.rawItemName} (${intent.objective})`,
      quantity: intent.quantity,
      unit: intent.unit,
      budgetBaht: intent.totalProposedBudget,
      unitPriceBaht: intent.unitProposedPrice,
      plan: "แผนงานจัดการศึกษาระดับอุดมศึกษา",
      subPlan: "แผนงานย่อยส่งเสริมการวิจัยและนวัตกรรม",
      project: "โครงการยกระดับโครงสร้างพื้นฐานดิจิทัลและปัญญาประดิษฐ์เพื่อการศึกษา",
      objective: intent.objective,
      equipmentType: intent.itemCategory,
      procurementType: "จัดซื้อใหม่เพื่อรองรับการขยายงานวิจัยและการเรียนการสอน",
      sCurve: "New S-Curve (Digital and AI Economy / High-Tech Innovation)",
      sdgs: ["SDG 4 (Quality Education)", "SDG 9 (Industry, Innovation, and Infrastructure)"],
    },
    section2Necessity: {
      details: `เนื่องจากหลักสูตรและโครงการวิจัยมีความจำเป็นต้องประมวลผลแบบจำลองปัญญาประดิษฐ์ขนาดใหญ่ (Deep Learning / Big Data Analytics) ซึ่งเครื่องคอมพิวเตอร์สำนักงานทั่วไปไม่สามารถรองรับได้ จึงมีความจำเป็นต้องจัดหาเครื่องคอมพิวเตอร์สมรรถนะสูงนี้`,
      installationLocation: "ห้องปฏิบัติการคอมพิวเตอร์และปัญญาประดิษฐ์ ชั้น 4 อาคาร SC-64",
      targetCurriculum: "หลักสูตรวิทยาศาสตรบัณฑิต และหลักสูตรวิทยาศาสตรมหาบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์และปัญญาประดิษฐ์",
      userCount: 150,
      impactIfNotFunded: "นักศึกษาและนักวิจัยขาดแคลนทรัพยากรประมวลผล ทำให้ไม่สามารถส่งมอบงานวิจัยตามกำหนดเวลาและส่งผลกระทบต่อคุณภาพบัณฑิต",
      urgency: "มีความจำเป็นเร่งด่วนเพื่อรองรับการเปิดภาคการศึกษาที่ 1/2569 และงานวิจัยร่วมกับภาคอุตสาหกรรม",
    },
    section3AttachmentsChecklist: {
      photos: true,
      specPdf: true,
      quotationsPdf: true,
      feasibilityStudyRequired: step4.requiredAttachments.feasibilityStudyRequired,
    },
    section4QuotationComparison: {
      vendor1: { name: "บริษัท ซิลิคอน เทคโนโลยี ซิสเต็มส์ จำกัด", price: Math.round(p * 0.98) },
      vendor2: { name: "บริษัท ดาต้า อินโนเวชั่น จำกัด", price: p },
      vendor3: { name: "บริษัท แอ็ดวานซ์ คอมพิวติ้ง จำกัด", price: Math.round(p * 1.04) },
      selectedVendorIndex: 1,
      notes: "ใช้ราคาต่ำสุดจากใบเสนอราคาของผู้ประกอบการที่มีคุณสมบัติตรงตามข้อกำหนดทั้งหมด",
    },
    section5StandardComparison: {
      ref1: "เกณฑ์ราคากลางและคุณลักษณะพื้นฐานครุภัณฑ์คอมพิวเตอร์ กระทรวงดิจิทัลฯ (ฉบับ พ.ค. 2569)",
      ref2: "บัญชีราคามาตรฐานครุภัณฑ์ สำนักงบประมาณ (ฉบับ เม.ย. 2569)",
      notes: step4.reasoning,
    },
    section6Readiness: {
      procurementReadiness: "มีความพร้อมจัดทำร่าง TOR และแต่งตั้งคณะกรรมการจัดซื้อจัดจ้างทันทีที่ได้รับอนุมัติงบประมาณ",
      contractSigning: "สามารถลงนามในสัญญาจัดซื้อจัดจ้างได้ภายใน 30 วันหลังประกาศผลผู้ชนะ",
      installationDelivery: "พร้อมตรวจรับ ติดตั้ง และเปิดใช้งานได้ภายใน 45 วันหลังลงนามสัญญา",
    },
    section7SpecSummary: {
      generalSpec: "เครื่องคอมพิวเตอร์สำหรับประมวลผลสมรรถนะสูง พร้อมจอแสดงผลความละเอียดสูงและอุปกรณ์ต่อพ่วงครบชุด",
      technicalSpec: "CPU ไม่น้อยกว่า 14 Cores / 20 Threads, RAM DDR5 ไม่น้อยกว่า 64GB, SSD PCIe 4.0 NVMe ไม่น้อยกว่า 2TB, GPU VRAM ไม่น้อยกว่า 16GB หรือเทียบเท่า",
      accessories: "สายเชื่อมต่อสัญญาณ, แป้นพิมพ์, เมาส์, ลิขสิทธิ์ระบบปฏิบัติการแท้ และการรับประกันแบบ On-site 3 ปี",
    },
    section8AdditionalNotes: "รายการคำของบประมาณนี้ได้ผ่านความเห็นชอบจากคณะกรรมการประจำคณะและสอดคล้องกับแผนยุทธศาสตร์ มข. พ.ศ. 2569-2573",
  };
}

export function simulateStep6(
  intent: Step1IntentResult,
  form8: KKUBudgetForm8Sections,
  step2?: Step2StandardNameResult
): Step6NeutralSpecResult {
  const isComputer = intent.itemCategory.includes("คอมพิวเตอร์");

  const categories = isComputer
    ? [
        {
          categoryName: "1. คุณลักษณะทั่วไป (General Characteristics)",
          items: [
            "เป็นเครื่องคอมพิวเตอร์ตั้งโต๊ะประสิทธิภาพสูง (Desktop / Workstation) มีมาตรฐานความปลอดภัยระดับสากล เช่น CE, FCC หรือ มอก. หรือเทียบเท่า",
            "ตัวเครื่องได้รับการออกแบบสำหรับการทำงานประมวลผลต่อเนื่องได้ไม่น้อยกว่า 24 ชั่วโมงต่อวัน โดยมีระบบระบายความร้อนที่มีประสิทธิภาพ",
          ],
        },
        {
          categoryName: "2. หน่วยประมวลผลกลาง (CPU)",
          items: [
            "มีหน่วยประมวลผลกลางแบบไม่น้อยกว่า 14 Cores และ 20 Threads และมีความเร็ว Boost Clock ไม่น้อยกว่า 5.0 GHz หรือมีคะแนน PassMark CPU Mark ไม่น้อยกว่า 35,000 คะแนน หรือเทียบเท่า",
            "มีหน่วยความจำแคช (L3 Cache) รวมไม่น้อยกว่า 24 MB",
          ],
        },
        {
          categoryName: "3. หน่วยความจำหลัก (RAM)",
          items: [
            "มีหน่วยความจำหลัก (RAM) ชนิด DDR5 ความเร็วบัสไม่น้อยกว่า 5200 MHz ขนาดความจุรวมไม่น้อยกว่า 64 GB หรือเทียบเท่า",
            "รองรับการอัปเกรดหน่วยความจำสูงสุดได้ไม่น้อยกว่า 128 GB",
          ],
        },
        {
          categoryName: "4. หน่วยจัดเก็บข้อมูล (Storage)",
          items: [
            "มีหน่วยจัดเก็บข้อมูลชนิด Solid State Drive (SSD) แบบ M.2 NVMe PCIe Gen 4.0 ขนาดความจุไม่น้อยกว่า 2 TB จำนวน 1 หน่วย หรือเทียบเท่า",
            "มีความเร็วในการอ่านข้อมูลแบบต่อเนื่อง (Sequential Read) ไม่น้อยกว่า 5,000 MB/s",
          ],
        },
        {
          categoryName: "5. หน่วยประมวลผลกราฟิก (GPU / Accelerator)",
          items: [
            "มีหน่วยประมวลผลกราฟิกแยกสำหรับงานปัญญาประดิษฐ์และการประมวลผลเชิงตัวเลข มีหน่วยความจำเฉพาะ (Dedicated VRAM) แบบ GDDR6 หรือดีกว่า ขนาดไม่น้อยกว่า 16 GB หรือเทียบเท่า",
            "รองรับการประมวลผล Tensor Cores หรือ AI Acceleration Library มาตรฐานอุตสาหกรรม",
          ],
        },
        {
          categoryName: "6. จอแสดงภาพและระบบเชื่อมต่อ (Display & Network)",
          items: [
            "จอแสดงภาพชนิด IPS ขนาดไม่น้อยกว่า 27 นิ้ว ความละเอียดไม่น้อยกว่า 2560 x 1440 พิกเซล (QHD) พร้อมพอร์ต HDMI หรือ DisplayPort หรือเทียบเท่า",
            "มีพอร์ตเชื่อมต่อเครือข่าย Gigabit Ethernet (10/100/1000 Mbps) หรือ 2.5 Gbps จำนวนไม่น้อยกว่า 1 ช่อง",
            "รองรับการเชื่อมต่อเครือข่ายไร้สาย Wi-Fi 6 (802.11ax) และ Bluetooth 5.2 หรือดีกว่า",
          ],
        },
        {
          categoryName: "7. เงื่อนไขการรับประกันและบริการ (Warranty & Support)",
          items: [
            "มีการรับประกันผลิตภัณฑ์และบริการตรวจซ่อม ณ สถานที่ติดตั้ง (On-site Service) ทุกชิ้นส่วน เป็นระยะเวลาไม่น้อยกว่า 3 ปี",
            "มีศูนย์บริการที่ได้รับการรับรองมาตรฐานตั้งอยู่ในพื้นที่ภาคตะวันออกเฉียงเหนือหรือจังหวัดขอนแก่น เพื่อความรวดเร็วในการแก้ไขปัญหา",
          ],
        },
      ]
    : [
        {
          categoryName: "1. คุณลักษณะทั่วไปและมาตรฐาน",
          items: [
            "เป็นอุปกรณ์ครุภัณฑ์ตามมาตรฐานสากล ISO หรือมาตรฐาน มอก. ที่เกี่ยวข้อง หรือเทียบเท่า",
            "มีคู่มือการใช้งานและเอกสารรับรองมาตรฐานภาษาไทยหรือภาษาอังกฤษ",
          ],
        },
        {
          categoryName: "2. สมรรถนะเชิงหน้าที่",
          items: [
            "มีสมรรถนะการทำงานตรงตามวัตถุประสงค์การใช้งานในห้องปฏิบัติการ",
            "มีระบบควบคุมการทำงานแบบดิจิทัลพร้อมหน้าจอแสดงผลสภาวะการทำงาน",
          ],
        },
        {
          categoryName: "3. เงื่อนไขการรับประกันและการฝึกอบรม",
          items: [
            "รับประกันการใช้งาน ณ สถานที่ติดตั้งไม่น้อยกว่า 2 ปี พร้อมอบรมการใช้งานแก่บุคลากรไม่น้อยกว่า 1 วันทำการ",
          ],
        },
      ];

  const allLines = categories.flatMap((c) => c.items);
  const lintResults = lintProcurementSpec(allLines);

  return {
    specTitle: `ร่างคุณลักษณะเฉพาะ (TOR): ${step2?.recommendedStandardName || intent.rawItemName}`,
    disclaimer: "เอกสารนี้เป็นร่างคุณลักษณะเฉพาะเพื่อเสนอคณะกรรมการพิจารณาและรับรอง มิใช่สเปกสำเร็จรูปสำหรับจัดซื้ออัตโนมัติ",
    categories,
    brandLinterIssues: lintResults.issues.map((i) => ({
      detectedBrand: i.detectedBrand,
      suggestedReplacement: i.suggestedReplacement,
      line: i.line,
    })),
  };
}

export function runFull6StepPipeline(
  userInput: string,
  user: KKUUserSession
): Full6StepAnalysis {
  const step1 = simulateStep1(userInput);
  const step2 = simulateStep2(step1);
  const step3 = simulateStep3(step1, step2);
  const step4 = simulateStep4(step1, step2, step3);
  const step5 = simulateStep5(intentToStep1(step1), step2, step4, user);
  const step6 = simulateStep6(step1, step5, step2);

  return {
    step1,
    step2,
    step3,
    step4,
    step5,
    step6,
    completedAt: new Date().toISOString(),
  };
}

function intentToStep1(s: Step1IntentResult): Step1IntentResult {
  return s;
}
