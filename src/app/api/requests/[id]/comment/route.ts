import { NextRequest, NextResponse } from "next/server";
import { requireUser, AuthError } from "@/lib/auth/auth-options";
import { getProposalById, saveProposal } from "@/lib/db/proposal-store";
import { ReviewComment } from "@/types/budget";
import {
  createCommentSchema,
  parseJsonBody,
  formatZodError,
  BodyTooLargeError,
  InvalidJsonError,
} from "@/lib/validation";
import { z } from "zod";

// Actions that change the review trail require elevated roles.
const ACTION_ROLE_MAP: Record<string, string[]> = {
  COMMENT: ["REQUESTER", "PLAN_ADMIN", "FINANCE_PROCUREMENT", "ADMIN", "APPROVER", "DEPT_VERIFIER"],
  REQUEST_CHANGE: ["PLAN_ADMIN", "FINANCE_PROCUREMENT", "ADMIN", "APPROVER", "DEPT_VERIFIER"],
  APPROVE: ["PLAN_ADMIN", "ADMIN", "APPROVER"],
  REJECT: ["PLAN_ADMIN", "ADMIN", "APPROVER"],
};

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const proposal = getProposalById(id);

    if (!proposal) {
      return NextResponse.json({ error: "ไม่พบคำของบประมาณ" }, { status: 404 });
    }

    // Requesters may comment on their own submissions or those in their department.
    if (
      user.role === "REQUESTER" &&
      proposal.department !== user.department &&
      proposal.requesterId !== user.id
    ) {
      return NextResponse.json(
        { error: "คุณไม่มีสิทธิ์แสดงความคิดเห็นในคำของบประมาณของหน่วยงานอื่น" },
        { status: 403 }
      );
    }

    const body = createCommentSchema.parse(await parseJsonBody(req));
    const action = body.action || "COMMENT";

    const allowedRoles = ACTION_ROLE_MAP[action] || [];
    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json(
        { error: `สิทธิ์ของคุณ (${user.role}) ไม่สามารถดำเนินการ ${action} ได้` },
        { status: 403 }
      );
    }

    const newComment: ReviewComment = {
      id: `comm-${Date.now()}`,
      authorId: user.id,
      authorName: user.thaiName,
      authorRole: user.role,
      content: body.content,
      action,
      createdAt: new Date().toISOString(),
    };

    if (!proposal.reviewComments) {
      proposal.reviewComments = [];
    }
    proposal.reviewComments.push(newComment);

    saveProposal(proposal);

    return NextResponse.json({ success: true, comment: newComment });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: formatZodError(error) }, { status: 400 });
    }
    if (error instanceof BodyTooLargeError || error instanceof InvalidJsonError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Comment API error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดภายในระบบ กรุณาลองใหม่อีกครั้ง" },
      { status: 500 }
    );
  }
}
