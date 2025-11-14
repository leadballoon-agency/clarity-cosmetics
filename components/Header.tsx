'use client'

import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <img
            src="/images/clarity-Logo.png"
            alt="Clarity Cosmetics - CQC Registered"
            className="h-12"
          />

          <nav className="hidden md:flex space-x-8">
            <a href="#about" className="text-neutral-600 hover:text-primary-600 transition-colors font-medium">About Claire</a>
            <a href="#treatments" className="text-neutral-600 hover:text-primary-600 transition-colors font-medium">Morpheus8</a>
            <a href="#results" className="text-neutral-600 hover:text-primary-600 transition-colors font-medium">Results</a>
            <a href="#faq" className="text-neutral-600 hover:text-primary-600 transition-colors font-medium">FAQ</a>
            <a href="#assessment" className="text-neutral-600 hover:text-primary-600 transition-colors font-medium">Assessment</a>
          </nav>

          <a href="tel:07929802094" className="hidden md:block bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg transition-all duration-300">
            Call Now
          </a>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-neutral-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-neutral-200">
            <div className="flex flex-col space-y-4">
              <a href="#about" className="text-neutral-600 hover:text-primary-600 font-medium">About Claire</a>
              <a href="#treatments" className="text-neutral-600 hover:text-primary-600 font-medium">Morpheus8</a>
              <a href="#results" className="text-neutral-600 hover:text-primary-600 font-medium">Results</a>
              <a href="#faq" className="text-neutral-600 hover:text-primary-600 font-medium">FAQ</a>
              <a href="#assessment" className="text-neutral-600 hover:text-primary-600 font-medium">Assessment</a>
              <a href="tel:07929802094" className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-full text-center font-medium">
                Call: 07929 802094
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}