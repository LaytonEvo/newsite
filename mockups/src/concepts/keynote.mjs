// CONCEPT 6 · KEYNOTE (Apple-inspired: product-page storytelling)
// Dark, cinematic scroll: one big statement, a product reveal, highlight cards, big numbers, a compare row.
import {
  html, esc, gbp, q, qt, val, facts, families, flagship, fam, spec, stockWord, clubs, otherBrands, secondary, saving, tiers, perk,
  catalogue, cut, photo, phone, email, hours, companyLine, payments, cookie, doc, placeholderNote,
} from "./kit.mjs";

const chev = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
const L = (t, href = "#") => `<a class="k-l" href="${href}">${t}${chev}</a>`;
const dot = (on, label) => on ? `<span class="k-on" aria-label="${label}: yes">●</span>` : `<span class="k-off" aria-label="${label}: no">–</span>`;

const nav = () => html`<header class="k-nav"><nav aria-label="Main"><a class="k-logo" href="#" aria-label="Evolution Golf, home">Evolution Golf</a>
  <ul>${["Trolleys", "Clubs", "Fitting", "Membership", "Bags", "Balls & GPS", "Used", "Sale"].map((n) => `<li><a href="#">${esc(n)}</a></li>`)}</ul>
  <a class="k-pill k-pill--s" href="#fit">Book fitting</a></nav></header>`;

const hero = () => html`<section class="k-hero" aria-labelledby="k-h1">
  <p class="k-hero__pre">Evolution Golf · Ringwood</p>
  <h1 id="k-h1"><span>Motocaddy trolleys.</span><span>Fitted clubs.</span><span class="k-grad">Free fitting.</span></h1>
  <p class="k-hero__sub">The UK specialist for Motocaddy trolleys and custom‑fitted clubs, with a free fitting centre in Ringwood and a members’ club that pays for itself.</p>
  <p class="k-hero__acts"><a class="k-pill" href="#compare">Shop Motocaddy</a>${L("Book a free fitting", "#fit")}</p>
  <div class="k-stage"><img src="${cut("m5-gps-dhc-highangle")}" alt="Motocaddy M5 GPS DHC" width="800" height="800" fetchpriority="high"></div>
  <p class="k-stage__cap">Motocaddy M5 GPS DHC · from ${gbp(969)}</p>
</section>`;

const highlights = () => html`<section class="k-sec" aria-labelledby="k-hl">
  <h2 id="k-hl" class="k-h2">Get to know the range.</h2>
  <ul class="k-cards">
    ${[
      ["m5-gps", "GPS on the handle.", "Course maps and yardages on M5 GPS, M7 GPS and M‑Tech models."],
      ["m1-dhc", "Downhill control.", "Holds its speed on slopes on every DHC model."],
      ["m7-gps-remote", "Remote, if you want it.", "M7 and ME models steer from a handset."],
      ["se", "18 holes, or 36.", "Standard battery for a round, Ultra for two. Every model gives you the choice."],
    ].map(([img, h, p]) => html`<li class="k-card"><h3>${h}</h3><p>${p}</p><img src="${cut(img, 400)}" alt="" width="400" height="400" loading="lazy"></li>`)}
  </ul>
  <p class="k-offer">${q("offers.trolleyGift")}</p>
</section>`;

const numbers = () => { const s = saving(); return html`<section class="k-sec k-nums" aria-labelledby="k-nm">
  <h2 id="k-nm" class="sr">Evolution Golf in numbers</h2>
  <dl>
    <div><dt>Fitting fee</dt><dd>£0</dd><p>Free, in person, in Ringwood. No obligation.</p></div>
    <div><dt>Next-day cut-off</dt><dd>${esc(val("delivery.nextDayCutoff"))}</dd><p>Free next-day delivery over ${gbp(val("delivery.nextDayFreeThreshold"))}.</p></div>
    <div><dt>Annual member on an M5</dt><dd class="k-grad">${gbp(s.net, { pence: true })}</dd><p>Better off after the ${gbp(s.fee)} fee, at ${q("membership.memberDiscountPercent")}% member price.</p></div>
  </dl>
</section>`; };

const compare = () => {
  const ids = ["se", "m1", "m5-gps-dhc", "m7-gps-remote"];
  return html`<section class="k-sec k-compare" id="compare" aria-labelledby="k-cp">
  <h2 id="k-cp" class="k-h2">Which Motocaddy is right for you?</h2>
  <div class="k-cmp">${ids.map((id) => { const f = fam(id); const s = spec(f); return html`<article class="k-cmp__col">
    <img src="${cut(f.image, 400)}" alt="Motocaddy ${esc(f.name)}" width="400" height="400" loading="lazy">
    <h3>${esc(f.name)}</h3>
    <p class="k-cmp__price">${f.variants.length > 1 ? "From " : ""}${gbp(s.from)}</p>
    <p class="k-cmp__stock">${stockWord(s.stock)}</p>
    <a class="k-pill k-pill--s" href="${f.href}">Buy</a>${L("Learn more", f.href)}
    <dl>
      <div><dt>GPS</dt><dd>${dot(s.gps, "GPS")}</dd></div>
      <div><dt>Downhill control</dt><dd>${dot(s.dhc, "Downhill control")}</dd></div>
      <div><dt>Remote</dt><dd>${dot(s.remote, "Remote")}</dd></div>
      <div><dt>Battery</dt><dd>${esc(s.batteries.map((b) => b.holes.replace(" holes", "")).join(" or "))} holes</dd></div>
    </dl>
  </article>`; })}</div>
  <p class="k-center">${L("Compare all eight 2026 models")}</p>
</section>`;
};

