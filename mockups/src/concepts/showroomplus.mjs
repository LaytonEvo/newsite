// CONCEPT 8 · SHOWROOM+ (Showroom base + Keynote compare row + The Local's people-led fitting)
// Light, calm, one idea per screen; Evolution identity carried by green, the EG mark and real Ringwood people.
import {
  html, esc, gbp, q, qt, val, facts, families, flagship, fam, spec, stockWord, clubs, otherBrands, secondary, saving, tiers, perk,
  catalogue, cut, photo, phone, email, hours, companyLine, payments, cookie, doc, placeholderNote,
} from "./kit.mjs";

const chev = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>';
const L = (t, href = "#") => `<a class="p-l" href="${href}">${t}${chev}</a>`;
const dot = (on, label) => on ? `<span class="p-on" aria-label="${label}: yes">●</span>` : `<span class="p-off" aria-label="${label}: no">–</span>`;
const ic = {
  search: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m13 13 4 4" stroke="currentColor" stroke-width="1.5"/></svg>',
  bag: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 7h11l-.8 10H5.3L4.5 7Z M7.5 7V5.5a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  menu: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 7h14M3 13h14" stroke="currentColor" stroke-width="1.5"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
};
const ph = (label, cls = "") => `<div class="p-ph ${cls}" role="img" aria-label="${esc("Photo to come: " + label)}"><span class="q" title="To be confirmed: photography not yet taken">${esc(label)}</span></div>`;

const nav = () => html`<header class="p-nav"><nav aria-label="Main"><ul>
  <li><a class="p-mark" href="#" aria-label="Evolution Golf, home"><span aria-hidden="true">EG</span></a></li>
  ${["Trolleys", "Clubs", "Fitting", "Membership", "Bags", "Balls & GPS", "Used", "Sale"].map((n) => `<li class="p-nav__item"><a href="#">${esc(n)}</a></li>`)}
  <li class="p-nav__push"><a href="#" aria-label="Search">${ic.search}</a></li><li><a href="#" aria-label="Basket, 0 items">${ic.bag}</a></li><li class="p-nav__menu"><a href="#" aria-label="Menu">${ic.menu}</a></li>
</ul></nav></header>
<p class="p-ribbon">Free next-day delivery over ${gbp(val("delivery.nextDayFreeThreshold"))}, order by ${esc(val("delivery.nextDayCutoff"))}. ${L("Free fitting in Ringwood", "#fit")}</p>`;

const hero = () => html`<section class="p-tile p-tile--hero" aria-labelledby="p-h1">
  <div class="p-copy">
    <p class="p-kicker">Evolution Golf · Ringwood, Hampshire</p>
    <h1 id="p-h1">Motocaddy trolleys.<br>Custom‑fitted clubs.</h1>
    <p class="p-sub">The specialist for both, with free fitting at our Ringwood centre and a members’ club that pays for itself.</p>
    <p class="p-links">${L("Shop Motocaddy", "#compare")}${L("Book a free fitting", "#fit")}</p>
  </div>
  <div class="p-media"><img src="${cut("m5-gps-dhc-highangle")}" alt="Motocaddy M5 GPS DHC electric trolley" width="800" height="800" fetchpriority="high"></div>
</section>`;

const m5 = () => html`<section class="p-tile p-tile--grey" aria-labelledby="p-m5">
  <div class="p-copy"><h2 id="p-m5">Motocaddy M5 GPS DHC</h2>
    <p class="p-sub">Course maps on the handle. Control on the hills. Standard or Ultra battery, from ${gbp(969)}.</p>
    <p class="p-links">${L("Shop")}${L("Compare models", "#compare")}</p></div>
  <div class="p-media"><img src="${cut("m5-gps-dhc")}" alt="Motocaddy M5 GPS DHC with its GPS screen" width="800" height="800" loading="lazy"></div>
  <p class="p-fine">${q("offers.trolleyGift")}</p>
</section>`;

