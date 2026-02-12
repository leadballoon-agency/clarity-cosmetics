interface PremiumTreatmentsProps {
  onBookingClick?: () => void
}

export default function PremiumTreatments({ onBookingClick }: PremiumTreatmentsProps) {
  const treatments = [
    {
      icon: '✨',
      title: 'Morpheus8 Face',
      description: "Target fine lines, texture, and skin laxity",
      features: ['Full face treatment', 'Minimal downtime (1-3 days)', '30-60 minutes', 'FDA-cleared technology'],
      price: 'POC',
      gradient: 'from-primary-400 to-primary-600',
      popular: false
    },
    {
      icon: '🔬',
      title: 'Face, Neck & Décolleté',
      description: 'Complete upper body rejuvenation',
      features: ['Face, neck & chest treatment', 'Tightens and lifts', 'All skin types', 'FDA-cleared technology'],
      price: '£395',
      gradient: 'from-primary-500 to-primary-600',
      popular: true
    },
    {
      icon: '💎',
      title: 'Full Body Treatment',
      description: 'Target stubborn areas beyond the face',
      features: ['Abdomen, arms, or thighs', 'Skin tightening & contouring', 'Reduces subdermal fat', 'Long-lasting results'],
      price: 'POC',
      gradient: 'from-primary-400 to-primary-700',
      popular: false
    }
  ]

  return (
    <section id="treatments" className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 space-y-2 sm:space-y-4">
          <span className="text-primary-600 font-medium tracking-wider uppercase text-sm">Morpheus8 Treatments</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold">
            Transform Your Skin with
            <span className="gradient-text"> RF Microneedling</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-neutral-600 max-w-2xl mx-auto px-4 leading-relaxed">
            FDA-cleared RF microneedling for face, neck and body. Face, Neck & Décolleté package from £395.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {treatments.map((treatment, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 lg:p-8 transition-all duration-500 flex flex-col h-full ${
                treatment.popular ? 'shadow-premium-lg sm:scale-105' : 'shadow-premium hover:shadow-premium-lg'
              } sm:hover:scale-105`}
            >
              {treatment.popular && (
                <div className="absolute -top-2 sm:-top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className={`absolute inset-0 bg-gradient-to-br ${treatment.gradient} opacity-5 rounded-2xl sm:rounded-3xl transition-opacity group-hover:opacity-10`}></div>
              
              <div className="relative flex flex-col h-full">
                <div className="mb-3 sm:mb-4 lg:mb-6">
                  <div className={`text-3xl sm:text-4xl lg:text-5xl p-2.5 sm:p-3 lg:p-4 bg-gradient-to-br ${treatment.gradient} rounded-xl sm:rounded-2xl bg-opacity-10 inline-block`}>
                    {treatment.icon}
                  </div>
                </div>

                <div className="mb-3 sm:mb-4 lg:mb-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1.5 sm:mb-2">{treatment.title}</h3>
                  <p className="text-sm sm:text-base lg:text-lg text-neutral-600">{treatment.description}</p>
                </div>

                <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-7 flex-grow">
                  {treatment.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start sm:items-center text-sm sm:text-base text-neutral-700">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 mr-1.5 sm:mr-2 flex-shrink-0 mt-0.5 sm:mt-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="pt-4 sm:pt-5 border-t border-neutral-100 mt-auto">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl sm:text-2xl font-bold gradient-text">{treatment.price}</p>
                    </div>
                    <button
                      onClick={onBookingClick}
                      className={`px-5 sm:px-6 lg:px-7 py-3.5 sm:py-4 rounded-full bg-gradient-to-r ${treatment.gradient} text-white font-medium hover:shadow-lg transition-all duration-300 sm:hover:scale-105 text-sm sm:text-base min-h-[48px]`}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Options - Klarna */}
        <div className="mt-8 sm:mt-12 bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-premium border border-primary-100">
          {/* Klarna Banner */}
          <div className="bg-[#FFB3C7] p-6 sm:p-8 text-center flex flex-col items-center justify-center">
            <p className="text-xl sm:text-2xl font-medium text-black mb-3">Pay later with</p>
            <img
              src="https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg"
              alt="Klarna"
              className="h-8 sm:h-12"
            />
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            {/* Benefits */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-800 mb-1 text-sm sm:text-base">0% Interest</h4>
                <p className="text-xs sm:text-sm text-neutral-600">No interest charges</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-800 mb-1 text-sm sm:text-base">Pay in 3</h4>
                <p className="text-xs sm:text-sm text-neutral-600">Split over 60 days</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-800 mb-1 text-sm sm:text-base">Instant Approval</h4>
                <p className="text-xs sm:text-sm text-neutral-600">No credit checks</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-semibold text-neutral-800 mb-1 text-sm sm:text-base">Secure</h4>
                <p className="text-xs sm:text-sm text-neutral-600">Safe & trusted</p>
              </div>
            </div>

            {/* Example Payment */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl sm:rounded-2xl p-5 sm:p-6 text-center">
              <p className="text-sm text-neutral-600 mb-1">Face, Neck & Décolleté</p>
              <p className="text-3xl sm:text-4xl font-bold gradient-text mb-3">3 x £132</p>
              <p className="text-sm text-neutral-500">Interest-free. No fees. Pay every 30 days.</p>
            </div>

            <p className="text-xs text-neutral-400 text-center mt-4 italic">
              18+. T&Cs apply. Pay in 30 days or pay in 3 interest-free instalments.
            </p>
          </div>
        </div>

        {/* Mobile Call-to-Action */}
        <div className="mt-8 text-center sm:hidden">
          <p className="text-xs text-neutral-600 mb-3">Need help choosing?</p>
          <a href="#assessment" className="text-primary-600 font-medium text-sm">
            Take our skin assessment →
          </a>
        </div>
      </div>
    </section>
  )
}