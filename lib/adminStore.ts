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

// In-Memory Storage Cache with Supabase Sync
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
  rates2BHK: '₹12 Lakhs – ₹18 Lakhs',
  rates3BHK: '₹18 Lakhs – ₹28 Lakhs',
  rates4BHKVilla: '₹30 Lakhs – ₹50+ Lakhs',
}

// Accessors
export function getScheduledCalls(): ScheduledCall[] {
  return callsStore
}

export function addScheduledCall(call: Omit<ScheduledCall, 'id' | 'createdAt'>): ScheduledCall {
  const newCall: ScheduledCall = {
    ...call,
    id: `call-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
  callsStore = [newCall, ...callsStore]
  // Async sync to Supabase if table exists
  supabase.from('scheduled_calls').insert([newCall]).then(() => {}).catch(() => {})
  return newCall
}

export function updateCallStatus(id: string, status: ScheduledCall['status']): boolean {
  const index = callsStore.findIndex(c => c.id === id)
  if (index !== -1) {
    callsStore[index].status = status
    supabase.from('scheduled_calls').update({ status }).eq('id', id).then(() => {}).catch(() => {})
    return true
  }
  return false
}

export function deleteCall(id: string): boolean {
  callsStore = callsStore.filter(c => c.id !== id)
  supabase.from('scheduled_calls').delete().eq('id', id).then(() => {}).catch(() => {})
  return true
}

export function getReviews(): ReviewItem[] {
  return reviewsStore
}

export function addReview(review: Omit<ReviewItem, 'id' | 'createdAt'>): ReviewItem {
  const newReview: ReviewItem = {
    ...review,
    id: `rev-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
  }
  reviewsStore = [newReview, ...reviewsStore]
  supabase.from('reviews').insert([newReview]).then(() => {}).catch(() => {})
  return newReview
}

export function updateReview(id: string, updated: Partial<ReviewItem>): boolean {
  const index = reviewsStore.findIndex(r => r.id === id)
  if (index !== -1) {
    reviewsStore[index] = { ...reviewsStore[index], ...updated }
    supabase.from('reviews').update(updated).eq('id', id).then(() => {}).catch(() => {})
    return true
  }
  return false
}

export function deleteReview(id: string): boolean {
  reviewsStore = reviewsStore.filter(r => r.id !== id)
  supabase.from('reviews').delete().eq('id', id).then(() => {}).catch(() => {})
  return true
}

export function getInquiries(): InquiryItem[] {
  return inquiriesStore
}

export function addInquiry(inquiry: Omit<InquiryItem, 'id' | 'submittedAt'>): InquiryItem {
  const newInq: InquiryItem = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    submittedAt: new Date().toISOString(),
  }
  inquiriesStore = [newInq, ...inquiriesStore]
  supabase.from('inquiries').insert([newInq]).then(() => {}).catch(() => {})
  return newInq
}

export function deleteInquiry(id: string): boolean {
  inquiriesStore = inquiriesStore.filter(i => i.id !== id)
  supabase.from('inquiries').delete().eq('id', id).then(() => {}).catch(() => {})
  return true
}

export function getStudioSettings(): StudioSettings {
  return settingsStore
}

export function updateStudioSettings(newSettings: Partial<StudioSettings>): StudioSettings {
  settingsStore = { ...settingsStore, ...newSettings }
  supabase.from('studio_settings').upsert([settingsStore]).then(() => {}).catch(() => {})
  return settingsStore
}
