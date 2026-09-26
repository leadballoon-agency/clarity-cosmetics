# Morpheus8 Bedford — Clarity Cosmetics

## Project overview

This repo is the **Morpheus8 RF microneedling** landing page for Clarity Clinic (Claire Emmerson) in Bedford. Next.js 15, TypeScript, Tailwind CSS, deployed on Vercel.

Clarity Cosmetics has three landing-page repos. Read [CLARITY-SITES.md](./CLARITY-SITES.md) before starting work.

1. **Now — this repo** (`clarity-cosmetics`): Morpheus8. Finish this site before opening the next one.
2. **Next** (`bladder-leaks`): intimate health / EmpowerRF bladder-leak site at bladderleaks.co.uk. Do not start it until Morpheus8 is finished.
3. **Existing** (`clarity-harmony`): Alma Harmony laser at laserbedford.co.uk. Separate repo. Do not change it from this workspace.

## Tech stack

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## Development commands

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
```

## Project structure

```
/app
  ├── layout.tsx          # SEO metadata (morpheus8bedford.co.uk)
  ├── page.tsx            # Main page wrapper
  ├── globals.css
  └── api/contact/        # Contact form API
/components               # Page sections, booking modal, assessment
/public/images/           # Logos, hero, before/after
CLARITY-SITES.md          # The three repos and build order
CLARITY-KNOWLEDGE-BASE.md # Shared clinic and treatment background
```

## Clinic facts used on this site

- Business: Clarity Clinic / Clarity Cosmetics
- Practitioner: Claire Emmerson, RN, Independent Prescriber
- Address: Conway Crescent, Bedford, MK41 7BW
- Phone: 07414 154007
- Email: info@claritycosmetics.co.uk
- Domain: https://morpheus8bedford.co.uk

Confirm prices in the components before editing them. As of 4 Aug 2026 the published Morpheus8 prices are £550 for a single treatment and £1,650 for a course of 3.

## Notes

- TypeScript strict mode
- Mobile-first layout
- Form submissions go to `/api/contact`
- Booking modal integrates with the assessment tool
- Keep Alma Harmony and intimate-health copy out of this repo
