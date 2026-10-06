'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar,
  PhoneCall,
  MessageSquare,
  Star,
  Settings,
  LogOut,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  MapPin,
  Mail,
  Phone,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Edit,
  Eye,
  EyeOff
} from 'lucide-react'

import { ScheduledCall, ReviewItem, InquiryItem, StudioSettings } from '@/lib/adminStore'

export default function AdminDashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'calls' | 'inquiries' | 'reviews' | 'settings'>('calls')

  const [calls, setCalls] = useState<ScheduledCall[]>([])
  const [inquiries, setInquiries] = useState<InquiryItem[]>([])
  const [reviews, setReviews] = useState<ReviewItem[]>([])
  const [settings, setSettings] = useState<StudioSettings>({
    contactEmail: 'satwikaarchitects@gmail.com',
    contactPhone: '+91 99080 01558',
    locationAddress: 'Block 21, F-1, Vignanpuri Colony, Vidya Nagar, Hyderabad - 44',
    latitude: 17.489842,
    longitude: 78.400996,
    rates2BHK: '₹12 Lakhs – ₹18 Lakhs',
    rates3BHK: '₹18 Lakhs – ₹28 Lakhs',
    rates4BHKVilla: '₹30 Lakhs – ₹50+ Lakhs',
  })

  // Filter States
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<string>('')
  const [callStatusFilter, setCallStatusFilter] = useState<string>('All')

  // Review Modal State
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null)
  const [revAuthor, setRevAuthor] = useState('')
  const [revRole, setRevRole] = useState('')
  const [revLocation, setRevLocation] = useState('')
  const [revProject, setRevProject] = useState('')
  const [revQuote, setRevQuote] = useState('')
  const [revRating, setRevRating] = useState(5)
  const [revPublished, setRevPublished] = useState(true)

  // Notification Banner
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(null), 4000)
  }

  // Auth Guard & Initial Data Fetch
  useEffect(() => {
    const initData = async () => {
      try {
        const authRes = await fetch('/api/admin/check-auth')
        if (!authRes.ok) {
          router.push('/admin/login')
          return
        }

        await fetchAllData()
      } catch (err) {
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }
    initData()
  }, [router])

  const fetchAllData = async () => {
    try {
      const [callsRes, inqRes, revRes, setRes] = await Promise.all([
        fetch('/api/admin/schedule-call'),
        fetch('/api/admin/inquiries'),
        fetch('/api/admin/reviews'),
        fetch('/api/admin/settings'),
      ])

      const callsData = await callsRes.json()
      const inqData = await inqRes.json()
      const revData = await revRes.json()
      const setData = await setRes.json()

      if (callsData.success) setCalls(callsData.calls || [])
      if (inqData.success) setInquiries(inqData.inquiries || [])
      if (revData.success) setReviews(revData.reviews || [])
      if (setData.success) setSettings(setData.settings)
    } catch (err) {
      console.error('Data sync failed:', err)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  // Call Actions
  const handleUpdateCallStatus = async (id: string, status: ScheduledCall['status']) => {
    try {
      const res = await fetch('/api/admin/schedule-call', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      const data = await res.json()
      if (data.success) {
        showToast(`Call status updated to ${status}`)
        fetchAllData()
      }
    } catch (err) {
      showToast('Failed to update call status.')
    }
  }

  const handleDeleteCall = async (id: string) => {
    if (!confirm('Are you sure you want to delete this scheduled call entry?')) return
    try {
      const res = await fetch(`/api/admin/schedule-call?id=${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        showToast('Call entry deleted')
        fetchAllData()
      }
    } catch (err) {
      showToast('Failed to delete entry.')
    }
  }

  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to remove this inquiry entry?')) return
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        showToast('Inquiry entry removed')
        fetchAllData()
      }
    } catch (err) {
      showToast('Failed to remove inquiry.')
    }
  }

  // Review Actions
  const handleOpenReviewModal = (review?: ReviewItem) => {
    if (review) {
      setEditingReviewId(review.id)
      setRevAuthor(review.author)
      setRevRole(review.role)
      setRevLocation(review.location)
      setRevProject(review.project)
      setRevQuote(review.quote)
      setRevRating(review.rating)
      setRevPublished(review.published)
    } else {
      setEditingReviewId(null)
      setRevAuthor('')
      setRevRole('Client')
      setRevLocation('Hyderabad')
      setRevProject('Residential Interiors')
      setRevQuote('')
      setRevRating(5)
      setRevPublished(true)
    }
    setShowReviewModal(true)
  }

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingReviewId) {
        // Update
        const res = await fetch('/api/admin/reviews', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingReviewId,
            author: revAuthor,
            role: revRole,
            location: revLocation,
            project: revProject,
            quote: revQuote,
            rating: revRating,
            published: revPublished,
          }),
        })
        const data = await res.json()
        if (data.success) {
          showToast('Review updated successfully')
        }
      } else {
        // Add
        const res = await fetch('/api/admin/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            author: revAuthor,
            role: revRole,
            location: revLocation,
            project: revProject,
            quote: revQuote,
            rating: revRating,
            published: revPublished,
          }),
        })
        const data = await res.json()
        if (data.success) {
          showToast('New review published')
        }
      }
      setShowReviewModal(false)
      fetchAllData()
    } catch (err) {
      showToast('Failed to save review.')
    }
  }

  const handleToggleReviewPublished = async (review: ReviewItem) => {
    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: review.id, published: !review.published }),
      })
      const data = await res.json()
      if (data.success) {
        showToast(review.published ? 'Review hidden' : 'Review published')
        fetchAllData()
      }
    } catch (err) {
      showToast('Failed to update review status.')
    }
  }

  const handleDeleteReview = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return
    try {
      const res = await fetch(`/api/admin/reviews?id=${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        showToast('Review deleted')
        fetchAllData()
      }
    } catch (err) {
      showToast('Failed to delete review.')
    }
  }

  // Settings Actions
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      const data = await res.json()
      if (data.success) {
        showToast('Studio terminal settings updated')
      }
    } catch (err) {
      showToast('Failed to update settings.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="w-8 h-8 text-[#8f6530] animate-spin" />
        <p className="font-mono text-xs uppercase tracking-widest text-[#b89768]">Authenticating Admin Session...</p>
      </div>
    )
  }

  // Filtered Calls
  const filteredCalls = calls.filter((c) => {
    const matchStatus = callStatusFilter === 'All' || c.status === callStatusFilter
    const matchDate = !selectedCalendarDate || c.scheduledDate === selectedCalendarDate
    return matchStatus && matchDate
  })

  return (
    <div className="min-h-screen bg-[#121212] text-[#f4efe6] font-sans selection:bg-[#8f6530] selection:text-white flex flex-col justify-between">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-[110] bg-[#8f6530] text-white px-6 py-3.5 rounded-xs shadow-2xl font-mono text-xs uppercase tracking-widest font-bold border border-[#b89768] flex items-center gap-3"
          >
            <CheckCircle2 className="w-4 h-4" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Top Navigation Header */}
      <header className="sticky top-0 z-50 bg-[#181818] border-b border-[#2a2a2a] px-6 lg:px-12 py-4">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <img src="/images/satwika-logo.png" alt="SAID Logo" className="h-9 w-auto object-contain brightness-200" />
              <span className="font-serif text-xl tracking-[0.2em] uppercase text-white font-normal">
                SAID <i className="font-serif italic text-[#b89768]">ATELIER ADMIN</i>
              </span>
            </Link>
            <span className="hidden sm:inline-block px-3 py-1 bg-[#8f6530]/20 text-[#b89768] border border-[#8f6530] text-[10px] font-mono uppercase tracking-widest font-bold rounded-xs">
              LIVE TERMINAL
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-mono font-bold text-white leading-normal block">satwikaarchitects@gmail.com</span>
              <span className="text-[10px] font-mono text-[#b89768] uppercase tracking-wider block mt-0.5">Lead Administrator</span>
            </div>

            <button
              onClick={handleLogout}
              className="bg-[#262626] hover:bg-red-950/60 border border-[#333] hover:border-red-700 text-white px-4 py-2.5 text-xs font-mono uppercase tracking-widest font-bold rounded-xs transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Dashboard Container */}
      <main className="max-w-[1440px] mx-auto w-full px-6 lg:px-12 py-10 space-y-8 flex-1">
        {/* Metric Cards Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#181818] border border-[#2a2a2a] p-6 rounded-xs space-y-2">
            <div className="flex justify-between items-center text-[#b89768]">
              <span className="font-mono text-xs uppercase tracking-widest font-bold">Scheduled Calls</span>
              <PhoneCall className="w-5 h-5 text-[#8f6530]" />
            </div>
            <p className="font-serif text-4xl text-white font-normal">{calls.length}</p>
            <p className="text-[11px] text-[#888] font-mono">
              {calls.filter(c => c.status === 'Pending').length} Pending Confirmation
            </p>
          </div>

          <div className="bg-[#181818] border border-[#2a2a2a] p-6 rounded-xs space-y-2">
            <div className="flex justify-between items-center text-[#b89768]">
              <span className="font-mono text-xs uppercase tracking-widest font-bold">Web3 &amp; Contact Inquiries</span>
              <MessageSquare className="w-5 h-5 text-[#8f6530]" />
            </div>
            <p className="font-serif text-4xl text-white font-normal">{inquiries.length}</p>
            <p className="text-[11px] text-[#888] font-mono">Form Submissions &amp; GPS Logs</p>
          </div>

          <div className="bg-[#181818] border border-[#2a2a2a] p-6 rounded-xs space-y-2">
            <div className="flex justify-between items-center text-[#b89768]">
              <span className="font-mono text-xs uppercase tracking-widest font-bold">Published Reviews</span>
              <Star className="w-5 h-5 text-[#8f6530]" />
            </div>
            <p className="font-serif text-4xl text-white font-normal">{reviews.filter(r => r.published).length}</p>
            <p className="text-[11px] text-[#888] font-mono">5.0 Star Client Ratings</p>
          </div>

          <div className="bg-[#181818] border border-[#2a2a2a] p-6 rounded-xs space-y-2">
            <div className="flex justify-between items-center text-[#b89768]">
              <span className="font-mono text-xs uppercase tracking-widest font-bold">Terminal Status</span>
              <ShieldCheck className="w-5 h-5 text-[#8f6530]" />
            </div>
            <p className="font-serif text-2xl text-emerald-400 font-normal mt-2">Active &amp; Synced</p>
            <p className="text-[11px] text-[#888] font-mono">Supabase DB Sync Ready</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#2a2a2a] gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveTab('calls')}
            className={`py-3.5 px-6 font-mono text-xs uppercase tracking-widest font-bold border-b-2 transition-all flex items-center gap-2.5 whitespace-nowrap ${
              activeTab === 'calls'
                ? 'border-[#8f6530] text-[#b89768] bg-[#1c1c1c]'
                : 'border-transparent text-[#888] hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" /> Scheduled Calls &amp; Calendar ({calls.length})
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`py-3.5 px-6 font-mono text-xs uppercase tracking-widest font-bold border-b-2 transition-all flex items-center gap-2.5 whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'border-[#8f6530] text-[#b89768] bg-[#1c1c1c]'
                : 'border-transparent text-[#888] hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Web3 &amp; Contact Inquiries ({inquiries.length})
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3.5 px-6 font-mono text-xs uppercase tracking-widest font-bold border-b-2 transition-all flex items-center gap-2.5 whitespace-nowrap ${
              activeTab === 'reviews'
                ? 'border-[#8f6530] text-[#b89768] bg-[#1c1c1c]'
                : 'border-transparent text-[#888] hover:text-white'
            }`}
          >
            <Star className="w-4 h-4" /> Testimonials Manager ({reviews.length})
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3.5 px-6 font-mono text-xs uppercase tracking-widest font-bold border-b-2 transition-all flex items-center gap-2.5 whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-[#8f6530] text-[#b89768] bg-[#1c1c1c]'
                : 'border-transparent text-[#888] hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" /> Terminal &amp; Studio Settings
          </button>
        </div>

        {/* TAB 1: SCHEDULED CALLS & CALENDAR */}
        {activeTab === 'calls' && (
          <div className="space-y-6">
            {/* Filter Controls */}
            <div className="bg-[#181818] border border-[#2a2a2a] p-6 rounded-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <label className="font-mono text-[11px] text-[#888] uppercase tracking-widest block mb-1">Filter By Date</label>
                  <input
                    type="date"
                    value={selectedCalendarDate}
                    onChange={(e) => setSelectedCalendarDate(e.target.value)}
                    className="bg-[#121212] border border-[#333] p-2.5 text-xs text-white font-mono rounded-xs focus:border-[#8f6530] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono text-[11px] text-[#888] uppercase tracking-widest block mb-1">Status Filter</label>
                  <select
                    value={callStatusFilter}
                    onChange={(e) => setCallStatusFilter(e.target.value)}
                    className="bg-[#121212] border border-[#333] p-2.5 text-xs text-white font-mono rounded-xs focus:border-[#8f6530] focus:outline-none"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {selectedCalendarDate && (
                  <button
                    onClick={() => setSelectedCalendarDate('')}
                    className="mt-5 text-xs text-[#8f6530] underline font-mono"
                  >
                    Clear Date Filter
                  </button>
                )}
              </div>

              <button
                onClick={fetchAllData}
                className="bg-[#262626] hover:bg-[#333] text-white px-4 py-2.5 text-xs font-mono uppercase tracking-widest font-bold rounded-xs border border-[#333] flex items-center gap-2 transition-colors"
              >
                <RefreshCw className="w-4 h-4 text-[#8f6530]" /> Refresh Calls
              </button>
            </div>

            {/* Scheduled Calls List */}
            {filteredCalls.length === 0 ? (
              <div className="bg-[#181818] border border-[#2a2a2a] p-12 text-center text-[#888] font-mono text-xs">
                No scheduled calls match the selected filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCalls.map((c) => (
                  <div key={c.id} className="bg-[#181818] border border-[#2a2a2a] hover:border-[#8f6530] transition-all p-6 rounded-xs flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className={`inline-block px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-widest rounded-xs border ${
                            c.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' :
                            c.status === 'Completed' ? 'bg-blue-950 text-blue-400 border-blue-800' :
                            c.status === 'Cancelled' ? 'bg-red-950 text-red-400 border-red-800' :
                            'bg-amber-950 text-amber-400 border-amber-800'
                          }`}>
                            {c.status}
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteCall(c.id)}
                          className="text-[#666] hover:text-red-400 p-1"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div>
                        <h3 className="font-serif text-2xl font-normal text-white">{c.clientName}</h3>
                        <p className="font-mono text-xs text-[#b89768] font-bold mt-0.5">{c.clientPhone}</p>
                        {c.clientEmail && <p className="font-mono text-[11px] text-[#888]">{c.clientEmail}</p>}
                      </div>

                      <div className="bg-[#121212] p-3.5 border border-[#2a2a2a] rounded-xs font-mono text-xs space-y-1.5 text-[#ccc]">
                        <div className="flex items-center gap-2 text-[#b89768] font-bold">
                          <Calendar className="w-3.5 h-3.5" /> Date: {c.scheduledDate}
                        </div>
                        <div className="flex items-center gap-2 text-[#b89768] font-bold">
                          <Clock className="w-3.5 h-3.5" /> Time Slot: {c.scheduledTime}
                        </div>
                        <div><strong className="text-[#888]">Service:</strong> {c.serviceRequired}</div>
                        <div><strong className="text-[#888]">Budget:</strong> {c.estimatedBudget}</div>
                        <div><strong className="text-[#888]">Location:</strong> {c.location}</div>
                        {c.notes && <div className="text-[11px] text-[#aaa] italic pt-1 border-t border-[#222]">"{c.notes}"</div>}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-2 border-t border-[#2a2a2a] flex flex-wrap gap-2 text-[11px] font-mono">
                      {c.status !== 'Confirmed' && (
                        <button
                          onClick={() => handleUpdateCallStatus(c.id, 'Confirmed')}
                          className="bg-emerald-900/40 text-emerald-300 hover:bg-emerald-800/60 border border-emerald-700 px-3 py-1.5 rounded-xs transition-colors"
                        >
                          Confirm
                        </button>
                      )}
                      {c.status !== 'Completed' && (
                        <button
                          onClick={() => handleUpdateCallStatus(c.id, 'Completed')}
                          className="bg-blue-900/40 text-blue-300 hover:bg-blue-800/60 border border-blue-700 px-3 py-1.5 rounded-xs transition-colors"
                        >
                          Complete
                        </button>
                      )}
                      {c.status !== 'Cancelled' && (
                        <button
                          onClick={() => handleUpdateCallStatus(c.id, 'Cancelled')}
                          className="bg-red-900/40 text-red-300 hover:bg-red-800/60 border border-red-700 px-3 py-1.5 rounded-xs transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: WEB3FORMS & CONTACT INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="bg-[#181818] border border-[#2a2a2a] p-6 rounded-xs flex justify-between items-center">
              <div>
                <h2 className="font-serif text-2xl text-white">Client Inquiry Submissions</h2>
                <p className="font-mono text-xs text-[#888]">Contact form messages, Web3Forms payloads, &amp; HTML5 GPS coordinates</p>
              </div>
              <button
                onClick={fetchAllData}
                className="bg-[#262626] hover:bg-[#333] text-white px-4 py-2 text-xs font-mono uppercase tracking-widest font-bold rounded-xs border border-[#333] flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4 text-[#8f6530]" /> Refresh List
              </button>
            </div>

            {inquiries.length === 0 ? (
              <div className="bg-[#181818] border border-[#2a2a2a] p-12 text-center text-[#888] font-mono text-xs">
                No client inquiries recorded yet.
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="bg-[#181818] border border-[#2a2a2a] hover:border-[#8f6530] transition-colors p-6 rounded-xs space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[#2a2a2a] pb-3">
                      <div>
                        <h3 className="font-serif text-2xl font-normal text-white">{inq.name}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#b89768] mt-1">
                          <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#8f6530]" /> {inq.phone}</span>
                          {inq.email && <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[#8f6530]" /> {inq.email}</span>}
                          {inq.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#8f6530]" /> {inq.location}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-[#777]">
                          {new Date(inq.submittedAt).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="bg-red-950/60 border border-red-800/80 text-red-300 hover:bg-red-900 hover:text-white px-3 py-1.5 rounded-xs text-xs font-mono font-bold uppercase transition-colors flex items-center gap-1.5"
                          title="Remove Inquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-[#ccc]">
                      <div><strong className="text-[#888]">Service Required:</strong> {inq.service || 'N/A'}</div>
                      <div><strong className="text-[#888]">Estimated Budget:</strong> {inq.budget || 'N/A'}</div>
                    </div>

                    {inq.coordinates && (
                      <div className="bg-[#121212] p-3 border border-[#2a2a2a] rounded-xs font-mono text-xs flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[#b89768] font-bold">
                          GPS Location: {inq.coordinates}
                        </span>
                        {inq.googleMapsUrl && (
                          <a
                            href={inq.googleMapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-[#8f6530] text-white px-3 py-1 rounded-xs text-[11px] font-bold uppercase tracking-wider hover:bg-[#b89768] transition-colors inline-flex items-center gap-1"
                          >
                            Open Maps <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}

                    {inq.message && (
                      <div className="bg-[#121212] p-4 border border-[#2a2a2a] rounded-xs text-sm text-[#e0e0e0] leading-relaxed italic font-serif">
                        "{inq.message}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CLIENT REVIEWS & TESTIMONIALS MANAGER */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="bg-[#181818] border border-[#2a2a2a] p-6 rounded-xs flex justify-between items-center">
              <div>
                <h2 className="font-serif text-2xl text-white">Client Testimonials &amp; Reviews</h2>
                <p className="font-mono text-xs text-[#888]">Add, edit, or publish reviews on the website testimonials page</p>
              </div>
              <button
                onClick={() => handleOpenReviewModal()}
                className="bg-[#8f6530] hover:bg-[#b89768] text-white px-5 py-3 text-xs font-mono uppercase tracking-widest font-bold rounded-xs transition-colors flex items-center gap-2 shadow-lg"
              >
                <Plus className="w-4 h-4" /> Add New Review
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-[#181818] border border-[#2a2a2a] hover:border-[#8f6530] transition-colors p-6 rounded-xs flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-1 text-[#b89768]">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#b89768]" />
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleReviewPublished(rev)}
                          className={`px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-widest rounded-xs border flex items-center gap-1 ${
                            rev.published
                              ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                              : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                          }`}
                        >
                          {rev.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          {rev.published ? 'Published' : 'Hidden'}
                        </button>
                        <button
                          onClick={() => handleOpenReviewModal(rev)}
                          className="p-1 text-[#aaa] hover:text-white"
                          title="Edit Review"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteReview(rev.id)}
                          className="p-1 text-[#aaa] hover:text-red-400"
                          title="Delete Review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <blockquote className="font-serif text-lg text-white font-normal italic leading-relaxed">
                      "{rev.quote}"
                    </blockquote>

                    <div className="pt-3 border-t border-[#2a2a2a]">
                      <h4 className="font-serif text-xl font-normal text-white">{rev.author}</h4>
                      <p className="font-mono text-xs text-[#b89768] font-bold mt-0.5">{rev.role} · {rev.project}</p>
                      <p className="font-mono text-[11px] text-[#777] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#8f6530]" /> {rev.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: TERMINAL & STUDIO SETTINGS MANAGER */}
        {activeTab === 'settings' && (
          <div className="bg-[#181818] border border-[#2a2a2a] p-8 rounded-xs max-w-3xl space-y-6">
            <div>
              <h2 className="font-serif text-3xl text-white">Studio Terminal &amp; Settings</h2>
              <p className="font-mono text-xs text-[#888]">Update contact details, location coordinates, &amp; pricing ranges</p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-6 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#b89768] font-bold block mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="w-full bg-[#121212] border border-[#333] p-3.5 text-white rounded-xs focus:border-[#8f6530] focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="text-[#b89768] font-bold block mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={settings.contactPhone}
                    onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                    className="w-full bg-[#121212] border border-[#333] p-3.5 text-white rounded-xs focus:border-[#8f6530] focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[#b89768] font-bold block mb-1">Head Office Address</label>
                <input
                  type="text"
                  value={settings.locationAddress}
                  onChange={(e) => setSettings({ ...settings, locationAddress: e.target.value })}
                  className="w-full bg-[#121212] border border-[#333] p-3.5 text-white rounded-xs focus:border-[#8f6530] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#b89768] font-bold block mb-1">Latitude</label>
                  <input
                    type="number"
                    step="any"
                    value={settings.latitude}
                    onChange={(e) => setSettings({ ...settings, latitude: parseFloat(e.target.value) })}
                    className="w-full bg-[#121212] border border-[#333] p-3.5 text-white rounded-xs focus:border-[#8f6530] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#b89768] font-bold block mb-1">Longitude</label>
                  <input
                    type="number"
                    step="any"
                    value={settings.longitude}
                    onChange={(e) => setSettings({ ...settings, longitude: parseFloat(e.target.value) })}
                    className="w-full bg-[#121212] border border-[#333] p-3.5 text-white rounded-xs focus:border-[#8f6530] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#2a2a2a]">
                <h3 className="font-serif text-xl text-white">Pricing &amp; Rate Guidelines</h3>

                <div>
                  <label className="text-[#888] block mb-1">2 BHK Interior Rate Range</label>
                  <input
                    type="text"
                    value={settings.rates2BHK}
                    onChange={(e) => setSettings({ ...settings, rates2BHK: e.target.value })}
                    className="w-full bg-[#121212] border border-[#333] p-3.5 text-white rounded-xs focus:border-[#8f6530] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#888] block mb-1">3 BHK Interior Rate Range</label>
                  <input
                    type="text"
                    value={settings.rates3BHK}
                    onChange={(e) => setSettings({ ...settings, rates3BHK: e.target.value })}
                    className="w-full bg-[#121212] border border-[#333] p-3.5 text-white rounded-xs focus:border-[#8f6530] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#888] block mb-1">4 BHK &amp; Villa Interior Rate Range</label>
                  <input
                    type="text"
                    value={settings.rates4BHKVilla}
                    onChange={(e) => setSettings({ ...settings, rates4BHKVilla: e.target.value })}
                    className="w-full bg-[#121212] border border-[#333] p-3.5 text-white rounded-xs focus:border-[#8f6530] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#8f6530] hover:bg-[#b89768] text-white py-4 px-8 font-mono text-xs uppercase tracking-widest font-bold rounded-xs shadow-lg transition-colors"
              >
                Save &amp; Update Studio Settings
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReviewModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#181818] border border-[#2a2a2a] p-8 rounded-xs shadow-2xl z-10 space-y-6 my-auto text-white font-sans"
            >
              <div className="flex justify-between items-center border-b border-[#2a2a2a] pb-4">
                <h3 className="font-serif text-2xl font-normal text-white">
                  {editingReviewId ? 'Edit Review' : 'Add New Client Review'}
                </h3>
                <button onClick={() => setShowReviewModal(false)} className="text-[#888] hover:text-white">
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSaveReview} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-[#b89768] font-bold block mb-1">Author Name *</label>
                  <input
                    type="text"
                    value={revAuthor}
                    onChange={(e) => setRevAuthor(e.target.value)}
                    placeholder="e.g. Ramesh Goud"
                    className="w-full bg-[#121212] border border-[#333] p-3 text-white rounded-xs focus:border-[#8f6530] focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#888] block mb-1">Client Role</label>
                    <input
                      type="text"
                      value={revRole}
                      onChange={(e) => setRevRole(e.target.value)}
                      placeholder="e.g. Villa Owner"
                      className="w-full bg-[#121212] border border-[#333] p-3 text-white rounded-xs focus:border-[#8f6530] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[#888] block mb-1">Location</label>
                    <input
                      type="text"
                      value={revLocation}
                      onChange={(e) => setRevLocation(e.target.value)}
                      placeholder="e.g. Jubilee Hills, Hyderabad"
                      className="w-full bg-[#121212] border border-[#333] p-3 text-white rounded-xs focus:border-[#8f6530] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#888] block mb-1">Project Name</label>
                  <input
                    type="text"
                    value={revProject}
                    onChange={(e) => setRevProject(e.target.value)}
                    placeholder="e.g. The Courtyard Residence"
                    className="w-full bg-[#121212] border border-[#333] p-3 text-white rounded-xs focus:border-[#8f6530] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[#b89768] font-bold block mb-1">Review Quote *</label>
                  <textarea
                    rows={3}
                    value={revQuote}
                    onChange={(e) => setRevQuote(e.target.value)}
                    placeholder="Write the client's testimonial quote..."
                    className="w-full bg-[#121212] border border-[#333] p-3 text-white rounded-xs focus:border-[#8f6530] focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 items-center">
                  <div>
                    <label className="text-[#888] block mb-1">Star Rating (1 - 5)</label>
                    <select
                      value={revRating}
                      onChange={(e) => setRevRating(Number(e.target.value))}
                      className="w-full bg-[#121212] border border-[#333] p-3 text-white rounded-xs focus:border-[#8f6530] focus:outline-none"
                    >
                      <option value={5}>5 Stars ★★★★★</option>
                      <option value={4}>4 Stars ★★★★</option>
                      <option value={3}>3 Stars ★★★</option>
                    </select>
                  </div>

                  <div className="pt-4">
                    <label className="flex items-center gap-2 cursor-pointer text-white font-bold">
                      <input
                        type="checkbox"
                        checked={revPublished}
                        onChange={(e) => setRevPublished(e.target.checked)}
                        className="w-4 h-4 accent-[#8f6530]"
                      />
                      Publish On Website
                    </label>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="w-1/3 bg-[#262626] text-white py-3 font-mono text-xs uppercase tracking-widest font-bold rounded-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 bg-[#8f6530] hover:bg-[#b89768] text-white py-3 font-mono text-xs uppercase tracking-widest font-bold rounded-xs shadow-lg transition-colors"
                  >
                    Save Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="w-full p-6 text-center text-xs font-mono text-[#666] border-t border-[#2a2a2a]">
        © 2026 SAID Studio Admin Terminal · All Rights Reserved.
      </footer>
    </div>
  )
}
