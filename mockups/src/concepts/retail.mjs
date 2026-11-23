// CONCEPT 3 · BOLD MODERN RETAIL
// Colour-blocked, product-led, chunky type, tight grid; gets to the right trolley in as few taps as possible.
import {
  html, esc, gbp, q, qt, val, facts, families, flagship, spec, stockWord, clubs, otherBrands, secondary, saving, tiers, perk,
  catalogue, cut, photo, phone, email, hours, companyLine, payments, cookie, doc, placeholderNote,
} from "./kit.mjs";

const A = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.6"/></svg>';
const icon = {
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="m15.5 15.5 5 5" stroke="currentColor" stroke-width="2.4"/></svg>',
  bag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>',
  user: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>',
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.6"/></svg>',
};

const strip = () => html`<div class="b-strip"><p>Free next-day delivery over ${gbp(val("delivery.nextDayFreeThreshold"))}, order by ${esc(val("delivery.nextDayCutoff"))}</p><p class="b-hide-s"><a href="#">Free fitting in Ringwood</a></p><p class="b-hide-s">Trustpilot ${q("trustpilot.rating")}</p><p class="b-hide-s">${phone()}</p></div>`;

const header = () => html`<header class="b-head">
  <div class="b-head__bar">
    <a class="b-logo" href="#" aria-label="Evolution Golf, home"><span aria-hidden="true">EG</span><b aria-hidden="true">Evolution<br>Golf</b></a>
    <form class="b-search" role="search" action="#"><label class="sr" for="b-q">Search</label>${icon.search}<input id="b-q" type="search" placeholder="Search M5, Srixon irons, balls…"></form>
    <a class="b-ib b-hide-s" href="#" aria-label="Account">${icon.user}</a>
    <a class="b-ib" href="#" aria-label="Basket, 0 items">${icon.bag}<span class="b-count" aria-hidden="true">0</span></a>
  </div>
  <nav class="b-rail" aria-label="Main"><ul>
    ${[["Trolleys", "is-key"], ["Clubs", "is-key"], ["Fitting", "is-svc"], ["Membership", "is-svc"], ["Bags"], ["Balls, GPS & acc."], ["Used & trade-in"], ["Sale", "is-sale"], ["More"]].map(([n, c = ""]) => `<li><a class="${c}" href="#">${esc(n)}</a></li>`)}
  </ul></nav>
</header>`;

const bento = () => { const s = saving(); return html`<section class="b-bento" aria-labelledby="b-h1">
  <div class="b-tile b-tile--hero">
    <h1 id="b-h1">Motocaddy.<br>Sorted.</h1>
    <p class="b-hero__sub">The UK specialist for Motocaddy electric trolleys and custom‑fitted clubs.</p>
    <a class="b-btn b-btn--white" href="#shelf">Shop trolleys ${A}</a>
    <a class="b-sticker" href="#shelf"><small>M5 GPS DHC</small><b>${gbp(969)}</b><small>Standard battery</small></a>
    <img src="${cut("m5-gps-dhc-highangle")}" alt="Motocaddy M5 GPS DHC" width="800" height="800" fetchpriority="high">
  </div>
  <a class="b-tile b-tile--fit" href="#fit"><h2>Fitting is free.</h2><p>Launch-monitor fitting in Ringwood, no obligation to buy.</p><span class="b-btn b-btn--ink">Book a slot ${A}</span></a>
  <a class="b-tile b-tile--mem" href="#mem"><h2>Members are ${gbp(s.net, { pence: true })} up on an M5.</h2><p>Annual is ${gbp(s.fee)} a year. Free membership is £0.</p><span class="b-btn b-btn--ink">Join from £0 ${A}</span></a>
</section>`; };

const finder = () => {
  const fams = families();
  const n = fams.filter((f) => spec(f).gps && f.variants.some((v) => v.holes.startsWith("36"))).length;
  return html`<section class="b-finder" aria-labelledby="b-fd">
  <h2 id="b-fd">Find your trolley in three taps</h2>
  <form class="b-finder__q" action="#">
    <fieldset><legend>GPS course maps?</legend><label><input type="radio" name="gps" checked>Yes</label><label><input type="radio" name="gps">No</label><label><input type="radio" name="gps">Not fussed</label></fieldset>
    <fieldset><legend>Hilly course?</legend><label><input type="radio" name="dhc">Yes, downhill control</label><label><input type="radio" name="dhc" checked>Not needed</label></fieldset>
    <fieldset><legend>How much golf?</legend><label><input type="radio" name="bat">18 holes</label><label><input type="radio" name="bat" checked>36 holes</label></fieldset>
    <button type="submit" class="b-btn b-btn--cobalt">Show ${n} trolleys ${A}</button>
  </form>
</section>`;
};

