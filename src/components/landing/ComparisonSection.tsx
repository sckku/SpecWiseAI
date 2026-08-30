"use client";

import React from "react";
import {
  XCircle,
  CheckCircle2,
  Clock,
  Zap,
  AlertTriangle,
  ShieldCheck,
  FileQuestion,
  FileCheck,
  Search,
  Sparkles,
} from "lucide-react";

export function ComparisonSection() {
  const legacyPainPoints = [
    {
      icon: Clock,
      title: "ใช้เวลา 3 - 5 วันต่อ 1 รายการ",
      desc: "ต้องค้นหาราคากลางและระเบียบเองจากไฟล์ PDF นับร้อยหน้าของหลายหน่วยงาน",
    },
    {
      icon: AlertTriangle,
      title: "เสี่ยงถูกตีกลับคำขอสูง",
      desc: "เอกสารไม่ตรงแบบฟอร์ม 8 หมวด หรือขาดเหตุผลความจำเป็นและความคุ้มค่า",
    },
    {
      icon: FileQuestion,
      title: "เสี่ยงล็อคสเปกการค้าโดยไม่รู้ตัว",
      desc: "การนำสเปกจากโบรชัวร์มาใช้ตรงๆ เสี่ยงผิด พ.ร.บ. จัดซื้อจัดจ้างฯ และถูก สตง. ตรวจสอบ",
    },
    {
      icon: Search,
      title: "ขาดหลักฐานอ้างอิงราคากลาง",
      desc: "ไม่มีประวัติสัญญาจัดซื้อย้อนหลัง มข. หรือไม่ทราบว่าราคาเสนอเกินเกณฑ์สำนักงบฯ",
    },
  ];

  const specwiseAdvantages = [
    {
      icon: Zap,
      title: "เสร็จสมบูรณ์ใน 15 นาที (-85% Time)",
      desc: "AI จัดการค้นหา เปรียบเทียบ และร่างเอกสารทุกขั้นตอนแบบอัตโนมัติทันที",
    },
    {
      icon: CheckCircle2,
      title: "ร่างแบบฟอร์ม มข. 8 หมวดหมู่ถูกต้อง 100%",
      desc: "ครอบคลุมทุกประเด็นที่คณะกรรมการพิจารณางบประมาณต้องการ พร้อมส่งลงนาม",
    },
    {
      icon: ShieldCheck,
      title: "สเปกกลางไร้การล็อคยี่ห้อ (Brand-Neutral)",
      desc: "ระบบแปลงเป็นเกณฑ์สมรรถนะขั้นต่ำ โปร่งใส และเปิดกว้างสำหรับการแข่งขันราคา",
    },
    {
      icon: FileCheck,
      title: "ตรวจสอบราคากลาง 4 ฐาน พร้อม Citation",
      desc: "แสดงเลขอ้างอิงหน้า/ข้อ และเชื่อมโยงสัญญาจัดซื้อย้อนหลัง มข. อย่างโปร่งใส",
    },
  ];

  return (
    <section id="comparison" className="py-20 bg-white text-slate-900 relative scroll-mt-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>เปรียบเทียบก่อน vs หลังใช้งาน</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-slate-900">
            ทำไมต้องเปลี่ยนมาใช้{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              SpecWise AI?
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            ยกระดับประสิทธิภาพการทำงานของหน่วยงานภาครัฐและมหาวิทยาลัย
            ลดภาระงานซ้ำซ้อน และเพิ่มความโปร่งใสในทุกขั้นตอน
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {/* Legacy Process Card */}
          <div className="rounded-3xl border border-rose-200/90 bg-rose-50/40 p-7 sm:p-8 relative overflow-hidden space-y-5 shadow-2xs">
            <div className="flex items-center justify-between pb-4 border-b border-rose-200/60">
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
                  กระบวนการแบบเดิม (Legacy)
                </span>
                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900 mt-0.5">
                  คนคิด ➔ คนค้น ➔ คนตรวจ ➔ คนแก้
                </h3>
              </div>
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-sm">
                ✕
              </div>
            </div>

            <div className="space-y-3.5">
              {legacyPainPoints.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-7 h-7 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 mt-0.5 border border-rose-200">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-800 font-heading">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SpecWise AI Card */}
          <div className="rounded-3xl border border-emerald-200 bg-emerald-50/40 p-7 sm:p-8 relative overflow-hidden space-y-5 shadow-sm shadow-emerald-500/5">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-200/60 relative z-10">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                  ด้วย SpecWise AI (Next-Gen)
                </span>
                <h3 className="text-lg sm:text-xl font-heading font-extrabold text-slate-900 mt-0.5">
                  AI วิเคราะห์ ➔ AI ตรวจ ➔ AI ร่าง ➔ คนอนุมัติ
                </h3>
              </div>
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ✓
              </div>
            </div>

            <div className="space-y-3.5 relative z-10">
              {specwiseAdvantages.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="w-7 h-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
