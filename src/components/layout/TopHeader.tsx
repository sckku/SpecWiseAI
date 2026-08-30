"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  HelpCircle,
  Sparkles,
  ChevronDown,
  UserCheck,
  ShieldCheck,
  Building2,
  Building,
  CheckCircle2,
  Scale,
  FileText,
  FileCheck,
  Layers,
  Search,
} from "lucide-react";
import { KKUUserSession, UserRole } from "@/types/auth";

interface TopHeaderProps {
  currentUser: KKUUserSession | null;
  onRoleChange: (roleKey: string) => Promise<void>;
  isLoading?: boolean;
}

export function TopHeader({ currentUser, onRoleChange, isLoading }: TopHeaderProps) {
  const pathname = usePathname();
  const [isRoleOpen, setIsRoleOpen] = useState(false);

  const roleBadgeColor = (role?: UserRole) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "APPROVER":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "DEPT_VERIFIER":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
    }
  };

  const roleLabel = (role?: UserRole) => {
    switch (role) {
      case "ADMIN":
        return "ผู้ดูแลระบบ (Admin)";
      case "APPROVER":
        return "ผู้อนุมัติระดับคณะ (Approver)";
      case "DEPT_VERIFIER":
        return "ผู้ตรวจระดับภาควิชา (Verifier)";
      default:
        return "ผู้ขอตั้งงบประมาณ (Requester)";
    }
  };

  const quickPills = [
    { label: "AI วิเคราะห์", icon: Sparkles, href: "/requests/new" },
    { label: "ตรวจมาตรฐาน", icon: CheckCircle2, href: "/catalogs" },
    { label: "ตรวจราคา", icon: Scale, href: "/requests/new?step=5" },
    { label: "ร่างเอกสาร", icon: FileText, href: "/requests/new?step=7" },
    { label: "หลักฐานอ้างอิง", icon: Layers, href: "/catalogs" },
  ];

  return (
    <header className="sticky top-0 z-40 flex min-h-14 items-center justify-between gap-2 border-b border-slate-200/80 bg-white/95 px-4 py-2 backdrop-blur-md sm:h-16 sm:px-6">
      {/* Left: Greeting & Subtitle */}
      <div className="min-w-0">
        <h2 className="flex items-center gap-1.5 truncate font-heading text-base font-bold text-slate-900">
          <span className="truncate">สวัสดีครับ, {currentUser?.thaiName?.split(" ")[0] || "วรรณวิภา"}</span>
          <span className="text-base">👋</span>
        </h2>
        <p className="hidden text-[11px] font-medium text-slate-400 sm:block">
          จัดทำคำของบประมาณได้ง่ายขึ้นด้วย AI
        </p>
      </div>

      {/* Center: Quick Action Feature Pills (Desktop) */}
      <div className="hidden xl:flex items-center space-x-1.5 bg-slate-100/80 p-1 rounded-full border border-slate-200/60">
        {quickPills.map((pill, idx) => {
          const Icon = pill.icon;
          return (
            <Link
              key={idx}
              href={pill.href}
              className="flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium text-slate-600 hover:text-indigo-600 hover:bg-white transition-all shadow-none hover:shadow-xs"
            >
              <Icon className="w-3.5 h-3.5 text-indigo-500" />
              <span>{pill.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Right Controls: Notifications, Help, Faculty Badge, Role Switcher */}
      <div className="flex items-center space-x-1 sm:space-x-3">
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
        <button
          className="hidden rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 sm:block"
          title="คู่มือการใช้งาน"
        >
          <HelpCircle className="h-4 w-4" />
        </button>

        {/* Faculty & User Role Badge */}
        <div className="relative">
          <button
            onClick={() => setIsRoleOpen(!isRoleOpen)}
            className="flex items-center space-x-1.5 rounded-full border border-slate-200/80 bg-slate-50/70 py-1.5 pl-2 pr-2 text-left transition-all hover:border-slate-300 hover:bg-slate-100/70 sm:space-x-2.5 sm:pl-3 sm:pr-2.5"
          >
            {/* Faculty Logo Pill */}
            <div className="flex items-center space-x-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 text-[10px] font-bold text-white shadow-xs">
                {currentUser?.faculty?.charAt(0) || "ค"}
              </div>
              <div className="hidden sm:block text-left pr-1">
                <div className="text-[11px] font-bold text-slate-800 leading-tight flex items-center space-x-1">
                  <span>SCIT KKU</span>
                </div>
                <div className="text-[9px] text-slate-400 leading-tight">
                  {currentUser?.faculty || "คณะวิทยาศาสตร์"}
                </div>
              </div>
            </div>

            {/* User Initial Badge */}
            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
              {currentUser?.thaiName?.charAt(0) || "N"}
            </div>

             <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {/* Role Switcher Dropdown */}
          {isRoleOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/80 py-2 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3.5 py-2 border-b border-slate-100">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  สลับบทบาททดสอบ (Mock Auth)
                </p>
                <p className="text-[10px] text-slate-400">
                  จำลองการใช้งานสิทธิ์ตามระบบ KKU SSONext
                </p>
              </div>

              <button
                onClick={() => {
                  setIsRoleOpen(false);
                  onRoleChange("requester");
                }}
                className="w-full px-3.5 py-2 text-left hover:bg-indigo-50/50 flex items-start space-x-2.5 text-xs transition-colors"
              >
                <UserCheck className="w-4 h-4 text-indigo-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">
                    ดร.วรรณวิภา (ผู้ขอตั้งงบ)
                  </div>
                  <div className="text-[10px] text-slate-400">
                    นักวิเคราะห์พัสดุ / คณะวิทยาศาสตร์
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsRoleOpen(false);
                  onRoleChange("verifier");
                }}
                className="w-full px-3.5 py-2 text-left hover:bg-indigo-50/50 flex items-start space-x-2.5 text-xs transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">
                    นายประเสริฐ (ผู้ตรวจภาควิชา)
                  </div>
                  <div className="text-[10px] text-slate-400">
                    เจ้าหน้าที่งานแผนและนโยบาย ภาควิชา
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsRoleOpen(false);
                  onRoleChange("approver");
                }}
                className="w-full px-3.5 py-2 text-left hover:bg-indigo-50/50 flex items-start space-x-2.5 text-xs transition-colors"
              >
                <Building2 className="w-4 h-4 text-amber-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">
                    ศ.ดร.วิโรจน์ (ผู้อนุมัติคณะ)
                  </div>
                  <div className="text-[10px] text-slate-400">
                    คณบดีคณะวิทยาศาสตร์
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsRoleOpen(false);
                  onRoleChange("admin");
                }}
                className="w-full px-3.5 py-2 text-left hover:bg-indigo-50/50 flex items-start space-x-2.5 text-xs transition-colors"
              >
                <Sparkles className="w-4 h-4 text-purple-600 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">
                    นางสาวกรกนก (ผู้ดูแลระบบ)
                  </div>
                  <div className="text-[10px] text-slate-400">
                    กองคลังและพัสดุ มหาวิทยาลัยขอนแก่น
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
