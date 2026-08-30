import React from "react";
import Link from "next/link";
import {
  FileQuestion,
  Home,
  PlusCircle,
  Search,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Building,
  HelpCircle,
} from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center py-10 px-4 sm:px-6">
      {/* Background Decorative Ambient Blobs */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-kku-500/10 via-gold-400/5 to-transparent blur-3xl" />

      <div className="relative z-10 w-full max-w-3xl text-center">
        {/* Visual 404 Hero */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="text-8xl sm:text-9xl font-extrabold tracking-tighter text-slate-100 select-none drop-shadow-sm font-heading">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-3xl border border-amber-200/80 bg-amber-50 shadow-xl backdrop-blur-sm transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <FileQuestion className="h-10 w-10 sm:h-12 sm:w-12 text-amber-600 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/80 px-4 py-1.5 text-xs font-bold text-amber-900 shadow-2xs backdrop-blur-sm">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
          <span>ไม่พบหน้าที่คุณต้องการ (Page Not Found)</span>
        </div>

        {/* Headings */}
        <h1 className="mb-3 font-heading text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          ขออภัย หน้าเว็บหรือเอกสารนี้ไม่มีอยู่ในระบบ
        </h1>
        <p className="mb-8 max-w-xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
          หน้าที่คุณกำลังค้นหาอาจถูกย้าย ลบออกจากระบบ หรือคุณอาจสะกด URL ไม่ถูกต้อง
          คุณสามารถค้นหาข้อมูล หรือเลือกเมนูทางลัดด้านล่างเพื่อดำเนินการต่อ
        </p>

        {/* Quick Search Box */}
        <div className="mb-10 max-w-lg mx-auto">
          <form
            action="/catalogs"
            method="GET"
            className="relative flex items-center rounded-2xl border border-slate-200/90 bg-white p-1.5 shadow-lg shadow-slate-200/50 transition-all focus-within:border-kku-600 focus-within:ring-4 focus-within:ring-kku-500/10"
          >
            <Search className="ml-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              name="q"
              placeholder="ค้นหาชื่อครุภัณฑ์, ราคากลาง หรือเลขที่เอกสาร..."
              className="w-full bg-transparent px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-kku-700 px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-kku-800 transition-colors"
            >
              ค้นหา
            </button>
          </form>
        </div>

        {/* 4 Shortcut Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-10">
          {/* Card 1: Dashboard */}
          <Link
            href="/"
            className="group flex items-start p-4 rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm hover:shadow-md hover:border-kku-300 transition-all"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-kku-50 text-kku-700 group-hover:bg-kku-100 transition-colors mr-3.5">
              <Home className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 group-hover:text-kku-700 transition-colors">
                  กลับสู่หน้าหลัก (Dashboard)
                </h2>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-kku-700 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                ดูภาพรวมคำของบประมาณ สถานะการพิจารณา และตัวชี้วัดความคุ้มค่า
              </p>
            </div>
          </Link>

          {/* Card 2: Create Request */}
          <Link
            href="/requests/new"
            className="group flex items-start p-4 rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm hover:shadow-md hover:border-kku-300 transition-all"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100 transition-colors mr-3.5">
              <PlusCircle className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  สร้างคำของบประมาณใหม่
                </h2>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                เริ่มต้นกรอกความต้องการเพื่อให้อัลกอริทึม AI 6 ขั้นตอนช่วยร่างเอกสาร
              </p>
            </div>
          </Link>

          {/* Card 3: Standard Catalogs */}
          <Link
            href="/catalogs"
            className="group flex items-start p-4 rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm hover:shadow-md hover:border-kku-300 transition-all"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-100 transition-colors mr-3.5">
              <Search className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  สืบค้นบัญชีราคามาตรฐาน
                </h2>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                ตรวจเช็คราคากลางสำนักงบประมาณ, กระทรวง DE และบัญชี มข. 2569
              </p>
            </div>
          </Link>

          {/* Card 4: User Manual */}
          <Link
            href="/manual"
            className="group flex items-start p-4 rounded-2xl border border-slate-200/80 bg-white/90 shadow-sm hover:shadow-md hover:border-kku-300 transition-all"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-700 group-hover:bg-purple-100 transition-colors mr-3.5">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                  คู่มือการใช้งานระบบ (Manual)
                </h2>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                ศึกษาขั้นตอนการขอตั้งงบ การตรวจสเปก และดาวน์โหลดเอกสารคู่มือ
              </p>
            </div>
          </Link>
        </div>

        {/* Footer Support Info */}
        <div className="pt-6 border-t border-slate-200/70 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
          <span className="inline-flex items-center space-x-1.5">
            <Building className="h-3.5 w-3.5 text-slate-400" />
            <span>กองบริหารงานงบประมาณและพัสดุ มหาวิทยาลัยขอนแก่น</span>
          </span>
          <span>•</span>
          <span className="inline-flex items-center space-x-1.5">
            <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
            <span>
              ติดต่อสอบถาม:{" "}
              <a
                href="mailto:specwise-support@kku.ac.th"
                className="font-medium text-kku-700 hover:underline"
              >
                specwise-support@kku.ac.th
              </a>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
