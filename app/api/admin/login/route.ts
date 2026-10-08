import { NextResponse } from 'next/server'
import { createAdminSession } from '@/lib/auth'

// In-memory rate limiting for brute-force protection
const failedAttemptsMap = new Map<string, { count: number; lockUntil: number }>()

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Extract client IP for rate limiting
    const ip = request.headers.get('x-forwarded-for') || 'default-client'
    const now = Date.now()
    const attemptRecord = failedAttemptsMap.get(ip) || { count: 0, lockUntil: 0 }

    // Check if IP is currently locked out
    if (attemptRecord.lockUntil > now) {
      const minutesLeft = Math.ceil((attemptRecord.lockUntil - now) / 60000)
      return NextResponse.json(
        {
          success: false,
          error: `Too many failed login attempts. Account locked for safety. Please try again in ${minutesLeft} minute(s).`,
        },
        { status: 429 }
      )
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'satwikaarchitects@gmail.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'Arsatwika@02'

    const cleanEmail = String(email || '').trim().toLowerCase()
    const cleanPassword = String(password || '').trim()

    const allowedEmails = [
      adminEmail.toLowerCase(),
      'satwikaarchitects@gmail.com',
      'arsatwikag@gmail.com',
    ]

    if (allowedEmails.includes(cleanEmail) && cleanPassword === adminPassword) {
      // Reset rate limit on successful authentication
      failedAttemptsMap.delete(ip)

      // Create dynamic cryptographic session token
      const sessionToken = createAdminSession()

      const response = NextResponse.json({
        success: true,
        message: 'Admin authentication successful',
        user: { email: 'satwikaarchitects@gmail.com', role: 'Administrator', name: 'Satwika Atelier Admin' },
      })

      // Set secure HTTP-only session cookie (omitting maxAge/expires so browser deletes cookie when tab/window is closed)
      response.cookies.set('said_admin_token', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      })

      return response
    }

    // Increment failed attempt counter
    const newCount = attemptRecord.count + 1
    const lockUntil = newCount >= 5 ? now + 15 * 60 * 1000 : 0 // Lockout 15 minutes after 5 failures

    failedAttemptsMap.set(ip, { count: newCount, lockUntil })

    return NextResponse.json(
      {
        success: false,
        error: newCount >= 5
          ? 'Too many failed login attempts. Security lock activated for 15 minutes.'
          : 'Invalid admin credentials. Please verify your email and password.',
      },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Authentication failed due to a server error.' },
      { status: 500 }
    )
  }
}
