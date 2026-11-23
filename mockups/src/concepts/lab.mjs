// CONCEPT 2 · PERFORMANCE LAB
// Dark, data-led. Fitting is the hero; trolleys are a spec sheet; numbers are the decoration.
import {
  html, esc, gbp, q, qt, val, facts, families, flagship, spec, stockWord, clubs, otherBrands, secondary, saving, tiers, perk,
  catalogue, cut, photo, phone, email, hours, companyLine, payments, cookie, doc, placeholderNote,
} from "./kit.mjs";

const I = {
  arrow: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  search: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m13 13 4 4" stroke="currentColor" stroke-width="1.6"/></svg>',
  menu: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" stroke-width="1.6"/></svg>',
  bag: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 7h12l-1 10H5L4 7Z M7.5 7V5.5a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
};
const yes = (b, label) => b ? `<span class="l-y" aria-label="${label}: yes">●</span>` : `<span class="l-n" aria-label="${label}: no">—</span>`;

const statusBar = () => html`<div class="l-status" role="note">
  <span class="l-live"><i aria-hidden="true"></i>Fitting bay, Ringwood: bookable ${q("fitting.days")}</span>
  <span class="l-hide-s">Next-day delivery: order by ${esc(val("delivery.nextDayCutoff"))} · free over ${gbp(val("delivery.nextDayFreeThreshold"))}</span>
  <span class="l-hide-s">Trustpilot ${q("trustpilot.rating")}/5</span>
  <span>${phone()}</span>
</div>`;

const header = () => html`<header class="l-head">
  <a class="l-logo" href="#" aria-label="Evolution Golf, home"><span class="l-logo__mark" aria-hidden="true">EG</span><span class="l-logo__word">Evolution Golf</span></a>
  <nav class="l-nav" aria-label="Main"><ul>
    ${["Trolleys", "Clubs", "Custom fitting", "Membership", "Bags", "Balls, GPS & accessories", "Used & trade-in", "Sale", "More"].map((n) => `<li><a href="#">${esc(n)}</a></li>`)}
  </ul></nav>
  <form class="l-search" role="search" action="#"><label class="sr" for="l-q">Search</label>${I.search}<input id="l-q" type="search" placeholder="Search models, specs, brands"><kbd>/</kbd></form>
  <div class="l-icons"><button class="l-ib l-menu" type="button" aria-label="Menu">${I.menu}</button><a class="l-ib" href="#" aria-label="Basket, 0 items">${I.bag}</a></div>
</header>`;

const arc = () => `<svg class="l-arc" viewBox="0 0 1200 260" aria-hidden="true" preserveAspectRatio="none">
  <defs><linearGradient id="l-g" x1="0" x2="1"><stop offset="0" stop-color="#5be0ff" stop-opacity=".15"/><stop offset=".6" stop-color="#5be0ff"/><stop offset="1" stop-color="#5be0ff" stop-opacity=".4"/></linearGradient></defs>
  ${Array.from({ length: 13 }, (_, i) => `<line x1="${i * 100}" y1="236" x2="${i * 100}" y2="250" stroke="#3a4148"/>`).join("")}
  <line x1="0" y1="250" x2="1200" y2="250" stroke="#3a4148"/>
  <path d="M10 248 C 330 -40, 820 -10, 1130 236" fill="none" stroke="url(#l-g)" stroke-width="3"/>
  <path d="M10 248 C 300 40, 760 30, 1010 238" fill="none" stroke="#98a2ab" stroke-width="1.5" stroke-dasharray="4 8"/>
  <circle cx="1130" cy="236" r="7" fill="#5be0ff"/>
</svg>`;

const hero = () => html`<section class="l-hero" aria-labelledby="l-h1">
  <div class="l-hero__top">
    <h1 id="l-h1">Get measured.<br>Then buy.</h1>
    <div class="l-hero__side">
      <p>Free launch‑monitor fitting at our bay in Ringwood. Then the 2026 Motocaddy range and Wilson, Srixon and Mizuno clubs, specced to your numbers.</p>
      <a class="l-btn" href="#">Book a free fitting ${I.arrow}</a>
      <a class="l-tl" href="#spec">Shop Motocaddy trolleys ${I.arrow}</a>
    </div>
  </div>
  <div class="l-instr">
    <figure class="l-instr__arc">${arc()}<figcaption>Illustration: ball flight before and after fitting. Your real numbers come from the session.</figcaption></figure>
    <dl class="l-readout" aria-label="Fitting session">
      <div><dt>Cost</dt><dd>£0</dd></div>
      <div><dt>Session</dt><dd>${q("fitting.durationMinutes")}<small>min</small></dd></div>
      <div><dt>Obligation</dt><dd>None</dd></div>
      <div><dt>Monitor</dt><dd class="l-dd-s">${q("fitting.launchMonitor")}</dd></div>
      <div><dt>Brands</dt><dd class="l-dd-s">${esc(facts.fitting.brandsFitted.slice(0, 3).join(" / "))} +${facts.fitting.brandsFitted.length - 3}</dd></div>
      <div><dt>Location</dt><dd class="l-dd-s">Ringwood, Hampshire</dd></div>
    </dl>
  </div>
</section>`;

