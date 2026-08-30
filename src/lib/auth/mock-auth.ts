import { KKUUserSession } from "@/types/auth";

/**
 * Mock Users Matrix for SpecWise AI (KKU AI Hackathon 2026)
 *
 * 3 Primary User Groups:
 * 1. ผู้ใช้งานทั่วไป (REQUESTER)
 *    - บุคลากรในหน่วยงานเดียวกัน (เช่น สาขาวิชาเคมี) สามารถดูคำขอของหน่วยงานเดียวกันได้
 *    - แก้ไขและลบได้เฉพาะคำขอของตนเอง
 *    - ต่างสาขาวิชาจะมองไม่เห็นคำขอของสาขาอื่น
 * 2. แอดมิน งานแผนและยุทธศาสตร์ (PLAN_ADMIN)
 *    - สามารถดูข้อมูลคำขอได้ทั้งหมดของทุกหน่วยงาน
 *    - ทำหน้าที่อนุมัติ (Approve) / ส่งกลับแก้ไข (Request Revision) / ไม่อนุมัติ (Reject)
 * 3. งานคลังและพัสดุ (FINANCE_PROCUREMENT)
 *    - สามารถดูข้อมูลคำขอได้ทั้งหมดของทุกหน่วยงาน
 *    - ตรวจสอบราคากลาง 4 ฐาน, สเปก, แนบข้อเสนอแนะ, Export ข้อมูล (ไม่มีปุ่มอนุมัติขั้นสุดท้าย)
 */
export const MOCK_USERS: Record<string, KKUUserSession> = {
  // กลุ่มที่ 1: ผู้ใช้งานทั่วไป (Requester 1 - สาขาวิชาเคมี)
  requester: {
    id: "emp-001",
    email: "somchai.k@kku.ac.th",
    name: "Dr. Somchai Kaewkla",
    thaiName: "ดร.สมชาย แก้วกล้า",
    faculty: "คณะวิทยาศาสตร์",
    department: "สาขาวิชาเคมี",
    position: "อาจารย์ / นักวิจัย",
    role: "REQUESTER",
  },

  // กลุ่มที่ 1: ผู้ใช้งานทั่วไป (Requester 2 - สาขาวิชาเคมี สาขาเดียวกัน เพื่อทดสอบการมองเห็นร่วมกัน)
  requester_cs2: {
    id: "emp-005",
    email: "vipada.s@kku.ac.th",
    name: "Asst. Prof. Dr. Vipada Somboon",
    thaiName: "ผศ.ดร.วิภาดา สมบูรณ์",
    faculty: "คณะวิทยาศาสตร์",
    department: "สาขาวิชาเคมี",
    position: "อาจารย์ / นักวิจัย",
    role: "REQUESTER",
  },
  requester_chem2: {
    id: "emp-005",
    email: "vipada.s@kku.ac.th",
    name: "Asst. Prof. Dr. Vipada Somboon",
    thaiName: "ผศ.ดร.วิภาดา สมบูรณ์",
    faculty: "คณะวิทยาศาสตร์",
    department: "สาขาวิชาเคมี",
    position: "อาจารย์ / นักวิจัย",
    role: "REQUESTER",
  },

  // กลุ่มที่ 1: ผู้ใช้งานทั่วไป (Requester 3 - สาขาวิชาฟิสิกส์ ต่างสาขา เพื่อทดสอบการแยกสิทธิ์)
  requester_chem: {
    id: "emp-012",
    email: "anan.s@kku.ac.th",
    name: "Assoc. Prof. Dr. Anan Sitthichai",
    thaiName: "รศ.ดร.อนันต์ สิทธิชัย",
    faculty: "คณะวิทยาศาสตร์",
    department: "สาขาวิชาฟิสิกส์",
    position: "อาจารย์ / นักวิจัย",
    role: "REQUESTER",
  },
  requester_physics: {
    id: "emp-012",
    email: "anan.s@kku.ac.th",
    name: "Assoc. Prof. Dr. Anan Sitthichai",
    thaiName: "รศ.ดร.อนันต์ สิทธิชัย",
    faculty: "คณะวิทยาศาสตร์",
    department: "สาขาวิชาฟิสิกส์",
    position: "อาจารย์ / นักวิจัย",
    role: "REQUESTER",
  },

  // กลุ่มที่ 2: แอดมิน (งานแผนและยุทธศาสตร์ - ผู้อนุมัติ)
  plan_admin: {
    id: "emp-003",
    email: "somsak.plan@kku.ac.th",
    name: "Somsak Phaendee",
    thaiName: "นายสมศักดิ์ แผนดี",
    faculty: "กองแผนงาน",
    department: "งานแผนและยุทธศาสตร์",
    position: "นักวิเคราะห์นโยบายและแผน ชำนาญการพิเศษ",
    role: "PLAN_ADMIN",
  },

  // กลุ่มที่ 3: งานคลังและพัสดุ (ดูข้อมูลได้ทั้งหมด)
  procurement: {
    id: "emp-004",
    email: "procurement.kku@kku.ac.th",
    name: "Kornkanok Petchtae",
    thaiName: "นางสาวกรกนก เพชรแท้",
    faculty: "กองคลังและพัสดุ",
    department: "งานบริหารพัสดุและทรัพย์สิน",
    position: "นักวิชาการพัสดุ ชำนาญการพิเศษ",
    role: "FINANCE_PROCUREMENT",
  },

  // Legacy / Direct Aliases for backwards compatibility:
  admin: {
    id: "emp-003",
    email: "somsak.plan@kku.ac.th",
    name: "Somsak Phaendee",
    thaiName: "นายสมศักดิ์ แผนดี",
    faculty: "กองแผนงาน",
    department: "งานแผนและยุทธศาสตร์",
    position: "นักวิเคราะห์นโยบายและแผน ชำนาญการพิเศษ",
    role: "PLAN_ADMIN",
  },
  approver: {
    id: "emp-003",
    email: "somsak.plan@kku.ac.th",
    name: "Somsak Phaendee",
    thaiName: "นายสมศักดิ์ แผนดี",
    faculty: "กองแผนงาน",
    department: "งานแผนและยุทธศาสตร์",
    position: "นักวิเคราะห์นโยบายและแผน ชำนาญการพิเศษ",
    role: "PLAN_ADMIN",
  },
  verifier: {
    id: "emp-004",
    email: "procurement.kku@kku.ac.th",
    name: "Kornkanok Petchtae",
    thaiName: "นางสาวกรกนก เพชรแท้",
    faculty: "กองคลังและพัสดุ",
    department: "งานบริหารพัสดุและทรัพย์สิน",
    position: "นักวิชาการพัสดุ ชำนาญการพิเศษ",
    role: "FINANCE_PROCUREMENT",
  },
  finance: {
    id: "emp-004",
    email: "procurement.kku@kku.ac.th",
    name: "Kornkanok Petchtae",
    thaiName: "นางสาวกรกนก เพชรแท้",
    faculty: "กองคลังและพัสดุ",
    department: "งานบริหารพัสดุและทรัพย์สิน",
    position: "นักวิชาการพัสดุ ชำนาญการพิเศษ",
    role: "FINANCE_PROCUREMENT",
  },
};

export function getMockUser(roleKey = "requester"): KKUUserSession {
  return MOCK_USERS[roleKey.toLowerCase()] || MOCK_USERS.requester;
}
