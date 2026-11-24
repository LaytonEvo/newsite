// Showroom+ v2: membership page (/membership/). Explains Free and Annual, lets people test the
// Annual maths on their own order, and answers questions only from facts we hold. Owner-pending
// facts keep the quiet dotted marker; nothing here is invented.
import { html, esc, gbp, q, qt, val, facts, saving, tiers, perk, fam, spec, to } from "../concepts/kit.mjs";
import { L, memberCard } from "../concepts/showroomplus2.mjs";
import { page, crumbs } from "./pages.mjs";

const m = facts.membership;
const annual = tiers.find((t) => t.price), free = tiers.find((t) => !t.price);
const pct = () => val("membership.memberDiscountPercent");
const pence = (n) => Math.round(n * 100) / 100;
const loginUrl = m.area.url;

const hero = () => html`<header class="m-hero">
  <div class="m-hero__copy">
    <p class="p-kicker">${q("membership.name")}</p>
    <h1>A members’ club that pays for itself.</h1>
    <p class="m-hero__sub">${esc(m.oneLiner)}</p>
    <p class="m-hero__cta"><a class="p-btn" href="#join">Join ${esc(annual.name)} for ${gbp(annual.price)}</a><a class="p-btn m-ghost" href="#join">Join free</a></p>
    <p class="m-hero__log">Already a member? <a href="${loginUrl}">Log in to the members’ area</a></p>
  </div>
  <div class="m-hero__card">${memberCard()}</div>
</header>`;

const calc = () => {
  const s = saving();
  return html`<section class="m-sec m-calc" aria-labelledby="m-ct">
  <div class="m-calc__copy">
    <h2 id="m-ct">Will ${esc(annual.name)} pay for itself?</h2>
    <p>Move the slider to your next order. ${esc(annual.name)} costs ${gbp(s.fee)} a year and takes ${q("membership.memberDiscountPercent")}% off one order every month, so any order over ${gbp(Math.ceil((s.fee * 100) / pct()))} covers the fee on its own.</p>
    <p class="p-mem3__big m-calc__big" data-calc-big aria-hidden="true">${gbp(s.net, { pence: true })}</p>
    <p class="p-mem3__cap" data-calc-cap aria-hidden="true">better off on a ${gbp(s.price)} order, after the ${gbp(s.fee)} fee.</p>
  </div>
  <div class="p-calc m-calc__box" data-calc data-pct="${pct()}" data-fee="${s.fee}">
    <div class="p-calc__top"><label for="p-calc-r">How much is your next order?</label><output for="p-calc-r" data-calc-out>${gbp(s.price)}</output></div>
    <input type="range" id="p-calc-r" min="50" max="2000" step="1" value="${s.price}" aria-valuetext="${gbp(s.price)}" data-calc-range>
    <dl aria-live="polite">
      <div><dt>${q("membership.memberDiscountPercent")}% off this order</dt><dd data-calc-off>−${gbp(s.off, { pence: true })}</dd></div>
      <div><dt>${esc(annual.name)} membership</dt><dd>+${gbp(s.fee, { pence: true })}</dd></div>
      <div class="p-calc__t"><dt data-calc-tl>You’re better off by</dt><dd data-calc-net>${gbp(s.net, { pence: true })}</dd></div>
    </dl>
    <p class="p-calc__note" data-calc-note>That’s on this order alone. ${esc(annual.name)} members get ${pct()}% off one order every month. ${gbp(s.price)} is a ${esc(s.product)}.</p>
  </div>
</section>`;
};

/** Real trolleys at their lowest current price: what the monthly discount is worth on each */
const examples = () => {
  const ids = ["se", "m1", "m5-gps-dhc"];
  const fee = annual.price;
  return html`<section class="m-sec" aria-labelledby="m-ex"><h2 id="m-ex">What ${q("membership.memberDiscountPercent")}% off is worth on a trolley</h2>
  <ul class="m-ex">${ids.map((id) => { const f = fam(id); const p = spec(f).price; const off = pence((p * pct()) / 100); const net = pence(off - fee);
    return `<li><a href="${f.href}"><span class="m-ex__name">${esc(f.brand)} ${esc(f.name)}</span><span class="m-ex__price">${gbp(p)}</span><span class="m-ex__row"><span>${pct()}% off</span><strong>−${gbp(off, { pence: true })}</strong></span><span class="m-ex__row"><span>After the ${gbp(fee)} fee</span><strong class="${net > 0 ? "is-up" : ""}">${net > 0 ? `${gbp(net, { pence: true })} better off` : `${gbp(-net, { pence: true })} short`}</strong></span></a></li>`; }).join("")}</ul>
  <p class="m-note">Prices from the store today. The discount applies to one order a month, so a second big order in another month saves again.</p>
</section>`;
};