const flag = () => { const f = flagship(); return html`<section class="l-flag" aria-labelledby="l-fl">
  <div class="l-plate l-flag__plate">
    <img src="${cut("m5-gps-dhc-highangle")}" alt="Motocaddy M5 GPS DHC" width="800" height="800" loading="lazy">
    <span class="l-call l-call--a">GPS screen</span><span class="l-call l-call--b">Downhill control</span><span class="l-call l-call--c">Lithium battery: Standard or Ultra</span>
  </div>
  <div class="l-flag__data">
    <p class="l-code">MOTOCADDY / 2026 / M5 GPS DHC</p>
    <h2 id="l-fl">The trolley we’re asked about most, on one sheet.</h2>
    <table class="l-kv"><caption class="sr">M5 GPS DHC specification</caption>
      <tr><th>Battery options</th><td>${f.variants.map((v) => `${esc(v.battery)}: ${esc(v.holes)}, ${gbp(v.price)}`).join("<br>")}</td></tr>
      <tr><th>Features</th><td>GPS · downhill control</td></tr>
      <tr><th>Status</th><td>${f.variants.map((v) => `${esc(v.battery)}: ${v.stock > 0 ? "<b class=l-in>in stock</b>" : "out of stock"}`).join(" · ")}</td></tr>
      <tr><th>Weight</th><td>${qt("to add", "trolley weight not in Shopify data yet")}</td></tr>
      <tr><th>Offer</th><td>${q("offers.trolleyGift")}</td></tr>
    </table>
    <a class="l-btn l-btn--ghost" href="${f.href}">Open full spec ${I.arrow}</a>
  </div>
</section>`; };

const specTable = () => html`<section class="l-sec" id="spec" aria-labelledby="l-sp">
  <div class="l-sec__head"><h2 id="l-sp">2026 Motocaddy spec sheet</h2><p>Every frame, every battery. In-stock models first. Sort and filter on the trolley page.</p></div>
  <div class="l-filters" role="group" aria-label="Quick filters (preview)">
    ${["GPS", "Downhill control", "Remote", "36 holes", "In stock"].map((x, i) => `<button type="button" aria-pressed="${i === 4}">${esc(x)}</button>`)}
  </div>
  <div class="l-table-wrap"><table class="l-table"><caption class="sr">2026 Motocaddy electric trolleys</caption>
    <thead><tr><th scope="col">Model</th><th scope="col">GPS</th><th scope="col">DHC</th><th scope="col">Remote</th><th scope="col">Battery</th><th scope="col">From</th><th scope="col">Status</th></tr></thead>
    <tbody>${families().map((f) => { const s = spec(f); return `<tr>
      <th scope="row"><a href="${f.href}"><span class="l-thumb"><img src="${cut(f.image, 400)}" alt="" width="400" height="400" loading="lazy"></span>${esc(f.name)}</a></th>
      <td data-l="GPS">${yes(s.gps, "GPS")}</td><td data-l="DHC">${yes(s.dhc, "Downhill control")}</td><td data-l="Remote">${yes(s.remote, "Remote")}</td>
      <td data-l="Battery">${s.batteries.map((b) => `${esc(b.name)} <small>${esc(b.holes.replace(" holes", "h"))}</small>`).join(" / ")}</td>
      <td data-l="From" class="l-num">${gbp(s.from)}</td>
      <td data-l="Status" class="l-st l-st--${s.stock.state}">${stockWord(s.stock)}${s.stock.detail ? `<small>${esc(s.stock.detail)}</small>` : ""}</td>
    </tr>`; }).join("")}</tbody>
  </table></div>
</section>`;

