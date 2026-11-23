// CONCEPT 9 · SHOWROOM+ v2 — rebalanced after owner feedback:
// national (not Ringwood-led), Motocaddy + custom clubs built online + the members' area are the three pillars;
// fitting becomes a supporting "near Ringwood?" option.
import {
  html, esc, gbp, q, qt, val, facts, families, fam, spec, stockWord, clubs, otherBrands, secondary, saving, tiers, perk,
  catalogue, cut, photo, phone, email, hours, companyLine, payments, cookie, doc, placeholderNote,
} from "./kit.mjs";

const chev = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>';
const L = (t, href = "#") => `<a class="p-l" href="${href}">${t}${chev}</a>`;
const dot = (on, label) => on ? `<span class="p-on" aria-label="${label}: yes">●</span>` : `<span class="p-off" aria-label="${label}: no">–</span>`;
const ic = {
  search: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m13 13 4 4" stroke="currentColor" stroke-width="1.5"/></svg>',
  bag: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 7h11l-.8 10H5.3L4.5 7Z M7.5 7V5.5a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  user: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="7" r="3.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M3.5 17c1.2-3 3.6-4.5 6.5-4.5s5.3 1.5 6.5 4.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  menu: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 7h14M3 13h14" stroke="currentColor" stroke-width="1.5"/></svg>',
  truck: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="7" cy="18" r="1.8" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="17" cy="18" r="1.8" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>',
};
const builder = catalogue.clubBuilder;
const area = facts.membership.area;

const nav = () => html`<header class="p-nav"><nav aria-label="Main"><ul>
  <li><a class="p-mark" href="#" aria-label="Evolution Golf, home"><span aria-hidden="true">EG</span></a></li>
  ${["Trolleys", "Custom clubs", "Clubs", "Membership", "Bags", "Balls & GPS", "Used", "Sale"].map((n) => `<li class="p-nav__item"><a href="#">${esc(n)}</a></li>`)}
  <li class="p-nav__push"><a href="#" aria-label="Search">${ic.search}</a></li>
  <li><a class="p-members" href="#members" aria-label="Members’ area">${ic.user}<span>Members</span></a></li>
  <li><a href="#" aria-label="Basket, 0 items">${ic.bag}</a></li><li class="p-nav__menu"><a href="#" aria-label="Menu">${ic.menu}</a></li>
</ul></nav></header>
<p class="p-ribbon">Free next-day UK delivery over ${gbp(val("delivery.nextDayFreeThreshold"))}, order by ${esc(val("delivery.nextDayCutoff"))}. Annual members get free delivery from £${q("delivery.annualMemberThreshold")}. ${L("Join free", "#members")}</p>`;

const hero = () => html`<section class="p-tile p-tile--hero" aria-labelledby="p-h1">
  <div class="p-copy">
    <p class="p-kicker">Evolution Golf · delivering across the UK</p>
    <h1 id="p-h1">Motocaddy trolleys.<br>Clubs built for you.</h1>
    <p class="p-sub">The 2026 Motocaddy range, custom Wilson, Srixon and Mizuno clubs built online, and a members’ club that pays for itself.</p>
    <p class="p-links">${L("Shop Motocaddy", "#compare")}${L("Build your clubs", "#build")}${L("Join the members’ club", "#members")}</p>
  </div>
  <div class="p-media p-hero2">
    <img class="p-hero2__t" src="${cut("m5-gps-dhc-highangle")}" alt="Motocaddy M5 GPS DHC electric trolley" width="800" height="800" fetchpriority="high">
    <img class="p-hero2__c" src="${cut("wilson-staff-model-blade", 400)}" alt="Wilson Staff Model Blade iron" width="400" height="400">
  </div>
</section>`;

