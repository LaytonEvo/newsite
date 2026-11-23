// CONCEPT 7 · STORE (Apple-inspired: shop page with horizontal shelves)
// A picture-led category row, then themed horizontal shelves of large rounded cards.
import {
  html, esc, gbp, q, qt, val, facts, families, flagship, fam, spec, stockWord, clubs, otherBrands, secondary, saving, tiers, perk,
  catalogue, cut, photo, phone, email, hours, companyLine, payments, cookie, doc, placeholderNote,
} from "./kit.mjs";

const chev = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
const L = (t, href = "#") => `<a class="t-l" href="${href}">${t}${chev}</a>`;
const ic = {
  fit: '<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="24" cy="24" r="9" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="24" cy="24" r="2.5" fill="currentColor"/></svg>',
  card: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="12" width="36" height="24" rx="4" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M6 19h36" stroke="currentColor" stroke-width="2.5"/></svg>',
  swap: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 17h26l-6-6M38 31H12l6 6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  tag: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 24V8h16l16 16-16 16L8 24Z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/><circle cx="16" cy="16" r="3" fill="currentColor"/></svg>',
  search: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m13 13 4 4" stroke="currentColor" stroke-width="1.5"/></svg>',
  bag: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 7h11l-.8 10H5.3L4.5 7Z M7.5 7V5.5a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>',
  phone: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 8h8l4 10-5 3a22 22 0 0 0 10 10l3-5 10 4v8a4 4 0 0 1-4 4C21 42 6 27 6 12a4 4 0 0 1 4-4Z" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>',
  pin: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M24 42s-13-11-13-21a13 13 0 0 1 26 0c0 10-13 21-13 21Z" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="24" cy="21" r="5" fill="none" stroke="currentColor" stroke-width="2.5"/></svg>',
};

const top = () => html`<header class="t-top">
  <a class="t-logo" href="#" aria-label="Evolution Golf, home"><span aria-hidden="true">EG</span></a>
  <form class="t-search" role="search" action="#"><label class="sr" for="t-q">Search</label>${ic.search}<input id="t-q" type="search" placeholder="Search the shop"></form>
  <a class="t-ib" href="#" aria-label="Basket, 0 items">${ic.bag}</a>
</header>`;

const intro = () => html`<section class="t-intro" aria-labelledby="t-h1">
  <h1 id="t-h1"><b>Shop.</b> Motocaddy trolleys and custom‑fitted clubs, with free fitting in Ringwood.</h1>
  <div class="t-intro__help"><p>Need advice?</p>${L("Talk to a fitter", "tel:" + val("business.phoneHref"))}<p>Rather see it first?</p>${L("Visit us in Ringwood")}</div>
</section>`;

const cats = () => {
  const items = [
    ["Trolleys", `<img src="${cut("m5-gps-dhc", 400)}" alt="" width="400" height="400">`],
    ["Clubs", `<img src="${cut("srixon-zxir-irons", 400)}" alt="" width="400" height="400">`],
    ["Free fitting", ic.fit, "is-svc"],
    ["Membership", ic.card, "is-svc"],
    ["Bags", `<img src="${cut("bag-dry-series", 400)}" alt="" width="400" height="400">`],
    ["Balls", `<img src="${cut("balls-soft-feel", 400)}" alt="" width="400" height="400">`],
    ["GPS & lasers", `<img src="${cut("laser-shotscope", 400)}" alt="" width="400" height="400">`],
    ["Approved used", `<img class="is-photo" src="${photo("used-srixon-zxi5", 400)}" alt="" width="400" height="400">`],
    ["Trade-in", ic.swap, "is-svc"],
    ["Sale", ic.tag, "is-svc"],
  ];
  return html`<nav class="t-cats" aria-label="Shop by category"><ul>${items.map(([n, m, c = ""]) => `<li><a href="#" class="${c}"><span class="t-cats__img">${m}</span><span>${esc(n)}</span></a></li>`).join("")}</ul></nav>`;
};

