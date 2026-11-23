// The templates return complete HTML documents; Astro pages pass them through untouched,
// apart from dropping the mockup-only labels in the <title>.
export const docOnly = (html) => html
  .replace(/^<!doctype html>\s*/i, "")
  .replace(/ \((?:concept: [^)]*|v2 mockup)\)<\/title>/, "</title>");
