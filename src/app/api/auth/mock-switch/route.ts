import { NextRequest, NextResponse } from "next/server";
import { MOCK_USERS } from "@/lib/auth/mock-auth";
import { isMockAuthEnabled } from "@/lib/auth/auth-options";
import { mockSwitchSchema, parseJsonBody, formatZodError } from "@/lib/validation";
import { z } from "zod";

function mockDisabled() {
  return NextResponse.json(
    { error: "Mock authentication is disabled" },
    { status: 404 }
  );
}

export async function POST(req: NextRequest) {
  // Role-switch backdoor must never exist outside local mock development.
  if (!isMockAuthEnabled()) {
    return mockDisabled();
  }

  try {
    const body = mockSwitchSchema.parse(await parseJsonBody(req));
    const targetKey = body.role.toLowerCase();

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
      httpOnly: true,
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: formatZodError(error) }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to switch role" }, { status: 400 });
  }
}

export async function GET() {
  if (!isMockAuthEnabled()) {
    return mockDisabled();
  }

  return NextResponse.json({
    availableRoles: Object.keys(MOCK_USERS).map((key) => ({
      key,
      ...MOCK_USERS[key],
    })),
  });
}
