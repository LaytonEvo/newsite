// CONCEPT 5 · SHOWROOM (Apple-inspired: product-as-hero tiles)
// Principles borrowed, not assets: full-width centred tiles, one product per tile, two text links, lots of air.
import {
  html, esc, gbp, q, qt, val, facts, families, flagship, spec, stockWord, clubs, otherBrands, secondary, saving, tiers, perk,
  catalogue, cut, photo, phone, email, hours, companyLine, payments, cookie, doc, placeholderNote,
} from "./kit.mjs";

const chev = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>';
const L = (text, href = "#") => `<a class="s-l" href="${href}">${text}${chev}</a>`;
const ic = {
  search: '<svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="m13 13 4 4" stroke="currentColor" stroke-width="1.4"/></svg>',
  bag: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 7h11l-.8 10H5.3L4.5 7Z M7.5 7V5.5a2.5 2.5 0 0 1 5 0V7" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
  menu: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 7h14M3 13h14" stroke="currentColor" stroke-width="1.4"/></svg>',
};

const nav = () => html`<header class="s-nav">
  <nav aria-label="Main"><ul>
    <li><a class="s-nav__logo" href="#" aria-label="Evolution Golf, home">EG</a></li>
    ${["Trolleys", "Clubs", "Fitting", "Membership", "Bags", "Balls & GPS", "Used", "Sale"].map((n) => `<li class="s-nav__item"><a href="#">${esc(n)}</a></li>`)}
    <li><a href="#" aria-label="Search">${ic.search}</a></li><li><a href="#" aria-label="Basket, 0 items">${ic.bag}</a></li><li class="s-nav__menu"><a href="#" aria-label="Menu">${ic.menu}</a></li>
  </ul></nav>
</header>
<p class="s-ribbon">Free next-day delivery over ${gbp(val("delivery.nextDayFreeThreshold"))} when you order by ${esc(val("delivery.nextDayCutoff"))}. ${L("Free fitting in Ringwood")}</p>`;

const tile = ({ cls = "", h, sub, links, media, id }) => html`<section class="s-tile ${cls}" ${id ? `aria-labelledby="${id}"` : ""}>
  <div class="s-tile__copy"><h2 ${id ? `id="${id}"` : ""}>${h}</h2><p class="s-tile__sub">${sub}</p><p class="s-tile__links">${links.join("")}</p></div>
  <div class="s-tile__media">${media}</div>
</section>`;

const ph = (label, dark) => `<div class="s-ph ${dark ? "s-ph--dark" : ""}" role="img" aria-label="${esc("Photo to come: " + label)}"><span class="q" title="To be confirmed: photography not yet taken">${esc(label)}</span></div>`;

const hero = () => { const f = flagship(); return html`<section class="s-tile s-tile--hero" aria-labelledby="s-h1">
  <div class="s-tile__copy">
    <p class="s-kicker">Evolution Golf, Ringwood</p>
    <h1 id="s-h1">Motocaddy trolleys.<br>Custom‑fitted clubs.</h1>
    <p class="s-tile__sub">The specialist for both, with free fitting in Ringwood and a members’ club that pays for itself.</p>
    <p class="s-tile__links">${L("Shop Motocaddy", "#m5")}${L("Book a free fitting", "#fit")}</p>
  </div>
  <div class="s-tile__media"><img src="${cut("m5-gps-dhc-highangle")}" alt="Motocaddy M5 GPS DHC electric trolley" width="800" height="800" fetchpriority="high"></div>
</section>`; };

const grid = () => {
  const s = saving();
  const cells = [
    { cls: "s-cell--dark", h: "Motocaddy M7 GPS Remote", sub: "Steer it from your pocket. From " + gbp(1279) + ".", links: [L("Shop"), L("Compare")], media: `<img src="${cut("m7-gps-remote", 400)}" alt="Motocaddy M7 GPS Remote with its handset" width="400" height="400" loading="lazy">` },
    { h: "Motocaddy SE", sub: "The essentials, from " + gbp(479) + ".", links: [L("Shop"), L("Compare")], media: `<img src="${cut("se", 400)}" alt="Motocaddy SE electric trolley" width="400" height="400" loading="lazy">` },
    { h: "Wilson", sub: "Staff Model Blade irons, from " + gbp(899) + ".", links: [L("Shop standard"), L("Build custom")], media: `<img src="${cut("wilson-staff-model-blade", 400)}" alt="Wilson Staff Model Blade iron" width="400" height="400" loading="lazy">` },
    { cls: "s-cell--dark", h: "Mizuno", sub: "JPX ONE driver, from " + gbp(379) + ".", links: [L("Shop standard"), L("Build custom")], media: `<img src="${cut("mizuno-jpx-one-driver", 400)}" alt="Mizuno JPX ONE driver" width="400" height="400" loading="lazy">` },
    { h: "Srixon", sub: "ZXiR irons, from " + gbp(899) + ". Custom builds take " + q("leadTimes.customBuild") + ".", links: [L("Shop standard"), L("Build custom")], media: `<img src="${cut("srixon-zxir-irons", 400)}" alt="Srixon ZXiR iron" width="400" height="400" loading="lazy">` },
    { h: "Approved used", sub: "Straight from the shop floor. Srixon ZXi 5 irons, " + gbp(709) + ".", links: [L("Shop used"), L("Trade in")], media: `<img class="is-photo" src="${photo("used-srixon-zxi5", 400)}" alt="Approved used Srixon ZXi 5 irons on the hitting mat" width="400" height="400" loading="lazy">` },
  ];
  return html`<div class="s-grid">${cells.map((c) => html`<section class="s-cell ${c.cls || ""}"><div class="s-tile__copy"><h3>${c.h}</h3><p class="s-tile__sub">${c.sub}</p><p class="s-tile__links">${c.links.join("")}</p></div><div class="s-cell__media">${c.media}</div></section>`)}</div>`;
};

