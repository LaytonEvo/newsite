# Trolley product page: adopting the "buy panel right, showcase below" pattern

Reviewed 24 Nov 2026. Findings only. No templates or styles were changed.

## 0. Limits of this review: the reference page could not be opened

The reference page is https://simbasleep.com/products/camden-bed-olive. I could not reach it from this cloud session:

- Playwright and `curl` were refused by the session's network proxy ("no rule or network setting allows this host").
- WebFetch failed to resolve the host.
- web.archive.org was also unavailable, so there is no archived copy.

A web search confirmed only that Camden colourway pages exist on simbasleep.com. That is not enough to describe the page's layout, so this document makes **no claims about Simba's buy panel, section order or mobile behaviour**. There are no screenshots of the reference in the scratchpad folder.

What follows works from three sources instead:

- the owner's own description: *"the layout with the right hand menu then really showcasing the product underneath"*;
- the coordinator's reading of it: a buy panel on the right beside the gallery, then full-width storytelling sections below;
- a measured audit of our own pages (section 1).

**To verify against the real page:** allow `simbasleep.com` in this session's network settings, then rerun the study at 1440 and 390. The blueprint in section 3 does not depend on any Simba-specific detail, so it should hold either way. Simba-specific points to check are listed in section 5.

Our pages were measured on the local test site (`site/server.mjs`), which is built from the same templates as the Railway deployment. I did not open the Railway URL, because the session note says to stop trying new hosts after one has been refused.

## 1. Our page today, measured

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

These come from the owner's description and established premium product-page practice. They are not copied from Simba.

1. **Sticky buy panel on the right, scrolling imagery on the left.**
   - This inverts what we do now. The gallery becomes a vertical stack of large images that scrolls, and the buy panel stays in view beside it until the hero section ends.
   - It only works if the panel fits the viewport. That means trimming it to about 720px at 1440×900 (section 3.1).
   - If the panel is ever taller than the viewport minus the header, it must not stick. Use a `max-height` check, never an inner scrollbar.
2. **Full-width storytelling rows below the hero, one idea per row.**
   - Alternate image and text sides, with roughly 7:5 image-to-text at desktop.
   - Each row is a large image with a short heading and two or three sentences.
   - This is the "really showcasing the product" part. Our `highlights` data already holds the four ideas for the M5 GPS DHC.
3. **Rhythm through backgrounds and space, not decoration.**
   - Sections alternate white, mist and one green band, with 96–120px vertical spacing at desktop and 56–72px on phones.
   - No new colours: fern appears only on the green band.
   - The premium feel comes from fewer, larger elements and generous space.
4. **A "numbers" band.**
   - One full-width green band with three or four facts from our data, set large: for example "40,000+ courses", "60-yard distance control", "11.2kg", "650 × 470 × 410mm folded".
   - It is the visual pause between the story and the reference material, and needs no new assets.
5. **A dimensions visual instead of a dimensions row.**
   - Show the folded photo (`m5dhc-folded`) with the folded size and weight set beside it, framed as "Fits in the boot".
   - This turns a spec into a buying reason, using only facts we already hold.
6. **Reference material last, compact and collapsible.**
   - Order: Specifications, then Compare, then Reviews, then the specialist.
   - On phones, specs show the first six rows with "Show all specifications". In the box stays visible next to "Is it right for you?".
7. **A slim sticky buy bar after the hero.**
   - Once the sticky panel's section has scrolled away, the existing bottom bar takes over. This is the same component we already have.
   - It should also show whenever the main button is off screen above **or below**. That fixes round-4 issue 2.

## 3. Blueprint: trolley product page

Each section lists what it shows, its source data, and the assets that are missing. Everything already decided stays: the buy-box contents, "Why buy it from Evolution Golf", "Is it right for you?", In the box, specs, compare and the specialist contact. Only placement and treatment change.

### 3.1 Hero: gallery left, sticky buy panel right

**Desktop (≥ 1000px), two columns (7 : 5):**

- **Left: the gallery.**
  - It becomes a vertical stack, not sticky: the first image at full column width, then the rest two per row.
  - Click any image to open it larger (a native `dialog`, closed with Esc; it is a lightbox, not a popup offer).
  - Data: `productDetail.gallery`. That is 5 images for the M5 GPS DHC; every other model has one cut-out (`trolleyFamilies[].image`).
