"use client";

import React, { useState, useEffect, useRef } from "react";
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
  X,
  File,
  BarChart3,
  TrendingUp,
  Sliders,
  ExternalLink,
} from "lucide-react";
import { Full6StepAnalysis } from "@/types/ai";

const QUICK_PRESETS = [
  {
    title: "🖥️ AI Workstation",
    category: "ครุภัณฑ์คอมพิวเตอร์",
    prompt: "ต้องการจัดซื้อเครื่องคอมพิวเตอร์ สำหรับงานประมวลผล ด้าน Data Science จำนวน 10 เครื่อง งบประมาณ 500,000 บาท เพื่อใช้ในการเรียนการสอนและงานวิจัย AI",
    quantity: 10,
    unit: "เครื่อง",
    budget: 500000,
    dept: "คณะวิทยาศาสตร์",
    objective: "เพื่อใช้ในการประมวลผลข้อมูลทางสถิติ และ Machine Learning",
  },
  {
    title: "💻 Notebook ภาคสนาม",
    category: "ครุภัณฑ์คอมพิวเตอร์",
    prompt: "จัดซื้อเครื่องคอมพิวเตอร์พกพา (Notebook) สำหรับงานวิจัยภาคสนาม จำนวน 5 เครื่อง งบประมาณ 190,000 บาท เครื่องละ 38,000 บาท",
    quantity: 5,
    unit: "เครื่อง",
    budget: 190000,
    dept: "คณะวิทยาศาสตร์",
    objective: "เพื่อใช้ในการเก็บข้อมูลและประมวลผลการวิจัยภาคสนาม",
  },
  {
    title: "🔬 Centrifuge วิทยาศาสตร์",
    category: "ครุภัณฑ์วิทยาศาสตร์",
    prompt: "จัดซื้อเครื่องปั่นเหวี่ยงตกตะกอนควบคุมอุณหภูมิความเร็วรอบสูง (Refrigerated Centrifuge) จำนวน 1 เครื่อง งบประมาณ 350,000 บาท สำหรับห้องปฏิบัติการชีวเคมี",
    quantity: 1,
    unit: "เครื่อง",
    budget: 350000,
    dept: "คณะวิทยาศาสตร์",
    objective: "เพื่อใช้ในการแยกสารชีวโมเลกุลในงานวิจัยด้านเทคโนโลยีชีวภาพ",
  },
  {
    title: "🧪 UV-Vis Spectro",
    category: "ครุภัณฑ์วิทยาศาสตร์",
    prompt: "จัดซื้อเครื่องวัดการดูดกลืนแสงแบบยูวี-วิสิเบิล (UV-Vis Spectrophotometer) จำนวน 1 เครื่อง งบประมาณ 280,000 บาท สำหรับห้องปฏิบัติการเคมี",
    quantity: 1,
    unit: "เครื่อง",
    budget: 280000,
    dept: "คณะวิทยาศาสตร์",
    objective: "เพื่อใช้ในการวิเคราะห์ปริมาณสารอินทรีย์และโลหะหนักในห้องปฏิบัติการ",
  },
  {
    title: "📱 Smart Display 75\"",
    category: "ครุภัณฑ์การศึกษา",
    prompt: "จัดซื้อจอสัมผัสอัจฉริยะเพื่อการเรียนการสอน (Interactive Smart Display 75 นิ้ว) จำนวน 2 จอ งบประมาณ 190,000 บาท สำหรับห้องเรียน Active Learning",
    quantity: 2,
    unit: "จอ",
    budget: 190000,
    dept: "คณะวิทยาศาสตร์",
    objective: "เพื่อยกระดับห้องเรียนอัจฉริยะ (Active Learning Classroom) และการสอนแบบผสมผสาน",
  },
  {
    title: "❄️ แอร์ Inverter 36k BTU",
    category: "ครุภัณฑ์สำนักงาน",
    prompt: "จัดซื้อเครื่องปรับอากาศ แบบแยกส่วน ระบบ Inverter ขนาด 36,000 BTU จำนวน 3 เครื่อง งบประมาณ 144,000 บาท เครื่องละ 48,000 บาท",
    quantity: 3,
    unit: "เครื่อง",
    budget: 144000,
    dept: "สำนักงานคณบดี คณะวิทยาศาสตร์",
    objective: "เพื่อทดแทนเครื่องเดิมที่ชำรุดและประหยัดพลังงานในห้องปฏิบัติการวิจัย",
  },
  {
    title: "🪑 โต๊ะเก้าอี้ Lab",
    category: "ครุภัณฑ์สำนักงาน",
    prompt: "จัดซื้อชุดโต๊ะและเก้าอี้ปฏิบัติการวิทยาศาสตร์ทนสารเคมี จำนวน 10 ชุด งบประมาณ 250,000 บาท ชุดละ 25,000 บาท",
    quantity: 10,
    unit: "ชุด",
    budget: 250000,
    dept: "คณะวิทยาศาสตร์",
    objective: "เพื่อปรับปรุงห้องปฏิบัติการวิจัยให้ได้มาตรฐานความปลอดภัย",
  },
  {
    title: "🚑 รถพยาบาลฉุกเฉิน",
    category: "ครุภัณฑ์ยานพาหนะและขนส่ง",
    prompt: "จัดซื้อรถพยาบาลฉุกเฉินพร้อมอุปกรณ์ช่วยชีวิตขั้นสูง (Ambulance) จำนวน 1 คัน งบประมาณ 2,500,000 บาท",
    quantity: 1,
    unit: "คัน",
    budget: 2500000,
    dept: "โรงพยาบาลศรีนครินทร์ คณะแพทยศาสตร์",
    objective: "เพื่อใช้ในการให้บริการการแพทย์ฉุกเฉินและการส่งต่อผู้ป่วย",
  },
];

interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
}

