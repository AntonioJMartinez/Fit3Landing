# Fit3Landing

Static multilingual landing page built with Vite.

## Requirements

- Node.js 22.18.0 (the supported range is declared in `package.json`)
- npm 10 or newer

## Production configuration

No production identity is committed to the repository. Copy
`.env.production.example` to `.env.production.local` and set verified values:

| Variable | Requirement |
| --- | --- |
| `FIT3_SITE_URL` | HTTPS production origin, without a path |
| `FIT3_HIDE_LEGAL_LINKS` | Temporary `true`/`false` switch; when `true`, hides legal/support footer links while those real values are unavailable |
| `FIT3_SUPPORT_EMAIL` | Public support email |
| `FIT3_PRIVACY_URL` | HTTPS privacy-policy URL |
| `FIT3_TERMS_URL` | HTTPS terms-of-use URL |
| `FIT3_APP_STORE_ID` | Numeric Apple App Store ID |
| `FIT3_APP_STORE_URL` | Official `https://apps.apple.com/.../id<ID>` URL |
| `FIT3_APP_ARGUMENT` | Optional Smart App Banner deep link |

The build fails before generating pages when a required value is absent,
malformed, uses a reserved/example domain, or the App Store URL does not match
the configured ID. `FIT3_HIDE_LEGAL_LINKS=true` is an explicit temporary
exception for a launch before legal/support destinations are ready; it must be
removed or set to `false` for the final public release.

## Build and verify

```sh
npm ci
npm run validate:config
npm run verify
```

`npm run verify` builds the site, checks every localized page and local
reference, rejects placeholder/inert links in `dist/`, and runs `npm audit`.

The static deployable artifact is `dist/client/`. The build also emits a
Sites-compatible worker at `dist/server/index.js`; serve only the static
artifact or use the included container. Do not expose the repository, Vite
development server, or `vite preview` to the internet.

After deployment, smoke-test `/`, `/es/`, `/fr/`, `/it/`, `/de/`, `/pt/`,
`/zh/`, `robots.txt`, `sitemap.xml`, App Store CTAs, and legal links.

## Container hosting

The included multi-stage `Dockerfile` builds the site and serves `dist/` with
nginx on port 8080. Pass the same public configuration as build arguments:

```sh
docker build \
  --build-arg FIT3_SITE_URL \
  --build-arg FIT3_HIDE_LEGAL_LINKS \
  --build-arg FIT3_SUPPORT_EMAIL \
  --build-arg FIT3_PRIVACY_URL \
  --build-arg FIT3_TERMS_URL \
  --build-arg FIT3_APP_STORE_ID \
  --build-arg FIT3_APP_STORE_URL \
  --build-arg FIT3_APP_ARGUMENT \
  -t fit3-landing .
```

Export those variables in the shell or have CI provide them. They are public
website metadata, not secrets. Terminate TLS at the hosting platform or reverse
proxy and forward traffic to port 8080.
