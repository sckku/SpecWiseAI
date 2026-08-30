import {
  KKUEmployeeProfile,
  KKUEmployeeRawRecord,
  KKUEmployeeQueryParams,
  KKUEmployeeTokenResponse,
} from "@/types/auth";
import { MOCK_USERS } from "../auth/mock-auth";

/**
 * KKU Employee API v3 Client
 * Fully standardized and aligned with references/api-v3-employee.postman_collection.json
 *
 * Endpoints:
 * 1. Token Exchange:
 *    POST https://api.kku.ac.th/v3/auth/token
 *    Content-Type: application/x-www-form-urlencoded
 *    Body: { client_id, secret_key } -> { type: "Bearer", token: string }
 *
 * 2. Filter by Employee ID:
 *    GET https://api.kku.ac.th/v3/hr/employee/filter/id/{employee_id}
 *    Header: Authorization: Bearer <token>
 *
 * 3. Filter by Citizen ID:
 *    GET https://api.kku.ac.th/v3/hr/employee/filter/citizenid/{citizen_id}
 *    Header: Authorization: Bearer <token>
 *
 * 4. Filter by Email:
 *    GET https://api.kku.ac.th/v3/hr/employee/filter/email/{email}
 *    Header: Authorization: Bearer <token>
 *
 * 5. Filter by Firstname & Lastname:
 *    GET https://api.kku.ac.th/v3/hr/employee/filter/firstname/{firstname}/lastname/{lastname}
 *    Header: Authorization: Bearer <token>
 */

export class KKUEmployeeApiClient {
  private apiBaseUrl: string;
  private clientId: string;
  private secretKey: string;
  private isMock: boolean;
  private cachedToken: { token: string; expiresAt: number } | null = null;

  constructor(options?: {
    apiBaseUrl?: string;
    clientId?: string;
    secretKey?: string;
    isMock?: boolean;
  }) {
    this.apiBaseUrl = (
      options?.apiBaseUrl ||
      process.env.KKU_EMPLOYEE_API_URL ||
      "https://api.kku.ac.th/v3"
    ).replace(/\/+$/, "");

    this.clientId =
      options?.clientId ||
      process.env.KKU_EMPLOYEE_CLIENT_ID ||
      process.env.KKU_EMPLOYEE_API_KEY ||
      "";

    this.secretKey =
      options?.secretKey ||
      process.env.KKU_EMPLOYEE_SECRET_KEY ||
      "";

    this.isMock =
      options?.isMock !== undefined
        ? options.isMock
        : process.env.ENABLE_MOCK_AUTH === "true" || !this.clientId;
  }

  /**
   * Acquire or refresh Bearer token from KKU Employee API v3
   * POST /v3/auth/token
   */
  public async getToken(forceRefresh = false): Promise<string | null> {
    if (this.isMock) {
      return "mock-employee-bearer-token";
    }

    if (
      !forceRefresh &&
      this.cachedToken &&
      this.cachedToken.expiresAt > Date.now() + 60000
    ) {
      return this.cachedToken.token;
    }

    try {
      const params = new URLSearchParams();
      params.append("client_id", this.clientId);
      params.append("secret_key", this.secretKey);

      const endpoint = `${this.apiBaseUrl}/auth/token`;
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: params.toString(),
      });

      if (!res.ok) {
        const errorText = await res.text().catch(() => "");
        console.warn(
          `KKU Employee API auth/token failed (status ${res.status}): ${errorText}`
        );
        return null;
      }

      const data: KKUEmployeeTokenResponse = await res.json();
      if (data && data.token) {
        this.cachedToken = {
          token: data.token,
          expiresAt: Date.now() + 3600 * 1000,
        };
        return data.token;
      }

