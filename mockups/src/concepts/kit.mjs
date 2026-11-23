// Shared data + helpers for the four homepage concepts.
// Visuals live entirely in each concept; this file only supplies content, so the
// concepts compare fairly: same facts (data/facts.json), same products (data/catalogue.json).
import {
  facts, catalogue, val, esc, html, gbp, familyFrom, familyStock, familyRating, sortFamilies,
} from "../lib/render.mjs";

export { facts, catalogue, val, esc, html, gbp, familyFrom, familyStock, familyRating, sortFamilies };

const get = (path) => path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), facts);
const isTbc = (v) => v && typeof v === "object" && "value" in v;

/** A fact for display. Facts awaiting an owner decision get ONE quiet treatment in every
 *  concept: a dotted underline (class "q") with the open question in a tooltip. */
export const q = (path, format = (x) => x) => {
  const v = get(path);
  if (v === undefined) throw new Error(`Unknown fact: ${path}`);
  return isTbc(v)
    ? `<span class="q" title="${esc("To be confirmed: " + v.note)}">${esc(format(v.value))}</span>`
    : esc(format(v));
};
/** Free-text placeholder (a name, a byline) with the same quiet treatment. */
export const qt = (text, note) => `<span class="q" title="${esc("To be confirmed: " + note)}">${esc(text)}</span>`;

/* ---------- products ---------- */
export const cut = (name, w = 800) => `assets/img/cutouts/${name}-${w}.webp`;
export const photo = (name, w = 800) => `assets/img/products/${name}-${w}.webp`;

const famById = Object.fromEntries(catalogue.trolleyFamilies.map((f) => [f.id, f]));
export const fam = (id) => famById[id];
export const families = () => sortFamilies(catalogue.trolleyFamilies);
export const flagship = () => famById["m5-gps-dhc"];

/** derived specs (from titles/tags in the Shopify snapshot) */
export const spec = (f) => ({
  gps: f.features.includes("GPS"),
  dhc: f.features.includes("Downhill control"),
  remote: f.features.includes("Remote"),
  batteries: f.variants.map((v) => ({ name: v.battery, holes: v.holes })),
  from: familyFrom(f),
  stock: familyStock(f),
  rating: familyRating(f),
});
export const stockWord = (s) => ({ in: "In stock", order: "Available to order", out: "Out of stock" }[s.state]);

/** Real club specs from the Shopify snapshot (variant options) */
export const clubs = [
  { brand: "Wilson", model: "Staff Model Blade irons", cut: "wilson-staff-model-blade", from: 899, stock: "in", specs: [["Set", "5-PW / 4-PW"], ["Shaft", "Dynamic Gold Mid 115"], ["Flex", "Stiff"]], href: "/clubs/brand/wilson" },
  { brand: "Srixon", model: "ZXiR irons, left-handed", cut: "srixon-zxir-irons", from: 899, stock: "order", specs: [["Set", "5-PW / 4-PW"], ["Shaft", "KBS Tour Lite"], ["Flex", "Stiff, Regular"]], href: "/clubs/brand/srixon" },
  { brand: "Mizuno", model: "JPX ONE driver", cut: "mizuno-jpx-one-driver", from: 379, stock: "in", specs: [["Loft", "9° · 10.5° · 12°"], ["Shaft", "Tensei 1K Blue X-Link"], ["Flex", "Stiff, Regular"]], href: "/clubs/brand/mizuno" },
];
export const otherBrands = catalogue.otherClubBrands;

/** Secondary categories, with a real in-stock example product where we have one */
export const secondary = [
  { name: "Bags", eg: "Motocaddy Dry Series cart bag", price: 199, img: "bag-dry-series", kind: "cut" },
  { name: "Balls", eg: "Srixon Soft Feel, dozen", price: 22.95, img: "balls-soft-feel", kind: "cut" },
  { name: "GPS & rangefinders", eg: "Shot Scope PRO LX+ laser", price: 349, img: "laser-shotscope", kind: "cut" },
  { name: "Approved used", eg: "Srixon ZXi 5 irons, 5-PW+SW", price: 709, img: "used-srixon-zxi5", kind: "photo" },
  { name: "Trade-in", eg: "Value your current clubs" },
  { name: "Accessories", eg: "Gloves, grips, umbrellas" },
  { name: "Sale", eg: "Reduced lines" },
  { name: "Clothing & shoes", eg: "Waterproofs, layers, shoes" },
];

/* ---------- membership maths (one source: facts + catalogue) ---------- */
export const saving = () => {
  const f = flagship();
  const v = f.variants[0];
  const pct = val("membership.memberDiscountPercent");
  const fee = facts.membership.tiers.find((t) => t.id === "annual").price;
  const off = Math.round(v.price * pct) / 100;
  return { product: `${f.brand} ${f.name}`, battery: v.battery, price: v.price, pct, off, member: v.price - off, fee, net: off - fee };
};
export const tiers = facts.membership.tiers;
/** fill "{path}" tokens in perk copy using the quiet marker */
export const perk = (t) => t.replace(/\{([\w.]+)\}/g, (_, p) => q(p));

/* ---------- small shared bits ---------- */
export const phone = () => `<a href="tel:${val("business.phoneHref")}">${esc(val("business.phoneDisplay"))}</a>`;
export const email = () => `<a href="mailto:${val("business.email")}">${esc(val("business.email"))}</a>`;
export const hours = () => facts.business.hours.map((h) => `${esc(h.days)}: ${typeof h.time === "string" ? esc(h.time) : q("business.hours.1.time")}`);
export const companyLine = () => `${esc(val("business.companyName"))} trading as ${esc(val("business.tradingName"))} · Company no. ${esc(val("business.companyNumber"))} · ${q("business.vatNumber")} · Prices include VAT`;
export const payments = ["Visa", "Mastercard", "Amex", "Apple Pay", "Google Pay", "PayPal", "Shop Pay", "Klarna", "Clearpay"];

/** cookie banner content (each concept styles it); fixed position, so no layout shift */
export const cookie = (cls) => `<section class="${cls}" id="cookie" aria-label="Cookie preferences">
  <p><strong>Cookies.</strong> ${esc(facts.cookies.text)} <a href="#">Cookie policy</a></p>
  <div><button type="button" data-cookie="accept">Accept all</button><button type="button" data-cookie="reject">Reject non-essential</button><button type="button" class="link">Choose</button></div>
</section>`;

/** document shell */
export const doc = ({ title, css, fonts = [], body, lang = "en-GB" }) => `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(title)}</title>
${fonts.map((f) => `<link rel="preload" href="assets/fonts/concepts/${f}" as="font" type="font/woff2" crossorigin>`).join("\n")}
<link rel="stylesheet" href="assets/css/concepts/${css}.css">
</head>
<body>
${body}
<script>
(function(){if(/shot=1/.test(location.search))document.documentElement.classList.add('is-shot');var c=document.getElementById('cookie');if(!c)return;if(/consent=1/.test(location.search)){c.remove();return;}
c.addEventListener('click',function(e){if(e.target.closest('[data-cookie]'))c.remove();});})();
</script>
</body>
</html>`;

export const placeholderNote = "Dotted underline: detail awaiting confirmation (hover for the question).";
