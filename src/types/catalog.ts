export type CatalogSource =
  | "BUDGET_BUREAU" // สำนักงบประมาณ
  | "DE_MINISTRY"   // กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม
  | "KKU_STANDARD"  // มหาวิทยาลัยขอนแก่น
  | "HISTORICAL";    // ประวัติจัดซื้อ/สืบราคา

export interface StandardCatalogItem {
  id: string;
  source: CatalogSource;
  sourceEdition: string;
  category: string;
  itemCode?: string;
  standardName: string;
  unitPrice: number;
  unit: string;
  specSummary?: string;
  documentPage?: number;
  effectiveDate?: string;
}

export interface CatalogMatchResult {
  isMatched: boolean;
  matchStatus: "matched" | "partial_match" | "non_standard";
  rawName: string;
  recommendedStandardName: string | null;
  standardUnitPrice: number | null;
  evidence: {
    source: string;
    page?: number;
    itemNo?: string;
    description: string;
  } | null;
  comparisonNotes: string;
}
