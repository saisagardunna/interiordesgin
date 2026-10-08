'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Quote } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ThreeDHouseTourViewer from '@/components/ThreeDHouseTourViewer'
import { RevealSection, SharpPhotoFrame, StaggerContainer, StaggerItem } from '@/components/ScrollAnimation'

const heroSlides = [
  {
    id: 1,
    category: 'ARCHITECTURE & INTERIORS',
    title: 'The Ultimate Residential & Architectural Experience in Hyderabad',
    image: '/images/courtyard-residence.png',
    link: '/portfolio',
  },
  {
    id: 2,
    category: 'ARCHITECTURAL RESIDENCE',
    title: 'Mukunda Nilayam — Modern Villa Design & Photorealistic Visualizations',
    image: '/images/mukunda-nilayam/mukunda-1.jpg',
    link: '/projects/mukunda-nilayam',
  },
  {
    id: 3,
    category: 'OUR STORY & DESIGN ETHOS',
    title: 'Curated Luxury Interiors, Art & Bespoke Craftsmanship',
    image: '/images/hero-interior.png',
    link: '/our-story',
  },
  {
    id: 4,
    category: 'COMMERCIAL & LABORATORY FIT-OUTS',
    title: 'Sri BioAesthetics Modern Laboratory & Executive Offices',
    image: '/images/sri-bio/sri-bio-1.jpg',
    link: '/projects/sri-bioaesthetics',
  },
  {
    id: 5,
    category: 'OUR SERVICES & 3D VIEWER',
    title: 'Architectural Fit-Outs, Modular Kitchens & 3D Tours',
    image: '/images/kitchen-detail.png',
    link: '/services',
  },
]

const featuredProjects = [
  { title: 'The Courtyard Residence', category: 'ARCHITECTURE', meta: 'Hyderabad · Residential Villa', image: '/images/courtyard-residence.png', slug: 'the-courtyard-residence' },
  { title: 'The Walnut Office', category: 'COMMERCIAL', meta: 'Hyderabad · Executive Office', image: '/images/walnut/walnut_1.jpg', slug: 'the-walnut-office' },
  { title: 'The Stone Kitchen', category: 'INTERIORS', meta: 'Vizag · Bespoke Kitchen & Dining', image: '/images/kitchen-detail.png', slug: 'the-stone-kitchen' },
]

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

const corporateClientLogosData = [
  { id: 'client-1', name: 'My Home Group', logoUrl: '/images/clients/my-home-group.png' },
  { id: 'client-2', name: 'Sri Sri Holistic Hospitals', logoUrl: '/images/clients/sri-sri-holistic-hospitals.png' },
  { id: 'client-3', name: 'Sri Bio', logoUrl: '/images/clients/sri-bio.png' },
  { id: 'client-4', name: 'Lanco Hills', logoUrl: '/images/clients/lanco-hills.png' },
  { id: 'client-5', name: 'Pragmatic Play', logoUrl: '/images/clients/pragmatic-play.png' },
  { id: 'client-6', name: 'Yashoda Hospitals', logoUrl: '/images/clients/yashoda-hospitals.png' },
]

