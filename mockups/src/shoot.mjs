// Exports PNG screenshots of every mockup page at each breakpoint into mockups/screenshots.
// Usage: node src/shoot.mjs [--scale=2]
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "screenshots");
mkdirSync(out, { recursive: true });
// Phone shots at 2x (780px-wide PNG) for crisp review; desktop full pages at 1x to keep files manageable.
const override = process.argv.find((a) => a.startsWith("--scale="));
const scaleFor = (w) => (override ? Number(override.split("=")[1]) : w === 390 ? 2 : 1);

const PAGES = ["design-system", "home"];
const WIDTHS = [390, 1440];

const browser = await chromium.launch();
for (const slug of PAGES) {
  for (const width of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, deviceScaleFactor: scaleFor(width) });
    const page = await ctx.newPage();
    const url = pathToFileURL(join(root, "dist", `${slug}.html`)).href;
    // Full page without the cookie banner…
    await page.goto(url + "?consent=1", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    // load lazy images: scroll through the page, then wait for every image to decode
    // (images in a horizontal carousel never intersect, so switch them to eager and wait, with a timeout)
    await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = "eager")));
    await page.evaluate(() => Promise.race([
      Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; })))),
      new Promise((r) => setTimeout(r, 5000)),
    ]));
    await page.screenshot({ path: join(out, `${slug}-${width}.png`), fullPage: true });
    // …and the first screen as a first-time visitor sees it (with the banner).
    if (slug === "home") {
      await page.goto(url, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: join(out, `${slug}-${width}-first-visit.png`) });
    }
    await ctx.close();
    console.log(`shot ${slug} @ ${width}`);
  }
}
await browser.close();
