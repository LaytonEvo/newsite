// Showroom+ v2 page templates: trolley collection (with filters), trolley product page, and the
// test-site-only basket, checkout and "not in this preview" pages. Same chrome, tokens and facts
// as the v2 homepage. data-* attributes are hooks for the test site's script (site.js); the static
// mockups ignore them.
import {
  html, esc, gbp, q, qt, val, facts, allTrolleys, fam, spec, stockWord, saving, catalogue, cut, phone, email, doc, to, cookie,
} from "../concepts/kit.mjs";
import { nav, footer, L, dot, ic } from "../concepts/showroomplus2.mjs";

const trolleys = allTrolleys();
const S = (f) => spec(f);
const holesOf = (f) => f.variants.map((v) => v.holes);
const fonts = ["schibsted-grotesk-latin-wght-normal.woff2", "atkinson-hyperlegible-latin-400-normal.woff2"];
const crumbs = (items) => `<nav class="v-crumbs" aria-label="Breadcrumb"><ol>${items.map(([t, h], i) => `<li>${i < items.length - 1 ? `<a href="${h}">${esc(t)}</a>` : `<span aria-current="page">${esc(t)}</span>`}</li>`).join("")}</ol></nav>`;
const chk = (group, label, n) => `<label class="v-check"><input type="checkbox" data-f="${group}" value="${esc(label)}"><span>${esc(label)}</span><small>${n}</small></label>`;
const page = (title, body) => doc({ title, css: "v2pages", fonts, body: html`<a class="sr sr-focus" href="#v-main">Skip to content</a>
<div class="p">
${nav()}
${body}
${footer()}
</div>
${cookie("p-cookie")}` });

/* ---------- filter model: one rule per option, so counts (build time) and filtering (site.js)
   agree. Each card carries its option values as data attributes. ---------- */
const weightBand = (w) => (!w ? "Not listed" : w < 10.5 ? "Under 10.5kg" : w <= 11 ? "10.5 to 11kg" : "Over 11kg");
const priceBand = (p) => (p < 600 ? "Under £600" : p < 900 ? "£600 to £900" : p <= 1200 ? "£900 to £1,200" : "Over £1,200");
const featsOf = (f) => { const s = S(f); return [s.gps && "GPS", s.dhc && "Downhill control", s.remote && "Remote", s.follow && "Follow"].filter(Boolean); };
const batteryOpts = (f) => [holesOf(f).includes("18 holes") && "18 holes", holesOf(f).some((h) => h.startsWith("36")) && "36 holes"].filter(Boolean);
const stockLabel = { in: "In stock", order: "Available to order", out: "Out of stock" };
const tags = (f) => ({
  brand: [f.brand], features: featsOf(f), battery: batteryOpts(f), weight: [weightBand(S(f).weight)],
  price: [priceBand(S(f).from)], availability: [stockLabel[S(f).stock.state]],
});
// price and availability first: on a £479 to £1,299 range they are what people filter by first (CRO review, round 1)
const GROUPS = [["availability", "Availability"], ["price", "Price"], ["features", "Features"], ["battery", "Battery range"], ["brand", "Brand"]]; // weight returns once every model has one
const ORDER = {
  brand: [...new Set(trolleys.map((f) => f.brand))], features: ["GPS", "Downhill control", "Remote", "Follow"], battery: ["18 holes", "36 holes"],
  weight: ["Under 10.5kg", "10.5 to 11kg", "Over 11kg", "Not listed"], price: ["Under £600", "£600 to £900", "£900 to £1,200", "Over £1,200"],
  availability: ["In stock", "Available to order", "Out of stock"],
};
export const filterGroups = () => GROUPS.map(([k, h]) => [k, h, ORDER[k].map((o) => [o, trolleys.filter((f) => tags(f)[k].includes(o)).length])]);
const filtersHtml = () => filterGroups().map(([k, h, opts]) => `<fieldset class="v-fgroup"><legend>${esc(h)}</legend>${opts.map(([l, n]) => chk(k, l, n)).join("")}</fieldset>`).join("");

