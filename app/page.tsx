'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X, MapPin, Camera, Play, Phone, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { RevealSection, ParallaxImage, SharpPhotoFrame, StaggerContainer, StaggerItem } from '@/components/ScrollAnimation'
import ThreeDHouseTourViewer from '@/components/ThreeDHouseTourViewer'

const heroSlides = [
  {
    id: 1,
    category: 'ARCHITECTURE & INTERIORS',
    title: 'The Ultimate Residential & Architectural Experience in Hyderabad',
    image: '/images/courtyard-residence.png',
    link: '/projects/the-courtyard-residence',
  },
  {
    id: 2,
    category: 'DESIGN & LIFESTYLE',
    title: 'Curated Luxury Interiors, Art & Bespoke Craftsmanship',
    image: '/images/hero-interior.png',
    link: '/projects/the-walnut-office',
  },
  {
    id: 3,
    category: 'DECOR & MATERIALS',
    title: 'Tactile Materials, Warm Lighting & Modern Spatial Flow',
    image: '/images/kitchen-detail.png',
    link: '/projects/the-stone-kitchen',
  },
]

const categoryNav = [
  { label: 'DESIGN', href: '/category/design' },
  { label: 'DECOR', href: '/category/decor' },
  { label: 'LIFESTYLE', href: '/category/lifestyle' },
  { label: 'ART', href: '/category/art' },
  { label: 'WELLNESS', href: '/category/wellness' },
  { label: 'ARCHITECTURE', href: '/category/architecture' },
  { label: 'INTERIORS', href: '/category/interiors' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'SERVICES', href: '/#services' },
  { label: 'CONTACT', href: '/contact' },
]

const projects = [
  { title: 'The Courtyard Residence', category: 'ARCHITECTURE', meta: 'Hyderabad · Residential', image: '/images/courtyard-residence.png', slug: 'the-courtyard-residence' },
  { title: 'The Walnut Office', category: 'DESIGN', meta: 'Hyderabad · Commercial', image: '/images/walnut/walnut_1.jpg', slug: 'the-walnut-office' },
  { title: 'The Stone Kitchen', category: 'DECOR', meta: 'Vizag · Residential', image: '/images/kitchen-detail.png', slug: 'the-stone-kitchen' },
]

const servicesList = [
  {
    title: 'Interior Architecture',
    slug: 'interior-architecture',
    desc: 'Spatial planning, interior structural concepts, material rhythm, circulation design and detailed architectural CAD documentation.',
  },
  {
    title: 'Interior Fit-Out',
    slug: 'interior-fit-out',
    desc: 'Civil & MEP coordination, precision joinery, custom finish execution, site management and exacting quality control.',
  },
  {
    title: 'Turnkey Interiors',
    slug: 'turnkey-interiors',
    desc: 'Single-point accountability from initial sketch to procurement, execution, final interior styling and white-glove handover.',
  },
  {
    title: '3D Visualization',
    slug: '3d-visualization',
    desc: 'Photorealistic 3D interior renders, material tactile previews, daylight orientation studies and interactive walkthrough scenes.',
  },
  {
    title: 'Custom Furniture',
    slug: 'custom-furniture',
    desc: 'Handcrafted bespoke furniture, custom wardrobes, entertainment units, shop drawings and master artisan woodworking.',
  },
  {
    title: 'Modular Kitchens',
    slug: 'modular-kitchens',
    desc: 'Ergonomic culinary workflow design, premium quartz countertops, moisture-resistant cabinetry and German soft-close hardware.',
  },
]

