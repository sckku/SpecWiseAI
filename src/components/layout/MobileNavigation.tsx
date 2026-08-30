"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  BarChart3,
  Bell,
  FileText,
  LayoutDashboard,
  Layers,
  Menu,
  Plus,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { KKUUserSession } from "@/types/auth";

interface MobileNavigationProps {
  currentUser: KKUUserSession | null;
}

const secondaryItems = [
  { label: "มาตรฐานและราคา", href: "/catalogs", icon: Layers },
  { label: "วิเคราะห์และรายงาน", href: "/reports", icon: BarChart3 },
  { label: "ตั้งค่า", href: "/settings", icon: Settings },
];

export function MobileNavigation({ currentUser }: MobileNavigationProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === "Tab") {
        const dialog = document.querySelector<HTMLElement>('[role="dialog"]');
        if (!dialog) return;
        const focusable = dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    const dialog = document.querySelector<HTMLElement>('[role="dialog"]');
    const firstFocusable = dialog?.querySelector<HTMLElement>('a[href], button:not([disabled])');
    firstFocusable?.focus();
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="เมนูหลัก">
          <button
            type="button"
            aria-label="ปิดเมนู"
            className="absolute inset-0 bg-slate-950/30 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-[min(86vw,22rem)] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 p-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-500 text-white">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-heading text-sm font-bold text-slate-900">SpecWise <span className="text-indigo-600">AI</span></p>
                  <p className="text-[10px] text-slate-400">เมนูระบบ</p>
                </div>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-xl p-2 text-slate-500 hover:bg-slate-100" aria-label="ปิดเมนู">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="เมนูเพิ่มเติม">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium ${isActive(item.href) ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-50"}`}>
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-slate-100 p-4">
              <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800"><Sparkles className="h-4 w-4 text-indigo-600" /> AI ช่วยคุณไปแล้ว</div>
                <p className="mt-1 text-[10px] text-slate-500">ประจำปีงบประมาณ 2570</p>
                <p className="mt-2 font-heading text-2xl font-bold text-indigo-600">161 <span className="font-sans text-xs font-normal text-slate-500">รายการ</span></p>
                <p className="mt-2 border-t border-indigo-100 pt-2 text-[10px] text-slate-500">{currentUser?.thaiName || "วรรณวิภา อ."}</p>
              </div>
            </div>
          </aside>
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-40 grid h-16 grid-cols-5 border-t border-slate-200 bg-white/95 px-1 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(15,23,42,0.08)] backdrop-blur-md md:hidden" aria-label="เมนูมือถือ">
        <Link href="/" className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium ${isActive("/") ? "text-indigo-600" : "text-slate-500"}`}><LayoutDashboard className="h-5 w-5" />หน้าหลัก</Link>
        <Link href="/requests" className={`flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium ${isActive("/requests") && pathname !== "/requests/new" ? "text-indigo-600" : "text-slate-500"}`}><FileText className="h-5 w-5" />คำขอ</Link>
        <Link href="/requests/new" className="-mt-5 flex flex-col items-center justify-center gap-0.5 text-[10px] font-bold text-indigo-600"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"><Plus className="h-6 w-6" /></span>สร้างคำขอ</Link>
        <Link href="/notifications" className={`relative flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium ${isActive("/notifications") ? "text-indigo-600" : "text-slate-500"}`}><Bell className="h-5 w-5" /><span className="absolute right-5 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />แจ้งเตือน</Link>
        <button ref={menuButtonRef} type="button" onClick={() => setIsOpen(true)} aria-expanded={isOpen} aria-haspopup="dialog" className="flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium text-slate-500"><Menu className="h-5 w-5" />เมนู</button>
      </nav>
    </>
  );
}
