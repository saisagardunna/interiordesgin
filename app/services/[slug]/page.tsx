import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import { RevealSection, ParallaxImage, SharpPhotoFrame } from '@/components/ScrollAnimation'
import ThreeDHouseTourViewer from '@/components/ThreeDHouseTourViewer'

const serviceData = {
  'interior-architecture': {
    number: '01',
    title: 'Interior Architecture',
    intro: 'The quiet structure behind spaces that feel effortless.',
    description: 'We shape the bones of a room before we dress it. From spatial planning and circulation to light, proportion and material rhythm, every decision is made to support the way you live.',
    image: '/images/hero-interior.png',
    points: [
      'Spatial planning & zoning',
      'Lighting and material strategies',
      'Detailed architectural drawings and CAD documentation',
      'Residential and commercial interior architecture',
    ],
  },
  'interior-fit-out': {
    number: '02',
    title: 'Interior Fit-Out',
    intro: 'Craft, coordination and precision from shell to finished space.',
    description: 'Our fit-out team turns considered design into a finished interior. We coordinate every trade, finish and installation with one clear standard of quality.',
    image: '/images/courtyard-residence.png',
    points: [
      'Civil and MEP coordination',
      'Joinery and finish execution',
      'Site supervision and quality control',
      'Handover-ready detailing',
    ],
  },
  'turnkey-interiors': {
    number: '03',
    title: 'Turnkey Interiors',
    intro: 'One accountable team. One beautifully resolved result.',
    description: 'From the first conversation to the final styling, we manage the complete journey. You get a single point of contact and a space that arrives ready to belong to you.',
    image: '/images/kitchen-detail.png',
    points: [
      'Concept to completion management',
      'Transparent project planning and budgeting',
      'Vendor and procurement management',
      'Final styling and white-glove handover',
    ],
  },
  '3d-visualization': {
    number: '04',
    title: '3D Visualization',
    intro: 'See the atmosphere before the first wall is built.',
    description: 'Our visualizations make an idea tangible. Explore the warmth of a finish, the fall of daylight and the balance of a room before construction begins.',
    image: '/images/hero-interior.png',
    points: [
      'Photorealistic 3D interior renders',
      'Material texture and daylight fall studies',
      'Walkthrough-ready 360 scene previews',
      'Interactive spatial layout planning',
    ],
  },
  'custom-furniture': {
    number: '05',
    title: 'Custom Furniture',
    intro: 'Objects made around your rituals, not a catalogue.',
    description: 'We design and make furniture that completes the architecture. Each piece is drawn around its purpose, crafted with honest materials and made to last.',
    image: '/images/kitchen-detail.png',
    points: [
      'Bespoke storage, wardrobes and cabinetry',
      'Material and hardware selection',
      'Shop drawings and master craftsman prototypes',
      'Craft-led precision installation',
    ],
  },
  'modular-kitchens': {
    number: '06',
    title: 'Modular Kitchens',
    intro: 'Precision ergonomics, seamless storage and refined culinary spaces.',
    description: 'Our modular kitchens combine durable engineering with sophisticated aesthetics. Designed for daily rituals, built with moisture-resistant materials and fitted with world-class hardware.',
    image: '/images/courtyard-residence.png',
    points: [
      'Ergonomic culinary workflow planning',
      'Soft-close German hardware & quartz countertops',
      'Custom pantry & appliance integration',
      'Precision site installation & warranty support',
    ],
  },
} as const

