import { BudgetProposal, DashboardMetrics, RequestStatus } from "@/types/budget";
import { KKUUserSession } from "@/types/auth";
import { runFull6StepPipeline } from "../ai/mock-ai-engine";
import { MOCK_USERS } from "../auth/mock-auth";

// Initial Demo Seed Proposals
const mockRequester = MOCK_USERS.requester;
const mockVerifier = MOCK_USERS.verifier;

const demoAnalysis1 = runFull6StepPipeline(
  "ต้องการจัดซื้อเครื่องคอมพิวเตอร์ สำหรับงานประมวลผล ด้าน Data Science จำนวน 10 เครื่อง งบประมาณ 500,000 บาท",
  mockRequester
);

const demoAnalysis2 = runFull6StepPipeline(
  "จัดซื้อเครื่องคอมพิวเตอร์พกพา (Notebook) สำหรับงานวิจัยภาคสนาม จำนวน 5 เครื่อง งบประมาณ 190,000 บาท",
  mockRequester
);

const INITIAL_PROPOSALS: BudgetProposal[] = [
  {
    id: "req-001",
    code: "REQ-2569-001",
    title: "เครื่องคอมพิวเตอร์ สำหรับงานประมวลผล ด้าน Data Science",
    faculty: "คณะวิทยาศาสตร์",
    department: "สาขาวิชาวิทยาการคอมพิวเตอร์",
    requesterId: mockRequester.id,
    requesterName: mockRequester.thaiName,
    requesterEmail: mockRequester.email,
    status: "AI_ANALYZED",
    fiscalYear: 2569,
    category: "ครุภัณฑ์คอมพิวเตอร์",
    totalBudgetBaht: 500000,
    quantity: 10,
    unit: "เครื่อง",
    unitPriceBaht: 50000,
    standardMatched: true,
    standardName: "เครื่องคอมพิวเตอร์ สำหรับงานประมวลผล แบบที่ 1 *(จอแสดงภาพขนาดไม่น้อยกว่า 23 นิ้ว)",
    alertLevel: "AMBER_ALERT",
    form8Sections: demoAnalysis1.step5,
    neutralSpec: demoAnalysis1.step6,
    aiAnalysis: demoAnalysis1,
    attachments: [
      {
        id: "att-001",
        type: "PHOTO_EQUIPMENT",
        fileName: "equipment_lab_sc6401.jpg",
        fileSize: 2450000,
        contentType: "image/jpeg",
        storageKey: "photos/req-001-lab.jpg",
        uploadedAt: "2026-08-25T10:00:00Z",
      },
      {
        id: "att-002",
        type: "QUOTATIONS_3_PDF",
        fileName: "merged_3_quotations.pdf",
        fileSize: 4800000,
        contentType: "application/pdf",
        storageKey: "quotations/req-001-3quotes.pdf",
        uploadedAt: "2026-08-25T10:05:00Z",
      },
    ],
    reviewComments: [
      {
        id: "comm-001",
        authorId: mockVerifier.id,
        authorName: mockVerifier.thaiName,
        authorRole: "DEPT_VERIFIER",
        content: "รายละเอียดคุณลักษณะเฉพาะครบถ้วน ตรวจสอบใบเสนอราคา 3 เจ้าเรียบร้อยแล้ว",
        action: "COMMENT",
        createdAt: "2026-08-26T14:30:00Z",
      },
    ],
    createdAt: "2026-08-25T09:30:00Z",
    updatedAt: "2026-08-26T14:30:00Z",
  },
  {
    id: "req-002",
    code: "REQ-2569-002",
    title: "เครื่องคอมพิวเตอร์พกพา (Notebook) สำหรับงานวิจัยภาคสนาม",
    faculty: "คณะวิทยาศาสตร์",
    department: "สาขาวิชาวิทยาการคอมพิวเตอร์",
    requesterId: mockRequester.id,
    requesterName: mockRequester.thaiName,
    requesterEmail: mockRequester.email,
    status: "APPROVED",
    fiscalYear: 2569,
    category: "ครุภัณฑ์คอมพิวเตอร์",
    totalBudgetBaht: 190000,
    quantity: 5,
    unit: "เครื่อง",
    unitPriceBaht: 38000,
    standardMatched: true,
    standardName: "เครื่องคอมพิวเตอร์พกพา (Notebook) สำหรับงานประมวลผล",
    alertLevel: "GREEN_MATCH",
    form8Sections: demoAnalysis2.step5,
    neutralSpec: demoAnalysis2.step6,
    aiAnalysis: demoAnalysis2,
    createdAt: "2026-08-20T08:00:00Z",
    updatedAt: "2026-08-22T16:00:00Z",
  },
];

