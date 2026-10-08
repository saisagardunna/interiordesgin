'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowUpRight,
  MapPin,
  Quote,
  Star,
  Sparkles,
  Plus,
  X,
  CheckCircle2,
  Send,
  MessageSquare,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { RevealSection, StaggerContainer, StaggerItem } from '@/components/ScrollAnimation'
import { ReviewItem } from '@/lib/adminStore'

const happyPatronsData = [
  {
    id: 'patron-1',
    name: 'K. Satyanarayana & Family',
    role: 'Private Villa Client',
    project: 'The Courtyard Residence',
    location: 'Jubilee Hills, Hyderabad',
    quote: 'Every detail felt intentional and crafted around the way we live. SAID transformed our home into a peaceful sanctuary.',
    image: '/images/courtyard-residence.png',
    link: '/projects/the-courtyard-residence',
  },
  {
    id: 'patron-2',
    name: 'Vijay RV & Homeowners',
    role: '3 Flat Interiors Client',
    project: 'Sai Vanamali',
    location: 'Miyapur, Hyderabad',
    quote: 'Entrusting SAID with 3 residential flat interior works was our best decision. Modular kitchens to wardrobes are flawless!',
    image: '/images/sai-vanamali/sai-vanamali-1.jpg',
    link: '/projects/sai-vanamali-miyapur',
  },
  {
    id: 'patron-3',
    name: 'Sri BioAesthetics Team',
    role: 'Commercial Client',
    project: 'Sri BioAesthetics Laboratory',
    location: 'Hyderabad',
    quote: 'Delivered our specialized commercial laboratory fit-out & executive offices with exceptional speed & precision.',
    image: '/images/sri-bio/sri-bio-1.jpg',
    link: '/projects/sri-bioaesthetics',
  },
  {
    id: 'patron-4',
    name: 'Dr. Vikram Reddy',
    role: 'Villa Owner',
    project: 'The Quiet Retreat',
    location: 'Financial District, Hyderabad',
    quote: 'Single-point accountability meant we never had to chase contractors or joinery workers. White-glove handover!',
    image: '/images/hero-interior.png',
    link: '/portfolio',
  },
  {
    id: 'patron-5',
    name: 'Mukunda Nilayam Residence',
    role: 'Architectural Residence',
    project: 'Mukunda Nilayam 3D Suite',
    location: 'Hyderabad',
    quote: 'Photorealistic 3D visualization allowed us to experience daylight orientation and timber finishes before site execution.',
    image: '/images/mukunda-nilayam/mukunda-1.jpg',
    link: '/projects/mukunda-nilayam',
  },
  {
    id: 'patron-6',
    name: 'Executive Workplace Client',
    role: 'Commercial Workspace',
    project: 'The Walnut Office',
    location: 'Hyderabad',
    quote: 'Rich natural walnut paneling and daylight create an executive workplace that feels purposeful and welcoming.',
    image: '/images/walnut/walnut_1.jpg',
    link: '/projects/the-walnut-office',
  },
  {
    id: 'patron-7',
    name: 'Modern Culinary Patrons',
    role: 'Kitchen Fit-Out',
    project: 'The Stone Kitchen',
    location: 'Vizag',
    quote: 'A tactile kitchen study in natural stone, timber and precise joinery with Blum soft-close hardware.',
    image: '/images/kitchen-detail.png',
    link: '/services/modular-kitchens',
  },
]

