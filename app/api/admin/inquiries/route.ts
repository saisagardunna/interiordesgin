import { NextResponse } from 'next/server'
import { getInquiries, addInquiry, deleteInquiry } from '@/lib/adminStore'

export async function GET() {
  const inquiries = getInquiries()
  return NextResponse.json({ success: true, inquiries })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, location, service, budget, message, coordinates, googleMapsUrl } = body

    if (!name || !phone) {
      return NextResponse.json({ success: false, error: 'Name and phone number required.' }, { status: 400 })
    }

    const inquiry = addInquiry({
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: String(email || '').trim(),
      location: String(location || '').trim(),
      service: String(service || '').trim(),
      budget: String(budget || '').trim(),
      message: String(message || '').trim(),
      coordinates: String(coordinates || '').trim(),
      googleMapsUrl: String(googleMapsUrl || '').trim(),
    })

    return NextResponse.json({ success: true, inquiry })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to record inquiry.' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ success: false, error: 'Inquiry ID required' }, { status: 400 })
    }
    const success = deleteInquiry(id)
    return NextResponse.json({ success })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete inquiry' }, { status: 500 })
  }
}
