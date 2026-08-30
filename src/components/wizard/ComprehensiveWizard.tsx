"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Scale,
  DollarSign,
  Layers,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  ArrowRight,
  Send,
  Save,
  Download,
  Upload,
  FileCheck,
  ShieldCheck,
  Check,
  HelpCircle,
  Clock,
  Printer,
  FileSpreadsheet,
  FileCode2,
  Search,
  Eye,
  Info,
  Building,
  Tag,
  Loader2,
  Trash2,
  Plus,
} from "lucide-react";
import { Full6StepAnalysis } from "@/types/ai";

export function ComprehensiveWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPrompt = searchParams.get("prompt") || "ต้องการจัดซื้อเครื่องคอมพิวเตอร์ สำหรับงานประมวลผล ด้าน Data Science จำนวน 10 เครื่อง งบประมาณ 500,000 บาท เพื่อใช้ในการเรียนการสอนและงานวิจัย AI";
  const initialStep = parseInt(searchParams.get("step") || "1", 10);

  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [promptText, setPromptText] = useState(initialPrompt);
  const [quantity, setQuantity] = useState(10);
  const [estimatedBudget, setEstimatedBudget] = useState(500000);
  const [department, setDepartment] = useState("คณะวิทยาศาสตร์");
  const [objective, setObjective] = useState("เพื่อใช้ในการประมวลผลข้อมูลทางสถิติ และ Machine Learning");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Full6StepAnalysis | null>(null);
  const [activePriceTab, setActivePriceTab] = useState<"overview" | "trend">("overview");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Auto-run analysis if prompt came from URL or default
  useEffect(() => {
    runAIAnalysis(promptText);
  }, []);

  const runAIAnalysis = async (text: string) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch("/api/ai/analyze-full", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });
      const data = await res.json();
      if (data.analysis) {
        setAnalysis(data.analysis);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const stepsHeader = [
    { num: 1, label: "ความต้องการ" },
    { num: 2, label: "รายการที่แนะนำ" },
    { num: 3, label: "ราคาอ้างอิง" },
    { num: 4, label: "ตรวจวงเงิน" },
    { num: 5, label: "ร่างคำขอ" },
    { num: 6, label: "Specification" },
    { num: 7, label: "เทียบ TOR" },
    { num: 8, label: "แนบเอกสาร" },
    { num: 9, label: "ตรวจสอบและส่ง" },
  ];

  const handleNext = () => {
    if (currentStep < 9) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "เครื่องคอมพิวเตอร์ สำหรับงานประมวลผล ด้าน Data Science",
          category: "คอมพิวเตอร์และอุปกรณ์ต่อพ่วง",
          totalBudgetBaht: estimatedBudget,
          quantity: quantity,
          unit: "เครื่อง",
          unitPriceBaht: estimatedBudget / quantity,
          standardMatched: true,
          standardName: "เครื่องคอมพิวเตอร์ สำหรับงานประมวลผล แบบที่ 1",
          alertLevel: "AMBER_ALERT",
          status: "AI_ANALYZED",
          aiAnalysis: analysis,
        }),
      });
      const data = await res.json();
      if (data.proposal) {
        setTimeout(() => {
          router.push(`/requests/${data.proposal.id}`);
        }, 1200);
      }
    } catch (err) {
      console.error(err);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปยังหน้าหลัก</span>
        </Link>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500">
            ขั้นตอนที่ <strong className="text-indigo-600">{currentStep}</strong> จาก 9
          </span>
        </div>
      </div>

      {/* Stepper Progress Navigation Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-start gap-2 overflow-x-auto pb-1 sm:justify-between">
          {stepsHeader.map((st) => {
            const isCompleted = currentStep > st.num;
            const isActive = currentStep === st.num;

            return (
              <button
                key={st.num}
                onClick={() => setCurrentStep(st.num)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium transition-all shrink-0 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-bold shadow-xs"
                    : isCompleted
                    ? "text-emerald-700 hover:bg-emerald-50/50"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive
                      ? "bg-indigo-600 text-white"
                      : isCompleted
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 text-slate-400 border border-slate-200"
                  }`}
                >
                  {isCompleted ? "✓" : st.num}
                </div>
                <span>{st.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP CONTENT CONTAINER */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* STEP 1: บอกความต้องการ */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-slate-900">
                2. สร้างคำขอใหม่ (บอกความต้องการ)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                โปรดระบุความต้องการให้ละเอียดที่สุดเท่าที่จะทำได้ AI จะช่วยสกัดและเทียบเกณฑ์มาตรฐานอัตโนมัติ
              </p>
            </div>

            <div className="space-y-4">
              {/* Prompt Textarea */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  ความต้องการของคุณ
                </label>
                <div className="relative">
                  <textarea
                    rows={4}
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder="เช่น ต้องการจัดซื้อเครื่องคอมพิวเตอร์สำหรับงานประมวลผลข้อมูล จำนวน 10 เครื่อง งบประมาณ 500,000 บาท..."
                    className="w-full text-xs sm:text-sm p-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-slate-50/50 hover:bg-white transition-all shadow-inner"
                  />
                  <span className="absolute bottom-3 right-4 text-[10px] text-slate-400 font-mono">
                    {promptText.length}/1000
                  </span>
                </div>
              </div>

              {/* Quantity & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    จำนวน
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full text-xs sm:text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    />
                    <span className="absolute right-3.5 top-3 text-xs text-slate-400">
                      เครื่อง
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    งบประมาณโดยประมาณ
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={estimatedBudget}
                      onChange={(e) => setEstimatedBudget(Number(e.target.value))}
                      className="w-full text-xs sm:text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                    />
                    <span className="absolute right-3.5 top-3 text-xs text-slate-400">
                      บาท
                    </span>
                  </div>
                </div>
              </div>

              {/* Department */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  หน่วยงาน
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full text-xs sm:text-sm p-3 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                >
                  <option value="คณะวิทยาศาสตร์">คณะวิทยาศาสตร์</option>
                  <option value="คณะเทคโนโลยีสารสนเทศ">คณะเทคโนโลยีสารสนเทศ</option>
                  <option value="คณะแพทยศาสตร์">คณะแพทยศาสตร์</option>
                  <option value="คณะวิศวกรรมศาสตร์">คณะวิศวกรรมศาสตร์</option>
                  <option value="สำนักบริการวิชาการ">สำนักบริการวิชาการ</option>
                </select>
              </div>

              {/* Objective */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  วัตถุประสงค์ (ไม่บังคับ)
                </label>
                <input
                  type="text"
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  placeholder="เช่น เพื่อใช้ในการประมวลผลข้อมูลทางสถิติ และ Machine Learning"
                  className="w-full text-xs sm:text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => {
                  runAIAnalysis(promptText);
                  handleNext();
                }}
                disabled={isAnalyzing}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-heading font-bold text-xs shadow-md shadow-indigo-500/25 flex items-center space-x-2 transition-all hover:scale-105"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>กำลังวิเคราะห์ด้วย AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>วิเคราะห์ด้วย AI →</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: AI วิเคราะห์ความต้องการ */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-slate-900">
                3. AI วิเคราะห์ความต้องการ
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                สรุปข้อมูลที่ระบบ AI ตรวจสอบและสกัดได้จากข้อความ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Parsed Info */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                <h3 className="font-heading font-bold text-xs text-slate-700 uppercase tracking-wider">
                  ผลการวิเคราะห์
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">ประเภทครุภัณฑ์</span>
                    <span className="font-semibold text-slate-900">Computer / Workstation</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">วัตถุประสงค์</span>
                    <span className="font-semibold text-slate-900 text-right max-w-[200px]">
                      ประมวลผลข้อมูล / Data Processing
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">จำนวน</span>
                    <span className="font-semibold text-slate-900">{quantity} เครื่อง</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">งบประมาณที่เสนอ</span>
                    <span className="font-bold text-indigo-700">
                      {estimatedBudget.toLocaleString()} บาท
                    </span>
                  </div>
                </div>

                {/* Confidence Bar */}
                <div className="pt-2">
                  <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                    <span>ความเชื่อมั่นของการวิเคราะห์</span>
                    <span className="text-indigo-600 font-bold">94%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full w-[94%] transition-all duration-500"></div>
                  </div>
                </div>
              </div>

              {/* Right Column: Readiness Checklist */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4">
                <h3 className="font-heading font-bold text-xs text-slate-700 uppercase tracking-wider">
                  ความพร้อมของข้อมูล
                </h3>

                <div className="flex items-center space-x-6">
                  {/* Circular Gauge */}
                  <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#EEF2F6"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="#10B981"
                        strokeWidth="8"
                        strokeDasharray="251.2"
                        strokeDashoffset="45.2" /* 82% */
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <div className="text-base font-heading font-bold text-slate-900">82%</div>
                      <div className="text-[8px] text-slate-400">ความพร้อม</div>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center space-x-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>วัตถุประสงค์</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>จำนวน</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>งบประมาณ</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>ลักษณะการใช้งาน</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>ซอฟต์แวร์ที่ต้องการ</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-[11px] text-indigo-900">
                  <span className="font-semibold">คำแนะนำเบื้องต้น:</span>{" "}
                  ระบบพบรายการมาตรฐานใกล้เคียง กรุณาตรวจสอบในขั้นตอนถัดไป
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-heading font-bold shadow-md flex items-center space-x-1.5"
              >
                <span>ถัดไป →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ตรวจชื่อครุภัณฑ์และมาตรฐาน */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-slate-900">
                4. ตรวจชื่อครุภัณฑ์และมาตรฐาน
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                AI แนะนำรายการมาตรฐานที่ตรงกันจากฐานข้อมูลสำนักงบประมาณ และกระทรวงดิจิทัลฯ
              </p>
            </div>

            {/* Input Name Notice */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                  ชื่อที่คุณระบุ
                </span>
                <p className="text-xs font-semibold text-amber-950 mt-0.5">
                  เครื่องคอมพิวเตอร์ประสิทธิภาพสูงสำหรับงาน Data Science
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-semibold border border-amber-200">
                ⚠ ไม่พบรายการมาตรฐานตรงกันพอดี
              </span>
            </div>

            {/* AI Recommended Match Card */}
            <div className="border-2 border-indigo-500 rounded-3xl p-5 bg-gradient-to-br from-indigo-50/40 via-purple-50/20 to-white shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-heading font-bold">
                  อันดับ 1 (แนะนำ)
                </span>
                <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>ความสอดคล้อง 94%</span>
                </span>
              </div>

              <div>
                <h3 className="text-base font-heading font-bold text-slate-900">
                  เครื่องคอมพิวเตอร์ สำหรับงานประมวลผล แบบที่ 1 (จอแสดงภาพขนาดไม่น้อยกว่า 23 นิ้ว)
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  ราคามาตรฐาน (อ้างอิง):{" "}
                  <strong className="text-slate-900 text-sm">26,000 บาท / เครื่อง</strong>
                </p>
                <p className="text-[11px] text-slate-400">
                  อ้างอิง: สำนักงบประมาณ ฉบับ เม.ย. 2569
                </p>
              </div>

              {/* Evidence Citation */}
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 text-xs space-y-1">
                <div className="font-semibold text-slate-800 flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  <span>แหล่งอ้างอิงทางการ:</span>
                </div>
                <p className="text-slate-600 pl-5">
                  กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม เกณฑ์ราคากลางและคุณลักษณะพื้นฐานคอมพิวเตอร์
                  ฉบับ พ.ศ. 2569 หน้า 18 • รายการ 2.1
                </p>
              </div>
            </div>

            {/* Alternative Option */}
            <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/60 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  รายการทางเลือก (อันดับ 2)
                </span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  เครื่องคอมพิวเตอร์ All-in-One สำหรับงานสำนักงาน
                </p>
                <span className="text-slate-500">24,500 บาท / เครื่อง</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 text-[10px] font-semibold">
                ความสอดคล้อง 86%
              </span>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-heading font-bold shadow-md flex items-center space-x-1.5"
              >
                <span>ใช้รายการนี้ →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: เปรียบเทียบราคาตลาด (Cross-check) */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h2 className="text-xl font-heading font-bold text-slate-900">
                  5. เปรียบเทียบราคาตลาด (4-Source Matrix)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  เปรียบเทียบราคาจากราคามาตรฐาน, ราคากลางล่าสุด, ใบเสนอราคา และประวัติจัดซื้อ
                </p>
              </div>

              {/* Tab Switcher */}
              <div className="bg-slate-100 p-1 rounded-xl flex space-x-1 text-xs">
                <button
                  onClick={() => setActivePriceTab("overview")}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    activePriceTab === "overview"
                      ? "bg-white text-slate-900 shadow-xs font-bold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  ภาพรวมราคา
                </button>
                <button
                  onClick={() => setActivePriceTab("trend")}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                    activePriceTab === "trend"
                      ? "bg-white text-slate-900 shadow-xs font-bold"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  กราฟแนวโน้ม
                </button>
              </div>
            </div>

            {/* 4 Cards Matrix */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  ราคามาตรฐาน (อ้างอิง)
                </span>
                <div className="text-xl font-heading font-bold text-slate-900 mt-1">
                  26,000 บาท
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">สำนักงบประมาณ 2569</p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  ราคากลางล่าสุด (Median)
                </span>
                <div className="text-xl font-heading font-bold text-slate-900 mt-1">
                  28,900 บาท
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">8 รายการ (ใน 90 วัน)</p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  ใบเสนอราคาต่ำสุด
                </span>
                <div className="text-xl font-heading font-bold text-emerald-600 mt-1">
                  28,500 บาท
                </div>
                <p className="text-[10px] text-emerald-700 mt-0.5">บริษัท เอ จำกัด</p>
              </div>

              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  ประวัติจัดซื้อ (Median)
                </span>
                <div className="text-xl font-heading font-bold text-slate-900 mt-1">
                  29,100 บาท
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">จัดซื้อจริง มข. 2568</p>
              </div>
            </div>

            {/* Range & Vendor Quotations */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-600">
                  ช่วงราคาตลาดที่พบ:
                </span>
                <span className="text-sm font-bold text-indigo-700">
                  25,500 - 32,500 บาท / เครื่อง
                </span>
              </div>

              <h4 className="font-heading font-bold text-xs text-slate-700 uppercase tracking-wider">
                ใบเสนอราคาที่แนบมา (Vendor Quotations)
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-slate-800">1. บริษัท เอ จำกัด</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-200 text-emerald-800 font-bold">
                      ⭐ ต่ำสุด
                    </span>
                  </div>
                  <span className="font-bold text-slate-900">28,500 บาท / เครื่อง</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-800">2. บริษัท บี จำกัด</span>
                  <span className="font-semibold text-slate-700">29,700 บาท / เครื่อง</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="font-semibold text-slate-800">3. บริษัท ซี จำกัด</span>
                  <span className="font-semibold text-slate-700">30,200 บาท / เครื่อง</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-heading font-bold shadow-md flex items-center space-x-1.5"
              >
                <span>ถัดไป →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: แจ้งเตือนงบประมาณ (Budget Alert) */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-slate-900">
                6. ตรวจสอบความสมเหตุสมผลของงบประมาณ (Budget Alert)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                การประเมินความเสี่ยงและแจ้งเตือนความสอดคล้องตามระเบียบพัสดุฯ
              </p>
            </div>

            {/* Alert Banner */}
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-3">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading font-bold text-sm">
                    วงเงินที่เสนอสูงกว่าราคาตลาด 21.1%
                  </h3>
                  <p className="text-xs mt-1 text-amber-900 leading-relaxed">
                    AI แนะนำ: ตรวจสอบความเหมาะสมของวงเงิน หรือแนบใบเสนอราคา 3 ราย
                    และระบุหนังสือชี้แจงเหตุผลความจำเป็นทางวิชาการเพิ่มเติม
                  </p>
                </div>
              </div>

              {/* Price comparison points */}
              <div className="pt-3 border-t border-amber-200/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="text-amber-800 text-[10px]">วงเงินที่เสนอ:</span>
                  <div className="font-bold text-amber-950">50,000 บาท/เครื่อง</div>
                </div>
                <div>
                  <span className="text-amber-800 text-[10px]">ราคามาตรฐาน:</span>
                  <div className="font-semibold text-amber-950">26,000 บาท</div>
                </div>
                <div>
                  <span className="text-amber-800 text-[10px]">ราคากลาง Median:</span>
                  <div className="font-semibold text-amber-950">28,900 บาท</div>
                </div>
                <div>
                  <span className="text-amber-800 text-[10px]">ใบเสนอราคาต่ำสุด:</span>
                  <div className="font-semibold text-amber-950">28,500 บาท</div>
                </div>
              </div>
            </div>

            {/* Actionable Requirements Checklist */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
              <h4 className="font-heading font-bold text-xs text-slate-700 uppercase tracking-wider">
                เอกสารและข้อปฏิบัติที่ต้องดำเนินการ
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/50 border border-amber-100">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>แนบใบเสนอราคา 3 บริษัท (รวม PDF ไฟล์เดียว)</span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-800">จำเป็นต้องแนบ</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/50 border border-amber-100">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>หนังสือชี้แจงเหตุผลความจำเป็นทางวิชาการ</span>
                  </div>
                  <span className="text-[10px] font-bold text-amber-800">จำเป็นต้องระบุ</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>ร่างสเปกเป็นกลาง ไม่ล็อคยี่ห้อ (Anti-Brand-Locking)</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800">AI สร้างให้ในขั้นตอนถัดไป</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-heading font-bold shadow-md flex items-center space-x-1.5"
              >
                <span>ถัดไป (ร่างคำขอ) →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: ร่างคำของบประมาณ (8-10 หมวดหมู่) */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-heading font-bold text-slate-900">
                  7. ร่างคำของบประมาณ (KKU Form)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  AI สร้างร่างคำขอ 8-10 หมวดหมู่ตามแบบฟอร์ม มหาวิทยาลัยขอนแก่น
                </p>
              </div>

              <div className="flex space-x-2">
                <button className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50">
                  พรีวิวเอกสาร
                </button>
                <button className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50">
                  Word
                </button>
                <button className="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold">
                  PDF
                </button>
              </div>
            </div>

            {/* Accordion Form Preview */}
            <div className="border border-slate-200 rounded-2xl divide-y divide-slate-100 text-xs">
              <div className="p-4 bg-slate-50/60 font-semibold text-slate-900">
                1. ชื่อครุภัณฑ์: เครื่องคอมพิวเตอร์ สำหรับงานประมวลผล แบบที่ 1
              </div>
              <div className="p-4 space-y-1">
                <span className="font-semibold text-slate-800">2. หลักการและเหตุผล:</span>
                <p className="text-slate-600 leading-relaxed">
                  เพื่อใช้ในการประมวลผลข้อมูลทางสถิติและการวิจัยด้านปัญญาประดิษฐ์ คณะวิทยาศาสตร์ ซึ่งมีปริมาณข้อมูลเพิ่มขึ้นอย่างต่อเนื่อง
                </p>
              </div>
              <div className="p-4 space-y-1">
                <span className="font-semibold text-slate-800">3. วัตถุประสงค์:</span>
                <p className="text-slate-600 leading-relaxed">
                  1. เพื่อให้มีครุภัณฑ์คอมพิวเตอร์ที่มีประสิทธิภาพเพียงพอสำหรับการเรียนการสอนและการวิจัย<br />
                  2. เพื่อสนับสนุนการประมวลผลข้อมูลขนาดใหญ่ (Big Data)
                </p>
              </div>
              <div className="p-4 space-y-1">
                <span className="font-semibold text-slate-800">4. ความจำเป็น:</span>
                <p className="text-slate-600 leading-relaxed">
                  อุปกรณ์เดิมมีอายุการใช้งานมากกว่า 5 ปี ประสิทธิภาพไม่เพียงพอต่อการประมวลผลชุดคำสั่งสมัยใหม่
                </p>
              </div>
              <div className="p-4 flex justify-between bg-slate-50/40">
                <div>
                  <span className="font-semibold text-slate-800">5. จำนวน:</span> {quantity} เครื่อง
                </div>
                <div>
                  <span className="font-semibold text-slate-800">6. ราคาต่อหน่วย:</span> {(estimatedBudget / quantity).toLocaleString()} บาท
                </div>
                <div>
                  <span className="font-semibold text-indigo-700">7. วงเงินรวม:</span> {estimatedBudget.toLocaleString()} บาท
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-heading font-bold shadow-md flex items-center space-x-1.5"
              >
                <span>บันทึกและถัดไป →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 7: ร่าง Specification (TOR) */}
        {currentStep === 7 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-slate-900">
                8. ร่าง Specification (TOR เป็นกลาง)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                AI สร้างร่าง TOR เชิงหน้าที่ ไม่ล็อคยี่ห้อ (Anti-Brand-Locking) ตาม พ.ร.บ. จัดซื้อจัดจ้างฯ
              </p>
            </div>

            {/* Spec Sections Accordion */}
            <div className="border border-slate-200 rounded-2xl divide-y divide-slate-100 text-xs">
              <div className="p-4 bg-slate-50/60 font-semibold text-slate-900 flex items-center justify-between">
                <span>1. คุณลักษณะทั่วไป</span>
                <Check className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="p-4 bg-slate-50/60 font-semibold text-slate-900 flex items-center justify-between">
                <span>2. คุณลักษณะเฉพาะ</span>
                <Check className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="p-4 space-y-2">
                <div className="font-semibold text-indigo-900 flex items-center justify-between">
                  <span>3. ระบบประมวลผล (Processor)</span>
                  <span className="text-[10px] text-indigo-600">อ้างอิง: เกณฑ์กระทรวงดิจิทัลฯ</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-700 leading-relaxed">
                  <li>มีหน่วยประมวลผลไม่น้อยกว่า 6 คอร์ 12 เธรด</li>
                  <li>ความเร็วสัญญาณนาฬิกาพื้นฐานไม่น้อยกว่า 2.5 GHz</li>
                  <li>รองรับเทคโนโลยี 64-bit หรือเทียบเท่า</li>
                </ul>
              </div>

              <div className="p-4 space-y-2">
                <div className="font-semibold text-indigo-900 flex items-center justify-between">
                  <span>4. หน่วยความจำ (Memory)</span>
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-slate-700 pl-5">
                  หน่วยความจำหลักชนิด DDR5 ไม่น้อยกว่า 32 GB (หรือเทียบเท่า) ความเร็วบัสไม่น้อยกว่า 4800 MHz
                </p>
              </div>

              <div className="p-4 space-y-2">
                <div className="font-semibold text-indigo-900 flex items-center justify-between">
                  <span>5. หน่วยเก็บข้อมูล (Storage)</span>
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-slate-700 pl-5">
                  หน่วยจัดเก็บข้อมูลแบบ Solid State Drive (SSD NVMe M.2) ความจุไม่น้อยกว่า 1 TB
                </p>
              </div>

              <div className="p-4 font-semibold text-slate-800 flex items-center justify-between">
                <span>6. จอภาพ (Display) — ขนาดไม่น้อยกว่า 23.8 นิ้ว Full HD</span>
                <Check className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="p-4 font-semibold text-slate-800 flex items-center justify-between">
                <span>7. การรับประกัน — On-site Service ไม่น้อยกว่า 3 ปี</span>
                <Check className="w-4 h-4 text-emerald-600" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-heading font-bold shadow-md flex items-center space-x-1.5"
              >
                <span>บันทึกและถัดไป →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 8: เทียบ TOR & แนบเอกสาร */}
        {currentStep === 8 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-slate-900">
                9. เปรียบเทียบ TOR และแนบเอกสารหลักฐาน
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                เทียบเคียงกับ TOR หน่วยงานอื่น และอัปโหลดไฟล์หลักฐาน (Single Merged PDF)
              </p>
            </div>

            {/* Benchmark Section */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
              <h4 className="font-heading font-bold text-xs text-slate-700 uppercase tracking-wider">
                TOR ที่คล้ายกันในระบบ (Benchmark)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="font-semibold text-slate-800">มหาวิทยาลัย A (2569)</span>
                  <div className="text-emerald-600 font-bold text-[11px] mt-1">ความสอดคล้อง 92%</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="font-semibold text-slate-800">มหาวิทยาลัย B (2568)</span>
                  <div className="text-emerald-600 font-bold text-[11px] mt-1">ความสอดคล้อง 88%</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="font-semibold text-slate-800">หน่วยงาน C (2568)</span>
                  <div className="text-emerald-600 font-bold text-[11px] mt-1">ความสอดคล้อง 85%</div>
                </div>
              </div>
            </div>

            {/* Attachments Section */}
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-xs text-slate-700 uppercase tracking-wider">
                เอกสารที่แนบ
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-rose-500" />
                    <span>ใบเสนอราคา 3 ฉบับ (รวมไฟล์)</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">PDF</span>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <span>ภาพสเปกแคตตาล็อก</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">PDF</span>
                </div>
              </div>

              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-2xl p-8 text-center bg-slate-50/50 hover:bg-indigo-50/20 transition-all cursor-pointer">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-semibold text-slate-700">
                  ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                  รองรับไฟล์ PDF, Word, รูปภาพ (แนะนำรวมไฟล์เป็น PDF เดียว)
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-heading font-bold shadow-md flex items-center space-x-1.5"
              >
                <span>ถัดไป (ตรวจสอบขั้นสุดท้าย) →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 9: ตรวจสอบและส่งคำขอ */}
        {currentStep === 9 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-heading font-bold text-slate-900">
                10. ตรวจสอบและส่งคำของบประมาณ
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                ตรวจสอบความถูกต้องและความพร้อมของข้อมูลทั้งหมดก่อนส่งไปยังหัวหน้าภาควิชา / คณะ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Readiness Circular Score */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center space-y-3">
                <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#E2E8F0"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#10B981"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset="20.1" /* 92% */
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <div className="text-2xl font-heading font-bold text-slate-900">92%</div>
                    <div className="text-[10px] text-slate-500">ความพร้อม</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-sm text-slate-900">
                    ความพร้อมของคำของบประมาณ
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    ข้อมูลครบถ้วน พร้อมสำหรับการเสนอผู้ตรวจระดับภาควิชา
                  </p>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white border border-slate-200 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ความต้องการระบุชัดเจน</span>
                </div>
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white border border-slate-200 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>รายการมาตรฐานสำนักงบฯ ตรงเกณฑ์</span>
                </div>
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white border border-slate-200 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ราคากลางและใบเสนอราคา 4 แหล่ง</span>
                </div>
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white border border-slate-200 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>งบประมาณและการจัดสรร</span>
                </div>
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white border border-slate-200 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ร่างคำของบประมาณ (8-10 หมวดหมู่)</span>
                </div>
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white border border-slate-200 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ร่าง TOR เป็นกลาง (Anti-Brand-Locking)</span>
                </div>
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white border border-slate-200 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>เอกสารและหลักฐานแนบครบถ้วน</span>
                </div>
              </div>
            </div>

            {/* Warning Note */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              <span className="font-bold">ข้อควรระวัง:</span> เมื่อส่งคำขอแล้ว
              ข้อมูลจะถูกส่งต่อไปยังระบบตรวจสอบระดับภาควิชาและคณะ
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
              >
                ย้อนกลับ
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitted}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-700"
                >
                  บันทึกแบบร่าง
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitted}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-heading font-bold text-xs shadow-md shadow-indigo-500/25 flex items-center space-x-1.5"
                >
                  {isSubmitted ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>กำลังส่งคำขอ...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>ส่งคำของบประมาณ 📤</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
