# Trolley product page: conversion and premium review

Pages reviewed on the local build (same as staging, commit 082ac56), at 390px and 1440px:
- /trolleys/motocaddy-m5-gps-dhc (richest)
- /trolleys/motocaddy-m1 (typical; Standard out of stock, Ultra in stock)
- /trolleys/navee-birdie-3x (available to order)
- /trolleys/powerbug-nx-dhc (available to order)
- /trolleys/motocaddy-m5-gps (out of stock)

Screenshots were taken with puppeteer-core and Chrome (Playwright wasn't installed in Python): scratchpad/r2/shots5/.

## Verdicts

### (a) Is it the right trolley? Partly, and only on the M5 GPS DHC.

What works:
- The battery cards show price and stock per variant, with "email me" on the out-of-stock one.
- The compare table puts "This trolley" against three siblings, with price, features, battery, weight and status.
- The specs table on the M5 GPS DHC has weight, folded size, motor, distance control and warranty.

What's missing or weak:
- **Most pages are thin.** Every model except the M5 GPS DHC uses the auto template:
  - one image plus a "Video" placeholder
  - no intro line and no highlights
  - a four-row spec table (battery, features, weight, warranty)
  - the M1's feature row reads only "Essential controls"

  The deciding facts sit inside the manufacturer prose under "Read the full description", not in the specs. For the M1 these are 9 speed settings, 45-yard distance control, Cartlock PIN, compact fold, USB port and adjustable handle. For the NAVEE it's the folded size 68 × 56.5 × 38.4cm and 25% inclines. For the Powerbug it's 18 speed settings and 50-yard distance control.
- **No "What's in the box".** NAVEE and Powerbug have one buried in the description (for example "36-Hole Lithium Battery & Charger … Free Umbrella Holder"). Motocaddy pages don't say whether the battery and charger are included.
- **No help choosing a battery.** "Up to 18 holes / Up to 36 holes" is all there is. Nothing on how course, hills or winter play affect range.
- **No course-fit or "who it suits" guidance.** Downhill control is explained only in the manufacturer's words, not in buyer terms (hilly course → DHC).
- **The compare table is same-brand only.** On the M1 all three alternatives are out of stock. It has no rows for folded size, distance control or warranty, and several cells say "Not listed".
- **No folded size or weight for some models.** M1 has neither folded size nor a weight-with-battery note. M7, M‑Tech, ME, SE and NX show weight "Not listed".

### (b) Buy from Evolution rather than Motocaddy, Amazon or a big retailer? No. The page doesn't yet make the case.

What's there:
- three plain lines under the button (delivery, warranty terms, returns pending · price match link)
- an Annual member price
- a free gift (list pending)
- click and collect in Ringwood
- product reviews (placeholders)
- phone and email at the bottom

All of these are generic. Every big retailer has next-day delivery, a price match and finance. Nothing on the page says what a specialist dealer does that Amazon doesn't:
- **"Authorised Motocaddy dealer" (pending)** appears only in the footer small print.
- **Warranty "handling" isn't addressed.** The page lists the manufacturer's terms but not who you contact, whether Evolution handles the claim, or UK repairs and spares.
- **No expertise.** There is no named person, no "we've used / set up / tested", and no showroom demo on the product page. The declutter pass removed "Near Ringwood? See it in the showroom".
- **The returns policy is still pending.** For a £969 item that is the biggest single gap.
- **Reviews are placeholders.** Products have 0–11 reviews, and the store-wide Trustpilot can't appear on product pages by owner rule.
- **The member price is a real reason to buy here**, but it's shown as a muted line and not explained net of the fee (owner-pending).

## Premium presentation

**Imagery is the weakest part.**
- The M5 GPS DHC has 5 cutouts. Every other page has one cutout, often a Motocaddy composite with a round inset of the screen.
- There is no on-course, in-hand, folded-in-a-boot or scale photography.
- "Video" is a placeholder on every page.
- On a £749–£1,299 product a single studio cutout on a grey card reads as a catalogue listing.

**The hierarchy of the buy box is good.**
- Brand · year, then H1, then stars, then battery cards, then a big price, then a muted member and finance block, then the gift, then one filled button, then three assurance lines.
- On desktop the button sits at 771px, in the first screen.
- On phones the sticky bar now shows price and button from the first screen.

**Below the buy box the page loses quality.**
- "About the …" is raw manufacturer copy with the manufacturer's own bolding ("**crystal-clear 3.5" touchscreen display**").
- Its tone is promotional ("Bursting with game-enhancing technology", "sleek, premium finish").
- On desktop it runs at half width beside an empty right column.
- It contains superlatives the owner has banned:
  - M1: "the world's easiest-to-use compact electric trolley"
  - Powerbug: "Industry-leading warranty", "ultimate stability"
  - NAVEE: "premium follow technology"

  Quoting them unattributed puts them in Evolution's voice.

**Other sections.**
- The reviews section shows dotted placeholder cards. That's honest for now, but on launch, products with no reviews should show nothing rather than an empty frame.
- "Questions about this trolley?" is one line of contact details. It's the place a specialist should show itself, and right now it reads like a footer.

**Typography and density are clean and consistent** after the declutter pass. The page feels like a tidy generic store, not yet a considered specialist. The gap is content (photos, guidance, people), not layout.

## Prioritised changes

### P1

1. **Remove or attribute manufacturer superlatives in "About the …"** (About section, every page).
   - **What:** label the block "From Motocaddy" (or NAVEE or Powerbug) and strip the banned claims at import, or replace them with our own short summary.
   - **Why:** it is an owner-rule breach in Evolution's voice, and promotional prose undercuts the calm specialist tone.
   - **Effort:** S. **Owner input:** confirm attribution wording.
2. **Build the specs table from the product's real facts** (Specifications, all auto-detail pages).
   - **What:** add speed settings, distance control, folded size, handle adjustment and USB. Add "What's in the box" as a spec row or a short list beside it. Source it from the description text already held (the NAVEE and Powerbug "What's Included" lists). For Motocaddy, confirm battery and charger are included.
   - **Why:** the deciding facts are currently hidden in a collapsed description, and buyers compare on specs.
   - **Effort:** M (data entry per model). **Owner input:** confirm box contents for Motocaddy models.
3. **Add a "Why buy it from us" block of three or four facts, directly under the three assurance lines** (buy box).
   - **What:** each fact appears once, and only facts the owner confirms. For example:
     - "Authorised Motocaddy dealer" (pending)
     - "Warranty claims handled by us, not passed to the manufacturer" (pending, only if true)
     - "See and try it at our Ringwood showroom, Mon–Fri" (fact)
     - the returns policy once supplied
   - **Why:** this is the missing answer to "why not Amazon or Motocaddy direct" on a £479–£1,299 item.
   - **Effort:** S to build. **Owner input:** dealer status, warranty process, returns wording.
4. **Publish the returns policy for all customers** (assurance line).
   - **Why:** it is the biggest risk reducer missing on an expensive purchase, and it is already flagged pending.
   - **Effort:** S. **Owner input:** policy.
5. **Imagery: a 5–8 image gallery for every trolley** (gallery).
   - **What:** studio angles, folded, folded in a car boot, handle and screen close-up, battery, and one on-course shot. Turn the "Video" thumbnail into the real manufacturer video, or remove it until there is one.
   - **Why:** it is the main premium signal and answers "will it fit my car" and "how big is it".
   - **Effort:** M. **Owner input/assets:** Motocaddy, NAVEE and Powerbug press assets, plus our own boot and showroom photos.

### P2

6. **"Which battery?" helper** (under the battery cards).
   - **What:** one line, built only from held facts. For example: "Standard: up to 18 holes. Ultra: up to 36 holes, or extra margin for hilly courses and cold weather." The hills and cold-weather part needs owner or manufacturer confirmation; until then use only the hole counts.
   - **Why:** the battery choice is the main decision on Motocaddy pages and it changes the price by £20–£80.
   - **Effort:** S. **Owner input:** wording check.
7. **"Who it suits" line under the H1, replacing or extending the intro** (buy box).
   - **What:** one sentence from facts, for example "For hilly courses: automatic downhill control and a parking brake." Auto-detail pages currently have no intro at all.
   - **Why:** it answers "is this the right one" without leaving the buy box.
   - **Effort:** S (copy per model). **Owner input:** approve copy.
8. **Make the compare table more useful** (Compare section).
   - **What:**
     - Prefer in-stock alternatives.
     - Allow cross-brand matches by feature and price, for example Powerbug NX DHC £549 against M1 DHC.
     - Add rows for folded size, distance control and warranty.
     - Hide rows that are mostly "Not listed".
   - **Why:** on the M1 all three alternatives are out of stock, so it isn't a decision tool.
   - **Effort:** M.
9. **Turn "Questions about this trolley?" into a specialist contact block** (end of page).
   - **What:** named team member or members with a photo, hours (Mon–Fri 9–5), phone, email, and "See it in our Ringwood showroom".
   - **Why:** it gives expertise and a human presence, and moves contact from a footer-like line to a reason to trust.
   - **Effort:** S to build. **Owner input:** staff names and photo.
10. **Explain the member price** (price block).
    - **What:** one line, net of the fee, as previously agreed: "£872.10, or £60.90 better off after the £36 fee". Make Join an inline disclosure, not a link that leaves the page.
    - **Why:** a real reason to buy from us, currently muted.
    - **Effort:** S. **Owner input:** pending decision on the discount hierarchy.

### P3

11. **Hide the single-option battery fieldset** (NAVEE, Powerbug, M7 and M‑Tech have one variant). Show the battery as a spec line instead. Effort S.
12. **Restrict pay-in-3 to eligible prices** (finance line). It still shows "3 × £433.00" on the £1,299 NAVEE. Keep the "to be confirmed with provider" wording. Effort S. **Owner input:** provider limits.
13. **Fix the About layout on desktop.** Put the prose beside the highlights or specs, or run it full width at a comfortable measure, so there's no half-empty row. Effort S.
14. **Reviews.** On launch, show real Judge.me text. On products with no reviews, hide the frame and keep "Write a review" as a link. Effort S.

## Remove or move down

- **The "Video" thumbnail placeholder**, on every page until a real video exists. An empty play button lowers perceived quality.
- **The manufacturer's bolding and promotional lede** in "About". Keep the facts and move the prose below Specifications (it duplicates the specs).
- **The finance line on items over provider limits**, and the battery fieldset on single-variant models.
- **"Store-wide Trustpilot reviews are kept separate."** It's internal reasoning shown to the customer. Keep the rule and drop the sentence.
- **"Write a review" as the main action in the reviews block** on a page meant for buying. Move it to a small text link.
- **Empty review placeholder cards** once live.
