"use client";

import React, { useState, useEffect } from "react";
import {
  Settings,
  Shield,
  Key,
  Database,
  Cpu,
  Bot,
  Save,
  CheckCircle2,
  Sparkles,
  Server,
  RotateCcw,
  Check,
  ExternalLink,
} from "lucide-react";

interface AIModelOption {
  id: string;
  name: string;
  provider: string;
  badge?: string;
  isRecommended?: boolean;
}

const DEFAULT_BASE_URL = "https://gen.ai.kku.ac.th/api/v1";
const DEFAULT_MODEL = "gpt-5.6-luna";

const AVAILABLE_MODELS: AIModelOption[] = [
  // OpenAI
  { id: "gpt-5.6-luna", name: "gpt-5.6-luna", provider: "OpenAI", isRecommended: true, badge: "Recommended / ค่าเริ่มต้น" },
  { id: "gpt-5.6-terra", name: "gpt-5.6-terra", provider: "OpenAI" },

  // Claude
  { id: "claude-sonnet-5", name: "claude-sonnet-5", provider: "Claude" },

  // Deepseek
  { id: "deepseek-v4-pro", name: "deepseek-v4-pro", provider: "Deepseek" },
  { id: "deepseek-v4-flash", name: "deepseek-v4-flash", provider: "Deepseek" },

  // Gemini
  { id: "gemini-3.7-flash", name: "gemini-3.7-flash", provider: "Gemini" },
  { id: "gemini-3.5-flash-lite", name: "gemini-3.5-flash-lite", provider: "Gemini" },

  // Meta AI
  { id: "llama-4-maverick", name: "llama-4-maverick", provider: "Meta AI" },
  { id: "llama-4-scout", name: "llama-4-scout", provider: "Meta AI" },

  // MiniMax
  { id: "minimax-m3", name: "minimax-m3", provider: "MiniMax" },

  // Mistral
  { id: "mistral-small-2603", name: "mistral-small-2603", provider: "Mistral" },
  { id: "mistral-large-2512", name: "mistral-large-2512", provider: "Mistral" },
  { id: "mistral-medium-3", name: "mistral-medium-3", provider: "Mistral" },

  // MoonshotAI
  { id: "kimi-k3", name: "kimi-k3", provider: "MoonshotAI" },

  // Nova (AWS)
  { id: "nova-2-lite-v1", name: "nova-2-lite-v1", provider: "Nova (AWS)" },
  { id: "nova-pro-v1", name: "nova-pro-v1", provider: "Nova (AWS)" },

  // Qwen
  { id: "qwen3.7-plus", name: "qwen3.7-plus", provider: "Qwen" },
  { id: "qwen3.7-max", name: "qwen3.7-max", provider: "Qwen" },
  { id: "qwen3.6-flash", name: "qwen3.6-flash", provider: "Qwen" },

  // xAI
  { id: "grok-4.5", name: "grok-4.5", provider: "xAI" },

  // Offline Mock
  { id: "mock-ai-offline", name: "Mock AI Engine (Offline Tester - โหมดทดสอบออฟไลน์)", provider: "Offline / Local" },
];

const PROVIDER_ORDER = [
  "OpenAI",
  "Claude",
  "Deepseek",
  "Gemini",
  "Meta AI",
  "MiniMax",
  "Mistral",
  "MoonshotAI",
  "Nova (AWS)",
  "Qwen",
  "xAI",
  "Offline / Local",
];

