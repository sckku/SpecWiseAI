import { describe, it, expect } from "vitest";
import { canTransition } from "@/lib/workflow/state-machine";

describe("Workflow State Machine & RBAC", () => {
  it("should allow Requester to transition DRAFT -> AI_ANALYZED", () => {
    const res = canTransition("DRAFT", "AI_ANALYZED", "REQUESTER");
    expect(res.allowed).toBe(true);
  });

  it("should allow Requester to submit AI_ANALYZED -> DEPT_REVIEW", () => {
    const res = canTransition("AI_ANALYZED", "DEPT_REVIEW", "REQUESTER");
    expect(res.allowed).toBe(true);
  });

  it("should block Requester from approving DEPT_REVIEW directly", () => {
    const res = canTransition("DEPT_REVIEW", "SUBMITTED", "REQUESTER");
    expect(res.allowed).toBe(false);
  });

  it("should allow DEPT_VERIFIER to endorse DEPT_REVIEW -> SUBMITTED", () => {
    const res = canTransition("DEPT_REVIEW", "SUBMITTED", "DEPT_VERIFIER");
    expect(res.allowed).toBe(true);
  });

  it("should allow APPROVER to grant final approval SUBMITTED -> APPROVED", () => {
    const res = canTransition("SUBMITTED", "APPROVED", "APPROVER");
    expect(res.allowed).toBe(true);
  });

  it("should allow ADMIN to transition valid states", () => {
    const res = canTransition("SUBMITTED", "APPROVED", "ADMIN");
    expect(res.allowed).toBe(true);
  });
});
