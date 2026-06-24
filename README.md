<div align="center">
  <img src="public/revamp/brand/syinq-wordmark.png" alt="Syinq" height="64" />
  <h1>Syinq — India's verified campus commute network</h1>
  <p><strong>One App. For Every Campus Move.</strong></p>
</div>

Syinq is a campus-first ride-coordination platform for **verified students, faculty and staff**. Members **find a verified pool going their way** or **offer their empty seats**, match on route and timing, board with **OTP proof-of-pool**, and **split the running cost fairly** — coordination, not a taxi.

> Syinq is a coordinator for verified campus members. It never owns vehicles, sets fares, or guarantees outcomes. Cost is **your share**, agreed and settled with your Host.

This repository is the **marketing website** (`syinq.com`) — a Next.js App Router site that explains the product, builds verified-campus trust, and routes people to the apps.

---

## Tech stack

| Area | Choice |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router, SSG) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + design tokens (Poppins / Inter, brand `#099BE4`) |
| Motion | framer-motion (reduced-motion safe), JS-gated scroll reveals |
| Animation | [LottieFiles](https://lottiefiles.com/) (`@lottiefiles/dotlottie-react`) |
| Icons | lucide-react + Iconscout Unicons |
| Images | `next/image` + `sharp` |
| Tooling | ESLint (`eslint-config-next`), Knip (dead-code) |

## Getting started

```bash
# install (uses Yarn Classic, see packageManager)
yarn install

# run the dev server on http://localhost:3000
yarn dev

# production build + serve
yarn build
yarn start

# lint and dead-code check
yarn lint
yarn knip
```

### Environment variables

Create `.env.local` (all optional — the site degrades gracefully without them):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_BACKEND_API` | Admin portal API base (admin auth lives on the backend). |
| `NEXT_PUBLIC_API_CONTACTUS` | Endpoint the contact form POSTs to. |
| `PETROL_PRICE_API_URL` | Optional live petrol-price source for the savings calculator. |
| `PETROL_PRICE_API_KEY` | Bearer token for the petrol-price source (if required). |

When `PETROL_PRICE_API_URL` is unset, the savings calculator uses a clearly-labelled reference price.

## Project structure

```
src/
  app/                 # App Router routes
    page.tsx           # Home (hero, calculator, how-it-works, trust, founders, FAQ)
    how-it-works/      # Ride lifecycle deep-dive
    safety/            # Verification & trust
    for-hosts/         # Host value prop
    for-campuses/      # Campus / club / ambassador partnerships
    about/  faq/  blog/
    contact/  privacy/  terms/  account-deletion/
    admin-*/           # Admin portal (backend-gated; hardened via middleware)
    robots.ts  sitemap.ts  layout.tsx
  components/
    home/              # Home page sections
    site/              # Shared primitives (Navbar, Footer, Lottie, TabletFrame, ...)
  content/             # Typed content (steps, FAQs, testimonials, blog)
  lib/                 # site config, SEO/JSON-LD schema, petrol data layer
  middleware.ts        # Admin-route hardening (noindex / no-store)
public/revamp/         # Brand assets, app screenshots, Lottie animations
```

## SEO & GEO

- Per-page metadata via the Next Metadata API, canonical URLs, OpenGraph/Twitter cards.
- JSON-LD: `Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`, `Person`, `Article`, `BreadcrumbList`.
- `robots.ts` explicitly welcomes AI/citation crawlers (OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended) and keeps admin routes out of the index.
- Answer-first content for AI-overview extraction; `sitemap.ts` lists all public canonical pages.

## Get the app

- App Store: https://apps.apple.com/in/app/syinq/id6755780778
- Google Play: https://play.google.com/store/apps/details?id=com.rasync.sync
- Smart link: https://onelink.to/7x25s5

## Brand rules (for contributors)

- Use **Host** (vehicle owner), **Rider** (joiner), **Member** (any verified user).
- Cost is **your share**, split fairly and settled with your Host — never a "Syinq fare".
- Never imply Syinq owns drivers/vehicles or guarantees a ride/safety.
- Label unbuilt features as **planned / concept**. No emoji in product UI.

## Founders

- **Raunak Shukla** — Co-founder & CEO
- **Rupesh Shandillya** — Co-founder & CTO

---

<sub>© Rasync Global Solutions Private Limited. Support: support@syinq.com</sub>
