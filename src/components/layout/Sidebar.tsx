"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  FileText,
  Layers,
  BarChart3,
  Bell,
  Settings,
  Plus,
  ArrowRight,
  ShieldCheck,
  Building2,
  UserCheck,
  ChevronRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  Bot,
} from "lucide-react";
import { KKUUserSession, UserRole } from "@/types/auth";

interface SidebarProps {
  currentUser: KKUUserSession | null;
  onRoleChange?: (roleKey: string) => void;
}

export function Sidebar({ currentUser }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      label: "หน้าหลัก",
      href: "/",
      icon: LayoutDashboard,
      active: pathname === "/",
    },
    {
      label: "คำของบประมาณ",
      href: "/requests",
      icon: FileText,
      active: pathname.startsWith("/requests") && pathname !== "/requests/new",
    },
    {
      label: "มาตรฐานและราคา",
      href: "/catalogs",
      icon: Layers,
      active: pathname === "/catalogs",
    },
    {
      label: "วิเคราะห์และรายงาน",
      href: "/reports",
      icon: BarChart3,
      active: pathname === "/reports",
    },
    {
      label: "การแจ้งเตือน",
      href: "/notifications",
      icon: Bell,
      badge: "3",
      active: pathname === "/notifications",
    },
    {
      label: "ตั้งค่า",
      href: "/settings",
      icon: Settings,
      active: pathname === "/settings",
    },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen min-h-screen w-56 shrink-0 select-none flex-col border-r border-slate-200/80 bg-white md:flex xl:w-64">
      {/* Brand Logo */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 fill-white/20" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-heading font-bold text-lg text-slate-900 tracking-tight">
                SpecWise <span className="text-indigo-600">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 font-medium">KKU Asset & Budget AI</p>
          </div>
        </Link>
      </div>

      {/* Primary Action Button */}
      <div className="p-4">
        <Link
          href="/requests/new"
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-heading font-medium text-sm shadow-md shadow-indigo-500/25 flex items-center justify-center space-x-2 transition-all hover:shadow-lg hover:shadow-indigo-500/35 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>สร้างคำของบประมาณใหม่</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                item.active
                  ? "bg-indigo-50/80 text-indigo-700 font-semibold shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon
                  className={`w-4 h-4 ${
                    item.active ? "text-indigo-600" : "text-slate-400 group-hover:text-slate-600"
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-sm font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* AI Stats Card Widget at Bottom */}
      <div className="p-4 border-t border-slate-100">
        <div className="bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-slate-50 border border-indigo-100/80 rounded-2xl p-4 relative overflow-hidden">
          <div className="flex items-center justify-between text-indigo-700 mb-1">
            <span className="text-sm font-semibold text-slate-800">AI ช่วยคุณไปแล้ว</span>
          </div>
          <p className="text-sm text-slate-500">ประจำปีงบประมาณ 2570</p>

          <div className="mt-3">
            <div className="text-3xl font-heading font-bold text-indigo-600 leading-tight">
              161
            </div>
            <div className="text-sm text-slate-600">รายการ</div>
          </div>

          <div className="mt-3 pt-3 border-t border-indigo-100/60 flex items-center justify-between">
            <div>
              <span className="text-sm text-slate-500 block">ประหยัดเวลาไปแล้ว</span>
              <span className="text-sm font-bold text-emerald-600">428</span>{" "}
              <span className="text-sm text-slate-500">ชั่วโมง</span>
            </div>
            <Link
              href="/reports"
              className="text-sm text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-0.5"
            >
              <span>ดูรายละเอียด</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* User Profile Pill */}
        <div className="mt-3 flex items-center space-x-2.5 px-2 py-1.5 rounded-xl hover:bg-slate-50 transition-colors">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white text-sm font-bold flex items-center justify-center shadow-xs">
            {currentUser?.thaiName?.charAt(0) || "ว"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 truncate">
              {currentUser?.thaiName || "วรรณวิภา อ."}
            </p>
            <p className="text-sm text-slate-400 truncate">
              {currentUser?.position || "นักวิเคราะห์พัสดุ"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
