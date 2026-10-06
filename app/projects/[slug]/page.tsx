import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { RevealSection, ParallaxImage, SharpPhotoFrame } from '@/components/ScrollAnimation'

const projects = {
  'sri-bioaesthetics': {
    number: '01',
    title: 'Sri BioAesthetics Laboratory & Office',
    meta: 'Hyderabad · Commercial Fit-Out & Office',
    image: '/images/sri-bio/sri-bio-1.jpg',
    intro: 'Specialized commercial interior architecture, laboratory fit-out, and executive workplace design for Sri BioAesthetics in Hyderabad.',
    details: 'SAID executed full spatial planning, sterile workflow zoning, custom joinery, specialized ventilation ceilings, and white-glove handover for Sri BioAesthetics (https://sribioaesthetics.com/).',
    website: 'https://sribioaesthetics.com/',
  },
  'sai-vanamali-miyapur': {
    number: '02',
    title: 'Vijay RV’s Sai Vanamali (3 Flat Interiors)',
    meta: 'Miyapur, Hyderabad · 3 Residential Flats',
    image: '/images/sai-vanamali/sai-vanamali-1.jpg',
    intro: 'Turnkey residential interior design and execution for 3 apartments at Vijay RV’s Sai Vanamali, Miyapur.',
    details: 'Complete interior architecture across 3 residential flats—including custom modular kitchens, teak wardrobes, ambient LED lighting design, civil modifications, and turnkey handover.',
  },
  'mukunda-nilayam': {
    number: '03',
    title: 'Mukunda Nilayam (3D Renders)',
    meta: 'Hyderabad · Luxury Architectural Residence',
    image: '/images/mukunda-nilayam/mukunda-1.jpg',
    intro: 'Comprehensive 3D architectural renders and interior spatial visualization for Mukunda Nilayam.',
    details: 'Full 3D visualization suite—exploring daylight orientation, double-height spatial volume, custom slatted timber accents, and luxury finish selections before site construction.',
  },
  'the-courtyard-residence': { number: '04', title: 'The Courtyard Residence', meta: 'Jubilee Hills, Hyderabad · Residential', image: '/images/courtyard/tt-house-psa-architecture_10.jpg', intro: 'A calm, light-filled home shaped around the everyday rituals of family life.', details: 'We composed this residence as a sequence of quiet thresholds: shaded courts, warm timber, tactile stone and openings that bring the garden into view.' },
  'kitchens-and-wardrobes': {
    number: '05',
    title: 'Bespoke Modular Kitchens & Luxury Wardrobes',
    meta: 'Hyderabad · German Hardware, Teak & Veneer Fit-Outs',
    image: '/images/kitchen-wardrobes/kitchen-wardrobe-1.jpg',
    intro: 'Custom luxury modular kitchens, acrylic & quartz island counters, walk-in closets, and fluted glass wardrobes executed in Hyderabad.',
    details: 'Crafted joinery solutions combining moisture-resistant HDMR carcasses, Blum soft-close mechanisms, Italian marble and quartz countertops, LED wardrobe profile channels, and custom veneer paneling.',
  },
  'architectural-lighting': {
    number: '06',
    title: 'Architectural Lighting & Ceiling Fixtures',
    meta: 'Hyderabad · Lighting Architecture & Ceilings',
    image: '/images/lighting/lighting-1.jpg',
    intro: 'Curated architectural lighting design, ambient ceiling installations, LED channel integration, and luxury chandelier fit-outs across Hyderabad residences.',
    details: 'Specialized lighting architecture designed to highlight tactile stone textures, wood veneer warm tones, recessed cove illumination, magnetic track lights, and custom decorative ceiling fixtures.',
  },
  'the-walnut-office': { number: '07', title: 'The Walnut Office', meta: 'Hyderabad · Commercial', image: '/images/walnut/walnut_1.jpg', intro: 'A considered executive workspace in Hyderabad where focus, hospitality and material warmth meet.', details: 'Rich natural walnut wood paneling, soft daylight and carefully proportioned work zones create an executive workplace that feels both purposeful and welcoming.' },
  'the-stone-kitchen': { number: '08', title: 'The Stone Kitchen', meta: 'Vizag · Residential', image: '/images/kitchen-detail.png', intro: 'A tactile kitchen study in natural stone, timber and precise joinery.', details: 'Every edge and junction was resolved to make daily movement feel effortless, while a restrained palette gives the room a lasting character.' },
  'the-quiet-retreat': { number: '09', title: 'The Quiet Retreat', meta: 'Financial District, Hyderabad · Residential', image: '/images/hero-interior.png', intro: 'A private retreat designed for slower mornings and softer evenings.', details: 'The interiors balance privacy with openness through layered light, low visual noise and a palette that ages beautifully.' },
} as const