const more = () => html`<section class="s-more" aria-labelledby="s-mo">
  <h2 id="s-mo">Also in the shop</h2>
  <ul>${secondary.filter((c) => c.name !== "Approved used").map((c) => `<li><a href="#">${c.img ? `<img src="${cut(c.img, 400)}" alt="" width="400" height="400" loading="lazy">` : `<span class="s-more__blank" aria-hidden="true"></span>`}<span>${esc(c.name)}</span></a></li>`).join("")}</ul>
  <p class="s-more__note">Rated ${q("trustpilot.rating")} on Trustpilot from ${q("trustpilot.reviewCount")} reviews. ${L("Read reviews")} ${L("Buying guides")}</p>
</section>`;

const footer = () => html`<footer class="s-foot">
  <p class="s-foot__fine">Prices include VAT. Member prices apply to ${q("membership.name")} members; the member discount shown (${q("membership.memberDiscountPercent")}%) depends on the discount policy. Finance wording to be confirmed with Klarna and Clearpay. ${placeholderNote}</p>
  <div class="s-foot__cols">
    ${[["Shop", ["Electric trolleys", "Golf clubs", "Build custom clubs", "Bags", "Balls, GPS & accessories", "Approved used", "Clothing & shoes"]], ["Services", ["Custom fitting", "Membership", "Trade-in", "Members’ portal"]], ["Help", ["Delivery & returns", "Contact us", "Help & FAQs", facts.pricePromise.short, "Klarna & Clearpay"]], ["Evolution Golf", ["About us", "Buying guides", "Visit Ringwood"]]].map(([h, items]) => `<div><h2>${h}</h2><ul>${items.map((x) => `<li><a href="#">${esc(x)}</a></li>`).join("")}</ul></div>`).join("")}
    <form class="s-news" action="#"><h2>Newsletter</h2><label class="sr" for="s-e">Email address</label><input id="s-e" type="email" placeholder="Email address" autocomplete="email"><label class="s-check"><input type="checkbox"> Email me news and offers.</label><button type="submit">Sign up</button></form>
  </div>
  <div class="s-foot__base"><p>Visit us: ${q("business.address")} · ${hours().join(" · ")} · ${phone()} · ${email()}</p><p>${companyLine()} · ${q("dealers.motocaddy")}</p><p><a href="#">Privacy</a> · <a href="#">Cookies</a> · <a href="#">Terms</a> · <a href="#">Accessibility</a></p></div>
</footer>`;

