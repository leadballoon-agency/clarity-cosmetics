'use client'

import { useState, useEffect } from 'react'

interface NavigationProps {
  onBookingClick?: () => void
}

export default function Navigation({ onBookingClick }: NavigationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      // Show nav when scrolled past 100px
      setIsVisible(currentScrollY > 100)
      // Add background when scrolled past 50px
      setIsScrolled(currentScrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      isVisible ? 'top-0' : '-top-24'
    } ${
      isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto section-padding">
        <div className="flex justify-between items-center gap-4">
          <a href="/" className="flex items-center shrink-0">
            <img
              src="/clarity-clinic-logo.png"
              alt="Clarity Clinic - Skin, Laser & Intimate Health"
              className="h-9 sm:h-10 xl:h-12 w-auto"
            />
          </a>

          <div className="hidden xl:flex items-center gap-x-6 shrink-0">
            {['About', 'Treatments', 'Results', 'FAQ', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="whitespace-nowrap font-medium text-neutral-700 hover:text-sage-600 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-x-3 shrink-0">
            <a
              href="#skin-analysis"
              className="whitespace-nowrap text-primary-600 font-medium hover:text-primary-700 transition-colors"
            >
              Free Analysis
            </a>
            <span className="text-neutral-300">|</span>
            <button
              onClick={onBookingClick}
              className="inline-flex whitespace-nowrap bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              Book Consultation
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-2 shrink-0"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`block h-0.5 w-full transition-all ${
                isScrolled ? 'bg-neutral-700' : 'bg-neutral-700'
              } ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block h-0.5 w-full transition-all ${
                isScrolled ? 'bg-neutral-700' : 'bg-neutral-700'
              } ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-full transition-all ${
                isScrolled ? 'bg-neutral-700' : 'bg-neutral-700'
              } ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="xl:hidden mt-4 py-4 border-t border-neutral-200">
            <div className="flex flex-col">
              {['About', 'Treatments', 'Results', 'FAQ', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-neutral-700 hover:text-sage-600 font-medium text-base leading-6 py-3"
                >
                  {item}
                </a>
              ))}

              <div className="border-t border-neutral-200 pt-3 mt-2 space-y-3">
                <a
                  href="#skin-analysis"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-center border-2 border-primary-500 text-primary-600 px-6 py-3 rounded-full font-medium"
                >
                  Free Analysis
                </a>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    onBookingClick?.()
                  }}
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-full font-medium text-center w-full"
                >
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}