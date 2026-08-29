import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/auth-options";
import { getProposalById, saveProposal } from "@/lib/db/proposal-store";
import { ReviewComment } from "@/types/budget";

export async function POST(
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

    const { content, action } = await req.json();

    if (!content || !content.trim()) {
      return NextResponse.json({ error: "Comment content is required" }, { status: 400 });
    }

    const newComment: ReviewComment = {
      id: `comm-${Date.now()}`,
      authorId: user.id,
      authorName: user.thaiName,
      authorRole: user.role,
      content,
      action: action || "COMMENT",
      createdAt: new Date().toISOString(),
    };

    if (!proposal.reviewComments) {
      proposal.reviewComments = [];
    }
    proposal.reviewComments.push(newComment);

    saveProposal(proposal);

    return NextResponse.json({ success: true, comment: newComment });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
