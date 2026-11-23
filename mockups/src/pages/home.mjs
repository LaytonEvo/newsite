// Homepage mockup: sections in the order set by the brief.
import {
  html, esc, gbp, fact, val, fill, facts, catalogue, icon, img, placeholderPhoto,
  trolleyCard, sortFamilies, stockBadge, utilityBar, header, footer, cookieBanner, page, tbcTag,
} from "../lib/render.mjs";

const hero = () => html`<section class="hero" aria-labelledby="hero-title">
  <div class="container">
    <div class="hero__grid">
      <div class="hero__copy">
        <p class="eyebrow">Motocaddy · Custom fitting · Ringwood</p>
        <h1 class="t-display" id="hero-title">${esc(facts.positioning.headline)}</h1>
        <p class="t-lead">${esc(facts.positioning.sub)}</p>
        <div class="hero__ctas">
          <a class="btn btn--primary btn--lg" href="#range">Shop Motocaddy</a>
          <a class="btn btn--secondary btn--lg" href="custom-fitting.html">Book a free fitting</a>
        </div>
      </div>
      <div class="hero__media">
        <img src="assets/img/products/m5-gps-dhc-highangle-1200.webp" srcset="assets/img/products/m5-gps-dhc-highangle-800.webp 800w, assets/img/products/m5-gps-dhc-highangle-1200.webp 1200w" sizes="(min-width:1100px) 45vw, 92vw" width="1200" height="1200" alt="Motocaddy M5 GPS DHC electric trolley with its GPS screen" fetchpriority="high">
        <a class="hero__chip" href="/trolleys/motocaddy-m5-gps-dhc">
          <span><strong>Motocaddy M5 GPS DHC</strong><span>From ${gbp(969)} · ${esc("18 or 36-hole battery")}</span></span>${icon("arrow")}
        </a>
      </div>
    </div>
    <ul class="trust-row" aria-label="Why buy from Evolution Golf">
      <li class="trust-row__item">${icon("star")}<div><strong>Trustpilot ${fact("trustpilot.rating")}</strong><span>${esc(facts.trustpilot.label)} · ${fact("trustpilot.reviewCount", { tag: false })} reviews</span></div></li>
      <li class="trust-row__item">${icon("shield")}<div><strong>${fact("dealers.motocaddy")}</strong><span>2026 range in stock</span></div></li>
      <li class="trust-row__item">${icon("pin")}<div><strong>Fitting centre</strong><span>${esc(val("fitting.location"))}</span></div></li>
      <li class="trust-row__item">${icon("tag")}<div><strong>${esc(facts.pricePromise.short)}</strong><span><a href="#">How it works</a></span></div></li>
    </ul>
  </div>
</section>`;

const pillars = () => {
  const items = [
    { title: "Electric trolleys", text: `The 2026 Motocaddy range, with free next-day delivery over ${gbp(val("delivery.nextDayFreeThreshold"))}.`, media: img("m1", "Motocaddy M1 electric trolley", { sizes: "(min-width:768px) 30vw, 120px" }), href: "#range", cta: "Shop trolleys" },
    { title: "Golf clubs", text: "Wilson, Srixon and Mizuno, off the shelf or built to your spec.", media: img("srixon-zxir-irons", "Srixon ZXiR iron", { sizes: "(min-width:768px) 30vw, 120px" }), href: "#clubs", cta: "Shop clubs" },
    { title: "Custom fitting", text: "Free, no-obligation sessions on a launch monitor in Ringwood.", media: placeholderPhoto("Fitting bay, Ringwood centre"), href: "custom-fitting.html", cta: "How fitting works" },
  ];
  return html`<section class="section section--tight" aria-labelledby="pillars-title">
    <div class="container">
      <h2 class="sr-only" id="pillars-title">What we do</h2>
      <ul class="pillars">
        ${items.map((p) => html`<li class="card card--link pillar">
          <div class="pillar__media">${p.media}</div>
          <div class="card__body">
            <h3 class="t-h3"><a class="card__cover-link-text" href="${p.href}">${esc(p.title)}</a></h3>
            <p class="t-small t-muted">${esc(p.text)}</p>
            <span class="pillar__more" aria-hidden="true">${esc(p.cta)}${icon("arrow")}</span>
          </div>
          <a class="card__cover-link" href="${p.href}" tabindex="-1" aria-hidden="true"></a>
        </li>`)}
      </ul>
    </div>
  </section>`;
};

