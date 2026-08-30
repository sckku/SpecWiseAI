"use client";

import React, { useEffect } from "react";
import { ServerCrash, RotateCcw, Home } from "lucide-react";

export default function RootGlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("SpecWise AI Critical Root Layout Error:", error);
  }, [error]);

  const referenceId =
    error?.digest ||
    `ERR-ROOT-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

  return (
    <html lang="th">
      <head>
        <title>เกิดข้อผิดพลาดร้ายแรง — SpecWise AI KKU</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;600;700;800&display=swap"
        />
      </head>
      <body
        style={{
          fontFamily: "'Sarabun', system-ui, sans-serif",
          backgroundColor: "#F8FAFC",
          color: "#0F172A",
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "640px",
            width: "90%",
            margin: "40px auto",
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            border: "1px solid #E2E8F0",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            padding: "40px 32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              margin: "0 auto 20px auto",
              backgroundColor: "#FFF1F2",
              border: "2px solid #FECDD3",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#E11D48",
            }}
          >
            <ServerCrash style={{ width: "36px", height: "36px" }} />
          </div>

          <div
            style={{
              display: "inline-block",
              backgroundColor: "#F1F5F9",
              color: "#475569",
              fontSize: "12px",
              fontWeight: 700,
              padding: "4px 12px",
              borderRadius: "9999px",
              marginBottom: "16px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            500 • Critical System Error
          </div>

          <h1
            style={{
              fontSize: "24px",
              fontWeight: 800,
              color: "#0F172A",
              marginBottom: "12px",
              lineHeight: 1.3,
            }}
          >
            เกิดข้อผิดพลาดระดับโครงสร้างหลักของระบบ
          </h1>

          <p
            style={{
              fontSize: "14px",
              color: "#64748B",
              lineHeight: 1.6,
              marginBottom: "28px",
            }}
          >
            ระบบ SpecWise AI ไม่สามารถโหลดเค้าโครงหน้าหลักได้สมบูรณ์ กรุณากดปุ่มลองใหม่อีกครั้ง
            หรือกลับสู่หน้าเข้าสู่ระบบเพื่อเริ่มเซสชันใหม่
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
              marginBottom: "28px",
            }}
          >
            <button
              onClick={() => reset()}
              style={{
                backgroundColor: "#9C3724",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "14px",
                padding: "10px 20px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <RotateCcw style={{ width: "16px", height: "16px" }} />
              ลองใหม่อีกครั้ง (Retry)
            </button>

            <a
              href="/"
              style={{
                backgroundColor: "#F8FAFC",
                color: "#334155",
                fontWeight: 700,
                fontSize: "14px",
                padding: "10px 20px",
                borderRadius: "12px",
                border: "1px solid #CBD5E1",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Home style={{ width: "16px", height: "16px" }} />
              หน้าแรก (Home)
            </a>
          </div>

          <div
            style={{
              backgroundColor: "#F8FAFC",
              borderRadius: "12px",
              padding: "12px 16px",
              fontSize: "12px",
              color: "#64748B",
              textAlign: "left",
              border: "1px solid #E2E8F0",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Incident ID:</span>
              <strong style={{ fontFamily: "monospace", color: "#9C3724" }}>
                {referenceId}
              </strong>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