const shelf = () => html`<section class="b-sec" id="shelf" aria-labelledby="b-sh">
  <div class="b-sec__head"><h2 id="b-sh">2026 Motocaddy</h2><a href="#">All trolleys ${A}</a></div>
  <p class="b-offer">${q("offers.trolleyGift")}</p>
  <ul class="b-shelf">
    ${families().map((f) => { const s = spec(f); const feats = [s.gps && "GPS", s.dhc && "DHC", s.remote && "Remote"].filter(Boolean); return html`<li class="b-card b-card--${s.stock.state}">
      <a href="${f.href}" class="b-card__link">
        <span class="b-card__img"><img src="${cut(f.image, 400)}" alt="" width="400" height="400" loading="lazy"></span>
        <span class="b-card__name">${esc(f.name)}</span>
        <span class="b-card__meta">${esc([...feats, s.batteries.map((b) => b.holes.replace(" holes", "")).join("/") + " holes"].join(" · "))}</span>
        <span class="b-card__price">${f.variants.length > 1 ? "<small>from</small>" : ""}${gbp(s.from)}</span>
        <span class="b-card__stock">${stockWord(s.stock)}</span>
      </a>
      ${s.stock.state === "in" ? `<button type="button" class="b-add" aria-label="Quick add ${esc(f.name)}">${icon.plus}</button>` : ""}
    </li>`; })}
  </ul>
</section>`;

const clubSec = () => html`<section class="b-sec" aria-labelledby="b-cl">
  <div class="b-sec__head"><h2 id="b-cl">Clubs: Wilson, Srixon, Mizuno</h2><a href="#">All clubs ${A}</a></div>
  <ul class="b-brands">
    ${clubs.map((c, i) => html`<li class="b-brand b-brand--${i}">
      <h3>${esc(c.brand)}</h3>
      <img src="${cut(c.cut, 400)}" alt="${esc(`${c.brand} ${c.model}`)}" width="400" height="400" loading="lazy">
      <p>${esc(c.model)} · from ${gbp(c.from)}</p>
      <div><a class="b-btn b-btn--ink" href="${c.href}">Off the shelf</a><a class="b-btn b-btn--white" href="#">Build custom</a></div>
    </li>`)}
  </ul>
  <div class="b-check"><p><b>Custom or standard?</b> Answer three questions, get a straight answer. Custom builds take ${q("leadTimes.customBuild")}.</p><a class="b-btn b-btn--cobalt" href="#">30-second check ${A}</a></div>
  <ul class="b-tags">${otherBrands.map((b) => `<li><a href="#">${esc(b)}</a></li>`).join("")}</ul>
</section>`;

const fit = () => html`<section class="b-fit" id="fit" aria-labelledby="b-ft">
  <h2 id="b-ft">Free fitting. Ringwood. ${q("fitting.durationMinutes")} minutes.</h2>
  <ol>
    <li><b>1</b><span>Tell us about your game and the clubs you use now.</span></li>
    <li><b>2</b><span>Hit shots on the ${q("fitting.launchMonitor")}. Try heads and shafts from ${esc(facts.fitting.brandsFitted.slice(0, 3).join(", "))} and more.</span></li>
    <li><b>3</b><span>Leave with your numbers. Buying is optional.</span></li>
  </ol>
  <a class="b-btn b-btn--ink b-btn--big" href="#">Book a free fitting, ${q("fitting.days")} ${A}</a>
</section>`;

const mem = () => { const s = saving(); return html`<section class="b-mem" id="mem" aria-labelledby="b-me">
  <div class="b-mem__copy">
    <h2 id="b-me">${q("membership.name")}. It pays for itself.</h2>
    <div class="b-tiers">${tiers.map((t) => html`<div class="b-tier"><h3>${esc(t.name)} <span>${t.price ? esc(t.priceLabel) + "/yr" : "£0"}</span></h3><ul>${t.perks.map((p) => `<li>${perk(p.text)}</li>`)}</ul><a class="b-btn ${t.price ? "b-btn--white" : "b-btn--outline"}" href="#">${t.price ? "Join Annual" : "Join free"}</a></div>`)}</div>
  </div>
  <figure class="b-receipt" aria-labelledby="b-rc">
    <figcaption id="b-rc">Receipt, Annual member</figcaption>
    <dl>
      <div><dt>${esc(s.product)}, ${esc(s.battery)}</dt><dd>${gbp(s.price, { pence: true })}</dd></div>
      <div><dt>Member price (${q("membership.memberDiscountPercent")}% off)</dt><dd>−${gbp(s.off, { pence: true })}</dd></div>
      <div><dt>Annual membership</dt><dd>${gbp(s.fee, { pence: true })}</dd></div>
      <div class="b-receipt__t"><dt>You’re up</dt><dd>${gbp(s.net, { pence: true })}</dd></div>
    </dl>
  </figure>
</section>`; };