/* ---------- product card ---------- */
const card = (f, i) => {
  const s = S(f); const r = s.rating; const t = tags(f);
  const data = Object.entries(t).map(([k, v]) => `data-${k}="${esc(v.join("|"))}"`).join(" ");
  return html`<li class="v-card v-card--${s.stock.state}" data-card ${data} data-price-n="${s.from}" data-weight-n="${s.weight ?? ""}" data-rating-n="${r.count ? r.avg : 0}" data-year="${f.year ?? 0}" data-rank="${i}" data-stock="${s.stock.state}">
    <a href="${f.href}" class="v-card__link">
      <span class="v-card__img"><img src="${cut(f.image, 400)}" alt="" width="400" height="400" loading="lazy"></span>
      <span class="v-card__brand">${esc(f.brand)}${f.year === 2026 ? " · 2026" : ""}</span>
      <h3 class="v-card__name">${esc(f.name)}</h3>
      <span class="v-card__feat">${esc(t.features.length ? t.features.join(" · ") : "Essential controls")}</span>
      <span class="v-card__bat">Battery: ${esc(f.variants.map((v) => `${v.battery.replace(" lithium", "")} (${v.holes})`).join(" or "))}</span>
      ${s.weight ? `<span class="v-card__bat">Weight: ${s.weight}kg</span>` : ""}
      <span class="v-card__price">${f.variants.length > 1 ? "<small>From</small> " : ""}${gbp(s.from)}</span>
      <span class="v-card__stock">${stockWord(s.stock)}${s.stock.detail ? ` · ${esc(s.stock.detail)}` : ""}</span>
      ${r.count ? `<span class="v-card__rate"><span aria-hidden="true">★</span> ${r.avg.toFixed(1)} · ${r.count} review${r.count > 1 ? "s" : ""}</span>` : ""}
    </a>
    <label class="v-compare"><input type="checkbox" data-compare="${f.id}"> Compare<span class="sr"> ${esc(f.name)}</span></label>
  </li>`;
};

/* ---------- collection page ---------- */
const radio = (name, value, label, on) => `<label><input type="radio" name="${name}" value="${value}"${on ? ' checked=""' : ""}>${label}</label>`;
const finder = () => {
  // starts unanswered; every answer narrows the grid and in-stock models rank first (site.js)
  return html`<section class="v-finder" aria-labelledby="v-fd">
  <div class="v-finder__head"><h2 id="v-fd">Which trolley is right for me?</h2><p>Four quick questions, then we’ll show the trolleys that fit.</p></div>
  <form class="v-finder__q" action="#grid" data-finder>
    <fieldset><legend>Course maps?</legend>${radio("gps", "GPS", "GPS")}${radio("gps", "", "Not needed")}</fieldset>
    <fieldset><legend>Hilly course?</legend>${radio("dhc", "Downhill control", "Downhill control")}${radio("dhc", "", "Not needed")}</fieldset>
    <fieldset><legend>Steering?</legend>${radio("rem", "", "Handle")}${radio("rem", "Remote", "Remote")}${radio("rem", "Follow", "Follow")}</fieldset>
    <fieldset><legend>How much golf?</legend>${radio("bat", "18 holes", "18 holes")}${radio("bat", "36 holes", "36 holes")}</fieldset>
    <div class="v-finder__go"><button type="submit" class="p-btn" data-finder-go>Show all ${trolleys.length} trolleys</button>${L("Compare side by side")}</div>
  </form>
</section>`;
};

