import { NextResponse } from "next/server";
import { calculateDashboardMetrics } from "@/lib/db/proposal-store";

export async function GET() {
  try {
    const metrics = calculateDashboardMetrics();
    return NextResponse.json({ success: true, metrics });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
