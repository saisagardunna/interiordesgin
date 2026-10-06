'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, Award, CheckCircle2 } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { RevealSection } from '@/components/ScrollAnimation'

const brandCategories = [
  {
    category: 'Sanitaryware & Bath Fittings',
    description: 'World-renowned German, Italian, and Swiss luxury bathroom fittings and ceramicware.',
    brands: [
      { name: 'KOHLER', origin: 'USA', specialty: 'Luxury Sanitaryware & Smart Toilets', tag: 'Official Partner' },
      { name: 'HANSGROHE', origin: 'Germany', specialty: 'Thermostatic Showers & Designer Faucets', tag: 'Premium Sourcing' },
      { name: 'GROHE', origin: 'Germany', specialty: 'Water Systems & Architectural Fittings', tag: 'Certified Fitment' },
      { name: 'TOTO', origin: 'Japan', specialty: 'Neorest Smart Washlets & Sanitaryware', tag: 'High-End Fitment' },
    ],
  },
  {
    category: 'Hardware & Architectural Joinery',
    description: 'Precision German soft-close mechanisms, concealed hinges, and sliding door systems.',
    brands: [
      { name: 'BLUM', origin: 'Austria', specialty: 'Servodrive & Aventos Cabinet Lift Systems', tag: 'Master Installer' },
      { name: 'HÄFELE', origin: 'Germany', specialty: 'Architectural Hardware & Architectural Fittings', tag: 'Gold Partner' },
      { name: 'HETTICH', origin: 'Germany', specialty: 'InnoTech Drawer Systems & Wardrobe Accessories', tag: 'Certified' },
      { name: 'ARISTO', origin: 'Italy', specialty: 'Slim Aluminum Profile Wardrobes & Glass Partitions', tag: 'Bespoke Fitment' },
    ],
  },
  {
    category: 'Surfaces, Marble & Quartz',
    description: 'High-grade sintered porcelain slabs, engineered quartz, and architectural glass.',
    brands: [
      { name: 'NEXION', origin: 'Italy', specialty: 'Large Format Sintered Marble & Porcelain Slabs', tag: 'Architectural Spec' },
      { name: 'CAESARSTONE', origin: 'Israel', specialty: 'Premium Quartz Countertops & Kitchen Surfaces', tag: 'Preferred Sourcing' },
      { name: 'SAINT-GOBAIN', origin: 'France', specialty: 'Acoustic Glass, Mirrors & Claritop Windows', tag: 'Certified' },
      { name: 'SILESTONE', origin: 'Spain', specialty: 'HybriQ Quartz Countertops & Bath Cladding', tag: 'Specifier' },
    ],
  },
  {
    category: 'Paints, Wall Coatings & Wood Finishes',
    description: 'Eco-friendly low-VOC paints, Italian polyurethane wood stains, and microcement textures.',
    brands: [
      { name: 'ASIAN PAINTS ROYALE', origin: 'India', specialty: 'Royale Aspira & Luxury Emulsion Finishes', tag: 'Master Application' },
      { name: 'ICA ITALIA', origin: 'Italy', specialty: 'High-Gloss PU & Matt Architectural Wood Stains', tag: 'Italian Polish' },
      { name: 'JOTUN', origin: 'Norway', specialty: 'Lady Design Metallic & Textured Wall Finishes', tag: 'Certified' },
      { name: 'NOVCOLOR', origin: 'Italy', specialty: 'Luxury Italian Stucco & Microcement Wall Art', tag: 'Artisan Application' },
    ],
  },
  {
    category: 'Lighting, Controls & HVAC',
    description: 'Architectural magnetic track lighting, home automation, and quiet VRV climate control.',
    brands: [
      { name: 'DAIKIN', origin: 'Japan', specialty: 'VRV IV Centralized Air Conditioning Systems', tag: 'Authorized Fit' },
      { name: 'LUTRON', origin: 'USA', specialty: 'Smart Architectural Lighting Control & Motorized Shades', tag: 'Smart Spec' },
      { name: 'LEGRAND', origin: 'France', specialty: 'Arteor Designer Switches & Home Automation', tag: 'Certified' },
      { name: 'PHILIPS HUE', origin: 'Netherlands', specialty: 'Tunable White & RGB Architectural Ambient Light', tag: 'Integration' },
    ],
  },
]

