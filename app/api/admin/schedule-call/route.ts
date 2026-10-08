import { NextResponse } from 'next/server'
import { getScheduledCalls, addScheduledCall, updateCallStatus, deleteCall } from '@/lib/adminStore'
import { isAuthorizedAdmin } from '@/lib/auth'

export async function GET() {
  const authorized = await isAuthorizedAdmin()
  if (!authorized) {
    return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 401 })
  }
  const calls = await getScheduledCalls()
  return NextResponse.json({ success: true, calls })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { clientName, clientPhone, clientEmail, location, serviceRequired, estimatedBudget, scheduledDate, scheduledTime, notes } = body

    if (!clientName || !clientPhone || !scheduledDate || !scheduledTime) {
      return NextResponse.json(
        { success: false, error: 'Client Name, Phone Number, Date, and Time Slot are required.' },
        { status: 400 }
      )
    }

    const newCall = await addScheduledCall({
      clientName: String(clientName).trim(),
      clientPhone: String(clientPhone).trim(),
      clientEmail: String(clientEmail || '').trim(),
      location: String(location || 'Hyderabad').trim(),
      serviceRequired: String(serviceRequired || 'Interior Architecture').trim(),
      estimatedBudget: String(estimatedBudget || '₹15L - ₹30L').trim(),
      scheduledDate: String(scheduledDate).trim(),
      scheduledTime: String(scheduledTime).trim(),
      notes: String(notes || '').trim(),
      status: 'Pending',
    })

    return NextResponse.json({
      success: true,
      message: 'Call consultation scheduled successfully!',
      call: newCall,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to schedule call.' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const authorized = await isAuthorizedAdmin()
  if (!authorized) {
    return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 401 })
  }
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Call ID and new status required.' }, { status: 400 })
    }

    const updated = await updateCallStatus(id, status)
    if (updated) {
      return NextResponse.json({ success: true, message: `Call status updated to ${status}` })
    }
    return NextResponse.json({ success: false, error: 'Call booking not found.' }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update call status.' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const authorized = await isAuthorizedAdmin()
  if (!authorized) {
    return NextResponse.json({ success: false, error: 'Unauthorized access' }, { status: 401 })
  }
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'Call ID required.' }, { status: 400 })
    }

    await deleteCall(id)
    return NextResponse.json({ success: true, message: 'Call schedule entry deleted.' })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete scheduled call.' }, { status: 500 })
  }
}
