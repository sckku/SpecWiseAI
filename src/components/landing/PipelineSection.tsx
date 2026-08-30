"use client";

import React from "react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Search,
  Scale,
  ShieldAlert,
  FileCheck2,
  Layers,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export function PipelineSection() {
  const steps = [
    {
      num: "01",
      icon: Cpu,
      title: "วิเคราะห์เจตนา & สเปก",
      subtitle: "Intent & Specs Parser",
      detail: "สกัดความต้องการ จำนวน และอุปกรณ์เสริมจากข้อความหรือเอกสารของผู้ขอ",
      color: "border-indigo-100 text-indigo-600 bg-indigo-50",
      output: "Structured Items JSON",
    },
    {
      num: "02",
      icon: Search,
      title: "เทียบชื่อมาตรฐาน & RAG",
      subtitle: "Standard Matcher & Citation",
      detail: "ค้นหาหมวดครุภัณฑ์ที่ตรงกับบัญชีมาตรฐาน สำนักงบฯ, DE 2569 และ มข.",
      color: "border-blue-100 text-blue-600 bg-blue-50",
      output: "Standard Item + Page Citation",
    },
    {
      num: "03",
      icon: Scale,
      title: "ตรวจสอบราคากลาง 4 ฐาน",
      subtitle: "4-Source Price Check",
      detail: "เปรียบเทียบราคากลาง 4 แหล่ง อ้างอิงสัญญาจัดซื้อย้อนหลัง และใบเสนอราคา",
      color: "border-emerald-100 text-emerald-600 bg-emerald-50",
      output: "Price Variance & Justification",
    },
    {
      num: "04",
      icon: ShieldAlert,
      title: "ประเมินความสมเหตุสมผล",
      subtitle: "Procurement Compliance",
      detail: "ตรวจสอบเพดานงบประมาณ ความจำเป็น และกฎหมายพัสดุภาครัฐ",
      color: "border-purple-100 text-purple-600 bg-purple-50",
      output: "Compliance & Alert Flags",
    },
    {
      num: "05",
      icon: FileCheck2,
      title: "ร่างแบบฟอร์ม 8 หมวด",
      subtitle: "8-Section Form Generator",
      detail: "ร่างเอกสารคำขอตั้งงบประมาณตามระเบียบมหาวิทยาลัยขอนแก่นครบทุกหัวข้อ",
      color: "border-rose-100 text-rose-600 bg-rose-50",
      output: "Official KKU Budget Draft",
    },
    {
      num: "06",
      icon: Layers,
      title: "สเปกกลางไร้การล็อค",
      subtitle: "Neutral Spec Drafting",
      detail: "แปลงชื่อแบรนด์การค้าเป็น Functional Spec ที่โปร่งใสและเปิดกว้าง",
      color: "border-teal-100 text-teal-600 bg-teal-50",
      output: "100% Brand-Neutral Spec",
    },
  ];

  return (
    <section id="pipeline" className="py-20 bg-[#F8FAFC] text-slate-900 relative scroll-mt-20 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>สถาปัตยกรรมกระบวนการ AI Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-slate-900">
            เจาะลึกการทำงาน{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              6-Step AI Pipeline
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            ทุกคำขอตั้งงบประมาณจะผ่านขั้นตอนการวิเคราะห์ ตรวจสอบ และร่างเอกสารอัตโนมัติ
            อย่างเป็นระบบและสามารถตรวจสอบย้อนกลับได้ (Evidence-backed Audit Trail)
          </p>
        </div>

        {/* 6-Step Visual Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-2xs relative overflow-hidden group hover:border-indigo-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* Step Top Header */}
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div
                      className={`w-11 h-11 rounded-2xl border ${s.color} flex items-center justify-center`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xl font-bold text-slate-300 group-hover:text-indigo-600 transition-colors">
                      {s.num}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-semibold text-indigo-600 tracking-wide uppercase">
                      {s.subtitle}
                    </span>
                    <h3 className="text-base font-heading font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed pt-1.5">
                      {s.detail}
                    </p>
                  </div>
                </div>

                {/* Output Pill */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">ผลลัพธ์:</span>
                  <span className="font-mono text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {s.output}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pipeline CTA */}
        <div className="mt-10 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-heading font-bold text-xs shadow-2xs transition-all hover:scale-[1.02] active:scale-98"
          >
            <span>ทดลองสร้างคำขอด้วย 6-Step AI Wizard</span>
            <ArrowRight className="w-4 h-4 text-indigo-600" />
          </Link>
        </div>
      </div>
    </section>
  );
}