const compare = () => {
  const ids = ["se", "m1", "m5-gps-dhc", "m7-gps-remote"];
  return html`<section class="p-tile p-compare" id="compare" aria-labelledby="p-cp">
  <div class="p-copy"><h2 id="p-cp">Which Motocaddy is right for you?</h2><p class="p-sub">Four of the eight 2026 models, side by side.</p></div>
  <div class="p-cmp">${ids.map((id) => { const f = fam(id); const s = spec(f); return html`<article class="p-cmp__col">
    <img src="${cut(f.image, 400)}" alt="Motocaddy ${esc(f.name)}" width="400" height="400" loading="lazy">
    <h3>${esc(f.name)}</h3>
    <p class="p-cmp__price">${f.variants.length > 1 ? "From " : ""}${gbp(s.from)}</p>
    <p class="p-cmp__stock p-st--${s.stock.state}">${stockWord(s.stock)}</p>
    <p class="p-cmp__go"><a class="p-btn p-btn--s" href="${f.href}">Buy</a>${L("Learn more", f.href)}</p>
    <dl>
      <div><dt>GPS</dt><dd>${dot(s.gps, "GPS")}</dd></div>
      <div><dt>Downhill control</dt><dd>${dot(s.dhc, "Downhill control")}</dd></div>
      <div><dt>Remote</dt><dd>${dot(s.remote, "Remote")}</dd></div>
      <div><dt>Battery</dt><dd>${esc(s.batteries.map((b) => b.holes.replace(" holes", "")).join(" or "))} holes</dd></div>
    </dl>
  </article>`; })}</div>
  <p class="p-links">${L("Compare all eight models")}${L("Which trolley? Three quick questions")}</p>
</section>`;
};

const fitting = () => html`<section class="p-fit" id="fit" aria-labelledby="p-ft">
  <div class="p-copy"><h2 id="p-ft">Free custom fitting, in person.</h2>
    <p class="p-sub">About ${q("fitting.durationMinutes")} minutes on the ${q("fitting.launchMonitor")} with one of our fitters in Ringwood. Your numbers, no obligation.</p>
    <p class="p-links">${L("Book a slot")}${L("How fitting works")}</p></div>
  <ul class="p-team">
    ${[["Fitter", "Wilson · Srixon · Mizuno"], ["Fitter", "Putters and wedges"], ["Trolleys and shop", "Motocaddy advice and set-up"]].map(([role, does]) => html`<li>${ph(`Portrait: ${role.toLowerCase()} in the Ringwood centre`)}<h3>${qt("Name", "staff names and bios to be supplied")}</h3><p>${esc(role)} · ${esc(does)}</p></li>`)}
  </ul>
  <div class="p-fit__row">
    <ol class="p-steps">
      <li><b>1</b><div><h3>Talk</h3><p>Your game, goals and current clubs.</p></div></li>
      <li><b>2</b><div><h3>Hit</h3><p>Heads and shafts from ${esc(facts.fitting.brandsFitted.slice(0, 3).join(", "))} and more.</p></div></li>
      <li><b>3</b><div><h3>Decide</h3><p>A clear recommendation. Buying is optional.</p></div></li>
    </ol>
    <div class="p-centre">
      <h3>The Ringwood centre</h3>
      <p>${ic.pin}<span>${q("business.address")}</span></p>
      <p>${ic.clock}<span>${hours().join("<br>")}</span></p>
      <p>${ic.phone}<span>${phone()}</span></p>
      ${L("Directions")}
    </div>
  </div>
</section>`;

const members = () => { const s = saving(); return html`<section class="p-tile p-tile--grey" aria-labelledby="p-me">
  <div class="p-copy"><p class="p-kicker">${q("membership.name")} membership</p><h2 id="p-me">${gbp(s.net, { pence: true })} better off.</h2>
    <p class="p-sub">What an Annual member saves on an M5 GPS DHC, after the ${gbp(s.fee)} fee. Free membership costs nothing.</p>
    <p class="p-links">${L("Join free")}${L("Join Annual for " + gbp(s.fee))}</p></div>
  <div class="p-mem">
    <table class="p-sum"><caption class="sr">Worked saving</caption>
      <tr><th>${esc(s.product)}, ${esc(s.battery)}</th><td>${gbp(s.price, { pence: true })}</td></tr>
      <tr><th>Member price (${q("membership.memberDiscountPercent")}% off)</th><td>−${gbp(s.off, { pence: true })}</td></tr>
      <tr><th>Annual membership</th><td>+${gbp(s.fee, { pence: true })}</td></tr>
      <tr class="p-sum__t"><th>Better off by</th><td>${gbp(s.net, { pence: true })}</td></tr>
    </table>
    <div class="p-tiers">${tiers.map((t) => html`<div><h3>${esc(t.name)} <span>${t.price ? esc(t.priceLabel) + " a year" : "Free"}</span></h3><ul>${t.perks.map((p) => `<li>${perk(p.text)}</li>`)}</ul></div>`)}</div>
  </div>
</section>`; };

