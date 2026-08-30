"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  LayoutDashboard,
  FilePlus2,
  BookOpen,
  ShieldCheck,
  UserCheck,
  ChevronDown,
  Building2,
} from "lucide-react";
import { KKUUserSession, UserRole } from "@/types/auth";

export function Navbar() {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<KKUUserSession | null>(null);
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch initial user role from cookie/session
    fetch("/api/auth/mock-switch")
      .then((res) => res.json())
      .then((data) => {
        if (data.availableRoles && data.availableRoles.length > 0) {
          // Check active role or set default
          const currentRoleKey = document.cookie
            .split("; ")
            .find((row) => row.startsWith("specwise_session_role="))
            ?.split("=")[1] || "requester";
          const match = data.availableRoles.find((r: any) => r.key === currentRoleKey);
          setCurrentUser(match || data.availableRoles[0]);
        }
      })
      .catch(console.error);
  }, []);

  const handleRoleSwitch = async (roleKey: string) => {
    setIsLoading(true);
    setIsRoleMenuOpen(false);
    try {
      const res = await fetch("/api/auth/mock-switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: roleKey }),
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        window.location.reload();
      }
    } catch (err) {
      console.error("Failed to switch role:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const roleBadgeColor = (role?: UserRole) => {
    switch (role) {
      case "PLAN_ADMIN":
      case "ADMIN":
      case "APPROVER":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "FINANCE_PROCUREMENT":
      case "DEPT_VERIFIER":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
  };

  const roleLabel = (role?: UserRole) => {
    switch (role) {
      case "PLAN_ADMIN":
      case "ADMIN":
        return "แอดมิน (งานแผนและยุทธศาสตร์)";
      case "FINANCE_PROCUREMENT":
        return "งานคลังและพัสดุ";
      case "APPROVER":
        return "ผู้อนุมัติ (งานแผนฯ)";
      case "DEPT_VERIFIER":
        return "ผู้ตรวจภาควิชา";
      default:
        return "ผู้ใช้งาน (สาขาวิชา)";
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/dashboard" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl kku-gradient flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-heading font-bold text-lg text-slate-900 tracking-tight">
                    SpecWise <span className="text-kku-700">AI</span>
                  </span>
                  <span className="text-sm px-1.5 py-0.5 rounded bg-kku-100 text-kku-800 font-semibold uppercase">
                    KKU 2026
                  </span>
                </div>
                <p className="text-sm text-slate-500 hidden sm:block">
                  AI Asset Budget &amp; TOR Assistant
                </p>
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center space-x-1 ml-6 pl-6 border-l border-slate-200">
              <Link
                href="/dashboard"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  pathname === "/dashboard"
                    ? "bg-kku-50 text-kku-800 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>แดชบอร์ด</span>
              </Link>
              <Link
                href="/requests/new"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  pathname === "/requests/new"
                    ? "bg-kku-50 text-kku-800 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <FilePlus2 className="w-4 h-4" />
                <span>สร้างคำขอใหม่ (6-Step AI)</span>
              </Link>
              <Link
                href="/manual"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  pathname === "/manual"
                    ? "bg-kku-50 text-kku-800 font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>คู่มือการใช้งาน</span>
              </Link>
            </nav>
          </div>

          {/* User Profile & Role Switcher */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <button
                onClick={() => setIsRoleMenuOpen(!isRoleMenuOpen)}
                className="flex items-center space-x-2.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 text-left transition-colors"
                disabled={isLoading}
              >
                <div className="w-7 h-7 rounded-full bg-kku-700 text-white text-sm flex items-center justify-center font-bold">
                  {currentUser?.thaiName?.charAt(0) || "U"}
                </div>
                <div className="hidden sm:block">
                  <div className="text-sm font-semibold text-slate-800 flex items-center space-x-1">
                    <span>{currentUser?.thaiName || "ผู้ใช้งาน"}</span>
                  </div>
                  <span
                    className={`inline-block text-sm px-1.5 py-0.2 rounded border font-medium ${roleBadgeColor(
                      currentUser?.role
                    )}`}
                  >
                    {roleLabel(currentUser?.role)}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>

              {/* Dropdown Menu for Role Switching */}
              {isRoleMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
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
                    onClick={() => handleRoleSwitch("requester")}
                    className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-start space-x-2.5 text-xs transition-colors"
                  >
                    <UserCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-800">
                        ดร.สมชาย แก้วกล้า (ผู้ใช้งาน 1)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        สาขาวิชาเคมี คณะวิทยาศาสตร์
                      </div>
                    </div>
                  </button>

                  {/* 2. ผศ.ดร.วิภาดา - ผู้ใช้งาน (สาขาวิชาเคมี สาขาเดียวกัน) */}
                  <button
                    onClick={() => handleRoleSwitch("requester_cs2")}
                    className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-start space-x-2.5 text-xs transition-colors"
                  >
                    <UserCheck className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-800">
                        ผศ.ดร.วิภาดา สมบูรณ์ (ผู้ใช้งาน 2 - สาขาเดียวกัน)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        สาขาวิชาเคมี (เห็นคำขอในสาขาเดียวกัน)
                      </div>
                    </div>
                  </button>

                  {/* 3. รศ.ดร.อนันต์ - ผู้ใช้งาน (สาขาวิชาฟิสิกส์ ต่างสาขา) */}
                  <button
                    onClick={() => handleRoleSwitch("requester_chem")}
                    className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-start space-x-2.5 text-xs transition-colors"
                  >
                    <UserCheck className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-800">
                        รศ.ดร.อนันต์ สิทธิชัย (ผู้ใช้งาน 3 - ต่างสาขา)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        สาขาวิชาฟิสิกส์ คณะวิทยาศาสตร์ (เห็นเฉพาะสาขาฟิสิกส์)
                      </div>
                    </div>
                  </button>

                  {/* 4. นายสมศักดิ์ - แอดมิน งานแผนและยุทธศาสตร์ (ผู้อนุมัติ) */}
                  <button
                    onClick={() => handleRoleSwitch("plan_admin")}
                    className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-start space-x-2.5 text-xs transition-colors border-t border-slate-100"
                  >
                    <Building2 className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-800">
                        นายสมศักดิ์ แผนดี (แอดมินงานแผนฯ)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        งานแผนและยุทธศาสตร์ (ทำหน้าที่อนุมัติ/ดูได้ทั้งหมด)
                      </div>
                    </div>
                  </button>

                  {/* 5. นางสาวกรกนก - งานคลังและพัสดุ (ดูข้อมูลได้ทั้งหมด) */}
                  <button
                    onClick={() => handleRoleSwitch("procurement")}
                    className="w-full px-3.5 py-2 text-left hover:bg-slate-50 flex items-start space-x-2.5 text-xs transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-800">
                        นางสาวกรกนก เพชรแท้ (งานคลังและพัสดุ)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        งานบริหารพัสดุและทรัพย์สิน (ดูข้อมูลได้ทั้งหมด)
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
