import { Full6StepAnalysis, KKUBudgetForm8Sections, Step6NeutralSpecResult } from "./ai";

export type RequestStatus =
  | "DRAFT"
  | "AI_ANALYZED"
  | "DEPT_REVIEW"
  | "SUBMITTED"
  | "REVISED"
  | "APPROVED"
  | "REJECTED";

export interface BudgetProposal {
  id: string;
  code: string; // e.g. REQ-2026-001
  title: string;
  faculty: string;
  department: string;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  status: RequestStatus;
  fiscalYear: number; // e.g. 2570
  category: string;
  totalBudgetBaht: number;
  quantity: number;
  unit: string;
  unitPriceBaht: number;
  standardMatched: boolean;
  standardName?: string;
  alertLevel: "GREEN_MATCH" | "AMBER_ALERT" | "CUSTOM_NON_STANDARD";
  form8Sections?: KKUBudgetForm8Sections;
  neutralSpec?: Step6NeutralSpecResult;
  aiAnalysis?: Full6StepAnalysis;
  attachments?: AttachmentItem[];
  reviewComments?: ReviewComment[];
  createdAt: string;
  updatedAt: string;
}

export interface AttachmentItem {
  id: string;
  type: "PHOTO_EQUIPMENT" | "SPEC_PDF" | "QUOTATIONS_3_PDF" | "FEASIBILITY_PDF";
  fileName: string;
  fileSize: number;
  contentType: string;
  storageKey: string;
  url?: string;
  uploadedAt: string;
}

export interface ReviewComment {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: string;
  content: string;
  action: "REQUEST_CHANGE" | "APPROVE" | "COMMENT" | "REJECT";
  createdAt: string;
}

export interface DashboardMetrics {
  totalProposals: number;
  totalBudgetRequestedBaht: number;
  approvedCount: number;
  pendingReviewCount: number;
  standardMatchRate: number; // percentage
  averageAiProcessingSec: number;
  nvaTimeSavedHours: number; // Non-Value-Add time reduction
  roiFactor: number;
  statusDistribution: { status: RequestStatus; label: string; count: number; amount: number }[];
  categoryBreakdown: { category: string; count: number; amount: number }[];
}