const shelf = (id, title, lead, cards) => html`<section class="t-shelf" aria-labelledby="${id}">
  <h2 id="${id}"><b>${title}</b> ${lead}</h2>
  <ul class="t-row">${cards.join("")}</ul>
</section>`;

const trolleyCards = () => families().map((f) => { const s = spec(f); const feats = [s.gps && "GPS", s.dhc && "Downhill control", s.remote && "Remote"].filter(Boolean); return html`<li class="t-card t-card--prod">
  <a href="${f.href}">
    <span class="t-card__flag">${s.stock.state === "in" ? "In stock" : stockWord(s.stock)}</span>
    <span class="t-card__name">Motocaddy ${esc(f.name)}</span>
    <span class="t-card__meta">${esc([...feats, s.batteries.map((b) => b.holes.replace(" holes", "")).join(" or ") + " holes"].join(" · "))}</span>
    <span class="t-card__price">${f.variants.length > 1 ? "From " : ""}${gbp(s.from)}</span>
    <img src="${cut(f.image, 400)}" alt="" width="400" height="400" loading="lazy">
  </a></li>`; });

const helpCards = () => [
  html`<li class="t-card t-card--dark"><a href="#"><span class="t-card__flag">Free · ${q("fitting.durationMinutes")} min</span><span class="t-card__big">Book a free fitting in Ringwood.</span><span class="t-card__meta">Launch-monitor session with a fitter. No obligation to buy.</span><span class="t-card__icon">${ic.fit}</span></a></li>`,
  html`<li class="t-card"><a href="#"><span class="t-card__flag">Three questions</span><span class="t-card__big">Find your trolley.</span><span class="t-card__meta">GPS? Hilly course? 18 or 36 holes? We’ll narrow the range.</span><span class="t-card__icon">${ic.tag}</span></a></li>`,
  html`<li class="t-card"><a href="tel:${val("business.phoneHref")}"><span class="t-card__flag">${esc(facts.business.hours[0].days)}</span><span class="t-card__big">Call a fitter.</span><span class="t-card__meta">${esc(val("business.phoneDisplay"))}</span><span class="t-card__icon">${ic.phone}</span></a></li>`,
  html`<li class="t-card"><a href="#"><span class="t-card__flag">Ringwood, Hampshire</span><span class="t-card__big">Visit the centre.</span><span class="t-card__meta">${q("business.address")}</span><span class="t-card__icon">${ic.pin}</span></a></li>`,
];

const clubCards = () => clubs.map((c) => html`<li class="t-card t-card--prod"><a href="${c.href}">
  <span class="t-card__flag">Standard or custom</span><span class="t-card__name">${esc(c.brand)}</span><span class="t-card__meta">${esc(c.model)}</span><span class="t-card__price">From ${gbp(c.from)}</span>
  <img src="${cut(c.cut, 400)}" alt="" width="400" height="400" loading="lazy"></a></li>`).concat([
  html`<li class="t-card t-card--tint"><a href="#"><span class="t-card__flag">Not sure?</span><span class="t-card__big">Custom or standard, in 30 seconds.</span><span class="t-card__meta">Custom builds take ${q("leadTimes.customBuild")}.</span><span class="t-card__icon">${ic.swap}</span></a></li>`,
]);

const memberCards = () => { const s = saving(); return [
  html`<li class="t-card t-card--dark"><a href="#"><span class="t-card__flag">${q("membership.name")}</span><span class="t-card__big">${gbp(s.net, { pence: true })} better off on one trolley.</span><span class="t-card__meta">${esc(s.product)}, ${gbp(s.price)}, at ${q("membership.memberDiscountPercent")}% member price, less the ${gbp(s.fee)} Annual fee.</span></a></li>`,
  ...tiers.map((t) => html`<li class="t-card"><a href="#"><span class="t-card__flag">${t.price ? esc(t.priceLabel) + " a year" : "Free"}</span><span class="t-card__big">${esc(t.name)}</span><ul class="t-card__list">${t.perks.map((p) => `<li>${perk(p.text)}</li>`).join("")}</ul></a></li>`),
]; };

