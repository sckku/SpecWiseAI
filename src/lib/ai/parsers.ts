import { z } from "zod";

export const Step1IntentSchema = z.object({
  itemCategory: z.string(),
  rawItemName: z.string(),
  objective: z.string(),
  quantity: z.number().int().positive(),
  unit: z.string().default("เครื่อง"),
  totalProposedBudget: z.number().positive(),
  unitProposedPrice: z.number().positive(),
  urgencyReason: z.string().optional(),
  targetDepartment: z.string().optional(),
});

export const Step2StandardMatchSchema = z.object({
  isMatched: z.boolean(),
  matchStatus: z.enum(["matched", "partial_match", "non_standard"]),
  rawName: z.string(),
  recommendedStandardName: z.string().nullable(),
  standardUnitPrice: z.number().nullable(),
  evidence: z
    .object({
      source: z.string(),
      page: z.number().optional(),
      itemNo: z.string().optional(),
      description: z.string(),
    })
    .nullable(),
  comparisonNotes: z.string(),
});

export const Step3PriceCrossCheckSchema = z.object({
  itemName: z.string(),
  sources: z.array(
    z.object({
      sourceId: z.enum(["budget_bureau", "de_ministry", "kku_standard", "historical_quotation"]),
      sourceName: z.string(),
      found: z.boolean(),
      unitPrice: z.number().optional(),
      docRef: z.string().optional(),
      notes: z.string().optional(),
    })
  ),
  minStandardPrice: z.number(),
  maxStandardPrice: z.number(),
  benchmarkVarianceBaht: z.number().default(0),
  benchmarkVariancePercent: z.number().default(0),
});

export const Step4BudgetAlertSchema = z.object({
  alertLevel: z.enum(["GREEN_MATCH", "AMBER_ALERT", "CUSTOM_NON_STANDARD"]),
  statusLabel: z.string(),
  proposedUnitPrice: z.number(),
  standardUnitPrice: z.number(),
  priceDifference: z.number(),
  differencePercentage: z.number(),
  reasoning: z.string(),
  guidance: z.array(z.string()),
  requiredAttachments: z.object({
    threeQuotationsRequired: z.boolean(),
    academicJustificationRequired: z.boolean(),
    feasibilityStudyRequired: z.boolean(),
    functionalSpecRequired: z.boolean(),
  }),
});

export const Step5BudgetFormSchema = z.object({
  section1BasicInfo: z.object({
    agency: z.string(),
    itemName: z.string(),
    quantity: z.number(),
    unit: z.string(),
    budgetBaht: z.number(),
    unitPriceBaht: z.number(),
    plan: z.string(),
    subPlan: z.string(),
    project: z.string(),
    objective: z.string(),
    equipmentType: z.string(),
    procurementType: z.string(),
    sCurve: z.string(),
    sdgs: z.array(z.string()),
  }),
  section2Necessity: z.object({
    details: z.string(),
    installationLocation: z.string(),
    targetCurriculum: z.string(),
    userCount: z.number(),
    impactIfNotFunded: z.string(),
    urgency: z.string(),
  }),
  section3AttachmentsChecklist: z.object({
    photos: z.boolean(),
    specPdf: z.boolean(),
    quotationsPdf: z.boolean(),
    feasibilityStudyRequired: z.boolean(),
  }),
  section4QuotationComparison: z.object({
    vendor1: z.object({ name: z.string(), price: z.number() }),
    vendor2: z.object({ name: z.string(), price: z.number() }),
    vendor3: z.object({ name: z.string(), price: z.number() }),
    selectedVendorIndex: z.number().default(1),
    notes: z.string(),
  }),
  section5StandardComparison: z.object({
    ref1: z.string(),
    ref2: z.string(),
    notes: z.string(),
  }),
  section6Readiness: z.object({
    procurementReadiness: z.string(),
    contractSigning: z.string(),
    installationDelivery: z.string(),
  }),
  section7SpecSummary: z.object({
    generalSpec: z.string(),
    technicalSpec: z.string(),
    accessories: z.string(),
  }),
  section8AdditionalNotes: z.string(),
});

export const Step6NeutralSpecSchema = z.object({
  specTitle: z.string(),
  disclaimer: z.string(),
  categories: z.array(
    z.object({
      categoryName: z.string(),
      items: z.array(z.string()),
    })
  ),
  brandLinterIssues: z.array(
    z.object({
      detectedBrand: z.string(),
      suggestedReplacement: z.string(),
      line: z.string(),
    })
  ),
});
