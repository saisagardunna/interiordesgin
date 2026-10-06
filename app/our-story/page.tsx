'use client'

import Link from 'next/link'
import { ArrowUpRight, Compass, Layers, ShieldCheck } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { RevealSection, SharpPhotoFrame, StaggerContainer, StaggerItem } from '@/components/ScrollAnimation'

export default function OurStoryPage() {
  return (
    <main className="our-story-page min-h-screen w-full bg-[#faf8f5] text-[#171717] selection:bg-[#b89768] selection:text-white flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <div>
        {/* Story Hero */}
        <section className="relative py-24 lg:py-32 px-6 md:px-16 border-b border-[#e8e4dc] bg-[#faf8f5]">
          <div className="max-w-[1440px] mx-auto">
            <RevealSection className="max-w-4xl space-y-6">
              <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#8f6530] block">
                OUR STORY · SAID STUDIO
              </span>

              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-[#171717] tracking-tight leading-[0.95] mb-8">
                Crafting Spaces <br />
                <i className="font-serif italic text-[#8f6530]">That Belong To You.</i>
              </h1>

              <p className="text-lg md:text-2xl text-[#4e4a43] leading-relaxed font-light max-w-3xl">
                Satwika Architecture &amp; Interior Design was born out of a single guiding belief: architecture and interior design are not merely about aesthetics—they are about how light, material, and volume orchestrate your everyday living.
              </p>
            </RevealSection>
          </div>
        </section>

        {/* Narrative Section 1: Origins & Vision */}
        <section className="py-28 px-6 md:px-16 bg-white border-b border-[#e8e4dc]">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <RevealSection className="lg:col-span-6">
              <SharpPhotoFrame badgeText="THE ATELIER" className="w-full aspect-[4/3] rounded-xs shadow-lg">
                <img
                  src="/images/courtyard-residence.png"
                  alt="SAID Studio Architectural Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </SharpPhotoFrame>
            </RevealSection>

            <RevealSection className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <span className="font-sans text-xs text-[#8f6530] uppercase tracking-[0.25em] font-bold block">
                CHAPTER I / THE BEGINNING
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#171717]">
                A quiet pursuit of <i className="font-serif italic text-[#8f6530]">spatial harmony.</i>
              </h2>
              <div className="space-y-4 text-base text-[#4e4a43] leading-relaxed font-normal">
                <p>
                  Founded in Hyderabad, SAID began as an architectural response to generic, mass-produced interiors. Our founder, G. Ramesh Goud, envisioned a studio that brings architectural discipline and high-craft interior execution under one unified roof.
                </p>
                <p>
                  From residential courtyard villas in Jubilee Hills to commercial executive sanctuaries across South India, our work is defined by natural light, honest material expression, and white-glove turnkey completion.
                </p>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* Narrative Section 2: Values Timeline */}
        <section className="py-28 px-6 md:px-16 bg-[#faf8f5] border-b border-[#e8e4dc]">
          <div className="max-w-[1440px] mx-auto">
            <RevealSection className="text-center max-w-3xl mx-auto mb-20 space-y-3">
              <span className="font-sans text-xs text-[#8f6530] uppercase tracking-[0.25em] font-bold block">
                HOW WE THINK &amp; CREATE
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#171717]">
                Our Design <i className="font-serif italic text-[#8f6530]">Philosophy</i>
              </h2>
            </RevealSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10" staggerDelay={0.15}>
              <StaggerItem className="bg-white p-8 md:p-10 border border-[#e8e4dc] flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#faf8f5] border border-[#e8e4dc] flex items-center justify-center mb-6">
                    <Compass className="w-6 h-6 text-[#8f6530]" />
                  </div>
                  <span className="font-sans text-xs text-[#8f6530] font-bold tracking-widest block">01 / ARCHITECTURE</span>
                  <h3 className="font-serif text-3xl font-normal text-[#171717]">Spatial Rhythms</h3>
                  <p className="text-base text-[#4e4a43] leading-relaxed">
                    We map sun orientation, air breeze, and room proportions so every square foot feels airy, peaceful, and naturally lit.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem className="bg-white p-8 md:p-10 border border-[#e8e4dc] flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#faf8f5] border border-[#e8e4dc] flex items-center justify-center mb-6">
                    <Layers className="w-6 h-6 text-[#8f6530]" />
                  </div>
                  <span className="font-sans text-xs text-[#8f6530] font-bold tracking-widest block">02 / MATERIALS</span>
                  <h3 className="font-serif text-3xl font-normal text-[#171717]">Tactile Truth</h3>
                  <p className="text-base text-[#4e4a43] leading-relaxed">
                    Italian marbles, solid teak, natural quartz, brushed brass, and textured linens—curated to age gracefully with time.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem className="bg-white p-8 md:p-10 border border-[#e8e4dc] flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#faf8f5] border border-[#e8e4dc] flex items-center justify-center mb-6">
                    <ShieldCheck className="w-6 h-6 text-[#8f6530]" />
                  </div>
                  <span className="font-sans text-xs text-[#8f6530] font-bold tracking-widest block">03 / EXECUTION</span>
                  <h3 className="font-serif text-3xl font-normal text-[#171717]">Calm Delivery</h3>
                  <p className="text-base text-[#4e4a43] leading-relaxed">
                    One accountable point of contact for civil, electrical, plumbing, joinery, and styling—eliminating site friction and delays.
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Banner Section - Light Warm Theme with High Contrast Text */}
        <section className="py-24 px-6 md:px-16 bg-[#faf8f5] text-[#171717] text-center border-t border-[#e8e4dc]">
          <div className="max-w-3xl mx-auto space-y-8">
            <span className="font-sans text-xs text-[#8f6530] uppercase tracking-[0.25em] font-bold block">
              START A CONVERSATION
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#171717]">
              Ready to begin your <i className="font-serif italic text-[#8f6530]">story with us?</i>
            </h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-[#8f6530] text-white py-4 px-8 font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#724f24] transition-colors shadow-lg rounded-xs border border-[#8f6530]"
            >
              Contact Our Studio <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
