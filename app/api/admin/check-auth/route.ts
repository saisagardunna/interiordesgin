import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('said_admin_token')

  if (token && token.value === 'valid_session_admin_2026') {
    return NextResponse.json({
      authenticated: true,
      user: {
        email: process.env.ADMIN_EMAIL || 'satwikaarchitects@gmail.com',
        role: 'Administrator',
        name: 'Satwika Atelier Admin',
      },
    })
  }

  return NextResponse.json({ authenticated: false }, { status: 401 })
}
