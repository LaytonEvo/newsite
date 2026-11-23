// One design sheet per concept: rationale, palette, type, components, imagery, copy, trade-offs.
import { esc } from "./kit.mjs";

const lum = (hex) => { const c = hex.slice(1).match(/../g).map((h) => parseInt(h, 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

export const sheet = (c) => {
  const s = c.sheet;
  return `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow">
<title>${esc(c.name)}: design sheet</title>
<link rel="stylesheet" href="assets/css/concepts/${c.id}.css">
<style>
.sh{all:initial;display:block;background:#fff;color:#161616;font:15px/1.55 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;padding:40px clamp(16px,4vw,56px) 64px}
.sh *{box-sizing:border-box}
.sh h1{font:700 34px/1.1 system-ui;margin:0 0 6px}.sh h2{font:700 13px/1 system-ui;letter-spacing:.08em;text-transform:uppercase;margin:40px 0 14px;padding-top:16px;border-top:2px solid #161616}
.sh p{margin:0 0 10px;max-width:72ch}.sh .lead{font-size:18px;max-width:80ch}
.sh .meta{color:#555;margin-bottom:20px}
.sh .sw{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px}
.sh .sw div{border:1px solid #ccc}.sh .sw b{display:flex;align-items:flex-end;height:84px;padding:8px 10px;font:600 13px system-ui}
.sh .sw p{padding:8px 10px;margin:0;font-size:13px;line-height:1.4}
.sh table{border-collapse:collapse;width:100%;max-width:1100px}.sh td,.sh th{text-align:left;vertical-align:top;padding:8px 12px 8px 0;border-bottom:1px solid #ddd}
.sh .specimen{padding:24px;border:1px solid #ccc;margin-top:8px;overflow:hidden}
.sh .cols{display:grid;gap:24px}@media(min-width:900px){.sh .cols{grid-template-columns:1fr 1fr 1fr}}
.sh ul{margin:0;padding-left:18px}.sh li{margin:4px 0}
.sh a{color:inherit}
</style></head>
<body><div class="sh">
<p><a href="index.html">All concepts</a> · <a href="${c.id}.html">View homepage</a> · <a href="${c.id}-390.html">390px</a> · <a href="${c.id}-1440.html">1440px</a></p>
<h1>${esc(c.name)}</h1>
<p class="meta">Concept ${c.n} of 4 · Direction: ${esc(c.direction)}</p>
<p class="lead">${s.rationale}</p>
${s.structure ? `<h2>Structural changes from the brief’s section order</h2><p>${s.structure}</p>` : ""}

<h2>Palette</h2>
<div class="sw">${s.palette.map((p) => `<div><b style="background:${p.hex};color:${lum(p.hex) > 0.35 ? "#111" : "#fff"}">${esc(p.name)} · ${p.hex.toUpperCase()}</b><p>${esc(p.use)}<br><small>${ratio(p.hex, "#ffffff").toFixed(1)}:1 on white · ${ratio(p.hex, "#111111").toFixed(1)}:1 on #111</small></p></div>`).join("")}</div>

<h2>Typefaces</h2>
<table>${s.type.map((t) => `<tr><th>${esc(t.role)}</th><td><span style="font:${t.sample};font-size:${t.size || "28px"}">${esc(t.name)}</span></td><td>${esc(t.source)}</td></tr>`).join("")}</table>

<h2>Key components (rendered from the concept’s own CSS)</h2>
${s.components.map((k) => `<p><strong>${esc(k.name)}.</strong> ${k.note}</p><div class="specimen" style="${k.bg ? `background:${k.bg}` : ""}">${k.html}</div>`).join("")}

<div class="cols">
<div><h2>Imagery and photography</h2>${s.imagery}</div>
<div><h2>Headline copy</h2>${s.copy}</div>
<div><h2>Motion</h2><p>${s.motion}</p></div>
</div>

<h2>Trade-offs</h2>
<table>
<tr><th style="width:180px">Does well</th><td>${s.tradeoffs.good}</td></tr>
<tr><th>Weaker on</th><td>${s.tradeoffs.weak}</td></tr>
<tr><th>Build effort</th><td>${s.tradeoffs.build}</td></tr>
<tr><th>Photography needed</th><td>${s.tradeoffs.photo}</td></tr>
<tr><th>Suits best</th><td>${s.tradeoffs.audience}</td></tr>
</table>
<p style="margin-top:24px;color:#555">EG monogram: ${s.monogram} (suggestion only; the mark itself isn’t being redesigned here).</p>
</div></body></html>`;
};