export const collection = ({ drawer = false } = {}) => {
  const s = saving();
  return page("Electric golf trolleys | Evolution Golf", html`<main id="v-main" class="v">
  ${crumbs([["Home", to("Home")], ["Trolleys", to("Trolleys")], ["Electric trolleys", "#"]])}
  <header class="v-head">
    <h1>Electric golf trolleys</h1>
    <p class="v-head__sub">${trolleys.length} models from Motocaddy, NAVEE and Powerbug. Most Motocaddy models come with a choice of battery: Standard for 18 holes or Ultra for 36.</p>
    <ul class="v-promise">
      <li>${ic.truck}<span>Free next-day UK delivery over ${gbp(val("delivery.nextDayFreeThreshold"))}, order by ${esc(val("delivery.nextDayCutoff"))}</span></li>
      <li><span class="v-promise__eg" aria-hidden="true">EG</span><span>Annual members: ${q("membership.memberDiscountPercent")}% off one order a month, ${gbp(s.net, { pence: true })} better off on an M5 GPS DHC</span></li>
      <li><span class="v-promise__eg" aria-hidden="true">£</span><span>${esc(facts.pricePromise.short)} · ${q("finance.short")}</span></li>
    </ul>
  </header>
  ${finder()}
  <div class="v-bar" id="grid">
    <p class="v-bar__n" aria-live="polite"><strong data-count>${trolleys.length}</strong> trolleys</p>
    <button type="button" class="v-bar__filter" data-open-filters aria-controls="v-filter-sheet">Filters<span data-filter-n></span></button>
    <label class="v-sort"><span>Sort</span><select data-sort><option value="rec">Recommended</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option><option value="new">Newest</option><option value="rated">Best rated</option></select></label>
    <p class="v-bar__note">Out-of-stock models always show last.</p>
  </div>
  <div class="v-layout">
    <aside class="v-filters" aria-label="Filter trolleys" data-filters>${filtersHtml()}</aside>
    <div>
      <h2 class="sr">Electric trolleys</h2>
      <ul class="v-grid" aria-label="Electric trolleys" data-grid>${trolleys.map(card).join("")}</ul>
      <p class="v-empty" data-empty hidden>No trolleys match all of those filters. <button type="button" class="v-clear" data-clear>Clear filters</button></p>
    </div>
  </div>
  <section class="v-after">
    <div><h2>Not sure yet?</h2><p>Talk to our team on ${phone()}, or read the trolley buying guide.</p><p class="p-links p-links--left">${L("Electric trolley buying guide")}${L("Contact us")}</p></div>
    <div><h2>Looking for a push trolley?</h2><p>Lighter, simpler, no battery to charge.</p><p class="p-links p-links--left">${L("Shop push trolleys")}${L("Trolley accessories")}</p></div>
  </section>
</main>
${drawer !== false ? html`<div class="v-drawer" id="v-filter-sheet" role="dialog" aria-modal="true" aria-labelledby="v-dr"${drawer === "hidden" ? " hidden" : ""} data-sheet><div class="v-drawer__panel">
  <div class="v-drawer__top"><h2 id="v-dr">Filters</h2><button type="button" class="v-x" aria-label="Close filters" data-close-filters>×</button></div>
  <div class="v-drawer__body" data-filters>${filtersHtml()}</div>
  <div class="v-drawer__foot"><button type="button" class="v-clear" data-clear>Clear all</button><button type="button" class="p-btn" data-close-filters>Show <span data-count>${trolleys.length}</span> trolleys</button></div>
</div></div>` : ""}`);
};

/* ---------- product page (any trolley family) ---------- */
const vStock = (v) => (!v.available ? "out" : v.stock > 0 ? "in" : "order");
const vStockWord = { in: "In stock", order: "Available to order", out: "Out of stock · email me" };
const pence = (n) => Math.round(n * 100) / 100;
/** Detail for families without a hand-written entry: only facts we hold, no invented copy. */
const autoDetail = (f) => {
  const near = trolleys.filter((o) => o.id !== f.id && o.brand === f.brand)
    .sort((a, b) => Math.abs(S(a).from - S(f).from) - Math.abs(S(b).from - S(f).from)).slice(0, 3);
  const specs = [["Battery options", f.variants.map((v) => `${v.battery} (${v.holes})`).join(" or ")], ["Features", featsOf(f).join(", ") || "Essential controls"]];
  if (f.weightKg) specs.push(["Weight", `${f.weightKg}kg`]);
  if (f.warranty) specs.push(["Warranty", f.warranty]);
  return { gallery: [f.image], intro: null, highlights: [], specs, compare: [f.id, ...near.map((o) => o.id)], bundle: null };
};