const luxuryEase = [0.22, 1, 0.36, 1] as const

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeService, setActiveService] = useState(0)

  // Auto advance slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)

  const closeMenu = () => setMenuOpen(false)

  return (
    <main className="site-shell bg-[#ffffff] text-[#171717] selection:bg-[#b89768] selection:text-white min-h-screen">
      {/* Main Editorial Header */}
      <header className="w-full bg-white border-b border-[#e8e4dc] sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between relative min-h-[76px]">
          {/* Logo Left */}
          <div className="flex items-center">
            <Link href="/" className="brand-mark flex items-center group" aria-label="Satwika Architecture and Interior Design">
              <img
                src="/images/satwika-logo.png"
                alt="Satwika Architecture and Interior Design"
                className="h-12 md:h-14 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Center Text (Distinct Formatted Typography) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto">
            <Link href="/" className="flex flex-col items-center group" aria-label="Satwika Interior and Architecture Design">
              <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-[0.2em] font-light uppercase text-[#171717] transition-colors group-hover:text-[#b89768]">
                SATWIKA
              </span>
              <span className="font-mono text-[8px] sm:text-[10px] tracking-[0.3em] text-[#b89768] uppercase font-normal mt-0.5 whitespace-nowrap">
                INTERIOR &amp; ARCHITECTURE DESIGN
              </span>
            </Link>
          </div>

          {/* Right Action Icons (Search removed, menu icon for mobile) */}
          <div className="flex items-center">
            <button
              className="md:hidden p-2 text-[#171717] hover:text-[#b89768] transition-colors"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Primary Navigation Bar (Connecting to unique dedicated pages) */}
        <nav className="hidden md:flex items-center justify-center border-t border-[#e8e4dc] py-3.5 px-6 font-mono text-xs md:text-[13px] uppercase tracking-[0.15em] font-normal text-[#171717]">
          <div className="flex flex-wrap justify-center items-center gap-5 lg:gap-7">
            {categoryNav.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="hover:text-[#b89768] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      {/* Mobile Nav Menu */}
      {menuOpen && (
        <div className="mobile-menu fixed inset-0 z-50 bg-white text-[#171717] flex flex-col justify-between p-8 md:hidden">
          <div className="flex justify-between items-center border-b border-[#e8e4dc] pb-4">
            <span className="font-mono text-xs tracking-widest text-[#b89768] font-bold">SAID NAVIGATION</span>
            <button onClick={closeMenu} className="p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex flex-col gap-3 my-auto font-serif text-xl">
            {categoryNav.map((item) => (
              <Link key={item.label} href={item.href} onClick={closeMenu} className="border-b border-[#e8e4dc] pb-2 hover:text-[#b89768]">
                {item.label}
              </Link>
            ))}
          </div>
          <Link href="/contact" onClick={closeMenu} className="w-full bg-[#171717] text-white py-4 text-center font-mono text-xs uppercase tracking-widest font-bold">
            Start a project
          </Link>
        </div>
      )}

      {/* Hero Image Slider / Carousel (Full-Fit Edge-to-Edge) */}
      <section id="top" className="relative w-full h-[65vh] sm:h-[75vh] md:h-[82vh] max-h-[850px] bg-[#121212] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: luxuryEase }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={heroSlides[currentSlide].image}
              alt={heroSlides[currentSlide].title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

            {/* Slide Text Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-20 max-w-5xl z-10">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#b89768] font-bold mb-4">
                {heroSlides[currentSlide].category}
              </span>
              <Link href={heroSlides[currentSlide].link} className="group">
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-[1.15] tracking-normal group-hover:text-[#b89768] transition-colors">
                  {heroSlides[currentSlide].title}
                </h1>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Left / Right Arrows */}
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white p-3 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm transition-all shadow-xl"
        >
          <ArrowLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white p-3 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm transition-all shadow-xl"
        >
          <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Slide Pagination Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === i ? 'w-8 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Category Navigation Bar below Hero (Connecting to unique dedicated category pages) */}
      <section className="w-full bg-[#fcfbf9] border-b border-[#e8e4dc] py-5 px-6">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-[#6b6459] font-bold">
            BROWSE ARCHITECTURE &amp; DESIGN CATEGORIES:
          </span>
          <div className="flex flex-wrap items-center gap-3">
            {[
              { label: 'ALL PROJECTS', href: '/projects' },
              { label: 'DESIGN', href: '/category/design' },
              { label: 'DECOR', href: '/category/decor' },
              { label: 'LIFESTYLE', href: '/category/lifestyle' },
              { label: 'ARCHITECTURE', href: '/category/architecture' },
              { label: 'INTERIORS', href: '/category/interiors' },
            ].map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                className="group px-4 py-2 font-mono text-xs tracking-widest uppercase rounded-full bg-white border border-[#dfd8cb] text-[#171717] hover:bg-[#171717] hover:!text-white hover:border-[#171717] hover:scale-[1.04] hover:shadow-md transition-all duration-300 font-normal flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#b89768] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="group-hover:!text-white transition-colors">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Studio Introduction */}
      <section className="intro section-pad bg-white py-28 px-6 md:px-16 lg:px-24" id="studio">
        <div className="max-w-5xl mx-auto text-center">
          <RevealSection delay={0.1}>
            <p className="eyebrow flex items-center justify-center gap-2 font-mono text-xs text-[#8f6530] uppercase tracking-[0.25em] mb-4 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#8f6530]" />
              THE STUDIO
            </p>
          </RevealSection>

          <RevealSection delay={0.25}>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[0.92] text-[#171717] mb-8">
              We make space for <br />
              <i className="font-serif italic text-[#8f6530]">better living.</i>
            </h2>
          </RevealSection>

          <RevealSection delay={0.4} className="max-w-2xl mx-auto text-[#4e4a43]">
            <p className="text-base md:text-lg leading-relaxed font-normal mb-8">
              SAID — Satwika Architecture and Interior Design — is a design and build studio shaping deeply personal homes, workplaces, and quiet residential sanctuaries across India.
            </p>
            <Link className="text-link group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold text-[#171717] border-b border-[#171717] pb-1 hover:text-[#8f6530] transition-colors" href="#process">
              Discover our approach <ArrowUpRight className="w-4 h-4" />
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* Selected Work Section */}
      <section className="work section-pad bg-[#fcfbf9] py-28 px-6 md:px-16 lg:px-24 border-t border-[#e8e4dc]" id="work">
        <RevealSection className="section-intro mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="eyebrow font-mono text-xs text-[#8f6530] uppercase tracking-[0.2em] font-bold mb-2">SELECTED WORK</p>
            <h2 className="font-serif text-5xl md:text-7xl font-normal text-[#171717]">
              Made for the <i className="font-serif italic text-[#8f6530]">everyday.</i>
            </h2>
          </div>
          <Link href="/projects" className="text-link group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-bold text-[#171717]">
            View project archive <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </RevealSection>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12" staggerDelay={0.15}>
          {projects.map((project, i) => (
            <StaggerItem key={project.title}>
              <Link href={`/projects/${project.slug}`} className="group block">
                <SharpPhotoFrame
                  number={`0${i + 1}`}
                  badgeText={project.category}
                  className="w-full aspect-[4/3]"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 760px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-end p-5">
                    <span className="w-10 h-10 bg-white text-[#171717] rounded-full flex items-center justify-center shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                      <ArrowUpRight className="w-5 h-5" />
                    </span>
                  </div>
                </SharpPhotoFrame>

                <div className="project-meta pt-4 mt-3 border-t border-[#e8e4dc] flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-serif text-2xl font-normal text-[#171717] group-hover:text-[#8f6530] transition-colors">{project.title}</h3>
                    <p className="font-mono text-xs uppercase tracking-widest text-[#6b6459] mt-1 font-semibold">{project.meta}</p>
                  </div>
                  <span className="font-mono text-xs text-[#8f6530] font-bold">2026</span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Services Section */}
      <section className="services section-pad bg-[#171717] text-white py-28 px-6 md:px-16 lg:px-24" id="services">
        <div className="max-w-[1440px] mx-auto">
          <RevealSection className="section-intro mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="eyebrow font-mono text-xs text-[#b89768] uppercase tracking-[0.2em] font-bold mb-2">WHAT WE DO</p>
              <h2 className="font-serif text-5xl md:text-7xl font-normal text-white">
                From first sketch to <i className="font-serif italic text-[#b89768]">final handover.</i>
              </h2>
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-white/20 pt-8">
            <div className="lg:col-span-6 flex flex-col divide-y divide-white/20">
              {servicesList.map((serviceItem, i) => (
                <div
                  key={serviceItem.slug}
                  onClick={() => setActiveService(i)}
                  className={`py-6 flex items-center justify-between text-left group transition-all duration-300 cursor-pointer ${
                    activeService === i ? 'pl-4 text-[#b89768]' : 'text-white'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-xs text-[#b89768] font-bold">0{i + 1}</span>
                    <Link
                      href={`/services/${serviceItem.slug}`}
                      className="font-serif text-3xl font-normal group-hover:text-[#b89768] transition-colors hover:underline"
                    >
                      {serviceItem.title}
                    </Link>
                  </div>
                  <Link
                    href={`/services/${serviceItem.slug}`}
                    className="p-2 text-[#b89768] hover:text-white transition-colors"
                    aria-label={`View details for ${serviceItem.title}`}
                  >
                    <ArrowUpRight className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center bg-white/5 p-8 md:p-10 border border-white/10 rounded-xs">
              <span className="font-mono text-xs text-[#b89768] uppercase tracking-widest font-bold mb-3">
                0{activeService + 1} / SERVICE DETAIL
              </span>
              <h3 className="font-serif text-4xl text-white font-normal mb-3">
                {servicesList[activeService]?.title}
              </h3>
              <p className="text-base text-white/80 leading-relaxed font-normal mb-6">
                {servicesList[activeService]?.desc}
              </p>

              {servicesList[activeService]?.slug === '3d-visualization' && (
                <div className="w-full h-[320px] mb-6 rounded-xs overflow-hidden border border-white/10">
                  <ThreeDHouseTourViewer className="w-full h-full min-h-[320px]" />
                </div>
              )}

              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/services/${servicesList[activeService]?.slug}`}
                  className="button bg-[#b89768] text-white py-4 px-7 font-mono text-xs uppercase tracking-widest font-bold inline-flex items-center gap-3 w-fit hover:bg-white hover:text-[#171717] transition-colors"
                >
                  Explore Service Page <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href={`/contact?service=${encodeURIComponent(servicesList[activeService]?.title || '')}`}
                  className="button border border-white/30 text-white py-4 px-7 font-mono text-xs uppercase tracking-widest font-bold inline-flex items-center gap-3 w-fit hover:border-[#b89768] hover:text-[#b89768] transition-colors"
                >
                  Talk to our team <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process section-pad bg-white py-28 px-6 md:px-16 lg:px-24 border-t border-[#e8e4dc]" id="process">
        <div className="max-w-[1440px] mx-auto">
          <RevealSection className="section-intro mb-16">
            <p className="eyebrow font-mono text-xs text-[#8f6530] uppercase tracking-[0.2em] font-bold mb-2">A QUIETER WAY TO BUILD</p>
            <h2 className="font-serif text-5xl md:text-7xl font-normal text-[#171717]">
              Good spaces come from <i className="font-serif italic text-[#8f6530]">good questions.</i>
            </h2>
          </RevealSection>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {[
              ['01', 'Discover', 'A conversation to understand your brief, rhythms and ambitions.'],
              ['02', 'Shape', 'Plans, material stories and visuals that make the direction tangible.'],
              ['03', 'Build', 'One calm, capable team from first line to final detail.'],
            ].map(([no, title, copy]) => (
              <StaggerItem key={no} className="border-t border-[#e8e4dc] pt-6">
                <span className="font-mono text-xs text-[#8f6530] font-bold block mb-4">{no}</span>
                <h3 className="font-serif text-3xl font-normal text-[#171717] mb-3">{title}</h3>
                <p className="text-base text-[#4e4a43] leading-relaxed font-normal">{copy}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer bg-[#171717] text-white py-16 px-6 md:px-16 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/10 pb-12">
          <div className="flex flex-col gap-4">
            <Link href="/#top" className="brand-mark inline-block group" aria-label="SAID home">
              <div className="bg-white p-2.5 rounded-md inline-block transition-transform duration-300 group-hover:scale-105">
                <img
                  src="/images/satwika-logo.png"
                  alt="Satwika Architecture and Interior Design"
                  className="h-12 md:h-14 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-xs text-white/70 max-w-sm leading-relaxed font-normal">
              Satwika Architecture &amp; Interior Design · Crafting personal luxury spaces across Hyderabad, Bengaluru and India.
            </p>
          </div>

          <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-widest text-white/80">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#b89768]" />
              <span>Block 21, F-1, Vignanpuri Colony, Vidya Nagar, Hyderabad - 44</span>
            </div>
            <div className="flex items-center gap-6 mt-2">
              <a href="mailto:arsatwikag@gmail.com" className="hover:text-[#b89768] transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#b89768]" /> arsatwikag@gmail.com
              </a>
              <a href="tel:+919908001558" className="hover:text-[#b89768] transition-colors flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#b89768]" /> +91 99080 01558
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono uppercase tracking-widest text-white/60">
          <span>© 2026 SAID Studio (Satwika Architecture &amp; Interior Design). All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com/saidsays_" target="_blank" rel="noreferrer" className="hover:text-[#b89768] transition-colors">Instagram</a>
            <a href="https://youtube.com/@ArchitectsandInteriorDesigners" target="_blank" rel="noreferrer" className="hover:text-[#b89768] transition-colors">YouTube</a>
            <Link href="/privacy" className="hover:text-[#b89768] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[#b89768] transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