const range = () => {
  const fams = sortFamilies(catalogue.trolleyFamilies);
  return html`<section class="section" id="range" aria-labelledby="range-title">
    <div class="container" data-carousel>
      <div class="section-head">
        <div class="section-head__text">
          <p class="eyebrow">Motocaddy 2026</p>
          <h2 class="t-h2" id="range-title">The 2026 Motocaddy range</h2>
          <p class="t-muted">Every model with a choice of battery. In-stock models first.</p>
        </div>
        <div style="display:flex;gap:var(--space-4);align-items:center">
          <a class="link-arrow" href="#">Which trolley is right for me?${icon("arrow")}</a>
          <div class="carousel__controls">
            <button class="carousel__btn" type="button" data-dir="prev" aria-label="Previous trolleys">${icon("chevronL")}</button>
            <button class="carousel__btn" type="button" data-dir="next" aria-label="Next trolleys">${icon("chevronR")}</button>
          </div>
        </div>
      </div>
      <p class="range__offer">${icon("gift")}<span><strong>Free gift or bundle:</strong> ${fact("offers.trolleyGift")}</span></p>
      <div class="carousel">
        <ul class="carousel__track" aria-label="2026 Motocaddy trolleys">
          ${fams.map((f) => `<li>${trolleyCard(f)}</li>`)}
        </ul>
      </div>
    </div>
  </section>`;
};

const fitting = () => html`<section class="section fitting on-dark" id="fitting" aria-labelledby="fitting-title">
  <div class="container fitting__grid">
    <div class="fitting__media">${placeholderPhoto("A fitter with a customer in the Ringwood fitting bay, launch-monitor screen in view (real photo, not AI)")}</div>
    <div class="fitting__copy">
      <p class="eyebrow">Custom fitting</p>
      <h2 class="t-h2" id="fitting-title">Free custom fitting in Ringwood</h2>
      <p class="t-lead">Clubs that suit your swing, not an average one. Book a session with one of our fitters and leave with your numbers, whether you buy or not.</p>
      <ol class="steps">
        <li><div><strong>Talk it through</strong><span>Your game, your goals and the clubs you use now.</span></div></li>
        <li><div><strong>Hit shots on the ${fact("fitting.launchMonitor", { tag: false })}${"" }</strong><span>We test heads and shafts from ${esc(facts.fitting.brandsFitted.slice(0, 3).join(", "))} and more.</span></div></li>
        <li><div><strong>Take your numbers home</strong><span>A clear recommendation, with ${esc(val("fitting.obligation").toLowerCase())}.</span></div></li>
      </ol>
      <div class="facts">
        <div class="fact"><span class="fact__value">${esc(val("fitting.price"))}</span><span class="fact__label">No obligation</span></div>
        <div class="fact"><span class="fact__value">${fact("fitting.durationMinutes", { tag: false })} min</span><span class="fact__label">Per session ${tbcTag}</span></div>
        <div class="fact"><span class="fact__value">${fact("fitting.days", { tag: false })}</span><span class="fact__label">Ringwood ${tbcTag}</span></div>
      </div>
      <div class="btn-row">
        <a class="btn btn--on-dark btn--lg" href="custom-fitting.html">Book a free fitting</a>
        <a class="btn btn--outline-on-dark btn--lg" href="custom-fitting.html">How fitting works</a>
      </div>
    </div>
  </div>
</section>`;

