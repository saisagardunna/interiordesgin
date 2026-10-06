import { NextResponse } from 'next/server'
import { getScheduledCalls, addScheduledCall, updateCallStatus, deleteCall } from '@/lib/adminStore'

export async function GET() {
  const calls = getScheduledCalls()
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

    const newCall = addScheduledCall({
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

    // Optionally forward payload to Web3Forms so admin also gets instant email notification!
    const web3Key = process.env.WEB3FORMS_ACCESS_KEY
    if (web3Key) {
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          subject: `📅 New Call Consultation Scheduled: ${clientName} (${scheduledDate} ${scheduledTime})`,
          from_name: 'SAID Atelier Schedule Engine',
          to_email: 'satwikaarchitects@gmail.com',
          client_name: clientName,
          client_phone: clientPhone,
          client_email: clientEmail,
          scheduled_date: scheduledDate,
          scheduled_time: scheduledTime,
          service_required: serviceRequired,
          estimated_budget: estimatedBudget,
          location: location,
        }),
      }).catch(() => {})
    }

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
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'Call ID and new status required.' }, { status: 400 })
    }

    const updated = updateCallStatus(id, status)
    if (updated) {
      return NextResponse.json({ success: true, message: `Call status updated to ${status}` })
    }
    return NextResponse.json({ success: false, error: 'Call booking not found.' }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update call status.' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'Call ID required.' }, { status: 400 })
    }

    deleteCall(id)
    return NextResponse.json({ success: true, message: 'Call schedule entry deleted.' })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete scheduled call.' }, { status: 500 })
  }
}
