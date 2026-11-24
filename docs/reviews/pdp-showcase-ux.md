# Product page showcase: UX review (commit a9e7af1)

Reviewed 24 Nov 2026 on staging (`site-production-fd1f32db.up.railway.app`). Findings only; no templates were changed.

**Pages:**
- `/trolleys/motocaddy-m5-gps-dhc`: full showcase.
- `/trolleys/motocaddy-m1`: typical model, no feature rows.
- `/trolleys/navee-birdie-3x`: single battery, not Motocaddy.
- `/trolleys/motocaddy-m1-dhc`: out of stock.

**Widths:** 1440×900, 1024×900 (plus 1024×768 for the fold check) and 390×844.

**Method:** Playwright with section measurements, axe 4.x (WCAG 2.2 AA plus best practice), keyboard runs of every `<details>`, accessibility-tree snapshots, sticky-bar and gallery-pin checks at set scroll positions, and full-page screenshots taken after scrolling so lazy images load. Screenshots are in the session scratchpad under `pdp5/` and are not in the repo.

## Verdict

The structure is right, and the M5 GPS DHC on desktop looks close to the intended premium page. What works:

- The gallery pin works.
- The sticky buy bar works in both directions.
- Every `<details>` is keyboard- and screen-reader-sound.
- axe is clean on all 4 pages at all 3 widths, with no sideways scroll.

But the page **degrades badly for models without photos**, which is 11 of the 12. Customers see "Photo to come" tiles and a large empty panel. The page also **repeats the same facts three to five times**, and the **spacing and bands feel patchy** in the lower half.

Fix the P1s before showing this to the owner as the standard template.

## What works (keep)

- **Gallery pin.** At 1440 the gallery sticks at 72px from scroll 300 to 600 and releases as the buy column ends; no overlap. At 1024 the 572px gallery sticks beside the 1,465px column.
- **Sticky buy bar.**
  - It shows whenever Add to basket is off screen, above or below. On phones and at 1024×768 that includes the first screen.
  - It disappears while the main button is in view.
  - The label follows the variant and stock ("Email me when it's back" when out of stock).
- **`<details>` items** (Why buy, All specifications, Read the full description, Questions):
  - native `group` and summary semantics, and no headings inside summaries;
  - Enter and Space toggle them, with a visible 2px focus ring;
  - summary rows are 44–60px tall.
  - The "Read the full description / Show less" pair hides the inactive label with `display:none`, so it is read correctly.
- **At a glance** on desktop: six facts in a 3×2 grid, very scannable.
- **Is it right for you? plus In the box**, and the NAVEE "Happy to steer it yourself?" alternative.
- **The M5 GPS DHC Fits in the boot** with the real folded photo: the strongest showcase moment on the page.

## Findings

### P1

**P1-1. Placeholder panels shown to customers on every model without photos.**
- **Where:**
  - Gallery thumbnails on the M1, NAVEE Birdie 3X and M1 DHC: one photo followed by five striped tiles ("Photo to come: Folded / In a car boot / On the course / Handle / Wheels").
  - Fits in the boot on the same pages: a 486×486 grey "Photo to come: the M1 folded, ideally in a car boot" panel at 1440, 350px tall at 390.
  - On the **M5 GPS DHC** a "Photo to come: Folded" tile shows as the 6th thumbnail, even though `m5dhc-folded` is already the 5th. That is a bug in how the placeholder list is filtered.
- **Who it hurts:** everyone shopping 11 of the 12 trolleys; it reads as an unfinished site.
- **Fix:**
  - Don't render `PHOTO_TODO` tiles or panels in the customer build. Keep them behind a review flag (`?review=1`) if the owner wants to see the gaps.
  - When there is no folded photo, switch Fits in the boot to a text layout: big folded size and weight across the top, then the full spec list.
  - Drop any placeholder whose subject already exists in `gallery`.

**P1-2. The same facts repeat across four sections, and specs are split three ways.**
- **Where:**
  - On the M1, "Speed settings", "Distance control" and "Display" appear in At a glance *and* again as Fits in the boot key-spec rows.
  - On the NAVEE, all 4 key-spec rows (Follow mode, Remote control, Battery, Motors) repeat At a glance word for word.
  - Warranty appears in the buy-column line, the "Warranty handled by us" item, the FAQ "What warranty does it have?", and All specifications.
  - The battery help sentence appears in the buy column and again in the FAQ.
  - Compare repeats battery, weight and features again.
  - Specs are split between At a glance, the key-spec rows and the All specifications expander. Weight appears only in the big number.
- **Fix:**
  - At a glance: keep it as the only "highlight facts" list.
  - Fits in the boot: big folded size and weight, then **one** complete spec list, open on desktop and collapsed to six rows on phones, that includes weight, folded size and warranty. Delete the 4 key-spec rows.
  - Remove the warranty line from the buy column; it is already the second "Why buy" item.
  - Have the FAQ battery answer point back to the picker ("See the battery options above") rather than repeat it, or drop that question (see P2-2).

**P1-3. Spacing and bands are uneven in the lower half.**
- **Where** (1440):
  - Section top padding is 56px for At a glance, Is it right, About and Reviews, but 112px for the feature rows and Fits in the boot. Nothing has bottom padding.
  - The mist bands add `margin-top: 72px`.
  - **Reviews** (229px, white, summary only) sits between the Compare and Questions mist bands. Its "5.0" butts directly under the heading, with a large empty area to the right.
  - The **Questions band and the green specialist band are only 24px apart**, so the page ends as three rounded cards stacked tight.
