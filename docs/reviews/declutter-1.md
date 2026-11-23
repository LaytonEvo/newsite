# Declutter review (23 Nov 2026): homepage, /trolleys/, M5 GPS DHC product page

A new design reviewer, with no involvement in the earlier rounds, measured all three pages at 390 and 1440 on the test site (DOM measurements plus screenshots). Findings only. Screenshots and the raw measurements (`inv.json`) are in the session scratchpad.

## Measured today (390 / 1440)

| | Homepage | Collection | Product page |
|---|---|---|---|
| Page height | 10,119 / 7,263 | 5,453 / 3,866 | 7,129 / 4,371 |
| Links in main content | 37 / 37 | 18 / 20 | 14 / 16 |
| Distinct font sizes in main | 19 / 20 | 10 / 12 | 15 / 13 |
| Text colours in main | 13 | 7 / 6 | 7 |
| Dotted placeholders (main) | 15 | 0 / 2 | 12 |

- **Phone footer:** 1,735px, which is 32% of the collection page.
- **Six near-identical hairline greys.**
- **Ten corner radii.**
- **Three content widths at 1440.**

## Where the noise comes from

1. **Ribbon, nav and Members pill repeat each other.** Membership has four entry points, and delivery is mentioned three times in the first 700px.
2. **The homepage hero carries three propositions.** It has one button, a price, two links and a trust row, and the trolley image barely makes the first screen.
3. **Membership is explained three times in one band.** The benefits grid, the worked saving and the tier cards overlap, and "10% off" appears five times on the homepage.
4. **"Shop the hole" (2,150px on phones) repeats the build band.** It has its own "Build a driver" card.
5. **The build band has nine actions.** The stepper isn't clickable, and "Not sure of your specs?" offers five links.
6. **Nine items surround Add to basket.** Each uses a different style: badge, bold lead-in, link, dotted text or card.
7. **Showroom mentions undercut the national positioning.** The product page has four.
8. **The collection finder and filters do the same job twice.** "Show all 12 trolleys" does nothing.
9. **Product cards have eight lines in five text styles.**
10. **Up to 20 type sizes and four heading weights.** Section H2s are 58, 40 or 24px depending on the page.
11. **Inconsistent radii, greys, section spacing and container widths.**
12. **Placeholders repeat.** Dotted "10" appears five times. The gift uses four underlines. An empty 440px video panel holds a placeholder.
13. **The phone sticky bar always shows,** even alongside the in-page button.
14. **The phone footer is about 1,735px.**

## Bugs found

- **Collection toolbar under the header.** Below 1000px it sticks under the header and the Filters button is clipped (WCAG 2.4.11).
- **#9aa29e grey fails contrast (2.6:1).** It's used for the swipe hint and the compare "–" cells.
- **"36 holes (12)" filter matches every trolley.** The in-stock toggle also duplicates Availability → In stock.
- **Homepage counts don't explain themselves.** "Four of the eight 2026 models" sits beside "See all 12 electric trolleys", with no note that the 12 includes NAVEE and Powerbug.

## Ranked changes (reviewer's list)

| # | Change | Effort |
|---|---|---|
| 1 | Homepage hero: one message, one button, one text link, image in the first screen; cut the eyebrow, trust row and "Membership ›" | M |
| 2 | Header: cut the ribbon's members sentence; Members pill becomes an account icon | S |
| 3 | "One trust message, one place" rule across all three pages | S |
| 4 | Product page buy box: no icon badges or dividers, 3 plain assurance lines, click and collect folded into the delivery line, one price format, bundle moved below | M |
| 5 | Collection finder becomes a "Help me choose" toolbar button | M |
| 6 | Homepage members band: cut the benefits grid and log-in link; keep the worked saving and tier cards | M |
| 7 | "Shop the hole" becomes a teaser (illustration and tabs that link out) | M |
| 8 | Filters: cut Availability (the toggle covers it) and "36 holes"; fix the sticky toolbar offset; cut the note | S |
| 9 | Phone sticky bar only once the main button is off screen; no gift line | S |
| 10 | Product cards: 8 lines become 6 | S |
| 11 | Design tokens: 7 type styles, 3 weights, a spacing scale, 3 radii, 1 hairline grey, 2 text greys, 1 container width | L |
| 12 | Phone footer accordions; remove the empty video panel; remove the stepper; trim the build help to 2 links; one dotted placeholder per fact per page | M |