export const showroom = {
  id: "showroom",
  n: 5,
  name: "Showroom",
  direction: "Apple-inspired: product tiles",
  fonts: ["../inter-latin-wght-normal.woff2"],
  sheet: {
    oneLine: "Apple-inspired. A stack of full-width, centred tiles, one product or service per tile, two quiet links each. The products do the talking.",
    rationale: "Borrows the principles of Apple’s homepage, not its assets: each tile does one job, centred, with a short headline, one line of copy, two text links and a big product image. The hero states the two specialisms in five words; the next three full-width tiles carry the three things a first-time visitor must get: the M5 GPS DHC (trolleys), free fitting (on black, so it reads as a different kind of thing), and membership (with the £60.90 sum as the headline). A two-column grid of smaller tiles then covers more trolleys, the three club brands and approved used. Copy is the shortest of any concept.",
    structure: "Every section becomes a tile, so the brief’s order maps directly: hero, three hero-sized tiles (trolleys, fitting, membership), then a grid for range highlights and clubs. The trust row, pillars and reviews band are reduced to one line of fine print under the grid.",
    palette: [
      { name: "Ink", hex: "#1a1c1b", use: "Text, the dark tiles." },
      { name: "Porcelain", hex: "#f4f5f4", use: "Light tiles; a neutral, near-white grey (not cream)." },
      { name: "White", hex: "#ffffff", use: "Page and alternate tiles." },
      { name: "Fairway link", hex: "#0b6b47", use: "Text links on light tiles (6.6:1). The only colour." },
      { name: "Lime link", hex: "#7fe0ad", use: "Text links on dark tiles." },
      { name: "Slate", hex: "#5f6461", use: "Fine print, captions." },
    ],
    type: [{ role: "Everything", name: "Inter (variable)", source: "Google Fonts, SIL OFL. Stands in for Apple’s SF Pro, which can’t be licensed for a non-Apple website. Semibold 600 at display sizes with tight tracking.", sample: "600 30px/1 'Inter'" }],
    components: [
      { name: "Text link", note: "The only call to action: a coloured text link with a small chevron. No buttons on tiles.", html: '<p class="s-tile__links" style="justify-content:flex-start"><a class="s-l" href="#">Shop Motocaddy<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></a><a class="s-l" href="#">Book a free fitting<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg></a></p>' },
      { name: "Tile", note: "Centred headline, one line of copy, two links, then the product large. Light or dark.", html: "" },
      { name: "Navigation", note: "A thin, translucent bar of small text; a single delivery ribbon under it.", html: "" },
    ],
    imagery: "<p>Large product cut-outs, centred, on flat light or dark tiles; nothing else in frame. The fitting tile needs one excellent photograph of the bay (placeholder for now). Over time, studio-quality renders of the trolleys would lift this concept more than any other.</p>",
    copy: "<p><strong>H1:</strong> “Motocaddy trolleys. Custom‑fitted clubs.”</p><p><strong>Sub:</strong> “The specialist for both, with free fitting in Ringwood and a members’ club that pays for itself.”</p><p><strong>Tiles:</strong> “Free custom fitting.” · “£60.90 better off.” · “Steer it from your pocket.”</p>",
    motion: "Subtle: tiles fade and rise slightly into view; product images scale from 96% to 100% as they enter.",
    tradeoffs: {
      good: "Instantly premium and calm; the clearest single message per screen; very fast on mobile (one tile per screen); cheap to maintain because each tile is one product and two links.",
      weak: "Few products per scroll, so browsing the range is slow; relies on excellent product imagery; the familiar tile pattern may read as ‘Apple-ish’ to some visitors.",
      build: "Low. One tile component in two sizes plus a grid; staff can add or reorder tiles in the theme editor.",
      photo: "Medium: one great fitting-bay photo; better trolley renders would help.",
      audience: "Everyone, especially mobile visitors arriving from ads or search who need the message in one screen.",
    },
    monogram: "‘EG’ as a small Inter Semibold wordmark in the nav, ink on white",
    scores: { trolley: 4, fitting: 4, membership: 5, premium: 5, build: "Low", photo: "Medium: one fitting-bay photo; renders help" },
  },
  specimens() {
    this.sheet.components[1].html = `<div class="s" style="max-width:640px">${grid().match(/<section class="s-cell[\s\S]*?<\/section>/)[0]}</div>`;
    this.sheet.components[2].html = `<div class="s">${nav()}</div>`;
  },
  render() {
    const s = saving();
    return doc({
      title: "Evolution Golf: Motocaddy trolleys and custom-fitted clubs (concept: Showroom)",
      css: "showroom",
      fonts: this.fonts,
      body: html`<a class="sr sr-focus" href="#s-main">Skip to content</a>
<div class="s">
${nav()}
<main id="s-main">
${hero()}
${tile({ cls: "s-tile--grey", id: "m5", h: "Motocaddy M5 GPS DHC", sub: `Course maps on the handle. Control on the hills. Standard or Ultra battery, from ${gbp(969)}.`, links: [L("Shop"), L("Which trolley is right for me?")], media: `<img src="${cut("m5-gps-dhc")}" alt="Motocaddy M5 GPS DHC with its GPS screen" width="800" height="800" loading="lazy">` })}
${tile({ cls: "s-tile--dark", id: "fit", h: "Free custom fitting.", sub: `${q("fitting.durationMinutes")} minutes on the ${q("fitting.launchMonitor")} in Ringwood. Your numbers, no obligation.`, links: [L("Book a slot"), L("How it works")], media: ph("The Ringwood fitting bay, launch-monitor screen glowing, a golfer mid-swing", true) })}
${tile({ cls: "s-tile--grey", id: "mem", h: `${gbp(s.net, { pence: true })} better off.`, sub: `What an Annual member of ${q("membership.name")} saves on an M5 GPS DHC after the ${gbp(s.fee)} fee. Free membership costs nothing.`, links: [L("Join free"), L("Compare tiers")], media: `<div class="s-sum" aria-label="Membership saving"><span>${gbp(s.price, { pence: true })}</span><span>−${gbp(s.off, { pence: true })} member price</span><span>+${gbp(s.fee)} Annual</span></div>` })}
${grid()}
${more()}
</main>
${footer()}
</div>
${cookie("s-cookie")}`,
    });
  },
};
