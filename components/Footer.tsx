export default function Footer() {
  return (
    <footer className="bg-mauve-500 text-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 sm:gap-10">
          <div>
            <img
              src="/images/clarity-Logo.png"
              alt="Clarity Cosmetics"
              className="h-12 mb-5 sm:mb-6"
            />
            <p className="text-white/80 text-sm sm:text-base leading-relaxed">
              CQC registered nurse-led aesthetic clinic in Bedford. Specialising in Morpheus8 RF microneedling and regenerative treatments.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-5 sm:mb-6 font-display text-base sm:text-lg">Contact</h3>
            <ul className="space-y-2.5 text-white/80 text-sm sm:text-base">
              <li>
                <a href="tel:07929802094" className="hover:text-white transition-colors inline-block py-1">
                  07929 802094
                </a>
              </li>
              <li>
                <a href="mailto:info@claritycosmetics.co.uk" className="hover:text-white transition-colors inline-block py-1">
                  info@claritycosmetics.co.uk
                </a>
              </li>
              <li className="pt-2">
                Conway Crescent<br />
                Bedford<br />
                MK41 7BW
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-5 sm:mb-6 font-display text-base sm:text-lg">Quick Links</h3>
            <ul className="space-y-2.5 text-white/80 text-sm sm:text-base">
              <li><a href="#about" className="hover:text-white transition-colors inline-block py-1">About Claire</a></li>
              <li><a href="#treatments" className="hover:text-white transition-colors inline-block py-1">Morpheus8 Treatments</a></li>
              <li><a href="#results" className="hover:text-white transition-colors inline-block py-1">Results</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors inline-block py-1">FAQ</a></li>
              <li><a href="https://claritycosmetics.co.uk" className="hover:text-white transition-colors inline-block py-1" target="_blank" rel="noopener noreferrer">Main Website</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 sm:mt-12 pt-8 sm:pt-10 text-center text-white/80 text-sm sm:text-base">
          <p>&copy; {new Date().getFullYear()} Clarity Cosmetics. All rights reserved. | CQC Registered</p>
        </div>
      </div>
    </footer>
  )
}