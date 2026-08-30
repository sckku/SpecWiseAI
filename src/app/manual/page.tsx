"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Sparkles,
  Shield,
  FileText,
  Layers,
  Scale,
  DollarSign,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Download,
  Search,
  ExternalLink,
  HelpCircle,
  Cpu,
  Database,
  Lock,
  ArrowRight,
  Printer,
  ChevronRight,
  UserCheck,
  Building2,
  Clock,
  Check,
} from "lucide-react";

export default function ManualPage() {
  const [activeTab, setActiveTab] = useState<"user" | "admin" | "screenshots" | "faq">("user");
  const [searchQuery, setSearchQuery] = useState("");

  const userSteps = [
    {
      step: 1,
      title: "ขั้นตอนที่ 1: ระบุความต้องการครุภัณฑ์ (Intent & Quantity)",
      desc: "กรอกรายละเอียดครุภัณฑ์ที่ต้องการจัดซื้อด้วยภาษาธรรมชาติ หรืออัปโหลดเอกสาร/ใบเสนอราคา เพื่อให้ AI แยกแยะจำนวน หน่วยนับ และวงเงินงบประมาณ",
      img: "/docs/images/03-wizard-step1-intent.png",
      badge: "AI Input",
      badgeColor: "bg-indigo-100 text-indigo-700",
      tips: "สามารถพิมพ์ประโยคยาว เช่น 'ต้องการเครื่องคอมพิวเตอร์ประมวลผล AI 10 เครื่อง งบ 500,000 บาท' AI จะดึงข้อมูลให้อัตโนมัติ",
      link: "/requests/new?step=1",
      linkText: "ทดลองสร้างคำขอ Step 1",
    },
    {
      step: 2,
      title: "ขั้นตอนที่ 2: แมตช์บัญชีมาตรฐานครุภัณฑ์ (Catalog Match)",
      desc: "AI นำรายการความต้องการไปค้นหาและจับคู่กับ บัญชีราคามาตรฐานสำนักงบประมาณ 2569, เกณฑ์กระทรวงดิจิทัลฯ (MDES 2569) และบัญชี มข. พร้อมแสดงคะแนนความมั่นใจ (Confidence Score)",
      img: "/docs/images/04-wizard-step2-catalog-match.png",
      badge: "Catalog Matcher",
      badgeColor: "bg-blue-100 text-blue-700",
      tips: "แสดงรหัสพัสดุ ชื่อรายการมาตรฐาน และเกณฑ์อายุการใช้งานตามระเบียบพัสดุภาครัฐ",
      link: "/requests/new?step=2",
      linkText: "ดูตัวอย่างผลการแมตช์",
    },
    {
      step: 3,
      title: "ขั้นตอนที่ 3: ตรวจสอบและเปรียบเทียบราคา 4 แหล่ง (Price Cross-Check)",
      desc: "ตรวจสอบความเหมาะสมของราคาโดยเทียบกับ 4 แหล่งข้อมูล: (1) เกณฑ์มาตรฐาน สงป./DE (2) สัญญาย้อนหลัง มข. (3) ใบเสนอราคาเฉลี่ย 3 ราย (4) ราคากลาง e-GP กรมบัญชีกลาง",
      img: "/docs/images/05-wizard-step3-price-crosscheck.png",
      badge: "4-Source Governance",
      badgeColor: "bg-emerald-100 text-emerald-700",
      tips: "ระบบคำนวณราคากลางที่แนะนำ (Suggested Reference Price) พร้อมค่าเบี่ยงเบน Variance ป้องกันการตั้งราคาสูงเกินจริง",
      link: "/requests/new?step=3",
      linkText: "ดูตารางเปรียบเทียบราคา",
    },
    {
      step: 4,
      title: "ขั้นตอนที่ 4: ตรวจสอบความสมเหตุสมผลและแจ้งเตือนงบประมาณ (Budget Alert)",
      desc: "ระบบสัญญาณไฟจราจรเตือนความเสี่ยง (Green/Amber/Red Alert) พร้อมวิเคราะห์ความคุ้มค่า จำแนกคุณลักษณะที่เป็น Value-Added และ Non-Value-Added",
      img: "/docs/images/06-wizard-step4-budget-alert.png",
      badge: "Risk & Value Alert",
      badgeColor: "bg-amber-100 text-amber-800",
      tips: "หากพบสัญญาณไฟสีส้มหรือแดง ระบบจะระบุสาเหตุและแนะนำวิธีปรับปรุงเอกสารให้ถูกต้อง",
      link: "/requests/new?step=4",
      linkText: "ดูตัวอย่างระบบแจ้งเตือน",
    },
    {
      step: 5,
      title: "ขั้นตอนที่ 5: ตรวจทานและแก้ไขแบบฟอร์มคำขอ 8 ส่วน (Proposal Form Draft)",
      desc: "AI ร่างแบบฟอร์มคำของบประมาณทางการ 8 หัวข้อสำคัญ (หลักการเหตุผล, วัตถุประสงค์, ความคุ้มค่า, แผนบำรุงรักษา, สถานที่ติดตั้ง ฯลฯ) ผู้ใช้สามารถคลิกแก้ไขได้ทันที",
      img: "/docs/images/07-wizard-step5-proposal-draft.png",
      badge: "Official 8-Section Draft",
      badgeColor: "bg-purple-100 text-purple-700",
      tips: "เนื้อหาที่ AI ร่างจะสอดคล้องกับยุทธศาสตร์มหาวิทยาลัยขอนแก่น และระเบียบคำของบลงทุน",
      link: "/requests/new?step=5",
      linkText: "ดูแบบฟอร์ม 8 ส่วน",
    },
    {
      step: 6,
      title: "ขั้นตอนที่ 6: จัดทำร่างคุณลักษณะเฉพาะที่เป็นกลาง (Neutral Spec / TOR)",
      desc: "สร้างข้อกำหนดสเปกครุภัณฑ์ที่เป็นกลางตามมาตรฐานสมรรถนะ (Performance-based) โดยไม่มีการระบุยี่ห้อสินค้า ป้องกันการล็อกสเปกและการเอื้อประโยชน์",
      img: "/docs/images/08-wizard-step6-neutral-spec.png",
      badge: "Anti-Brand-Locking",
      badgeColor: "bg-rose-100 text-rose-700",
      tips: "ระบบมี Procurement Linter ตรวจจับคำต้องห้ามและชื่อแบรนด์แบบเรียลไทม์",
      link: "/requests/new?step=6",
      linkText: "ดูร่างสเปกที่เป็นกลาง",
    },
    {
      step: 7,
      title: "ขั้นตอนที่ 7: เครื่องมือเทียบเคียง TOR ย้อนหลัง (TOR Benchmarking)",
      desc: "เปรียบเทียบสเปกปัจจุบันกับโครงการจัดซื้อในอดีตของ มข. เพื่อยืนยันความสมบูรณ์และเกณฑ์การตรวจรับ",
      img: "/docs/images/09-wizard-step7-tor-compare.png",
      badge: "Historical Benchmark",
      badgeColor: "bg-slate-100 text-slate-700",
      tips: "ช่วยให้มั่นใจว่าสเปกที่ร่างมีความรัดกุมและเป็นไปตามแนวปฏิบัติที่เคยได้รับอนุมัติ",
      link: "/requests/new?step=7",
      linkText: "ดูผลเทียบเคียง TOR",
    },
    {
      step: 8,
      title: "ขั้นตอนที่ 8: แนบเอกสารหลักฐานและรวมไฟล์ PDF (Single Merged PDF)",
      desc: "อัปโหลดใบเสนอราคา เอกสารประกอบ และรวมเข้ากับแบบฟอร์มคำขอเป็นไฟล์ PDF ฉบับสมบูรณ์ชุดเดียวบน MinIO S3",
      img: "/docs/images/10-wizard-step8-attachments.png",
      badge: "S3 Pipeline",
      badgeColor: "bg-cyan-100 text-cyan-700",
      tips: "ป้องกันเอกสารสูญหายหรือการสับเปลี่ยนหน้าหลักฐานในภายหลัง",
      link: "/requests/new?step=8",
      linkText: "ดูระบบแนบเอกสาร",
    },
    {
      step: 9,
      title: "ขั้นตอนที่ 9: ตรวจสอบความถูกต้องและยืนยันการส่งคำขอ (Review & Submit)",
      desc: "สรุปภาพรวมคำขอทั้งหมด ตรวจสอบยอดเงิน และคลิกส่งคำขอเข้าสู่กระบวนการตรวจทานระดับภาควิชาและเสนอคณบดีอนุมัติ",
      img: "/docs/images/11-wizard-step9-review-submit.png",
      badge: "Workflow Submit",
      badgeColor: "bg-emerald-100 text-emerald-800",
      tips: "เมื่อส่งแล้ว ระบบจะส่งการแจ้งเตือนไปยังผู้ตรวจทานและอัปเดตสถานะในแดชบอร์ดทันที",
      link: "/requests/new?step=9",
      linkText: "ดูหน้าสรุปส่งคำขอ",
    },
  ];

  const adminSections = [
    {
      id: "admin-kpi",
      title: "1. ภาพรวมระบบและการแจ้งเตือน (Admin Dashboard & KPIs)",
      desc: "ศูนย์กลางตรวจเช็กสุขภาพระบบ สรุปจำนวนคำขอ 4 สถานะ (ทั้งหมด, รอดำเนินการ, รออนุมัติ, แล้วเสร็จ) และการแจ้งเตือนระดับวิกฤต",
      img: "/docs/images/17-admin-control-center.png",
      icon: Sparkles,
      color: "text-indigo-600",
    },
    {
      id: "admin-queue",
      title: "2. คิวตรวจสอบอัจฉริยะ (Smart Review Queue)",
      desc: "คัดกรองคำขอตามระดับความเสี่ยง (High Risk, Medium Risk, Low Risk) ช่วยให้เจ้าหน้าที่พัสดุโฟกัสรายการที่มีความผิดปกติของราคาหรือการล็อกสเปกได้อย่างรวดเร็ว",
      img: "/docs/images/18-admin-smart-review-queue.png",
      icon: Shield,
      color: "text-rose-600",
    },
    {
      id: "admin-catalog",
      title: "3. การจัดการบัญชีราคามาตรฐาน (Reference Catalogs & Pricing)",
      desc: "ซิงค์และอัปเดตข้อมูลบัญชีราคามาตรฐานสำนักงบประมาณ 2569, MDES 2569, มข. และคำนวณ Embedding Vector สำหรับการค้นหา Semantic RAG",
      img: "/docs/images/19-admin-catalog-management.png",
      icon: Layers,
      color: "text-blue-600",
    },
    {
      id: "admin-tor",
      title: "4. ศูนย์เทียบเคียงและกำกับมาตรฐาน TOR (TOR Benchmarking Hub)",
      desc: "ค้นหาฐานข้อมูลโครงการเดิม และกำกับดูแลไม่ให้มีคำต้องห้ามหรือชื่อยี่ห้อ (Brand-Locking Filter)",
      img: "/docs/images/20-admin-tor-benchmarking.png",
      icon: Scale,
      color: "text-amber-600",
    },
    {
      id: "admin-sources",
      title: "5. การตรวจสอบสถานะแหล่งข้อมูลภายนอก (Data Source Monitoring)",
      desc: "ตรวจสอบสถานะการเชื่อมต่อ KKU SSONext, KKU Employee API v3, KKU IntelSphere AI (`gpt-5.6-luna`), MinIO S3 และ PostgreSQL Vector DB",
      img: "/docs/images/21-admin-data-source-monitoring.png",
      icon: Cpu,
      color: "text-emerald-600",
    },
    {
      id: "admin-audit",
      title: "6. การกำกับดูแล สิทธิ์ และบันทึกประวัติการตรวจสอบ (Governance & Audit Trail)",
      desc: "จัดการสิทธิ์ผู้ใช้งาน (RBAC) และตรวจสอบประวัติการทำรายการทุกขั้นตอนอย่างโปร่งใส ไม่สามารถแก้ไขย้อนหลังได้ (Immutable Audit Logs)",
      img: "/docs/images/22-admin-governance-audit-log.png",
      icon: Lock,
      color: "text-purple-600",
    },
  ];

  const allScreenshots = [
    { name: "01-login-screen.png", title: "หน้าจอเข้าสู่ระบบ (Login & Sandbox Switcher)", category: "Auth" },
    { name: "02-dashboard-requests.png", title: "หน้าแดชบอร์ดรายการคำขอ (Proposals List)", category: "Dashboard" },
    { name: "03-wizard-step1-intent.png", title: "Step 1: ระบุความต้องการครุภัณฑ์", category: "Wizard" },
    { name: "04-wizard-step2-catalog-match.png", title: "Step 2: แมตช์บัญชีมาตรฐานครุภัณฑ์", category: "Wizard" },
    { name: "05-wizard-step3-price-crosscheck.png", title: "Step 3: เปรียบเทียบราคา 4 แหล่ง", category: "Wizard" },
    { name: "06-wizard-step4-budget-alert.png", title: "Step 4: ตรวจสอบความเสี่ยง & แจ้งเตือน", category: "Wizard" },
    { name: "07-wizard-step5-proposal-draft.png", title: "Step 5: ร่างแบบฟอร์มคำขอ 8 ส่วน", category: "Wizard" },
    { name: "08-wizard-step6-neutral-spec.png", title: "Step 6: ร่างสเปกเป็นกลาง ไม่ล็อกแบรนด์", category: "Wizard" },
    { name: "09-wizard-step7-tor-compare.png", title: "Step 7: เทียบเคียง TOR ย้อนหลัง", category: "Wizard" },
    { name: "10-wizard-step8-attachments.png", title: "Step 8: แนบเอกสารหลักฐาน & รวม PDF", category: "Wizard" },
    { name: "11-wizard-step9-review-submit.png", title: "Step 9: ตรวจทาน & ยืนยันการส่งคำขอ", category: "Wizard" },
    { name: "12-request-detail.png", title: "หน้ารายละเอียดคำขอ & ส่งออกเอกสาร", category: "Tracking" },
    { name: "13-catalogs-search.png", title: "คลังบัญชีราคามาตรฐานและการค้นหา", category: "Catalog" },
    { name: "14-reports-analytics.png", title: "รายงานสถิติและผลการวิเคราะห์งบประมาณ", category: "Reports" },
    { name: "15-notifications.png", title: "ศูนย์การแจ้งเตือนระบบ", category: "Notifications" },
    { name: "16-settings.png", title: "การตั้งค่าผู้ใช้และระบบ", category: "Settings" },
    { name: "17-admin-control-center.png", title: "หน้าจอหลัก Admin Control Center", category: "Admin" },
    { name: "18-admin-smart-review-queue.png", title: "คิวตรวจสอบอัจฉริยะสำหรับพัสดุ", category: "Admin" },
    { name: "19-admin-catalog-management.png", title: "การจัดการบัญชีราคามาตรฐาน", category: "Admin" },
    { name: "20-admin-tor-benchmarking.png", title: "ระบบเทียบเคียง TOR ย้อนหลัง", category: "Admin" },
    { name: "21-admin-data-source-monitoring.png", title: "ตรวจสอบสถานะ API และ AI", category: "Admin" },
    { name: "22-admin-governance-audit-log.png", title: "สิทธิ์และการตรวจสอบความโปร่งใส", category: "Admin" },
  ];

  const faqs = [
    {
      q: "หากครุภัณฑ์ที่ต้องการไม่มีในบัญชีมาตรฐานสำนักงบประมาณ ต้องทำอย่างไร?",
      a: "สามารถพิมพ์ความต้องการและเลือกเป็น 'ครุภัณฑ์นอกบัญชีมาตรฐาน' ได้ ในขั้นตอนที่ 3 AI จะนำราคาจากใบเสนอราคา 3 เจ้าและสัญญาย้อนหลังของ มข. มาคำนวณราคากลางอ้างอิงให้ พร้อมร่างเหตุผลความจำเป็นในขั้นตอนที่ 5 ให้อัตโนมัติ",
    },
    {
      q: "สเปกที่ AI สร้างขึ้น สามารถแก้ไขเองได้หรือไม่?",
      a: "ผู้ใช้สามารถแก้ไขข้อความสเปกและแบบฟอร์มคำขอได้โดยตรงในขั้นตอนที่ 5 และ 6 โดยระบบมี Spec Linter ช่วยตรวจคำต้องห้ามแบบเรียลไทม์เพื่อไม่ให้เข้าข่ายการล็อกสเปก",
    },
    {
      q: "การเข้าใช้งานจริงต้องใช้บัญชีใด?",
      a: "ในระบบจริง สามารถเข้าสู่ระบบด้วยบัญชี KKU SSONext (@kku.ac.th) ได้ทันที ระบบจะดึงข้อมูลสังกัด คณะ สาขา และสิทธิ์ผ่าน KKU Employee API v3 โดยอัตโนมัติ สำหรับการทดสอบสามารถเลือกสลับบทบาทในแถบผู้ใช้ได้ทันที",
    },
    {
      q: "เอกสารที่ดาวน์โหลดได้มีรูปแบบใดบ้าง?",
      a: "รองรับการดาวน์โหลดไฟล์ PDF ทางการตามแบบฟอร์มของมหาวิทยาลัยขอนแก่น พร้อมสรุปผลการวิเคราะห์ของ AI และสามารถส่งออกเป็นไฟล์ Excel (.xlsx) สรุปรายการพัสดุและงบประมาณได้",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 border border-white/10 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>SpecWise AI Documentation &amp; User Manual</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight">
            คู่มือการใช้งานระบบ SpecWise AI
          </h1>
          <p className="text-sm sm:text-base text-indigo-100 leading-relaxed">
            คู่มือแนะนำการใช้งานระบบจัดทำคำของบประมาณและสเปกครุภัณฑ์ มหาวิทยาลัยขอนแก่น ทั้งสำหรับผู้ใช้งานทั่วไปและผู้ดูแลระบบ อธิบายทีละขั้นตอนพร้อมภาพประกอบจริง
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/requests/new"
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-heading font-bold text-xs shadow-md transition-all flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>เริ่มสร้างคำขอใหม่ด้วย AI</span>
            </Link>
            <Link
              href="/admin"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-heading font-semibold text-xs border border-white/20 transition-all flex items-center space-x-1.5"
            >
              <Shield className="w-4 h-4" />
              <span>ไปยัง Admin Control Center</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200/80">
        <button
          onClick={() => setActiveTab("user")}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-heading font-bold flex items-center justify-center space-x-2 transition-all ${
            activeTab === "user"
              ? "bg-white text-indigo-700 shadow-xs border border-slate-200/60"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>คู่มือผู้ใช้งานทั่วไป (User Guide)</span>
        </button>

        <button
          onClick={() => setActiveTab("admin")}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-heading font-bold flex items-center justify-center space-x-2 transition-all ${
            activeTab === "admin"
              ? "bg-white text-purple-700 shadow-xs border border-slate-200/60"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>คู่มือผู้ดูแลระบบ (Admin Guide)</span>
        </button>

        <button
          onClick={() => setActiveTab("screenshots")}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-heading font-bold flex items-center justify-center space-x-2 transition-all ${
            activeTab === "screenshots"
              ? "bg-white text-emerald-700 shadow-xs border border-slate-200/60"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>แกลเลอรีภาพหน้าจอ (Screenshots)</span>
        </button>

        <button
          onClick={() => setActiveTab("faq")}
          className={`flex-1 min-w-[140px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-heading font-bold flex items-center justify-center space-x-2 transition-all ${
            activeTab === "faq"
              ? "bg-white text-amber-700 shadow-xs border border-slate-200/60"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>คำถามที่พบบ่อย (FAQ)</span>
        </button>
      </div>

      {/* Content Section 1: User Guide */}
      {activeTab === "user" && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-2">
            <h2 className="text-lg font-heading font-bold text-slate-900 flex items-center space-x-2">
              <span className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold">
                9
              </span>
              <span>ขั้นตอนการจัดทำคำของบประมาณด้วย AI (Interactive 6+3 Workflow)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              ระบบผู้ช่วย AI จะนำทางท่านตั้งแต่การพิมพ์ความต้องการภาษาธรรมชาติ จนถึงการส่งคำขอและสร้างเอกสารทางการของมหาวิทยาลัยขอนแก่น
            </p>
          </div>

          {/* Steps List */}
          <div className="space-y-6">
            {userSteps.map((item) => (
              <div
                key={item.step}
                className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs hover:border-indigo-300 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-2xl bg-indigo-600 text-white font-heading font-bold text-sm flex items-center justify-center shadow-xs">
                      {item.step}
                    </span>
                    <h3 className="font-heading font-bold text-base text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>

                {/* Screenshot Image Container */}
                <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 shadow-inner group relative">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-auto object-cover max-h-[420px] transition-transform duration-300 group-hover:scale-[1.01]"
                    loading="lazy"
                  />
                  <div className="p-2.5 bg-slate-900/80 text-white text-[11px] flex items-center justify-between backdrop-blur-sm">
                    <span className="flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>ภาพหน้าจอจริง: {item.title}</span>
                    </span>
                    <span className="text-slate-400 font-mono">Retina 2x Verified</span>
                  </div>
                </div>

                {/* Tips & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-start space-x-2 text-slate-600">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span><strong>ข้อแนะนำ:</strong> {item.tips}</span>
                  </div>
                  <Link
                    href={item.link}
                    className="inline-flex items-center space-x-1 font-heading font-bold text-indigo-600 hover:text-indigo-800 shrink-0"
                  >
                    <span>{item.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content Section 2: Admin Guide */}
      {activeTab === "admin" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-900 to-slate-900 text-white rounded-3xl p-6 shadow-xs space-y-2">
            <div className="flex items-center space-x-2 text-purple-300 text-xs font-bold uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>Admin &amp; Governance Center</span>
            </div>
            <h2 className="text-xl font-heading font-bold text-white">
              คู่มือสำหรับผู้ดูแลระบบและเจ้าหน้าที่พัสดุ (Admin Manual)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              ศูนย์รวมการกำกับดูแลความเสี่ยงของคำของบประมาณ การคัดกรองคำล็อกสเปก และการอัปเดตบัญชีราคามาตรฐาน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adminSections.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-purple-300 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm font-bold text-slate-900">
                      <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{item.title}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>

                    <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 shadow-inner">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-auto object-cover max-h-[220px]"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">สิทธิ์: ADMIN กองคลังฯ</span>
                    <Link
                      href="/admin"
                      className="text-purple-600 hover:text-purple-800 font-bold flex items-center space-x-1"
                    >
                      <span>เข้าสู่หน้าควบคุม</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Content Section 3: Screenshots Gallery */}
      {activeTab === "screenshots" && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-lg font-heading font-bold text-slate-900">
                แกลเลอรีภาพหน้าจอระบบทั้งหมด (22 หน้าจอ)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                ภาพหน้าจอความละเอียดสูงจากระบบจริง ครอบคลุมทั้งฝั่งผู้ใช้งานและผู้ดูแลระบบ
              </p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ค้นหาภาพหน้าจอ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allScreenshots
              .filter((s) => s.title.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((s, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 truncate pr-2">
                      {s.title}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 shrink-0">
                      {s.category}
                    </span>
                  </div>

                  <div className="bg-slate-50 overflow-hidden">
                    <img
                      src={`/docs/images/${s.name}`}
                      alt={s.title}
                      className="w-full h-44 object-cover object-top hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono text-slate-400 truncate">{s.name}</span>
                    <a
                      href={`/docs/images/${s.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1 shrink-0 ml-2"
                    >
                      <span>ดูภาพขนาดเต็ม</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Content Section 4: FAQ */}
      {activeTab === "faq" && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-xs space-y-2">
            <h2 className="text-lg font-heading font-bold text-slate-900 flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-amber-500" />
              <span>คำถามที่พบบ่อยและข้อแนะนำการใช้งาน (FAQ)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              รวบรวมข้อสงสัยและคำแนะนำที่พบบ่อยในการจัดทำคำของบประมาณและสเปกครุภัณฑ์
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((f, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-2.5"
              >
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 font-heading font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    Q
                  </span>
                  <h3 className="font-heading font-bold text-sm text-slate-900">
                    {f.q}
                  </h3>
                </div>
                <div className="flex items-start space-x-3 pl-9 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="font-bold text-emerald-600 shrink-0">ตอบ:</span>
                  <span>{f.a}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
