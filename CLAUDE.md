# Morpheus8 Bedford — Claude Instructions

## Project Overview

**One client, two projects.** Claire Emmerson at Clarity Clinic in Bedford has two separate Leadballoon sites. This repository is only the Morpheus8 project. The Harmony laser site is a different codebase, domain, and offer. Share clinic facts between them. Do not mix treatment copy, pricing, or SEO.

This repository is the **Morpheus8 Bedford** landing page. It is a finished client site, not a blank clinic template. Do not revert copy, contact details, or branding to the old CO2-laser / “Aesthetics with Kayleigh” starter that this repo was cloned from.

### This project — Morpheus8

- **Repo:** `leadballoon-agency/clarity-cosmetics`
- **Package name:** `clarity-cosmetics-morpheus8`
- **Live domain:** https://morpheus8bedford.co.uk
- **Treatment:** Morpheus8 RF microneedling

### The other project — Alma Harmony

Same client. Different project. Do not edit it from this workspace.

- **Repo:** `leadballoon-agency/clarity-harmony`
- **Live domain:** https://www.laserbedford.co.uk
- **Vercel:** https://clarity-harmony.vercel.app
- **Treatment:** Alma Harmony laser / skin resurfacing

### Shared client

- **Client:** Claire Emmerson, Registered Nurse, Registered Midwife, Independent Prescriber
- **Clinic:** Clarity Clinic, Conway Crescent, Bedford, MK41 7BW
- **Phone / WhatsApp:** 07414 154007 (`+447414154007`)
- **Main clinic site:** https://claritycosmetics.co.uk

Clinic background lives in `CLARITY-KNOWLEDGE-BASE.md`. That file lists an older phone number (`07929 802094`). The number on this site is `07414 154007`. Do not change the live number unless asked.

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS (custom mauve / primary palette in `tailwind.config.js`)
- **Fonts:** Open Sans and Montserrat
- **Deployment:** Vercel

## Development Commands

```bash
npm install        # Install dependencies
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## What the page renders

`app/page.tsx` renders `components/PageWrapper.tsx`. That is the live page. Several older components (`Hero.tsx`, `About.tsx`, `CTA.tsx`, `Process.tsx`, `Treatment.tsx`, `TeamSection.tsx`, `Header.tsx`) are not mounted.

Order on the page:

1. `Navigation.tsx` — header and booking
2. `PremiumHero.tsx` — hero and practitioner intro
3. `TrustIconsTicker.tsx`
4. `AssessmentTool.tsx` — skin assessment; result is passed into the booking modal
5. `SkinAnalysisSection.tsx`
6. `AboutSection.tsx` — Claire and the clinic
7. `PremiumTreatments.tsx` — Morpheus8 packages and prices
8. `ResultsGallery.tsx` — before/after, including model-day booking
9. `ReviewsSection.tsx`
10. `FAQ.tsx`
11. `CTASection.tsx`
12. `Footer.tsx`
13. `BookingModal.tsx` — opened from booking buttons; supports a model-day variant

Form submissions post to `app/api/contact/route.ts`.

## Current pricing

Set in `components/PremiumTreatments.tsx`:

- Face, Neck & Décolleté: **£550** (marked most popular)
- Course of 3: **£1,650**
- Morpheus8 Face and Full Body: price on consultation (`POC`)

Change prices only in that component unless a request names other files.

## Project structure

```
/app
  ├── layout.tsx            # SEO, Open Graph, JSON-LD for morpheus8bedford.co.uk
  ├── page.tsx              # Renders PageWrapper
  ├── globals.css
  └── api/contact/route.ts  # Contact / booking form endpoint
/components                 # Sections listed above, plus unused legacy sections
/public
  ├── clarity-clinic-logo.png
  ├── robots.txt
  ├── sitemap.xml
  └── images/               # Hero, favicon, Morpheus8 before/after assets
```

## Files to edit for common requests

- **Copy and offers:** `PremiumHero.tsx`, `AboutSection.tsx`, `PremiumTreatments.tsx`, `FAQ.tsx`, `CTASection.tsx`
- **Contact details:** `Footer.tsx` and the JSON-LD block in `app/layout.tsx` (keep them in sync)
- **SEO and domain:** `app/layout.tsx` (`metadataBase` is `https://morpheus8bedford.co.uk`)
- **Booking behaviour:** `BookingModal.tsx`, `PageWrapper.tsx`, `app/api/contact/route.ts`
- **Embeds and CSP:** `next.config.js` and `vercel.json` allow `morpheus8bedford.co.uk`, LeadConnector, and Follow Up Systems widgets

## Content rules

- Keep the voice clinical, warm, and specific to Claire at Clarity Clinic in Bedford. Name, credentials, address, and phone are shared with the Harmony project.
- This page sells **Morpheus8 RF microneedling** only. Harmony laser copy, pricing, and URLs stay in `clarity-harmony`.
- Results gallery images credited to InMode must stay labelled as example results, not Clarity Clinic patient outcomes.
- `CONTENT-NEEDED.md` and `MORPHEUS8-IMAGES-NEEDED.md` are asset checklists. They are not the source of truth for live copy.

## Before finishing a change

- `npm run build` succeeds
- `npm run lint` is clean, or any new issues are fixed
- Booking modal still opens from the hero, assessment, and floating Book Now button
- Phone, address, and domain still match the values in this file
