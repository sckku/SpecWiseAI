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
    allowedRoles: ["REQUESTER", "PLAN_ADMIN", "ADMIN"],
    actionLabelTh: "วิเคราะห์ด้วย AI 6 ขั้นตอน",
    actionLabelEn: "Run AI 6-Step Analysis",
  },
  {
    from: "AI_ANALYZED",
    to: "DEPT_REVIEW",
    allowedRoles: ["REQUESTER", "PLAN_ADMIN", "ADMIN"],
    actionLabelTh: "ส่งเสนอของบประมาณ (ระดับสาขาวิชา/ภาควิชา)",
    actionLabelEn: "Submit for Dept Review",
  },
  {
    from: "AI_ANALYZED",
    to: "SUBMITTED",
    allowedRoles: ["REQUESTER", "PLAN_ADMIN", "ADMIN"],
    actionLabelTh: "ส่งเสนอของบประมาณไปยังงานแผนและยุทธศาสตร์",
    actionLabelEn: "Submit to Planning & Strategy",
  },
  {
    from: "DEPT_REVIEW",
    to: "SUBMITTED",
    allowedRoles: ["DEPT_VERIFIER", "PLAN_ADMIN", "ADMIN"],
    actionLabelTh: "ผ่านการตรวจระดับภาควิชา ส่งงานแผนและยุทธศาสตร์",
    actionLabelEn: "Endorse to University Plan Level",
  },
  {
    from: "DEPT_REVIEW",
    to: "REVISED",
    allowedRoles: ["DEPT_VERIFIER", "PLAN_ADMIN", "ADMIN"],
    actionLabelTh: "ส่งกลับให้ผู้ขอแก้ไข",
    actionLabelEn: "Request Revision",
    requiresComment: true,
  },
  {
    from: "DEPT_REVIEW",
    to: "APPROVED",
    allowedRoles: ["PLAN_ADMIN", "APPROVER", "ADMIN"],
    actionLabelTh: "อนุมัติบรรจุในแผนงบประมาณ (งานแผนและยุทธศาสตร์)",
    actionLabelEn: "Approve & Include in Budget Plan",
  },
  {
    from: "REVISED",
    to: "DEPT_REVIEW",
    allowedRoles: ["REQUESTER", "PLAN_ADMIN", "ADMIN"],
    actionLabelTh: "ส่งกลับให้ตรวจซ้ำ",
    actionLabelEn: "Resubmit Revised Proposal",
  },
  {
    from: "REVISED",
    to: "SUBMITTED",
    allowedRoles: ["REQUESTER", "PLAN_ADMIN", "ADMIN"],
    actionLabelTh: "ส่งกลับให้งานแผนฯ ตรวจซ้ำ",
    actionLabelEn: "Resubmit to Planning & Strategy",
  },
  {
    from: "SUBMITTED",
    to: "APPROVED",
    allowedRoles: ["PLAN_ADMIN", "APPROVER", "ADMIN"],
    actionLabelTh: "อนุมัติบรรจุในแผนงบประมาณ (งานแผนและยุทธศาสตร์)",
    actionLabelEn: "Approve & Include in Budget Plan",
  },
  {
    from: "SUBMITTED",
    to: "REVISED",
    allowedRoles: ["PLAN_ADMIN", "APPROVER", "ADMIN"],
    actionLabelTh: "ส่งกลับให้ผู้ขอแก้ไข (งานแผนและยุทธศาสตร์)",
    actionLabelEn: "Request Revision from Plan Division",
    requiresComment: true,
  },
  {
    from: "SUBMITTED",
    to: "REJECTED",
    allowedRoles: ["PLAN_ADMIN", "APPROVER", "ADMIN"],
    actionLabelTh: "ไม่อนุมัติ / ยกเลิกคำขอ",
    actionLabelEn: "Reject Request",
    requiresComment: true,
  },
  {
    from: "AI_ANALYZED",
    to: "APPROVED",
    allowedRoles: ["PLAN_ADMIN", "ADMIN"],
    actionLabelTh: "อนุมัติโดยตรง (Admin Fast-Track)",
    actionLabelEn: "Direct Admin Approval",
  },
];
