import React, { Suspense } from "react";
import { ComprehensiveWizard } from "@/components/wizard/ComprehensiveWizard";
import { Loader2 } from "lucide-react";

export default function NewRequestPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-slate-400 flex items-center justify-center space-x-2">
          <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
          <span>กำลังโหลดระบบ AI Wizard...</span>
        </div>
      }
    >
      <ComprehensiveWizard />
    </Suspense>
  );
}
