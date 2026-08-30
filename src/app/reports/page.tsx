"use client";

import React from "react";
import {
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle2,
  PieChart,
  Download,
  Calendar,
  Layers,
} from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
            วิเคราะห์และรายงาน (Executive Analytics)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            สถิติการจัดสรรงบประมาณ การลดเวลาทำงานที่ไม่สร้างมูลค่า (NVA) และความถูกต้องของสเปก
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center space-x-1.5 shadow-xs">
          <Download className="w-3.5 h-3.5" />
          <span>ส่งออกรายงาน (Excel / PDF)</span>
        </button>
      </div>

      {/* 4 Summary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            งบประมาณที่ผ่านการกลั่นกรอง
          </span>
          <div className="text-2xl font-heading font-bold text-slate-900 mt-1">
            42,850,000 บาท
          </div>
          <p className="text-[10px] text-emerald-600 mt-1">สอดคล้องตามเกณฑ์ราคากลาง 94%</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            เวลาทำงานที่ประหยัดได้ (NVA Reduction)
          </span>
          <div className="text-2xl font-heading font-bold text-indigo-600 mt-1">
            428 ชั่วโมง
          </div>
          <p className="text-[10px] text-slate-400 mt-1">เทียบกับกระบวนการเดิม (ลดลง 72%)</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            อัตราลดการส่งกลับแก้ไข
          </span>
          <div className="text-2xl font-heading font-bold text-emerald-600 mt-1">
            88.5%
          </div>
          <p className="text-[10px] text-slate-400 mt-1">ตรวจพบข้อผิดพลาดก่อนส่งระดับคณะ</p>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            ความสอดคล้อง Anti-Brand-Locking
          </span>
          <div className="text-2xl font-heading font-bold text-purple-600 mt-1">
            99.2%
          </div>
          <p className="text-[10px] text-slate-400 mt-1">ผ่านเกณฑ์ พ.ร.บ. จัดซื้อจัดจ้างฯ</p>
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
                <span>ครุภัณฑ์การศึกษาและโสตทัศนูปกรณ์</span>
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
                <div className="text-[10px] text-slate-500">เดิมใช้เวลา 4 ชม./รายการ → AI ใช้เวลา 3 วินาที</div>
              </div>
              <span className="text-emerald-700 font-bold">ลดลง 99%</span>
            </div>

            <div className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex justify-between items-center">
              <div>
                <div className="font-semibold text-slate-900">การร่างเอกสาร 8 หมวดหมู่ มข.</div>
                <div className="text-[10px] text-slate-500">เดิมใช้เวลา 6 ชม./รายการ → AI ใช้เวลา 5 วินาที</div>
              </div>
              <span className="text-emerald-700 font-bold">ลดลง 98%</span>
            </div>

            <div className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex justify-between items-center">
              <div>
                <div className="font-semibold text-slate-900">การตรวจสเปกล็อคยี่ห้อ</div>
                <div className="text-[10px] text-slate-500">เดิมตรวจซ้ำ 2-3 รอบ → AI ตรวจแบบ Real-time</div>
              </div>
              <span className="text-emerald-700 font-bold">ลดลง 90%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
