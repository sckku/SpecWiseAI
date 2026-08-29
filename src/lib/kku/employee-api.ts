import { KKUEmployeeProfile } from "@/types/auth";
import { MOCK_USERS } from "../auth/mock-auth";

const EMPLOYEE_API_URL = process.env.KKU_EMPLOYEE_API_URL || "https://api-v3.kku.ac.th/employee";
const EMPLOYEE_API_KEY = process.env.KKU_EMPLOYEE_API_KEY || "";
const isMockAuth = process.env.ENABLE_MOCK_AUTH === "true";

export async function fetchKKUEmployeeProfile(
  identifier: string // email or employeeId
): Promise<KKUEmployeeProfile | null> {
  if (isMockAuth) {
    const mockMatch = Object.values(MOCK_USERS).find(
      (u) => u.email === identifier || u.id === identifier
    );
    if (mockMatch) {
      return {
        employeeId: mockMatch.id,
        citizenId: "1409900000000",
        thaiTitle: mockMatch.thaiName.split(".")[0] || "นาย",
        thaiFirstName: mockMatch.thaiName.split(" ")[0] || "สมชาย",
        thaiLastName: mockMatch.thaiName.split(" ")[1] || "แก้วกล้า",
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

  try {
    const res = await fetch(`${EMPLOYEE_API_URL}/profile?id=${encodeURIComponent(identifier)}`, {
      headers: {
        Authorization: `Bearer ${EMPLOYEE_API_KEY}`,
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`KKU Employee API returned status ${res.status}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Failed to query KKU Employee API v3:", error);
    return null;
  }
}
