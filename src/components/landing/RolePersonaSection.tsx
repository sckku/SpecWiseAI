"use client";

import React, { useState } from "react";
import {
  UserCheck,
  Shield,
  Building2,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Briefcase,
  FileCheck,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

export function RolePersonaSection() {
  const [selectedRole, setSelectedRole] = useState(0);

  const roles = [
    {
      title: "ผู้ใช้งานทั่วไป (General Requester)",
      sub: "อาจารย์, นักวิจัย, บุคลากรในสาขาวิชา/หน่วยงาน",
      icon: GraduationCap,
      color: "from-indigo-500 to-blue-600",
      accent: "indigo",
      points: [
        "พิมพ์ความต้องการภาษาธรรมชาติ AI แปลงเป็นสเปกทางการ 8 หมวดหมู่ทันที",
        "บุคลากรหน่วยงาน/สาขาวิชาเดียวกัน สามารถดูข้อมูลคำขอร่วมกันเพื่อใช้อ้างอิงได้",
        "มี AI แจ้งเตือนข้อผิดพลาดก่อนส่ง ลดโอกาสการถูกตีกลับเป็น 0%",
      ],
      quote: "เดิมต้องใช้เวลาเกือบสัปดาห์ในการค้นหาราคากลางและเขียนแบบฟอร์ม ตอนนี้เสร็จใน 15 นาที พร้อมดูสเปกอ้างอิงของเพื่อนร่วมสาขาได้ทันที",
    },
    {
      title: "แอดมิน (งานแผนและยุทธศาสตร์)",
      sub: "กองแผนงาน / คณะกรรมการกลั่นกรองงบประมาณ",
      icon: Building2,
      color: "from-purple-500 to-indigo-600",
      accent: "purple",
      points: [
        "ดูข้อมูลคำขอได้ทั้งหมดของทุกหน่วยงานและทุกคณะในมหาวิทยาลัยขอนแก่น",
        "ทำหน้าที่อนุมัติ (Approve), ส่งกลับแก้ไข (Request Revision) หรือไม่อนุมัติ",
        "Executive Dashboard วิเคราะห์ภาพรวมงบลงทุนและความคุ้มค่าเชิงยุทธศาสตร์",
      ],
      quote: "เห็นภาพรวมการจัดสรรงบประมาณของทุกภาควิชา และมั่นใจได้ว่าทุกรายการถูกต้องตามแผนยุทธศาสตร์และระเบียบราชการ",
    },
    {
      title: "งานคลังและพัสดุ (Finance & Procurement)",
      sub: "กองคลังและพัสดุ มหาวิทยาลัยขอนแก่น",
      icon: Shield,
      color: "from-blue-500 to-teal-600",
      accent: "blue",
      points: [
        "สามารถดูข้อมูลคำขอได้ทั้งหมด ตรวจสอบราคากลาง 4 ฐาน พร้อม Citation อ้างอิง",
        "ตรวจจับการล็อคสเปกการค้า (Anti-Lock Spec Linter) และให้ความเห็นทางพัสดุ",
        "จัดการและอัปเดตบัญชีราคามาตรฐานครุภัณฑ์ สำนักงบฯ 2569, DE และ มข.",
      ],
      quote: "มาตรฐานข้อมูลเดียวกันทั้งมหาวิทยาลัย ปลอดภัยจากการล็อคสเปก ตรวจสอบราคากลางได้ครบทุกมิติ",
    },
  ];

  const current = roles[selectedRole];

  return (
    <section id="roles" className="py-20 bg-white text-slate-900 relative scroll-mt-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
            <UserCheck className="w-3.5 h-3.5" />
            <span>ออกแบบเพื่อทุกบทบาทใน มข.</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-slate-900">
            ตอบโจทย์การทำงาน{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ครบทุกระดับผู้ใช้งาน
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            ระบบจัดสรรสิทธิ์และฟังก์ชันการทำงานที่ตรงกับบทบาทตามโครงสร้างมหาวิทยาลัยขอนแก่น
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {roles.map((role, idx) => {
            const Icon = role.icon;
            const isSelected = selectedRole === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedRole(idx)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 ${
                  isSelected
                    ? "bg-indigo-50/90 border-indigo-500 shadow-sm ring-1 ring-indigo-500/20 scale-[1.01]"
                    : "bg-slate-50/80 border-slate-200/80 hover:bg-slate-100/80 text-slate-600"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${role.color} flex items-center justify-center text-white mb-3 shadow-xs`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h4
                  className={`text-sm font-bold font-heading ${
                    isSelected ? "text-indigo-950" : "text-slate-800"
                  }`}
                >
                  {role.title.split("(")[0]}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                  {role.sub}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Role Detail Box */}
        <div className="bg-gradient-to-r from-[#EEF2FF]/60 via-[#F8FAFC] to-[#FAF5FF]/60 border border-slate-200 rounded-3xl p-6 sm:p-9 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-0.5">
                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                  {current.sub}
                </span>
                <h3 className="text-2xl font-heading font-extrabold text-slate-900">
                  {current.title}
                </h3>
              </div>

              <div className="space-y-2.5 pt-1">
                {current.points.map((pt, i) => (
                  <div key={i} className="flex items-start space-x-2.5 text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 text-xs text-slate-600 italic shadow-2xs">
                "{current.quote}"
              </div>

              <div className="pt-1 flex items-center space-x-3">
                <Link
                  href="/login"
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center space-x-2 transition-all hover:scale-[1.02] active:scale-98"
                >
                  <span>ทดลองเข้าใช้งานในบทบาทนี้</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center space-y-3.5 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center text-white mx-auto shadow-md shadow-indigo-500/20">
                  <current.icon className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-heading">
                    KKU SSONext & RBAC
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    รองรับการยืนยันตัวตนผ่าน KKU Single Sign-On พร้อมระบุสิทธิ์ตามโครงสร้างหน่วยงาน
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
