/**
 * Content-Security-Policy
 *
 * Keep this list IDENTICAL to the Content-Security-Policy header in vercel.json.
 * On Vercel both are sent, and browsers enforce every CSP header they receive,
 * so any source missing from either one is blocked in production.
 * (`upgrade-insecure-requests` is only added on Vercel so local http://localhost keeps working.)
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://link.morpheus8bedford.co.uk https://voice.morpheus8bedford.co.uk https://connect.facebook.net https://widgets.leadconnectorhq.com https://*.leadconnectorhq.com https://followupsystems.co.uk",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.bunny.net https://widgets.leadconnectorhq.com https://*.leadconnectorhq.com",
  "font-src 'self' https://fonts.gstatic.com https://fonts.bunny.net data:",
  "img-src 'self' data: https: blob:",
  "frame-src 'self' https://link.morpheus8bedford.co.uk https://voice.morpheus8bedford.co.uk https://www.facebook.com https://widgets.leadconnectorhq.com https://*.leadconnectorhq.com https://phorest.com https://*.phorest.com https://followupsystems.co.uk",
  "connect-src 'self' https://link.morpheus8bedford.co.uk https://voice.morpheus8bedford.co.uk https://www.facebook.com https://widgets.leadconnectorhq.com https://*.leadconnectorhq.com wss://*.leadconnectorhq.com https://services.msgsndr.com https://*.msgsndr.com https://followupsystems.co.uk https://res.cloudinary.com",
  "media-src 'self' blob: https://*.leadconnectorhq.com https://storage.googleapis.com https://assets.cdn.filesafe.space https://res.cloudinary.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self' https://link.morpheus8bedford.co.uk",
  "frame-ancestors 'self' https://followupsystems.co.uk",
  ...(process.env.VERCEL ? ['upgrade-insecure-requests'] : []),
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: csp.join('; '),
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
