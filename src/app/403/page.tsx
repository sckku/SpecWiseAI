"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Home,
  UserCheck,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  Building,
} from "lucide-react";
import { KKUUserSession } from "@/types/auth";

export default function ForbiddenPage() {
  const [currentUser, setCurrentUser] = useState<KKUUserSession | null>(null);
  const [availableRoles, setAvailableRoles] = useState<KKUUserSession[]>([]);
  const [isSwitching, setIsSwitching] = useState(false);

  useEffect(() => {
    fetch("/api/auth/mock-switch")
      .then((res) => res.json())
      .then((data) => {
        if (data.availableRoles && data.availableRoles.length > 0) {
          setAvailableRoles(data.availableRoles);
          const currentRoleKey =
            document.cookie
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
    setIsSwitching(true);
    try {
      const res = await fetch("/api/auth/mock-switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: roleKey }),
      });
      if (res.ok) {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Failed to switch role:", err);
    } finally {
      setIsSwitching(false);
    }
  };

  return (
    <div className="relative min-h-[75vh] flex flex-col items-center justify-center py-8 px-4 sm:px-6">
      {/* Background Decor */}
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-3xl h-80 bg-gradient-to-b from-purple-500/10 via-rose-500/5 to-transparent blur-3xl" />

      <div className="relative z-10 w-full max-w-2xl text-center">
        {/* Visual Badge & Icon */}
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl border-2 border-purple-200 bg-purple-50 shadow-lg text-purple-700">
            <ShieldAlert className="h-10 w-10" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-purple-800 shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-purple-600 animate-ping" />
            <span className="font-mono">403</span>
            <span>•</span>
            <span>การเข้าถึงถูกจำกัด (Access Restricted)</span>
          </div>
        </div>

        <h1 className="mb-3 font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
          คุณไม่มีสิทธิ์เข้าถึงส่วนงานหรือหน้าที่ระบุ
        </h1>
        <p className="mb-8 text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto">
          หน้านี้สงวนสิทธิ์เฉพาะผู้ใช้งานที่มีบทบาทตามที่กำหนดในระบบ เช่น ผู้ตรวจสอบภาควิชา (Dept Verifier),
          ผู้อนุมัติระดับคณะ (Approver) หรือผู้ดูแลระบบ (Admin)
        </p>

        {/* Current Active Role Box */}
        {currentUser && (
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm text-left">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  ข้อมูลผู้ใช้งานและบทบาทปัจจุบันของคุณ
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-bold text-slate-900 text-base">{currentUser.name}</span>
                  <span className="rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-xs font-bold text-slate-700">
                    {currentUser.role}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {currentUser.position} • {currentUser.department}
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs text-amber-800 font-semibold">
                ⚠️ บทบาทนี้ไม่มีสิทธิ์เข้าถึงหน้านี้
              </div>
            </div>

            {/* Quick Switch Role Buttons (Mock Mode / Dev Feature) */}
            {availableRoles.length > 0 && (
              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-medium text-slate-500 block mb-2">
                  ทดสอบสลับบทบาทไปยังผู้มีสิทธิ์ (Demo Switcher):
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {availableRoles.map((r: any) => (
                    <button
                      key={r.key}
                      onClick={() => handleRoleSwitch(r.key)}
                      disabled={isSwitching}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-bold transition-all ${
                        currentUser.id === r.id
                          ? "border-kku-600 bg-kku-50 text-kku-800 ring-2 ring-kku-500/20"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                      }`}
                    >
                      <UserCheck className="h-4 w-4 mb-1 text-slate-500" />
                      <span>{r.role}</span>
                      <span className="text-[10px] font-normal text-slate-400 line-clamp-1">
                        {r.name.split(" ")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 rounded-xl bg-kku-700 hover:bg-kku-800 text-white px-5 py-2.5 text-sm font-bold shadow-md transition-all hover:scale-[1.02]"
          >
            <Home className="h-4 w-4" />
            <span>กลับสู่หน้าหลัก (Dashboard)</span>
          </Link>

          <Link
            href="/requests"
            className="inline-flex items-center space-x-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 transition-all"
          >
            <span>ดูรายการคำขอของฉัน</span>
          </Link>
        </div>

        {/* Support Help */}
        <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
          <span className="inline-flex items-center space-x-1.5">
            <Building className="h-3.5 w-3.5 text-slate-400" />
            <span>ต้องการขอสิทธิ์เพิ่มเติม ติดต่อฝ่ายเทคโนโลยีสารสนเทศ คณะ/มหาวิทยาลัย</span>
          </span>
          <span>•</span>
          <span>โทรศัพท์ภายใน: 42890-92</span>
        </div>
      </div>
    </div>
  );
}
