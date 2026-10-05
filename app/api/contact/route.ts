import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    let body: any
    try {
      const text = await req.text()
      body = JSON.parse(text)
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid JSON request payload' }, { status: 200 })
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || '2e493c0c-8a06-48cd-a31d-9d1d8725a9a7'
    const formData = new FormData()
    formData.append('access_key', accessKey)
    formData.append('subject', body.subject || 'New SAID Studio Inquiry')
    formData.append('from_name', 'SAID Studio Client Portal')
    formData.append('name', body.name || '')
    formData.append('email', body.email || '')
    formData.append('replyto', body.email || '')
    formData.append('message', body.message || '')
    if (body.projectLocation) formData.append('projectLocation', body.projectLocation)
    if (body.client_coordinates) formData.append('client_coordinates', body.client_coordinates)

    // Send FormData with standard User-Agent and Accept header
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: formData,
    })

    const rawText = await response.text()
    console.log('[Web3Forms Server Log]: Status', response.status, 'Body:', rawText)

    let data: any
    try {
      data = JSON.parse(rawText)
    } catch (e) {
      // Fallback check if response indicates success in HTML text
      if (rawText.toLowerCase().includes('success') || rawText.toLowerCase().includes('submitted')) {
        return NextResponse.json({ success: true, message: 'Enquiry sent successfully' })
      }
      return NextResponse.json({
        success: false,
        message: 'Web3Forms API server returned non-JSON response. Please check server logs.'
      }, { status: 200 })
    }

    if (data.success || response.status === 200) {
      return NextResponse.json({ success: true, message: 'Enquiry sent successfully' })
    } else {
      return NextResponse.json({
        success: false,
        message: data.message || 'Web3Forms submission failed.'
      }, { status: 200 })
    }
  } catch (error: any) {
    console.error('Contact API Error:', error)
    return NextResponse.json({
      success: false,
      message: error?.message || 'Server error occurred while sending enquiry.'
    }, { status: 200 })
  }
}
