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
  ArrowRight,
  Microscope,
} from "lucide-react";
import { DashboardMetrics, BudgetProposal } from "@/types/budget";

export function ExecutiveDashboard() {
  const router = useRouter();
  const [promptText, setPromptText] = useState("");
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [proposals, setProposals] = useState<BudgetProposal[]>([]);

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
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Hero AI Search / Prompt Card */}
      <div className="bg-gradient-to-r from-[#EEF2FF] via-[#F5F3FF] to-[#EFF6FF] border border-[#E0E7FF] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xs">
        <div className="max-w-xl relative z-10 space-y-3">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
            ต้องการจัดซื้ออะไร?
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            บอกความต้องการของคุณ AI จะช่วยวิเคราะห์ ตรวจสอบมาตรฐานและราคาที่เหมาะสม
          </p>

          <form onSubmit={handleStartAnalysis} className="pt-2">
            <div className="bg-white rounded-2xl p-1.5 sm:p-2 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="text"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="เช่น เครื่องคอมพิวเตอร์สำหรับงาน Data Science จำนวน..."
                className="flex-1 px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-semibold text-xs sm:text-sm shadow-md shadow-indigo-500/25 flex items-center justify-center space-x-1.5 transition-all hover:scale-[1.01] shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>วิเคราะห์ด้วย AI</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Side Illustration Container */}
        <div className="pointer-events-none absolute right-6 top-1/2 hidden h-44 w-72 -translate-y-1/2 select-none xl:block">
          <div className="w-full h-full rounded-2xl bg-[#EDE9FE]/70 border border-purple-200/50 p-3 flex items-center justify-center relative overflow-hidden shadow-xs">
            <svg
              className="w-full h-full"
              viewBox="0 0 260 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="robotGrad" x1="160" y1="20" x2="220" y2="110" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4F46E5" />
                  <stop offset="1" stopColor="#818CF8" />
                </linearGradient>
              </defs>

              {/* Mini Dashboard Chart Card */}
              <g transform="translate(15, 15)" filter="drop-shadow(0 4px 6px rgba(99,102,241,0.12))">
                <rect width="115" height="90" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
                <circle cx="14" cy="14" r="4" fill="#6366F1" />
                <line x1="24" y1="14" x2="70" y2="14" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
                {/* Mini Chart Bars */}
                <rect x="14" y="62" width="10" height="18" rx="2" fill="#C7D2FE" />
                <rect x="29" y="48" width="10" height="32" rx="2" fill="#818CF8" />
                <rect x="44" y="36" width="10" height="44" rx="2" fill="#6366F1" />
                <rect x="59" y="52" width="10" height="28" rx="2" fill="#C7D2FE" />
                <rect x="74" y="40" width="10" height="40" rx="2" fill="#4F46E5" />
                <rect x="89" y="28" width="10" height="52" rx="2" fill="#10B981" />
                {/* Trend Line */}
                <path d="M19 62 L34 48 L49 36 L64 52 L79 40 L94 28" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </g>

              {/* AI Robot Head */}
              <g transform="translate(150, 15)" filter="drop-shadow(0 6px 12px rgba(79,70,229,0.25))">
                <rect x="8" y="16" width="64" height="56" rx="18" fill="url(#robotGrad)" />
                {/* Antenna */}
                <line x1="40" y1="16" x2="40" y2="6" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" />
                <circle cx="40" cy="5" r="4" fill="#38BDF8" />
                {/* Face Screen */}
                <rect x="16" y="26" width="48" height="36" rx="12" fill="#0F172A" />
                {/* Glowing Eyes */}
                <circle cx="30" cy="44" r="4.5" fill="#38BDF8" />
                <circle cx="50" cy="44" r="4.5" fill="#38BDF8" />
                <circle cx="31.5" cy="42.5" r="1.5" fill="#FFFFFF" />
                <circle cx="51.5" cy="42.5" r="1.5" fill="#FFFFFF" />
                {/* Smile */}
                <path d="M35 52 Q40 56 45 52" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                {/* Ears */}
                <rect x="2" y="32" width="6" height="20" rx="3" fill="#818CF8" />
                <rect x="72" y="32" width="6" height="20" rx="3" fill="#818CF8" />
              </g>

              {/* Middle Sparkle Badge */}
              <g transform="translate(138, 75)">
                <circle cx="10" cy="10" r="9" fill="#FFFFFF" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.08))" />
                <path d="M10 5 L11.5 8.5 L15 10 L11.5 11.5 L10 15 L8.5 11.5 L5 10 L8.5 8.5 Z" fill="#6366F1" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Overview Metrics Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-slate-900 text-sm sm:text-base">
            ภาพรวมคำของบประมาณปี 2570
          </h2>
          <Link
            href="/requests"
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center space-x-0.5 transition-colors"
          >
            <span>ดูทั้งหมด</span>
            <ArrowRight className="w-3 h-3 ml-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {/* 1. Total Requests */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-shadow flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-slate-900 leading-tight">
                161
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">รายการทั้งหมด</div>
              <p className="text-[11px] text-slate-400 mt-0.5">เพิ่มขึ้น 12% จากเดือนที่แล้ว</p>
            </div>
          </div>

          {/* 2. Pending Review */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-shadow flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-slate-900 leading-tight">
                24
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">รอตรวจสอบ</div>
              <p className="text-[11px] text-amber-600 font-medium mt-0.5">ต้องดำเนินการ</p>
            </div>
          </div>

          {/* 3. Needs Revision */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-shadow flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-slate-900 leading-tight">
                8
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">ต้องแก้ไข</div>
              <p className="text-[11px] text-rose-600 font-medium mt-0.5">รอการแก้ไข</p>
            </div>
          </div>

          {/* 4. Ready to Submit */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs hover:shadow-md transition-shadow flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-slate-900 leading-tight">
                3
              </div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">พร้อมส่ง</div>
              <p className="text-[11px] text-emerald-600 font-medium mt-0.5">พร้อมเสนออนุมัติ</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Middle 3-Column Section */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-3">
        {/* Column 1: รายการที่ต้องดำเนินการ */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-sm text-slate-900 mb-3.5">
              รายการที่ต้องดำเนินการ
            </h3>

            <div className="space-y-2.5">
              {/* Item 1 */}
              <Link
                href="/requests"
                className="flex items-center justify-between gap-2 rounded-2xl border border-slate-100 p-3 transition-all hover:border-indigo-100 hover:bg-slate-50/50"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">Computer Lab</h4>
                    <p className="text-[11px] text-slate-400 truncate">คณะวิทยาศาสตร์</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                    ⚠ ตรวจสอบวงเงิน
                  </span>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">520,000 บาท</div>
                  <div className="text-[10px] text-slate-400">25 พ.ค. 2569</div>
                </div>
              </Link>

              {/* Item 2 */}
              <Link
                href="/requests"
                className="flex items-center justify-between gap-2 rounded-2xl border border-slate-100 p-3 transition-all hover:border-emerald-100 hover:bg-slate-50/50"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Microscope className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">Microscope</h4>
                    <p className="text-[11px] text-slate-400 truncate">คณะวิทยาศาสตร์</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-flex items-center text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                    ✓ ผ่านมาตรฐาน
                  </span>
                  <div className="text-xs font-bold text-slate-800 mt-0.5">1,250,000 บาท</div>
                  <div className="text-[10px] text-slate-400">24 พ.ค. 2569</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Column 2: ความคืบหน้าการจัดทำคำของบประมาณ */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-sm text-slate-900 mb-3.5">
              ความคืบหน้าการจัดทำคำของบประมาณ
            </h3>

            <div className="flex items-center justify-center gap-6 py-1">
              {/* Circular Gauge */}
              <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
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
                    strokeDashoffset="138.16"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <div className="absolute text-center">
                  <div className="text-lg font-heading font-bold text-slate-900">45%</div>
                  <div className="text-[10px] text-slate-400">ดำเนินการแล้ว</div>
                </div>
              </div>

              {/* Steps Status List */}
              <div className="space-y-1 text-xs flex-1 min-w-0">
                <div className="flex items-center space-x-2 text-slate-700">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                    ✓
                  </div>
                  <span className="text-xs font-medium truncate">1. ความต้องการ</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-700">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                    ✓
                  </div>
                  <span className="text-xs font-medium truncate">2. รายการที่แนะนำ</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-700">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                    ✓
                  </div>
                  <span className="text-xs font-medium truncate">3. ราคาอ้างอิง</span>
                </div>
                <div className="flex items-center space-x-2 text-indigo-700 font-bold">
                  <div className="w-3.5 h-3.5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                    4
                  </div>
                  <span className="text-xs truncate">4. ตรวจสอบวงเงิน</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400">
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center text-[9px] shrink-0">
                    5
                  </div>
                  <span className="text-xs truncate">5. ร่างคำของบประมาณ</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-400">
                  <div className="w-3.5 h-3.5 rounded-full border border-slate-300 text-slate-400 flex items-center justify-center text-[9px] shrink-0">
                    6
                  </div>
                  <span className="text-xs truncate">6. Specification</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: การแจ้งเตือน */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-bold text-sm text-slate-900 mb-3.5">
              การแจ้งเตือน
            </h3>

            <div className="space-y-2.5">
              {/* Alert 1 */}
              <div className="p-2.5 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors flex items-start space-x-2.5">
                <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    วงเงินสูงกว่าข้อมูลอ้างอิง
                  </h4>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[11px] text-slate-500 truncate">Computer Lab</span>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-1">5 นาทีที่แล้ว</span>
                  </div>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="p-2.5 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors flex items-start space-x-2.5">
                <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 mt-0.5">
                  <Info className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    แนบใบเสนอราคา
                  </h4>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[11px] text-slate-500 truncate">GPU Workstation</span>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-1">1 ชั่วโมงที่แล้ว</span>
                  </div>
                </div>
              </div>

              {/* Alert 3 */}
              <div className="p-2.5 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors flex items-start space-x-2.5">
                <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    มาตรฐานอัปเดต
                  </h4>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[11px] text-slate-500 truncate">
                      กระทรวงดิจิทัลฯ ฉบับ ...
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0 ml-1">
                      3 ชั่วโมงที่แล้ว
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

