"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Shield,
  ShieldCheck,
  UserCheck,
  Building2,
  ArrowRight,
  Lock,
  CheckCircle2,
  LogIn,
  Layers,
  FileText,
  Search,
  Scale,
  Zap,
  Check,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Cpu,
  Coins,
  FileCode,
  Users,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"sso" | "sandbox">("sso");

  const handleMockLogin = async (role: string) => {
    setSelectedRole(role);
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/mock-switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (res.ok) {
        if (role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
        router.refresh();
      }
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSSONextLogin = () => {
    setIsLoading(true);
    window.location.href = "/api/auth/ssonext/login";
  };

  const mockPersonas = [
    {
      key: "requester",
      name: "ดร.สมชาย แก้วกล้า",
      roleTitle: "ผู้ขอตั้งงบประมาณ (Requester)",
      roleBadge: "ผู้ขอตั้งงบ",
      dept: "ภาควิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์",
      position: "อาจารย์ / นักวิจัย",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      avatarBg: "bg-emerald-100 text-emerald-700",
      borderHover: "hover:border-emerald-300 hover:bg-emerald-50/40",
      icon: UserCheck,
      capabilities: "สร้างคำขอ • AI 6 สเต็ป • แนบใบเสนอราคา",
    },
    {
      key: "verifier",
      name: "นายประเสริฐ รักงาน",
      roleTitle: "ผู้ตรวจระดับภาควิชา (Verifier)",
      roleBadge: "ผู้ตรวจภาควิชา",
      dept: "งานแผนและนโยบาย คณะวิทยาศาสตร์",
      position: "เจ้าหน้าที่บริหารงานทั่วไป ชำนาญการ",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      avatarBg: "bg-blue-100 text-blue-700",
      borderHover: "hover:border-blue-300 hover:bg-blue-50/40",
      icon: ShieldCheck,
      capabilities: "ตรวจความถูกต้อง • ให้ความเห็น • ส่งต่อคณะ",
    },
    {
      key: "approver",
      name: "ศ.ดร.วิโรจน์ วิเศษ",
      roleTitle: "ผู้อนุมัติระดับคณะ (Approver)",
      roleBadge: "ผู้อนุมัติ (คณบดี)",
      dept: "สำนักงานคณบดี คณะวิทยาศาสตร์",
      position: "คณบดีคณะวิทยาศาสตร์",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
      avatarBg: "bg-amber-100 text-amber-700",
      borderHover: "hover:border-amber-300 hover:bg-amber-50/40",
      icon: Building2,
      capabilities: "อนุมัติระดับคณะ • ภาพรวมวงเงินรวม • ส่งมหาวิทยาลัย",
    },
    {
      key: "admin",
      name: "นางสาวกรกนก เพชรแท้",
      roleTitle: "ผู้ดูแลระบบพัสดุ (Admin)",
      roleBadge: "Admin พัสดุ",
      dept: "กองคลังและพัสดุ มหาวิทยาลัยขอนแก่น",
      position: "นักวิชาการพัสดุ ชำนาญการพิเศษ",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
      avatarBg: "bg-purple-100 text-purple-700",
      borderHover: "hover:border-purple-300 hover:bg-purple-50/40",
      icon: Sparkles,
      capabilities: "จัดการมาตรฐานราคากลาง • TOR Benchmark • Audit",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EEF2FF] via-[#F8FAFC] to-[#F8FAFC] text-slate-900 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-200/35 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f108_1px,transparent_1px),linear-gradient(to_bottom,#6366f108_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* 1. Header Bar */}
      <header className="relative z-20 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl kku-gradient flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-heading font-black text-lg sm:text-xl text-slate-900 tracking-tight">
                  SpecWise <span className="text-indigo-600">AI</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full">
                  KKU AI 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">
                ระบบ AI ผู้ช่วยจัดทำคำของบประมาณและสเปกครุภัณฑ์ มหาวิทยาลัยขอนแก่น
              </p>
            </div>
          </Link>

          {/* Right Header Navigation Links */}
          <div className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm">
            <div className="hidden lg:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-medium text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>KKU SSONext Online</span>
            </div>
            <Link
              href="/manual"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-slate-600 hover:text-indigo-600 hover:bg-slate-100 font-medium transition-colors"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>คู่มือการใช้งาน</span>
            </Link>
            <Link
              href="/"
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium transition-colors"
            >
              <span>← หน้าแรก</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Main Login Container */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full max-w-6xl">
          
          {/* LEFT COLUMN: Authentication Hub (Sign In Card) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 md:p-9 shadow-xl shadow-indigo-100/50 relative overflow-hidden">
              {/* Card Top Glow */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500" />

              {/* Title Section */}
              <div className="space-y-2 mb-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
                  <Shield className="w-3.5 h-3.5" />
                  <span>ระบบพิสูจน์ตัวตนแบบรวมศูนย์ (Single Sign-On)</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 tracking-tight">
                  เข้าสู่ระบบ SpecWise AI
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  สำหรับอาจารย์ นักวิจัย และบุคลากรมหาวิทยาลัยขอนแก่น เพื่อจัดทำ ตรวจสอบ และอนุมัติคำของบประมาณครุภัณฑ์
                </p>
              </div>

              {/* Login Mode Tabs */}
              <div className="flex rounded-xl bg-slate-100 p-1 mb-6 border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setActiveTab("sso")}
                  className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center space-x-2 ${
                    activeTab === "sso"
                      ? "bg-white text-indigo-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <LogIn className="w-4 h-4" />
                  <span>เข้าสู่ระบบด้วย KKU SSONext</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("sandbox")}
                  className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center space-x-2 ${
                    activeTab === "sandbox"
                      ? "bg-white text-indigo-700 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Users className="w-4 h-4" />
                  <span>โหมดทดสอบ (Sandbox)</span>
                </button>
              </div>

              {/* Tab 1: Primary KKU SSONext Login */}
              {activeTab === "sso" && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  {/* Big Primary KKU SSO Button */}
                  <button
                    onClick={handleSSONextLogin}
                    disabled={isLoading}
                    className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-heading font-bold text-base shadow-lg shadow-orange-500/25 flex items-center justify-between group transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3 text-left">
                      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
                        <LogIn className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-extrabold leading-tight">
                          เข้าสู่ระบบด้วย KKU SSONext
                        </div>
                        <div className="text-xs text-amber-100 font-normal">
                          ใช้ KKU Mail (@kku.ac.th) บุคลากร มข.
                        </div>
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </button>

                  {/* Secondary Google Workspace Auth */}
                  <button
                    onClick={handleSSONextLogin}
                    disabled={isLoading}
                    className="w-full py-3 px-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm shadow-xs flex items-center justify-center space-x-2.5 transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>เข้าสู่ระบบด้วย Google Workspace (@kku.ac.th)</span>
                  </button>

                  {/* SSONext Feature List */}
                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2.5">
                    <div className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                      <ShieldCheck className="w-4 h-4 text-indigo-600" />
                      <span>สิทธิประโยชน์และการเชื่อมต่ออัตโนมัติ:</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>ดึงข้อมูลคณะ/ภาควิชาจาก KKU HR v3</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>กำหนดบทบาทตามตำแหน่งงานอัตโนมัติ</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>ปลอดภัยด้วย OIDC Protocol สากล</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>รองรับ 2FA ตามมาตรฐาน มข.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Quick Sandbox Callout */}
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                    <span>ไม่มีบัญชี KKU หรือต้องการทดสอบระบบ?</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab("sandbox")}
                      className="text-indigo-600 font-semibold hover:underline flex items-center space-x-1"
                    >
                      <span>เลือกบทบาททดสอบใน Sandbox →</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 2: Mock Role Personas Switcher */}
              {activeTab === "sandbox" && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-xs font-bold text-slate-700">
                      คลิกเลือกบทบาทเพื่อเข้าสู่ระบบทันที (Sandbox Mode):
                    </span>
                    <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                      4 บทบาทพร้อมทดสอบ
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {mockPersonas.map((persona) => {
                      const Icon = persona.icon;
                      const isTarget = selectedRole === persona.key && isLoading;

                      return (
                        <button
                          key={persona.key}
                          onClick={() => handleMockLogin(persona.key)}
                          disabled={isLoading}
                          className={`w-full p-3.5 rounded-2xl border border-slate-200 bg-white ${persona.borderHover} hover:shadow-md transition-all text-left flex items-center justify-between group relative overflow-hidden`}
                        >
                          <div className="flex items-start space-x-3 min-w-0 flex-1 pr-2">
                            {/* Avatar Icon */}
                            <div
                              className={`w-10 h-10 rounded-xl ${persona.avatarBg} flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>

                            {/* Info */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center space-x-2 flex-wrap">
                                <span className="font-heading font-bold text-sm text-slate-900 group-hover:text-indigo-600 transition-colors">
                                  {persona.name}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${persona.badgeColor}`}
                                >
                                  {persona.roleBadge}
                                </span>
                              </div>
                              <div className="text-xs text-slate-500 truncate mt-0.5">
                                {persona.dept}
                              </div>
                              <div className="text-[11px] text-slate-400 mt-0.5">
                                {persona.capabilities}
                              </div>
                            </div>
                          </div>

                          {/* Action Icon / Spinner */}
                          <div className="shrink-0 pl-2">
                            {isTarget ? (
                              <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <div className="w-7 h-7 rounded-lg bg-slate-50 group-hover:bg-indigo-50 border border-slate-200 group-hover:border-indigo-200 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all">
                                <ArrowRight className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 text-center text-xs text-slate-400">
                    ข้อมูลจำลองเพื่อการสาธิตในการแข่งขัน KKU AI Hackathon 2026
                  </div>
                </div>
              )}

              {/* Security Footer Note */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
                <div className="flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>เข้ารหัสความปลอดภัยมาตรฐาน OAuth 2.0 / OIDC</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-400">
                  <span>สอดคล้อง พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: System Feature Preview & Workflow Showcase (Reference UI Match) */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* 1. Workflow Pipeline Card (Matching Reference UI Banner) */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-md shadow-indigo-100/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-slate-900">
                      ระบบ AI 6-Step Workflow
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      กระบวนการจัดทำงบประมาณอัจฉริยะ
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  6 สเต็ปครบวงจร
                </span>
              </div>

              {/* 6 Steps List */}
              <div className="space-y-2 text-xs">
                {[
                  {
                    step: "1",
                    title: "AI วิเคราะห์ความต้องการ",
                    desc: "ถอดความต้องการ จำนวน และงบประมาณเบื้องต้น",
                    icon: Cpu,
                    color: "text-blue-600 bg-blue-50 border-blue-100",
                  },
                  {
                    step: "2",
                    title: "ตรวจชื่อและมาตรฐานครุภัณฑ์",
                    desc: "จับคู่เกณฑ์มาตรฐาน สำนักงบฯ 2569 / DE / มข.",
                    icon: ShieldCheck,
                    color: "text-indigo-600 bg-indigo-50 border-indigo-100",
                  },
                  {
                    step: "3",
                    title: "เปรียบเทียบราคากลาง 4 ฐาน",
                    desc: "สำนักงบฯ, DE, ราคาเฉลี่ย มข., ใบเสนอราคาตลาด",
                    icon: Scale,
                    color: "text-purple-600 bg-purple-50 border-purple-100",
                  },
                  {
                    step: "4",
                    title: "ตรวจความสมเหตุสมผลของวงเงิน",
                    desc: "Budget Alert แจ้งเตือนหากเกินเกณฑ์หรือผิดปกติ",
                    icon: Coins,
                    color: "text-amber-600 bg-amber-50 border-amber-100",
                  },
                  {
                    step: "5",
                    title: "ร่างคำของบประมาณ 8 หมวดหมู่",
                    desc: "สร้างเอกสารคำขอตามแบบฟอร์ม มข. ครบถ้วน",
                    icon: FileText,
                    color: "text-rose-600 bg-rose-50 border-rose-100",
                  },
                  {
                    step: "6",
                    title: "ร่าง Specification เป็นกลาง",
                    desc: "ป้องกันการล็อคสเปก 100% พร้อมตรวจ Linter",
                    icon: FileCode,
                    color: "text-emerald-600 bg-emerald-50 border-emerald-100",
                  },
                ].map((item) => {
                  const StepIcon = item.icon;
                  return (
                    <div
                      key={item.step}
                      className="flex items-center space-x-3 p-2 rounded-xl bg-slate-50 border border-slate-100 hover:bg-indigo-50/50 hover:border-indigo-100 transition-colors"
                    >
                      <div
                        className={`w-6 h-6 rounded-lg border ${item.color} flex items-center justify-center shrink-0 font-bold text-[11px]`}
                      >
                        {item.step}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-slate-800 text-xs">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Key Metrics & Impact Card */}
            <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden space-y-4">
              {/* Background ambient glow */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-amber-400">
                    Impact & Performance
                  </span>
                  <h4 className="text-base font-heading font-bold text-white">
                    ประสิทธิภาพที่ได้รับจาก SpecWise AI
                  </h4>
                </div>
                <div className="p-2 rounded-xl bg-white/10 text-amber-300">
                  <Zap className="w-5 h-5" />
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-2 gap-3 pt-1">
                <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3">
                  <div className="text-xl sm:text-2xl font-extrabold text-amber-400 font-heading">
                    85%
                  </div>
                  <div className="text-xs text-slate-200 mt-0.5">ลดเวลาจัดทำเอกสาร</div>
                  <div className="text-[10px] text-slate-400">จาก 3 วันเหลือ 15 นาที</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3">
                  <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-heading">
                    0%
                  </div>
                  <div className="text-xs text-slate-200 mt-0.5">ความเสี่ยงล็อคสเปก</div>
                  <div className="text-[10px] text-slate-400">ตรวจด้วย Anti-Lock AI</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3">
                  <div className="text-xl sm:text-2xl font-extrabold text-blue-400 font-heading">
                    4 ฐาน
                  </div>
                  <div className="text-xs text-slate-200 mt-0.5">เปรียบเทียบราคากลาง</div>
                  <div className="text-[10px] text-slate-400">มีเอกสารอ้างอิงชัดเจน</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-3">
                  <div className="text-xl sm:text-2xl font-extrabold text-purple-400 font-heading">
                    100%
                  </div>
                  <div className="text-xs text-slate-200 mt-0.5">มาตรฐานแบบฟอร์ม มข.</div>
                  <div className="text-[10px] text-slate-400">Export PDF พร้อมยื่นทันที</div>
                </div>
              </div>
            </div>

            {/* 3. System Health Status Card */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 flex items-center justify-between text-xs text-slate-600 shadow-2xs">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-medium text-slate-700">
                  KKU IntelSphere LLM + PgVector RAG Ready
                </span>
              </div>
              <span className="text-[11px] text-slate-400">v2.5.0</span>
            </div>

          </div>

        </div>
      </main>

      {/* 3. Footer */}
      <footer className="relative z-20 border-t border-slate-200/80 bg-white/80 backdrop-blur-md py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-700">SpecWise AI</span>
            <span>•</span>
            <span>ระบบจัดทำคำของบประมาณและสเปกครุภัณฑ์ มหาวิทยาลัยขอนแก่น</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/manual" className="hover:text-indigo-600 transition-colors">
              คู่มือการใช้งาน
            </Link>
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              หน้าแรก
            </Link>
            <span>KKU AI Hackathon 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
