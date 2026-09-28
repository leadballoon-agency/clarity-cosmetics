'use client'

import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { ArrowLeft, ArrowRight, Blend, ChevronsUp, CircleCheck, Droplet, Feather, ScanFace, Sparkles, Sun } from 'lucide-react'

type Option = { value: string; label: string; icon?: LucideIcon }

interface AssessmentToolProps {
  onBookingClick?: () => void
  onAssessmentComplete?: (data: any) => void
}

export default function AssessmentTool({ onBookingClick, onAssessmentComplete }: AssessmentToolProps) {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<any>({})

  const questions: { id: number; question: string; options: Option[] }[] = [
    {
      id: 1,
      question: "What is your primary skin concern?",
      options: [
        { value: 'wrinkles', label: 'Fine lines & wrinkles', icon: ScanFace },
        { value: 'scars', label: 'Acne or surgical scars', icon: Sparkles },
        { value: 'sagging', label: 'Skin sagging & laxity', icon: ChevronsUp },
        { value: 'spots', label: 'Age spots & sun damage', icon: Sun }
      ]
    },
    {
      id: 2,
      question: "How would you describe your skin type?",
      options: [
        { value: 'normal', label: 'Normal', icon: CircleCheck },
        { value: 'dry', label: 'Dry', icon: Feather },
        { value: 'oily', label: 'Oily', icon: Droplet },
        { value: 'combination', label: 'Combination', icon: Blend }
      ]
    },
    {
      id: 3,
      question: "What is your age range?",
      options: [
        { value: '20-30', label: '20–30' },
        { value: '31-40', label: '31–40' },
        { value: '41-50', label: '41–50' },
        { value: '50+', label: '50+' }
      ]
    }
  ]

  const currentQuestion = step <= questions.length ? questions[step - 1] : null

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [step]: value }
    setAnswers(newAnswers)
    if (step < questions.length) {
      setStep(step + 1)
    } else {
      // Show results and emit assessment completion
      setStep(step + 1) // Move to results view
      const recommendation = getRecommendation(newAnswers)
      onAssessmentComplete?.({
        answers: newAnswers,
        recommendation,
        completedAt: new Date().toISOString()
      })
    }
  }

  const getRecommendation = (assessmentAnswers: any = answers) => {
    // Recommend based on severity and concerns
    if (assessmentAnswers[1] === 'sagging') {
      return {
        treatment: 'Face, Neck & Décolleté',
        price: '£600',
        description: 'Most popular - comprehensive treatment targeting skin laxity, jowls, and loss of definition with visible tightening and lifting results.'
      }
    } else if (assessmentAnswers[1] === 'wrinkles' && assessmentAnswers[3] === '50+') {
      return {
        treatment: 'Face, Neck & Décolleté',
        price: '£600',
        description: 'Comprehensive rejuvenation for mature skin targeting wrinkles, fine lines, and age-related concerns across face, neck and chest.'
      }
    } else if (assessmentAnswers[1] === 'scars') {
      return {
        treatment: 'Morpheus8 Face',
        price: 'POC',
        description: 'Full face treatment perfect for addressing acne scars, improving skin texture, and reducing scar visibility with RF microneedling technology'
      }
    } else if (assessmentAnswers[1] === 'spots') {
      return {
        treatment: 'Morpheus8 Face',
        price: 'POC',
        description: 'Targeted facial treatment to improve skin tone, reduce age spots and sun damage, while enhancing overall skin quality'
      }
    } else {
      return {
        treatment: 'Face, Neck & Décolleté',
        price: '£600',
        description: 'Comprehensive treatment for overall skin tightening, rejuvenation and wrinkle reduction.'
      }
    }
  }

  const recommendation = getRecommendation()

  return (
    <section id="assessment" className="section-y bg-cream-50">
      <div className="max-w-3xl mx-auto section-padding">
        <div className="text-center mb-10 sm:mb-12">
          <span className="eyebrow">Personalised assessment</span>
          <h2 className="heading-2 mt-4">
            Find your ideal <em className="heading-accent">Morpheus8 treatment</em>
          </h2>
          <p className="lead mt-4 max-w-[40ch] mx-auto">
            Answer 3&nbsp;quick questions for personalised Morpheus8&nbsp;recommendations
          </p>
        </div>

        <div className="card p-6 sm:p-10">
          {step <= questions.length && currentQuestion ? (
            <>
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2 text-xs uppercase tracking-[0.14em] text-neutral-500">
                  <span>Step {step} of {questions.length}</span>
                  <span>{Math.round((step / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-cream-200 rounded-full h-1">
                  <div
                    className="bg-primary-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(step / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <h3 className="heading-3 text-center mb-6 sm:mb-8">{currentQuestion?.question}</h3>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQuestion?.options.map((option) => {
                  const Icon = option.icon
                  return (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className="group flex items-center gap-4 rounded-xl border border-neutral-200 bg-white px-5 py-4 text-left transition-colors duration-200 hover:border-primary-500 hover:bg-primary-50/50 min-h-[64px]"
                    >
                      {Icon && (
                        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-cream-300 text-primary-600 group-hover:border-primary-300">
                          <Icon className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
                        </span>
                      )}
                      <span className="text-[15px] text-neutral-700 group-hover:text-ink">
                        {option.label}
                      </span>
                    </button>
                  )
                })}
              </div>
            </>
          ) : (
            /* Results */
            <div className="text-center animate-slide-up">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-primary-200 bg-primary-50">
                <Sparkles className="h-5 w-5 text-primary-600" strokeWidth={1.25} aria-hidden="true" />
              </div>

              <span className="eyebrow">Your recommendation</span>

              <div className="mt-5 mb-6 rounded-xl bg-cream-100 px-6 py-8 sm:px-10">
                <h4 className="heading-3 !text-2xl">
                  {recommendation.treatment}
                </h4>
                <p className="font-display text-3xl text-primary-700 mt-2 mb-3">
                  {recommendation.price}
                </p>
                <p className="text-[15px] text-neutral-600 max-w-[48ch] mx-auto">
                  {recommendation.description}
                </p>
              </div>

              <div className="flex flex-col items-center gap-3">
                <button onClick={onBookingClick} className="btn-primary w-full sm:w-auto sm:min-w-[240px]">
                  Book Now
                  <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                </button>
                <button
                  onClick={() => {setStep(1); setAnswers({})}}
                  className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-ink transition-colors py-2"
                >
                  <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
                  Start over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
