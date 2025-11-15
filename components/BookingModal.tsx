'use client'

import { useEffect, useRef, useState } from 'react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  assessmentData?: any
  isModelDay?: boolean
}

export default function BookingModal({ isOpen, onClose, isModelDay = false }: BookingModalProps) {
  const [widgetLoaded, setWidgetLoaded] = useState(false)
  const widgetContainerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<MutationObserver | null>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'

      if (isModelDay) {
        // Load GHL Voice AI widget for Model Day
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://widgets.leadconnectorhq.com/loader.js'
        script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js')
        script.setAttribute('data-widget-id', '69184b46d1e01c2b9cc1fb70')

        document.body.appendChild(script)

        // Watch for widget iframe to appear and clone it into our modal
        observerRef.current = new MutationObserver(() => {
          if (widgetLoaded) return

          // Helper function to search in shadow DOMs
          function findIframeInShadowDOM(): HTMLIFrameElement | null {
            const allElements = document.querySelectorAll('*')

            for (const el of allElements) {
              // Check regular DOM
              if (el.tagName === 'IFRAME') {
                const iframe = el as HTMLIFrameElement
                if (iframe.src.includes('leadconnectorhq') || iframe.src.includes('msgsndr')) {
                  return iframe
                }
              }

              // Check shadow DOM
              if (el.shadowRoot) {
                const iframe = el.shadowRoot.querySelector('iframe') as HTMLIFrameElement
                if (iframe && (iframe.src.includes('leadconnectorhq') || iframe.src.includes('msgsndr'))) {
                  console.log('Found iframe in shadow DOM:', el.tagName, iframe.src)
                  return iframe
                }
              }
            }
            return null
          }

          const originalIframe = findIframeInShadowDOM()

          if (originalIframe && widgetContainerRef.current) {
            console.log('Found GHL iframe, cloning to modal:', originalIframe.src)
            setWidgetLoaded(true)

            // Create a new iframe in our modal with the same src
            const newIframe = document.createElement('iframe')
            newIframe.src = originalIframe.src
            newIframe.style.width = '100%'
            newIframe.style.height = '100%'
            newIframe.style.minHeight = '600px'
            newIframe.style.border = 'none'
            newIframe.style.borderRadius = '8px'
            newIframe.allow = 'microphone'
            newIframe.title = 'Model Day Voice Chat'

            // Add to our container
            widgetContainerRef.current.appendChild(newIframe)

            // Hide the original floating widget
            let widgetRoot = originalIframe.closest('div[style*="position"]') as HTMLElement
            if (!widgetRoot) {
              // Might be in shadow DOM
              const host = Array.from(document.querySelectorAll('*')).find(el => el.shadowRoot?.contains(originalIframe))
              if (host) widgetRoot = host as HTMLElement
            }
            if (widgetRoot) {
              widgetRoot.style.display = 'none'
            }

            observerRef.current?.disconnect()
          }
        })

        // Start observing
        observerRef.current.observe(document.body, {
          childList: true,
          subtree: true
        })

        // Fallback timeout - if widget doesn't load in 10 seconds, show alternative
        const timeoutId = setTimeout(() => {
          if (!widgetLoaded) {
            console.log('Widget loading timeout - check if script loaded correctly')
            // The widget might have appeared but we couldn't capture it
            // Check console for any errors
          }
        }, 10000)

        return () => {
          try {
            clearTimeout(timeoutId)
            observerRef.current?.disconnect()
            document.body.removeChild(script)
            setWidgetLoaded(false)

            // Remove the widget from DOM
            const widget = document.querySelector('[data-widget-id="69184b46d1e01c2b9cc1fb70"]')
            if (widget) {
              widget.remove()
            }
          } catch (e) {
            // Already cleaned up
          }
        }
      } else {
        // Load GHL calendar for regular bookings
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.src = 'https://link.leadballoon.co.uk/js/form_embed.js'

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
  }, [isOpen, isModelDay, widgetLoaded])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
      {/* Backdrop with glassmorphism */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Container - Full screen on mobile, contained on desktop */}
      <div className="relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-4xl bg-white sm:rounded-3xl shadow-2xl overflow-hidden animate-modal-slide-up flex flex-col">

        {/* Premium Header */}
        <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-5 sm:p-6 text-white flex-shrink-0 shadow-lg">
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110 z-10 group"
            aria-label="Close booking calendar"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header content */}
          <div className="relative text-center sm:text-left">
            <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-3 sm:mb-4">
              <span className="text-3xl sm:text-4xl">{isModelDay ? '📸' : '📅'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              {isModelDay ? 'Request a Model Day' : 'Book Your Consultation'}
            </h2>
            <p className="text-white/90 text-sm sm:text-base max-w-2xl">
              {isModelDay
                ? 'Book your discounted model day appointment. Claire will confirm availability and discuss before & after photo requirements within 24 hours.'
                : 'Choose your preferred date and time. Claire will confirm your appointment within 24 hours.'
              }
            </p>
          </div>
        </div>

        {/* Calendar Widget Container - Fills remaining space */}
        <div className="flex-1 overflow-hidden bg-gradient-to-b from-white to-primary-50/30 relative">
          {/* Subtle decorative background */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400 rounded-full blur-3xl"></div>
          </div>

          {/* Widget wrapper with proper padding */}
          <div className="relative h-full w-full p-4 sm:p-6 overflow-auto">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 min-h-full">
              {isModelDay ? (
                /* AI Voice Agent Widget Container for Model Day */
                <div className="w-full h-full min-h-[600px] relative">
                  {/* Widget Container - Will be filled by relocated widget */}
                  <div
                    ref={widgetContainerRef}
                    className="w-full h-full min-h-[600px]"
                  >
                    {/* Loading state - shown until widget is relocated */}
                    {!widgetLoaded && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                          <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">
                          Loading Voice Assistant...
                        </h3>
                        <p className="text-sm text-neutral-600 max-w-md mb-4">
                          Kerry, our AI assistant, is getting ready to help you qualify for a Model Day
                        </p>
                        <div className="inline-flex items-center space-x-2 text-primary-600">
                          <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span className="text-sm">Initializing...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* Regular Booking Calendar */
                <iframe
                  src="https://link.leadballoon.co.uk/widget/booking/T2xN5Qup3pc5YbWkh6Zf"
                  style={{
                    width: '100%',
                    minHeight: '600px',
                    height: '100%',
                    border: 'none',
                    overflow: 'hidden'
                  }}
                  scrolling="no"
                  id="T2xN5Qup3pc5YbWkh6Zf_1763111779048"
                  title="Booking Calendar"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  allow="payment 'src'; fullscreen 'src'"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              )}
            </div>
          </div>
        </div>

        {/* Trust Badge Footer */}
        <div className="flex-shrink-0 bg-white border-t border-primary-100 px-5 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-center gap-6 text-xs sm:text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="hidden sm:inline">CQC Registered</span>
              <span className="sm:hidden">CQC</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span className="hidden sm:inline">Nurse-Led</span>
              <span className="sm:hidden">RN</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="hidden sm:inline">5.0 Google Rating</span>
              <span className="sm:hidden">5.0★</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
