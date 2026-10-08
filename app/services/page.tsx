'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, CheckCircle2, Box } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ThreeDHouseTourViewer from '@/components/ThreeDHouseTourViewer'
import { RevealSection } from '@/components/ScrollAnimation'

const servicesData = [
  {
    no: '01',
    title: 'Interior Architecture',
    slug: 'interior-architecture',
    subtitle: 'Spatial Flow, Structural Concept & Technical Documentation',
    description: 'Comprehensive spatial planning for luxury villas and executive workspaces. We analyze daylight orientation, ventilation flow, structural modifications, and prepare millimeter-precise architectural CAD documentation.',
    deliverables: [
      'Spatial circulation & zoning layout',
      'Reflected ceiling & lighting layout plans',
      'Electrical, plumbing & MEP coordination schematics',
      'Custom wall paneling & structural elevation drawings',
    ],
  },
  {
    no: '02',
    title: 'Interior Fit-Out',
    slug: 'interior-fit-out',
    subtitle: 'Precision Joinery, Civil Execution & Site Management',
    description: 'End-to-end execution of civil work, flooring, POP false ceilings, custom carpentry, and high-gloss Italian polyurethane finishes managed with strict site supervision.',
    deliverables: [
      'Civil modifications & acoustic partition walls',
      'Italian marble laying & epoxy grouting',
      'Bespoke wardrobe & credenza joinery fit-out',
      'On-site quality audit & safety compliance',
    ],
  },
  {
    no: '03',
    title: 'Turnkey Interiors',
    slug: 'turnkey-interiors',
    subtitle: 'Single-Point Accountability from Blueprint to Move-In',
    description: 'Complete hassle-free design & build package where SAID handles procurement, site execution, soft furnishings, ambient lighting, and white-glove final cleaning.',
    deliverables: [
      'Single point contact & transparent timeline tracking',
      'Global material sourcing & vendor coordination',
      'Curated soft furnishings, curtains & art placement',
      'White-glove handover ready for occupation',
    ],
  },
  {
    no: '04',
    title: '3D Visualization',
    slug: '3d-visualization',
    subtitle: 'Photorealistic 3D Renders & Interactive Walkthroughs',
    description: 'Immersive photorealistic renders and interactive 3D virtual walkthroughs allowing you to experience materials, lighting, and textures before execution begins.',
    deliverables: [
      '4K photorealistic interior renders',
      'Interactive 3D real-time scene walkthroughs',
      'Daylight vs night lighting simulation',
      'Tactile material & fabric board previews',
    ],
    has3DViewer: true,
  },
  {
    no: '05',
    title: 'Custom Furniture',
    slug: 'custom-furniture',
    subtitle: 'Handcrafted Bespoke Tables, Sofas & Artisan Joinery',
    description: 'Bespoke furniture crafted specifically for your home dimensions using premium teak wood, imported marble tops, high-resilience foam, and stain-resistant fabrics.',
    deliverables: [
      'Custom dining tables with sintered stone tops',
      'Ergonomic sectional sofas & accent lounge chairs',
      'Bespoke headboards & integrated nightstands',
      'Artisan veneer & liquid metal inlay craft',
    ],
  },
  {
    no: '06',
    title: 'Modular Kitchens',
    slug: 'modular-kitchens',
    subtitle: 'Ergonomic Culinary Design & German Hardware',
    description: 'High-performance culinary spaces featuring moisture-resistant HDMR carcasses, Blum soft-close hardware, quartz countertops, and integrated appliance tall units.',
    deliverables: [
      'Ergonomic golden triangle workflow planning',
      'Blum Servo-Drive & Aventos lift-up mechanisms',
      'Seamless quartz & Neolith stone countertops',
      'Integrated pantry pulls & corner carousel units',
    ],
  },
]

