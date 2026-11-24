# Trolley product page: adopting the "buy panel right, showcase below" pattern

Reviewed 24 Nov 2026. Findings only. No templates or styles were changed.

The reference is https://simbasleep.com/products/camden-bed-olive. It was captured with Playwright at 1440×900 and 390×844, read-only: no clicks and no form input. The screenshots are in the session scratchpad (`simba/simba-*.png`), are for analysis only, and are not in the repo.

In the headless browser, the gallery photos and two of the feature images did not render. So imagery is described from the page's DOM (element sizes and types), not from the pictures themselves.

The aim is to take the *pattern*, not Simba's brand: none of its copy, imagery, colours or promotional devices.

## 0. What Simba actually does

Measured on the live page, 24 Nov 2026.

1. **The gallery sticks, not the buy panel.**
   - On desktop the gallery sits on the left, at about 3/5 of the width: one large image, then the rest in pairs. It is `position: sticky; top: 44px`.
   - The right-hand buy column is static and **2,291px tall**. It scrolls past the pinned gallery, and then both move on.
   - So the owner's "right hand menu" is a long, scrolling buy column, not a short sticky panel.
2. **A fixed buy bar appears as soon as you scroll,** on desktop and on phones. It shows the total price, Add to cart, and "Delivery from £30".
   - On desktop it sits bottom-right, under the buy column. On phones it spans the full width.
   - It stays for the rest of the page.
3. **The buy column contains, in order:**
   - rating;
   - product name and range line;
   - promotional price block (sale badge, was/now price, monthly price);
   - a "Delivery from £30" panel;
   - Add to cart (with the total);
   - size, colour and storage pickers;
   - a second Add to cart;
   - a "bundle" box (bed plus mattress, with the combined total);
   - **five reassurance accordions**: delivery, trial, guarantee, old-bed removal, finance.

   Delivery, returns and guarantee all live here, as one-line accordion headings whose detail opens on demand.
4. **Showcase below the hero.** There are three alternating media-and-text rows, roughly 55:45, with media about 790×700 that runs to the page edge. Each row has a small uppercase kicker, a short heading and two or three short paragraphs.
   - Two of the three media slots are **autoplaying, muted, looping videos with no controls**. The third is a photo.
   - Before the rows comes a **text-only "Highlights" list**: six bold lead-ins, each with one line of text, in two columns on desktop and no images.
