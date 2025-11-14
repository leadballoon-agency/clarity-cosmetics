'use client'

import { useState, useEffect } from 'react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  assessmentData?: any
}

export default function BookingModal({ isOpen, onClose, assessmentData }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    treatmentType: '',
    preferredPractitioner: '',
    preferredDate: '',
    preferredTime: '',
    concerns: '',
    hasConsultedBefore: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      // Pre-fill treatment type if assessment is completed
      if (assessmentData?.recommendation) {
        setFormData(prev => ({ 
          ...prev, 
          treatmentType: 'recommended',
          concerns: `Assessment Results: Recommended ${assessmentData.recommendation.treatment}`
        }))
      }
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, assessmentData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false)
      setStep(1)
      setFormData({
        name: '',
        email: '',
        phone: '',
        treatmentType: '',
        preferredPractitioner: '',
        preferredDate: '',
        preferredTime: '',
        concerns: '',
        hasConsultedBefore: '',
        message: ''
      })
      onClose()
    }, 3000)
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal - Mobile slides up from bottom, desktop centered */}
      <div className="relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden animate-modal-slide-up max-h-[90vh] sm:max-h-[85vh] flex flex-col">
        {/* Header - Smaller on mobile */}
        <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 p-5 sm:p-6 lg:p-8 text-white flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 lg:top-6 lg:right-6 w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 backdrop-blur rounded-full mb-2 sm:mb-3 lg:mb-4">
              <span className="text-2xl sm:text-3xl">✨</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">Book Your Treatment</h2>
            <p className="text-white/90 text-xs sm:text-sm lg:text-base">
              {assessmentData ? 'Based on your assessment' : 'Premium CO2 laser treatment'}
            </p>
          </div>
          
          {/* Progress Steps */}
          <div className="flex justify-center mt-3 sm:mt-4 lg:mt-6 space-x-2">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                  s === step ? 'w-8 sm:w-10 lg:w-12 bg-white' : s < step ? 'w-4 sm:w-5 lg:w-6 bg-white/60' : 'w-4 sm:w-5 lg:w-6 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-8 sm:p-10 lg:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 bg-green-100 rounded-full mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">Booking Request Sent!</h3>
            <p className="text-sm sm:text-base text-neutral-600 mb-4 sm:mb-6 px-4">
              Thank you for your interest. We'll contact you within 24 hours to confirm your appointment.
            </p>
            <div className="inline-flex items-center space-x-2 text-primary-600">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="text-sm sm:text-base">Redirecting...</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-4 sm:space-y-6 animate-fade-in">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Personal Information</h3>
                    <p className="text-sm sm:text-base text-neutral-600 mb-4 sm:mb-6">Let's start with your contact details</p>
                  </div>
                
                  {/* Display Assessment Results if Available */}
                  {assessmentData && (
                    <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                      <div className="flex items-start">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mr-2 sm:mr-3">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-primary-900 text-sm sm:text-base mb-0.5 sm:mb-1">Assessment Completed!</p>
                          <p className="text-xs sm:text-sm text-primary-700">
                            Recommended: <span className="font-medium">{assessmentData.recommendation?.treatment}</span>
                          </p>
                          <p className="text-xs sm:text-sm text-primary-600">
                            {assessmentData.recommendation?.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-neutral-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm sm:text-base"
                      placeholder="Enter your full name"
                    />
                  </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                      placeholder="07xxx xxxxxx"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">
                    Have you had a consultation before?
                  </label>
                  <select
                    name="hasConsultedBefore"
                    value={formData.hasConsultedBefore}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-neutral-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm sm:text-base"
                  >
                    <option value="">Please select</option>
                    <option value="yes">Yes, with Kayleigh</option>
                    <option value="elsewhere">Yes, elsewhere</option>
                    <option value="no">No, this is my first time</option>
                  </select>
                </div>
              </div>
              )}

              {/* Step 2: Treatment Details */}
              {step === 2 && (
              <div className="space-y-4 sm:space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Treatment Details</h3>
                  <p className="text-sm sm:text-base text-neutral-600 mb-4 sm:mb-6">Tell us about your treatment preferences</p>
                </div>
                
                {/* Prompt to take assessment if not completed */}
                {!assessmentData && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-sm text-amber-800 font-medium mb-1">
                          Get a personalized recommendation!
                        </p>
                        <p className="text-sm text-amber-700">
                          Take our quick assessment to find your ideal treatment.
                        </p>
                        <a 
                          href="#assessment" 
                          onClick={onClose}
                          className="inline-flex items-center text-sm text-amber-800 font-medium mt-2 hover:text-amber-900"
                        >
                          Take Assessment →
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Treatment Type *
                  </label>
                  <select
                    name="treatmentType"
                    value={formData.treatmentType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select treatment</option>
                    {assessmentData?.recommendation && (
                      <option value="recommended" className="font-semibold">
                        ⭐ {assessmentData.recommendation.treatment} (Recommended)
                      </option>
                    )}
                    <option value="eye-area">Eye Area Treatment - £150</option>
                    <option value="full-face">Full Face Treatment - £300</option>
                    <option value="three-session">3 Session Package - £600 (Best Value)</option>
                    <option value="consultation">Consultation Only</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Preferred Practitioner
                  </label>
                  <select
                    name="preferredPractitioner"
                    value={formData.preferredPractitioner}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="">No preference</option>
                    <option value="kayleigh">Kayleigh - Lead Nurse & CO2 Specialist</option>
                    <option value="sam">Sam - Senior Therapist</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Main Concerns
                  </label>
                  <textarea
                    name="concerns"
                    value={formData.concerns}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Please describe your skin concerns..."
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Preferred Time
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select time</option>
                      <option value="morning">Morning (9am - 12pm)</option>
                      <option value="afternoon">Afternoon (12pm - 5pm)</option>
                      <option value="evening">Evening (5pm - 8pm)</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>
                </div>
              </div>
              )}

              {/* Step 3: Additional Information */}
              {step === 3 && (
              <div className="space-y-4 sm:space-y-6 animate-fade-in">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Additional Information</h3>
                  <p className="text-sm sm:text-base text-neutral-600 mb-4 sm:mb-6">Any other details you'd like to share?</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Additional Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Any questions or special requirements..."
                  />
                </div>
                
                <div className="bg-primary-50 rounded-xl p-6">
                  <h4 className="font-semibold mb-3">What happens next?</h4>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    <li className="flex items-start">
                      <span className="text-primary-500 mr-2 mt-0.5">✓</span>
                      <span>We'll review your booking request within 24 hours</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 mr-2 mt-0.5">✓</span>
                      <span>You'll receive a confirmation email with appointment details</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary-500 mr-2 mt-0.5">✓</span>
                      <span>Pre-treatment instructions will be sent 48 hours before</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    className="mt-1 mr-3 w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="consent" className="text-sm text-neutral-600">
                    I consent to Aesthetics with Kayleigh contacting me regarding my booking request and understand that my information will be handled in accordance with the privacy policy.
                  </label>
                </div>
              </div>
              )}
            </div>
            {/* Navigation Buttons - Fixed at bottom */}
            <div className="flex justify-between p-6 sm:p-8 pt-4 sm:pt-6 border-t border-neutral-100 bg-white flex-shrink-0">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center text-neutral-600 hover:text-neutral-800 font-medium transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
              )}
              
              <div className={step === 1 ? 'ml-auto' : ''}>
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={
                      (step === 1 && (!formData.name || !formData.email || !formData.phone)) ||
                      (step === 2 && !formData.treatmentType)
                    }
                    className="flex items-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    Next Step
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Complete Booking
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}