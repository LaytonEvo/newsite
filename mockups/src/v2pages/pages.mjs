// Showroom+ v2 page templates: trolley collection (with filters) and trolley product page.
// Same chrome, tokens and facts as the v2 homepage.
import {
  html, esc, gbp, q, qt, val, facts, allTrolleys, fam, spec, stockWord, saving, catalogue, cut, photo, phone, email, doc,
} from "../concepts/kit.mjs";
import { nav, footer, L, dot, ic, chev } from "../concepts/showroomplus2.mjs";

const trolleys = allTrolleys();
const S = (f) => spec(f);
const holesOf = (f) => f.variants.map((v) => v.holes);
const crumbs = (items) => `<nav class="v-crumbs" aria-label="Breadcrumb"><ol>${items.map(([t, h], i) => `<li>${i < items.length - 1 ? `<a href="${h}">${esc(t)}</a>` : `<span aria-current="page">${esc(t)}</span>`}</li>`).join("")}</ol></nav>`;
const chk = (label, n, on = false) => `<label class="v-check"><input type="checkbox"${on ? ' checked=""' : ""}><span>${esc(label)}</span><small>${n}</small></label>`;

/* ---------- filter model (counts computed from the data) ---------- */
const count = (fn) => trolleys.filter(fn).length;
export const filterGroups = () => [
  ["Brand", [...new Set(trolleys.map((f) => f.brand))].map((b) => [b, count((f) => f.brand === b)])],
  ["Features", [["GPS", count((f) => S(f).gps)], ["Downhill control", count((f) => S(f).dhc)], ["Remote", count((f) => S(f).remote)], ["Follow", count((f) => S(f).follow)]]],
  ["Battery range", [["18 holes", count((f) => holesOf(f).includes("18 holes"))], ["36 holes", count((f) => holesOf(f).some((h) => h.startsWith("36")))]]],
  ["Weight", [["Under 10.5kg", count((f) => S(f).weight && S(f).weight < 10.5)], ["10.5 to 11kg", count((f) => S(f).weight >= 10.5 && S(f).weight <= 11)], ["Over 11kg", count((f) => S(f).weight > 11)], ["Not listed", count((f) => !S(f).weight)]]],
  ["Price", [["Under £600", count((f) => S(f).from < 600)], ["£600 to £900", count((f) => S(f).from >= 600 && S(f).from < 900)], ["£900 to £1,200", count((f) => S(f).from >= 900 && S(f).from <= 1200)], ["Over £1,200", count((f) => S(f).from > 1200)]]],
  ["Availability", [["In stock", count((f) => S(f).stock.state === "in")], ["Available to order", count((f) => S(f).stock.state === "order")], ["Out of stock", count((f) => S(f).stock.state === "out")]]],
];
const filtersHtml = (idp) => filterGroups().map(([h, opts], i) => `<fieldset class="v-fgroup"><legend>${esc(h)}</legend>${opts.map(([l, n]) => chk(l, n)).join("")}${h === "Weight" ? `<p class="v-fnote">Weight isn’t listed for every model yet; it needs adding to the product data.</p>` : ""}</fieldset>`).join("");

