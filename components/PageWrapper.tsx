'use client'

import { useState } from 'react'
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
        className="btn-primary fixed bottom-5 left-5 z-40 !min-h-0 !py-2.5 !px-5 !text-[14px] shadow-[0_6px_20px_-6px_rgba(31,39,35,0.35)]"
      >
        Book Now
        <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </>
  )
}