export function generateStaticParams() {
  return Object.keys(serviceData).map((slug) => ({ slug }))
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = serviceData[slug as keyof typeof serviceData] ?? serviceData['interior-architecture']

  return (
    <main className="service-page min-h-screen bg-[#f4f1ea] text-[#171717] dark:bg-[#080808] dark:text-[#f4f1ea]">
      <header className="simple-header service-header border-b border-[#dfd8cb] dark:border-[#222] px-6 md:px-16 py-5 flex justify-between items-center w-full relative">
        <Link href="/" className="brand-mark flex items-center" aria-label="Satwika Architecture and Interior Design">
          <img
            src="/images/satwika-logo.png"
            alt="Satwika Architecture and Interior Design"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>
        <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <Link href="/" className="flex flex-col items-center group">
            <span className="font-serif text-lg md:text-xl tracking-[0.2em] font-light uppercase text-inherit">
              SATWIKA
            </span>
            <span className="font-mono text-[8px] md:text-[10px] tracking-[0.3em] text-[#b89768] uppercase font-bold mt-0.5 whitespace-nowrap">
              INTERIOR &amp; ARCHITECTURE DESIGN
            </span>
          </Link>
        </div>
        <Link href="/" className="text-link group flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back home</span>
        </Link>
      </header>

      <section className="service-hero grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] min-h-[720px] pt-[88px]">
        <div className="service-hero-copy p-[8vw] flex flex-col justify-center">
          <RevealSection delay={0.1}>
            <p className="eyebrow text-[#b89768] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b89768]" />
              SAID studio · {service.number}
            </p>
          </RevealSection>

          <RevealSection delay={0.2} distance={40}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[0.86] tracking-tight my-6 max-w-lg">
              {service.title}
            </h1>
          </RevealSection>

          <RevealSection delay={0.3}>
            <p className="service-lede text-base md:text-lg text-[#5f5b54] dark:text-[#aaa] leading-relaxed max-w-xs">
              {service.intro}
            </p>
          </RevealSection>
        </div>

        <div className="service-hero-image relative min-h-[500px] lg:min-h-[620px] overflow-hidden p-6 lg:p-12 flex items-center justify-center">
          {slug === '3d-visualization' ? (
            <ThreeDHouseTourViewer className="w-full h-full min-h-[460px] lg:min-h-[560px]" />
          ) : (
            <SharpPhotoFrame className="w-full h-full min-h-[460px] lg:min-h-[560px]">
              <ParallaxImage
                src={service.image}
                alt={service.title}
                speed={7}
                className="w-full h-full"
              />
            </SharpPhotoFrame>
          )}
        </div>
      </section>

      <section className="service-story grid grid-cols-1 lg:grid-cols-2 gap-[10vw] p-[8vw] bg-[#e4ded4] dark:bg-[#121212] border-t border-[#d5cebf] dark:border-[#222]">
        <RevealSection>
          <p className="eyebrow text-[#b89768]">Our approach</p>
          <h2 className="font-serif text-4xl md:text-6xl font-normal leading-[0.95] tracking-tight mt-4">
            Details that make<br />
            <i className="font-serif italic text-[#b89768]">the difference.</i>
          </h2>
        </RevealSection>

        <div className="service-story-copy">
          <RevealSection delay={0.2}>
            <p className="text-[#5f5b54] dark:text-[#aaa] text-base leading-relaxed mb-8">
              {service.description}
            </p>
          </RevealSection>

          <RevealSection delay={0.3}>
            <div className="service-points grid gap-4 mb-10">
              {service.points.map((point) => (
                <div key={point} className="flex items-center gap-3 border-t border-[#b8aea0] dark:border-[#333] pt-3.5 text-xs font-medium">
                  <Check className="w-4 h-4 text-[#b89768] flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <Link href="/contact" className="button button-dark inline-flex items-center gap-4 bg-[#171717] text-[#f4f1ea] px-7 py-4 text-xs tracking-widest uppercase hover:bg-[#b89768] transition-colors duration-300 shadow-lg group">
              Start a conversation <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </RevealSection>
        </div>
      </section>

      <section className="service-next p-[8vw] bg-[#171717] text-[#f4f1ea] border-t border-[#2a2a2a]">
        <RevealSection>
          <p className="eyebrow text-[#b89768]">Explore the studio</p>
          <div className="flex flex-col sm:flex-row justify-between gap-6 mt-6">
            <Link href="/projects" className="font-serif text-3xl md:text-4xl border-b border-[#555149] pb-3 hover:text-[#b89768] hover:border-[#b89768] transition-colors flex items-center gap-3 group">
              View all projects <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <Link href="/contact" className="font-serif text-3xl md:text-4xl border-b border-[#555149] pb-3 hover:text-[#b89768] hover:border-[#b89768] transition-colors flex items-center gap-3 group">
              Plan your space <ArrowUpRight className="w-6 h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </RevealSection>
      </section>
    </main>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = serviceData[slug as keyof typeof serviceData]
  return { title: service ? `${service.title} | SAID studio` : 'Services | SAID studio', description: service?.intro }
}
