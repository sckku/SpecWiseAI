import { NextRequest, NextResponse } from "next/server";
import { requireUser, requireRole, AuthError } from "@/lib/auth/auth-options";
import { getProposalById, saveProposal, deleteProposal } from "@/lib/db/proposal-store";
import { canTransition } from "@/lib/workflow/state-machine";
import {
  updateProposalSchema,
  parseJsonBody,
  formatZodError,
  BodyTooLargeError,
  InvalidJsonError,
} from "@/lib/validation";
import { z } from "zod";

export async function GET(
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

    // Visibility check:
    // - REQUESTER: allowed to view proposals in same department or own proposals
    // - PLAN_ADMIN, FINANCE_PROCUREMENT, ADMIN: allowed to view all proposals
    if (
      user.role === "REQUESTER" &&
      proposal.department !== user.department &&
      proposal.requesterId !== user.id
    ) {
      return NextResponse.json(
        { error: "คุณไม่มีสิทธิ์เข้าถึงคำของบประมาณของหน่วยงานอื่น" },
        { status: 403 }
      );
    }

    return NextResponse.json({ success: true, proposal });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function PATCH(
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

    const body = updateProposalSchema.parse(await parseJsonBody(req));

    // Content edits: owner while editable (DRAFT or REVISED), or PLAN_ADMIN / ADMIN.
    const wantsContentEdit =
      body.title !== undefined ||
      body.totalBudgetBaht !== undefined ||
      body.form8Sections !== undefined ||
      body.neutralSpec !== undefined ||
      body.attachments !== undefined;

    if (wantsContentEdit) {
      const isOwner = proposal.requesterId === user.id;
      const isAdmin = user.role === "ADMIN" || user.role === "PLAN_ADMIN";
      const editable = proposal.status === "DRAFT" || proposal.status === "REVISED";

      if (!isAdmin && !(isOwner && editable)) {
        return NextResponse.json(
          { error: "ไม่สามารถแก้ไขเนื้อหาคำของบประมาณในสถานะนี้ได้ (เฉพาะเจ้าของแบบร่าง หรือแอดมิน)" },
          { status: 403 }
        );
      }
    }

    // Status transitions: enforced by workflow state machine + role.
    if (body.targetStatus && body.targetStatus !== proposal.status) {
      const transition = canTransition(proposal.status, body.targetStatus, user.role);
      if (!transition.allowed) {
        return NextResponse.json({ error: transition.message }, { status: 403 });
      }
      proposal.status = body.targetStatus;
    }

    if (body.title !== undefined) proposal.title = body.title;
    if (body.totalBudgetBaht !== undefined) proposal.totalBudgetBaht = body.totalBudgetBaht;
    if (body.form8Sections !== undefined) {
      proposal.form8Sections = body.form8Sections as unknown as typeof proposal.form8Sections;
    }
    if (body.neutralSpec !== undefined) {
      proposal.neutralSpec = body.neutralSpec as unknown as typeof proposal.neutralSpec;
    }
    if (body.attachments !== undefined) proposal.attachments = body.attachments;

    const updated = saveProposal(proposal);

    return NextResponse.json({ success: true, proposal: updated });
  } catch (error) {
    return handleApiError(error);
  }
}

export async function DELETE(
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

    // Deletion: ADMIN / PLAN_ADMIN anytime; owner only while still a draft.
    const isOwnerDraft =
      proposal.requesterId === user.id && proposal.status === "DRAFT";
    const isAdmin = user.role === "ADMIN" || user.role === "PLAN_ADMIN";
    if (!isAdmin && !isOwnerDraft) {
      return NextResponse.json(
        { error: "เฉพาะแอดมินงานแผนฯ หรือเจ้าของแบบร่างเท่านั้นที่ลบคำของบประมาณได้" },
        { status: 403 }
      );
    }

    deleteProposal(id);
    return NextResponse.json({ success: true });
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
  console.error("Request [id] API error:", error);
  return NextResponse.json(
    { error: "เกิดข้อผิดพลาดภายในระบบ กรุณาลองใหม่อีกครั้ง" },
    { status: 500 }
  );
}