Expected heights after all changes:

| Page | 390 | 1440 |
|---|---|---|
| Homepage | about 6,000 (from 10,119) | about 4,800 (from 7,263) |
| Collection | about 4,300 | about 3,500 |
| Product page | about 5,800 | about 3,900 |

Every cut has a stated new home (see the reviewer's "nothing is lost" mapping).

## Owner decisions on the three judgement calls

- **Homepage headline:** keep both pillars ("Motocaddy trolleys. Clubs built for you."); cut everything else around it.
- **Membership entry point:** keep the green Members button; drop "Membership" from the nav; remove the members sentence from the ribbon and the hero link.
- **Shop the hole:** shrink to a teaser. The hole drawing stays, and the five stops link into the shop.

## What was done

All 12 ranked changes and the four bugs, except where noted.

### Header

- "Membership" removed from the nav; the green Members button is the single entry.
- The ribbon carries delivery only: 32px on phones, 40px on desktop.

### Homepage

- **Hero:** eyebrow and trust row cut; one lede line, "Shop electric trolleys" plus "Build your clubs ›"; trolley image in the first screen.
- **Compare:** the gift placeholder is gone from the lede; one link, "See all 12 electric trolleys, including NAVEE and Powerbug"; outlined "Buy" pills.
- **Build:**
  - stepper and spec table cut
  - two links: "How custom builds work" and "Not sure of your specs? Ask our team"
  - lead time shown once
- **Members:** benefits grid and log-in link cut; one button ("Join Annual for £36") and "Join free ›"; the worked saving and two tier cards sit side by side.
- **Shop the hole:** now a teaser (drawing plus 5 stop links); the product cards and the duplicate builder card are gone.
- **Trustpilot:** one line at the end, with no star.
- **Footer:** link columns collapse on phones.

### Collection

- **Head:** trust row cut; the lede explains the battery choice.
- **Finder:** now a "Help me choose" button in the toolbar that opens the questions above the grid.
- **Filters:**
  - Availability is handled by the "In stock only" switch (with a removable chip)
  - "36 holes" filter cut; "18-hole battery option" sits under Features
- **Toolbar:** the note is cut; the toolbar sticks below the header on phones (bug fixed).
- **Cards:** brand only; one muted spec line ("18 or 36 holes · 11.2kg"); "In stock" with no battery clause.
- **Help:** a single row replaces the two "after" boxes.

### Product page

- **Price and members:** one price format (£969); members line without the badge, in muted text; no divider rules.
- **Gift:** a single segmented control with one "(list TBC)" placeholder.
- **Under the button:** three plain lines. Delivery includes an inline "or click and collect"; then warranty; then returns plus the price match link. Returns and price match are hidden on out-of-stock pages.
- **Bundle:** moved below the highlights as "Complete the set".
- **Video:** the empty video panel is cut; the gallery's video thumbnail stays.
- **Help:** "Questions about this trolley?" is now contact details only; "Complete your kit" moved to the basket.
- **Sticky bar:** appears only after you scroll past the main button (phone and desktop), and is two lines.

### System

- one hairline grey and two text greys
- the low-contrast #9aa29e removed
- weight 800 dropped
- three corner radii (12, 20 and pill)
- one container width (1,280px)
- one heading scale for H1 and section H2 across all pages

## Result (390 / 1440)

| | Before | After |
|---|---|---|
| Homepage height | 10,119 / 7,263 | 6,494 / 5,585 |
| Collection height | 5,453 / 3,866 | 3,892 / 3,329 |
| Product page height | 7,129 / 4,371 | 5,830 / 3,905 |
| Homepage links in main | 37 | 29 |
| Homepage font sizes in main | 19 | 11 |
| Homepage dotted placeholders in main | 15 | 9 |

axe is clean on every page at 320, 390 and 1440. There is no sideways scrolling, and the earlier journey tests still pass.
