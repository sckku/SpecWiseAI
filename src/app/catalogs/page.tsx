"use client";

import React, { useState, useMemo } from "react";
import {
  Layers,
  Search,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Tag,
  ArrowUpRight,
  Filter,
  X,
  SlidersHorizontal,
  Info,
  Building2,
  Cpu,
  Microscope,
  GraduationCap,
  Briefcase,
  Car,
} from "lucide-react";

interface CatalogItem {
  id: string;
  sourceKey: "budget_bureau" | "mdes" | "kku";
  sourceName: string;
  sourceEdition: string;
  category: string;
  code: string;
  name: string;
  price: number;
  unit: string;
  page: string;
  itemNo: string;
  spec: string;
  features?: string[];
  departmentUse?: string;
}

export default function CatalogsPage() {
  const [activeCatalog, setActiveCatalog] = useState<"all" | "budget_bureau" | "mdes" | "kku">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"default" | "price_asc" | "price_desc" | "name">("default");
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);

  const catalogDatabase: CatalogItem[] = [
    // --- สำนักงบประมาณ ---
    {
      id: "bb-1",
      sourceKey: "budget_bureau",
      sourceName: "สำนักงบประมาณ",
      sourceEdition: "บัญชีราคามาตรฐานครุภัณฑ์ สำนักงบประมาณ (ฉบับ เมษายน 2569)",
      category: "ครุภัณฑ์คอมพิวเตอร์",
      code: "BB-2569-01",
      name: "เครื่องคอมพิวเตอร์ สำหรับงานประมวลผล แบบที่ 1",
      price: 26000,
      unit: "เครื่อง",
      page: "124",
      itemNo: "1.2.3",
      spec: "จอแสดงภาพขนาดไม่น้อยกว่า 23 นิ้ว ความละเอียด Full HD, CPU 6 Cores 12 Threads ความเร็วไม่น้อยกว่า 2.5 GHz, RAM 16GB DDR5, SSD M.2 NVMe 512GB, Keyboard + Mouse, มีพอร์ต LAN Gigabit",
      features: ["CPU 6C/12T", "RAM 16GB DDR5", "SSD 512GB", "จอ 23 นิ้ว FHD"],
      departmentUse: "สำหรับห้องปฏิบัติการคอมพิวเตอร์ และงานประมวลผลทั่วไป",
    },
    {
      id: "bb-2",
      sourceKey: "budget_bureau",
      sourceName: "สำนักงบประมาณ",
      sourceEdition: "บัญชีราคามาตรฐานครุภัณฑ์ สำนักงบประมาณ (ฉบับ เมษายน 2569)",
      category: "ครุภัณฑ์คอมพิวเตอร์",
      code: "BB-2569-02",
      name: "เครื่องคอมพิวเตอร์ สำหรับงานประมวลผล แบบที่ 2 (พร้อมการ์ดจอแยก)",
      price: 33000,
      unit: "เครื่อง",
      page: "125",
      itemNo: "1.2.4",
      spec: "จอแสดงภาพขนาดไม่น้อยกว่า 23 นิ้ว, CPU 8 Cores 16 Threads, RAM 16GB DDR5, SSD M.2 NVMe 512GB, GPU แยก VRAM ไม่น้อยกว่า 4GB GDDR6",
      features: ["CPU 8C/16T", "RAM 16GB DDR5", "SSD 512GB", "GPU แยก 4GB"],
      departmentUse: "สำหรับงานวิศวกรรม ออกแบบ 3D และประมวลผลสื่อมัลติมีเดีย",
    },
    {
      id: "bb-3",
      sourceKey: "budget_bureau",
      sourceName: "สำนักงบประมาณ",
      sourceEdition: "บัญชีราคามาตรฐานครุภัณฑ์ สำนักงบประมาณ (ฉบับ เมษายน 2569)",
      category: "ครุภัณฑ์คอมพิวเตอร์",
      code: "BB-2569-03",
      name: "เครื่องคอมพิวเตอร์ สำหรับงานสำนักงาน",
      price: 17000,
      unit: "เครื่อง",
      page: "123",
      itemNo: "1.1.1",
      spec: "จอแสดงภาพขนาดไม่น้อยกว่า 19.5 นิ้ว, CPU ไม่น้อยกว่า 4 Cores, RAM 8GB DDR4, SSD M.2 NVMe 256GB, License ระบบปฏิบัติการที่ถูกต้องตามกฎหมาย",
      features: ["CPU 4C", "RAM 8GB", "SSD 256GB", "จอ 19.5 นิ้ว"],
      departmentUse: "สำหรับงานธุรการ งานเอกสาร และระบบสารสนเทศองค์กร",
    },
    {
      id: "bb-4",
      sourceKey: "budget_bureau",
      sourceName: "สำนักงบประมาณ",
      sourceEdition: "บัญชีราคามาตรฐานครุภัณฑ์ สำนักงบประมาณ (ฉบับ เมษายน 2569)",
      category: "ครุภัณฑ์วิทยาศาสตร์",
      code: "BB-2569-SCI-01",
      name: "เครื่องปั่นเหวี่ยงตกตะกอนควบคุมอุณหภูมิ (Refrigerated Centrifuge)",
      price: 350000,
      unit: "เครื่อง",
      page: "45",
      itemNo: "4.12",
      spec: "ความเร็วรอบไม่น้อยกว่า 15,000 RPM (แรงเหวี่ยงหนีศูนย์กลางไม่น้อยกว่า 21,000 xg), ควบคุมอุณหภูมิได้ในช่วง -10 ถึง +40 องศาเซลเซียส พร้อมหัวปั่นสำหรับหลอดทดลอง Microtube 1.5/2.0 mL",
      features: ["Max 15,000 RPM", "-10 ถึง +40 °C", "Microtube Rotor", "ดิจิทัลคอนโทรล"],
      departmentUse: "สำหรับห้องปฏิบัติการชีวเคมี เทคโนโลยีชีวภาพ และการแพทย์",
    },
    {
      id: "bb-5",
      sourceKey: "budget_bureau",
      sourceName: "สำนักงบประมาณ",
      sourceEdition: "บัญชีราคามาตรฐานครุภัณฑ์ สำนักงบประมาณ (ฉบับ เมษายน 2569)",
      category: "ครุภัณฑ์วิทยาศาสตร์",
      code: "BB-2569-SCI-02",
      name: "เครื่องวัดการดูดกลืนแสงแบบยูวี-วิสิเบิล (UV-Vis Spectrophotometer)",
      price: 280000,
      unit: "เครื่อง",
      page: "52",
      itemNo: "4.18",
      spec: "ช่วงความยาวคลื่น 190 - 1,100 nm, ระบบ Double Beam Optics, Spectral Bandwidth 1 nm, ควบคุมด้วยหน้าจอระบบสัมผัสและเชื่อมต่อคอมพิวเตอร์ผ่าน USB/LAN",
      features: ["190 - 1,100 nm", "Double Beam", "Bandwidth 1.0 nm", "จอสัมผัสในตัว"],
      departmentUse: "สำหรับวิเคราะห์ทางเคมี งานวิจัยยา และการตรวจวิเคราะห์สิ่งแวดล้อม",
    },
    {
      id: "bb-6",
      sourceKey: "budget_bureau",
      sourceName: "สำนักงบประมาณ",
      sourceEdition: "บัญชีราคามาตรฐานครุภัณฑ์ สำนักงบประมาณ (ฉบับ เมษายน 2569)",
      category: "ครุภัณฑ์สำนักงาน",
      code: "BB-2569-OFF-01",
      name: "เครื่องพิมพ์เลเซอร์มัลติฟังก์ชันขาว-ดำ (Multi-function Laser Printer)",
      price: 18900,
      unit: "เครื่อง",
      page: "88",
      itemNo: "2.4.1",
      spec: "พิมพ์ สแกน ถ่ายเอกสาร แฟกซ์, ความเร็วพิมพ์ไม่น้อยกว่า 35 หน้า/นาที, ความละเอียด 1200x1200 dpi, พิมพ์สองหน้าอัตโนมัติ (Duplex), รองรับ Network & Wi-Fi",
      features: ["35 ppm", "Auto Duplex", "Network/Wi-Fi", "ADF 50 แผ่น"],
      departmentUse: "สำหรับงานสารบรรณ งานบริหารสำนักงาน และจุดบริการร่วม",
    },

    // --- กระทรวงดิจิทัลเพื่อเศรษฐกิจและสังคม (MDES) ---
    {
      id: "mdes-1",
      sourceKey: "mdes",
      sourceName: "กระทรวงดิจิทัลฯ (MDES)",
      sourceEdition: "เกณฑ์ราคากลางและคุณลักษณะพื้นฐานครุภัณฑ์คอมพิวเตอร์ (ฉบับ พ.ศ. 2569)",
      category: "ครุภัณฑ์คอมพิวเตอร์",
      code: "MDES-2569-01",
      name: "เครื่องคอมพิวเตอร์พกพา (Notebook) สำหรับงานประมวลผล",
      price: 38000,
      unit: "เครื่อง",
      page: "18",
      itemNo: "2.1",
      spec: "หน้าจอขนาดไม่น้อยกว่า 14 นิ้ว FHD/IPS, CPU 8 Cores 16 Threads, RAM 16GB DDR5, SSD M.2 NVMe 512GB, GPU แยก VRAM ไม่น้อยกว่า 4GB, น้ำหนักรวมแบตเตอรี่ไม่เกิน 1.9 กก., รับประกัน 3 ปี Onsite",
      features: ["CPU 8C/16T", "RAM 16GB DDR5", "SSD 512GB", "GPU แยก 4GB", "น้ำหนัก < 1.9 kg"],
      departmentUse: "สำหรับอาจารย์ นักวิจัย และบุคลากรที่ต้องการประมวลผลนอกสถานที่",
    },
    {
      id: "mdes-2",
      sourceKey: "mdes",
      sourceName: "กระทรวงดิจิทัลฯ (MDES)",
      sourceEdition: "เกณฑ์ราคากลางและคุณลักษณะพื้นฐานครุภัณฑ์คอมพิวเตอร์ (ฉบับ พ.ศ. 2569)",
      category: "ครุภัณฑ์คอมพิวเตอร์",
      code: "MDES-2569-02",
      name: "เครื่องคอมพิวเตอร์พกพา (Notebook) สำหรับงานสำนักงาน",
      price: 21000,
      unit: "เครื่อง",
      page: "7",
      itemNo: "3.1",
      spec: "หน้าจอขนาดไม่น้อยกว่า 14 นิ้ว, CPU ไม่น้อยกว่า 4 Cores, RAM 16GB, SSD M.2 NVMe ไม่น้อยกว่า 500GB, น้ำหนักรวมแบตเตอรี่ไม่เกิน 1.6 กก., มี Wi-Fi 6 และ Bluetooth 5.2",
      features: ["CPU 4C", "RAM 16GB", "SSD 500GB", "น้ำหนัก < 1.6 kg"],
      departmentUse: "สำหรับงานบริหาร จัดการเรียนการสอน และงานสนับสนุนทั่วไป",
    },
    {
      id: "mdes-3",
      sourceKey: "mdes",
      sourceName: "กระทรวงดิจิทัลฯ (MDES)",
      sourceEdition: "เกณฑ์ราคากลางและคุณลักษณะพื้นฐานครุภัณฑ์คอมพิวเตอร์ (ฉบับ พ.ศ. 2569)",
      category: "ครุภัณฑ์คอมพิวเตอร์",
      code: "MDES-2569-SRV-01",
      name: "เครื่องแม่ข่าย (Server) แบบ Rack 1U หรือ 2U สำหรับงานทั่วไป",
      price: 125000,
      unit: "เครื่อง",
      page: "24",
      itemNo: "4.1",
      spec: "CPU Server-grade ไม่น้อยกว่า 16 Cores, RAM 64GB ECC DDR5, รองรับ Hot-plug Drive 4 ช่อง, SSD Enterprise 960GB x 2 (RAID 1), Redundant Power Supply 80 Plus Platinum",
      features: ["16 Cores ECC", "RAM 64GB ECC", "Dual Enterprise SSD", "Redundant PSU"],
      departmentUse: "สำหรับระบบฐานข้อมูล ระบบ Web App และเครื่องแม่ข่ายประจำภาควิชา",
    },
    {
      id: "mdes-4",
      sourceKey: "mdes",
      sourceName: "กระทรวงดิจิทัลฯ (MDES)",
      sourceEdition: "เกณฑ์ราคากลางและคุณลักษณะพื้นฐานครุภัณฑ์คอมพิวเตอร์ (ฉบับ พ.ศ. 2569)",
      category: "ครุภัณฑ์คอมพิวเตอร์",
      code: "MDES-2569-NET-01",
      name: "อุปกรณ์กระจายสัญญาณไร้สาย (Enterprise Wi-Fi 6 Access Point)",
      price: 15000,
      unit: "เครื่อง",
      page: "31",
      itemNo: "5.2",
      spec: "มาตรฐาน Wi-Fi 6 (802.11ax), Dual-band 2.4/5GHz, รองรับ Concurrent Clients ไม่น้อยกว่า 250 อุปกรณ์, รองรับ PoE+ (802.3at), มีระบบ Centralized Cloud Management",
      features: ["Wi-Fi 6 (802.11ax)", "250+ Clients", "PoE+ Support", "Centralized Management"],
      departmentUse: "สำหรับห้องบรรยาย โถงกิจกรรม และพื้นที่การเรียนรู้ในคณะ",
    },

    // --- มหาวิทยาลัยขอนแก่น (KKU) ---
    {
      id: "kku-1",
      sourceKey: "kku",
      sourceName: "มหาวิทยาลัยขอนแก่น",
      sourceEdition: "แนวทางราคากลางและมาตรฐานครุภัณฑ์ มหาวิทยาลัยขอนแก่น (ปีงบประมาณ 2569)",
      category: "ครุภัณฑ์การศึกษา",
      code: "KKU-2569-AV-01",
      name: "จอสัมผัสอัจฉริยะเพื่อการเรียนการสอน (Interactive Smart Display 75 นิ้ว)",
      price: 95000,
      unit: "ชุด",
      page: "12",
      itemNo: "KKU-AV-01",
      spec: "จอแสดงผลขนาด 75 นิ้ว 4K UHD ความสว่าง 400 nits, ระบบสัมผัส 40 จุดพร้อมปากกา Stylus, มีกล้อง 4K และไมโครโฟน 8-Array ในตัว, ระบบปฏิบัติการ Android 13 + Windows Slot-in PC, รองรับการแคสต์จอไร้สายพร้อมกัน 4 จอ",
      features: ["จอ 75 นิ้ว 4K UHD", "กล้อง 4K & Mic Array", "Dual OS (Android+Win)", "Wireless Cast 4 จอ"],
      departmentUse: "สำหรับห้องบรรยาย Smart Classroom และห้องประชุมสัมมนาวิชาการ",
    },
    {
      id: "kku-2",
      sourceKey: "kku",
      sourceName: "มหาวิทยาลัยขอนแก่น",
      sourceEdition: "แนวทางราคากลางและมาตรฐานครุภัณฑ์ มหาวิทยาลัยขอนแก่น (ปีงบประมาณ 2569)",
      category: "ครุภัณฑ์คอมพิวเตอร์",
      code: "KKU-2569-AI-01",
      name: "เครื่องคอมพิวเตอร์เวิร์กสเตชันสำหรับการคำนวณและปัญญาประดิษฐ์ (AI Workstation)",
      price: 50000,
      unit: "เครื่อง",
      page: "8",
      itemNo: "KKU-AI-01",
      spec: "CPU 16 Cores 32 Threads ความเร็ว Boost ไม่น้อยกว่า 5.0 GHz, RAM 64GB DDR5 5600MHz, SSD NVMe Gen4 2TB, GPU AI Acceleration ไม่น้อยกว่า 12GB VRAM GDDR6X, Power Supply 850W Gold",
      features: ["CPU 16C/32T", "RAM 64GB DDR5", "SSD 2TB Gen4", "GPU 12GB AI Accel", "PSU 850W Gold"],
      departmentUse: "สำหรับห้องปฏิบัติการวิจัย AI, Data Science และการประมวลผลแบบขนาน",
    },
    {
      id: "kku-3",
      sourceKey: "kku",
      sourceName: "มหาวิทยาลัยขอนแก่น",
      sourceEdition: "แนวทางราคากลางและมาตรฐานครุภัณฑ์ มหาวิทยาลัยขอนแก่น (ปีงบประมาณ 2569)",
      category: "ครุภัณฑ์วิทยาศาสตร์",
      code: "KKU-2569-LAB-02",
      name: "ตู้ดูดควันไอสารเคมีชนิดไร้ท่อ (Ductless Fume Hood)",
      price: 180000,
      unit: "เครื่อง",
      page: "28",
      itemNo: "LAB-CHEM-02",
      spec: "โครงสร้างทำจากโพลีโพรพิลีน ทนต่อสารเคมีกัดกร่อนสูง, หน้าบานเลื่อนกระจกนิรภัย, ระบบกรอง Activated Carbon และ HEPA Filter, มีระบบแจ้งเตือนเมื่อแผ่นกรองอิ่มตัว, หน้าจอดิจิทัลแสดงความเร็วลม",
      features: ["Ductless Design", "Carbon + HEPA", "เคมีทนทานสูง", "Airflow Alarm"],
      departmentUse: "สำหรับห้องปฏิบัติการเคมีอินทรีย์ และวิเคราะห์สารเคมีอันตราย",
    },
    {
      id: "kku-4",
      sourceKey: "kku",
      sourceName: "มหาวิทยาลัยขอนแก่น",
      sourceEdition: "แนวทางราคากลางและมาตรฐานครุภัณฑ์ มหาวิทยาลัยขอนแก่น (ปีงบประมาณ 2569)",
      category: "ครุภัณฑ์การศึกษา",
      code: "KKU-2569-AUD-01",
      name: "ชุดระบบเสียงดิจิทัลสำหรับห้องบรรยายขนาด 120 ที่นั่ง",
      price: 120000,
      unit: "ชุด",
      page: "34",
      itemNo: "AUD-120",
      spec: "Digital Signal Processor (DSP) พร้อมระบบ Acoustic Echo Cancellation (AEC), ลำโพง Column Array 2 ตู้, ไมโครโฟนไร้สาย UHF 2 แชนเนล พร้อมไมโครโฟนติดคอเสื้อ (Lavalier) สำหรับผู้สอน",
      features: ["DSP w/ AEC", "Column Array", "UHF Dual Mic", "Feedback Suppressor"],
      departmentUse: "สำหรับห้องเรียนรวมขนาดใหญ่ และห้องประชุมคณะ",
    },
  ];

  const categories = [
    { id: "all", label: "ทุกหมวดหมู่" },
    { id: "ครุภัณฑ์คอมพิวเตอร์", label: "คอมพิวเตอร์ & IT" },
    { id: "ครุภัณฑ์วิทยาศาสตร์", label: "วิทยาศาสตร์ & วิจัย" },
    { id: "ครุภัณฑ์การศึกษา", label: "การศึกษา & ห้องเรียน" },
    { id: "ครุภัณฑ์สำนักงาน", label: "สำนักงาน & บริหาร" },
  ];

  // Filter & Search Logic
  const filteredItems = useMemo(() => {
    return catalogDatabase.filter((item) => {
      // Catalog Source Filter
      if (activeCatalog !== "all" && item.sourceKey !== activeCatalog) {
        return false;
      }

      // Category Filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      // Search Filter
      if (search.trim() !== "") {
        const q = search.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(q);
        const matchCode = item.code.toLowerCase().includes(q);
        const matchSpec = item.spec.toLowerCase().includes(q);
        const matchSource = item.sourceName.toLowerCase().includes(q);
        const matchCategory = item.category.toLowerCase().includes(q);
        const matchItemNo = item.itemNo.toLowerCase().includes(q);
        if (!matchName && !matchCode && !matchSpec && !matchSource && !matchCategory && !matchItemNo) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name, "th");
      return 0;
    });
  }, [activeCatalog, selectedCategory, search, sortBy]);

  // Counts for tabs
  const countBB = catalogDatabase.filter((i) => i.sourceKey === "budget_bureau").length;
  const countMDES = catalogDatabase.filter((i) => i.sourceKey === "mdes").length;
  const countKKU = catalogDatabase.filter((i) => i.sourceKey === "kku").length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-heading font-bold text-slate-900">
            มาตรฐานและราคากลางอ้างอิงภาครัฐ
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            ค้นหา ตรวจสอบราคา และเอกสารอ้างอิงทางการจาก สำนักงบประมาณ, กระทรวง DE และ มข.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-3 py-1.5 rounded-full border border-indigo-100 flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ฐานข้อมูลมาตรฐาน 2569 มีผลบังคับใช้</span>
          </span>
        </div>
      </div>

      {/* Catalog Source Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
        <button
          onClick={() => setActiveCatalog("all")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeCatalog === "all"
              ? "border-indigo-600 bg-indigo-50/60 shadow-sm ring-1 ring-indigo-500/30"
              : "border-slate-200 bg-white hover:bg-slate-50 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-900">ทั้งหมดทุกแหล่ง</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold">
              {catalogDatabase.length} รายการ
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            รวมข้อมูลจากทั้ง 3 ฐานข้อมูลหลัก
          </p>
        </button>

        <button
          onClick={() => setActiveCatalog("budget_bureau")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeCatalog === "budget_bureau"
              ? "border-indigo-600 bg-indigo-50/60 shadow-sm ring-1 ring-indigo-500/30"
              : "border-slate-200 bg-white hover:bg-slate-50 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-900">สำนักงบประมาณ</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
              {countBB} รายการ
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            บัญชีราคามาตรฐานครุภัณฑ์ภาครัฐ (เม.ย. 2569)
          </p>
        </button>

        <button
          onClick={() => setActiveCatalog("mdes")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeCatalog === "mdes"
              ? "border-indigo-600 bg-indigo-50/60 shadow-sm ring-1 ring-indigo-500/30"
              : "border-slate-200 bg-white hover:bg-slate-50 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-900">กระทรวงดิจิทัลฯ (MDES)</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold">
              {countMDES} รายการ
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            เกณฑ์ราคากลางและคุณลักษณะคอมพิวเตอร์ 2569
          </p>
        </button>

        <button
          onClick={() => setActiveCatalog("kku")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            activeCatalog === "kku"
              ? "border-indigo-600 bg-indigo-50/60 shadow-sm ring-1 ring-indigo-500/30"
              : "border-slate-200 bg-white hover:bg-slate-50 shadow-xs"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-900">มหาวิทยาลัยขอนแก่น</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold">
              {countKKU} รายการ
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            บัญชีราคากลางและมาตรฐาน มข. 2569
          </p>
        </button>
      </div>

      {/* Search, Filter Bar & Sort Controls */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full sm:flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาชื่อรายการ, รหัสพัสดุ (เช่น BB-2569, MDES, KKU), สเปกหลัก..."
              className="w-full text-sm pl-9 pr-9 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 bg-slate-50/40 hover:bg-white transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center space-x-2 w-full sm:w-auto shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="default">เรียงตามความเกี่ยวข้อง</option>
              <option value="price_asc">ราคา: ต่ำไปสูง</option>
              <option value="price_desc">ราคา: สูงไปต่ำ</option>
              <option value="name">ชื่อรายการ (ก-ฮ)</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-semibold flex items-center space-x-1 shrink-0 mr-1">
            <Filter className="w-3 h-3" />
            <span>หมวด:</span>
          </span>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all shrink-0 ${
                selectedCategory === c.id
                  ? "bg-indigo-600 text-white font-bold shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
              }`}
            >
              {c.label}
            </button>
          ))}
          {(search || selectedCategory !== "all" || activeCatalog !== "all") && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
                setActiveCatalog("all");
                setSortBy("default");
              }}
              className="px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-bold shrink-0 flex items-center space-x-1 ml-auto"
            >
              <X className="w-3 h-3" />
              <span>ล้างตัวกรองทั้งหมด</span>
            </button>
          )}
        </div>
      </div>

      {/* Result Status Bar */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          พบข้อมูลทั้งหมด <strong className="text-indigo-600 font-bold">{filteredItems.length}</strong> รายการ
          {search && ` ที่ตรงกับ "${search}"`}
        </span>
        <span>มาตรฐานปีงบประมาณ 2569</span>
      </div>

      {/* Catalogs Item Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-base text-slate-800">
            ไม่พบรายการมาตรฐานที่ค้นหา
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            ลองปรับคำค้นหา หรือกดล้างตัวกรองเพื่อดูรายการมาตรฐานทั้งหมดในระบบ
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("all");
              setActiveCatalog("all");
            }}
            className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-xl hover:bg-indigo-100 transition-colors"
          >
            แสดงรายการทั้งหมด
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 hover:border-indigo-300 group"
            >
              <div>
                {/* Badge and Page info */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100/80">
                      {item.code}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-medium">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-slate-400 text-xs font-mono">
                    หน้า {item.page} • ข้อ {item.itemNo}
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-heading font-bold text-sm text-slate-900 mt-2.5 group-hover:text-indigo-600 transition-colors leading-snug">
                  {item.name}
                </h3>

                {/* Spec Summary */}
                <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                  {item.spec}
                </p>

                {/* Key feature pills */}
                {item.features && item.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.features.map((f, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-slate-50 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                      >
                        ✓ {f}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Price & Source Bottom */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block font-medium">
                    ราคามาตรฐานต่อหน่วย ({item.unit})
                  </span>
                  <span className="text-lg font-heading font-bold text-slate-900">
                    {item.price.toLocaleString()}{" "}
                    <span className="text-xs font-normal text-slate-500">บาท</span>
                  </span>
                </div>

                <button
                  onClick={() => setSelectedItem(item)}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-indigo-50 text-indigo-600 border border-slate-200 hover:border-indigo-200 text-xs font-bold transition-colors flex items-center space-x-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>ดูรายละเอียด</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100">
                  {selectedItem.code}
                </span>
                <h3 className="text-base font-heading font-bold text-slate-900 mt-2">
                  {selectedItem.name}
                </h3>
                <span className="text-xs text-slate-400 mt-0.5 block">
                  {selectedItem.category} • อ้างอิง หน้า {selectedItem.page} ข้อ {selectedItem.itemNo}
                </span>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">แหล่งอ้างอิงทางการ:</span>
                <span className="font-bold text-indigo-700">{selectedItem.sourceName}</span>
              </div>
              <p className="text-xs text-slate-600 font-medium">{selectedItem.sourceEdition}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                คุณลักษณะเฉพาะ (Specification)
              </h4>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed space-y-2">
                <p>{selectedItem.spec}</p>
                {selectedItem.departmentUse && (
                  <p className="pt-2 border-t border-slate-100 text-indigo-900 font-medium">
                    💡 การนำไปใช้งาน: {selectedItem.departmentUse}
                  </p>
                )}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-800 font-medium block">
                  ราคามาตรฐานภาครัฐที่กำหนด
                </span>
                <span className="text-xl font-heading font-bold text-emerald-700">
                  {selectedItem.price.toLocaleString()} บาท / {selectedItem.unit}
                </span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-200 text-emerald-900 font-bold">
                ✓ มีผลบังคับใช้ 2569
              </span>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
