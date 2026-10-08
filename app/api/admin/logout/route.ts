import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { destroyAdminSession } from '@/lib/auth'

export async function POST() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('said_admin_token')
    if (token?.value) {
      destroyAdminSession(token.value)
    }
  } catch (e) {
    console.error('Logout session cleanup error:', e)
  }

  const response = NextResponse.json({ success: true, message: 'Logged out successfully' })
  response.cookies.set('said_admin_token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  })
  return response
}
