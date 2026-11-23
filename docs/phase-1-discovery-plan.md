# Evolution Golf redesign: Phase 1 discovery and plan

Status: **awaiting owner approval**. No design or build work has started.
Data source: read-only Shopify Admin API queries, 23 November 2026. Nothing was written to Shopify.

---

## 1. Catalogue at a glance

| Measure | Count |
|---|---|
| Products (all statuses) | 4,904 |
| Active | 2,652 |
| Active with stock > 0 | 1,160 |
| Draft | 2,185 |
| Collections | 557 |
| Vendors | 85 |
| Product types | 109 (two competing naming schemes, e.g. `Driver` and `Golf > Golf Clubs > Driver`) |
| Active apparel and footwear | ~750 |
| Active approved used clubs | 240 (189 in stock) |
| Active products tagged `club-builder` | 297 |
| Active Motocaddy products | 80 |
| Active electric trolleys | 23 (only 5 in stock; 3 more are order-on-demand) |
| Active push trolleys | 11 |
| Active PowaKaddy products | **0**, though PowaKaddy appears in three menus |
| Replacement batteries | **0** (confirms audit #36) |

**Collections the new nav can map to** (handle, product count, current sort):

| Nav item | Collection | Products | Current sort |
|---|---|---|---|
| Trolleys | `golf-trolleys` | 63 | price desc |
| | `electric-trolleys` | 55 | price desc |
| | `2026-motocaddy-trolley-range` | 16 | best selling |
| | `push-golf-trolleys` | 19 | |
| | `motocaddy-golf-trolley-accessories` | 31 | |
| Clubs | `golf-clubs` | 2,048 | |
| | `custom-fitted-golf-clubs` | 249 | |
| | `iron-sets` | 195 | manual |
| | `srixon-golf-clubs` | 55 | |
| | `wilson-golf-clubs` | 66 | |
| | `mizuno-golf-clubs` | 83 | |
| Bags | `golf-bags` | 469 | |
| Balls | `golf-balls` | 291 | |
| Accessories | `golf-accessories` | 275 | |
| GPS & rangefinders | `gps-rangefinders` | 56 | |
| Used | `approved-used-golf-clubs` | 1,136 | |
| Sale | `sale` | 356 | |
| More | `golf-clothing` | 505 | |
| More | `golf-shoes` | 79 | |

Collection counts include draft and unpublished products. The test site will show active, published products only.

## 2. Trolley data: what the filters can use today

There are no trolley spec metafields. Most attributes can still be worked out reliably from existing fields:

| Filter or spec | Source today | Status |
|---|---|---|
| Brand | `vendor` | ✅ Ready |
| GPS | "GPS" in the title, or the `GPS Electric Trolleys` tag | ✅ Derivable |
| Remote / Follow | `Remote Electric Trolleys` and `Follow Electric Trolleys` tags; "Remote" in the title | ✅ Derivable |
| Downhill control (DHC) | "DHC" in the title | ✅ Derivable |
| Battery range (18 or 36 holes) | `custom.h2_content` (e.g. "18 Hole / Lithium"); otherwise "Standard"/"Ultra"/"Ultra+" in the title | ⚠️ Derivable but inconsistent (see below) |
| Weight | none | ❌ Needs new data |
| Price | variant price | ✅ Ready |
| In stock | inventory and `availableForSale` | ⚠️ Needs care (see below) |
| Video | none: every 2026 Motocaddy product has images only | ❌ Needs assets |
| Warranty, folded size, wheel type, motor | none (product description text only) | ❌ Needs new data for the specs table and compare table |
| Free gift and bundle options | not in the product data; probably held by an app | ❌ Need the list from you |
| Member price | no data; depends on the discount hierarchy decision | ❌ Owner decision |

**Battery as a variant selector.** Each battery option is a separate product with a single variant. For example, "M5" is four products: M5 GPS Standard, M5 GPS Ultra, M5 GPS DHC Standard and M5 GPS DHC Ultra. The test site will group them into model families (M5 GPS and M5 GPS DHC), each with a Standard/Ultra selector, by normalising the titles. The live catalogue stays as it is.

**Data issues found:**
- **S1 DHC Standard:** `h2_content` says "36 Hole", but Standard is 18 holes everywhere else.
- **M7 and ME Remote:** `h2_content` is missing.
- **SE Ultra:** inventory −1 and `availableForSale: false`, but tagged "order on demand".
- **NAVEE models:** stock 0 or −1 but `availableForSale: true`, because order-on-demand allows overselling.

The test site will treat order-on-demand as its own state, "Available to order", so that "In stock" stays truthful. Sold-out products sort last.

**Product-level reviews** exist as Judge.me rating metafields, but volumes are low (1 to 6 reviews per trolley). That's enough to show real per-product stars. Store-level ratings will never be shown next to a product title.

## 3. Club data

- **Taxonomy metafields are populated** for club type, shaft flex and hand side (Shopify standard taxonomy). Useful for filters.
  - **Issue:** hand side has duplicate values ("Right" and "Right Handed").
- **Variant option names are inconsistent:**
  - Flex is called `Flex Options`, `Shaft flex` or `Shaft Flex`.
  - Shaft is called `Shaft` or `Shaft Options`.
  - Lofts are written as `9°` or `9.0`.
  - The test site will normalise these through a mapping table.
- **Custom versus standard:**
  - The `club-builder` tag (297 active products) marks builder-eligible models.
  - The "Custom" product types (21 active) mark custom builds.
  - The `custom.custom` boolean exists but can't be filtered on.
  - The test site will use the `club-builder` tag as its rule for "can be built custom". Please confirm that's right.
- **Approved used clubs** are single-variant products with a structured summary in `h2_content` (e.g. "Mens / Right Handed / Graphite"). That's good enough for filters.
- **Leading brands:** Srixon has 148 active products, Mizuno 196, and Wilson/Wilson Staff 116 (two vendor spellings to merge).

## 4. Membership data

There are three membership products in Shopify, under three naming schemes:

| Product | Handle | Status | Price |
|---|---|---|---|
| Evolution Golf Membership | `clubhouse-membership` | Unlisted, with a subscription selling plan (Appstle) | £36.00 |
| Clubhouse Membership 2024 | `clubhouse-membership-2024` | Draft | £19.95 |
| Evolution Golf Monthly Membership: "Club Access", "Evolution Pro", "Evolution Pro Annual" | `membership` | Draft | £1.99 / £7.99 / £89.99 |

I couldn't get reliable member counts by customer tag: the count query returned its 10,000 cap for every tag, so the figures are meaningless. I need the exact Appstle tag names from you.

## 5. Delivery: what Shopify actually charges

From the delivery profiles. These rates are what checkout really applies today; they differ from the site copy (audit #6).

**Mainland UK:**

| Service | Condition | Price |
|---|---|---|
| Standard, 3–5 working days | Under £50 | £3.95 |
| Standard, 3–5 working days | £50 and over | Free |
| Next working day (order by 1pm) | Under £500 | £7.95 |
| Next working day (order by 1pm) | £500 and over | Free |
| Saturday | Any order | £9.95 |

**Other zones:**

| Zone | Condition | Price |
|---|---|---|
| Northern Ireland | Under £200 | £9.95 |
| Northern Ireland | £200 and over | Free |
| Isle of Man | Any order | £29.95 |

Shopify has **no member-specific delivery rates** at all. The £30 and £10 member thresholds on the current site must come from discounts or an app. Your owner decision on delivery thresholds decides what the single delivery table on the test site shows.

Free next-day delivery over £500 is a strong trolley selling point that the current site under-sells. I'll make it part of the trolley delivery promise unless you say otherwise.

## 6. Content

- **Blog:** 41 articles in `golf-blogs`. The latest is dated 7 September 2026. Every byline is "Evolution Golf" (audit #29 wants named authors), and recent topics lean towards apparel (waterproofs, trousers, gloves).
- **Two fitting pages:** `custom-fitting` and `custom-fitting-ringwood` (audit #14).
- **About Us** exists but is **unpublished** (audit #27).
- **Location pages are still published** for Salisbury Golf Centre, Ferndown GC, Royal Winchester GC, Lee-on-the-Solent GC and Wareham GC. These matter for the "Ringwood centre" positioning (see question 9).

## 7. What I couldn't access

| Source | Why | What I need |
|---|---|---|
| Trustpilot rating and reviews | Not in Shopify | The Trustpilot business URL. Until then the test site shows a clearly labelled placeholder rating. |
| Acuity Scheduling | Not in Shopify | Session types and durations, opening hours, and whether there are weekend slots. Booking will be a non-functional mockup. |
| Appstle configuration | App admin isn't exposed to the API | Customer tag names and current member perks |
| Free-gift and bundle app | Not in product data | Which gifts and bundles apply to which trolleys |
| Klarna / Clearpay | External | Wording will be marked "to be confirmed with provider" |
| Members portal | External site | Screenshots of the join and login flow, so the mockup matches |
| Lifestyle photography | Doesn't exist yet | Labelled placeholders, as briefed |

---

## 8. Proposed sitemap

```
/                              Homepage
/trolleys                      Trolley hub + comparator + filtered grid
/trolleys/[model-family]       Trolley product (battery = variant selector)
/clubs                         Clubs hub (by type, by brand; standard/custom/fitting choice)
/clubs/[type]                  Drivers, Fairways, Hybrids, Irons, Wedges, Putters, Package sets
/clubs/brand/[brand]           Wilson, Srixon, Mizuno first; then the others
/clubs/build                   Custom club builder (step 0: custom or standard?)
/products/[handle]             Standard product page (clubs, bags, balls, accessories…)
/custom-fitting                Single fitting page (replaces both current pages)
/membership                    Membership (one name, two tiers)
/bags, /balls, /accessories, /gps-rangefinders
/used                          Approved used clubs
/trade-in
/sale
/more/clothing-and-shoes       Apparel and footwear, secondary position
/search                        Results page (predictive search lives in the header)
/basket  →  /checkout          Simulated; ends on "Test site — checkout disabled"
/about, /contact, /delivery-and-returns, /help
/guides, /guides/[article]     Blog listing and articles (named author, in-stock product links)
```

## 9. Proposed navigation (one challenge to the draft)

**Primary nav:** Trolleys · Clubs · Custom Fitting · Membership · Bags · Balls & Accessories · Used & Trade-in · Sale

**My challenge: GPS and rangefinders have nowhere to go** in the draft nav. I propose putting them under "Balls & Accessories" (renamed "Balls, GPS & Accessories" if the label fits at 1440px), along with gloves.

**"More"** (last item on desktop, bottom of the mobile menu) holds Clothing & Shoes, Gifts and All brands.

**Mobile:** Custom Fitting and Membership appear as two large cards at the top of the menu, above the category list, so the two services aren't lost in a list of products.

**Utility bar:**
- Trustpilot rating (one config value)
- "Free fitting in Ringwood — Book"
- Delivery promise
- Phone number

## 10. Page list

Pages in the order you asked for, each with the audit findings it targets:

| # | Page | Audit findings |
|---|---|---|
| 1 | Homepage | 8, 9, 16, 23, 33, 34 |
| 2 | Trolley collection | 10, 11, 22 |
| 3 | Trolley product | 1, 17, 18, 31, 35 |
| 4 | Club collection and product | 19, 21 |
| 5 | Custom club builder | 19, 20, 21 |
| 6 | Custom fitting | 2, 14, 15 |
| 7 | Membership | 3, 5, 6, 7, 25, 26 |
| 8 | Basket and checkout entry | 4, 16, 17, 30 |
| 9 | About, Contact, Delivery & Returns, Help, Guides | 6, 27, 28, 29 |
| 10 | Search | 12, 13, 36 |

The cookie banner, the single facts config and the design system apply to every page (32, 33, 34). Audit #24, the members portal, is out of scope for this site; I'll only design the hand-off.

---

## 11. Proposed tech stack

**Phase 2 mockups:**
- Static HTML/CSS in `/mockups`, one shared design-system stylesheet with tokens, and real product data from a JSON snapshot of the read-only API results.
- PNG screenshots at 390px and 1440px, exported automatically with Playwright.

**Phase 3 test site:**

| Concern | Choice | Why |
|---|---|---|
| Framework | **Astro 5** with server rendering on Node (`@astrojs/node`) | Ships mostly static HTML, which suits the Lighthouse targets. Small interactive parts (basket, filters, search, comparator) are added only where needed. Reuses the mockups' HTML and CSS almost unchanged. |
| Shopify data | **Admin API custom app with read-only scopes:** `read_products`, `read_inventory`, `read_content`, `read_metaobjects` | The Storefront API can't see inventory quantities or unexposed metafields, both of which are needed for "in stock" and battery grouping. A read-only custom app can't write anything even if the code tried. |
| Caching | Products pulled from Shopify into an in-memory snapshot, refreshed every 15 minutes, plus a manual refresh endpoint | Fast pages, few API calls, and nothing breaks if Shopify is slow |
| Facts | `src/config/facts.ts`: Trustpilot rating, delivery table, returns, lead times, membership name, price and perks | One source of truth (content rules) |
| Search | Our own index (MiniSearch): fuzzy matching, field boosts, and model-family and product-type boosting; hidden and draft products excluded | Meets the three search tests in the brief, including the "motocady" misspelling, without a paid app |
| Basket | Kept in the browser (`localStorage`) | No Shopify cart, checkout or customer records are ever created |
| Hosting | Railway, one service | Basic auth on every route, `X-Robots-Tag: noindex, nofollow` plus meta robots, and a `robots.txt` that disallows everything. Secrets live only in Railway environment variables. |
| Repo | This repo: `/mockups`, `/site`, `/docs`, and a README covering local setup, environment variables and Railway deployment | |

---

## 12. Open questions

**Owner decisions.** Any you leave blank will appear as clearly marked placeholders.

1. **Membership programme name:** pick one from Evolution Club, Evolution Golf Membership, Evolution Pro, Clubhouse, or a new name. Which tier names go with it?
2. **Delivery thresholds** (guest / free member / annual member). Shopify currently only knows guest rates: free standard delivery at £50 and free next day at £500.
3. **Returns wording**, including the "4 per year" member limit.
4. **Discount hierarchy:** (a), (b) or (c).
5. **Weekend fitting slots:** yes or no.
6. **Custom-build lead time:** 2–3 weeks or 7–14 working days?
7. **Authorised dealer status** you can claim (Motocaddy, Srixon, Wilson, Mizuno…).

**Data and scope:**

8. **Prize draw:** the new brief drops the free-entry route that the old brief and the audit (#3, Critical) required. Should the mockup still show a free-entry route and a T&Cs link?
9. **Other locations:** are Salisbury, Ferndown, Royal Winchester, Lee-on-the-Solent and Wareham still live fitting or retail locations, or should the design talk about Ringwood only?
10. **PowaKaddy:** no active products, but it appears in three menus. Leave it out of the new nav?
11. **Custom-buildable rule:** is the `club-builder` tag the right signal for "can be built custom online"?
12. **Read-only API token for Phase 3:** please create a Shopify custom app with *only* the four read scopes above and give me the Admin API token when we reach Phase 3. It goes straight into Railway environment variables and never into the repo. The connector used for this discovery has write permissions, so the test site won't use it.
13. **Railway:** new project or an existing one? Do you have a preferred basic-auth username and password, or should I generate them?
14. **Trustpilot:** the business URL, and whether to show the live rating or a fixed figure you supply.

---

## 13. Next step once approved

Phase 2, batch 1:
- The design system: tokens, type scale, spacing, buttons, cards, badges, banners, form fields and modals.
- The homepage at 390px, then 1440px, with PNG exports and a note on which audit findings it solves.

Then I stop for your review.