const reviews = () => html`<section class="b-sec b-rev" aria-labelledby="b-rv">
  <div class="b-rev__score"><p class="b-rev__num">${q("trustpilot.rating")}</p><h2 id="b-rv">on Trustpilot</h2><p>${q("trustpilot.reviewCount")} reviews · <a href="#">Read them</a></p></div>
  <ul class="b-rev__list">${["trolley", "fitting", "delivery"].map((t) => `<li><span class="q" title="To be confirmed: real Trustpilot review about ${t}">Real Trustpilot review about a ${t} goes here.</span></li>`).join("")}</ul>
</section>`;

const more = () => html`<section class="b-sec" aria-labelledby="b-mo">
  <div class="b-sec__head"><h2 id="b-mo">Shop the rest</h2></div>
  <ul class="b-more">${secondary.map((c, i) => `<li class="b-more__i b-more__i--${i}"><a href="#"><strong>${esc(c.name)}</strong>${c.price ? `<span>${esc(c.eg)} · ${gbp(c.price)}</span>` : `<span>${esc(c.eg)}</span>`}${c.img ? `<img src="${c.kind === "photo" ? photo(c.img, 400) : cut(c.img, 400)}" alt="" width="400" height="400" loading="lazy" class="${c.kind === "photo" ? "is-photo" : ""}">` : ""}</a></li>`).join("")}</ul>
  <div class="b-guides"><h3>Buying guides</h3><ul>${catalogue.guides.map((g) => `<li><a href="${g.href}">${esc(g.title)}</a> <small>by ${qt("fitter", "named author")}</small></li>`).join("")}</ul></div>
</section>`;

const footer = () => html`<footer class="b-foot">
  <div class="b-foot__top">
    <div><p class="b-foot__big">Come and see us in Ringwood.</p><p>${q("business.address")}</p><p>${hours().join(" · ")}</p><p>${phone()} · ${email()}</p></div>
    <form class="b-news" action="#"><label for="b-e">Get new-season launches first</label><div><input id="b-e" type="email" autocomplete="email" placeholder="Email address"><button type="submit">Sign up</button></div>
      <label class="b-check2"><input type="checkbox"> Email me news and offers. Unsubscribe any time.</label></form>
  </div>
  <div class="b-foot__links">
    <ul>${["Trolleys", "Clubs", "Build custom", "Bags", "Balls, GPS & accessories", "Approved used", "Clothing & shoes"].map((x) => `<li><a href="#">${esc(x)}</a></li>`).join("")}</ul>
    <ul>${["Delivery & returns", "Contact", "Help & FAQs", facts.pricePromise.short, "Klarna & Clearpay", "About", "Members’ portal"].map((x) => `<li><a href="#">${esc(x)}</a></li>`).join("")}</ul>
  </div>
  <ul class="b-pay" aria-label="Payment methods">${payments.map((p) => `<li>${p}</li>`).join("")}</ul>
  <p class="b-foot__small">${companyLine()} · ${q("dealers.motocaddy")} · <a href="#">Privacy</a> · <a href="#">Cookies</a> · <a href="#">Terms</a></p>
  <p class="b-foot__small">${placeholderNote}</p>
</footer>`;

