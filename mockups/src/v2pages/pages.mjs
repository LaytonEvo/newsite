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
export const crumbs = (items) => `<nav class="v-crumbs" aria-label="Breadcrumb"><ol>${items.map(([t, h], i) => `<li>${i < items.length - 1 ? `<a href="${h}">${esc(t)}</a>` : `<span aria-current="page">${esc(t)}</span>`}</li>`).join("")}</ol></nav>`;
const chk = (group, label, n) => `<label class="v-check"><input type="checkbox" data-f="${group}" value="${esc(label)}"><span>${esc(label)}</span><small>${n}</small></label>`;
export const page = (title, body) => doc({ title, css: "v2pages", fonts, body: html`<a class="sr sr-focus" href="#v-main">Skip to content</a>
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
  brand: [f.brand], features: [...featsOf(f), ...(holesOf(f).includes("18 holes") ? ["18-hole battery option"] : [])], battery: batteryOpts(f), weight: [weightBand(S(f).weight)],
  price: [priceBand(S(f).price)], availability: [stockLabel[S(f).stock.state]],
});
// price and availability first: on a £479 to £1,299 range they are what people filter by first (CRO review, round 1)
// declutter review: availability is the "In stock only" switch; "36 holes" matched every trolley, so the
// 18-hole option lives under Features; weight returns once every model has one
const GROUPS = [["price", "Price"], ["features", "Features"], ["brand", "Brand"]];
const ORDER = {
  brand: [...new Set(trolleys.map((f) => f.brand))], features: ["GPS", "Downhill control", "Remote", "Follow", "18-hole battery option"], battery: ["18 holes", "36 holes"],
  weight: ["Under 10.5kg", "10.5 to 11kg", "Over 11kg", "Not listed"], price: ["Under £600", "£600 to £900", "£900 to £1,200", "Over £1,200"],
  availability: ["In stock", "Available to order", "Out of stock"],
};
export const filterGroups = () => GROUPS.map(([k, h]) => [k, h, ORDER[k].map((o) => [o, trolleys.filter((f) => tags(f)[k].includes(o)).length])]);
const filtersHtml = () => filterGroups().map(([k, h, opts]) => `<fieldset class="v-fgroup"><legend>${esc(h)}</legend>${opts.map(([l, n]) => chk(k, l, n)).join("")}</fieldset>`).join("");

/* ---------- product card ---------- */
const card = (f, i) => {
  const s = S(f); const r = s.rating; const t = tags(f);
  const data = Object.entries(t).map(([k, v]) => `data-${k}="${esc(v.join("|"))}"`).join(" ");
  return html`<li class="v-card v-card--${s.stock.state}" data-card ${data} data-price-n="${s.price}" data-weight-n="${s.weight ?? ""}" data-rating-n="${r.count ? r.avg : 0}" data-year="${f.year ?? 0}" data-rank="${i}" data-stock="${s.stock.state}" data-bat-stock="${esc(f.variants.map((v) => `${v.holes.startsWith("36") ? "36 holes" : v.holes}:${vStock(v)}`).join("|"))}">
    <a href="${f.href}" class="v-card__link">
      <span class="v-card__img"><img src="${cut(f.image, 400)}" alt="" width="400" height="400" loading="lazy"></span>
      <span class="v-card__brand">${esc(f.brand)}</span>
      <h3 class="v-card__name">${esc(f.name)}</h3>
      <span class="v-card__feat">${esc(featsOf(f).length ? featsOf(f).join(" · ") : "Essential controls")}</span>
      <span class="v-card__bat">${esc([...new Set(holesOf(f).map((h) => h.replace(" holes", "")))].join(" or "))} holes${s.weight ? ` · ${s.weight}kg` : ""}</span>
      <span class="v-card__price">${s.priceFrom ? "<small>From</small> " : ""}${gbp(s.price)}</span>
      <span class="v-card__stock">${stockWord(s.stock)}${s.stock.state === "in" && f.variants.length > 1 && f.variants.some((v) => !(v.available && v.stock > 0)) ? ` (${f.variants.filter((v) => v.available && v.stock > 0).map((v) => v.holes.replace(" holes", "-hole")).join(", ")})` : ""}</span>
      ${r.count ? `<span class="v-card__rate"><span aria-hidden="true">★</span> ${r.avg.toFixed(1)} · ${r.count} review${r.count > 1 ? "s" : ""}</span>` : ""}
    </a>
  </li>`;
};

/* ---------- collection page ---------- */
const radio = (name, value, label, on) => `<label><input type="radio" name="${name}" value="${value}"${on ? ' checked=""' : ""}>${label}</label>`;
const finder = () => {
  // starts unanswered; every answer narrows the grid and in-stock models rank first (site.js)
  return html`<section class="v-finder" id="finder" aria-labelledby="v-fd" data-finder-box>
  <div class="v-finder__head"><h2 id="v-fd">Help me choose</h2><p>Answer any of these and the list below narrows as you go.</p></div>
  <form class="v-finder__q" id="v-finder-q" action="#grid" data-finder>
    <fieldset><legend>Course maps?</legend>${radio("gps", "GPS", "GPS")}${radio("gps", "", "Not needed")}</fieldset>
    <fieldset><legend>Hilly course?</legend>${radio("dhc", "Downhill control", "Downhill control")}${radio("dhc", "", "Not needed")}</fieldset>
    <fieldset><legend>Steering?</legend>${radio("rem", "", "Handle")}${radio("rem", "Remote", "Remote")}${radio("rem", "Follow", "Follow")}</fieldset>
    <fieldset><legend>How much golf?</legend>${radio("bat", "18 holes", "18 holes")}${radio("bat", "36 holes", "36 holes")}</fieldset>
    <div class="v-finder__go"><button type="button" class="v-clear" data-finder-close>Done</button></div>
  </form>
</section>`;
};

export const collection = ({ drawer = false } = {}) => {
  const s = saving();
  return page("Electric golf trolleys | Evolution Golf", html`<main id="v-main" class="v">
  ${crumbs([["Home", to("Home")], ["Trolleys", to("Trolleys")], ["Electric trolleys", "#"]])}
  <header class="v-head">
    <h1>Electric golf trolleys</h1>
    <p class="v-head__sub">${trolleys.length} models from Motocaddy, NAVEE and Powerbug. Most Motocaddy models offer a Standard (18-hole) or Ultra (36-hole) battery.</p>
  </header>
  <div class="v-bar" id="grid">
    <button type="button" class="v-bar__help" aria-expanded="false" aria-controls="finder" data-finder-open>Help me choose</button>
    <p class="v-bar__n" aria-live="polite"><strong data-count>${trolleys.length}</strong> trolleys</p>
    <button type="button" class="v-bar__filter" data-open-filters aria-controls="v-filter-sheet">Filters<span data-filter-n></span></button>
    <label class="v-sort"><span>Sort</span><select data-sort aria-describedby="v-sortnote"><option value="rec">Recommended</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option><option value="new">Newest</option><option value="rated">Best rated</option></select></label>
    <label class="v-toggle"><input type="checkbox" data-instock> In stock only</label>
    <p class="sr" id="v-sortnote">Out-of-stock models are listed last in every sort order.</p>
    <div class="v-chips" data-chips aria-label="Filters applied"></div>
  </div>
  ${finder()}
  <div class="v-layout">
    <aside class="v-filters" aria-label="Filter trolleys" data-filters>${filtersHtml()}</aside>
    <div>
      <h2 class="sr">Electric trolleys</h2>
      <ul class="v-grid" aria-label="Electric trolleys" data-grid>${trolleys.map(card).join("")}</ul>
      <p class="v-empty" data-empty hidden>No trolleys match all of those filters. <button type="button" class="v-clear" data-clear>Clear filters</button></p>
    </div>
  </div>
  <p class="v-after">Not sure? Call ${phone()} · ${L("Electric trolley buying guide")}${L("Push trolleys")}</p>
</main>
${drawer !== false ? html`<div class="v-drawer" id="v-filter-sheet" role="dialog" aria-modal="true" aria-labelledby="v-dr"${drawer === "hidden" ? " hidden" : ""} data-sheet><div class="v-drawer__panel">
  <div class="v-drawer__top"><h2 id="v-dr">Filters</h2><button type="button" class="v-x" aria-label="Close filters" data-close-filters>×</button></div>
  <div class="v-drawer__body"><label class="v-sort v-sort--sheet"><span>Sort</span><select data-sort-sheet><option value="rec">Recommended</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option><option value="new">Newest</option><option value="rated">Best rated</option></select></label><div data-filters>${filtersHtml()}</div></div>
  <div class="v-drawer__foot"><button type="button" class="v-clear" data-clear>Clear all</button><button type="button" class="p-btn" data-close-filters>Show <span data-count>${trolleys.length}</span> trolleys</button></div>
</div></div>` : ""}`);
};

/* ---------- product page (any trolley family) ---------- */
const vStock = (v) => (!v.available ? "out" : v.stock > 0 ? "in" : "order");
const vStockWord = { in: "In stock", order: "Available to order", out: "Out of stock · email me" };
const pence = (n) => Math.round(n * 100) / 100;
/** Detail for families without a hand-written entry: only facts we hold, no invented copy. */
const autoDetail = (f) => {
  const rec = (catalogue.trolleyFacts?.[f.id]?.consider ?? []).map(([, oid]) => oid);
  const dist = (o) => (rec.includes(o.id) ? -1e6 : 0) + (o.brand === f.brand ? 0 : 2000) + Math.abs(S(o).from - S(f).from) + (S(o).stock.state === "out" ? 400 : 0);
  const near = trolleys.filter((o) => o.id !== f.id).sort((a, b) => dist(a) - dist(b)).slice(0, 3);
  const specs = [["Battery options", f.variants.map((v) => `${v.battery} (${v.holes})`).join(" or ")], ["Features", featsOf(f).join(", ") || "Essential controls"]];
  if (f.weightKg) specs.push(["Weight", `${f.weightKg}kg`]);
  if (f.warranty) specs.push(["Warranty", f.warranty]);
  return { gallery: [f.image], intro: null, highlights: [], specs, compare: [f.id, ...near.map((o) => o.id)], bundle: null };
};

/** Spec rows from the per-trolley fact sheet (taken from each product's own description) */
const specsOf = (f) => {
  const tf = catalogue.trolleyFacts?.[f.id];
  const own = tf?.rows ?? [["Features", featsOf(f).join(", ") || "Essential controls"]];
  const rows = [...(own.some(([k]) => k === "Battery") ? [] : [["Battery", f.variants.map((v) => `${v.battery}, up to ${v.holes}`).join(" or ")]]), ...own];
  if (f.weightKg && !rows.some(([k]) => k === "Weight")) rows.push(["Weight", `${f.weightKg}kg`]);
  if (f.warranty) rows.push(["Warranty", f.warranty]);
  return rows;
};

/** out-of-stock product pages: the closest trolleys by price that can ship now (CRO round 1, #2) */
const similarInStock = (f) => {
  const near = trolleys.filter((o) => o.id !== f.id && S(o).stock.state === "in")
    .sort((a, b) => Math.abs(S(a).price - S(f).from) - Math.abs(S(b).price - S(f).from)).slice(0, 3);
  if (!near.length) return "";
  return html`<section class="v-similar" aria-labelledby="v-si"><h2 id="v-si">In stock now, and similar</h2>
    <ul class="v-grid v-grid--3">${near.map((o) => { const so = S(o); return `<li class="v-card v-card--in"><a href="${o.href}" class="v-card__link"><span class="v-card__img"><img src="${cut(o.image, 400)}" alt="" width="400" height="400" loading="lazy"></span><span class="v-card__brand">${esc(o.brand)}</span><h3 class="v-card__name">${esc(o.name)}</h3><span class="v-card__feat">${esc(featsOf(o).join(" · ") || "Essential controls")}</span><span class="v-card__price">${gbp(so.price)}</span><span class="v-card__stock">In stock${so.stock.detail ? ` · ${esc(so.stock.detail)}` : ""}</span></a></li>`; }).join("")}</ul>
  </section>`;
};

export const product = ({ id = "m5-gps-dhc", firstScreen = false } = {}) => {
  const f = fam(id); const d = catalogue.productDetail[id] ?? autoDetail(f); const s = S(f); const r = s.rating;
  const full = `${f.brand} ${f.name}`; const desc = catalogue.descriptions?.[id];
  const first = f.variants.find((v) => vStock(v) === "in") ?? f.variants.find((v) => v.available) ?? f.variants[0];
  const pct = val("membership.memberDiscountPercent");
  const member = (p) => pence((p * (100 - pct)) / 100);
  const fee = saving().fee;
  const netText = (p) => { const n = pence((p * pct) / 100 - fee); return n > 0 ? `${gbp(n, { pence: true })} better off on this order, even after the ${gbp(fee)} fee` : `this order alone covers ${gbp(pence((p * pct) / 100), { pence: true })} of the ${gbp(fee)} fee`; };
  const finMax = val("finance.payIn3Max");
  const tf = catalogue.trolleyFacts?.[id];
  const hours = `${facts.business.hours[0].days}, ${facts.business.hours[0].time}`;
  const allSpecs = specsOf(f);
  const foldRow = allSpecs.find(([k]) => k === "Folded size");
  const weight = allSpecs.find(([k]) => k === "Weight")?.[1];
  const specRest = allSpecs.filter(([k]) => k !== "Folded size" && k !== "Weight");

  const glance = (tf?.rows ?? []).filter(([k]) => k !== "Folded size" && k !== "Weight").slice(0, 6);
  const folded = d.gallery.find((g) => /fold/.test(g)) ?? null;
  const story = d.highlights.filter(([, , img]) => !/fold/.test(img) && img !== f.image && img !== d.gallery[0]);
  const holes = [...new Set(holesOf(f))];
  const faq = [
    ...(f.variants.length > 1 ? [["Which battery should I choose?", `<p>${f.variants.map((v) => `${esc(v.battery)} goes up to ${esc(v.holes)}`).join("; ")}. Pick the longer-range one if you play two rounds between charges. <a href="#buy">Back to the battery choice</a></p>`]] : []),
    ["When will it arrive?", s.stock.state === "in"
      ? `<p>In stock: order by ${esc(val("delivery.nextDayCutoff"))} on a weekday for next-day UK delivery, ${first.price >= val("delivery.nextDayFreeThreshold") ? "free on this trolley" : `${gbp(val("delivery.nextDayPrice"), { pence: true })}, free over ${gbp(val("delivery.nextDayFreeThreshold"))}`}.</p>`
      : `<p>${s.stock.state === "order" ? `Available to order: dispatch time ${qt("to be confirmed", "Supplier dispatch time for items available to order")}.` : "Out of stock right now. Choose “Email me when it’s back” and we’ll let you know."}</p>`],
    ...(s.stock.state === "in" ? [["Can I collect it instead?", `<p>Yes. Choose click and collect at checkout and pick it up from our showroom, ${esc(hours)}.</p>`]] : []),
  ];
  const cmp = d.compare.map(fam);
  const isThis = (c) => (c.id === f.id ? "is-this" : "");
  const giftOn = f.brand === "Motocaddy";
  const freeNext = first.price >= val("delivery.nextDayFreeThreshold");
  const vjson = (v) => esc(JSON.stringify({ battery: v.battery, holes: v.holes, price: v.price, member: member(v.price), net: netText(v.price), fin: v.price <= finMax, third: pence(v.price / 3), stock: vStock(v), max: v.stock > 0 ? v.stock : null, handle: v.handle }));
  const out = s.stock.state === "out";
  const listHref = to("Electric trolleys") === "#" ? "v2-trolleys.html" : to("Electric trolleys");
  return page(`${full} electric golf trolley | Evolution Golf`, html`<main id="v-main" class="v" data-product="${f.id}" data-name="${esc(full)}" data-image="${cut(f.image, 400)}">
  ${crumbs([["Home", to("Home")], ["Trolleys", to("Trolleys")], ["Electric trolleys", listHref], [full, "#"]])}
  <div class="v-pdp">
    <section class="v-gallery" aria-label="Product images">
      <div class="v-gallery__main"><img src="${cut(d.gallery[0])}" alt="${esc(full)} electric trolley" width="800" height="800" fetchpriority="high" data-main-img></div>
      <ul class="v-gallery__thumbs">
        ${d.gallery.map((g, i) => `<li><button type="button" aria-label="Image ${i + 1} of ${d.gallery.length}"${i === 0 ? ' aria-current="true"' : ""} data-thumb="${cut(g)}"><img src="${cut(g, 400)}" alt="" width="400" height="400"></button></li>`).join("")}
      </ul>
    </section>
    <section class="v-buy" id="buy" aria-labelledby="v-h1">
      <p class="v-buy__brand"><a href="${to(f.brand)}">${esc(f.brand)}</a>${f.year ? ` · ${f.year}` : ""}</p>
      <h1 id="v-h1">${esc(f.name)} electric trolley</h1>
      ${r.count ? `<p class="v-buy__rate"><span aria-hidden="true">★★★★★</span> ${r.avg.toFixed(1)} from ${r.count} review${r.count > 1 ? "s" : ""} of this trolley</p>` : ""}
      ${d.intro ? `<p class="v-buy__intro">${esc(d.intro)}</p>` : ""}

      ${f.variants.length === 1 ? `<p class="v-opt1"><input type="radio" name="bat" value="${esc(f.variants[0].battery)}" checked="" hidden data-variant="${vjson(f.variants[0])}">Battery: <strong>${esc(f.variants[0].battery)}${/lithium|Wh/i.test(f.variants[0].battery) ? "" : " lithium"}</strong>, up to ${esc(f.variants[0].holes)}</p>` : html`<fieldset class="v-opt"><legend>Battery</legend>
        ${f.variants.map((v) => { const st = vStock(v); const on = v === first; return `<label class="v-opt__card${on ? " is-on" : ""}${st === "out" ? " is-out" : ""}"><input type="radio" name="bat" value="${esc(v.battery)}"${on ? ' checked=""' : ""} data-variant="${vjson(v)}"><span><strong>${esc(v.battery)}${/lithium|Wh/i.test(v.battery) ? "" : " lithium"}</strong><small>Up to ${esc(v.holes)}</small></span><span class="v-opt__p">${gbp(v.price)}<small${st === "in" ? ' class="p-st--in"' : ""}>${vStockWord[st]}</small></span></label>`; }).join("")}
      </fieldset>
      ${new Set(holesOf(f)).size > 1 ? `<p class="v-opt__help">Which battery? The longer-range one suits you if you play two rounds between charges, or would rather charge less often.</p>` : ""}`}

      <div class="v-price">
        <p class="v-price__now" data-price>${gbp(first.price)}</p>
        ${out ? "" : html`<p class="v-price__mem"><span>Annual members pay <strong data-member>${gbp(member(first.price), { pence: true })}</strong> with the monthly ${q("membership.memberDiscountPercent")}% off: <span data-member-net>${netText(first.price)}</span>. ${L("Join for £36")}</span></p>
        <p class="v-price__fin" data-fin${first.price > finMax ? " hidden" : ""}>Or 3 interest-free payments of <span data-third>${gbp(pence(first.price / 3), { pence: true })}</span> with Klarna or Clearpay. <span class="q" title="To be confirmed: finance wording must use the providers’ approved text">Wording to be confirmed with providers</span>.</p>`}
      </div>


      ${giftOn && !out ? html`<fieldset class="v-gift v-gift--compact"><legend>Your free accessory</legend>
        ${["Gift option 1", "Gift option 2", "Gift option 3"].map((g, i) => `<label class="v-gift__opt${i === 0 ? " is-on" : ""}"><input type="radio" name="gift" value="${g}"${i === 0 ? ' checked=""' : ""}><span>${g}</span></label>`).join("")}
      </fieldset>` : ""}
      ${giftOn && !out ? `<p class="v-giftlink">Gift list ${qt("to be confirmed", "Gift list per trolley comes from the free-gift app")}</p>` : ""}
      <div class="v-actions"><button type="button" class="p-btn v-atb" data-add>${vStock(first) === "out" ? "Email me when it’s back" : "Add to basket"}</button></div>
      ${s.stock.state === "in" ? `<button type="button" class="v-collect v-collect--line" data-add="collect">Or add to basket for click and collect in Ringwood</button>` : ""}
      <p class="v-added" data-added role="status" hidden></p>

      ${out ? similarInStock(f) : ""}

      <ul class="v-assure">
        ${s.stock.state === "in" ? `<li>${freeNext ? "Free next-day UK delivery" : `Next-day UK delivery ${gbp(val("delivery.nextDayPrice"), { pence: true })}, free over ${gbp(val("delivery.nextDayFreeThreshold"))}`}, order by ${esc(val("delivery.nextDayCutoff"))} on a weekday<span data-cutoff></span></li>`
          : s.stock.state === "order" ? `<li>Available to order: dispatch time ${qt("to be confirmed", "Supplier dispatch time for items available to order")}, free UK delivery over ${gbp(val("delivery.guestFreeThreshold"))}</li>` : ""}
      </ul>

      <section class="v-why" aria-labelledby="v-wy"><h2 id="v-wy">Why buy it from Evolution Golf</h2>
        ${[
          f.brand === "Motocaddy" ? [q("dealers.motocaddy"), `${esc(f.brand)}’s own warranty applies, and we handle claims for you (see below).`] : null,
          ["Warranty handled by us", `${q("warrantyHandling")}. ${f.warranty ? `Cover: ${esc(f.warranty)}.` : ""}`],
          ["See it before you buy", `${q("showroom")}, ${esc(hours)}.`],
          ["Returns", `Standard returns policy ${qt("to be confirmed", "Owner to supply the standard returns policy for all customers")}. ${q("returns.summary")}.`],
          [esc(facts.pricePromise.short), `Found it cheaper elsewhere? We’ll look at matching it. ${L("How it works", to(facts.pricePromise.short))}`],
        ].filter(Boolean).map(([t, b]) => `<details class="v-why__i"><summary>${t}</summary><p>${b}</p></details>`).join("")}
      </section>
      ${d.bundle && !out ? html`<div class="v-set v-set--buy" id="complete"><img src="${cut(d.bundle.image, 400)}" alt="" width="400" height="400" loading="lazy"><div><strong>Complete the set</strong><span>${esc(d.bundle.name)}</span><span>Bought separately ${gbp(d.bundle.items.reduce((n, [, p]) => n + p, 0))} · bundle price ${qt("TBC", "bundle price to be set")}</span>${L("Add the bundle")}</div></div>` : ""}

    </section>
  </div>

  ${glance.length ? html`<section class="v-sec v-glance" aria-labelledby="v-gl"><h2 id="v-gl">At a glance</h2>
    <ul>${glance.map(([k, v]) => `<li><strong>${esc(k)}</strong><span>${esc(v)}</span></li>`).join("")}</ul>
  </section>` : ""}

  ${tf ? html`<section class="v-sec v-fit" aria-labelledby="v-ft"><h2 id="v-ft">Is the ${esc(f.name)} right for you?</h2>
    <div class="v-fit__grid">
      <div class="v-fit__col"><h3>Good for</h3><ul class="v-tick">${tf.suits.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        ${tf.consider.map(([ask, oid, why]) => { const o = fam(oid); return `<p class="v-fit__alt"><strong>${esc(ask)}</strong> The <a href="${o.href}">${esc(o.brand)} ${esc(o.name)}</a> ${esc(why)}, from ${gbp(S(o).from)}.</p>`; }).join("")}</div>
      <div class="v-fit__col v-fit__box"><h3>In the box</h3><ul class="v-tick">${tf.box.map(([t, n]) => `<li>${n ? qt(t, n) : esc(t)}</li>`).join("")}</ul></div>
    </div>
  </section>` : ""}


  ${story.length ? html`<section class="v-story" aria-label="Features">
    ${story.map(([h, p, img], n) => `<div class="v-story__row"><div class="v-story__media"><img src="${cut(img)}" alt="" width="800" height="800" loading="lazy"></div><div class="v-story__txt"><p class="v-story__n">0${n + 1}</p><h2>${esc(h)}</h2><p>${esc(p)}</p></div></div>`).join("")}
  </section>` : ""}

  <section class="v-sec v-boot${folded ? "" : " v-boot--text"}" aria-labelledby="v-bt">
    ${folded ? `<div class="v-boot__media"><img src="${cut(folded)}" alt="${esc(full)} folded" width="800" height="800" loading="lazy"></div>` : ""}
    <div class="v-boot__txt">
      <h2 id="v-bt">Fits in the boot</h2>
      <dl class="v-boot__big">
        <div><dt>Folded size</dt><dd>${foldRow ? esc(foldRow[1]) : qt("to be confirmed", "Folded dimensions not in the product description")}</dd></div>
        <div><dt>Weight</dt><dd>${weight ? esc(weight) : qt("to be confirmed", "Weight not in the product description")}</dd></div>
      </dl>
      <details class="v-allspec"><summary>All specifications</summary><dl class="v-specs">${allSpecs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl></details>
    </div>
  </section>

  ${desc ? html`<section class="v-sec v-about" aria-labelledby="v-ab"><h2 id="v-ab">About the ${esc(full)}</h2>
    <p class="v-about__src">Product description from ${esc(f.brand)}</p>
    <div class="v-prose">${desc.intro}</div>
    ${desc.more ? html`<details class="v-about__more"><summary><span class="v-about__open">Read the full description</span><span class="v-about__close">Show less</span></summary><div class="v-prose">${desc.more}</div></details>` : ""}
  </section>` : ""}

  ${cmp.length > 1 ? html`<section class="v-sec v-band" aria-labelledby="v-cm"><h2 id="v-cm">Compare with similar trolleys</h2>
    <div class="v-cmp-wrap" tabindex="0" role="region" aria-label="Comparison table, scrolls sideways"><table class="v-cmp">
      <thead><tr><th scope="col"><span class="sr">Spec</span></th>${cmp.map((c) => `<th scope="col" class="${isThis(c)}"><img src="${cut(c.image, 400)}" alt="" width="400" height="400" loading="lazy">${c.id === f.id ? `<span>${esc(c.name)}</span>` : `<a href="${c.href}"><span>${esc(c.name)}</span></a>`}<small>${c.id === f.id ? "This trolley" : "&nbsp;"}</small></th>`).join("")}</tr></thead>
      <tbody>
        <tr><th scope="row">Price</th>${cmp.map((c) => `<td class="${isThis(c)}">${S(c).priceFrom ? "From " : ""}${gbp(S(c).price)}</td>`).join("")}</tr>
        <tr><th scope="row">GPS</th>${cmp.map((c) => `<td class="${isThis(c)}">${dot(S(c).gps, "GPS")}</td>`).join("")}</tr>
        <tr><th scope="row">Downhill control</th>${cmp.map((c) => `<td class="${isThis(c)}">${dot(S(c).dhc, "Downhill control")}</td>`).join("")}</tr>
        <tr><th scope="row">Remote</th>${cmp.map((c) => `<td class="${isThis(c)}">${dot(S(c).remote, "Remote")}</td>`).join("")}</tr>
        <tr><th scope="row">Battery</th>${cmp.map((c) => `<td class="${isThis(c)}">${esc(holesOf(c).map((h) => h.replace(" holes", "")).join(" or "))} holes</td>`).join("")}</tr>
        <tr><th scope="row">Weight</th>${cmp.map((c) => `<td class="${isThis(c)}">${S(c).weight ? S(c).weight + "kg" : "Not listed"}</td>`).join("")}</tr>
        <tr><th scope="row">Status</th>${cmp.map((c) => `<td class="${isThis(c)}">${stockWord(S(c).stock)}</td>`).join("")}</tr>
      </tbody>
    </table></div>
  </section>` : ""}


  <section class="v-sec v-band v-faq" aria-labelledby="v-fq"><h2 id="v-fq">Questions</h2>
    ${faq.map(([qq, a]) => `<details class="v-faq__i"><summary>${esc(qq)}</summary><div>${a}</div></details>`).join("")}
  </section>

  <section class="v-sec v-help v-close" aria-labelledby="v-qu"><h2 id="v-qu">Talk to a trolley specialist</h2>
    <p>${q("specialist")} on ${phone()} or email ${email()}, ${esc(hours)}.</p>
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
  <ul class="v-assure v-assure--basket">
    <li><span class="v-promise__eg" aria-hidden="true">↩</span><span><strong>Returns:</strong> ${qt("policy for every customer to be confirmed", "Owner to supply the standard returns policy for all customers")}.</span></li>
    <li><span class="v-promise__eg" aria-hidden="true">£</span><span><strong>${esc(facts.pricePromise.short)}.</strong> Found it cheaper? We’ll look at matching it.</span></li>
    <li><span class="v-promise__eg" aria-hidden="true">✓</span><span><strong>Secure checkout</strong> with cards, Apple Pay, Google Pay, PayPal, Shop Pay, Klarna and Clearpay.</span></li>
  </ul>
  <p class="p-links p-links--left">${L("Continue shopping", to("Electric trolleys"))}${L("Complete your kit: custom clubs built online", to("Custom clubs"))}</p>
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
      <p class="v-co__pay" data-total-inline></p>
      <button type="submit" class="p-btn v-atb">Place order (test only)</button>
    </form>
    <aside class="v-co__sum" aria-label="Order summary" data-summary></aside>
  </div>
  <section class="v-done" data-done hidden tabindex="-1" aria-labelledby="v-dn"><h2 id="v-dn">Order placed (test only)</h2><p>Thanks. On the real site you’d now get an order confirmation email. Nothing was sent and no payment was taken.</p><div class="v-co__sum" data-recap></div>
    <h3>While you wait</h3><p class="p-links p-links--left">${L("Build your clubs online", to("Custom clubs") === "#" ? catalogue.clubBuilder.url : to("Custom clubs"))}${L("See membership", to("Members"))}${L("Back to electric trolleys", to("Electric trolleys"))}</p></section>
</main>`);

export const notInPreview = () => page("Not in this preview | Evolution Golf", html`<main id="v-main" class="v v-narrow">
  <header class="v-head"><h1>Not in this preview yet</h1><p class="v-head__sub"><span data-page-name>This page</span> is part of the full redesign but hasn’t been built for the test site yet. This preview covers the homepage, electric trolleys, trolley product pages, the custom clubs page, the basket and a simulated checkout.</p></header>
  <p class="p-links p-links--left">${L("Electric trolleys", to("Electric trolleys"))}${L("Homepage", to("Home"))}</p>
</main>`);

export const notFound = () => page("Page not found | Evolution Golf", html`<main id="v-main" class="v v-narrow">
  <header class="v-head"><h1>We can’t find that page</h1><p class="v-head__sub">It may have moved. Try electric trolleys, or call ${phone()}.</p></header>
  <p class="p-links p-links--left">${L("Electric trolleys", to("Electric trolleys"))}${L("Homepage", to("Home"))}</p>
</main>`);
