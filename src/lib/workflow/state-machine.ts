import { RequestStatus } from "@/types/budget";
import { UserRole } from "@/types/auth";
import { WORKFLOW_TRANSITIONS } from "@/types/workflow";

export interface TransitionResult {
  allowed: boolean;
  message?: string;
  nextStatus?: RequestStatus;
}

export function canTransition(
  currentStatus: RequestStatus,
  targetStatus: RequestStatus,
  userRole: UserRole
): TransitionResult {
  const rule = WORKFLOW_TRANSITIONS.find(
    (t) => t.from === currentStatus && t.to === targetStatus
  );

  if (!rule) {
    return {
      allowed: false,
      message: `ไม่สามารถเปลี่ยนสถานะจาก ${currentStatus} ไปเป็น ${targetStatus} ได้ตามขั้นตอนการทำงาน`,
    };
  }

  if (
    !rule.allowedRoles.includes(userRole) &&
    userRole !== "ADMIN" &&
    userRole !== "PLAN_ADMIN"
  ) {
    return {
      allowed: false,
      message: `สิทธิ์ของคุณ (${userRole}) ไม่สามารถดำเนินการขั้นตอนนี้ได้ ต้องเป็น ${rule.allowedRoles.join(", ")}`,
    };
  }

  return {
    allowed: true,
    nextStatus: targetStatus,
  };
}