const fitting = () => html`<section class="k-light" id="fit" aria-labelledby="k-ft">
  <h2 id="k-ft" class="k-h2 k-h2--ink">Fitting, explained.</h2>
  <p class="k-light__sub">Free. About ${q("fitting.durationMinutes")} minutes. ${q("fitting.days")}, in Ringwood.</p>
  <div class="k-ph" role="img" aria-label="Photo to come: launch monitor screen in the dark fitting bay"><span class="q" title="To be confirmed: photography not yet taken">The launch-monitor screen in the fitting bay, shot close, golfer soft in the background</span></div>
  <ol class="k-steps">
    <li><b>1</b><h3>Talk.</h3><p>Your game, your goals, your current clubs.</p></li>
    <li><b>2</b><h3>Hit.</h3><p>Heads and shafts from ${esc(facts.fitting.brandsFitted.slice(0, 3).join(", "))} and more, on the ${q("fitting.launchMonitor")}.</p></li>
    <li><b>3</b><h3>Decide.</h3><p>Your numbers and a recommendation. Buying is optional.</p></li>
  </ol>
  <p class="k-center"><a class="k-pill" href="#">Book a free fitting</a></p>
</section>`;

const clubSec = () => html`<section class="k-sec" aria-labelledby="k-cl">
  <h2 id="k-cl" class="k-h2">Clubs, built around you.</h2>
  <p class="k-sub">Wilson, Srixon and Mizuno, off the shelf or built to your fitting. Custom builds take ${q("leadTimes.customBuild")}.</p>
  <ul class="k-clubs">${clubs.map((c) => html`<li><img src="${cut(c.cut, 400)}" alt="${esc(`${c.brand} ${c.model}`)}" width="400" height="400" loading="lazy"><h3>${esc(c.brand)}</h3><p>${esc(c.model)} · from ${gbp(c.from)}</p><p>${L("Standard", c.href)}${L("Custom")}</p></li>`)}</ul>
</section>`;

const members = () => html`<section class="k-sec k-mem" aria-labelledby="k-me">
  <h2 id="k-me" class="k-h2">${q("membership.name")}.<br><span class="k-grad">Pays for itself.</span></h2>
  <div class="k-tiers">${tiers.map((t) => html`<div><h3>${esc(t.name)}</h3><p class="k-tier__p">${t.price ? esc(t.priceLabel) + " a year" : "Free"}</p><ul>${t.perks.map((p) => `<li>${perk(p.text)}</li>`)}</ul><a class="k-pill ${t.price ? "" : "k-pill--ghost"}" href="#">${t.price ? "Join Annual" : "Join free"}</a></div>`)}</div>
</section>`;

const tail = () => html`<section class="k-sec k-tail" aria-labelledby="k-ta">
  <h2 id="k-ta" class="sr">More from Evolution Golf</h2>
  <div class="k-tail__grid">
    <div><h3>What customers say</h3><p>Rated ${q("trustpilot.rating")} on Trustpilot from ${q("trustpilot.reviewCount")} reviews. <span class="q" title="To be confirmed: real Trustpilot reviews">Selected real reviews will appear here.</span></p></div>
    <div><h3>Buying guides</h3><ul>${catalogue.guides.map((g) => `<li><a href="${g.href}">${esc(g.title)}</a></li>`).join("")}</ul></div>
    <div><h3>Also in the shop</h3><ul class="k-also">${secondary.map((c) => `<li><a href="#">${esc(c.name)}</a></li>`).join("")}</ul></div>
  </div>
</section>`;

const footer = () => html`<footer class="k-foot">
  <p>${q("business.address")} · ${hours().join(" · ")} · ${phone()} · ${email()}</p>
  <form class="k-news" action="#"><label for="k-e">Newsletter</label><input id="k-e" type="email" placeholder="Email address" autocomplete="email"><button type="submit">Sign up</button><label class="k-check"><input type="checkbox"> Email me news and offers.</label></form>
  <p>${companyLine()} · ${q("dealers.motocaddy")} · Pay with ${payments.join(", ")}</p>
  <p><a href="#">Delivery &amp; returns</a> · <a href="#">Help</a> · <a href="#">${esc(facts.pricePromise.short)}</a> · <a href="#">Members’ portal</a> · <a href="#">Privacy</a> · <a href="#">Cookies</a> · <a href="#">Terms</a></p>
  <p>${placeholderNote}</p>
</footer>`;

