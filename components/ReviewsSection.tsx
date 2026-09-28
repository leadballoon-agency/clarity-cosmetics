'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Star } from 'lucide-react'

interface Review {
  name: string
  rating: number
  date: string
  text: string
  treatment?: string
}

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [currentViewport, setCurrentViewport] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')

  const reviews: Review[] = [
    {
      name: 'Emma L.',
      rating: 5,
      date: '3 weeks ago',
      text: 'I had Morpheus8 treatment with Claire and couldn\'t be happier with the results! Claire\'s medical background really shows - she explained everything thoroughly and made me feel completely at ease. The clinic is immaculate and the results are natural-looking. Highly recommend!',
      treatment: 'Morpheus8 RF Microneedling'
    },
    {
      name: 'Sarah M.',
      rating: 5,
      date: '1 month ago',
      text: 'Claire is absolutely wonderful! As a registered midwife and nurse, she brings a level of medical expertise and care that you just don\'t find everywhere. The studio is beautiful and spotlessly clean. I felt safe and well looked after throughout my treatment.',
      treatment: 'Aesthetic Consultation'
    },
    {
      name: 'Jennifer K.',
      rating: 5,
      date: '2 months ago',
      text: 'Best decision I ever made! Claire took the time to understand my concerns and created a treatment plan specifically for me. The RF microneedling has dramatically improved my skin texture and tightness. Professional, knowledgeable, and caring - first class all round!',
      treatment: 'RF Microneedling'
    },
    {
      name: 'Rachel P.',
      rating: 5,
      date: '3 months ago',
      text: 'I was nervous about having aesthetic treatments but Claire made me feel so comfortable. Her medical knowledge is exceptional and she really cares about getting natural results. The clinic facilities are top-notch and hygiene standards are impeccable.',
      treatment: 'Skin Consultation'
    },
    {
      name: 'Lisa H.',
      rating: 5,
      date: '2 months ago',
      text: 'Claire is simply amazing! The professionalism, attention to detail, and genuine care she shows is outstanding. My skin has never looked better after Morpheus8. She\'s not just about making money - she truly wants the best outcomes for her patients.',
      treatment: 'Morpheus8 Treatment'
    },
    {
      name: 'Victoria S.',
      rating: 5,
      date: '1 month ago',
      text: 'As someone who researched extensively before choosing a practitioner, I can say Claire exceeded all expectations. Her medical background as an RN and Independent Prescriber gives me complete confidence. Results are fantastic and the whole experience is first class.',
      treatment: 'Advanced Skin Treatment'
    },
    {
      name: 'Amanda T.',
      rating: 5,
      date: '4 weeks ago',
      text: 'The results from my treatment have been incredible! Claire\'s expertise and warm, professional approach made the whole experience wonderful. The clinic is beautiful and you can tell safety and hygiene are priorities. I wouldn\'t go anywhere else!',
      treatment: 'Facial Rejuvenation'
    },
    {
      name: 'Michelle D.',
      rating: 5,
      date: '6 weeks ago',
      text: 'Claire is an absolute gem! Her medical knowledge combined with her artistic eye for natural-looking results is rare. The studio environment is calming and professional. I\'ve recommended her to all my friends - she truly is the best in Bedford!',
      treatment: 'Morpheus8 & Skin Treatments'
    }
  ]

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  }

  // Detect viewport size
  useEffect(() => {
    const handleResize = () => {
      let newViewport: 'mobile' | 'tablet' | 'desktop' = 'mobile'

      if (window.innerWidth >= 1024) {
        newViewport = 'desktop'
      } else if (window.innerWidth >= 768) {
        newViewport = 'tablet'
      }

      setCurrentViewport(newViewport)

      // Reset index if out of bounds for new viewport
      const perView = itemsPerView[newViewport]
      const maxIndex = Math.max(0, reviews.length - perView)
      setCurrentIndex(prev => Math.min(prev, maxIndex))
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate max index based on viewport
  const getMaxIndex = () => {
    const perView = itemsPerView[currentViewport]
    return Math.max(0, reviews.length - perView)
  }

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return

    const maxIndex = getMaxIndex()
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, reviews.length, currentViewport])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    const maxIndex = getMaxIndex()
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    const maxIndex = getMaxIndex()
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    const maxIndex = getMaxIndex()
    setCurrentIndex(Math.min(index, maxIndex))
  }

  // Calculate transform percentage based on viewport
  const getTransformPercentage = () => {
    const perView = itemsPerView[currentViewport]
    const gap = currentViewport === 'mobile' ? 16 : 24
    // Each step is one card width plus one gap: (100% + gap) / perView
    return `calc(-${currentIndex} * (${100 / perView}% + ${gap / perView}px))`
  }

  const GoogleIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 24 24" aria-label="Google review">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  )

  const Stars = ({ count }: { count: number }) => (
    <div className="flex items-center gap-0.5" aria-label={`${count} out of 5 stars`}>
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 text-[#c9a24d]" fill="currentColor" strokeWidth={0} />
      ))}
    </div>
  )

  const arrowBtn = 'flex h-11 w-11 items-center justify-center rounded-full border border-cream-300 bg-white text-ink transition-colors hover:border-primary-500 hover:text-primary-700'

  return (
    <section className="section-y bg-cream-100">
      <div className="max-w-6xl mx-auto section-padding">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-12 text-center md:text-left">
          <div>
            <span className="eyebrow">Patient testimonials</span>
            <h2 className="heading-2 mt-4">
              Trusted by patients <em className="heading-accent">across Bedford</em>
            </h2>
            <div className="mt-4 flex items-center justify-center md:justify-start gap-2.5">
              <Stars count={5} />
              <span className="text-sm text-neutral-600">5.0 on Google · Real reviews from real patients</span>
            </div>
          </div>
          <div className="hidden md:flex gap-2">
            <button onClick={prevSlide} className={arrowBtn} aria-label="Previous review">
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <button onClick={nextSlide} className={arrowBtn} aria-label="Next review">
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out gap-4 md:gap-6"
            style={{
              transform: `translateX(${getTransformPercentage()})`,
            }}
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <figure className="card h-full flex flex-col p-6 sm:p-7">
                  <Stars count={review.rating} />
                  <blockquote className="mt-4 flex-grow text-[15px] leading-relaxed text-neutral-700">
                    “{review.text}”
                  </blockquote>
                  <figcaption className="mt-6 pt-4 border-t border-cream-200 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-display text-[17px] text-ink">{review.name}</p>
                      <p className="text-xs text-neutral-500 mt-0.5">
                        {review.treatment ? `${review.treatment} · ` : ''}{review.date}
                      </p>
                    </div>
                    <GoogleIcon />
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden justify-center gap-3 mt-6">
          <button onClick={prevSlide} className={arrowBtn} aria-label="Previous review">
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button onClick={nextSlide} className={arrowBtn} aria-label="Next review">
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-1 mt-8">
          {Array.from({ length: getMaxIndex() + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="p-1.5"
              aria-label={`Go to review ${index + 1}`}
            >
              <span
                className={`block h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-6 bg-primary-600' : 'w-1.5 bg-cream-300 hover:bg-primary-300'
                }`}
              />
            </button>
          ))}
        </div>

        {/* CTA to Google Reviews */}
        <div className="text-center mt-8">
          <a
            href="https://www.google.com/search?q=clarity+cosmetics+bedford"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[15px] font-medium text-primary-700 hover:text-primary-800 underline-offset-4 hover:underline"
          >
            Read all reviews on Google
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </section>
  )
}