const grid = () => {
  const cells = [
    ...clubs.map((c, i) => ({ dark: i === 1, h: c.brand, sub: `${c.model}, from ${gbp(c.from)}.`, links: [L("Shop standard", c.href), L("Build custom")], img: `<img src="${cut(c.cut, 400)}" alt="${esc(`${c.brand} ${c.model}`)}" width="400" height="400" loading="lazy">` })),
    { h: "Approved used", sub: `Straight from the shop floor. Srixon ZXi 5 irons, ${gbp(709)}.`, links: [L("Shop used"), L("Trade in")], img: `<img class="is-photo" src="${photo("used-srixon-zxi5", 400)}" alt="Approved used Srixon ZXi 5 irons on the hitting mat" width="400" height="400" loading="lazy">` },
  ];
  return html`<div class="p-grid-wrap"><p class="p-grid__note">Clubs off the shelf or built to your fitting. Custom builds take ${q("leadTimes.customBuild")}.</p><div class="p-grid">${cells.map((c) => html`<section class="p-cell ${c.dark ? "p-cell--dark" : ""}"><div class="p-copy"><h3>${esc(c.h)}</h3><p class="p-sub">${c.sub}</p><p class="p-links">${c.links.join("")}</p></div><div class="p-cell__media">${c.img}</div></section>`)}</div></div>`;
};

const more = () => html`<section class="p-more" aria-labelledby="p-mo">
  <h2 id="p-mo">Also in the shop</h2>
  <ul>${secondary.filter((c) => c.name !== "Approved used").map((c) => `<li><a href="#">${c.img ? `<img src="${cut(c.img, 400)}" alt="" width="400" height="400" loading="lazy">` : `<span class="p-more__blank" aria-hidden="true"></span>`}<span>${esc(c.name)}</span></a></li>`).join("")}</ul>
  <p class="p-more__note">Rated ${q("trustpilot.rating")} on Trustpilot from ${q("trustpilot.reviewCount")} reviews. ${L("Read reviews")}${L("Buying guides")}</p>
</section>`;

const footer = () => html`<footer class="p-foot">
  <div class="p-foot__top">
    <div class="p-foot__brand"><span class="p-mark p-mark--inv" aria-hidden="true"><span>EG</span></span><p>Evolution Golf, Ringwood. Motocaddy trolleys, custom-fitted clubs and free fitting.</p></div>
    ${[["Shop", ["Electric trolleys", "Golf clubs", "Build custom clubs", "Bags", "Balls, GPS & accessories", "Approved used", "Clothing & shoes"]], ["Services", ["Custom fitting", "Membership", "Trade-in", "Members’ portal"]], ["Help", ["Delivery & returns", "Contact us", "Help & FAQs", facts.pricePromise.short, "Klarna & Clearpay", "About us"]]].map(([h, items]) => `<div><h2>${h}</h2><ul>${items.map((x) => `<li><a href="#">${esc(x)}</a></li>`).join("")}</ul></div>`).join("")}
    <form class="p-news" action="#"><h2>Newsletter</h2><p>Fitting days and new-season launches. Monthly at most.</p><label class="sr" for="p-e">Email address</label><div><input id="p-e" type="email" placeholder="Email address" autocomplete="email"><button type="submit">Sign up</button></div><label class="p-check"><input type="checkbox"> Email me news and offers. Unsubscribe any time.</label></form>
  </div>
  <div class="p-foot__base"><p>${q("business.address")} · ${hours().join(" · ")} · ${phone()} · ${email()}</p><p>${companyLine()} · ${q("dealers.motocaddy")} · Pay with ${payments.join(", ")}</p><p><a href="#">Privacy</a> · <a href="#">Cookies</a> · <a href="#">Terms</a> · <a href="#">Accessibility</a></p><p>${placeholderNote} Finance wording to be confirmed with Klarna and Clearpay.</p></div>
</footer>`;

