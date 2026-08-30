import { NextRequest, NextResponse } from "next/server";
import { ssonextClient } from "@/lib/kku/ssonext-client";
import { fetchKKUEmployeeProfile } from "@/lib/kku/employee-api";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const returnUrl = searchParams.get("returnUrl") || "/requests";

  if (error || !code) {
    console.error("KKU SSONext Callback Error:", error || "No code provided");
    const errorRedirect = new URL("/login?error=sso_failed", req.url);
    return NextResponse.redirect(errorRedirect);
  }

  try {
    // 1. Exchange code for accessToken according to KKU SSONext Postman Collection
    const tokenData = await ssonextClient.exchangeCodeForToken({
      code,
      redirectUrl: new URL("/api/auth/ssonext/callback", req.url).toString(),
    });

    // 2. Fetch user profile from SSONext
    const ssoProfile = await ssonextClient.getUserProfile(tokenData.accessToken);

    // 3. Optionally enrich profile with KKU Employee API v3
    const empProfile = await fetchKKUEmployeeProfile(
      ssoProfile.email || ssoProfile.employeeId || ""
    );

    // 4. Map to SpecWise user session
    const userSession = ssonextClient.mapToUserSession(
      {
        ...ssoProfile,
        thaiFullName: empProfile?.thaiFullName || ssoProfile.thaiFullName,
        faculty: empProfile?.facultyName || ssoProfile.faculty,
        department: empProfile?.departmentName || ssoProfile.department,
        position: empProfile?.positionName || ssoProfile.position,
      },
      undefined,
      tokenData.accessToken
    );

    // 5. Establish session cookies
    const response = NextResponse.redirect(new URL(returnUrl, req.url));

    // Save active user role & access token
    response.cookies.set("specwise_session_role", userSession.role.toLowerCase(), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      httpOnly: false,
    });

    response.cookies.set("specwise_access_token", tokenData.accessToken, {
      path: "/",
      maxAge: tokenData.expiresIn || 60 * 60 * 24,
      sameSite: "lax",
      httpOnly: true,
    });

    response.cookies.set("specwise_user_session", JSON.stringify(userSession), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
      httpOnly: false,
    });

    return response;
  } catch (err: any) {
    console.error("Failed to complete KKU SSONext Callback:", err);
    const errorRedirect = new URL(`/login?error=${encodeURIComponent(err.message)}`, req.url);
    return NextResponse.redirect(errorRedirect);
  }
}
