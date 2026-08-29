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
      case "ADMIN":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "APPROVER":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "DEPT_VERIFIER":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
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

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl kku-gradient flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-heading font-bold text-lg text-slate-900 tracking-tight">
                    SpecWise <span className="text-kku-700">AI</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-kku-100 text-kku-800 font-semibold uppercase">
                    KKU 2026
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  AI Asset Budget &amp; TOR Assistant
                </p>
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="hidden md:flex items-center space-x-1 ml-6 pl-6 border-l border-slate-200">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1.5 ${
                  pathname === "/"
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
                <div className="w-7 h-7 rounded-full bg-kku-700 text-white text-xs flex items-center justify-center font-bold">
                  {currentUser?.thaiName?.charAt(0) || "U"}
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs font-semibold text-slate-800 flex items-center space-x-1">
                    <span>{currentUser?.thaiName || "ผู้ใช้งาน"}</span>
                  </div>
                  <span
                    className={`inline-block text-[10px] px-1.5 py-0.2 rounded border font-medium ${roleBadgeColor(
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
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      สลับบทบาททดสอบ (Mock Auth)
                    </p>
                    <p className="text-[11px] text-slate-400">
                      จำลองการใช้งานสิทธิ์ตามระบบ KKU SSONext
                    </p>
                  </div>

                  <button
                    onClick={() => handleRoleSwitch("requester")}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-start space-x-2.5 text-xs transition-colors"
                  >
                    <UserCheck className="w-4 h-4 text-emerald-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-800">
                        ดร.สมชาย (ผู้ขอตั้งงบ)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        อาจารย์/นักวิจัย สาขาวิชาวิทยาการคอมฯ
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleRoleSwitch("verifier")}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-start space-x-2.5 text-xs transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-800">
                        นายประเสริฐ (ผู้ตรวจภาควิชา)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        เจ้าหน้าที่งานแผนและนโยบาย ภาควิชา
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleRoleSwitch("approver")}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-start space-x-2.5 text-xs transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-amber-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-800">
                        ศ.ดร.วิโรจน์ (ผู้อนุมัติคณะ)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        คณบดีคณะวิทยาศาสตร์
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleRoleSwitch("admin")}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-start space-x-2.5 text-xs transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-purple-600 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-800">
                        นางสาวกรกนก (ผู้ดูแลระบบ)
                      </div>
                      <div className="text-[11px] text-slate-500">
                        กองคลังและพัสดุ มหาวิทยาลัยขอนแก่น
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