const sriBioGallery = Array.from({ length: 12 }, (_, idx) => ({
  src: `/images/sri-bio/sri-bio-${idx + 1}.jpg`,
  title: `0${idx + 1} / Sri Bio Site Inspection & Execution View`,
  desc: `Real site photo of commercial laboratory fit-out, MEP ducting & interior execution phase ${idx + 1}.`,
  colSpan: idx % 3 === 0 ? 'col-span-12 lg:col-span-8' : 'col-span-12 lg:col-span-4',
}))

const saiVanamaliGallery = Array.from({ length: 18 }, (_, idx) => ({
  src: `/images/sai-vanamali/sai-vanamali-${idx + 1}.jpg`,
  title: `${idx + 1 < 10 ? '0' + (idx + 1) : idx + 1} / Sai Vanamali 3 Flat Interior Site Execution`,
  desc: `Real site photo of apartment fit-out, joinery, modular kitchen & lighting execution at Vijay RV's Sai Vanamali, Miyapur.`,
  colSpan: idx % 2 === 0 ? 'col-span-12 lg:col-span-6' : 'col-span-12 lg:col-span-6',
}))

const mukundaGallery = Array.from({ length: 5 }, (_, idx) => ({
  src: `/images/mukunda-nilayam/mukunda-${idx + 1}.jpg`,
  title: `0${idx + 1} / Mukunda Nilayam Architectural 3D Render`,
  desc: `Photorealistic 3D visualization render showing interior layout, ambient lighting, and timber finishes.`,
  colSpan: idx === 0 ? 'col-span-12 lg:col-span-12' : 'col-span-12 lg:col-span-6',
}))

const kitchenWardrobeGallery = [
  { src: '/images/kitchen-wardrobes/kitchen-wardrobe-1.jpg', title: '01 / Modern Kitchen Island & Quartz Countertop', desc: 'Sleek handleless kitchen island featuring seamless quartz countertop and ambient breakfast bar lighting.', colSpan: 'col-span-12 lg:col-span-8' },
  { src: '/images/kitchen-wardrobes/kitchen-wardrobe-2.jpg', title: '02 / Fluted Glass & Aluminum Profile Wardrobe', desc: 'Floor-to-ceiling luxury bedroom wardrobe with tinted fluted glass shutters and internal LED lighting.', colSpan: 'col-span-12 lg:col-span-4' },
  { src: '/images/kitchen-wardrobes/kitchen-wardrobe-3.jpg', title: '03 / Teak Veneer Tall Units & Pantry Storage', desc: 'Integrated appliances, pull-out pantry hardware, and rich natural teak veneer joinery.', colSpan: 'col-span-12 lg:col-span-6' },
  { src: '/images/kitchen-wardrobes/kitchen-wardrobe-4.jpg', title: '04 / Walk-In Closet & Sensor LED Profile Lighting', desc: 'Custom master suite walk-in closet with velvet-lined jewelry drawers and sensor LED strip channels.', colSpan: 'col-span-12 lg:col-span-6' },
  { src: '/images/kitchen-wardrobes/kitchen-wardrobe-5.jpg', title: '05 / Minimalist Matte Acrylic Kitchen Finish', desc: 'Fingerprint-resistant anti-scratch matte acrylic cabinetry with German soft-close mechanisms.', colSpan: 'col-span-12 lg:col-span-12' },
  { src: '/images/kitchen-wardrobes/kitchen-wardrobe-6.jpg', title: '06 / Dual-Tone Overhead Cabinets & Backsplash', desc: 'Contrast upper cabinets paired with Italian marble tile backsplash and under-cabinet task lighting.', colSpan: 'col-span-12 lg:col-span-5' },
  { src: '/images/kitchen-wardrobes/kitchen-wardrobe-7.jpg', title: '07 / Sliding Mirror Wardrobe & Vanity Nook', desc: 'Space-maximizing sliding mirror wardrobe doors with seamlessly built-in vanity dressing unit.', colSpan: 'col-span-12 lg:col-span-7' },
  { src: '/images/kitchen-wardrobes/kitchen-wardrobe-8.jpg', title: '08 / Open Crockery Display & Wine Rack', desc: 'Warm illuminated glass crockery unit with brass metal trim and dedicated wine storage.', colSpan: 'col-span-12 lg:col-span-12' },
]

