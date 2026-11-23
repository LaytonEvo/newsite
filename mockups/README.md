# Evolution Golf: design mockups (Phase 2)

Static HTML/CSS mockups built from one design system and a **read-only** snapshot of Shopify product data. Nothing here writes to Shopify.

## View

Open `dist/index.html` in a browser. Each page has:

| File | What it is |
|---|---|
| `dist/<page>.html` | The responsive page. Add `?consent=1` to hide the cookie banner. |
| `dist/<page>-390.html` | The page framed at 390px, for review on a desktop browser. |
| `dist/<page>-1440.html` | The page framed at 1440px. |

PNG exports are in `screenshots/`:

| File | What it is |
|---|---|
| `<page>-390.png` | Full page at 390px, 2× scale |
| `<page>-1440.png` | Full page at 1440px, 1× scale |
| `home-<width>-first-visit.png` | First screen as a first-time visitor sees it, with the cookie banner |

## Rebuild

Requires Node 20+. Playwright is only needed for screenshots.

```bash
node src/build.mjs
```

```bash
node src/shoot.mjs
```

## Structure

```
assets/css/tokens.css       colour, type, spacing, radius, shadow tokens (the only place values are defined)
assets/css/components.css   buttons, badges, chips, price, rating, cards, placeholders, banners, notices, forms, modal, cookie banner
assets/css/layout.css       utility bar, header, search, navigation, mobile drawer, footer
assets/css/home.css         homepage sections (composed from the above)
assets/fonts/               Source Serif 4 + Inter (variable, self-hosted, SIL Open Font License)
assets/img/products/        real product images from the Shopify CDN, converted to WebP (400/800px)
src/data/facts.json         ONE source of truth for every customer-facing fact (rating, delivery, returns, lead times, membership…)
src/data/catalogue.json     read-only product snapshot (prices, stock, battery variants, product-level ratings)
src/lib/render.mjs          shared components and helpers; fact() renders TBC facts with a visible marker
src/pages/*.mjs             one module per page
```

## Rules baked into the components

- **Facts:** every fact is read from `facts.json`. A value awaiting an owner decision is stored as `{ "value", "tbc": true, "note" }` and renders with a dashed outline and a red **TBC** tag, with the open question in its tooltip.
- **Reviews:** star ratings are product-level only (Judge.me per-product metafields). The store-level Trustpilot score never appears next to a product title. Testimonials are labelled placeholders until fed from Trustpilot.
- **Stock:** there are three states, In stock, Available to order (order-on-demand) and Out of stock. Out-of-stock items sort last.
- **Battery as a variant:** each trolley card is a model family (e.g. M5 GPS DHC) with its Standard/Ultra batteries as options.
- **Consent:** the marketing checkbox is unticked by default. The cookie banner gives Accept and Reject equal weight and is fixed-position, so it causes no layout shift.
- **Images:** no text is baked into any image. The current Shopify main images for 2026 Motocaddy trolleys carry a "FREE GIFT" roundel, so the mockups use the clean gallery images instead. Lifestyle shots are labelled placeholders, and there are no AI-generated people.
- **Every page:** carries `noindex, nofollow` and a "Design mockup" ribbon.
