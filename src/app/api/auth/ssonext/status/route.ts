import { NextRequest, NextResponse } from "next/server";
import { ssonextClient } from "@/lib/kku/ssonext-client";
import { getCurrentUser } from "@/lib/auth/auth-options";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("specwise_access_token")?.value;

  if (!token) {
    // If running in local mock mode, check current mock session
    const currentUser = await getCurrentUser();
    return NextResponse.json({
      active: true,
      mode: "mock",
      user: currentUser,
    });
  }

  try {
    const statusData = await ssonextClient.checkAuthStatus(token);
    const currentUser = await getCurrentUser();

    return NextResponse.json({
      active: statusData.active ?? (statusData.status === "ACTIVE"),
      status: statusData.status,
      user: currentUser,
      raw: statusData,
    });
  } catch (error: any) {
    return NextResponse.json(
      { active: false, error: error.message || "Failed to check KKU SSONext status" },
      { status: 500 }
    );
  }
}