const clubSec = () => html`<section class="l-sec" aria-labelledby="l-cl">
  <div class="l-sec__head"><h2 id="l-cl">Clubs, by the numbers</h2><p>Wilson, Srixon and Mizuno lead. Buy a standard spec, or build to your fitting data: custom builds take ${q("leadTimes.customBuild")}.</p></div>
  <div class="l-clubs">
    ${clubs.map((c) => html`<article class="l-club">
      <div class="l-plate"><img src="${cut(c.cut, 400)}" alt="${esc(`${c.brand} ${c.model}`)}" width="400" height="400" loading="lazy"></div>
      <p class="l-code">${esc(c.brand.toUpperCase())}</p>
      <h3>${esc(c.model)}</h3>
      <table class="l-kv l-kv--s">${c.specs.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join("")}<tr><th>From</th><td class="l-num">${gbp(c.from)}</td></tr></table>
      <div class="l-club__go"><a href="${c.href}">Standard</a><a href="#">Custom build</a></div>
    </article>`)}
  </div>
  <ol class="l-route" aria-label="Custom club builder steps">
    <li><b>00</b>Custom or standard? <small>30-second check</small></li><li><b>01</b>Club type</li><li><b>02</b>Brand</li><li><b>03</b>Model <small>buildable only</small></li><li><b>04</b>Build spec</li>
  </ol>
  <p class="l-more">Also stocked: ${otherBrands.map((b) => `<a href="#">${esc(b)}</a>`).join(" · ")}</p>
</section>`;

const members = () => { const s = saving(); return html`<section class="l-sec l-mem" aria-labelledby="l-me">
  <div class="l-sec__head"><h2 id="l-me">Membership, as a sum</h2><p>${q("membership.name")} has two tiers. Here’s Annual on one real trolley.</p></div>
  <div class="l-mem__grid">
    <table class="l-calc"><caption class="sr">Annual membership saving</caption>
      <tr><th>${esc(s.product)} · ${esc(s.battery)}</th><td>${gbp(s.price, { pence: true })}</td></tr>
      <tr><th>Member price, ${q("membership.memberDiscountPercent")}% off</th><td>−${gbp(s.off, { pence: true })}</td></tr>
      <tr><th>Annual membership</th><td>+${gbp(s.fee, { pence: true })}</td></tr>
      <tr class="l-calc__t"><th>Better off by</th><td>${gbp(s.net, { pence: true })}</td></tr>
    </table>
    <table class="l-tiers"><caption class="sr">Membership tiers compared</caption>
      <thead><tr><th></th>${tiers.map((t) => `<th scope="col">${esc(t.name)}<small>${t.price ? esc(t.priceLabel) + "/yr" : "£0"}</small></th>`).join("")}</tr></thead>
      <tbody>
        <tr><th scope="row">Price</th><td>Member prices on selected lines</td><td>${q("membership.memberDiscountPercent")}% on most products</td></tr>
        <tr><th scope="row">Free delivery</th><td>over £${q("delivery.freeMemberThreshold")}</td><td>over £${q("delivery.annualMemberThreshold")}</td></tr>
        <tr><th scope="row">Returns</th><td>Standard policy</td><td>${q("returns.summary")}</td></tr>
        <tr><th scope="row">Prize draw</th><td>Free entry route <a href="#">T&amp;Cs</a></td><td>Monthly entry <a href="#">T&amp;Cs</a></td></tr>
        <tr><th scope="row"></th><td><a class="l-btn l-btn--ghost" href="#">Join free</a></td><td><a class="l-btn" href="#">Join for £36</a></td></tr>
      </tbody>
    </table>
  </div>
</section>`; };

const reports = () => html`<section class="l-sec l-rep" aria-labelledby="l-re">
  <div class="l-sec__head"><h2 id="l-re">Field reports</h2><p>Trustpilot ${q("trustpilot.rating")} from ${q("trustpilot.reviewCount")} reviews. Selected reviews mentioning trolleys and fitting will stream in here.</p></div>
  <ul class="l-rep__list">${["Trolley", "Fitting", "Delivery"].map((t) => `<li><span class="l-code">${t.toUpperCase()}</span><span class="q" title="To be confirmed: real Trustpilot review">Trustpilot review, verbatim</span><span class="l-dim">reviewer · date</span></li>`).join("")}</ul>
</section>`;

const notes = () => html`<section class="l-sec" aria-labelledby="l-no">
  <div class="l-sec__head"><h2 id="l-no">Test notes</h2><p>Buying guides from the fitting bay, each linked to stock.</p></div>
  <div class="l-notes">${catalogue.guides.map((g) => html`<article class="l-note">
    <p class="l-code">${esc(g.topic.toUpperCase())} · by ${qt("named fitter", "named author")}</p>
    <h3><a href="${g.href}">${esc(g.title)}</a></h3>
    <ul>${g.products.map((p) => `<li><a href="${p.href}"><span>${esc(p.name)}</span><span class="l-num">${gbp(p.price)}</span><span class="l-st l-st--${p.stock}">${p.stock === "in" ? "In stock" : "To order"}</span></a></li>`).join("")}</ul>
  </article>`)}</div>
</section>`;

