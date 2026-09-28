'use client'

import { useEffect } from 'react'
import { CalendarDays, Camera, ShieldCheck, Star, Stethoscope, X } from 'lucide-react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  assessmentData?: any
  isModelDay?: boolean
}

export default function BookingModal({ isOpen, onClose, isModelDay = false }: BookingModalProps) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'

      if (isModelDay) {
        // Model Day uses iframe to GHL-hosted page with Voice AI widget
        console.log('Model Day modal opened - loading GHL voice AI page in iframe')
        return () => {
          // No cleanup needed for iframe
        }
      } else {
        // Load GHL calendar for regular bookings
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.src = 'https://link.morpheus8bedford.co.uk/js/form_embed.js'

        document.body.appendChild(script)

        return () => {
          try {
            document.body.removeChild(script)
          } catch (e) {
            // Script already removed
          }
        }
      }
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, isModelDay])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
      {/* Backdrop with glassmorphism */}
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container - Full screen on mobile, contained on desktop */}
      <div className="relative w-full h-full sm:h-auto sm:max-h-[95vh] sm:max-w-4xl bg-white sm:rounded-2xl shadow-xl overflow-hidden animate-modal-slide-up flex flex-col">

        {/* Premium Header */}
        <div className={`relative bg-cream-50 border-b border-cream-200 ${isModelDay ? 'p-4 sm:p-5' : 'p-5 sm:p-7'} pr-16 sm:pr-20 flex-shrink-0`}>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 rounded-full border border-cream-300 bg-white text-ink flex items-center justify-center hover:border-primary-500 transition-colors z-10"
            aria-label="Close booking calendar"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>

          {/* Header content */}
          <div className="relative flex items-start gap-4">
            <div className="hidden sm:flex items-center justify-center w-11 h-11 flex-shrink-0 rounded-full border border-primary-200 bg-white text-primary-600">
              {isModelDay ? <Camera className="h-5 w-5" strokeWidth={1.25} /> : <CalendarDays className="h-5 w-5" strokeWidth={1.25} />}
            </div>
            <div>
            <h2 className="heading-3 !text-2xl sm:!text-[1.75rem] mb-1.5">
              {isModelDay ? 'Request a Model Day' : 'Book Your Consultation'}
            </h2>
            <p className="text-neutral-600 text-sm sm:text-[15px] max-w-2xl">
              {isModelDay
                ? 'Book your discounted model day appointment. Claire will confirm availability and discuss before & after photo requirements within 24 hours.'
                : 'Choose your preferred date and time. Claire will confirm your appointment within 24 hours.'
              }
            </p>
            </div>
          </div>
        </div>

        {/* Calendar Widget Container - Fills remaining space */}
        <div className="flex-1 overflow-hidden bg-white relative">

          {/* Widget wrapper with proper padding */}
          <div className="relative h-full w-full p-4 sm:p-6 overflow-auto">
            <div className="bg-white min-h-full">
              {isModelDay ? (
                /* AI Voice Agent - iFrame to GHL hosted page */
                <iframe
                  src="https://voice.morpheus8bedford.co.uk/test-funnel"
                  style={{
                    width: '100%',
                    minHeight: '1000px',
                    height: '100%',
                    border: 'none',
                    overflow: 'auto'
                  }}
                  title="Model Day Voice AI Assistant"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  allow="microphone https://voice.morpheus8bedford.co.uk; payment; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              ) : (
                /* Regular Booking Calendar */
                <iframe
                  src="https://link.morpheus8bedford.co.uk/widget/booking/7PJeNEA5l2Umhuvlpokj"
                  style={{
                    width: '100%',
                    minHeight: '600px',
                    height: '100%',
                    border: 'none',
                    overflow: 'auto'
                  }}
                  id="7PJeNEA5l2Umhuvlpokj_1763324226671"
                  title="Morpheus8 Booking Calendar"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  allow="payment 'src'; fullscreen 'src'"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              )}
            </div>
          </div>
        </div>

        {/* Trust Badge Footer - Hidden for Model Day to maximize content space */}
        {!isModelDay && (
          <div className="flex-shrink-0 bg-white border-t border-cream-200 px-5 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-center gap-6 text-xs sm:text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary-600" strokeWidth={1.5} />
                <span className="hidden sm:inline">CQC Registered</span>
                <span className="sm:hidden">CQC</span>
              </div>
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-primary-600" strokeWidth={1.5} />
                <span className="hidden sm:inline">Midwife &amp; nurse-led</span>
                <span className="sm:hidden">Nurse-led</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#c9a24d]" fill="currentColor" strokeWidth={0} />
                <span className="hidden sm:inline">5.0 Google Rating</span>
                <span className="sm:hidden">5.0★</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
