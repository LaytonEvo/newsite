# Design review, round 3 (23 Nov 2026): custom clubs landing page

Both reviewers re-checked round 2 and reviewed the new `/custom-clubs/` page on the test site, at 320, 390, 768 and 1440px. The UX reviewer used keyboard, accessibility-tree snapshots and axe. The conversion reviewer checked the paths into the builder, the risk reducers and the price anchoring.

## Round 2 re-check

- **UX:** issues 1 to 9 fixed. Of the leftovers (#10), two were still open: the Compare checkboxes did nothing, and a single price showed with no "From" on two-battery models.
  - **Compare checkboxes:** removed, until a compare tray is built.
  - **Single price:** kept on purpose. The card shows the price of the battery you can buy now ("£969 · In stock · Standard battery"), and the product page shows both.
- **Conversion:** all ten round-2 issues fixed.
  - **Finder label by battery** (round-1 item): now fixed. With "36 holes" chosen, each card says "36-hole battery: In stock / Out of stock".
  - **Pay-in-3 on trolleys over £1,200** (round-1 item): owner-blocked, pending the provider limits.

## Custom clubs page: what changed after review

| Finding | From | Change |
|---|---|---|
| After Back, the hand toggle showed "Left-handed" but the builder links had dropped `hand=left` | UX 1 (high) | The hand is now read at click time, and the page re-syncs on `pageshow`. Tested: after Back it stays left, and the next click carries `hand=left` |
| Choosing left-handed changed nothing visible; "Open the builder" lost the hand | UX 2, CRO 2 | The cards switch to left-handed counts and prices (e.g. drivers 8 models from £279), with a status message. Every builder link carries the hand |
| "Build this {model}" promised a model but opened generic irons | UX 3, CRO 1 | The button now reads "Build irons, then choose {model}", and the section explains this. A deep link to the model needs the third-party builder to accept a model parameter (open question) |
| "Free custom fitting specs included" was unclear and could mislead buyers far from Hampshire; the "L" icon looked like a learner plate | UX 5, CRO 5 | Changed to "Use your own specs, or ask our team", with a neutral tick icon |
| Club types started 1.24 screens down on phones | UX 6 | Hero art hidden on phones and compact type cards. Types now start at 706px, down from 1,045px |
| Page order on phones | CRO 10 | Now: types → example builds → help → how it works → FAQ |
| Type cards had no headings and very long link names | UX 7 | The type name is an h3 link, and the whole card is clickable via a stretched link |
| Brand pills looked clickable | UX 8 | Now plain text |
| FAQ "+" and "–" were read aloud | UX 9 | The icon is in an `aria-hidden` span |
| No "current page" in the nav | UX 10 | `aria-current="page"` plus an underline |
| Homepage and order confirmation bypassed this page | UX 10, CRO 8 | Homepage builder help links "How custom builds work". The confirmation's "Build your clubs online" and the product page's "Complete your kit" both go to /custom-clubs/ |
| Prices didn't say per club or per set | CRO 7 | "from £229 a club", "from £579 a set", plus a note on set make-up |
| "Popular builds" wasn't backed by data | CRO 6 | Renamed "Example builds" |
| Upgrade costs, returns and warranty for made-to-order were buried or missing | CRO 3/4, UX 4 | A risk line under the hero, a step 5 ("We build and send it"), and FAQ entries for upgrades and warranty. Wording pending (dotted underline) |
| Hero button opened builder step 1, repeating the page's own choice | CRO A/B 1 | The hero button is now "Choose your club type" and scrolls to the grid and hand choice |
| Homepage said "Wilson, Srixon and Mizuno" | CRO 10 | Now says "custom clubs from six brands" |

## Owner decisions this page needs

- **Custom-build lead time.** The audit found two different figures.
- **Upgrade costs.** Do shaft, grip, length or lie changes cost extra?
- **Returns** (or a remake promise) for made-to-order clubs.
- **Warranty wording** for custom builds.
- **Annual 10% on custom builds.** Does it apply?
- **Builder deep links.** Can the third-party builder accept a model or brand parameter? If it can, "Build irons" can become "Build this".

## Next

- **Remote spec help:** an inline "send us your specs" form (sends nothing on the test site), with consent unticked.
- **Analytics events** from the conversion review: `cc_view`, `cc_hand_select`, `cc_type_click`, `cc_featured_click`, `cc_start_building`, `cc_faq_open`, `cc_help_contact` and `builder_landing`.
- **A/B tests:**
  - hero button "Choose your club type" against "Start building"
  - deep-linked example builds against links to the club type
  - a risk line next to the call to action
