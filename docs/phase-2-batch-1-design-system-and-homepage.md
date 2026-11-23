# Phase 2, batch 1: design system and homepage

Status: **awaiting owner review**. Pages 2 onwards (trolley collection first) wait for approval or changes.

Mockups: `mockups/dist/` (start at `index.html`). Screenshots: `mockups/screenshots/`.

## What's in this batch

| Deliverable | Files |
|---|---|
| Design system: colour tokens, type scale, spacing scale, buttons (primary, secondary, text), badges, chips, price, product rating, cards, photo placeholders, banners (live text over image), notices, form fields, modal, cookie banner, navigation and mobile drawer, icon set | `design-system.html`, `screenshots/design-system-390.png`, `screenshots/design-system-1440.png` |
| Homepage at 390px and 1440px | `home.html`, `screenshots/home-390.png`, `screenshots/home-1440.png`, plus first-visit screens with the cookie banner |

## Design decisions

- **Type:**
  - Source Serif 4 for headlines: a sober, bookish serif that reads as expert rather than fashion.
  - Inter for body text and UI.
  - Both are self-hosted, which is quicker to load and needs no Google Fonts call before cookie consent.
- **Colour:**
  - Brand green `#0E4D35` is the primary colour.
  - One accent, `#B42318`, is used for sale prices and alerts only.
  - Neutrals are cool greys, with no cream or beige.
  - The tinted panels use a green tint, `#EEF5F1`.
- **Logo:** the EG monogram shown is a stand-in drawn in the headline font. Please supply the real artwork.
- **Hero:**
  - The positioning line is the H1.
  - The subline covers free fitting in Ringwood and membership.
  - Two calls to action follow: "Shop Motocaddy" and "Book a free fitting".
  - The trust row underneath holds the Trustpilot rating, Motocaddy dealer status, the Ringwood centre and the price match promise.
  - At 390 × 844 the headline, subline and both CTAs sit above the fold once the cookie banner is dismissed.
  - On a first visit the banner covers the CTAs, though the headline and subline stay visible (see `home-390-first-visit.png`).
  - The mockup ribbon (about 60px) won't exist on the real site.
- **Hero image:** a real Motocaddy product shot (M5 GPS DHC, high angle) rather than a lifestyle placeholder. It keeps the hero fast to load and on-message. Swap in a trolley-on-course photo once it's shot.
- **Trolley carousel:**
  - One card per model family, with battery options listed.
  - Stock state appears in words.
  - Product-level reviews only.
  - In-stock models come first.
  - The free-gift and bundle message appears once, above the carousel, not on every card.
- **Clubs:**
  - Wilson, Srixon and Mizuno come first, each with "Shop standard" and "Build custom".
  - Other stocked brands follow as chips.
  - A "Custom or standard? 30-second check" entry leads into the step zero of the club builder.
- **Membership band:**
  - One sentence and both tiers side by side.
  - A worked saving on a real, in-stock product: M5 GPS DHC Standard at £969, 10% member price (TBC), minus £36, leaves you £60.90 better off. This matches the "£60.90" the current checkout interstitial shows.
- **Reviews:** three clearly labelled placeholders until the Trustpilot feed is connected. There are no invented quotes or names.
- **Buying guides:**
  - Three real guides from the existing blog, each linked to products that are in stock today.
  - The byline is a placeholder for a named fitter.
- **Secondary tiles:** eight small tiles. Clothing & shoes is the last one, in a quieter style, and never a hero.
- **Mobile utility bar:** shows the fitting link and the phone number. The Trustpilot rating moves into the hero trust row directly below, because four items don't fit at 390px without scrolling sideways. On desktop, all four items appear.

## Audit findings this batch addresses

