"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ServerCrash,
  FileQuestion,
  ShieldAlert,
  Sparkles,
  LifeBuoy,
  RotateCcw,
  Layers,
  ArrowRight,
  CheckCircle2,
  Bug,
} from "lucide-react";
import { ErrorState, ErrorType } from "@/components/common/ErrorState";

export default function ErrorsShowcasePage() {
  const [selectedType, setSelectedType] = useState<ErrorType>("404");
  const [triggerRuntimeError, setTriggerRuntimeError] = useState(false);

  if (triggerRuntimeError) {
    throw new Error("Simulated Next.js 15 Runtime Rendering Exception for SpecWise AI Testing");
  }

  const errorTypes: {
    type: ErrorType;
    label: string;
    code: string;
    description: string;
    color: string;
  }[] = [
    {
      type: "404",
      label: "404 Not Found",
      code: "404",
      description: "เมื่อไม่พบหน้าระบบ หรือเอกสารคำของบประมาณถูกลบ/ย้าย",
      color: "bg-amber-50 text-amber-800 border-amber-200",
    },
    {
      type: "500",
      label: "500 Server Error",
      code: "500",
      description: "ข้อผิดพลาดฝั่งเซิร์ฟเวอร์หรือการประมวลผลคำนวณ",
      color: "bg-rose-50 text-rose-800 border-rose-200",
    },
    {
      type: "403",
      label: "403 Forbidden",
      code: "403",
      description: "ไม่มีสิทธิ์เข้าถึงส่วนงาน เช่น Requester พยายามเข้าหน้า Admin",
      color: "bg-purple-50 text-purple-800 border-purple-200",
    },
    {
      type: "503",
      label: "503 Maintenance",
      code: "503",
      description: "ระบบปิดปรับปรุงชั่วคราวหรือรอซิงค์ฐานข้อมูล",
      color: "bg-blue-50 text-blue-800 border-blue-200",
    },
    {
      type: "ai_error",
      label: "AI Service Timeout",
      code: "AI-ERR",
      description: "การเชื่อมต่อ KKU IntelSphere ขัดข้องหรือเกิด Timeout",
      color: "bg-kku-50 text-kku-800 border-kku-200",
    },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-kku-200 bg-kku-50 px-3.5 py-1 text-xs font-bold text-kku-800 mb-2">
              <Bug className="h-3.5 w-3.5" />
              <span>ศูนย์ทดสอบและจำลองหน้าข้อผิดพลาด (Error States & UX Testing)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900">
              ระบบหน้าข้อผิดพลาดมาตรฐาน (Error Experience Hub)
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              ออกแบบขึ้นเพื่อมอบประสบการณ์การใช้งานที่ดีเยี่ยม ชัดเจน และมีทางเลือกในการแก้ไขปัญหาแก่บุคลากร มหาวิทยาลัยขอนแก่น
            </p>
          </div>

          {/* Trigger Real Error Button */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTriggerRuntimeError(true)}
              className="inline-flex items-center space-x-1.5 rounded-xl border border-rose-300 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-800 shadow-sm hover:bg-rose-100 transition-all hover:scale-102"
              title="ทดสอบยิงข้อผิดพลาดจริงเพื่อทดสอบ error.tsx boundary"
            >
              <ServerCrash className="h-4 w-4 text-rose-600" />
              <span>ทดสอบโยน Runtime Error (500 Boundary)</span>
            </button>
            <Link
              href="/non-existent-page-demo-404"
              className="inline-flex items-center space-x-1.5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-2.5 text-xs font-bold text-amber-800 shadow-sm hover:bg-amber-100 transition-all hover:scale-102"
            >
              <FileQuestion className="h-4 w-4 text-amber-600" />
              <span>ทดสอบเปิด URL 404 จริง</span>
            </Link>
            <Link
              href="/403"
              className="inline-flex items-center space-x-1.5 rounded-xl border border-purple-300 bg-purple-50 px-4 py-2.5 text-xs font-bold text-purple-800 shadow-sm hover:bg-purple-100 transition-all hover:scale-102"
            >
              <ShieldAlert className="h-4 w-4 text-purple-600" />
              <span>ทดสอบหน้า 403 จริง</span>
            </Link>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
            เลือกรูปแบบข้อผิดพลาดเพื่อดูพรีวิว (Select Error Preview):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {errorTypes.map((item) => (
              <button
                key={item.type}
                onClick={() => setSelectedType(item.type)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  selectedType === item.type
                    ? "border-kku-600 bg-white shadow-md ring-2 ring-kku-500/20"
                    : "border-slate-200 bg-slate-50/70 hover:bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-slate-900">{item.label}</span>
                  <span
                    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${item.color}`}
                  >
                    {item.code}
                  </span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Preview Display */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center space-x-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              หน้าต่างแสดงผลตัวอย่าง (Live Component Preview):
            </span>
          </div>
          <span className="text-xs text-slate-400">
            แสดงผลคอมโพเนนต์ <code className="font-mono text-kku-700">&lt;ErrorState type=&quot;{selectedType}&quot; /&gt;</code>
          </span>
        </div>

        <div className="rounded-3xl border border-slate-200/90 bg-slate-100/50 p-4 sm:p-6">
          <ErrorState
            type={selectedType}
            showSearch={selectedType === "404"}
            onRetry={() => {
              alert("จำลองการกดลองใหม่อีกครั้ง (Retry Action Triggered)");
            }}
            error={
              selectedType === "500"
                ? new Error(
                    "DatabaseConnectionTimeoutException: Failed to acquire connection from pool at pgvector://localhost:5432"
                  )
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
