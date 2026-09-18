# Birtalan

Marketing website for **BI-EM Beauty**. Content is managed in Sanity; pages are built as static Astro output.

## Tech stack


| Layer     | Technology                                                                        |
| --------- | --------------------------------------------------------------------------------- |
| Framework | [Astro](https://astro.build) + TypeScript                                         |
| Styling   | Tailwind CSS v4                                                                   |
| CMS       | [Sanity](https://sanity.io) (embedded Studio at `/admin`)                         |
| Assets    | [Cloudflare R2](https://developers.cloudflare.com/r2/) via `assets.biembeauty.hu` |
| Hosting   | [Cloudflare Pages](https://pages.cloudflare.com/)                                 |
| Analytics | [Google Analytics](https://analytics.google.com/)                                 |
| Consent   | [CookieYes](https://www.cookieyes.com/)                                           |


## Local development

**Requirements:** Node.js ≥ 22.12

```bash
cp .env.example .env   # add PUBLIC_SANITY_PROJECT_ID
npm install
npm run dev            # http://localhost:4321
```

- **CMS:** `/admin`
- **Build:** `npm run build`
- **Preview build:** `npm run preview`

## Project structure

- `src/pages/` — routes (home, about, gallery, contact, service pages)
- `src/components/` — reusable Astro components and page sections
- `src/sanity/` — Sanity schema and Studio structure
- `src/lib/assets.ts` — CDN URL helper for R2-hosted images

