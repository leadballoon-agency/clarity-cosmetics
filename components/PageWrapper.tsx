'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import PremiumHero from '@/components/PremiumHero'
import TrustIconsTicker from '@/components/TrustIconsTicker'
import AssessmentTool from '@/components/AssessmentTool'
import SkinAnalysisSection from '@/components/SkinAnalysisSection'
import AboutSection from '@/components/AboutSection'
import PremiumTreatments from '@/components/PremiumTreatments'
import ResultsGallery from '@/components/ResultsGallery'
import ReviewsSection from '@/components/ReviewsSection'
import FAQ from '@/components/FAQ'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import BookingModal from '@/components/BookingModal'
import ScrollToTop from '@/components/ScrollToTop'

export default function PageWrapper() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isModelDayBooking, setIsModelDayBooking] = useState(false)
  const [assessmentData, setAssessmentData] = useState<any>(null)
  const [showFloatingCta, setShowFloatingCta] = useState(false)

  // Floating "Book Now" only appears once the visitor has scrolled past the hero,
  // so it never covers the hero's own CTAs or the "Watch Claire" pill.
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById('hero')
      const threshold = hero ? hero.offsetTop + hero.offsetHeight - 80 : 600
      setShowFloatingCta(window.scrollY > threshold)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const handleBookingClick = (isModelDay = false) => {
    setIsModelDayBooking(isModelDay)
    setIsBookingModalOpen(true)
  }

  return (
    <>
      <ScrollToTop />
      <Navigation onBookingClick={() => handleBookingClick(false)} />
      <main className="overflow-hidden">
        <PremiumHero onBookingClick={() => handleBookingClick(false)} />
        <TrustIconsTicker />
        <SkinAnalysisSection />
        <AssessmentTool
          onBookingClick={() => handleBookingClick(false)}
          onAssessmentComplete={(data) => setAssessmentData(data)}
        />
        <AboutSection onBookingClick={() => handleBookingClick(false)} />
        <PremiumTreatments onBookingClick={() => handleBookingClick(false)} />
        <ResultsGallery onBookingClick={handleBookingClick} />
        <ReviewsSection />
        <FAQ onBookingClick={() => handleBookingClick(false)} />
        <CTASection onBookingClick={() => handleBookingClick(false)} />
      </main>
      <Footer />
      
      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        assessmentData={assessmentData}
        isModelDay={isModelDayBooking}
      />

      {/* Floating Book Now Button */}
      <button
        onClick={() => handleBookingClick(false)}
        aria-hidden={!showFloatingCta}
        tabIndex={showFloatingCta ? 0 : -1}
        className={`btn-primary fixed bottom-4 left-1/2 -translate-x-1/2 sm:bottom-6 sm:left-6 sm:translate-x-0 z-40 !min-h-0 !py-2.5 !px-5 !text-[14px] shadow-[0_6px_20px_-6px_rgba(31,39,35,0.35)] transition-[opacity,transform] duration-300 ${
          showFloatingCta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        Book Now
        <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </>
  )
}