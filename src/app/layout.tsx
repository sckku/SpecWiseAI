import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

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
      <body className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>
        <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4">
            <p className="font-heading font-medium text-slate-700">
              SpecWise AI © 2026 — Khon Kaen University AI Hackathon 2026
            </p>
            <p className="mt-1">
              ระบบวิเคราะห์งบประมาณและคุณลักษณะเฉพาะครุภัณฑ์ภาครัฐ สอดคล้องตาม พ.ร.บ. จัดซื้อจัดจ้างฯ 2560
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
