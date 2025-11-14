import type { Metadata } from 'next'
import { Open_Sans, Montserrat } from 'next/font/google'
import './globals.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Morpheus8 RF Microneedling in Bedford - Clarity Cosmetics',
  description: 'First & only FDA-cleared RF microneedling for skin tightening, wrinkle reduction, and acne scar treatment. CQC registered nurse-led clinic in Bedford.',
  keywords: 'Morpheus8, RF microneedling, skin tightening Bedford, wrinkle treatment, acne scars, Clarity Cosmetics, Bedford aesthetics, Claire Emmerson',
  openGraph: {
    title: 'Morpheus8 RF Microneedling - Clarity Cosmetics Bedford',
    description: 'FDA-cleared RF microneedling for skin tightening and rejuvenation. Natural-looking results with minimal downtime.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'Clarity Cosmetics',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${montserrat.variable} font-sans`}>{children}</body>
    </html>
  )
}