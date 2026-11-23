# Photo brief: "Shop the hole" (homepage)

One real aerial photo of a single golf hole, used behind the five "Shop the hole" stops: tee, fairway, approach, green and the walk between shots.

## What the photo needs to show

- **The whole hole, tee to green, in one frame.** A par 4 or a short par 5 works best.
- **Something at each stop:**
  - a clear tee box at one end
  - the fairway
  - one or two bunkers near the green
  - the green with the flag
  - a buggy path or walkway, ideally running along the bottom of the frame
- **The hole running roughly left to right,** with the tee bottom-left and the green top-right. That matches the stops' order.
- **A top-down or high-angle drone view,** with no people in shot and no visible branding apart from the course's own.
- **Even daylight:** not harsh midday shadows, no frost or heavy rain.

## Format

- Landscape, at least **2400 × 1200 px** (2:1). On phones it's cropped to 3:2, so keep about 10% clear of important detail at the left and right edges.
- JPG or high-quality WebP, under 600 KB after export. I can compress it if you send the original.

## Rights

- It must be **licensed for commercial web use.** If the club or the photographer owns it, get written permission, and confirm whether the photo should be credited and how.
- A local course you have a relationship with is ideal. Name the course in the alt text only if you have permission.

## What happens when it arrives

1. I add it as `holePhoto.src` in `mockups/src/data/catalogue.json`. The placeholder disappears and the photo shows on the homepage, the canvas and the test site.
2. I adjust the five pin positions (the `ZONES` x/y percentages in `showroomplus2.mjs`) to sit on the tee, fairway, approach, green and path in your photo.
3. The white pins have a soft shadow, so they stay readable on grass and sand. I'll check the contrast on the final image.
