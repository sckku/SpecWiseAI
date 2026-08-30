"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Shield,
  UserCheck,
  Building2,
  Building,
  ArrowRight,
  Lock,
  CheckCircle2,
  LogIn,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("requester");
  const [isLoading, setIsLoading] = useState(false);

  const handleMockLogin = async (role: string) => {
    setIsLoading(true);
    try {
      await fetch("/api/auth/mock-switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      router.push("/requests");
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSSONextLogin = () => {
    window.location.href = "/api/auth/ssonext/login";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative z-10 text-white space-y-6">
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 shadow-lg shadow-indigo-500/30 mb-2">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-heading font-extrabold tracking-tight">
            SpecWise <span className="text-amber-400">AI</span>
          </h1>
          <p className="text-xs text-slate-300">
            ระบบจัดทำคำของบประมาณและสเปกครุภัณฑ์ มหาวิทยาลัยขอนแก่น
          </p>
        </div>

        {/* KKU SSONext Primary Button */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleSSONextLogin}
            disabled={isLoading}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-heading font-bold text-sm shadow-xl shadow-orange-500/25 flex items-center justify-center space-x-2.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <LogIn className="w-5 h-5" />
            <span>เข้าสู่ระบบด้วย KKU SSONext</span>
          </button>
          <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>รองรับ KKU SSONext OAuth2 / OIDC Single Sign-On</span>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-4 text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
            หรือ ทดสอบในโหมด Sandbox / Mock
          </span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* Mock Role Switcher Cards */}
        <div className="space-y-2">
          <div className="text-[11px] font-semibold text-slate-300">
            เลือกบทบาทผู้ใช้งานเพื่อทดสอบระบบทันที:
          </div>

          <div className="grid grid-cols-1 gap-2">
            {[
              {
                key: "requester",
                name: "ดร.สมชาย แก้วกล้า",
                roleName: "ผู้ขอตั้งงบประมาณ (Requester)",
                dept: "คณะวิทยาศาสตร์",
                icon: UserCheck,
                color: "border-indigo-500/40 hover:bg-indigo-500/10",
              },
              {
                key: "verifier",
                name: "นายประเสริฐ รักงาน",
                roleName: "ผู้ตรวจระดับภาควิชา (Verifier)",
                dept: "งานแผนและนโยบาย",
                icon: Shield,
                color: "border-blue-500/40 hover:bg-blue-500/10",
              },
              {
                key: "approver",
                name: "ศ.ดร.วิโรจน์ วิเศษ",
                roleName: "ผู้อนุมัติระดับคณะ (Approver)",
                dept: "คณบดีคณะวิทยาศาสตร์",
                icon: Building2,
                color: "border-amber-500/40 hover:bg-amber-500/10",
              },
              {
                key: "admin",
                name: "นางสาวกรกนก เพชรแท้",
                roleName: "ผู้ดูแลระบบพัสดุ (Admin)",
                dept: "กองคลังและพัสดุ มข.",
                icon: Sparkles,
                color: "border-purple-500/40 hover:bg-purple-500/10",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => handleMockLogin(item.key)}
                  disabled={isLoading}
                  className={`w-full p-3 rounded-2xl border ${item.color} bg-white/5 transition-all text-left flex items-center justify-between group`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-white/10 text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                        {item.name}
                      </div>
                      <div className="text-[10px] text-slate-300">{item.roleName}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-2 text-center text-[10px] text-slate-400 border-t border-white/10">
          KKU AI Hackathon 2026 • Khon Kaen University
        </div>
      </div>
    </div>
  );
}