const defaultTestimonials: ReviewItem[] = [
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

export default function TestimonialsPage() {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(defaultTestimonials)
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const [form, setForm] = useState({
    author: '',
    role: 'Private Residence Client',
    location: 'Hyderabad',
    project: '',
    quote: '',
    rating: 5,
  })

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/admin/reviews', { cache: 'no-store' })
        const data = await res.json()
        if (data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
          const publishedOnly = data.reviews.filter((r: ReviewItem) => r.published !== false)
          if (publishedOnly.length > 0) {
            setReviewsList(publishedOnly)
          }
        }
      } catch (err) {
        console.warn('Failed to load live testimonials, showing default list.', err)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.author.trim() || !form.quote.trim()) return

    setSubmitting(true)
    setSuccessMessage('')

    try {
      const res = await fetch('/api/admin/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          published: true,
        }),
      })

      const data = await res.json()
      if (data.success && data.review) {
        setReviewsList((prev) => [data.review, ...prev])
        try {
          const localCustom = JSON.parse(localStorage.getItem('said_custom_reviews') || '[]')
          localStorage.setItem('said_custom_reviews', JSON.stringify([data.review, ...localCustom.filter((c: any) => c.id !== data.review.id)]))
        } catch {}
        setSuccessMessage('Thank you! Your review has been published successfully.')
        setForm({
          author: '',
          role: 'Private Residence Client',
          location: 'Hyderabad',
          project: '',
          quote: '',
          rating: 5,
        })
        setTimeout(() => {
          setModalOpen(false)
          setSuccessMessage('')
        }, 2000)
      } else {
        alert(data.error || 'Failed to submit review.')
      }
    } catch (err) {
      alert('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="testimonials-page min-h-screen w-full bg-[#faf8f5] text-[#171717] selection:bg-[#b89768] selection:text-white flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <div className="pt-16">
        {/* Testimonials Hero */}
        <section className="relative py-20 lg:py-24 px-6 md:px-16 border-b border-[#e8e4dc] bg-[#faf8f5]">
          <div className="max-w-[1440px] mx-auto">
            <RevealSection className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="space-y-4 max-w-3xl">
                <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[#8f6530] block">
                  CLIENT VOICES &amp; REVIEWS
                </span>

                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] tracking-tight leading-[1.1]">
                  What Our Clients <br />
                  <i className="font-serif italic text-[#8f6530]">Say About Us.</i>
                </h1>

                <p className="text-base sm:text-lg text-[#4e4a43] leading-relaxed font-light">
                  Read authentic testimonials from villa owners, corporate leaders, and homeowners who entrusted SAID Studio with shaping their living and working spaces across Hyderabad and South India.
                </p>
              </div>

              {/* Submit A Review Button Positioned on the Right Side */}
              <div className="shrink-0 pt-2 md:pt-0">
                <button
                  onClick={() => setModalOpen(true)}
                  className="px-6 py-3.5 bg-[#8f6530] hover:bg-[#724f24] text-white rounded-xs text-xs font-sans uppercase tracking-widest font-bold inline-flex items-center gap-2.5 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Submit A Review
                </button>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* Highlight Stats */}
        <section className="py-14 bg-white border-b border-[#e8e4dc] px-6 md:px-16">
          <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <span className="font-serif text-3xl sm:text-4xl font-normal text-[#171717]">100%</span>
              <span className="font-sans text-xs text-[#8f6530] uppercase tracking-widest block font-bold">Client Satisfaction</span>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-3xl sm:text-4xl font-normal text-[#171717]">15+</span>
              <span className="font-sans text-xs text-[#8f6530] uppercase tracking-widest block font-bold">Years of Trust</span>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-3xl sm:text-4xl font-normal text-[#171717]">100+</span>
              <span className="font-sans text-xs text-[#8f6530] uppercase tracking-widest block font-bold">Homes Delivered</span>
            </div>
            <div className="space-y-1">
              <span className="font-serif text-3xl sm:text-4xl font-normal text-[#171717]">5.0 ★</span>
              <span className="font-sans text-xs text-[#8f6530] uppercase tracking-widest block font-bold">Average Rating</span>
            </div>
          </div>
        </section>

        {/* OUR HAPPY PATRONS - HORIZONTAL AUTO-MOVING CAROUSEL */}
        <section className="py-20 bg-[#faf8f5] border-b border-[#e8e4dc] overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 mb-10">
            <RevealSection className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="font-sans text-xs text-[#8f6530] uppercase tracking-[0.25em] font-bold block mb-2">
                  OUR HAPPY PATRONS
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#171717]">
                  We Treat Every Client <i className="font-serif italic text-[#8f6530]">Like Family.</i>
                </h2>
              </div>
            </RevealSection>
          </div>

          <div className="relative overflow-hidden py-4 select-none group">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#faf8f5] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#faf8f5] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex items-center gap-8 group-hover:[animation-play-state:paused]" style={{ animationDuration: '45s' }}>
              {[...happyPatronsData, ...happyPatronsData].map((patron, idx) => (
                <Link
                  key={`${patron.id}-${idx}`}
                  href={patron.link}
                  className="w-[260px] sm:w-[360px] bg-white border border-[#e8e4dc] hover:border-[#8f6530] rounded-xs p-4 sm:p-5 shrink-0 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group/patron relative overflow-hidden cursor-pointer"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xs border border-[#e8e4dc] mb-4">
                    <Image
                      src={patron.image}
                      alt={patron.name}
                      fill
                      sizes="360px"
                      className="object-cover transition-transform duration-700 group-hover/patron:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-[#121212]/90 backdrop-blur-md text-white text-[9px] font-mono px-2.5 py-1 rounded-xs uppercase tracking-wider font-bold">
                      {patron.role}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <blockquote className="font-serif text-base sm:text-lg font-normal text-[#171717] group-hover/patron:text-[#8f6530] transition-colors leading-snug">
                      &ldquo;{patron.quote}&rdquo;
                    </blockquote>
                    <div className="pt-3 border-t border-[#e8e4dc] flex items-center justify-between">
                      <div>
                        <h3 className="font-serif text-base font-medium text-[#171717]">{patron.name}</h3>
                        <p className="font-sans text-[11px] text-[#8f6530] font-semibold mt-0.5">{patron.location}</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#8f6530] group-hover/patron:translate-x-0.5 group-hover/patron:-translate-y-0.5 transition-transform shrink-0" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials List */}
        <section className="py-20 px-6 md:px-16 max-w-[1440px] mx-auto w-full">
          {loading ? (
            <div className="text-center py-16 font-sans text-sm text-[#8f6530] animate-pulse">
              Loading verified testimonials...
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-10" staggerDelay={0.1}>
              {reviewsList.map((item) => (
                <StaggerItem key={item.id}>
                  <div className="bg-white border border-[#e8e4dc] hover:border-[#8f6530] transition-all duration-300 hover:shadow-xl rounded-xs p-8 sm:p-10 flex flex-col justify-between h-full group">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5 text-[#b89768]">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-[#b89768]" />
                          ))}
                        </div>
                        <Quote className="w-8 h-8 text-[#e8e4dc] group-hover:text-[#8f6530] transition-colors" />
                      </div>

                      <blockquote className="font-serif text-lg sm:text-xl md:text-2xl text-[#171717] font-normal leading-relaxed">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#e8e4dc] flex items-center justify-between">
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#171717]">{item.author}</h3>
                        <p className="font-sans text-xs text-[#8f6530] font-semibold uppercase tracking-wider mt-1">
                          {item.role} {item.project ? `· ${item.project}` : ''}
                        </p>
                        {item.location && (
                          <p className="font-sans text-[11px] text-[#666055] flex items-center gap-1 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-[#8f6530]" /> {item.location}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </section>

        {/* Submit Review Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div
              className="bg-white text-[#171717] border border-[#e8e4dc] rounded-2xl max-w-lg w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-900 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1">
                <span className="font-sans text-xs uppercase tracking-widest text-[#8f6530] font-bold block">
                  SHARE YOUR FEEDBACK
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#171717]">
                  Submit Your Testimonial
                </h3>
              </div>

              {successMessage ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <span className="text-sm font-sans font-medium">{successMessage}</span>
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-4 font-sans text-xs">
                  <div>
                    <label className="block text-neutral-600 font-bold uppercase mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={form.author}
                      onChange={(e) => setForm({ ...form, author: e.target.value })}
                      placeholder="e.g. K. Satyanarayana"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2.5 text-xs text-neutral-900 focus:border-[#8f6530] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-600 font-bold uppercase mb-1">Client Type / Role</label>
                      <input
                        type="text"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        placeholder="e.g. Private Villa Owner"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2.5 text-xs text-neutral-900 focus:border-[#8f6530] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-neutral-600 font-bold uppercase mb-1">Location</label>
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        placeholder="e.g. Jubilee Hills, Hyderabad"
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2.5 text-xs text-neutral-900 focus:border-[#8f6530] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-600 font-bold uppercase mb-1">Project Name (Optional)</label>
                    <input
                      type="text"
                      value={form.project}
                      onChange={(e) => setForm({ ...form, project: e.target.value })}
                      placeholder="e.g. The Courtyard Residence"
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2.5 text-xs text-neutral-900 focus:border-[#8f6530] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-600 font-bold uppercase mb-1">Rating</label>
                    <div className="flex items-center gap-2 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setForm({ ...form, rating: star })}
                          className="cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= form.rating
                                ? 'fill-[#b89768] text-[#b89768]'
                                : 'text-neutral-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-600 font-bold uppercase mb-1">Your Review / Experience *</label>
                    <textarea
                      required
                      rows={4}
                      value={form.quote}
                      onChange={(e) => setForm({ ...form, quote: e.target.value })}
                      placeholder="Share your experience working with SAID Studio..."
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2.5 text-xs text-neutral-900 focus:border-[#8f6530] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-[#8f6530] hover:bg-[#724f24] text-white rounded-lg font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-md"
                  >
                    {submitting ? 'Submitting...' : 'Post Testimonial'} <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* CTA Banner Section */}
        <section className="py-20 px-6 md:px-16 bg-[#faf8f5] text-[#171717] text-center border-t border-[#e8e4dc]">
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="font-sans text-xs text-[#8f6530] uppercase tracking-[0.25em] font-bold block">
              BEGIN YOUR JOURNEY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#171717]">
              Experience the SAID difference for <i className="font-serif italic text-[#8f6530]">your own home.</i>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#8f6530] text-white py-4 px-8 font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#724f24] transition-colors shadow-lg rounded-xs border border-[#8f6530]"
            >
              Start Your Project Consultation <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
