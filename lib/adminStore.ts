import { supabase } from './supabase'

export interface ScheduledCall {
  id: string
  clientName: string
  clientPhone: string
  clientEmail: string
  location: string
  serviceRequired: string
  estimatedBudget: string
  scheduledDate: string // YYYY-MM-DD
  scheduledTime: string // e.g. "10:30 AM"
  notes?: string
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
  createdAt: string
}

export interface ReviewItem {
  id: string
  author: string
  role: string
  location: string
  project: string
  quote: string
  rating: number
  published: boolean
  createdAt: string
}

export interface InquiryItem {
  id: string
  name: string
  phone: string
  email: string
  location: string
  service: string
  budget: string
  message: string
  coordinates?: string
  googleMapsUrl?: string
  submittedAt: string
}

export interface StudioSettings {
  contactEmail: string
  contactPhone: string
  locationAddress: string
  latitude: number
  longitude: number
  rates2BHK: string
  rates3BHK: string
  rates4BHKVilla: string
}

// Initial Default Reviews
const defaultReviews: ReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Sri BioAesthetics Team',
    role: 'Commercial Client',
    location: 'Hyderabad',
    project: 'Sri BioAesthetics Laboratory & Office',
    quote: 'SAID Studio delivered our specialized commercial laboratory fit-out and office spaces with exceptional speed, architectural precision, and uncompromising craftsmanship.',
    rating: 5,
    published: true,
    createdAt: '2026-02-15',
  },
  {
    id: 'rev-2',
    author: 'Vijay RV & Homeowners',
    role: 'Flat Interiors Client',
    location: 'Sai Vanamali, Miyapur, Hyderabad',
    project: 'Vijay RV’s Sai Vanamali (3 Flat Interiors)',
    quote: 'Entrusting SAID with 3 residential flat interior works at Sai Vanamali was the best decision. From custom modular kitchens to bespoke wardrobes, the finishing is flawless!',
    rating: 5,
    published: true,
    createdAt: '2026-03-01',
  },
  {
    id: 'rev-3',
    author: 'K. Satyanarayana & Family',
    role: 'Private Residence Client',
    location: 'Jubilee Hills, Hyderabad',
    project: 'The Courtyard Residence',
    quote: 'EVERY DETAIL FELT INTENTIONAL AND CRAFTED AROUND THE WAY WE LIVE. SAID transformed our villa in Jubilee Hills into a peaceful sanctuary filled with natural light.',
    rating: 5,
    published: true,
    createdAt: '2026-01-20',
  },
  {
    id: 'rev-4',
    author: 'Dr. Vikram Reddy',
    role: 'Villa Owner',
    location: 'Financial District, Hyderabad',
    project: 'The Quiet Retreat',
    quote: 'Working with G. Ramesh Goud and the SAID team was completely seamless. Single-point accountability meant we never had to chase civil contractors or joinery workers.',
    rating: 5,
    published: true,
    createdAt: '2026-01-10',
  },
]

// In-Memory Storage Cache with Supabase Async Data Sync
let callsStore: ScheduledCall[] = [
  {
    id: 'call-101',
    clientName: 'Ramesh Goud',
    clientPhone: '+91 99080 01558',
    clientEmail: 'satwikaarchitects@gmail.com',
    location: 'Jubilee Hills, Hyderabad',
    serviceRequired: 'Interior Architecture & Fit-Out',
    estimatedBudget: '₹15L - ₹30L',
    scheduledDate: new Date().toISOString().split('T')[0],
    scheduledTime: '11:00 AM',
    notes: 'Initial villa walkthrough & material study meeting.',
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  }
]

let reviewsStore: ReviewItem[] = [...defaultReviews]

let inquiriesStore: InquiryItem[] = [
  {
    id: 'inq-201',
    name: 'Ramesh Goud',
    phone: '+91 99080 01558',
    email: 'satwikaarchitects@gmail.com',
    location: 'Jubilee Hills, Hyderabad',
    service: 'Interior Architecture',
    budget: '₹15L - ₹30L',
    message: 'Looking for complete turnkey interior fit-out and custom teak joinery.',
    coordinates: 'Lat: 17.489842, Long: 78.400996',
    googleMapsUrl: 'https://www.google.com/maps?q=17.489842,78.400996',
    submittedAt: new Date().toISOString(),
  }
]