const lightingGallery = [
  { src: '/images/lighting/lighting-1.jpg', title: '01 / Ambient Cove & Recessed Track Lighting', desc: 'Custom recessed ceiling cove with soft warm LED illumination and magnetic track highlights.', colSpan: 'col-span-12 lg:col-span-8' },
  { src: '/images/lighting/lighting-2.jpg', title: '02 / Sculptural Chandelier & Foyer Illumination', desc: 'Statement decorative chandelier casting ambient light across modern entrance foyers.', colSpan: 'col-span-12 lg:col-span-4' },
  { src: '/images/lighting/lighting-3.jpg', title: '03 / Linear Ceiling Slots & Accent Glow', desc: 'Precision linear LED slot lighting flush-mounted within seamless gypsum ceilings.', colSpan: 'col-span-12 lg:col-span-6' },
  { src: '/images/lighting/lighting-4.jpg', title: '04 / Living Room Mood & Feature Wall Lighting', desc: 'Architectural wall washers and warm spotlighting emphasizing natural stone textures.', colSpan: 'col-span-12 lg:col-span-6' },
  { src: '/images/lighting/lighting-5.jpg', title: '05 / Dining Table Pendant Light Composition', desc: 'Bespoke pendant light cluster creating warm, focused dining ambience.', colSpan: 'col-span-12 lg:col-span-12' },
  { src: '/images/lighting/lighting-6.jpg', title: '06 / Modular Ceiling Grid & Warm Downlights', desc: 'Symmetrical downlight placement integrated with acoustic timber ceiling baffles.', colSpan: 'col-span-12 lg:col-span-5' },
  { src: '/images/lighting/lighting-7.jpg', title: '07 / Bedroom Indirect Headboard Lighting', desc: 'Concealed LED strip illumination framing custom upholstered bed backdrops.', colSpan: 'col-span-12 lg:col-span-7' },
  { src: '/images/lighting/lighting-8.jpg', title: '08 / Exterior Facade & Landscape Illumination', desc: 'Low-glare outdoor architectural up-lighters highlighting building facade geometry.', colSpan: 'col-span-12 lg:col-span-12' },
]

const courtyardGallery = [
  { src: '/images/courtyard/tt-house-psa-architecture_10.jpg', title: '01 / Main Entrance & Courtyard Facade', desc: 'Light timber louvers and open garden courtyard welcoming sunlight into the core.', colSpan: 'col-span-12 lg:col-span-8' },
  { src: '/images/courtyard/tt-house-psa-architecture_2.jpg', title: '02 / Verandah & Outdoor Living', desc: 'Seamless transition between interior lounge and lush outdoor greenery.', colSpan: 'col-span-12 lg:col-span-4' },
  { src: '/images/courtyard/tt-house-psa-architecture_11.jpg', title: '03 / Daylight Shadow Study', desc: 'Morning sun angles creating architectural shadows across raw plaster.', colSpan: 'col-span-12 lg:col-span-6' },
  { src: '/images/courtyard/tt-house-psa-architecture_12.jpg', title: '04 / Open Pavilion Lounge', desc: 'High-ceilinged spatial volume with uninterrupted garden views.', colSpan: 'col-span-12 lg:col-span-6' },
  { src: '/images/courtyard/tt-house-psa-architecture_13.jpg', title: '05 / Primary Living Room & Joinery', desc: 'Warm Teak wood wall cladding, tailored furniture and soft ambient lighting.', colSpan: 'col-span-12 lg:col-span-12' },
  { src: '/images/courtyard/tt-house-psa-architecture_14.jpg', title: '06 / Tactile Stone & Mood Lighting', desc: 'Hand-chiselled natural stone feature wall paired with low visual noise.', colSpan: 'col-span-12 lg:col-span-5' },
  { src: '/images/courtyard/tt-house-psa-architecture_15.jpg', title: '07 / Courtyard Walkway Corridor', desc: 'A serene circulation passage flanked by glass and open sky.', colSpan: 'col-span-12 lg:col-span-7' },
  { src: '/images/courtyard/tt-house-psa-architecture_17.jpg', title: '08 / Dining & Kitchen Transition', desc: 'Ergonomic dining layout with bespoke cabinetry and minimalist hardware.', colSpan: 'col-span-12 lg:col-span-6' },
  { src: '/images/courtyard/tt-house-psa-architecture_20.jpg', title: '09 / Master Suite & Courtyard View', desc: 'Private sanctuary overlooking internal foliage and calm water feature.', colSpan: 'col-span-12 lg:col-span-6' },
  { src: '/images/courtyard/tt-house-psa-architecture_21.jpg', title: '10 / Upper Level Balcony Screen', desc: 'Bespoke architectural louvers providing privacy and micro-climate airflow.', colSpan: 'col-span-12 lg:col-span-8' },
  { src: '/images/courtyard/tt-house-psa-architecture_22.jpg', title: '11 / Evening Illumination View', desc: 'Warm LED accent illumination bringing out material depth at dusk.', colSpan: 'col-span-12 lg:col-span-4' },
  { src: '/images/courtyard/tt-house-psa-architecture_3.jpg', title: '12 / Artisan Detail & Finish', desc: 'Close-up of crafted joinery junctions and honest material palettes.', colSpan: 'col-span-12 lg:col-span-6' },
  { src: '/images/courtyard/3-second-floor-3.jpg', title: '13 / Second Floor Spatial Plan', desc: 'Upper level terrace layout, spatial circulation and bedroom suite orientation.', colSpan: 'col-span-12 lg:col-span-6' },
]

