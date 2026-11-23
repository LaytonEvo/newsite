// Serves the built test site (dist/) behind HTTP basic auth.
// - Refuses to start without SITE_PASSWORD, so the site can never go up unprotected.
// - Every response carries X-Robots-Tag: noindex, nofollow; robots.txt disallows everything and is
//   the only path (with /healthz) served without a password, so crawlers can read it.
// - No secrets live in the code: credentials come from Railway environment variables.
import { createServer } from "node:http";
import { createReadStream, statSync, existsSync } from "node:fs";
import { createHash, timingSafeEqual } from "node:crypto";
import { join, normalize, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "dist");
const user = process.env.SITE_USERNAME || "evolution";
const pass = process.env.SITE_PASSWORD;
if (!pass || pass.length < 12) {
  console.error("SITE_PASSWORD is missing or shorter than 12 characters. Refusing to start without protection.");
  process.exit(1);
}
const digest = (s) => createHash("sha256").update(s).digest();
const expected = digest(`${user}:${pass}`);
const authorised = (header = "") => {
  const [scheme, value] = header.split(" ");
  if (scheme !== "Basic" || !value) return false;
  return timingSafeEqual(digest(Buffer.from(value, "base64").toString("utf8")), expected);
};

const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".webp": "image/webp", ".png": "image/png",
  ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".ico": "image/x-icon",
};
const base = {
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "same-origin",
  "X-Frame-Options": "DENY",
  "Content-Security-Policy": "default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'self'",
};

const resolve = (urlPath) => {
  let p;
  try { p = decodeURIComponent(urlPath.split("?")[0]); } catch { return null; }
  const file = normalize(join(root, p));
  if (!file.startsWith(root)) return null;
  for (const candidate of [file, join(file, "index.html")]) {
    if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  }
  return null;
};

const send = (res, status, file, headers = {}) => {
  const ext = extname(file);
  res.writeHead(status, {
    ...base, ...headers, "Content-Type": types[ext] || "application/octet-stream",
    "Cache-Control": ext === ".html" ? "no-cache" : "public, max-age=3600",
  });
  createReadStream(file).pipe(res);
};

createServer((req, res) => {
  const path = req.url || "/";
  if (path === "/healthz") { res.writeHead(200, { ...base, "Content-Type": "text/plain" }); return res.end("ok"); }
  if (path === "/robots.txt") return send(res, 200, join(root, "robots.txt"));
  if (!authorised(req.headers.authorization)) {
    res.writeHead(401, { ...base, "WWW-Authenticate": 'Basic realm="Evolution Golf test site", charset="UTF-8"', "Content-Type": "text/plain" });
    return res.end("Password required.");
  }
  if (req.method !== "GET" && req.method !== "HEAD") { res.writeHead(405, { ...base, Allow: "GET, HEAD" }); return res.end(); }
  const file = resolve(path);
  if (file) return send(res, 200, file);
  return send(res, 404, join(root, "404.html"));
}).listen(Number(process.env.PORT) || 8080, () => console.log("test site listening"));
