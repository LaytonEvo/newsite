# Design review, round 1 (23 Nov 2026)

Two independent reviewers (subagents) looked at the Showroom+ v2 homepage, the electric trolley collection and the M5 GPS DHC product page, at 320, 390, 768 and 1440px. One reviewed UX and accessibility (WCAG 2.2 AA, with Playwright and axe-core). The other reviewed conversion. They were given the screenshots and code, not the designer's conclusions.

**Status key**
- **Fixed:** changed in the templates, so it applies to both the mockups and the test site.
- **Owner:** needs a business decision or data.
- **Next:** agreed, scheduled for a later round.
- **Declined:** not adopted, with the reason given.

## Fixed in this round

| # | Finding | Source | Change |
|---|---|---|---|
| 1 | Cookie banner missing on the collection and product pages (an owner rule) | CRO | Banner on every page; the choice is remembered |
| 2 | Finder arrived pre-answered, ignored two of its four answers, and said "three questions" | UX 4, CRO 1 | Starts empty. Every answer narrows the grid. In-stock models rank first. Copy says four |
| 3 | Filter order buried price and stock | CRO 9 | Availability, Price, Features, Battery, Brand |
| 4 | Weight filter offered "Not listed (6)" and showed internal copy | UX 12, CRO 9 | Weight filter and "Lightest" sort hidden until every model has a weight |
| 5 | No returns line next to Add to basket | UX 5, CRO 3 | Returns line added, wording marked as pending (see Owner) |
| 6 | Delivery promise said "free next-day" under £500 | CRO 7 | Line now depends on price: "£7.95, free over £500" on the SE and NX. The countdown only shows when dispatch really is today |
| 7 | Battery and gift choices: focus invisible, and the selected state didn't follow the choice | UX 1 | Selected state follows `:checked`, focus ring on the card, scroll padding clears the phone sticky bar, and the sticky bar is a named region |
| 8 | "Click and collect in Ringwood" was a second main button, reading as local | UX 2 | Now a quiet text option: "Or click and collect from our Hampshire showroom". Collection is also a delivery option at checkout |
| 9 | Footer scrolled sideways at 320px (WCAG 1.4.10) | UX 10 | Footer columns can shrink |
| 10 | The compare table scrolled but keyboard users couldn't reach it (axe: serious) | UX 14 | Focusable region with a label |
| 11 | Product cards had no headings; all 12 checkboxes were just "Compare" | UX 13 | Name is an h3; checkbox reads "Compare M5 GPS DHC" and so on |
| 12 | "Every Motocaddy comes with a choice of battery" was untrue: 3 models are Ultra-only | UX | "Most Motocaddy models…" |
| 13 | Members pill and "Join free" linked to `#members`, which is dead off the homepage | UX 6 | Both go to the homepage members section on the test site |
| 14 | Phone menu was `<a href="#">` | UX 6 | Real button with `aria-expanded` and a working menu |
| 15 | Out-of-stock variant: "email me" wasn't a control | UX 3 | Main button becomes "Email me when it's back" (simulated). Click and collect hides |
| 16 | Placeholder reviews were tagged "Ultra battery", the variant you can't buy | UX 3 | Tag removed |

## Owner decisions needed

- **Returns policy for every customer.** Today the only written returns wording is the Annual perk ("4 per year"), which implies everyone else pays (UX 5, CRO 3).
- **Dispatch time for "Available to order".** NAVEE, Powerbug and several Motocaddy variants need a lead time per supplier (UX 3, CRO 2).
- **Members' messaging.**
  - The ribbon says "Annual members get free delivery from £10. Join free" (free members get £30).
  - The 10% offer is described two ways.
  - The product page shows £872.10 without the £36 fee.

  CRO suggests one net-of-fee line in the buy box, with joining as an unticked basket add-on (UX 7, CRO 4).
- **Gift list per trolley,** with name, image and "worth £X" (CRO 5).
- **Bundle price, and whether the bundle becomes an option in the buy box** (CRO 5).
- **"A members' club that pays for itself".** This is only true for Annual members on one order over £360. CRO suggests "can pay for itself on one big order" (CRO 6).
- **Pay-in-3 limits.** Klarna and Clearpay caps may exclude the M7, M-Tech, NAVEE 3X and bundle (CRO 13).
- **Trustpilot figure and position.** The reviewer suggests moving it up to the hero and ribbon to read as national (UX 2, CRO 6).

## Next rounds (agreed)

- **Homepage hero.**
  - One filled "Shop electric trolleys" button with "from £479".
  - A one-line trust strip.
  - The trolley image in the phone first screen.
  - "Buy" either deep-links to the buy box or is renamed (CRO 6, 11).
- **Homepage compare on phones.** Make it a sideways table with a sticky feature column; "Buy" at least 44px (UX 8).
- **Fitting.** Fold the "Near Ringwood" fitting band into the builder section as one line (UX 2).
- **Collection, phones.** Collapse the finder to a card that opens a sheet; products currently start 1.6 screens down (UX 4).
- **Filter sheet.**
  - Sort inside the sheet.
  - Chips for applied filters.
  - Focus trap.
  - A "Hide out of stock" toggle (UX 12).
- **Out of stock.** A "Similar and in stock" row on out-of-stock product pages; the hero and membership examples check stock (CRO 2).
- **"From" price.** Work it out across in-stock variants, e.g. M1 "From £729 · In stock" where only the £749 Ultra is in stock (CRO 8).
- **Desktop buy box.** Add to basket sits at 963px on a 900px screen, so move the gift choice below it (UX 9).
- **Builder.**
  - Deep-link club-type tiles (`?type=irons`).
  - Make the inert spec chips plain text (UX 11).
- **Cross-sell.** A next-purchase module on order confirmation: next month's 10%, build your irons (CRO 10).
- **Phone announcement bar.** One line (CRO 12).
- **Tap targets.** A 44px minimum on footer, breadcrumb and inline links (UX 15).

## A/B tests proposed (CRO)

Main measures are add-to-basket and checkout-start rates, with revenue per visitor as a guardrail. Run tests one after another.

1. **Membership offer placement:** the current buy-box link, against a net-of-fee line plus a basket add-on, against the basket add-on only.
2. **Finder:** empty with a budget question, against the current version.
3. **Bundle:** an option in the buy box, against the current link card.
4. **Homepage hero:** one trolley button, against three equal links.
5. **Delivery promise:** a delivery date, against a countdown.

The analytics event list is in the CRO report; it will be wired up when the test site gets analytics (only after consent).

## Keep (both reviewers)

- **Battery option cards** with their own price and stock, and a real member price.
- **Trust stack** under Add to basket, with precise warranty terms.
- **Worked membership example:** £969 − £96.90 + £36 = £60.90 better off.
- **Product-only reviews,** with Trustpilot kept separate.
- **Phone sticky bar** naming the variant, price and stock.
- **"Out-of-stock models always show last".**
- **Accessibility basics:** skip link, fieldsets and legends, no contrast failures.