      console.warn("KKU Employee API auth/token did not return a token string");
      return null;
    } catch (error) {
      console.error("Failed to authenticate with KKU Employee API v3:", error);
      return null;
    }
  }

  /**
   * Internal GET request with Bearer authorization and auto-retry on 401
   */
  private async executeGet(path: string): Promise<any | null> {
    const token = await this.getToken();
    if (!token) return null;

    const endpoint = `${this.apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;

    let res = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    // If 401 Unauthorized, try refreshing token once
    if (res.status === 401 && !this.isMock) {
      const freshToken = await this.getToken(true);
      if (freshToken) {
        res = await fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${freshToken}`,
            Accept: "application/json",
          },
          next: { revalidate: 3600 },
        });
      }
    }

    if (!res.ok) {
      console.warn(`KKU Employee API GET ${path} returned status ${res.status}`);
      return null;
    }

    return await res.json();
  }

  /**
   * Query employee by Employee ID
   * GET /v3/hr/employee/filter/id/{employee_id}
   */
  public async getEmployeeById(employeeId: string): Promise<KKUEmployeeProfile | null> {
    if (!employeeId) return null;

    if (this.isMock) {
      return this.findMockProfile((u) => u.id === employeeId || employeeId.includes(u.id));
    }

    const path = `/hr/employee/filter/id/${encodeURIComponent(employeeId)}`;
    const data = await this.executeGet(path);
    return this.extractProfile(data, { employeeId });
  }

  /**
   * Query employee by Citizen ID (13 digits)
   * GET /v3/hr/employee/filter/citizenid/{citizen_id}
   */
  public async getEmployeeByCitizenId(citizenId: string): Promise<KKUEmployeeProfile | null> {
    if (!citizenId) return null;

    if (this.isMock) {
      return this.findMockProfile(() => true); // In mock mode return default mock requester
    }

    const path = `/hr/employee/filter/citizenid/${encodeURIComponent(citizenId)}`;
    const data = await this.executeGet(path);
    return this.extractProfile(data, { citizenId });
  }

  /**
   * Query employee by KKU Email
   * GET /v3/hr/employee/filter/email/{email}
   */
  public async getEmployeeByEmail(email: string): Promise<KKUEmployeeProfile | null> {
    if (!email) return null;

    if (this.isMock) {
      return this.findMockProfile((u) => u.email.toLowerCase() === email.toLowerCase());
    }

    const path = `/hr/employee/filter/email/${encodeURIComponent(email)}`;
    const data = await this.executeGet(path);
    return this.extractProfile(data, { email });
  }

  /**
   * Query employee by Firstname and Lastname
   * GET /v3/hr/employee/filter/firstname/{firstname}/lastname/{lastname}
   */
  public async getEmployeeByName(
    firstname: string,
    lastname: string
  ): Promise<KKUEmployeeProfile | null> {
    if (!firstname || !lastname) return null;

    if (this.isMock) {
      return this.findMockProfile(
        (u) =>
          u.name.toLowerCase().includes(firstname.toLowerCase()) ||
          u.thaiName.includes(firstname)
      );
    }

    const path = `/hr/employee/filter/firstname/${encodeURIComponent(
      firstname
    )}/lastname/${encodeURIComponent(lastname)}`;
    const data = await this.executeGet(path);
    return this.extractProfile(data);
  }

  /**
   * Flexible query dispatcher matching any query combination
   */
  public async queryEmployee(
    params: KKUEmployeeQueryParams
  ): Promise<KKUEmployeeProfile | null> {
    if (params.id) {
      return this.getEmployeeById(params.id);
    }
    if (params.email) {
      return this.getEmployeeByEmail(params.email);
    }
    if (params.citizenId) {
      return this.getEmployeeByCitizenId(params.citizenId);
    }
    if (params.firstname && params.lastname) {
      return this.getEmployeeByName(params.firstname, params.lastname);
    }
    return null;
  }

  /**
   * Extract and normalize raw API response record into KKUEmployeeProfile
   */
  private extractProfile(
    data: any,
    fallback?: Partial<KKUEmployeeProfile>
  ): KKUEmployeeProfile | null {
    if (!data) return null;

    const record: KKUEmployeeRawRecord = Array.isArray(data) ? data[0] : data;
    if (!record || typeof record !== "object") return null;

    return this.mapRawToProfile(record, fallback);
  }

  /**
   * Transform raw KKU HR database row into standard KKUEmployeeProfile
   */
  public mapRawToProfile(
    record: KKUEmployeeRawRecord,
    fallback?: Partial<KKUEmployeeProfile>
  ): KKUEmployeeProfile {
    const thaiTitle = record.thai_title || record.thaiTitle || "";
    const thaiFirst = record.thai_firstname || record.thaiFirstName || "";
    const thaiLast = record.thai_lastname || record.thaiLastName || "";
    const engFirst = record.english_firstname || record.englishFirstName || "";
    const engLast = record.english_lastname || record.englishLastName || "";

    const thaiFullName =
      record.thai_fullname ||
      record.thaiFullName ||
      [thaiTitle, thaiFirst, thaiLast].filter(Boolean).join(" ") ||
      fallback?.thaiFullName ||
      "";

    const englishFullName =
      record.english_fullname ||
      record.englishFullName ||
      [engFirst, engLast].filter(Boolean).join(" ") ||
      fallback?.englishFullName ||
      "";

    return {
      employeeId:
        record.employee_id ||
        record.employeeId ||
        fallback?.employeeId ||
        "",
      citizenId:
        record.citizen_id ||
        record.citizenId ||
        fallback?.citizenId ||
        "",
      thaiTitle,
      thaiFirstName: thaiFirst,
      thaiLastName: thaiLast,
      thaiFullName,
      englishFullName,
      email: record.email || fallback?.email || "",
      facultyCode: record.faculty_code || record.facultyCode || "04",
      facultyName:
        record.faculty_name ||
        record.facultyName ||
        record.faculty ||
        fallback?.facultyName ||
        "มหาวิทยาลัยขอนแก่น",
      departmentCode: record.department_code || record.departmentCode || "0401",
      departmentName:
        record.department_name ||
        record.departmentName ||
        record.department ||
        fallback?.departmentName ||
        "สังกัดมหาวิทยาลัยขอนแก่น",
      positionName:
        record.position_name ||
        record.positionName ||
        record.position ||
        fallback?.positionName ||
        "อาจารย์ / บุคลากร",
      positionType:
        record.position_type ||
        record.positionType ||
        "ข้าราชการ / พนักงานมหาวิทยาลัย",
      status:
        (record.status || "ACTIVE").toUpperCase() === "ACTIVE"
          ? "ACTIVE"
          : "INACTIVE",
    };
  }

  /**
   * Helper for resolving mock user records
   */
  private findMockProfile(
    predicate: (user: (typeof MOCK_USERS)[string]) => boolean
  ): KKUEmployeeProfile {
    const mockMatch =
      Object.values(MOCK_USERS).find(predicate) || MOCK_USERS.requester;

    const thaiParts = mockMatch.thaiName.split(" ");
    const thaiTitleAndFirst = thaiParts[0] || "";
    const thaiTitle = thaiTitleAndFirst.includes(".")
      ? thaiTitleAndFirst.split(".")[0] + "."
      : "";
    const thaiFirst = thaiTitleAndFirst.replace(thaiTitle, "");
    const thaiLast = thaiParts.slice(1).join(" ");

    return {
      employeeId: mockMatch.id,
      citizenId: "1409900000000",
      thaiTitle,
      thaiFirstName: thaiFirst || "สมชาย",
      thaiLastName: thaiLast || "แก้วกล้า",
      thaiFullName: mockMatch.thaiName,
      englishFullName: mockMatch.name,
      email: mockMatch.email,
      facultyCode: "04",
      facultyName: mockMatch.faculty,
      departmentCode: "0403",
      departmentName: mockMatch.department,
      positionName: mockMatch.position,
      positionType: "ข้าราชการ / พนักงานมหาวิทยาลัย",
      status: "ACTIVE",
    };
  }
}

// Singleton client instance
export const kkuEmployeeClient = new KKUEmployeeApiClient();

/**
 * Backward-compatible helper to fetch KKU Employee Profile by identifier (email or employeeId)
 */
export async function fetchKKUEmployeeProfile(
  identifier: string
): Promise<KKUEmployeeProfile | null> {
  if (!identifier) return null;
  if (identifier.includes("@")) {
    return kkuEmployeeClient.getEmployeeByEmail(identifier);
  }
  return kkuEmployeeClient.getEmployeeById(identifier);
}

/**
 * Direct helpers
 */
export async function fetchEmployeeById(id: string) {
  return kkuEmployeeClient.getEmployeeById(id);
}

export async function fetchEmployeeByCitizenId(citizenId: string) {
  return kkuEmployeeClient.getEmployeeByCitizenId(citizenId);
}

export async function fetchEmployeeByEmail(email: string) {
  return kkuEmployeeClient.getEmployeeByEmail(email);
}

export async function fetchEmployeeByName(firstname: string, lastname: string) {
  return kkuEmployeeClient.getEmployeeByName(firstname, lastname);
}
