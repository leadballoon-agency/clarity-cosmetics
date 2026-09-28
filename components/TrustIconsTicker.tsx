const LOGOS = [
  { src: '/images/Trust icons/cqc-logo.png', alt: 'CQC Registered', width: 714, height: 375 },
  { src: '/images/Trust icons/BAMAN_Logobaman-logo-purple-background-social.png', alt: 'BAMAN Member', width: 703, height: 315 },
  { src: '/images/Trust icons/Derma-Medical-Retina-Logo.png', alt: 'Derma Medical', width: 645, height: 180 },
  { src: '/images/Trust icons/medical-aesthetics-prescriber.jpeg', alt: 'Medical Aesthetics Prescriber', width: 1024, height: 1021 },
  { src: '/images/Trust icons/Zo-Skin-Health-Logo-1024x369-1024x369-png.png', alt: 'ZO Skin Health', width: 1024, height: 369 },
]

export default function TrustIconsTicker() {
  return (
    <section className="bg-white border-y border-cream-200 py-10 sm:py-12">
      <div className="max-w-6xl mx-auto section-padding">
        <p className="text-center text-[11px] sm:text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
          Trusted &amp; accredited
        </p>
        <ul className="mt-7 grid grid-cols-3 sm:grid-cols-5 items-center justify-items-center gap-x-6 gap-y-8 sm:gap-x-10">
          {LOGOS.map((logo) => (
            <li key={logo.alt} className="flex h-10 sm:h-12 items-center justify-center">
              <img
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                loading="lazy"
                decoding="async"
                className="h-full w-auto max-w-[120px] object-contain grayscale opacity-60 mix-blend-multiply transition duration-300 hover:grayscale-0 hover:opacity-100"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
