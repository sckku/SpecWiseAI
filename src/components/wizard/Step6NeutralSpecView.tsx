"use client";

import React, { useState } from "react";
import { Step6NeutralSpecResult } from "@/types/ai";
import {
  ShieldAlert,
  ShieldCheck,
  FileCode2,
  Copy,
  Check,
  Sparkles,
  AlertTriangle,
  Plus,
  Trash2,
} from "lucide-react";

interface Step6NeutralSpecViewProps {
  spec: Step6NeutralSpecResult;
  onChange?: (updated: Step6NeutralSpecResult) => void;
}

export function Step6NeutralSpecView({ spec, onChange }: Step6NeutralSpecViewProps) {
  const [copied, setCopied] = useState(false);
  const [currentSpec, setCurrentSpec] = useState<Step6NeutralSpecResult>(spec);

  const hasLinterIssues = currentSpec.brandLinterIssues && currentSpec.brandLinterIssues.length > 0;

  const handleCopyText = () => {
    let fullText = `${currentSpec.specTitle}\n\n${currentSpec.disclaimer}\n\n`;
    currentSpec.categories.forEach((cat) => {
      fullText += `${cat.categoryName}\n`;
      cat.items.forEach((item, idx) => {
        fullText += `  ${idx + 1}. ${item}\n`;
      });
      fullText += "\n";
    });

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleItemChange = (catIdx: number, itemIdx: number, val: string) => {
    const updated = { ...currentSpec };
    updated.categories[catIdx].items[itemIdx] = val;
    setCurrentSpec(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Anti-Brand-Locking Banner */}
      <div
        className={`p-4 rounded-xl border flex items-start justify-between ${
          hasLinterIssues
            ? "bg-amber-50/90 border-amber-200 text-amber-950"
            : "bg-emerald-50/90 border-emerald-200 text-emerald-950"
        }`}
      >
        <div className="flex items-start space-x-3">
          {hasLinterIssues ? (
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          )}
          <div>
            <div className="font-heading font-bold text-sm">
              {hasLinterIssues
                ? `ตรวจพบข้อความเสี่ยงต่อการล็อคสเปก (${currentSpec.brandLinterIssues.length} จุด)`
                : "ผ่านเกณฑ์มาตรฐาน: คุณลักษณะเฉพาะเชิงหน้าที่ ปลอดการล็อคสเปก (Anti-Brand-Locking)"}
            </div>
            <p className="text-xs opacity-80 mt-0.5">
              {hasLinterIssues
                ? "แนะนำให้แก้ไขคำระบุยี่ห้อเฉพาะเจาะจง หรือใส่คำว่า 'หรือเทียบเท่า' กำกับ"
                : "สเปกถูกร่างเป็นสมรรถนะเชิงหน้าที่ (Functional Specs) พร้อมคำว่า 'หรือเทียบเท่า' ตาม พ.ร.บ. จัดซื้อจัดจ้างฯ"}
            </p>
          </div>
        </div>

        <button
          onClick={handleCopyText}
          className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center space-x-1 shadow-sm shrink-0"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? "คัดลอกแล้ว" : "คัดลอกข้อความ"}</span>
        </button>
      </div>

      {/* Linter Alerts if any */}
      {hasLinterIssues && (
        <div className="bg-white border border-amber-200 rounded-xl p-4 space-y-2">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center space-x-1">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>จุดที่ต้องปรับปรุงให้เป็นกลาง:</span>
          </span>
          <div className="space-y-1.5 pl-2 text-xs">
            {currentSpec.brandLinterIssues.map((issue, idx) => (
              <div key={idx} className="p-2 rounded bg-amber-50/60 border border-amber-100">
                <span className="font-semibold text-amber-900">ตรวจพบยี่ห้อ: {issue.detectedBrand}</span>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  <strong>ข้อเสนอแนะ:</strong> เปลี่ยนเป็น &quot;{issue.suggestedReplacement}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Specification Categories & Items */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-subtle space-y-5">
        <div>
          <h4 className="text-base font-heading font-bold text-slate-900">
            {currentSpec.specTitle}
          </h4>
          <p className="text-xs text-slate-400 italic mt-0.5">
            {currentSpec.disclaimer}
          </p>
        </div>

        <div className="space-y-4">
          {currentSpec.categories.map((cat, catIdx) => (
            <div key={catIdx} className="space-y-2">
              <h5 className="text-xs font-heading font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg">
                {cat.categoryName}
              </h5>
              <div className="space-y-2 pl-2">
                {cat.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-start space-x-2">
                    <span className="text-xs text-slate-400 font-bold mt-2">
                      {itemIdx + 1}.
                    </span>
                    <textarea
                      rows={2}
                      value={item}
                      onChange={(e) => handleItemChange(catIdx, itemIdx, e.target.value)}
                      className="w-full text-xs text-slate-800 p-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-kku-700 bg-slate-50/50 hover:bg-white transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
