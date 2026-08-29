import { KKUUserSession } from "@/types/auth";

export const MOCK_USERS: Record<string, KKUUserSession> = {
  requester: {
    id: "emp-001",
    email: "somchai.k@kku.ac.th",
    name: "Somchai Kaewkla",
    thaiName: "ดร.สมชาย แก้วกล้า",
    faculty: "คณะวิทยาศาสตร์",
    department: "สาขาวิชาวิทยาการคอมพิวเตอร์",
    position: "อาจารย์ / นักวิจัย",
    role: "REQUESTER",
  },
  verifier: {
    id: "emp-002",
    email: "verifier.sci@kku.ac.th",
    name: "Prasert Rakngan",
    thaiName: "นายประเสริฐ รักงาน",
    faculty: "คณะวิทยาศาสตร์",
    department: "งานแผนและนโยบาย",
    position: "เจ้าหน้าที่บริหารงานทั่วไป ชำนาญการ",
    role: "DEPT_VERIFIER",
  },
  approver: {
    id: "emp-003",
    email: "dean.sci@kku.ac.th",
    name: "Prof. Dr. Viroj Vises",
    thaiName: "ศ.ดร.วิโรจน์ วิเศษ",
    faculty: "คณะวิทยาศาสตร์",
    department: "สำนักงานคณบดี",
    position: "คณบดีคณะวิทยาศาสตร์",
    role: "APPROVER",
  },
  admin: {
    id: "emp-004",
    email: "admin.procure@kku.ac.th",
    name: "Kornkanok Petch",
    thaiName: "นางสาวกรกนก เพชรแท้",
    faculty: "กองคลังและพัสดุ",
    department: "งานบริหารพัสดุและทรัพย์สิน",
    position: "นักวิชาการพัสดุ ชำนาญการพิเศษ",
    role: "ADMIN",
  },
};

export function getMockUser(roleKey = "requester"): KKUUserSession {
  return MOCK_USERS[roleKey.toLowerCase()] || MOCK_USERS.requester;
}
