import { describe, it, expect } from "vitest";
import { generateOfficialKKUProposalExcel } from "@/lib/excel/exporter";
import { getProposalById } from "@/lib/db/proposal-store";
import ExcelJS from "exceljs";

describe("Excel Export Platform (sample_requestform.xlsx format)", () => {
  it("should generate a valid XLSX buffer matching KKU golden template", async () => {
    const proposal = getProposalById("req-001");
    expect(proposal).toBeDefined();

    if (!proposal) return;

    const buffer = await generateOfficialKKUProposalExcel(proposal);
    expect(buffer).toBeDefined();
    expect(buffer.length).toBeGreaterThan(10000);

    const wb = new ExcelJS.Workbook();
    await wb.xlsx.load(buffer as any);

    const ws = wb.getWorksheet(1);
    expect(ws).toBeDefined();

    // Verify Title and Year
    expect(ws?.getCell("B2").value).toContain("2570");

    // Verify Basic Info (Section 1)
    expect(ws?.getCell("C5").value).toContain("วิทยาศาสตร์");
    expect(ws?.getCell("C6").value).toBeDefined();
    expect(Number(ws?.getCell("C7").value)).toBe(10);
    expect(Number(ws?.getCell("H7").value)).toBe(50000);
    expect(Number(ws?.getCell("C8").value)).toBe(500000);

    // Verify Standard Match Flags (Section 4)
    expect(Number(ws?.getCell("C51").value)).toBe(1);
    expect(Number(ws?.getCell("C53").value)).toBe(0);

    // Verify 3 Vendor Quotations (Section 5)
    expect(ws?.getCell("C57").value).toBeDefined();
    expect(Number(ws?.getCell("H57").value)).toBeGreaterThan(0);
  });

  it("should sanitize formula injection attempts in proposal text", async () => {
    const proposal = getProposalById("req-001");
    if (!proposal) return;

    const maliciousProposal: any = {
      ...proposal,
      title: "=SUM(1, 2)",
      department: "@calc",
      form8Sections: {
        ...proposal.form8Sections,
        section1BasicInfo: {
          ...proposal.form8Sections?.section1BasicInfo,
          itemName: "=SUM(1, 2)",
          agency: "@malicious_agency",
        },
      },
    };

    const buffer = await generateOfficialKKUProposalExcel(maliciousProposal);
    const wb = new ExcelJS.Workbook();
    await wb.xlsx.load(buffer as any);

    const ws = wb.getWorksheet(1);
    const titleVal = String(ws?.getCell("C6").value);
    const agencyVal = String(ws?.getCell("C5").value);
    // Should be escaped with quote to prevent Excel formula execution
    expect(titleVal.startsWith("'=")).toBe(true);
    expect(agencyVal.startsWith("'@")).toBe(true);
  });
});
