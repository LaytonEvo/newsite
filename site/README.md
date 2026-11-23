# Evolution Golf test site

A password-protected preview of the redesign, deployed on Railway. Pages are rendered by the same template functions and data as the mockups (`../mockups/src`), so the canvas and the site stay in step.

The site is built with Astro (`site/`). `server.mjs` serves `dist/` behind basic auth.

**Rules (from the brief)**

- **Read-only Shopify.** The site uses a read-only snapshot in `mockups/src/data`. Nothing is ever written to Shopify.
- **Hidden from search.** Every response sends `X-Robots-Tag: noindex, nofollow`, every page has a robots meta tag, and `robots.txt` disallows everything.
- **Simulated buying.** The basket lives in `localStorage`. Checkout is simulated, forms send nothing, and the marketing consent box is unticked.
- **Secrets stay in Railway variables,** never in this repository.

**Railway variables**

| Variable | Purpose |
|---|---|
| `SITE_PASSWORD` | Required, at least 12 characters. The server refuses to start without it. |
| `SITE_USERNAME` | Optional; defaults to `evolution`. |

**Run locally**

```bash
cd site && npm ci && npm run build
```

```bash
SITE_PASSWORD=some-long-password node server.mjs
```
