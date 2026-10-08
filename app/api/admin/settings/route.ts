import { NextResponse } from 'next/server'
import { getStudioSettings, updateStudioSettings } from '@/lib/adminStore'

export async function GET() {
  const settings = await getStudioSettings()
  return NextResponse.json({ success: true, settings })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const updated = await updateStudioSettings(body)
    return NextResponse.json({ success: true, settings: updated })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update studio settings.' }, { status: 500 })
  }
}
