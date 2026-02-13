'use client'

import { useState } from 'react'

interface SkinAnalysisSectionProps {
  onBookingClick?: () => void
}

const SKIN_ANALYSIS_VIDEO = 'https://storage.googleapis.com/msgsndr/8PNaWjnYgGoS1sfgwICL/media/693b26b7ed957f58d50fee19.mp4'

export default function SkinAnalysisSection({ onBookingClick }: SkinAnalysisSectionProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section id="skin-analysis" className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Video */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-neutral-900">
              {isVideoPlaying ? (
                <div className="aspect-[9/16] sm:aspect-[3/4] max-h-[500px]">
                  <video
                    src={SKIN_ANALYSIS_VIDEO}
                    controls
                    autoPlay
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="relative w-full group cursor-pointer"
                  aria-label="Play skin analysis video"
                >
                  <div className="aspect-[9/16] sm:aspect-[3/4] max-h-[500px] bg-gradient-to-br from-primary-100 via-primary-50 to-white flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/90 backdrop-blur rounded-full flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="mt-4 text-primary-600 font-medium text-sm sm:text-base">Watch Skin Analysis Demo</p>
                    </div>
                  </div>
                </button>
              )}
            </div>

            {/* Badge */}
            <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur rounded-full px-3 sm:px-4 py-1.5 sm:py-2 shadow-lg">
              <div className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="text-xs sm:text-sm font-medium text-neutral-800">Professional Diagnostic Imaging</span>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <div>
              <span className="text-primary-600 font-medium tracking-wider uppercase text-xs sm:text-sm">Your Journey Starts Here</span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-3">
                Book Your
                <span className="block gradient-text">Skin Analysis</span>
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mt-3 sm:mt-4">
                Every Morpheus8 treatment begins with a professional skin analysis. Claire will assess your skin beneath the surface to create a bespoke treatment plan tailored to your unique concerns.
              </p>
            </div>

            {/* Checkmarks */}
            <ul className="space-y-3">
              {[
                'In-depth skin assessment with advanced imaging',
                'Personalised Morpheus8 treatment plan',
                'Fully redeemable against your treatment'
              ].map((item, index) => (
                <li key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm sm:text-base text-neutral-700">{item}</span>
                </li>
              ))}
            </ul>

            {/* Pricing Cards */}
            <div className="space-y-3">
              {/* Main Treatment */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-premium border border-primary-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-neutral-800 text-sm sm:text-base">Face, Neck & Decollete</h4>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">Complete upper body rejuvenation</p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold gradient-text">£395</p>
                </div>
              </div>

              {/* Skin Analysis */}
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl sm:rounded-2xl p-4 sm:p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-sm sm:text-base">Skin Analysis Consultation</h4>
                    <p className="text-white/80 text-xs sm:text-sm mt-0.5">FREE when you proceed with treatment</p>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold">£25</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={onBookingClick}
              className="w-full inline-flex items-center justify-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-full font-semibold text-base hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[48px]"
            >
              Book Your Skin Analysis
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>

            <p className="text-xs text-neutral-500 text-center">
              Consultation fee is fully redeemable against any Morpheus8 treatment
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
