import { NextRequest, NextResponse } from "next/server";
import { MOCK_USERS } from "@/lib/auth/mock-auth";

export async function POST(req: NextRequest) {
  try {
    const { role } = await req.json();
    const targetKey = (role || "requester").toLowerCase();

    if (!MOCK_USERS[targetKey]) {
      return NextResponse.json({ error: "Invalid role key" }, { status: 400 });
    }

    const response = NextResponse.json({
      success: true,
      user: MOCK_USERS[targetKey],
    });

    response.cookies.set("specwise_session_role", targetKey, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Failed to switch role" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    availableRoles: Object.keys(MOCK_USERS).map((key) => ({
      key,
      ...MOCK_USERS[key],
    })),
  });
}
