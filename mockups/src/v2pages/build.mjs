// Builds the v2 page templates (trolley collection + trolley product) into mockups/dist/concepts
// and exports full-page PNGs at 390px and 1440px.  Usage: node src/v2pages/build.mjs [--shoot]
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";
import { collection, product } from "./pages.mjs";
import { customClubs } from "./clubs.mjs";
import { membership } from "./members.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const out = join(root, "dist/concepts");
const css = join(root, "assets/css/concepts");
mkdirSync(join(out, "assets/css/concepts"), { recursive: true });
// one stylesheet: the v2 homepage styles plus the page-template styles
writeFileSync(join(out, "assets/css/concepts/v2pages.css"), readFileSync(join(css, "showroomplus2.css"), "utf8") + "\n" + readFileSync(join(css, "v2pages-extra.css"), "utf8"));

export const PAGES = [
  { slug: "v2-trolleys", title: "Trolley collection", html: collection() },
  { slug: "v2-trolleys-filters", title: "Trolley collection, filters open (phone)", html: collection({ drawer: true }), only: [390], viewport: true },
  { slug: "v2-m5-gps-dhc", title: "Trolley product page", html: product() },
  { slug: "v2-m5-gps-dhc-first", title: "Trolley product page, first screen with sticky bar (phone)", html: product({ firstScreen: true }), only: [390], viewport: true },
  { slug: "v2-custom-clubs", title: "Custom club builder landing", html: customClubs() },
  { slug: "v2-membership", title: "Membership", html: membership() },
];
for (const p of PAGES) writeFileSync(join(out, `${p.slug}.html`), p.html);
console.log("built", PAGES.map((p) => p.slug).join(", "));

if (process.argv.includes("--shoot")) {
  const { chromium } = createRequire(import.meta.url)("playwright");
  const shots = join(root, "screenshots/concepts");
  mkdirSync(shots, { recursive: true });
  const b = await chromium.launch();
  for (const p of PAGES) for (const w of p.only || [390, 1440]) {
    const ctx = await b.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, deviceScaleFactor: w === 390 ? 2 : 1 });
    const pg = await ctx.newPage();
    await pg.goto(pathToFileURL(join(out, `${p.slug}.html`)).href + (p.viewport ? "?consent=1" : "?consent=1&shot=1"), { waitUntil: "networkidle" });
    await pg.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach((i) => (i.loading = "eager")));
    await pg.evaluate(() => Promise.race([Promise.all([...document.images].map((i) => (i.complete ? null : new Promise((r) => { i.onload = i.onerror = r; })))), new Promise((r) => setTimeout(r, 5000))]));
    await pg.evaluate(() => document.fonts.ready);
    await pg.screenshot({ path: join(shots, `${p.slug}-${w}.png`), fullPage: !p.viewport });
    const of = await pg.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    console.log(`shot ${p.slug} @${w}${of > 0 ? `  !! overflow ${of}px` : ""}`);
    await ctx.close();
  }
  await b.close();
}