const guideCards = () => catalogue.guides.map((g, i) => html`<li class="t-card t-card--guide"><a href="${g.href}">
  <img src="${i === 1 ? photo("used-srixon-zxi5", 400) : cut(g.products[0].image, 400)}" alt="" width="400" height="400" loading="lazy" class="${i === 1 ? "is-photo" : ""}">
  <span class="t-card__flag">${esc(g.topic)} guide</span><span class="t-card__name">${esc(g.title)}</span><span class="t-card__meta">By ${qt("a named fitter", "named author")}</span></a></li>`);

const footer = () => html`<footer class="t-foot">
  <p class="t-foot__fine">Prices include VAT. Rated ${q("trustpilot.rating")} on Trustpilot from ${q("trustpilot.reviewCount")} reviews; <span class="q" title="To be confirmed: real Trustpilot reviews">selected reviews to appear on this page</span>. ${placeholderNote}</p>
  <div class="t-foot__cols">
    ${[["Shop", ["Electric trolleys", "Golf clubs", "Build custom clubs", "Bags", "Balls, GPS & accessories", "Approved used", "Clothing & shoes"]], ["Services", ["Custom fitting", "Membership", "Trade-in", "Members’ portal"]], ["Help", ["Delivery & returns", "Contact us", "Help & FAQs", facts.pricePromise.short, "Klarna & Clearpay"]]].map(([h, items]) => `<div><h2>${h}</h2><ul>${items.map((x) => `<li><a href="#">${esc(x)}</a></li>`).join("")}</ul></div>`).join("")}
    <form class="t-news" action="#"><h2>Newsletter</h2><label class="sr" for="t-e">Email address</label><input id="t-e" type="email" placeholder="Email address" autocomplete="email"><label class="t-check"><input type="checkbox"> Email me news and offers.</label><button type="submit">Sign up</button></form>
  </div>
  <div class="t-foot__base"><p>${q("business.address")} · ${hours().join(" · ")} · ${phone()} · ${email()}</p><p>${companyLine()} · ${q("dealers.motocaddy")} · Pay with ${payments.join(", ")}</p></div>
</footer>`;

