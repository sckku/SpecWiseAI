"use client";

import React, { useEffect } from "react";
import { ErrorState } from "@/components/common/ErrorState";

export default function GlobalRouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console or remote monitoring
    console.error("SpecWise AI Route Exception:", error);
  }, [error]);

  return (
    <div className="py-8 sm:py-12 px-4">
      <ErrorState
        type="500"
        error={error}
        incidentId={error.digest}
        onRetry={() => reset()}
        title="เกิดข้อผิดพลาดในการประมวลผลของระบบ (Application Error)"
        description="ระบบพบข้อผิดพลาดที่ไม่สามารถประมวลผลต่อได้ ข้อมูลคำขอของคุณในหน้าก่อนหน้าได้รับการบันทึกไว้ในหน่วยความจำชั่วคราว คุณสามารถลองใหม่อีกครั้ง หรือกลับสู่หน้าหลัก"
        showHomeButton={true}
        showSearch={false}
        showHelpdesk={true}
      />
    </div>
  );
}
