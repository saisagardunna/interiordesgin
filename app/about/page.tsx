'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Compass, ShieldCheck, Award } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { RevealSection, SharpPhotoFrame, StaggerContainer, StaggerItem } from '@/components/ScrollAnimation'

export default function AboutPage() {
  return (
    <main className="about-page min-h-screen w-full bg-[#ffffff] text-[#171717] selection:bg-[#b89768] selection:text-white flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <div>
        {/* Hero Header Section */}
        <section className="relative bg-[#faf8f5] py-24 lg:py-32 px-6 md:px-16 border-b border-[#e8e4dc]">
          <div className="max-w-[1440px] mx-auto">
            <RevealSection className="max-w-4xl space-y-6">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[#8f6530] block">
                ABOUT US · SAID STUDIO
              </span>
              
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] tracking-tight leading-[1.1] mb-8">
                We Build <i className="font-serif italic text-[#8f6530]">For People.</i>
              </h1>

              <p className="text-lg md:text-xl text-[#2d2a25] leading-relaxed font-light max-w-3xl">
                Satwika Architecture and Interior Design (SAID) is a premier design &amp; build studio shaping deeply personal residential villas, luxury workspaces, and quiet architectural sanctuaries across Hyderabad, South India, and beyond.
              </p>

              <p className="text-base text-[#2d2a25] leading-relaxed font-normal max-w-3xl border-l-2 border-[#b89768] pl-6 py-2 italic">
                "Our philosophy centers around making space for better living—combining natural light orientation, honest materials, and precise turnkey execution."
              </p>
            </RevealSection>
          </div>
        </section>

        {/* Founder Spotlight Section */}
        <section className="py-28 px-6 md:px-16 bg-white border-b border-[#e8e4dc]">
          <div className="max-w-[1440px] mx-auto">
            <RevealSection className="mb-14">
              <span className="font-sans text-xs text-[#8f6530] uppercase tracking-[0.25em] font-bold block mb-3">
                LEADERSHIP &amp; VISION
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-normal text-[#171717]">
                Meet The <i className="font-serif italic text-[#8f6530]">Founder</i>
              </h2>
            </RevealSection>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <RevealSection className="lg:col-span-5">
                <SharpPhotoFrame badgeText="SAID FOUNDER" className="w-full aspect-[4/5] rounded-xs shadow-xl">
                  <img
                    src="/images/g-ramesh-goud.png"
                    alt="G. Ramesh Goud - Founder, SAID"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </SharpPhotoFrame>
              </RevealSection>

              <RevealSection className="lg:col-span-7 flex flex-col justify-center space-y-6">
                <div className="border-b border-[#e8e4dc] pb-6 mb-2">
                  <h3 className="font-serif text-3xl md:text-4xl font-normal text-[#171717]">
                    G. Ramesh Goud
                  </h3>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-[#8f6530] font-semibold mt-1">
                    Founder &amp; Principal Architect, SAID
                  </p>
                </div>

                <blockquote className="font-serif text-2xl md:text-3xl text-[#171717] italic leading-snug">
                  “Good design is not just about how a space looks, but about how it makes you feel and how effortlessly it becomes a part of your life.”
                </blockquote>

                <div className="space-y-4 text-base text-[#2d2a25] leading-relaxed">
                  <p>
                    SAID grew from bringing two distinct perspectives together: over 25 years of architectural experience and fundamentals, paired with curiosity, contemporary design thinking, and fresh possibilities.
                  </p>
                  <p>
                    From architecture and interiors to turnkey execution and project management, we translate each client's lifestyle into spaces that are personal, purposeful, refined, and built to last.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-[#e8e4dc]">
                  <div>
                    <span className="block font-sans text-2xl md:text-3xl font-bold text-[#171717]">25+</span>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-[#8f6530] font-bold">Years Foundation</span>
                  </div>
                  <div>
                    <span className="block font-sans text-2xl md:text-3xl font-bold text-[#171717]">100+</span>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-[#8f6530] font-bold">Projects Delivered</span>
                  </div>
                  <div>
                    <span className="block font-sans text-2xl md:text-3xl font-bold text-[#171717]">100%</span>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-[#8f6530] font-bold">Single-Point Handover</span>
                  </div>
                </div>
              </RevealSection>
            </div>
          </div>
        </section>

        {/* Core Pillars */}
        <section className="py-28 px-6 md:px-16 bg-[#faf8f5] border-b border-[#e8e4dc]">
          <div className="max-w-[1440px] mx-auto">
            <RevealSection className="text-center max-w-3xl mx-auto mb-20 space-y-3">
              <span className="font-sans text-xs text-[#8f6530] uppercase tracking-[0.25em] font-bold block">
                WHAT DEFINES OUR STUDIO
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#171717]">
                Our Core <i className="font-serif italic text-[#8f6530]">Pillars</i>
              </h2>
            </RevealSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10" staggerDelay={0.15}>
              <StaggerItem className="bg-white p-8 md:p-10 border border-[#e8e4dc] flex flex-col justify-between hover:border-[#8f6530] transition-all duration-300 shadow-sm hover:shadow-xl group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#faf8f5] border border-[#e8e4dc] flex items-center justify-center mb-6 group-hover:bg-[#8f6530] group-hover:text-white transition-colors">
                    <Compass className="w-6 h-6 text-[#8f6530] group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-sans text-xs text-[#8f6530] font-bold tracking-widest block">01 / CAPABILITIES</span>
                  <h3 className="font-serif text-3xl font-normal text-[#171717]">OUR SERVICES</h3>
                  <p className="text-base text-[#2d2a25] leading-relaxed font-normal">
                    Spatial planning, interior fit-outs, 3D visualization, custom furniture, and turnkey execution managed under one roof.
                  </p>
                </div>
                <Link href="/services" className="mt-8 pt-4 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-[#171717] font-bold group-hover:text-[#8f6530] transition-colors">
                  Explore Services <ArrowUpRight className="w-4 h-4" />
                </Link>
              </StaggerItem>

              <StaggerItem className="bg-white p-8 md:p-10 border border-[#e8e4dc] flex flex-col justify-between hover:border-[#8f6530] transition-all duration-300 shadow-sm hover:shadow-xl group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#faf8f5] border border-[#e8e4dc] flex items-center justify-center mb-6 group-hover:bg-[#8f6530] group-hover:text-white transition-colors">
                    <Award className="w-6 h-6 text-[#8f6530] group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-sans text-xs text-[#8f6530] font-bold tracking-widest block">02 / CRAFTSMANSHIP</span>
                  <h3 className="font-serif text-3xl font-normal text-[#171717]">EXPERIENCE</h3>
                  <p className="text-base text-[#2d2a25] leading-relaxed font-normal">
                    Over 15 years of delivering architectural excellence across luxury residential villas, offices, and commercial interiors.
                  </p>
                </div>
                <Link href="/portfolio" className="mt-8 pt-4 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-[#171717] font-bold group-hover:text-[#8f6530] transition-colors">
                  View Portfolio <ArrowUpRight className="w-4 h-4" />
                </Link>
              </StaggerItem>

              <StaggerItem className="bg-white p-8 md:p-10 border border-[#e8e4dc] flex flex-col justify-between hover:border-[#8f6530] transition-all duration-300 shadow-sm hover:shadow-xl group">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#faf8f5] border border-[#e8e4dc] flex items-center justify-center mb-6 group-hover:bg-[#8f6530] group-hover:text-white transition-colors">
                    <ShieldCheck className="w-6 h-6 text-[#8f6530] group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-sans text-xs text-[#8f6530] font-bold tracking-widest block">03 / INTEGRITY</span>
                  <h3 className="font-serif text-3xl font-normal text-[#171717]">ACCOUNTABILITY</h3>
                  <p className="text-base text-[#2d2a25] leading-relaxed font-normal">
                    Single-point ownership, transparent material specifications, strict timeline delivery, and white-glove key handover.
                  </p>
                </div>
                <Link href="/contact" className="mt-8 pt-4 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-[#171717] font-bold group-hover:text-[#8f6530] transition-colors">
                  Start A Conversation <ArrowUpRight className="w-4 h-4" />
                </Link>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
