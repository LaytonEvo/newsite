// Showroom+ v2: custom club builder landing page (/custom-clubs/). It explains the builder and
// sends people into it at the right club type and hand. Facts come from the live builder and the
// Shopify custom-fit collections (catalogue.clubBuilder); open questions use the quiet marker.
import { html, esc, gbp, q, qt, val, catalogue, cut, phone, email, to } from "../concepts/kit.mjs";
import { L, ic } from "../concepts/showroomplus2.mjs";
import { page, crumbs } from "./pages.mjs";

const cb = catalogue.clubBuilder;
const lower = (s) => s.toLowerCase();
const builderHref = (type) => `${cb.url}${type ? `?type=${type.slug}` : ""}`;

const hero = () => {
  const from = Math.min(...cb.types.map((t) => t.from));
  const total = cb.types.reduce((n, t) => n + t.models, 0);
  return html`<header class="c-hero">
  <div class="c-hero__copy">
    <p class="p-kicker">Custom club builder</p>
    <h1>Clubs built to your specs, online.</h1>
    <p class="c-hero__sub">Choose the club, the brand and the model, then set it up your way. ${total} buildable models from ${cb.brands.slice(0, -1).join(", ")} and ${cb.brands.at(-1)}, built to order and delivered across the UK.</p>
    <p class="p-hero__cta c-hero__cta"><a class="p-btn p-btn--l" href="${builderHref()}" data-builder>Start building</a><span>from ${gbp(from)}</span></p>
    <ul class="p-trust c-trust" aria-label="About custom builds">
      <li><span class="p-trust__i" aria-hidden="true">L</span><span>Right- and left-handed</span></li>
      <li><span class="p-trust__i" aria-hidden="true">✓</span><span>Free custom fitting specs included</span></li>
      <li>${ic.truck}<span>Built to order in ${q("leadTimes.customBuild")}</span></li>
    </ul>
  </div>
  <div class="c-hero__art" aria-hidden="true">
    ${["wilson-staff-model-blade", "pxg-lightning-tour-driver", "mizuno-jpx925-forged"].map((n, i) => `<img class="c-hero__club c-hero__club--${i + 1}" src="${cut(n)}" alt="" width="800" height="800">`).join("")}
  </div>
</header>`;
};

const hand = () => html`<fieldset class="c-hand" data-hand>
  <legend>I play</legend>
  ${cb.hands.map((h, i) => `<label><input type="radio" name="hand" value="${i ? "left" : "right"}"${i ? "" : ' checked=""'}>${esc(h)}</label>`).join("")}
  <p class="c-hand__note" data-hand-note>${cb.leftHandedModels} left-handed models in the builder today.</p>
</fieldset>`;

const types = () => html`<section class="c-sec" aria-labelledby="c-ty">
  <div class="c-sec__head"><h2 id="c-ty">Start with a club type</h2>${hand()}</div>
  <ul class="c-types">${cb.types.map((t) => html`<li><a href="${builderHref(t)}" data-builder data-type="${t.slug}">
    <span class="c-types__img">${t.img ? `<img src="${cut(t.img, 400)}" alt="" width="400" height="400" loading="lazy">` : `<span class="c-types__blank" aria-hidden="true">${esc(t.name.split(" ")[0])}</span>`}</span>
    <strong>${esc(t.name)}</strong>
    <span class="c-types__line">${esc(t.line)}</span>
    <span class="c-types__meta">${t.models} models · from ${gbp(t.from)}</span>
    <span class="c-types__opts">You choose: ${esc(t.options.map(lower).join(", "))}</span>
    <span class="p-l" aria-hidden="true">Build ${esc(lower(t.name))}</span>
  </a></li>`)}</ul>
</section>`;

