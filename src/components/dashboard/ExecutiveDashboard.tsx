"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Monitor,
  Clock,
  Edit3,
  CheckCircle2,
  AlertTriangle,
  Info,
  FileText,
  Scale,
  DollarSign,
  ShieldCheck,
  ArrowRight,
  Search,
  Plus,
  Microscope,
  Cpu,
  Layers,
  Check,
  TrendingUp,
} from "lucide-react";
import { DashboardMetrics, BudgetProposal } from "@/types/budget";

export function ExecutiveDashboard() {
  const router = useRouter();
  const [promptText, setPromptText] = useState("");
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [proposals, setProposals] = useState<BudgetProposal[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/dashboard/metrics")
      .then((res) => res.json())
      .then((data) => {
        if (data.metrics) setMetrics(data.metrics);
      })
      .catch(console.error);

    fetch("/api/requests")
      .then((res) => res.json())
      .then((data) => {
        if (data.proposals) setProposals(data.proposals);
      })
      .catch(console.error);
  }, []);

  const handleStartAnalysis = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = promptText.trim();
    if (query) {
      router.push(`/requests/new?prompt=${encodeURIComponent(query)}`);
    } else {
      router.push("/requests/new");
    }
  };

  return (
    <div className="space-y-7 animate-in fade-in duration-300">
      {/* 1. Hero AI Search / Prompt Card */}
      <div className="bg-gradient-to-r from-indigo-50/90 via-purple-50/50 to-blue-50/80 border border-indigo-100 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
        <div className="max-w-xl relative z-10 space-y-3">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
            ต้องการจัดซื้ออะไร?
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            บอกความต้องการของคุณ AI จะช่วยวิเคราะห์ ตรวจสอบมาตรฐานและราคาที่เหมาะสม
          </p>

          <form onSubmit={handleStartAnalysis} className="pt-2">
            <div className="bg-white rounded-2xl p-2 sm:p-2.5 border border-slate-200/90 shadow-md shadow-slate-200/50 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="เช่น เครื่องคอมพิวเตอร์สำหรับงาน Data Science จำนวน 10 เครื่อง..."
                className="flex-1 px-3 py-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-heading font-bold text-sm shadow-md shadow-indigo-500/25 flex items-center justify-center space-x-1.5 transition-all hover:scale-[1.02] shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>วิเคราะห์ด้วย AI</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Side 3D Robot & Analytics Illustration */}
        <div className="pointer-events-none absolute right-6 top-1/2 hidden h-52 w-80 -translate-y-1/2 select-none xl:block">
          <svg
            className="w-full h-full"
            viewBox="0 0 320 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="glow" x1="0" y1="0" x2="320" y2="200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1" stopOpacity="0.15" />
                <stop offset="1" stopColor="#A855F7" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="robotGrad" x1="180" y1="30" x2="260" y2="150" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4F46E5" />
                <stop offset="1" stopColor="#818CF8" />
              </linearGradient>
              <linearGradient id="chartGrad" x1="20" y1="20" x2="160" y2="160" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFFFF" />
                <stop offset="1" stopColor="#F1F5F9" />
              </linearGradient>
            </defs>

            <rect width="320" height="200" rx="20" fill="url(#glow)" />

            {/* Dashboard Floating UI Card */}
            <g transform="translate(30, 25)" filter="drop-shadow(0 10px 15px rgba(99,102,241,0.12))">
              <rect width="140" height="110" rx="14" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
              <circle cx="20" cy="20" r="6" fill="#6366F1" />
              <line x1="32" y1="20" x2="90" y2="20" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
              {/* Mini Chart Bars */}
              <rect x="20" y="80" width="12" height="20" rx="3" fill="#C7D2FE" />
              <rect x="38" y="60" width="12" height="40" rx="3" fill="#818CF8" />
              <rect x="56" y="45" width="12" height="55" rx="3" fill="#6366F1" />
              <rect x="74" y="68" width="12" height="32" rx="3" fill="#C7D2FE" />
              <rect x="92" y="50" width="12" height="50" rx="3" fill="#4F46E5" />
              <rect x="110" y="35" width="12" height="65" rx="3" fill="#10B981" />
              {/* Trend Line */}
              <path d="M26 80 L44 60 L62 45 L80 68 L98 50 L116 35" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" fill="none" />
            </g>

            {/* AI Assistant Robot Head */}
            <g transform="translate(190, 30)" filter="drop-shadow(0 12px 20px rgba(79,70,229,0.2))">
              {/* Outer Body */}
              <rect x="10" y="20" width="80" height="70" rx="24" fill="url(#robotGrad)" />
              {/* Antenna */}
              <line x1="50" y1="20" x2="50" y2="6" stroke="#6366F1" strokeWidth="4" strokeLinecap="round" />
              <circle cx="50" cy="5" r="5" fill="#38BDF8" />
              {/* Face Screen */}
              <rect x="20" y="32" width="60" height="46" rx="16" fill="#0F172A" />
              {/* Glowing Eyes */}
              <circle cx="38" cy="55" r="6" fill="#38BDF8" />
              <circle cx="62" cy="55" r="6" fill="#38BDF8" />
              <circle cx="40" cy="53" r="2" fill="#FFFFFF" />
              <circle cx="64" cy="53" r="2" fill="#FFFFFF" />
              {/* Smile */}
              <path d="M44 67 Q50 72 56 67" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Ears */}
              <rect x="2" y="42" width="8" height="26" rx="4" fill="#818CF8" />
              <rect x="90" y="42" width="8" height="26" rx="4" fill="#818CF8" />
            </g>

            {/* Floating Sparkles & Badges */}
            <g transform="translate(170, 110)">
              <circle cx="15" cy="15" r="14" fill="#FFFFFF" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.06))" />
              <path d="M15 8 L17 13 L22 15 L17 17 L15 22 L13 17 L8 15 L13 13 Z" fill="#6366F1" />
            </g>
          </svg>
        </div>
      </div>

      {/* 2. Overview Metrics Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-slate-900 text-base">
            ภาพรวมคำของบประมาณปี 2570
          </h2>
          <Link
            href="/requests"
            className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 transition-colors"
          >
            <span>ดูทั้งหมด</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* 1. Total Requests */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-slate-900 leading-tight">
                161
              </div>
              <div className="text-sm font-semibold text-slate-600 mt-0.5">รายการทั้งหมด</div>
              <p className="text-sm text-slate-400 mt-1">เพิ่มขึ้น 12% จากเดือนที่แล้ว</p>
            </div>
          </div>

          {/* 2. Pending Review */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-slate-900 leading-tight">
                24
              </div>
              <div className="text-sm font-semibold text-slate-600 mt-0.5">รอตรวจสอบ</div>
              <p className="text-sm text-amber-600 font-medium mt-1">ต้องดำเนินการ</p>
            </div>
          </div>

          {/* 3. Needs Revision */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Edit3 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-slate-900 leading-tight">
                8
              </div>
              <div className="text-sm font-semibold text-slate-600 mt-0.5">ต้องแก้ไข</div>
              <p className="text-sm text-rose-600 font-medium mt-1">รอการแก้ไข</p>
            </div>
          </div>

          {/* 4. Ready to Submit */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow flex items-start space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-slate-900 leading-tight">
                3
              </div>
              <div className="text-sm font-semibold text-slate-600 mt-0.5">พร้อมส่ง</div>
              <p className="text-sm text-emerald-600 font-medium mt-1">พร้อมเสนออนุมัติ</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Middle 3-Column Section */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
        {/* Column 1: รายการที่ต้องดำเนินการ */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-sm text-slate-900 mb-4">
              รายการที่ต้องดำเนินการ
            </h3>

            <div className="space-y-3">
              {/* Item 1 */}
              <Link
                href="/requests"
                className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-slate-100 p-3 transition-all hover:border-indigo-100 hover:bg-indigo-50/30 sm:flex-row sm:items-center"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Computer Lab</h4>
                    <p className="text-sm text-slate-400">คณะวิทยาศาสตร์</p>
                  </div>
                </div>
                <div className="w-full text-left sm:w-auto sm:text-right">
                  <span className="inline-flex items-center text-sm px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                    ⚠ ตรวจสอบวงเงิน
                  </span>
                  <div className="text-sm font-bold text-slate-800 mt-1">520,000 บาท</div>
                  <div className="text-sm text-slate-400">25 พ.ค. 2569</div>
                </div>
              </Link>

              {/* Item 2 */}
              <Link
                href="/requests"
                className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-slate-100 p-3 transition-all hover:border-emerald-100 hover:bg-emerald-50/30 sm:flex-row sm:items-center"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Microscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Microscope</h4>
                    <p className="text-sm text-slate-400">คณะวิทยาศาสตร์</p>
                  </div>
                </div>
                <div className="w-full text-left sm:w-auto sm:text-right">
                  <span className="inline-flex items-center text-sm px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                    ✓ ผ่านมาตรฐาน
                  </span>
                  <div className="text-sm font-bold text-slate-800 mt-1">1,250,000 บาท</div>
                  <div className="text-sm text-slate-400">24 พ.ค. 2569</div>
                </div>
              </Link>

              {/* Item 3 */}
              <Link
                href="/requests"
                className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-slate-100 p-3 transition-all hover:border-rose-100 hover:bg-rose-50/30 sm:flex-row sm:items-center"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">GPU Workstation</h4>
                    <p className="text-sm text-slate-400">คณะเทคโนโลยีสารสนเทศ</p>
                  </div>
                </div>
                <div className="w-full text-left sm:w-auto sm:text-right">
                  <span className="inline-flex items-center text-sm px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-medium">
                    ⚠ Spec ไม่สอดคล้อง
                  </span>
                  <div className="text-sm font-bold text-slate-800 mt-1">850,000 บาท</div>
                  <div className="text-sm text-slate-400">23 พ.ค. 2569</div>
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <Link
              href="/requests"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center space-x-1"
            >
              <span>ดูรายการทั้งหมด</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Column 2: ความคืบหน้าการจัดทำคำของบประมาณ */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-sm text-slate-900 mb-4">
              ความคืบหน้าการจัดทำคำของบประมาณ
            </h3>

            <div className="flex flex-col items-center justify-between gap-5 sm:flex-row sm:items-center">
              {/* Circular Gauge */}
              <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
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
                    stroke="#4F46E5"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset="138.16" /* 45% */
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <div className="absolute text-center">
                  <div className="text-xl font-heading font-bold text-slate-900">45%</div>
                  <div className="text-sm text-slate-400">ดำเนินการแล้ว</div>
                </div>
              </div>

              {/* Steps Status List */}
              <div className="space-y-1.5 text-sm flex-1">
                <div className="flex items-center space-x-2 text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm">
                    ✓
                  </div>
                  <span className="text-sm font-medium">1. ความต้องการ</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm">
                    ✓
                  </div>
                  <span className="text-sm font-medium">2. รายการที่แนะนำ</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm">
                    ✓
                  </div>
                  <span className="text-sm font-medium">3. ราคาอ้างอิง</span>
                </div>
                <div className="flex items-center space-x-2 text-indigo-700 font-semibold">
                  <div className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm">
                    4
                  </div>
                  <span className="text-sm">4. ตรวจสอบวงเงิน</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400">
                  <div className="w-4 h-4 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center text-sm">
                    5
                  </div>
                  <span className="text-sm">5. ร่างคำของบประมาณ</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400">
                  <div className="w-4 h-4 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center text-sm">
                    6
                  </div>
                  <span className="text-sm">6. Specification</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <Link
              href="/requests/new"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center space-x-1"
            >
              <span>ดำเนินการต่อ</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Column 3: การแจ้งเตือน */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-sm text-slate-900 mb-4">
              การแจ้งเตือน
            </h3>

            <div className="space-y-3">
              {/* Alert 1 */}
              <div className="p-3 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    วงเงินสูงกว่าข้อมูลอ้างอิง
                  </h4>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-sm text-slate-500">Computer Lab</span>
                    <span className="text-sm text-slate-400">5 นาทีที่แล้ว</span>
                  </div>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="p-3 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Info className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    แนบใบเสนอราคา
                  </h4>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-sm text-slate-500">GPU Workstation</span>
                    <span className="text-sm text-slate-400">1 ชั่วโมงที่แล้ว</span>
                  </div>
                </div>
              </div>

              {/* Alert 3 */}
              <div className="p-3 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    มาตรฐานอัปเดต
                  </h4>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-sm text-slate-500 truncate">
                      กระทรวงดิจิทัลฯ ฉบับ พ.ศ. 2569
                    </span>
                    <span className="text-sm text-slate-400 shrink-0 ml-1">
                      3 ชั่วโมงที่แล้ว
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <Link
              href="/notifications"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 inline-flex items-center space-x-1"
            >
              <span>ดูการแจ้งเตือนทั้งหมด</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Bottom Row: "AI ช่วยอะไรคุณได้บ้าง?" (5 Interactive Cards) */}
      <div className="bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-blue-50/40 border border-indigo-100/70 rounded-3xl p-6 shadow-xs space-y-4">
        <h3 className="font-heading font-bold text-sm text-indigo-950">
          AI ช่วยอะไรคุณได้บ้าง?
        </h3>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {/* 1. ตรวจสอบชื่อครุภัณฑ์ */}
          <Link
            href="/requests/new?step=2"
            className="bg-white border border-slate-200/80 hover:border-emerald-200 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">
              ตรวจสอบชื่อครุภัณฑ์
            </h4>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              ตรวจสอบความถูกต้องของชื่อและมาตรฐาน
            </p>
          </Link>

          {/* 2. เปรียบเทียบราคา */}
          <Link
            href="/requests/new?step=3"
            className="bg-white border border-slate-200/80 hover:border-purple-200 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-purple-700">
              เปรียบเทียบราคา
            </h4>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              เปรียบเทียบราคาจากหลายแหล่งอ้างอิง
            </p>
          </Link>

          {/* 3. ตรวจสอบวงเงิน */}
          <Link
            href="/requests/new?step=4"
            className="bg-white border border-slate-200/80 hover:border-emerald-200 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">
              ตรวจสอบวงเงิน
            </h4>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              AI วิเคราะห์ความเหมาะสมของวงเงิน
            </p>
          </Link>

          {/* 4. ร่างเอกสารอัตโนมัติ */}
          <Link
            href="/requests/new?step=5"
            className="bg-white border border-slate-200/80 hover:border-indigo-200 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700">
              ร่างเอกสารอัตโนมัติ
            </h4>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              สร้างร่างคำของบประมาณ และ Spec
            </p>
          </Link>

          {/* 5. แหล่งอ้างอิงชัดเจน */}
          <Link
            href="/catalogs"
            className="bg-white border border-slate-200/80 hover:border-blue-200 rounded-2xl p-4 shadow-xs hover:shadow-md transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
              แหล่งอ้างอิงชัดเจน
            </h4>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              ทุกคำแนะนำมาพร้อมแหล่งอ้างอิงที่ตรวจสอบได้
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