const modules = () => html`<section class="l-sec" aria-labelledby="l-mo">
  <div class="l-sec__head"><h2 id="l-mo">Everything else</h2></div>
  <ul class="l-mods">${secondary.map((c) => `<li><a href="#">${c.img ? `<span class="l-plate l-plate--s"><img src="${c.kind === "photo" ? photo(c.img, 400) : cut(c.img, 400)}" alt="" width="400" height="400" loading="lazy"></span>` : ""}<strong>${esc(c.name)}</strong><span>${esc(c.eg)}${c.price ? ` · ${gbp(c.price)}` : ""}</span></a></li>`).join("")}</ul>
</section>`;

const footer = () => html`<footer class="l-foot">
  <div class="l-foot__grid">
    <div><p class="l-code">VISIT THE BAY</p><p>${q("business.address")}</p><p>${hours().join("<br>")}</p><p>${phone()}<br>${email()}</p></div>
    <div><p class="l-code">SHOP</p><ul>${["Electric trolleys", "Golf clubs", "Build custom clubs", "Bags", "Balls, GPS & accessories", "Approved used", "Clothing & shoes"].map((x) => `<li><a href="#">${esc(x)}</a></li>`).join("")}</ul></div>
    <div><p class="l-code">SUPPORT</p><ul>${["Delivery & returns", "Contact", "Help & FAQs", facts.pricePromise.short, "Klarna & Clearpay", "About", "Members’ portal"].map((x) => `<li><a href="#">${esc(x)}</a></li>`).join("")}</ul></div>
    <form class="l-news" action="#"><p class="l-code">NEWSLETTER</p><label for="l-e">Email</label><div><input id="l-e" type="email" autocomplete="email"><button type="submit">Sign up</button></div>
      <label class="l-check"><input type="checkbox"> Email me news and offers. Unsubscribe any time.</label></form>
  </div>
  <div class="l-foot__base"><p>${companyLine()}</p><p>Dealer status: ${q("dealers.motocaddy")} · Pay with ${payments.join(" · ")}</p><p><a href="#">Privacy</a> · <a href="#">Cookies</a> · <a href="#">Terms</a> · <a href="#">Accessibility</a></p><p class="l-dim">${placeholderNote}</p></div>
</footer>`;