export default function BrandsPage() {
  return (
    <main className="brands-page min-h-screen w-full bg-[#faf8f5] text-[#171717] selection:bg-[#b89768] selection:text-white flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <div>
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 px-6 md:px-16 border-b border-[#e8e4dc] bg-[#faf8f5]">
          <div className="max-w-[1440px] mx-auto">
            <RevealSection className="max-w-4xl space-y-6">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[#8f6530] block">
                MATERIAL STANDARDS &amp; ALLIANCES
              </span>

              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-[#171717] tracking-tight leading-[0.95] mb-8">
                Brands We <br />
                <i className="font-serif italic text-[#8f6530]">Work With.</i>
              </h1>

              <p className="text-lg md:text-xl text-[#4e4a43] leading-relaxed font-light max-w-3xl">
                Every space crafted by SAID is backed by partnerships with global leaders in architectural hardware, sanitaryware, sintered surfaces, smart automation, and artisan finishes.
              </p>

              <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-[#e8e4dc] text-xs font-sans uppercase tracking-widest text-[#666055]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8f6530]" /> 100% Authentic Warranted Products
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8f6530]" /> Direct Factory Sourcing &amp; Quality Checks
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8f6530]" /> German &amp; Italian Engineering
                </div>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* Brand Grid Categories */}
        <section className="py-28 px-6 md:px-16 max-w-[1440px] mx-auto w-full">
          <div className="space-y-24">
            {brandCategories.map((group, groupIdx) => (
              <RevealSection key={group.category} delay={groupIdx * 0.1}>
                <div className="border-b border-[#e8e4dc] pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="font-sans text-xs text-[#8f6530] uppercase tracking-[0.2em] font-bold block mb-2">
                      0{groupIdx + 1} / CATEGORY
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#171717]">
                      {group.category}
                    </h2>
                  </div>
                  <p className="text-xs font-sans text-[#666055] max-w-md leading-relaxed">
                    {group.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {group.brands.map((brand) => (
                    <div
                      key={brand.name}
                      className="bg-white p-8 border border-[#e8e4dc] hover:border-[#8f6530] transition-all duration-300 hover:shadow-xl rounded-xs flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <span className="font-sans text-[10px] uppercase tracking-widest px-2.5 py-1 bg-[#faf8f5] text-[#8f6530] font-bold border border-[#e8e4dc]">
                            {brand.origin}
                          </span>
                          <span className="font-sans text-[10px] uppercase tracking-widest text-[#666055]">
                            {brand.tag}
                          </span>
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-[#171717] group-hover:text-[#8f6530] transition-colors mb-3">
                          {brand.name}
                        </h3>
                        <p className="text-xs text-[#4e4a43] leading-relaxed font-normal">
                          {brand.specialty}
                        </p>
                      </div>

                      <div className="mt-8 pt-4 border-t border-[#faf8f5] flex items-center justify-between font-sans text-[11px] text-[#8f6530] font-semibold">
                        <span>Certified Fitment</span>
                        <Award className="w-4 h-4 text-[#8f6530]" />
                      </div>
                    </div>
                  ))}
                </div>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* Quality Guarantee Banner */}
        <section className="py-24 px-6 md:px-16 bg-[#faf8f5] text-[#171717] border-t border-[#e8e4dc]">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="font-sans text-xs text-[#8f6530] uppercase tracking-widest font-bold block">
                UNCOMPROMISING QUALITY
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl font-normal leading-tight text-[#171717]">
                We specify only genuine, high-performance materials built to endure for decades.
              </h2>
            </div>
            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href="/contact"
                className="bg-[#8f6530] text-white py-4 px-8 font-sans text-xs uppercase tracking-widest font-bold inline-flex items-center gap-3 hover:bg-[#724f24] transition-colors shadow-lg rounded-xs border border-[#8f6530]"
              >
                Discuss Material Spec <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
