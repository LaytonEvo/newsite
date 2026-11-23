// CONCEPT 4 · LOCAL EXPERT
// Warm, human, rooted in Ringwood and the New Forest. People, place and belonging lead.
import {
  html, esc, gbp, q, qt, val, facts, families, flagship, spec, stockWord, clubs, otherBrands, secondary, saving, tiers, perk,
  catalogue, cut, photo, phone, email, hours, companyLine, payments, cookie, doc, placeholderNote,
} from "./kit.mjs";

const A = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ic = {
  pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="9.5" r="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  bag: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Z M9 8V6a3 3 0 0 1 6 0v2" fill="none" stroke="currentColor" stroke-width="1.8"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m20 20-3.5-3.5" stroke="currentColor" stroke-width="1.8"/></svg>',
};
const photoPh = (label, cls = "") => `<div class="o-ph ${cls}" role="img" aria-label="${esc("Photo to come: " + label)}"><span class="q" title="To be confirmed: photography not yet taken">${esc(label)}</span></div>`;

const topbar = () => html`<div class="o-top">
  <p>${ic.clock}<span>Open ${esc(facts.business.hours[0].days)}, ${esc(facts.business.hours[0].time)}</span></p>
  <p class="o-hide-s">${ic.pin}<a href="#visit">Find us in Ringwood</a></p>
  <p>${ic.phone}${phone()}</p>
</div>`;

const header = () => html`<header class="o-head">
  <button class="o-ib o-menu" type="button" aria-label="Menu">${ic.menu}</button>
  <a class="o-logo" href="#" aria-label="Evolution Golf, Ringwood, home"><span class="o-logo__mark" aria-hidden="true">EG</span><span class="o-logo__word" aria-hidden="true">Evolution Golf<small>Ringwood · New Forest</small></span></a>
  <div class="o-head__end"><a class="o-ib o-hide-s" href="#" aria-label="Search">${ic.search}</a><a class="o-ib" href="#" aria-label="Basket, 0 items">${ic.bag}</a></div>
  <nav class="o-nav" aria-label="Main"><ul>
    ${["Trolleys", "Clubs", "Custom fitting", "Membership", "Bags", "Balls, GPS & accessories", "Used & trade-in", "Sale", "More"].map((n) => `<li><a href="#">${esc(n)}</a></li>`)}
  </ul></nav>
</header>`;

const hero = () => html`<section class="o-hero" aria-labelledby="o-h1">
  <div class="o-hero__photo">${photoPh("The team outside the Ringwood centre, morning light, the shop sign in view")}</div>
  <div class="o-hero__card">
    <h1 id="o-h1">Ringwood’s home for Motocaddy trolleys and fitted clubs.</h1>
    <p>Book a free, no‑obligation fitting with our team, or shop the 2026 Motocaddy range. Members get back more than they pay in.</p>
    <div class="o-hero__acts"><a class="o-btn" href="#fitting">Book a free fitting ${A}</a><a class="o-link" href="#trolleys">Shop Motocaddy trolleys ${A}</a></div>
  </div>
  <figure class="o-hero__real">
    <img src="${photo("used-srixon-zxi5")}" alt="A set of approved used Srixon ZXi 5 irons laid out on the hitting mat" width="800" height="800" fetchpriority="high">
    <figcaption>From the shop floor: Srixon ZXi 5 irons, approved used, ${gbp(709)}</figcaption>
  </figure>
</section>`;

const team = () => html`<section class="o-sec o-team" aria-labelledby="o-tm">
  <div class="o-head2"><h2 id="o-tm">The people you’ll meet</h2><p>The fitters and staff who’ll fit your clubs and set you up with a trolley. Ask for anyone by name.</p></div>
  <ul class="o-team__list">
    ${[["Fitter", "Wilson · Srixon · Mizuno"], ["Fitter", "Putters and wedges"], ["Shop and trolleys", "Motocaddy set-up and advice"]].map(([role, does]) => html`<li class="o-person">
      ${photoPh(`Portrait: ${role.toLowerCase()} at work in the centre`, "o-arch")}
      <h3>${qt("Name", "staff names and bios to be supplied")}</h3>
      <p>${esc(role)} · ${esc(does)}</p>
    </li>`)}
    <li class="o-centre">
      <h3>The centre</h3>
      <p>${ic.pin}<span>${q("business.address")}</span></p>
      <p>${ic.clock}<span>${hours().join("<br>")}</span></p>
      <p>${ic.phone}<span>${phone()}</span></p>
      <a class="o-link" href="#visit">Directions and parking ${A}</a>
    </li>
  </ul>
</section>`;

