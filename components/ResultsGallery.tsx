'use client'

import { useState } from 'react'

interface ResultsGalleryProps {
  onBookingClick?: (isModelDay?: boolean) => void
}

export default function ResultsGallery({ onBookingClick }: ResultsGalleryProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const showcaseResult = {
    title: 'Face, Neck & Jawline Transformation',
    description: 'Visible tightening along the jawline, reduced jowls, and smoother skin texture after Morpheus8 treatment',
    treatmentArea: 'Face & Neck',
    image: 'https://assets.cdn.filesafe.space/8PNaWjnYgGoS1sfgwICL/media/699421826bac24063ff3bc1e.jpeg',
    isRealClient: true,
  }

  const results = [
    {
      title: 'Nasolabial Folds & Skin Texture',
      description: 'Reduced nasolabial folds with improved skin texture and tone',
      treatmentArea: 'Mid Face',
      afterImage: '/images/inmode-ba/forehead-after.jpg',
      beforeImage: '/images/inmode-ba/forehead-before.jpg',
    },
    {
      title: 'Acne Scar Reduction',
      description: 'Significant improvement in acne scarring with smoother, more even skin texture',
      treatmentArea: 'Full Face',
      afterImage: '/images/inmode-ba/acne-after.png',
      beforeImage: '/images/inmode-ba/acne-before.png',
    },
    {
      title: 'Jawline & Jowl Tightening',
      description: 'Enhanced definition and tightening of lower face for a more youthful contour',
      treatmentArea: 'Lower Face',
      afterImage: '/images/inmode-ba/jawline-after.png',
      beforeImage: '/images/inmode-ba/jawline-before.png',
    },
    {
      title: 'Neck Skin Tightening',
      description: 'Firmer, smoother neck with reduced crepiness and improved skin quality',
      treatmentArea: 'Neck',
      afterImage: '/images/inmode-ba/neck-after.png',
      beforeImage: '/images/inmode-ba/neck-before.png',
    },
    {
      title: 'Smile Lines Softening',
      description: 'Reduced depth of nasolabial folds and improved mid-face skin quality',
      treatmentArea: 'Mid Face',
      afterImage: '/images/inmode-ba/smile-after.jpg',
      beforeImage: '/images/inmode-ba/smile-before.jpg',
    },
    {
      title: 'Overall Skin Texture',
      description: 'Refined pores, smoother texture, and improved skin tone across entire face',
      treatmentArea: 'Full Face',
      afterImage: '/images/inmode-ba/texture-after.png',
      beforeImage: '/images/inmode-ba/texture-before.png',
    },
  ]

  return (
    <section id="results" className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <span className="text-primary-600 font-medium tracking-wider uppercase text-sm">Real Results</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-4">
            Transformations That
            <span className="block gradient-text">Speak For Themselves</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-neutral-600 mt-2 sm:mt-4 max-w-2xl mx-auto px-4 leading-relaxed">
            Side-by-side before and after results from real Morpheus8 treatments
          </p>
        </div>

        {/* Showcase - Real Client Result */}
        <div className="mb-8 sm:mb-12 max-w-3xl mx-auto">
          <div className="relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-premium-lg">
            <div className="absolute top-3 left-3 z-10 bg-green-500 text-white backdrop-blur rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5">
              <span className="text-xs sm:text-sm font-medium">Real Client Result</span>
            </div>
            <div className="absolute top-3 right-3 z-10 bg-primary-500/90 text-white backdrop-blur rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5">
              <span className="text-xs sm:text-sm font-medium">{showcaseResult.treatmentArea}</span>
            </div>
            <img
              src={showcaseResult.image}
              alt={`${showcaseResult.title} - Before and After`}
              className="w-full h-auto"
            />
            <div className="p-4 sm:p-6">
              <h3 className="font-bold text-lg sm:text-xl mb-1">{showcaseResult.title}</h3>
              <p className="text-sm sm:text-base text-neutral-600">{showcaseResult.description}</p>
            </div>
          </div>
        </div>

        {/* Before & After Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {results.map((result, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-300"
            >
              {/* Before / After Images - Side by Side */}
              <div className="relative">
                <div className="grid grid-cols-2">
                  {/* Before */}
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={result.beforeImage}
                        alt={`${result.title} - Before`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent pt-8 pb-3 px-3">
                      <span className="text-white text-xs sm:text-sm font-semibold uppercase tracking-wider">Before</span>
                    </div>
                  </div>
                  {/* After */}
                  <div className="relative">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={result.afterImage}
                        alt={`${result.title} - After`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary-700/70 to-transparent pt-8 pb-3 px-3">
                      <span className="text-white text-xs sm:text-sm font-semibold uppercase tracking-wider">After</span>
                    </div>
                  </div>
                </div>
                {/* Divider Line */}
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/80 z-10"></div>
                {/* Treatment Area Badge */}
                <div className="absolute top-3 left-3 z-10 bg-primary-500/90 text-white backdrop-blur rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5">
                  <span className="text-xs sm:text-sm font-medium">{result.treatmentArea}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-base sm:text-lg mb-1">{result.title}</h3>
                <p className="text-sm text-neutral-600">{result.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Model Day CTA */}
        <div className="mt-8 sm:mt-12">
          <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 text-center text-white">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">Want to Be Our Next Transformation?</h3>
            <p className="text-white/80 text-sm sm:text-base mb-6 max-w-xl mx-auto">
              Become a model and receive discounted Morpheus8 treatment in exchange for before & after photos
            </p>
            <button
              onClick={() => onBookingClick?.(true)}
              className="inline-flex items-center bg-white text-primary-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Apply for Model Day
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* ASA Compliance Disclaimer */}
        <div className="mt-6 text-center">
          <p className="text-xs sm:text-sm text-neutral-500 italic">
            Example results courtesy of InMode. Individual results may vary. Not representative of Clarity Clinic patient outcomes.
          </p>
        </div>

        {/* Treatment Room Showcase */}
        <div className="mt-8 sm:mt-12">
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-premium">
            <img
              src="/images/treatment.jpg"
              alt="Claire Emmerson's Beautiful Bespoke Treatment Room at Clarity Clinic"
              className="w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 sm:from-black/60 via-black/40 sm:via-transparent to-transparent flex items-center">
              <div className="p-6 sm:p-8 md:p-12 max-w-full sm:max-w-lg">
                <h3 className="text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-4">
                  Your Comfort is Our Priority
                </h3>
                <p className="text-white/90 text-sm sm:text-base mb-4 sm:mb-6">
                  Experience treatments in our beautiful, bespoke treatment room. Immaculately maintained with state-of-the-art equipment in a calming, professional environment.
                </p>
                <button
                  onClick={() => onBookingClick?.(false)}
                  className="inline-flex items-center bg-white text-primary-600 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full font-medium text-sm sm:text-base hover:shadow-lg transition-all duration-300 min-h-[48px]"
                >
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { number: '10+', label: 'Years Experience' },
            { number: 'RN', label: 'Nurse-Led Clinic' },
            { number: 'CQC', label: 'Registered' },
            { number: 'FDA', label: 'Cleared Device' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold gradient-text mb-1 sm:mb-2">{stat.number}</p>
              <p className="text-xs sm:text-sm text-neutral-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
