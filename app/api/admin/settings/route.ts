import { NextResponse } from 'next/server'
import { getStudioSettings, updateStudioSettings } from '@/lib/adminStore'
import { isAuthorizedAdmin } from '@/lib/auth'

export async function GET() {
  const settings = await getStudioSettings()
  return NextResponse.json({ success: true, settings })
}

export async function POST(request: Request) {
  const authorized = await isAuthorizedAdmin()
  if (!authorized) {
    return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 401 })
  }
  try {
    const body = await request.json()
    const updated = await updateStudioSettings(body)
    return NextResponse.json({ success: true, settings: updated })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update studio settings.' }, { status: 500 })
  }
}
