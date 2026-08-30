"use client";

import React from "react";
import { Step1IntentResult } from "@/types/ai";
import { Layers, Tag, Target, DollarSign, Calendar } from "lucide-react";

interface Step1IntentViewProps {
  intent: Step1IntentResult;
  onChange?: (updated: Step1IntentResult) => void;
}

export function Step1IntentView({ intent, onChange }: Step1IntentViewProps) {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl p-5 shadow-sm">
        <div className="flex items-center space-x-2 text-sm font-bold text-kku-300 uppercase tracking-wider mb-2">
          <Layers className="w-4 h-4" />
          <span>ผลการสกัดความต้องการ (Step 1: NLP Intent Extraction)</span>
        </div>
        <h3 className="text-lg font-heading font-semibold text-white">
          {intent.rawItemName}
        </h3>
        <p className="text-sm text-slate-300 mt-1">
          {intent.objective}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Quantity & Unit */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-subtle">
          <div className="flex items-center space-x-2 text-slate-500 text-sm font-semibold uppercase mb-1">
            <Tag className="w-4 h-4 text-blue-600" />
            <span>จำนวนที่ขอจัดซื้อ</span>
          </div>
          <div className="text-2xl font-heading font-bold text-slate-900">
            {intent.quantity.toLocaleString()} <span className="text-sm font-normal text-slate-500">{intent.unit}</span>
          </div>
        </div>

        {/* Unit Price */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-subtle">
          <div className="flex items-center space-x-2 text-slate-500 text-sm font-semibold uppercase mb-1">
            <DollarSign className="w-4 h-4 text-amber-600" />
            <span>ราคาต่อหน่วยที่เสนอ</span>
          </div>
          <div className="text-2xl font-heading font-bold text-slate-900">
            {intent.unitProposedPrice.toLocaleString()}{" "}
            <span className="text-sm font-normal text-slate-500">บาท / {intent.unit}</span>
          </div>
        </div>

        {/* Total Budget */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-subtle">
          <div className="flex items-center space-x-2 text-slate-500 text-sm font-semibold uppercase mb-1">
            <Target className="w-4 h-4 text-emerald-600" />
            <span>วงเงินงบประมาณรวม</span>
          </div>
          <div className="text-2xl font-heading font-bold text-kku-700">
            {intent.totalProposedBudget.toLocaleString()}{" "}
            <span className="text-sm font-normal text-slate-500">บาท</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-slate-500 font-medium">หมวดหมู่ครุภัณฑ์:</span>
          <span className="font-semibold text-slate-800 bg-white px-2.5 py-1 rounded border border-slate-200">
            {intent.itemCategory}
          </span>
        </div>
        {intent.urgencyReason && (
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">ความจำเป็นเร่งด่วน:</span>
            <span className="text-slate-700">{intent.urgencyReason}</span>
          </div>
        )}
      </div>
    </div>
  );
}
