// Full-page PNGs of each concept at 390px (2x) and 1440px (1x), plus small thumbnails for the comparison page.
// Usage: node src/concepts/shoot.mjs [id ...]
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { CONCEPTS } from "./registry.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const out = join(root, "screenshots/concepts");
mkdirSync(out, { recursive: true });
const only = process.argv.slice(2);
const pages = [...CONCEPTS.map((c) => c.id).filter((id) => !only.length || only.includes(id)).flatMap((id) => [id, `${id}-sheet`])];
if (only.includes("index")) pages.push("index");

const browser = await chromium.launch();
for (const slug of pages) {
  const widths = slug.endsWith("-sheet") || slug === "index" ? [1440] : [390, 1440];
  for (const width of widths) {
    const ctx = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, deviceScaleFactor: width === 390 ? 2 : 1 });
    const page = await ctx.newPage();
    await page.goto(pathToFileURL(join(root, "dist/concepts", `${slug}.html`)).href + "?consent=1&shot=1", { waitUntil: "networkidle" });
    await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = "eager")));
    await page.evaluate(() => Promise.race([Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; })))), new Promise((r) => setTimeout(r, 5000))]));
    await page.evaluate(() => document.fonts.ready);
    const name = slug.endsWith("-sheet") || slug === "index" ? `${slug}.png` : `${slug}-${width}.png`;
    await page.screenshot({ path: join(out, name), fullPage: true });
    if (!slug.endsWith("-sheet") && slug !== "index") {
      // thumbnail of the full page for the comparison view
      const thumb = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, deviceScaleFactor: width === 390 ? 0.5 : 0.25 });
      const tp = await thumb.newPage();
      await tp.goto(pathToFileURL(join(root, "dist/concepts", `${slug}.html`)).href + "?consent=1&shot=1", { waitUntil: "networkidle" });
      await tp.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = "eager")));
      await tp.waitForTimeout(600);
      await tp.screenshot({ path: join(out, `${slug}-${width}-thumb.png`), fullPage: true });
      await thumb.close();
    }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    console.log(`shot ${slug} @${width}${overflow > 0 ? `  !! horizontal overflow ${overflow}px` : ""}`);
    await ctx.close();
  }
}
await browser.close();
