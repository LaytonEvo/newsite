// CONCEPT 1 · EDITORIAL / JOURNAL
// A print journal: cover, contents, numbered features, listings instead of card grids.
import {
  html, esc, gbp, q, qt, val, facts, families, spec, stockWord, clubs, otherBrands, secondary, saving, tiers, perk,
  catalogue, cut, photo, phone, email, hours, companyLine, payments, cookie, doc, placeholderNote,
} from "./kit.mjs";

const arrow = `<svg class="j-arr" viewBox="0 0 32 16" aria-hidden="true"><path d="M0 8h29M22 1l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;

const plate = (caption, cls = "") => html`<figure class="j-plate ${cls}">
  <div class="j-plate__img" role="img" aria-label="${esc("Photograph to commission: " + caption)}"><span>Photograph to commission</span></div>
  <figcaption><span class="q" title="To be confirmed: lifestyle photography not yet shot">${esc(caption)}</span></figcaption>
</figure>`;

const masthead = () => html`<header class="j-head">
  <div class="j-top">
    <p>Ringwood, Hampshire · Winter 2026</p>
    <p class="j-top__r"><a href="#fitting">Book a free fitting</a>${phone()}<a class="j-hide-s" href="#">Account</a><a href="#">Basket (0)</a></p>
  </div>
  <a class="j-mast" href="#" aria-label="Evolution Golf, home">
    <span class="j-mast__eg" aria-hidden="true">EG</span><span class="j-mast__word">Evolution Golf</span>
  </a>
  <nav class="j-nav" aria-label="Main">
    <ul>
      ${["Trolleys", "Clubs", "Custom fitting", "Membership", "Bags", "Balls, GPS & accessories", "Used & trade-in", "Sale", "More"].map((n) => `<li><a href="#">${esc(n)}</a></li>`)}
    </ul>
    <form class="j-search" role="search" action="#"><label for="j-q" class="sr">Search</label><input id="j-q" type="search" placeholder="Search the shop"><button type="submit" aria-label="Search">${arrow}</button></form>
  </nav>
</header>`;

const cover = () => html`<section class="j-cover" aria-labelledby="j-h1">
  <div class="j-cover__art">
    <img src="${cut("m5-gps-dhc-highangle")}" alt="Motocaddy M5 GPS DHC electric trolley" width="800" height="800" fetchpriority="high">
    <p class="j-cover__tag">On the cover: Motocaddy M5 GPS DHC, from ${gbp(969)}</p>
  </div>
  <div class="j-cover__text">
    <h1 id="j-h1">Motocaddy trolleys and custom‑fitted clubs, from the people who fit them.</h1>
    <p class="j-stand">Free, no‑obligation fitting at our centre in Ringwood, Hampshire, and a members’ club that pays for itself on a single trolley.</p>
    <ul class="j-cta">
      <li><a href="#trolleys"><span>Shop the 2026 Motocaddy range</span>${arrow}</a></li>
      <li><a href="#fitting"><span>Book a free fitting in Ringwood</span>${arrow}</a></li>
    </ul>
  </div>
</section>`;

const contents = () => html`<nav class="j-contents" aria-label="On this page">
  <h2>In this edition</h2>
  <ol>
    <li><a href="#trolleys"><b>01</b><span>The 2026 Motocaddy range</span><i>Eight models, each with a battery choice</i></a></li>
    <li><a href="#fitting"><b>02</b><span>Why we fit for free</span><i>A session in the Ringwood bay</i></a></li>
    <li><a href="#clubs"><b>03</b><span>Wilson, Srixon, Mizuno</span><i>Off the shelf or built to you</i></a></li>
    <li><a href="#members"><b>04</b><span>The members’ club</span><i>The sum on one trolley</i></a></li>
  </ol>
