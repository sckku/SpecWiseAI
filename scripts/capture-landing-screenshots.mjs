import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const artifactDir = "/home/chatparin/.gemini/antigravity-ide/brain/715ce45f-90d2-4baa-9e9b-5bcd4ea86d87";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  console.log("Navigating to Landing Page (http://localhost:8999/)...");
  await page.goto("http://localhost:8999/", { waitUntil: "load", timeout: 15000 });
  await page.waitForTimeout(2000);

  // 1. Take hero screenshot
  await page.screenshot({
    path: path.join(artifactDir, "landing_page_hero.png"),
    fullPage: false,
  });
  console.log("Captured landing_page_hero.png");

  // 2. Take features screenshot
  const featuresEl = page.locator("#features");
  if (await featuresEl.count() > 0) {
    await featuresEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(artifactDir, "landing_page_features.png"),
      fullPage: false,
    });
    console.log("Captured landing_page_features.png");
  }

  // 3. Take pipeline screenshot
  const pipelineEl = page.locator("#pipeline");
  if (await pipelineEl.count() > 0) {
    await pipelineEl.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(artifactDir, "landing_page_pipeline.png"),
      fullPage: false,
    });
    console.log("Captured landing_page_pipeline.png");
  }

  // 4. Test CTA button: Click on "เข้าสู่ระบบ / Dashboard"
  console.log("Testing CTA button: Clicking 'เข้าสู่ระบบ / เข้าสู่ Dashboard' in hero...");
  await page.goto("http://localhost:8999/", { waitUntil: "load", timeout: 15000 });
  await page.waitForTimeout(1000);
  const ctaBtn = page.locator('text="เข้าสู่ระบบ / เข้าสู่ Dashboard"').first();
  await ctaBtn.click();
  await page.waitForURL("**/dashboard", { timeout: 10000 });
  await page.waitForTimeout(2000);
  console.log("Successfully navigated to Dashboard at:", page.url());

  // Capture Dashboard page
  await page.screenshot({
    path: path.join(artifactDir, "dashboard_page.png"),
    fullPage: false,
  });
  console.log("Captured dashboard_page.png");

  await browser.close();
  console.log("All screenshots captured successfully!");
}

run().catch((err) => {
  console.error("Screenshot capture failed:", err);
  process.exit(1);
});
