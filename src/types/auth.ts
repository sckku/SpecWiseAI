export type UserRole = "REQUESTER" | "DEPT_VERIFIER" | "APPROVER" | "ADMIN";

export interface KKUUserSession {
  id: string;
  email: string;
  name: string;
  thaiName: string;
  faculty: string;
  department: string;
  position: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface KKUEmployeeProfile {
  employeeId: string;
  citizenId?: string;
  thaiTitle: string;
  thaiFirstName: string;
  thaiLastName: string;
  thaiFullName: string;
  englishFullName: string;
  email: string;
  facultyCode: string;
  facultyName: string;
  departmentCode: string;
  departmentName: string;
  positionName: string;
  positionType: string;
  status: "ACTIVE" | "INACTIVE";
}
