"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Shield, Heart, ExternalLink } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="bg-white border-t border-slate-200/90 text-slate-500 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-100">
          {/* Col 1 & 2: Brand Info */}
          <div className="lg:col-span-2 space-y-3.5">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4 fill-white/20" />
              </div>
              <span className="font-heading font-bold text-base text-slate-900 tracking-tight">
                SpecWise <span className="text-indigo-600">AI</span>
              </span>
            </Link>

            <p className="text-slate-500 leading-relaxed text-xs max-w-sm">
              ระบบ AI อัจฉริยะวิเคราะห์คำของบลงทุน ตรวจสอบราคากลาง 4 ฐาน ป้องกันการล็อคสเปก
              และร่างเอกสาร 8 หมวดหมู่ตามแบบฟอร์ม มหาวิทยาลัยขอนแก่น
            </p>

            <div className="pt-1 flex items-center space-x-2 text-[11px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>ระบบพร้อมใช้งาน • KKU AI Hackathon 2026</span>
            </div>
          </div>

          {/* Col 3: ฟังก์ชันระบบ */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider">
              ฟังก์ชันระบบ
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  หน้าหลัก / Dashboard
                </Link>
              </li>
              <li>
                <Link href="/requests/new" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  สร้างคำของบประมาณใหม่ (6-Step AI)
                </Link>
              </li>
              <li>
                <Link href="/requests" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  รายการคำของบประมาณทั้งหมด
                </Link>
              </li>
              <li>
                <Link href="/reports" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  รายงานและสถิติ VA/NVA
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: ฐานข้อมูล & ระเบียบ */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider">
              ฐานข้อมูลมาตรฐาน
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/catalogs" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  บัญชีราคา สำนักงบประมาณ 2569
                </Link>
              </li>
              <li>
                <Link href="/catalogs" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  เกณฑ์ราคากลาง ICT กระทรวง DE 2569
                </Link>
              </li>
              <li>
                <Link href="/catalogs" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  ประวัติสัญญาจัดซื้อจัดจ้าง มข.
                </Link>
              </li>
              <li>
                <Link href="/manual" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  คู่มือการจัดทำงบประมาณ
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: บทบาท & ความปลอดภัย */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wider">
              การเข้าใช้งาน
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors">
                  เข้าสู่ระบบ (Dashboard)
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  ทดสอบ Sandbox Mock Auth
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-slate-600 hover:text-indigo-600 transition-colors">
                  ตั้งค่าระบบและการแจ้งเตือน
                </Link>
              </li>
              <li>
                <span className="text-slate-400 block">KKU SSONext OAuth 2.0</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © 2026 SpecWise AI — พัฒนาสำหรับงาน KKU AI Hackathon 2026, มหาวิทยาลัยขอนแก่น
          </div>
          <div className="flex items-center space-x-3">
            <span>พ.ร.บ. จัดซื้อจัดจ้างฯ พ.ศ. 2560</span>
            <span>•</span>
            <span>KKU SSONext</span>
            <span>•</span>
            <span>Intelligent Asset Management</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
