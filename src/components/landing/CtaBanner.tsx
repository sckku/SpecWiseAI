"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, LogIn, ArrowRight, ShieldCheck, BookOpen } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-16 relative overflow-hidden bg-[#F8FAFC] text-slate-900 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-900 border border-indigo-500/20 p-8 sm:p-14 shadow-xl relative overflow-hidden text-center space-y-5 text-white">
          {/* Subtle lighting accents */}
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>เริ่มต้นใช้งานได้ทันที</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black tracking-tight max-w-3xl mx-auto text-white">
            พร้อมยกระดับการจัดทำงบประมาณและสเปกครุภัณฑ์{" "}
            <span className="text-amber-300">
              มหาวิทยาลัยขอนแก่น
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            สัมผัสประสบการณ์การทำงานที่สะดวกรวดเร็ว ถูกต้องตามระเบียบพัสดุ
            และลดภาระงานซ้ำซ้อนด้วยพลังของ SpecWise AI ได้แล้ววันนี้
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="/dashboard"
              className="px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-indigo-900 font-heading font-black text-sm shadow-xl shadow-black/10 flex items-center space-x-2.5 transition-all hover:scale-[1.02] active:scale-98"
            >
              <LogIn className="w-4 h-4 text-indigo-600" />
              <span>เข้าสู่ระบบ / ไปยังหน้าหลัก (Dashboard)</span>
              <ArrowRight className="w-4 h-4 text-indigo-600" />
            </Link>

            <Link
              href="/login"
              className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-heading font-semibold text-xs sm:text-sm backdrop-blur-md flex items-center space-x-2 transition-all hover:scale-[1.02] active:scale-98"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>ทดลองใช้งานสลับบทบาท (Sandbox)</span>
            </Link>

            <Link
              href="/manual"
              className="px-4 py-3.5 rounded-2xl text-indigo-100 hover:text-white text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>คู่มือการใช้งานระบบ</span>
            </Link>
          </div>

          <p className="text-[11px] text-indigo-200/80 pt-2">
            รองรับการยืนยันตัวตนด้วยบัญชี KKU Mail และ KKU SSONext (OAuth 2.0 / OIDC)
          </p>
        </div>
      </div>
    </section>
  );
}
