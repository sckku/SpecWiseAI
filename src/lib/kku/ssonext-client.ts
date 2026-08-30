import {
  KKUSSONextTokenRequest,
  KKUSSONextTokenResponse,
  KKUSSONextUserProfile,
  KKUSSONextStatusResponse,
  KKUUserSession,
  UserRole,
} from "@/types/auth";
import { MOCK_USERS } from "../auth/mock-auth";

/**
 * KKU SSONext API Client
 * Standardized according to KKU_SSONext.postman_collection.json
 *
 * Endpoints:
 * - Token Exchange: POST https://ssonext-api.kku.ac.th/auth.token (JSON: code, redirectUrl, clientId, clientSecret)
 * - User Profile:   POST https://ssonext-api.kku.ac.th/user.profile (Bearer Auth)
 * - Auth Status:    POST https://ssonext-api.kku.ac.th/auth.status (Bearer Auth)
 */

export class KKUSSONextClient {
  private apiBaseUrl: string;
  private authorizeUrl: string;
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private isMock: boolean;

  constructor(options?: {
    apiBaseUrl?: string;
    authorizeUrl?: string;
    clientId?: string;
    clientSecret?: string;
    redirectUri?: string;
    isMock?: boolean;
  }) {
    this.apiBaseUrl = (
      options?.apiBaseUrl ||
      process.env.KKU_SSO_API_URL ||
      "https://ssonext-api.kku.ac.th"
    ).replace(/\/+$/, "");

    this.authorizeUrl =
      options?.authorizeUrl ||
      process.env.KKU_SSO_AUTHORIZATION_URL ||
      "https://ssonext.kku.ac.th/oauth/authorize";

    this.clientId = options?.clientId || process.env.KKU_SSO_CLIENT_ID || "";
    this.clientSecret = options?.clientSecret || process.env.KKU_SSO_CLIENT_SECRET || "";
    this.redirectUri =
      options?.redirectUri ||
      process.env.KKU_SSO_REDIRECT_URI ||
      `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/ssonext/callback`;

    this.isMock =
      options?.isMock !== undefined
        ? options.isMock
        : (process.env.ENABLE_MOCK_AUTH === "true" || !this.clientId) &&
          process.env.NODE_ENV !== "production";
  }

  /**
   * Generates KKU SSONext OAuth2 Authorization redirect URL
   */
  public getAuthorizationUrl(customRedirectUrl?: string, state?: string): string {
    const redirectUrl = customRedirectUrl || this.redirectUri;
    const url = new URL(this.authorizeUrl);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("client_id", this.clientId || "specwise-kku-client");
    url.searchParams.set("redirect_uri", redirectUrl);
    if (state) {
      url.searchParams.set("state", state);
    }
    return url.toString();
  }