| # | Severity | Finding | How the design addresses it |
|---|---|---|---|
| 1 | Critical | Store-level review stars next to product titles | The rating component is product-level only (Judge.me per product). Trustpilot appears only in the utility bar, the trust row and the reviews band, always labelled as Trustpilot. |
| 2 | Critical | Possibly templated testimonials | No testimonials. Review slots are labelled placeholders, to be fed from Trustpilot. |
| 3 | Critical | Prize draw open only to paying members | The Annual tier perk reads "Monthly prize draw entry (free entry route and T&Cs apply)", marked TBC. The full route is designed on the Membership page (batch 7) and needs your input. |
| 4 | High | Pre-ticked marketing consent | The footer sign-up checkbox is unticked by default. The checkout setting itself is Shopify admin: out of scope for this test site. |
| 5 | High | Five membership names | One name, read from `facts.json` (placeholder "Evolution Club", TBC) and used in the nav drawer, footer and membership band. |
| 6 | High | Three delivery thresholds | Every delivery figure comes from one config. Guest rates match Shopify's actual delivery profiles (free standard delivery from £50, free next-day from £500, order by 1pm). Member thresholds are TBC. |
| 7 | High | Legacy £19.95 popup markup | Out of scope for the test site; the design includes no popups. Removing the snippet from the live theme is an owner action. |
| 8 | High | No hero or value proposition | Hero with the positioning line, two CTAs and a trust row. |
| 9 | High | Ten equal nav items; Clothing and Shoes top-level; no Custom Fitting | Eight primary items with Custom Fitting and Membership styled as services. Clothing & shoes are merged under More. |
| 12 | High | Search category dropdown | A single search field with no dropdown, visible on mobile without a tap. (Search behaviour itself comes in batch 10.) |
| 16 | High | Discount overload | No percentage codes, side tabs or popups. One offer message (gift or bundle) and one membership story. The final display depends on the discount hierarchy decision. |
| 17 | High | Finance messaging | Klarna and Clearpay appear as payment badges in the footer. Product-page wording, marked "to be confirmed with provider", comes in batch 3. |
| 23 | Medium | Shoe content outweighs trolleys and clubs | Shoes appear only as the last secondary tile. Motocaddy and the leading club brands lead. |
| 27 | Medium | No address or hours | The footer carries the trading address (TBC), opening hours, phone, email, company name, company number and VAT number (TBC). |
| 32 | Medium | Persistent 5% side tab | Removed: no side tabs or popups. |
| 33 | Medium | Missing alt text; text baked into banners | Every image has alt text or is marked decorative. Banners use live text. The baked-in "FREE GIFT" trolley images were swapped for clean gallery shots. |
| 34 | Medium | Patchwork visual design | One token set, one type pairing and one component library across every screen. |
| 35 | Low | "Leading UK seller" superlative | No superlatives. The positioning line is your draft wording. Every claim I couldn't source from data was removed or marked TBC. |

## Accessibility check (automated, this batch)

- **axe-core 4.10, WCAG 2.0, 2.1 and 2.2 A/AA rules:** 0 violations on the homepage and the design-system page, at both 390px and 1440px.
- **Contrast:** body text is 18.0:1, primary green 9.9:1, secondary text 9.7:1, meta text 6.2:1 and the accent 6.6:1, all on white.
- **Tap targets:** every interactive control is at least 44px, apart from links inside sentences, which WCAG 2.5.8 allows. Product-title links cover the whole card.
- **Keyboard:** there's a visible focus ring on every control, a skip link, and landmarks for the header, nav, main and footer.
- **Still to do:** a manual screen-reader pass and Lighthouse scores come in Phase 4, on the built test site.

## Things only you can supply

Every TBC marker shows a tooltip explaining the open question. Together they cover:

- **Membership:** the programme name and the member discount %.
- **Delivery and returns:** the member delivery thresholds and the returns wording.
- **Fitting:** session length, whether there are weekend slots, and the launch-monitor model.
- **Custom builds:** the lead time.
- **Trust claims:** the Trustpilot business URL, the dealer status you can claim, and your dealer badges.
- **Company details:** the full trading address with postcode (one spelling), and the VAT number.
- **Assets:** the EG monogram artwork; photography of the Ringwood centre, the fitters and trolleys on a course; and clean main product images for trolleys (the current ones have "FREE GIFT" baked in).