export const showroomplus = {
  id: "showroomplus",
  n: 8,
  name: "Showroom+",
  direction: "Recommended combination: Showroom base + Keynote compare + The Local’s fitting",
  fonts: ["schibsted-grotesk-latin-wght-normal.woff2", "atkinson-hyperlegible-latin-400-normal.woff2"],
  sheet: {
    oneLine: "Showroom’s calm, one-idea-per-screen tiles, with Keynote’s compare row (light) and The Local’s people-led fitting section, in Evolution’s own green.",
    rationale: "This combines what worked best across the exploration. The structure is Showroom’s: light, full-width tiles that each do one job, so the three five-second messages (Motocaddy, free fitting, membership) land one screen at a time. Its weakness, slow browsing of the range, is fixed with Keynote’s ‘Which Motocaddy is right for you?’ compare row, restyled for a light page. Showroom’s single black fitting tile is replaced by The Local’s people-led fitting: the fitters’ faces, three steps and the centre’s hours and address. Identity comes from Evolution rather than Apple: brand green, the EG mark, a deep-green footer, Schibsted Grotesk for headlines (a sturdy, characterful news grotesk) and Atkinson Hyperlegible for body text, for older trolley buyers.",
    structure: "Hero → M5 GPS DHC tile → compare row (trolleys) → people-led fitting → membership tile with the sum and both tiers → a two-by-two grid for Wilson, Srixon, Mizuno and approved used → secondary categories and the Trustpilot line → green footer with address and hours.",
    palette: [
      { name: "Evolution green", hex: "#0e4d35", use: "EG mark, buttons, footer background, step numbers." },
      { name: "Link green", hex: "#0b6b47", use: "Text links (6.6:1 on white)." },
      { name: "Mist", hex: "#f3f5f4", use: "Alternating light tiles (a neutral near-white, not cream or mint)." },
      { name: "Ink", hex: "#16201b", use: "Text; the one dark cell in the club grid." },
      { name: "Slate", hex: "#56605b", use: "Secondary text (6.6:1 on white)." },
      { name: "Fern", hex: "#a7e3c3", use: "Links and highlights on the green footer and dark cell." },
    ],
    type: [
      { role: "Headlines", name: "Schibsted Grotesk (variable)", source: "Google Fonts, SIL OFL. A sturdy, slightly quirky news grotesk: more character than Inter, still calm at large sizes.", sample: "700 30px/1 'Schibsted'" },
      { role: "Body and UI", name: "Atkinson Hyperlegible (400/700)", source: "Google Fonts, SIL OFL. Designed for low-vision readers; very clear for older trolley buyers. Its zero carries a slash for legibility, so prices and sums are set in Schibsted Grotesk instead.", sample: "400 24px/1.2 'Atkinson'" },
    ],
    components: [
      { name: "Links and the one button", note: "Tiles use text links with a chevron. The only filled button is ‘Buy’ in the compare row.", html: '<p class="p-links" style="justify-content:flex-start"><a class="p-btn p-btn--s" href="#">Buy</a><a class="p-l" href="#">Book a free fitting<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.7"/></svg></a></p>' },
      { name: "Compare column", note: "Product, price, stock in words, Buy and Learn more, then aligned spec rows.", html: "" },
      { name: "Navigation", note: "A thin, translucent bar with the green EG mark; one delivery ribbon under it.", html: "" },
    ],
    imagery: "<p>Product cut-outs centred on light tiles (already available). Real photography of the team and the Ringwood centre for the fitting section: three portraits and one wide shot of the bay would complete it.</p>",
    copy: "<p><strong>H1:</strong> “Motocaddy trolleys. Custom‑fitted clubs.”</p><p><strong>Sections:</strong> “Which Motocaddy is right for you?” · “Free custom fitting, in person.” · “£60.90 better off.”</p>",
    motion: "Subtle: tiles fade up into view; compare columns highlight on hover; nothing on load except the hero image fading in.",
    tradeoffs: {
      good: "Clearest five-second read of all eight; calm and premium; light and highly legible for older buyers; the compare row makes the trolley decision easy; fitting has real people; tiles map one-to-one onto Shopify theme sections, so staff can maintain it.",
      weak: "Still fewer products per scroll than a classic shop homepage; needs the team photos to make the fitting section sing; the tile pattern will feel familiar to anyone who knows Apple’s site.",
      build: "Low–medium: tile, compare and team sections; compare row needs the trolley metafields (GPS, DHC, remote, battery).",
      photo: "Medium: three staff portraits and one shot of the fitting bay.",
      audience: "Everyone: first-time trolley buyers, golfers booking a fitting, members; especially mobile visitors.",
    },
    monogram: "‘EG’ in Schibsted Grotesk Bold, white on Evolution green, rounded square; inverted on the footer",
    scores: { trolley: 5, fitting: 5, membership: 5, premium: 5, build: "Low–medium", photo: "Medium: three portraits and the fitting bay" },
  },
  specimens() {
    this.sheet.components[1].html = `<div class="p" style="max-width:340px">${compare().match(/<article class="p-cmp__col">[\s\S]*?<\/article>/)[0]}</div>`;
    this.sheet.components[2].html = `<div class="p">${nav()}</div>`;
  },
  render() {
    return doc({
      title: "Evolution Golf: Motocaddy trolleys and custom-fitted clubs, Ringwood (concept: Showroom+)",
      css: "showroomplus",
      fonts: this.fonts,
      body: html`<a class="sr sr-focus" href="#p-main">Skip to content</a>
<div class="p">
${nav()}
<main id="p-main">
${hero()}
${m5()}
${compare()}
${fitting()}
${members()}
${grid()}
${more()}
</main>
${footer()}
</div>
${cookie("p-cookie")}`,
    });
  },
};