- **Right: the buy panel.** It is `position: sticky; top: 72px` and stops at the end of the hero. Contents in order:
  1. Brand · year, linked to the brand.
  2. H1.
  3. Rating link to #reviews, shown only if there are reviews.
  4. Intro: one line, `productDetail.intro`, or `trolleyFacts` "suits"[0] where there is no detail.
  5. Battery cards with stock, plus the one-line "Which battery?" help. Data: `variants[]`.
  6. Price, then **one line** combining the member price and finance. Today these are two paragraphs taking 141px.
  7. Free accessory, compact segmented control, before the button (Motocaddy only; gift list still to be confirmed).
  8. Add to basket.
  9. Click-and-collect line.
  10. Two plain lines: delivery and warranty. Data: `delivery.*` and `warranty`.
- **Moves out of the panel:**
  - **"Why buy it from Evolution Golf" moves to section 3.2.** This saves about 280px and is what makes sticky possible.
  - **"Or see the bag bundle" stays** as an anchor link to #complete.
- **Height budget:** the panel must be ≤ 720px at 1440×900. Measured content after the moves above is about 700–740px. Check per model, and disable sticky if a model exceeds it.

**Phones (< 1000px):**

- The gallery becomes a swipeable strip: 1:1 slides with scroll-snap, a visible "1 / 5" counter, thumbnails below, and no autoplay.
- The buy panel follows as normal flow. It is not sticky.
- The bottom sticky bar appears whenever Add to basket is off screen in either direction (an IntersectionObserver checking both directions).

**Missing assets:** gallery photos for 11 of the 12 models (see section 4).

### 3.2 "Why buy it from Evolution Golf": full-width band (mist)

- A single row of five short items, each with a small line icon from our set. On phones, a two-column list; no horizontal scroll.
- Items are unchanged: Authorised dealer (Motocaddy), warranty handled by us, see it at the centre, returns (still pending), price match link.
- **Data:** existing `q()` facts. **Missing:** returns policy wording (already pending).

### 3.3 "Is the [model] right for you?" + In the box (white)

- Unchanged content: "Good for" ticks, the "consider" alternatives, and the In the box card.
- **Data:** `trolleyFacts.suits`, `consider` and `box`.
- **Missing:** confirmation of box contents (already pending).
- **Optional:** a box-contents photo if the owner shoots one.

### 3.4 Feature story: alternating rows (the showcase)

- Desktop: 3–4 rows, image 7/12 and text 5/12, alternating sides. Images sit on mist panels at full column width. The heading is H3 at the section-H2 scale minus one step, with two or three sentences of text.
- Phones: image full width (it may bleed to the screen edge), then the text below. No alternation.
- **Data:**
  - M5 GPS DHC: `productDetail.highlights` (4 rows, each with its own image: handle-hero, handle-fullhole, m5-gps-dhc, folded).
  - Other models: build the rows from `trolleyFacts.rows`, using the display, distance control, downhill control and GPS rows. Each **needs a supporting photo** before it can be a showcase row. Until then, render these models' rows as a compact two-column fact list, not image rows with the same cut-out repeated.
- **Missing:** handle close-up, battery, wheels and tyres, and fold photos for every model except the M5 GPS DHC.

### 3.5 Numbers band (green, full width)

- Three or four large facts in fern on green, each with a white label underneath.
- **Data, per model:**
  - from `trolleyFacts.rows`: GPS courses, distance control;
  - `weightKg`;
  - folded size.
- Use only facts the model has. Hide the band if fewer than three are available. For example, the M1 has distance control (45 yards), weight (10kg), folded size and speed settings, which is enough.
- **Missing:** nothing.

### 3.6 "Fits in the boot": dimensions visual (white)

- The folded photo on the left, with the folded size (L × W × H) and weight set large on the right, plus one line on the battery (cable-free or not, from the description).
- **Data:** folded size, `weightKg`, and the `m5dhc-folded` image.
- **Missing:** folded photos for the other models. Without one, merge these two facts into the numbers band instead.

### 3.7 About the [model]: manufacturer description (white)

- Unchanged: source line, intro, and "Read the full description".
- Narrow the text to about 68 characters per line, centred in the column, so it reads as editorial copy.
- **Data:** `descriptions[id]`.

