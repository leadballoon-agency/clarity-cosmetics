'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Award, BadgeCheck, Camera, Expand, ShieldCheck, Stethoscope } from 'lucide-react'
import roomImage from '@/public/images/shoot/DSC09678.jpg'
import ResultsLightbox, { LightboxItem } from './ResultsLightbox'

interface ResultsGalleryProps {
  onBookingClick?: (isModelDay?: boolean) => void
}

const SQUARE = { width: 466, height: 420 }

// Real Clarity Clinic client (composite before/after, 1080x1080)
const showcaseResult: LightboxItem = {
  title: 'Face, Neck & Jawline Transformation',
  description: 'Visible tightening along the jawline, reduced jowls, and smoother skin texture after Morpheus8 treatment',
  treatmentArea: 'Face & Neck',
  image: { src: 'https://assets.cdn.filesafe.space/8PNaWjnYgGoS1sfgwICL/media/699421826bac24063ff3bc1e.jpeg', width: 1080, height: 1080 },
}

// Example results courtesy of InMode
const results: (LightboxItem & { tileClass?: string })[] = [
  {
    title: 'Nasolabial Folds & Skin Texture',
    description: 'Reduced nasolabial folds with improved skin texture and tone',
    treatmentArea: 'Mid Face',
    before: { src: '/images/inmode-ba/forehead-before.jpg', width: 557, height: 370 },
    after: { src: '/images/inmode-ba/forehead-after.jpg', width: 557, height: 370 },
    // Source has 'Before'/'After' text baked into the bottom corners; crop it out of the tile
    tileClass: 'scale-[1.2] origin-top',
  },
  {
    title: 'Acne Scar Reduction',
    description: 'Significant improvement in acne scarring with smoother, more even skin texture',
    treatmentArea: 'Full Face',
    before: { src: '/images/inmode-ba/acne-before.png', ...SQUARE },
    after: { src: '/images/inmode-ba/acne-after.png', ...SQUARE },
  },
  {
    title: 'Jawline & Jowl Tightening',
    description: 'Enhanced definition and tightening of lower face for a more youthful contour',
    treatmentArea: 'Lower Face',
    before: { src: '/images/inmode-ba/jawline-before.png', ...SQUARE },
    after: { src: '/images/inmode-ba/jawline-after.png', ...SQUARE },
  },
  {
    title: 'Neck Skin Tightening',
    description: 'Firmer, smoother neck with reduced crepiness and improved skin quality',
    treatmentArea: 'Neck',
    before: { src: '/images/inmode-ba/neck-before.png', ...SQUARE },
    after: { src: '/images/inmode-ba/neck-after.png', ...SQUARE },
  },
  {
    title: 'Smile Lines Softening',
    description: 'Reduced depth of nasolabial folds and improved mid-face skin quality',
    treatmentArea: 'Mid Face',
    before: { src: '/images/inmode-ba/smile-before.jpg', width: 494, height: 370 },
    after: { src: '/images/inmode-ba/smile-after.jpg', width: 494, height: 370 },
    // Source has 'Before'/'After' text baked into the bottom corners; crop it out of the tile
    tileClass: 'scale-[1.2] origin-top',
  },
  {
    title: 'Overall Skin Texture',
    description: 'Refined pores, smoother texture, and improved skin tone across entire face',
    treatmentArea: 'Full Face',
    before: { src: '/images/inmode-ba/texture-before.png', ...SQUARE },
    after: { src: '/images/inmode-ba/texture-after.png', ...SQUARE },
  },
]

const lightboxItems = [showcaseResult, ...results]

// Each before/after half is ~160px wide on desktop, ~45% of a card on mobile.
const TILE_SIZES = '(min-width: 1024px) 165px, (min-width: 768px) 22vw, 38vw'

const chip = 'pointer-events-none absolute top-1.5 left-1.5 rounded-full bg-white/90 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.14em] text-ink'

