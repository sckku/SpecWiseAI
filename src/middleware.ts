import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Pass through all requests, attach session cookie default if not present
  const response = NextResponse.next();
  const sessionRole = request.cookies.get("specwise_session_role")?.value;

  if (!sessionRole) {
    response.cookies.set("specwise_session_role", "requester", {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
