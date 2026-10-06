import { NextResponse } from 'next/server'
import { addInquiry } from '@/lib/adminStore'

export async function POST(req: Request) {
  try {
    let body: any
    try {
      const text = await req.text()
      body = JSON.parse(text)
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid JSON request payload' }, { status: 200 })
    }

    const lat = body.latitude || body.lat || ''
    const lng = body.longitude || body.lng || ''
    const coords = lat && lng ? `Lat: ${lat}, Long: ${lng}` : (body.coordinates || '')
    const mapsUrl = body.maps_link || body.googleMapsUrl || (lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : '')

    // Add inquiry to in-memory / Supabase admin store so it appears in WEB3 & CONTACT INQUIRIES admin tab
    const inquiry = addInquiry({
      name: String(body.name || 'Client').trim(),
      phone: String(body.phone || '').trim(),
      email: String(body.email || '').trim(),
      location: String(body.location || '').trim(),
      service: String(body.service || '').trim(),
      budget: String(body.budget || '').trim(),
      message: String(body.message || '').trim(),
      coordinates: String(coords).trim(),
      googleMapsUrl: String(mapsUrl).trim(),
    })

    return NextResponse.json({ success: true, message: 'Enquiry recorded successfully', inquiry })
  } catch (error: any) {
    console.error('Contact API Error:', error)
    return NextResponse.json({
      success: false,
      message: error?.message || 'Server error occurred while processing enquiry.'
    }, { status: 200 })
  }
}
