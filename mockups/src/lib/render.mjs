// Shared rendering helpers and design-system components for the static mockups.
// Every customer-facing fact is read from data/facts.json through fact()/text().
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
export const facts = JSON.parse(readFileSync(join(here, "../data/facts.json"), "utf8"));
export const catalogue = JSON.parse(readFileSync(join(here, "../data/catalogue.json"), "utf8"));

/* ---------- basics ---------- */
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
export const html = (strings, ...vals) => strings.reduce((out, s, i) => out + s + (i < vals.length ? (Array.isArray(vals[i]) ? vals[i].join("") : vals[i] ?? "") : ""), "");

export const gbp = (n, { pence = "auto" } = {}) => {
  const whole = Number.isInteger(n) || pence === false;
  return "£" + n.toLocaleString("en-GB", { minimumFractionDigits: whole && pence !== true ? 0 : 2, maximumFractionDigits: 2 });
};

/* ---------- facts ---------- */
const get = (path) => path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), facts);
const isTbc = (v) => v && typeof v === "object" && "value" in v;
/** raw value of a fact, unwrapping TBC objects */
export const val = (path) => { const v = get(path); return isTbc(v) ? v.value : v; };
/** a fact rendered for display: TBC facts get a visible marker and a title explaining the open decision */
export const fact = (path, { format = (x) => x, tag = true } = {}) => {
  const v = get(path);
  if (v === undefined) throw new Error(`Unknown fact: ${path}`);
  if (isTbc(v)) {
    return `<span class="tbc" title="${esc("To be confirmed: " + v.note)}">${esc(format(v.value))}</span>${tag ? '<span class="tbc-tag" aria-label="to be confirmed">TBC</span>' : ""}`;
  }
  return esc(format(v));
};
/** fill {fact.path} placeholders inside a template string */
export const fill = (tpl) => tpl.replace(/\{([\w.]+)\}/g, (_, p) => fact(p, { tag: false }));
export const tbcTag = '<span class="tbc-tag" aria-label="to be confirmed">TBC</span>';

/* ---------- icons (inline SVG, decorative unless labelled) ---------- */
const P = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  bag: '<path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/>',
  pin: '<path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  truck: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  chevronR: '<path d="m9 6 6 6-6 6"/>',
  chevronL: '<path d="m15 6-6 6 6 6"/>',
  chevronD: '<path d="m6 9 6 6 6-6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  shield: '<path d="M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.8 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8L3 12Z"/><circle cx="7.5" cy="8.5" r="1.5"/>',
  gift: '<rect x="3" y="8" width="18" height="4"/><path d="M5 12v9h14v-9M12 8v13M12 8S10.5 3 8 3.5 7 8 12 8ZM12 8s1.5-5 4-4.5S17 8 12 8Z"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
  camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
  star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z" fill="currentColor" stroke="none"/>',
  starOutline: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3Z"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.7.3-1 .9-1 1.7M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
  alert: '<path d="M12 3 2 20h20L12 3Z"/><path d="M12 10v4M12 17h.01"/>',
  // category glyphs
  golfbag: '<path d="M8 7h8l-1 14H9L8 7Z"/><path d="M10 7V3M12 7V2M14 7V4"/><path d="M8 11h8"/>',
  ball: '<circle cx="12" cy="12" r="8"/><circle cx="10" cy="9" r=".8" fill="currentColor"/><circle cx="13.5" cy="10" r=".8" fill="currentColor"/><circle cx="11" cy="13" r=".8" fill="currentColor"/><circle cx="14.5" cy="13.5" r=".8" fill="currentColor"/>',
  gps: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M12 8.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/><path d="M10 17h4"/>',
  tee: '<path d="M7 4h10l-3 4h-4L7 4Z"/><path d="M12 8v12"/>',
  club: '<path d="M14 3 9 18"/><path d="M9 18c-1 2-3 2.5-5 2.5h6.5L9 18Z"/>',
  swap: '<path d="M7 7h12l-3-3M17 17H5l3 3"/>',
  percent: '<path d="M19 5 5 19"/><circle cx="7" cy="7" r="2.2"/><circle cx="17" cy="17" r="2.2"/>',
  shirt: '<path d="M8 3 3 6l2 4 2-1v12h10V9l2 1 2-4-5-3c0 1.7-1.8 3-4 3S8 4.7 8 3Z"/>',
  trolley: '<circle cx="7" cy="19" r="2"/><circle cx="17" cy="19" r="2"/><path d="M7 17 13 5h3M9 13h8l-2 4"/>',
};
export const icon = (name, { label, cls = "" } = {}) =>
  `<svg class="ico ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" ${label ? `role="img" aria-label="${esc(label)}"` : 'aria-hidden="true" focusable="false"'}>${P[name]}</svg>`;