export function ComprehensiveWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPrompt =
    searchParams.get("prompt") ||
    "ต้องการจัดซื้อเครื่องคอมพิวเตอร์ สำหรับงานประมวลผล ด้าน Data Science จำนวน 10 เครื่อง งบประมาณ 500,000 บาท เพื่อใช้ในการเรียนการสอนและงานวิจัย AI";
  const initialStep = parseInt(searchParams.get("step") || "1", 10);

  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [promptText, setPromptText] = useState(initialPrompt);
  const [customTitle, setCustomTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ครุภัณฑ์คอมพิวเตอร์");
  const [quantity, setQuantity] = useState(10);
  const [unit, setUnit] = useState("เครื่อง");
  const [estimatedBudget, setEstimatedBudget] = useState(500000);
  const [department, setDepartment] = useState("คณะวิทยาศาสตร์");
  const [objective, setObjective] = useState(
    "เพื่อใช้ในการประมวลผลข้อมูลทางสถิติ และ Machine Learning"
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Full6StepAnalysis | null>(null);
  const [activePriceTab, setActivePriceTab] = useState<"overview" | "trend">("overview");
  const [selectedStandardOption, setSelectedStandardOption] = useState<1 | 2>(1);
  const [previewDocType, setPreviewDocType] = useState<"pdf" | "word">("pdf");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showScoreBreakdownModal, setShowScoreBreakdownModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [actionType, setActionType] = useState<"draft" | "submit" | null>(null);

  // File Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileItem[]>([
    {
      id: "f-1",
      name: "ใบเสนอราคา_3_บริษัท_รวมไฟล์.pdf",
      size: "2.4 MB",
      type: "application/pdf",
      uploadedAt: "วันนี้ 10:30 น.",
    },
    {
      id: "f-2",
      name: "แคตตาล็อกและสเปกอ้างอิง.pdf",
      size: "1.1 MB",
      type: "application/pdf",
      uploadedAt: "วันนี้ 10:32 น.",
    },
  ]);

  // Auto-run analysis on load
  useEffect(() => {
    runAIAnalysis(promptText);
  }, []);

  const handleApplyPreset = (preset: (typeof QUICK_PRESETS)[0]) => {
    setPromptText(preset.prompt);
    setSelectedCategory(preset.category);
    setQuantity(preset.quantity);
    setUnit(preset.unit);
    setEstimatedBudget(preset.budget);
    setDepartment(preset.dept);
    setObjective(preset.objective);
    setCustomTitle(preset.title.replace(/^[^\s]+\s*/, ""));
    runAIAnalysis(preset.prompt);
  };

  const runAIAnalysis = async (text: string) => {
    if (!text.trim()) return;
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
        if (data.analysis.step1) {
          if (!customTitle) {
            setCustomTitle(data.analysis.step1.rawItemName);
          }
          if (data.analysis.step1.itemCategory) {
            setSelectedCategory(data.analysis.step1.itemCategory);
          }
          if (data.analysis.step1.unit) {
            setUnit(data.analysis.step1.unit);
          }
          if (data.analysis.step1.quantity && data.analysis.step1.quantity > 0) {
            setQuantity(data.analysis.step1.quantity);
          }
          if (data.analysis.step1.totalProposedBudget && data.analysis.step1.totalProposedBudget > 0) {
            setEstimatedBudget(data.analysis.step1.totalProposedBudget);
          }
          if (data.analysis.step1.objective) {
            setObjective(data.analysis.step1.objective);
          }
        }
      }
    } catch (err) {
      console.error("AI Analysis error:", err);
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: UploadedFileItem[] = Array.from(files).map((f) => ({
      id: `f-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      type: f.type || "application/octet-stream",
      uploadedAt: "เมื่อสักครู่",
    }));

    setUploadedFiles((prev) => [...prev, ...newItems]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmitProposal = async (targetStatus: "DRAFT" | "AI_ANALYZED" | "SUBMITTED") => {
    setIsSubmitted(true);
    setActionType(targetStatus === "DRAFT" ? "draft" : "submit");

    const resolvedTitle =
      customTitle ||
      analysis?.step1?.rawItemName ||
      "คำของบประมาณครุภัณฑ์ใหม่";
    const resolvedCategory =
      selectedCategory ||
      analysis?.step1?.itemCategory ||
      "ครุภัณฑ์คอมพิวเตอร์";
    const resolvedStandardName =
      selectedStandardOption === 1
        ? analysis?.step2?.recommendedStandardName || resolvedTitle
        : "เครื่องคอมพิวเตอร์ All-in-One สำหรับงานสำนักงาน";
    const unitPrice = quantity > 0 ? estimatedBudget / quantity : estimatedBudget;

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: resolvedTitle,
          category: resolvedCategory,
          totalBudgetBaht: estimatedBudget,
          quantity: quantity,
          unit: unit,
          unitPriceBaht: unitPrice,
          standardMatched: selectedStandardOption === 1,
          standardName: resolvedStandardName,
          alertLevel: analysis?.step4?.alertLevel || "AMBER_ALERT",
          status: targetStatus,
          form8Sections: analysis?.step5 || undefined,
          neutralSpec: analysis?.step6 || undefined,
          aiAnalysis: analysis || undefined,
        }),
      });

      const data = await res.json();
      if (data.proposal) {
        setTimeout(() => {
          router.push(`/requests/${data.proposal.id}`);
        }, 1000);
      } else {
        setIsSubmitted(false);
      }
    } catch (err) {
      console.error("Save/Submit proposal error:", err);
      setIsSubmitted(false);
    }
  };

  // Helper values for display
  const displayTitle =
    customTitle ||
    analysis?.step1?.rawItemName ||
    "เครื่องคอมพิวเตอร์ประสิทธิภาพสูงสำหรับงาน Data Science";
  const displayCategory =
    selectedCategory ||
    analysis?.step1?.itemCategory ||
    "ครุภัณฑ์คอมพิวเตอร์";
  const displayStandardName1 =
    analysis?.step2?.recommendedStandardName ||
    "เครื่องคอมพิวเตอร์ สำหรับงานประมวลผล แบบที่ 1 (จอแสดงภาพขนาดไม่น้อยกว่า 23 นิ้ว)";
  const standardPrice1 = analysis?.step2?.standardUnitPrice || 26000;
  const displayStandardName2 = "เครื่องคอมพิวเตอร์ All-in-One สำหรับงานสำนักงาน";
  const standardPrice2 = 24500;
  const activeStandardName =
    selectedStandardOption === 1 ? displayStandardName1 : displayStandardName2;
  const activeStandardPrice =
    selectedStandardOption === 1 ? standardPrice1 : standardPrice2;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center space-x-1.5 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>กลับไปยังหน้าหลัก</span>
        </Link>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-500">
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
                className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all shrink-0 ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-bold shadow-xs"
                    : isCompleted
                    ? "text-emerald-700 hover:bg-emerald-50/50"
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-sm font-bold ${
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
              <p className="text-sm text-slate-500 mt-0.5">
                เลือกตัวอย่างครุภัณฑ์ หรือพิมพ์ความต้องการของคุณได้ทุกประเภท AI จะช่วยวิเคราะห์และเทียบเกณฑ์มาตรฐานอัตโนมัติ
              </p>
            </div>

            {/* Quick Presets Selection Chips */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                ตัวอย่างคำขอตามประเภทครุภัณฑ์ (Quick Presets)
              </label>
              <div className="flex flex-wrap gap-2">
                {QUICK_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition-all text-slate-700 flex items-center space-x-1"
                  >
                    <span>{preset.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-2">
              {/* Prompt Textarea */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  ความต้องการของคุณ (บรรยายภาษาธรรมชาติ)
                </label>
                <div className="relative">
                  <textarea
                    rows={4}
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    placeholder="เช่น ต้องการจัดซื้อเครื่องคอมพิวเตอร์สำหรับงานประมวลผลข้อมูล จำนวน 10 เครื่อง งบประมาณ 500,000 บาท..."
                    className="w-full text-sm p-4 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-slate-50/50 hover:bg-white transition-all shadow-inner"
                  />
                  <span className="absolute bottom-3 right-4 text-xs text-slate-400 font-mono">
                    {promptText.length}/1000
                  </span>
                </div>
              </div>

              {/* Item Category & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    กลุ่มหมวดหมู่ครุภัณฑ์
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full text-sm p-3 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  >
                    <option value="ครุภัณฑ์คอมพิวเตอร์">ครุภัณฑ์คอมพิวเตอร์และสารสนเทศ</option>
                    <option value="ครุภัณฑ์วิทยาศาสตร์">ครุภัณฑ์วิทยาศาสตร์และการแพทย์</option>
                    <option value="ครุภัณฑ์การศึกษา">ครุภัณฑ์การศึกษา</option>
                    <option value="ครุภัณฑ์สำนักงาน">ครุภัณฑ์สำนักงาน</option>
                    <option value="ครุภัณฑ์ยานพาหนะและขนส่ง">ครุภัณฑ์ยานพาหนะและขนส่ง</option>
                    <option value="ครุภัณฑ์การเกษตร">ครุภัณฑ์การเกษตร</option>
                    <option value="ครุภัณฑ์โฆษณาและเผยแพร่">ครุภัณฑ์โฆษณาและเผยแพร่</option>
                    <option value="ครุภัณฑ์อื่นๆ">ครุภัณฑ์อื่นๆ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    ชื่อรายการที่ต้องการจัดซื้อ
                  </label>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="เช่น เครื่องคอมพิวเตอร์ สำหรับงาน Data Science"
                    className="w-full text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  />
                </div>
              </div>

              {/* Quantity, Unit & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    จำนวน
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    หน่วยนับ
                  </label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="เครื่อง, ชุด, ตัว, คัน, จอ"
                    className="w-full text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    งบประมาณรวม (บาท)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={estimatedBudget}
                    onChange={(e) => setEstimatedBudget(Number(e.target.value))}
                    className="w-full text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-semibold text-indigo-700"
                  />
                </div>
              </div>

              {/* Department & Objective */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    หน่วยงาน / ส่วนงาน
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full text-sm p-3 border border-slate-200 rounded-xl bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  >
                    <option value="คณะวิทยาศาสตร์">คณะวิทยาศาสตร์</option>
                    <option value="คณะเทคโนโลยีสารสนเทศ">คณะเทคโนโลยีสารสนเทศ</option>
                    <option value="คณะแพทยศาสตร์">คณะแพทยศาสตร์</option>
                    <option value="คณะวิศวกรรมศาสตร์">คณะวิศวกรรมศาสตร์</option>
                    <option value="สำนักบริการวิชาการ">สำนักบริการวิชาการ</option>
                    <option value="สำนักงานคณบดี">สำนักงานคณบดี</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                    วัตถุประสงค์
                  </label>
                  <input
                    type="text"
                    value={objective}
                    onChange={(e) => setObjective(e.target.value)}
                    placeholder="เช่น เพื่อใช้ในการประมวลผลข้อมูลทางสถิติ และการวิจัย"
                    className="w-full text-sm p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => {
                  runAIAnalysis(promptText);
                  handleNext();
                }}
                disabled={isAnalyzing}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-heading font-bold text-sm shadow-md shadow-indigo-500/25 flex items-center space-x-2 transition-all hover:scale-105"
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
              <p className="text-sm text-slate-500 mt-0.5">
                สรุปข้อมูลที่ระบบ AI ตรวจสอบและสกัดได้จากข้อความ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column: Parsed Info */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                <h3 className="font-heading font-bold text-sm text-slate-700 uppercase tracking-wider">
                  ผลการวิเคราะห์
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">ประเภทครุภัณฑ์</span>
                    <span className="font-semibold text-slate-900">{displayCategory}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">ชื่อรายการ</span>
                    <span className="font-semibold text-slate-900 text-right max-w-[200px] truncate">
                      {displayTitle}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">วัตถุประสงค์</span>
                    <span className="font-semibold text-slate-900 text-right max-w-[200px] truncate">
                      {objective}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">จำนวน</span>
                    <span className="font-semibold text-slate-900">
                      {quantity} {unit}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">งบประมาณที่เสนอ</span>
                    <span className="font-bold text-indigo-700">
                      {estimatedBudget.toLocaleString()} บาท ({(estimatedBudget / (quantity || 1)).toLocaleString()} ฿/{unit})
                    </span>
                  </div>
                </div>

                {/* Thai text change: ความสอดคล้อง */}
                <div className="pt-2">
                  <div className="flex justify-between text-sm font-semibold text-slate-700 mb-1">
                    <span>ความสอดคล้อง</span>
                    <span className="text-indigo-600 font-bold">94%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full w-[94%] transition-all duration-500"></div>
                  </div>
                </div>
              </div>

              {/* Right Column: Readiness Checklist */}
              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4">
                <h3 className="font-heading font-bold text-sm text-slate-700 uppercase tracking-wider">
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
                        strokeDashoffset="45.2"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <div className="text-base font-heading font-bold text-slate-900">82%</div>
                      <div className="text-xs text-slate-400">ความพร้อม</div>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="space-y-1.5 text-sm">
                    <div className="flex items-center space-x-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>วัตถุประสงค์</span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>จำนวนและหน่วยนับ</span>
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
                      <span>ข้อกำหนดทางเทคนิค</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-sm text-indigo-900">
                  <span className="font-semibold">คำแนะนำ AI:</span>{" "}
                  ระบบพบรายการมาตรฐานที่ใกล้เคียงในฐานข้อมูลภาครัฐ กรุณาเลือกรายการในขั้นตอนถัดไป
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm font-semibold text-slate-700"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-heading font-bold shadow-md flex items-center space-x-1.5"
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
              <p className="text-sm text-slate-500 mt-0.5">
                คลิกเลือกรายการมาตรฐานที่ต้องการใช้ AI จะนำราคากลางและเอกสารอ้างอิงไปประมวลผลต่อ
              </p>
            </div>

            {/* Input Name Notice */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  ชื่อที่คุณระบุ
                </span>
                <p className="text-sm font-semibold text-amber-950 mt-0.5">
                  {displayTitle}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold border border-amber-200">
                {selectedStandardOption === 1 ? "✓ ตรงเกณฑ์เทียบเคียง" : "⚠ รายการทางเลือก"}
              </span>
            </div>

            {/* AI Recommended Match Card (Option 1) */}
            <div
              onClick={() => setSelectedStandardOption(1)}
              className={`border-2 rounded-3xl p-5 cursor-pointer transition-all shadow-md space-y-4 ${
                selectedStandardOption === 1
                  ? "border-indigo-600 bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-white ring-2 ring-indigo-500/30"
                  : "border-slate-200 bg-white hover:border-indigo-300 opacity-80"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      selectedStandardOption === 1
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-slate-300 bg-white"
                    }`}
                  >
                    {selectedStandardOption === 1 && <Check className="w-3 h-3" />}
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-heading font-bold">
                    อันดับ 1 (แนะนำ)
                  </span>
                </div>
                <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>ความสอดคล้อง 94%</span>
                </span>
              </div>

              <div>
                <h3 className="text-base font-heading font-bold text-slate-900">
                  {displayStandardName1}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  ราคามาตรฐาน (อ้างอิง):{" "}
                  <strong className="text-slate-900 text-sm">
                    {standardPrice1.toLocaleString()} บาท / {unit}
                  </strong>
                </p>
                <p className="text-xs text-slate-400">
                  อ้างอิง: สำนักงบประมาณ / กระทรวง DE ฉบับ เม.ย. 2569
                </p>
              </div>

              {/* Evidence Citation */}
              <div className="bg-white/80 border border-slate-200 rounded-xl p-3.5 text-xs space-y-1">
                <div className="font-semibold text-slate-800 flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  <span>แหล่งอ้างอิงทางการ:</span>
                </div>
                <p className="text-slate-600 pl-5">
                  เกณฑ์ราคากลางและคุณลักษณะพื้นฐาน ฉบับ พ.ศ. 2569 • หมวด{displayCategory}
                </p>
              </div>
            </div>

            {/* Alternative Option (Option 2) */}
            <div
              onClick={() => setSelectedStandardOption(2)}
              className={`border-2 rounded-2xl p-4 cursor-pointer transition-all flex items-center justify-between text-sm ${
                selectedStandardOption === 2
                  ? "border-indigo-600 bg-indigo-50/40 ring-2 ring-indigo-500/30"
                  : "border-slate-200 bg-slate-50/60 hover:bg-slate-100/60"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 shrink-0 ${
                    selectedStandardOption === 2
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-slate-300 bg-white"
                  }`}
                >
                  {selectedStandardOption === 2 && <Check className="w-3 h-3" />}
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    รายการทางเลือก (อันดับ 2)
                  </span>
                  <p className="font-semibold text-slate-800 mt-0.5">
                    {displayStandardName2}
                  </p>
                  <span className="text-xs text-slate-500">
                    {standardPrice2.toLocaleString()} บาท / {unit}
                  </span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-semibold">
                ความสอดคล้อง 86%
              </span>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm font-semibold text-slate-700"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-heading font-bold shadow-md flex items-center space-x-1.5"
              >
                <span>ใช้รายการนี้ ({selectedStandardOption === 1 ? "อันดับ 1" : "อันดับ 2"}) →</span>
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
                <p className="text-sm text-slate-500 mt-0.5">
                  เปรียบเทียบราคาจากราคามาตรฐาน, ราคากลางล่าสุด, ใบเสนอราคา และประวัติจัดซื้อ
                </p>
              </div>

              {/* Tab Switcher */}
              <div className="bg-slate-100 p-1 rounded-xl flex space-x-1 text-sm">
                <button
                  type="button"
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
                  type="button"
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

            {activePriceTab === "overview" ? (
              <>
                {/* 4 Cards Matrix */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      ราคามาตรฐาน (อ้างอิง)
                    </span>
                    <div className="text-xl font-heading font-bold text-slate-900 mt-1">
                      {activeStandardPrice.toLocaleString()} บาท
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">สำนักงบประมาณ 2569</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      ราคากลางล่าสุด (Median)
                    </span>
                    <div className="text-xl font-heading font-bold text-slate-900 mt-1">
                      {Math.round(activeStandardPrice * 1.11).toLocaleString()} บาท
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">8 รายการ (ใน 90 วัน)</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      ใบเสนอราคาต่ำสุด
                    </span>
                    <div className="text-xl font-heading font-bold text-emerald-600 mt-1">
                      {Math.round(activeStandardPrice * 1.096).toLocaleString()} บาท
                    </div>
                    <p className="text-xs text-emerald-700 mt-0.5">บริษัท เอ จำกัด</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                    <span className="text-xs font-bold text-slate-400 uppercase">
                      ประวัติจัดซื้อ (Median)
                    </span>
                    <div className="text-xl font-heading font-bold text-slate-900 mt-1">
                      {Math.round(activeStandardPrice * 1.12).toLocaleString()} บาท
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">จัดซื้อจริง มข. 2568</p>
                  </div>
                </div>

                {/* Range & Vendor Quotations */}
                <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <span className="text-sm font-semibold text-slate-600">
                      ช่วงราคาตลาดที่พบ:
                    </span>
                    <span className="text-sm font-bold text-indigo-700">
                      {Math.round(activeStandardPrice * 0.98).toLocaleString()} -{" "}
                      {Math.round(activeStandardPrice * 1.25).toLocaleString()} บาท / {unit}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-xs text-slate-700 uppercase tracking-wider">
                    ใบเสนอราคาที่แนบมา (Vendor Quotations)
                  </h4>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-slate-800">1. บริษัท ซิลิคอน ซิสเต็มส์ จำกัด</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-emerald-200 text-emerald-800 font-bold">
                          ⭐ ต่ำสุด
                        </span>
                      </div>
                      <span className="font-bold text-slate-900">
                        {Math.round(activeStandardPrice * 1.096).toLocaleString()} บาท / {unit}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-semibold text-slate-800">2. บริษัท ดาต้า อินโนเวชั่น จำกัด</span>
                      <span className="font-semibold text-slate-700">
                        {Math.round(activeStandardPrice * 1.14).toLocaleString()} บาท / {unit}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="font-semibold text-slate-800">3. บริษัท เทคโนโลยี พลัส จำกัด</span>
                      <span className="font-semibold text-slate-700">
                        {Math.round(activeStandardPrice * 1.16).toLocaleString()} บาท / {unit}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* TAB: กราฟแนวโน้ม (Price Trend Chart) */
              <div className="bg-white border border-slate-200/80 rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-base text-slate-900 flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
                      <span>แนวโน้มราคาจัดหาครุภัณฑ์ย้อนหลัง 3 ปี (พ.ศ. 2567 - 2570)</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      วิเคราะห์เปรียบเทียบระหว่างราคามาตรฐานสำนักงบฯ และราคาจัดหาจริงในระบบ
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold">
                    สถิติย้อนหลัง 36 เดือน
                  </span>
                </div>

                {/* SVG Visual Trend Graph */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
                  <div className="h-56 w-full flex items-end justify-between gap-4 pt-6 px-4">
                    {/* 2567 */}
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-xs font-bold text-slate-700">
                        {Math.round(activeStandardPrice * 0.92).toLocaleString()} ฿
                      </div>
                      <div className="w-full flex items-end justify-center gap-1.5 h-36">
                        <div
                          className="w-1/2 bg-slate-300 rounded-t-lg transition-all"
                          style={{ height: "65%" }}
                          title="ราคามาตรฐาน 2567"
                        ></div>
                        <div
                          className="w-1/2 bg-indigo-400 rounded-t-lg transition-all"
                          style={{ height: "72%" }}
                          title="ราคาจัดหาจริง 2567"
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-slate-600">ปี 2567</span>
                    </div>

                    {/* 2568 */}
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-xs font-bold text-slate-700">
                        {Math.round(activeStandardPrice * 0.96).toLocaleString()} ฿
                      </div>
                      <div className="w-full flex items-end justify-center gap-1.5 h-36">
                        <div
                          className="w-1/2 bg-slate-300 rounded-t-lg transition-all"
                          style={{ height: "70%" }}
                          title="ราคามาตรฐาน 2568"
                        ></div>
                        <div
                          className="w-1/2 bg-indigo-500 rounded-t-lg transition-all"
                          style={{ height: "78%" }}
                          title="ราคาจัดหาจริง 2568"
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-slate-600">ปี 2568</span>
                    </div>

                    {/* 2569 */}
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-xs font-bold text-slate-700">
                        {Math.round(activeStandardPrice * 0.98).toLocaleString()} ฿
                      </div>
                      <div className="w-full flex items-end justify-center gap-1.5 h-36">
                        <div
                          className="w-1/2 bg-slate-300 rounded-t-lg transition-all"
                          style={{ height: "75%" }}
                          title="ราคามาตรฐาน 2569"
                        ></div>
                        <div
                          className="w-1/2 bg-indigo-600 rounded-t-lg transition-all"
                          style={{ height: "82%" }}
                          title="ราคาจัดหาจริง 2569"
                        ></div>
                      </div>
                      <span className="text-xs font-semibold text-slate-600">ปี 2569</span>
                    </div>

                    {/* 2570 (Current) */}
                    <div className="flex-1 flex flex-col items-center gap-2">
                      <div className="text-xs font-bold text-indigo-700">
                        {activeStandardPrice.toLocaleString()} ฿
                      </div>
                      <div className="w-full flex items-end justify-center gap-1.5 h-36">
                        <div
                          className="w-1/2 bg-indigo-400 rounded-t-lg transition-all"
                          style={{ height: "85%" }}
                          title="ราคามาตรฐาน 2570"
                        ></div>
                        <div
                          className="w-1/2 bg-gradient-to-t from-indigo-600 to-purple-600 rounded-t-lg transition-all shadow-sm"
                          style={{ height: "92%" }}
                          title="ราคาที่ขอเสนอ 2570"
                        ></div>
                      </div>
                      <span className="text-xs font-bold text-indigo-700">ปี 2570 (ปัจจุบัน)</span>
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-6 pt-4 border-t border-slate-200/80 text-xs">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-3 h-3 rounded-xs bg-slate-300"></span>
                      <span className="text-slate-600">ราคามาตรฐานสำนักงบประมาณ</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-3 h-3 rounded-xs bg-indigo-600"></span>
                      <span className="text-slate-600">ราคาจัดซื้อจริง / ราคาตลาด</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900 space-y-1">
                  <div className="font-bold flex items-center space-x-1">
                    <Info className="w-3.5 h-3.5 text-indigo-600" />
                    <span>สรุปผลการวิเคราะห์แนวโน้มราคา:</span>
                  </div>
                  <p className="leading-relaxed">
                    ราคาตลาดมีแนวโน้มปรับตัวขึ้นเฉลี่ย 3.8% ต่อปีตามอัตราเงินเฟ้อและประสิทธิภาพของชิ้นส่วนฮาร์ดแวร์ วงเงินที่ท่านขออยู่ในเกณฑ์ราคาตลาดที่เหมาะสมและสมเหตุสมผล
                  </p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm font-semibold text-slate-700"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-heading font-bold shadow-md flex items-center space-x-1.5"
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
              <p className="text-sm text-slate-500 mt-0.5">
                การประเมินความเสี่ยงและแจ้งเตือนความสอดคล้องตามระเบียบพัสดุฯ
              </p>
            </div>

            {/* Alert Banner */}
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-3">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading font-bold text-sm">
                    วงเงินที่เสนอสูงกว่าราคามาตรฐานอ้างอิง (+{(
                      ((estimatedBudget / (quantity || 1) - activeStandardPrice) /
                        (activeStandardPrice || 1)) *
                      100
                    ).toFixed(1)}%)
                  </h3>
                  <p className="text-xs mt-1 text-amber-900 leading-relaxed">
                    AI แนะนำ: แนบใบเสนอราคา 3 ราย พร้อมหนังสือชี้แจงเหตุผลความจำเป็นทางวิชาการและการใช้งานตามระเบียบพัสดุฯ
                  </p>
                </div>
              </div>

              {/* Price comparison points */}
              <div className="pt-3 border-t border-amber-200/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div>
                  <span className="text-amber-800 text-xs">วงเงินที่เสนอ:</span>
                  <div className="font-bold text-amber-950">
                    {(estimatedBudget / (quantity || 1)).toLocaleString()} ฿/{unit}
                  </div>
                </div>
                <div>
                  <span className="text-amber-800 text-xs">ราคามาตรฐาน:</span>
                  <div className="font-semibold text-amber-950">
                    {activeStandardPrice.toLocaleString()} ฿/{unit}
                  </div>
                </div>
                <div>
                  <span className="text-amber-800 text-xs">ราคากลาง Median:</span>
                  <div className="font-semibold text-amber-950">
                    {Math.round(activeStandardPrice * 1.11).toLocaleString()} ฿
                  </div>
                </div>
                <div>
                  <span className="text-amber-800 text-xs">ใบเสนอราคาต่ำสุด:</span>
                  <div className="font-semibold text-amber-950">
                    {Math.round(activeStandardPrice * 1.096).toLocaleString()} ฿
                  </div>
                </div>
              </div>
            </div>

            {/* Actionable Requirements Checklist */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3">
              <h4 className="font-heading font-bold text-xs text-slate-700 uppercase tracking-wider">
                เอกสารและข้อปฏิบัติที่ต้องดำเนินการ
              </h4>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/50 border border-amber-100">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>แนบใบเสนอราคา 3 บริษัท (รวม PDF ไฟล์เดียว)</span>
                  </div>
                  <span className="text-xs font-bold text-amber-800">จำเป็นต้องแนบ</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50/50 border border-amber-100">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-600" />
                    <span>หนังสือชี้แจงเหตุผลความจำเป็นทางวิชาการ</span>
                  </div>
                  <span className="text-xs font-bold text-amber-800">จำเป็นต้องระบุ</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>ร่างสเปกเป็นกลาง ไม่ล็อคยี่ห้อ (Anti-Brand-Locking)</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-800">AI สร้างให้ในขั้นตอนถัดไป</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm font-semibold text-slate-700"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-heading font-bold shadow-md flex items-center space-x-1.5"
              >
                <span>ถัดไป (ร่างคำขอ) →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: ร่างคำของบประมาณ (8-10 หมวดหมู่) */}
        {currentStep === 6 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <h2 className="text-xl font-heading font-bold text-slate-900">
                  7. ร่างคำของบประมาณ (KKU Form)
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  AI สร้างร่างคำขอ 8 หมวดหมู่ตามแบบฟอร์มมาตรฐาน มหาวิทยาลัยขอนแก่น
                </p>
              </div>

              {/* Word & PDF Switcher and Preview Button */}
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-bold flex items-center space-x-1 shadow-xs transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>พรีวิวเอกสาร</span>
                </button>

                <div className="bg-slate-100 p-1 rounded-xl flex space-x-1 text-xs">
                  <button
                    type="button"
                    onClick={() => setPreviewDocType("word")}
                    className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                      previewDocType === "word"
                        ? "bg-white text-blue-700 shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    Word (.docx)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDocType("pdf")}
                    className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                      previewDocType === "pdf"
                        ? "bg-white text-rose-700 shadow-xs"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    PDF (ค่าเริ่มต้น)
                  </button>
                </div>
              </div>
            </div>

            {/* Accordion Form Preview */}
            <div className="border border-slate-200 rounded-2xl divide-y divide-slate-100 text-sm">
              <div className="p-4 bg-slate-50/60 font-semibold text-slate-900 flex justify-between items-center">
                <span>1. ชื่อครุภัณฑ์: {displayTitle}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">
                  {displayCategory}
                </span>
              </div>
              <div className="p-4 space-y-1">
                <span className="font-semibold text-slate-800">2. หลักการและเหตุผล:</span>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {analysis?.step5?.section2Necessity?.details ||
                    `เพื่อใช้ในการสนับสนุนการเรียนการสอน การวิจัย และการปฏิบัติงาน ${department} ซึ่งมีความจำเป็นในการยกระดับโครงสร้างพื้นฐานให้มีประสิทธิภาพ`}
                </p>
              </div>
              <div className="p-4 space-y-1">
                <span className="font-semibold text-slate-800">3. วัตถุประสงค์:</span>
                <p className="text-slate-600 leading-relaxed text-sm">
                  1. {objective}<br />
                  2. เพื่อเพิ่มขีดความสามารถการบริการทางวิชาการและงานวิจัยของมหาวิทยาลัยขอนแก่น
                </p>
              </div>
              <div className="p-4 space-y-1">
                <span className="font-semibold text-slate-800">4. ความจำเป็นเร่งด่วน:</span>
                <p className="text-slate-600 leading-relaxed text-sm">
                  {analysis?.step1?.urgencyReason ||
                    "เพื่อรองรับการเปิดภาคการศึกษาใหม่และโครงการวิจัยตามยุทธศาสตร์มหาวิทยาลัย"}
                </p>
              </div>
              <div className="p-4 flex flex-wrap justify-between gap-2 bg-slate-50/40 text-sm">
                <div>
                  <span className="font-semibold text-slate-800">5. จำนวน:</span> {quantity} {unit}
                </div>
                <div>
                  <span className="font-semibold text-slate-800">6. ราคาต่อหน่วย:</span>{" "}
                  {(estimatedBudget / (quantity || 1)).toLocaleString()} บาท
                </div>
                <div>
                  <span className="font-semibold text-indigo-700">7. วงเงินรวม:</span>{" "}
                  {estimatedBudget.toLocaleString()} บาท
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm font-semibold text-slate-700"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-heading font-bold shadow-md flex items-center space-x-1.5"
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
              <p className="text-sm text-slate-500 mt-0.5">
                AI สร้างร่าง TOR เชิงหน้าที่ ไม่ล็อคยี่ห้อ (Anti-Brand-Locking) ตาม พ.ร.บ. จัดซื้อจัดจ้างฯ
              </p>
            </div>

            {/* Spec Sections Accordion */}
            <div className="border border-slate-200 rounded-2xl divide-y divide-slate-100 text-sm">
              <div className="p-4 bg-slate-50/60 font-semibold text-slate-900 flex items-center justify-between">
                <span>1. คุณลักษณะทั่วไป (General Characteristics)</span>
                <Check className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="p-4 bg-slate-50/60 font-semibold text-slate-900 flex items-center justify-between">
                <span>2. คุณลักษณะเฉพาะเชิงหน้าที่ (Functional Specs)</span>
                <Check className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="p-4 space-y-2">
                <div className="font-semibold text-indigo-900 flex items-center justify-between">
                  <span>3. สมรรถนะหลักของอุปกรณ์</span>
                  <span className="text-xs text-indigo-600">อ้างอิง: เกณฑ์มาตรฐานภาครัฐ 2569</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-slate-700 leading-relaxed text-sm">
                  <li>
                    เป็น {displayTitle} ที่มีคุณสมบัติและมาตรฐานความปลอดภัยสากล
                  </li>
                  <li>รองรับการทำงานต่อเนื่อง มีระบบระบายความร้อนและความทนทานเชิงพาณิชย์</li>
                  <li>มีเอกสารรับรองมาตรฐานผลิตภัณฑ์ หรือเทียบเท่า</li>
                </ul>
              </div>

              <div className="p-4 space-y-2">
                <div className="font-semibold text-indigo-900 flex items-center justify-between">
                  <span>4. อุปกรณ์ประกอบและระบบเชื่อมต่อ</span>
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-slate-700 pl-5 text-sm">
                  มีอุปกรณ์เชื่อมต่อ สายสัญญาณ อุปกรณ์เสริม และเอกสารคู่มือภาษาไทย/อังกฤษครบชุดพร้อมใช้งาน
                </p>
              </div>

              <div className="p-4 font-semibold text-slate-800 flex items-center justify-between">
                <span>5. การรับประกันและบริการหลังการขาย — On-site Service ไม่น้อยกว่า 3 ปี</span>
                <Check className="w-4 h-4 text-emerald-600" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm font-semibold text-slate-700"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-heading font-bold shadow-md flex items-center space-x-1.5"
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
              <p className="text-sm text-slate-500 mt-0.5">
                เทียบเคียงกับ TOR หน่วยงานอื่น และอัปโหลดไฟล์หลักฐาน (Single Merged PDF)
              </p>
            </div>

            {/* Benchmark Section */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
              <h4 className="font-heading font-bold text-xs text-slate-700 uppercase tracking-wider">
                TOR ที่คล้ายกันในระบบ (Benchmark)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="font-semibold text-slate-800">มหาวิทยาลัย A (2569)</span>
                  <div className="text-emerald-600 font-bold text-xs mt-1">ความสอดคล้อง 92%</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="font-semibold text-slate-800">มหาวิทยาลัย B (2568)</span>
                  <div className="text-emerald-600 font-bold text-xs mt-1">ความสอดคล้อง 88%</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200">
                  <span className="font-semibold text-slate-800">หน่วยงาน C (2568)</span>
                  <div className="text-emerald-600 font-bold text-xs mt-1">ความสอดคล้อง 85%</div>
                </div>
              </div>
            </div>

            {/* Attachments Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-xs text-slate-700 uppercase tracking-wider">
                  เอกสารที่แนบในคำขอนี้ ({uploadedFiles.length} ไฟล์)
                </h4>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-indigo-600 font-bold hover:text-indigo-800 flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>เพิ่มไฟล์</span>
                </button>
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                className="hidden"
              />

              {/* Uploaded File List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-xs hover:border-indigo-200 transition-colors"
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <FileText className="w-4 h-4 text-rose-500 shrink-0" />
                      <div className="min-w-0">
                        <div className="font-semibold text-slate-800 truncate text-xs">
                          {file.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {file.size} • {file.uploadedAt}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(file.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="ลบไฟล์"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Interactive Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    const files = e.dataTransfer.files;
                    const newItems: UploadedFileItem[] = Array.from(files).map((f) => ({
                      id: `f-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                      name: f.name,
                      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
                      type: f.type || "application/octet-stream",
                      uploadedAt: "เมื่อสักครู่",
                    }));
                    setUploadedFiles((prev) => [...prev, ...newItems]);
                  }
                }}
                className="border-2 border-dashed border-indigo-200 hover:border-indigo-500 rounded-2xl p-8 text-center bg-indigo-50/20 hover:bg-indigo-50/40 transition-all cursor-pointer group"
              >
                <Upload className="w-8 h-8 text-indigo-500 group-hover:scale-110 mx-auto mb-2 transition-transform" />
                <p className="text-sm font-semibold text-slate-800">
                  คลิกเพื่อเลือกไฟล์ หรือลากไฟล์มาวางที่นี่
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  รองรับไฟล์ PDF, Word, รูปภาพ (แนะนำรวมเป็น Single Merged PDF เพื่อความสะดวกรวดเร็วในการตรวจสอบ)
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between">
              <button
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm font-semibold text-slate-700"
              >
                ย้อนกลับ
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-heading font-bold shadow-md flex items-center space-x-1.5"
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
              <p className="text-sm text-slate-500 mt-0.5">
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
                      strokeDashoffset="20.1"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <div className="text-2xl font-heading font-bold text-slate-900">92%</div>
                    <div className="text-xs text-slate-500">ความพร้อม</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-sm text-slate-900">
                    ความพร้อมของคำของบประมาณ
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    ข้อมูลครบถ้วน พร้อมสำหรับการเสนอผู้ตรวจระดับภาควิชา
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowScoreBreakdownModal(true)}
                    className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 underline"
                  >
                    🔍 ดูที่มาของคะแนนความพร้อม 92%
                  </button>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white border border-slate-200 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ความต้องการระบุชัดเจน (15%)</span>
                </div>
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white border border-slate-200 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>รายการมาตรฐานสำนักงบฯ/DE ตรงเกณฑ์ (20%)</span>
                </div>
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white border border-slate-200 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ราคากลางและใบเสนอราคา 4 แหล่ง (20%)</span>
                </div>
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white border border-slate-200 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>งบประมาณและความสมเหตุสมผล (15%)</span>
                </div>
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white border border-slate-200 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ร่างคำของบประมาณ 8 หมวดหมู่ มข. (15%)</span>
                </div>
                <div className="flex items-center space-x-2.5 p-2 rounded-xl bg-white border border-slate-200 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>ร่าง TOR เป็นกลาง ไม่ล็อคยี่ห้อ (15%)</span>
                </div>
              </div>
            </div>

            {/* Warning Note */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
              <span className="font-bold">ข้อควรระวัง:</span> เมื่อส่งคำขอแล้ว
              ข้อมูลจะถูกส่งต่อไปยังระบบตรวจสอบระดับภาควิชาและคณะเพื่อพิจารณาบรรจุแผนคำของบประมาณ
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <button
                onClick={handlePrev}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-sm font-semibold text-slate-700"
              >
                ย้อนกลับ
              </button>

              <div className="flex space-x-2">
                {/* Save Draft Button */}
                <button
                  type="button"
                  onClick={() => handleSubmitProposal("DRAFT")}
                  disabled={isSubmitted}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-sm font-semibold text-slate-700 flex items-center space-x-1.5 transition-colors disabled:opacity-50"
                >
                  {isSubmitted && actionType === "draft" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
                      <span>กำลังบันทึก...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>บันทึกแบบร่าง</span>
                    </>
                  )}
                </button>

                {/* Submit Proposal Button */}
                <button
                  type="button"
                  onClick={() => handleSubmitProposal("AI_ANALYZED")}
                  disabled={isSubmitted}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-heading font-bold text-sm shadow-md shadow-indigo-500/25 flex items-center space-x-1.5 transition-all hover:scale-105 disabled:opacity-50"
                >
                  {isSubmitted && actionType === "submit" ? (
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

      {/* DOCUMENT PREVIEW MODAL */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900">
                  พรีวิวเอกสารคำของบประมาณ (KKU Budget Form Preview)
                </h3>
                <p className="text-xs text-slate-500">
                  รูปแบบตามแบบฟอร์มขอตั้งงบประมาณครุภัณฑ์ มหาวิทยาลัยขอนแก่น
                </p>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-4 text-sm font-sans leading-relaxed text-slate-800">
              <div className="text-center pb-4 border-b border-slate-200">
                <div className="font-bold text-base text-slate-900">
                  แบบฟอร์มข้อเสนอโครงการจัดหาครุภัณฑ์ ประจำปีงบประมาณ พ.ศ. 2570
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  มหาวิทยาลัยขอนแก่น (Khon Kaen University)
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <strong className="text-slate-900">1. ชื่อครุภัณฑ์:</strong> {displayTitle}
                </div>
                <div>
                  <strong className="text-slate-900">2. หน่วยงาน:</strong> {department}
                </div>
                <div>
                  <strong className="text-slate-900">3. วงเงินที่ขอตั้งงบประมาณ:</strong>{" "}
                  {estimatedBudget.toLocaleString()} บาท (จำนวน {quantity} {unit} @ {(estimatedBudget / (quantity || 1)).toLocaleString()} บาท)
                </div>
                <div>
                  <strong className="text-slate-900">4. หลักการและเหตุผล:</strong>
                  <p className="text-slate-600 mt-0.5">
                    {analysis?.step5?.section2Necessity?.details ||
                      `เพื่อใช้สนับสนุนการเรียนการสอนและการวิจัยของ ${department} ซึ่งมีความจำเป็นต้องใช้ครุภัณฑ์ที่มีสมรรถนะสูง`}
                  </p>
                </div>
                <div>
                  <strong className="text-slate-900">5. วัตถุประสงค์:</strong>
                  <p className="text-slate-600 mt-0.5">1. {objective}</p>
                </div>
                <div>
                  <strong className="text-slate-900">6. แหล่งอ้างอิงราคากลาง:</strong>{" "}
                  {activeStandardName} ({activeStandardPrice.toLocaleString()} บาท)
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-slate-50 rounded-b-3xl">
              <span className="text-xs text-slate-500">
                ฟอร์แมตเอกสาร: <strong>{previewDocType.toUpperCase()}</strong>
              </span>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-white"
                >
                  ปิดหน้าต่าง
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert(`ดาวน์โหลดเอกสารแบบ ${previewDocType.toUpperCase()} เรียบร้อยแล้ว`);
                    setShowPreviewModal(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-xs flex items-center space-x-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>ดาวน์โหลด {previewDocType.toUpperCase()}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* READINESS SCORE BREAKDOWN MODAL */}
      {showScoreBreakdownModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-heading font-bold text-base text-slate-900">
                  ที่มาของคะแนนความพร้อม (Readiness Score: 92%)
                </h3>
                <p className="text-xs text-slate-500">
                  เกณฑ์การประเมินความพร้อม 6 มิติของระบบ SpecWise AI
                </p>
              </div>
              <button
                onClick={() => setShowScoreBreakdownModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-slate-800">1. ความชัดเจนของวัตถุประสงค์และความต้องการ</div>
                  <div className="text-slate-400">ระบุกลุ่มงานและลักษณะการใช้งานชัดเจน</div>
                </div>
                <span className="font-bold text-emerald-600">15 / 15%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-slate-800">2. การจับคู่มาตรฐานสำนักงบฯ / กระทรวง DE</div>
                  <div className="text-slate-400">มีรายการมาตรฐานเทียบเคียงตรงหมวดหมู่</div>
                </div>
                <span className="font-bold text-emerald-600">19 / 20%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-slate-800">3. การเทียบราคาตลาด 4 ฐาน (4-Source Matrix)</div>
                  <div className="text-slate-400">มีใบเสนอราคาและราคากลางอ้างอิงครบถ้วน</div>
                </div>
                <span className="font-bold text-emerald-600">18 / 20%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-slate-800">4. ความสมเหตุสมผลและเหตุผลความจำเป็น</div>
                  <div className="text-slate-400">ชี้แจงเหตุผลทางวิชาการและการรองรับผู้ใช้งาน</div>
                </div>
                <span className="font-bold text-emerald-600">13 / 15%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-slate-800">5. ความครบถ้วนของแบบฟอร์ม มข. 8 หมวดหมู่</div>
                  <div className="text-slate-400">ระบุข้อมูลแผนงาน โครงการ และผู้รับผิดชอบครบ</div>
                </div>
                <span className="font-bold text-emerald-600">14 / 15%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
                <div>
                  <div className="font-semibold text-slate-800">6. ร่าง TOR เป็นกลางตาม พ.ร.บ. จัดซื้อจัดจ้างฯ</div>
                  <div className="text-slate-400">ผ่านการตรวจ Anti-Brand-Locking Linter</div>
                </div>
                <span className="font-bold text-emerald-600">13 / 15%</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700">คะแนนรวมความพร้อม:</span>
              <span className="text-sm font-heading font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                92 / 100% (เกณฑ์ดีเยี่ยม)
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

