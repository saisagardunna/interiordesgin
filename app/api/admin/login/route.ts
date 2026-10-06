import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const adminEmail = process.env.ADMIN_EMAIL || 'satwikaarchitects@gmail.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'Arsatwika@02'

    const cleanEmail = String(email || '').trim().toLowerCase()
    const cleanPassword = String(password || '').trim()

    const allowedEmails = [
      adminEmail.toLowerCase(),
      'satwikaarchitects@gmail.com',
      'arsatwikag@gmail.com'
    ]

    if (allowedEmails.includes(cleanEmail) && cleanPassword === adminPassword) {
      const response = NextResponse.json({
        success: true,
        message: 'Admin authentication successful',
        user: { email: 'satwikaarchitects@gmail.com', role: 'Administrator', name: 'Satwika Atelier Admin' },
      })

      // Set secure HTTP-only cookie
      response.cookies.set('said_admin_token', 'valid_session_admin_2026', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })

      return response
    }

    return NextResponse.json(
      { success: false, error: 'Invalid admin credentials. Please verify your email and password.' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Authentication failed due to a server error.' },
      { status: 500 }
    )
  }
}