export const retail = {
  id: "retail",
  n: 3,
  name: "Block",
  direction: "Bold modern retail",
  fonts: ["bricolage-grotesque-latin-opsz-normal.woff2"],
  sheet: {
    oneLine: "Colour-blocked, product-led and fast: a three-tap trolley finder and a big-image shelf, closer to a design retailer than a golf shop.",
    rationale: "This concept treats Evolution as a confident modern retailer that happens to sell golf. Strong colour blocks (cobalt, coral, lilac; deliberately not green) divide the homepage into clear, tappable zones, and a single chunky grotesk carries everything. The hero is a bento of three blocks that each answer one of the five-second questions: Motocaddy, free fitting, membership. Directly underneath, a three-question trolley finder (GPS? hilly? 18 or 36 holes?) gets a buyer to a short list in three taps. Products are big cut-outs on flat colour with prices you can read from across the room. It is the most conversion-focused of the four.",
    structure: "The hero and the three pillar tiles merge into one bento block (Motocaddy / free fitting / membership). A trolley finder is added straight after the hero, ahead of the range, because it is the fastest path to the right trolley. The trust row becomes a single Trustpilot score block lower down; guides shrink to a list because this concept prioritises shopping over reading.",
    palette: [
      { name: "Cobalt", hex: "#2134e8", use: "Hero block, membership block, finder button; white text on it (7.7:1)." },
      { name: "Coral", hex: "#ff6a3d", use: "Fitting block and accents; always ink text on it (6.7:1), never white." },
      { name: "Lilac", hex: "#dcd6ff", use: "Membership tile, review block; ink text." },
      { name: "Fog", hex: "#f0f0f3", use: "Product tile background so cut-outs read clearly. Cool grey, not cream." },
      { name: "Ink", hex: "#101010", use: "Text, primary buttons, footer, the strip." },
      { name: "White", hex: "#ffffff", use: "Page background and buttons on colour." },
    ],
    type: [
      { role: "Everything (display to body)", name: "Bricolage Grotesque (variable: optical size 12–96, weight 200–800)", source: "Google Fonts, SIL OFL. Chunky and characterful at display sizes (800, opsz 96), calm at body size.", sample: "800 30px/1 'Bricolage'" },
    ],
    components: [
      { name: "Buttons", note: "Chunky rectangles with an arrow, 52px+ tall. Ink on light blocks, white on cobalt. No pills.", html: '<div class="b" style="display:flex;gap:12px;flex-wrap:wrap;padding:16px;background:#2134e8"><a class="b-btn b-btn--white" href="#">Shop trolleys</a><a class="b-btn b-btn--ink" href="#">Book a slot</a></div>' },
      { name: "Product card", note: "A flat Fog tile with an oversized cut-out, name, one spec line, a big price and stock in words; in-stock items get a quick-add button.", html: "" },
      { name: "Navigation", note: "A delivery strip, a search-first header, then a row of chunky category blocks (scrollable on phones) with Trolleys and Clubs weighted, Fitting and Membership flagged as services.", html: "" },
    ],
    imagery: "<p>Products do the talking: oversized cut-outs on flat colour, cropped big and allowed to bleed off the edge. Lifestyle photography is optional and, where used, bright and graphic (a trolley against a hedge or sky, shot square-on), never moody fairways.</p>",
    copy: "<p><strong>H1:</strong> “Motocaddy. Sorted.”</p><p><strong>Sub:</strong> “The UK specialist for Motocaddy electric trolleys and custom‑fitted clubs.”</p><p><strong>Bento:</strong> “Fitting is free.” · “Members are £60.90 up on an M5.”</p><p><strong>Finder:</strong> “Find your trolley in three taps”</p>",
    motion: "Snappy and physical: blocks scale slightly on press, the finder count ticks up and down as answers change, quick-add confirms with a short colour flash. Nothing slow.",
    tradeoffs: {
      good: "Fastest route to a trolley (finder plus shelf); the clearest prices; the most modern and least ‘golf shop’ look; needs almost no lifestyle photography, so it could launch soonest.",
      weak: "Least premium-feeling for the fitting service and the expertise story; a bold palette needs discipline from merchandisers to avoid looking like a sale. Colour away from green is a brand departure that needs owner buy-in.",
      build: "Medium. The finder needs the trolley metafields (GPS, DHC, battery holes) to exist; the rest is a straightforward component set.",
      photo: "Low: clean cut-outs (already available). Optional graphic lifestyle shots.",
      audience: "Mobile shoppers who already know they want a Motocaddy and want the right one quickly; younger golfers; gift buyers.",
    },
    monogram: "Bold ‘EG’ in Bricolage 800, ink on white or white on cobalt, inside a square block",
    scores: { trolley: 5, fitting: 3, membership: 5, premium: 3, build: "Medium", photo: "Low: cut-outs already available" },
  },
  specimens() {
    this.sheet.components[1].html = `<div class="b" style="max-width:320px">${shelf().match(/<li class="b-card[\s\S]*?<\/li>/)[0].replace("<li", "<div").replace(/<\/li>$/, "</div>")}</div>`;
    this.sheet.components[2].html = `<div class="b">${strip()}${header()}</div>`;
  },
  render() {
    return doc({
      title: "Evolution Golf: Motocaddy trolleys and custom-fitted clubs (concept: Block)",
      css: "retail",
      fonts: this.fonts,
      body: html`<a class="sr sr-focus" href="#b-main">Skip to content</a>
<div class="b">
${strip()}
${header()}
<main id="b-main">
${bento()}
${finder()}
${shelf()}
${clubSec()}
${fit()}
${mem()}
${reviews()}
${more()}
</main>
${footer()}
</div>
${cookie("b-cookie")}`,
    });
  },
};
