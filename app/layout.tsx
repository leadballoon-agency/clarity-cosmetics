import type { Metadata } from 'next'
import { Open_Sans, Montserrat } from 'next/font/google'
import Script from 'next/script'
import MetaPixel from '@/components/MetaPixel'
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
  metadataBase: new URL('https://morpheus8bedford.co.uk'),
  title: {
    default: 'Morpheus8 Bedford | RF Microneedling by Registered Nurse Claire Emmerson',
    template: '%s | Morpheus8 Bedford'
  },
  description: 'FDA-cleared Morpheus8 RF microneedling in Bedford. CQC registered, nurse-led clinic specialising in skin tightening, wrinkle reduction & acne scar treatment. Natural results, minimal downtime.',
  keywords: [
    'Morpheus8 Bedford',
    'RF microneedling Bedford',
    'skin tightening Bedford',
    'wrinkle treatment Bedford',
    'acne scar treatment Bedford',
    'Clarity Clinic',
    'Claire Emmerson',
    'nurse-led aesthetics Bedford',
    'CQC registered clinic Bedford',
    'facial rejuvenation Bedford',
    'non-surgical facelift Bedford',
    'Morpheus8 Bedfordshire'
  ],
  icons: {
    icon: [
      { url: '/images/morpheus8-favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/morpheus8-favicon.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: [
      { url: '/images/morpheus8-favicon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/images/morpheus8-favicon.png'
  },
  authors: [{ name: 'Claire Emmerson, RN' }],
  creator: 'Clarity Clinic',
  publisher: 'Clarity Clinic',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Morpheus8 Bedford | RF Microneedling by Registered Nurse Claire Emmerson',
    description: 'FDA-cleared Morpheus8 RF microneedling in Bedford. CQC registered, nurse-led clinic. Natural results with minimal downtime. Book your free consultation today.',
    url: 'https://morpheus8bedford.co.uk',
    siteName: 'Morpheus8 Bedford - Clarity Clinic',
    images: [
      {
        url: '/images/home1.jpg',
        width: 1200,
        height: 630,
        alt: 'Claire Emmerson - Registered Nurse & Morpheus8 Specialist at Clarity Clinic Bedford',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Morpheus8 Bedford | RF Microneedling by Registered Nurse Claire Emmerson',
    description: 'FDA-cleared Morpheus8 RF microneedling in Bedford. CQC registered, nurse-led clinic. Natural results with minimal downtime.',
    images: ['/images/home1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'MedicalBusiness',
      '@id': 'https://morpheus8bedford.co.uk/#medicalbusiness',
      name: 'Clarity Clinic - Morpheus8 Bedford',
      image: 'https://morpheus8bedford.co.uk/images/home1.jpg',
      description: 'CQC registered nurse-led aesthetic clinic in Bedford specialising in Morpheus8 RF microneedling treatments for skin tightening, wrinkle reduction, and acne scar treatment.',
      url: 'https://morpheus8bedford.co.uk',
      telephone: '+447414154007',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Conway Crescent',
        addressLocality: 'Bedford',
        postalCode: 'MK41 7BW',
        addressCountry: 'GB',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 52.1406,
        longitude: -0.4670,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
      priceRange: '££-£££',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '8',
        bestRating: '5',
        worstRating: '1',
      },
      founder: {
        '@id': 'https://morpheus8bedford.co.uk/#person',
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://morpheus8bedford.co.uk/#person',
      name: 'Claire Emmerson',
      jobTitle: 'Registered Nurse & Aesthetic Practitioner',
      image: 'https://morpheus8bedford.co.uk/images/home1.jpg',
      description: 'Registered Nurse with over 10 years of experience, specialising in Morpheus8 RF microneedling and aesthetic treatments. CQC registered and Independent Prescriber.',
      worksFor: {
        '@id': 'https://morpheus8bedford.co.uk/#medicalbusiness',
      },
      alumniOf: 'Nursing & Midwifery Council',
      hasCredential: [
        'Registered Nurse (RN)',
        'Registered Midwife',
        'Independent Prescriber',
        'Advanced Aesthetic Practitioner',
      ],
    },
    {
      '@type': 'MedicalTherapy',
      name: 'Morpheus8 RF Microneedling',
      description: 'FDA-cleared radiofrequency microneedling treatment for skin tightening, wrinkle reduction, acne scar improvement, and overall skin rejuvenation.',
      medicineSystem: 'Aesthetic Medicine',
      relevantSpecialty: 'Dermatology',
      procedure: {
        '@type': 'MedicalProcedure',
        name: 'Morpheus8 Treatment',
        procedureType: 'Therapeutic',
        bodyLocation: 'Face, Neck, Body',
      },
    },
    {
      '@type': 'Service',
      serviceType: 'Morpheus8 RF Microneedling',
      provider: {
        '@id': 'https://morpheus8bedford.co.uk/#medicalbusiness',
      },
      areaServed: {
        '@type': 'City',
        name: 'Bedford',
        containedIn: {
          '@type': 'Country',
          name: 'United Kingdom',
        },
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Morpheus8 Treatments',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Morpheus8 Face Treatment',
              description: 'Full face RF microneedling treatment for skin tightening and rejuvenation',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Morpheus8 Face & Neck Package',
              description: 'Comprehensive facial and neck rejuvenation treatment',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Morpheus8 Body Treatment',
              description: 'Body contouring and skin tightening for abdomen, arms, or thighs',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://morpheus8bedford.co.uk/#website',
      url: 'https://morpheus8bedford.co.uk',
      name: 'Morpheus8 Bedford - Clarity Clinic',
      description: 'FDA-cleared Morpheus8 RF microneedling in Bedford',
      publisher: {
        '@id': 'https://morpheus8bedford.co.uk/#medicalbusiness',
      },
      inLanguage: 'en-GB',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://morpheus8bedford.co.uk',
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${openSans.variable} ${montserrat.variable} font-sans`}>
        <MetaPixel />
        {children}
      </body>
    </html>
  )
}