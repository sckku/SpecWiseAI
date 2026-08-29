"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  Filter,
  Search,
  Sparkles,
  ShieldAlert,
  Building,
  PlusCircle,
} from "lucide-react";
import { BudgetProposal, DashboardMetrics, RequestStatus } from "@/types/budget";

export function ExecutiveDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [proposals, setProposals] = useState<BudgetProposal[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [statusFilter]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      const [metricsRes, proposalsRes] = await Promise.all([
        fetch("/api/dashboard/metrics"),
        fetch(`/api/requests?status=${statusFilter}`),
      ]);

      const metricsData = await metricsRes.json();
      const proposalsData = await proposalsRes.json();

      if (metricsData.metrics) setMetrics(metricsData.metrics);
      if (proposalsData.proposals) setProposals(proposalsData.proposals);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const statusBadge = (status: RequestStatus) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "SUBMITTED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "DEPT_REVIEW":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "AI_ANALYZED":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "REVISED":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
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
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-kku-950 text-white rounded-2xl p-6 sm:p-8 shadow-card flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-kku-300 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>KKU Executive Budget Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
            ภาพรวมคำของบประมาณครุภัณฑ์ มหาวิทยาลัยขอนแก่น
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            ระบบติดตามการจัดสรรงบลงทุน ตรวจสอบราคากลาง 4 ฐาน ป้องกันการล็อคสเปก และลดเวลาทำงานที่ไม่สร้างมูลค่า (NVA Reduction)
          </p>
        </div>

        <Link
          href="/requests/new"
          className="px-5 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-heading font-bold text-xs shadow-lg flex items-center space-x-2 transition-all hover:scale-105 shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-kku-700" />
          <span>สร้างคำขอใหม่ด้วย AI</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Budget */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              วงเงินงบประมาณที่ขอรวม
            </span>
            <div className="w-8 h-8 rounded-lg bg-kku-50 text-kku-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-heading font-bold text-slate-900 mt-2">
            {metrics?.totalBudgetRequestedBaht.toLocaleString() || 0}{" "}
            <span className="text-sm font-normal text-slate-500">บาท</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">ปีงบประมาณ พ.ศ. 2569</p>
        </div>

        {/* Proposals Count */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              คำขอทั้งหมดในระบบ
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-heading font-bold text-slate-900 mt-2">
            {metrics?.totalProposals || 0}{" "}
            <span className="text-sm font-normal text-slate-500">รายการ</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">
            อนุมัติแล้ว {metrics?.approvedCount || 0} รายการ
          </div>
        </div>

        {/* Standard Match Rate */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              อัตราตรงเกณฑ์ราคากลาง
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-heading font-bold text-emerald-600 mt-2">
            {metrics?.standardMatchRate || 0}%
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            อิงสำนักงบฯ &amp; กระทรวง DE 2569
          </p>
        </div>

        {/* NVA Time Reduction */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              เวลาทำงานที่ประหยัดได้ (NVA)
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-heading font-bold text-purple-700 mt-2">
            ~{metrics?.nvaTimeSavedHours || 0}{" "}
            <span className="text-sm font-normal text-slate-500">ชม.</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            ลดขั้นตอนตรวจซ้ำและการร่างเอกสาร 70%+
          </p>
        </div>
      </div>

      {/* Proposals List Section */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-card">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="font-heading font-bold text-base text-slate-900">
              รายการคำของบประมาณครุภัณฑ์ล่าสุด
            </h3>
            <p className="text-xs text-slate-500">
              ติดตามสถานะและตรวจสอบข้อมูลรายละเอียดตามบทบาทสิทธิ์
            </p>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="ค้นหาชื่อรายการ, รหัส..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-kku-700"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-kku-700"
            >
              <option value="ALL">สถานะทั้งหมด</option>
              <option value="AI_ANALYZED">AI วิเคราะห์แล้ว</option>
              <option value="DEPT_REVIEW">รอตรวจระดับภาควิชา</option>
              <option value="SUBMITTED">ส่งระดับคณะแล้ว</option>
              <option value="APPROVED">อนุมัติบรรจุแผน</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="py-3 px-4">รหัสคำขอ</th>
                <th className="py-3 px-4">ชื่อรายการครุภัณฑ์</th>
                <th className="py-3 px-4">หน่วยงาน / ภาควิชา</th>
                <th className="py-3 px-4 text-right">วงเงินรวม (บาท)</th>
                <th className="py-3 px-4 text-center">สถานะ</th>
                <th className="py-3 px-4 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProposals.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    ไม่พบรายการคำของบประมาณตามเงื่อนไขที่เลือก
                  </td>
                </tr>
              ) : (
                filteredProposals.map((prop) => (
                  <tr key={prop.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-kku-700">
                      {prop.code}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 line-clamp-1">
                        {prop.title}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {prop.quantity} {prop.unit} ({Number(prop.unitPriceBaht).toLocaleString()} ฿/{prop.unit})
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div>{prop.department}</div>
                      <div className="text-[11px] text-slate-400">{prop.faculty}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                      {Number(prop.totalBudgetBaht).toLocaleString()} ฿
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block text-[10px] px-2.5 py-0.5 rounded-full border font-semibold ${statusBadge(
                          prop.status
                        )}`}
                      >
                        {statusLabelTh(prop.status)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        href={`/requests/${prop.id}`}
                        className="inline-flex items-center space-x-1 text-kku-700 hover:text-kku-900 font-semibold text-xs transition-colors"
                      >
                        <span>เปิดดู</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
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
