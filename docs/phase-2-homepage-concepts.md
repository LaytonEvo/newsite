# Homepage design exploration: four directions

Status: **awaiting owner feedback**. No concept has been refined further, and no other page or the test site has been touched.

## Where everything is

| What | Where |
|---|---|
| Comparison page | `mockups/dist/concepts/index.html`, screenshot `mockups/screenshots/concepts/index.png` |
| Homepages (responsive) | `mockups/dist/concepts/<id>.html`, plus `<id>-390.html` / `<id>-1440.html` frames |
| Full-page screenshots | `mockups/screenshots/concepts/<id>-390.png` (2×) and `<id>-1440.png` |
| Design sheets | `mockups/dist/concepts/<id>-sheet.html`, screenshot `<id>-sheet.png` |
| Source | `mockups/src/concepts/` (one module per concept; `kit.mjs` holds the shared content) and `mockups/assets/css/concepts/` |

IDs: `editorial` (The Journal), `lab` (The Lab), `retail` (Block), `local` (The Local).

Rebuild:

```bash
node src/concepts/build.mjs
```

Screenshots:

```bash
node src/concepts/shoot.mjs editorial lab retail local
```

Then rebuild, then shoot the comparison page:

```bash
node src/concepts/shoot.mjs index
```

## What stayed fixed across all four

- **Content:** the same content and priorities: Motocaddy first, then Wilson / Srixon / Mizuno, free fitting in Ringwood, then membership. Secondary categories sit lower, with clothing and shoes last.
- **Products:** the same real product data. That covers the Shopify snapshot (prices, stock, battery options, product-level ratings), plus four extra read-only products for secondary categories: a Motocaddy Dry Series bag, Srixon Soft Feel balls, the Shot Scope PRO LX+ and an approved-used Srixon ZXi 5 set photographed in the shop.
- **Facts:** every fact comes from `mockups/src/data/facts.json`. Facts awaiting a decision get **one quiet treatment everywhere**: a dotted underline, with the open question in a tooltip. Photo placeholders use the same dotted style.
- **Content rules:** no store-level stars on products, no invented testimonials (review slots are clearly labelled), and no superlatives. Marketing consent is unticked, and there's a cookie banner (hidden in the screenshots).
- **Shopify:** read-only throughout.

## Distinctness check

Pairwise, the concepts differ in layout and imagery approach, not just colour and type:

| Pair | What differs beyond colour and type |
|---|---|
| Journal vs Lab | Magazine cover plus listing rows, vs a data grid with a spec table and readouts. Light, art-directed photography vs product plates and diagrams. |
| Journal vs Block | Asymmetric editorial columns with heavy rules, vs a tight bento grid of colour blocks. Reading-led vs shopping-led (finder plus shelf). |
| Journal vs Local | Typography-led with an empty-plate photography style, vs people-led with arch-framed portraits, a map and a membership card. |
| Lab vs Block | Dark tables and monospace data, vs flat colour tiles with oversized product cut-outs. Comparison by table vs by three-question finder. |
| Lab vs Local | Fitting as measurement (numbers, trajectory) vs fitting as conversation (people, steps, photos). |
| Block vs Local | Cut-outs and colour with almost no lifestyle photography, vs photography of people and place throughout. |

## Notes

- **Product images:** the main Shopify images for the 2026 Motocaddy trolleys still have “FREE GIFT” baked in. All four concepts use the clean gallery images instead.
- **Cut-outs:** product cut-outs (transparent WebP) were made locally from the Shopify images by removing the white background. They're in `mockups/assets/img/cutouts/`.
- **Fonts:** all are free, self-hosted Google Fonts under the SIL Open Font License: Archivo, Newsreader, IBM Plex Sans and Mono, Bricolage Grotesque, Young Serif and Atkinson Hyperlegible.
- **Layout check:** there is no horizontal overflow at 390px or 1440px on any concept.
