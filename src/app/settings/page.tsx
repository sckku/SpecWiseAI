"use client";

import React, { useState } from "react";
import {
  Settings,
  Shield,
  Key,
  Database,
  Cpu,
  Bot,
  Save,
  CheckCircle2,
} from "lucide-react";

export default function SettingsPage() {
  const [model, setModel] = useState("llama-3.3-70b-instruct");
  const [baseUrl, setBaseUrl] = useState("https://intelsphere.kku.ac.th/v1");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      <div>
        <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
          การตั้งค่าระบบ (System Settings)
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          กำหนดค่าการเชื่อมต่อ AI Model, KKU IntelSphere, ฐานข้อมูล และความปลอดภัย
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* AI Model Settings */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-indigo-600" />
            <span>การเชื่อมต่อ KKU IntelSphere AI</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                KKU IntelSphere Endpoint Base URL
              </label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">
                AI Model Name
              </label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-mono"
              >
                <option value="llama-3.3-70b-instruct">llama-3.3-70b-instruct (KKU IntelSphere Recommended)</option>
                <option value="llama-3.1-8b-instruct">llama-3.1-8b-instruct (Fast Low Latency)</option>
                <option value="qwen-2.5-72b-instruct">qwen-2.5-72b-instruct</option>
                <option value="mock-ai-offline">Mock AI Engine (Offline Testing)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security & Authentication */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>ความปลอดภัยและการยืนยันตัวตน (KKU SSONext)</span>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
              <div>
                <span className="font-semibold text-slate-800">KKU SSONext OpenID Connect (OIDC)</span>
                <p className="text-[11px] text-slate-400">ระบบพิสูจน์และยืนยันตัวตน มหาวิทยาลัยขอนแก่น</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                เปิดใช้งานแล้ว
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
              <div>
                <span className="font-semibold text-slate-800">Anti-Brand-Locking Procurement Linter</span>
                <p className="text-[11px] text-slate-400">ตรวจสอบการล็อคสเปกสินค้าโดยอัตโนมัติ</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {saved ? (
            <span className="text-xs text-emerald-600 font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>บันทึกการตั้งค่าเรียบร้อยแล้ว</span>
            </span>
          ) : (
            <div></div>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-bold text-xs shadow-md shadow-indigo-500/25 flex items-center space-x-2 transition-all hover:scale-105"
          >
            <Save className="w-4 h-4" />
            <span>บันทึกการตั้งค่า</span>
          </button>
        </div>
      </form>
    </div>
  );
}
