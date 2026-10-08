'use client'

import Link from 'next/link'
import { ArrowUpRight, Compass, Layers, ShieldCheck, Quote, Sparkles, Heart } from 'lucide-react'
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

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] tracking-tight leading-[1.1] mb-8">
                Spaces Made To Be Lived In, <br />
                <i className="font-serif italic text-[#8f6530]">Not Simply Looked At.</i>
              </h1>

              <p className="text-lg md:text-2xl text-[#2d2a25] leading-relaxed font-light max-w-3xl border-l-2 border-[#8f6530] pl-6 py-1">
                SAID — Satwika Architects &amp; Interior Designers — began with a simple belief: good design is not just about how a space looks, but about how it makes you feel and how effortlessly it becomes a part of your life.
              </p>
            </RevealSection>
          </div>
        </section>

        {/* Narrative Section 1: Two Generations, One Vision */}
        <section className="py-28 px-6 md:px-16 bg-white border-b border-[#e8e4dc]">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <RevealSection className="lg:col-span-6">
              <SharpPhotoFrame badgeText="HERITAGE & VISION" className="w-full aspect-[4/3] rounded-xs shadow-lg">
                <img
                  src="/images/courtyard-residence.png"
                  alt="SAID Studio Architectural Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </SharpPhotoFrame>
            </RevealSection>

            <RevealSection className="lg:col-span-6 flex flex-col justify-center space-y-6">
              <span className="font-sans text-xs text-[#8f6530] uppercase tracking-[0.25em] font-bold block">
                CHAPTER I / THE FOUNDATION
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-normal text-[#171717] leading-tight">
                Experience &amp; Fresh Ideas, <br />
                <i className="font-serif italic text-[#8f6530]">Timeless &amp; Contemporary.</i>
              </h2>
              <div className="space-y-5 text-base text-[#2d2a25] leading-relaxed font-normal">
                <p>
                  Architecture has always been close to me. Growing up with my father, who has spent over 25 years in the profession, I was introduced to architecture early on. His experience taught me to appreciate the fundamentals—the importance of proportion, materials, functionality, and most importantly, the process behind bringing an idea to life.
                </p>
                <p>
                  My own journey brought a different perspective—one shaped by curiosity, contemporary design, and a desire to explore new possibilities. SAID grew from bringing these two perspectives together: experience and fresh ideas, timeless principles and contemporary thinking.
                </p>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* Narrative Section 2: People, Purpose & End-to-End Execution */}
        <section className="py-28 px-6 md:px-16 bg-[#faf8f5] border-b border-[#e8e4dc]">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <RevealSection className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-center space-y-6">
              <span className="font-sans text-xs text-[#8f6530] uppercase tracking-[0.25em] font-bold block">
                CHAPTER II / PEOPLE &amp; PURPOSE
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#171717] leading-tight">
                Designed around the <br />
                <i className="font-serif italic text-[#8f6530]">people who inhabit them.</i>
              </h2>
              <div className="space-y-5 text-base text-[#2d2a25] leading-relaxed font-normal">
                <p>
                  We approach every project by first understanding the people behind it—their lifestyle, aspirations, routines, and stories—and then translating them into spaces that feel personal and purposeful.
                </p>
                <p>
                  From architecture and interiors to execution and project management, we believe in being involved from the first thought to the final detail. Our work balances aesthetics with practicality, creating spaces that are refined, comfortable, and built to last.
                </p>
              </div>
            </RevealSection>

            <RevealSection className="lg:col-span-6 order-1 lg:order-2">
              <SharpPhotoFrame badgeText="TURNKEY EXECUTION" className="w-full aspect-[4/3] rounded-xs shadow-lg">
                <img
                  src="/images/hero-interior.png"
                  alt="SAID Studio Bespoke Interior Design"
                  className="w-full h-full object-cover"
                />
              </SharpPhotoFrame>
            </RevealSection>
          </div>
        </section>

        {/* Highlight Banner / Ethos Section */}
        <section className="py-24 px-6 md:px-16 bg-white border-b border-[#e8e4dc]">
          <div className="max-w-[1440px] mx-auto">
            <RevealSection className="text-center max-w-4xl mx-auto space-y-6">
              <span className="font-sans text-xs text-[#8f6530] uppercase tracking-[0.25em] font-bold block">
                CHAPTER III / BEYOND PASSING TRENDS
              </span>
              
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171717]">
                Spaces with Character &amp; <br />
                <i className="font-serif italic text-[#8f6530]">Timeless Appeal.</i>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left pt-6">
                <div className="bg-[#faf8f5] p-8 border border-[#e8e4dc] rounded-xs space-y-3">
                  <span className="font-sans text-xs text-[#8f6530] font-bold uppercase block">01 / CHARACTER OVER HYPE</span>
                  <p className="text-base text-[#2d2a25] leading-relaxed">
                    We don't believe in following trends simply for the sake of them. We believe in creating spaces with character—spaces that feel right today and continue to feel right for years to come.
                  </p>
                </div>

                <div className="bg-[#faf8f5] p-8 border border-[#e8e4dc] rounded-xs space-y-3">
                  <span className="font-sans text-xs text-[#8f6530] font-bold uppercase block">02 / PURPOSEFUL &amp; THOUGHTFUL</span>
                  <p className="text-base text-[#2d2a25] leading-relaxed">
                    We don't believe in designing spaces around passing trends. We design to create spaces that reflect the people who inhabit them—thoughtful in detail, purposeful in function, and timeless in their appeal.
                  </p>
                </div>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* Signature Statement Banner */}
        <section className="py-24 px-6 md:px-16 bg-gradient-to-br from-[#1c1916] via-[#171717] to-[#121212] text-[#f4efe6] border-b border-[#2e2a24] relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8f6530]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <Quote className="w-12 h-12 text-[#b89768] mx-auto opacity-80" />
            <blockquote className="font-serif text-3xl sm:text-5xl font-normal italic text-white leading-snug tracking-wide">
              “We bring together ideas, experience and intention to create spaces that are made to be lived in, not simply looked at.”
            </blockquote>
            <p className="font-sans text-xs uppercase tracking-[0.25em] text-[#b89768] font-bold">
              — SAID Studio · Satwika Architects &amp; Interior Designers
            </p>
          </div>
        </section>

        {/* Three Pillars Overview */}
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
                  <p className="text-base text-[#2d2a25] leading-relaxed">
                    We map proportion, sun orientation, daylight, and airflow so every room feels airy, comfortable, and naturally lit.
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
                  <p className="text-base text-[#2d2a25] leading-relaxed">
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
                  <h3 className="font-serif text-3xl font-normal text-[#171717]">End-to-End Craft</h3>
                  <p className="text-base text-[#2d2a25] leading-relaxed">
                    Involved from the first thought to the final detail—eliminating site friction and delivering refined, seamless spaces.
                  </p>
                </div>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* CTA Banner Section */}
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