const luxuryEase = [0.22, 1, 0.36, 1] as const

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)

  return (
    <main className="site-shell bg-[#ffffff] text-[#171717] selection:bg-[#b89768] selection:text-white min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Universal Shared Navbar */}
      <Navbar />

      <div>
        {/* Hero Slider */}
        <section id="top" className="relative w-full h-[75vh] sm:h-[82vh] md:h-[88vh] lg:h-[92vh] min-h-[550px] max-h-[950px] bg-[#121212] overflow-hidden">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />

              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 lg:p-24 max-w-6xl z-10">
                <span className="font-sans text-xs sm:text-sm tracking-[0.3em] uppercase text-[#b89768] font-bold mb-4">
                  {heroSlides[currentSlide].category}
                </span>
                <Link href={heroSlides[currentSlide].link} className="group">
                  <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-white leading-[1.15] tracking-normal group-hover:text-[#b89768] transition-colors">
                    {heroSlides[currentSlide].title}
                  </h1>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white p-3.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm transition-all shadow-xl"
          >
            <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-20 text-white/80 hover:text-white p-3.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm transition-all shadow-xl"
          >
            <ArrowRight className="w-6 h-6 md:w-7 md:h-7" />
          </button>

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

        {/* SECTION 1: ABOUT US & OUR STORY */}
        <section className="py-28 px-6 md:px-16 bg-white border-b border-[#e8e4dc]">
          <div className="max-w-[1440px] mx-auto text-center max-w-4xl">
            <RevealSection>
              <p className="eyebrow flex items-center justify-center gap-2 font-sans text-xs text-[#8f6530] uppercase tracking-[0.25em] mb-6 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#8f6530]" />
                ABOUT US &amp; OUR STORY
              </p>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal leading-[1.1] text-[#171717] mb-8">
                We make space for <br />
                <i className="font-serif italic text-[#8f6530]">better living.</i>
              </h2>
              <p className="text-base md:text-lg leading-relaxed text-[#2d2a25] mb-10 max-w-2xl mx-auto font-normal">
                SAID — Satwika Architecture and Interior Design — is a design and build atelier shaping personal homes, executive workplaces, and quiet residential sanctuaries across South India.
              </p>
              
              {/* Elegant Warm Gold Buttons - NO pitch black hover! */}
              <div className="flex flex-wrap justify-center gap-5">
                <Link
                  href="/our-story"
                  className="bg-[#8f6530] text-white py-4 px-8 font-sans text-xs uppercase tracking-widest font-bold inline-flex items-center gap-2.5 hover:bg-[#724f24] transition-all duration-300 shadow-md rounded-xs border border-[#8f6530]"
                >
                  Read Our Story <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="bg-white border border-[#8f6530] text-[#8f6530] py-4 px-8 font-sans text-xs uppercase tracking-widest font-bold inline-flex items-center gap-2.5 hover:bg-[#8f6530] hover:text-white transition-all duration-300 rounded-xs shadow-sm"
                >
                  About Our Studio <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* SECTION 2: PORTFOLIO SHOWCASE */}
        <section className="py-28 px-6 md:px-16 bg-[#faf8f5] border-b border-[#e8e4dc]">
          <div className="max-w-[1440px] mx-auto">
            <RevealSection className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div>
                <p className="eyebrow font-sans text-xs text-[#8f6530] uppercase tracking-[0.2em] font-bold mb-3">PORTFOLIO ARCHIVE</p>
                <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#171717]">
                  Made for the <i className="font-serif italic text-[#8f6530]">everyday.</i>
                </h2>
              </div>
              <Link href="/portfolio" className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold text-[#8f6530] hover:text-[#724f24] transition-colors">
                View Complete Portfolio <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </RevealSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-10" staggerDelay={0.15}>
              {featuredProjects.map((project, i) => (
                <StaggerItem key={project.title}>
                  <Link href={`/projects/${project.slug}`} className="group block bg-white p-6 border border-[#e8e4dc] hover:border-[#8f6530] transition-all duration-300 hover:shadow-xl rounded-xs">
                    <SharpPhotoFrame
                      number={`0${i + 1}`}
                      badgeText={project.category}
                      className="w-full aspect-[4/3] mb-5"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 760px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      />
                    </SharpPhotoFrame>

                    <div className="pt-4 border-t border-[#e8e4dc] flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-serif text-lg sm:text-xl font-normal text-[#171717] group-hover:text-[#8f6530] transition-colors">{project.title}</h3>
                        <p className="font-sans text-xs uppercase tracking-widest text-[#2d2a25] mt-1.5 font-semibold">{project.meta}</p>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-[#8f6530] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* SECTION 3: OUR SERVICES (Refined High-Contrast Light Styling) */}
        <section className="py-28 px-6 md:px-16 bg-white border-b border-[#e8e4dc]">
          <div className="max-w-[1440px] mx-auto">
            <RevealSection className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div>
                <p className="eyebrow font-sans text-xs text-[#8f6530] uppercase tracking-[0.2em] font-bold mb-3">OUR SERVICES</p>
                <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#171717]">
                  From first sketch to <i className="font-serif italic text-[#8f6530]">final handover.</i>
                </h2>
              </div>
              <Link href="/services" className="font-sans text-xs uppercase tracking-widest font-bold text-[#8f6530] flex items-center gap-1.5 hover:text-[#724f24] transition-colors">
                View All 6 Services <ArrowUpRight className="w-4 h-4" />
              </Link>
            </RevealSection>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-4">
                {[
                  { title: 'Interior Architecture & Spatial Flow', slug: 'interior-architecture' },
                  { title: 'Turnkey Residential Villa Fit-Outs', slug: 'turnkey-interiors' },
                  { title: '3D Photorealistic Visualization & Scenes', slug: '3d-visualization' },
                  { title: 'Bespoke Teak & Veneer Custom Furniture', slug: 'custom-furniture' },
                  { title: 'Modular Kitchens with Blum Hardware', slug: 'modular-kitchens' },
                  { title: 'Commercial Executive Workspaces', slug: 'interior-fit-out' },
                ].map((s, idx) => (
                  <Link
                    key={idx}
                    href={`/services/${s.slug}`}
                    className="p-5 bg-[#faf8f5] border border-[#e8e4dc] hover:border-[#8f6530] hover:bg-white transition-all rounded-xs flex items-center justify-between font-serif text-xl md:text-2xl text-[#171717] group shadow-sm hover:shadow-md block"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-sans text-xs text-[#8f6530] font-bold">0{idx + 1}</span>
                      <span className="group-hover:text-[#8f6530] transition-colors">{s.title}</span>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-[#8f6530] shrink-0" />
                  </Link>
                ))}
              </div>

              <div className="lg:col-span-6 bg-[#faf8f5] p-8 border border-[#e8e4dc] rounded-xs space-y-5 shadow-lg">
                <div className="flex items-center justify-between border-b border-[#e8e4dc] pb-3">
                  <span className="font-sans text-xs text-[#8f6530] uppercase tracking-widest font-bold">
                    INTERACTIVE 3D TOUR DEMO
                  </span>
                  <span className="font-sans text-[11px] text-[#666055]">Drag Mouse to Rotate 360°</span>
                </div>
                
                <ThreeDHouseTourViewer className="w-full" />
                
                <Link
                  href="/services"
                  className="w-full bg-[#8f6530] text-white py-4 text-center font-sans text-xs uppercase tracking-widest font-bold inline-block hover:bg-[#724f24] transition-colors shadow-md rounded-xs"
                >
                  Explore Services Page
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: BLOGS & JOURNAL */}
        <section className="py-24 px-6 md:px-16 bg-[#faf8f5] border-b border-[#e8e4dc]">
          <div className="max-w-[1440px] mx-auto">
            <RevealSection className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
              <div>
                <p className="eyebrow font-sans text-xs text-[#8f6530] uppercase tracking-[0.2em] font-bold mb-3">OUR BLOGS</p>
                <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#171717]">
                  Design Journal &amp; <i className="font-serif italic text-[#8f6530]">Articles.</i>
                </h2>
              </div>
              <Link href="/blogs" className="font-sans text-xs uppercase tracking-widest font-bold text-[#8f6530] flex items-center gap-1 hover:text-[#724f24] transition-colors">
                Read All Articles <ArrowUpRight className="w-4 h-4" />
              </Link>
            </RevealSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white p-8 border border-[#e8e4dc] rounded-xs flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group">
                <div>
                  <span className="font-sans text-xs text-[#8f6530] font-bold uppercase block mb-3">ARCHITECTURE JOURNAL</span>
                  <Link href="/blogs/the-art-of-natural-light-hyderabad-villas">
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#171717] mb-4 group-hover:text-[#8f6530] transition-colors">
                      The Art of Natural Light in Modern Hyderabad Villas
                    </h3>
                  </Link>
                  <p className="text-sm text-[#4e4a43] leading-relaxed mb-8">
                    How courtyard architecture and strategic skylights transform indoor temperature and ambient mood in South Indian luxury residences.
                  </p>
                </div>
                <Link href="/blogs/the-art-of-natural-light-hyderabad-villas" className="font-sans text-xs uppercase tracking-widest font-bold text-[#8f6530] inline-flex items-center gap-1 hover:text-[#171717] transition-colors">
                  Read Full Story <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              <div className="bg-white p-8 border border-[#e8e4dc] rounded-xs flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow group">
                <div>
                  <span className="font-sans text-xs text-[#8f6530] font-bold uppercase block mb-3">MATERIAL GUIDE</span>
                  <Link href="/blogs/sintered-italian-marble-vs-quartz-kitchens">
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#171717] mb-4 group-hover:text-[#8f6530] transition-colors">
                      Choosing Between Sintered Italian Marble &amp; Quartz
                    </h3>
                  </Link>
                  <p className="text-sm text-[#4e4a43] leading-relaxed mb-8">
                    A comprehensive technical comparison of porosity, scratch resistance, heat endurance, and maintenance for high-end kitchens.
                  </p>
                </div>
                <Link href="/blogs/sintered-italian-marble-vs-quartz-kitchens" className="font-sans text-xs uppercase tracking-widest font-bold text-[#8f6530] inline-flex items-center gap-1 hover:text-[#171717] transition-colors">
                  Read Full Story <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: OUR HAPPY PATRONS - HORIZONTAL AUTO-MOVING MARQUEE */}
        <section className="py-24 bg-white border-b border-[#e8e4dc] overflow-hidden">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 mb-12">
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
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex items-center gap-8 group-hover:[animation-play-state:paused]" style={{ animationDuration: '45s' }}>
              {[...happyPatronsData, ...happyPatronsData].map((patron, idx) => (
                <Link
                  key={`${patron.id}-${idx}`}
                  href={patron.link}
                  className="w-[260px] sm:w-[360px] bg-[#faf8f5] hover:bg-white border border-[#e8e4dc] hover:border-[#8f6530] rounded-xs p-4 sm:p-5 shrink-0 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group/patron relative overflow-hidden cursor-pointer"
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

        {/* SECTION 5B: OUR TRUSTED CLIENTS & CORPORATE PATRONS - HORIZONTAL LOGO MARQUEE */}
        <section className="py-20 bg-white border-b border-[#e8e4dc] overflow-hidden select-none">
          <div className="max-w-[1440px] mx-auto px-6 md:px-16 mb-10 text-center">
            <RevealSection>
              <span className="font-sans text-xs text-[#8f6530] uppercase tracking-[0.25em] font-bold block mb-2">
                OUR TRUSTED CLIENTS &amp; CORPORATE PATRONS
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-normal text-[#171717]">
                Architectural Partnerships &amp; <i className="font-serif italic text-[#8f6530]">Institutional Alliances</i>
              </h2>
            </RevealSection>
          </div>

          <div className="relative overflow-hidden py-6 bg-white group">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

            <div
              className="animate-marquee flex items-center gap-8 sm:gap-12 group-hover:[animation-play-state:paused]"
              style={{ animationDuration: '55s' }}
            >
              {[
                ...corporateClientLogosData,
                ...corporateClientLogosData,
                ...corporateClientLogosData,
                ...corporateClientLogosData,
              ].map((client, idx) => (
                <div
                  key={`${client.id}-${idx}`}
                  className="w-[220px] sm:w-[270px] h-[120px] sm:h-[140px] bg-white border border-[#e8e4dc] hover:border-[#8f6530] rounded-xs p-6 shrink-0 flex items-center justify-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group/logo relative cursor-pointer"
                >
                  <img
                    src={client.logoUrl}
                    alt={client.name}
                    className="max-h-[75px] max-w-[200px] w-auto h-auto object-contain transition-all duration-500 group-hover/logo:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 6: TESTIMONIALS */}
        <section className="py-24 px-6 md:px-16 bg-[#faf8f5] border-b border-[#e8e4dc]">
          <div className="max-w-[1440px] mx-auto text-center max-w-4xl">
            <RevealSection>
              <Quote className="w-12 h-12 text-[#8f6530] mx-auto mb-8 opacity-80" />
              <blockquote className="font-serif text-xl sm:text-2xl text-[#171717] font-normal italic leading-snug mb-8">
                “EVERY DETAIL FELT INTENTIONAL AND CRAFTED AROUND THE WAY WE LIVE. SAID TRANSFORMED OUR HOME INTO A PEACEFUL SANCTUARY.”
              </blockquote>
              <p className="font-sans text-xs uppercase tracking-widest text-[#8f6530] font-bold mb-3">
                — K. Satyanarayana &amp; Family · Jubilee Hills Villa Client
              </p>
              <Link href="/testimonials" className="font-sans text-xs uppercase tracking-widest font-bold text-[#8f6530] underline mt-4 inline-block hover:text-[#724f24] transition-colors">
                Read More Client Testimonials
              </Link>
            </RevealSection>
          </div>
        </section>

        {/* SECTION 6: CONTACT US BANNER */}
        <section className="py-28 px-6 md:px-16 bg-[#faf8f5] text-[#171717] border-t border-[#e8e4dc]">
          <div className="max-w-[1440px] mx-auto text-center max-w-3xl">
            <span className="font-sans text-xs text-[#8f6530] uppercase tracking-[0.25em] font-bold block mb-4">
              CONTACT SAID STUDIO
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-normal mb-8 text-[#171717]">
              Ready to start your <i className="font-serif italic text-[#8f6530]">project journey?</i>
            </h2>
            <div className="flex flex-wrap justify-center gap-5">
              <Link
                href="/contact"
                className="bg-[#8f6530] text-white py-4 px-8 font-sans text-xs uppercase tracking-widest font-bold inline-flex items-center gap-2 hover:bg-[#724f24] transition-colors shadow-lg rounded-xs"
              >
                Contact Us Now <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+919908001558"
                className="bg-white border border-[#8f6530] text-[#8f6530] py-4 px-8 font-sans text-xs uppercase tracking-widest font-bold inline-flex items-center gap-2 hover:bg-[#8f6530] hover:text-white transition-colors rounded-xs shadow-sm"
              >
                Call +91 99080 01558
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Shared Footer */}
      <Footer />
    </main>
  )
}
