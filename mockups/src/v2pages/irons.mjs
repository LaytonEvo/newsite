// Showroom+ v2: clubs hub (/clubs/), irons collection (/clubs/irons/) and iron set pages
// (/clubs/irons/<id>/). Data: src/data/irons.json, a read-only snapshot of the public product
// feed in which listings that differ only by shaft material or finish are grouped into one model.
import { html, esc, gbp, q, qt, val, facts, site, to, phone, email } from "../concepts/kit.mjs";
import { L } from "../concepts/showroomplus2.mjs";
import { page, crumbs } from "./pages.mjs";
import data from "../data/irons.json" with { type: "json" };

export const irons = data.families;
const img = (name, w = 800) => `${site.base}assets/img/irons/${name}-${w}.webp`;
export const ironHref = (f) => (site.routes.Irons ? `${site.routes.Irons}${f.id}/` : `v2-iron-${f.id}.html`);
const pence = (n) => Math.round(n * 100) / 100;
const stockWord = { in: "In stock", order: "Available to order", out: "Out of stock" };
const setLabel = (s) => { const m = s.match(/^(\d)-PW(?:\+(\w+))?$/); if (!m) return s; const n = 10 - +m[1] + 1; return `${s} (${n + (m[2] ? 1 : 0)} clubs)`; };
const pct = () => val("membership.memberDiscountPercent");
const fee = () => facts.membership.tiers.find((t) => t.price).price;
const hours = () => `${facts.business.hours[0].days}, ${facts.business.hours[0].time}`;

/* ---------- clubs hub ---------- */
const TYPES = [
  ["Irons", "Sets from 3-PW to 5-PW, steel or graphite", true],
  ["Drivers", "Adjustable heads, loft and shaft options"],
  ["Fairway woods", "3, 5 and 7 woods"],
  ["Hybrids", "Long-iron replacements"],
  ["Wedges", "Gap, sand and lob wedges"],
  ["Putters", "Blade and mallet"],
];
export const clubsHub = () => page("Golf clubs | Evolution Golf", html`<main id="v-main" class="v k">
  ${crumbs([["Home", to("Home")], ["Clubs", "#"]])}
  <header class="v-head"><h1>Golf clubs</h1>
    <p class="v-head__sub">Off the shelf from ${[...new Set(irons.map((f) => f.brand))].slice(0, -1).join(", ")} and ${[...new Set(irons.map((f) => f.brand))].at(-1)}, or built to your specs online.</p></header>
  <ul class="k-types">${TYPES.map(([t, d, live]) => `<li><a href="${live ? (site.routes.Irons ?? "v2-irons.html") : to(t)}"><strong>${esc(t)}</strong><span>${esc(d)}</span>${live ? `<em>${irons.length} models</em>` : ""}</a></li>`).join("")}</ul>
  <section class="v-sec v-band k-custom" aria-labelledby="k-cu"><h2 id="k-cu">Want them built to your specs?</h2>
    <p>Choose the head, shaft, grip, length and lie in the custom club builder, or ask our team to help with your specs.</p>
    <p class="m-hero__cta">${L("Build custom clubs", to("Custom clubs"))}</p></section>
</main>`);

