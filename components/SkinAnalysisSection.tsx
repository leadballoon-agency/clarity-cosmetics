'use client'

import { FormEvent, useState } from 'react'

const CONCERNS = [
  'Skin laxity',
  'Fine lines and wrinkles',
  'Uneven skin texture',
  'Jawline and facial definition',
  'Overall skin quality',
]

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

function canvasToBlob(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Could not read that photo'))),
      'image/jpeg',
      quality
    )
  })
}

async function compressPhoto(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file)
  const maxEdge = 1600
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(bitmap.width * scale))
  canvas.height = Math.max(1, Math.round(bitmap.height * scale))
  const context = canvas.getContext('2d')
  if (!context) {
    bitmap.close()
    throw new Error('Could not read that photo. Please choose a JPG or PNG.')
  }
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close()

  let quality = 0.85
  let blob = await canvasToBlob(canvas, quality)
  while (blob.size > 1_500_000 && quality > 0.5) {
    quality -= 0.1
    blob = await canvasToBlob(canvas, quality)
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('Could not read that photo. Please choose a JPG or PNG.'))
    reader.readAsDataURL(blob)
  })
}

export default function SkinAnalysisSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [goals, setGoals] = useState('')
  const [photo, setPhoto] = useState('')
  const [preview, setPreview] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState('')
  const [isDragging, setIsDragging] = useState(false)

  const preparePhoto = async (file: File | undefined) => {
    if (!file) return
    setError('')
    setStatus('idle')
    if (!file.type.startsWith('image/')) {
      setError('Please upload a clear photo — JPG, PNG, or WEBP.')
      return
    }
    if (file.size > 15 * 1024 * 1024) {
      setError('That photo is too large. Please choose one under 15MB.')
      return
    }
    try {
      const dataUrl = await compressPhoto(file)
      setPhoto(dataUrl)
      setPreview(dataUrl)
    } catch {
      setError('That photo could not be read. Please choose a JPG or PNG.')
    }
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')

    if (!photo) {
      setError('Upload a clear photo so the team can review your skin.')
      return
    }

    setStatus('submitting')
    const form = event.currentTarget as HTMLFormElement
    const website = (form.elements.namedItem('website') as HTMLInputElement | null)?.value ?? ''

    try {
      const response = await fetch('/api/skin-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, goals, photo, website }),
      })
      const result = await response.json()
      if (!response.ok) {
        setStatus('error')
        setError(result.error || 'We could not send your photo. Please try again.')
        return
      }
      setStatus('success')
    } catch {
      setStatus('error')
      setError('We could not send your photo. Please check your connection and try again.')
    }
  }

  return (
    <section id="skin-analysis" className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-white to-primary-50">
      <div className="max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center px-3 py-1.5 bg-primary-100 rounded-full mb-4">
                <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse mr-2"></span>
                <span className="text-primary-700 font-medium text-sm">Free online skin analysis</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                Discover what your skin
                <span className="block gradient-text">really needs</span>
              </h2>
              <p className="text-base sm:text-lg text-neutral-700 font-medium mt-4">
                Not sure which treatment would be most suitable for your skin?
              </p>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mt-3">
                Clarity Cosmetics is offering a free online skin analysis to help you understand your options — including whether Morpheus8 could be suitable for your goals.
              </p>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mt-3">
                Simply upload a clear photo and the team will review your skin and provide personalised guidance.
              </p>
            </div>

            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-neutral-800">
                Morpheus8 combines microneedling with radiofrequency
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 mt-2">
                It can be used to help improve the appearance of:
              </p>
              <ul className="mt-4 space-y-3">
                {CONCERNS.map((concern) => (
                  <li key={concern} className="flex items-center">
                    <svg className="w-5 h-5 text-primary-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm sm:text-base text-neutral-700 font-medium">{concern}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-premium border border-primary-100 p-5 sm:p-8">
            {status === 'success' ? (
              <div className="text-center py-8 sm:py-12">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100">
                  <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl font-bold text-neutral-800">Photo received</h3>
                <p className="text-neutral-600 mt-3 leading-relaxed">
                  Thank you. Claire&apos;s team will review your photo and be in touch with personalised guidance on whether Morpheus8 could suit your goals.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="font-display text-2xl font-bold text-neutral-800">
                    Upload your photo today
                  </h3>
                  <p className="text-sm text-neutral-600 mt-1">
                    For your free skin analysis. Use a clear, front-facing photo in natural light, without heavy filters.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="skin-photo"
                    onDragOver={(event) => {
                      event.preventDefault()
                      setIsDragging(true)
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(event) => {
                      event.preventDefault()
                      setIsDragging(false)
                      void preparePhoto(event.dataTransfer.files?.[0])
                    }}
                    className={`relative flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-4 py-6 text-center transition-colors ${
                      isDragging ? 'border-primary-500 bg-primary-50' : 'border-primary-200 bg-primary-50/40 hover:border-primary-400'
                    }`}
                  >
                    {preview ? (
                      <img src={preview} alt="Your uploaded skin photo preview" className="max-h-56 w-auto rounded-xl object-contain" />
                    ) : (
                      <>
                        <svg className="w-8 h-8 text-primary-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M8 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium text-neutral-800">Upload a clear photo</span>
                        <span className="text-sm text-neutral-500 mt-1">JPG, PNG, or WEBP. Tap to choose or take a photo.</span>
                      </>
                    )}
                    <input
                      id="skin-photo"
                      name="photo"
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.jpg,.jpeg,.png,.webp"
                      className="sr-only"
                      onChange={(event) => {
                        void preparePhoto(event.target.files?.[0])
                        event.target.value = ''
                      }}
                    />
                  </label>
                  {preview && (
                    <button
                      type="button"
                      onClick={() => {
                        setPhoto('')
                        setPreview('')
                      }}
                      className="mt-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      Remove photo
                    </button>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-neutral-700">Name</span>
                    <input
                      required
                      name="name"
                      autoComplete="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 outline-none focus:border-primary-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-neutral-700">Email</span>
                    <input
                      required
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 outline-none focus:border-primary-500"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-neutral-700">Phone</span>
                    <input
                      required
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 outline-none focus:border-primary-500"
                    />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="text-sm font-medium text-neutral-700">What would you like to improve? <span className="font-normal text-neutral-400">(optional)</span></span>
                    <textarea
                      name="goals"
                      rows={3}
                      maxLength={500}
                      value={goals}
                      onChange={(event) => setGoals(event.target.value)}
                      className="mt-1 w-full rounded-xl border border-neutral-200 px-4 py-3 text-neutral-800 outline-none focus:border-primary-500"
                    />
                  </label>
                </div>

                <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                {error && (
                  <p role="alert" className="text-sm text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex items-center justify-center bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-full font-semibold text-base hover:shadow-xl transition-all duration-300 hover:scale-105 min-h-[48px] disabled:opacity-70 disabled:hover:scale-100"
                >
                  {status === 'submitting' ? 'Sending your photo…' : 'Upload my photo'}
                </button>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Your photo is reviewed by the Clarity Cosmetics team and used only to guide your treatment options. This is a free online review, separate from the in-clinic consultation.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