const trolleys = () => html`<section class="o-sec o-troll" id="trolleys" aria-labelledby="o-tr">
  <div class="o-head2"><h2 id="o-tr">The 2026 Motocaddy range</h2><p>Every model comes with a choice of battery: Standard for 18 holes, Ultra for 36. Not sure which? Call ${phone()} or pop in, and we’ll talk you through it.</p></div>
  <p class="o-offer">${q("offers.trolleyGift")}</p>
  <ul class="o-shelf">
    ${families().map((f) => { const s = spec(f); const feats = [s.gps && "GPS", s.dhc && "downhill control", s.remote && "remote"].filter(Boolean); return html`<li class="o-prod">
      <a href="${f.href}">
        <span class="o-arch o-prod__img"><img src="${cut(f.image, 400)}" alt="" width="400" height="400" loading="lazy"></span>
        <span class="o-prod__name">Motocaddy ${esc(f.name)}</span>
        <span class="o-prod__spec">${esc(feats.length ? feats.join(", ") : "The essentials")}${" · " + esc(s.batteries.map((b) => b.holes.replace(" holes", "")).join(" or ") + " holes")}</span>
        <span class="o-prod__foot"><b>${f.variants.length > 1 ? "From " : ""}${gbp(s.from)}</b><i class="o-st o-st--${s.stock.state}">${stockWord(s.stock)}</i></span>
      </a>
    </li>`; })}
  </ul>
</section>`;

const fitting = () => html`<section class="o-fit" id="fitting" aria-labelledby="o-ft">
  <div class="o-fit__inner">
    <div class="o-fit__copy">
      <h2 id="o-ft">A fitting with us</h2>
      <p class="o-fit__lede">It’s free, it takes about ${q("fitting.durationMinutes")} minutes, and there’s no pressure to buy. Bring your clubs and your questions.</p>
      <ol class="o-steps">
        <li><b>1</b><div><strong>A chat first</strong><span>How you play, what’s frustrating you, what you use now.</span></div></li>
        <li><b>2</b><div><strong>Hit some shots</strong><span>On the ${q("fitting.launchMonitor")}, trying heads and shafts from ${esc(facts.fitting.brandsFitted.slice(0, 3).join(", "))} and more.</span></div></li>
        <li><b>3</b><div><strong>Your numbers, explained</strong><span>Plain-English advice. Buy from us, think it over, or just keep the numbers.</span></div></li>
      </ol>
      <a class="o-btn o-btn--gorse" href="#">See free fitting slots ${A}</a>
      <p class="o-fit__small">Fittings run ${q("fitting.days")}. Custom builds take ${q("leadTimes.customBuild")}.</p>
    </div>
    <div class="o-fit__pics">${photoPh("Hands on the grip, launch monitor on screen behind", "o-fit__p1")}${photoPh("A fitter talking a customer through their numbers", "o-fit__p2")}</div>
  </div>
</section>`;

const clubSec = () => html`<section class="o-sec" aria-labelledby="o-cl">
  <div class="o-head2"><h2 id="o-cl">The clubs we fit most</h2><p>Buy standard off the shelf, or let us build them to your fitting.</p></div>
  <ul class="o-clubs">
    ${clubs.map((c) => html`<li class="o-club">
      <span class="o-arch o-club__img"><img src="${cut(c.cut, 400)}" alt="${esc(`${c.brand} ${c.model}`)}" width="400" height="400" loading="lazy"></span>
      <h3>${esc(c.brand)}</h3><p>${esc(c.model)}, from ${gbp(c.from)}</p>
      <p class="o-club__go"><a href="${c.href}">Shop standard</a><a href="#">Build custom</a></p>
    </li>`)}
  </ul>
  <p class="o-also">We also stock ${otherBrands.join(", ")}. <a class="o-link" href="#">Custom or standard? Find out in 30 seconds ${A}</a></p>
</section>`;