/* ---------- product card ---------- */
const card = (f) => {
  const s = S(f);
  const feats = [s.gps && "GPS", s.dhc && "Downhill control", s.remote && "Remote", s.follow && "Follow"].filter(Boolean);
  const r = s.rating;
  return html`<li class="v-card v-card--${s.stock.state}">
    <a href="${f.href}" class="v-card__link">
      <span class="v-card__img"><img src="${cut(f.image, 400)}" alt="" width="400" height="400" loading="lazy"></span>
      <span class="v-card__brand">${esc(f.brand)}${f.year === 2026 ? " · 2026" : ""}</span>
      <strong class="v-card__name">${esc(f.name)}</strong>
      <span class="v-card__feat">${esc(feats.length ? feats.join(" · ") : "Essential controls")}</span>
      <span class="v-card__bat">Battery: ${esc(f.variants.map((v) => `${v.battery.replace(" lithium", "")} (${v.holes})`).join(" or "))}</span>
      ${s.weight ? `<span class="v-card__bat">Weight: ${s.weight}kg</span>` : ""}
      <span class="v-card__price">${f.variants.length > 1 ? "<small>From</small> " : ""}${gbp(s.from)}</span>
      <span class="v-card__stock">${stockWord(s.stock)}${s.stock.detail ? ` · ${esc(s.stock.detail)}` : ""}</span>
      ${r.count ? `<span class="v-card__rate"><span aria-hidden="true">★</span> ${r.avg.toFixed(1)} · ${r.count} review${r.count > 1 ? "s" : ""}</span>` : ""}
    </a>
    <label class="v-compare"><input type="checkbox"> Compare</label>
  </li>`;
};

/* ---------- collection page ---------- */
const finder = () => {
  const n = trolleys.filter((f) => S(f).gps && holesOf(f).some((h) => h.startsWith("36"))).length;
  return html`<section class="v-finder" aria-labelledby="v-fd">
  <div class="v-finder__head"><h2 id="v-fd">Which trolley is right for me?</h2><p>Three questions, then we’ll show the trolleys that fit.</p></div>
  <form class="v-finder__q" action="#">
    <fieldset><legend>Course maps?</legend><label><input type="radio" name="gps" checked="">GPS</label><label><input type="radio" name="gps">Not needed</label></fieldset>
    <fieldset><legend>Hilly course?</legend><label><input type="radio" name="dhc">Downhill control</label><label><input type="radio" name="dhc" checked="">Not needed</label></fieldset>
    <fieldset><legend>Steering?</legend><label><input type="radio" name="rem" checked="">Handle</label><label><input type="radio" name="rem">Remote</label><label><input type="radio" name="rem">Follow</label></fieldset>
    <fieldset><legend>How much golf?</legend><label><input type="radio" name="bat">18 holes</label><label><input type="radio" name="bat" checked="">36 holes</label></fieldset>
    <div class="v-finder__go"><a class="p-btn" href="#grid">Show ${n} trolleys</a>${L("Compare side by side")}</div>
  </form>
</section>`;
};

export const collection = ({ drawer = false } = {}) => {
  const s = saving();
  return doc({
    title: "Electric golf trolleys | Evolution Golf (v2 mockup)",
    css: "v2pages",
    fonts: ["schibsted-grotesk-latin-wght-normal.woff2", "atkinson-hyperlegible-latin-400-normal.woff2"],
    body: html`<a class="sr sr-focus" href="#v-main">Skip to content</a>
<div class="p">
${nav()}
<main id="v-main" class="v">
  ${crumbs([["Home", "#"], ["Trolleys", "#"], ["Electric trolleys", "#"]])}
  <header class="v-head">
    <h1>Electric golf trolleys</h1>
    <p class="v-head__sub">${trolleys.length} models from Motocaddy, NAVEE and Powerbug. Every Motocaddy comes with a choice of battery: Standard for 18 holes, Ultra for 36.</p>
    <ul class="v-promise">
      <li>${ic.truck}<span>Free next-day UK delivery over ${gbp(val("delivery.nextDayFreeThreshold"))}, order by ${esc(val("delivery.nextDayCutoff"))}</span></li>
      <li><span class="v-promise__eg" aria-hidden="true">EG</span><span>Annual members: ${q("membership.memberDiscountPercent")}% off one order a month, ${gbp(s.net, { pence: true })} better off on an M5 GPS DHC</span></li>
      <li><span class="v-promise__eg" aria-hidden="true">£</span><span>${esc(facts.pricePromise.short)} · ${q("finance.short")}</span></li>
    </ul>
  </header>
  ${finder()}
  <div class="v-bar" id="grid">
    <p class="v-bar__n"><strong>${trolleys.length}</strong> trolleys</p>
    <button type="button" class="v-bar__filter">Filters</button>
    <label class="v-sort"><span>Sort</span><select><option>Recommended</option><option>Price, low to high</option><option>Price, high to low</option><option>Newest</option><option>Best rated</option><option>Lightest</option></select></label>
    <p class="v-bar__note">Out-of-stock models always show last.</p>
  </div>
  <div class="v-layout">
    <aside class="v-filters" aria-label="Filter trolleys">${filtersHtml()}</aside>
    <ul class="v-grid" aria-label="Electric trolleys">${trolleys.map(card).join("")}</ul>
  </div>
  <section class="v-after">
    <div><h2>Not sure yet?</h2><p>Talk to our team on ${phone()}, or read the trolley buying guide.</p><p class="p-links p-links--left">${L("Electric trolley buying guide")}${L("Contact us")}</p></div>
    <div><h2>Looking for a push trolley?</h2><p>Lighter, simpler, no battery to charge.</p><p class="p-links p-links--left">${L("Shop push trolleys")}${L("Trolley accessories")}</p></div>
  </section>
</main>
${footer()}
</div>
${drawer ? html`<div class="v-drawer" role="dialog" aria-modal="true" aria-labelledby="v-dr"><div class="v-drawer__panel">
  <div class="v-drawer__top"><h2 id="v-dr">Filters</h2><button type="button" class="v-x" aria-label="Close filters">×</button></div>
  <div class="v-drawer__body">${filtersHtml()}</div>
  <div class="v-drawer__foot"><button type="button" class="v-clear">Clear all</button><button type="button" class="p-btn">Show ${trolleys.length} trolleys</button></div>
</div></div>` : ""}`,
  });
};