let globalProposals: BudgetProposal[] = [...INITIAL_PROPOSALS];

export function getProposals(): BudgetProposal[] {
  return globalProposals;
}

export function getProposalById(id: string): BudgetProposal | undefined {
  return globalProposals.find((p) => p.id === id || p.code === id);
}

export function saveProposal(proposal: BudgetProposal): BudgetProposal {
  const index = globalProposals.findIndex((p) => p.id === proposal.id);
  if (index >= 0) {
    globalProposals[index] = { ...proposal, updatedAt: new Date().toISOString() };
    return globalProposals[index];
  } else {
    globalProposals.unshift(proposal);
    return proposal;
  }
}

export function deleteProposal(id: string): boolean {
  const initialLen = globalProposals.length;
  globalProposals = globalProposals.filter((p) => p.id !== id && p.code !== id);
  return globalProposals.length < initialLen;
}

export function calculateDashboardMetrics(): DashboardMetrics {
  const total = globalProposals.length;
  const totalBudget = globalProposals.reduce((sum, p) => sum + p.totalBudgetBaht, 0);
  const approved = globalProposals.filter((p) => p.status === "APPROVED").length;
  const pending = globalProposals.filter((p) => ["DEPT_REVIEW", "SUBMITTED", "AI_ANALYZED"].includes(p.status)).length;
  const matched = globalProposals.filter((p) => p.standardMatched).length;

  const statusMap: Record<RequestStatus, { count: number; amount: number; label: string }> = {
    DRAFT: { count: 0, amount: 0, label: "แบบร่าง (Draft)" },
    AI_ANALYZED: { count: 0, amount: 0, label: "AI วิเคราะห์แล้ว" },
    DEPT_REVIEW: { count: 0, amount: 0, label: "รอตรวจระดับภาควิชา" },
    SUBMITTED: { count: 0, amount: 0, label: "ส่งระดับคณะแล้ว" },
    REVISED: { count: 0, amount: 0, label: "ส่งกลับแก้ไข" },
    APPROVED: { count: 0, amount: 0, label: "อนุมัติบรรจุแผน" },
    REJECTED: { count: 0, amount: 0, label: "ไม่อนุมัติ" },
  };

  globalProposals.forEach((p) => {
    if (statusMap[p.status]) {
      statusMap[p.status].count++;
      statusMap[p.status].amount += p.totalBudgetBaht;
    }
  });

  const categoryMap: Record<string, { count: number; amount: number }> = {};
  globalProposals.forEach((p) => {
    if (!categoryMap[p.category]) {
      categoryMap[p.category] = { count: 0, amount: 0 };
    }
    categoryMap[p.category].count++;
    categoryMap[p.category].amount += p.totalBudgetBaht;
  });

  return {
    totalProposals: total,
    totalBudgetRequestedBaht: totalBudget,
    approvedCount: approved,
    pendingReviewCount: pending,
    standardMatchRate: total > 0 ? Math.round((matched / total) * 100) : 0,
    averageAiProcessingSec: 2.8,
    nvaTimeSavedHours: Math.round(total * 14.5), // Saved 14.5 hours per proposal (drafting, price cross-checking, linter)
    roiFactor: 4.8,
    statusDistribution: Object.entries(statusMap).map(([status, val]) => ({
      status: status as RequestStatus,
      label: val.label,
      count: val.count,
      amount: val.amount,
    })),
    categoryBreakdown: Object.entries(categoryMap).map(([category, val]) => ({
      category,
      count: val.count,
      amount: val.amount,
    })),
  };
}
