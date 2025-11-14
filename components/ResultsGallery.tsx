'use client'

import { useState } from 'react'

interface ResultsGalleryProps {
  onBookingClick?: () => void
}

export default function ResultsGallery({ onBookingClick }: ResultsGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const results = [
    {
      title: 'Forehead Lines & Wrinkles',
      description: 'Dramatic reduction in horizontal forehead wrinkles and expression lines',
      treatmentArea: 'Upper Face'
    },
    {
      title: 'Acne Scar Reduction',
      description: 'Significant improvement in acne scarring with smoother, more even skin texture',
      treatmentArea: 'Full Face'
    },
    {
      title: 'Jawline & Jowl Tightening',
      description: 'Enhanced definition and tightening of lower face for a more youthful contour',
      treatmentArea: 'Lower Face'
    },
    {
      title: 'Neck Skin Tightening',
      description: 'Firmer, smoother neck with reduced crepiness and improved skin quality',
      treatmentArea: 'Neck'
    },
    {
      title: 'Smile Lines Softening',
      description: 'Reduced depth of nasolabial folds and improved mid-face skin quality',
      treatmentArea: 'Mid Face'
    },
    {
      title: 'Overall Skin Texture',
      description: 'Refined pores, smoother texture, and improved skin tone across entire face',
      treatmentArea: 'Full Face'
    },
    {
      title: 'Under Eye Rejuvenation',
      description: 'Tightened lower lid skin and reduced crepey texture around delicate eye area',
      treatmentArea: 'Eye Area'
    },
    {
      title: 'Full Face Transformation',
      description: 'Complete facial rejuvenation with overall tightening, lifting, and skin quality improvement',
      treatmentArea: 'Full Face & Neck'
    },
    {
      title: 'Body Contouring - Abdomen',
      description: 'Skin tightening and texture improvement on abdomen, reducing loose skin',
      treatmentArea: 'Body'
    }
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
            Browse our gallery of real patient results
          </p>
        </div>

        {/* Premium Results Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 lg:gap-8">
          {results.map((result, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-premium sm:hover:shadow-premium-lg transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(index)}
            >
              {/* Treatment Area Badge */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 bg-primary-500/90 backdrop-blur text-white rounded-full px-2.5 sm:px-3 py-1 sm:py-1.5">
                <span className="text-xs sm:text-sm font-medium">{result.treatmentArea}</span>
              </div>

              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100">
                {/* Coming Soon Placeholder */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="w-24 h-24 mb-4 rounded-full border-4 border-primary-500 border-dashed flex items-center justify-center opacity-30">
                    <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600 mb-2">COMING SOON</p>
                    <p className="text-sm text-primary-500">Before & After Results</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-7">
                <h3 className="font-bold text-base sm:text-lg lg:text-xl mb-1 sm:mb-2">{result.title}</h3>
                <p className="text-sm sm:text-base lg:text-lg text-neutral-600">{result.description}</p>
                
                <div className="mt-3 sm:mt-4 flex items-center text-primary-600 font-medium text-sm">
                  <span>View Details</span>
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Treatment Room Showcase - Mobile Optimized */}
        <div className="mt-8 sm:mt-12">
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-premium">
            <img
              src="/images/treatment.jpg"
              alt="Claire's Beautiful Bespoke Treatment Room at Clarity Cosmetics"
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
                  onClick={onBookingClick}
                  className="inline-flex items-center bg-white text-primary-600 px-5 sm:px-6 py-3.5 sm:py-4 rounded-full font-medium text-sm sm:text-base hover:shadow-lg transition-all duration-300 min-h-[48px]"
                >
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section - Mobile Optimized */}
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

        {/* Lightbox Modal - Mobile Optimized */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-3 sm:p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl w-full aspect-square bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="w-32 h-32 mb-6 rounded-full border-4 border-primary-500 border-dashed flex items-center justify-center opacity-30">
                  <svg className="w-16 h-16 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary-600 mb-3">COMING SOON</p>
                  <p className="text-xl text-primary-500 mb-2">{results[selectedImage].title}</p>
                  <p className="text-sm text-primary-400">Before & After Results</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-white/90 backdrop-blur rounded-full p-3 sm:p-4 hover:bg-white transition w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center"
                aria-label="Close"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}