/* ---------- product page: Motocaddy M5 GPS DHC ---------- */
export const product = ({ firstScreen = false } = {}) => {
  const f = fam("m5-gps-dhc"); const d = catalogue.productDetail["m5-gps-dhc"]; const s = S(f); const r = s.rating;
  const std = f.variants[0], ult = f.variants[1];
  const pct = val("membership.memberDiscountPercent");
  const member = Math.round(std.price * (100 - pct)) / 100;
  const third = Math.round((std.price / 3) * 100) / 100;
  const bundleTotal = d.bundle.items.reduce((n, [, p]) => n + p, 0);
  const cmp = d.compare.map(fam);
  return doc({
    title: "Motocaddy M5 GPS DHC electric golf trolley | Evolution Golf (v2 mockup)",
    css: "v2pages",
    fonts: ["schibsted-grotesk-latin-wght-normal.woff2", "atkinson-hyperlegible-latin-400-normal.woff2"],
    body: html`<a class="sr sr-focus" href="#v-main">Skip to content</a>
<div class="p">
${nav()}
<main id="v-main" class="v">
  ${crumbs([["Home", "#"], ["Trolleys", "#"], ["Electric trolleys", "v2-trolleys.html"], ["Motocaddy M5 GPS DHC", "#"]])}
  <div class="v-pdp">
    <section class="v-gallery" aria-label="Product images">
      <div class="v-gallery__main"><img src="${cut(d.gallery[0])}" alt="Motocaddy M5 GPS DHC, three-quarter view" width="800" height="800" fetchpriority="high"></div>
      <ul class="v-gallery__thumbs">
        ${d.gallery.map((g, i) => `<li><button type="button" aria-label="Image ${i + 1} of ${d.gallery.length + 1}"${i === 0 ? ' aria-current="true"' : ""}><img src="${cut(g, 400)}" alt="" width="400" height="400"></button></li>`).join("")}
        <li><button type="button" class="v-gallery__vid" aria-label="Play product video"><span aria-hidden="true">▶</span><span class="q" title="To be confirmed: product video (Motocaddy supplies one per model)">Video</span></button></li>
      </ul>
    </section>
    <section class="v-buy" aria-labelledby="v-h1">
      <p class="v-buy__brand"><a href="#">Motocaddy</a> · 2026</p>
      <h1 id="v-h1">M5 GPS DHC electric trolley</h1>
      ${r.count ? `<p class="v-buy__rate"><a href="#reviews"><span aria-hidden="true">★★★★★</span> ${r.avg.toFixed(1)} · ${r.count} reviews of this trolley</a></p>` : ""}
      <p class="v-buy__intro">${esc(d.intro)}</p>

      <fieldset class="v-opt"><legend>Battery</legend>
        <label class="v-opt__card is-on"><input type="radio" name="bat" checked=""><span><strong>Standard lithium</strong><small>Up to 18 holes</small></span><span class="v-opt__p">${gbp(std.price)}<small class="p-st--in">In stock</small></span></label>
        <label class="v-opt__card is-out"><input type="radio" name="bat"><span><strong>Ultra lithium</strong><small>Up to 36 holes</small></span><span class="v-opt__p">${gbp(ult.price)}<small>Out of stock · email me</small></span></label>
      </fieldset>

      <div class="v-price">
        <p class="v-price__now">${gbp(std.price, { pence: true })}</p>
        <p class="v-price__mem"><span class="v-promise__eg" aria-hidden="true">EG</span><span>Annual members: <strong>${gbp(member, { pence: true })}</strong> using your monthly ${q("membership.memberDiscountPercent")}% off. ${L("Join for £36")}</span></p>
        <p class="v-price__fin">Or 3 interest-free payments of ${gbp(third, { pence: true })} with Klarna or Clearpay. <span class="q" title="To be confirmed: finance wording must use the providers’ approved text">Wording to be confirmed with providers</span>.</p>
      </div>

      <fieldset class="v-gift"><legend>Choose your free accessory</legend>
        ${["Gift option 1", "Gift option 2", "Gift option 3"].map((g, i) => `<label class="v-gift__opt${i === 0 ? " is-on" : ""}"><input type="radio" name="gift"${i === 0 ? ' checked=""' : ""}><span class="q" title="To be confirmed: gift list comes from the free-gift app">${g}</span></label>`).join("")}
        <p class="v-fnote">${q("offers.trolleyGift")}</p>
      </fieldset>

      <div class="v-actions"><button type="button" class="p-btn v-atb">Add to basket</button><button type="button" class="v-collect">Click and collect in Ringwood</button></div>

      <ul class="v-assure">
        <li>${ic.truck}<span><strong>Free next-day UK delivery.</strong> Order by ${esc(val("delivery.nextDayCutoff"))} on a weekday; a live countdown shows the time left.</span></li>
        <li><span class="v-promise__eg" aria-hidden="true">✓</span><span><strong>Warranty:</strong> ${esc(f.warranty)}.</span></li>
        <li><span class="v-promise__eg" aria-hidden="true">£</span><span><strong>${esc(facts.pricePromise.short)}.</strong> ${L("How it works")}</span></li>
      </ul>

      <div class="v-bundle">
        <p class="v-bundle__h">Ready-made bundle</p>
        <div class="v-bundle__row"><img src="${cut(d.bundle.image, 400)}" alt="" width="400" height="400"><div><strong>${esc(d.bundle.name)}</strong><span>Bought separately ${gbp(bundleTotal)} · bundle price ${qt("TBC", "bundle price to be set")}</span></div></div>
        ${L("Add the bundle")}
      </div>
    </section>
  </div>

  <section class="v-sec" aria-labelledby="v-hl"><h2 id="v-hl">Highlights</h2>
    <ul class="v-hl">${d.highlights.map(([h, p, img]) => `<li><img src="${cut(img, 400)}" alt="" width="400" height="400" loading="lazy"><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join("")}</ul>
    <div class="v-video" role="img" aria-label="Product video placeholder"><span aria-hidden="true">▶</span><span class="q" title="To be confirmed: product video">Product video: the M5 GPS DHC on the course</span></div>
  </section>

  <section class="v-sec v-specs-wrap" aria-labelledby="v-sp"><h2 id="v-sp">Specifications</h2>
    <dl class="v-specs">${d.specs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>
  </section>

  <section class="v-sec" aria-labelledby="v-cm"><h2 id="v-cm">Compare with similar trolleys</h2>
    <div class="v-cmp-wrap"><table class="v-cmp">
      <thead><tr><th scope="col"><span class="sr">Spec</span></th>${cmp.map((c) => `<th scope="col" class="${c.id === "m5-gps-dhc" ? "is-this" : ""}"><img src="${cut(c.image, 400)}" alt="" width="400" height="400" loading="lazy"><span>${esc(c.name)}</span><small>${c.id === "m5-gps-dhc" ? "This trolley" : "&nbsp;"}</small></th>`).join("")}</tr></thead>
      <tbody>
        <tr><th scope="row">From</th>${cmp.map((c) => `<td class="${c.id === "m5-gps-dhc" ? "is-this" : ""}">${gbp(S(c).from)}</td>`).join("")}</tr>
        <tr><th scope="row">GPS</th>${cmp.map((c) => `<td class="${c.id === "m5-gps-dhc" ? "is-this" : ""}">${dot(S(c).gps, "GPS")}</td>`).join("")}</tr>
        <tr><th scope="row">Downhill control</th>${cmp.map((c) => `<td class="${c.id === "m5-gps-dhc" ? "is-this" : ""}">${dot(S(c).dhc, "Downhill control")}</td>`).join("")}</tr>
        <tr><th scope="row">Remote</th>${cmp.map((c) => `<td class="${c.id === "m5-gps-dhc" ? "is-this" : ""}">${dot(S(c).remote, "Remote")}</td>`).join("")}</tr>
        <tr><th scope="row">Battery</th>${cmp.map((c) => `<td class="${c.id === "m5-gps-dhc" ? "is-this" : ""}">${esc(holesOf(c).map((h) => h.replace(" holes", "")).join(" or "))} holes</td>`).join("")}</tr>
        <tr><th scope="row">Weight</th>${cmp.map((c) => `<td class="${c.id === "m5-gps-dhc" ? "is-this" : ""}">${S(c).weight ? S(c).weight + "kg" : "Not listed"}</td>`).join("")}</tr>
        <tr><th scope="row">Status</th>${cmp.map((c) => `<td class="${c.id === "m5-gps-dhc" ? "is-this" : ""}">${stockWord(S(c).stock)}</td>`).join("")}</tr>
      </tbody>
    </table></div>
  </section>

  <section class="v-sec v-rev" id="reviews" aria-labelledby="v-rv">
    <div class="v-rev__sum"><h2 id="v-rv">Reviews of this trolley</h2><p class="v-rev__n">${r.avg.toFixed(1)}</p><p>from ${r.count} verified reviews of the M5 GPS DHC on Judge.me. Store-wide Trustpilot reviews are kept separate.</p>${L("Write a review")}</div>
    <ul class="v-rev__list">${[1, 2].map(() => `<li><p class="v-rev__stars" aria-hidden="true">★★★★★</p><p><span class="q" title="To be confirmed: real Judge.me review text for this product">The customer’s review of the M5 GPS DHC appears here, word for word.</span></p><p class="v-rev__by">Name · Verified buyer · Ultra battery</p></li>`).join("")}</ul>
  </section>

  <section class="v-sec v-help" aria-labelledby="v-qu"><h2 id="v-qu">Questions about this trolley?</h2>
    <p>Call ${phone()} or email ${email()}.</p><p>${L("Near Ringwood? See it in the showroom")}</p>
  </section>
</main>
${footer()}
</div>
<div class="v-sticky${firstScreen ? " v-sticky--live" : ""}" aria-label="Quick add to basket"><div><strong>M5 GPS DHC · Standard</strong><span>${gbp(std.price)} · In stock</span></div><button type="button" class="p-btn">Add to basket</button></div>`,
  });
};
