import Image from 'next/image'
import { ArrowRight, Check, ShieldCheck } from 'lucide-react'
import portrait from '@/public/images/img-1.jpg'

interface AboutSectionProps {
  onBookingClick?: () => void
}

export default function AboutSection({ onBookingClick }: AboutSectionProps) {
  return (
    <section id="about" className="section-y bg-white">
      <div className="max-w-6xl mx-auto section-padding">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <figure className="mx-auto max-w-[360px] sm:max-w-[420px] lg:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200">
                <Image
                  src={portrait}
                  alt="Claire Emmerson at the door of Clarity Clinic, Bedford"
                  fill
                  sizes="(min-width: 1152px) 420px, (min-width: 1024px) 38vw, 420px"
                  className="object-cover object-top"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-center lg:justify-start gap-2 text-[13px] text-neutral-500">
                <ShieldCheck className="h-4 w-4 text-primary-600" strokeWidth={1.5} aria-hidden="true" />
                CQC registered clinic, Conway Crescent, Bedford
              </figcaption>
            </figure>
          </div>

          <div className="lg:col-span-7">
            <span className="eyebrow">Meet your practitioner</span>
            <h2 className="heading-2 mt-4">
              Expert care from <em className="heading-accent">Claire&nbsp;Emmerson</em>
            </h2>
            <p className="mt-3 text-[15px] text-neutral-500">
              Midwife &amp; Aesthetic&nbsp;Nurse · Independent&nbsp;Prescriber &amp; Advanced Aesthetic&nbsp;Practitioner
            </p>

            <div className="mt-7 space-y-4">
              <p className="lead">
                As a registered midwife and independent prescriber, I bring a unique understanding of women's health and anatomy to aesthetic medicine. My focus is on delivering natural-looking results using the most advanced regenerative treatments available.
              </p>
              <p className="lead">
                At our CQC&nbsp;registered clinic in Bedford, I specialize in Morpheus8 RF microneedling and women's intimate health treatments, providing personalized care in a safe, professional environment.
              </p>
            </div>

            <div className="mt-8 border-t border-cream-200 pt-7">
              <h3 className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">Qualifications &amp; expertise</h3>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                {[
                  'Registered Midwife (RM)',
                  'Independent Prescriber',
                  'Advanced Aesthetic Practitioner',
                  'Morpheus8 Specialist Training'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[15px] text-neutral-700">
                    <Check className="h-4 w-4 flex-shrink-0 text-primary-600" strokeWidth={1.75} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-9">
              <button onClick={onBookingClick} className="btn-primary w-full sm:w-auto">
                Book Your Consultation
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
