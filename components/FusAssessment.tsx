import type { CSSProperties } from 'react'

/**
 * Claire's AI assessment, served by Follow Up Systems. The widget script in
 * app/layout.tsx finds the [data-fus-assessment] slot and mounts the
 * assessment inline: quiz, a short conversation grounded in Claire's own
 * knowledge base, then a recommendation card. Anyone who leaves their details
 * becomes a lead in FUS and starts Claire's follow-up. Replaces the old
 * three-question quiz, which captured nothing.
 */
const theme = {
  '--fus-font-display': 'var(--font-display), Georgia, "Times New Roman", serif',
  '--fus-font-body': 'var(--font-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  '--fus-ink': '#1f2723',
  '--fus-muted': '#5f6b64',
  '--fus-surface': '#f8f5ef',
  '--fus-surface-raised': '#fcfbf8',
  '--fus-line': '#e2d9ca',
  '--fus-line-strong': '#c9d8cc',
  '--fus-accent': '#588068',
  '--fus-accent-text': '#42604a',
  '--fus-shadow': '0 2px 12px rgba(31, 39, 35, 0.06)',
} as CSSProperties

export default function FusAssessment() {
  return (
    <section id="assessment" className="section-y bg-cream-50">
      <div className="max-w-3xl mx-auto section-padding">
        <div className="text-center mb-10 sm:mb-12">
          <span className="eyebrow">Personalised assessment</span>
          <h2 className="heading-2 mt-4">
            Find your ideal <em className="heading-accent">Morpheus8 treatment</em>
          </h2>
          <p className="lead mt-4 max-w-[44ch] mx-auto">
            A few quick questions, then a short chat, and you&rsquo;ll see where Claire would suggest you&nbsp;start.
          </p>
        </div>
        <div data-fus-assessment="true" style={theme} />
      </div>
    </section>
  )
}