</nav>`;

const trolleys = () => html`<section class="j-sec j-trolleys" id="trolleys" aria-labelledby="j-t">
  <div class="j-sec__lede">
    <span class="j-num" aria-hidden="true">01</span>
    <h2 id="j-t">The 2026 Motocaddy range</h2>
    <p class="j-drop">Every model in the range comes with a choice of battery: Standard for 18 holes, Ultra for 36. Pick the frame for the features you want (GPS, downhill control, remote), then the battery for how much golf you play. In-stock models are listed first.</p>
    <p class="j-aside">${q("offers.trolleyGift")}</p>
    <a class="j-link" href="#">Which trolley is right for me? ${arrow}</a>
  </div>
  <ol class="j-list" aria-label="2026 Motocaddy trolleys">
    ${families().map((f, i) => { const s = spec(f); const feats = [s.gps && "GPS", s.dhc && "downhill control", s.remote && "remote"].filter(Boolean); return html`<li>
      <a href="${f.href}">
        <span class="j-list__n">${String(i + 1).padStart(2, "0")}</span>
        <img src="${cut(f.image, 400)}" alt="" width="400" height="400" loading="lazy">
        <span class="j-list__name">${esc(f.name)}</span>
        <span class="j-list__spec">${esc([...feats, s.batteries.map((b) => b.holes.replace(" holes", "")).join(" or ") + " holes"].join(" · "))}</span>
        <span class="j-list__price">${f.variants.length > 1 ? "from " : ""}${gbp(s.from)}</span>
        <span class="j-list__stock j-stock--${s.stock.state}">${stockWord(s.stock)}</span>
      </a>
    </li>`; })}
  </ol>
</section>`;

const fitting = () => html`<section class="j-sec j-fit" id="fitting" aria-labelledby="j-f">
  ${plate("A fitter and customer in the Ringwood bay, launch monitor in frame. Natural light, no posing.", "j-fit__plate")}
  <div class="j-fit__text">
    <span class="j-num" aria-hidden="true">02</span>
    <h2 id="j-f">Why we fit for free.</h2>
    <p class="j-drop">Most golfers play clubs built for an average swing. A fitting replaces the guesswork with your own numbers: we watch you hit, try heads and shafts from ${esc(facts.fitting.brandsFitted.slice(0, 3).join(", "))} and others on the ${q("fitting.launchMonitor")}, and show you what changes.</p>
    <p>It costs nothing and there is no obligation to buy. Leave with a recommendation, buy from us, or simply keep the numbers.</p>
    <dl class="j-facts">
      <div><dt>Cost</dt><dd>${esc(val("fitting.price"))}</dd></div>
      <div><dt>Session</dt><dd>${q("fitting.durationMinutes")} min</dd></div>
      <div><dt>Days</dt><dd>${q("fitting.days")}</dd></div>
      <div><dt>Where</dt><dd>Ringwood</dd></div>
    </dl>
    <a class="j-bar" href="#">Book a free fitting ${arrow}</a>
  </div>
</section>`;

const clubSec = () => html`<section class="j-sec j-clubs" id="clubs" aria-labelledby="j-c">
  <header class="j-clubs__head"><span class="j-num" aria-hidden="true">03</span><h2 id="j-c">Three makers we fit most</h2>
    <p>Buy standard specs off the shelf, or have them built to your measurements. Custom builds take ${q("leadTimes.customBuild")}.</p></header>
  <div class="j-clubs__cols">
    ${clubs.map((c) => html`<article class="j-maker">
      <h3>${esc(c.brand)}</h3>
      <img src="${cut(c.cut, 400)}" alt="${esc(`${c.brand} ${c.model}`)}" width="400" height="400" loading="lazy">
      <p class="j-maker__eg">${esc(c.model)}, from ${gbp(c.from)}</p>
      <p class="j-maker__links"><a href="${c.href}">Buy standard</a><a href="#">Build custom</a></p>
    </article>`)}
  </div>
  <p class="j-clubs__more">Also in stock: ${otherBrands.map((b) => `<a href="#">${esc(b)}</a>`).join(", ")}. <a class="j-link" href="#">Custom or standard? A 30‑second check ${arrow}</a></p>
