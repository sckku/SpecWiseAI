import { NextRequest, NextResponse } from "next/server";
import { ssonextClient } from "@/lib/kku/ssonext-client";
import { getCurrentUser, isMockAuthEnabled } from "@/lib/auth/auth-options";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("specwise_access_token")?.value;
  const currentUser = await getCurrentUser();

  if (!token) {
    return NextResponse.json({
      active: Boolean(currentUser),
      mode: isMockAuthEnabled() ? "mock" : "sso",
      user: currentUser,
    });
  }

  try {
    const statusData = await ssonextClient.checkAuthStatus(token);
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
