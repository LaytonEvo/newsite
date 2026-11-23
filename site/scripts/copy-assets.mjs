// Copies the mockups' self-hosted fonts, product images and v2 stylesheets into public/assets,
// so the test site serves exactly what the mockups use. public/assets is not committed.
import { cpSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const site = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(site, "../mockups/assets");
const out = join(site, "public/assets");
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, "css/concepts"), { recursive: true });
cpSync(join(src, "img"), join(out, "img"), { recursive: true });
cpSync(join(src, "fonts/concepts"), join(out, "fonts/concepts"), { recursive: true });
const home = readFileSync(join(src, "css/concepts/showroomplus2.css"), "utf8");
writeFileSync(join(out, "css/concepts/showroomplus2.css"), home);
writeFileSync(join(out, "css/concepts/v2pages.css"), home + "\n" + readFileSync(join(src, "css/concepts/v2pages-extra.css"), "utf8"));
console.log("assets copied to public/assets");
