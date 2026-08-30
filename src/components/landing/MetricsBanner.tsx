"use client";

import React from "react";
import { Zap, Target, ShieldCheck, Database, TrendingDown, Check } from "lucide-react";

export function MetricsBanner() {
  const metrics = [
    {
      icon: Zap,
      value: "-85%",
      label: "ลดเวลาทำคำของบประมาณ",
      subtext: "จากกระบวนการเดิม 3-5 วัน เหลือเพียง 15 นาที",
      color: "from-indigo-600 to-purple-600",
      border: "border-indigo-100",
      bg: "bg-indigo-50 text-indigo-600",
    },
    {
      icon: Target,
      value: "99.4%",
      label: "ความแม่นยำในการจับคู่มาตรฐาน",
      subtext: "เทียบสำนักงบฯ 2569, DE 2569 และบัญชี มข.",
      color: "from-emerald-600 to-teal-600",
      border: "border-emerald-100",
      bg: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: ShieldCheck,
      value: "100%",
      label: "ป้องกันการล็อคสเปกการค้า",
      subtext: "ระบบแจ้งเตือนและแปลงเป็นคุณลักษณะทางเทคนิคที่เป็นกลาง",
      color: "from-blue-600 to-indigo-600",
      border: "border-blue-100",
      bg: "bg-blue-50 text-blue-600",
    },
    {
      icon: Database,
      value: "4 ฐาน",
      label: "ตรวจสอบราคากลางรอบด้าน",
      subtext: "พร้อมระบบอ้างอิงหน้า/ข้อ และเลขสัญญาจัดซื้อย้อนหลัง",
      color: "from-amber-600 to-orange-600",
      border: "border-amber-100",
      bg: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs relative overflow-hidden group hover:shadow-md hover:border-indigo-200 transition-all duration-300"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}
              >
                <Icon className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <div
                  className={`text-3xl sm:text-4xl font-heading font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                >
                  {item.value}
                </div>
                <h4 className="text-sm font-bold text-slate-900 font-heading">
                  {item.label}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.subtext}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
