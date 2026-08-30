import { BudgetProposal } from "@/types/budget";
import { escapeHtml } from "../security/html";

export function generateOfficialKKUProposalHtml(proposal: BudgetProposal): string {
  const form = proposal.form8Sections;
  const spec = proposal.neutralSpec;

  const basic = form?.section1BasicInfo;
  const necessity = form?.section2Necessity;
  const quotes = form?.section4QuotationComparison;
  const std = form?.section5StandardComparison;
  const readiness = form?.section6Readiness;
  const specSummary = form?.section7SpecSummary;

  // All user-controlled / AI-generated strings MUST go through escapeHtml.
  const e = escapeHtml;
  const money = (v: unknown) => {
    const n = Number(v);
    return Number.isFinite(n) ? n.toLocaleString("th-TH") : "0";
  };

  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>แบบคำของบประมาณเงินรายได้ (งบลงทุน/ครุภัณฑ์) มหาวิทยาลัยขอนแก่น - ${e(proposal.code)}</title>
  <style>
    @page {
      size: A4;
      margin: 20mm 15mm 20mm 15mm;
    }
    body {
      font-family: 'Sarabun', 'TH Sarabun New', sans-serif;
      font-size: 14pt;
      line-height: 1.4;
      color: #111827;
      margin: 0;
      padding: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 25px;
      border-bottom: 2px solid #8c2d19;
      padding-bottom: 15px;
    }
    .header h1 {
      font-size: 18pt;
      margin: 0 0 5px 0;
      color: #8c2d19;
    }
    .header h2 {
      font-size: 14pt;
      margin: 0;
      font-weight: normal;
    }
    .badge {
      display: inline-block;
      padding: 4px 10px;
      background-color: #f3f4f6;
      border-radius: 4px;
      font-weight: bold;
      font-size: 11pt;
      margin-top: 5px;
    }
    .section-title {
      font-size: 14pt;
      font-weight: bold;
      color: #8c2d19;
      background-color: #fbe8e4;
      padding: 6px 12px;
      margin-top: 20px;
      margin-bottom: 10px;
      border-left: 5px solid #8c2d19;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 15px;
    }
    th, td {
      border: 1px solid #d1d5db;
      padding: 8px 10px;
      text-align: left;
      font-size: 12pt;
    }
    th {
      background-color: #f9fafb;
      font-weight: bold;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      margin-bottom: 10px;
    }
    .field-label {
      font-weight: bold;
      color: #374151;
    }
    .field-value {
      color: #111827;
    }
    .signature-box {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      page-break-inside: avoid;
    }
    .sign-col {
      text-align: center;
      width: 45%;
    }
    .sign-line {
      margin-top: 50px;
      border-bottom: 1px dotted #4b5563;
      padding-bottom: 5px;
    }
    @media print {
      body { padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom: 20px; text-align: right; color: #6b7280; font-size: 12px;">
    ใช้คำสั่งพิมพ์ของเบราว์เซอร์ (Ctrl+P / Cmd+P) เพื่อพิมพ์หรือบันทึกเป็น PDF
  </div>

  <div class="header">
    <h1>แบบคำของบประมาณเงินรายได้ (งบลงทุน/ครุภัณฑ์) ประจำปีงบประมาณ พ.ศ. ${e(proposal.fiscalYear)}</h1>
    <h2>มหาวิทยาลัยขอนแก่น (Khon Kaen University)</h2>
    <div class="badge">รหัสคำขอ: ${e(proposal.code)} | สถานะ: ${e(proposal.status)}</div>
  </div>

  <!-- หมวดที่ 1 -->
  <div class="section-title">หมวดที่ 1: ข้อมูลพื้นฐานโครงการและรายการครุภัณฑ์</div>
  <table>
    <tr>
      <td width="25%" class="field-label">หน่วยงาน / ส่วนงาน:</td>
      <td width="75%">${e(basic?.agency || `${proposal.faculty} / ${proposal.department}`)}</td>
    </tr>
    <tr>
      <td class="field-label">ชื่อรายการครุภัณฑ์:</td>
      <td><strong>${e(basic?.itemName || proposal.title)}</strong></td>
    </tr>
    <tr>
      <td class="field-label">จำนวนและวงเงิน:</td>
      <td>จำนวน ${e(basic?.quantity ?? proposal.quantity)} ${e(basic?.unit || proposal.unit)} | ราคาต่อหน่วย ${money(basic?.unitPriceBaht ?? proposal.unitPriceBaht)} บาท | <strong>วงเงินรวม ${money(basic?.budgetBaht ?? proposal.totalBudgetBaht)} บาท</strong></td>
    </tr>
    <tr>
      <td class="field-label">แผนงาน / แผนงานย่อย:</td>
      <td>${e(basic?.plan || "แผนงานจัดการศึกษาระดับอุดมศึกษา")} &gt; ${e(basic?.subPlan || "แผนงานย่อยส่งเสริมการวิจัยและนวัตกรรม")}</td>
    </tr>
    <tr>
      <td class="field-label">โครงการ:</td>
      <td>${e(basic?.project || "โครงการพัฒนาโครงสร้างพื้นฐานดิจิทัล")}</td>
    </tr>
    <tr>
      <td class="field-label">ประเภทการจัดหา:</td>
      <td>${e(basic?.procurementType || "จัดซื้อใหม่")}</td>
    </tr>
    <tr>
      <td class="field-label">ความสอดคล้อง S-Curve / SDGs:</td>
      <td>${e(basic?.sCurve || "-")} | SDGs: ${e(basic?.sdgs?.join(", ") || "-")}</td>
    </tr>
  </table>

  <!-- หมวดที่ 2 -->
  <div class="section-title">หมวดที่ 2: วัตถุประสงค์และความจำเป็น</div>
  <table>
    <tr>
      <td width="25%" class="field-label">วัตถุประสงค์:</td>
      <td width="75%">${e(basic?.objective || "-")}</td>
    </tr>
    <tr>
      <td class="field-label">เหตุผลความจำเป็น:</td>
      <td>${e(necessity?.details || "-")}</td>
    </tr>
    <tr>
      <td class="field-label">สถานที่ติดตั้งใช้งาน:</td>
      <td>${e(necessity?.installationLocation || "-")}</td>
    </tr>
    <tr>
      <td class="field-label">หลักสูตร/กลุ่มเป้าหมาย:</td>
      <td>${e(necessity?.targetCurriculum || "-")} (ผู้ใช้งานประมาณ ${e(necessity?.userCount ?? 0)} คน)</td>
    </tr>
    <tr>
      <td class="field-label">ผลกระทบหากไม่ได้รับงบ:</td>
      <td>${e(necessity?.impactIfNotFunded || "-")}</td>
    </tr>
  </table>

  <!-- หมวดที่ 3 -->
  <div class="section-title">หมวดที่ 3: เอกสารประกอบคำของบประมาณ (Checklist)</div>
  <table>
    <tr>
      <th>ลำดับ</th>
      <th>รายการเอกสารแนบ</th>
      <th>สถานะการแนบ</th>
    </tr>
    <tr>
      <td>3.1</td>
      <td>ภาพแสดงครุภัณฑ์เดิมที่ชำรุด หรือพื้นที่รองรับการติดตั้ง (ไฟล์ภาพ 1 ไฟล์)</td>
      <td>✅ แนบเรียบร้อย</td>
    </tr>
    <tr>
      <td>3.2</td>
      <td>รายละเอียดคุณลักษณะเฉพาะ (สเปก) รวมเป็นไฟล์ PDF 1 ไฟล์</td>
      <td>✅ แนบเรียบร้อย</td>
    </tr>
    <tr>
      <td>3.3</td>
      <td>ใบเสนอราคาจากผู้ประกอบการ 3 ราย รวมเป็นไฟล์ PDF 1 ไฟล์</td>
      <td>✅ แนบเรียบร้อย</td>
    </tr>
    <tr>
      <td>3.4</td>
      <td>เอกสารแสดงความคุ้มค่าโครงการ (กรณีวงเงินตั้งแต่ 10 ล้านบาทขึ้นไป)</td>
      <td>${(proposal.totalBudgetBaht >= 10000000) ? "⚠️ แนบเอกสารแสดงความคุ้มค่าแล้ว" : "ยกเว้นไม่ต้องแนบ (วงเงินไม่ถึง 10 ล้านบาท)"}</td>
    </tr>
  </table>

  <!-- หมวดที่ 4 -->
  <div class="section-title">หมวดที่ 4: ตารางเปรียบเทียบราคาจากผู้ประกอบการ 3 ราย</div>
  <table>
    <tr>
      <th>ลำดับ</th>
      <th>ชื่อผู้ประกอบการ / บริษัท</th>
      <th>ราคาต่อหน่วย (บาท)</th>
      <th>หมายเหตุ</th>
    </tr>
    <tr>
      <td>1</td>
      <td>${e(quotes?.vendor1?.name || "บริษัท ผู้ประกอบการรายที่ 1 จำกัด")}</td>
      <td>${money(quotes?.vendor1?.price)}</td>
      <td>${quotes?.selectedVendorIndex === 1 ? "⭐ ราคาต่ำสุดที่เลือกใช้" : "-"}</td>
    </tr>
    <tr>
      <td>2</td>
      <td>${e(quotes?.vendor2?.name || "บริษัท ผู้ประกอบการรายที่ 2 จำกัด")}</td>
      <td>${money(quotes?.vendor2?.price)}</td>
      <td>${quotes?.selectedVendorIndex === 2 ? "⭐ ราคาต่ำสุดที่เลือกใช้" : "-"}</td>
    </tr>
    <tr>
      <td>3</td>
      <td>${e(quotes?.vendor3?.name || "บริษัท ผู้ประกอบการรายที่ 3 จำกัด")}</td>
      <td>${money(quotes?.vendor3?.price)}</td>
      <td>${quotes?.selectedVendorIndex === 3 ? "⭐ ราคาต่ำสุดที่เลือกใช้" : "-"}</td>
    </tr>
  </table>
  <div style="font-size: 11pt; color: #4b5563; margin-top: -8px; margin-bottom: 10px;">${e(quotes?.notes || "")}</div>

  <!-- หมวดที่ 5 -->
  <div class="section-title">หมวดที่ 5: การเปรียบเทียบกับราคามาตรฐาน / ราคากลาง</div>
  <table>
    <tr>
      <td width="25%" class="field-label">เกณฑ์มาตรฐานอ้างอิง:</td>
      <td width="75%">${e(std?.ref1 || "เกณฑ์ราคากลางกระทรวงดิจิทัลฯ / สำนักงบประมาณ 2570")}</td>
    </tr>
    <tr>
      <td class="field-label">ผลการวิเคราะห์ราคา:</td>
      <td>${e(std?.notes || "-")}</td>
    </tr>
  </table>

  <!-- หมวดที่ 6 -->
  <div class="section-title">หมวดที่ 6: แผนความพร้อมในการจัดหาและการเบิกจ่าย</div>
  <table>
    <tr>
      <td width="25%" class="field-label">ความพร้อมจัดซื้อ:</td>
      <td width="75%">${e(readiness?.procurementReadiness || "พร้อมจัดทำร่าง TOR ทันที")}</td>
    </tr>
    <tr>
      <td class="field-label">ระยะเวลาลงนามสัญญา:</td>
      <td>${e(readiness?.contractSigning || "ภายใน 30 วัน")}</td>
    </tr>
    <tr>
      <td class="field-label">การส่งมอบและติดตั้ง:</td>
      <td>${e(readiness?.installationDelivery || "ภายใน 45 วัน")}</td>
    </tr>
  </table>

  <!-- หมวดที่ 7 & 8 -->
  <div class="section-title">หมวดที่ 7 & 8: สรุปคุณลักษณะเฉพาะและข้อมูลเพิ่มเติม</div>
  <table>
    <tr>
      <td width="25%" class="field-label">สรุปสเปกทั่วไป:</td>
      <td width="75%">${e(specSummary?.generalSpec || "-")}</td>
    </tr>
    <tr>
      <td class="field-label">สรุปสเปกทางเทคนิค:</td>
      <td>${e(specSummary?.technicalSpec || "-")}</td>
    </tr>
    <tr>
      <td class="field-label">ข้อมูลเพิ่มเติม:</td>
      <td>${e(form?.section8AdditionalNotes || "สอดคล้องตามแผนยุทธศาสตร์ มข.")}</td>
    </tr>
  </table>

  <!-- ลายมือชื่อ -->
  <div class="signature-box">
    <div class="sign-col">
      <div>ลงชื่อ............................................................ผู้ขอ</div>
      <div class="sign-line">(${e(proposal.requesterName)})</div>
      <div style="font-size: 11pt; color: #4b5563; margin-top: 5px;">ตำแหน่ง: อาจารย์ / นักวิจัย</div>
      <div style="font-size: 11pt; color: #4b5563;">วันที่ ....../....../..........</div>
    </div>
    <div class="sign-col">
      <div>ลงชื่อ............................................................หัวหน้าส่วนงาน</div>
      <div class="sign-line">(............................................................)</div>
      <div style="font-size: 11pt; color: #4b5563; margin-top: 5px;">ตำแหน่ง: คณบดี / ผู้อำนวยการ</div>
      <div style="font-size: 11pt; color: #4b5563;">วันที่ ....../....../..........</div>
    </div>
  </div>
</body>
</html>`;
}
