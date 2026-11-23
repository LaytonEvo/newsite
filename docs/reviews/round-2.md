# Design review, round 2 (23 Nov 2026)

The same two reviewers (UX/accessibility and conversion) re-tested the working test site, run locally with the live browser script. They checked their round-1 findings, walked the full purchase path to the simulated order confirmation, and ran axe-core on every page and state.

## Round-1 findings, re-tested

| Status | UX | Conversion |
|---|---|---|
| Fixed | Focus on option cards; phone homepage compare; desktop Add to basket; 320px reflow; collection depth on phones (first card at 731px, was 1,378px); fake builder chips | Homepage hero; filter order; Buy deep link; announcement bar |
| Partly fixed in round 2, finished in round 2b/2c below | Brand reads as local; out-of-stock dead ends; filters; product-page compare table; tap targets | Finder (stock per battery); out-of-stock; delivery promise; "From" vs stock |
| Owner-blocked | Members messaging | Returns wording; membership net-of-fee line; gift values; bundle price; dispatch times; pay-in-3 limits |

## New issues from round 2, and what happened to each

### UX reviewer

| # | Finding | Severity | Done |
|---|---|---|---|
| 1 | Checkout blocked click-and-collect-only orders, because the address stayed required | High | **Fixed:** address fields hidden and not required when collecting |
| 2 | Basket quantity and Remove dropped focus to `<body>`; nothing was announced | High | **Fixed:** focus stays on the quantity, or moves to the next Remove or the heading. Changes are announced through a live region. Image links are out of the tab order |
| 3 | Gift choice sat below Add to basket, so the basket took the default | High | **Fixed:** compact gift choice back above the button. The sticky bar names the gift, and it can be changed in the basket |
| 4 | Filter sheet: focus escaped the modal | Medium | **Fixed:** the page behind is inert and Tab wraps inside the sheet (tested: still inside after 40 Tabs) |
| 5 | Sticky header hid focus when tabbing backwards (WCAG 2.4.11) | Medium | **Fixed:** `scroll-padding-top` 72px; anchored landings clear the header |
| 6 | Checkout errors: one summary only; "zzz" accepted as a postcode | Medium | **Fixed:** a message under each field linked with `aria-describedby`, specific email wording, UK postcode check |
| 7 | Finder answers acted as hidden filters | Medium | **Fixed:** answers show as removable chips; a zero-result message explains why |
| 8 | "Price, low to high" wasn't in price order | Medium | **Fixed:** price sorts are true price order, with only out-of-stock last (as the note says) |
| 9 | Builder links went to a 404 | Medium | **Fixed:** they go to "not in this preview" with the club type named |
| 10 | Leftovers: out-of-stock page showed gift, member price and finance; internal "needs adding to product data" note; breadcrumbs still 32px | Low | **Fixed** |
| 11 | Remaining small items: card link names about 170 characters long; no swipe hint on the product-page compare; "Clubs" vs "Custom clubs" | Low | **Next** |

### Conversion reviewer

| # | Finding | Impact | Done |
|---|---|---|---|
| 1 | Delivery promise ignored stock: "Free next-day" on order-in and out-of-stock items | High | **Fixed:** next-day only shows for in-stock items. "Available to order" says the dispatch time is to be confirmed, and checkout drops next-day when the basket has an order-in item |
| 2 | Checkout defaulted to the slowest free option | Medium-high | **Fixed:** next day is pre-selected when it's free |
| 3 | Free accessory invisible at the moment of decision | Medium-high | **Fixed** (same as UX 3) |
| 4 | Out-of-stock page led with things you can't use | Medium | **Fixed:** "In stock now, and similar" sits right under "Email me when it's back"; gift, member price and finance are hidden |
| 5 | On phones the order summary was below "Place order" | Medium | **Fixed:** "Total to pay" sits above the button on phones; the summary includes the gift and click and collect |
| 6 | Click-and-collect-only checkout demanded an address | Medium | **Fixed** (same as UX 1) |
| 7 | Quantity wasn't capped at stock; repeat taps added silently | Low-medium | **Fixed:** quantity capped at stock; the message says how many are in the basket |
| 8 | Sticky Add to basket jumped up the page | Low-medium | **Fixed:** the sticky button turns into "Added ✓ View basket" in place |
| 9 | Cookie banner: Reject looked weaker than Accept (ICO) | Low (compliance) | **Fixed:** equal styling |
| 10 | Countdown used device time | Low | **Fixed:** uses Europe/London |
| — | Product-page compare still showed "M1 From £729 · In stock" | — | **Fixed:** price follows stock everywhere |
| — | Order confirmation had no recap or next steps | — | **Fixed:** order recap plus links to the club builder and membership |
| — | Basket had no risk reducers or way back | — | **Fixed:** returns (pending), price match, payment methods, "Continue shopping" |

### Also fixed

- **Desktop sticky bar.** On laptops where Add to basket is below the fold (1280×800 and 1024×768), the bar appears only while the main button is off screen. At 1440×900 the button is in the first screen.

## Still open

- **Owner decisions:**
  - returns policy for every customer
  - members' wording: the £10 and £30 thresholds, the 10% described two ways, net-of-fee price on the product page
  - dispatch times
  - gift list and values
  - bundle price
  - Trustpilot figure
  - pay-in-3 limits
- **Next rounds:**
  - "Notify me" on out-of-stock collection cards
  - a battery-choice hint (18 or 36 holes)
  - a working compare tray
  - delivery dates instead of a countdown
  - remote-areas delivery note
  - suggested add-ons for "Add £21 for free next-day"
  - a separate delivery method per item in a mixed basket
  - postcode lookup