const clubs = () => html`<section class="section" id="clubs" aria-labelledby="clubs-title">
  <div class="container">
    <div class="section-head">
      <div class="section-head__text">
        <p class="eyebrow">Golf clubs</p>
        <h2 class="t-h2" id="clubs-title">Shop clubs by brand</h2>
        <p class="t-muted">Buy standard specs off the shelf, or build them to your measurements. Custom builds take ${fact("leadTimes.customBuild")}.</p>
      </div>
      <a class="link-arrow" href="#">All golf clubs${icon("arrow")}</a>
    </div>
    <ul class="brands">
      ${catalogue.clubBrands.map((b) => html`<li class="card brand-card">
        <div class="brand-card__media">${img(b.image, b.imageAlt, { sizes: "(min-width:768px) 30vw, 92vw" })}</div>
        <div class="card__body">
          <h3 class="brand-card__name">${esc(b.name)}</h3>
          <div class="brand-card__links">
            <a class="btn btn--secondary" href="${b.standardHref}" aria-label="Shop standard ${esc(b.name)} clubs">Shop standard</a>
            <a class="btn btn--primary" href="${b.customHref}" aria-label="Build custom ${esc(b.name)} clubs">Build custom</a>
          </div>
        </div>
      </li>`)}
    </ul>
    <ul class="more-brands" aria-label="More club brands">
      <li class="more-brands__label">Also in stock:</li>
      ${catalogue.otherClubBrands.map((b) => `<li><a class="chip" href="#">${esc(b)}</a></li>`)}
    </ul>
    <div class="decide">
      <div class="decide__q">${icon("help")}<div><h3 class="t-h4">Custom or standard? Find out in 30 seconds</h3><p class="t-small t-muted">Three quick questions about your handicap, build and current clubs, then we point you to standard, a custom build, or a free fitting.</p></div></div>
      <a class="btn btn--primary" href="#">Start the 30-second check</a>
    </div>
  </div>
</section>`;

const membership = () => {
  const product = catalogue.trolleyFamilies.find((f) => f.id === "m5-gps-dhc");
  const v = product.variants[0];
  const pct = val("membership.memberDiscountPercent");
  const fee = facts.membership.tiers.find((t) => t.id === "annual").price;
  const saving = Math.round(v.price * pct) / 100;
  const net = saving - fee;
  return html`<section class="section membership" id="membership" aria-labelledby="membership-title">
    <div class="container">
      <div class="section-head">
        <div class="section-head__text">
          <p class="eyebrow">${fact("membership.name", { tag: false })} membership ${tbcTag}</p>
          <h2 class="t-h2" id="membership-title">A members’ club that pays for itself</h2>
          <p class="t-muted">${esc(facts.membership.oneLiner)}</p>
        </div>
        <a class="link-arrow" href="#">Compare membership tiers${icon("arrow")}</a>
      </div>
      <div class="membership__grid">
        <ul class="tiers" aria-label="Membership tiers">
          ${facts.membership.tiers.map((t) => html`<li class="tier ${t.id === "annual" ? "tier--featured" : ""}">
            <div class="tier__head"><h3 class="tier__name">${esc(t.name)}</h3><p class="tier__price">${esc(t.priceLabel)}<small>${t.price ? " a year" : " forever"}</small></p></div>
            <ul class="ticks">${t.perks.map((p) => `<li>${icon("check")}<span>${fill(p.text)}${p.tbc ? tbcTag : ""}</span></li>`)}</ul>
            <a class="btn ${t.id === "annual" ? "btn--primary" : "btn--secondary"} btn--block" href="#">${t.price ? `Join Annual for ${esc(t.priceLabel)}` : "Join free"}</a>
          </li>`)}
        </ul>
        <aside class="saving" aria-labelledby="saving-title">
          <h3 class="t-h4" id="saving-title">Worked example</h3>
          <div class="saving__product">${img(product.image, "Motocaddy M5 GPS DHC", { sizes: "72px" })}<div><p class="t-small"><strong>Motocaddy M5 GPS DHC</strong></p><p class="t-caption">${esc(v.battery)} battery (${esc(v.holes)}) · ${stockBadge("in")}</p></div></div>
          <table class="sum">
            <caption class="sr-only">Annual membership saving on a Motocaddy M5 GPS DHC</caption>
            <tr><th scope="row">Price</th><td>${gbp(v.price, { pence: true })}</td></tr>
            <tr><th scope="row">Annual member price (${fact("membership.memberDiscountPercent", { tag: false })}% off)</th><td>${gbp(v.price - saving, { pence: true })}</td></tr>
            <tr><th scope="row">Annual membership</th><td>−${gbp(fee, { pence: true })}</td></tr>
            <tr class="sum__total"><th scope="row">Better off by</th><td>${gbp(net, { pence: true })}</td></tr>
          </table>
          <p class="t-caption">Member discount and eligible products ${tbcTag} depend on the discount policy decision. Prices include VAT.</p>
        </aside>
      </div>
    </div>
  </section>`;
};

