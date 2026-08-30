"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  BookOpen,
} from "lucide-react";
import { KKUUserSession } from "@/types/auth";
import { DashboardMetrics } from "@/types/budget";

interface SidebarProps {
  currentUser: KKUUserSession | null;
  onRoleChange?: (roleKey: string) => void;
}

export function Sidebar({ currentUser }: SidebarProps) {
  const pathname = usePathname();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  useEffect(() => {
    fetch("/api/dashboard/metrics")
      .then((res) => res.json())
      .then((data) => {
        if (data.metrics) setMetrics(data.metrics);
      })
      .catch((err) => console.error("Sidebar metrics fetch error:", err));
  }, [pathname]);

  const navItems = [
    {
      label: "หน้าหลัก (แดชบอร์ด)",
      href: "/dashboard",
      icon: LayoutDashboard,
      active: pathname === "/dashboard",
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
      label: "คู่มือการใช้งาน",
      href: "/manual",
      icon: BookOpen,
      active: pathname === "/manual",
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

  const totalItems = metrics?.totalProposals ?? 40;
  const timeSavedHours = metrics?.nvaTimeSavedHours ?? Math.round(totalItems * 10.7);

  return (
    <aside className="sticky top-0 hidden h-screen min-h-screen w-56 shrink-0 select-none flex-col border-r border-slate-200/80 bg-white md:flex xl:w-60">
      {/* Brand Logo */}
      <div className="p-5 pb-4 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 fill-white/20" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="font-heading font-bold text-base text-slate-900 tracking-tight">
                SpecWise <span className="text-indigo-600">AI</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium leading-none">
              KKU Asset & Budget AI
            </p>
          </div>
        </Link>
      </div>

      {/* Primary Action Button */}
      <div className="px-4 py-2">
        <Link
          href="/requests/new"
          className="w-full py-2.5 px-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-semibold text-xs shadow-md shadow-indigo-500/25 flex items-center justify-center space-x-1.5 transition-all active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 shrink-0" />
          <span className="leading-tight">สร้างคำของบประมาณใหม่</span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                item.active
                  ? "bg-indigo-50/90 text-indigo-700 font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <Icon
                  className={`w-4 h-4 ${
                    item.active ? "text-indigo-600" : "text-slate-400"
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold min-w-4 text-center">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* AI Stats Card Widget at Bottom */}
      <div className="p-3 border-t border-slate-100">
        <div className="bg-slate-50/80 border border-slate-200/60 rounded-2xl p-3 relative overflow-hidden">
          <div className="text-xs font-bold text-slate-800">
            AI ช่วยคุณไปแล้ว
          </div>
          <p className="text-[11px] text-slate-400">ประจำปีงบประมาณ 2569 - 2570</p>

          <div className="mt-2">
            <div className="text-2xl font-heading font-bold text-indigo-600 leading-tight">
              {totalItems.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500">รายการ</div>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-200/50 flex items-center justify-between text-xs">
            <div>
              <span className="text-[11px] text-slate-400 block leading-tight">ประหยัดเวลาไปแล้ว</span>
              <span className="text-xs font-bold text-emerald-600">{timeSavedHours.toLocaleString()}</span>{" "}
              <span className="text-[11px] text-slate-500">ชั่วโมง</span>
            </div>
            <Link
              href="/reports"
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-0.5 text-right"
            >
              <span>ดูรายละเอียด</span>
              <ArrowRight className="w-3 h-3 ml-0.5" />
            </Link>
          </div>
        </div>

        {/* User Profile Pill */}
        <div className="mt-2.5 flex items-center space-x-2.5 px-2 py-1.5 rounded-xl hover:bg-slate-50 transition-colors">
          <div className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shadow-xs shrink-0">
            {currentUser?.thaiName?.[0] || currentUser?.name?.[0] || "N"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-800 truncate leading-tight">
              {currentUser?.thaiName || "ดร.สมชาย แก้วกล้า"}
            </p>
            <p className="text-[11px] text-slate-400 truncate leading-tight">
              {currentUser?.position || "อาจารย์ / นักวิจัย"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
