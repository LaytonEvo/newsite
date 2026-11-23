// Comparison page: all four homepages at thumbnail size, plus a scoring table.
import { esc } from "./kit.mjs";

const dots = (n) => `<span class="dots" aria-label="${n} out of 5">${"●".repeat(n)}<span>${"●".repeat(5 - n)}</span></span>`;

export const compare = (concepts) => `<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow">
<title>Homepage concepts: comparison</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#ececec;color:#161616;font:15px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
main{padding:32px clamp(16px,3vw,40px) 64px;max-width:1600px;margin:0 auto}
h1{font:700 30px/1.1 system-ui;margin:0 0 6px}h2{font:700 18px/1.2 system-ui;margin:0}
.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:20px;margin-top:28px;align-items:start}
@media(max-width:900px){.grid{grid-template-columns:1fr 1fr}}
.col{background:#fff;padding:14px}
.col p{margin:4px 0 10px;color:#444;font-size:13px}
.thumbs{display:grid;grid-template-columns:3fr 1fr;gap:8px;align-items:start}
.thumbs img{width:100%;height:auto;display:block;border:1px solid #ccc}
.links a{margin-right:10px;font-size:13px;color:#161616}
table{border-collapse:collapse;width:100%;margin-top:32px;background:#fff}
th,td{padding:10px 12px;text-align:left;vertical-align:top;border-bottom:1px solid #ddd;font-size:14px}
thead th{background:#161616;color:#fff}
.dots{letter-spacing:2px;color:#161616}.dots span{color:#cfcfcf}
.note{margin-top:20px;max-width:90ch;color:#333}
</style></head>
<body><main>
<h1>Homepage concepts: four directions</h1>
<p>Same content strategy, products and facts in each; everything visual and tonal is different. Desktop (1440px) and mobile (390px), full page, at thumbnail size. Click through for the full page or the design sheet.</p>
<div class="grid">
${concepts.map((c) => `<section class="col" aria-labelledby="c-${c.id}">
  <h2 id="c-${c.id}">${c.n}. ${esc(c.name)}</h2><p>${esc(c.direction)}. ${esc(c.sheet.oneLine)}</p>
  <p class="links"><a href="${c.id}-1440.html">1440px</a><a href="${c.id}-390.html">390px</a><a href="${c.id}-sheet.html">Design sheet</a></p>
  <div class="thumbs"><img src="shots/${c.id}-1440-thumb.png" alt="${esc(c.name)} homepage at 1440px, full page"><img src="shots/${c.id}-390-thumb.png" alt="${esc(c.name)} homepage at 390px, full page"></div>
</section>`).join("")}
</div>
<table>
<thead><tr><th>Concept</th><th>Trolley specialism</th><th>Fitting</th><th>Membership</th><th>Premium feel</th><th>Build complexity</th><th>Photography it depends on</th></tr></thead>
<tbody>${concepts.map((c) => { const r = c.sheet.scores; return `<tr><th>${c.n}. ${esc(c.name)}</th><td>${dots(r.trolley)}</td><td>${dots(r.fitting)}</td><td>${dots(r.membership)}</td><td>${dots(r.premium)}</td><td>${esc(r.build)}</td><td>${esc(r.photo)}</td></tr>`; }).join("")}</tbody>
</table>
<p class="note">Scores are my judgement of how strongly each homepage communicates each job, not a recommendation; 5 = strongest. Build complexity is relative to a standard Shopify OS 2.0 theme build.</p>
${concepts.hybrid ? `<p class="note"><strong>A possible hybrid:</strong> ${concepts.hybrid}</p>` : ""}
</main></body></html>`;
