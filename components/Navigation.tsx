'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

interface NavigationProps {
  onBookingClick?: () => void
}

const LINKS = ['About', 'Treatments', 'Results', 'FAQ', 'Contact']

export default function Navigation({ onBookingClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-cream-50/95 backdrop-blur-md border-b border-cream-200'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto section-padding">
        <div className="flex h-16 lg:h-[72px] items-center justify-between">
          <a href="/" className="flex items-center">
            <img
              src="/clarity-clinic-logo.png"
              alt="Clarity Clinic - Skin, Laser & Intimate Health"
              width={1000}
              height={160}
              className="h-7 sm:h-8 w-auto"
            />
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {LINKS.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[14px] text-neutral-600 hover:text-ink transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-5">
            <a
              href="#skin-analysis"
              className="text-[14px] text-primary-700 hover:text-primary-800 transition-colors"
            >
              Free Analysis
            </a>
            <button onClick={onBookingClick} className="btn-primary !min-h-0 !py-2.5 !px-5 !text-[14px]">
              Book Consultation
            </button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden -mr-2 p-2 text-ink"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden pb-6 pt-2 border-t border-cream-200">
            <div className="flex flex-col">
              {LINKS.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 text-[15px] text-neutral-700 border-b border-cream-200/70"
                >
                  {item}
                </a>
              ))}

              <div className="pt-5 grid gap-3">
                <a
                  href="#skin-analysis"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-outline w-full"
                >
                  Free Analysis
                </a>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    onBookingClick?.()
                  }}
                  className="btn-primary w-full"
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
