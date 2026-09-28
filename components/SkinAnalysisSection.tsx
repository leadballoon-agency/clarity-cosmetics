'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import { Check, ImageUp } from 'lucide-react'
import consultImage from '@/public/images/shoot/DSC09759.jpg'

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
    <section id="skin-analysis" className="section-y bg-cream-100">
      <div className="max-w-6xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="space-y-8">
            <div>
              <span className="eyebrow">Free online skin analysis</span>
              <h2 className="heading-2 mt-4">
                Discover what your skin <em className="heading-accent">really needs</em>
              </h2>
              <p className="text-[17px] text-ink mt-5">
                Not sure which treatment would be most suitable for your skin?
              </p>
              <p className="lead mt-3">
                Clarity Cosmetics is offering a free online skin analysis to help you understand your options — including whether Morpheus8 could be suitable for your&nbsp;goals.
              </p>
              <p className="lead mt-3">
                Simply upload a clear photo and the team will review your skin and provide personalised&nbsp;guidance.
              </p>
            </div>

            <div className="border-t border-cream-300 pt-8">
              <h3 className="heading-3">
                Morpheus8 combines microneedling with radiofrequency
              </h3>
              <p className="text-[15px] text-neutral-600 mt-2">
                It can be used to help improve the appearance of:
              </p>
              <ul className="mt-4 space-y-2.5">
                {CONCERNS.map((concern) => (
                  <li key={concern} className="flex items-center gap-3">
                    <Check className="h-4 w-4 flex-shrink-0 text-primary-600" strokeWidth={1.75} aria-hidden="true" />
                    <span className="text-[15px] text-neutral-700">{concern}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:block relative aspect-[3/2] overflow-hidden rounded-2xl">
              <Image
                src={consultImage}
                alt="Claire Emmerson explaining a treatment plan to a client holding a mirror"
                fill
                sizes="(min-width: 1152px) 544px, 45vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="card p-6 sm:p-8">
            {status === 'success' ? (
              <div className="text-center py-8 sm:py-12">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-primary-200 bg-primary-50">
                  <Check className="h-5 w-5 text-primary-600" strokeWidth={1.75} aria-hidden="true" />
                </div>
                <h3 className="heading-3 !text-2xl">Photo received</h3>
                <p className="text-neutral-600 mt-3 leading-relaxed">
                  Thank you. Claire&apos;s team will review your photo and be in touch with personalised guidance on whether Morpheus8 could suit your goals.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="heading-3 !text-2xl">
                    Upload your photo today
                  </h3>
                  <p className="text-sm text-neutral-600 mt-2">
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
                    className={`relative flex min-h-[168px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 py-6 text-center transition-colors ${
                      isDragging ? 'border-primary-500 bg-primary-50' : 'border-neutral-300 bg-cream-50 hover:border-primary-400'
                    }`}
                  >
                    {preview ? (
                      <img src={preview} alt="Your uploaded skin photo preview" className="max-h-56 w-auto rounded-lg object-contain" />
                    ) : (
                      <>
                        <ImageUp className="h-7 w-7 text-primary-600 mb-3" strokeWidth={1.25} aria-hidden="true" />
                        <span className="text-[15px] font-medium text-ink">Upload a clear photo</span>
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
                      className="mt-2 text-sm font-medium text-primary-700 hover:text-primary-800"
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
                      className="field"
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
                      className="field"
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
                      className="field"
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
                      className="field"
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
                  className="btn-primary w-full disabled:opacity-70"
                >
                  {status === 'submitting' ? 'Sending your photo…' : 'Upload my photo'}
                </button>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  Your photo is reviewed by the Clarity Cosmetics team and used only to guide your treatment options. This is a free online review, separate from the in‑clinic&nbsp;consultation.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