export const store = {
  id: "store",
  n: 7,
  name: "Store",
  direction: "Apple-inspired: shop shelves",
  fonts: ["../inter-latin-wght-normal.woff2"],
  sheet: {
    oneLine: "Apple-inspired. A shop page: a picture-led category row, then themed horizontal shelves of large cards for trolleys, help, clubs, membership and guides.",
    rationale: "Borrows the logic of a modern online store page, not its look. The page opens with one sentence (‘Shop. Motocaddy trolleys and custom‑fitted clubs, with free fitting in Ringwood.’) and two human routes (talk to a fitter, visit). A row of picture tiles makes every category one tap away, with fitting and membership sitting alongside products as equals. Each shelf then answers one question with a bold lead and a lighter follow-on: the latest Motocaddy range; help choosing (fitting, trolley finder, call, visit); clubs built your way; membership; buying guides. Shelves scroll sideways, so the page stays short even with all eight trolleys on it.",
    structure: "The hero shrinks to a one-line intro; the category row replaces the main nav’s job on the homepage. Fitting is presented twice: as a category tile and as the first card of the ‘Help choosing’ shelf. The trust row and reviews reduce to fine print at the foot (until real reviews are connected).",
    palette: [
      { name: "Cloud", hex: "#f4f5f6", use: "Page background, so white cards lift off it." },
      { name: "White", hex: "#ffffff", use: "Cards." },
      { name: "Ink", hex: "#1b1d1c", use: "Text; the dark feature cards." },
      { name: "Grey", hex: "#62666a", use: "Secondary text (5.8:1 on Cloud)." },
      { name: "Fairway", hex: "#0b6b47", use: "Links and the small card flags." },
      { name: "Pale fairway", hex: "#e3f1ea", use: "One tinted card per shelf at most." },
    ],
    type: [{ role: "Everything", name: "Inter (variable)", source: "Google Fonts, SIL OFL; stands in for SF Pro. Shelf titles pair a bold lead with a lighter grey follow-on.", sample: "600 30px/1 'Inter'" }],
    components: [
      { name: "Shelf title", note: "Bold lead plus lighter continuation, the only heading style on the page.", html: '<div class="t"><section class="t-shelf" style="padding:0"><h2><b>The latest.</b> The 2026 Motocaddy range.</h2></section></div>' },
      { name: "Product card", note: "Large rounded white card: stock flag in green, name, one spec line, price, product image at the foot.", html: "" },
      { name: "Category row", note: "Picture tiles for every department; services (fitting, membership, trade-in, sale) use line icons on a tint.", html: "" },
    ],
    imagery: "<p>Clean product cut-outs at the foot of white cards; picture tiles in the category row. Very little lifestyle photography is needed; the guides shelf can carry the few documentary shots (fitting, the shop floor).</p>",
    copy: "<p><strong>H1:</strong> “Shop. Motocaddy trolleys and custom‑fitted clubs, with free fitting in Ringwood.”</p><p><strong>Shelves:</strong> “The latest.” · “Help choosing.” · “Clubs, your way.” · “Membership.” · “Read before you buy.”</p>",
    motion: "Shelves scroll with momentum and snap to cards; cards lift slightly on hover. Nothing on load.",
    tradeoffs: {
      good: "Most shoppable of the Apple-inspired three: every category and all eight trolleys within two screens; services sit alongside products, so fitting and membership feel like things you can ‘get’; very low photography needs.",
      weak: "Rounded white cards in rows are the closest of all seven concepts to the generic look you wanted to leave behind; horizontal shelves hide items off-screen on desktop; relies on very good card copy to feel premium.",
      build: "Low–medium: one card component in a few variants plus a scroll-snap shelf; category row from a menu.",
      photo: "Low: cut-outs already available; a few documentary shots for the guides.",
      audience: "Returning customers and members who know what they want; mobile shoppers browsing by category.",
    },
    monogram: "‘EG’ in a small rounded ink square in the header",
    scores: { trolley: 5, fitting: 4, membership: 4, premium: 4, build: "Low–medium", photo: "Low: cut-outs already available" },
  },
  specimens() {
    this.sheet.components[1].html = `<div class="t" style="max-width:340px"><ul class="t-row" style="display:block">${trolleyCards()[0]}</ul></div>`;
    this.sheet.components[2].html = `<div class="t">${cats()}</div>`;
  },
  render() {
    return doc({
      title: "Evolution Golf: shop Motocaddy trolleys and custom-fitted clubs (concept: Store)",
      css: "store",
      fonts: this.fonts,
      body: html`<a class="sr sr-focus" href="#t-main">Skip to content</a>
<div class="t">
${top()}
<main id="t-main">
${intro()}
${cats()}
${shelf("t-s1", "The latest.", "The 2026 Motocaddy range, in-stock models first.", trolleyCards())}
${shelf("t-s2", "Help choosing.", "Ask, measure, then buy.", helpCards())}
${shelf("t-s3", "Clubs, your way.", "Wilson, Srixon and Mizuno, off the shelf or built for you.", clubCards())}
${shelf("t-s4", "Membership.", "Join free, or go Annual and it pays for itself.", memberCards())}
${shelf("t-s5", "Read before you buy.", "Buying guides from the fitting bay.", guideCards())}
</main>
${footer()}
</div>
${cookie("t-cookie")}`,
    });
  },
};
