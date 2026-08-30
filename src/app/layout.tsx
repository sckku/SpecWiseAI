import type { Metadata } from "next";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";

export const metadata: Metadata = {
  title: "SpecWise AI — ผู้ช่วยวิเคราะห์คำของบประมาณและสเปกครุภัณฑ์ มหาวิทยาลัยขอนแก่น",
  description:
    "ระบบ AI อัจฉริยะวิเคราะห์คำของบลงทุน ตรวจสอบราคากลาง 4 ฐาน ป้องกันการล็อคสเปก และร่างเอกสาร 8 หมวดหมู่ตามแบบฟอร์ม มข.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
