import { NextRequest, NextResponse } from "next/server";
import { ssonextClient } from "@/lib/kku/ssonext-client";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const redirectUrl = searchParams.get("redirectUrl") || undefined;
  const state = searchParams.get("state") || "specwise-auth-state";

  const isMock = process.env.ENABLE_MOCK_AUTH === "true" || !process.env.KKU_SSO_CLIENT_ID;

  if (isMock) {
    // In mock mode, immediately redirect to callback with a mock code
    const callbackUrl = new URL("/api/auth/ssonext/callback", req.url);
    callbackUrl.searchParams.set("code", "mock-sso-auth-code");
    callbackUrl.searchParams.set("state", state);
    return NextResponse.redirect(callbackUrl);
  }

  const authUrl = ssonextClient.getAuthorizationUrl(redirectUrl, state);
  return NextResponse.redirect(authUrl);
}