const walnutGallery = [
  { src: '/images/walnut/walnut_1.jpg', title: '01 / Executive Suite & Walnut Paneling', desc: 'Rich natural walnut wood wall paneling, acoustic ceiling baffles and bespoke executive desk in Hyderabad.', colSpan: 'col-span-12 lg:col-span-7' },
  { src: '/images/walnut/walnut_2.jpg', title: '02 / Boardroom & Ambient Lighting', desc: 'Integrated linear LED lighting, custom conference table and ergonomic lounge seating.', colSpan: 'col-span-12 lg:col-span-5' },
  { src: '/images/walnut/walnut_3.jpg', title: '03 / Open Workstation Flow & Glazing', desc: 'Proportioned desk bays, acoustic felt dividers and glass partition walls.', colSpan: 'col-span-12 lg:col-span-6' },
  { src: '/images/walnut/walnut_4.jpg', title: '04 / Reception Foyer & Statement Backdrop', desc: 'Warm hospitality foyer, marble reception desk and architectural slatted timber backdrop.', colSpan: 'col-span-12 lg:col-span-6' },
]

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }))
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects[slug as keyof typeof projects] ?? projects['the-courtyard-residence']

  return (
    <main className="project-detail-page min-h-screen bg-[#faf8f5] text-[#171717] selection:bg-[#b89768] selection:text-white flex flex-col justify-between">
      <Navbar />

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
              className="button button-dark inline-flex items-center gap-4 bg-[#8f6530] text-white px-8 py-5 text-xs tracking-widest uppercase hover:bg-[#724f24] transition-colors duration-300 shadow-lg group font-bold"
            >
              Discuss this project <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </RevealSection>
        </div>
      </section>

      {/* Sri BioAesthetics Site Gallery */}
      {slug === 'sri-bioaesthetics' && (
        <section className="project-gallery p-[6vw] md:p-[8vw] bg-[#faf8f5] text-[#171717] border-t border-[#dfd8cb]">
          <RevealSection className="mb-12">
            <p className="eyebrow text-[#8f6530] font-mono font-bold text-xs uppercase tracking-[0.2em] mb-2">
              Full Project Archive · 12 Site Photos
            </p>
            <h2 className="font-serif text-4xl md:text-6xl font-normal text-[#171717]">
              Picture by picture <i className="font-serif italic text-[#8f6530]">commercial site tour.</i>
            </h2>
            <p className="text-xs text-[#6e685e] font-sans mt-3">
              Official client website: <a href="https://sribioaesthetics.com/" target="_blank" rel="noreferrer" className="underline font-bold text-[#8f6530]">https://sribioaesthetics.com/</a>
            </p>
          </RevealSection>

          <div className="grid grid-cols-12 gap-8 md:gap-12">
            {sriBioGallery.map((item, index) => (
              <RevealSection
                key={item.src}
                delay={(index % 4) * 0.1}
                className={`${item.colSpan} flex flex-col gap-4`}
              >
                <div className="relative w-full overflow-hidden rounded-xs border border-[#e0d9cc] bg-[#f4efe6] shadow-sm group">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-1 px-1">
                  <h3 className="font-serif text-xl md:text-2xl font-normal text-[#171717]">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[#6e685e] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>
      )}

      {/* Sai Vanamali Site Gallery */}
      {slug === 'sai-vanamali-miyapur' && (
        <section className="project-gallery p-[6vw] md:p-[8vw] bg-[#faf8f5] text-[#171717] border-t border-[#dfd8cb]">
          <RevealSection className="mb-12">
            <p className="eyebrow text-[#8f6530] font-mono font-bold text-xs uppercase tracking-[0.2em] mb-2">
              Full Project Archive · 18 Site Photos Across 3 Flats
            </p>
            <h2 className="font-serif text-4xl md:text-6xl font-normal text-[#171717]">
              Picture by picture <i className="font-serif italic text-[#8f6530]">residential execution tour.</i>
            </h2>
            <p className="text-xs text-[#6e685e] font-sans mt-3">
              Vijay RV’s Sai Vanamali, Miyapur, Hyderabad · 3 Flats Interior Execution
            </p>
          </RevealSection>

          <div className="grid grid-cols-12 gap-8 md:gap-12">
            {saiVanamaliGallery.map((item, index) => (
              <RevealSection
                key={item.src}
                delay={(index % 4) * 0.1}
                className={`${item.colSpan} flex flex-col gap-4`}
              >
                <div className="relative w-full overflow-hidden rounded-xs border border-[#e0d9cc] bg-[#f4efe6] shadow-sm group">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-1 px-1">
                  <h3 className="font-serif text-xl md:text-2xl font-normal text-[#171717]">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[#6e685e] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>
      )}

      {/* Mukunda Nilayam Renders Gallery */}
      {slug === 'mukunda-nilayam' && (
        <section className="project-gallery p-[6vw] md:p-[8vw] bg-[#faf8f5] text-[#171717] border-t border-[#dfd8cb]">
          <RevealSection className="mb-12">
            <p className="eyebrow text-[#8f6530] font-mono font-bold text-xs uppercase tracking-[0.2em] mb-2">
              Full Project Archive · 5 Architectural 3D Renders
            </p>
            <h2 className="font-serif text-4xl md:text-6xl font-normal text-[#171717]">
              Picture by picture <i className="font-serif italic text-[#8f6530]">3D render tour.</i>
            </h2>
            <p className="text-xs text-[#6e685e] font-sans mt-3">
              Mukunda Nilayam · Photorealistic 3D Renders &amp; Spatial Lighting Suite
            </p>
          </RevealSection>

          <div className="grid grid-cols-12 gap-8 md:gap-12">
            {mukundaGallery.map((item, index) => (
              <RevealSection
                key={item.src}
                delay={(index % 4) * 0.1}
                className={`${item.colSpan} flex flex-col gap-4`}
              >
                <div className="relative w-full overflow-hidden rounded-xs border border-[#e0d9cc] bg-[#f4efe6] shadow-sm group">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-1 px-1">
                  <h3 className="font-serif text-xl md:text-2xl font-normal text-[#171717]">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[#6e685e] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>
      )}

      {/* Modular Kitchens & Luxury Wardrobes Gallery */}
      {slug === 'kitchens-and-wardrobes' && (
        <section className="project-gallery p-[6vw] md:p-[8vw] bg-[#faf8f5] text-[#171717] border-t border-[#dfd8cb]">
          <RevealSection className="mb-12">
            <p className="eyebrow text-[#8f6530] font-mono font-bold text-xs uppercase tracking-[0.2em] mb-2">
              Full Project Archive · 8 Custom Kitchen &amp; Wardrobe Fit-Out Views
            </p>
            <h2 className="font-serif text-4xl md:text-6xl font-normal text-[#171717]">
              Picture by picture <i className="font-serif italic text-[#8f6530]">kitchen &amp; wardrobe tour.</i>
            </h2>
            <p className="text-xs text-[#6e685e] font-sans mt-3">
              Precision Joinery, German Soft-Close Hardware, Walk-In Closets &amp; Quartz Kitchen Islands in Hyderabad.
            </p>
          </RevealSection>

          <div className="grid grid-cols-12 gap-8 md:gap-12">
            {kitchenWardrobeGallery.map((item, index) => (
              <RevealSection
                key={item.src}
                delay={(index % 4) * 0.1}
                className={`${item.colSpan} flex flex-col gap-4`}
              >
                <div className="relative w-full overflow-hidden rounded-xs border border-[#e0d9cc] bg-[#f4efe6] shadow-sm group">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-1 px-1">
                  <h3 className="font-serif text-xl md:text-2xl font-normal text-[#171717]">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[#6e685e] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>
      )}

      {/* Architectural Lighting Gallery */}
      {slug === 'architectural-lighting' && (
        <section className="project-gallery p-[6vw] md:p-[8vw] bg-[#faf8f5] text-[#171717] border-t border-[#dfd8cb]">
          <RevealSection className="mb-12">
            <p className="eyebrow text-[#8f6530] font-mono font-bold text-xs uppercase tracking-[0.2em] mb-2">
              Full Project Archive · 8 Lighting Architecture Views
            </p>
            <h2 className="font-serif text-4xl md:text-6xl font-normal text-[#171717]">
              Picture by picture <i className="font-serif italic text-[#8f6530]">lighting &amp; ceiling tour.</i>
            </h2>
            <p className="text-xs text-[#6e685e] font-sans mt-3">
              Architectural Lighting Design, Ambient Fixtures &amp; Ceiling Integration across Hyderabad Residences.
            </p>
          </RevealSection>

          <div className="grid grid-cols-12 gap-8 md:gap-12">
            {lightingGallery.map((item, index) => (
              <RevealSection
                key={item.src}
                delay={(index % 4) * 0.1}
                className={`${item.colSpan} flex flex-col gap-4`}
              >
                <div className="relative w-full overflow-hidden rounded-xs border border-[#e0d9cc] bg-[#f4efe6] shadow-sm group">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-1 px-1">
                  <h3 className="font-serif text-xl md:text-2xl font-normal text-[#171717]">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[#6e685e] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>
      )}

      {/* Full Picture-by-Picture Architectural Gallery */}
      {slug === 'the-courtyard-residence' && (
        <section className="project-gallery p-[6vw] md:p-[8vw] bg-[#faf8f5] text-[#171717] border-t border-[#dfd8cb]">
          <RevealSection className="mb-12">
            <p className="eyebrow text-[#8f6530] font-mono font-bold text-xs uppercase tracking-[0.2em] mb-2">
              Full Project Archive · 13 Architectural Views
            </p>
            <h2 className="font-serif text-4xl md:text-6xl font-normal text-[#171717]">
              Picture by picture <i className="font-serif italic text-[#8f6530]">residential tour.</i>
            </h2>
          </RevealSection>

          <div className="grid grid-cols-12 gap-8 md:gap-12">
            {courtyardGallery.map((item, index) => (
              <RevealSection
                key={item.src}
                delay={(index % 4) * 0.1}
                className={`${item.colSpan} flex flex-col gap-4`}
              >
                <div className="relative w-full overflow-hidden rounded-xs border border-[#e0d9cc] bg-[#f4efe6] shadow-sm group">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-1 px-1">
                  <h3 className="font-serif text-xl md:text-2xl font-normal text-[#171717]">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[#6e685e] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>
      )}

      {/* Full Picture-by-Picture Architectural Gallery for Walnut Office */}
      {slug === 'the-walnut-office' && (
        <section className="project-gallery p-[6vw] md:p-[8vw] bg-[#faf8f5] text-[#171717] border-t border-[#dfd8cb]">
          <RevealSection className="mb-12">
            <p className="eyebrow text-[#8f6530] font-mono font-bold text-xs uppercase tracking-[0.2em] mb-2">
              Full Project Archive · 4 Executive Office Views
            </p>
            <h2 className="font-serif text-4xl md:text-6xl font-normal text-[#171717]">
              Picture by picture <i className="font-serif italic text-[#8f6530]">workspace tour.</i>
            </h2>
          </RevealSection>

          <div className="grid grid-cols-12 gap-8 md:gap-12">
            {walnutGallery.map((item, index) => (
              <RevealSection
                key={item.src}
                delay={(index % 4) * 0.1}
                className={`${item.colSpan} flex flex-col gap-4`}
              >
                <div className="relative w-full overflow-hidden rounded-xs border border-[#e0d9cc] bg-[#f4efe6] shadow-sm group">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-1 px-1">
                  <h3 className="font-serif text-xl md:text-2xl font-normal text-[#171717]">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-[#6e685e] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}

export const metadata = {
  title: 'Project | SAID studio',
  description: 'Selected architecture and interior project by SAID studio.',
}