5. **Dimensions get their own section:** a line drawing with plain-language text explaining the delivery box sizes and access routes. Behind a "See spec" expander sit the full specs: origin, sizes, a dimensions table, and delivery, returns and guarantee details again.
6. **Then:**
   - a grey brand-story band (a sustainability carousel);
   - a cross-sell of three related beds, as tabbed cards with "Compare" links (no comparison table);
   - reviews: a brand-wide headline count, three review cards and an AI-written summary;
   - a grey **FAQ band** with four accordion questions (assembly, what's included, getting it into the home, guarantee);
   - a newsletter prize-draw block;
   - the footer.
7. **Rhythm:** mostly white, with two grey bands (brand story and FAQ). There is a lot of space between rows, and below the hero text and imagery are about even. The premium feel comes from large media and short copy blocks. The promotional layer works against it: a sale bar, a "20% off" badge over the gallery, and a floating "Qualify for extra discount?" pill.
8. **Phones:**
   - The gallery becomes a swipe carousel with dots and a zoom button. Name, rating and price come next.
   - The fixed buy bar appears within the first scroll. The pickers, bundle box and accordions follow.
   - Each feature row stacks media above text.
   - Review cards and related-bed cards scroll sideways. The FAQ is full width.
   - The page is 12,933px long at 390, against 11,109px at 1440.

**Not to copy, under our rules:** the sale bar and discount badges; the floating discount pill; brand-wide review counts (we show per-product ratings only); the AI review summary; the newsletter prize draw on a product page; autoplay video without controls.

## 1. Our page today, measured (unchanged)

Measured at 1440×900 and 390×844, with the sticky bar hidden for full-page screenshots.

### M5 GPS DHC

**Desktop layout (1440):**
- The gallery is on the left and is sticky (`.v-gallery { position: sticky; top: 72px }`).
- The buy box is on the right and scrolls. It is **1,133px tall**, taller than the 900px viewport.
- Add to basket sits at 841–897px, just inside the first screen.
- "Why buy it from Evolution Golf" (251px) is inside the buy box.

**Below the fold:** 9 sections, all in the same contained column with the same heading-then-content rhythm:

1. Is it right for you? + In the box
2. About (manufacturer copy)
3. Highlights (4 cut-out images on mist tiles)
4. Complete the set
5. Specifications
6. Compare
7. Reviews
8. Talk to a trolley specialist

The only imagery below the hero is the 4 Highlights tiles and the small thumbnails in the comparison table. There is no full-width band, no product-in-use photography, no video, and no visual treatment of the folded size or weight.

**Page length:** 4,977px at 1440 and 7,537px at 390. On phones, Specifications alone is 962px tall.

### M1

- One cut-out image only. The gallery shows "photo to come" tiles.
- There is no `productDetail` entry, so there is **no Highlights section at all**.
- Below the fold, the page is text sections plus the spec list and comparison table.

### What this means

The structure is sound: everything we decided is present and in a sensible order. What it lacks is **showcase**:

- one section rhythm throughout;
- one kind of image (cut-outs on mist);
- no moment where the product gets room to breathe.

The data to tell a richer story is partly there, from `productDetail.highlights`, `trolleyFacts.rows`, the folded size, the weight and the manufacturer description. The imagery is not there for any trolley except the M5 GPS DHC.

## 2. Patterns to adopt

1. **Pin the gallery, let the buy column run long.**
   - This is what Simba does, and our page already pins the gallery (`.v-gallery { position: sticky; top: 72px }`).
   - So we **keep** that, and stop trying to squeeze the buy column. The 720px buy-panel budget in my first draft is dropped.
   - The buy column can grow: reassurance and the bundle move *into* it, as Simba does.
2. **Reassurance as one-line disclosures in the buy column.** "Why buy it from Evolution Golf" stays where it is, under its heading. Each item becomes a one-line `details` whose summary is the promise and whose body is the detail:
   - next-day delivery and cut-off;
   - warranty handled by us;
   - returns (wording pending);
   - see it at the showroom;
   - price match.
   This keeps it scannable and moves the long text out of the way.
3. **A fixed buy bar once the main button scrolls away, on desktop and phones.**
   - We have this already. It should show the price, Add to basket and our delivery line, as Simba shows its delivery cost.
   - Fix round-4 issue 2: show the bar whenever Add to basket is off screen *above or below*.
4. **A text-only "At a glance" list straight after the hero.**
   - Four to six bold lead-ins with one line each, in two columns on desktop.
   - It is cheap, scannable, and needs no photography.
5. **Alternating media-and-text feature rows** (about 55:45, media to the page edge, a short kicker, heading and two or three short paragraphs). This is the showcase. Our `highlights` data gives the M5 GPS DHC four rows. Video is user-started (see section 5).
6. **A dedicated dimensions section, with full specs behind one expander.**
   - Our version is "Fits in the boot": the folded photo plus folded size and weight.
   - Simba hides all specs. Our specs section is already agreed, so we show the key rows and put the rest behind "All specifications".
7. **An FAQ band near the end**, answered only from facts we already hold. Simba's questions are practical (assembly, what's included, getting it into the home). Ours would be:
   - which battery do I need;
   - when will it arrive;
   - can I collect it;
   - who handles the warranty;
   - what's in the box (pending confirmation).