/* ---------- irons collection ---------- */
const band = (p) => (p < 800 ? "Under £800" : p < 1000 ? "£800 to £1,000" : p < 1200 ? "£1,000 to £1,200" : "Over £1,200");
const tagsOf = (f) => ({ price: [band(f.from)], brand: [f.brand], shaft: f.shafts, sets: f.sets.map((s) => s.replace(/\+\w+$/, " + wedge")), availability: [stockWord[f.stock]] });
const ORDER = { price: ["Under £800", "£800 to £1,000", "£1,000 to £1,200", "Over £1,200"], brand: [...new Set(irons.map((f) => f.brand))].sort(), shaft: ["Steel", "Graphite"], sets: ["5-PW", "4-PW", "3-PW", "5-PW + wedge"] };
const GROUPS = [["price", "Price"], ["shaft", "Shaft"], ["sets", "Set"], ["brand", "Brand"]];
const chk = (g, l, n) => `<label class="v-check"><input type="checkbox" data-f="${g}" value="${esc(l)}"><span>${esc(l)}</span><small>${n}</small></label>`;
const filtersHtml = () => GROUPS.map(([k, h]) => `<fieldset class="v-fgroup"><legend>${h}</legend>${ORDER[k].map((o) => [o, irons.filter((f) => tagsOf(f)[k].includes(o)).length]).filter(([, n]) => n).map(([o, n]) => chk(k, o, n)).join("")}</fieldset>`).join("");
const card = (f, i) => {
  const data = Object.entries(tagsOf(f)).map(([k, v]) => `data-${k}="${esc(v.join("|"))}"`).join(" ");
  const finishes = [...new Set(f.members.map((m) => m.finish))];
  return `<li class="v-card v-card--${f.stock}" data-card ${data} data-price-n="${f.from}" data-rank="${i}" data-year="0" data-rating-n="0" data-stock="${f.stock}">
    <a href="${ironHref(f)}" class="v-card__link">
      <span class="v-card__img"><img src="${img(f.gallery[0], 400)}" alt="" width="400" height="400" loading="lazy"></span>
      <span class="v-card__brand">${esc(f.brand)}</span>
      <h3 class="v-card__name">${esc(f.name)}</h3>
      <span class="v-card__feat">${esc(f.shafts.join(" or "))} shafts${finishes.length > 1 ? ` · ${finishes.map((x) => (x === "Standard" ? "Chrome" : x)).join(" or ")}` : ""}</span>
      <span class="v-card__bat">${esc([...new Set(f.sets.map((s) => s.replace(/\+\w+$/, "")))].join(", "))}</span>
      <span class="v-card__price"><small>From</small> ${gbp(f.from)}</span>
      <span class="v-card__stock">${stockWord[f.stock]}</span>
    </a></li>`;
};
export const ironsList = ({ drawer = false } = {}) => page("Golf irons | Evolution Golf", html`<main id="v-main" class="v">
  ${crumbs([["Home", to("Home")], ["Clubs", site.routes.Clubs ?? "v2-clubs.html"], ["Irons", "#"]])}
  <header class="v-head"><h1>Golf irons</h1>
    <p class="v-head__sub">${irons.length} iron sets from ${ORDER.brand.length} brands, in steel or graphite. Most are made to order with your choice of set, shaft and flex; ${irons.filter((f) => f.stock === "in").length} are in stock now.</p></header>
  <div class="v-bar" id="grid">
    <p class="v-bar__n" aria-live="polite"><strong data-count>${irons.length}</strong> iron sets</p>
    <button type="button" class="v-bar__filter" data-open-filters aria-controls="v-filter-sheet">Filters<span data-filter-n></span></button>
    <label class="v-sort"><span>Sort</span><select data-sort><option value="rec">Recommended</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option></select></label>
    <label class="v-toggle"><input type="checkbox" data-instock> In stock only</label>
    <div class="v-chips" data-chips aria-label="Filters applied"></div>
  </div>
  <div class="v-layout">
    <aside class="v-filters" aria-label="Filter irons" data-filters>${filtersHtml()}</aside>
    <div><h2 class="sr">Iron sets</h2>
      <ul class="v-grid k-white" aria-label="Iron sets" data-grid>${irons.map(card).join("")}</ul>
      <p class="v-empty" data-empty hidden>No iron sets match all of those filters. <button type="button" class="v-clear" data-clear>Clear filters</button></p></div>
  </div>
  <p class="v-after">Not sure of your specs? Call ${phone()} · ${L("Build custom clubs", to("Custom clubs"))}</p>
</main>
${drawer !== false ? html`<div class="v-drawer" id="v-filter-sheet" role="dialog" aria-modal="true" aria-labelledby="v-dr"${drawer === "hidden" ? " hidden" : ""} data-sheet><div class="v-drawer__panel">
  <div class="v-drawer__top"><h2 id="v-dr">Filters</h2><button type="button" class="v-x" aria-label="Close filters" data-close-filters>×</button></div>
  <div class="v-drawer__body"><label class="v-sort v-sort--sheet"><span>Sort</span><select data-sort-sheet><option value="rec">Recommended</option><option value="low">Price, low to high</option><option value="high">Price, high to low</option></select></label><div data-filters>${filtersHtml()}</div></div>
  <div class="v-drawer__foot"><button type="button" class="v-clear" data-clear>Clear all</button><button type="button" class="p-btn" data-close-filters>Show <span data-count>${irons.length}</span> iron sets</button></div>
</div></div>` : ""}`);

