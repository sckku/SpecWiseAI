export interface BrandLintIssue {
  detectedBrand: string;
  suggestedReplacement: string;
  line: string;
  category: string;
}

const FORBIDDEN_BRANDS = [
  { brand: "Dell", replacement: "เครื่องคอมพิวเตอร์ตามสมรรถนะเชิงหน้าที่ หรือเทียบเท่า" },
  { brand: "HP", replacement: "เครื่องคอมพิวเตอร์ตามสมรรถนะเชิงหน้าที่ หรือเทียบเท่า" },
  { brand: "Hewlett-Packard", replacement: "เครื่องคอมพิวเตอร์ตามสมรรถนะเชิงหน้าที่ หรือเทียบเท่า" },
  { brand: "Lenovo", replacement: "เครื่องคอมพิวเตอร์ตามสมรรถนะเชิงหน้าที่ หรือเทียบเท่า" },
  { brand: "Apple", replacement: "อุปกรณ์ประมวลผลสมรรถนะสูง หรือเทียบเท่า" },
  { brand: "MacBook", replacement: "เครื่องคอมพิวเตอร์พกพาสมรรถนะสูง หรือเทียบเท่า" },
  { brand: "Mac Studio", replacement: "เครื่องคอมพิวเตอร์ประมวลผลกราฟิก หรือเทียบเท่า" },
  { brand: "iPad", replacement: "คอมพิวเตอร์แท็บเล็ตพร้อมปากกาสไตลัส หรือเทียบเท่า" },
  { brand: "Intel Core", replacement: "หน่วยประมวลผลกลางไม่น้อยกว่า x Cores หรือเทียบเท่า" },
  { brand: "Intel Xeon", replacement: "หน่วยประมวลผลสำหรับเซิร์ฟเวอร์ หรือเทียบเท่า" },
  { brand: "AMD Ryzen", replacement: "หน่วยประมวลผลกลางไม่น้อยกว่า x Cores หรือเทียบเท่า" },
  { brand: "Nvidia RTX", replacement: "หน่วยประมวลผลกราฟิกแยก VRAM ไม่น้อยกว่า x GB หรือเทียบเท่า" },
  { brand: "Nvidia Quadro", replacement: "หน่วยประมวลผลกราฟิกสำหรับงานเวิร์กสเตชัน หรือเทียบเท่า" },
  { brand: "Cisco", replacement: "อุปกรณ์กระจายสัญญาณเครือข่ายตามมาตรฐาน IEEE หรือเทียบเท่า" },
  { brand: "Microsoft Surface", replacement: "คอมพิวเตอร์พกพาจอสัมผัส หรือเทียบเท่า" },
  { brand: "Samsung", replacement: "จอแสดงภาพตามขนาดความละเอียด หรือเทียบเท่า" },
];

export function lintProcurementSpec(specLines: string[]): {
  hasViolations: boolean;
  issues: BrandLintIssue[];
  totalViolations: number;
} {
  const issues: BrandLintIssue[] = [];

  specLines.forEach((line) => {
    for (const item of FORBIDDEN_BRANDS) {
      const regex = new RegExp(`\\b${item.brand}\\b`, "i");
      if (regex.test(line)) {
        // If line doesn't already contain "หรือเทียบเท่า" or has explicit brand model
        issues.push({
          detectedBrand: item.brand,
          suggestedReplacement: item.replacement,
          line: line.trim(),
          category: "Anti-Brand-Locking Violation (พ.ร.บ. จัดซื้อจัดจ้างฯ)",
        });
      }
    }
  });

  return {
    hasViolations: issues.length > 0,
    issues,
    totalViolations: issues.length,
  };
}
