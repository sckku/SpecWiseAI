"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Send,
  Loader2,
  ChevronRight,
  ArrowRight,
  Save,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Printer,
} from "lucide-react";
import { Full6StepAnalysis } from "@/types/ai";
import { Step1IntentView } from "./Step1IntentView";
import { Step2CatalogMatchView } from "./Step2CatalogMatchView";
import { Step3PriceCrossCheckView } from "./Step3PriceCrossCheckView";
import { Step4BudgetAlertView } from "./Step4BudgetAlertView";
import { Step5ProposalFormView } from "./Step5ProposalFormView";
import { Step6NeutralSpecView } from "./Step6NeutralSpecView";

const QUICK_PROMPTS = [
  {
    label: "🖥️ AI & Data Science Workstation 10 เครื่อง (500,000 บาท)",
    prompt:
      "ต้องการจัดซื้อเครื่องคอมพิวเตอร์ สำหรับงานประมวลผล ด้าน Data Science จำนวน 10 เครื่อง งบประมาณ 500,000 บาท เพื่อใช้ในการเรียนการสอนและงานวิจัย AI",
  },
  {
    label: "💻 Notebook สำหรับงานวิจัยภาคสนาม 5 เครื่อง (190,000 บาท)",
    prompt:
      "จัดซื้อเครื่องคอมพิวเตอร์พกพา (Notebook) สำหรับงานวิจัยภาคสนาม จำนวน 5 เครื่อง งบประมาณ 190,000 บาท เครื่องละ 38,000 บาท",
  },
  {
    label: "🔬 เครื่องปั่นเหวี่ยงตกตะกอนควบคุมอุณหภูมิ 1 เครื่อง (350,000 บาท)",
    prompt:
      "จัดซื้อเครื่องปั่นเหวี่ยงตกตะกอนควบคุมอุณหภูมิ (Refrigerated Centrifuge) จำนวน 1 เครื่อง งบประมาณ 350,000 บาท สำหรับห้องปฏิบัติการวิทยาศาสตร์",
  },
];