const compare = () => {
  const ids = ["se", "m1", "m5-gps-dhc", "m7-gps-remote"];
  return html`<section class="p-tile p-tile--grey p-compare" id="compare" aria-labelledby="p-cp">
  <div class="p-copy"><h2 id="p-cp">Which Motocaddy is right for you?</h2><p class="p-sub">Four of the eight 2026 models, side by side. ${q("offers.trolleyGift")}</p></div>
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

const build = () => {
  const ex = clubs[0];
  const total = builder.types.reduce((n, t) => n + t.models, 0);
  return html`<section class="p-build" id="build" aria-labelledby="p-bd">
  <div class="p-copy p-copy--dark"><p class="p-kicker">Custom club builder</p><h2 id="p-bd">Build your clubs online.</h2>
    <p class="p-sub">Pick the club, the brand and the model, then set it up your way. ${total} buildable models from Wilson, Srixon, Mizuno and more, built to order and delivered across the UK. Custom builds take ${q("leadTimes.customBuild")}.</p></div>
  <ol class="p-steps2" aria-label="Builder steps">${builder.steps.map((s, i) => `<li><b>${i + 1}</b>${esc(s)}</li>`).join("")}</ol>
  <div class="p-build__grid">
    <ul class="p-types" aria-label="Start with a club type">${builder.types.map((t) => html`<li><a href="${builder.url}">
      <span class="p-types__n">${t.models}<small> models</small></span><strong>${esc(t.name)}</strong><span>${esc(t.line)}</span>${t.img ? `<img src="${cut(t.img, 400)}" alt="" width="400" height="400" loading="lazy">` : ""}</a></li>`)}</ul>
    <aside class="p-spec" aria-labelledby="p-ex">
      <p class="p-spec__tag">Example build</p>
      <h3 id="p-ex">${esc(ex.brand)} ${esc(ex.model)}</h3>
      <img src="${cut(ex.cut, 400)}" alt="" width="400" height="400" loading="lazy">
      <dl>
        <div><dt>Hand</dt><dd><span class="p-chip is-on">Right</span><span class="p-chip">Left</span></dd></div>
        ${ex.specs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${v.split(/\s*\/\s*|,\s*/).map((x, i) => `<span class="p-chip ${i === 0 ? "is-on" : ""}">${esc(x)}</span>`).join("")}</dd></div>`).join("")}
        <div><dt>Lie, length, grip</dt><dd class="p-spec__dim">Set in the builder</dd></div>
      </dl>
      <p class="p-spec__price">From ${gbp(ex.from)}</p>
      <a class="p-btn" href="${builder.url}">Start building</a>
    </aside>
  </div>
  <div class="p-help">
    <p class="p-help__h">Not sure of your specs?</p>
    <ul>
      <li>${L("Custom or standard? 30-second check")}</li>
      <li>${L("Ask our fitting team")}<span>${phone()} · ${email()}</span></li>
      <li>${L("Near Ringwood? Get fitted free", "#fit")}</li>
    </ul>
  </div>
</section>`;
};

const members = () => { const s = saving(); return html`<section class="p-tile p-tile--grey p-members-sec" id="members" aria-labelledby="p-me">
  <div class="p-copy"><p class="p-kicker">${q("membership.name")}</p><h2 id="p-me">Members get more.</h2>
    <p class="p-sub">${esc(facts.membership.oneLiner)}</p>
    <p class="p-links">${L("Join free")}${L("Join Annual for " + gbp(s.fee))}${L("Log in to the members’ area")}</p></div>
  <div class="p-mem2">
    <div class="p-portal" aria-labelledby="p-po">
      <p class="p-portal__bar"><span class="p-mark" aria-hidden="true"><span>EG</span></span><span id="p-po">Inside the members’ area</span><span class="p-portal__url">members.evolutiongolf.co.uk</span></p>
      <ul>${area.features.map(([h, d]) => `<li><strong>${esc(h)}</strong><span>${esc(d)}</span></li>`).join("")}</ul>
    </div>
    <div class="p-mem2__side">
      <table class="p-sum"><caption class="sr">Worked saving</caption>
        <tr><th>${esc(s.product)}, ${esc(s.battery)}</th><td>${gbp(s.price, { pence: true })}</td></tr>
        <tr><th>Your monthly ${q("membership.memberDiscountPercent")}% off</th><td>−${gbp(s.off, { pence: true })}</td></tr>
        <tr><th>Annual membership</th><td>+${gbp(s.fee, { pence: true })}</td></tr>
        <tr class="p-sum__t"><th>Better off on one order</th><td>${gbp(s.net, { pence: true })}</td></tr>
      </table>
      <div class="p-tiers">${tiers.map((t) => html`<div><h3>${esc(t.name)} <span>${t.price ? esc(t.priceLabel) + " a year" : "Free"}</span></h3><ul>${t.perks.map((p) => `<li>${perk(p.text)}</li>`)}</ul></div>`)}</div>
    </div>
  </div>
</section>`; };

const brands = () => {
  const cells = [
    ...clubs.map((c, i) => ({ dark: i === 1, h: c.brand, sub: `${c.model}, from ${gbp(c.from)}.`, links: [L("Build custom", builder.url), L("Shop standard", c.href)], img: `<img src="${cut(c.cut, 400)}" alt="${esc(`${c.brand} ${c.model}`)}" width="400" height="400" loading="lazy">` })),
    { h: "Approved used", sub: `Straight from the shop floor. Srixon ZXi 5 irons, ${gbp(709)}.`, links: [L("Shop used"), L("Trade in")], img: `<img class="is-photo" src="${photo("used-srixon-zxi5", 400)}" alt="Approved used Srixon ZXi 5 irons on the hitting mat" width="400" height="400" loading="lazy">` },
  ];
  return html`<div class="p-grid">${cells.map((c) => html`<section class="p-cell ${c.dark ? "p-cell--dark" : ""}"><div class="p-copy"><h3>${esc(c.h)}</h3><p class="p-sub">${c.sub}</p><p class="p-links">${c.links.join("")}</p></div><div class="p-cell__media">${c.img}</div></section>`)}</div>`;
};

const fit = () => html`<section class="p-near" id="fit" aria-labelledby="p-ft">
  <div class="p-near__ph" role="img" aria-label="Photo to come: the fitting bay in Ringwood"><span class="q" title="To be confirmed: photography not yet taken">The fitting bay in Ringwood</span></div>
  <div class="p-near__copy">
    <h2 id="p-ft">Near Ringwood? Get fitted for free.</h2>
    <p>About ${q("fitting.durationMinutes")} minutes on the ${q("fitting.launchMonitor")} with one of our fitters. No obligation, and your specs go straight into the builder.</p>
    <p class="p-near__meta">${ic.pin}<span>${q("business.address")}</span></p>
    <p class="p-near__meta">${ic.phone}<span>${phone()} · ${hours()[0]}</span></p>
    <p class="p-links p-links--left">${L("Book a free fitting")}${L("Directions")}</p>
  </div>
</section>`;

const more = () => html`<section class="p-more" aria-labelledby="p-mo">
  <h2 id="p-mo">Also in the shop</h2>
  <ul>${secondary.filter((c) => c.name !== "Approved used").map((c) => `<li><a href="#">${c.img ? `<img src="${cut(c.img, 400)}" alt="" width="400" height="400" loading="lazy">` : `<span class="p-more__blank" aria-hidden="true"></span>`}<span>${esc(c.name)}</span></a></li>`).join("")}</ul>
  <p class="p-more__note">Rated ${q("trustpilot.rating")} on Trustpilot from ${q("trustpilot.reviewCount")} reviews. ${L("Read reviews")}${L("Buying guides")}</p>
</section>`;

const footer = () => html`<footer class="p-foot">
  <div class="p-foot__top">
    <div class="p-foot__brand"><span class="p-mark p-mark--inv" aria-hidden="true"><span>EG</span></span><p>Motocaddy trolleys, custom-built clubs and a members’ club, delivered across the UK.</p></div>
    ${[["Shop", ["Electric trolleys", "Build custom clubs", "Golf clubs", "Bags", "Balls, GPS & accessories", "Approved used", "Clothing & shoes"]], ["Members", ["Join free", "Annual membership", "Members’ area log-in", "Prize draw T&Cs", "Trade-in"]], ["Help", ["Delivery & returns", "Contact us", "Help & FAQs", facts.pricePromise.short, "Klarna & Clearpay", "Custom fitting in Ringwood", "About us"]]].map(([h, items]) => `<div><h2>${h}</h2><ul>${items.map((x) => `<li><a href="#">${esc(x)}</a></li>`).join("")}</ul></div>`).join("")}
    <form class="p-news" action="#"><h2>Newsletter</h2><p>New-season launches and member offers. Monthly at most.</p><label class="sr" for="p-e">Email address</label><div><input id="p-e" type="email" placeholder="Email address" autocomplete="email"><button type="submit">Sign up</button></div><label class="p-check"><input type="checkbox"> Email me news and offers. Unsubscribe any time.</label></form>
  </div>
  <div class="p-foot__base"><p>Showroom and fitting centre: ${q("business.address")} · ${hours().join(" · ")} · ${phone()} · ${email()}</p><p>${companyLine()} · ${q("dealers.motocaddy")} · Pay with ${payments.join(", ")}</p><p><a href="#">Privacy</a> · <a href="#">Cookies</a> · <a href="#">Terms</a> · <a href="#">Accessibility</a></p><p>${placeholderNote} Finance wording to be confirmed with Klarna and Clearpay.</p></div>
</footer>`;

export const showroomplus2 = {
  id: "showroomplus2",
  n: 9,
  name: "Showroom+ v2",
  direction: "Showroom+ rebalanced: national, with Motocaddy, custom clubs and the members’ area as the three pillars",
  fonts: ["schibsted-grotesk-latin-wght-normal.woff2", "atkinson-hyperlegible-latin-400-normal.woff2"],
  sheet: {
    oneLine: "Showroom+ rebalanced for a UK-wide audience: Motocaddy, custom clubs built online and the members’ area lead; fitting is a ‘near Ringwood?’ option.",
    rationale: "Owner feedback: fitting was over-weighted for a business that sells across the UK from one bay in Ringwood, and next year’s big pushes are the custom club builder and the members’ area. So v2 keeps Showroom+’s calm, light, one-idea-per-screen structure but changes what the ideas are. The hero names Motocaddy and ‘clubs built for you’ and says ‘delivering across the UK’, not Ringwood. A full dark section sells the online builder with its real steps and live model counts (33 drivers, 21 fairways, 22 hybrids and utility irons, 47 irons), an example build with real spec options, and three routes for anyone unsure of their specs. The members’ section becomes a preview of the members’ area itself, using the perks published on the current members page. Fitting moves to a compact ‘Near Ringwood? Get fitted for free’ band, positioned as one of the ways to get your specs for the builder.",
    structure: "Hero (three links: Motocaddy, build your clubs, join) → Motocaddy compare row → custom club builder (dark, the big push) → members’ area preview with the worked saving and both tiers → Wilson / Srixon / Mizuno / used grid (build custom first) → near-Ringwood fitting band → rest of the shop → footer with a Members column.",
    palette: [
      { name: "Evolution green", hex: "#0e4d35", use: "EG mark, buttons, footer, step numbers." },
      { name: "Link green", hex: "#0b6b47", use: "Text links (6.6:1 on white)." },
      { name: "Mist", hex: "#f3f5f4", use: "Light tiles." },
      { name: "Ink", hex: "#16201b", use: "Text; the builder section and one grid cell." },
      { name: "Slate", hex: "#56605b", use: "Secondary text." },
      { name: "Fern", hex: "#a7e3c3", use: "Links and chips on dark (builder, footer)." },
    ],
    type: [
      { role: "Headlines and prices", name: "Schibsted Grotesk (variable)", source: "Google Fonts, SIL OFL.", sample: "700 30px/1 'Schibsted'" },
      { role: "Body and UI", name: "Atkinson Hyperlegible (400/700)", source: "Google Fonts, SIL OFL. Very clear for older trolley buyers.", sample: "400 24px/1.2 'Atkinson'" },
    ],
    components: [
      { name: "Builder entry", note: "Club-type cards with live model counts, an example build with real spec options as chips, and a ‘Start building’ button.", bg: "#16201b", html: "" },
      { name: "Members’ area preview", note: "A framed preview of what’s inside the members’ area, from the perks on the current members page.", html: "" },
      { name: "Navigation", note: "‘Custom clubs’ and ‘Membership’ in the main nav; a labelled ‘Members’ link sits next to the basket so members can always log in.", html: "" },
    ],
    imagery: "<p>Product cut-outs on light tiles; club heads on the dark builder section. One photo of the fitting bay for the near-Ringwood band. No staff portraits needed on the homepage any more (they move to the fitting page).</p>",
    copy: "<p><strong>H1:</strong> “Motocaddy trolleys. Clubs built for you.”</p><p><strong>Sections:</strong> “Which Motocaddy is right for you?” · “Build your clubs online.” · “Members get more.” · “Near Ringwood? Get fitted for free.”</p>",
    motion: "As Showroom+: tiles fade up; builder type cards lift on hover; chips toggle in the example build.",
    tradeoffs: {
      good: "Reads as a UK-wide specialist, not a local shop; gives the builder and the members’ area the weight they need for next year; fitting still visible as a genuine extra for people nearby; needs only one new photograph.",
      weak: "Less human than v1 (no faces on the homepage); the members’ perks are numerous, so the preview must stay in step with the portal; builder counts must update from data, not by hand.",
      build: "Medium: builder entry should read live counts from the builder’s data source; members’ preview needs a single source shared with the portal.",
      photo: "Low: one shot of the fitting bay.",
      audience: "UK-wide buyers of Motocaddy trolleys and custom clubs; members and would-be members.",
    },
    monogram: "As Showroom+: ‘EG’ in Schibsted Grotesk Bold, white on Evolution green",
    scores: { trolley: 5, fitting: 3, membership: 5, premium: 5, build: "Medium", photo: "Low: one fitting-bay photo" },
  },
  specimens() {
    this.sheet.components[0].html = `<div class="p" style="background:#16201b;padding:16px">${build().match(/<div class="p-build__grid">[\s\S]*?<\/aside>\s*<\/div>/)[0]}</div>`;
    this.sheet.components[1].html = `<div class="p">${members().match(/<div class="p-portal"[\s\S]*?<\/ul>\s*<\/div>/)[0]}</div>`;
    this.sheet.components[2].html = `<div class="p">${nav()}</div>`;
  },
  render() {
    return doc({
      title: "Evolution Golf: Motocaddy trolleys, custom clubs built online, members’ club (concept: Showroom+ v2)",
      css: "showroomplus2",
      fonts: this.fonts,
      body: html`<a class="sr sr-focus" href="#p-main">Skip to content</a>
<div class="p">
${nav()}
<main id="p-main">
${hero()}
${compare()}
${build()}
${members()}
${brands()}
${fit()}
${more()}
</main>
${footer()}
</div>
${cookie("p-cookie")}`,
    });
  },
};
