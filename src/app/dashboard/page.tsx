import { ExecutiveDashboard } from "@/components/dashboard/ExecutiveDashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "หน้าหลัก (Dashboard) — SpecWise AI",
  description:
    "แดชบอร์ดภาพรวมการจัดทำคำของบประมาณและสเปกครุภัณฑ์ มหาวิทยาลัยขอนแก่น พร้อมระบบวิเคราะห์ AI 6 สเต็ป",
};

export default function DashboardPage() {
  return <ExecutiveDashboard />;
}
