import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isMockAuth =
  process.env.ENABLE_MOCK_AUTH === "true" &&
  process.env.NODE_ENV !== "production";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // In mock mode only, seed a default role cookie for local development.
  // In production this cookie is never auto-created: the session must come
  // from the SSONext login flow.
  if (isMockAuth) {
    const sessionRole = request.cookies.get("specwise_session_role")?.value;
    if (!sessionRole) {
      response.cookies.set("specwise_session_role", "requester", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        sameSite: "lax",
        httpOnly: true,
      });
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
