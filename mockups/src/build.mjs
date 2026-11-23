// Builds the static mockups into mockups/dist.
// Each page is one responsive HTML file, plus a frame file per breakpoint
// (e.g. home-390.html, home-1440.html) for side-by-side review in a desktop browser.
import { mkdirSync, writeFileSync, cpSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import home from "./pages/home.mjs";
import designSystem from "./pages/design-system.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

export const PAGES = [
  { slug: "design-system", title: "Design system", render: designSystem },
  { slug: "home", title: "Homepage", render: home },
];
export const BREAKPOINTS = [390, 1440];

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });
cpSync(join(root, "assets"), join(dist, "assets"), { recursive: true });

const frame = (p, w) => `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow">
<title>${p.title} at ${w}px | Evolution Golf mockups</title>
<style>body{margin:0;background:#e9eeeb;font:14px/1.4 system-ui,sans-serif;color:#111816}header{padding:12px 20px;background:#0a3a28;color:#fff;display:flex;gap:16px;align-items:center;flex-wrap:wrap}header a{color:#fff}
iframe{display:block;margin:24px auto;border:0;background:#fff;box-shadow:0 8px 32px rgba(0,0,0,.18);width:${w}px;height:calc(100vh - 100px)}</style></head>
<body><header><strong>${p.title} · ${w}px</strong>${BREAKPOINTS.map((b) => `<a href="${p.slug}-${b}.html">${b}px</a>`).join("")}<a href="${p.slug}.html?consent=1">Open full page</a><a href="index.html">All mockups</a></header>
<iframe src="${p.slug}.html" title="${p.title} at ${w} pixels wide"></iframe></body></html>`;

for (const p of PAGES) {
  writeFileSync(join(dist, `${p.slug}.html`), p.render());
  for (const w of BREAKPOINTS) writeFileSync(join(dist, `${p.slug}-${w}.html`), frame(p, w));
}

writeFileSync(join(dist, "index.html"), `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex, nofollow">
<title>Evolution Golf mockups</title><link rel="stylesheet" href="assets/css/tokens.css"><link rel="stylesheet" href="assets/css/components.css"></head>
<body><main class="container section"><p class="eyebrow">Phase 2 · Batch 1</p><h1 class="t-h1">Evolution Golf mockups</h1>
<p class="t-lead" style="margin-top:12px">Static HTML/CSS mockups built from the design system and a read-only snapshot of Shopify product data.</p>
<ul style="margin-top:32px;display:grid;gap:16px;list-style:none">${PAGES.map((p) => `<li class="card"><div class="card__body"><h2 class="t-h3">${p.title}</h2><p class="btn-row">${BREAKPOINTS.map((w) => `<a class="btn btn--secondary" href="${p.slug}-${w}.html">${w}px</a>`).join("")}<a class="btn btn--text" href="${p.slug}.html">Responsive page</a></p></div></li>`).join("")}</ul></main></body></html>`);

console.log(`Built ${PAGES.length} pages × ${BREAKPOINTS.length} breakpoints into ${dist}`);
