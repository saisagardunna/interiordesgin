export const siteConfig = {
  name: 'SAID Studio',
  fullName: 'Satwika Architecture & Interior Design',
  tagline: 'Spaces designed to belong.',
  contactEmail: 'Say@said.archi',
  contactPhone: '+91 99080 01558',
  location: 'Block 21, F-1, Vignanpuri Colony, Vidya Nagar, Hyderabad - 44',
  instagram: 'https://instagram.com/saidsays_',
  youtube: 'https://youtube.com/@ArchitectsandInteriorDesigners',

  // Centralized Image Configuration (Easy for replacement)
  assets: {
    hero: {
      main: '/images/courtyard-residence.png',
      alt: 'Luxury Architectural Residence Entrance',
    },
    featuredProject: {
      image: '/images/hero-interior.png',
      title: 'ERA RESIDENCE',
      meta: 'PRIVATE RESIDENCE · GOA / INDIA · 2026',
      alt: 'Era Residence Living Space',
    },
    projectStory: {
      image: '/images/kitchen-detail.png',
      title: 'A RESIDENCE DESIGNED AROUND LIGHT',
      alt: 'Custom Kitchen and Material Detail',
    },
    fullBleed: {
      image: '/images/courtyard-residence.png',
      title: 'THE COAST',
      subtitle: 'PRIVATE RESIDENCE · VIZAG',
      alt: 'Coastal Architecture View',
    },
    collage: [
      { src: '/images/hero-interior.png', alt: 'Living Room Architecture', aspect: '4/3' },
      { src: '/images/kitchen-detail.png', alt: 'Material and Joinery Detail', aspect: '4/5' },
      { src: '/images/courtyard-residence.png', alt: 'Interior Courtyard Light', aspect: '16/10' },
    ],
    about: {
      image: '/images/hero-interior.png',
      alt: 'SAID Studio Interior Space',
    },
    frames: {
      prefix: '/frames/frame_',
      extension: '.jpg',
      totalFrames: 90,
      digits: 3,
    },
  },

  projects: [
    {
      id: '01',
      title: 'The Courtyard Residence',
      category: 'Residential',
      meta: 'Hyderabad · Residential · 2026',
      image: '/images/courtyard-residence.png',
      widthClass: 'col-span-12 lg:col-span-8',
      aspectRatio: 'aspect-[16/10]',
      slug: 'the-courtyard-residence',
    },
    {
      id: '02',
      title: 'The Walnut Office',
      category: 'Commercial',
      meta: 'Bengaluru · Commercial · 2026',
      image: '/images/hero-interior.png',
      widthClass: 'col-span-12 lg:col-span-4',
      aspectRatio: 'aspect-[4/5]',
      slug: 'the-walnut-office',
    },
    {
      id: '03',
      title: 'The Stone Kitchen',
      category: 'Residential',
      meta: 'Vizag · Residential · 2026',
      image: '/images/kitchen-detail.png',
      widthClass: 'col-span-12 lg:col-span-5',
      aspectRatio: 'aspect-[4/3]',
      slug: 'the-stone-kitchen',
    },
    {
      id: '04',
      title: 'The Quiet Retreat',
      category: 'Residential',
      meta: 'Hyderabad · Residential · 2026',
      image: '/images/hero-interior.png',
      widthClass: 'col-span-12 lg:col-span-7',
      aspectRatio: 'aspect-[16/10]',
      slug: 'the-quiet-retreat',
    },
  ],

  services: [
    { id: '01', title: 'ARCHITECTURE', desc: 'Comprehensive residential and commercial architectural design from concept through execution.' },
    { id: '02', title: 'INTERIOR DESIGN', desc: 'Curation of materials, lighting, bespoke furniture, and spatial flow.' },
    { id: '03', title: 'SPACE PLANNING', desc: 'Optimizing spatial proportions, movement, and functional harmony.' },
    { id: '04', title: 'PROJECT CONSULTING', desc: 'Turnkey interior execution, technical details, and site supervision.' },
  ],

  processSteps: [
    { no: '01', title: 'DISCOVER', copy: 'Understanding brief, rhythms, light orientation, and lifestyle.' },
    { no: '02', title: 'DEFINE', copy: 'Spatial flow diagrams, material boards, and architectural vision.' },
    { no: '03', title: 'DESIGN', copy: 'Precision 3D modeling, lighting plans, and bespoke furniture details.' },
    { no: '04', title: 'DETAIL', copy: 'Exacting material sourcing, custom joinery, and technical specifications.' },
    { no: '05', title: 'DELIVER', copy: 'One calm, accountable team managing execution to final handover.' },
  ],

  testimonial: {
    quote: '“EVERY DETAIL FELT INTENTIONAL AND CRAFTED AROUND THE WAY WE LIVE.”',
    author: 'Private Residence Client',
    location: 'Hyderabad',
  },
} as const