let settingsStore: StudioSettings = {
  contactEmail: 'satwikaarchitects@gmail.com',
  contactPhone: '+91 99080 01558',
  locationAddress: 'Block 21, F-1, Vignanpuri Colony, Vidya Nagar, Hyderabad - 44',
  latitude: 17.489842,
  longitude: 78.400996,
  rates2BHK: 'Bespoke Urban Residence (Custom Estimate)',
  rates3BHK: 'Bespoke Luxury Flat (Custom Estimate)',
  rates4BHKVilla: 'Bespoke Villa & Estate (Custom Estimate)',
}

// Persistent Deleted Item Trackers
const deletedCallIds = new Set<string>()
const deletedInquiryIds = new Set<string>()
const deletedReviewIds = new Set<string>()

// ----------------------
// SCHEDULED CALLS
// ----------------------
export async function getScheduledCalls(): Promise<ScheduledCall[]> {
  try {
    const { data, error } = await supabase.from('scheduled_calls').select('*')
    if (!error && Array.isArray(data)) {
      const fetchedCalls: ScheduledCall[] = data
        .map((c: any) => ({
          id: String(c.id),
          clientName: c.clientName || c.client_name || 'Client',
          clientPhone: c.clientPhone || c.client_phone || '',
          clientEmail: c.clientEmail || c.client_email || '',
          location: c.location || 'Hyderabad',
          serviceRequired: c.serviceRequired || c.service_required || 'Interior Architecture',
          estimatedBudget: c.estimatedBudget || c.estimated_budget || '₹15L - ₹30L',
          scheduledDate: c.scheduledDate || c.scheduled_date || new Date().toISOString().split('T')[0],
          scheduledTime: c.scheduledTime || c.scheduled_time || '10:00 AM',
          notes: c.notes || '',
          status: (c.status as ScheduledCall['status']) || 'Pending',
          createdAt: c.createdAt || c.created_at || new Date().toISOString(),
        }))
        .filter((c) => !deletedCallIds.has(c.id))
      
      const existingIds = new Set(fetchedCalls.map(c => c.id))
      const combined = [
        ...fetchedCalls,
        ...callsStore.filter(c => !existingIds.has(c.id) && !deletedCallIds.has(c.id))
      ]
      callsStore = combined
      return callsStore
    }
  } catch (err) {
    console.warn('Supabase scheduled_calls fetch fallback to store:', err)
  }
  return callsStore.filter((c) => !deletedCallIds.has(c.id))
}

