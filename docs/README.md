# 📚 ศูนย์รวมเอกสารและคู่มือการใช้งาน SpecWise AI
### AI Intelligent Asset Budget & Specification Assistant • Khon Kaen University

ยินดีต้อนรับสู่ศูนย์รวมคู่มือการใช้งานระบบ **SpecWise AI** ระบบผู้ช่วยอัจฉริยะสำหรับจัดทำคำของบประมาณและสเปกครุภัณฑ์ มหาวิทยาลัยขอนแก่น (KKU AI Hackathon 2026)

---

## 📖 เอกสารคู่มือการใช้งาน (Manuals & Guides)

| คู่มือ | กลุ่มเป้าหมาย | รายละเอียดเนื้อหา | ลิงก์เอกสาร |
| :--- | :--- | :--- | :---: |
| 📘 **คู่มือสำหรับผู้ใช้งานทั่วไป (User Manual)** | อาจารย์, นักวิจัย, เจ้าหน้าที่โครงการ, ผู้ตรวจระดับภาควิชา, คณบดี/ผู้บริหาร | - การเข้าสู่ระบบด้วย KKU SSONext<br>- ขั้นตอนการสร้างคำของบประมาณด้วย AI (6+3 ขั้นตอน)<br>- การแมตช์บัญชีมาตรฐาน และตรวจราคา 4 แหล่ง<br>- การร่างแบบฟอร์ม 8 ส่วน และร่างสเปกที่ไม่ล็อกแบรนด์<br>- การติดตามสถานะและการส่งออก PDF/Excel | [อ่านคู่มือผู้ใช้งาน](USER_MANUAL.md) |
| 🛠️ **คู่มือสำหรับผู้ดูแลระบบ (Admin Manual)** | เจ้าหน้าที่พัสดุ กองคลังฯ, เจ้าหน้าที่แผน, ผู้ดูแลระบบไอที | - การใช้งาน Admin Control Center 6 มิติ<br>- ระบบคิวตรวจสอบอัจฉริยะ (Smart Review Queue: High/Med/Low Risk)<br>- การจัดการและอัปเดตบัญชีราคามาตรฐาน (สงป., DE, มข.)<br>- เครื่องมือเทียบเคียง TOR และ Spec Linter<br>- การตรวจสอบสถานะการเชื่อมต่อ AI IntelSphere & APIs<br>- การกำกับดูแลสิทธิ์ RBAC และ Audit Logs | [อ่านคู่มือผู้ดูแลระบบ](ADMIN_MANUAL.md) |

---

## 📸 แกลเลอรีภาพหน้าจอระบบ (System Screenshots)

ภาพหน้าจอทั้งหมดถูกจับภาพความละเอียดสูงจากระบบจริง และจัดเก็บไว้ในโฟลเดอร์ [`docs/images/`](./images/):

```
docs/images/
├── 01-login-screen.png                     # หน้าจอเข้าสู่ระบบ & Sandbox Switcher
├── 02-dashboard-requests.png               # หน้าแดชบอร์ดรายการคำขอ & ตัวกรอง
├── 03-wizard-step1-intent.png              # ขั้นตอนที่ 1: ระบุความต้องการ
├── 04-wizard-step2-catalog-match.png       # ขั้นตอนที่ 2: แมตช์บัญชีมาตรฐานครุภัณฑ์
├── 05-wizard-step3-price-crosscheck.png    # ขั้นตอนที่ 3: ตรวจสอบราคา 4 แหล่ง
├── 06-wizard-step4-budget-alert.png        # ขั้นตอนที่ 4: ตรวจสอบความเสี่ยง & แจ้งเตือน
├── 07-wizard-step5-proposal-draft.png      # ขั้นตอนที่ 5: ร่างแบบฟอร์ม 8 ส่วน
├── 08-wizard-step6-neutral-spec.png        # ขั้นตอนที่ 6: ร่างสเปกเป็นกลาง ไม่ล็อกแบรนด์
├── 09-wizard-step7-tor-compare.png         # ขั้นตอนที่ 7: เครื่องมือเทียบเคียง TOR
├── 10-wizard-step8-attachments.png         # ขั้นตอนที่ 8: แนบเอกสาร & รวมไฟล์ PDF
├── 11-wizard-step9-review-submit.png       # ขั้นตอนที่ 9: ตรวจทาน & ยืนยันส่งคำขอ
├── 12-request-detail.png                   # หน้ารายละเอียดคำขอ & ส่งออกเอกสาร
├── 13-catalogs-search.png                  # คลังบัญชีราคามาตรฐานและการค้นหา
├── 14-reports-analytics.png                # รายงานสถิติและผลการวิเคราะห์
├── 15-notifications.png                    # ศูนย์การแจ้งเตือน
├── 16-settings.png                         # การตั้งค่าผู้ใช้และระบบ
├── 17-admin-control-center.png             # หน้าจอหลัก Admin Control Center
├── 18-admin-smart-review-queue.png         # คิวตรวจสอบอัจฉริยะสำหรับพัสดุ
├── 19-admin-catalog-management.png         # การจัดการบัญชีราคามาตรฐาน
├── 20-admin-tor-benchmarking.png           # ระบบเทียบเคียง TOR ย้อนหลัง
├── 21-admin-data-source-monitoring.png     # ตรวจสอบสถานะ API และ AI
└── 22-admin-governance-audit-log.png       # สิทธิ์และการตรวจสอบความโปร่งใส
```

---

## 🔄 คำสั่งอัปเดตภาพหน้าจออัตโนมัติ (Automated Screenshot Capture)

หากมีการปรับปรุงหน้าตาหรือฟังก์ชันของระบบ สามารถสั่งรันสคริปต์เพื่ออัปเดตภาพหน้าจอทั้งหมดได้ด้วยคำสั่งเดียว:

```bash
node scripts/capture-manual-screenshots.mjs
```

---
*SpecWise AI • KKU AI Hackathon 2026 • Khon Kaen University*
