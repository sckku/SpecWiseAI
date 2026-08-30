"use client";

import React from "react";
import { Step4BudgetAlertResult } from "@/types/ai";
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  FileCheck2,
  FileSpreadsheet,
  AlertCircle,
} from "lucide-react";

interface Step4BudgetAlertViewProps {
  budgetAlert: Step4BudgetAlertResult;
}

export function Step4BudgetAlertView({ budgetAlert }: Step4BudgetAlertViewProps) {
  const isAmber = budgetAlert.alertLevel === "AMBER_ALERT";
  const isGreen = budgetAlert.alertLevel === "GREEN_MATCH";

  return (
    <div className="space-y-4">
      {/* Alert Level Status Header */}
      <div
        className={`p-5 rounded-xl border ${
          isAmber
            ? "bg-amber-50/80 border-amber-200 text-amber-950"
            : isGreen
            ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
            : "bg-blue-50/80 border-blue-200 text-blue-950"
        }`}
      >
        <div className="flex items-start space-x-3.5">
          {isAmber ? (
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          ) : isGreen ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <HelpCircle className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
          )}
          <div>
            <span className="text-sm font-bold uppercase tracking-wider opacity-70">
              การประเมินความสมเหตุสมผลของงบประมาณ (Procurement Compliance)
            </span>
            <h4 className="text-base font-heading font-bold mt-0.5">
              {budgetAlert.statusLabel}
            </h4>
            <p className="text-sm mt-1.5 opacity-90 leading-relaxed">
              {budgetAlert.reasoning}
            </p>
          </div>
        </div>
      </div>

      {/* Actionable Guidance List */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-subtle space-y-3">
        <h5 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
          <AlertCircle className="w-4 h-4 text-kku-700" />
          <span>คำแนะนำและแนวทางปฏิบัติที่ถูกต้องตามระเบียบพัสดุฯ</span>
        </h5>
        <div className="space-y-2 pl-2">
          {budgetAlert.guidance.map((guide, idx) => (
            <div key={idx} className="flex items-start space-x-2 text-sm text-slate-700">
              <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-600 text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{guide}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Attachments Checklist */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-subtle">
        <h5 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
          <FileSpreadsheet className="w-4 h-4 text-kku-700" />
          <span>รายการเอกสารที่ต้องเตรียมแนบเพิ่มเติม</span>
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div
            className={`p-3 rounded-lg border flex items-center justify-between ${
              budgetAlert.requiredAttachments.threeQuotationsRequired
                ? "bg-amber-50/50 border-amber-200"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <span>ใบเสนอราคา 3 บริษัท (รวม PDF เดียว)</span>
            <span
              className={`px-2 py-0.5 rounded text-sm font-bold ${
                budgetAlert.requiredAttachments.threeQuotationsRequired
                  ? "bg-amber-100 text-amber-800"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {budgetAlert.requiredAttachments.threeQuotationsRequired
                ? "จำเป็นต้องแนบ"
                : "ทางเลือก"}
            </span>
          </div>

          <div
            className={`p-3 rounded-lg border flex items-center justify-between ${
              budgetAlert.requiredAttachments.academicJustificationRequired
                ? "bg-amber-50/50 border-amber-200"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <span>หนังสือชี้แจงเหตุผลความจำเป็นทางวิชาการ</span>
            <span
              className={`px-2 py-0.5 rounded text-sm font-bold ${
                budgetAlert.requiredAttachments.academicJustificationRequired
                  ? "bg-amber-100 text-amber-800"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {budgetAlert.requiredAttachments.academicJustificationRequired
                ? "จำเป็นต้องระบุ"
                : "ไม่ต้องระบุ"}
            </span>
          </div>

          <div
            className={`p-3 rounded-lg border flex items-center justify-between ${
              budgetAlert.requiredAttachments.feasibilityStudyRequired
                ? "bg-red-50/50 border-red-200"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <span>เอกสารแสดงความคุ้มค่าโครงการ (&ge; 10 ล้าน)</span>
            <span
              className={`px-2 py-0.5 rounded text-sm font-bold ${
                budgetAlert.requiredAttachments.feasibilityStudyRequired
                  ? "bg-red-100 text-red-800"
                  : "bg-slate-200 text-slate-600"
              }`}
            >
              {budgetAlert.requiredAttachments.feasibilityStudyRequired
                ? "จำเป็นต้องแนบ"
                : "ยกเว้นไม่ต้องแนบ"}
            </span>
          </div>

          <div className="p-3 rounded-lg border bg-emerald-50/50 border-emerald-200 flex items-center justify-between">
            <span>ร่างคุณลักษณะเฉพาะเชิงหน้าที่ (TOR ไม่ล็อคสเปก)</span>
            <span className="px-2 py-0.5 rounded text-sm font-bold bg-emerald-100 text-emerald-800">
              สร้างให้อัตโนมัติใน Step 6
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
