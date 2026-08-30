import React from "react";
import { redirect } from "next/navigation";
import { AdminControlCenter } from "@/components/admin/AdminControlCenter";
import { getCurrentUser } from "@/lib/auth/auth-options";

export default async function AdminPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (
    user.role !== "ADMIN" &&
    user.role !== "PLAN_ADMIN" &&
    user.role !== "FINANCE_PROCUREMENT" &&
    user.role !== "APPROVER"
  ) {
    redirect("/requests");
  }

  return <AdminControlCenter />;
}
