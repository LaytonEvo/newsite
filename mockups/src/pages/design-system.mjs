// Design system reference page: every component used in the mockups.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  html, esc, icon, logo, monogram, placeholderPhoto, trolleyCard, catalogue, stockBadge, productRating,
  cookieBanner, mobileDrawer, page, tbcTag, gbp,
} from "../lib/render.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const tokensCss = readFileSync(join(here, "../../assets/css/tokens.css"), "utf8");
const token = (name) => tokensCss.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`))[1];

// WCAG contrast
const lum = (hex) => { const c = hex.slice(1).match(/../g).map((h) => parseInt(h, 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

const swatches = [
  ["green-800", "Primary: buttons, links, logo"], ["green-700", "Primary hover"], ["green-900", "Footer, dark bands"], ["green-950", "Deepest green"],
  ["green-600", "Icons on dark"], ["green-200", "Labels on dark"], ["green-100", "Focus halo, dividers on dark"], ["green-50", "Tinted panels"],
  ["accent-700", "Sale and alert only"], ["accent-50", "Alert background"],
  ["ink-900", "Body text"], ["ink-700", "Secondary text"], ["ink-600", "Meta text (min. size 13px)"], ["line-strong", "Input borders"], ["line", "Card borders"], ["surface-2", "Quiet panels"],
];

const swatch = ([name, use]) => {
  const hex = token(name);
  const onWhite = ratio(hex, "#ffffff");
  const textCol = lum(hex) > 0.4 ? "#111816" : "#ffffff";
  const pass = (r) => (r >= 7 ? "AAA" : r >= 4.5 ? "AA" : r >= 3 ? "AA large / UI" : "decorative only");
  return html`<li class="ds-swatch"><div class="ds-swatch__chip" style="background:${hex};color:${textCol}">${esc(hex.toUpperCase())}</div>
    <div class="ds-swatch__meta"><strong>--${esc(name)}</strong><span>${esc(use)}</span><span>${onWhite.toFixed(1)}:1 on white · ${pass(onWhite)}</span></div></li>`;
};

const section = (id, title, intro, content) => html`<section class="ds-section" id="${id}" aria-labelledby="${id}-h">
  <div class="ds-section__head"><h2 class="t-h2" id="${id}-h">${esc(title)}</h2>${intro ? `<p class="t-muted">${intro}</p>` : ""}</div>
  ${content}
