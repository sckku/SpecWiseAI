"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Search,
  Scale,
  FileText,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  Database,
  Sliders,
  Check,
} from "lucide-react";
import Link from "next/link";

export function FeaturesSection() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      id: "intent",
      icon: Cpu,
      badge: "Step 1",
      title: "AI วิเคราะห์เจตนาและความต้องการ (Intent & Quantity Parser)",
      tagline: "แปลงภาษาพูดหรือข้อความร่าง เป็นโครงสร้างสเปกทางเทคนิคทันที",
      desc: "ไม่ว่าคุณจะกรอกความต้องการอย่างย่อ เช่น 'ขอคอมทำวิจัย AI 2 เครื่อง' หรืออัปโหลดไฟล์รายละเอียด ระบบ LLM จะทำการแยกแยะความต้องการ อุปกรณ์ประกอบ และจำนวนชุดอย่างแม่นยำ",
      highlights: [
        "แยกแยะประเภทครุภัณฑ์และวัตถุประสงค์การใช้งาน",
        "คำนวณจำนวนชุดและอุปกรณ์เสริมอัตโนมัติ",
        "รองรับทั้งการพิมพ์ข้อความและแนบไฟล์ประกอบ",
      ],
      color: "from-indigo-500 to-purple-600",
      accent: "indigo",
    },
    {
      id: "rag",
      icon: Search,
      badge: "Step 2",
      title: "จับคู่ชื่อมาตรฐานครุภัณฑ์ & Vector RAG Matcher",
      tagline: "เชื่อมโยงฐานข้อมูลสำนักงบประมาณ 2569, DE 2569 และบัญชี มข.",
      desc: "ใช้ระบบค้นหาความหมายเชิงเวกเตอร์ (Vector Embeddings) จับคู่กับเกณฑ์มาตรฐานภาครัฐ พร้อมแสดง Citation ระบุหน้า ข้อ และเกณฑ์อ้างอิงอย่างโปร่งใส",
      highlights: [
        "ค้นหาชื่อมาตรฐานครุภัณฑ์ที่ตรงตามระเบียบ",
        "ระบุเลขหน้าและข้ออ้างอิงชัดเจน (Evidence Citation)",
        "เชื่อมโยงเกณฑ์ ICT กระทรวงดิจิทัลฯ ประจำปี 2569",
      ],
      color: "from-blue-500 to-indigo-600",
      accent: "blue",
    },
    {
      id: "pricing",
      icon: Scale,
      badge: "Step 3",
      title: "ตรวจสอบราคากลาง 4 ฐานข้อมูล (4-Source Price Cross-Checker)",
      tagline: "วิเคราะห์เปรียบเทียบราคาอย่างเป็นธรรม พร้อมหลักฐานอ้างอิง",
      desc: "ตรวจสอบราคากลางจาก 4 แหล่ง: ราคามาตรฐานสำนักงบประมาณ, เกณฑ์ราคากระทรวง DE, ประวัติสัญญาจัดซื้อย้อนหลังของ มข. และใบเสนอราคาในท้องตลาด (Quotations)",
      highlights: [
        "เปรียบเทียบส่วนต่างราคา (Price Variance Analysis)",
        "แจ้งเตือนกรณีราคาเสนอสูงกว่าเกณฑ์มาตรฐาน",
        "อ้างอิงเลขที่สัญญาจัดซื้อย้อนหลังของมหาวิทยาลัยขอนแก่น",
      ],
      color: "from-emerald-500 to-teal-600",
      accent: "emerald",
    },
    {
      id: "reasonableness",
      icon: ShieldCheck,
      badge: "Step 4",
      title: "ประเมินความสมเหตุสมผล & กฎจัดซื้อจัดจ้าง (Procurement Alert)",
      tagline: "ตรวจสอบความจำเป็น ความคุ้มค่า และเพดานงบประมาณตามระเบียบ",
      desc: "ประเมินความเหมาะสมของงบประมาณตามเกณฑ์งบลงทุน มข. ตรวจสอบเพดานวงเงินของแต่ละคณะ/ภาควิชา และให้คำแนะนำเชิงป้องกันก่อนส่งคำขอ",
      highlights: [
        "ระบบประเมินความสมเหตุสมผลของงบประมาณ (Reasonableness Score)",
        "ตรวจจับเงื่อนไขจัดซื้อพัสดุและระเบียบเงินอุดหนุน",
        "แจ้งเตือนข้อบกพร่องที่มักถูกคณะกรรมการพิจารณางบประมาณตีกลับ",
      ],
      color: "from-purple-500 to-pink-600",
      accent: "purple",
    },
    {
      id: "form8",
      icon: FileText,
      badge: "Step 5",
      title: "ร่างแบบฟอร์มคำขอ 8 หมวดหมู่ (8-Section Form Generator)",
      tagline: "สร้างเอกสารคำขอตั้งงบประมาณตามแบบฟอร์ม มข. ครบถ้วน",
      desc: "AI ร่างเนื้อหาทั้ง 8 หมวดหมู่ตามแบบฟอร์มทางการของมหาวิทยาลัยขอนแก่น ตั้งแต่วัตถุประสงค์ ความจำเป็น ความคุ้มค่า แผนการใช้งาน และผลสัมฤทธิ์ที่คาดว่าจะได้รับ",
      highlights: [
        "ร่างครบทั้ง 8 หมวดหมู่ตามแบบฟอร์ม มข. เป๊ะทุกข้อ",
        "รองรับการปรับแต่งแก้ไขเนื้อหาได้แบบเรียลไทม์",
        "ส่งออกเป็นไฟล์ PDF ทางการพร้อมเสนอลงนาม",
      ],
      color: "from-rose-500 to-red-600",
      accent: "rose",
    },
    {
      id: "neutral",
      icon: Layers,
      badge: "Step 6",
      title: "ร่างสเปกกลางไร้การล็อคสเปก (Neutral Spec Generator)",
      tagline: "ตรวจจับและปลดชื่อยี่ห้อการค้า ให้เป็นคุณลักษณะทางเทคนิคที่เป็นกลาง",
      desc: "ป้องกันข้อผิดพลาดตาม พ.ร.บ. จัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ. 2560 โดยแปลงชื่อแบรนด์การค้าให้เป็น Functional/Technical Specification ที่เป็นกลางและเปิดกว้าง",
      highlights: [
        "ตรวจจับชื่อยี่ห้อ โมเดล และรหัสสินค้าการค้า 100%",
        "แปลงเป็นเกณฑ์สมรรถนะขั้นต่ำ (Performance-based Spec)",
        "ปลอดภัยต่อการตรวจสอบจาก สตง. และคณะกรรมการจัดซื้อ",
      ],
      color: "from-amber-600 to-indigo-700",
      accent: "indigo",
    },
  ];

  const current = features[activeTab];

  return (
    <section id="features" className="py-20 bg-white text-slate-900 relative overflow-hidden scroll-mt-20 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ฟีเจอร์อัจฉริยะ 6 ด้าน</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-slate-900">
            ครบเครื่องเรื่องงบประมาณและสเปกครุภัณฑ์{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ในระบบเดียว
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            SpecWise AI รวมเครื่องมือตรวจสอบ วิเคราะห์ เปรียบเทียบราคา
            และร่างเอกสารตามแบบฟอร์ม มข. เพื่อให้การจัดทำงบประมาณเป็นเรื่องง่าย ถูกต้อง และโปร่งใส
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            const isSelected = activeTab === index;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(index)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? "bg-indigo-50/90 border-indigo-500 shadow-sm text-indigo-950 scale-[1.02]"
                    : "bg-slate-50/80 border-slate-200/80 hover:bg-slate-100/80 text-slate-600"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isSelected
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {item.badge}
                  </span>
                  <Icon
                    className={`w-4 h-4 ${
                      isSelected ? "text-indigo-600" : "text-slate-400"
                    }`}
                  />
                </div>
                <div
                  className={`text-xs font-bold font-heading line-clamp-2 ${
                    isSelected ? "text-indigo-900" : "text-slate-700"
                  }`}
                >
                  {item.title.split("(")[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Feature Showcase Box */}
        <div className="bg-gradient-to-r from-[#EEF2FF]/60 via-[#F8FAFC] to-[#FAF5FF]/60 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Description Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-indigo-100/80 text-indigo-800 text-xs font-bold border border-indigo-200/60">
                <span>{current.badge} Showcase</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 leading-tight">
                  {current.title}
                </h3>
                <p className="text-sm font-semibold text-indigo-600 mt-1">
                  {current.tagline}
                </p>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {current.desc}
                </p>
              </div>

              {/* Bullet highlights */}
              <div className="space-y-2.5 pt-1">
                {current.highlights.map((h, i) => (
                  <div key={i} className="flex items-start space-x-2.5 text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="pt-3 flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center space-x-2 transition-all hover:scale-[1.02] active:scale-98"
                >
                  <span>ทดลองใช้งานในระบบ</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/manual"
                  className="text-xs text-slate-600 hover:text-indigo-600 font-medium flex items-center space-x-1"
                >
                  <span>อ่านคู่มือฉบับเต็ม</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Visual Representation */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3.5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
                    <Database className="w-4 h-4 text-indigo-600" />
                    <span>ข้อมูลประมวลผลจริงในระบบ (Live Execution)</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-mono font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Status: Ready
                  </span>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[11px] text-slate-500 font-medium block mb-1">
                      อินพุตจากผู้ใช้งาน (Prompt / Requirement):
                    </span>
                    <p className="text-slate-800 font-mono text-[11px] bg-white p-2 rounded-lg border border-slate-200">
                      "ขอจัดซื้อ Workstation สาขาวิชาเคมี สำหรับงานคำนวณเคมีเชิงฟิสิกส์และแบบจำลองโมเลกุล 1 เครื่อง งบ 120,000 บ."
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100">
                    <span className="text-[11px] text-indigo-900 block mb-1.5 font-bold">
                      ผลลัพธ์จาก AI Engine:
                    </span>
                    <div className="space-y-1.5 font-mono text-[11px] text-slate-700">
                      <div className="flex justify-between">
                        <span className="text-slate-500">หมวดครุภัณฑ์:</span>
                        <span className="text-indigo-700 font-bold">ครุภัณฑ์คอมพิวเตอร์</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">ชื่อมาตรฐาน:</span>
                        <span className="text-slate-900 font-semibold">เครื่องคอมพิวเตอร์ประมวลผลระดับสูง</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">ราคากลางอ้างอิง:</span>
                        <span className="text-emerald-700 font-bold">120,000 บาท (DE 2569)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">การล็อคสเปก:</span>
                        <span className="text-emerald-700 font-bold">0% (ปลดล็อคยี่ห้อแล้ว)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-1 text-center">
                  <span className="text-[11px] text-slate-400">
                    รองรับแบบฟอร์มงบประมาณ มหาวิทยาลัยขอนแก่น ปี 2569 - 2570
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
