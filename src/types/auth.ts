export type UserRole =
  | "REQUESTER"
  | "PLAN_ADMIN"
  | "FINANCE_PROCUREMENT"
  | "ADMIN"
  | "APPROVER"
  | "DEPT_VERIFIER";

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
  accessToken?: string;
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

/**
 * KKU Employee API v3 Token & Raw Response Types
 * Aligned with api-v3-employee.postman_collection.json
 */
export interface KKUEmployeeTokenResponse {
  type: string;
  token: string;
}

export interface KKUEmployeeRawRecord {
  employee_id?: string;
  employeeId?: string;
  citizen_id?: string;
  citizenId?: string;
  thai_title?: string;
  thaiTitle?: string;
  thai_firstname?: string;
  thaiFirstName?: string;
  thai_lastname?: string;
  thaiLastName?: string;
  thai_fullname?: string;
  thaiFullName?: string;
  english_title?: string;
  englishTitle?: string;
  english_firstname?: string;
  englishFirstName?: string;
  english_lastname?: string;
  englishLastName?: string;
  english_fullname?: string;
  englishFullName?: string;
  email?: string;
  faculty_code?: string;
  facultyCode?: string;
  faculty_name?: string;
  facultyName?: string;
  department_code?: string;
  departmentCode?: string;
  department_name?: string;
  departmentName?: string;
  position_name?: string;
  positionName?: string;
  position_type?: string;
  positionType?: string;
  status?: string;
  [key: string]: any;
}

export interface KKUEmployeeQueryParams {
  id?: string;
  citizenId?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
}

/**
 * KKU SSONext API Request & Response Types
 * Aligned with KKU_SSONext.postman_collection.json
 */
export interface KKUSSONextTokenRequest {
  code: string;
  redirectUrl: string;
  clientId: string;
  clientSecret: string;
}

export interface KKUSSONextTokenResponse {
  accessToken: string;
  tokenType?: string;
  expiresIn?: number;
  refreshToken?: string;
}

export interface KKUSSONextUserProfile {
  id?: string;
  employeeId?: string;
  studentId?: string;
  email: string;
  thaiTitle?: string;
  thaiFirstName?: string;
  thaiLastName?: string;
  thaiFullName?: string;
  englishTitle?: string;
  englishFirstName?: string;
  englishLastName?: string;
  englishFullName?: string;
  faculty?: string;
  department?: string;
  organization?: string;
  position?: string;
  userType?: "STAFF" | "STUDENT" | "ALUMNI" | "GUEST";
  [key: string]: any;
}

export interface KKUSSONextStatusResponse {
  status: string;
  active?: boolean;
  valid?: boolean;
  expiresAt?: string | number;
  user?: Partial<KKUSSONextUserProfile>;
  [key: string]: any;
}


