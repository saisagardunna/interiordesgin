'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowUpRight, MapPin, Quote, Star, Sparkles } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { RevealSection, StaggerContainer, StaggerItem } from '@/components/ScrollAnimation'
import { ReviewItem } from '@/lib/adminStore'

const defaultTestimonials: ReviewItem[] = [
  {
    id: '1',
    quote: 'SAID Studio delivered our specialized commercial laboratory fit-out and office spaces with exceptional speed, architectural precision, and uncompromising craftsmanship.',
    author: 'Sri BioAesthetics Team',
    role: 'Commercial Client',
    location: 'Hyderabad',
    project: 'Sri BioAesthetics Laboratory & Office (sribioaesthetics.com)',
    rating: 5,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    quote: 'Entrusting SAID with 3 residential flat interior works at Sai Vanamali was the best decision. From custom modular kitchens to bespoke wardrobes, the finishing is flawless!',
    author: 'Vijay RV & Homeowners',
    role: 'Flat Interiors Client',
    location: 'Sai Vanamali, Miyapur, Hyderabad',
    project: 'Vijay RV’s Sai Vanamali (3 Flat Interiors)',
    rating: 5,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    quote: 'EVERY DETAIL FELT INTENTIONAL AND CRAFTED AROUND THE WAY WE LIVE. SAID transformed our villa in Jubilee Hills into a peaceful sanctuary filled with natural light.',
    author: 'K. Satyanarayana & Family',
    role: 'Private Residence Client',
    location: 'Jubilee Hills, Hyderabad',
    project: 'The Courtyard Residence',
    rating: 5,
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    quote: 'Working with G. Ramesh Goud and the SAID team was completely seamless. Single-point accountability meant we never had to chase civil contractors or joinery workers. White-glove handover!',
    author: 'Dr. Vikram Reddy',
    role: 'Villa Owner',
    location: 'Financial District, Hyderabad',
    project: 'The Quiet Retreat',
    rating: 5,
    published: true,
    createdAt: new Date().toISOString(),
  },
]

export default function TestimonialsPage() {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(defaultTestimonials)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/admin/reviews')
        const data = await res.json()
        if (data.success && Array.isArray(data.reviews) && data.reviews.length > 0) {
          const publishedOnly = data.reviews.filter((r: ReviewItem) => r.published)
          if (publishedOnly.length > 0) {
            setReviewsList(publishedOnly)
          }
        }
      } catch (err) {
        console.error('Failed to load live testimonials, showing default list.', err)
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [])

  return (
    <main className="testimonials-page min-h-screen w-full bg-[#faf8f5] text-[#171717] selection:bg-[#b89768] selection:text-white flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <div>
        {/* Testimonials Hero */}
        <section className="relative py-24 lg:py-32 px-6 md:px-16 border-b border-[#e8e4dc] bg-[#faf8f5]">
          <div className="max-w-[1440px] mx-auto">
            <RevealSection className="max-w-4xl space-y-6">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[#8f6530] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#8f6530]" /> CLIENT VOICES &amp; REVIEWS
              </span>

              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-[#171717] tracking-tight leading-[0.95] mb-8">
                What Our Clients <br />
                <i className="font-serif italic text-[#8f6530]">Say About Us.</i>
              </h1>

              <p className="text-lg md:text-xl text-[#4e4a43] leading-relaxed font-light max-w-3xl">
                Read authentic testimonials from villa owners, corporate leaders, and homeowners who entrusted SAID with shaping their living and working spaces across Hyderabad and South India.
              </p>
            </RevealSection>
          </div>
        </section>

        {/* Highlight Stats */}
        <section className="py-16 bg-white border-b border-[#e8e4dc] px-6 md:px-16">
          <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <div className="space-y-2">
              <span className="font-serif text-4xl sm:text-5xl font-normal text-[#171717]">100%</span>
              <span className="font-sans text-xs text-[#8f6530] uppercase tracking-widest block font-bold">Client Satisfaction</span>
            </div>
            <div className="space-y-2">
              <span className="font-serif text-4xl sm:text-5xl font-normal text-[#171717]">15+</span>
              <span className="font-sans text-xs text-[#8f6530] uppercase tracking-widest block font-bold">Years of Trust</span>
            </div>
            <div className="space-y-2">
              <span className="font-serif text-4xl sm:text-5xl font-normal text-[#171717]">100+</span>
              <span className="font-sans text-xs text-[#8f6530] uppercase tracking-widest block font-bold">Homes Delivered</span>
            </div>
            <div className="space-y-2">
              <span className="font-serif text-4xl sm:text-5xl font-normal text-[#171717]">5.0 ★</span>
              <span className="font-sans text-xs text-[#8f6530] uppercase tracking-widest block font-bold">Average Rating</span>
            </div>
          </div>
        </section>

        {/* Testimonials List */}
        <section className="py-28 px-6 md:px-16 max-w-[1440px] mx-auto w-full">
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-12" staggerDelay={0.15}>
            {reviewsList.map((item) => (
              <StaggerItem key={item.id}>
                <div className="bg-white border border-[#e8e4dc] hover:border-[#8f6530] transition-all duration-300 hover:shadow-xl rounded-xs p-10 flex flex-col justify-between h-full group">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1.5 text-[#b89768]">
                        {[...Array(item.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#b89768]" />
                        ))}
                      </div>
                      <Quote className="w-8 h-8 text-[#e8e4dc] group-hover:text-[#8f6530] transition-colors" />
                    </div>

                    <blockquote className="font-serif text-xl md:text-2xl text-[#171717] font-normal leading-relaxed">
                      "{item.quote}"
                    </blockquote>
                  </div>

                  <div className="pt-8 mt-8 border-t border-[#e8e4dc] flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl font-normal text-[#171717]">{item.author}</h3>
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
        </section>

        {/* CTA Banner Section - Light Warm Theme */}
        <section className="py-24 px-6 md:px-16 bg-[#faf8f5] text-[#171717] text-center border-t border-[#e8e4dc]">
          <div className="max-w-3xl mx-auto space-y-8">
            <span className="font-sans text-xs text-[#8f6530] uppercase tracking-[0.25em] font-bold block">
              BEGIN YOUR JOURNEY
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#171717]">
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
