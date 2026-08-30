"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ArrowRight,
  LogIn,
  ShieldCheck,
  BookOpen,
  CheckCircle2,
  Cpu,
  Search,
  Layers,
  Zap,
} from "lucide-react";
import { LivePreviewCard } from "./LivePreviewCard";

export function HeroSection() {
  const router = useRouter();
  const [quickPrompt, setQuickPrompt] = useState("");

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickPrompt.trim()) {
      router.push(`/requests/new?prompt=${encodeURIComponent(quickPrompt.trim())}`);
    } else {
      router.push("/dashboard");
    }
  };

  const samplePrompts = [
    "เครื่องแม่ข่ายประมวลผล AI & GPU สำหรับวิจัย คณะวิทย์ 2 เครื่อง",
    "กล้องจุลทรรศน์อิเล็กตรอนสำหรับศูนย์วิจัยชีววิทยาศาสตร์",
    "คอมพิวเตอร์กราฟิกสำหรับห้องปฏิบัติการดิจิทัลมีเดีย 30 ชุด",
  ];

  return (
    <section className="relative min-h-[90vh] pt-28 pb-20 overflow-hidden bg-gradient-to-b from-[#EEF2FF] via-[#F8FAFC] to-[#F8FAFC] text-slate-900 flex items-center">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-48 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f10a_1px,transparent_1px),linear-gradient(to_bottom,#6366f10a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Hackathon Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-indigo-100 shadow-2xs">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
              <span className="text-xs font-semibold text-indigo-700">
                KKU AI Hackathon 2026 • มหาวิทยาลัยขอนแก่น
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-heading font-black tracking-tight leading-[1.18] text-slate-900">
                พลิกโฉมการจัดทำงบลงทุน และสเปกครุภัณฑ์ มข.{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 bg-clip-text text-transparent">
                  ด้วยพลัง AI อัจฉริยะ
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                เปลี่ยนกระบวนการเดิมที่ซับซ้อนและเสี่ยงต่อการล็อคสเปก สู่ระบบ AI วิเคราะห์
                ตรวจสอบราคากลาง 4 ฐาน ป้องกันการตีกลับ และร่างเอกสาร 8 หมวดหมู่ตามแบบฟอร์ม มข.
                เสร็จสมบูรณ์ใน 15 นาที
              </p>
            </div>

            {/* Quick Prompt Input Simulator */}
            <form
              onSubmit={handleQuickSubmit}
              className="bg-white border border-slate-200 p-2 rounded-2xl shadow-sm max-w-xl mx-auto lg:mx-0"
            >
              <div className="flex items-center space-x-2">
                <div className="pl-3 text-indigo-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={quickPrompt}
                  onChange={(e) => setQuickPrompt(e.target.value)}
                  placeholder="พิมพ์ความต้องการ เช่น เครื่องคอมพิวเตอร์ AI สำหรับงานวิจัย 2 เครื่อง..."
                  className="flex-1 bg-transparent border-0 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-0"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold font-heading shadow-md shadow-indigo-500/25 flex items-center space-x-1.5 transition-all shrink-0 hover:scale-[1.02] active:scale-98"
                >
                  <span>วิเคราะห์ด้วย AI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Sample Prompts Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 text-xs text-slate-500">
              <span className="text-slate-400 text-[11px]">ตัวอย่างคำค้น:</span>
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuickPrompt(p)}
                  className="text-[11px] bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200/80 rounded-lg px-2.5 py-1 text-slate-600 transition-colors truncate max-w-[280px]"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <Link
                href="/dashboard"
                className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-bold text-sm shadow-md shadow-indigo-500/25 flex items-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <LogIn className="w-4 h-4" />
                <span>เข้าสู่ระบบ / เข้าสู่ Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/login"
                className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-heading font-semibold text-sm shadow-2xs flex items-center space-x-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>ทดสอบสิทธิ์ (Sandbox Mock)</span>
              </Link>

              <Link
                href="/manual"
                className="px-4 py-3.5 rounded-2xl text-slate-600 hover:text-slate-900 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>คู่มือการใช้งาน</span>
              </Link>
            </div>

            {/* Micro Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-200/80 text-xs text-slate-600 text-center lg:text-left">
              <div className="flex items-center space-x-1.5 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] sm:text-xs">มาตรฐานสำนักงบฯ 2569</span>
              </div>
              <div className="flex items-center space-x-1.5 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] sm:text-xs">เกณฑ์ราคากลาง DE 2569</span>
              </div>
              <div className="flex items-center space-x-1.5 justify-center lg:justify-start">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] sm:text-xs">แบบฟอร์ม มข. 8 หมวด</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Preview Card */}
          <div className="lg:col-span-5 relative">
            <LivePreviewCard />
          </div>
        </div>
      </div>
    </section>
  );
}