export const lab = {
  id: "lab",
  n: 2,
  name: "The Lab",
  direction: "Performance lab",
  fonts: ["ibm-plex-sans-latin-600-normal.woff2", "ibm-plex-mono-latin-400-normal.woff2"],
  sheet: {
    oneLine: "Dark, data-led and precise. Fitting is the hero; trolleys are a spec sheet; numbers are the decoration.",
    rationale: "This concept sells the thing national chains can’t: measurement. It opens on the fitting proposition (‘Get measured. Then buy.’) with the session itself as a readout, then treats the Motocaddy range the way an engineer would, as one spec sheet you can scan in seconds: GPS, downhill control, remote, battery, price, stock. Clubs are shown by their real loft, shaft and flex options from the catalogue. Membership is a sum. Nothing is decorative except numbers, a trajectory line and the grid. It suits the profitable side of the business (fitting and considered purchases) and makes comparison genuinely fast.",
    structure: "Fitting moves to the hero, ahead of trolleys, because it is the concept’s organising idea. Trolleys follow immediately as a flagship spec plate (M5 GPS DHC) and the full spec table, so the trolley specialism still lands in the first two screens. The three pillar tiles are folded into the hero copy. Membership becomes a calculation plus a tier comparison table. Reviews are ‘field reports’; guides are ‘test notes’.",
    palette: [
      { name: "Carbon", hex: "#0b0d0f", use: "Page background." },
      { name: "Graphite", hex: "#16191d", use: "Panels, table rows, footer." },
      { name: "Rule", hex: "#2b3036", use: "Grid lines and table rules (decorative, non-text)." },
      { name: "Chalk", hex: "#e8ecef", use: "Primary text on dark (16:1 on Carbon)." },
      { name: "Steel", hex: "#98a2ab", use: "Secondary text, labels (7.5:1 on Carbon)." },
      { name: "Signal", hex: "#5be0ff", use: "The only accent: primary button (dark text on it), live status, trajectory line, ‘in stock’." },
      { name: "Plate", hex: "#dde2e6", use: "Light plates behind product cut-outs, so dark trolleys read clearly on a dark page." },
    ],
    type: [
      { role: "Headlines and UI", name: "IBM Plex Sans (600 for headlines, 400/500 for UI)", source: "Google Fonts, SIL OFL. An engineered grotesk, tight tracking at large sizes.", sample: "600 28px/1 'Plex'" },
      { role: "Data, codes, labels, prices", name: "IBM Plex Mono (400/500)", source: "Google Fonts, SIL OFL. Tabular by nature: specs and prices line up.", sample: "400 24px/1 'Plex Mono'" },
    ],
    components: [
      { name: "Buttons", note: "Square-cornered. Primary is Signal with dark text; ghost is an outlined variant. A trailing arrow, never two filled buttons side by side.", bg: "#0b0d0f", html: '<div class="l" style="display:flex;gap:16px;flex-wrap:wrap;align-items:center"><a class="l-btn" href="#">Book a free fitting <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></a><a class="l-btn l-btn--ghost" href="#">Open full spec</a></div>' },
      { name: "Product as a spec row", note: "The product card is a table row: plate thumbnail, model, feature dots, battery options, price, stock in words. On phones each row becomes a labelled spec block.", bg: "#0b0d0f", html: "" },
      { name: "Navigation", note: "Status line (bay availability, delivery cut-off, phone) above a compact header; search is a command field with a ‘/’ shortcut.", bg: "#0b0d0f", html: "" },
    ],
    imagery: "<p>Crisp product cut-outs on light ‘plates’, with callout lines to features. Lifestyle photography is minimal and technical: the launch-monitor screen, hands on a grip, the fitting bay under its own lighting. Graded cool and slightly desaturated. No smiling-golfer stock imagery.</p>",
    copy: "<p><strong>H1:</strong> “Get measured. Then buy.”</p><p><strong>Sub:</strong> “Free launch‑monitor fitting at our bay in Ringwood. Then the 2026 Motocaddy range and Wilson, Srixon and Mizuno clubs, specced to your numbers.”</p><p><strong>Section heads:</strong> “2026 Motocaddy spec sheet” · “Clubs, by the numbers” · “Membership, as a sum”</p>",
    motion: "Purposeful: the trajectory line draws on load (respecting reduced motion), the live status dot pulses, and table rows highlight on hover. Filters update the table instantly.",
    tradeoffs: {
      good: "Fastest comparison of any concept (the spec table is genuinely useful); makes fitting feel like a precise, valuable service; distinctive in a category full of white-and-green shops; needs little lifestyle photography.",
      weak: "Dark UI can feel cold to older, less technical buyers, a large share of the trolley market. Dense tables need careful mobile design. Specs like weight and range must be added as Shopify metafields for this to work fully.",
      build: "Medium–high. Data-driven components (filterable spec table, spec plates) need clean metafields; dark mode needs every app widget (reviews, Klarna, Acuity) themed to match.",
      photo: "Low–medium: clean cut-outs (already available) plus a few technical shots of the bay and launch monitor.",
      audience: "Improvers and low handicappers, gadget-minded golfers, anyone booking a fitting; buyers comparing several trolleys side by side.",
    },
    monogram: "‘EG’ in Plex Mono inside a square Signal outline, reading like an equipment badge",
    scores: { trolley: 5, fitting: 5, membership: 4, premium: 4, build: "Medium–high", photo: "Low–medium: cut-outs plus technical bay shots" },
  },
  specimens() {
    this.sheet.components[1].html = `<div class="l">${specTable().match(/<div class="l-table-wrap">[\s\S]*?<\/tr>\s*<\/thead>/)[0]}<tbody>${specTable().match(/<tbody>([\s\S]*?<\/tr>)/)[1]}</tbody></table></div></div>`;
    this.sheet.components[2].html = `<div class="l">${statusBar()}${header()}</div>`;
  },
  render() {
    return doc({
      title: "Evolution Golf: fitting, Motocaddy trolleys and clubs, Ringwood (concept: The Lab)",
      css: "lab",
      fonts: this.fonts,
      body: html`<a class="sr sr-focus" href="#l-main">Skip to content</a>
<div class="l">
${statusBar()}
${header()}
<main id="l-main">
${hero()}
${flag()}
${specTable()}
${clubSec()}
${members()}
${reports()}
${notes()}
${modules()}
</main>
${footer()}
<a class="l-dock" href="#">Book a free fitting · £0 ${I.arrow}</a>
</div>
${cookie("l-cookie")}`,
    });
  },
};