</section>`;

const members = () => { const s = saving(); return html`<section class="j-sec j-members" id="members" aria-labelledby="j-m">
  <span class="j-num" aria-hidden="true">04</span>
  <h2 id="j-m" class="sr">The ${esc(val("membership.name"))} membership</h2>
  <p class="j-big"><span>${gbp(s.net, { pence: true })}</span></p>
  <p class="j-big__cap">What an Annual member of ${q("membership.name")} is better off on a ${esc(s.product)} (${esc(s.battery)} battery, ${gbp(s.price, { pence: true })}): ${q("membership.memberDiscountPercent")}% off is ${gbp(s.off, { pence: true })}, less the ${gbp(s.fee)} fee.</p>
  <div class="j-tiers">
    ${tiers.map((t) => html`<div class="j-tier">
      <h3>${esc(t.name)} <span>${t.price ? `${esc(t.priceLabel)} a year` : "£0, no fee"}</span></h3>
      <ul>${t.perks.map((p) => `<li>${perk(p.text)}</li>`)}</ul>
      <a class="j-link" href="#">${t.price ? "Join for " + esc(t.priceLabel) : "Join free"} ${arrow}</a>
    </div>`)}
  </div>
</section>`; };

const letters = () => html`<section class="j-sec j-letters" aria-labelledby="j-l">
  <h2 id="j-l">Letters</h2>
  <p class="j-letters__src">Reviews from Trustpilot, where we’re rated ${q("trustpilot.rating")} from ${q("trustpilot.reviewCount")} reviews.</p>
  <div class="j-letters__row">
    ${["a trolley", "a fitting", "delivery"].map((t) => `<blockquote class="j-letter"><p><span class="q" title="To be confirmed: real Trustpilot review, chosen to mention ${t}">A Trustpilot review that mentions ${t} will be printed here, verbatim.</span></p><footer>Reviewer’s name, via Trustpilot</footer></blockquote>`)}
  </div>
</section>`;

const reading = () => html`<section class="j-sec j-read" aria-labelledby="j-r">
  <h2 id="j-r">Further reading</h2>
  <div class="j-read__grid">
    ${catalogue.guides.map((g, i) => html`<article class="j-story ${i === 0 ? "j-story--lead" : ""}">
      <img src="${i === 1 ? photo("used-srixon-zxi5") : cut(g.products[0].image)}" alt="" width="800" height="800" loading="lazy" class="${i === 1 ? "is-photo" : ""}">
      <p class="j-story__topic">${esc(g.topic)}</p>
      <h3><a href="${g.href}">${esc(g.title)}</a></h3>
      <p class="j-story__by">By ${qt("a named fitter", "named author for each guide")}</p>
      <p class="j-story__shop">In stock: ${g.products.filter((p) => p.stock === "in").map((p) => `<a href="${p.href}">${esc(p.name)}, ${gbp(p.price)}</a>`).join("; ")}</p>
    </article>`)}
  </div>
</section>`;

const index = () => html`<section class="j-sec j-index" aria-labelledby="j-i">
  <h2 id="j-i">Also in the shop</h2>
  <ul>${secondary.map((c) => `<li><a href="#"><span>${esc(c.name)}</span><i>${esc(c.eg)}${c.price ? ", " + gbp(c.price) : ""}</i></a></li>`).join("")}</ul>