const steps = () => {
  const what = [
    "Drivers, fairway woods, hybrids and utility irons, or a set of irons.",
    `${cb.brands.join(", ")}.`,
    "Pick the head you want. Each model shows the options it can be built with.",
    "Set it up your way, then add it to your basket like anything else.",
  ];
  return html`<section class="c-sec c-how" aria-labelledby="c-hw"><h2 id="c-hw">How the builder works</h2>
  <ol class="c-steps">${cb.steps.map((s, i) => `<li><b aria-hidden="true">${i + 1}</b><div><h3>${esc(s)}</h3><p>${esc(what[i])}</p></div></li>`).join("")}</ol>
  <div class="c-set">
    <h3>What you can set</h3>
    <ul>
      <li><strong>Loft</strong><span>Drivers, woods and utility irons, e.g. 9°, 10.5° or 12°</span></li>
      <li><strong>Set make-up</strong><span>${esc(cb.setMakeUps.join(", "))}</span></li>
      <li><strong>Shaft</strong><span>Steel or graphite, from the shafts each model is offered with</span></li>
      <li><strong>Flex</strong><span>Ladies, Senior, Regular, Stiff or Extra Stiff, depending on the shaft</span></li>
      <li><strong>Lie, length and grip</strong><span>${qt("Adjustable in the builder", "Confirm which models allow lie, length and grip changes, and any extra cost")}</span></li>
    </ul>
  </div>
</section>`;
};

const featured = () => html`<section class="c-sec" aria-labelledby="c-ft">
  <div class="c-sec__head"><h2 id="c-ft">Popular builds</h2><p class="c-sec__sub">Real models in the builder now, with the options they can be built with.</p></div>
  <ul class="c-builds">${cb.featured.map((f) => html`<li class="c-build">
    <span class="c-build__img"><img src="${cut(f.img, 400)}" alt="" width="400" height="400" loading="lazy"></span>
    <span class="c-build__type">${esc(f.brand)} · ${esc(f.type)}</span>
    <h3>${esc(f.name)}</h3>
    <p class="c-build__specs">${esc(f.specs)}</p>
    <p class="c-build__price">From ${gbp(f.from)}</p>
    <a class="p-btn p-btn--s" href="${builderHref(cb.types.find((t) => t.name === f.type))}" data-builder data-type="${cb.types.find((t) => t.name === f.type).slug}">Build this<span class="sr"> ${esc(f.name)}</span></a>
  </li>`)}</ul>
  <p class="c-brands"><span>In the builder:</span> ${cb.brands.map((b) => `<span class="c-brand">${esc(b)}</span>`).join("")}</p>
</section>`;

const help = () => html`<section class="c-sec c-help" aria-labelledby="c-hp"><h2 id="c-hp">Not sure of your specs?</h2>
  <ul class="c-routes">
    <li><h3>Know your numbers?</h3><p>Choose your loft, shaft and flex in the builder, model by model.</p>${L("Start building", builderHref())}</li>
    <li><h3>Ask our team</h3><p>Tell us your height, current clubs and how you play, and we’ll suggest a build. ${phone()} · ${email()}</p>${L("Contact us")}</li>
    <li><h3>Prefer to be fitted in person?</h3><p>Free fitting at our Hampshire showroom, about ${q("fitting.durationMinutes")} minutes on a ${q("fitting.launchMonitor")}. Your specs go straight into the builder.</p>${L("Book a free fitting")}</li>
  </ul>
  <p class="c-member"><span class="v-promise__eg" aria-hidden="true">EG</span><span>Annual members: your monthly ${q("membership.memberDiscountPercent")}% off ${qt("works on custom builds", "Confirm the member discount applies to custom builds")}. ${L("See membership", to("Members"))}</span></p>
</section>`;

const faq = () => {
  const items = [
    ["How long does a custom build take?", `Custom builds take ${q("leadTimes.customBuild")} from order to dispatch.`],
    ["Can I return a custom build?", `${qt("Returns wording for custom builds to be confirmed", "Owner to confirm the returns policy for made-to-order clubs")}. Standard, off-the-shelf clubs are covered by our normal returns policy.`],
    ["Do I need a fitting first?", "No. You can build with standard specs, use specs from a previous fitting, or ask our team. A free fitting is there if you want one."],
    ["Can I build left-handed?", `Yes. ${cb.leftHandedModels} models in the builder come in left-handed, across drivers, fairway woods and irons. Choose “Left-handed” before you pick a model.`],
  ];
  return html`<section class="c-sec c-faq" aria-labelledby="c-fq"><h2 id="c-fq">Questions</h2>
  ${items.map(([qq, a], i) => `<details${i === 0 ? " open" : ""}><summary>${esc(qq)}</summary><p>${a}</p></details>`).join("")}
</section>`;
};

export const customClubs = () => page("Custom golf clubs built online | Evolution Golf", html`<main id="v-main" class="v c">
  ${crumbs([["Home", to("Home")], ["Custom clubs", "#"]])}
  ${hero()}
  ${types()}
  ${steps()}
  ${featured()}
  ${help()}
  ${faq()}
</main>`);