export default function SettingsPage() {
  const [model, setModel] = useState(DEFAULT_MODEL);
  const [baseUrl, setBaseUrl] = useState(DEFAULT_BASE_URL);
  const [saved, setSaved] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedModel = localStorage.getItem("specwise_ai_model");
      const savedBaseUrl = localStorage.getItem("specwise_ai_base_url");

      if (savedModel && savedModel !== "llama-3.3-70b-instruct") {
        setModel(savedModel);
      } else {
        setModel(DEFAULT_MODEL);
      }

      if (savedBaseUrl && savedBaseUrl !== "https://intelsphere.kku.ac.th/v1") {
        setBaseUrl(savedBaseUrl);
      } else {
        setBaseUrl(DEFAULT_BASE_URL);
      }
    } catch (e) {
      console.warn("Could not read from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem("specwise_ai_model", model);
      localStorage.setItem("specwise_ai_base_url", baseUrl);
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleResetDefaults = () => {
    setModel(DEFAULT_MODEL);
    setBaseUrl(DEFAULT_BASE_URL);
    try {
      localStorage.setItem("specwise_ai_model", DEFAULT_MODEL);
      localStorage.setItem("specwise_ai_base_url", DEFAULT_BASE_URL);
    } catch (e) {
      console.warn("Could not save to localStorage", e);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const currentModelInfo = AVAILABLE_MODELS.find((m) => m.id === model) || {
    id: model,
    name: model,
    provider: "Custom",
  };

  // Group models by provider
  const modelsByProvider = PROVIDER_ORDER.reduce<Record<string, AIModelOption[]>>((acc, provider) => {
    const list = AVAILABLE_MODELS.filter((m) => m.provider === provider);
    if (list.length > 0) {
      acc[provider] = list;
    }
    return acc;
  }, {});

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-600" />
            <span>การตั้งค่าระบบ (System Settings)</span>
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            กำหนดค่าการเชื่อมต่อ AI Model, KKU IntelSphere, ฐานข้อมูล และความปลอดภัย
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetDefaults}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>คืนค่าเริ่มต้น (Reset)</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* AI Model Settings */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-indigo-600" />
              <span>การเชื่อมต่อ KKU IntelSphere AI / GenAI Gateway</span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold font-mono">
              OpenAI-Compatible
            </span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-semibold text-slate-700">
                  KKU IntelSphere / GenAI Endpoint Base URL
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  Default: https://gen.ai.kku.ac.th/api/v1
                </span>
              </div>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://gen.ai.kku.ac.th/api/v1"
                className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-mono text-xs text-slate-800 bg-slate-50/50 focus:bg-white transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-semibold text-slate-700">
                  AI Model Name (โมเดลประมวลผล)
                </label>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Default: gpt-5.6-luna
                </span>
              </div>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 font-mono text-xs font-medium text-slate-800"
              >
                {Object.entries(modelsByProvider).map(([provider, models]) => (
                  <optgroup key={provider} label={`━━━ ${provider} ━━━`}>
                    {models.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} {m.isRecommended ? "⭐ (KKU Recommended / Default)" : `(${m.provider})`}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Model Info Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50/70 via-indigo-50/40 to-slate-50 border border-indigo-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-indigo-900 font-semibold flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>โมเดลที่เลือกใช้งานในระบบ:</span>
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span>ผู้ให้บริการ (Provider):</span>
                  <span className="font-semibold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200/60">
                    {currentModelInfo.provider}
                  </span>
                  {currentModelInfo.isRecommended && (
                    <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 font-semibold">
                      ⭐ KKU Default
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-sm text-indigo-700 bg-white px-3 py-1.5 rounded-xl border border-indigo-200 shadow-xs">
                  {model}
                </span>
              </div>
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
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              API Standardized
            </span>
          </div>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-semibold text-slate-800">KKU SSONext Postman Spec Endpoints</span>
                <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md font-bold">
                  ssonext-api.kku.ac.th
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 font-mono text-xs">
                <div className="p-2 bg-white rounded-xl border border-slate-200/80">
                  <div className="text-[11px] text-slate-400 font-sans font-semibold">1. Token Exchange</div>
                  <div className="text-slate-800 font-bold">POST /auth.token</div>
                  <div className="text-[10px] text-slate-500 truncate">code, redirectUrl, clientId, clientSecret</div>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200/80">
                  <div className="text-[11px] text-slate-400 font-sans font-semibold">2. User Profile</div>
                  <div className="text-slate-800 font-bold">POST /user.profile</div>
                  <div className="text-[10px] text-slate-500 truncate">Authorization: Bearer &lt;token&gt;</div>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200/80">
                  <div className="text-[11px] text-slate-400 font-sans font-semibold">3. Status Verification</div>
                  <div className="text-slate-800 font-bold">POST /auth.status</div>
                  <div className="text-[10px] text-slate-500 truncate">Authorization: Bearer &lt;token&gt;</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 rounded-2xl bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-semibold text-slate-800">KKU Employee API v3 Integration</span>
                <p className="text-xs text-slate-400">ดึงข้อมูลสังกัด คณะ ภาควิชา และตำแหน่งบุคลากรโดยตรง</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold font-mono">
                api.kku.ac.th/v3
              </span>
            </div>

            <div className="flex flex-col items-start gap-2 rounded-2xl bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="font-semibold text-slate-800">Anti-Brand-Locking Procurement Linter</span>
                <p className="text-xs text-slate-400">ตรวจสอบการล็อคสเปกสินค้าและชื่อทางการค้าตามระเบียบพัสดุ</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          {saved ? (
            <span className="text-xs text-emerald-600 font-bold flex items-center space-x-1.5 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-200 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>บันทึกการตั้งค่าลงเครื่อง (Local Persistence) เรียบร้อยแล้ว</span>
            </span>
          ) : (
            <div></div>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-heading font-bold text-xs shadow-md shadow-indigo-500/25 flex items-center justify-center space-x-2 transition-all hover:scale-105"
          >
            <Save className="w-4 h-4" />
            <span>บันทึกการตั้งค่า</span>
          </button>
        </div>
      </form>
    </div>
  );
}

