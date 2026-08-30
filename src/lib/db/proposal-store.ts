import { BudgetProposal, DashboardMetrics, RequestStatus } from "../../types/budget";
import { KKUUserSession } from "../../types/auth";
import { runFull6StepPipeline } from "../ai/mock-ai-engine";
import { MOCK_USERS } from "../auth/mock-auth";

import { ALL_40_MOCK_PROPOSALS } from "./mock-proposals";

let globalProposals: BudgetProposal[] = [...ALL_40_MOCK_PROPOSALS];

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