</section>`;

const css = `
.ds-hero { padding-block: var(--space-7) var(--space-5); border-bottom: 1px solid var(--line); }
.ds-hero > * + * { margin-top: var(--space-3); }
.ds-toc { display:flex; flex-wrap:wrap; gap: var(--space-2); list-style:none; margin-top: var(--space-5) !important; }
.ds-section { padding-block: var(--space-7); border-bottom: 1px solid var(--line); }
.ds-section__head { margin-bottom: var(--space-5); max-width: 46rem; }
.ds-section__head > * + * { margin-top: var(--space-2); }
.ds-sub { margin: var(--space-6) 0 var(--space-3); font-size: var(--fs-caption); font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--ink-600); }
.ds-grid { display:grid; gap: var(--space-4); align-items: start; }
@media (min-width: 768px){ .ds-grid--2{grid-template-columns:1fr 1fr} .ds-grid--3{grid-template-columns:repeat(3,1fr)} .ds-grid--4{grid-template-columns:repeat(4,1fr)} }
.ds-swatches { display:grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-3); list-style:none; }
@media (min-width: 768px){ .ds-swatches{ grid-template-columns: repeat(4, 1fr);} }
.ds-swatch { border:1px solid var(--line); border-radius: var(--radius-md); overflow:hidden; }
.ds-swatch__chip { height: 72px; display:flex; align-items:flex-end; padding: var(--space-2) var(--space-3); font-size: 12px; font-weight: 600; font-variant-numeric: tabular-nums; }
.ds-swatch__meta { display:grid; gap: 2px; padding: var(--space-3); font-size: 12.5px; line-height:1.4; color: var(--ink-700); }
.ds-swatch__meta strong { color: var(--ink-900); font-size: 13px; }
.ds-type { display:grid; gap: var(--space-4); }
.ds-type__row { display:grid; gap: var(--space-1); padding-bottom: var(--space-4); border-bottom: 1px dashed var(--line); }
.ds-type__spec { font-size: 12px; color: var(--ink-600); font-family: ui-monospace, Menlo, monospace; }
.ds-space { display:grid; gap: var(--space-2); list-style:none; }
.ds-space li { display:grid; grid-template-columns: 8.5rem minmax(0,1fr); align-items:center; gap: var(--space-3); font-size: 13px; font-family: ui-monospace, Menlo, monospace; color: var(--ink-700); }
.ds-space i { display:block; max-width:100%; height: 14px; background: var(--green-800); border-radius: 2px; }
.ds-panel { padding: var(--space-5); border:1px solid var(--line); border-radius: var(--radius-md); }
.ds-panel--dark { background: var(--green-900); color:#fff; border-color: transparent; }
.ds-row { display:flex; flex-wrap:wrap; gap: var(--space-3); align-items:center; }
.ds-icons { display:flex; flex-wrap:wrap; gap: var(--space-4); list-style:none; color: var(--ink-900); }
.ds-icons li { display:grid; justify-items:center; gap: 4px; width: 64px; font-size: 11px; color: var(--ink-600); }
.ds-icons svg { width: 24px; height: 24px; color: var(--ink-900); }
.ds-note { font-size: var(--fs-caption); color: var(--ink-600); margin-top: var(--space-3); }
.ds-modal-stage { padding: var(--space-5); border-radius: var(--radius-lg); background: rgba(6,42,28,0.55); }
`;

export default () => page({
  title: "Design system | Evolution Golf mockups",
  description: "Evolution Golf design system: colour, type, spacing and components.",
  pageName: "Design system",
  body: html`<style>${css}</style>
<main id="main" class="container">
  <header class="ds-hero">
    <p class="eyebrow">Evolution Golf · Design system v0.1</p>
    <h1 class="t-h1">One system for every screen</h1>
    <p class="t-lead">Colour tokens, type scale, spacing, and the components the homepage and every later page are built from. Mobile first; tap targets 44px minimum; contrast checked against WCAG 2.2 AA.</p>
    <ul class="ds-toc">${["Logo", "Colour", "Type", "Spacing", "Buttons", "Badges", "Price & rating", "Cards", "Photography", "Banners", "Notices", "Forms", "Modal", "Cookie banner", "Navigation", "Icons"].map((t) => `<li><a class="chip" href="#${t.toLowerCase().replace(/[^a-z]+/g, "-")}">${t}</a></li>`)}</ul>
  </header>

  ${section("logo", "Logo", `The EG monogram in green on white, or white on green. ${tbcTag} This is a stand-in drawn in the headline serif; swap in the supplied monogram artwork.`, html`
    <div class="ds-grid ds-grid--2">
      <div class="ds-panel">${logo()}<div class="ds-row" style="margin-top:var(--space-4)">${monogram().replace('class="logo__mark"', 'class="logo__mark" style="width:64px;height:64px"')}</div></div>
      <div class="ds-panel ds-panel--dark on-dark">${logo({ inverse: true })}<div class="ds-row" style="margin-top:var(--space-4)">${monogram({ inverse: true }).replace('class="logo__mark"', 'class="logo__mark" style="width:64px;height:64px"')}</div></div>
    </div>`)}

  ${section("colour", "Colour", "White backgrounds. Brand green is the primary colour; one accent (red) is reserved for sale prices and alerts. Neutrals are cool greys: no cream or beige anywhere.", `<ul class="ds-swatches">${swatches.map(swatch).join("")}</ul>`)}

  ${section("type", "Type", "Headlines: Source Serif 4 (variable, optical sizing). Body and UI: Inter (variable). Both self-hosted, Open Font License. Sizes are fluid between 390px and 1440px.", html`
    <div class="ds-type">
      <div class="ds-type__row"><span class="ds-type__spec">Display · serif 600 · 36→60px · line-height 1.1</span><span class="t-display">Free fitting in Ringwood</span></div>
      <div class="ds-type__row"><span class="ds-type__spec">H1 · serif 600 · 32→48px</span><span class="t-h1">The 2026 Motocaddy range</span></div>
      <div class="ds-type__row"><span class="ds-type__spec">H2 · serif 600 · 26→38px</span><span class="t-h2">Shop clubs by brand</span></div>
      <div class="ds-type__row"><span class="ds-type__spec">H3 · serif 600 · 20→24px</span><span class="t-h3">Custom or standard?</span></div>
      <div class="ds-type__row"><span class="ds-type__spec">H4 · sans 600 · 18px</span><span class="t-h4">Worked example</span></div>
      <div class="ds-type__row"><span class="ds-type__spec">Lead · sans 400 · 18px · ink-700</span><span class="t-lead">Clubs that suit your swing, not an average one.</span></div>
      <div class="ds-type__row"><span class="ds-type__spec">Body · sans 400 · 16px · line-height 1.6</span><span>Every model comes with a choice of battery. We set each trolley up before it leaves us.</span></div>
      <div class="ds-type__row"><span class="ds-type__spec">Small · 14px</span><span class="t-small">Free next-day delivery over £500 when you order by 1pm.</span></div>
      <div class="ds-type__row"><span class="ds-type__spec">Caption · 13px (smallest size allowed)</span><span class="t-caption">Prices include VAT.</span></div>
      <div class="ds-type__row"><span class="ds-type__spec">Eyebrow · sans 600 · 13px · tracked caps</span><span class="eyebrow">Custom fitting</span></div>
    </div>`)}

  ${section("spacing", "Spacing", "4px base. Sections use a fluid gap (48→96px). Side gutter: 16px on phones, 32px tablet, 48px desktop; content max 1280px.", `<ul class="ds-space">${[["space-1", 4], ["space-2", 8], ["space-3", 12], ["space-4", 16], ["space-5", 24], ["space-6", 32], ["space-7", 48], ["space-8", 64], ["space-9", 96]].map(([n, px]) => `<li><span>--${n} · ${px}px</span><i style="width:${px * 3}px"></i></li>`).join("")}</ul>`)}

  ${section("buttons", "Buttons", "Primary, secondary and text. Minimum height 44px (52px for large). One primary action per view where possible.", html`
    <div class="ds-grid ds-grid--2">
      <div class="ds-panel"><p class="ds-sub" style="margin-top:0">On white</p><div class="ds-row">
        <button class="btn btn--primary" type="button">Add to basket</button>
        <button class="btn btn--secondary" type="button">Book a free fitting</button>
        <button class="btn btn--text" type="button">Compare trolleys</button>
        <button class="btn btn--primary" type="button" disabled>Out of stock</button>
      </div><div class="ds-row" style="margin-top:var(--space-3)"><button class="btn btn--primary btn--lg" type="button">Shop Motocaddy</button><a class="link-arrow" href="#">Link with arrow${icon("arrow")}</a></div></div>
      <div class="ds-panel ds-panel--dark on-dark"><p class="ds-sub" style="margin-top:0;color:var(--green-200)">On green</p><div class="ds-row">
        <button class="btn btn--on-dark" type="button">Book a free fitting</button>
        <button class="btn btn--outline-on-dark" type="button">How fitting works</button>
      </div></div>
    </div>`)}

  ${section("badges", "Badges", `Stock states are always words, never colour alone. "Available to order" is kept separate from "In stock" so the in-stock filter stays truthful (order-on-demand lines currently show as available at zero stock). The TBC marker flags any fact still awaiting an owner decision.`, html`
    <div class="ds-row">${stockBadge("in")}${stockBadge("in", "Ultra battery")}${stockBadge("order")}${stockBadge("out")}
      <span class="badge badge--new">2026</span><span class="badge badge--sale">Sale</span><span class="badge badge--member">Member price</span><span class="badge badge--feature">GPS</span><span class="badge badge--feature">Downhill control</span>
      <span><span class="tbc">Fact awaiting decision</span>${tbcTag}</span></div>`)}

  ${section("price-rating", "Price & rating", "Prices include VAT. The member price sits next to the standard price, never instead of it. Star ratings are product-level only (Judge.me per product); store-level Trustpilot scores never appear next to a product title.", html`
    <div class="ds-grid ds-grid--3">
      <div class="ds-panel"><p class="price"><span class="price__now">${gbp(969)}</span><span class="price__member">Members ${gbp(872.10, { pence: true })} ${tbcTag}</span></p></div>
      <div class="ds-panel"><p class="price"><span class="price__now price__sale">${gbp(249)}</span><span class="price__from" style="text-decoration:line-through">${gbp(449)}</span><span class="badge badge--sale">Sale</span></p><p class="ds-note">Sale styling only if the discount policy allows public reductions ${tbcTag}</p></div>
      <div class="ds-panel">${productRating(4.73, 11)}<br>${productRating(0, 0)}</div>
    </div>`)}

  ${section("cards", "Cards", "Product card (trolley family, battery as a variant), plain card, tinted card. Whole card is clickable via the title link; focus ring wraps the card.", html`
    <div class="ds-grid ds-grid--4">
      ${trolleyCard(catalogue.trolleyFamilies[0])}
      ${trolleyCard(catalogue.trolleyFamilies[4])}
      <div class="card"><div class="card__body"><h3 class="t-h3">Plain card</h3><p class="t-small t-muted">White, 1px border, 8px radius. For guides, tiers and info.</p></div></div>
      <div class="card card--tinted"><div class="card__body"><h3 class="t-h3">Tinted card</h3><p class="t-small t-muted">Green-50 panel for membership and helpful asides.</p></div></div>
    </div>`)}

  ${section("photography", "Photography", "Product shots: real Shopify images on white, without baked-in text (several current main images carry a FREE GIFT roundel, so the mockups use the clean gallery shots). Lifestyle: placeholders until the Ringwood centre, fitters and trolleys-on-course are shot. No AI-generated people.", html`
    <div class="ds-grid ds-grid--3">
      <div class="card" style="aspect-ratio:1"><img src="assets/img/products/m7-gps-remote-800.webp" alt="Motocaddy M7 GPS Remote on white" style="width:100%;height:100%;object-fit:contain;padding:16px"></div>
      <div class="card" style="aspect-ratio:1">${placeholderPhoto("Ringwood centre exterior with signage")}</div>
      <div class="card" style="aspect-ratio:1">${placeholderPhoto("Motocaddy trolley on a local course, golfer from behind")}</div>
    </div>`)}

  ${section("banners", "Banners", "Live HTML text over an image with a gradient scrim for contrast. Text is never baked into the image, so it stays readable, translatable and accessible.", html`
    <div class="banner"><div class="banner__media">${placeholderPhoto("Wide lifestyle image: fitting bay or course")}</div>
      <div class="banner__content"><p class="eyebrow" style="color:var(--green-100)">Banner component</p><h3 class="t-h2">Spring fitting days in Ringwood</h3><p>Live text sits on a dark scrim so it passes contrast on any photo.</p><a class="btn btn--on-dark" href="#">Book a slot</a></div></div>`)}

  ${section("notices", "Notices", "Informational (green) and alert (accent). Used sparingly: no stacked promo strips.", html`
    <div class="ds-grid ds-grid--2">
      <div class="notice notice--info">${icon("truck")}<span>Order by 1pm for free next-day delivery on orders over £500.</span></div>
      <div class="notice notice--alert" role="alert">${icon("alert")}<span>Only 1 left in stock. Order soon or reserve for collection in Ringwood.</span></div>
    </div>`)}

  ${section("forms", "Form fields", "Visible labels on every field, hints below labels, errors in text and colour, 44px minimum height. Marketing consent is unticked by default.", html`
    <div class="ds-grid ds-grid--3">
      <div class="field"><label class="field__label" for="ds-name">Full name</label><input class="input" id="ds-name" autocomplete="name" placeholder="e.g. Sam Taylor"></div>
      <div class="field"><label class="field__label" for="ds-hcp">Handicap</label><span class="field__hint" id="ds-hcp-hint">Rough is fine. Leave blank if you don’t have one.</span><select class="select" id="ds-hcp" aria-describedby="ds-hcp-hint"><option>Choose…</option><option>0–9</option><option>10–18</option><option>19–28</option><option>29+</option></select></div>
      <div class="field"><label class="field__label" for="ds-email">Email</label><input class="input" id="ds-email" type="email" value="sam@" aria-invalid="true" aria-describedby="ds-email-err"><span class="field__error" id="ds-email-err">${icon("alert")}Enter an email address like name@example.com</span></div>
    </div>
    <label class="check" style="margin-top:var(--space-4)"><input type="checkbox"> <span>Yes, email me news and offers. You can unsubscribe at any time.</span></label>`)}

  ${section("modal", "Modal", "Bottom sheet on phones, centred dialog from 768px. Focus is trapped inside, Escape closes, focus returns to the trigger.", html`
    <div class="ds-modal-stage"><div class="modal modal--inline" role="dialog" aria-modal="false" aria-labelledby="ds-modal-t" style="margin-inline:auto">
      <div class="modal__head"><h3 class="t-h4" id="ds-modal-t">Choose your free accessory ${tbcTag}</h3><button class="icon-btn" type="button" aria-label="Close">${icon("close")}</button></div>
      <div class="modal__body"><p class="t-small t-muted">Pick one gift to go with your Motocaddy M5 GPS DHC. Gift options come from the free-gift app and are confirmed at checkout.</p>
        <label class="check"><input type="radio" name="gift"> <span><strong>Option A</strong> (list to be supplied)</span></label>
        <label class="check"><input type="radio" name="gift"> <span><strong>Option B</strong> (list to be supplied)</span></label></div>
      <div class="modal__foot"><button class="btn btn--secondary" type="button">Cancel</button><button class="btn btn--primary" type="button">Confirm gift</button></div>
    </div></div>`)}

  ${section("cookie-banner", "Cookie banner", "UK GDPR / PECR: shown on first visit, Accept and Reject given equal weight, nothing non-essential runs until a choice is made. Fixed position, so it never shifts the layout.", cookieBanner({ inline: true }))}

  ${section("navigation", "Navigation", "Desktop: eight primary items plus More (Clothing & shoes, Gifts, All brands). Mobile: the two services sit as large cards above the category list.", html`
    <div class="ds-grid ds-grid--2">${mobileDrawer()}<div class="ds-panel"><p class="t-small"><strong>Primary:</strong> Trolleys · Clubs · Custom Fitting · Membership · Bags · Balls, GPS &amp; Accessories · Used &amp; Trade-in · Sale</p><p class="t-small" style="margin-top:var(--space-3)"><strong>More:</strong> Clothing &amp; shoes · Gifts · All brands</p><p class="t-small" style="margin-top:var(--space-3)"><strong>Utility bar:</strong> Trustpilot rating · Free fitting in Ringwood (book) · delivery promise (desktop) · phone</p><p class="t-small" style="margin-top:var(--space-3)"><strong>Search:</strong> single field, no category dropdown; visible on mobile without a tap.</p></div></div>`)}

  ${section("icons", "Icons", "One 24px line set, 1.75 stroke, decorative unless labelled.", `<ul class="ds-icons">${["search", "bag", "user", "menu", "close", "phone", "pin", "clock", "truck", "check", "arrow", "gift", "target", "shield", "tag", "star", "help", "info", "alert", "golfbag", "ball", "gps", "tee", "club", "swap", "percent", "shirt", "trolley"].map((n) => `<li>${icon(n)}<span>${n}</span></li>`).join("")}</ul>`)}
</main>`,
});