**Dropped from my first draft:**
- the sticky right-hand panel and its height budget (Simba doesn't do this);
- the green "numbers" band (Simba has none, and "At a glance" covers it).

**Kept, despite differing from Simba:**
- our comparison table (agreed; Simba uses cross-sell cards with Compare links);
- per-product reviews only.

## 3. Blueprint: trolley product page

Each section lists what it shows, its source data, and the assets that are missing. Everything already decided stays: the buy-box contents, "Why buy it from Evolution Golf", "Is it right for you?", In the box, specs, compare and the specialist contact.

### 3.1 Hero: pinned gallery left, long buy column right

**Desktop (≥ 1000px), 7 : 5:**

- **Left: the gallery** (already sticky).
  - Change it from one main image plus thumbnails to **one large image followed by the rest in pairs**. Clicking an image opens a larger view (a native `dialog`, closed with Esc).
  - It stays pinned while the buy column scrolls past, then releases.
  - Data: `productDetail.gallery`. That is 5 images for the M5 GPS DHC; every other model has one cut-out. Until more photos exist, a single-image model shows its one image large, with no empty "photo to come" tiles.
- **Right: the buy column** (static). Contents in order:
  1. Brand · year.
  2. H1.
  3. Rating link to #reviews, only if there are reviews.
  4. Intro.
  5. Battery cards, plus "Which battery?" help.
  6. Price, with members and finance on one line.
  7. Free accessory (segmented control).
  8. Add to basket.
  9. Click-and-collect line.
  10. Delivery line.
  11. **"Why buy it from Evolution Golf"** as one-line disclosures. The warranty line folds into these.
  12. **Complete the set** (the bundle box) moves up from below the fold, as Simba does with its bundle.
- **Data:** `variants[]`, `delivery.*`, `warranty`, the facts behind `q()`, `productDetail.bundle`.
- **Missing:** returns wording, bundle price, gift list (all already pending).

**Phones:**

- The gallery becomes a swipe carousel: scroll-snap, a "1 / 5" counter, no autoplay, and a zoom (open larger) button.
- The buy column follows in the same order.
- The fixed buy bar appears once Add to basket leaves the screen in either direction.

### 3.2 At a glance (white)

- Four to six bold lead-ins with one line each. Two columns on desktop, one on phones. No images.
- **Data:**
  - M5 GPS DHC: the `highlights` headings with their first clause.
  - Other models: `trolleyFacts.rows` (display, distance control, downhill control, GPS), `weightKg`, folded size, battery range.
- **Missing:** nothing.

### 3.3 Is the [model] right for you? + In the box (white)

- Unchanged: the "Good for" ticks, the "consider" alternatives, and the In the box card.
- **Data:** `trolleyFacts.suits`, `consider` and `box`.
- **Missing:** confirmation of box contents.

### 3.4 Feature rows: the showcase (white, generous spacing)

- **Desktop:** three or four rows, media about 55% and text about 45%, alternating sides, with the media running to the page edge. Each row has a small kicker, an H2-scale heading, and two or three short paragraphs.
- **Phones:** media full width above the text.
- **Data:** M5 GPS DHC `highlights`: four rows, each with its own image (handle-hero, handle-fullhole, m5-gps-dhc, folded). Text expands from the manufacturer description (`descriptions[id]`), quoted as the brand's own copy.
- **Other models:** **no rows until there are photos.** Their "At a glance" list carries the facts. Repeating one cut-out across rows would read as filler.
- **Missing:** product-in-use photos and videos for every model.

### 3.5 Fits in the boot: dimensions (white)

- The folded photo, with the folded size (L × W × H) and weight set large beside it.
- The section ends with key specs visible and the rest behind **"All specifications"**: a native `details` with a plain-text summary.
- This merges the old standalone Specifications section into this one.
- **Data:** folded size, `weightKg`, `specsOf(f)`, the `m5dhc-folded` image.
- **Missing:** folded photos for the other models. Until then, show the facts without an image.

### 3.6 About the [model] (white)

- Unchanged: the manufacturer description, collapsed after the intro, with lines kept to readable length.
- **Data:** `descriptions[id]`.

### 3.7 Compare with similar trolleys (mist band)

- Unchanged table. On phones it scrolls sideways, with a swipe hint and a sticky first column.
- **Data:** `productDetail.compare`, or the automatic list.

### 3.8 Reviews (white)

- Per-product score.
- When review text exists, up to three review cards in a row. On phones, stack them rather than scrolling sideways, to keep them accessible.
- No brand-wide totals and no AI summaries.
- **Data:** Judge.me per product. **Missing:** review text.

### 3.9 Questions (mist band)

- Four or five accordion questions, answered only from facts we hold: battery choice, delivery timing and cut-off, click and collect, warranty handling. "What's in the box?" waits for confirmation.
- **Data:** `delivery.*`, `warranty`, the battery help copy, `trolleyFacts.box`, the facts behind `q()`.
- **Missing:** the returns answer (pending).

### 3.10 Talk to a trolley specialist (green closing band)

- Unchanged text, with the phone number set large. The showroom is mentioned second, so the page doesn't read as local.

### Sticky behaviour

| Width | Behaviour |
|---|---|
| ≥ 1000px | The gallery is pinned while the buy column scrolls past (as now). A fixed buy bar (price, Add to basket, delivery line) shows whenever the main button is off screen. |
| < 1000px | Only the header and the fixed buy bar stick. No in-page anchor bar, and no other sticky chrome. |

## 4. Assets the owner needs to supply

In priority order:

1. **Product-in-use photos and short videos** for each Motocaddy model: on a fairway, the handle in hand, folding into a car boot. These fill the feature rows. Minimum: M5 GPS DHC, M1, SE and M7 GPS Remote. Videos need captions and a poster frame; Motocaddy reportedly supplies one per model.
2. **Gallery sets** of 5–6 images for the 11 models that have only one cut-out.
3. **A folded shot** of every model, for "Fits in the boot".
4. **Battery photos** (Standard and Ultra).
5. **A box-contents photo**, once the box list is confirmed.

Facts still pending: box contents, returns policy, gift list, bundle price, finance wording, and review text.

## 5. Patterns to avoid

- **Autoplay video without controls.** Simba's two looping videos play with no pause control, which fails WCAG 2.2.2 for moving content longer than 5 seconds. Ours should start only when the user plays them, have captions, and respect `prefers-reduced-motion`.
- **Promotional overlays:** sale bars, discount badges on the gallery, floating discount pills, and prize draws on the product page. Our rules already exclude all of these.
- **Brand-wide review totals and AI-written summaries.** We show per-product ratings only, and we don't invent summaries.
- **Repeating price and delivery blocks.** Simba shows Add to cart twice, plus the fixed bar, in the first screen. We keep one main button and one fixed bar.
- **Sideways-scrolling card rows on phones** for reviews and cross-sells. Content hides off screen; stack the cards instead.
- **Showcase rows for models with no photos**, and **key facts hidden in carousels or tabs**. Battery, price, delivery, warranty and "Is it right for you?" always stay visible.
