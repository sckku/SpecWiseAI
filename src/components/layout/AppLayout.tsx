"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";
import { MobileNavigation } from "./MobileNavigation";
import { KKUUserSession } from "@/types/auth";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [currentUser, setCurrentUser] = useState<KKUUserSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/mock-switch")
      .then((res) => res.json())
      .then((data) => {
        if (data.currentUser) {
          setCurrentUser(data.currentUser);
        } else if (data.availableRoles && data.availableRoles.length > 0) {
          setCurrentUser(data.availableRoles[0]);
        }
      })
      .catch(console.error);
  }, []);

  const handleRoleChange = async (roleKey: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/mock-switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: roleKey }),
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentUser(data.user);
        window.location.reload();
      }
    } catch (err) {
      console.error("Failed to switch role:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Fixed Left Sidebar */}
      <Sidebar currentUser={currentUser} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader
          currentUser={currentUser}
          onRoleChange={handleRoleChange}
          isLoading={isLoading}
        />
        <main className="mx-auto w-full max-w-7xl flex-1 overflow-x-hidden px-4 py-4 pb-24 sm:px-6 sm:py-6 sm:pb-24 md:p-6 md:pb-6 xl:p-8 xl:pb-8">
          {children}
        </main>
      </div>
      <MobileNavigation currentUser={currentUser} />
    </div>
  );
}
