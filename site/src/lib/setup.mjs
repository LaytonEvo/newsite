// Switches the shared mockup templates into "site mode": absolute asset paths, real routes for the
// pages built in this round, and the site script. Import this before calling any template.
import { site, catalogue } from "../../../mockups/src/concepts/kit.mjs";

site.base = "/";
site.routes = {
  Home: "/",
  Trolleys: "/trolleys/",
  "Custom clubs": "/custom-clubs/",
  "Build custom clubs": "/custom-clubs/",
  "Electric trolleys": "/trolleys/",
  "Shop electric trolleys": "/trolleys/",
  "Back to electric trolleys": "/trolleys/",
  Homepage: "/",
  Basket: "/basket/",
  Finder: "/trolleys/#finder",
  Members: "/membership/",
  Membership: "/membership/",
  "See membership": "/membership/",
  "Annual membership": "/membership/",
  "Join free": "/membership/#join",
  "Join for £36": "/membership/#join",
  "See every perk and the terms": "/membership/",
  Motocaddy: "/trolleys/?brand=Motocaddy",
  NAVEE: "/trolleys/?brand=NAVEE",
  Powerbug: "/trolleys/?brand=Powerbug",
};
site.head = `<script src="/site.js" defer></script>`;

export const families = catalogue.trolleyFamilies;
export const slugOf = (f) => f.href.split("/").pop();
