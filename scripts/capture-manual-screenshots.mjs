import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const BASE_URL = "http://localhost:8999";
const OUTPUT_DIR = path.resolve(process.cwd(), "docs/images");
const PUBLIC_OUTPUT_DIR = path.resolve(process.cwd(), "public/docs/images");

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.mkdirSync(PUBLIC_OUTPUT_DIR, { recursive: true });

async function run() {
  console.log("🚀 Starting screenshot capture on", BASE_URL);
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();

  async function saveScreenshot(filename, options = {}) {
    const filePath = path.join(OUTPUT_DIR, filename);
    const publicPath = path.join(PUBLIC_OUTPUT_DIR, filename);
    await page.screenshot({ path: filePath, fullPage: options.fullPage || false });
    fs.copyFileSync(filePath, publicPath);
    console.log(`📸 Saved: ${filename}`);
  }

  // 1. Login Page
  console.log("Navigating to Login Page...");
  await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await saveScreenshot("01-login-screen.png");

  // Set Requester Cookie
  console.log("Setting Requester Session...");
  await context.addCookies([
    {
      name: "specwise_session_role",
      value: "requester",
      domain: "localhost",
      path: "/",
    },
  ]);

  // 2. Dashboard / Requests List
  console.log("Navigating to Requests Dashboard...");
  await page.goto(`${BASE_URL}/requests`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await saveScreenshot("02-dashboard-requests.png");

  // 3. Wizard Step 1: Intent
  console.log("Navigating to Wizard Step 1 (Intent)...");
  await page.goto(`${BASE_URL}/requests/new?step=1`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await saveScreenshot("03-wizard-step1-intent.png");

  // 4. Wizard Step 2: Catalog Match
  console.log("Navigating to Wizard Step 2 (Catalog Match)...");
  await page.goto(`${BASE_URL}/requests/new?step=2`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await saveScreenshot("04-wizard-step2-catalog-match.png");

  // 5. Wizard Step 3: Price Cross-Check
  console.log("Navigating to Wizard Step 3 (Price Cross-Check)...");
  await page.goto(`${BASE_URL}/requests/new?step=3`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await saveScreenshot("05-wizard-step3-price-crosscheck.png");

  // 6. Wizard Step 4: Budget Alert
  console.log("Navigating to Wizard Step 4 (Budget Alert)...");
  await page.goto(`${BASE_URL}/requests/new?step=4`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await saveScreenshot("06-wizard-step4-budget-alert.png");

  // 7. Wizard Step 5: Proposal Form Draft
  console.log("Navigating to Wizard Step 5 (Proposal Draft)...");
  await page.goto(`${BASE_URL}/requests/new?step=5`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await saveScreenshot("07-wizard-step5-proposal-draft.png");

  // 8. Wizard Step 6: Neutral Spec
  console.log("Navigating to Wizard Step 6 (Neutral Spec)...");
  await page.goto(`${BASE_URL}/requests/new?step=6`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await saveScreenshot("08-wizard-step6-neutral-spec.png");

  // 9. Wizard Step 7: TOR Comparison
  console.log("Navigating to Wizard Step 7 (TOR Comparison)...");
  await page.goto(`${BASE_URL}/requests/new?step=7`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await saveScreenshot("09-wizard-step7-tor-compare.png");

  // 10. Wizard Step 8: Attachments
  console.log("Navigating to Wizard Step 8 (Attachments)...");
  await page.goto(`${BASE_URL}/requests/new?step=8`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await saveScreenshot("10-wizard-step8-attachments.png");

  // 11. Wizard Step 9: Review & Submit
  console.log("Navigating to Wizard Step 9 (Review & Submit)...");
  await page.goto(`${BASE_URL}/requests/new?step=9`, { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);
  await saveScreenshot("11-wizard-step9-review-submit.png");

  // 12. Request Detail Page
  console.log("Navigating to Request Detail Page (req-001)...");
  await page.goto(`${BASE_URL}/requests/req-001`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await saveScreenshot("12-request-detail.png");

  // 13. Catalogs Page
  console.log("Navigating to Catalogs Search Page...");
  await page.goto(`${BASE_URL}/catalogs`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await saveScreenshot("13-catalogs-search.png");

  // 14. Reports Page
  console.log("Navigating to Reports Page...");
  await page.goto(`${BASE_URL}/reports`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await saveScreenshot("14-reports-analytics.png");

  // 15. Notifications Page
  console.log("Navigating to Notifications Page...");
  await page.goto(`${BASE_URL}/notifications`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await saveScreenshot("15-notifications.png");

  // 16. Settings Page
  console.log("Navigating to Settings Page...");
  await page.goto(`${BASE_URL}/settings`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await saveScreenshot("16-settings.png");

  // 16.1 In-App Manual Page
  console.log("Navigating to In-App Manual Page...");
  await page.goto(`${BASE_URL}/manual`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await saveScreenshot("23-manual-hub.png");

  // Switch to Admin Role
  console.log("Setting Admin Session...");
  await context.addCookies([
    {
      name: "specwise_session_role",
      value: "admin",
      domain: "localhost",
      path: "/",
    },
  ]);

  // 17. Admin Control Center - Full View
  console.log("Navigating to Admin Control Center...");
  await page.goto(`${BASE_URL}/admin`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await saveScreenshot("17-admin-control-center.png");

  // Focus sections in Admin Center
  // 18. Smart Review Queue (Section 2)
  console.log("Capturing Admin Smart Review Queue...");
  const cards = await page.$$(".grid.grid-cols-1 > div");
  if (cards.length >= 6) {
    await cards[1].screenshot({ path: path.join(OUTPUT_DIR, "18-admin-smart-review-queue.png") });
    fs.copyFileSync(path.join(OUTPUT_DIR, "18-admin-smart-review-queue.png"), path.join(PUBLIC_OUTPUT_DIR, "18-admin-smart-review-queue.png"));
    
    // 19. Catalog Management (Section 3)
    await cards[2].screenshot({ path: path.join(OUTPUT_DIR, "19-admin-catalog-management.png") });
    fs.copyFileSync(path.join(OUTPUT_DIR, "19-admin-catalog-management.png"), path.join(PUBLIC_OUTPUT_DIR, "19-admin-catalog-management.png"));

    // 20. TOR Benchmarking (Section 4)
    await cards[3].screenshot({ path: path.join(OUTPUT_DIR, "20-admin-tor-benchmarking.png") });
    fs.copyFileSync(path.join(OUTPUT_DIR, "20-admin-tor-benchmarking.png"), path.join(PUBLIC_OUTPUT_DIR, "20-admin-tor-benchmarking.png"));

    // 21. Data Sources (Section 5)
    await cards[4].screenshot({ path: path.join(OUTPUT_DIR, "21-admin-data-source-monitoring.png") });
    fs.copyFileSync(path.join(OUTPUT_DIR, "21-admin-data-source-monitoring.png"), path.join(PUBLIC_OUTPUT_DIR, "21-admin-data-source-monitoring.png"));

    // 22. Governance & Audit Log (Section 6)
    await cards[5].screenshot({ path: path.join(OUTPUT_DIR, "22-admin-governance-audit-log.png") });
    fs.copyFileSync(path.join(OUTPUT_DIR, "22-admin-governance-audit-log.png"), path.join(PUBLIC_OUTPUT_DIR, "22-admin-governance-audit-log.png"));
  }

  console.log("🎉 All screenshots captured and updated successfully!");
  await browser.close();
}

run().catch((err) => {
  console.error("Error capturing screenshots:", err);
  process.exit(1);
});