/* ---------- logo ---------- */
// Stand-in EG monogram until the supplied artwork is available (green on white / white on green).
export const monogram = ({ inverse = false } = {}) => {
  const bg = inverse ? "#ffffff" : "var(--green-800)";
  const fg = inverse ? "var(--green-900)" : "#ffffff";
  return `<svg class="logo__mark" viewBox="0 0 40 40" aria-hidden="true" focusable="false"><rect width="40" height="40" rx="9" fill="${bg}"/><text x="20" y="27.5" text-anchor="middle" font-family="Source Serif 4, Georgia, serif" font-size="19" font-weight="600" letter-spacing="-0.5" fill="${fg}">EG</text></svg>`;
};
export const logo = ({ inverse = false, href = "index.html" } = {}) =>
  `<a class="logo" href="${href}" aria-label="Evolution Golf home">${monogram({ inverse })}<span class="logo__word" aria-hidden="true">Evolution Golf<small>Ringwood · Hampshire</small></span></a>`;

/* ---------- small components ---------- */
export const img = (name, alt, { sizes = "(min-width:1100px) 25vw, 70vw", eager = false, w = 800 } = {}) =>
  `<img src="assets/img/products/${name}-${w}.webp" srcset="assets/img/products/${name}-400.webp 400w, assets/img/products/${name}-800.webp 800w" sizes="${sizes}" width="${w}" height="${w}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;

export const placeholderPhoto = (label, { tag = "Photo to come" } = {}) =>
  `<div class="ph-photo" role="img" aria-label="${esc("Placeholder: " + label)}"><div class="ph-photo__label">${icon("camera")}<span class="ph-photo__tag">${esc(tag)}</span><span>${esc(label)}</span></div></div>`;

export const stars = (rating) => {
  const full = Math.round(rating);
  return `<span class="rating__stars" aria-hidden="true">${Array.from({ length: 5 }, (_, i) => icon(i < full ? "star" : "starOutline")).join("")}</span>`;
};
/** product-level rating only; never store-level */
export const productRating = (rating, count) =>
  count > 0
    ? `<span class="rating">${stars(rating)}<span><span class="sr-only">Rated ${rating.toFixed(1)} out of 5 from </span>${rating.toFixed(1)} · ${count} ${count === 1 ? "review" : "reviews"}<span class="sr-only"> of this product</span></span></span>`
    : `<span class="rating"><span>No reviews of this model yet</span></span>`;

export const stockBadge = (state, detail = "") => {
  const map = { in: ["badge--in-stock", "In stock"], order: ["badge--order", "Available to order"], out: ["badge--out", "Out of stock"] };
  const [cls, label] = map[state];
  return `<span class="badge ${cls}">${label}${detail ? ` · ${esc(detail)}` : ""}</span>`;
};

/* Trolley family helpers (battery = variant) */
export const familyFrom = (f) => Math.min(...f.variants.map((v) => v.price));
export const familyStock = (f) => {
  const inStock = f.variants.filter((v) => v.stock > 0 && v.available);
  if (inStock.length) return { state: "in", detail: f.variants.length > 1 ? `${inStock.map((v) => v.battery).join(", ")} battery` : "" };
  if (f.variants.some((v) => v.available)) return { state: "order", detail: "" };
  return { state: "out", detail: "" };
};
export const familyRating = (f) => {
  const rated = f.variants.filter((v) => v.ratingCount > 0);
  const count = rated.reduce((n, v) => n + v.ratingCount, 0);
  const avg = count ? rated.reduce((s, v) => s + v.rating * v.ratingCount, 0) / count : 0;
  return { avg, count };
};
export const sortFamilies = (fams) => {
  const rank = { in: 0, order: 1, out: 2 };
  return [...fams].sort((a, b) => rank[familyStock(a).state] - rank[familyStock(b).state]); // stable: keeps merchandised order within each group
};

export const trolleyCard = (f) => {
  const s = familyStock(f);
  const r = familyRating(f);
  const batteries = f.variants.map((v) => `${v.battery} (${v.holes})`).join(" or ");
  return html`<article class="product-card" aria-labelledby="t-${f.id}">
    <div class="product-card__media">
      ${img(f.image, `${f.brand} ${f.name} electric golf trolley`)}
      ${f.year === 2026 ? '<div class="product-card__flags"><span class="badge badge--new">2026</span></div>' : ""}
    </div>
    <div class="product-card__body">
      <span class="product-card__brand">${esc(f.brand)}</span>
      <h3 class="product-card__title" id="t-${f.id}"><a href="${f.href}">${esc(f.name)}</a></h3>
      ${f.features.length ? `<div class="product-card__features">${f.features.map((x) => `<span class="badge badge--feature">${esc(x)}</span>`).join("")}</div>` : ""}
      <p class="product-card__battery">Battery: ${esc(batteries)}</p>
      <div class="product-card__foot">
        <p class="price">${f.variants.length > 1 ? '<span class="price__from">From</span>' : ""}<span class="price__now">${gbp(familyFrom(f))}</span></p>
        ${stockBadge(s.state, s.detail)}
        ${productRating(r.avg, r.count)}
      </div>
    </div>
  </article>`;
};

/* ---------- page chrome ---------- */
export const mockRibbon = (page) =>
  `<div class="mock-ribbon" role="note">Design mockup: <strong>${esc(page)}</strong>. Real product data from Shopify (read-only snapshot, 23 Nov 2026). Items marked <span class="tbc-tag">TBC</span> await an owner decision.</div>`;

export const utilityBar = () => html`<div class="utility on-dark">
  <div class="container utility__inner">
    <ul class="utility__list" aria-label="Why shop with us">
      <li class="utility__item utility__item--tp">${icon("star")}<span><a href="#reviews">Trustpilot ${fact("trustpilot.rating", { tag: false })}/5</a></span></li>
      <li class="utility__item">${icon("target")}<a href="custom-fitting.html">Free fitting in Ringwood: book</a></li>
      <li class="utility__item utility__item--desktop">${icon("truck")}<span>Free next-day delivery over ${gbp(val("delivery.nextDayFreeThreshold"))} · order by ${esc(val("delivery.nextDayCutoff"))}</span></li>
    </ul>
    <a class="utility__item utility__phone" href="tel:${val("business.phoneHref")}">${icon("phone")}<span class="utility__phone-label">Call&nbsp;</span>${esc(val("business.phoneDisplay"))}</a>
  </div>