export function SixStepWizard() {
  const router = useRouter();
  const [promptText, setPromptText] = useState(
    "ต้องการจัดซื้อเครื่องคอมพิวเตอร์ สำหรับงานประมวลผล ด้าน Data Science จำนวน 10 เครื่อง งบประมาณ 500,000 บาท"
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Full6StepAnalysis | null>(null);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isSaving, setIsSaving] = useState(false);
  const [savedProposalId, setSavedProposalId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRunAnalysis = async (customPrompt?: string) => {
    const textToRun = customPrompt || promptText;
    if (!textToRun.trim()) return;

    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/ai/analyze-full", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: textToRun }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "เกิดข้อผิดพลาดในการวิเคราะห์ AI");
      }

      setAnalysis(data.analysis);
      setActiveStep(1);
    } catch (err: any) {
      setErrorMessage(err.message || "ไม่สามารถเชื่อมต่อกับ AI Engine ได้");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveProposal = async () => {
    if (!analysis) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: analysis.step1.rawItemName,
          category: analysis.step1.itemCategory,
          totalBudgetBaht: analysis.step1.totalProposedBudget,
          quantity: analysis.step1.quantity,
          unit: analysis.step1.unit,
          unitPriceBaht: analysis.step1.unitProposedPrice,
          standardMatched: analysis.step2.isMatched,
          standardName: analysis.step2.recommendedStandardName,
          alertLevel: analysis.step4.alertLevel,
          form8Sections: analysis.step5,
          neutralSpec: analysis.step6,
          aiAnalysis: analysis,
          status: "AI_ANALYZED",
        }),
      });

      const data = await res.json();
      if (res.ok && data.proposal) {
        setSavedProposalId(data.proposal.id);
        router.push(`/requests/${data.proposal.id}`);
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const stepsList = [
    { num: 1, label: "1. สกัดความต้องการ", sub: "NLP Intent" },
    { num: 2, label: "2. เทียบชื่อมาตรฐาน", sub: "Catalog Match" },
    { num: 3, label: "3. Cross-Check ราคา", sub: "4-Source Matrix" },
    { num: 4, label: "4. ตรวจความสมเหตุสมผล", sub: "Budget Alert" },
    { num: 5, label: "5. ร่างแบบฟอร์ม 8 หมวด", sub: "KKU 8-Sections" },
    { num: 6, label: "6. ร่างสเปกเป็นกลาง", sub: "Neutral TOR" },
  ];

  return (
    <div className="space-y-6">
      {/* Top Prompt Input Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg kku-gradient flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-base text-slate-900">
                วิเคราะห์คำของบประมาณครุภัณฑ์ด้วย AI 6 ขั้นตอน
              </h2>
              <p className="text-xs text-slate-500">
                พิมพ์ความต้องการเป็นภาษาธรรมชาติ ระบบจะสกัดข้อมูล เทียบราคากลาง และร่างแบบฟอร์มอัตโนมัติ
              </p>
            </div>
          </div>
        </div>

        {/* Input & Action */}
        <div className="relative">
          <textarea
            rows={3}
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="เช่น ต้องการจัดซื้อเครื่องคอมพิวเตอร์ สำหรับงานประมวลผล ด้าน Data Science จำนวน 10 เครื่อง งบประมาณ 500,000 บาท..."
            className="w-full text-sm text-slate-800 p-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-kku-700/20 focus:border-kku-700 bg-slate-50/50 hover:bg-white transition-all shadow-inner"
          />
          <div className="flex justify-between items-center mt-2">
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PROMPTS.map((qp, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPromptText(qp.prompt);
                    handleRunAnalysis(qp.prompt);
                  }}
                  className="text-[11px] px-2.5 py-1 rounded-lg border border-slate-200 hover:border-kku-300 hover:bg-kku-50 text-slate-600 transition-colors"
                >
                  {qp.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleRunAnalysis()}
              disabled={isAnalyzing || !promptText.trim()}
              className="px-5 py-2.5 rounded-xl kku-gradient hover:opacity-95 text-white text-xs font-heading font-bold shadow-md flex items-center space-x-2 disabled:opacity-50 transition-all cursor-pointer shrink-0 ml-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>กำลังวิเคราะห์ 6 ขั้นตอน...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>รัน AI วิเคราะห์ทันที</span>
                </>
              )}
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* 6-Step Results Section */}
      {analysis && (
        <div className="space-y-4 animate-in fade-in duration-300">
          {/* Step Nav Tabs */}
          <div className="bg-white border border-slate-200 rounded-xl p-1.5 shadow-subtle grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1">
            {stepsList.map((st) => (
              <button
                key={st.num}
                onClick={() => setActiveStep(st.num)}
                className={`py-2 px-2.5 rounded-lg text-left transition-all ${
                  activeStep === st.num
                    ? "bg-kku-700 text-white shadow-sm font-semibold"
                    : "hover:bg-slate-100 text-slate-700"
                }`}
              >
                <div className="text-[11px] font-heading font-bold truncate">
                  {st.label}
                </div>
                <div
                  className={`text-[9px] uppercase tracking-wider ${
                    activeStep === st.num ? "text-kku-200" : "text-slate-400"
                  }`}
                >
                  {st.sub}
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Content */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-card">
            {activeStep === 1 && <Step1IntentView intent={analysis.step1} />}
            {activeStep === 2 && <Step2CatalogMatchView matchResult={analysis.step2} />}
            {activeStep === 3 && <Step3PriceCrossCheckView priceCrossCheck={analysis.step3} />}
            {activeStep === 4 && <Step4BudgetAlertView budgetAlert={analysis.step4} />}
            {activeStep === 5 && <Step5ProposalFormView form={analysis.step5} />}
            {activeStep === 6 && <Step6NeutralSpecView spec={analysis.step6} />}

            {/* Step Navigation & Action Bar */}
            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                ขั้นตอนที่ <strong className="text-slate-800">{activeStep}</strong> จาก 6
              </div>

              <div className="flex items-center space-x-2">
                {activeStep > 1 && (
                  <button
                    onClick={() => setActiveStep((prev) => prev - 1)}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700"
                  >
                    ย้อนกลับ
                  </button>
                )}

                {activeStep < 6 ? (
                  <button
                    onClick={() => setActiveStep((prev) => prev + 1)}
                    className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center space-x-1"
                  >
                    <span>ถัดไป</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSaveProposal}
                    disabled={isSaving}
                    className="px-5 py-2 rounded-lg kku-gradient text-white text-xs font-heading font-bold shadow-md flex items-center space-x-1.5 hover:opacity-95"
                  >
                    {isSaving ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>บันทึกและส่งคำของบประมาณ</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
