'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { ArrowRight, BadgeCheck, Play, ShieldCheck, Stethoscope } from 'lucide-react'
import VideoModal, { VideoModalRef } from './VideoModal'
import heroImage from '@/public/images/shoot/DSC09764.jpg'

interface PremiumHeroProps {
  onBookingClick?: () => void
}

export default function PremiumHero({ onBookingClick }: PremiumHeroProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const videoModalRef = useRef<VideoModalRef>(null)
  const videoUrl = 'https://assets.cdn.filesafe.space/8PNaWjnYgGoS1sfgwICL/media/6998606b3a2afd203f5295ae.mp4'

  const handlePlayClick = () => {
    setIsVideoOpen(true)
    // Call play synchronously with the click event (iOS requirement)
    videoModalRef.current?.play()
  }

  return (
    <section className="relative bg-cream-50 pt-24 pb-14 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-24">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 text-center lg:text-left">
            <span className="eyebrow">Midwife-founded clinic · Natural-looking results</span>

            <h1 className="heading-1 mt-5">
              Lift your face, neck &amp; décolleté <em className="heading-accent">without a scalpel</em>
            </h1>

            <p className="lead mt-6 max-w-[40ch] mx-auto lg:mx-0">
              Professional Morpheus8&nbsp;treatments with Claire&nbsp;Emmerson, Midwife &amp; Aesthetic&nbsp;Nurse, in&nbsp;Bedford.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row sm:items-start gap-3 justify-center lg:justify-start">
              <div className="flex flex-col items-center lg:items-start">
                <button onClick={onBookingClick} className="btn-primary w-full sm:w-auto">
                  Book Consultation –&nbsp;£25
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                </button>
                <span className="text-xs text-neutral-500 mt-2">Fully redeemable against your treatment</span>
              </div>
              <a href="#skin-analysis" className="btn-outline w-full sm:w-auto">
                Free Skin Analysis
              </a>
            </div>

            <ul className="mt-10 pt-8 border-t border-cream-200 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-[13px] text-neutral-600">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary-600" strokeWidth={1.5} />
                CQC registered
              </li>
              <li className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-primary-600" strokeWidth={1.5} />
                Midwife &amp; nurse-led
              </li>
              <li className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-primary-600" strokeWidth={1.5} />
                FDA-cleared device
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <figure>
              <div className="relative aspect-[4/3] lg:aspect-[6/5] overflow-hidden rounded-2xl bg-cream-200">
                <Image
                  src={heroImage}
                  alt="Claire Emmerson talking a client through her Morpheus8 treatment plan at Clarity Clinic, Bedford"
                  fill
                  priority
                  placeholder="blur"
                  sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
                  className="object-cover object-[35%_center]"
                />
                <button
                  onClick={handlePlayClick}
                  className="group absolute bottom-4 left-4 sm:bottom-5 sm:left-5 inline-flex items-center gap-3 rounded-full bg-white/95 py-2 pl-2 pr-5 text-[14px] font-medium text-ink backdrop-blur transition-colors hover:bg-white"
                  aria-label="Play video about Morpheus8 treatments"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-white transition-colors group-hover:bg-primary-700">
                    <Play className="h-4 w-4 translate-x-[1px]" fill="currentColor" strokeWidth={0} />
                  </span>
                  Watch Claire explain Morpheus8
                </button>
              </div>
              <figcaption className="mt-4 flex flex-wrap items-baseline justify-center lg:justify-start gap-x-3 gap-y-1 text-[13px] text-neutral-500">
                <span className="font-display text-[15px] text-ink">Claire&nbsp;Emmerson, Midwife &amp; Aesthetic&nbsp;Nurse</span>
                <span aria-hidden="true" className="text-neutral-300">/</span>
                <span>Independent Prescriber</span>
                <span aria-hidden="true" className="text-neutral-300">/</span>
                <span>CQC Registered</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        ref={videoModalRef}
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={videoUrl}
      />
    </section>
  )
}