</div>`;

const NAV = [
  { label: "Trolleys", href: "#", menu: true },
  { label: "Clubs", href: "#", menu: true },
  { label: "Custom Fitting", href: "#", cls: "nav__link--service" },
  { label: "Membership", href: "#", cls: "nav__link--service" },
  { label: "Bags", href: "#", menu: true },
  { label: "Balls, GPS & Accessories", href: "#", menu: true },
  { label: "Used & Trade-in", href: "#", menu: true },
  { label: "Sale", href: "#", cls: "nav__link--sale" },
];
export const navItems = NAV;

export const header = () => html`<header class="header">
  <div class="container">
    <div class="header__bar">
      <div class="header__start">
        <button class="icon-btn header__menu-btn" type="button" aria-label="Open menu" aria-expanded="false">${icon("menu")}</button>
      </div>
      <div class="header__logo">${logo()}</div>
      <form class="search header__search-desktop" role="search" action="search.html">
        <label class="sr-only" for="q-desktop">Search products, brands and guides</label>
        ${icon("search", { cls: "search__icon" })}
        <input class="search__input" id="q-desktop" type="search" name="q" placeholder="Search trolleys, clubs, brands…" autocomplete="off">
        <button class="icon-btn search__submit" type="submit" aria-label="Search">${icon("arrow")}</button>
      </form>
      <div class="header__end">
        <a class="icon-btn header__account" href="#" aria-label="Account and members’ area">${icon("user")}</a>
        <a class="icon-btn" href="#" aria-label="Basket, 0 items">${icon("bag")}</a>
      </div>
      <form class="search header__search" role="search" action="search.html">
        <label class="sr-only" for="q-mobile">Search products, brands and guides</label>
        ${icon("search", { cls: "search__icon" })}
        <input class="search__input" id="q-mobile" type="search" name="q" placeholder="Search trolleys, clubs, brands…" autocomplete="off">
      </form>
    </div>
  </div>
  <nav class="header__nav" aria-label="Main">
    <div class="container">
      <ul class="nav__list">
        ${NAV.map((n) => `<li><a class="nav__link ${n.cls ?? ""}" href="${n.href}"${n.menu ? ' aria-haspopup="true" aria-expanded="false"' : ""}>${esc(n.label)}${n.menu ? icon("chevronD") : ""}</a></li>`)}
        <li class="nav__item--more"><a class="nav__link" href="#" aria-haspopup="true" aria-expanded="false">More${icon("chevronD")}</a></li>
      </ul>
    </div>
  </nav>
