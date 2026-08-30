import { NextRequest, NextResponse } from "next/server";
import { requireUser, AuthError } from "@/lib/auth/auth-options";
import { getProposalById } from "@/lib/db/proposal-store";
import { generateOfficialKKUProposalHtml } from "@/lib/pdf/generator";

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

    const html = generateOfficialKKUProposalHtml(proposal);

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        // The export page contains a print button (inline onclick) but must
        // never execute attacker-injected scripts.
        "Content-Security-Policy":
          "default-src 'none'; style-src 'unsafe-inline'; img-src 'self' data:",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Export HTML error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการสร้างเอกสาร" },
      { status: 500 }
    );
  }
}
