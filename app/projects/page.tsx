'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealSection, SharpPhotoFrame } from '@/components/ScrollAnimation'

const projects = [
  { number: '01', title: 'The Courtyard Residence', meta: 'Hyderabad · Residential', category: 'Residential', image: '/images/courtyard-residence.png' },
  { number: '02', title: 'The Walnut Office', meta: 'Bengaluru · Commercial', category: 'Commercial', image: '/images/hero-interior.png' },
  { number: '03', title: 'The Stone Kitchen', meta: 'Vizag · Residential', category: 'Residential', image: '/images/kitchen-detail.png' },
  { number: '04', title: 'The Quiet Retreat', meta: 'Hyderabad · Residential', category: 'Residential', image: '/images/hero-interior.png' },
  { number: '05', title: 'A House in Light', meta: 'Secunderabad · Residential', category: 'Residential', image: '/images/courtyard-residence.png' },
  { number: '06', title: 'The Material Study', meta: 'Hyderabad · Custom interiors', category: 'Custom interiors', image: '/images/kitchen-detail.png' },
]

const categories = ['All', 'Residential', 'Commercial', 'Custom interiors']

const luxuryEase = [0.22, 1, 0.36, 1] as const

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <main className="archive-page min-h-screen w-full bg-[#faf8f5] text-[#171717] selection:bg-[#b89768] selection:text-white overflow-x-hidden">
      {/* Simple Header */}
      <header className="simple-header archive-header border-b border-[#dfd8cb] px-[6vw] md:px-[8vw] py-5 flex justify-between items-center w-full bg-[#faf8f5] relative">
        <Link href="/" className="brand-mark flex items-center" aria-label="Satwika Architecture and Interior Design">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hF6nxSDYqKL9yPKHjxBYzPnCEcrMbw.png"
            alt="Satwika Architecture and Interior Design"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>
        <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <Link href="/" className="flex flex-col items-center group">
            <span className="font-serif text-lg md:text-xl tracking-[0.2em] font-light uppercase text-[#171717]">
              SATWIKA
            </span>
            <span className="font-mono text-[8px] md:text-[10px] tracking-[0.3em] text-[#b89768] uppercase font-bold mt-0.5 whitespace-nowrap">
              INTERIOR &amp; ARCHITECTURE DESIGN
            </span>
          </Link>
        </div>
        <Link href="/" className="text-link group flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#171717]">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back home</span>
        </Link>
      </header>

      {/* Hero / Intro Section - Expansive 2-Column Full-Width Design */}
      <section className="px-[6vw] md:px-[8vw] pt-20 pb-16 w-full border-b border-[#dfd8cb] bg-[#faf8f5]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end w-full">
          {/* Left Column: Eyebrow + Huge Title */}
          <div className="lg:col-span-7">
            <RevealSection delay={0.1}>
              <p className="eyebrow flex items-center gap-2 text-xs tracking-[0.2em] font-mono text-[#8f6530] uppercase mb-4 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#8f6530]" />
                The project archive
              </p>
            </RevealSection>

            <RevealSection delay={0.2} distance={30}>
              <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-normal leading-[0.86] tracking-tight text-[#171717]">
                Spaces made<br />
                <i className="font-serif italic font-normal text-[#171717]">to belong.</i>
              </h1>
            </RevealSection>
          </div>

          {/* Right Column: Description + Filter Bar */}
          <div className="lg:col-span-5 flex flex-col justify-end gap-8">
            <RevealSection delay={0.3}>
              <p className="text-[#3b3730] text-base md:text-lg leading-relaxed border-l-2 border-[#8f6530] pl-5 font-normal">
                Explore a selection of homes, workplaces and details shaped by the SAID studio across Hyderabad and beyond.
              </p>
            </RevealSection>

            {/* Filter Navigation */}
            <RevealSection delay={0.4}>
              <div className="flex flex-col gap-3">
                <span className="text-xs uppercase tracking-widest text-[#171717] font-mono font-bold flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-[#b89768]" /> Filter Projects:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`relative px-4 py-2.5 text-xs uppercase tracking-widest font-mono font-bold rounded-full border transition-all duration-300 ${
                        activeCategory === cat
                          ? 'bg-[#171717] text-[#f4f1ea] border-[#171717] shadow-lg scale-105'
                          : 'text-[#171717] border-[#cbbfae] hover:border-[#171717] bg-white hover:bg-white'
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

      {/* Archive Grid - Full Screen Spanning 2-Column Wide Layout */}
      <section className="px-[6vw] md:px-[8vw] py-24 w-full">
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-24 gap-x-12 lg:gap-x-20 w-full items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
              const contactHref = `/contact?project=${encodeURIComponent(project.title)}`
              const isOffset = index % 2 === 1

              return (
                <motion.article
                  layout
                  initial={{ opacity: 0, y: 45, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: index * 0.08, ease: luxuryEase }}
                  className={`archive-card group flex flex-col w-full ${isOffset ? 'lg:mt-20' : ''}`}
                  key={project.title}
                >
                  {/* Sharp Architectural Photo Frame - Wide Landscape Aspect Ratio Spanning Half Screen */}
                  <Link
                    href={`/projects/${slug}`}
                    aria-label={`View ${project.title} project details`}
                    className="block w-full"
                  >
                    <SharpPhotoFrame
                      number={project.number}
                      badgeText={project.category}
                      className="w-full aspect-[16/10] min-h-[320px] sm:min-h-[400px] md:min-h-[460px] lg:min-h-[520px]"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 760px) 100vw, 50vw"
                        priority={index < 2}
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                      />

                      {/* Glass Overlay & Arrow Icon */}
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-end p-6">
                        <span className="w-12 h-12 bg-white text-[#171717] rounded-full flex items-center justify-center shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <ArrowUpRight className="w-6 h-6" />
                        </span>
                      </div>
                    </SharpPhotoFrame>
                  </Link>

                  {/* Metadata & Actions */}
                  <div className="archive-meta pt-5 mt-5 border-t border-[#dfd8cb] flex justify-between items-start gap-6 w-full">
                    <div>
                      <Link href={`/projects/${slug}`} aria-label={`Read the full ${project.title} project`}>
                        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#171717] group-hover:text-[#8f6530] transition-colors duration-300 leading-tight">
                          {project.title}
                        </h2>
                      </Link>
                      <p className="text-xs text-[#6b6459] uppercase tracking-widest mt-2 font-mono font-semibold">
                        {project.meta}
                      </p>
                    </div>

                    <Link
                      href={contactHref}
                      className="archive-enquire text-xs uppercase tracking-widest font-bold text-[#8f6530] hover:text-[#171717] flex items-center gap-1.5 transition-colors duration-300 whitespace-nowrap pt-2 border-b border-[#8f6530] pb-0.5"
                      aria-label={`Enquire about ${project.title}`}
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

      {/* Bottom CTA */}
      <RevealSection className="archive-cta bg-[#f4efe6] py-28 px-[6vw] md:px-[8vw] border-t border-[#dfd8cb] w-full">
        <div className="max-w-4xl">
          <p className="eyebrow text-[#8f6530] text-xs font-mono uppercase tracking-widest font-bold">Have a project in mind?</p>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[0.92] tracking-tight my-6 text-[#171717]">
            Let&apos;s make<br />
            <i className="font-serif italic text-[#8f6530]">something lasting.</i>
          </h2>
          <Link
            href="/contact"
            className="button button-dark inline-flex items-center gap-4 bg-[#171717] text-[#f4f1ea] px-8 py-5 text-xs tracking-widest uppercase hover:bg-[#b89768] hover:text-white transition-all duration-300 shadow-xl hover:-translate-y-1 font-semibold"
          >
            Begin a conversation <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </RevealSection>
    </main>
  )
}
