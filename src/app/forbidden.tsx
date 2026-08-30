"use client";

import React from "react";
import { ErrorState } from "@/components/common/ErrorState";

export default function Forbidden() {
  return (
    <div className="py-8 sm:py-12 px-4">
      <ErrorState
        type="403"
        title="สิทธิ์การเข้าถึงไม่เพียงพอ (403 Forbidden)"
        description="คุณไม่มีสิทธิ์ในการเข้าถึงหน้าหรือข้อมูลส่วนนี้ กรุณาตรวจสอบสิทธิ์การใช้งานของท่าน หากท่านต้องการเข้าถึงพื้นที่เฉพาะ (เช่น งานแผน/ผู้ดูแลระบบ/ผู้อนุมัติ) กรุณาสลับบทบาทจากแถบเมนูด้านบน หรือติดต่อผู้ดูแลระบบ"
        showHomeButton={true}
        showSearch={false}
        showHelpdesk={true}
      />
    </div>
  );
}
