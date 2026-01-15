export default function TrustIconsTicker() {
  return (
    <section className="py-8 sm:py-12 bg-white border-y border-neutral-100 overflow-hidden">
      <div className="mb-4 sm:mb-6 text-center">
        <p className="text-xs sm:text-sm font-medium text-neutral-600 uppercase tracking-wide">
          Trusted & Accredited
        </p>
      </div>
      <div className="relative">
        {/* Gradient fade edges for smooth visual */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

        <div className="flex animate-ticker gap-4 sm:gap-8 md:gap-12">
          {/* First set of logos - Mobile optimized spacing */}
          <div className="flex items-center gap-6 sm:gap-10 md:gap-16 shrink-0">
            <img
              src="/images/Trust icons/cqc-logo.png"
              alt="CQC Registered"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/images/Trust icons/BAMAN_Logobaman-logo-purple-background-social.png"
              alt="BAMAN Member"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/images/Trust icons/Derma-Medical-Retina-Logo.png"
              alt="Derma Medical"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/images/Trust icons/medical-aesthetics-prescriber.jpeg"
              alt="Medical Aesthetics Prescriber"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/images/Trust icons/Zo-Skin-Health-Logo-1024x369-1024x369-png.png"
              alt="ZO Skin Health"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Duplicate set for seamless loop */}
          <div className="flex items-center gap-6 sm:gap-10 md:gap-16 shrink-0">
            <img
              src="/images/Trust icons/cqc-logo.png"
              alt="CQC Registered"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/images/Trust icons/BAMAN_Logobaman-logo-purple-background-social.png"
              alt="BAMAN Member"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/images/Trust icons/Derma-Medical-Retina-Logo.png"
              alt="Derma Medical"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/images/Trust icons/medical-aesthetics-prescriber.jpeg"
              alt="Medical Aesthetics Prescriber"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/images/Trust icons/Zo-Skin-Health-Logo-1024x369-1024x369-png.png"
              alt="ZO Skin Health"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Third set for ultra-smooth looping on mobile */}
          <div className="flex items-center gap-6 sm:gap-10 md:gap-16 shrink-0">
            <img
              src="/images/Trust icons/cqc-logo.png"
              alt="CQC Registered"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/images/Trust icons/BAMAN_Logobaman-logo-purple-background-social.png"
              alt="BAMAN Member"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/images/Trust icons/Derma-Medical-Retina-Logo.png"
              alt="Derma Medical"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/images/Trust icons/medical-aesthetics-prescriber.jpeg"
              alt="Medical Aesthetics Prescriber"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
            <img
              src="/images/Trust icons/Zo-Skin-Health-Logo-1024x369-1024x369-png.png"
              alt="ZO Skin Health"
              className="h-12 sm:h-16 md:h-20 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
