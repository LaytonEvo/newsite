// Builds the homepage concepts into mockups/dist/concepts.
// Usage: node src/concepts/build.mjs
import { mkdirSync, writeFileSync, cpSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { CONCEPTS } from "./registry.mjs";
import { sheet } from "./sheet.mjs";
import { compare } from "./compare.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const out = join(root, "dist/concepts");
mkdirSync(out, { recursive: true });
cpSync(join(root, "assets"), join(out, "assets"), { recursive: true });
// comparison page thumbnails live beside the screenshots
const shots = join(root, "screenshots/concepts");
if (existsSync(shots)) cpSync(shots, join(out, "shots"), { recursive: true });

for (const c of CONCEPTS) {
  writeFileSync(join(out, `${c.id}.html`), c.render());
  c.specimens?.();
  writeFileSync(join(out, `${c.id}-sheet.html`), sheet(c));
  for (const w of [390, 1440]) {
    writeFileSync(join(out, `${c.id}-${w}.html`), `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow"><title>${c.name} at ${w}px</title>
<style>body{margin:0;background:#2a2a2a;font:14px system-ui;color:#fff}header{padding:10px 16px;display:flex;gap:16px;flex-wrap:wrap}a{color:#fff}iframe{display:block;margin:0 auto 24px;border:0;background:#fff;width:${w}px;height:calc(100vh - 60px)}</style></head>
<body><header><strong>${c.name} · ${w}px</strong><a href="${c.id}-390.html">390px</a><a href="${c.id}-1440.html">1440px</a><a href="${c.id}-sheet.html">Design sheet</a><a href="index.html">Compare all</a></header><iframe src="${c.id}.html" title="${c.name} homepage at ${w} pixels"></iframe></body></html>`);
  }
}
writeFileSync(join(out, "index.html"), compare(CONCEPTS));
console.log(`Built ${CONCEPTS.length} concepts into ${out}`);
