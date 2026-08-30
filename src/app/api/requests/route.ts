import { NextRequest, NextResponse } from "next/server";
import { requireUser, AuthError } from "@/lib/auth/auth-options";
import { getProposals, saveProposal } from "@/lib/db/proposal-store";
import { BudgetProposal } from "@/types/budget";
import {
  createProposalSchema,
  parseJsonBody,
  formatZodError,
  BodyTooLargeError,
  InvalidJsonError,
} from "@/lib/validation";
import { z } from "zod";

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const query = searchParams.get("q");

    let proposals = getProposals();

    // Role-based visibility: requesters only see their own submissions.
    // Verifiers / approvers / admins see the full pipeline for review.
    if (user.role === "REQUESTER") {
      proposals = proposals.filter((p) => p.requesterId === user.id);
    }

    if (status && status !== "ALL") {
      proposals = proposals.filter((p) => p.status === status);
    }
    if (category && category !== "ALL") {
      proposals = proposals.filter((p) => p.category === category);
    }
    if (query) {
      const q = query.toLowerCase().slice(0, 100);
      proposals = proposals.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.code.toLowerCase().includes(q) ||
          p.department.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({ success: true, proposals });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = createProposalSchema.parse(await parseJsonBody(req));

    const currentProposals = getProposals();
    const newCount = currentProposals.length + 1;
    const code = `REQ-2569-${String(newCount).padStart(3, "0")}`;

    // Status is server-controlled: every new proposal starts as DRAFT and
    // must move through the workflow state machine (PATCH targetStatus).
    const newProposal: BudgetProposal = {
      id: `req-${Date.now()}`,
      code,
      title: body.title || "คำของบประมาณครุภัณฑ์ใหม่",
      faculty: user.faculty,
      department: user.department,
      requesterId: user.id,
      requesterName: user.thaiName,
      requesterEmail: user.email,
      status: "DRAFT",
      fiscalYear: 2569,
      category: body.category || "ครุภัณฑ์คอมพิวเตอร์",
      totalBudgetBaht: body.totalBudgetBaht ?? 0,
      quantity: body.quantity ?? 1,
      unit: body.unit || "เครื่อง",
      unitPriceBaht: body.unitPriceBaht ?? 0,
      standardMatched: Boolean(body.standardMatched),
      standardName: body.standardName || undefined,
      alertLevel: body.alertLevel || "GREEN_MATCH",
      form8Sections: body.form8Sections as BudgetProposal["form8Sections"],
      neutralSpec: body.neutralSpec as BudgetProposal["neutralSpec"],
      aiAnalysis: body.aiAnalysis as BudgetProposal["aiAnalysis"],
      attachments: body.attachments || [],
      reviewComments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveProposal(newProposal);

    return NextResponse.json({ success: true, proposal: newProposal }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}

function handleApiError(error: unknown): NextResponse {
  if (error instanceof AuthError) {
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
  if (error instanceof z.ZodError) {
    return NextResponse.json({ error: formatZodError(error) }, { status: 400 });
  }
  if (error instanceof BodyTooLargeError || error instanceof InvalidJsonError) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  console.error("Requests API error:", error);
  return NextResponse.json(
    { error: "เกิดข้อผิดพลาดภายในระบบ กรุณาลองใหม่อีกครั้ง" },
    { status: 500 }
  );
}
