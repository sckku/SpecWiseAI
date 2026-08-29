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

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [proposal, setProposal] = useState<BudgetProposal | null>(null);
  const [currentUser, setCurrentUser] = useState<KKUUserSession | null>(null);
  const [activeTab, setActiveTab] = useState<"form" | "spec" | "ai" | "comments">("form");
  const [commentText, setCommentText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
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
    try {
      const res = await fetch(`/api/requests/${id}`);
      const data = await res.json();
      if (data.proposal) setProposal(data.proposal);
    } catch (err) {
      console.error(err);
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

  if (!proposal) {
    return (
      <div className="py-20 text-center text-slate-500">
        กำลังโหลดรายละเอียดคำของบประมาณ...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Back Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-slate-500 hover:text-slate-900 text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปยังแดชบอร์ด</span>
        </Link>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Download Excel Button */}
          <a
            href={`/api/requests/${proposal.id}/export-excel`}
            download={`KKU_RequestForm_${proposal.code}.xlsx`}
            className="px-3.5 py-2 rounded-xl border border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-all hover:scale-102"
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
            className="px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition-all hover:scale-102"
          >
            <Printer className="w-4 h-4 text-kku-700" />
            <span>พิมพ์แบบฟอร์ม มข. (PDF)</span>
          </a>

          {/* Role-Based Workflow Transition Buttons */}
          {currentUser?.role === "REQUESTER" && proposal.status === "AI_ANALYZED" && (
            <button
              onClick={() => handleTransition("DEPT_REVIEW")}
              disabled={isUpdating}
              className="px-4 py-2 rounded-xl kku-gradient text-white text-xs font-heading font-bold shadow-md hover:opacity-95"
            >
              ส่งหัวหน้าภาควิชา / งานแผน ตรวจสอบ
            </button>
          )}

          {currentUser?.role === "DEPT_VERIFIER" && proposal.status === "DEPT_REVIEW" && (
            <>
              <button
                onClick={() => handleTransition("SUBMITTED")}
                disabled={isUpdating}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-heading font-bold shadow-md"
              >
                ✓ ผ่านการตรวจ ส่งระดับคณะ
              </button>
              <button
                onClick={() => handleTransition("REVISED")}
                disabled={isUpdating}
                className="px-3.5 py-2 rounded-xl border border-rose-300 bg-rose-50 text-rose-700 text-xs font-semibold"
              >
                ส่งกลับแก้ไข
              </button>
            </>
          )}

          {currentUser?.role === "APPROVER" && proposal.status === "SUBMITTED" && (
            <button
              onClick={() => handleTransition("APPROVED")}
              disabled={isUpdating}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-heading font-bold shadow-md"
            >
              ✓ อนุมัติบรรจุในแผนงบประมาณคณะ
            </button>
          )}
        </div>
      </div>

      {errorMsg && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
          {errorMsg}
        </div>
      )}

      {/* Proposal Summary Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs font-bold text-kku-700 bg-kku-50 px-2 py-0.5 rounded">
                {proposal.code}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">{proposal.department} ({proposal.faculty})</span>
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
            <div className="text-xs text-slate-500 mt-0.5">
              จำนวน {proposal.quantity} {proposal.unit} (หน่วยละ {Number(proposal.unitPriceBaht).toLocaleString()} ฿)
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 space-x-4 text-xs font-heading font-semibold pt-2">
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
                <div key={comm.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800">{comm.authorName} ({comm.authorRole})</span>
                    <span className="text-slate-400 text-[11px]">{new Date(comm.createdAt).toLocaleString("th-TH")}</span>
                  </div>
                  <p className="text-slate-700">{comm.content}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-4 text-center">ยังไม่มีความคิดเห็นหรือข้อเสนอแนะ</p>
            )}
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="pt-3 border-t border-slate-100 flex gap-2">
            <input
              type="text"
              placeholder="เพิ่มข้อเสนอแนะหรือบันทึกการตรวจสอบ..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-kku-700"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center space-x-1"
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
