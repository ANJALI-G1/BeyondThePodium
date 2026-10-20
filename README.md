# Beyond the Podium with Dr. Prachi

Personal-brand website for **Dr. Prachi Behrani Manocha (PhD)** — Certified Soft Skills Trainer, Communication Skills & Public Speaking Coach.

**Stack:** Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind CSS v4 · AWS S3 + CloudFront · GitHub Actions (OIDC)

## Features

- Home (hero, about, programs, approach, insights, contact), `/insights` listing and statically generated article pages
- Fully responsive, scroll-reveal animations (respects `prefers-reduced-motion`, works without JS)
- Program enquiry + general contact forms: validation, honeypot spam trap, loading/success/error states — **UI only**
- SEO: metadata, Open Graph, canonical URLs, JSON-LD (Person, ProfessionalService, Article), `sitemap.xml`, `robots.txt`
- Accessibility: semantic landmarks, skip link, labelled fields, `aria-invalid`/live regions, keyboard-friendly menu & tabs
- Zero runtime dependencies beyond Next/React; ships as plain static files

## Quick start

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
npm run build                # static site -> out/
npm run preview              # serve out/ at http://localhost:4173
npm run lint && npm run typecheck
```

Requires Node 20.9+.

## Editing content

| What | Where |
|---|---|
| Name, contact details, socials, hero, about, programs, approach, testimonials | `src/content/site.ts` |
| Insights articles | `src/content/insights.ts` |
| Colours & fonts | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |
| Photos | `public/images/` |

- Items marked **`EDIT`** are draft copy — review before going live.
- Empty contact fields (email, WhatsApp, phone, location) are hidden automatically; the floating WhatsApp button appears once `whatsapp` is set.
- The testimonials section stays hidden until you add **real** testimonials.
- **Image slots** (search for `IMAGE SLOT`) currently show brand illustrations; replace with `next/image` photos when ready.

## Connecting the forms (Google Apps Script)

All forms call one function: **`submitForm()` in `src/lib/forms.ts`** — the single integration point. It documents the payload shape and includes a commented `fetch` example.

1. Deploy your Apps Script as a Web App, copy the `/exec` URL.
2. Set `NEXT_PUBLIC_FORM_ENDPOINT` in `.env.local` and in the GitHub `FORM_ENDPOINT` variable.
3. Replace the TODO block in `submitForm()`.

Until then: in `npm run dev` submissions are logged to the console and show the success state; in production the form shows a friendly "being set up" notice.

## Deployment

See **[docs/DEPLOY-AWS.md](docs/DEPLOY-AWS.md)** (S3 + CloudFront + GitHub Actions).
The `out/` folder also deploys as-is to Netlify, Vercel, Cloudflare Pages or GitHub Pages.

## Project structure

```
src/
  app/                 layout, home, insights/, insights/[slug]/, sitemap, robots, 404, icon
  components/          Header, Footer, Reveal, ArtPanel, InsightCard, ui primitives, icons
    sections/          Hero, About, Programs, Approach, Testimonials, InsightsPreview, Contact
    forms/             LeadForms (enquiry + contact), Field components
  content/             site.ts, insights.ts  ← all editable copy
  lib/forms.ts         ← form integration point
infra/                 CloudFront Function + IAM policy templates
.github/workflows/     deploy.yml (CI/CD to AWS)
```
