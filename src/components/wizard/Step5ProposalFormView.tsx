"use client";

import React, { useState } from "react";
import { KKUBudgetForm8Sections } from "@/types/ai";
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Building,
  Target,
  FileSpreadsheet,
  Users,
  CheckCircle,
  Clock,
  Layers,
  FileCheck,
} from "lucide-react";

interface Step5ProposalFormViewProps {
  form: KKUBudgetForm8Sections;
  onChange?: (updated: KKUBudgetForm8Sections) => void;
}

export function Step5ProposalFormView({ form, onChange }: Step5ProposalFormViewProps) {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
    4: true,
    5: false,
    6: false,
    7: true,
    8: false,
  });

  const toggleSection = (sectionNumber: number) => {
    setOpenSections((prev) => ({ ...prev, [sectionNumber]: !prev[sectionNumber] }));
  };

  return (
    <div className="space-y-3">
      <div className="bg-kku-50 border border-kku-200 rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <FileText className="w-5 h-5 text-kku-700" />
          <div>
            <h4 className="font-heading font-bold text-sm text-kku-900">
              แบบร่างคำของบประมาณเงินรายได้ (งบลงทุน/ครุภัณฑ์) 8 หมวดหมู่
            </h4>
            <p className="text-xs text-kku-700">
              ตามแบบฟอร์มมาตรฐานของมหาวิทยาลัยขอนแก่น พร้อมสำหรับการพิมพ์หรือส่งตรวจสอบ
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            const allOpen = Object.values(openSections).every(Boolean);
            setOpenSections({
              1: !allOpen,
              2: !allOpen,
              3: !allOpen,
              4: !allOpen,
              5: !allOpen,
              6: !allOpen,
              7: !allOpen,
              8: !allOpen,
            });
          }}
          className="text-xs font-semibold text-kku-800 hover:text-kku-950 underline shrink-0"
        >
          {Object.values(openSections).every(Boolean) ? "ย่อทั้งหมด" : "ขยายทั้งหมด"}
        </button>
      </div>

      {/* หมวดที่ 1 */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-subtle">
        <button
          onClick={() => toggleSection(1)}
          className="w-full px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-left"
        >
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded bg-kku-700 text-white text-xs font-bold flex items-center justify-center">
              1
            </span>
            <span className="font-heading font-bold text-sm text-slate-800">
              ข้อมูลพื้นฐานโครงการและรายการครุภัณฑ์ (Basic Project Info)
            </span>
          </div>
          {openSections[1] ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>
        {openSections[1] && (
          <div className="p-4 text-xs space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-500 font-medium">หน่วยงาน / ส่วนงาน</label>
                <div className="font-semibold text-slate-900 mt-0.5">{form.section1BasicInfo.agency}</div>
              </div>
              <div>
                <label className="text-slate-500 font-medium">ชื่อรายการครุภัณฑ์</label>
                <div className="font-semibold text-slate-900 mt-0.5">{form.section1BasicInfo.itemName}</div>
              </div>
              <div>
                <label className="text-slate-500 font-medium">จำนวนและวงเงิน</label>
                <div className="font-semibold text-slate-900 mt-0.5">
                  {form.section1BasicInfo.quantity} {form.section1BasicInfo.unit} | วงเงินรวม {form.section1BasicInfo.budgetBaht.toLocaleString()} บาท
                </div>
              </div>
              <div>
                <label className="text-slate-500 font-medium">แผนงาน / โครงการ</label>
                <div className="text-slate-800 mt-0.5">
                  {form.section1BasicInfo.plan} &gt; {form.section1BasicInfo.project}
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-2">
              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]">
                {form.section1BasicInfo.sCurve}
              </span>
              {form.section1BasicInfo.sdgs.map((sdg, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px]">
                  {sdg}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* หมวดที่ 2 */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-subtle">
        <button
          onClick={() => toggleSection(2)}
          className="w-full px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-left"
        >
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded bg-kku-700 text-white text-xs font-bold flex items-center justify-center">
              2
            </span>
            <span className="font-heading font-bold text-sm text-slate-800">
              วัตถุประสงค์และความจำเป็น (Necessity &amp; Impact)
            </span>
          </div>
          {openSections[2] ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>
        {openSections[2] && (
          <div className="p-4 text-xs space-y-2.5">
            <div>
              <span className="font-semibold text-slate-700">เหตุผลความจำเป็น:</span>
              <p className="text-slate-600 mt-0.5 leading-relaxed">{form.section2Necessity.details}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <div>
                <span className="font-semibold text-slate-700">สถานที่ติดตั้ง:</span>{" "}
                <span className="text-slate-600">{form.section2Necessity.installationLocation}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-700">กลุ่มเป้าหมาย/หลักสูตร:</span>{" "}
                <span className="text-slate-600">{form.section2Necessity.targetCurriculum} ({form.section2Necessity.userCount} คน)</span>
              </div>
            </div>
            <div>
              <span className="font-semibold text-slate-700">ผลกระทบหากไม่ได้รับงบประมาณ:</span>
              <p className="text-slate-600 mt-0.5">{form.section2Necessity.impactIfNotFunded}</p>
            </div>
          </div>
        )}
      </div>

      {/* หมวดที่ 4: ใบเสนอราคา 3 เจ้า */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-subtle">
        <button
          onClick={() => toggleSection(4)}
          className="w-full px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-left"
        >
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded bg-kku-700 text-white text-xs font-bold flex items-center justify-center">
              4
            </span>
            <span className="font-heading font-bold text-sm text-slate-800">
              ตารางเปรียบเทียบราคาจากผู้ประกอบการ 3 ราย (3 Vendor Quotations)
            </span>
          </div>
          {openSections[4] ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>
        {openSections[4] && (
          <div className="p-4 text-xs space-y-3">
            <table className="w-full border-collapse border border-slate-200">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="p-2 border border-slate-200 text-center w-12">ลำดับ</th>
                  <th className="p-2 border border-slate-200 text-left">ชื่อบริษัท / ผู้ประกอบการ</th>
                  <th className="p-2 border border-slate-200 text-right">ราคาต่อหน่วย (บาท)</th>
                  <th className="p-2 border border-slate-200 text-center">สถานะ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-slate-200 text-center">1</td>
                  <td className="p-2 border border-slate-200 font-medium">{form.section4QuotationComparison.vendor1.name}</td>
                  <td className="p-2 border border-slate-200 text-right font-semibold text-emerald-700">
                    {form.section4QuotationComparison.vendor1.price.toLocaleString()} ฿
                  </td>
                  <td className="p-2 border border-slate-200 text-center text-[11px] font-bold text-emerald-700">
                    ⭐ ราคาต่ำสุดที่เลือกใช้
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 text-center">2</td>
                  <td className="p-2 border border-slate-200">{form.section4QuotationComparison.vendor2.name}</td>
                  <td className="p-2 border border-slate-200 text-right">
                    {form.section4QuotationComparison.vendor2.price.toLocaleString()} ฿
                  </td>
                  <td className="p-2 border border-slate-200 text-center text-slate-400">-</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 text-center">3</td>
                  <td className="p-2 border border-slate-200">{form.section4QuotationComparison.vendor3.name}</td>
                  <td className="p-2 border border-slate-200 text-right">
                    {form.section4QuotationComparison.vendor3.price.toLocaleString()} ฿
                  </td>
                  <td className="p-2 border border-slate-200 text-center text-slate-400">-</td>
                </tr>
              </tbody>
            </table>
            <p className="text-slate-500 italic">{form.section4QuotationComparison.notes}</p>
          </div>
        )}
      </div>

      {/* หมวดที่ 7: สรุปสเปก */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-subtle">
        <button
          onClick={() => toggleSection(7)}
          className="w-full px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-left"
        >
          <div className="flex items-center space-x-2">
            <span className="w-5 h-5 rounded bg-kku-700 text-white text-xs font-bold flex items-center justify-center">
              7
            </span>
            <span className="font-heading font-bold text-sm text-slate-800">
              สรุปรายละเอียดคุณลักษณะเฉพาะ (Specification Summary)
            </span>
          </div>
          {openSections[7] ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
        </button>
        {openSections[7] && (
          <div className="p-4 text-xs space-y-2">
            <div>
              <span className="font-semibold text-slate-700">คุณลักษณะทางเทคนิค:</span>
              <p className="text-slate-800 mt-0.5">{form.section7SpecSummary.technicalSpec}</p>
            </div>
            <div>
              <span className="font-semibold text-slate-700">อุปกรณ์ต่อพ่วงและการรับประกัน:</span>
              <p className="text-slate-600 mt-0.5">{form.section7SpecSummary.accessories}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
