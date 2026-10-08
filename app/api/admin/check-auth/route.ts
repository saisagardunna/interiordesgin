import { NextResponse } from 'next/server'
import { isAuthorizedAdmin } from '@/lib/auth'

export async function GET() {
  const authorized = await isAuthorizedAdmin()

  if (authorized) {
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
