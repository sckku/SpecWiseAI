import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/auth-options";
import { getProposalById, saveProposal, deleteProposal } from "@/lib/db/proposal-store";
import { canTransition } from "@/lib/workflow/state-machine";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const proposal = getProposalById(id);

    if (!proposal) {
      return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, proposal });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    const proposal = getProposalById(id);

    if (!proposal) {
      return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
    }

    const body = await req.json();

    // Check status transition if status is being updated
    if (body.targetStatus && body.targetStatus !== proposal.status) {
      const transition = canTransition(proposal.status, body.targetStatus, user.role);
      if (!transition.allowed) {
        return NextResponse.json({ error: transition.message }, { status: 403 });
      }
      proposal.status = body.targetStatus;
    }

    // Update fields if provided
    if (body.title) proposal.title = body.title;
    if (body.totalBudgetBaht !== undefined) proposal.totalBudgetBaht = Number(body.totalBudgetBaht);
    if (body.form8Sections) proposal.form8Sections = body.form8Sections;
    if (body.neutralSpec) proposal.neutralSpec = body.neutralSpec;
    if (body.attachments) proposal.attachments = body.attachments;

    const updated = saveProposal(proposal);

    return NextResponse.json({ success: true, proposal: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = deleteProposal(id);
    if (!success) {
      return NextResponse.json({ error: "Proposal not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
