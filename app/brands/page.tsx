'use client'

import { useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import {
  Filter,
  Search,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Award,
  CheckCircle2,
  X,
  Play,
  Pause,
  Zap,
  Globe,
  ArrowRight,
  SlidersHorizontal,
  LayoutGrid,
  Layers,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { RevealSection } from '@/components/ScrollAnimation'

export interface BrandItem {
  name: string
  category: string
  specialty?: string
  tag?: string
  logoUrl: string
  origin?: string
  description?: string
}

export interface BrandCategoryGroup {
  id: string
  title: string
  shortTitle: string
  description: string
  brands: BrandItem[]
}

const brandCategoriesData: BrandCategoryGroup[] = [
  {
    id: 'ply-brands',
    title: 'Ply Brands & Hardwood Substrates',
    shortTitle: 'Ply Brands',
    description: 'IS:710 Marine grade boiling waterproof plywood, E-0 low emission boards, and imported Gurjan hardwood cores.',
    brands: [
      { name: 'CenturyPly', category: 'Ply Brands', logoUrl: '/brands-assets/PLY_Brands/CenturyPly Geometric Red Star Logo.png', specialty: 'Club Prime & IS:710 Marine Grade BWP Plywood', origin: 'India', tag: 'ViroKill Protected', description: 'Engineered with ViroKill technology that kills 99.99% of viruses, bacteria, and fungus. Tested for 72-hour boiling water resistance.' },
      { name: 'Greenply', category: 'Ply Brands', logoUrl: '/brands-assets/PLY_Brands/Greenply Leaf Logo on Transparent Background.png', specialty: 'Green Platinum & E-0 Emission Waterproof Ply', origin: 'India', tag: 'Zero Emission', description: 'Zero E-0 emission compliant hardwood ply designed for non-toxic indoor air quality in luxury residential bedrooms.' },
      { name: 'Archidply', category: 'Ply Brands', logoUrl: '/brands-assets/PLY_Brands/Archidply Wood and Green Logo.png', specialty: 'Structural & Architectural Calibrated Plywood', origin: 'India', tag: 'Calibrated Core', description: 'Quad-pressed calibrated plywood ensuring uniform thickness across high-rise modular wardrobes and kitchen carcases.' },
      { name: 'Duro Ply', category: 'Ply Brands', logoUrl: '/brands-assets/PLY_Brands/Bold DURO Logo with Red Accent.png', specialty: 'Duroflex Superior Veneered & Blockboards', origin: 'India', tag: 'High-Density Core', description: 'Select hardwood blockboards crafted with 100% pine core treated for anti-warp structural longevity.' },
      { name: 'Merino Ply', category: 'Ply Brands', logoUrl: '/brands-assets/PLY_Brands/Merino Sailing Emblem Logo.png', specialty: 'High-Density Architectural Structural Plywood', origin: 'India', tag: 'Termite Proof', description: 'Vacuum-pressure impregnated with organo-phosphorus compounds for lifetime termite and borer defense.' },
      { name: 'Kitply', category: 'Ply Brands', logoUrl: '/brands-assets/PLY_Brands/Kitply Eco Woodmark Logo.png', specialty: 'Fire Retardant & Marine Grade Phenolic Board', origin: 'India', tag: 'Fire Safe', description: 'FR-grade fire retardant marine plywood engineered to prevent flame propagation in commercial kitchen fit-outs.' },
      { name: 'Gurjan Ply', category: 'Ply Brands', logoUrl: '/brands-assets/PLY_Brands/Gurjanr Eco Wood Logo.png', specialty: '100% Imported Gurjan Core Hardwood Substrate', origin: 'Imported', tag: '100% Hardwood', description: 'High density face and core veneers sourced from certified sustainable Southeast Asian hardwood reserves.' },
    ],
  },
  {
    id: 'laminates',
    title: 'Decorative Laminates & Acrylic Surfaces',
    shortTitle: 'Laminates',
    description: 'High-pressure decorative laminates, anti-fingerprint super matt acrylic sheets, and European texture liners.',
    brands: [
      { name: 'Merino Luvih', category: 'Laminates', logoUrl: '/brands-assets/LAMINATES/Merino Red Script Logo with Ship Badge.png', specialty: 'Luvih Super Matt & Anti-Fingerprint Surfaces', origin: 'India', tag: 'Anti-Fingerprint', description: 'Super matt, soft-touch surface technology with micro-scratch thermal healing capability.' },
      { name: 'Greenlam', category: 'Laminates', logoUrl: '/brands-assets/LAMINATES/Greenlam Laminates Colorful Logo.png', specialty: 'Anti-Bacterial & Textured Decorative Sheets', origin: 'India', tag: 'US-FDA Certified', description: 'US-FDA certified antibacterial decorative laminates suitable for food prep zones and vanity cabinets.' },
      { name: 'CenturyLaminates', category: 'Laminates', logoUrl: '/brands-assets/LAMINATES/Century Laminates Logo.png', specialty: 'Veneer Finish & High-Gloss Metallic Liners', origin: 'India', tag: 'Lucida Gloss', description: 'High-gloss Lucida liners engineered with scuff-resistant protective layers.' },
      { name: 'Stylam', category: 'Laminates', logoUrl: '/brands-assets/LAMINATES/STYLAM Geometric Blue Logo.png', specialty: 'Synchro & Tactile Architectural Surfaces', origin: 'India', tag: 'European Spec', description: 'Synchronized deep wood grain textures designed to mimic solid oak, walnut, and teak timber finishes.' },
      { name: 'Virgo Laminates', category: 'Laminates', logoUrl: '/brands-assets/LAMINATES/Golden Virgo Medallion Logo.png', specialty: 'High-Gloss & Digital Interior Decorative Sheets', origin: 'India', tag: 'Scratch Resistant', description: 'High-pressure digital prints featuring natural marble veining, brutalist concrete, and brushed copper.' },
      { name: 'Royale Touché', category: 'Laminates', logoUrl: '/brands-assets/LAMINATES/Royale Touche Luxury Emblem Logo.png', specialty: 'Luxury 1mm European Texture Interior Laminates', origin: 'India', tag: 'Luxury Liners', description: '1mm ultra-durable luxury interior surface laminates imported from European design houses.' },
      { name: 'Airolam', category: 'Laminates', logoUrl: '/brands-assets/LAMINATES/Airolam Logo with Geometric Emblem.png', specialty: 'Anti-Fingerprint Acrylic & Velvet Touch Sheets', origin: 'India', tag: 'Velvet Finish', description: 'Silky smooth velvet touch acrylic panels with zero light reflection for executive office suites.' },
      { name: 'Advance Laminates', category: 'Laminates', logoUrl: '/brands-assets/LAMINATES/Advance Decorative Laminates Logo.png', specialty: 'High-Performance Craft Laminate Liners', origin: 'India', tag: 'Interior Grade', description: 'Flexible 0.8mm balancing liners for seamless curved joinery and fluted paneling.' },
    ],
  },
  {
    id: 'sanitary-fittings',
    title: 'Sanitaryware & Luxury Bath Fittings',
    shortTitle: 'Sanitary Fittings',
    description: 'Thermostatic shower systems, smart vitreous china washlets, and brushed gold architectural faucets.',
    brands: [
      { name: 'Kohler', category: 'Sanitary Fittings', logoUrl: '/brands-assets/SANITAR_Fitting/Bold KOHLER Logo on Transparent Background.png', specialty: 'Veil Smart Washlets & Brushed Gold Fittings', origin: 'USA', tag: 'USA Precision', description: 'Intelligent tankless toilets with heated seat, touchless lid opening, and custom bidet spray presets.' },
      { name: 'Grohe', category: 'Sanitary Fittings', logoUrl: '/brands-assets/SANITAR_Fitting/GROHE Wave Logo.png', specialty: 'Thermostatic Showers & Concealed SmartControl Mixers', origin: 'Germany', tag: 'German Spec', description: 'Concealed SmartControl push-button shower valves engineered with TurboStat instant water temperature lock.' },
      { name: 'Jaquar Artize', category: 'Sanitary Fittings', logoUrl: '/brands-assets/SANITAR_Fitting/Jaquar Teal Logo on Transparent Background.png', specialty: 'Concellia Designer Thermostatic Faucets & Sinks', origin: 'India', tag: 'Luxury Bath', description: 'Avant-garde artisan faucets coated in PVD brushed bronze, Rose Gold, and Matte Black PVD finishes.' },
      { name: 'Hindware Italian', category: 'Sanitary Fittings', logoUrl: '/brands-assets/SANITAR_Fitting/Vivid Red Hindware Wordmark.png', specialty: 'Vitreous China Wall-Hung Sanitaryware', origin: 'India', tag: 'Italian Collection', description: 'Rimless ceramic wall-hung water closets featuring Nano-Glaze hygienic easy-clean surface.' },
      { name: 'Parryware', category: 'Sanitary Fittings', logoUrl: '/brands-assets/SANITAR_Fitting/Parryware Blue Wordmark Logo.png', specialty: 'Minimalist Countertop Basins & Water Closets', origin: 'India', tag: 'Vitreous China', description: 'Slim-rim countertop vitreous ceramic basins designed for contemporary master bathroom vanities.' },
      { name: 'Cera Bathware', category: 'Sanitary Fittings', logoUrl: '/brands-assets/SANITAR_Fitting/CERA Geometric Blue Logo.png', specialty: 'Touchless Sensor Faucets & Vitreous Sanitaryware', origin: 'India', tag: 'Sensor Tech', description: 'Automatic infrared sensor faucets and water-saving dual flush pressure tanks.' },
      { name: 'Somany Bathware', category: 'Sanitary Fittings', logoUrl: '/brands-assets/SANITAR_Fitting/Bold Red SOMANY Logo.png', specialty: 'French Collection Luxury Faucets & Bathware', origin: 'India', tag: 'Designer Series', description: 'Solid brass body monobloc mixers with anti-clogging silicone aerator nozzles.' },
    ],
  },
  {
    id: 'electricals-lighting',
    title: 'Electricals, Cables & Architectural Lighting',
    shortTitle: 'Electricals & Lighting',
    description: 'FR-LSH flame retardant pure copper wiring, modular Crabtree switches, and magnetic track lights.',
    brands: [
      { name: 'Polycab', category: 'Electricals & Lighting', logoUrl: '/brands-assets/ELECTRICALS_AND_Lightning/POLYCAB Ideas Connected Logo.png', specialty: 'FR-LSH Fire Resistant Pure Copper Cables', origin: 'India', tag: 'Flame Safe', description: '99.97% pure electrolytic grade copper conductors wrapped in low-smoke zero-halogen insulation.' },
      { name: 'Finolex', category: 'Electricals & Lighting', logoUrl: '/brands-assets/ELECTRICALS_AND_Lightning/Finolex Blue Wordmark Logo.png', specialty: 'High-Conductivity Pure Copper Electrical Cables', origin: 'India', tag: 'High-Grade Copper', description: 'Flame-retardant multi-strand electrical wires built for high-amp air conditioners and induction ranges.' },
      { name: 'Havells Crabtree', category: 'Electricals & Lighting', logoUrl: '/brands-assets/ELECTRICALS_AND_Lightning/Havells Red Emblem and Wordmark.png', specialty: 'Crabtree Modular Switches & Architectural COB Lights', origin: 'India', tag: 'Crabtree Series', description: 'Signia and Athena minimalist glass cover plates with whisper-quiet tactile rocker switches.' },
      { name: 'Philips Lighting', category: 'Electricals & Lighting', logoUrl: '/brands-assets/ELECTRICALS_AND_Lightning/Bold Blue Phillips Wordmark Logo.png', specialty: 'Hue Smart Tunable Recessed LED Profile & Track Spots', origin: 'Netherlands', tag: 'Smart Ambient', description: 'CRI>95 museum grade anti-glare architectural COB downlights with warm dimming technology.' },
      { name: 'Crompton', category: 'Electricals & Lighting', logoUrl: '/brands-assets/ELECTRICALS_AND_Lightning/Crompton Blue Wordmark Logo.png', specialty: 'Architectural Ceiling Fans & Downlights', origin: 'India', tag: 'Energy Efficient', description: 'Silent BLDC motor ceiling fans consuming 50% less power with integrated LED under-lights.' },
      { name: 'Orient Electric', category: 'Electricals & Lighting', logoUrl: '/brands-assets/ELECTRICALS_AND_Lightning/Orient Electric Orange Logo.png', specialty: 'Aeroquiet Acoustic Smart Ceiling Fans', origin: 'India', tag: 'Silent Motor', description: 'Aerodynamic ABS blades delivering 240 CMM air delivery at whisper-quiet 48 dB noise level.' },
      { name: 'Wipro Lighting', category: 'Electricals & Lighting', logoUrl: '/brands-assets/ELECTRICALS_AND_Lightning/Wipro Logo with Colorful Dot Swirl.png', specialty: 'Garnet Architectural Panel & Magnetic Track Lights', origin: 'India', tag: 'Commercial Spec', description: 'Ultra-slim magnetic track rail system supporting quick snap-in accent spotlights.' },
      { name: 'V-Guard', category: 'Electricals & Lighting', logoUrl: '/brands-assets/ELECTRICALS_AND_Lightning/V-Guard Kangaroo Ribbon Logo.png', specialty: 'Heavy Duty Power Cables & Surge Protection', origin: 'India', tag: 'Power Protection', description: 'Triple insulated copper wiring with high thermal resistance up to 105°C.' },
    ],
  },
  {
    id: 'paints',
    title: 'Paints, Emulsions & Polyurethane Finishes',
    shortTitle: 'Paints',
    description: 'Eco-friendly low-VOC interior emulsions, Italian polyurethane wood stains, and metallic stucco finishes.',
    brands: [
      { name: 'Asian Paints', category: 'Paints', logoUrl: '/brands-assets/PAINTS/Asian Paints Ribbon Logo.png', specialty: 'Royale Aspira & PU Wood Finish Polishes', origin: 'India', tag: 'Royale Spec', description: 'Teflon surface protector interior emulsion with cross-linking polymer technology for stain repellency.' },
      { name: 'Berger Paints', category: 'Paints', logoUrl: '/brands-assets/PAINTS/Berger Paint Logo Badge.png', specialty: 'Silk Glamor Washable Interior Wall Emulsions', origin: 'India', tag: 'Silk Washable', description: 'Rich silk sheen finish formulation providing high burnish resistance and elastomeric crack-bridging.' },
      { name: 'Nerolac', category: 'Paints', logoUrl: '/brands-assets/PAINTS/NEROLAC Magenta Wave Logo.png', specialty: 'Impressions Eco-Clean Low-VOC Luxury Emulsion', origin: 'India', tag: 'Low VOC', description: 'Ultra low VOC ultra-washable interior paint with Japan technology micro-gel barrier.' },
      { name: 'Indigo Paints', category: 'Paints', logoUrl: '/brands-assets/PAINTS/Indigo Paints Zebra Emblem Logo.png', specialty: 'Metallic & Velvet Dirt-Resistant Emulsions', origin: 'India', tag: 'Dirt Shield', description: 'Grandeur metallic ceiling polishes and washable dirt-shield exterior acrylics.' },
      { name: 'Dulux', category: 'Paints', logoUrl: '/brands-assets/PAINTS/Dulux Logo with Rainbow Paint Swoosh.png', specialty: 'Velvet Touch & Italian Stucco Wall Texture Art', origin: 'UK', tag: 'Velvet Touch', description: 'Ambiance special effects stucco and lime washes creating authentic Venetian plaster feature walls.' },
      { name: 'Birla Opus', category: 'Paints', logoUrl: '/brands-assets/PAINTS/BIRLA opus Colorful Dot Logo.png', specialty: 'Ultra-Premium Architectural Emulsion & Finishes', origin: 'India', tag: 'Opus Luxury', description: 'High opacity micro-pigmentation latex offering true color depth under 3000K warm architectural lighting.' },
    ],
  },
  {
    id: 'flooring',
    title: 'Vitrified Tiles, Sintered Slabs & Flooring',
    shortTitle: 'Flooring',
    description: 'Large format vitrified porcelain tiles, Italian marble finish sintered slabs, and bathroom floor tiles.',
    brands: [
      { name: 'Kajaria Eternity', category: 'Flooring', logoUrl: '/brands-assets/Flooring/Kajaria Blue Wordmark Logo.png', specialty: 'Eternity Sintered Slabs & Vitrified Floor Tiles', origin: 'India', tag: 'Eternity Series', description: '1200x2400mm continuous vein sintered porcelain slabs engineered for kitchen countertops and feature walls.' },
      { name: 'Somany Tiles', category: 'Flooring', logoUrl: '/brands-assets/Flooring/SOMANY Tiles and Bathware Logo.png', specialty: 'Duragres Polished Porcelain Floor Tiles', origin: 'India', tag: 'Duragres Tech', description: 'VC Shield patent hard glaze protection preventing scratches from heavy foot traffic.' },
      { name: 'RAK Ceramics', category: 'Flooring', logoUrl: '/brands-assets/Flooring/RAK Ceramics Minimalist Logo.png', specialty: 'Metamorphic Marble Slabs & Polished Tiles', origin: 'UAE', tag: 'RAK Global', description: 'Imported UAE porcelain tiles with book-matched Statuario and Calacatta marble digital prints.' },
      { name: 'Johnson Tiles', category: 'Flooring', logoUrl: '/brands-assets/Flooring/JOHNSON Tiles and Bathware Logo.png', specialty: 'Marbonite Anti-Skid Vitrified Floor Tiles', origin: 'India', tag: 'Marbonite Core', description: 'Anti-skid R10 rated vitrified tiles for wet bathroom floors and pool decks.' },
      { name: 'Simpolo', category: 'Flooring', logoUrl: '/brands-assets/Flooring/Simpolo Teal Logo Mark.png', specialty: 'Progres Sintered Surfaces & Outdoor Pavers', origin: 'India', tag: 'Progres Tech', description: '16mm thick sintered architectural porcelain bodies built for outdoor terrace landscaping.' },
      { name: 'Nitco Tiles', category: 'Flooring', logoUrl: '/brands-assets/Flooring/NITCO Tiles Marble Mosaico Logo.png', specialty: 'NaturoROC Marble & Vitrified Tiles', origin: 'India', tag: 'NaturoROC', description: 'Precision waterjet cut mosaic tiles and honed natural stone cladding.' },
    ],
  },
  {
    id: 'action-tesa',
    title: 'Action Tesa Board Substrates',
    shortTitle: 'Action Tesa Boards',
    description: 'HDHMR, MDF, Particle Boards, Pre-Laminated Boards, and PVC/HDWR Boards for modern joinery.',
    brands: [
      { name: 'Action Tesa HDHMR', category: 'Action Tesa Boards', logoUrl: '/brands-assets/Action_tesa/Action TESA Eco Logo with Slogan.png', specialty: 'High Density High Moisture Resistant Board for Kitchens', origin: 'India', tag: 'HDHMR Grade', description: 'Density >850 kg/m³ water-resistant board designed for modular kitchen under-sink carcasses.' },
      { name: 'Action Tesa MDF', category: 'Action Tesa Boards', logoUrl: '/brands-assets/Action_tesa/Action TESA Eco Logo with Slogan.png', specialty: 'Precision Medium Density Fiberboard for CNC Carvings', origin: 'India', tag: 'CNC Precision', description: 'Homogeneous density core board allowing splinter-free 3D CNC routing and fluted wall paneling.' },
      { name: 'Action Tesa Particle Board', category: 'Action Tesa Boards', logoUrl: '/brands-assets/Action_tesa/Action TESA Eco Logo with Slogan.png', specialty: 'Graded Interior Substrate Board for Cabinetry', origin: 'India', tag: 'Modular Grade', description: 'Three-layer graded particle board engineered for lightweight modular wardrobe shutter cores.' },
      { name: 'Action Tesa Pre-Laminated', category: 'Action Tesa Boards', logoUrl: '/brands-assets/Action_tesa/Action TESA Eco Logo with Slogan.png', specialty: 'Melamine Coated Decorative Pre-Laminated Boards', origin: 'India', tag: 'Pre-Laminated', description: 'Factory heat-pressed melamine decorative resin paper on HDHMR substrate.' },
      { name: 'Action Tesa PVC/HDWR', category: 'Action Tesa Boards', logoUrl: '/brands-assets/Action_tesa/Action TESA Eco Logo with Slogan.png', specialty: '100% Waterproof Heavy Duty Polymer Boards for Vans', origin: 'India', tag: '100% Waterproof', description: 'Termite proof, fire retardant polymer board for bathroom vanity frames and outdoor cabinets.' },
    ],
  },
]

export default function BrandsPage() {
  const [activeTab, setActiveTab] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedBrand, setSelectedBrand] = useState<BrandItem | null>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [speed, setSpeed] = useState<'slow' | 'normal' | 'fast'>('slow')
  const [viewMode, setViewMode] = useState<'marquee' | 'grid'>('marquee')

  const allBrands = useMemo(() => brandCategoriesData.flatMap((g) => g.brands), [])

  const filteredGroups = useMemo(() => {
    return brandCategoriesData
      .map((group) => {
        if (activeTab !== 'All' && group.shortTitle !== activeTab) return null

        const matchingBrands = group.brands.filter((b) => {
          if (!searchQuery.trim()) return true
          const q = searchQuery.toLowerCase()
          return (
            b.name.toLowerCase().includes(q) ||
            b.category.toLowerCase().includes(q) ||
            (b.specialty && b.specialty.toLowerCase().includes(q))
          )
        })

        if (matchingBrands.length === 0) return null

        return {
          ...group,
          brands: matchingBrands,
        }
      })
      .filter(Boolean) as BrandCategoryGroup[]
  }, [activeTab, searchQuery])

  // Speed duration mapping
  const speedDurationMap = {
    slow: '90s',
    normal: '65s',
    fast: '45s',
  }

  return (
    <main className="brands-page min-h-screen w-full bg-white text-neutral-900 selection:bg-[#b89768] selection:text-white flex flex-col justify-between overflow-x-hidden relative">
      <Navbar />

      <div className="pt-20">
        {/* Luxury Hero Header on White Background */}
        <section className="relative py-20 lg:py-28 px-6 md:px-16 border-b border-neutral-100 bg-gradient-to-b from-neutral-50 via-white to-white">
          <div className="max-w-[1440px] mx-auto">
            <RevealSection className="max-w-4xl space-y-6">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#b89768] font-bold">
                <span>ARCHITECTURAL MATERIAL PARTNERS &amp; ALLIANCES</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-900 tracking-tight leading-[1.1]">
                Curated Brands &amp; <br />
                <i className="font-serif italic text-[#b89768]">Material Leaders.</i>
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light max-w-2xl">
                Every space crafted by SAID Studio is built using 100% authentic, factory-warranted materials from world-renowned architectural leaders in hardware, sanitaryware, plywood, electricals, and surface finishes.
              </p>

              <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-neutral-200 text-xs font-mono uppercase tracking-widest text-neutral-600">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#b89768]" /> 100% Verified Partners ({allBrands.length}+ Brands)
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#b89768]" /> IS:710 Marine Ply &amp; HDHMR Core
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b89768]" /> Kohler, Grohe, Blum &amp; Asian Paints
                </div>
              </div>
            </RevealSection>
          </div>
        </section>

        {/* Master Showcase Banner (Continuous Auto Marquee Slider) */}
        <section className="py-10 bg-neutral-50 border-y border-neutral-100 overflow-hidden select-none relative group">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-neutral-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-neutral-50 to-transparent z-10 pointer-events-none" />

          <div
            className={`animate-marquee flex items-center gap-16 ${
              !isPlaying ? '[animation-play-state:paused]' : ''
            } group-hover:[animation-play-state:paused]`}
            style={{ animationDuration: speedDurationMap[speed] }}
          >
            {[...allBrands, ...allBrands, ...allBrands].map((b, idx) => (
              <div
                key={`master-${b.name}-${idx}`}
                onClick={() => setSelectedBrand(b)}
                className="w-[200px] sm:w-[250px] h-[110px] sm:h-[130px] bg-white border border-[#e8e4dc] hover:border-[#8f6530] rounded-xs p-5 shrink-0 flex items-center justify-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group/masterlogo relative cursor-pointer"
              >
                {/* Subtle Radial Glow on Hover */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#b89768_0%,transparent_70%)] opacity-0 group-hover/masterlogo:opacity-20 transition-opacity duration-300 rounded-full blur-md" />
                
                <img
                  src={encodeURI(b.logoUrl)}
                  alt={b.name}
                  className="max-h-[70px] max-w-[190px] w-auto h-auto object-contain transition-all duration-500 group-hover/masterlogo:scale-110"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Controls & Filters */}
        <section className="py-12 px-6 md:px-16 max-w-[1440px] mx-auto w-full space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-neutral-200 pb-8">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              <span className="font-mono text-xs uppercase tracking-widest text-[#b89768] font-bold flex items-center gap-2 shrink-0 mr-2">
                <Filter className="w-4 h-4 text-[#b89768]" /> Categories:
              </span>

              <button
                onClick={() => setActiveTab('All')}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-sans font-bold rounded-full border transition-all shrink-0 ${
                  activeTab === 'All'
                    ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                    : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200'
                }`}
              >
                All Brands ({allBrands.length})
              </button>

              {brandCategoriesData.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setActiveTab(group.shortTitle)}
                  className={`px-4 py-2 text-xs uppercase tracking-widest font-sans font-bold rounded-full border transition-all shrink-0 ${
                    activeTab === group.shortTitle
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                      : 'bg-neutral-100 text-neutral-700 border-neutral-200 hover:bg-neutral-200'
                  }`}
                >
                  {group.shortTitle}
                </button>
              ))}
            </div>

            {/* Right Tools: View Toggle & Live Search */}
            <div className="flex items-center gap-3 w-full lg:w-auto shrink-0 justify-between lg:justify-end">
              {/* View Mode Switcher */}
              <div className="flex items-center bg-neutral-100 p-1 rounded-full border border-neutral-200 text-xs font-mono">
                <button
                  onClick={() => setViewMode('marquee')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                    viewMode === 'marquee'
                      ? 'bg-white text-neutral-900 shadow-sm font-bold'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                  title="Auto Moving Logo Marquee"
                >
                  <Layers className="w-3.5 h-3.5 text-[#b89768]" />
                  <span>Marquee</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                    viewMode === 'grid'
                      ? 'bg-white text-neutral-900 shadow-sm font-bold'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                  title="Static Clean Logo Grid"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-[#b89768]" />
                  <span>Grid</span>
                </button>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-72 shrink-0">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search brand (Kohler, Greenply)..."
                  className="w-full bg-neutral-100 border border-neutral-200 pl-10 pr-4 py-2 text-xs text-neutral-900 rounded-full focus:border-neutral-900 focus:outline-none shadow-sm placeholder:text-neutral-400"
                />
              </div>
            </div>
          </div>

          {/* MARQUEE VIEW MODE */}
          {viewMode === 'marquee' && (
            <div className="space-y-16">
              {filteredGroups.length === 0 ? (
                <div className="text-center py-16 bg-neutral-50 border border-neutral-200 rounded-xl p-8 space-y-4">
                  <p className="font-serif text-2xl text-neutral-800">No brand logos found matching "{searchQuery}"</p>
                  <button
                    onClick={() => {
                      setActiveTab('All')
                      setSearchQuery('')
                    }}
                    className="text-xs uppercase tracking-widest text-[#b89768] font-bold underline"
                  >
                    Reset Search Filters
                  </button>
                </div>
              ) : (
                filteredGroups.map((group, groupIdx) => {
                  const reverse = groupIdx % 2 === 1
                  const duplicated = [...group.brands, ...group.brands, ...group.brands, ...group.brands]

                  return (
                    <RevealSection key={group.id} delay={groupIdx * 0.05}>
                      <div className="space-y-6">
                        {/* Category Row Header */}
                        <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
                          <div>
                            <span className="font-mono text-xs text-[#b89768] uppercase tracking-[0.2em] font-bold block mb-1">
                              {group.shortTitle} CATEGORY
                            </span>
                            <h2 className="font-serif text-lg md:text-xl font-medium text-neutral-900">
                              {group.title}
                            </h2>
                          </div>
                        </div>

                        {/* Infinite Horizontal Auto-Moving Track */}
                        <div className="relative overflow-hidden py-4 group/row">
                          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                          <div className="flex overflow-x-auto scrollbar-none py-4 scroll-smooth">
                            <div
                              className={`flex items-center gap-8 sm:gap-10 shrink-0 ${
                                !isPlaying ? '[animation-play-state:paused]' : ''
                              } group-hover/row:[animation-play-state:paused] ${
                                reverse ? 'animate-marquee-reverse' : 'animate-marquee'
                              }`}
                              style={{ animationDuration: speedDurationMap[speed] }}
                            >
                              {duplicated.map((brand, bIdx) => (
                                <div
                                  key={`${group.id}-${brand.name}-${bIdx}`}
                                  onClick={() => setSelectedBrand(brand)}
                                  className="w-[200px] sm:w-[250px] h-[110px] sm:h-[130px] bg-white border border-[#e8e4dc] hover:border-[#8f6530] rounded-xs p-5 shrink-0 flex items-center justify-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group/logo relative cursor-pointer"
                                  title={`Click to view ${brand.name} details`}
                                >
                                  {/* Soft Radial Backlight on Hover */}
                                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#b89768_0%,transparent_70%)] opacity-0 group-hover/logo:opacity-25 transition-opacity duration-300 blur-sm rounded-full" />

                                  <img
                                    src={encodeURI(brand.logoUrl)}
                                    alt={brand.name}
                                    className="max-h-[70px] max-w-[190px] w-auto h-auto object-contain transition-all duration-500 group-hover/logo:scale-110"
                                    onError={(e) => {
                                      e.currentTarget.style.display = 'none'
                                      if (e.currentTarget.parentElement) {
                                        e.currentTarget.parentElement.innerHTML = `<span class="font-serif font-bold text-lg text-neutral-800 tracking-tight hover:scale-110 transition-transform">${brand.name}</span>`
                                      }
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </RevealSection>
                  )
                })
              )}
            </div>
          )}

          {/* GRID VIEW MODE */}
          {viewMode === 'grid' && (
            <div className="space-y-16">
              {filteredGroups.map((group) => (
                <div key={group.id} className="space-y-8">
                  <div className="border-b border-neutral-200 pb-3">
                    <span className="font-mono text-xs text-[#b89768] uppercase tracking-[0.2em] font-bold block mb-1">
                      {group.shortTitle}
                    </span>
                    <h2 className="font-serif text-lg md:text-xl font-medium text-neutral-900">
                      {group.title}
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {group.brands.map((brand) => (
                      <div
                        key={brand.name}
                        onClick={() => setSelectedBrand(brand)}
                        className="p-6 bg-neutral-50 hover:bg-white border border-neutral-200 hover:border-[#b89768] hover:shadow-xl rounded-2xl flex flex-col items-center justify-center min-h-[140px] cursor-pointer transition-all duration-300 group/gridcard"
                      >
                        <img
                          src={encodeURI(brand.logoUrl)}
                          alt={brand.name}
                          className="h-14 max-w-full object-contain opacity-85 group-hover/gridcard:opacity-100 group-hover/gridcard:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Floating Speed & Movement Control Dock */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-neutral-900/90 backdrop-blur-md border border-neutral-700/80 text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-4 text-xs font-mono select-none">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 hover:text-[#b89768] transition-colors cursor-pointer"
            title={isPlaying ? 'Pause Auto Scroll' : 'Play Auto Scroll'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#b89768]" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#b89768]" /> Play
              </>
            )}
          </button>

          <span className="w-px h-4 bg-neutral-700" />

          <div className="flex items-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[#b89768]" />
            <button
              onClick={() => setSpeed('slow')}
              className={`px-2 py-0.5 rounded transition-all ${
                speed === 'slow' ? 'bg-[#b89768] text-white font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Slow
            </button>
            <button
              onClick={() => setSpeed('normal')}
              className={`px-2 py-0.5 rounded transition-all ${
                speed === 'normal' ? 'bg-[#b89768] text-white font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setSpeed('fast')}
              className={`px-2 py-0.5 rounded transition-all ${
                speed === 'fast' ? 'bg-[#b89768] text-white font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Fast
            </button>
          </div>
        </div>

        {/* Luxury Brand Details Lightbox Modal */}
        {selectedBrand && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div
              className="bg-white text-neutral-900 border border-neutral-200 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200 space-y-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedBrand(null)}
                aria-label="Close dialog"
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-900 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center p-6 bg-neutral-50 rounded-2xl border border-neutral-100">
                <img
                  src={encodeURI(selectedBrand.logoUrl)}
                  alt={selectedBrand.name}
                  className="max-h-24 max-w-full object-contain"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 bg-[#b89768]/15 text-[#b89768] border border-[#b89768]/30 rounded-full font-bold">
                    {selectedBrand.tag || 'Verified Partner'}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-[#b89768]" /> {selectedBrand.origin || 'Certified Partner'}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-neutral-900">
                  {selectedBrand.name}
                </h3>
                <p className="text-xs font-mono uppercase tracking-widest text-[#b89768] font-bold">
                  {selectedBrand.specialty}
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed font-light">
                  {selectedBrand.description || 'Authentic architectural material partner specified in SAID Atelier luxury residences and commercial developments.'}
                </p>
              </div>

            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
