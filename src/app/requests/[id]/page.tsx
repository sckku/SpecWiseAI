"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Printer,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ShieldCheck,
  Send,
  Building,
  DollarSign,
  Layers,
  MessageSquare,
  FileCheck2,
  FileSpreadsheet,
  Download,
} from "lucide-react";
import { BudgetProposal, RequestStatus } from "@/types/budget";
import { KKUUserSession } from "@/types/auth";
import { Step1IntentView } from "@/components/wizard/Step1IntentView";
import { Step2CatalogMatchView } from "@/components/wizard/Step2CatalogMatchView";
import { Step3PriceCrossCheckView } from "@/components/wizard/Step3PriceCrossCheckView";
import { Step4BudgetAlertView } from "@/components/wizard/Step4BudgetAlertView";
import { Step5ProposalFormView } from "@/components/wizard/Step5ProposalFormView";
import { Step6NeutralSpecView } from "@/components/wizard/Step6NeutralSpecView";
import { ErrorState } from "@/components/common/ErrorState";

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [proposal, setProposal] = useState<BudgetProposal | null>(null);
  const [currentUser, setCurrentUser] = useState<KKUUserSession | null>(null);
  const [activeTab, setActiveTab] = useState<"form" | "spec" | "ai" | "comments">("form");
  const [commentText, setCommentText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<{ status: number; message: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchProposal();
    }
    // Get user session
    fetch("/api/auth/mock-switch")
      .then((res) => res.json())
      .then((data) => {
        const roleCookie = document.cookie
          .split("; ")
          .find((row) => row.startsWith("specwise_session_role="))
          ?.split("=")[1] || "requester";
        const match = data.availableRoles?.find((r: any) => r.key === roleCookie);
        if (match) setCurrentUser(match);
      })
      .catch(console.error);
  }, [id]);

  const fetchProposal = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const res = await fetch(`/api/requests/${id}`);
      const data = await res.json();
      if (!res.ok) {
        setFetchError({ status: res.status, message: data.error || "ไม่พบคำของบประมาณ" });
      } else if (data.proposal) {
        setProposal(data.proposal);
      } else {
        setFetchError({ status: 404, message: "ไม่พบข้อมูลคำของบประมาณในระบบ" });
      }
    } catch (err: any) {
      console.error(err);
      setFetchError({ status: 500, message: err.message || "เกิดข้อผิดพลาดในการโหลดข้อมูล" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransition = async (targetStatus: RequestStatus) => {
    setIsUpdating(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetStatus }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "ไม่สามารถเปลี่ยนสถานะได้");
      }
      setProposal(data.proposal);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const res = await fetch(`/api/requests/${id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentText }),
      });
      if (res.ok) {
        setCommentText("");
        fetchProposal();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (fetchError) {
    return (
      <div className="py-8">
        <ErrorState
          type={fetchError.status === 403 ? "403" : "404"}
          title={
            fetchError.status === 403
              ? "คุณไม่มีสิทธิ์เข้าถึงคำของบประมาณนี้"
              : `ไม่พบคำของบประมาณรหัส "${id}"`
          }
          description={
            fetchError.status === 403
              ? "คำของบประมาณนี้เป็นของหน่วยงานอื่น หรือยังไม่ได้รับการส่งต่อมายังบทบาทของคุณ"
              : "คำของบประมาณที่คุณกำลังค้นหาอาจถูกลบไปแล้ว หรือรหัสเอกสารไม่ถูกต้อง กรุณาตรวจสอบรหัสหรือเลือกคำขออื่นจากรายการ"
          }
          onRetry={fetchProposal}
          showHomeButton={true}
          showSearch={true}
        />
      </div>
    );
  }

  if (isLoading || !proposal) {
    return (
      <div className="py-20 text-center text-slate-500">
        <div className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-kku-600 animate-ping" />
          <span>กำลังโหลดรายละเอียดคำของบประมาณ...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Back Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <Link
          href="/dashboard"
          className="inline-flex items-center space-x-1.5 text-slate-500 hover:text-slate-900 text-sm font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปยังแดชบอร์ด</span>
        </Link>

        {/* Action Controls */}
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
          {/* Download Excel Button */}
          <a
            href={`/api/requests/${proposal.id}/export-excel`}
            download={`KKU_RequestForm_${proposal.code}.xlsx`}
            className="flex flex-1 items-center justify-center space-x-1.5 rounded-xl border border-emerald-300 bg-emerald-50/70 px-3.5 py-2 text-sm font-semibold text-emerald-800 shadow-sm transition-all hover:bg-emerald-100 sm:flex-none sm:hover:scale-102"
            title="ดาวน์โหลดไฟล์ Excel ตามรูปแบบฟอร์มทางการของมหาวิทยาลัยขอนแก่น"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>ดาวน์โหลด Excel (ฟอร์ม มข.)</span>
          </a>

          {/* Print / Export HTML Button */}
          <a
            href={`/api/requests/${proposal.id}/export-html`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center space-x-1.5 rounded-xl border border-slate-300 px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 sm:flex-none sm:hover:scale-102"
          >
            <Printer className="w-4 h-4 text-kku-700" />
            <span>พิมพ์แบบฟอร์ม มข. (PDF)</span>
          </a>

          {/* Role-Based Workflow Transition Buttons */}
          {/* 1. PLAN_ADMIN Actions (Approve / Revise / Reject) */}
          {(currentUser?.role === "PLAN_ADMIN" || currentUser?.role === "ADMIN" || currentUser?.role === "APPROVER") &&
            ["SUBMITTED", "DEPT_REVIEW", "AI_ANALYZED"].includes(proposal.status) && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleTransition("APPROVED")}
                  disabled={isUpdating}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-heading font-bold shadow-md flex items-center space-x-1.5 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>อนุมัติบรรจุในแผน</span>
                </button>
                <button
                  onClick={() => handleTransition("REVISED")}
                  disabled={isUpdating}
                  className="px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs sm:text-sm font-semibold transition-all"
                >
                  <span>ส่งกลับแก้ไข</span>
                </button>
                <button
                  onClick={() => handleTransition("REJECTED")}
                  disabled={isUpdating}
                  className="px-3.5 py-2 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs sm:text-sm font-semibold transition-all"
                >
                  <span>ไม่อนุมัติ</span>
                </button>
              </div>
            )}

          {/* 2. REQUESTER Owner Actions (Submit / Resubmit) */}
          {currentUser?.id === proposal.requesterId && (
            <>
              {proposal.status === "AI_ANALYZED" && (
                <button
                  onClick={() => handleTransition("SUBMITTED")}
                  disabled={isUpdating}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-heading font-bold shadow-md hover:scale-[1.01] transition-all flex items-center space-x-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>ส่งเสนอของบประมาณ</span>
                </button>
              )}
              {proposal.status === "REVISED" && (
                <button
                  onClick={() => handleTransition("SUBMITTED")}
                  disabled={isUpdating}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs sm:text-sm font-heading font-bold shadow-md hover:scale-[1.01] transition-all flex items-center space-x-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>ส่งคำขอที่แก้ไขแล้ว</span>
                </button>
              )}
            </>
          )}

          {/* 3. Colleague in Same Dept Banner */}
          {currentUser?.role === "REQUESTER" &&
            currentUser?.id !== proposal.requesterId &&
            proposal.department === currentUser?.department && (
              <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-1.5">
                <span>คำขอของเพื่อนร่วมสาขา ({proposal.requesterName})</span>
              </div>
            )}

          {/* 4. FINANCE_PROCUREMENT Indicator */}
          {(currentUser?.role === "FINANCE_PROCUREMENT" || currentUser?.role === "DEPT_VERIFIER") && (
            <div className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>งานคลังและพัสดุ (ตรวจสอบข้อมูล)</span>
            </div>
          )}
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm">
          {errorMsg}
        </div>
      )}

      {/* Proposal Summary Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm font-bold text-kku-700 bg-kku-50 px-2 py-0.5 rounded">
                {proposal.code}
              </span>
              <span className="text-sm text-slate-400">•</span>
              <span className="text-sm text-slate-500">{proposal.department} ({proposal.faculty})</span>
            </div>
            <h1 className="text-xl font-heading font-bold text-slate-900 mt-1">
              {proposal.title}
            </h1>
          </div>

          <div className="text-right">
            <div className="text-2xl font-heading font-bold text-slate-900">
              {Number(proposal.totalBudgetBaht).toLocaleString()}{" "}
              <span className="text-sm font-normal text-slate-500">บาท</span>
            </div>
            <div className="text-sm text-slate-500 mt-0.5">
              จำนวน {proposal.quantity} {proposal.unit} (หน่วยละ {Number(proposal.unitPriceBaht).toLocaleString()} ฿)
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex min-w-0 gap-4 overflow-x-auto border-b border-slate-200 pt-2 text-sm font-heading font-semibold">
          <button
            onClick={() => setActiveTab("form")}
            className={`pb-2.5 transition-colors border-b-2 ${
              activeTab === "form"
                ? "border-kku-700 text-kku-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            แบบฟอร์ม 8 หมวดหมู่ (KKU Proposal)
          </button>
          <button
            onClick={() => setActiveTab("spec")}
            className={`pb-2.5 transition-colors border-b-2 ${
              activeTab === "spec"
                ? "border-kku-700 text-kku-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            ร่างคุณลักษณะเฉพาะ (Neutral TOR)
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`pb-2.5 transition-colors border-b-2 ${
              activeTab === "ai"
                ? "border-kku-700 text-kku-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            ผลวิเคราะห์ AI 6 ขั้นตอน
          </button>
          <button
            onClick={() => setActiveTab("comments")}
            className={`pb-2.5 transition-colors border-b-2 flex items-center space-x-1 ${
              activeTab === "comments"
                ? "border-kku-700 text-kku-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>ความคิดเห็น / ข้อเสนอแนะ ({proposal.reviewComments?.length || 0})</span>
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === "form" && proposal.form8Sections && (
        <Step5ProposalFormView form={proposal.form8Sections} />
      )}

      {activeTab === "spec" && proposal.neutralSpec && (
        <Step6NeutralSpecView spec={proposal.neutralSpec} />
      )}

      {activeTab === "ai" && proposal.aiAnalysis && (
        <div className="space-y-6">
          <Step1IntentView intent={proposal.aiAnalysis.step1} />
          <Step2CatalogMatchView matchResult={proposal.aiAnalysis.step2} />
          <Step3PriceCrossCheckView priceCrossCheck={proposal.aiAnalysis.step3} />
          <Step4BudgetAlertView budgetAlert={proposal.aiAnalysis.step4} />
        </div>
      )}

      {activeTab === "comments" && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
          <h3 className="font-heading font-bold text-sm text-slate-900">
            บันทึกข้อเสนอแนะและการตรวจรับ
          </h3>

          <div className="space-y-3">
            {proposal.reviewComments && proposal.reviewComments.length > 0 ? (
              proposal.reviewComments.map((comm) => (
                <div key={comm.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{comm.authorName} ({comm.authorRole})</span>
                    <span className="text-slate-400 text-sm">{new Date(comm.createdAt).toLocaleString("th-TH")}</span>
                  </div>
                  <p className="text-slate-700">{comm.content}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400 py-4 text-center">ยังไม่มีความคิดเห็นหรือข้อเสนอแนะ</p>
            )}
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="pt-3 border-t border-slate-100 flex gap-2">
            <input
              type="text"
              placeholder="เพิ่มข้อเสนอแนะหรือบันทึกการตรวจสอบ..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 text-sm p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-kku-700"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold flex items-center space-x-1"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ส่ง</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
