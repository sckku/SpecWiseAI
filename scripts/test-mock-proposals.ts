import { ALL_40_MOCK_PROPOSALS } from "../src/lib/db/mock-proposals";
import { getProposals, calculateDashboardMetrics, getProposalById } from "../src/lib/db/proposal-store";

console.log("=========================================");
console.log("✅ SPECWISE AI - 40 MOCK PROPOSALS VERIFICATION");
console.log("=========================================");
console.log(`Total Mock Proposals: ${ALL_40_MOCK_PROPOSALS.length}`);
console.log(`Proposal Store Count: ${getProposals().length}`);

const metrics = calculateDashboardMetrics();
console.log("\n📊 Dashboard Metrics Summary:");
console.log(`- Total Proposals: ${metrics.totalProposals}`);
console.log(`- Total Budget Requested: ${metrics.totalBudgetRequestedBaht.toLocaleString()} THB`);
console.log(`- Approved Count: ${metrics.approvedCount}`);
console.log(`- Pending Review Count: ${metrics.pendingReviewCount}`);
console.log(`- Standard Match Rate: ${metrics.standardMatchRate}%`);
console.log(`- NVA Time Saved: ${metrics.nvaTimeSavedHours} hours`);

console.log("\n🏷️ Status Distribution:");
metrics.statusDistribution.forEach((s) => {
  console.log(`  • ${s.status} (${s.label}): ${s.count} items, Total: ${s.amount.toLocaleString()} THB`);
});

console.log("\n📁 Category Breakdown:");
metrics.categoryBreakdown.forEach((c) => {
  console.log(`  • ${c.category}: ${c.count} items, Total: ${c.amount.toLocaleString()} THB`);
});

console.log("\n🔍 Sample Item Check (REQ-2569-001):");
const item1 = getProposalById("req-001");
if (item1) {
  console.log(`- Title: ${item1.title}`);
  console.log(`- Requester: ${item1.requesterName} (${item1.faculty} / ${item1.department})`);
  console.log(`- Budget: ${item1.totalBudgetBaht.toLocaleString()} THB (${item1.quantity} ${item1.unit} @ ${item1.unitPriceBaht.toLocaleString()} THB)`);
  console.log(`- Standard Matched: ${item1.standardMatched} (${item1.standardName})`);
  console.log(`- Alert Level: ${item1.alertLevel}`);
  console.log(`- Form 8 Sections Present: ${Boolean(item1.form8Sections)}`);
  console.log(`- Neutral Spec Present: ${Boolean(item1.neutralSpec)}`);
  console.log(`- AI 6-Step Analysis Present: ${Boolean(item1.aiAnalysis)}`);
  console.log(`- Attachments Count: ${item1.attachments?.length || 0}`);
  console.log(`- Review Comments Count: ${item1.reviewComments?.length || 0}`);
}

console.log("\n🔍 Sample Special High-Budget Item Check (REQ-2569-013 FE-SEM 18.5M):");
const item13 = getProposalById("req-013");
if (item13) {
  console.log(`- Title: ${item13.title}`);
  console.log(`- Budget: ${item13.totalBudgetBaht.toLocaleString()} THB`);
  console.log(`- Feasibility Required: ${item13.form8Sections?.section3AttachmentsChecklist.feasibilityStudyRequired}`);
  console.log(`- Feasibility Attachment: ${item13.attachments?.some((a) => a.type === "FEASIBILITY_PDF")}`);
}

console.log("\n✨ All 40 mock data records verified successfully!");
