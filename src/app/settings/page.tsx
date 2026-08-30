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

        {/* Security & KKU SSONext Authentication */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>การเชื่อมต่อระบบยืนยันตัวตน (KKU SSONext)</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              API Standardized
            </span>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-semibold text-slate-800">KKU SSONext Postman Spec Endpoints</span>
                <span className="text-[10px] font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md font-bold">
                  ssonext-api.kku.ac.th
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
                <div className="p-2 bg-white rounded-xl border border-slate-200/80">
                  <div className="text-[10px] text-slate-400 font-sans font-semibold">1. Token Exchange</div>
                  <div className="text-slate-800 font-bold">POST /auth.token</div>
                  <div className="text-[10px] text-slate-500">code, redirectUrl, clientId, clientSecret</div>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200/80">
                  <div className="text-[10px] text-slate-400 font-sans font-semibold">2. User Profile</div>
                  <div className="text-slate-800 font-bold">POST /user.profile</div>
                  <div className="text-[10px] text-slate-500">Authorization: Bearer &lt;token&gt;</div>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200/80">
                  <div className="text-[10px] text-slate-400 font-sans font-semibold">3. Status Verification</div>
                  <div className="text-slate-800 font-bold">POST /auth.status</div>
                  <div className="text-[10px] text-slate-500">Authorization: Bearer &lt;token&gt;</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 rounded-2xl bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-semibold text-slate-800">KKU Employee API v3 Integration</span>
                <p className="text-[11px] text-slate-400">ดึงข้อมูลสังกัด คณะ ภาควิชา และตำแหน่งบุคลากรโดยตรง</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                api.kku.ac.th/v3
              </span>
            </div>

            <div className="flex flex-col items-start gap-2 rounded-2xl bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-semibold text-slate-800">Anti-Brand-Locking Procurement Linter</span>
                <p className="text-[11px] text-slate-400">ตรวจสอบการล็อคสเปกสินค้าและชื่อทางการค้าตามระเบียบพัสดุ</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
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
