# Evolution Golf redesign: password-protected test site (Railway).
# Builds the Astro site from the shared mockup templates and data, then serves it with a tiny
# Node server that enforces basic auth and noindex. Credentials come from Railway variables only.
FROM node:22-slim AS build
WORKDIR /app
COPY mockups/src mockups/src
COPY mockups/assets mockups/assets
COPY site/package.json site/package-lock.json site/
RUN cd site && npm ci --no-audit --no-fund
COPY site site
RUN cd site && ASTRO_TELEMETRY_DISABLED=1 npm run build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/site/dist dist
COPY site/server.mjs server.mjs
USER node
EXPOSE 8080
CMD ["node", "server.mjs"]
