// CONCEPT 9 · SHOWROOM+ v2 — rebalanced after owner feedback:
// national (not Ringwood-led), Motocaddy + custom clubs built online + the members' area are the three pillars;
// fitting becomes a supporting "near Ringwood?" option.
import {
  html, esc, gbp, q, qt, val, facts, families, fam, spec, stockWord, clubs, otherBrands, secondary, saving, tiers, perk,
  catalogue, cut, photo, phone, email, hours, companyLine, payments, cookie, doc, placeholderNote, site, to, allTrolleys,
} from "./kit.mjs";

export const chev = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>';
export const L = (t, href = to(t)) => `<a class="p-l" href="${href}">${t}${chev}</a>`;
export const dot = (on, label) => on ? `<span class="p-on" aria-hidden="true">●</span><span class="sr">${label}: yes</span>` : `<span class="p-off" aria-hidden="true">–</span><span class="sr">${label}: no</span>`;
export const ic = {
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

const NAV = ["Trolleys", "Custom clubs", "Clubs", "Bags", "Balls & GPS", "Used", "Sale"];
export const nav = () => html`<header class="p-nav"><nav aria-label="Main"><ul>
  <li><a class="p-mark" href="${to("Home")}" aria-label="Evolution Golf, home"><span aria-hidden="true">EG</span></a></li>
  ${NAV.map((n) => `<li class="p-nav__item"><a href="${to(n)}">${esc(n)}</a></li>`)}
  <li class="p-nav__push"><a href="#" aria-label="Search">${ic.search}</a></li>
  <li><a class="p-members" href="${site.routes.Members ?? "#members"}" aria-label="Membership and members’ area">${ic.user}<span>Members</span></a></li>
  <li><a href="${to("Basket")}" class="p-basket" aria-label="Basket, 0 items" data-basket>${ic.bag}<span class="p-basket__n" data-basket-n hidden></span></a></li><li class="p-nav__menu"><button type="button" class="p-nav__btn" aria-label="Menu" aria-expanded="false" aria-controls="p-menu" data-menu>${ic.menu}</button></li>
</ul><ul class="p-menu" id="p-menu" hidden>${NAV.map((n) => `<li><a href="${to(n)}">${esc(n)}</a></li>`).join("")}</ul></nav></header>
<p class="p-ribbon" role="region" aria-label="Delivery offer">Free next-day UK delivery over ${gbp(val("delivery.nextDayFreeThreshold"))} · order by ${esc(val("delivery.nextDayCutoff"))}</p>`;

const memberCard = () => `<span class="p-mcard" aria-hidden="true"><span class="p-mcard__eg">EG</span><span class="p-mcard__t">Annual member</span><span class="p-mcard__p">£36 a year</span></span>`;
const hero = () => {
  const from = Math.min(...allTrolleys().map((f) => spec(f).price));
  const models = builder.types.reduce((n, t) => n + t.models, 0);
  const doors = [
    { t: "Motocaddy trolleys", s: `2026 range from ${gbp(from)}`, href: site.routes["Electric trolleys"] ?? "#compare", img: `<img src="${cut("m5-gps-dhc-highangle")}" alt="" width="800" height="800" fetchpriority="high">` },
    { t: "Custom clubs", s: `${models} models, built online`, href: site.routes["Custom clubs"] ?? "#build", img: `<img src="${cut("wilson-staff-model-blade")}" alt="" width="800" height="800">` },
    { t: "Members’ club", s: "Free, or Annual at £36 a year", href: "#members", img: memberCard() },
  ];
  return html`<section class="p-tile p-tile--hero" aria-labelledby="p-h1">
  <div class="p-copy">
    <h1 id="p-h1">Trolleys, custom clubs, and members who pay less.</h1>
    <p class="p-sub">The 2026 Motocaddy range, clubs built to your specs online, and a members’ club that’s free to join. Delivered across the UK.</p>
  </div>
  <ul class="p-doors">${doors.map((d) => html`<li class="p-door"><a href="${d.href}"><span class="p-door__img">${d.img}</span><span class="p-door__txt"><strong class="p-door__t">${esc(d.t)}${chev}</strong><span class="p-door__s">${esc(d.s)}</span></span></a></li>`)}</ul>
  <p class="p-hero__proof">Rated ${q("trustpilot.rating")} on Trustpilot from ${q("trustpilot.reviewCount")} reviews · ${L("Read reviews")}</p>
</section>`;
};

const compare = () => {
  const ids = ["se", "m1", "m5-gps-dhc", "m7-gps-remote"];
  return html`<section class="p-tile p-tile--grey p-compare" id="compare" aria-labelledby="p-cp">
  <div class="p-copy"><h2 id="p-cp">Which Motocaddy is right for you?</h2><p class="p-sub">Four of the eight 2026 Motocaddy models, side by side.</p></div>
  <p class="p-cmp__hint" aria-hidden="true">Swipe to compare all four</p>
  <div class="p-cmp" tabindex="0" role="region" aria-label="Four Motocaddy trolleys compared, scrolls sideways on small screens">${ids.map((id) => { const f = fam(id); const s = spec(f); return html`<article class="p-cmp__col">
    <img src="${cut(f.image, 400)}" alt="Motocaddy ${esc(f.name)}" width="400" height="400" loading="lazy">
    <h3>${esc(f.name)}</h3>
    <p class="p-cmp__price">${s.priceFrom ? "From " : ""}${gbp(s.price)}</p>
    <p class="p-cmp__stock p-st--${s.stock.state}">${stockWord(s.stock)}${s.stock.detail ? ` · ${esc(s.stock.detail)}` : ""}</p>
    <p class="p-cmp__go"><a class="p-btn p-btn--s p-btn--ghost" href="${f.href}#buy">${s.stock.state === "out" ? "View" : "Buy"}<span class="sr"> the ${esc(f.name)}</span></a></p>
    <p class="p-cmp__feat">${esc([s.gps && "GPS", s.dhc && "Downhill control", s.remote && "Remote", `${[...new Set(s.batteries.map((b) => b.holes.replace(" holes", "")))].join(" or ")} holes`].filter(Boolean).join(" · "))}</p>
  </article>`; })}</div>
  <p class="p-links">${L(`See all ${allTrolleys().length} electric trolleys, including NAVEE and Powerbug`, site.routes["Electric trolleys"] ?? "#")}</p>
</section>`;
};

const build = () => {
  const total = builder.types.reduce((n, t) => n + t.models, 0);
  return html`<section class="p-build" id="build" aria-labelledby="p-bd">
  <div class="p-copy"><h2 id="p-bd">Build your clubs online.</h2>
    <p class="p-sub">Pick the club, the brand and the model, then set it up your way. ${total} models from six brands, built to order in ${q("leadTimes.customBuild")}.</p></div>
  <div class="p-build__grid">
    <ul class="p-types" aria-label="Start with a club type">${builder.types.map((t) => html`<li><a href="${builder.url}?type=${t.slug}">
      ${t.img ? `<img src="${cut(t.img, 400)}" alt="" width="400" height="400" loading="lazy">` : `<span class="p-types__blank" aria-hidden="true"></span>`}<strong>${esc(t.name)}</strong><span>${t.models} models · from ${gbp(t.from)} ${t.unit}</span></a></li>`)}</ul>
  </div>
  <p class="p-hero__cta p-build__go"><a class="p-btn" href="${site.routes["Custom clubs"] ?? builder.url}">Start building</a>${L("Not sure of your specs? Ask our team", site.routes["Custom clubs"] ? site.routes["Custom clubs"] + "#c-hp" : "#")}</p>
</section>`;
};

const members = () => {
  const s = saving();
  const annual = tiers.find((t) => t.price), free = tiers.find((t) => !t.price);
  const pct = val("membership.memberDiscountPercent");
  return html`<section class="p-tile p-members-sec" id="members" aria-labelledby="p-me">
  <div class="p-mem3">
    <div class="p-mem3__pitch">
      <p class="p-kicker">${q("membership.name")}</p>
      <h2 id="p-me">Annual pays for itself on one trolley.</h2>
      <p class="p-mem3__big">${gbp(s.net, { pence: true })}</p>
      <p class="p-mem3__cap">better off on a ${gbp(s.price)} ${esc(s.product)}, after the ${gbp(s.fee)} fee.</p>
      <ul class="p-sum3" aria-label="Worked saving">
        <li>${gbp(s.price, { pence: true })}<span class="sr"> trolley price</span></li>
        <li>−${gbp(s.off, { pence: true })} at ${q("membership.memberDiscountPercent")}% off</li>
        <li>+${gbp(s.fee, { pence: true })} Annual fee</li>
      </ul>
    </div>
    <div class="p-mem3__tiers">
      <div class="p-tier3">
        <p class="p-tier3__head"><span class="p-tier3__eg" aria-hidden="true">EG</span><strong>${esc(annual.name)}</strong><span>${esc(annual.priceLabel)} a year</span></p>
        <ul><li>${pct}% off one order a month</li><li>15% off members’-area deals</li><li>1.25× loyalty points and 48-hour early access</li></ul>
        <a class="p-btn" href="#">Join Annual for ${gbp(s.fee)}</a>
      </div>
      <div class="p-tier3 p-tier3--free">
        <p class="p-tier3__head"><strong>${esc(free.name)}</strong><span>£0</span></p>
        <p>Members’ area, 5% off members’-area deals and loyalty points.</p>
        ${L("Join free")}
      </div>
    </div>
  </div>
  <p class="p-mem3__more">${L("See every perk, delivery and returns detail")}</p>
</section>`;
};

const brands = () => {
  const cells = [
    ...clubs.map((c, i) => ({ dark: i === 1, h: c.brand, sub: `${c.model}, from ${gbp(c.from)}.`, links: [L("Build custom", builder.url), L("Shop standard", c.href)], img: `<img src="${cut(c.cut, 400)}" alt="${esc(`${c.brand} ${c.model}`)}" width="400" height="400" loading="lazy">` })),
    { h: "Approved used", sub: `Straight from the shop floor. Srixon ZXi 5 irons, ${gbp(709)}.`, links: [L("Shop used"), L("Trade in")], img: `<img class="is-photo" src="${photo("used-srixon-zxi5", 400)}" alt="Approved used Srixon ZXi 5 irons on the hitting mat" width="400" height="400" loading="lazy">` },
  ];
  return html`<div class="p-grid">${cells.map((c) => html`<section class="p-cell ${c.dark ? "p-cell--dark" : ""}"><div class="p-copy"><h3>${esc(c.h)}</h3><p class="p-sub">${c.sub}</p><p class="p-links">${c.links.join("")}</p></div><div class="p-cell__media">${c.img}</div></section>`)}</div>`;
};


/* Shop the hole: a tee-to-green route into the range (static mockup shows "Off the tee" selected) */
const ZONES = [
  { id: "tee", n: 1, name: "Off the tee", what: "Drivers", x: 13.2, y: 78.4 },
  { id: "fairway", n: 2, name: "From the fairway", what: "Woods, hybrids and irons", x: 41.5, y: 46.1 },
  { id: "approach", n: 3, name: "Into the green", what: "Wedges and rangefinders", x: 63.8, y: 33.5 },
  { id: "green", n: 4, name: "On the green", what: "Putters", x: 81.3, y: 21.4 },
  { id: "walk", n: 5, name: "Getting round", what: "Motocaddy trolleys, bags and GPS", x: 30, y: 80 },
];
export const holeMap = () => `<svg class="h-map" viewBox="0 0 1000 320" aria-hidden="true" focusable="false">
  <rect width="1000" height="320" rx="0" fill="#f3f5f4"/>
  <path d="M30 300 C260 292 470 304 690 284 S930 270 990 280" fill="none" stroke="#e3e8e5" stroke-width="10" stroke-linecap="round"/>
  <path d="M40 236 C140 170 300 214 430 186 C560 158 620 200 720 170 C800 146 830 96 890 80 C960 64 990 130 950 170 C900 214 820 196 740 224 C620 266 500 222 400 248 C280 276 140 282 70 266 C34 258 24 248 40 236Z" fill="#a7e3c3"/>
  <ellipse cx="864" cy="98" rx="74" ry="46" fill="#0a3a28"/>
  <ellipse cx="770" cy="236" rx="46" ry="15" fill="#fff" stroke="#e3e8e5" stroke-width="2"/>
  <ellipse cx="958" cy="60" rx="26" ry="11" fill="#fff" stroke="#e3e8e5" stroke-width="2"/>
  <rect x="62" y="216" width="46" height="26" rx="6" fill="#0a3a28"/>
  <path d="M90 224 C220 150 330 180 410 186 S620 150 670 148 S820 100 860 96" fill="none" stroke="#16201b" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round"/>
  <line x1="872" y1="96" x2="872" y2="44" stroke="#fff" stroke-width="3"/><path d="M872 44 L904 54 L872 64Z" fill="#fff"/>
</svg>`;

const HOLE_LINKS = { tee: "Drivers", fairway: "Fairway woods & hybrids", approach: "Wedges & rangefinders", green: "Putters", walk: "Electric trolleys" };
const hole = () => html`<section class="h" id="hole" aria-labelledby="h-t">
  <div class="p-copy"><h2 id="h-t">Shop the hole.</h2>
    <p class="p-sub">From the tee to the green: pick a shot and see what you’d use there.</p></div>
  <div class="h-course h-course--photo">
    ${catalogue.holePhoto.src
      ? `<img class="h-photo" src="${site.base}${catalogue.holePhoto.src}" srcset="${site.base}${catalogue.holePhoto.srcSmall} 800w, ${site.base}${catalogue.holePhoto.src} 1600w" sizes="(min-width: 1360px) 1280px, 94vw" alt="${esc(catalogue.holePhoto.alt)}" width="${catalogue.holePhoto.w}" height="${catalogue.holePhoto.h}" loading="lazy">`
      : `<div class="h-photo h-photo--todo" role="img" aria-label="Photo to come: aerial view of a golf hole"><span class="q" title="To be confirmed: ${esc(catalogue.holePhoto.note)}">Aerial photo of a golf hole, tee to green: to be supplied</span></div>`}
    ${ZONES.map((z) => `<span class="h-pin" style="left:${z.x}%;top:${z.y}%" aria-hidden="true">${z.n}</span>`).join("")}
  </div>
  ${catalogue.holePhoto.placeholder ? `<p class="h-cap">${qt("Illustration for now", catalogue.holePhoto.note)}</p>` : ""}
  <ul class="h-stops" aria-label="Shop by shot">
    ${ZONES.map((z) => `<li><a href="${to(HOLE_LINKS[z.id])}"><b aria-hidden="true">${z.n}</b><span>${esc(z.name)}<small>${esc(z.what)}</small></span></a></li>`).join("")}
  </ul>
  <p class="p-also">Also in the shop: ${["Bags", "Balls", "GPS & rangefinders", "Trade-in", "Accessories", "Sale", "Clothing & shoes"].map((n) => `<a href="${to(n)}">${esc(n)}</a>`).join(" · ")}</p>
</section>`;

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
</section>`;

export const footer = () => html`<footer class="p-foot">
  <div class="p-foot__top">
    <div class="p-foot__brand"><span class="p-mark p-mark--inv" aria-hidden="true"><span>EG</span></span><p>Motocaddy trolleys, custom-built clubs and a members’ club, delivered across the UK.</p></div>
    ${[["Shop", ["Electric trolleys", "Build custom clubs", "Golf clubs", "Bags", "Balls, GPS & accessories", "Approved used", "Clothing & shoes"]], ["Members", ["Join free", "Annual membership", "Members’ area log-in", "Prize draw T&Cs", "Trade-in"]], ["Help", ["Delivery & returns", "Contact us", "Help & FAQs", facts.pricePromise.short, "Klarna & Clearpay", "Custom fitting in Hampshire", "Buying guides", "About us"]]].map(([h, items]) => `<details class="p-foot__col${h === "Help" ? " p-foot__col--keep" : ""}" open><summary><span class="p-foot__h">${h}</span><span class="p-foot__i" aria-hidden="true"></span></summary><ul>${items.map((x) => `<li><a href="${to(x)}">${esc(x)}</a></li>`).join("")}</ul></details>`).join("")}
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
    structure: "Hero (three links: Motocaddy, build your clubs, join) → Motocaddy compare row → custom club builder (dark, the big push) → members’ area preview with the worked saving and both tiers → Shop the hole (replaces the brand grid: five shots from tee to green, each with buy-or-build) → near-Ringwood fitting band → rest of the shop → footer with a Members column.",
    palette: [
      { name: "Evolution green", hex: "#0a3a28", use: "EG mark, buttons, footer, step numbers." },
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
    this.sheet.components[0].html = `<div class="p">${(build().match(/<ul class="p-types"[\s\S]*?<\/ul>/) || [""])[0]}</div>`;
    this.sheet.components[1].html = `<div class="p"><section class="p-members-sec">${(members().match(/<div class="p-mem3__pitch">[\s\S]*?<\/ul>\s*<\/div>/) || [""])[0]}</section></div>`;
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
${hole()}
</main>
${footer()}
</div>
${cookie("p-cookie")}`,
    });
  },
};