const club = () => { const s = saving(); return html`<section class="o-club2" aria-labelledby="o-jn">
  <div class="o-card-wrap" aria-hidden="true">
    <div class="o-mcard"><span class="o-mcard__eg">EG</span><span class="o-mcard__name">${esc(val("membership.name"))}</span><span class="o-mcard__line">Member · Annual</span><span class="o-mcard__no">Member since 2026</span></div>
  </div>
  <div class="o-club2__copy">
    <h2 id="o-jn">Join the club</h2>
    <p class="o-club2__lede">${q("membership.name")} is for golfers who’d rather have a shop that knows them. Members get member prices in the shop and online, plus the perks below.</p>
    <p class="o-sum">On a Motocaddy M5 GPS DHC at ${gbp(s.price)}, an Annual member’s ${q("membership.memberDiscountPercent")}% saves ${gbp(s.off, { pence: true })}. Take off the ${gbp(s.fee)} fee and you’re <b>${gbp(s.net, { pence: true })} better off</b>, with the rest of the year still to come.</p>
    <div class="o-tiers">${tiers.map((t) => html`<div class="o-tier"><h3>${esc(t.name)}<span>${t.price ? esc(t.priceLabel) + " a year" : "Free"}</span></h3><ul>${t.perks.map((p) => `<li>${perk(p.text)}</li>`)}</ul><a class="${t.price ? "o-btn" : "o-btn o-btn--line"}" href="#">${t.price ? "Join for " + esc(t.priceLabel) : "Join free"}</a></div>`)}</div>
  </div>
</section>`; };

const voices = () => html`<section class="o-sec o-voices" aria-labelledby="o-vo">
  <div class="o-head2"><h2 id="o-vo">What our customers say</h2><p>Rated ${q("trustpilot.rating")} on Trustpilot from ${q("trustpilot.reviewCount")} reviews.</p></div>
  <ul class="o-voices__list">${["a trolley bought from us", "a fitting in the bay", "help after the sale"].map((t) => `<li><p><span class="q" title="To be confirmed: real Trustpilot review">A real Trustpilot review about ${t} will sit here, word for word.</span></p><p class="o-voices__by">Name, Trustpilot</p></li>`).join("")}</ul>
  <div class="o-guides"><h3>From the fitting bay</h3><ul>${catalogue.guides.map((g) => `<li><a href="${g.href}">${esc(g.title)}</a><span>by ${qt("our fitter", "named author")}</span></li>`).join("")}</ul></div>
</section>`;

const map = () => `<svg class="o-map" viewBox="0 0 520 360" role="img" aria-label="Sketch map: Ringwood sits on the A31 on the western edge of the New Forest">
  <rect width="520" height="360" fill="#f5f1f4"/>
  <path d="M250 40 C 360 20, 500 60, 505 170 C 510 280, 420 340, 300 330 C 240 324, 230 250, 250 190 C 262 150, 220 100, 250 40 Z" fill="#e4d9e3"/>
  <text x="380" y="190" font-family="Young Serif, Georgia, serif" font-size="22" fill="#3f2a44">New Forest</text>
  <path d="M10 250 C 90 230, 150 215, 205 205 C 300 188, 400 170, 515 120" fill="none" stroke="#a64b23" stroke-width="7" stroke-linecap="round"/>
  <rect x="120" y="230" width="44" height="22" rx="4" fill="#a64b23"/><text x="142" y="246" text-anchor="middle" font-family="Atkinson Hyperlegible, Arial, sans-serif" font-size="13" font-weight="700" fill="#fff">A31</text>
  <circle cx="205" cy="205" r="12" fill="#3f2a44"/><circle cx="205" cy="205" r="5" fill="#e9b949"/>
  <text x="180" y="180" text-anchor="end" font-family="Atkinson Hyperlegible, Arial, sans-serif" font-size="17" font-weight="700" fill="#221b24">Ringwood</text>
</svg>`;

const visit = () => html`<section class="o-sec o-visit" id="visit" aria-labelledby="o-vi">
  <div class="o-visit__map">${map()}</div>
  <div class="o-visit__copy">
    <h2 id="o-vi">Come and see us</h2>
    <p>${ic.pin}<span>${q("business.address")}</span></p>
    <p>${ic.clock}<span>${hours().join("<br>")}</span></p>
    <p>${ic.phone}<span>${phone()} · ${email()}</span></p>
    <a class="o-btn" href="#">Get directions ${A}</a>
  </div>
</section>`;

