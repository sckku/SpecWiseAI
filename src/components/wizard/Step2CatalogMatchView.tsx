"use client";

import React from "react";
import { Step2StandardNameResult } from "@/types/ai";
import { CheckCircle2, AlertTriangle, BookMarked, FileText } from "lucide-react";

interface Step2CatalogMatchViewProps {
  matchResult: Step2StandardNameResult;
}

export function Step2CatalogMatchView({ matchResult }: Step2CatalogMatchViewProps) {
  const isMatched = matchResult.isMatched && matchResult.matchStatus !== "non_standard";

  return (
    <div className="space-y-4">
      {/* Match Status Banner */}
      <div
        className={`p-4 rounded-xl border flex items-start space-x-3.5 ${
          isMatched
            ? "bg-emerald-50 border-emerald-200 text-emerald-900"
            : "bg-amber-50 border-amber-200 text-amber-900"
        }`}
      >
        {isMatched ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
        )}
        <div>
          <div className="font-heading font-semibold text-sm">
            {isMatched
              ? "พบรายการมาตรฐานในบัญชีราคาอ้างอิงภาครัฐ"
              : "เป็นรายการนอกบัญชีมาตรฐาน (Non-Standard)"}
          </div>
          <p className="text-sm opacity-90 mt-0.5">
            {matchResult.comparisonNotes}
          </p>
        </div>
      </div>

      {/* Recommended Standard Name */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-subtle space-y-4">
        <div>
          <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            ชื่อครุภัณฑ์มาตรฐานที่แนะนำ (Official Standard Name)
          </span>
          <h4 className="text-base font-heading font-bold text-slate-900 mt-1">
            {matchResult.recommendedStandardName || "ไม่พบชื่อในบัญชีมาตรฐาน (ต้องใช้ชื่อตามข้อกำหนดของผู้ขอ)"}
          </h4>
        </div>

        {matchResult.standardUnitPrice && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex justify-between items-center">
            <span className="text-sm text-slate-600 font-medium">ราคามาตรฐานต่อหน่วย:</span>
            <span className="text-base font-bold text-slate-900">
              {matchResult.standardUnitPrice.toLocaleString()} บาท
            </span>
          </div>
        )}

        {/* Evidence Card */}
        {matchResult.evidence && (
          <div className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center space-x-2 text-sm font-bold text-kku-700">
              <BookMarked className="w-4 h-4" />
              <span>หลักฐานอ้างอิงทางการ (Official Citation Evidence)</span>
            </div>
            <div className="text-sm text-slate-700 space-y-1 pl-6">
              <p>
                <strong className="text-slate-900">แหล่งอ้างอิง:</strong> {matchResult.evidence.source}
              </p>
              {matchResult.evidence.page && (
                <p>
                  <strong className="text-slate-900">หน้าเอกสาร:</strong> หน้า {matchResult.evidence.page}
                </p>
              )}
              {matchResult.evidence.itemNo && (
                <p>
                  <strong className="text-slate-900">ลำดับรายการ / รหัส:</strong> {matchResult.evidence.itemNo}
                </p>
              )}
              <p>
                <strong className="text-slate-900">คำอธิบายคุณลักษณะพื้นฐาน:</strong>{" "}
                <span className="text-slate-600">{matchResult.evidence.description}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
