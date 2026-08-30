import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isMockAuth =
  process.env.ENABLE_MOCK_AUTH === "true" &&
  (process.env.NODE_ENV !== "production" ||
    process.env.ALLOW_UAT_MOCK_AUTH === "true");

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // In mock mode only, seed a default role cookie for local development.
  // Production requires an explicit UAT opt-in before this cookie is created.
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

  // Browser pages require a real SSONext session in production. Redirecting
  // before client components mount prevents their protected API calls from
  // failing with 401 and leaving the dashboard empty.
  const { pathname, search } = request.nextUrl;
  const isPublicPage =
    pathname === "/login" ||
    pathname === "/403" ||
    pathname.startsWith("/errors");

  if (
    !isMockAuth &&
    !isPublicPage &&
    !request.cookies.has("specwise_user_session")
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("returnUrl", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)",
  ],
};
