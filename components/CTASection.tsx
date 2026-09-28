import Image from 'next/image'
import { ArrowRight, MapPin, MessageCircle, Phone, Star } from 'lucide-react'
import exteriorImage from '@/public/images/shoot/DSC09690.jpg'

interface CTASectionProps {
  onBookingClick?: () => void
}

export default function CTASection({ onBookingClick }: CTASectionProps) {
  const contactItems = [
    {
      icon: Phone,
      title: 'Call Claire',
      content: (
        <a href="tel:+447414154007" className="text-white/80 hover:text-white transition-colors">
          07414 154007
        </a>
      ),
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      content: (
        <a href="https://wa.me/447414154007" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
          Message Us
        </a>
      ),
    },
    {
      icon: MapPin,
      title: 'Visit',
      content: (
        <span className="text-white/80">
          Conway Crescent<br />Bedford, MK41 7BW
        </span>
      ),
    },
  ]

  return (
    <section id="contact" className="relative overflow-hidden bg-ink py-20 sm:py-24 lg:py-28">
      <Image
        src={exteriorImage}
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink/80" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto section-padding text-center text-white">
        <span className="text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em] text-primary-200">
          Book your consultation
        </span>

        <h2 className="font-display font-normal text-white text-[1.875rem] leading-[1.15] sm:text-[2.25rem] lg:text-[2.75rem] tracking-[-0.01em] mt-5">
          Ready to transform your skin <em className="italic text-primary-200">with Morpheus8?</em>
        </h2>

        <p className="text-base sm:text-[17px] leading-relaxed text-white/75 mt-5 max-w-[44ch] mx-auto">
          Experience FDA-cleared RF microneedling at Bedford's CQC&nbsp;registered&nbsp;clinic
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 border-y border-white/15 divide-y sm:divide-y-0 sm:divide-x divide-white/15 max-w-3xl mx-auto">
          {contactItems.map(({ icon: Icon, title, content }) => (
            <div key={title} className="py-6 sm:px-6">
              <Icon className="mx-auto h-5 w-5 text-primary-200" strokeWidth={1.25} aria-hidden="true" />
              <h3 className="font-sans text-[15px] font-medium text-white mt-3">{title}</h3>
              <div className="text-sm mt-1">{content}</div>
            </div>
          ))}
        </div>

        <button onClick={onBookingClick} className="btn-light mt-10 w-full sm:w-auto">
          Book Your Free Consultation
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </button>

        <div className="mt-10 flex items-center justify-center flex-wrap gap-x-8 gap-y-3 text-[13px] text-white/70">
          <span className="flex items-center gap-2">
            <span className="flex gap-0.5" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 text-[#d9b766]" fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            5.0 on Google
          </span>
          <span>Midwife &amp; nurse-led</span>
          <span>10+ years experience</span>
        </div>
      </div>
    </section>
  )
}