</section>`;

const footer = () => html`<footer class="j-foot">
  <div class="j-foot__mast" aria-hidden="true">Evolution Golf</div>
  <div class="j-foot__cols">
    <div><h2>Visit</h2><p>${q("business.address")}</p><p>${hours().join("<br>")}</p><p>${phone()}<br>${email()}</p></div>
    <div><h2>Shop</h2><ul>${["Electric trolleys", "Golf clubs", "Build custom clubs", "Bags", "Balls, GPS & accessories", "Approved used", "Clothing & shoes"].map((x) => `<li><a href="#">${esc(x)}</a></li>`).join("")}</ul></div>
    <div><h2>Help</h2><ul>${["Delivery & returns", "Contact us", "Help & FAQs", facts.pricePromise.short, "Paying with Klarna or Clearpay", "About us", "Members’ portal"].map((x) => `<li><a href="#">${esc(x)}</a></li>`).join("")}</ul></div>
    <form class="j-news" action="#"><h2>The newsletter</h2><p>New-season launches, buying guides and fitting days. Monthly at most.</p>
      <label for="j-e">Email address</label><div><input id="j-e" type="email" autocomplete="email"><button type="submit">Sign up</button></div>
      <label class="j-check"><input type="checkbox"> Email me news and offers. Unsubscribe any time. <a href="#">Privacy</a></label></form>
  </div>
  <div class="j-foot__base">
    <p>${companyLine()}</p>
    <p>Authorised dealer: ${q("dealers.motocaddy")}. We accept ${payments.join(" / ")}.</p>
    <p><a href="#">Privacy</a> · <a href="#">Cookies</a> · <a href="#">Terms</a> · <a href="#">Refunds</a> · <a href="#">Accessibility</a></p>
    <p class="j-foot__key">${placeholderNote}</p>
  </div>
