import { CatalogMatchResult } from "./catalog";

// Step 1: Intent Parsing Output
export interface Step1IntentResult {
  itemCategory: string;
  rawItemName: string;
  objective: string;
  quantity: number;
  unit: string;
  totalProposedBudget: number;
  unitProposedPrice: number;
  urgencyReason?: string;
  targetDepartment?: string;
}

// Step 2: Standard Name Matching Output
export type Step2StandardNameResult = CatalogMatchResult;

// Step 3: Multi-Source Price Cross-Check Output
export interface PriceSourceItem {
  sourceId: "budget_bureau" | "de_ministry" | "kku_standard" | "historical_quotation";
  sourceName: string;
  found: boolean;
  unitPrice?: number;
  docRef?: string;
  notes?: string;
}

export interface Step3PriceCrossCheckResult {
  itemName: string;
  sources: PriceSourceItem[];
  minStandardPrice: number;
  maxStandardPrice: number;
  benchmarkVarianceBaht: number;
  benchmarkVariancePercent: number;
}

// Step 4: Budget Reasonableness & Procurement Alert Output
export type AlertLevel = "GREEN_MATCH" | "AMBER_ALERT" | "CUSTOM_NON_STANDARD";

export interface Step4BudgetAlertResult {
  alertLevel: AlertLevel;
  statusLabel: string;
  proposedUnitPrice: number;
  standardUnitPrice: number;
  priceDifference: number;
  differencePercentage: number;
  reasoning: string;
  guidance: string[];
  requiredAttachments: {
    threeQuotationsRequired: boolean;
    academicJustificationRequired: boolean;
    feasibilityStudyRequired: boolean; // if >= 10M THB
    functionalSpecRequired: boolean;
  };
}

// Step 5: Draft 8-Section Standard Budget Form Output
export interface KKUBudgetForm8Sections {
  section1BasicInfo: {
    agency: string;
    itemName: string;
    quantity: number;
    unit: string;
    budgetBaht: number;
    unitPriceBaht: number;
    plan: string;
    subPlan: string;
    project: string;
    objective: string;
    equipmentType: string;
    procurementType: string;
    sCurve: string;
    sdgs: string[];
  };
  section2Necessity: {
    details: string;
    installationLocation: string;
    targetCurriculum: string;
    userCount: number;
    impactIfNotFunded: string;
    urgency: string;
  };
  section3AttachmentsChecklist: {
    photos: boolean;
    specPdf: boolean;
    quotationsPdf: boolean;
    feasibilityStudyRequired: boolean;
  };
  section4QuotationComparison: {
    vendor1: { name: string; price: number };
    vendor2: { name: string; price: number };
    vendor3: { name: string; price: number };
    selectedVendorIndex: number;
    notes: string;
  };
  section5StandardComparison: {
    ref1: string;
    ref2: string;
    notes: string;
  };
  section6Readiness: {
    procurementReadiness: string;
    contractSigning: string;
    installationDelivery: string;
  };
  section7SpecSummary: {
    generalSpec: string;
    technicalSpec: string;
    accessories: string;
  };
  section8AdditionalNotes: string;
}

// Step 6: Draft Neutral Technical Specification (TOR)
export interface SpecCategory {
  categoryName: string;
  items: string[];
}

export interface Step6NeutralSpecResult {
  specTitle: string;
  disclaimer: string;
  categories: SpecCategory[];
  brandLinterIssues: {
    detectedBrand: string;
    suggestedReplacement: string;
    line: string;
  }[];
}

// Complete 6-Step Analysis Package
export interface Full6StepAnalysis {
  step1: Step1IntentResult;
  step2: Step2StandardNameResult;
  step3: Step3PriceCrossCheckResult;
  step4: Step4BudgetAlertResult;
  step5: KKUBudgetForm8Sections;
  step6: Step6NeutralSpecResult;
  completedAt: string;
}
