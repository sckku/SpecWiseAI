import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ success: true });

  response.cookies.set("specwise_session_role", "", {
    path: "/",
    maxAge: 0,
  });
  response.cookies.set("specwise_access_token", "", {
    path: "/",
    maxAge: 0,
  });
  response.cookies.set("specwise_user_session", "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}

export async function GET(req: NextRequest) {
  const returnUrl = req.nextUrl.searchParams.get("returnUrl") || "/login";
  const response = NextResponse.redirect(new URL(returnUrl, req.url));

  response.cookies.set("specwise_session_role", "", {
    path: "/",
    maxAge: 0,
  });
  response.cookies.set("specwise_access_token", "", {
    path: "/",
    maxAge: 0,
  });
  response.cookies.set("specwise_user_session", "", {
    path: "/",
    maxAge: 0,
  });

  return response;
}