export async function addScheduledCall(call: Omit<ScheduledCall, 'id' | 'createdAt'>): Promise<ScheduledCall> {
  const newCall: ScheduledCall = {
    ...call,
    id: `call-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
  callsStore = [newCall, ...callsStore.filter((c) => !deletedCallIds.has(c.id))]

  try {
    await supabase.from('scheduled_calls').insert([
      {
        id: newCall.id,
        client_name: newCall.clientName,
        client_phone: newCall.clientPhone,
        client_email: newCall.clientEmail,
        location: newCall.location,
        service_required: newCall.serviceRequired,
        estimated_budget: newCall.estimatedBudget,
        scheduled_date: newCall.scheduledDate,
        scheduled_time: newCall.scheduledTime,
        notes: newCall.notes,
        status: newCall.status,
        created_at: newCall.createdAt,
      },
    ])
  } catch (err) {
    console.error('Supabase scheduled_calls insert error:', err)
  }

  return newCall
}

export async function updateCallStatus(id: string, status: ScheduledCall['status']): Promise<boolean> {
  const index = callsStore.findIndex(c => c.id === id)
  if (index !== -1) {
    callsStore[index].status = status
  }
  try {
    await supabase.from('scheduled_calls').update({ status }).eq('id', id)
  } catch (err) {
    console.error('Supabase scheduled_calls update status error:', err)
  }
  return true
}

export async function deleteCall(id: string): Promise<boolean> {
  deletedCallIds.add(id)
  callsStore = callsStore.filter(c => c.id !== id)
  try {
    await supabase.from('scheduled_calls').delete().eq('id', id)
  } catch (err) {
    console.error('Supabase scheduled_calls delete error:', err)
  }
  return true
}

// ----------------------
// INQUIRIES
// ----------------------
export async function getInquiries(): Promise<InquiryItem[]> {
  try {
    const { data, error } = await supabase.from('inquiries').select('*')
    if (!error && Array.isArray(data)) {
      const fetchedInquiries: InquiryItem[] = data
        .map((i: any) => ({
          id: String(i.id),
          name: i.name || 'Client',
          phone: i.phone || '',
          email: i.email || '',
          location: i.location || '',
          service: i.service || '',
          budget: i.budget || '',
          message: i.message || '',
          coordinates: i.coordinates || '',
          googleMapsUrl: i.googleMapsUrl || i.google_maps_url || '',
          submittedAt: i.submittedAt || i.submitted_at || new Date().toISOString(),
        }))
        .filter((i) => !deletedInquiryIds.has(i.id))

      const existingIds = new Set(fetchedInquiries.map(i => i.id))
      const combined = [
        ...fetchedInquiries,
        ...inquiriesStore.filter(i => !existingIds.has(i.id) && !deletedInquiryIds.has(i.id))
      ]
      inquiriesStore = combined
      return inquiriesStore
    }
  } catch (err) {
    console.warn('Supabase inquiries fetch fallback to store:', err)
  }
  return inquiriesStore.filter((i) => !deletedInquiryIds.has(i.id))
}

export async function addInquiry(inquiry: Omit<InquiryItem, 'id' | 'submittedAt'>): Promise<InquiryItem> {
  const newInq: InquiryItem = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    submittedAt: new Date().toISOString(),
  }
  inquiriesStore = [newInq, ...inquiriesStore.filter((i) => !deletedInquiryIds.has(i.id))]

  try {
    await supabase.from('inquiries').insert([
      {
        id: newInq.id,
        name: newInq.name,
        phone: newInq.phone,
        email: newInq.email,
        location: newInq.location,
        service: newInq.service,
        budget: newInq.budget,
        message: newInq.message,
        coordinates: newInq.coordinates,
        google_maps_url: newInq.googleMapsUrl,
        submitted_at: newInq.submittedAt,
      },
    ])
  } catch (err) {
    console.error('Supabase inquiries insert error:', err)
  }

  return newInq
}

export async function deleteInquiry(id: string): Promise<boolean> {
  deletedInquiryIds.add(id)
  inquiriesStore = inquiriesStore.filter(i => i.id !== id)
  try {
    await supabase.from('inquiries').delete().eq('id', id)
  } catch (err) {
    console.error('Supabase inquiries delete error:', err)
  }
  return true
}

// ----------------------
// REVIEWS
// ----------------------
export async function getReviews(): Promise<ReviewItem[]> {
  try {
    const { data, error } = await supabase.from('reviews').select('*')
    if (!error && Array.isArray(data)) {
      const fetchedReviews: ReviewItem[] = data
        .map((r: any) => ({
          id: String(r.id),
          author: r.author || 'Client',
          role: r.role || 'Client',
          location: r.location || 'Hyderabad',
          project: r.project || 'Residential',
          quote: r.quote || '',
          rating: Number(r.rating) || 5,
          published: r.published !== false && r.is_published !== false,
          createdAt: r.createdAt || r.created_at || new Date().toISOString().split('T')[0],
        }))
        .filter((r) => !deletedReviewIds.has(r.id))
      
      const existingIds = new Set(fetchedReviews.map(r => r.id))
      const combined = [
        ...fetchedReviews,
        ...reviewsStore.filter(r => !existingIds.has(r.id) && !deletedReviewIds.has(r.id)),
        ...defaultReviews.filter(d => !existingIds.has(d.id) && !deletedReviewIds.has(d.id))
      ]
      reviewsStore = combined
      return reviewsStore
    }
  } catch (err) {
    console.warn('Supabase reviews fetch fallback to store:', err)
  }
  return reviewsStore.filter((r) => !deletedReviewIds.has(r.id))
}

export async function addReview(review: Omit<ReviewItem, 'id' | 'createdAt'>): Promise<ReviewItem> {
  const newReview: ReviewItem = {
    ...review,
    id: `rev-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
  }
  reviewsStore = [newReview, ...reviewsStore.filter((r) => !deletedReviewIds.has(r.id))]

  try {
    await supabase.from('reviews').insert([
      {
        id: newReview.id,
        author: newReview.author,
        role: newReview.role,
        location: newReview.location,
        project: newReview.project,
        quote: newReview.quote,
        rating: newReview.rating,
        published: newReview.published,
        created_at: newReview.createdAt,
      },
    ])
  } catch (err) {
    console.error('Supabase reviews insert error:', err)
  }

  return newReview
}

