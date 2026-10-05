import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Filter } from 'lucide-react'
import { RevealSection, SharpPhotoFrame, StaggerContainer, StaggerItem } from '@/components/ScrollAnimation'

const categoryData: Record<string, { title: string; subtitle: string; description: string; projects: Array<{ title: string; meta: string; image: string; slug: string }> }> = {
  design: {
    title: 'Design',
    subtitle: 'Interior Architecture & Spatial Design',
    description: 'Explore our architectural design studies, spatial planning, and residential interior compositions crafted across India.',
    projects: [
      { title: 'The Courtyard Residence', meta: 'Hyderabad · Residential', image: '/images/courtyard-residence.png', slug: 'the-courtyard-residence' },
      { title: 'The Walnut Office', meta: 'Bengaluru · Commercial', image: '/images/hero-interior.png', slug: 'the-walnut-office' },
      { title: 'A House in Light', meta: 'Secunderabad · Residential', image: '/images/courtyard-residence.png', slug: 'a-house-in-light' },
    ],
  },
  decor: {
    title: 'Decor',
    subtitle: 'Tactile Materials & Custom Joinery',
    description: 'Curated materials, natural stone, warm timber, and custom joinery details designed for modern luxury living.',
    projects: [
      { title: 'The Stone Kitchen', meta: 'Vizag · Residential', image: '/images/kitchen-detail.png', slug: 'the-stone-kitchen' },
      { title: 'The Material Study', meta: 'Hyderabad · Custom interiors', image: '/images/kitchen-detail.png', slug: 'the-material-study' },
    ],
  },
  lifestyle: {
    title: 'Lifestyle',
    subtitle: 'Spaces Made to Belong',
    description: 'Residential architecture and interiors brought together around daily rhythms, light, and modern living.',
    projects: [
      { title: 'The Quiet Retreat', meta: 'Hyderabad · Residential', image: '/images/hero-interior.png', slug: 'the-quiet-retreat' },
      { title: 'The Courtyard Residence', meta: 'Hyderabad · Residential', image: '/images/courtyard-residence.png', slug: 'the-courtyard-residence' },
    ],
  },
  art: {
    title: 'Art',
    subtitle: 'Craftsmanship & Artistic Detail',
    description: 'Curated artworks, sculptural installations, and bespoke craft embedded into architectural spaces.',
    projects: [
      { title: 'The Material Study', meta: 'Hyderabad · Custom interiors', image: '/images/kitchen-detail.png', slug: 'the-material-study' },
      { title: 'The Walnut Office', meta: 'Bengaluru · Commercial', image: '/images/hero-interior.png', slug: 'the-walnut-office' },
    ],
  },
  wellness: {
    title: 'Wellness',
    subtitle: 'Quiet & Restorative Environments',
    description: 'Harmonious spatial proportions, natural ventilation, and daylight integration designed for personal wellbeing.',
    projects: [
      { title: 'The Quiet Retreat', meta: 'Hyderabad · Residential', image: '/images/hero-interior.png', slug: 'the-quiet-retreat' },
      { title: 'A House in Light', meta: 'Secunderabad · Residential', image: '/images/courtyard-residence.png', slug: 'a-house-in-light' },
    ],
  },
  architecture: {
    title: 'Architecture',
    subtitle: 'Structural Clarity & Form',
    description: 'Full-scale architectural design and build projects incorporating contemporary simplicity and climate responsiveness.',
    projects: [
      { title: 'The Courtyard Residence', meta: 'Hyderabad · Residential', image: '/images/courtyard-residence.png', slug: 'the-courtyard-residence' },
      { title: 'The Walnut Office', meta: 'Bengaluru · Commercial', image: '/images/hero-interior.png', slug: 'the-walnut-office' },
      { title: 'The Stone Kitchen', meta: 'Vizag · Residential', image: '/images/kitchen-detail.png', slug: 'the-stone-kitchen' },
    ],
  },
  interiors: {
    title: 'Interiors',
    subtitle: 'Turnkey Luxury Fit-Outs',
    description: 'Complete interior design and execution for high-end residential homes and boutique commercial workplaces.',
    projects: [
      { title: 'The Stone Kitchen', meta: 'Vizag · Residential', image: '/images/kitchen-detail.png', slug: 'the-stone-kitchen' },
      { title: 'The Quiet Retreat', meta: 'Hyderabad · Residential', image: '/images/hero-interior.png', slug: 'the-quiet-retreat' },
      { title: 'The Material Study', meta: 'Hyderabad · Custom interiors', image: '/images/kitchen-detail.png', slug: 'the-material-study' },
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(categoryData).map((slug) => ({ slug }))
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const catKey = slug.toLowerCase()
  const data = categoryData[catKey] ?? categoryData['design']

  return (
    <main className="category-page min-h-screen bg-[#faf8f5] text-[#171717] selection:bg-[#b89768] selection:text-white">
      {/* Editorial Header */}
      <header className="simple-header border-b border-[#dfd8cb] bg-[#faf8f5] px-6 md:px-16 py-5 flex justify-between items-center w-full relative">
        <Link href="/" className="brand-mark flex items-center" aria-label="Satwika Architecture and Interior Design">
          <img
            src="/images/satwika-logo.png"
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
        <Link href="/projects" className="text-link group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold text-[#171717]">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>All projects</span>
        </Link>
      </header>

      {/* Category Hero Header */}
      <section className="px-6 md:px-16 lg:px-24 pt-20 pb-16 w-full border-b border-[#dfd8cb] bg-white">
        <div className="max-w-5xl">
          <RevealSection delay={0.1}>
            <p className="eyebrow flex items-center gap-2 text-xs tracking-[0.2em] font-mono text-[#8f6530] uppercase mb-4 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#8f6530]" />
              EDITORIAL CATEGORY / {data.title.toUpperCase()}
            </p>
          </RevealSection>

          <RevealSection delay={0.2} distance={30}>
            <h1 className="font-serif text-6xl sm:text-7xl md:text-8xl font-normal leading-[0.9] text-[#171717] mb-6">
              {data.title} <i className="font-serif italic text-[#8f6530]">&amp; Space.</i>
            </h1>
          </RevealSection>

          <RevealSection delay={0.3}>
            <p className="text-[#4e4a43] text-lg md:text-xl leading-relaxed border-l-2 border-[#8f6530] pl-6 font-normal max-w-2xl">
              {data.description}
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Category Projects Grid */}
      <section className="px-6 md:px-16 lg:px-24 py-24 w-full bg-[#faf8f5]">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-12 flex items-center justify-between border-b border-[#dfd8cb] pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-[#8f6530] font-bold">
              {data.projects.length} CURATED PROJECTS IN {data.title.toUpperCase()}
            </span>
            <div className="flex flex-wrap gap-2.5 font-mono text-xs uppercase tracking-widest font-normal">
              {Object.keys(categoryData).map((key) => {
                const isActive = key === catKey
                return (
                  <Link
                    key={key}
                    href={`/category/${key}`}
                    className={`px-3.5 py-1.5 rounded-full border transition-all duration-300 flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#171717] !text-white border-[#171717] shadow-md scale-[1.04] font-semibold'
                        : 'bg-white text-[#333333] border-[#dfd8cb] hover:border-[#b89768] hover:text-[#b89768] hover:scale-[1.02]'
                    }`}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b89768] animate-pulse" />
                    )}
                    <span className={isActive ? '!text-white font-semibold' : ''}>
                      {key.toUpperCase()}
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" staggerDelay={0.12}>
            {data.projects.map((project, idx) => (
              <StaggerItem key={project.title}>
                <Link href={`/projects/${project.slug}`} className="group block">
                  <SharpPhotoFrame number={`0${idx + 1}`} badgeText={data.title} className="w-full aspect-[4/3]">
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

                  <div className="project-meta pt-4 mt-3 border-t border-[#dfd8cb] flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-serif text-2xl font-normal text-[#171717] group-hover:text-[#8f6530] transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-mono text-xs uppercase tracking-widest text-[#6b6459] mt-1 font-semibold">
                        {project.meta}
                      </p>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#f4efe6] py-24 px-6 md:px-16 border-t border-[#dfd8cb] w-full text-center">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-widest text-[#8f6530] font-bold mb-3">HAVE A PROJECT IN MIND?</p>
          <h2 className="font-serif text-4xl md:text-6xl font-normal text-[#171717] mb-8">
            Let&apos;s create something <i className="font-serif italic text-[#8f6530]">lasting.</i>
          </h2>
          <Link
            href={`/contact?category=${encodeURIComponent(data.title)}`}
            className="button bg-[#171717] text-white px-8 py-4 font-mono text-xs uppercase tracking-widest font-bold inline-flex items-center gap-3 hover:bg-[#8f6530] transition-colors"
          >
            Start a project in {data.title} <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