export default function ResultsGallery({ onBookingClick }: ResultsGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const stats = [
    { icon: Award, label: '10+ years experience' },
    { icon: Stethoscope, label: 'Midwife & nurse‑led clinic' },
    { icon: ShieldCheck, label: 'CQC registered' },
    { icon: BadgeCheck, label: 'FDA-cleared device' },
  ]

  return (
    <section id="results" className="section-y bg-cream-50">
      <div className="max-w-6xl mx-auto section-padding">
        <div className="text-center mb-10 sm:mb-14">
          <span className="eyebrow">Real results</span>
          <h2 className="heading-2 mt-4">
            Transformations that <em className="heading-accent">speak for themselves</em>
          </h2>
          <p className="lead mt-4 max-w-[46ch] mx-auto">
            Side-by-side before and after results from real Morpheus8&nbsp;treatments
          </p>
        </div>

        <div className="mx-auto max-w-[1040px]">
          {/* Featured: real Clarity Clinic client */}
          <figure className="grid sm:grid-cols-[minmax(0,300px)_1fr] items-center gap-5 sm:gap-8 pb-10 sm:pb-12 mb-10 sm:mb-12 border-b border-cream-200">
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="group relative mx-auto w-full max-w-[300px] aspect-square overflow-hidden rounded-xl border border-cream-200 bg-cream-100"
              aria-label={`View ${showcaseResult.title} larger`}
            >
              <img
                src={showcaseResult.image!.src}
                alt={`${showcaseResult.title} - Before and After`}
                width={1080}
                height={1080}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <span className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 transition-opacity group-hover:opacity-100">
                <Expand className="h-3.5 w-3.5" strokeWidth={1.5} />
              </span>
            </button>
            <figcaption className="text-center sm:text-left">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary-600">
                Real client result · {showcaseResult.treatmentArea}
              </p>
              <h3 className="heading-3 mt-2">{showcaseResult.title}</h3>
              <p className="text-[15px] text-neutral-600 mt-2 max-w-[48ch] mx-auto sm:mx-0">{showcaseResult.description}</p>
            </figcaption>
          </figure>

          {/* Example results grid: swipe row on mobile, 2 cols tablet, 3 cols desktop */}
          <ul
            className="-mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
            aria-label="Example Morpheus8 before and after results"
          >
            {results.map((result, i) => (
              <li key={result.title} className="w-[76%] flex-shrink-0 snap-start sm:w-[46%] md:w-auto">
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i + 1)}
                  className="group block w-full text-left"
                  aria-label={`View ${result.title} before and after larger`}
                >
                  <div className="grid grid-cols-2 gap-1 overflow-hidden rounded-xl">
                    {[
                      { img: result.before!, label: 'Before' },
                      { img: result.after!, label: 'After' },
                    ].map(({ img, label }) => (
                      <div key={label} className="relative aspect-square overflow-hidden bg-cream-100">
                        <Image
                          src={img.src}
                          alt={`${result.title} - ${label}`}
                          fill
                          sizes={TILE_SIZES}
                          className={`object-cover object-center transition-transform duration-500 ${result.tileClass ?? 'group-hover:scale-[1.03]'}`}
                        />
                        <span className={chip}>{label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500 group-hover:text-primary-700 transition-colors">
                    {result.treatmentArea}
                  </p>
                  <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{result.description}</p>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-center text-[11px] uppercase tracking-[0.16em] text-neutral-400 md:hidden" aria-hidden="true">
            Swipe to see more · Tap to enlarge
          </p>

          {/* ASA Compliance Disclaimer */}
          <p className="mt-6 mx-auto max-w-[70ch] text-center text-xs text-neutral-500 italic">
            Example results courtesy of InMode. Individual results may vary. Not representative of Clarity Clinic patient outcomes.
          </p>
        </div>

        <ResultsLightbox
          items={lightboxItems}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />

        {/* Model Day CTA */}
        <div className="mt-12 sm:mt-16 rounded-2xl border border-primary-200 bg-primary-50/60 px-6 py-10 sm:px-10 text-center">
          <Camera className="mx-auto h-7 w-7 text-primary-600" strokeWidth={1.25} aria-hidden="true" />
          <h3 className="heading-2 !text-[1.625rem] sm:!text-[2rem] mt-4">Want to be our next transformation?</h3>
          <p className="lead mt-3 max-w-[46ch] mx-auto">
            Become a model and receive discounted Morpheus8 treatment in exchange for before &amp; after&nbsp;photos
          </p>
          <button onClick={() => onBookingClick?.(true)} className="btn-primary mt-7">
            Apply for Model Day
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* Treatment Room Showcase */}
        <div className="mt-12 sm:mt-16 grid lg:grid-cols-12 gap-0 overflow-hidden rounded-2xl bg-ink">
          <div className="relative lg:col-span-7 aspect-[3/2] lg:aspect-auto lg:min-h-[440px]">
            <Image
              src={roomImage}
              alt="Claire Emmerson's bespoke treatment room at Clarity Clinic, with the Morpheus8 device"
              fill
              sizes="(min-width: 1152px) 650px, (min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-5 flex flex-col justify-center p-7 sm:p-10">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-primary-300">The clinic</span>
            <h3 className="font-display text-[1.75rem] sm:text-[2rem] leading-[1.15] text-white mt-4">
              Your comfort is our priority
            </h3>
            <p className="text-white/75 text-[15px] leading-relaxed mt-4">
              Experience treatments in our beautiful, bespoke treatment room. Immaculately maintained with state-of-the-art equipment in a calming, professional environment.
            </p>
            <button onClick={() => onBookingClick?.(false)} className="btn-light mt-7 self-start">
              Schedule Consultation
            </button>
          </div>
        </div>

        {/* Stats */}
        <ul className="mt-12 sm:mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-cream-200 pt-10">
          {stats.map(({ icon: Icon, label }) => (
            <li key={label} className="flex flex-col items-center text-center gap-3">
              <Icon className="h-6 w-6 text-primary-600" strokeWidth={1.25} aria-hidden="true" />
              <span className="text-[14px] text-neutral-700">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