export const keynote = {
  id: "keynote",
  n: 6,
  name: "Keynote",
  direction: "Apple-inspired: product storytelling",
  fonts: ["../inter-latin-wght-normal.woff2"],
  sheet: {
    oneLine: "Apple-inspired. A dark, cinematic scroll: one big statement, a product reveal, feature highlights, big numbers and a four-model compare row.",
    rationale: "Borrows the structure of an Apple product page and applies it to the whole shop: a three-line statement (trolleys, fitted clubs, free fitting) over a spot-lit M5 GPS DHC, then a row of large highlight cards that explain the range in four facts drawn from the catalogue (GPS, downhill control, remote, 18 or 36 holes). Three huge numbers carry the proof: £0 fitting, the 1pm next-day cut-off and the £60.90 membership saving. A four-column compare row (SE, M1, M5 GPS DHC, M7 GPS Remote) is the ‘which one?’ moment. The page then turns light for fitting, the one human section, before going dark again for clubs and membership.",
    structure: "The hero carries all three specialisms in its headline. Pillars are replaced by highlight cards; the trolley carousel becomes a four-model compare; the trust row becomes ‘in numbers’. Fitting is the single light section, so it stands out. Reviews, guides and secondary categories are condensed into a three-column tail.",
    palette: [
      { name: "Black", hex: "#000000", use: "The stage: page background." },
      { name: "Graphite", hex: "#161617", use: "Highlight cards, compare columns." },
      { name: "Silver", hex: "#f5f5f7", use: "Primary text on black; also the light fitting section." },
      { name: "Mist", hex: "#a1a1a6", use: "Secondary text on black (8:1)." },
      { name: "Green to lime", hex: "#3ddc97", use: "One gradient accent for emphasised words and pill buttons (dark text on it). Gradient runs #3ddc97 → #b8f26b." },
    ],
    type: [{ role: "Everything", name: "Inter (variable)", source: "Google Fonts, SIL OFL; stands in for SF Pro. Display set at 700 with very tight tracking.", sample: "700 30px/1 'Inter'" }],
    components: [
      { name: "Pill button + text link", note: "One pill per section at most; everything else is a text link with a chevron.", bg: "#000", html: '<p class="k-hero__acts" style="justify-content:flex-start;margin:0"><a class="k-pill" href="#">Shop Motocaddy</a><a class="k-l" href="#">Book a free fitting<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></a></p>' },
      { name: "Compare column", note: "Product, price, stock in words, Buy and Learn more, then aligned spec rows.", bg: "#000", html: "" },
      { name: "Navigation", note: "Thin dark bar; ‘Book fitting’ is the only button in it.", bg: "#000", html: "" },
    ],
    imagery: "<p>Spot-lit product shots on black: the trolley as the star, with a soft radial light behind it. Highlight cards use the Motocaddy gallery images that already show the GPS screen, DHC dial and remote. One documentary photo for fitting.</p>",
    copy: "<p><strong>H1:</strong> “Motocaddy trolleys. Fitted clubs. Free fitting.”</p><p><strong>Sections:</strong> “Get to know the range.” · “Which Motocaddy is right for you?” · “Fitting, explained.” · “Pays for itself.”</p>",
    motion: "The most motion of any concept: the trolley fades up out of black on load, highlight cards slide horizontally, numbers count up once. All of it switched off under ‘reduce motion’.",
    tradeoffs: {
      good: "The most dramatic and memorable; the compare row is the clearest ‘which trolley?’ tool for a first-time buyer; highlight cards teach the range without a wall of specs.",
      weak: "Dark pages can feel cold and are harder for older eyes; long scroll on mobile; only four trolleys compared on the homepage; the cinematic feel needs better trolley renders than the current gallery shots.",
      build: "Medium: scroll-linked animation and a compare component; every third-party widget needs dark styling.",
      photo: "Medium: proper studio renders of the trolleys on black would make it; one fitting photo.",
      audience: "Trolley buyers deciding between models; visitors who arrive curious and have time to scroll.",
    },
    monogram: "No monogram in the nav; the wordmark ‘Evolution Golf’ in Inter Semibold, silver on black",
    scores: { trolley: 5, fitting: 4, membership: 4, premium: 5, build: "Medium", photo: "Medium: studio renders of trolleys on black" },
  },
  specimens() {
    this.sheet.components[1].html = `<div class="k" style="max-width:340px">${compare().match(/<article class="k-cmp__col">[\s\S]*?<\/article>/)[0]}</div>`;
    this.sheet.components[2].html = `<div class="k">${nav()}</div>`;
  },
  render() {
    return doc({
      title: "Evolution Golf: Motocaddy trolleys, fitted clubs, free fitting (concept: Keynote)",
      css: "keynote",
      fonts: this.fonts,
      body: html`<a class="sr sr-focus" href="#k-main">Skip to content</a>
<div class="k">
${nav()}
<main id="k-main">
${hero()}
${highlights()}
${numbers()}
${compare()}
${fitting()}
${clubSec()}
${members()}
${tail()}
</main>
${footer()}
</div>
${cookie("k-cookie")}`,
    });
  },
};
