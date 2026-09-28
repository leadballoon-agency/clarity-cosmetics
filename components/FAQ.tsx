'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

const faqs = [
  {
    question: 'Does Morpheus8 hurt?',
    answer: 'Topical numbing cream is applied before treatment to ensure your comfort. Most patients experience mild discomfort during the procedure, but find it very tolerable. Post-treatment, you may experience redness and mild sensitivity for 1-3 days that easily resolves.'
  },
  {
    question: 'How is Morpheus8 different from regular microneedling?',
    answer: 'Morpheus8 combines microneedling with radiofrequency energy, allowing it to penetrate deeper into the skin and fat layers. It\'s the first and only FDA-cleared RF device for soft tissue contraction, making it far more effective than traditional microneedling for tightening and contouring.'
  },
  {
    question: 'What is the downtime?',
    answer: 'Morpheus8 has minimal downtime of 1-3 days. You may experience redness and mild swelling initially. Most patients return to normal activities the next day and can apply makeup after 24 hours. This is significantly less downtime than laser treatments.'
  },
  {
    question: 'When will I see results?',
    answer: 'Results develop gradually over 2-3 months as your body produces new collagen and elastin. Improvements continue up to 6 months after treatment. This natural timeline ensures long-lasting, authentic results that enhance your natural beauty.'
  },
  {
    question: 'What areas can be treated?',
    answer: 'Morpheus8 is incredibly versatile! We can treat the face (including under-eye area and jowls), neck, décolletage, abdomen, arms, thighs, and knees. It\'s safe for all skin types and can address both skin laxity and fat remodeling in treated areas.'
  },
  {
    question: 'How many sessions do I need?',
    answer: 'Typically 1-3 sessions are recommended, depending on your individual goals and concerns. We\'ll assess your specific needs during your consultation and create a personalized treatment plan. Sessions are usually spaced 4-6 weeks apart for optimal results.'
  }
]

interface FAQProps {
  onBookingClick?: () => void
}

export default function FAQ({ onBookingClick }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-y bg-white">
      <div className="max-w-3xl mx-auto section-padding">
        <div className="text-center mb-10 sm:mb-12">
          <span className="eyebrow">Frequently asked questions</span>
          <h2 className="heading-2 mt-4">
            Your questions <em className="heading-accent">answered</em>
          </h2>
        </div>

        <div className="border-t border-cream-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div key={index} className="border-b border-cream-200">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-5 sm:py-6 text-left flex justify-between items-center gap-6 min-h-[64px] group"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg sm:text-xl text-ink group-hover:text-primary-700 transition-colors">{faq.question}</span>
                  <Plus
                    className={`h-5 w-5 flex-shrink-0 text-primary-600 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                  <p className="pb-6 pr-10 text-[15px] sm:text-base text-neutral-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[15px] text-neutral-600 mb-5">
            Still have questions? We're here to help.
          </p>
          <button onClick={onBookingClick} className="btn-outline w-full sm:w-auto">
            Get in Touch
          </button>
        </div>
      </div>
    </section>
  )
}