const rest = () => html`<section class="o-sec" aria-labelledby="o-re">
  <div class="o-head2"><h2 id="o-re">Everything else in the shop</h2></div>
  <ul class="o-rest">${secondary.map((c) => `<li><a href="#">${c.img ? `<span class="o-rest__img"><img src="${c.kind === "photo" ? photo(c.img, 400) : cut(c.img, 400)}" alt="" width="400" height="400" loading="lazy" class="${c.kind === "photo" ? "is-photo" : ""}"></span>` : ""}<strong>${esc(c.name)}</strong><span>${esc(c.eg)}${c.price ? ", " + gbp(c.price) : ""}</span></a></li>`).join("")}</ul>
</section>`;

const footer = () => html`<footer class="o-foot">
  <div class="o-foot__grid">
    <div class="o-foot__brand"><span class="o-logo__mark o-logo__mark--inv" aria-hidden="true">EG</span><p class="o-foot__say">Evolution Golf, Ringwood. Trolleys, fitting and clubs, on the edge of the New Forest.</p></div>
    <div><h2>Shop</h2><ul>${["Electric trolleys", "Golf clubs", "Build custom clubs", "Bags", "Balls, GPS & accessories", "Approved used", "Clothing & shoes"].map((x) => `<li><a href="#">${esc(x)}</a></li>`).join("")}</ul></div>
    <div><h2>Help</h2><ul>${["Delivery & returns", "Contact us", "Help & FAQs", facts.pricePromise.short, "Klarna & Clearpay", "About us", "Members’ portal"].map((x) => `<li><a href="#">${esc(x)}</a></li>`).join("")}</ul></div>
    <form class="o-news" action="#"><h2>Hear from us</h2><p>Fitting days, new-season launches and the odd buying guide. Monthly at most.</p><label for="o-e">Email address</label><div><input id="o-e" type="email" autocomplete="email"><button type="submit">Sign up</button></div>
      <label class="o-check"><input type="checkbox"> Yes, email me news and offers. I can unsubscribe at any time.</label></form>
  </div>
  <div class="o-foot__base"><p>${companyLine()}</p><p>${q("dealers.motocaddy")} · We accept ${payments.join(", ")}</p><p><a href="#">Privacy</a> · <a href="#">Cookies</a> · <a href="#">Terms</a> · <a href="#">Accessibility</a></p><p>${placeholderNote}</p></div>
</footer>`;

