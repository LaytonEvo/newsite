// Switches the shared mockup templates into "site mode": absolute asset paths, real routes for the
// pages built in this round, and the site script. Import this before calling any template.
import { site, catalogue } from "../../../mockups/src/concepts/kit.mjs";

site.base = "/";
site.routes = {
  Home: "/",
  Trolleys: "/trolleys/",
  "Electric trolleys": "/trolleys/",
  "Shop electric trolleys": "/trolleys/",
  "Back to electric trolleys": "/trolleys/",
  Homepage: "/",
  Basket: "/basket/",
  Finder: "/trolleys/#finder",
  Members: "/#members",
  Motocaddy: "/trolleys/?brand=Motocaddy",
  NAVEE: "/trolleys/?brand=NAVEE",
  Powerbug: "/trolleys/?brand=Powerbug",
};
site.head = `<script src="/site.js" defer></script>`;

export const families = catalogue.trolleyFamilies;
export const slugOf = (f) => f.href.split("/").pop();
