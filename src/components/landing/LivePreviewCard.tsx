"use client";

import React, { useState, useEffect } from "react";
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Search,
  FileCheck2,
  TrendingDown,
  ArrowRight,
  Database,
  Layers,
  Cpu,
  BadgeAlert,
  AlertCircle,
} from "lucide-react";

export function LivePreviewCard() {
  const [activeStep, setActiveStep] = useState(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const steps = [
    {
      id: 1,
      title: "Step 1: วิเคราะห์เจตนา & ปริมาณ",
      desc: "ตรวจจับความต้องการ: เครื่องประมวลผล AI & Data Science 2 เครื่อง",
      status: "done",
      time: "0.8s",
    },
    {
      id: 2,
      title: "Step 2: จับคู่มาตรฐาน & Citations",
      desc: "ตรงกับ: เครื่องคอมพิวเตอร์ประมวลผลระดับสูง (สำนักงบประมาณ 2569 หน้า 42 ข้อ 3.2)",
      status: "done",
      time: "1.2s",
    },
    {
      id: 3,
      title: "Step 3: ตรวจสอบราคากลาง 4 ฐาน",
      desc: "ตรวจพบราคาเฉลี่ย 120,000 บ. (ตรงเกณฑ์กระทรวง DE 2569 & มข.)",
      status: "active",
      time: "0.9s",
    },
    {
      id: 4,
      title: "Step 4: ประเมินความสมเหตุสมผล",
      desc: "ผ่านเกณฑ์งบลงทุน มข. ไม่เกินเพดานภาควิชา พร้อมข้อกำหนดพัสดุครบ",
      status: "done",
      time: "0.6s",
    },
    {
      id: 5,
      title: "Step 5: ร่างแบบฟอร์ม 8 หมวดหมู่",
      desc: "จัดเตรียมเอกสารคำขอตามระเบียบมหาวิทยาลัยขอนแก่น พร้อมส่งออก PDF",
      status: "done",
      time: "1.4s",
    },
    {
      id: 6,
      title: "Step 6: สเปกกลางไร้การล็อคสเปก",
      desc: "ปลดชื่อยี่ห้อการค้าเป็นเกณฑ์สมรรถนะ (100% Brand-Neutral Guarantee)",
      status: "done",
      time: "1.1s",
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 6) + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div
      className="relative rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-lg shadow-indigo-500/5 text-slate-900 overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-50/60 rounded-full blur-3xl pointer-events-none" />

      {/* Card Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 fill-white/20" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-bold text-sm text-slate-900">
                ระบบวิเคราะห์คำของบประมาณแบบเรียลไทม์
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 animate-pulse">
                ● AI Active
              </span>
            </div>
            <p className="text-xs text-slate-400">
              ตัวอย่าง: คำของบประมาณเครื่องคอมพิวเตอร์แม่ข่าย AI Research
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5 text-xs bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200/80 text-slate-600">
          <Database className="w-3.5 h-3.5 text-indigo-600" />
          <span className="font-medium">4 ฐานข้อมูลราคากลาง</span>
        </div>
      </div>

      {/* Live AI Progress Tracker */}
      <div className="py-4 relative z-10">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span className="font-medium">ความคืบหน้า 6-Step AI Engine</span>
          <span className="font-mono text-indigo-600 font-bold">100% Verified</span>
        </div>
        <div className="grid grid-cols-6 gap-1.5 mb-3.5">
          {steps.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setIsAutoPlaying(false);
                setActiveStep(s.id);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                s.id === activeStep
                  ? "bg-indigo-600 shadow-sm shadow-indigo-500/30 scale-y-125"
                  : s.id < activeStep
                  ? "bg-emerald-500"
                  : "bg-slate-200"
              }`}
              title={s.title}
            />
          ))}
        </div>

        {/* Highlighted Active Step Card */}
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3.5 transition-all duration-300">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start space-x-2.5">
              <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-bold font-mono shrink-0 shadow-xs">
                0{activeStep}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 font-heading">
                  {steps[activeStep - 1].title}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {steps[activeStep - 1].desc}
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0 font-bold">
              ⚡ {steps[activeStep - 1].time}
            </span>
          </div>
        </div>
      </div>

      {/* 4-Source Evidence Cross-Check Matrix Preview */}
      <div className="pt-3 pb-1 border-t border-slate-100 relative z-10">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
          <span className="flex items-center space-x-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>ผลการตรวจสอบราคากลาง 4 ฐาน (Evidence Sources)</span>
          </span>
          <span className="text-[11px] text-emerald-700 font-bold">สมเหตุสมผล ✓</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
            <span className="text-[10px] text-slate-400 block truncate">1. สำนักงบประมาณ 2569</span>
            <span className="font-mono font-bold text-slate-900 text-xs block mt-0.5">120,000 ฿</span>
            <span className="text-[9px] text-emerald-700 flex items-center gap-0.5 mt-1 font-medium">
              <CheckCircle2 className="w-2.5 h-2.5" /> ตรงเกณฑ์ น.42
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
            <span className="text-[10px] text-slate-400 block truncate">2. กระทรวง DE 2569</span>
            <span className="font-mono font-bold text-slate-900 text-xs block mt-0.5">118,500 ฿</span>
            <span className="text-[9px] text-emerald-700 flex items-center gap-0.5 mt-1 font-medium">
              <CheckCircle2 className="w-2.5 h-2.5" /> เกณฑ์ ICT
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
            <span className="text-[10px] text-slate-400 block truncate">3. บัญชีจัดซื้อ มข.</span>
            <span className="font-mono font-bold text-slate-900 text-xs block mt-0.5">119,000 ฿</span>
            <span className="text-[9px] text-emerald-700 flex items-center gap-0.5 mt-1 font-medium">
              <CheckCircle2 className="w-2.5 h-2.5" /> สัญญา 68/12
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-2.5">
            <span className="text-[10px] text-slate-400 block truncate">4. ราคาตลาด / Quotation</span>
            <span className="font-mono font-bold text-indigo-700 text-xs block mt-0.5">122,000 ฿</span>
            <span className="text-[9px] text-indigo-700 flex items-center gap-0.5 mt-1 font-medium">
              <CheckCircle2 className="w-2.5 h-2.5" /> 3 ใบเสนอราคา
            </span>
          </div>
        </div>
      </div>

      {/* Safety & Compliance Badge Footer */}
      <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 relative z-10">
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-[11px] text-slate-600">
            ตรวจไม่พบชื่อทางการค้า • ป้องกันการล็อคสเปก 100%
          </span>
        </div>
        <div className="flex items-center space-x-1 font-mono text-[11px] text-indigo-600 font-bold">
          <span>ประหยัดเวลา -85%</span>
        </div>
      </div>
    </div>
  );
}