</header>`;

export const mobileDrawer = () => html`<div class="drawer" role="dialog" aria-label="Menu (preview)">
  <div class="drawer__head">${logo()}<button class="icon-btn" type="button" aria-label="Close menu">${icon("close")}</button></div>
  <div class="drawer__services">
    <a class="drawer__service" href="#"><strong>Free fitting</strong><span>Book in Ringwood</span></a>
    <a class="drawer__service drawer__service--alt" href="#"><strong>${fact("membership.name", { tag: false })}</strong><span>Join free · member prices</span></a>
  </div>
  <ul class="drawer__list">
    ${NAV.filter((n) => !n.cls?.includes("service")).map((n) => `<li><a href="#">${esc(n.label)}${icon("chevronR")}</a></li>`)}
    <li class="is-secondary"><a href="#">Clothing &amp; shoes${icon("chevronR")}</a></li>
    <li class="is-secondary"><a href="#">Gifts${icon("chevronR")}</a></li>
    <li class="is-secondary"><a href="#">All brands${icon("chevronR")}</a></li>
    <li class="is-secondary"><a href="#">Help &amp; contact${icon("chevronR")}</a></li>
  </ul>
</div>`;

export const footer = () => html`<footer class="footer on-dark">
  <div class="container">
    <div class="footer__top">
      <div class="footer__brand">
        ${logo({ inverse: true })}
        <ul class="footer__contact">
          <li>${icon("pin")}<span>${fact("business.address")}</span></li>
          <li>${icon("clock")}<span>${facts.business.hours.map((h) => `${esc(h.days)}: ${typeof h.time === "string" ? esc(h.time) : fact("business.hours.1.time")}`).join("<br>")}</span></li>
          <li>${icon("phone")}<a href="tel:${val("business.phoneHref")}">${esc(val("business.phoneDisplay"))}</a></li>
          <li>${icon("mail")}<a href="mailto:${val("business.email")}">${esc(val("business.email"))}</a></li>
        </ul>
        <div class="footer__badges" aria-label="Authorised dealer badges">
          <span class="dealer-badge">Motocaddy dealer badge ${tbcTag}</span>
          <span class="dealer-badge">Brand badges ${tbcTag}</span>
        </div>
      </div>
      <div class="footer__cols">
        <div class="footer__col"><h2>Shop</h2><ul>
          <li><a href="#">Electric trolleys</a></li><li><a href="#">Golf clubs</a></li><li><a href="#">Build custom clubs</a></li>
          <li><a href="#">Bags</a></li><li><a href="#">Balls, GPS &amp; accessories</a></li><li><a href="#">Approved used</a></li><li><a href="#">Clothing &amp; shoes</a></li>
        </ul></div>
        <div class="footer__col"><h2>Help</h2><ul>
          <li><a href="#">Delivery &amp; returns</a></li><li><a href="#">Contact us</a></li><li><a href="#">Help &amp; FAQs</a></li>
          <li><a href="#">${esc(facts.pricePromise.short)}</a></li><li><a href="#">Paying with Klarna or Clearpay</a></li><li><a href="#">Trade in your clubs</a></li>
        </ul></div>
        <div class="footer__col"><h2>Evolution Golf</h2><ul>
          <li><a href="#">About us</a></li><li><a href="#">Custom fitting</a></li><li><a href="#">${fact("membership.name", { tag: false })}</a></li>
          <li><a href="#">Members’ portal</a></li><li><a href="#">Buying guides</a></li>
        </ul></div>
      </div>
      <form class="footer__news" action="#" onsubmit="return false">
        <h2 class="t-h3" style="color:#fff">Expert advice, not spam</h2>
        <p class="t-small" style="color:var(--green-100)">New-season launches, buying guides and fitting days. Monthly at most.</p>
        <div class="field">
          <label class="field__label" for="news-email">Email address</label>
          <div class="input-group"><input class="input" id="news-email" type="email" autocomplete="email" placeholder="you@example.com"><button class="btn btn--on-dark" type="submit">Sign up</button></div>
        </div>
        <label class="check"><input type="checkbox" name="consent"> <span>Yes, email me news and offers from Evolution Golf. You can unsubscribe at any time. <a href="#">Privacy policy</a></span></label>
      </form>
    </div>
    <div class="footer__bottom">
      <div>
        <p>© 2026 ${esc(val("business.companyName"))}, trading as ${esc(val("business.tradingName"))}. Company no. ${esc(val("business.companyNumber"))}. ${fact("business.vatNumber")}. All prices include VAT.</p>
        <ul class="footer__legal-links"><li><a href="#">Privacy</a></li><li><a href="#">Cookies</a></li><li><a href="#">Terms</a></li><li><a href="#">Refunds</a></li><li><a href="#">Accessibility</a></li></ul>
      </div>
      <ul class="pay-badges" aria-label="Payment methods we accept">
        ${["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay", "PayPal", "Shop Pay"].map((p) => `<li class="pay-badge">${p}</li>`)}
        ${["Klarna", "Clearpay"].map((p) => `<li class="pay-badge pay-badge--finance">${p}</li>`)}
      </ul>
    </div>
  </div>
