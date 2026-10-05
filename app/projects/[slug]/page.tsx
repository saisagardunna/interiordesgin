import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { RevealSection, ParallaxImage, SharpPhotoFrame } from '@/components/ScrollAnimation'

const projects = {
  'the-courtyard-residence': { number: '01', title: 'The Courtyard Residence', meta: 'Hyderabad · Residential', image: '/images/courtyard-residence.png', intro: 'A calm, light-filled home shaped around the everyday rituals of family life.', details: 'We composed this residence as a sequence of quiet thresholds: shaded courts, warm timber, tactile stone and openings that bring the garden into view.' },
  'the-walnut-office': { number: '02', title: 'The Walnut Office', meta: 'Bengaluru · Commercial', image: '/images/hero-interior.png', intro: 'A considered workplace where focus, hospitality and material warmth meet.', details: 'Rich walnut, soft daylight and carefully proportioned work zones create a workplace that feels both purposeful and welcoming.' },
  'the-stone-kitchen': { number: '03', title: 'The Stone Kitchen', meta: 'Vizag · Residential', image: '/images/kitchen-detail.png', intro: 'A tactile kitchen study in natural stone, timber and precise joinery.', details: 'Every edge and junction was resolved to make daily movement feel effortless, while a restrained palette gives the room a lasting character.' },
  'the-quiet-retreat': { number: '04', title: 'The Quiet Retreat', meta: 'Hyderabad · Residential', image: '/images/hero-interior.png', intro: 'A private retreat designed for slower mornings and softer evenings.', details: 'The interiors balance privacy with openness through layered light, low visual noise and a palette that ages beautifully.' },
  'a-house-in-light': { number: '05', title: 'A House in Light', meta: 'Secunderabad · Residential', image: '/images/courtyard-residence.png', intro: 'A home guided by daylight, proportion and a deep sense of belonging.', details: 'The plan follows the movement of the sun, creating a changing composition of shadow and brightness throughout the day.' },
  'the-material-study': { number: '06', title: 'The Material Study', meta: 'Hyderabad · Custom interiors', image: '/images/kitchen-detail.png', intro: 'A focused exploration of honest materials and crafted detail.', details: 'The project brings together custom furniture, considered lighting and durable finishes in a compact, highly resolved interior.' },
} as const

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }))
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects[slug as keyof typeof projects] ?? projects['the-courtyard-residence']

  return (
    <main className="project-detail-page min-h-screen bg-[#faf8f5] text-[#171717] selection:bg-[#b89768] selection:text-white">
      <header className="simple-header border-b border-[#dfd8cb] bg-[#faf8f5] text-[#171717] px-6 md:px-16 py-5 flex justify-between items-center w-full relative">
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
        <Link href="/projects" className="text-link group inline-flex items-center gap-2 text-[#171717] font-semibold text-xs font-mono uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>All projects</span>
        </Link>
      </header>

      <section className="project-detail-hero grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] min-h-[calc(100vh-88px)] bg-[#faf8f5] text-[#171717]">
        <div className="project-detail-copy p-[8vw] flex flex-col justify-center bg-[#faf8f5] text-[#171717]">
          <RevealSection delay={0.1}>
            <p className="eyebrow text-[#8f6530] flex items-center gap-2 font-mono font-bold text-xs uppercase tracking-[0.2em] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#8f6530]" />
              {project.number} / Project archive
            </p>
          </RevealSection>

          <RevealSection delay={0.2} distance={40}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[0.92] tracking-tight my-6 text-[#171717]">
              {project.title}
            </h1>
          </RevealSection>

          <RevealSection delay={0.3}>
            <p className="project-detail-intro text-lg md:text-xl text-[#3b3730] leading-relaxed max-w-md font-normal">
              {project.intro}
            </p>
            <p className="project-detail-meta text-xs uppercase tracking-widest text-[#8f6530] font-mono mt-8 font-bold">
              {project.meta}
            </p>
          </RevealSection>
        </div>

        <div className="project-detail-image relative min-h-[500px] lg:min-h-[620px] overflow-hidden p-6 lg:p-12 flex items-center justify-center bg-[#f4efe6]">
          <SharpPhotoFrame className="w-full h-full min-h-[460px] lg:min-h-[560px]">
            <ParallaxImage
              src={project.image}
              alt={project.title}
              speed={7}
              className="w-full h-full"
            />
          </SharpPhotoFrame>
        </div>
      </section>

      <section className="project-detail-story grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-[8vw] p-[8vw] bg-[#f4efe6] text-[#171717] border-t border-[#dfd8cb]">
        <RevealSection>
          <p className="eyebrow text-[#8f6530] font-mono font-bold text-xs uppercase tracking-[0.2em]">The approach</p>
        </RevealSection>

        <div>
          <RevealSection delay={0.2}>
            <h2 className="font-serif text-4xl md:text-6xl font-normal leading-[0.95] tracking-tight mb-8 text-[#171717]">
              Designed with<br />
              <i className="font-serif italic text-[#8f6530]">quiet intention.</i>
            </h2>
          </RevealSection>

          <RevealSection delay={0.3}>
            <p className="text-[#3b3730] text-lg md:text-xl leading-relaxed max-w-xl mb-10 font-normal">
              {project.details}
            </p>
            <Link
              href={`/contact?project=${encodeURIComponent(project.title)}`}
              className="button button-dark inline-flex items-center gap-4 bg-[#171717] text-[#f4f1ea] px-8 py-5 text-xs tracking-widest uppercase hover:bg-[#b89768] transition-colors duration-300 shadow-lg group font-bold"
            >
              Discuss this project <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </RevealSection>
        </div>
      </section>
    </main>
  )
}

export const metadata = {
  title: 'Project | SAID studio',
  description: 'Selected architecture and interior project by SAID studio.',
}
