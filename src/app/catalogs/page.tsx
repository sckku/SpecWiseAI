"use client";

import React, { useState } from "react";
import {
  Layers,
  Search,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Tag,
  ArrowUpRight,
} from "lucide-react";

export default function CatalogsPage() {
  const [activeCatalog, setActiveCatalog] = useState<"budget_bureau" | "mdes" | "kku">("budget_bureau");
  const [search, setSearch] = useState("");

  const sampleItems = [
    {
      id: "1",
      code: "BB-2569-01",
      name: "เครื่องคอมพิวเตอร์ สำหรับงานประมวลผล แบบที่ 1",
      spec: "จอแสดงภาพขนาดไม่น้อยกว่า 23 นิ้ว, CPU 6 Cores 12 Threads, RAM 16GB, SSD 512GB",
      price: 26000,
      source: "สำนักงบประมาณ ฉบับ เม.ย. 2569",
      page: "124",
      itemNo: "1.2.3",
    },
    {
      id: "2",
      code: "BB-2569-02",
      name: "เครื่องคอมพิวเตอร์ สำหรับงานประมวลผล แบบที่ 2",
      spec: "จอแสดงภาพขนาดไม่น้อยกว่า 23 นิ้ว, CPU 8 Cores 16 Threads, RAM 32GB, SSD 1TB",
      price: 33000,
      source: "สำนักงบประมาณ ฉบับ เม.ย. 2569",
      page: "125",
      itemNo: "1.2.4",
    },
    {
      id: "3",
      code: "MDES-2569-01",
      name: "เครื่องคอมพิวเตอร์พกพา (Notebook) สำหรับงานประมวลผล",
      spec: "จอ 14 นิ้ว, CPU 8 Cores, RAM 16GB, SSD 512GB, น้ำหนักไม่เกิน 1.6 กก.",
      price: 38000,
      source: "เกณฑ์กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม 2569",
      page: "18",
      itemNo: "2.1",
    },
    {
      id: "4",
      code: "KKU-2569-04",
      name: "เครื่องปั่นเหวี่ยงตกตะกอนควบคุมอุณหภูมิ (Refrigerated Centrifuge)",
      spec: "ความเร็วรอบไม่น้อยกว่า 15,000 rpm ควบคุมอุณหภูมิได้ -10 ถึง +40 °C",
      price: 350000,
      source: "บัญชีมาตรฐานครุภัณฑ์ มหาวิทยาลัยขอนแก่น 2569",
      page: "45",
      itemNo: "LAB-09",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
          มาตรฐานและราคากลางอ้างอิงภาครัฐ
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          ค้นหา ตรวจสอบราคา และเอกสารอ้างอิงทางการจาก สำนักงบประมาณ, กระทรวง DE และ มข.
        </p>
      </div>

      {/* Catalog Source Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveCatalog("budget_bureau")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeCatalog === "budget_bureau"
              ? "border-indigo-600 bg-indigo-50/50 shadow-xs"
              : "border-slate-200 bg-white hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">สำนักงบประมาณ</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              ฉบับ เม.ย. 2569
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            บัญชีราคามาตรฐานครุภัณฑ์ภาครัฐ (บัญชีหลัก)
          </p>
        </button>

        <button
          onClick={() => setActiveCatalog("mdes")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeCatalog === "mdes"
              ? "border-indigo-600 bg-indigo-50/50 shadow-xs"
              : "border-slate-200 bg-white hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">กระทรวงดิจิทัลฯ (MDES)</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              ฉบับ 2569
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            เกณฑ์ราคากลางและคุณลักษณะพื้นฐานคอมพิวเตอร์
          </p>
        </button>

        <button
          onClick={() => setActiveCatalog("kku")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeCatalog === "kku"
              ? "border-indigo-600 bg-indigo-50/50 shadow-xs"
              : "border-slate-200 bg-white hover:bg-slate-50"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">มหาวิทยาลัยขอนแก่น</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800 font-semibold">
              มข. 2569
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            บัญชีราคากลางและคุณลักษณะเฉพาะ มหาวิทยาลัยขอนแก่น
          </p>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาชื่อรายการ, คุณลักษณะเฉพาะ, รหัส..."
            className="w-full text-xs pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
          />
        </div>
      </div>

      {/* Catalogs Item Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {item.code}
                </span>
                <span className="text-[11px] text-slate-400">
                  หน้า {item.page} • ข้อ {item.itemNo}
                </span>
              </div>

              <h3 className="font-heading font-bold text-sm text-slate-900 mt-2">
                {item.name}
              </h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{item.spec}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">ราคามาตรฐานต่อหน่วย</span>
                <span className="text-lg font-heading font-bold text-slate-900">
                  {item.price.toLocaleString()} บาท
                </span>
              </div>

              <span className="text-xs font-semibold text-indigo-600 inline-flex items-center space-x-1">
                <span>{item.source}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
