"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  HelpCircle,
  Sparkles,
  ChevronDown,
  UserCheck,
  ShieldCheck,
  Building2,
  CheckCircle2,
  Clock3,
  Scale,
  FileText,
  Layers,
  User,
  Bot,
} from "lucide-react";
import { KKUUserSession, UserRole } from "@/types/auth";

interface TopHeaderProps {
  currentUser: KKUUserSession | null;
  onRoleChange: (roleKey: string) => Promise<void>;
  isLoading?: boolean;
}

export function TopHeader({ currentUser, onRoleChange, isLoading }: TopHeaderProps) {
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  const quickPills = [
    { label: "AI วิเคราะห์", icon: Sparkles, href: "/requests/new", iconColor: "text-indigo-500" },
    { label: "ตรวจมาตรฐาน", icon: Clock3, href: "/catalogs", iconColor: "text-indigo-500" },
    { label: "ตรวจราคา", icon: Scale, href: "/requests/new?step=3", iconColor: "text-indigo-500" },
    { label: "ร่างเอกสาร", icon: FileText, href: "/requests/new?step=5", iconColor: "text-indigo-500" },
    { label: "หลักฐานอ้างอิง", icon: Layers, href: "/catalogs", iconColor: "text-indigo-500" },
  ];

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between gap-3 border-b border-slate-200/80 bg-white/95 px-4 sm:px-6 backdrop-blur-md">
      {/* Left: Greeting & Subtitle */}
      <div className="min-w-0">
        <h2 className="flex items-center gap-1.5 truncate font-heading text-base font-bold text-slate-900">
          <span className="truncate">
            สวัสดีครับ, {currentUser?.thaiName ? currentUser.thaiName.split(" ")[0] : "ดร.สมชาย"}
          </span>
          <span className="text-base">👋</span>
        </h2>
        <p className="text-xs text-slate-400 font-medium">
          จัดทำคำของบประมาณได้ง่ายขึ้นด้วย AI
        </p>
      </div>

      {/* Center: Quick Action Feature Pills */}
      <div className="hidden lg:flex items-center space-x-2">
        {quickPills.map((pill, idx) => {
          const Icon = pill.icon;
          return (
            <Link
              key={idx}
              href={pill.href}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium text-slate-700 bg-slate-50/90 border border-slate-200/70 hover:bg-white hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-xs"
            >
              <Icon className={`w-3.5 h-3.5 ${pill.iconColor}`} />
              <span>{pill.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Right Controls: Notifications, Help, User Profile Pill */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Notification Bell */}
        <Link
          href="/notifications"
          className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          title="การแจ้งเตือน"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
        </Link>

        {/* Help Button */}
        <Link
          href="/manual"
          className="rounded-xl p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
          title="คู่มือการใช้งานระบบ (Manual & Guides)"
        >
          <HelpCircle className="h-4 w-4" />
        </Link>

        {/* Faculty & User Profile Capsule */}
        <div className="relative">
          <button
            onClick={() => setIsRoleOpen(!isRoleOpen)}
            className="flex items-center space-x-2.5 rounded-full border border-slate-200/90 bg-white py-1 pl-2.5 pr-2.5 text-left transition-all hover:border-slate-300 hover:shadow-xs"
          >
            {/* Orange Icon Pill */}
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white shadow-xs">
              {currentUser?.thaiName?.charAt(0) || "ม"}
            </div>

            {/* Department info */}
            <div className="text-left leading-tight pr-1 hidden sm:block">
              <div className="text-xs font-bold text-slate-800 truncate max-w-[140px]">
                {currentUser?.department ? currentUser.department.replace("สาขาวิชา", "สาขา") : "มข."}
              </div>
              <div className="text-[11px] text-slate-400">
                {currentUser?.faculty || "มหาวิทยาลัยขอนแก่น"}
              </div>
            </div>

            {/* Avatar Pill */}
            <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center text-xs font-bold">
              <User className="w-3.5 h-3.5" />
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Role Switcher Dropdown */}
          {isRoleOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3.5 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  สลับบทบาททดสอบ (Mock Auth)
                </p>
                <p className="text-xs text-slate-400">
                  ทดสอบการมองเห็นข้อมูลและสิทธิ์ตามบทบาทใน มข.
                </p>
              </div>

              {/* 1. ดร.สมชาย - ผู้ใช้งาน (สาขาวิชาเคมี) */}
              <button
                onClick={() => {
                  setIsRoleOpen(false);
                  onRoleChange("requester");
                }}
                className="w-full px-3.5 py-2 text-left hover:bg-indigo-50/50 flex items-start space-x-2.5 text-xs transition-colors"
              >
                <UserCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800">
                    ดร.สมชาย แก้วกล้า (ผู้ใช้งาน 1)
                  </div>
                  <div className="text-[11px] text-slate-400">
                    สาขาวิชาเคมี คณะวิทยาศาสตร์
                  </div>
                </div>
              </button>

              {/* 2. ผศ.ดร.วิภาดา - ผู้ใช้งาน (สาขาวิชาเคมี สาขาเดียวกัน) */}
              <button
                onClick={() => {
                  setIsRoleOpen(false);
                  onRoleChange("requester_cs2");
                }}
                className="w-full px-3.5 py-2 text-left hover:bg-indigo-50/50 flex items-start space-x-2.5 text-xs transition-colors"
              >
                <UserCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800">
                    ผศ.ดร.วิภาดา สมบูรณ์ (ผู้ใช้งาน 2 - สาขาเดียวกัน)
                  </div>
                  <div className="text-[11px] text-slate-400">
                    สาขาวิชาเคมี (เห็นคำขอในสาขาเดียวกัน)
                  </div>
                </div>
              </button>

              {/* 3. รศ.ดร.อนันต์ - ผู้ใช้งาน (สาขาวิชาฟิสิกส์ ต่างสาขา) */}
              <button
                onClick={() => {
                  setIsRoleOpen(false);
                  onRoleChange("requester_chem");
                }}
                className="w-full px-3.5 py-2 text-left hover:bg-indigo-50/50 flex items-start space-x-2.5 text-xs transition-colors"
              >
                <UserCheck className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800">
                    รศ.ดร.อนันต์ สิทธิชัย (ผู้ใช้งาน 3 - ต่างสาขา)
                  </div>
                  <div className="text-[11px] text-slate-400">
                    สาขาวิชาฟิสิกส์ คณะวิทยาศาสตร์ (เห็นเฉพาะสาขาฟิสิกส์)
                  </div>
                </div>
              </button>

              {/* 4. นายสมศักดิ์ - แอดมิน งานแผนและยุทธศาสตร์ (ผู้อนุมัติ) */}
              <button
                onClick={() => {
                  setIsRoleOpen(false);
                  onRoleChange("plan_admin");
                }}
                className="w-full px-3.5 py-2 text-left hover:bg-purple-50/50 flex items-start space-x-2.5 text-xs transition-colors border-t border-slate-100"
              >
                <Building2 className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800">
                    นายสมศักดิ์ แผนดี (แอดมินงานแผนฯ)
                  </div>
                  <div className="text-[11px] text-slate-400">
                    งานแผนและยุทธศาสตร์ (ทำหน้าที่อนุมัติ/ดูได้ทั้งหมด)
                  </div>
                </div>
              </button>

              {/* 5. นางสาวกรกนก - งานคลังและพัสดุ (ดูข้อมูลได้ทั้งหมด) */}
              <button
                onClick={() => {
                  setIsRoleOpen(false);
                  onRoleChange("procurement");
                }}
                className="w-full px-3.5 py-2 text-left hover:bg-blue-50/50 flex items-start space-x-2.5 text-xs transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-800">
                    นางสาวกรกนก เพชรแท้ (งานคลังและพัสดุ)
                  </div>
                  <div className="text-[11px] text-slate-400">
                    งานบริหารพัสดุและทรัพย์สิน (ดูข้อมูลได้ทั้งหมด)
                  </div>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