export default function ServicesPage() {
  const [activeServiceIdx, setActiveServiceIdx] = useState(0)

  return (
    <main className="services-page min-h-screen w-full bg-[#faf8f5] text-[#171717] selection:bg-[#b89768] selection:text-white flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <div>
        {/* Services Hero */}
        <section className="relative py-24 lg:py-32 px-6 md:px-16 border-b border-[#e8e4dc] bg-[#faf8f5]">
          <div className="max-w-[1440px] mx-auto">
            <RevealSection className="max-w-4xl space-y-6">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[#8f6530] block">
                OUR SERVICES · DESIGN &amp; BUILD
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] tracking-tight leading-[1.1] mb-8">
                Comprehensive Architectural <br />
                <i className="font-serif italic text-[#8f6530]">&amp; Interior Solutions.</i>
              </h1>

              <p className="text-lg md:text-xl text-[#2d2a25] leading-relaxed font-light max-w-3xl">
                From initial spatial concept and photorealistic 3D modeling to civil fit-out and white-glove turnkey handover—we manage every phase with single-point accountability.
              </p>
            </RevealSection>
          </div>
        </section>

        {/* Interactive Services Showcase */}
        <section className="py-28 px-6 md:px-16 max-w-[1440px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Nav List */}
            <div className="lg:col-span-5 flex flex-col divide-y divide-[#e8e4dc] border-t border-b border-[#e8e4dc]">
              {servicesData.map((item, idx) => (
                <button
                  key={item.slug}
                  onClick={() => setActiveServiceIdx(idx)}
                  className={`py-6 px-5 text-left transition-all duration-300 flex items-center justify-between group ${
                    activeServiceIdx === idx
                      ? 'bg-white border-l-4 border-[#8f6530] shadow-sm text-[#8f6530]'
                      : 'hover:bg-white/50 text-[#171717]'
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <span className="font-sans text-xs font-bold text-[#8f6530]">{item.no}</span>
                    <span className="font-serif text-2xl font-normal group-hover:text-[#8f6530] transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <ArrowUpRight className={`w-5 h-5 transition-transform ${activeServiceIdx === idx ? 'text-[#8f6530] translate-x-1' : 'opacity-40'}`} />
                </button>
              ))}
            </div>

            {/* Right Detailed Card */}
            <div className="lg:col-span-7 bg-white p-8 md:p-12 border border-[#e8e4dc] rounded-xs shadow-xl space-y-6">
              <span className="font-sans text-xs text-[#8f6530] font-bold tracking-widest block">
                SERVICE DETAIL / {servicesData[activeServiceIdx].no}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-normal text-[#171717]">
                {servicesData[activeServiceIdx].title}
              </h2>
              <p className="font-sans text-xs uppercase tracking-widest text-[#8f6530] font-semibold">
                {servicesData[activeServiceIdx].subtitle}
              </p>

              <p className="text-base text-[#2d2a25] leading-relaxed font-normal">
                {servicesData[activeServiceIdx].description}
              </p>

              {/* Interactive 3D Viewer if 3D Visualization active */}
              {servicesData[activeServiceIdx].has3DViewer && (
                <div className="my-6 border border-[#e8e4dc] rounded-xs overflow-hidden">
                  <div className="bg-[#8f6530] text-white p-3.5 font-sans text-xs uppercase tracking-widest flex items-center justify-between font-bold">
                    <span className="flex items-center gap-2">
                      <Box className="w-4 h-4 text-white" /> Interactive 3D Walkthrough Preview
                    </span>
                    <span className="text-white/80 text-[10px]">Real-Time Scene</span>
                  </div>
                  <ThreeDHouseTourViewer className="w-full h-[360px]" />
                </div>
              )}

              {/* Key Deliverables */}
              <div className="border-t border-[#e8e4dc] pt-6">
                <h3 className="font-sans text-xs uppercase tracking-widest font-bold text-[#171717] mb-5">
                  Key Deliverables &amp; Scope:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {servicesData[activeServiceIdx].deliverables.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs font-sans text-[#2d2a25]">
                      <CheckCircle2 className="w-4 h-4 text-[#8f6530] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-6 border-t border-[#e8e4dc]">
                <Link
                  href={`/contact?service=${encodeURIComponent(servicesData[activeServiceIdx].title)}`}
                  className="bg-[#8f6530] text-white py-4 px-8 font-sans text-xs uppercase tracking-widest font-bold inline-flex items-center gap-2.5 hover:bg-[#724f24] transition-colors shadow-md rounded-xs"
                >
                  Enquire About {servicesData[activeServiceIdx].title} <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/portfolio"
                  className="bg-white border border-[#8f6530] text-[#8f6530] py-4 px-8 font-sans text-xs uppercase tracking-widest font-bold inline-flex items-center gap-2.5 hover:bg-[#8f6530] hover:text-white transition-colors rounded-xs shadow-sm"
                >
                  View Related Projects
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Process Banner */}
        <section className="py-28 px-6 md:px-16 bg-[#faf8f5] text-[#171717] border-t border-[#e8e4dc]">
          <div className="max-w-[1440px] mx-auto text-center space-y-8">
            <span className="font-sans text-xs text-[#8f6530] uppercase tracking-[0.25em] font-bold block">
              OUR 5-STEP EXECUTION PROCESS
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal mb-16">
              From first sketch to <i className="font-serif italic text-[#8f6530]">final handover.</i>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-left">
              {[
                { no: '01', title: 'DISCOVER', desc: 'Understanding your lifestyle, architectural preferences, daylight flow & budget.' },
                { no: '02', title: 'DEFINE', desc: 'Spatial zoning, mood boards, material selection & structural feasibility.' },
                { no: '03', title: 'DESIGN', desc: 'Photorealistic 3D renders, working CAD blueprints & custom joinery specs.' },
                { no: '04', title: 'DETAIL', desc: 'Sourcing authentic materials, site civil fit-out & precision carpentry.' },
                { no: '05', title: 'DELIVER', desc: 'Quality audit, deep cleaning, soft furnishing setup & white-glove key handover.' },
              ].map((step) => (
                <div key={step.no} className="bg-white p-8 border border-[#e8e4dc] rounded-xs space-y-3 shadow-sm hover:shadow-md transition-shadow">
                  <span className="font-sans text-xs font-bold text-[#8f6530] block">{step.no}</span>
                  <h3 className="font-serif text-2xl font-normal text-[#171717]">{step.title}</h3>
                  <p className="text-xs text-[#2d2a25] leading-relaxed font-sans">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