export async function updateReview(id: string, updated: Partial<ReviewItem>): Promise<boolean> {
  const index = reviewsStore.findIndex(r => r.id === id)
  if (index !== -1) {
    reviewsStore[index] = { ...reviewsStore[index], ...updated }
  }

  try {
    const payload: any = {}
    if (updated.author !== undefined) payload.author = updated.author
    if (updated.role !== undefined) payload.role = updated.role
    if (updated.location !== undefined) payload.location = updated.location
    if (updated.project !== undefined) payload.project = updated.project
    if (updated.quote !== undefined) payload.quote = updated.quote
    if (updated.rating !== undefined) payload.rating = updated.rating
    if (updated.published !== undefined) payload.published = updated.published

    await supabase.from('reviews').update(payload).eq('id', id)
  } catch (err) {
    console.error('Supabase reviews update error:', err)
  }

  return true
}

export async function deleteReview(id: string): Promise<boolean> {
  deletedReviewIds.add(id)
  reviewsStore = reviewsStore.filter(r => r.id !== id)
  try {
    await supabase.from('reviews').delete().eq('id', id)
  } catch (err) {
    console.error('Supabase reviews delete error:', err)
  }
  return true
}

// ----------------------
// STUDIO SETTINGS
// ----------------------
export async function getStudioSettings(): Promise<StudioSettings> {
  try {
    const { data, error } = await supabase.from('studio_settings').select('*')
    if (!error && data && data.length > 0) {
      const s = data[0]
      settingsStore = {
        contactEmail: s.contactEmail || s.contact_email || settingsStore.contactEmail,
        contactPhone: s.contactPhone || s.contact_phone || settingsStore.contactPhone,
        locationAddress: s.locationAddress || s.location_address || settingsStore.locationAddress,
        latitude: Number(s.latitude) || settingsStore.latitude,
        longitude: Number(s.longitude) || settingsStore.longitude,
        rates2BHK: s.rates2BHK || s.rates_2bhk || settingsStore.rates2BHK,
        rates3BHK: s.rates3BHK || s.rates_3bhk || settingsStore.rates3BHK,
        rates4BHKVilla: s.rates4BHKVilla || s.rates_4bhk_villa || settingsStore.rates4BHKVilla,
      }
      return settingsStore
    }
  } catch (err) {
    console.warn('Supabase studio_settings fetch fallback to store:', err)
  }
  return settingsStore
}

export async function updateStudioSettings(newSettings: Partial<StudioSettings>): Promise<StudioSettings> {
  settingsStore = { ...settingsStore, ...newSettings }
  try {
    await supabase.from('studio_settings').upsert([
      {
        id: 'main_settings',
        contact_email: settingsStore.contactEmail,
        contact_phone: settingsStore.contactPhone,
        location_address: settingsStore.locationAddress,
        latitude: settingsStore.latitude,
        longitude: settingsStore.longitude,
        rates_2bhk: settingsStore.rates2BHK,
        rates_3bhk: settingsStore.rates3BHK,
        rates_4bhk_villa: settingsStore.rates4BHKVilla,
      },
    ])
  } catch (err) {
    console.error('Supabase studio_settings upsert error:', err)
  }
  return settingsStore
}