</footer>`;

export const editorial = {
  id: "editorial",
  n: 1,
  name: "The Journal",
  direction: "Editorial / journal",
  sheet: {
    oneLine: "A print golf journal: cover, contents, numbered features and listings rather than card grids.",
    rationale: "Evolution’s real edge over the national chains is expertise, so this concept presents the shop as a publication run by fitters. The homepage reads like a well-made print journal: a cover that sells one product (the M5 GPS DHC on a claret cover), a contents strip that states the four things the business does, then numbered features. Products appear as a listing, not a card grid, so trolleys can be compared down a single column of name, spec, price and stock, like a buyer’s guide. Typography does the work that boxes and badges do elsewhere: a heavy condensed grotesk at very large sizes against a reading serif, and black rules instead of grey hairlines.",
    structure: "The brief’s nine sections stay but are regrouped as a magazine: the hero becomes a cover plus a ‘contents’ strip that names trolleys, fitting, clubs and membership in one glance (this replaces the separate three pillar tiles). The trust row is dropped as a component; its facts (Trustpilot, dealer status, Ringwood, price promise) move into the copy where they’re relevant and into the footer colophon. Reviews become ‘Letters’; secondary categories become a typographic index.",
    palette: [
      { name: "Ink", hex: "#111111", use: "All text, the heavy rules that structure the page, the footer and the booking bar." },
      { name: "Paper", hex: "#ffffff", use: "Page background. Pure white, no cream." },
      { name: "Claret", hex: "#7a1c2e", use: "The one accent: the cover, section numerals, drop caps, the £60.90 figure and hover states. Never used for buttons in bulk." },
      { name: "Stone", hex: "#5f6163", use: "Captions, specs, meta text (6.3:1 on white)." },
      { name: "Plate", hex: "#d9dbdc", use: "Photo placeholders only, until the commissioned photography exists." },
    ],
    type: [
      { role: "Headlines, nav, numerals", name: "Archivo (variable, widths 62–125%)", source: "Google Fonts, SIL OFL. Used condensed (62–85%) at 800–860 weight.", sample: "800 28px/1 'Archivo'; font-stretch:70%; text-transform:uppercase" },
      { role: "Reading text, captions, standfirsts", name: "Newsreader (variable, optical sizes)", source: "Google Fonts, SIL OFL. A text serif designed for long reading, used for body and italics.", sample: "italic 400 28px/1.2 'Newsreader'" },
    ],
    components: [
      { name: "Primary action", note: "No rounded buttons. The primary action is a full-width ink bar with an arrow, like a magazine’s call-out; secondary actions are underlined condensed links.", html: '<div class="j" style="max-width:560px"><a class="j-bar" href="#" style="margin:0">Book a free fitting <svg class="j-arr" viewBox="0 0 32 16" aria-hidden="true"><path d="M0 8h29M22 1l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></a><p style="margin-top:16px"><a class="j-link" href="#">Which trolley is right for me?</a></p></div>' },
      { name: "Product listing row (instead of a product card)", note: "Number, cut-out, model, spec line in italics, price and stock in words. Trolleys compare down one column.", html: '' },
      { name: "Navigation", note: "A masthead wordmark with a single condensed uppercase nav line between heavy rules. On phones the nav line scrolls sideways; no hamburger needed for eight items.", html: '' },
    ],
    imagery: "<p>Large, art-directed lifestyle photography is the backbone: the fitting bay in natural light, fitters at work, trolleys on New Forest heathland (not manicured fairways). Shot documentary-style, uncropped, no posing.</p><p>Products sit as cut-outs on colour (the cover) or white (listings). Every photo has a caption, like a magazine plate.</p>",
    copy: "<p><strong>H1:</strong> “Motocaddy trolleys and custom‑fitted clubs, from the people who fit them.”</p><p><strong>Standfirst:</strong> “Free, no‑obligation fitting at our centre in Ringwood, Hampshire, and a members’ club that pays for itself on a single trolley.”</p><p><strong>Section heads:</strong> “Why we fit for free.” · “Three makers we fit most” · “£60.90”</p>",
    motion: "Almost none: arrows nudge on hover; the cover image could slowly drift on scroll (parallax under 20px). The point is stillness and confidence.",
    tradeoffs: {
      good: "The most distinctive and premium of the four. Builds trust through expertise rather than offers; the trolley listing is genuinely useful for comparison; guides get real weight, which supports SEO.",
      weak: "Slower path to purchase for someone who just wants a trolley: fewer ‘add to basket’ moments above the fold. Needs a steady stream of content and named authors to stay credible. Condensed uppercase headlines need careful copy length.",
      build: "Medium. Simple components, but layouts are asymmetric and need care at every breakpoint; content editors need well-designed section blocks to keep it looking edited.",
      photo: "High. It only works with commissioned photography (fitting bay, fitters, trolleys on course). Without it the plates look empty.",
      audience: "Considered buyers researching a £500–£1,500 trolley or a custom set; golfers who read reviews before buying.",
    },
    monogram: "Set in Archivo Condensed Black, claret ‘EG’ leading the ink wordmark in the masthead",
    scores: { trolley: 4, fitting: 4, membership: 4, premium: 5, build: "Medium", photo: "High: commissioned lifestyle and fitting photography" },
  },
  fonts: ["archivo-latin-wdth-normal.woff2", "newsreader-latin-opsz-normal.woff2"],
  specimens() {
    // fill component specimens from the live markup so the sheet never drifts from the page
    const row = trolleys().match(/<ol class="j-list"[\s\S]*?<\/li>/)[0] + "</ol>";
    this.sheet.components[1].html = `<div class="j" style="max-width:760px">${row}</div>`;
    this.sheet.components[2].html = `<div class="j" style="max-width:1100px">${masthead()}</div>`;
  },
  render() {
    return doc({
      title: "Evolution Golf: Motocaddy trolleys and custom-fitted clubs, Ringwood (concept: The Journal)",
      css: "editorial",
      fonts: this.fonts,
      body: html`<a class="sr sr-focus" href="#j-main">Skip to content</a>
<div class="j">
${masthead()}
<main id="j-main">
${cover()}
${contents()}
${trolleys()}
${fitting()}
${clubSec()}
${members()}
${letters()}
${reading()}
${index()}
</main>
${footer()}
</div>
${cookie("j-cookie")}`,
    });
  },
};