/* ---------- iron set page ---------- */
const group = (k, legend, vals, cur, fmt = (x) => x) => vals.length < 2 ? "" : `<fieldset class="k-opt"><legend>${legend}</legend><div>${vals.map((v) => `<label class="k-pill${v === cur ? " is-on" : ""}"><input type="radio" name="io-${k}" value="${esc(v)}"${v === cur ? ' checked=""' : ""}><span>${esc(fmt(v))}</span></label>`).join("")}</div></fieldset>`;
export const ironPage = (id) => {
  const f = irons.find((x) => x.id === id);
  const full = `${f.brand} ${f.name}`;
  const finMax = val("finance.payIn3Max");
  const all = f.members.flatMap((m) => m.variants.filter((v) => v.available || true).map((v) => {
    const stock = !v.available ? "out" : m.stocked ? "in" : "order";
    const line = [v.set, v.shaft, v.flex].filter(Boolean).join(", ") + (f.shafts.length > 1 ? ` (${m.shaftType.toLowerCase()})` : "");
    const off = pence((v.price * pct()) / 100), net = pence(off - fee());
    return { type: m.shaftType, finish: m.finish === "Standard" ? "Chrome" : m.finish, set: v.set, shaft: v.shaft, flex: v.flex,
      v: { battery: [v.set, v.flex].filter(Boolean).join(" · "), line, holes: "", price: v.price, member: pence(v.price - off), net: net > 0 ? `${gbp(net, { pence: true })} better off on this order, even after the ${gbp(fee())} fee` : `this order alone covers ${gbp(off, { pence: true })} of the ${gbp(fee())} fee`, fin: v.price <= finMax, third: pence(v.price / 3), stock, max: null, handle: m.handle } };
  }));
  const first = all.find((x) => x.v.stock === "in") ?? all.find((x) => x.v.stock !== "out") ?? all[0];
  const uniq = (k) => [...new Set(all.map((x) => x[k]).filter(Boolean))];
  const lead = f.members[0];
  const others = irons.filter((o) => o.brand === f.brand && o.id !== f.id).slice(0, 3);
  const glance = [["Sets", uniq("set").map(setLabel).join(", ")], ["Shafts", `${f.shafts.join(" or ")}: ${uniq("shaft").length} option${uniq("shaft").length > 1 ? "s" : ""}`], ["Flex", uniq("flex").join(", ")], ...(uniq("finish").length > 1 ? [["Finish", uniq("finish").join(" or ")]] : []), ["Availability", stockWord[f.stock] + (f.stock === "order" ? ", made to your choice of set, shaft and flex" : "")]];
  const faq = [
    ["What does 5-PW mean?", `<p>The set runs from the 5-iron to the pitching wedge. ${uniq("set").map(setLabel).join("; ")}.</p>`],
    ...(f.shafts.length > 1 ? [["Steel or graphite?", "<p>Graphite shafts are lighter, which many golfers find easier to swing; steel is heavier and gives more feedback. If you’re unsure, our team can talk it through.</p>"]] : []),
    ["When will it arrive?", f.stock === "in" ? `<p>In-stock options: order by ${esc(val("delivery.nextDayCutoff"))} on a weekday for next-day UK delivery. Made-to-order options: dispatch time ${qt("to be confirmed", "Supplier build time for made-to-order iron sets")}.</p>` : `<p>Made to order with your set, shaft and flex. Dispatch time ${qt("to be confirmed", "Supplier build time for made-to-order iron sets")}.</p>`],
    ...(f.custom ? [["Can I change the length, lie or grip?", `<p>Yes: build it in the ${L("custom club builder", to("Custom clubs"))}, or call our team on ${phone()}.</p>`]] : []),
  ];
  return page(`${full} irons | Evolution Golf`, html`<main id="v-main" class="v k-pdp" data-product="iron-${f.id}" data-name="${esc(full)} irons" data-image="${img(f.gallery[0], 400)}">
  ${crumbs([["Home", to("Home")], ["Clubs", site.routes.Clubs ?? "v2-clubs.html"], ["Irons", site.routes.Irons ?? "v2-irons.html"], [full, "#"]])}
  <div class="v-pdp">
    <section class="v-gallery" aria-label="Product images">
      <div class="v-gallery__main"><img src="${img(f.gallery[0])}" alt="${esc(full)} irons" width="800" height="800" fetchpriority="high" data-main-img></div>
      <ul class="v-gallery__thumbs">${f.gallery.map((g, i) => `<li><button type="button" aria-label="Image ${i + 1} of ${f.gallery.length}"${i === 0 ? ' aria-current="true"' : ""} data-thumb="${img(g)}"><img src="${img(g, 800)}" alt="" width="400" height="400"></button></li>`).join("")}</ul>
    </section>
    <section class="v-buy" id="buy" aria-labelledby="v-h1">
      <p class="v-buy__brand">${esc(f.brand)}</p>
      <h1 id="v-h1">${esc(f.name)} irons</h1>
      <div class="k-opts" data-iron-opts="${esc(JSON.stringify(all))}">
        ${group("type", "Shaft material", uniq("type"), first.type)}
        ${group("finish", "Finish", uniq("finish"), first.finish)}
        ${group("set", "Set", uniq("set"), first.set, setLabel)}
        ${group("shaft", "Shaft", uniq("shaft"), first.shaft)}
        ${group("flex", "Flex", uniq("flex"), first.flex)}
        <input type="radio" name="bat" checked="" hidden data-variant="${esc(JSON.stringify(first.v))}">
      </div>
      <div class="v-price">
        <p class="v-price__now" data-price>${gbp(first.v.price)}</p>
        <p class="v-price__mem"><span>Annual members pay <strong data-member>${gbp(first.v.member, { pence: true })}</strong> with the monthly ${q("membership.memberDiscountPercent")}% off: <span data-member-net>${first.v.net}</span>. ${L("Join for £36")}</span></p>
        <p class="v-price__fin" data-fin${first.v.fin ? "" : " hidden"}>Or 3 interest-free payments of <span data-third>${gbp(first.v.third, { pence: true })}</span> with Klarna or Clearpay. <span class="q" title="To be confirmed: finance wording must use the providers’ approved text">Wording to be confirmed with providers</span>.</p>
      </div>
      <div class="v-actions"><button type="button" class="p-btn v-atb" data-add>Add to basket</button></div>
      <p class="v-added" data-added role="status" hidden></p>
      <ul class="v-assure"><li>${f.stock === "in" ? `Some options in stock for next-day UK delivery, order by ${esc(val("delivery.nextDayCutoff"))} on a weekday` : `Made to order: dispatch time ${qt("to be confirmed", "Supplier build time for made-to-order iron sets")}`}</li></ul>
      ${f.custom ? `<p class="k-cust"><strong>Want a different length, lie or grip?</strong> ${L("Build them in the custom club builder", to("Custom clubs"))}</p>` : ""}
      <section class="v-why" aria-labelledby="v-wy"><h2 id="v-wy">Why buy them from Evolution Golf</h2>
        ${[["Help with your specs", `Not sure which shaft or flex? Call ${phone()}, ${esc(hours())}.`], ["Fitting in Ringwood", `${q("fitting.price")} fitting at our ${esc(val("fitting.location"))} centre.`], ["Returns", `${qt("Policy to be confirmed", "Owner to supply returns policy, including for made-to-order clubs")}.`], [esc(facts.pricePromise.short), `Found it cheaper elsewhere? We’ll look at matching it. ${L("How it works", to(facts.pricePromise.short))}`]].map(([t, b]) => `<details class="v-why__i"><summary>${t}</summary><p>${b}</p></details>`).join("")}
      </section>
    </section>
  </div>

  <section class="v-sec v-glance" aria-labelledby="v-gl"><h2 id="v-gl">At a glance</h2>
    <ul>${glance.map(([k, v]) => `<li><strong>${esc(k)}</strong><span>${esc(v)}</span></li>`).join("")}</ul></section>

  ${lead.intro ? html`<section class="v-sec v-about" aria-labelledby="v-ab"><div class="v-about__head"><h2 id="v-ab">About the ${esc(full)}</h2>
    <p class="v-about__src">Product description from ${esc(f.brand)}</p></div>
    <div class="v-about__body"><div class="v-prose">${lead.intro}</div>
    ${lead.more ? html`<details class="v-about__more"><summary><span class="v-about__open">Read the full description</span><span class="v-about__close">Show less</span></summary><div class="v-prose">${lead.more}</div></details>` : ""}</div>
  </section>` : ""}

  ${others.length ? html`<section class="v-sec v-band" aria-labelledby="k-mo"><h2 id="k-mo">More irons from ${esc(f.brand)}</h2>
    <ul class="v-grid v-grid--3 k-white">${others.map((o) => `<li class="v-card"><a href="${ironHref(o)}" class="v-card__link"><span class="v-card__img"><img src="${img(o.gallery[0], 400)}" alt="" width="400" height="400" loading="lazy"></span><span class="v-card__brand">${esc(o.brand)}</span><h3 class="v-card__name">${esc(o.name)}</h3><span class="v-card__price"><small>From</small> ${gbp(o.from)}</span><span class="v-card__stock">${stockWord[o.stock]}</span></a></li>`).join("")}</ul>
  </section>` : ""}

  <section class="v-sec v-band v-faq" aria-labelledby="v-fq"><h2 id="v-fq">Questions</h2>
    ${faq.map(([qq, a]) => `<details class="v-faq__i"><summary>${esc(qq)}</summary><div>${a}</div></details>`).join("")}</section>

  <section class="v-sec v-help v-close" aria-labelledby="v-qu"><h2 id="v-qu">Talk to a club specialist</h2>
    <p>Call ${phone()} or email ${email()}, ${esc(hours())}.</p></section>
</main>
<div class="v-sticky" role="region" aria-label="Quick add to basket" data-sticky><div><strong>${esc(f.name)} · <span data-s-battery>${esc(first.v.battery)}</span></strong><span data-s-line>${gbp(first.v.price)} · ${stockWord[first.v.stock]}</span></div><button type="button" class="p-btn" data-add>Add to basket</button></div>`);
};
