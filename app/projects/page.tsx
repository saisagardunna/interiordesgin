'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { RevealSection, SharpPhotoFrame } from '@/components/ScrollAnimation'

const projectsList = [
  { number: '01', title: 'Sri BioAesthetics Laboratory & Office', meta: 'Hyderabad · Commercial Fit-Out · 2026', category: 'Commercial', image: '/images/sri-bio/sri-bio-1.jpg', slug: 'sri-bioaesthetics', website: 'https://sribioaesthetics.com/' },
  { number: '02', title: 'Vijay RV’s Sai Vanamali (3 Flat Interiors)', meta: 'Miyapur, Hyderabad · 3 Residential Flats · 2026', category: 'Residential', image: '/images/sai-vanamali/sai-vanamali-1.jpg', slug: 'sai-vanamali-miyapur' },
  { number: '03', title: 'Mukunda Nilayam (3D Renders)', meta: 'Hyderabad · Architectural Residence · 2026', category: 'Residential', image: '/images/mukunda-nilayam/mukunda-1.jpg', slug: 'mukunda-nilayam' },
  { number: '04', title: 'Bespoke Modular Kitchens & Luxury Wardrobes', meta: 'Hyderabad · Modular Joinery & Veneer Fit-Outs · 2026', category: 'Kitchens & Wardrobes', image: '/images/kitchen-wardrobes/kitchen-wardrobe-1.jpg', slug: 'kitchens-and-wardrobes' },
  { number: '05', title: 'Architectural Lighting & Ceiling Fixtures', meta: 'Hyderabad · Lighting & Ceiling Design · 2026', category: 'Lighting', image: '/images/lighting/lighting-1.jpg', slug: 'architectural-lighting' },
  { number: '06', title: 'The Courtyard Residence', meta: 'Jubilee Hills, Hyderabad · Residential Villa · 2026', category: 'Residential', image: '/images/courtyard-residence.png', slug: 'the-courtyard-residence' },
  { number: '07', title: 'The Walnut Office', meta: 'Hyderabad · Executive Commercial · 2026', category: 'Commercial', image: '/images/walnut/walnut_1.jpg', slug: 'the-walnut-office' },
  { number: '08', title: 'The Stone Kitchen', meta: 'Vizag · Custom Kitchen & Dining · 2026', category: 'Residential', image: '/images/kitchen-detail.png', slug: 'the-stone-kitchen' },
]

const categories = ['All', 'Residential', 'Commercial', 'Kitchens & Wardrobes', 'Lighting', 'Custom interiors']
const luxuryEase = [0.22, 1, 0.36, 1] as const

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = activeCategory === 'All'
    ? projectsList
    : projectsList.filter((p) => p.category === activeCategory)

  return (
    <main className="projects-archive-page min-h-screen w-full bg-[#faf8f5] text-[#171717] selection:bg-[#b89768] selection:text-white flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <div>
        {/* Hero Section */}
        <section className="px-6 md:px-16 pt-20 pb-20 border-b border-[#dfd8cb] bg-[#faf8f5] relative overflow-hidden">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7 space-y-4">
              <RevealSection delay={0.1}>
                <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[#8f6530] block">
                  SAID PROJECT ARCHIVE
                </span>
              </RevealSection>

              <RevealSection delay={0.2}>
                <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal leading-[0.9] tracking-tight text-[#171717]">
                  Architectural Works<br />
                  <i className="font-serif italic text-[#8f6530]">&amp; Spatial Design.</i>
                </h1>
              </RevealSection>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-end gap-6">
              <RevealSection delay={0.3}>
                <p className="text-[#3b3730] text-base md:text-lg leading-relaxed border-l-2 border-[#8f6530] pl-5 font-normal">
                  Explore a selection of residential homes, executive offices, and custom interior fit-outs shaped by the SAID studio across Hyderabad and beyond.
                </p>
              </RevealSection>

              {/* Filter Tabs */}
              <RevealSection delay={0.4}>
                <div className="flex flex-col gap-3">
                  <span className="text-xs uppercase tracking-widest text-[#171717] font-sans font-bold flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5 text-[#b89768]" /> Filter Projects:
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`relative px-4 py-2 text-xs uppercase tracking-widest font-sans font-bold rounded-full border transition-all duration-300 ${
                          activeCategory === cat
                            ? 'bg-[#171717] text-white border-[#171717] shadow-md scale-105'
                            : 'text-[#171717] border-[#cbbfae] hover:border-[#171717] bg-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </RevealSection>
            </div>
          </div>
        </section>

        {/* Animated Projects Grid */}
        <section className="px-6 md:px-16 py-24 max-w-[1440px] mx-auto w-full">
          <motion.div
            layout
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 w-full items-start"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const contactHref = `/contact?project=${encodeURIComponent(project.title)}`
                const isOffset = index % 2 === 1

                return (
                  <motion.article
                    layout
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.55, delay: index * 0.08, ease: luxuryEase }}
                    className={`archive-card group flex flex-col w-full bg-white p-6 border border-[#e8e4dc] hover:border-[#8f6530] transition-all duration-500 hover:shadow-2xl rounded-xs ${
                      isOffset ? 'lg:mt-12' : ''
                    }`}
                    key={project.title}
                  >
                    <Link
                      href={`/projects/${project.slug}`}
                      className="block w-full"
                    >
                      <SharpPhotoFrame
                        number={project.number}
                        badgeText={project.category}
                        className="w-full aspect-[16/10] min-h-[300px] sm:min-h-[380px]"
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 760px) 100vw, 50vw"
                          priority={index < 2}
                          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                        />
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-end p-6">
                          <span className="w-12 h-12 bg-white text-[#171717] rounded-full flex items-center justify-center shadow-xl transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                            <ArrowUpRight className="w-6 h-6" />
                          </span>
                        </div>
                      </SharpPhotoFrame>
                    </Link>

                    <div className="archive-meta pt-5 mt-5 border-t border-[#dfd8cb] flex justify-between items-start gap-6 w-full">
                      <div>
                        <Link href={`/projects/${project.slug}`}>
                          <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#171717] group-hover:text-[#8f6530] transition-colors duration-300 leading-snug">
                            {project.title}
                          </h2>
                        </Link>
                        <p className="text-xs text-[#6b6459] uppercase tracking-widest mt-2 font-sans font-semibold">
                          {project.meta}
                        </p>
                      </div>

                      <Link
                        href={contactHref}
                        className="text-xs uppercase tracking-widest font-bold text-[#8f6530] hover:text-[#171717] flex items-center gap-1 transition-colors whitespace-nowrap pt-2 border-b border-[#8f6530] pb-0.5"
                      >
                        Enquire <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </motion.article>
                )
              })}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* CTA */}
        <section className="bg-[#faf8f5] text-[#171717] py-28 px-6 md:px-16 text-center border-t border-[#e8e4dc]">
          <div className="max-w-3xl mx-auto space-y-8">
            <span className="font-sans text-xs text-[#8f6530] uppercase tracking-[0.25em] font-bold block">
              PORTFOLIO INQUIRIES
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal text-[#171717]">
              Have a custom project <i className="font-serif italic text-[#8f6530]">in mind?</i>
            </h2>
            <Link
              href="/contact"
              className="bg-[#8f6530] text-white py-4 px-8 font-sans text-xs uppercase tracking-widest font-bold inline-flex items-center gap-2 hover:bg-[#724f24] transition-colors shadow-lg rounded-xs"
            >
              Begin Consultation <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