</footer>`;

export const cookieBanner = ({ inline = false } = {}) => html`<section class="cookie ${inline ? "cookie--inline" : ""}" aria-label="Cookie preferences" ${inline ? "" : 'id="cookie"'}>
  <h2 class="t-h4">Cookies on Evolution Golf</h2>
  <p class="t-small t-muted">${esc(facts.cookies.text)} <a href="#">Cookie policy</a></p>
  <div class="cookie__actions">
    <button class="btn btn--primary" type="button" data-cookie="accept">Accept all</button>
    <button class="btn btn--secondary" type="button" data-cookie="reject">Reject non-essential</button>
    <button class="btn btn--text" type="button">Choose cookies</button>
  </div>
</section>`;

/* ---------- document shell ---------- */
export const page = ({ title, description, css = [], body, pageName }) => `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="preload" href="assets/fonts/source-serif-4-latin-opsz-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/tokens.css">
<link rel="stylesheet" href="assets/css/components.css">
<link rel="stylesheet" href="assets/css/layout.css">
${css.map((c) => `<link rel="stylesheet" href="assets/css/${c}.css">`).join("\n")}
</head>
<body>
<a class="skip-link" href="#main">Skip to main content</a>
${mockRibbon(pageName)}
${body}
<script>
// Mockup-only behaviour: dismiss cookie banner; hide it when ?consent=1 (used for clean screenshots).
(function(){var c=document.getElementById('cookie');if(!c)return;if(/consent=1/.test(location.search)){c.remove();return;}
c.addEventListener('click',function(e){if(e.target.closest('[data-cookie]'))c.remove();});})();
// Carousel buttons
document.querySelectorAll('[data-carousel]').forEach(function(root){var t=root.querySelector('.carousel__track');
root.querySelectorAll('[data-dir]').forEach(function(b){b.addEventListener('click',function(){t.scrollBy({left:(b.dataset.dir==='next'?1:-1)*t.clientWidth*0.9,behavior:'smooth'});});});});
</script>
</body>
</html>`;
