import { LandingPage } from "@/components/landing/LandingPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SpecWise AI — ผู้ช่วยวิเคราะห์คำของบประมาณและสเปกครุภัณฑ์ มหาวิทยาลัยขอนแก่น",
  description:
    "ระบบ AI อัจฉริยะวิเคราะห์คำของบลงทุน ตรวจสอบราคากลาง 4 ฐาน ป้องกันการล็อคสเปก และร่างเอกสาร 8 หมวดหมู่ตามแบบฟอร์ม มข.",
};

export default function HomePage() {
  return <LandingPage />;
}
