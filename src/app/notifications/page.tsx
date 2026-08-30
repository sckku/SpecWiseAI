"use client";

import React from "react";
import Link from "next/link";
import {
  Bell,
  AlertTriangle,
  Info,
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function NotificationsPage() {
  const alerts = [
    {
      id: "1",
      title: "วงเงินสูงกว่าข้อมูลอ้างอิง 21.1%",
      description: "คำขอ Computer Lab (PR-2569-0119) มีราคาต่อหน่วยสูงกว่าราคากลางอ้างอิง",
      time: "5 นาทีที่แล้ว",
      type: "warning",
      href: "/requests",
    },
    {
      id: "2",
      title: "จำเป็นต้องแนบใบเสนอราคาเพิ่มเติม",
      description: "คำขอ GPU Workstation (PR-2569-0123) ต้องแนบใบเสนอราคา 3 บริษัทให้ครบถ้วน",
      time: "1 ชั่วโมงที่แล้ว",
      type: "info",
      href: "/requests",
    },
    {
      id: "3",
      title: "มาตรฐานอัปเดตใหม่ ฉบับ พ.ศ. 2569",
      description: "กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม ได้ประกาศเกณฑ์ราคากลางคอมพิวเตอร์ฉบับใหม่",
      time: "3 ชั่วโมงที่แล้ว",
      type: "update",
      href: "/catalogs",
    },
    {
      id: "4",
      title: "คำของบประมาณได้รับการอนุมัติ",
      description: "คำขอ Microscope คณะวิทยาศาสตร์ ได้รับการอนุมัติบรรจุในแผนงบประมาณแล้ว",
      time: "1 วันที่แล้ว",
      type: "success",
      href: "/requests",
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      <div>
        <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
          การแจ้งเตือนทั้งหมด
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          แจ้งเตือนความเสี่ยง เกณฑ์ราคากลางอัปเดต และสถานะคำของบประมาณ
        </p>
      </div>

      <div className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-xs divide-y divide-slate-100">
        {alerts.map((alert) => (
          <Link
            key={alert.id}
            href={alert.href}
            className="p-5 hover:bg-slate-50/70 transition-colors flex items-start space-x-4 block"
          >
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
                alert.type === "warning"
                  ? "bg-amber-50 text-amber-600"
                  : alert.type === "info"
                  ? "bg-blue-50 text-blue-600"
                  : alert.type === "update"
                  ? "bg-purple-50 text-purple-600"
                  : "bg-emerald-50 text-emerald-600"
              }`}
            >
              {alert.type === "warning" && <AlertTriangle className="w-5 h-5" />}
              {alert.type === "info" && <Info className="w-5 h-5" />}
              {alert.type === "update" && <FileText className="w-5 h-5" />}
              {alert.type === "success" && <CheckCircle2 className="w-5 h-5" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-heading text-sm font-bold text-slate-900 sm:truncate">
                  {alert.title}
                </h3>
                <span className="text-[10px] text-slate-400 shrink-0 ml-2">
                  {alert.time}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {alert.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