const ROWS = [
  ["Members’ area", "Yes", "Yes"],
  ["Members’-area deals", "5% off", "15% off"],
  ["Monthly discount", null, () => `${q("membership.memberDiscountPercent")}% off your first order, then one order a month`],
  ["Loyalty points", "1×", "1.25×"],
  ["Free delivery", () => `Over ${q("delivery.freeMemberThreshold", (v) => "£" + v)}`, () => `Over ${q("delivery.annualMemberThreshold", (v) => "£" + v)}`],
  ["Returns", null, () => q("returns.summary")],
  ["Early access to new products", null, "48 hours"],
  ["Monthly prize draw", null, () => qt("Entry each month", "Prize draw terms and free entry route to be confirmed")],
  ["Trade-in bonus", null, "+5% after 60 days"],
];
const cell = (v) => (v == null ? `<span aria-hidden="true">–</span><span class="sr">Not included</span>` : typeof v === "function" ? v() : esc(v));

const compare = () => html`<section class="m-sec m-cmp" id="join" aria-labelledby="m-cm"><h2 id="m-cm">Free or ${esc(annual.name)}</h2>
  <div class="m-cmp__wrap">
    <table class="m-tbl">
      <caption class="sr">What ${esc(free.name)} and ${esc(annual.name)} membership include</caption>
      <thead><tr><td></td>
        <th scope="col">${esc(free.name)}<span>${esc(free.priceLabel)}</span></th>
        <th scope="col" class="is-pick">${esc(annual.name)}<span>${esc(annual.priceLabel)} a year</span></th></tr></thead>
      <tbody>${ROWS.map(([k, a, b]) => `<tr><th scope="row">${esc(k)}</th><td>${cell(a)}</td><td class="is-pick">${cell(b)}</td></tr>`).join("")}</tbody>
      <tfoot><tr><td></td><td><a class="p-btn m-ghost m-ghost--dark" href="#">Join free</a></td><td class="is-pick"><a class="p-btn" href="#">Join for ${gbp(annual.price)}</a></td></tr></tfoot>
    </table>
  </div>
</section>`;

const how = () => html`<section class="m-sec" aria-labelledby="m-hw"><h2 id="m-hw">How the monthly discount works</h2>
  <ol class="m-steps">
    <li><strong>Join ${esc(annual.name)}</strong><span>${gbp(annual.price)} for the year.</span></li>
    <li><strong>Your first order</strong><span>${q("membership.memberDiscountPercent")}% off it straight away.</span></li>
    <li><strong>Then one order every month</strong><span>Your ${pct()}% applies to one order in each month of your membership.</span></li>
    <li><strong>Plus the members’ area</strong><span>15% off members’-area deals and 1.25× loyalty points all year.</span></li>
  </ol>
</section>`;

const area = () => html`<section class="m-sec m-band" aria-labelledby="m-ar"><h2 id="m-ar">Inside the members’ area</h2>
  <ul class="m-area">${m.area.features.map(([t, d]) => `<li><strong>${esc(t)}</strong><span>${esc(d)}</span></li>`).join("")}</ul>
  <p>${L("Log in to the members’ area", loginUrl)}</p>
</section>`;

const faq = () => {
  const be = Math.ceil((annual.price * 100) / pct());
  const items = [
    [`Is ${annual.name} worth it?`, `<p>On a single order of ${gbp(be)} or more, the ${pct()}% off covers the ${gbp(annual.price)} fee. Smaller orders across the year can add up to the same, since the discount comes round every month.</p>`],
    ["What do I get for free?", `<p>${free.perks.map((p) => perk(p.text)).join(", ")}.</p>`],
    ["Does the discount work on custom clubs?", `<p>${qt("To be confirmed", "Owner to confirm whether the monthly member discount applies to custom builds")}.</p>`],
    ["How do I use my membership?", `<p>Log in at <a href="${loginUrl}">the members’ area</a> to see deals, points and your monthly discount.</p>`],
  ];
  return html`<section class="m-sec m-band m-faq" aria-labelledby="m-fq"><h2 id="m-fq">Questions</h2>
    ${items.map(([qq, a]) => `<details class="v-faq__i"><summary>${esc(qq)}</summary><div>${a}</div></details>`).join("")}
  </section>`;
};

const close = () => html`<section class="m-close" aria-labelledby="m-cl">
  <h2 id="m-cl">Start with Free, or go ${esc(annual.name)} for ${gbp(annual.price)}.</h2>
  <p class="m-hero__cta"><a class="p-btn" href="#join">Join ${esc(annual.name)} for ${gbp(annual.price)}</a><a class="p-btn m-ghost" href="#join">Join free</a></p>
</section>`;

export const membership = () => page(`Membership: Free or Annual | Evolution Golf`, html`<main id="v-main" class="v m">
  ${crumbs([["Home", to("Home")], ["Membership", "#"]])}
  ${hero()}
  ${calc()}
  ${examples()}
  ${compare()}
  ${how()}
  ${area()}
  ${faq()}
  ${close()}
</main>`);
