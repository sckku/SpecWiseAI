import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/auth-options";
import { getProposals, saveProposal } from "@/lib/db/proposal-store";
import { BudgetProposal } from "@/types/budget";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const query = searchParams.get("q");

    let proposals = getProposals();

    // Filter by role visibility
    if (user.role === "REQUESTER") {
      // Requesters see all for demo, or their department
    }

    if (status && status !== "ALL") {
      proposals = proposals.filter((p) => p.status === status);
    }
    if (category && category !== "ALL") {
      proposals = proposals.filter((p) => p.category === category);
    }
    if (query) {
      const q = query.toLowerCase();
      proposals = proposals.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.department.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ success: true, proposals });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();

    const currentProposals = getProposals();
    const newCount = currentProposals.length + 1;
    const code = `REQ-2569-${String(newCount).padStart(3, "0")}`;

    const newProposal: BudgetProposal = {
      id: `req-${Date.now()}`,
      code,
      title: body.title || body.form8Sections?.section1BasicInfo?.itemName || "คำของบประมาณครุภัณฑ์ใหม่",
      faculty: user.faculty,
      department: user.department,
      requesterId: user.id,
      requesterName: user.thaiName,
      requesterEmail: user.email,
      status: body.status || "DRAFT",
      fiscalYear: 2569,
      category: body.category || body.form8Sections?.section1BasicInfo?.equipmentType || "ครุภัณฑ์คอมพิวเตอร์",
      totalBudgetBaht: Number(body.totalBudgetBaht || body.form8Sections?.section1BasicInfo?.budgetBaht || 0),
      quantity: Number(body.quantity || body.form8Sections?.section1BasicInfo?.quantity || 1),
      unit: body.unit || body.form8Sections?.section1BasicInfo?.unit || "เครื่อง",
      unitPriceBaht: Number(body.unitPriceBaht || body.form8Sections?.section1BasicInfo?.unitPriceBaht || 0),
      standardMatched: Boolean(body.standardMatched),
      standardName: body.standardName || undefined,
      alertLevel: body.alertLevel || "GREEN_MATCH",
      form8Sections: body.form8Sections,
      neutralSpec: body.neutralSpec,
      aiAnalysis: body.aiAnalysis,
      attachments: body.attachments || [],
      reviewComments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveProposal(newProposal);

    return NextResponse.json({ success: true, proposal: newProposal }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
