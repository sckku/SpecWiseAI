"use client";

import React from "react";
import { Step3PriceCrossCheckResult } from "@/types/ai";
import { Check, X, ArrowUpRight, Scale, Info } from "lucide-react";

interface Step3PriceCrossCheckViewProps {
  priceCrossCheck: Step3PriceCrossCheckResult;
}

export function Step3PriceCrossCheckView({ priceCrossCheck }: Step3PriceCrossCheckViewProps) {
  const isHigher = priceCrossCheck.benchmarkVarianceBaht > 0;

  return (
    <div className="space-y-4">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-subtle">
          <span className="text-sm font-semibold text-slate-400 uppercase">
            ราคามาตรฐานต่ำสุด
          </span>
          <div className="text-xl font-heading font-bold text-slate-800 mt-0.5">
            {priceCrossCheck.minStandardPrice.toLocaleString()} บาท
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-subtle">
          <span className="text-sm font-semibold text-slate-400 uppercase">
            ส่วนต่างจากราคามาตรฐาน
          </span>
          <div
            className={`text-xl font-heading font-bold mt-0.5 flex items-center space-x-1 ${
              isHigher ? "text-amber-600" : "text-emerald-600"
            }`}
          >
            <span>
              {isHigher ? "+" : ""}
              {priceCrossCheck.benchmarkVarianceBaht.toLocaleString()} บาท
            </span>
            {isHigher && <ArrowUpRight className="w-4 h-4" />}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-subtle">
          <span className="text-sm font-semibold text-slate-400 uppercase">
            อัตราความแปรปรวน (Variance)
          </span>
          <div
            className={`text-xl font-heading font-bold mt-0.5 ${
              isHigher ? "text-amber-600" : "text-emerald-600"
            }`}
          >
            {isHigher ? "+" : ""}
            {priceCrossCheck.benchmarkVariancePercent}%
          </div>
        </div>
      </div>

      {/* 4-Source Cross-Check Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-subtle">
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Scale className="w-4 h-4 text-kku-700" />
            <h4 className="font-heading font-bold text-sm text-slate-900">
              ตารางตรวจสอบราคา 4 แหล่งข้อมูลทางการ (Multi-Source Price Matrix)
            </h4>
          </div>
          <span className="text-sm px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
            4 ฐานข้อมูล
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-2.5 px-4">แหล่งข้อมูลอ้างอิง</th>
                <th className="py-2.5 px-4 text-center">สถานะ</th>
                <th className="py-2.5 px-4 text-right">ราคาต่อหน่วย (บาท)</th>
                <th className="py-2.5 px-4">เอกสารอ้างอิง / หมายเหตุ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {priceCrossCheck.sources.map((src) => (
                <tr key={src.sourceId} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-900">
                    {src.sourceName}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {src.found ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800">
                        <Check className="w-3 h-3 mr-1" /> พบข้อมูล
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-sm font-semibold bg-slate-100 text-slate-500">
                        <X className="w-3 h-3 mr-1" /> ไม่มีในเกณฑ์
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-slate-900">
                    {src.unitPrice !== undefined
                      ? `${src.unitPrice.toLocaleString()} ฿`
                      : "-"}
                  </td>
                  <td className="py-3 px-4 text-slate-500">
                    {src.docRef || src.notes || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
