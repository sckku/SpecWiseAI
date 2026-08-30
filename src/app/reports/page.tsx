"use client";

import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  PieChart,
  Download,
  Calendar,
  Layers,
  FileSpreadsheet,
  FileText,
  Printer,
  Check,
  Sparkles,
  ArrowDownToLine,
} from "lucide-react";

export default function ReportsPage() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);

  const handleExportCSV = () => {
    setIsExporting(true);
    setTimeout(() => {
      const csvData = [
        ["รายงานสรุปภาพรวมคำของบประมาณและดัชนีประสิทธิภาพ SpecWise AI", "ปีงบประมาณ 2570"],
        ["มหาวิทยาลัยขอนแก่น", new Date().toLocaleDateString("th-TH")],
        [],
        ["ตัวชี้วัดหลัก (Key Metrics)", "ค่าที่วัดได้", "เกณฑ์เปรียบเทียบ"],
        ["งบประมาณที่ผ่านการกลั่นกรอง", "42,850,000 บาท", "สอดคล้องตามเกณฑ์ราคากลาง 94%"],
        ["เวลาทำงานที่ประหยัดได้ (NVA Time Reduction)", "428 ชั่วโมง", "ลดลง 72% เทียบกระบวนการเดิม"],
        ["อัตราลดการส่งกลับแก้ไข (Rework Reduction)", "88.5%", "ตรวจพบข้อผิดพลาดก่อนส่งระดับคณะ"],
        ["ความสอดคล้อง Anti-Brand-Locking", "99.2%", "ผ่านเกณฑ์ พ.ร.บ. จัดซื้อจัดจ้างฯ 2560"],
        [],
        ["สัดส่วนงบประมาณตามกลุ่มครุภัณฑ์", "ร้อยละ (%)", "วงเงินรวม (ล้านบาท)"],
        ["ครุภัณฑ์คอมพิวเตอร์และสารสนเทศ", "65%", "27.80"],
        ["ครุภัณฑ์วิทยาศาสตร์และการแพทย์", "25%", "10.70"],
        ["ครุภัณฑ์การศึกษา", "10%", "4.35"],
        [],
        ["การลดเวลา Non-Value Added (NVA)", "เวลาเดิม (ต่อรายการ)", "เวลา AI (ต่อรายการ)", "ประสิทธิภาพที่เพิ่มขึ้น"],
        ["การสืบค้นราคากลาง 4 ฐานข้อมูล", "4 ชั่วโมง", "3 วินาที", "99%"],
        ["การร่างเอกสาร 8 หมวดหมู่ มข.", "6 ชั่วโมง", "5 วินาที", "98%"],
        ["การตรวจสเปกล็อคยี่ห้อ (Brand-Locking Linter)", "2-3 วันทำการ", "แบบ Real-time", "90%"],
      ];

      const csvContent =
        "\uFEFF" + csvData.map((e) => e.map((val) => `"${val}"`).join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `SpecWise_Executive_Report_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsExporting(false);
      setShowExportModal(false);
      setExportSuccess("ดาวน์โหลดรายงาน Excel (CSV) สำเร็จเรียบร้อยแล้ว");
      setTimeout(() => setExportSuccess(null), 4000);
    }, 600);
  };

  const handlePrintPDF = () => {
    setShowExportModal(false);
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
            วิเคราะห์และรายงาน (Executive Analytics)
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            สถิติการจัดสรรงบประมาณ การลดเวลาทำงานที่ไม่สร้างมูลค่า (NVA) และความถูกต้องของสเปก
          </p>
        </div>

        <button
          onClick={() => setShowExportModal(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold flex items-center space-x-2 shadow-sm transition-all hover:scale-105"
        >
          <Download className="w-4 h-4" />
          <span>ส่งออกรายงาน (Excel / PDF)</span>
        </button>
      </div>

      {/* Export Success Toast */}
      {exportSuccess && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold flex items-center space-x-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{exportSuccess}</span>
        </div>
      )}

      {/* 4 Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            งบประมาณที่ผ่านการกลั่นกรอง
          </span>
          <div className="text-2xl font-heading font-bold text-slate-900 mt-1">
            42,850,000 บาท
          </div>
          <p className="text-xs text-emerald-600 mt-1 font-medium">สอดคล้องตามเกณฑ์ราคากลาง 94%</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            เวลาทำงานที่ประหยัดได้ (NVA Reduction)
          </span>
          <div className="text-2xl font-heading font-bold text-indigo-600 mt-1">
            428 ชั่วโมง
          </div>
          <p className="text-xs text-slate-400 mt-1">เทียบกับกระบวนการเดิม (ลดลง 72%)</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            อัตราลดการส่งกลับแก้ไข
          </span>
          <div className="text-2xl font-heading font-bold text-emerald-600 mt-1">
            88.5%
          </div>
          <p className="text-xs text-slate-400 mt-1">ตรวจพบข้อผิดพลาดก่อนส่งระดับคณะ</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            ความสอดคล้อง Anti-Brand-Locking
          </span>
          <div className="text-2xl font-heading font-bold text-purple-600 mt-1">
            99.2%
          </div>
          <p className="text-xs text-slate-400 mt-1">ผ่านเกณฑ์ พ.ร.บ. จัดซื้อจัดจ้างฯ</p>
        </div>
      </div>

      {/* Analytics Chart Breakdown */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-sm text-slate-900">
            สัดส่วนงบประมาณตามกลุ่มครุภัณฑ์ (พ.ศ. 2569 - 2570)
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-700 font-semibold mb-1">
                <span>ครุภัณฑ์คอมพิวเตอร์และสารสนเทศ</span>
                <span>65% (27.8 ล้านบาท)</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full w-[65%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-700 font-semibold mb-1">
                <span>ครุภัณฑ์วิทยาศาสตร์และการแพทย์</span>
                <span>25% (10.7 ล้านบาท)</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[25%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-700 font-semibold mb-1">
                <span>ครุภัณฑ์การศึกษา</span>
                <span>10% (4.3 ล้านบาท)</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full w-[10%]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="font-heading font-bold text-sm text-slate-900">
            การลดเวลา Non-Value Added (NVA Time Reduction)
          </h3>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex justify-between items-center">
              <div>
                <div className="font-semibold text-slate-900">การสืบค้นราคากลาง 4 ฐาน</div>
                <div className="text-xs text-slate-500">เดิมใช้เวลา 4 ชม./รายการ → AI ใช้เวลา 3 วินาที</div>
              </div>
              <span className="text-emerald-700 font-bold">ลดลง 99%</span>
            </div>

            <div className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex justify-between items-center">
              <div>
                <div className="font-semibold text-slate-900">การร่างเอกสาร 8 หมวดหมู่ มข.</div>
                <div className="text-xs text-slate-500">เดิมใช้เวลา 6 ชม./รายการ → AI ใช้เวลา 5 วินาที</div>
              </div>
              <span className="text-emerald-700 font-bold">ลดลง 98%</span>
            </div>

            <div className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex justify-between items-center">
              <div>
                <div className="font-semibold text-slate-900">การตรวจสเปกล็อคยี่ห้อ</div>
                <div className="text-xs text-slate-500">เดิมตรวจซ้ำ 2-3 รอบ → AI ตรวจแบบ Real-time</div>
              </div>
              <span className="text-emerald-700 font-bold">ลดลง 90%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-base text-slate-900 flex items-center space-x-2">
                <Download className="w-5 h-5 text-indigo-600" />
                <span>เลือกรูปแบบการส่งออกรายงาน</span>
              </h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-500">
              ดาวน์โหลดรายงานวิเคราะห์งบประมาณ ดัชนีความถูกต้อง และประสิทธิภาพเชิงปริมาณ (NVA)
            </p>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={handleExportCSV}
                disabled={isExporting}
                className="w-full p-4 rounded-2xl border-2 border-emerald-100 hover:border-emerald-500 bg-emerald-50/40 hover:bg-emerald-50 transition-all text-left flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <FileSpreadsheet className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
                      Excel / CSV Spreadsheet
                    </div>
                    <div className="text-[11px] text-slate-500">
                      รวมชุดข้อมูลตัวเลข สัดส่วนงบ และดัชนี NVA ครบถ้วน
                    </div>
                  </div>
                </div>
                <ArrowDownToLine className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
              </button>

              <button
                onClick={handlePrintPDF}
                className="w-full p-4 rounded-2xl border-2 border-indigo-100 hover:border-indigo-500 bg-indigo-50/40 hover:bg-indigo-50 transition-all text-left flex items-center justify-between group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-700">
                      PDF Executive Summary (Printable)
                    </div>
                    <div className="text-[11px] text-slate-500">
                      รูปแบบรายงานทางการ พร้อมพิมพ์และบันทึกเป็น PDF
                    </div>
                  </div>
                </div>
                <Printer className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
              </button>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
