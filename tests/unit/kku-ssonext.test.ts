import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { KKUSSONextClient } from "@/lib/kku/ssonext-client";

describe("KKU SSONext Integration Client (Postman Collection)", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should generate correct authorization redirect URL with parameters", () => {
    const client = new KKUSSONextClient({
      authorizeUrl: "https://ssonext.kku.ac.th/oauth/authorize",
      clientId: "test-client-id",
      redirectUri: "http://localhost:3000/api/auth/ssonext/callback",
      isMock: false,
    });

    const authUrl = client.getAuthorizationUrl(undefined, "test-state-123");
    const parsed = new URL(authUrl);

    expect(parsed.origin + parsed.pathname).toBe("https://ssonext.kku.ac.th/oauth/authorize");
    expect(parsed.searchParams.get("response_type")).toBe("code");
    expect(parsed.searchParams.get("client_id")).toBe("test-client-id");
    expect(parsed.searchParams.get("redirect_uri")).toBe("http://localhost:3000/api/auth/ssonext/callback");
    expect(parsed.searchParams.get("state")).toBe("test-state-123");
  });

  it("should exchange code for access token matching POST /auth.token contract", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        accessToken: "jwt-test-access-token-12345",
        tokenType: "Bearer",
        expiresIn: 86400,
      }),
    });
    global.fetch = mockFetch;

    const client = new KKUSSONextClient({
      apiBaseUrl: "https://ssonext-api.kku.ac.th",
      clientId: "test-client-id",
      clientSecret: "test-secret",
      redirectUri: "http://localhost:3000/api/auth/ssonext/callback",
      isMock: false,
    });

    const res = await client.exchangeCodeForToken({
      code: "auth-code-xyz",
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [endpoint, options] = mockFetch.mock.calls[0];
    expect(endpoint).toBe("https://ssonext-api.kku.ac.th/auth.token");
    expect(options.method).toBe("POST");
    expect(options.headers["Content-Type"]).toBe("application/json");

    const sentBody = JSON.parse(options.body);
    expect(sentBody).toEqual({
      code: "auth-code-xyz",
      redirectUrl: "http://localhost:3000/api/auth/ssonext/callback",
      clientId: "test-client-id",
      clientSecret: "test-secret",
    });

    expect(res.accessToken).toBe("jwt-test-access-token-12345");
  });

  it("should fetch user profile matching POST /user.profile contract", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        email: "somchai.k@kku.ac.th",
        thaiFullName: "ดร.สมชาย แก้วกล้า",
        englishFullName: "Somchai Kaewkla",
        faculty: "คณะวิทยาศาสตร์",
        department: "สาขาวิชาวิทยาการคอมพิวเตอร์",
        position: "อาจารย์",
      }),
    });
    global.fetch = mockFetch;

    const client = new KKUSSONextClient({
      apiBaseUrl: "https://ssonext-api.kku.ac.th",
      isMock: false,
    });

    const profile = await client.getUserProfile("test-bearer-token");

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [endpoint, options] = mockFetch.mock.calls[0];
    expect(endpoint).toBe("https://ssonext-api.kku.ac.th/user.profile");
    expect(options.method).toBe("POST");
    expect(options.headers.Authorization).toBe("Bearer test-bearer-token");
    expect(profile.email).toBe("somchai.k@kku.ac.th");
  });

  it("should check auth status matching POST /auth.status contract", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        status: "ACTIVE",
        active: true,
      }),
    });
    global.fetch = mockFetch;

    const client = new KKUSSONextClient({
      apiBaseUrl: "https://ssonext-api.kku.ac.th",
      isMock: false,
    });

    const statusRes = await client.checkAuthStatus("test-bearer-token");

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [endpoint, options] = mockFetch.mock.calls[0];
    expect(endpoint).toBe("https://ssonext-api.kku.ac.th/auth.status");
    expect(options.method).toBe("POST");
    expect(options.headers.Authorization).toBe("Bearer test-bearer-token");
    expect(statusRes.status).toBe("ACTIVE");
  });

  it("should map KKU SSONext profile to SpecWise KKUUserSession accurately", () => {
    const client = new KKUSSONextClient();

    const mappedRequester = client.mapToUserSession({
      email: "somchai.k@kku.ac.th",
      thaiFullName: "ดร.สมชาย แก้วกล้า",
      faculty: "คณะวิทยาศาสตร์",
      position: "อาจารย์",
    });
    expect(mappedRequester.role).toBe("REQUESTER");
    expect(mappedRequester.thaiName).toBe("ดร.สมชาย แก้วกล้า");

    const mappedApprover = client.mapToUserSession({
      email: "dean@kku.ac.th",
      thaiFullName: "ศ.ดร.วิโรจน์ วิเศษ",
      faculty: "คณะวิทยาศาสตร์",
      position: "คณบดีคณะวิทยาศาสตร์",
    });
    expect(mappedApprover.role).toBe("APPROVER");

    const mappedVerifier = client.mapToUserSession({
      email: "verifier@kku.ac.th",
      thaiFullName: "นายประเสริฐ รักงาน",
      department: "งานแผนและนโยบาย",
      position: "เจ้าหน้าที่งานแผน",
    });
    expect(mappedVerifier.role).toBe("DEPT_VERIFIER");
  });

  it("should seamlessly operate in offline mock mode when configured", async () => {
    const mockClient = new KKUSSONextClient({
      isMock: true,
    });

    const tokenRes = await mockClient.exchangeCodeForToken({ code: "offline-demo-code" });
    expect(tokenRes.accessToken).toContain("mock-kku-jwt");

    const profile = await mockClient.getUserProfile(tokenRes.accessToken);
    expect(profile.email).toBeTruthy();
    expect(profile.faculty).toBeTruthy();

    const status = await mockClient.checkAuthStatus(tokenRes.accessToken);
    expect(status.active).toBe(true);
  });
});
