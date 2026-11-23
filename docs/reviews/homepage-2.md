# Homepage second review (23 Nov 2026)

An independent art director reviewed the homepage against the owner's feedback: too many greens, a trolley-focused hero, too much going on, and a forgettable members band. They measured computed styles and pixel areas at 390 and 1440. The screenshots and the `audit.json` measurements are in the session scratchpad.

## Defects found while measuring
1. **Members band broken at 1440.** `.p-mem2` has two grid columns but one child, so the block is squeezed left. The saving table runs under the Free card and "£60.90" is clipped to "£60.9".
2. **Focus ring fails on dark surfaces.** `#0b6b47` is 1.51:1 on the footer green and 2.55:1 on the builder band; 3:1 is needed.
3. **"10%" dotted twice** (the saving table and the Annual perk).
4. **"Only at Evolution Golf" is an unsupported exclusivity claim.**
5. **The hero iron is stranded and clipped at 1440.**
6. **"Also in the shop" shows four empty grey circles.**
7. **The builder grid is 1,180px wide;** everything else is 1,280px.

## Colour audit
The page renders **19 distinct green-tinted colours**, about 9 of them visibly different "greens":
- **Three dark surfaces:** footer `#0e4d35`, builder band `#16201b`, builder cards `#223029`.
- **Five mint tints** in the hole illustration.
- **Two near-identical text greens:** `#0e4d35` and `#0b6b47`.
- **Two mint footer-text tints.**

Proposed palette:

| Token | Hex | Use |
|---|---|---|
| green | `#0e4d35` | The only saturated colour: buttons, links, members band, footer |
| fern | `#a7e3c3` | Accent, on green only |
| ink | `#16201b` | Text only, no longer a band colour |
| slate | `#56605b` | Secondary text |
| mist | `#f3f5f4` | Light bands |
| hair | `#e3e8e5` | Lines |
| white | `#ffffff` | Background |

Every text pairing passes AA.

## Hero directions
- **A. "Three doors" (reviewer recommends).** Headline "Trolleys, custom clubs, and members who pay less." Three equal cards, each with one link and one fact: Motocaddy trolleys (from £479), Custom clubs (123 models), Members' club (Free or £36). The members card is a CSS membership card. All three pillars sit above the fold on a phone.
- **B. "One still life, one button".** A three-part headline, a composed image (trolley, driver, member card) with captions, and the filled "Shop electric trolleys" button kept.
- **C. "Members' price on real kit".** The membership saving leads, with "Join free" as the main action. It's distinctive, but leads with an unconfirmed 10% and is discount-led.

## Members band redesign: the "£60.90 band"
The only coloured band in the page body (brand green):
- **Copy:** "Annual pays for itself on one trolley." (true for every Motocaddy: 10% of £479 is more than £36).
- **The saving:** a large fern "£60.90", with three equation chips.
- **Annual card:** white, three perks, the only filled button.
- **Free card:** outlined.
- **Link:** "See every perk".
- **Placeholders:** the thresholds and returns move off the homepage.

## Everything else
- **Builder becomes a light band:** the example card and kicker go; one "Start building" button.
- **Compare loses the spec matrix:** one feature line per model instead.
- **"Shop the hole" and "Also in the shop" merge:** "Also in the shop" becomes a text-link row.
- **Bands go full-bleed with no gaps.**
- **Target height:** about 5,000px at 390 (from 6,827) and about 4,150px at 1440 (from 5,564).

## Owner decision
Hero A, "Three doors".

## Built (all ten ranked changes plus the defects)

### Palette

| | Before | After |
|---|---|---|
| Green-tinted colours | 19 | 4: green, fern, ink, slate |

- `--link` is aliased to green.
- Fern is used only on green.
- Ink is text only.
- Footer text is white.
- The hole illustration is redrawn in the palette; the water and second fairway tint are gone.

### Focus ring

- Green on light surfaces.
- Fern on green: the members band and the footer.

### Hero

- Headline: "Trolleys, custom clubs, and members who pay less."
- Three equal door cards: Motocaddy trolleys (from £479), Custom clubs (123 models), Members' club (a CSS membership card).
- One Trustpilot line.
- All three doors sit above the fold on phone (last card ends at 675px of 844) and desktop (804 of 900).

### Compare

- The spec grid is now one feature line.
- Image tiles are white on the mist band.

### Custom clubs

- A light band: the example card and kicker are cut.
- The cards show one fact each ("33 models · from £249 a club").
- One "Start building" button to /custom-clubs/.

### Members

- The only coloured band in the page body.
- "Annual pays for itself on one trolley."
- A large fern £60.90 and three equation chips; the 10% is dotted once.
- A white Annual card (three perks, the band's only button) and an outlined Free card.
- A "See every perk" link.
- Fixes the 1440 layout bug that clipped £60.90.

### Shop the hole

- The unsupported "Only at Evolution Golf" kicker is gone.
- "Also in the shop" is a text-link row; the empty circles are gone.

### Layout

- Full-bleed bands with no white frames.
- One container width.

### Result

| | Before | After |
|---|---|---|
| Height at 390 | 6,827 | 5,389 |
| Height at 1440 | 5,564 | 4,447 |

- axe clean on four pages at 320, 390, 768 and 1440.
- No sideways scrolling.
- Journey tests pass.
