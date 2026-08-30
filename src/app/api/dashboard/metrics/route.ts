import { NextResponse } from "next/server";
import { requireUser, AuthError } from "@/lib/auth/auth-options";
import { getDashboardMetricsAsync } from "@/lib/db/proposal-store";

export async function GET() {
  try {
    await requireUser();
    const metrics = await getDashboardMetricsAsync();
    return NextResponse.json({ success: true, metrics });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }
    console.error("Dashboard metrics error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการโหลดข้อมูลสรุป" },
      { status: 500 }
    );
  }
}
