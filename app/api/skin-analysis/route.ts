import { createHash, randomBytes } from 'crypto'
import { mkdir, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'
import { NextResponse } from 'next/server'

const MAX_PHOTO_BYTES = 2 * 1024 * 1024
const FOLDER = 'clarity-cosmetics/morpheus8/skin-analysis'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254
}

function isValidPhone(phone: string): boolean {
  return /^[\d\s\-+()]+$/.test(phone) && phone.length >= 10 && phone.length <= 20
}

function sanitize(value: string, maxLength: number): string {
  return value.trim().slice(0, maxLength)
}

function escapeContext(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/=/g, '\\=').replace(/\|/g, '\\|')
}

function cloudinaryConfig(): { cloudName: string; apiKey: string; apiSecret: string } | null {
  const url = process.env.CLOUDINARY_URL
  if (url) {
    const match = url.match(/^cloudinary:\/\/([^:]+):([^@]+)@([^/]+)/)
    if (match) {
      return { apiKey: decodeURIComponent(match[1]), apiSecret: decodeURIComponent(match[2]), cloudName: match[3] }
    }
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  if (cloudName && apiKey && apiSecret) {
    return { cloudName, apiKey, apiSecret }
  }

  return null
}

function signUpload(params: Record<string, string>, apiSecret: string): string {
  const payload = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join('&')

  return createHash('sha1').update(payload + apiSecret).digest('hex')
}

async function uploadToCloudinary(photo: string, context: string, publicId: string) {
  const config = cloudinaryConfig()
  if (!config) return null

  const timestamp = String(Math.floor(Date.now() / 1000))
  const params = {
    context,
    folder: FOLDER,
    public_id: publicId,
    tags: 'skin-analysis,morpheus8,free-analysis',
    timestamp,
    type: 'authenticated',
  }
  const signature = signUpload(params, config.apiSecret)
  const body = new FormData()
  body.append('file', photo)
  body.append('api_key', config.apiKey)
  body.append('signature', signature)
  for (const [key, value] of Object.entries(params)) {
    body.append(key, value)
  }

  const response = await fetch(`https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`, {
    method: 'POST',
    body,
  })

  if (!response.ok) {
    const detail = await response.text()
    throw new Error(`Cloudinary upload failed (${response.status}): ${detail.slice(0, 300)}`)
  }

  const result = await response.json()
  return typeof result.public_id === 'string' ? result.public_id : publicId
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, goals, photo, website } = body ?? {}

    if (typeof website === 'string' && website.trim()) {
      return NextResponse.json({ message: 'Thank you. The team will review your photo and be in touch.' })
    }

    if (!name || !email || !phone || !photo) {
      return NextResponse.json({ error: 'Please add your photo, name, email, and phone number.' }, { status: 400 })
    }

    const sanitizedName = sanitize(String(name), 100)
    const sanitizedEmail = sanitize(String(email), 254)
    const sanitizedPhone = sanitize(String(phone), 20)
    const sanitizedGoals = goals ? sanitize(String(goals), 500) : ''

    if (sanitizedName.length < 2) {
      return NextResponse.json({ error: 'Please enter your name.' }, { status: 400 })
    }
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 })
    }
    if (!isValidPhone(sanitizedPhone)) {
      return NextResponse.json({ error: 'Please provide a valid phone number.' }, { status: 400 })
    }
    if (typeof photo !== 'string' || !photo.startsWith('data:image/jpeg;base64,')) {
      return NextResponse.json({ error: 'Please upload a clear JPG, PNG, or WEBP photo.' }, { status: 400 })
    }

    const encoded = photo.slice('data:image/jpeg;base64,'.length)
    let bytes: Buffer
    try {
      bytes = Buffer.from(encoded, 'base64')
    } catch {
      return NextResponse.json({ error: 'Please upload a clear JPG, PNG, or WEBP photo.' }, { status: 400 })
    }

    if (bytes.length < 1000 || bytes.length > MAX_PHOTO_BYTES) {
      return NextResponse.json({ error: 'That photo is too large. Please choose a smaller image.' }, { status: 400 })
    }

    const publicId = `analysis-${Date.now()}-${randomBytes(4).toString('hex')}`
    const context = [
      `name=${escapeContext(sanitizedName)}`,
      `email=${escapeContext(sanitizedEmail)}`,
      `phone=${escapeContext(sanitizedPhone)}`,
      sanitizedGoals ? `goals=${escapeContext(sanitizedGoals)}` : '',
    ].filter(Boolean).join('|')

    let storedId = publicId
    const uploadedId = await uploadToCloudinary(photo, context, publicId)

    if (uploadedId) {
      storedId = uploadedId
    } else if (process.env.NODE_ENV === 'development') {
      const dir = path.join(tmpdir(), 'clarity-skin-analysis')
      await mkdir(dir, { recursive: true })
      await writeFile(path.join(dir, `${publicId}.jpg`), bytes)
      await writeFile(
        path.join(dir, `${publicId}.json`),
        JSON.stringify({ name: sanitizedName, email: sanitizedEmail, phone: sanitizedPhone, goals: sanitizedGoals })
      )
    } else {
      console.error('Skin analysis photo was not stored. Set CLOUDINARY_URL on the server.')
      return NextResponse.json(
        { error: 'We could not save your photo just now. Please try again shortly, or call the clinic.' },
        { status: 503 }
      )
    }

    console.log('Free skin analysis request:', {
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      goals: sanitizedGoals,
      photo: storedId,
    })

    return NextResponse.json({
      message: 'Thank you. The team will review your photo and be in touch with personalised guidance.',
    })
  } catch (error) {
    console.error('Skin analysis error:', error instanceof Error ? error.message : error)
    return NextResponse.json(
      { error: 'We could not save your photo just now. Please try again shortly.' },
      { status: 500 }
    )
  }
}