export const local = {
  id: "local",
  n: 4,
  name: "The Local",
  direction: "Local expert",
  fonts: ["young-serif-latin-400-normal.woff2", "atkinson-hyperlegible-latin-400-normal.woff2"],
  sheet: {
    oneLine: "Warm and human: the people, the Ringwood centre and the New Forest lead; membership is belonging to a club.",
    rationale: "This concept answers ‘why buy here rather than online?’ with people and place. The first thing you see is the team outside the Ringwood centre and a real photo from the shop floor, and the headline names the town. The fitters get faces, roles and the brands they fit; the centre gets opening hours, a sketch map and directions. The Motocaddy range sits in arch-topped frames that feel tactile rather than catalogue-like, and membership is presented as joining a club with a physical card, with the £60.90 saving told as a plain-English sum. The palette comes from the New Forest heath (heather, bracken, gorse) rather than golf-course green, and the body face is chosen for legibility, which matters to the older golfers who buy most trolleys.",
    structure: "‘The people you’ll meet’ and ‘The centre’ are added straight after the hero, ahead of the trolley range: in this concept the people are the reason to buy, so they come first. The three pillar tiles and the trust row are dropped; trolleys, fitting and membership each get a full section instead. Reviews and buying guides share one section. A ‘Come and see us’ section with a sketch map is added near the end.",
    palette: [
      { name: "Heather", hex: "#3f2a44", use: "Headings, the dark bands (fitting, footer) and the membership card. White text on it." },
      { name: "Bracken", hex: "#a64b23", use: "Primary buttons and links: white text on it (5.7:1). Also the road on the map." },
      { name: "Gorse", hex: "#e9b949", use: "Small highlights only: the step numbers, the button on the dark fitting band (ink text), the monogram on the card." },
      { name: "Mist", hex: "#f5f1f4", use: "The one light tint, used behind products and on the map. A heather tint, not cream." },
      { name: "Ink", hex: "#221b24", use: "Body text." },
      { name: "Bark", hex: "#5d5560", use: "Secondary text (7.2:1 on white)." },
    ],
    type: [
      { role: "Headlines", name: "Young Serif (400)", source: "Google Fonts, SIL OFL. A soft, slightly chunky serif: friendly rather than elegant, so it avoids the default ‘elegant serif’ look.", sample: "400 30px/1.1 'Young Serif'" },
      { role: "Body and UI", name: "Atkinson Hyperlegible (400/700)", source: "Google Fonts, SIL OFL. Designed by the Braille Institute for low-vision readers; very clear at small sizes, which matters to the older golfers who buy most trolleys.", sample: "400 24px/1.2 'Atkinson'" },
    ],
    components: [
      { name: "Buttons", note: "Rounded (10px), bracken with white text; gorse on dark bands. A secondary action is an underlined link with an arrow, not a second button.", html: '<div class="o" style="display:flex;gap:20px;flex-wrap:wrap;align-items:center"><a class="o-btn" href="#">Book a free fitting</a><a class="o-link" href="#">Shop Motocaddy trolleys</a></div>' },
      { name: "Product card", note: "An arch-topped frame on Mist with the cut-out, the full model name (set in Atkinson bold, because Young Serif’s old-style figures make “M5” read like “M₅”), one friendly spec line, price and stock in words.", html: "" },
      { name: "Navigation", note: "‘Open today’ and the phone number come first in the top bar; a centred lockup with ‘Ringwood · New Forest’; a calm single-line nav.", html: "" },
    ],
    imagery: "<p>Real people, real place: the team, the centre, customers mid-fitting, trolleys on New Forest heathland and local courses. Natural light, slightly warm grade, candid rather than posed. Arch-topped frames for portraits and products give a consistent, tactile shape.</p><p>The hero already uses one real shop photo (approved used Srixon irons on the hitting mat); more of these work better than stock imagery.</p>",
    copy: "<p><strong>H1:</strong> “Ringwood’s home for Motocaddy trolleys and fitted clubs.”</p><p><strong>Sub:</strong> “Book a free, no‑obligation fitting with our team, or shop the 2026 Motocaddy range. Members get back more than they pay in.”</p><p><strong>Section heads:</strong> “The people you’ll meet” · “A fitting with us” · “Join the club” · “Come and see us”</p>",
    motion: "Gentle: photos fade in as you scroll, and the membership card tilts slightly on hover. Nothing that competes with the photography.",
    tradeoffs: {
      good: "Strongest on trust, the fitting service and membership-as-belonging; the most clearly ‘not a national chain’; Atkinson Hyperlegible makes it the most readable for older trolley buyers; the sketch map and hours make visiting easy.",
      weak: "Lives or dies on photography of real people; without it the page is a lot of placeholders. The trolley range sits lower than in the other concepts, and the page is longer, so online-only buyers far from Ringwood may find it less relevant. Needs staff willing to be featured.",
      build: "Low–medium: simple components; the map is an illustration; arch frames are pure CSS.",
      photo: "High: team portraits, the centre, fittings in progress and trolleys on local courses. A half-day shoot would cover it.",
      audience: "Golfers within driving distance of Ringwood, first-time trolley buyers who want advice, members, and older golfers who value service over price.",
    },
    monogram: "‘EG’ in Young Serif, gorse on a heather rounded square; also used as the membership card mark",
    scores: { trolley: 3, fitting: 5, membership: 5, premium: 4, build: "Low–medium", photo: "High: people, centre and local course photography" },
  },
  specimens() {
    this.sheet.components[1].html = `<div class="o" style="max-width:300px">${trolleys().match(/<li class="o-prod">[\s\S]*?<\/li>/)[0].replace("<li", "<div").replace(/<\/li>$/, "</div>")}</div>`;
    this.sheet.components[2].html = `<div class="o">${topbar()}${header()}</div>`;
  },
  render() {
    return doc({
      title: "Evolution Golf, Ringwood: Motocaddy trolleys, fitted clubs, free fitting (concept: The Local)",
      css: "local",
      fonts: this.fonts,
      body: html`<a class="sr sr-focus" href="#o-main">Skip to content</a>
<div class="o">
${topbar()}
${header()}
<main id="o-main">
${hero()}
${team()}
${trolleys()}
${fitting()}
${clubSec()}
${club()}
${voices()}
${visit()}
${rest()}
</main>
${footer()}
</div>
${cookie("o-cookie")}`,
    });
  },
};