### 3.8 Product video (optional; only if supplied)

- Full-width band on mist. A poster frame with a play button. No autoplay; captions are required.
- **Missing:** the video. The existing placeholder notes that Motocaddy supplies one per model. **Do not show an empty video panel.**

### 3.9 Complete the set (white)

- Unchanged: the bundle row. It stays as the #complete anchor target.
- **Data:** `productDetail.bundle`. **Missing:** bundle price (TBC).

### 3.10 Specifications (mist)

- Two-column `dl` at desktop.
- Phones: the first six rows, then a "Show all specifications" disclosure (native `details`, with a plain-text summary and no heading inside it).
- **Data:** `specsOf(f)` / `trolleyFacts.rows`.

### 3.11 Compare with similar trolleys (white)

- Unchanged table. On phones it scrolls sideways, with a "Swipe to compare" hint and a sticky first column.
- **Data:** `productDetail.compare`, or the automatic list.

### 3.12 Reviews (white)

- Unchanged: product-only reviews, with the large score. If written reviews become available, show two or three as quotes in a row.
- **Data:** Judge.me per product. **Missing:** review text (placeholder today).

### 3.13 Talk to a trolley specialist (green band)

- Unchanged text: specialist, phone, email, hours.
- It becomes the closing green band, mirroring the homepage's members band, with the phone number set large.
- Keep the showroom line secondary ("or see the range in Hampshire"), so the page doesn't read as local.
- **Missing, optional:** a photo of the specialist team.

### Sticky behaviour summary

| Width | In the hero | After the hero |
|---|---|---|
| ≥ 1000px | The buy panel sticks (if it is ≤ viewport minus header); the gallery scrolls | Slim sticky bar (product · battery · price · Add to basket) |
| < 1000px | Nothing sticks except the header | The sticky bar shows whenever Add to basket is off screen, above or below |

No in-page anchor bar on phones. Round 4 showed that stacked sticky bars eat the screen. An anchor bar at desktop is optional: if used, it should replace the slim buy bar, not sit on top of it.

## 4. Assets the owner needs to supply

In priority order:

1. **Product-in-use photography** for the Motocaddy range: the trolley on a fairway, the handle in hand, and folding into a car boot. These are the core of the showcase rows. Minimum: the M5 GPS DHC, M1, SE and M7 GPS Remote. All 8 Motocaddy models would be better.
2. **Gallery sets for 11 models.** Only the M5 GPS DHC has 5 images. Aim for 5–6 per model: three-quarter, side, handle, battery, folded, and wheels or tyres.
3. **Folded shots** for every model, for the "Fits in the boot" visual.
4. **Product video** per model. Motocaddy reportedly supplies these. Needs captions and a poster frame.
5. **Battery photos**, Standard and Ultra, to support the battery choice.
6. **Box-contents photo** to go with the confirmed box list.
7. **Optional:** a specialist team photo.

Facts still pending, all already tracked: box contents, returns policy, gift list, bundle price, finance wording, and review text.

## 5. Patterns to avoid, and points to check when the reference is reachable

**Avoid:**

- **A sticky panel taller than the viewport.** Its bottom, including Add to basket, becomes unreachable without scrolling the page past the section. Keep the 720px budget and fall back to non-sticky.
- **A full-width hero banner above the buy panel.** It pushes the price and button down. The gallery-plus-panel split is the hero.
- **Autoplay video or motion-heavy scroll effects.** They cost performance and accessibility (motion and focus). Make video user-started, and respect `prefers-reduced-motion`.
- **Stock or brand-world lifestyle imagery that isn't the actual model.** Showcase only real photos of the product.
- **Key facts hidden in carousels or tabs.** Battery, price, delivery, warranty and "Is it right for you?" stay visible. Only long reference material (full description, full specs) collapses.
- **Urgency devices, promo pop-ups, side tabs and percentage codes.** These are already ruled out.
- **Repeating one cut-out across several "showcase" rows** for models without photos. It reads as filler. Use a compact fact list until real photos exist.

**Check against the live reference once reachable** (all unverified here):

- what the buy panel contains, and in what order;
- whether the whole panel sticks or only part of it;
- how options and swatches collapse on phones;
- the section order and the image-to-text ratio;
- how reviews and FAQs are presented.

Adjust section 3 only if the reference shows something clearly better that fits our content.
