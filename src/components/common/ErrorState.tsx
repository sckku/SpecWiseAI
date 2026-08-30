"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  RotateCcw,
  Home,
  FileQuestion,
  ShieldAlert,
  ServerCrash,
  Sparkles,
  LifeBuoy,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Search,
} from "lucide-react";

export type ErrorType = "404" | "500" | "403" | "503" | "ai_error" | "generic";

export interface ErrorStateProps {
  type?: ErrorType;
  title?: string;
  description?: string;
  incidentId?: string;
  error?: Error & { digest?: string };
  onRetry?: () => void;
  showHomeButton?: boolean;
  showSearch?: boolean;
  showHelpdesk?: boolean;
  className?: string;
}

export function ErrorState({
  type = "generic",
  title,
  description,
  incidentId,
  error,
  onRetry,
  showHomeButton = true,
  showSearch = false,
  showHelpdesk = true,
  className = "",
}: ErrorStateProps) {
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const referenceId =
    incidentId ||
    error?.digest ||
    `ERR-KKU-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  const copyIncidentId = () => {
    navigator.clipboard.writeText(referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Config mapping based on error type
  const config = {
    "404": {
      code: "404",
      badgeText: "ไม่พบหน้าที่ต้องการ (Page Not Found)",
      defaultTitle: "ขออภัย ไม่พบหน้าที่คุณกำลังค้นหา",
      defaultDesc:
        "หน้าที่คุณพยายามเข้าถึงอาจถูกย้าย เปลี่ยนชื่อ ลบไปแล้ว หรือคุณอาจพิมพ์ URL ไม่ถูกต้อง ตรวจสอบความถูกต้องหรือเลือกเมนูด้านล่าง",
      icon: FileQuestion,
      iconColor: "text-amber-600 bg-amber-50 border-amber-200",
      accentBorder: "border-amber-200",
    },
    "500": {
      code: "500",
      badgeText: "ข้อผิดพลาดระบบ (Internal Server Error)",
      defaultTitle: "เกิดข้อผิดพลาดในการประมวลผลของระบบ",
      defaultDesc:
        "ระบบพบข้อผิดพลาดที่ไม่คาดคิดในการประมวลผลคำขอของคุณ กรุณาลองใหม่อีกครั้ง หรือบันทึกรหัสอ้างอิงเพื่อแจ้งผู้ดูแลระบบ",
      icon: ServerCrash,
      iconColor: "text-rose-600 bg-rose-50 border-rose-200",
      accentBorder: "border-rose-200",
    },
    "403": {
      code: "403",
      badgeText: "การเข้าถึงถูกจำกัด (Access Restricted)",
      defaultTitle: "คุณไม่มีสิทธิ์เข้าถึงส่วนงานนี้",
      defaultDesc:
        "หน้านี้ต้องใช้ระดับสิทธิ์ผู้ใช้งานเฉพาะ (เช่น ผู้ดูแลระบบ Admin หรือ ผู้อนุมัติ Approver) กรุณาตรวจสอบสิทธิ์การใช้งานของท่านหรือสลับบทบาท",
      icon: ShieldAlert,
      iconColor: "text-purple-600 bg-purple-50 border-purple-200",
      accentBorder: "border-purple-200",
    },
    "503": {
      code: "503",
      badgeText: "ระบบปิดปรับปรุงชั่วคราว (Service Unavailable)",
      defaultTitle: "ระบบอยู่ระหว่างการปรับปรุงประสิทธิภาพ",
      defaultDesc:
        "ระบบฐานข้อมูลหรือเซิร์ฟเวอร์ SpecWise AI กำลังได้รับการอัปเดตและปรับปรุงตามรอบบำรุงรักษา กรุณากลับมาใหม่อีกครั้งในอีกสักครู่",
      icon: AlertTriangle,
      iconColor: "text-blue-600 bg-blue-50 border-blue-200",
      accentBorder: "border-blue-200",
    },
    ai_error: {
      code: "AI-TIMEOUT",
      badgeText: "AI Engine Processing Error",
      defaultTitle: "ไม่สามารถเชื่อมต่อ KKU IntelSphere AI ได้ในขณะนี้",
      defaultDesc:
        "บริการวิเคราะห์ AI ประสบปัญหาการเชื่อมต่อเครือข่ายหรือโควตาชั่วคราว ข้อมูลคำขอของคุณยังปลอดภัย สามารถกดปุ่มลองใหม่อีกครั้งเพื่อส่งวิเคราะห์ซ้ำ",
      icon: Sparkles,
      iconColor: "text-kku-700 bg-kku-50 border-kku-200",
      accentBorder: "border-kku-200",
    },
    generic: {
      code: "ERROR",
      badgeText: "แจ้งเตือนข้อผิดพลาด (System Notice)",
      defaultTitle: "เกิดข้อผิดพลาดในการดำเนินการ",
      defaultDesc: "ระบบไม่สามารถดำเนินการตามคำขอได้สมบูรณ์ กรุณาลองใหม่อีกครั้ง",
      icon: AlertTriangle,
      iconColor: "text-slate-600 bg-slate-100 border-slate-200",
      accentBorder: "border-slate-200",
    },
  }[type];

  const IconComponent = config.icon;
  const headingText = title || config.defaultTitle;
  const descriptionText = description || config.defaultDesc;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-6 sm:p-10 shadow-xl backdrop-blur-md transition-all ${className}`}
    >
      {/* Background Decorative Glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-kku-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Error Code & Icon */}
        <div className="mb-6 flex flex-col items-center">
          <div
            className={`mb-4 flex h-20 w-20 items-center justify-center rounded-2xl border-2 shadow-inner transition-transform hover:scale-105 ${config.iconColor}`}
          >
            <IconComponent className="h-10 w-10" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-kku-600 animate-pulse" />
            <span className="font-mono">{config.code}</span>
            <span className="text-slate-400">•</span>
            <span>{config.badgeText}</span>
          </div>
        </div>

        {/* Title & Description */}
        <h1 className="mb-3 font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          {headingText}
        </h1>
        <p className="mb-8 text-sm sm:text-base leading-relaxed text-slate-600">
          {descriptionText}
        </p>

        {/* Optional Search Bar (Helpful for 404) */}
        {showSearch && (
          <div className="mb-8 mx-auto max-w-md">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/catalogs?q=${encodeURIComponent(searchQuery.trim())}`;
                }
              }}
              className="relative flex items-center"
            >
              <input
                type="text"
                placeholder="ค้นหาชื่อครุภัณฑ์, รายการคำขอ หรือคู่มือ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3 pl-11 pr-24 text-sm text-slate-900 placeholder:text-slate-400 focus:border-kku-600 focus:bg-white focus:outline-none focus:ring-4 focus:ring-kku-500/10 transition-all shadow-inner"
              />
              <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400" />
              <button
                type="submit"
                className="absolute right-1.5 rounded-xl bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white shadow hover:bg-slate-800 transition-colors"
              >
                ค้นหา
              </button>
            </form>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center space-x-2 rounded-xl bg-gradient-to-r from-kku-700 to-kku-800 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:from-kku-800 hover:to-kku-900 hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <RotateCcw className="h-4 w-4" />
              <span>ลองใหม่อีกครั้ง (Retry)</span>
            </button>
          )}

          {showHomeButton && (
            <Link
              href="/"
              className="inline-flex items-center space-x-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Home className="h-4 w-4 text-slate-500" />
              <span>กลับสู่หน้าหลัก (Dashboard)</span>
            </Link>
          )}

          <Link
            href="/requests"
            className="inline-flex items-center space-x-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <span>ดูรายการคำขอทั้งหมด</span>
          </Link>

          <Link
            href="/manual"
            className="inline-flex items-center space-x-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <LifeBuoy className="h-4 w-4 text-kku-600" />
            <span>คู่มือการใช้งาน</span>
          </Link>
        </div>

        {/* Technical Error & Incident Reference */}
        <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 text-left transition-all">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-500">
                รหัสอ้างอิงปัญหา (Incident ID):
              </span>
              <code className="rounded bg-white px-2 py-0.5 font-mono text-xs font-bold text-kku-800 border border-slate-200 shadow-2xs">
                {referenceId}
              </code>
            </div>
            <button
              onClick={copyIncidentId}
              className="inline-flex items-center space-x-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              title="คัดลอกรหัสอ้างอิงเพื่อส่งแจ้งปัญหา"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">คัดลอกแล้ว</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>คัดลอกรหัส</span>
                </>
              )}
            </button>
          </div>

          {/* Collapsible Error Trace Details */}
          {error && (
            <div className="mt-3 border-t border-slate-200/70 pt-2.5">
              <button
                type="button"
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center justify-between w-full text-xs font-medium text-slate-500 hover:text-slate-800"
              >
                <span>รายละเอียดทางเทคนิค (Technical Details)</span>
                {showDetails ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>

              {showDetails && (
                <div className="mt-2 space-y-1.5">
                  <div className="p-2.5 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto max-h-48 whitespace-pre-wrap">
                    <p className="text-rose-400 font-bold mb-1">
                      {error.name}: {error.message}
                    </p>
                    {error.stack && (
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        {error.stack}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Support & Contact Footer */}
        {showHelpdesk && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <span>
              หน่วยงาน: <strong>กองบริหารงานงบประมาณและพัสดุ มข.</strong>
            </span>
            <span>•</span>
            <span>
              อีเมลสนับสนุน:{" "}
              <a
                href="mailto:specwise-support@kku.ac.th"
                className="font-semibold text-kku-700 hover:underline"
              >
                specwise-support@kku.ac.th
              </a>
            </span>
            <span>•</span>
            <span>
              โทรศัพท์ภายใน: <strong>42890-92</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