- **Fix:**
  - Use one vertical rhythm token between all sections: 96px at desktop, 64px on phones.
  - Either remove the Reviews section until there is review text (the rating is already in the buy column), or move the summary into the Questions band header.
  - Give the green band the same 96px gap, or make it full width to the edge, so it closes the page instead of stacking.

### P2

**P2-1. Feature-row text is too slight for the media, and the third row's image doesn't match its heading.**
- **Where:** M5 GPS DHC feature rows. The text is 14px and one or two lines long beside 562×492 media, so it reads like a caption. Row 2's media box is smaller (460×402) than rows 1 and 3. Row 3, "Cable-free lithium battery", shows the whole trolley with a GPS inset; no battery is visible.
- **Fix:** body text at 18–20px and about 40 characters per line, with one supporting sentence from the Motocaddy description. Use one media size for all rows. Cut row 3 until a battery photo exists, leaving two rows.

**P2-2. The FAQ asks "Which battery should I choose?" on a single-battery trolley.**
- **Where:** NAVEE Birdie 3X Questions. The answer is "It comes with the 220Wh lithium battery."
- **Fix:** omit the question when `variants.length === 1`.

**P2-3. Contradictory or empty "Why buy" items.**
- **Where:**
  - "Authorised Motocaddy dealer" opens to "…so you get the full manufacturer warranty".
  - The next item, "Warranty handled by us", says claims go "to Ringwood, not the manufacturer". Read together, these conflict.
  - "Returns" opens to just "Policy to be confirmed."
- **Fix:**
  - Reword the dealer body along the lines of "The manufacturer warranty applies in full, and we handle any claim for you" (owner to confirm).
  - Show Returns as a plain line with the dotted "awaiting decision" marker, not a disclosure, until the policy exists.

**P2-4. The M1 compare table doesn't compare the obvious alternatives.**
- **Where:** M1 Compare lists the NAVEE Birdie 3 Remote, Powerbug NX DHC and NX. "Is it right for you?" on the same page recommends the M1 DHC, which isn't in the table.
- **Fix:** when there is no `productDetail.compare`, choose same-brand neighbours by price, and always include the `trolleyFacts.consider` model. For the M1 that gives SE, M1, M1 DHC and M5 GPS.

**P2-5. Units are inconsistent.**
- **Where:** Fits in the boot shows the M5 as "650 × 470 × 410mm" and the NAVEE as "68 × 56.5 × 38.4cm".
- **Fix:** normalise to one unit in the data layer. Centimetres reads better for a car boot.

**P2-6. Phone pages are much longer.**
- **Where:** at 390 the M5 GPS DHC is 9,725px, against 7,537px before the showcase (+29%). At a glance is 646px for six facts in one column. Fits in the boot is 999px. Add to basket sits at 1,422px; the sticky bar covers that.
- **Fix:**
  - At a glance as a 2×3 grid on phones (about 300px).
  - Spec list collapsed after six rows.
  - Feature-row media at 4:3 rather than square.
  - Together this should save roughly 1,000px.

**P2-7. "Read the reviews" goes nowhere.**
- **Where:** the Reviews section on the M5 GPS DHC, M1 and M1 DHC links to `#`, which leads to /not-in-preview/.
- **Fix:** link to the product's review widget once it exists. Until then, cut the section (see P1-3).

### P3

**P3-1. Tap targets still under 44px on phones.**
- **Where:** "Join for £36" (103×24), "How it works" (107×24), the rating link (32px), and the model-name links in the compare table header (20px tall).
- **Fix:** give `.p-l` and the compare `th a` `min-height:44px; display:inline-flex; align-items:center`.

**P3-2. The page reads local.**
- **Where:** Ringwood appears 5 times: the collect line, "Warranty handled by us", "See it before you buy", the collect FAQ, and the specialist band ("Or come and see the range in Ringwood"). The specialist band's phone number is body-size text.
- **Fix:** say "our Hampshire showroom" once, in the collect line. Put the phone number in the specialist band as a large tel link, and drop the closing Ringwood sentence.

**P3-3. At 1024×768, Add to basket sits below the fold** (top at 867px). The sticky bar covers it, so this is only P3.
- **Fix:** if wanted, move "Which battery?" help below the cards into a compact one-line note.

**P3-4. The feature rows run without an introduction.** Three H2s in a row, numbered 01–03, with no section heading.
- **Fix:** add a small eyebrow such as "What it does" above the rows, or drop the numbering. Numbers imply steps.

## Cut list

- All "Photo to come" thumbnails and panels in the customer build (P1-1).
- The 4 key-spec rows in Fits in the boot (P1-2).
- The warranty line in the buy column (P1-2).
- The Reviews section, until review text exists (P1-3, P2-7).
- Feature row 3 on the M5 GPS DHC, until a battery photo exists (P2-1).
- The FAQ battery question on single-battery models (P2-2).
- The Returns disclosure, replaced by a plain pending line (P2-3).

## Checks

| Check | Result |
|---|---|
| axe, 4 pages × 1440 / 1024 / 390 | No violations, no incompletes except colour contrast |
| Sideways scroll | None at any width |
| `<details>`, keyboard | Enter and Space toggle all 11 per page; focus ring visible; native group/summary semantics; no headings in summaries |
| Gallery pin, 1440 | Sticks at 72px from scroll 300–600, releases by 900 |
| Sticky bar, 390 | Visible at scroll 0, hidden while the main button is in view, visible again after. 66px tall (M5), 85px when the label wraps; under the 120px scroll padding |
| Page height, 1440 / 390 | M5 7,579 / 9,725 · M1 5,373 / 7,667 · NAVEE 4,864 / 7,089 · M1 DHC 5,383 / 7,606 |