export const product = ({ id = "m5-gps-dhc", firstScreen = false } = {}) => {
  const f = fam(id); const d = catalogue.productDetail[id] ?? autoDetail(f); const s = S(f); const r = s.rating;
  const full = `${f.brand} ${f.name}`;
  const first = f.variants.find((v) => vStock(v) === "in") ?? f.variants.find((v) => v.available) ?? f.variants[0];
  const pct = val("membership.memberDiscountPercent");
  const member = (p) => pence((p * (100 - pct)) / 100);
  const cmp = d.compare.map(fam);
  const isThis = (c) => (c.id === f.id ? "is-this" : "");
  const giftOn = f.brand === "Motocaddy";
  const freeNext = first.price >= val("delivery.nextDayFreeThreshold");
  const vjson = (v) => esc(JSON.stringify({ battery: v.battery, holes: v.holes, price: v.price, member: member(v.price), third: pence(v.price / 3), stock: vStock(v), handle: v.handle }));
  const listHref = to("Electric trolleys") === "#" ? "v2-trolleys.html" : to("Electric trolleys");
  return page(`${full} electric golf trolley | Evolution Golf`, html`<main id="v-main" class="v" data-product="${f.id}" data-name="${esc(full)}" data-image="${cut(f.image, 400)}">
  ${crumbs([["Home", to("Home")], ["Trolleys", to("Trolleys")], ["Electric trolleys", listHref], [full, "#"]])}
  <div class="v-pdp">
    <section class="v-gallery" aria-label="Product images">
      <div class="v-gallery__main"><img src="${cut(d.gallery[0])}" alt="${esc(full)} electric trolley" width="800" height="800" fetchpriority="high" data-main-img></div>
      <ul class="v-gallery__thumbs">
        ${d.gallery.map((g, i) => `<li><button type="button" aria-label="Image ${i + 1} of ${d.gallery.length}"${i === 0 ? ' aria-current="true"' : ""} data-thumb="${cut(g)}"><img src="${cut(g, 400)}" alt="" width="400" height="400"></button></li>`).join("")}
        <li><button type="button" class="v-gallery__vid" aria-label="Play product video"><span aria-hidden="true">▶</span><span class="q" title="To be confirmed: product video (Motocaddy supplies one per model)">Video</span></button></li>
      </ul>
    </section>
    <section class="v-buy" aria-labelledby="v-h1">
      <p class="v-buy__brand"><a href="${to(f.brand)}">${esc(f.brand)}</a>${f.year ? ` · ${f.year}` : ""}</p>
      <h1 id="v-h1">${esc(f.name)} electric trolley</h1>
      ${r.count ? `<p class="v-buy__rate"><a href="#reviews"><span aria-hidden="true">★★★★★</span> ${r.avg.toFixed(1)} · ${r.count} review${r.count > 1 ? "s" : ""} of this trolley</a></p>` : ""}
      ${d.intro ? `<p class="v-buy__intro">${esc(d.intro)}</p>` : ""}

      <fieldset class="v-opt"><legend>Battery</legend>
        ${f.variants.map((v) => { const st = vStock(v); const on = v === first; return `<label class="v-opt__card${on ? " is-on" : ""}${st === "out" ? " is-out" : ""}"><input type="radio" name="bat" value="${esc(v.battery)}"${on ? ' checked=""' : ""} data-variant="${vjson(v)}"><span><strong>${esc(v.battery)}${/lithium|Wh/i.test(v.battery) ? "" : " lithium"}</strong><small>Up to ${esc(v.holes)}</small></span><span class="v-opt__p">${gbp(v.price)}<small${st === "in" ? ' class="p-st--in"' : ""}>${vStockWord[st]}</small></span></label>`; }).join("")}
      </fieldset>

      <div class="v-price">
        <p class="v-price__now" data-price>${gbp(first.price, { pence: true })}</p>
        <p class="v-price__mem"><span class="v-promise__eg" aria-hidden="true">EG</span><span>Annual members: <strong data-member>${gbp(member(first.price), { pence: true })}</strong> using your monthly ${q("membership.memberDiscountPercent")}% off. ${L("Join for £36")}</span></p>
        <p class="v-price__fin">Or 3 interest-free payments of <span data-third>${gbp(pence(first.price / 3), { pence: true })}</span> with Klarna or Clearpay. <span class="q" title="To be confirmed: finance wording must use the providers’ approved text">Wording to be confirmed with providers</span>.</p>
      </div>

      ${giftOn ? html`<fieldset class="v-gift"><legend>Choose your free accessory</legend>
        ${["Gift option 1", "Gift option 2", "Gift option 3"].map((g, i) => `<label class="v-gift__opt${i === 0 ? " is-on" : ""}"><input type="radio" name="gift" value="${g}"${i === 0 ? ' checked=""' : ""}><span class="q" title="To be confirmed: gift list comes from the free-gift app">${g}</span></label>`).join("")}
        <p class="v-fnote">${q("offers.trolleyGift")}</p>
      </fieldset>` : ""}

      <div class="v-actions"><button type="button" class="p-btn v-atb" data-add>${vStock(first) === "out" ? "Email me when it’s back" : "Add to basket"}</button><button type="button" class="v-collect" data-add="collect">Or click and collect from our Hampshire showroom</button></div>
      <p class="v-added" data-added role="status" hidden></p>

      <ul class="v-assure">
        <li>${ic.truck}<span>${freeNext ? "<strong>Free next-day UK delivery.</strong>" : `<strong>Next-day UK delivery</strong> ${gbp(val("delivery.nextDayPrice"), { pence: true })}, free over ${gbp(val("delivery.nextDayFreeThreshold"))}.`} Order by ${esc(val("delivery.nextDayCutoff"))} on a weekday<span data-cutoff></span>.</span></li>
        ${f.warranty ? `<li><span class="v-promise__eg" aria-hidden="true">✓</span><span><strong>Warranty:</strong> ${esc(f.warranty)}.</span></li>` : ""}
        <li><span class="v-promise__eg" aria-hidden="true">↩</span><span><strong>Returns:</strong> ${qt("policy for every customer to be confirmed", "Owner to supply the standard returns policy for all customers (today only the Annual member perk is written down)")}.</span></li>
        <li><span class="v-promise__eg" aria-hidden="true">£</span><span><strong>${esc(facts.pricePromise.short)}.</strong> ${L("How it works")}</span></li>
      </ul>

      ${d.bundle ? html`<div class="v-bundle">
        <p class="v-bundle__h">Ready-made bundle</p>
        <div class="v-bundle__row"><img src="${cut(d.bundle.image, 400)}" alt="" width="400" height="400"><div><strong>${esc(d.bundle.name)}</strong><span>Bought separately ${gbp(d.bundle.items.reduce((n, [, p]) => n + p, 0))} · bundle price ${qt("TBC", "bundle price to be set")}</span></div></div>
        ${L("Add the bundle")}
      </div>` : ""}
    </section>
  </div>

  ${d.highlights.length ? html`<section class="v-sec" aria-labelledby="v-hl"><h2 id="v-hl">Highlights</h2>
    <ul class="v-hl">${d.highlights.map(([h, p, img]) => `<li><img src="${cut(img, 400)}" alt="" width="400" height="400" loading="lazy"><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join("")}</ul>
    <div class="v-video" role="img" aria-label="Product video placeholder"><span aria-hidden="true">▶</span><span class="q" title="To be confirmed: product video">Product video: the ${esc(f.name)} on the course</span></div>
  </section>` : ""}

  <section class="v-sec v-specs-wrap" aria-labelledby="v-sp"><h2 id="v-sp">Specifications</h2>
    <dl class="v-specs">${d.specs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
    ${catalogue.productDetail[id] ? "" : `<p class="v-fnote">Full specifications for this model still need adding to the product data.</p>`}
  </section>

  ${cmp.length > 1 ? html`<section class="v-sec" aria-labelledby="v-cm"><h2 id="v-cm">Compare with similar trolleys</h2>
    <div class="v-cmp-wrap" tabindex="0" role="region" aria-label="Comparison table, scrolls sideways"><table class="v-cmp">
      <thead><tr><th scope="col"><span class="sr">Spec</span></th>${cmp.map((c) => `<th scope="col" class="${isThis(c)}"><img src="${cut(c.image, 400)}" alt="" width="400" height="400" loading="lazy">${c.id === f.id ? `<span>${esc(c.name)}</span>` : `<a href="${c.href}"><span>${esc(c.name)}</span></a>`}<small>${c.id === f.id ? "This trolley" : "&nbsp;"}</small></th>`).join("")}</tr></thead>
      <tbody>
        <tr><th scope="row">From</th>${cmp.map((c) => `<td class="${isThis(c)}">${gbp(S(c).from)}</td>`).join("")}</tr>
        <tr><th scope="row">GPS</th>${cmp.map((c) => `<td class="${isThis(c)}">${dot(S(c).gps, "GPS")}</td>`).join("")}</tr>
        <tr><th scope="row">Downhill control</th>${cmp.map((c) => `<td class="${isThis(c)}">${dot(S(c).dhc, "Downhill control")}</td>`).join("")}</tr>
        <tr><th scope="row">Remote</th>${cmp.map((c) => `<td class="${isThis(c)}">${dot(S(c).remote, "Remote")}</td>`).join("")}</tr>
        <tr><th scope="row">Battery</th>${cmp.map((c) => `<td class="${isThis(c)}">${esc(holesOf(c).map((h) => h.replace(" holes", "")).join(" or "))} holes</td>`).join("")}</tr>
        <tr><th scope="row">Weight</th>${cmp.map((c) => `<td class="${isThis(c)}">${S(c).weight ? S(c).weight + "kg" : "Not listed"}</td>`).join("")}</tr>
        <tr><th scope="row">Status</th>${cmp.map((c) => `<td class="${isThis(c)}">${stockWord(S(c).stock)}</td>`).join("")}</tr>
      </tbody>
    </table></div>
  </section>` : ""}

  <section class="v-sec v-rev" id="reviews" aria-labelledby="v-rv">
    <div class="v-rev__sum"><h2 id="v-rv">Reviews of this trolley</h2>${r.count ? `<p class="v-rev__n">${r.avg.toFixed(1)}</p><p>from ${r.count} verified review${r.count > 1 ? "s" : ""} of the ${esc(f.name)} on Judge.me. Store-wide Trustpilot reviews are kept separate.</p>` : `<p>No reviews of the ${esc(f.name)} yet.</p>`}${L("Write a review")}</div>
    ${r.count ? `<ul class="v-rev__list">${[1, 2].slice(0, r.count).map(() => `<li><p class="v-rev__stars" aria-hidden="true">★★★★★</p><p><span class="q" title="To be confirmed: real Judge.me review text for this product">The customer’s review of the ${esc(f.name)} appears here, word for word.</span></p><p class="v-rev__by">Name · Verified buyer</p></li>`).join("")}</ul>` : ""}
  </section>

  <section class="v-sec v-help" aria-labelledby="v-qu"><h2 id="v-qu">Questions about this trolley?</h2>
    <p>Call ${phone()} or email ${email()}.</p><p>${L("Near Ringwood? See it in the showroom")}</p>
  </section>
</main>
<div class="v-sticky${firstScreen ? " v-sticky--live" : ""}" role="region" aria-label="Quick add to basket" data-sticky><div><strong>${esc(f.name)} · <span data-s-battery>${esc(first.battery)}</span></strong><span data-s-line>${gbp(first.price)} · ${vStockWord[vStock(first)].replace(" · email me", "")}</span></div><button type="button" class="p-btn" data-add>Add to basket</button></div>`);
};

/* ---------- test-site pages: basket, checkout, not in this preview, 404 ---------- */
const delivery = () => esc(JSON.stringify({
  standard: val("delivery.standardPrice"), standardDays: val("delivery.standardDays"), standardFree: val("delivery.guestFreeThreshold"),
  nextDay: val("delivery.nextDayPrice"), nextDayFree: val("delivery.nextDayFreeThreshold"), cutoff: val("delivery.nextDayCutoff"),
}));
const previewNote = `<p class="v-preview">Test site: nothing you enter here is sent anywhere, and no payment is taken.</p>`;

export const basket = () => page("Your basket | Evolution Golf", html`<main id="v-main" class="v v-narrow" data-basket-page data-delivery="${delivery()}">
  <header class="v-head"><h1>Your basket</h1></header>
  <div data-basket-list><p>Loading your basket…</p></div>
  ${previewNote}
</main>`);

export const checkout = () => page("Checkout | Evolution Golf", html`<main id="v-main" class="v v-narrow" data-checkout data-delivery="${delivery()}">
  <header class="v-head"><h1>Checkout</h1></header>
  ${previewNote}
  <div class="v-co" data-co>
    <form class="v-co__form" data-checkout-form novalidate>
      <fieldset><legend>Contact</legend>
        <label class="v-field"><span>Email address</span><input type="email" name="email" autocomplete="email" required></label>
        <label class="v-check"><input type="checkbox" name="marketing"><span>Email me news and offers. You can unsubscribe at any time.</span></label>
      </fieldset>
      <fieldset><legend>Delivery address</legend>
        <label class="v-field"><span>Full name</span><input name="name" autocomplete="name" required></label>
        <label class="v-field"><span>Address</span><input name="address1" autocomplete="address-line1" required></label>
        <label class="v-field"><span>Town or city</span><input name="town" autocomplete="address-level2" required></label>
        <label class="v-field"><span>Postcode</span><input name="postcode" autocomplete="postal-code" required></label>
        <label class="v-field"><span>Phone, for the courier (optional)</span><input type="tel" name="tel" autocomplete="tel"></label>
      </fieldset>
      <fieldset data-methods><legend>Delivery</legend></fieldset>
      <fieldset><legend>Payment</legend>
        <p class="v-fnote">On the real site this step is Shopify Checkout (cards, Apple Pay, Google Pay, PayPal, Shop Pay, Klarna, Clearpay). The test site stops here.</p>
      </fieldset>
      <p class="v-error" data-error role="alert" hidden></p>
      <button type="submit" class="p-btn v-atb">Place order (test only)</button>
    </form>
    <aside class="v-co__sum" aria-label="Order summary" data-summary></aside>
  </div>
  <section class="v-done" data-done hidden tabindex="-1" aria-labelledby="v-dn"><h2 id="v-dn">Order placed (test only)</h2><p>Thanks. On the real site you’d now get an order confirmation email. Nothing was sent and no payment was taken.</p><p>${L("Back to electric trolleys", to("Electric trolleys"))}</p></section>
</main>`);

export const notInPreview = () => page("Not in this preview | Evolution Golf", html`<main id="v-main" class="v v-narrow">
  <header class="v-head"><h1>Not in this preview yet</h1><p class="v-head__sub"><span data-page-name>This page</span> is part of the full redesign but hasn’t been built for the test site yet. This round covers the homepage, electric trolleys, trolley product pages, the basket and a simulated checkout.</p></header>
  <p class="p-links p-links--left">${L("Electric trolleys", to("Electric trolleys"))}${L("Homepage", to("Home"))}</p>
</main>`);

export const notFound = () => page("Page not found | Evolution Golf", html`<main id="v-main" class="v v-narrow">
  <header class="v-head"><h1>We can’t find that page</h1><p class="v-head__sub">It may have moved. Try electric trolleys, or call ${phone()}.</p></header>
  <p class="p-links p-links--left">${L("Electric trolleys", to("Electric trolleys"))}${L("Homepage", to("Home"))}</p>
</main>`);
