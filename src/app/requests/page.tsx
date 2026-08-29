"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  ArrowRight,
  Filter,
  Monitor,
  Microscope,
  Cpu,
  Layers,
  FileSpreadsheet,
} from "lucide-react";
import { BudgetProposal, RequestStatus } from "@/types/budget";

export default function RequestsPage() {
  const [proposals, setProposals] = useState<BudgetProposal[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/requests?status=${statusFilter}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.proposals) setProposals(data.proposals);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [statusFilter]);

  const statusBadge = (status: RequestStatus) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "SUBMITTED":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "DEPT_REVIEW":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "AI_ANALYZED":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "REVISED":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const statusLabelTh = (status: RequestStatus) => {
    switch (status) {
      case "APPROVED":
        return "อนุมัติบรรจุแผน";
      case "SUBMITTED":
        return "ส่งระดับคณะแล้ว";
      case "DEPT_REVIEW":
        return "รอตรวจระดับภาควิชา";
      case "AI_ANALYZED":
        return "AI วิเคราะห์แล้ว";
      case "REVISED":
        return "ส่งกลับแก้ไข";
      default:
        return "แบบร่าง (Draft)";
    }
  };

  const filteredProposals = proposals.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.code.toLowerCase().includes(q) ||
      p.department.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
            คำของบประมาณครุภัณฑ์
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            จัดการ ติดตามสถานะ และตรวจสอบคำของบประมาณครุภัณฑ์ทั้งหมด
          </p>
        </div>

        <Link
          href="/requests/new"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-heading font-bold text-xs shadow-md shadow-indigo-500/25 flex items-center space-x-2 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>สร้างคำขอใหม่ด้วย AI</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ค้นหาชื่อคำขอ, รหัส, หน่วยงาน..."
            className="w-full text-xs pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs py-2.5 px-3 border border-slate-200 rounded-xl bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
        >
          <option value="ALL">สถานะทั้งหมด</option>
          <option value="AI_ANALYZED">AI วิเคราะห์แล้ว</option>
          <option value="DEPT_REVIEW">รอตรวจระดับภาควิชา</option>
          <option value="SUBMITTED">ส่งระดับคณะแล้ว</option>
          <option value="APPROVED">อนุมัติบรรจุแผน</option>
        </select>
      </div>

      {/* Proposals List Table */}
      <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 font-semibold uppercase text-[10px]">
              <tr>
                <th className="py-3.5 px-5">รหัสคำขอ</th>
                <th className="py-3.5 px-5">ชื่อรายการครุภัณฑ์</th>
                <th className="py-3.5 px-5">หน่วยงาน / ส่วนงาน</th>
                <th className="py-3.5 px-5 text-right">วงเงินรวม</th>
                <th className="py-3.5 px-5 text-center">สถานะ</th>
                <th className="py-3.5 px-5 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProposals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    ไม่พบรายการคำของบประมาณ
                  </td>
                </tr>
              ) : (
                filteredProposals.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-4 px-5 font-mono font-bold text-indigo-700">
                      {prop.code}
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-semibold text-slate-900">{prop.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {prop.quantity} {prop.unit} ({Number(prop.unitPriceBaht).toLocaleString()} ฿/{prop.unit})
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <div className="text-slate-800 font-medium">{prop.department}</div>
                      <div className="text-[11px] text-slate-400">{prop.faculty}</div>
                    </td>
                    <td className="py-4 px-5 text-right font-heading font-bold text-slate-900">
                      {Number(prop.totalBudgetBaht).toLocaleString()} ฿
                    </td>
                    <td className="py-4 px-5 text-center">
                      <span
                        className={`inline-block text-[10px] px-2.5 py-1 rounded-full border font-semibold ${statusBadge(
                          prop.status
                        )}`}
                      >
                        {statusLabelTh(prop.status)}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="inline-flex items-center space-x-1.5">
                        <a
                          href={`/api/requests/${prop.id}/export-excel`}
                          download={`KKU_RequestForm_${prop.code}.xlsx`}
                          title="ดาวน์โหลด Excel (ฟอร์ม มข.)"
                          className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold text-xs transition-colors"
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="hidden md:inline">Excel</span>
                        </a>
                        <Link
                          href={`/requests/${prop.id}`}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs transition-colors"
                        >
                          <span>เปิดดู</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
