'use client'

import { useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export interface LightboxItem {
  treatmentArea: string
  title: string
  description: string
  /** Either a single composite image … */
  image?: { src: string; width: number; height: number }
  /** … or a before / after pair */
  before?: { src: string; width: number; height: number }
  after?: { src: string; width: number; height: number }
}

interface ResultsLightboxProps {
  items: LightboxItem[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function ResultsLightbox({ items, index, onClose, onNavigate }: ResultsLightboxProps) {
  const isOpen = index !== null
  const count = items.length

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onNavigate(((index ?? 0) + 1) % count)
      if (event.key === 'ArrowLeft') onNavigate(((index ?? 0) - 1 + count) % count)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, index, count, onClose, onNavigate])

  if (index === null) return null
  const item = items[index]

  const navBtn =
    'absolute top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20'

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 backdrop-blur-sm p-4 sm:p-10 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} before and after`}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        aria-label="Close"
      >
        <X className="h-5 w-5" strokeWidth={1.5} />
      </button>

      {count > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate((index - 1 + count) % count) }}
            className={`${navBtn} left-3 sm:left-6`}
            aria-label="Previous result"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate((index + 1) % count) }}
            className={`${navBtn} right-3 sm:right-6`}
            aria-label="Next result"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </>
      )}

      <figure className="flex max-h-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
        {item.image ? (
          <img
            src={item.image.src}
            alt={`${item.title} - before and after`}
            width={item.image.width}
            height={item.image.height}
            className="h-auto w-auto rounded-lg object-contain"
            style={{ maxWidth: `min(${item.image.width}px, 84vw)`, maxHeight: '72vh' }}
          />
        ) : (
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { img: item.before!, label: 'Before' },
              { img: item.after!, label: 'After' },
            ].map(({ img, label }) => (
              <div key={label} className="relative">
                <img
                  src={img.src}
                  alt={`${item.title} - ${label}`}
                  width={img.width}
                  height={img.height}
                  className="h-auto w-auto rounded-lg object-contain"
                  style={{ maxWidth: `min(${img.width}px, 41vw)`, maxHeight: '72vh' }}
                />
                <span className="absolute top-2 left-2 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-ink">
                  {label}
                </span>
              </div>
            ))}
          </div>
        )}
        <figcaption className="mt-5 max-w-[52ch] text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-primary-200">{item.treatmentArea}</p>
          <p className="mt-1.5 text-sm text-white/75">{item.description}</p>
          <p className="mt-3 text-[11px] text-white/40">{index + 1} / {count}</p>
        </figcaption>
      </figure>
    </div>
  )
}
