import { NextRequest, NextResponse } from "next/server";
import { requireUser, AuthError } from "@/lib/auth/auth-options";
import { getProposalById } from "@/lib/db/proposal-store";
import { generateOfficialKKUProposalExcel } from "@/lib/excel/exporter";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await requireUser();
    const { id } = await params;
    const proposal = getProposalById(id);

    if (!proposal) {
      return NextResponse.json(
        { error: "ไม่พบข้อมูลรายการคำของบประมาณ" },
        { status: 404 }
      );
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

    const excelBuffer = await generateOfficialKKUProposalExcel(proposal);

    // Format safe filename in Thai/English
    const safeCode = proposal.code.replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `KKU_RequestForm_${safeCode}.xlsx`;

    return new NextResponse(new Uint8Array(excelBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "X-Content-Type-Options": "nosniff",
        "Content-Length": excelBuffer.length.toString(),
      },
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Failed to generate Excel request form:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการสร้างไฟล์ Excel" },
      { status: 500 }
    );
  }
}
