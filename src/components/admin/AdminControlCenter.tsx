"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Sparkles,
  Layers,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  Database,
  Globe,
  Radio,
  FileText,
  UserCog,
  BarChart3,
  ScrollText,
  Settings,
  Cpu,
  RefreshCw,
  Sliders,
  ExternalLink,
} from "lucide-react";

export function AdminControlCenter() {
  const [riskTab, setRiskTab] = useState<"high" | "medium" | "low">("high");
  const [torSearch, setTorSearch] = useState("");

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-10">
      {/* Top Title Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-300 text-sm font-bold uppercase tracking-wider mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>UI สำหรับผู้ดูแลและระบบ (Admin Control Center)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-white tracking-tight">
            ควบคุมระบบ มาตรฐาน แหล่งข้อมูล และการอนุมัติ
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            ศูนย์กลางการกำกับดูแลความเสี่ยงของคำของบประมาณ การซิงค์แคตตาล็อกราคากลาง และ TOR เทียบเคียง
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-emerald-300 border border-white/10 text-sm font-mono">
            🟢 AI: Connected | DB: Healthy
          </span>
        </div>
      </div>

      {/* 6-Card Grid Layout Matching Reference */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 2xl:grid-cols-3">
        {/* 1. Admin Dashboard (ภาพรวมระบบและการแจ้งเตือน) */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm">
                1
              </span>
              <span>Admin Dashboard (ภาพรวมระบบ)</span>
            </div>

            {/* 4 Mini Stat Counters */}
            <div className="grid grid-cols-4 gap-2 text-center mt-3 pt-2 border-t border-slate-100">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-base font-heading font-bold text-slate-900">128</div>
                <div className="text-sm text-slate-400">คำขอทั้งหมด</div>
              </div>
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-100">
                <div className="text-base font-heading font-bold text-amber-700">23</div>
                <div className="text-sm text-amber-600">รอดำเนินการ</div>
              </div>
              <div className="p-2 rounded-xl bg-blue-50 border border-blue-100">
                <div className="text-base font-heading font-bold text-blue-700">15</div>
                <div className="text-sm text-blue-600">ขออนุมัติ</div>
              </div>
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                <div className="text-base font-heading font-bold text-emerald-700">90</div>
                <div className="text-sm text-emerald-600">แล้วเสร็จ</div>
              </div>
            </div>

            {/* Critical Notifications */}
            <div className="mt-4 space-y-2">
              <span className="text-sm font-bold text-slate-500 uppercase">
                การแจ้งเตือนที่สำคัญ
              </span>
              <div className="space-y-1.5 text-sm">
                <div className="p-2 rounded-xl bg-amber-50/60 border border-amber-200/60 text-amber-900 flex items-center justify-between">
                  <span className="truncate">⚠ พบมาตรฐานใหม่ สำนักงบประมาณ</span>
                  <span className="text-sm text-amber-700 shrink-0 ml-1">12 นาทีที่แล้ว</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 flex items-center justify-between">
                  <span className="truncate">⚠ มาตรฐาน KKU มีเวอร์ชันใหม่</span>
                  <span className="text-sm text-slate-400 shrink-0 ml-1">1 ชม.</span>
                </div>
                <div className="p-2 rounded-xl bg-rose-50/60 border border-rose-200/60 text-rose-900 flex items-center justify-between">
                  <span className="truncate">⚠ แหล่งข้อมูล MDES เชื่อมต่อไม่ได้</span>
                  <span className="text-sm text-rose-700 shrink-0 ml-1">2 ชม.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Smart Review Queue (คิวตรวจสอบอัจฉริยะ) */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm">
                2
              </span>
              <span>Smart Review Queue (คิวตรวจสอบ)</span>
            </div>

            {/* Risk Tabs */}
            <div className="flex space-x-1.5 mt-3 p-1 rounded-xl bg-slate-100 text-sm">
              <button
                onClick={() => setRiskTab("high")}
                className={`flex-1 py-1 rounded-lg font-semibold text-center transition-colors ${
                  riskTab === "high"
                    ? "bg-rose-500 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                High Risk (8)
              </button>
              <button
                onClick={() => setRiskTab("medium")}
                className={`flex-1 py-1 rounded-lg font-semibold text-center transition-colors ${
                  riskTab === "medium"
                    ? "bg-amber-500 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Medium (12)
              </button>
              <button
                onClick={() => setRiskTab("low")}
                className={`flex-1 py-1 rounded-lg font-semibold text-center transition-colors ${
                  riskTab === "low"
                    ? "bg-emerald-500 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Low (15)
              </button>
            </div>

            {/* Risk Items List */}
            <div className="mt-3 space-y-2 text-sm">
              <div className="p-2.5 rounded-xl border border-rose-100 bg-rose-50/30 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-rose-800">PR-2570-0123</span>
                  <div className="text-slate-500 text-sm">850,000 บาท</div>
                </div>
                <span className="text-sm px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold">
                  สเปกเข้มเกินไป
                </span>
              </div>

              <div className="p-2.5 rounded-xl border border-amber-100 bg-amber-50/30 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-amber-800">PR-2570-0119</span>
                  <div className="text-slate-500 text-sm">520,000 บาท</div>
                </div>
                <span className="text-sm px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                  วงเงินสูงกว่าราคาตลาด
                </span>
              </div>

              <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-slate-800">PR-2570-0125</span>
                  <div className="text-slate-500 text-sm">1,250,000 บาท</div>
                </div>
                <span className="text-sm px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold">
                  เอกสารไม่ครบ
                </span>
              </div>
            </div>
          </div>

          <button className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold">
            ดูทั้งหมด
          </button>
        </div>

        {/* 3. Standard Intelligence (สถานะมาตรฐานและแหล่งข้อมูล) */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm">
                3
              </span>
              <span>Standard Intelligence (แหล่งมาตรฐาน)</span>
            </div>

            <div className="mt-3 space-y-2 text-sm">
              <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">สำนักงบประมาณ</div>
                  <div className="text-sm text-slate-400">บัญชีราคามาตรฐาน ฉบับ เม.ย. 2569</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-sm font-bold">
                  Active
                </span>
              </div>

              <div className="p-2.5 rounded-xl border border-amber-200 bg-amber-50/40 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">มหาวิทยาลัยขอนแก่น</div>
                  <div className="text-sm text-slate-400">มาตรฐานคุณลักษณะ ฉบับ 2569</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-sm font-bold">
                  Review
                </span>
              </div>

              <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-900">กระทรวงดิจิทัลฯ (MDES)</div>
                  <div className="text-sm text-slate-400">เกณฑ์ราคากลาง ฉบับ พ.ศ. 2569</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-sm font-bold">
                  Active
                </span>
              </div>
            </div>

            <div className="mt-3 p-2 rounded-xl bg-amber-50 border border-amber-200 text-sm text-amber-900 flex items-center space-x-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>พบมาตรฐานใหม่ 2 รายการ รอการตรวจสอบ</span>
            </div>
          </div>

          <button className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold">
            จัดการแหล่งมาตรฐาน
          </button>
        </div>

        {/* 4. Market & Quotation Intelligence */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm">
                4
              </span>
              <span>Market & Quotation (ข้อมูลตลาด)</span>
            </div>

            {/* Live Telemetry Card */}
            <div className="mt-3 p-3 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white space-y-2">
              <div className="text-sm text-indigo-300 font-semibold">
                ภาพรวมตลาด (Computer Workstation)
              </div>
              <div className="grid grid-cols-4 gap-1 text-center text-sm">
                <div>
                  <div className="text-sm text-slate-400">ราคามาตรฐาน</div>
                  <div className="font-bold text-white">26,000</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">ราคากลาง</div>
                  <div className="font-bold text-white">28,900</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">ใบเสนอราคา</div>
                  <div className="font-bold text-emerald-400">28,500</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">ประวัติจัดซื้อ</div>
                  <div className="font-bold text-white">29,100</div>
                </div>
              </div>
            </div>

            {/* Connectors Status */}
            <div className="mt-3 space-y-1.5 text-sm">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="text-slate-700">Public Procurement</span>
                <span className="text-sm text-emerald-600 font-bold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Online</span>
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="text-slate-700">Catalog Source</span>
                <span className="text-sm text-emerald-600 font-bold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Online</span>
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="text-slate-700">E-Marketplace</span>
                <span className="text-sm text-emerald-600 font-bold flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>Online</span>
                </span>
              </div>
            </div>
          </div>

          <button className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold">
            จัดการแหล่งข้อมูล
          </button>
        </div>

        {/* 5. TOR Benchmark Center */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm">
                5
              </span>
              <span>TOR Benchmark Center (คลัง TOR)</span>
            </div>

            {/* Stats Counter */}
            <div className="grid grid-cols-2 gap-2 mt-3 text-center">
              <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100">
                <div className="text-base font-heading font-bold text-indigo-700">1,256</div>
                <div className="text-sm text-slate-500">TOR ในระบบ</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-base font-heading font-bold text-slate-800">45</div>
                <div className="text-sm text-slate-500">หน่วยงานที่เชื่อมต่อ</div>
              </div>
            </div>

            {/* Search Input */}
            <div className="mt-3 flex space-x-1">
              <input
                type="text"
                value={torSearch}
                onChange={(e) => setTorSearch(e.target.value)}
                placeholder="ค้นหาตามชื่อครุภัณฑ์, หน่วยงาน..."
                className="flex-1 text-sm px-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-600"
              />
              <button className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-sm font-bold">
                ค้นหา
              </button>
            </div>

            {/* Recent Imported TORs */}
            <div className="mt-3 space-y-1.5 text-sm">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="text-slate-800 font-medium">ม.เชียงใหม่ (2570)</span>
                <span className="text-sm text-slate-400">25 พ.ค. 2570</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="text-slate-800 font-medium">ม.สงขลานครินทร์ (2570)</span>
                <span className="text-sm text-slate-400">24 พ.ค. 2570</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="text-slate-800 font-medium">กรมวิชาการเกษตร (2570)</span>
                <span className="text-sm text-slate-400">23 พ.ค. 2570</span>
              </div>
            </div>
          </div>

          <button className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold">
            จัดการคลัง TOR
          </button>
        </div>

        {/* 6. Source Monitor & Notification */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center space-x-2 text-sm font-bold text-slate-700 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm">
                6
              </span>
              <span>Source Monitor & Sync (ตรวจจับ)</span>
            </div>

            <div className="mt-3 space-y-1.5 text-sm">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="text-slate-700">สำนักงบประมาณ</span>
                <span className="text-sm text-slate-400">ตรวจสอบแล้ว 5 นาทีที่แล้ว</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="text-slate-700">มหาวิทยาลัยขอนแก่น</span>
                <span className="text-sm text-slate-400">1 ชั่วโมงที่แล้ว</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="text-slate-700">กระทรวงดิจิทัลฯ (MDES)</span>
                <span className="text-sm text-slate-400">10 นาทีที่แล้ว</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="text-slate-700">Public Procurement</span>
                <span className="text-sm text-slate-400">2 นาทีที่แล้ว</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50">
                <span className="text-slate-700">E-Marketplace</span>
                <span className="text-sm text-slate-400">3 นาทีที่แล้ว</span>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <div className="p-2 rounded-xl bg-amber-50 text-sm text-amber-900 border border-amber-200">
                ⚠ พบมาตรฐานใหม่ 1 รายการ
              </div>
              <div className="p-2 rounded-xl bg-rose-50 text-sm text-rose-900 border border-rose-200">
                ⚠ แหล่งข้อมูล 1 แหล่งมีปัญหา
              </div>
            </div>
          </div>

          <button className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold flex items-center justify-center space-x-1">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>ซิงค์ข้อมูลเดี๋ยวนี้</span>
          </button>
        </div>
      </div>

      {/* Admin Bottom Status Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-3 shadow-xs flex flex-col md:flex-row justify-between items-center gap-3 text-sm">
        {/* Navigation Quick Links */}
        <div className="flex flex-wrap items-center gap-3 text-slate-600">
          <Link href="/settings" className="hover:text-indigo-600 flex items-center space-x-1">
            <UserCog className="w-3.5 h-3.5" />
            <span>ควบคุมผู้ใช้ / สิทธิ์</span>
          </Link>
          <Link href="/reports" className="hover:text-indigo-600 flex items-center space-x-1">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>รายงานและวิเคราะห์</span>
          </Link>
          <Link href="/settings" className="hover:text-indigo-600 flex items-center space-x-1">
            <ScrollText className="w-3.5 h-3.5" />
            <span>Audit Log</span>
          </Link>
          <Link href="/settings" className="hover:text-indigo-600 flex items-center space-x-1">
            <Settings className="w-3.5 h-3.5" />
            <span>ตั้งค่าระบบ</span>
          </Link>
          <Link href="/settings" className="hover:text-indigo-600 flex items-center space-x-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Model & Prompt</span>
          </Link>
        </div>

        {/* Live Indicator */}
        <div className="flex items-center space-x-3 text-slate-500 font-mono text-sm">
          <span className="flex items-center space-x-1 text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>AI: Connected</span>
          </span>
          <span className="flex items-center space-x-1 text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>DB: Healthy</span>
          </span>
          <span>25 พฤษภาคม 2570 14:30</span>
        </div>
      </div>
    </div>
  );
}