  /**
   * Exchange authorization code for access token
   * POST https://ssonext-api.kku.ac.th/auth.token
   * Payload: { code, redirectUrl, clientId, clientSecret }
   */
  public async exchangeCodeForToken(params: {
    code: string;
    redirectUrl?: string;
    clientId?: string;
    clientSecret?: string;
  }): Promise<KKUSSONextTokenResponse> {
    if (this.isMock) {
      // Mock exchange for offline development & tests
      if (params.code === "invalid-code") {
        throw new Error("Invalid or expired authorization code");
      }
      return {
        accessToken: `mock-kku-jwt-${Date.now()}-${params.code || "demo"}`,
        tokenType: "Bearer",
        expiresIn: 86400,
      };
    }

    const payload: KKUSSONextTokenRequest = {
      code: params.code,
      redirectUrl: params.redirectUrl || this.redirectUri,
      clientId: params.clientId || this.clientId,
      clientSecret: params.clientSecret || this.clientSecret,
    };

    const endpoint = `${this.apiBaseUrl}/auth.token`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `KKU SSONext Token Exchange failed with status ${response.status}: ${errorBody}`
      );
    }

    const data = await response.json();
    if (!data.accessToken) {
      throw new Error("KKU SSONext Token Exchange did not return an accessToken");
    }

    return {
      accessToken: data.accessToken,
      tokenType: data.tokenType || "Bearer",
      expiresIn: data.expiresIn,
      refreshToken: data.refreshToken,
    };
  }

  /**
   * Fetch authenticated user's profile
   * POST https://ssonext-api.kku.ac.th/user.profile
   * Header: Authorization: Bearer <accessToken>
   */
  public async getUserProfile(accessToken: string): Promise<KKUSSONextUserProfile> {
    if (this.isMock) {
      // In mock mode, resolve from sample mock data or decode token hints
      const mockRole = accessToken.includes("plan_admin") || accessToken.includes("admin") || accessToken.includes("approver")
        ? "plan_admin"
        : accessToken.includes("procurement") || accessToken.includes("verifier") || accessToken.includes("finance")
        ? "procurement"
        : accessToken.includes("chem")
        ? "requester_chem"
        : accessToken.includes("cs2")
        ? "requester_cs2"
        : "requester";

      const mock = MOCK_USERS[mockRole] || MOCK_USERS.requester;
      return {
        id: mock.id,
        employeeId: mock.id,
        email: mock.email,
        thaiFullName: mock.thaiName,
        englishFullName: mock.name,
        faculty: mock.faculty,
        department: mock.department,
        position: mock.position,
        userType: "STAFF",
      };
    }

    const endpoint = `${this.apiBaseUrl}/user.profile`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `KKU SSONext User Profile request failed with status ${response.status}: ${errorBody}`
      );
    }

    return await response.json();
  }

  /**
   * Check authentication status & token validity
   * POST https://ssonext-api.kku.ac.th/auth.status
   * Header: Authorization: Bearer <accessToken>
   */
  public async checkAuthStatus(accessToken: string): Promise<KKUSSONextStatusResponse> {
    if (this.isMock) {
      const isValid = Boolean(accessToken && !accessToken.includes("expired"));
      return {
        status: isValid ? "ACTIVE" : "EXPIRED",
        active: isValid,
        valid: isValid,
      };
    }

    const endpoint = `${this.apiBaseUrl}/auth.status`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return {
        status: "INACTIVE",
        active: false,
        valid: false,
      };
    }

    return await response.json();
  }

  /**
   * Helper to map KKU SSONext User Profile into SpecWise KKUUserSession
   */
  public mapToUserSession(
    profile: KKUSSONextUserProfile,
    assignedRole?: UserRole,
    accessToken?: string
  ): KKUUserSession {
    const thaiName =
      profile.thaiFullName ||
      [profile.thaiTitle, profile.thaiFirstName, profile.thaiLastName]
        .filter(Boolean)
        .join(" ") ||
      profile.email;

    const englishName =
      profile.englishFullName ||
      [profile.englishTitle, profile.englishFirstName, profile.englishLastName]
        .filter(Boolean)
        .join(" ") ||
      profile.email.split("@")[0];

    // Determine initial role if not explicitly provided
    let role: UserRole = assignedRole || "REQUESTER";
    if (!assignedRole) {
      const pos = (profile.position || "").toLowerCase();
      const dept = (profile.department || "").toLowerCase();
      const fac = (profile.faculty || "").toLowerCase();

      if (
        pos.includes("คณบดี") ||
        pos.includes("dean") ||
        dept.includes("งานแผน") ||
        fac.includes("กองแผนงาน") ||
        pos.includes("approver") ||
        pos.includes("plan_admin")
      ) {
        role = "PLAN_ADMIN";
      } else if (
        fac.includes("กองคลัง") ||
        dept.includes("พัสดุ") ||
        dept.includes("คลัง") ||
        pos.includes("พัสดุ") ||
        pos.includes("procurement")
      ) {
        role = "FINANCE_PROCUREMENT";
      } else if (
        pos.includes("หัวหน้า") ||
        dept.includes("นโยบาย") ||
        pos.includes("verifier")
      ) {
        role = "DEPT_VERIFIER";
      }
    }

    return {
      id: profile.employeeId || profile.id || profile.email,
      email: profile.email,
      name: englishName,
      thaiName,
      faculty: profile.faculty || profile.organization || "มหาวิทยาลัยขอนแก่น",
      department: profile.department || "สังกัดมหาวิทยาลัยขอนแก่น",
      position: profile.position || "บุคลากร / อาจารย์",
      role,
      accessToken,
    };
  }
}

// Singleton client instance
export const ssonextClient = new KKUSSONextClient();
