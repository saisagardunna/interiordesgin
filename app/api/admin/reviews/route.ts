import { NextResponse } from 'next/server'
import { getReviews, addReview, updateReview, deleteReview } from '@/lib/adminStore'

export async function GET() {
  const reviews = getReviews()
  return NextResponse.json({ success: true, reviews })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { author, role, location, project, quote, rating, published } = body

    if (!author || !quote) {
      return NextResponse.json({ success: false, error: 'Author name and review quote are required.' }, { status: 400 })
    }

    const review = addReview({
      author: String(author).trim(),
      role: String(role || 'Client').trim(),
      location: String(location || 'Hyderabad').trim(),
      project: String(project || 'Residential Interiors').trim(),
      quote: String(quote).trim(),
      rating: Number(rating) || 5,
      published: published !== false,
    })

    return NextResponse.json({ success: true, review })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create review.' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updatedFields } = body

    if (!id) {
      return NextResponse.json({ success: false, error: 'Review ID is required for updates.' }, { status: 400 })
    }

    const updated = updateReview(id, updatedFields)
    if (updated) {
      return NextResponse.json({ success: true, message: 'Review updated successfully' })
    }
    return NextResponse.json({ success: false, error: 'Review not found.' }, { status: 404 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update review.' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ success: false, error: 'Review ID required.' }, { status: 400 })
    }

    deleteReview(id)
    return NextResponse.json({ success: true, message: 'Review deleted.' })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete review.' }, { status: 500 })
  }
}