const reviews = () => html`<section class="section" id="reviews" aria-labelledby="reviews-title">
  <div class="container">
    <div class="section-head">
      <div class="section-head__text">
        <p class="eyebrow">Customer reviews</p>
        <h2 class="t-h2" id="reviews-title">What golfers say about trolleys and fitting</h2>
        <p class="t-muted">Rated ${fact("trustpilot.rating", { tag: false })} out of 5 on Trustpilot from ${fact("trustpilot.reviewCount", { tag: false })} reviews ${tbcTag}</p>
      </div>
      <a class="link-arrow" href="#">Read all reviews on Trustpilot${icon("arrow")}</a>
    </div>
    <ul class="reviews" aria-label="Review placeholders">
      ${["a trolley purchase", "a fitting session", "delivery or service"].map((topic) => html`<li class="review-ph">
        <span class="ph-photo__tag">Placeholder</span>
        <div class="review-ph__stars" aria-hidden="true">${Array.from({ length: 5 }, () => icon("star")).join("")}</div>
        <p class="t-small t-muted">A real Trustpilot review mentioning ${esc(topic)} will appear here, pulled from the Trustpilot feed. No invented quotes or names.</p>
        <span class="skeleton" style="width:90%"></span><span class="skeleton" style="width:70%"></span>
      </li>`)}
    </ul>
  </div>
</section>`;

const guides = () => html`<section class="section" style="padding-top:0" aria-labelledby="guides-title">
  <div class="container">
    <div class="section-head">
      <div class="section-head__text">
        <p class="eyebrow">Buying guides</p>
        <h2 class="t-h2" id="guides-title">Advice from our fitters</h2>
      </div>
      <a class="link-arrow" href="#">All guides${icon("arrow")}</a>
    </div>
    <ul class="guides">
      ${catalogue.guides.map((g) => html`<li class="card guide">
        <div class="card__body">
          <p class="eyebrow">${esc(g.topic)}</p>
          <h3 class="t-h3"><a href="${g.href}" style="color:inherit;text-decoration:none">${esc(g.title)}</a></h3>
          <p class="guide__meta">By <span class="tbc">[named fitter]</span>${tbcTag}, Evolution Golf fitter</p>
          <ul class="guide__products">
            <li class="guide__products-label">In stock now</li>
            ${g.products.map((p) => html`<li><a class="mini-product" href="${p.href}">${img(p.image, "", { sizes: "56px", w: 400 })}<span><span class="mini-product__name">${esc(p.name)}</span><span class="mini-product__meta">${p.from ? "From " : ""}${gbp(p.price)} ${stockBadge(p.stock)}</span></span></a></li>`)}
          </ul>
        </div>
      </li>`)}
    </ul>
  </div>
</section>`;

const tiles = () => {
  const items = [
    ["golfbag", "Bags", "Cart, stand and travel"],
    ["ball", "Golf balls", "Tour to practice"],
    ["gps", "GPS & rangefinders", "Watches, handhelds, lasers"],
    ["tee", "Accessories", "Gloves, grips, umbrellas"],
    ["club", "Approved used", "Pre-owned clubs"],
    ["swap", "Trade in", "Value your old clubs"],
    ["percent", "Sale", "Reduced lines"],
    ["shirt", "Clothing & shoes", "Waterproofs, layers, shoes"],
  ];
  return html`<section class="section" style="padding-top:0" aria-labelledby="more-title">
    <div class="container">
      <div class="section-head"><div class="section-head__text"><h2 class="t-h3" id="more-title">Everything else for your round</h2></div></div>
      <ul class="tiles">
        ${items.map(([ic, t, s], i) => `<li><a class="tile ${i === items.length - 1 ? "tile--quiet" : ""}" href="#">${icon(ic)}<span><strong>${esc(t)}</strong><span>${esc(s)}</span></span></a></li>`)}
      </ul>
    </div>
  </section>`;
};

export default () => page({
  title: "Evolution Golf | Motocaddy trolleys, custom-fitted clubs and free fitting in Ringwood",
  description: "The UK specialist for Motocaddy electric trolleys and custom-fitted golf clubs, with a free fitting centre in Ringwood, Hampshire.",
  css: ["home"],
  pageName: "Homepage",
  body: html`${utilityBar()}
${header()}
<main id="main">
${hero()}
${pillars()}
${range()}
${fitting()}
${clubs()}
${membership()}
${reviews()}
${guides()}
${tiles()}
</main>
${footer()}
${cookieBanner()}`,
});
