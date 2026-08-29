import { RequestStatus } from "./budget";
import { UserRole } from "./auth";

export interface WorkflowTransitionRule {
  from: RequestStatus;
  to: RequestStatus;
  allowedRoles: UserRole[];
  actionLabelTh: string;
  actionLabelEn: string;
  requiresComment?: boolean;
}

export const WORKFLOW_TRANSITIONS: WorkflowTransitionRule[] = [
  {
    from: "DRAFT",
    to: "AI_ANALYZED",
    allowedRoles: ["REQUESTER", "ADMIN"],
    actionLabelTh: "วิเคราะห์ด้วย AI 6 ขั้นตอน",
    actionLabelEn: "Run AI 6-Step Analysis",
  },
  {
    from: "AI_ANALYZED",
    to: "DEPT_REVIEW",
    allowedRoles: ["REQUESTER", "ADMIN"],
    actionLabelTh: "ส่งหัวหน้าภาควิชา / งานแผน ตรวจสอบ",
    actionLabelEn: "Submit for Dept Review",
  },
  {
    from: "DEPT_REVIEW",
    to: "SUBMITTED",
    allowedRoles: ["DEPT_VERIFIER", "ADMIN"],
    actionLabelTh: "ผ่านการตรวจระดับภาควิชา ส่งคณะ",
    actionLabelEn: "Endorse to Faculty Level",
  },
  {
    from: "DEPT_REVIEW",
    to: "REVISED",
    allowedRoles: ["DEPT_VERIFIER", "ADMIN"],
    actionLabelTh: "ส่งกลับให้ผู้ขอแก้ไข",
    actionLabelEn: "Request Revision",
    requiresComment: true,
  },
  {
    from: "REVISED",
    to: "DEPT_REVIEW",
    allowedRoles: ["REQUESTER", "ADMIN"],
    actionLabelTh: "ส่งกลับให้ตรวจซ้ำ",
    actionLabelEn: "Resubmit Revised Proposal",
  },
  {
    from: "SUBMITTED",
    to: "APPROVED",
    allowedRoles: ["APPROVER", "ADMIN"],
    actionLabelTh: "อนุมัติบรรจุในแผนงบประมาณ",
    actionLabelEn: "Approve & Include in Budget Plan",
  },
  {
    from: "SUBMITTED",
    to: "REJECTED",
    allowedRoles: ["APPROVER", "ADMIN"],
    actionLabelTh: "ไม่อนุมัติ / ยกเลิกคำขอ",
    actionLabelEn: "Reject Request",
    requiresComment: true,
  },
];
