import { describe, it, expect, vi, afterEach } from "vitest";
import {
  KKUEmployeeApiClient,
  fetchKKUEmployeeProfile,
  fetchEmployeeById,
  fetchEmployeeByCitizenId,
  fetchEmployeeByEmail,
  fetchEmployeeByName,
} from "@/lib/kku/employee-api";

describe("KKU Employee API v3 Integration Client (Postman Collection)", () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("should request token matching POST /auth/token with urlencoded body", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        type: "Bearer",
        token: "kku-v3-sample-bearer-token-12345",
      }),
    });
    global.fetch = mockFetch;

    const client = new KKUEmployeeApiClient({
      apiBaseUrl: "https://api.kku.ac.th/v3",
      clientId: "test-client-id",
      secretKey: "test-secret-key",
      isMock: false,
    });

    const token = await client.getToken();

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [endpoint, options] = mockFetch.mock.calls[0];
    expect(endpoint).toBe("https://api.kku.ac.th/v3/auth/token");
    expect(options.method).toBe("POST");
    expect(options.headers["Content-Type"]).toBe(
      "application/x-www-form-urlencoded"
    );

    const bodyParams = new URLSearchParams(options.body);
    expect(bodyParams.get("client_id")).toBe("test-client-id");
    expect(bodyParams.get("secret_key")).toBe("test-secret-key");
    expect(token).toBe("kku-v3-sample-bearer-token-12345");
  });

  it("should cache token and reuse it across multiple requests", async () => {
    const mockFetch = vi
      .fn()
      // First call for token
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          type: "Bearer",
          token: "cached-token-123",
        }),
      })
      // Second call for employee by id
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          employee_id: "emp-999",
          thai_fullname: "นายทดสอบ ทดสอบดี",
          email: "test@kku.ac.th",
          faculty_name: "คณะวิทยาศาสตร์",
        }),
      })
      // Third call for employee by email
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          employee_id: "emp-999",
          thai_fullname: "นายทดสอบ ทดสอบดี",
          email: "test@kku.ac.th",
          faculty_name: "คณะวิทยาศาสตร์",
        }),
      });

    global.fetch = mockFetch;

    const client = new KKUEmployeeApiClient({
      apiBaseUrl: "https://api.kku.ac.th/v3",
      clientId: "test-client-id",
      secretKey: "test-secret-key",
      isMock: false,
    });

    const emp1 = await client.getEmployeeById("emp-999");
    const emp2 = await client.getEmployeeByEmail("test@kku.ac.th");

    // Total 3 fetch calls: 1 auth/token + 2 API queries (token was cached for 2nd query)
    expect(mockFetch).toHaveBeenCalledTimes(3);
    expect(emp1?.employeeId).toBe("emp-999");
    expect(emp2?.email).toBe("test@kku.ac.th");
  });

  it("should query employee by ID: GET /v3/hr/employee/filter/id/{employee_id}", async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ type: "Bearer", token: "tok-abc" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          employee_id: "4401234",
          citizen_id: "1409900123456",
          thai_title: "ดร.",
          thai_firstname: "สมชาย",
          thai_lastname: "แก้วกล้า",
          thai_fullname: "ดร.สมชาย แก้วกล้า",
          english_fullname: "Dr. Somchai Kaewkla",
          email: "somchai.k@kku.ac.th",
          faculty_code: "04",
          faculty_name: "คณะวิทยาศาสตร์",
          department_code: "0403",
          department_name: "สาขาวิชาวิทยาการคอมพิวเตอร์",
          position_name: "อาจารย์",
          position_type: "พนักงานมหาวิทยาลัย",
          status: "ACTIVE",
        }),
      });
    global.fetch = mockFetch;

    const client = new KKUEmployeeApiClient({
      apiBaseUrl: "https://api.kku.ac.th/v3",
      clientId: "test-id",
      secretKey: "test-key",
      isMock: false,
    });

    const profile = await client.getEmployeeById("4401234");

    expect(profile).not.toBeNull();
    expect(profile?.employeeId).toBe("4401234");
    expect(profile?.thaiFullName).toBe("ดร.สมชาย แก้วกล้า");
    expect(profile?.facultyName).toBe("คณะวิทยาศาสตร์");

    const [, apiCall] = mockFetch.mock.calls;
    expect(apiCall[0]).toBe("https://api.kku.ac.th/v3/hr/employee/filter/id/4401234");
    expect(apiCall[1].headers.Authorization).toBe("Bearer tok-abc");
  });

  it("should query employee by Citizen ID: GET /v3/hr/employee/filter/citizenid/{citizen_id}", async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ type: "Bearer", token: "tok-abc" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [
          {
            employee_id: "4401234",
            citizen_id: "1409900123456",
            thai_fullname: "ดร.สมชาย แก้วกล้า",
            email: "somchai.k@kku.ac.th",
          },
        ],
      });
    global.fetch = mockFetch;

    const client = new KKUEmployeeApiClient({
      apiBaseUrl: "https://api.kku.ac.th/v3",
      clientId: "test-id",
      secretKey: "test-key",
      isMock: false,
    });

    const profile = await client.getEmployeeByCitizenId("1409900123456");

    expect(profile).not.toBeNull();
    expect(profile?.citizenId).toBe("1409900123456");

    const [, apiCall] = mockFetch.mock.calls;
    expect(apiCall[0]).toBe(
      "https://api.kku.ac.th/v3/hr/employee/filter/citizenid/1409900123456"
    );
  });

  it("should query employee by Email: GET /v3/hr/employee/filter/email/{email}", async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ type: "Bearer", token: "tok-abc" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          employee_id: "4401234",
          thai_fullname: "ดร.สมชาย แก้วกล้า",
          email: "somchai.k@kku.ac.th",
        }),
      });
    global.fetch = mockFetch;

    const client = new KKUEmployeeApiClient({
      apiBaseUrl: "https://api.kku.ac.th/v3",
      clientId: "test-id",
      secretKey: "test-key",
      isMock: false,
    });

    const profile = await client.getEmployeeByEmail("somchai.k@kku.ac.th");

    expect(profile?.email).toBe("somchai.k@kku.ac.th");
    const [, apiCall] = mockFetch.mock.calls;
    expect(apiCall[0]).toBe(
      "https://api.kku.ac.th/v3/hr/employee/filter/email/somchai.k%40kku.ac.th"
    );
  });

  it("should query employee by Name: GET /v3/hr/employee/filter/firstname/{firstname}/lastname/{lastname}", async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({ type: "Bearer", token: "tok-abc" }),
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => ({
          employee_id: "4401234",
          thai_firstname: "สมชาย",
          thai_lastname: "แก้วกล้า",
          thai_fullname: "ดร.สมชาย แก้วกล้า",
          email: "somchai.k@kku.ac.th",
        }),
      });
    global.fetch = mockFetch;

    const client = new KKUEmployeeApiClient({
      apiBaseUrl: "https://api.kku.ac.th/v3",
      clientId: "test-id",
      secretKey: "test-key",
      isMock: false,
    });

    const profile = await client.getEmployeeByName("สมชาย", "แก้วกล้า");

    expect(profile?.thaiFullName).toContain("สมชาย");
    const [, apiCall] = mockFetch.mock.calls;
    expect(apiCall[0]).toBe(
      `https://api.kku.ac.th/v3/hr/employee/filter/firstname/${encodeURIComponent(
        "สมชาย"
      )}/lastname/${encodeURIComponent("แก้วกล้า")}`
    );
  });

  it("should dispatch queries dynamically via queryEmployee", async () => {
    const client = new KKUEmployeeApiClient({ isMock: true });

    const byId = await client.queryEmployee({ id: "emp-001" });
    expect(byId?.email).toBe("somchai.k@kku.ac.th");

    const byEmail = await client.queryEmployee({ email: "verifier.sci@kku.ac.th" });
    expect(byEmail?.departmentName).toBe("งานแผนและนโยบาย");

    const byName = await client.queryEmployee({
      firstname: "Somchai",
      lastname: "Kaewkla",
    });
    expect(byName?.thaiFullName).toBe("ดร.สมชาย แก้วกล้า");
  });

  it("should support high-fidelity offline mock mode seamlessly", async () => {
    const mockClient = new KKUEmployeeApiClient({ isMock: true });

    const token = await mockClient.getToken();
    expect(token).toBe("mock-employee-bearer-token");

    const emp = await mockClient.getEmployeeById("emp-003");
    expect(emp?.positionName).toBe("คณบดีคณะวิทยาศาสตร์");
    expect(emp?.facultyName).toBe("คณะวิทยาศาสตร์");

    const byEmail = await mockClient.getEmployeeByEmail("admin.procure@kku.ac.th");
    expect(byEmail?.facultyName).toBe("กองคลังและพัสดุ");
  });

  it("should support backward compatible helper functions", async () => {
    const profileEmail = await fetchKKUEmployeeProfile("somchai.k@kku.ac.th");
    expect(profileEmail?.thaiFullName).toBe("ดร.สมชาย แก้วกล้า");

    const profileId = await fetchKKUEmployeeProfile("emp-002");
    expect(profileId?.departmentName).toBe("งานแผนและนโยบาย");

    const profileDirect = await fetchEmployeeById("emp-001");
    expect(profileDirect?.email).toBe("somchai.k@kku.ac.th");
  });
});
