"use client";

import React from "react";
import {
  Database,
  Building,
  Laptop,
  FileSpreadsheet,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export function CatalogShowcaseSection() {
  const catalogs = [
    {
      title: "บัญชีราคามาตรฐานครุภัณฑ์",
      issuer: "สำนักงบประมาณ ประจำปีงบประมาณ 2569",
      itemsCount: "1,200+ รายการ",
      desc: "เกณฑ์ราคากลางและสเปกมาตรฐานของรัฐบาล ครอบคลุมครุภัณฑ์สำนักงาน ยานพาหนะ การศึกษา และการแพทย์",
      icon: Building,
      badge: "งบประมาณ 2569",
      color: "border-blue-100 bg-blue-50 text-blue-600",
    },
    {
      title: "เกณฑ์ราคากลางและคุณลักษณะพื้นฐาน ICT",
      issuer: "กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม (DE 2569)",
      itemsCount: "250+ รายการ",
      desc: "มาตรฐานสเปกคอมพิวเตอร์ อุปกรณ์แม่ข่าย เครือข่าย และระบบกล้องวงจรปิด ประจำปี 2569",
      icon: Laptop,
      badge: "เกณฑ์ ICT DE",
      color: "border-emerald-100 bg-emerald-50 text-emerald-600",
    },
    {
      title: "ฐานข้อมูลจัดซื้อจัดจ้างย้อนหลัง มข.",
      issuer: "กองคลังและพัสดุ มหาวิทยาลัยขอนแก่น",
      itemsCount: "5,000+ สัญญา",
      desc: "ประวัติราคาการจัดซื้อจริงในอดีตของแต่ละคณะและหน่วยงานใน มข. สำหรับใช้อ้างอิงราคาเป็นธรรม",
      icon: FileSpreadsheet,
      badge: "สถิติ มข.",
      color: "border-amber-100 bg-amber-50 text-amber-600",
    },
    {
      title: "ระบบสืบค้นใบเสนอราคาตลาด",
      issuer: "Market Quotation & Commercial Catalogs",
      itemsCount: "อัปเดตแบบเรียลไทม์",
      desc: "ระบบจับคู่ใบเสนอราคา 3 แหล่ง เพื่อใช้ประเมินราคาตามระเบียบพัสดุในกรณีครุภัณฑ์ไม่มีราคากลาง",
      icon: Database,
      badge: "3 Quotations",
      color: "border-purple-100 bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section id="catalogs" className="py-20 bg-[#F8FAFC] text-slate-900 relative scroll-mt-20 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
            <Database className="w-3.5 h-3.5" />
            <span>ฐานข้อมูลราคากลางภาครัฐ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-slate-900">
            เชื่อมโยงฐานข้อมูลมาตรฐาน{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ครบทุกมิติ
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            ผสานข้อมูลมาตรฐานสำนักงบประมาณ กระทรวงดิจิทัลฯ และประวัติสัญญาจริงของ มข.
            เพื่อให้ทุกการประมาณการราคามีหลักฐานรองรับและตรวจสอบได้ 100%
          </p>
        </div>

        {/* 4 Catalogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {catalogs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-7 relative overflow-hidden group hover:border-indigo-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-2xl border ${item.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-indigo-600 font-semibold block mb-0.5">
                      {item.issuer}
                    </span>
                    <h3 className="text-lg font-heading font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">ขนาดฐานข้อมูล:</span>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    {item.itemsCount}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Link to Catalogs Explorer */}
        <div className="mt-10 text-center">
          <Link
            href="/catalogs"
            className="inline-flex items-center space-x-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-white hover:bg-slate-50 border border-slate-200 px-5 py-2.5 rounded-2xl shadow-2xs transition-all hover:scale-[1.02] active:scale-98"
          >
            <span>สำรวจและค้นหาฐานข้อมูลมาตรฐานและราคา (Catalogs Explorer)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
