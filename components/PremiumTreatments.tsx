import { ArrowRight, Check, Layers, Lock, PersonStanding, ScanFace } from 'lucide-react'

interface PremiumTreatmentsProps {
  onBookingClick?: () => void
}

export default function PremiumTreatments({ onBookingClick }: PremiumTreatmentsProps) {
  const treatments = [
    {
      icon: ScanFace,
      title: 'Morpheus8 Face',
      description: "Target fine lines, texture, and skin laxity",
      features: ['Full face treatment', 'Minimal downtime (1-3 days)', '30-60 minutes', 'FDA-cleared technology'],
      price: 'POC',
      gradient: 'from-primary-400 to-primary-600',
      popular: false
    },
    {
      icon: Layers,
      title: 'Face, Neck & Décolleté',
      description: 'Complete upper body rejuvenation',
      features: ['Face, neck & chest treatment', 'Tightens and lifts', 'All skin types', 'FDA-cleared technology'],
      price: '£600',
      gradient: 'from-primary-500 to-primary-600',
      popular: true
    },
    {
      icon: PersonStanding,
      title: 'Full Body Treatment',
      description: 'Target stubborn areas beyond the face',
      features: ['Abdomen, arms, or thighs', 'Skin tightening & contouring', 'Reduces subdermal fat', 'Long-lasting results'],
      price: 'POC',
      gradient: 'from-primary-400 to-primary-700',
      popular: false
    }
  ]

  const klarnaBenefits = [
    { title: '0% Interest', text: 'No interest charges' },
    { title: 'Pay in 3', text: 'Split over 60 days' },
    { title: 'Instant Approval', text: 'No credit checks' },
    { title: 'Secure', text: 'Safe & trusted' },
  ]

  return (
    <section id="treatments" className="section-y bg-cream-100">
      <div className="max-w-6xl mx-auto section-padding">
        <div className="text-center mb-10 sm:mb-14">
          <span className="eyebrow">Morpheus8 treatments</span>
          <h2 className="heading-2 mt-4">
            Transform your skin with <em className="heading-accent">RF microneedling</em>
          </h2>
          <p className="lead mt-4 max-w-[52ch] mx-auto">
            FDA-cleared RF microneedling for face, neck and body. Face, Neck &amp; Décolleté is&nbsp;£600. Course of 3 for&nbsp;£1,650.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 max-w-xl mx-auto lg:max-w-none">
          {treatments.map((treatment) => {
            const Icon = treatment.icon
            return (
              <div
                key={treatment.title}
                className={`relative flex flex-col rounded-2xl bg-white p-6 sm:p-7 border ${
                  treatment.popular ? 'border-primary-400' : 'border-cream-200'
                }`}
              >
                {treatment.popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-primary-600 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white">
                    Most popular
                  </span>
                )}

                <Icon className="h-7 w-7 text-primary-600" strokeWidth={1.25} aria-hidden="true" />

                <h3 className="heading-3 mt-5">{treatment.title}</h3>
                <p className="text-[15px] text-neutral-600 mt-1.5">{treatment.description}</p>

                <ul className="mt-5 space-y-2.5 flex-grow">
                  {treatment.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[14px] text-neutral-700">
                      <Check className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary-600" strokeWidth={1.75} aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 pt-5 border-t border-cream-200 flex items-center justify-between gap-4">
                  <p className="font-display text-2xl text-ink">{treatment.price}</p>
                  <button
                    onClick={onBookingClick}
                    className={treatment.popular ? 'btn-primary !px-5' : 'btn-outline !px-5'}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Payment Options - Klarna */}
        <div className="mt-10 sm:mt-12 card overflow-hidden">
          <div className="grid lg:grid-cols-12">
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <p className="text-[15px] text-neutral-700">Pay later with</p>
                <img
                  src="https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg"
                  alt="Klarna"
                  className="h-7"
                />
              </div>
              <ul className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5">
                {klarnaBenefits.map((benefit) => (
                  <li key={benefit.title} className="flex items-start gap-3">
                    {benefit.title === 'Secure' ? (
                      <Lock className="h-4 w-4 mt-1 flex-shrink-0 text-primary-600" strokeWidth={1.5} aria-hidden="true" />
                    ) : (
                      <Check className="h-4 w-4 mt-1 flex-shrink-0 text-primary-600" strokeWidth={1.75} aria-hidden="true" />
                    )}
                    <div>
                      <h4 className="font-sans text-[15px] font-medium text-ink">{benefit.title}</h4>
                      <p className="text-[13px] text-neutral-500">{benefit.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 bg-cream-50 border-t lg:border-t-0 lg:border-l border-cream-200 p-6 sm:p-8 lg:p-10 flex flex-col justify-center text-center lg:text-left">
              <p className="text-[13px] uppercase tracking-[0.14em] text-neutral-500">Face, Neck &amp; Décolleté — Course of 3</p>
              <p className="font-display text-4xl text-ink mt-3">3 for £1,650</p>
              <p className="text-sm text-neutral-600 mt-2">£600 per session individually — save&nbsp;£150</p>
              <p className="text-sm text-neutral-500 mt-1">Interest-free. No fees. Pay every 30 days.</p>
              <button onClick={onBookingClick} className="btn-primary mt-6 self-center lg:self-start">
                Book Consultation
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>
          <p className="border-t border-cream-200 px-6 py-3 text-[11px] text-neutral-400 text-center">
            18+. T&amp;Cs apply. Pay in 30 days or pay in 3 interest-free&nbsp;instalments.
          </p>
        </div>

        {/* Mobile Call-to-Action */}
        <div className="mt-8 text-center sm:hidden">
          <p className="text-xs text-neutral-500 mb-2">Need help choosing?</p>
          <a href="#assessment" className="inline-flex items-center gap-1.5 text-primary-700 text-sm font-medium">
            Take our skin assessment
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </section>
  )
}
