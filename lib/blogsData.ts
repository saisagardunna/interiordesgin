export interface BlogPost {
  slug: string
  title: string
  category: string
  readTime: string
  date: string
  isoDate: string
  author: string
  authorRole: string
  excerpt: string
  image: string
  featured?: boolean
  tags: string[]
  content: {
    subtitle?: string
    introduction: string
    sections: {
      heading: string
      body: string
      quote?: string
      listItems?: string[]
    }[]
    keyTakeaways?: string[]
  }
}

export const blogPostsData: BlogPost[] = [
  {
    slug: 'the-art-of-natural-light-hyderabad-villas',
    title: 'The Art of Natural Light in Modern Hyderabad Villas',
    category: 'Architecture',
    readTime: '6 min read',
    date: 'October 8, 2026',
    isoDate: '2026-10-08',
    author: 'G. Ramesh Goud',
    authorRole: 'Principal Architect, SAID Atelier',
    excerpt: 'How courtyard architecture, strategic skylights, and double-height volumes transform indoor temperature and ambient mood in South Indian luxury residences.',
    image: '/images/courtyard-residence.png',
    featured: true,
    tags: ['Architecture', 'Courtyard Design', 'Natural Daylight', 'Passive Cooling', 'Hyderabad Luxury'],
    content: {
      subtitle: 'Harmonizing sunlight, courtyard microclimates, and architectural shade in contemporary South Indian homes.',
      introduction: 'In luxury residential architecture across Hyderabad and South India, natural daylight is far more than an aesthetic preference—it is a fundamental building block of spatial well-being. When designed thoughtfully, daylight animates interior materials, regulates internal temperatures naturally, and creates quiet thresholds between outdoor nature and indoor living.',
      sections: [
        {
          heading: '01 / The Central Courtyard: Microclimatic Cooling & Light Shafts',
          body: 'Courtyard architecture has deep roots in traditional South Indian homes. At SAID Studio, we reimagine the classical courtyard (Ankanam) through contemporary geometric framing and double-glazed thermal glass enclosures. A central courtyard acts as a thermal chimney—pulling warm air upward and inviting cool garden breezes into living rooms and dining areas below.',
          quote: '“Architecture is the learned game, correct and magnificent, of forms assembled in the light. A courtyard turns daylight into a living sculpture that changes with every hour.”',
          listItems: [
            'Stack ventilation: Hot air vents through high skylight louvers, maintaining a cool ground-floor breeze.',
            'Diffused ambient lighting: Reduces dependency on artificial lighting during peak morning and afternoon hours.',
            'Visual greenery connection: Brings inner garden sanctuaries directly into private family lounges.'
          ]
        },
        {
          heading: '02 / Strategic Skylights & High-Performance Glazing',
          body: 'Direct sun in tropical climates can create harsh glare and thermal discomfort if unmanaged. We strategically position glass skylights over staircases, dining corridors, and double-height living spaces using Low-E insulated glass units. This reflects infrared solar heat while allowing soft, golden ambient light to fill the core of the residence.',
          listItems: [
            'Low-emissivity (Low-E) double glazing to minimize heat transfer.',
            'Motorized acoustic timber louvers for adjustable afternoon shading.',
            'Custom perimeter LED channels to softly illuminate skylight wells after sunset.'
          ]
        },
        {
          heading: '03 / Terracotta Baffles & Slatted Teak Sunscreens',
          body: 'To protect west-facing glass facades in Hyderabad summer months, SAID integrates vertical terracotta fins, natural stone jali screens, and slatted teak louvers. These architectural elements cast intricate shadow patterns across Italian marble floors, turning sunlight into a daily visual ritual.',
          quote: '“By filtering sunlight through natural teak louvers, spaces gain warmth without heat gain.”'
        }
      ],
      keyTakeaways: [
        'Orient primary living spaces to capture morning north-east daylight while shading harsh south-west afternoon heat.',
        'Use double-height courtyard voids to enable natural air movement and reduce air-conditioning load.',
        'Pair natural stone finishes with warm 2700K ambient cove lighting to seamlessly transition from daylight to evening warmth.'
      ]
    }
  },
  {
    slug: 'sintered-italian-marble-vs-quartz-kitchens',
    title: 'Choosing Between Sintered Italian Marble & Quartz Countertops',
    category: 'Material Study',
    readTime: '5 min read',
    date: 'September 24, 2026',
    isoDate: '2026-09-24',
    author: 'SAID Design Atelier',
    authorRole: 'Materials & Specifications Division',
    excerpt: 'A comprehensive technical comparison of porosity, scratch resistance, heat endurance, and maintenance for high-end luxury kitchens.',
    image: '/images/kitchen-detail.png',
    featured: false,
    tags: ['Material Study', 'Italian Marble', 'Quartz Countertops', 'Luxury Kitchens', 'Joinery'],
    content: {
      subtitle: 'Evaluating luxury, durability, and daily maintenance for high-performance culinary spaces.',
      introduction: 'Selecting the ideal countertop surface for a bespoke kitchen is one of the most critical material decisions in residential interior architecture. While Italian marble offers unmatched organic beauty, engineered quartz and sintered stone provide technical resilience. Here is our architectural comparison guide to help you choose the right material for your lifestyle.',
      sections: [
        {
          heading: '01 / Italian Marble: Organic Elegance & Tactile Heritage',
          body: 'Natural Italian marbles such as Statuario, Calacatta, and Botticino bring unmatched elegance and unique veining to kitchen islands and dining surfaces. However, as a calcium carbonate natural stone, marble is naturally porous and sensitive to acidic spills like lemon juice, turmeric, or wine.',
          quote: '“Italian marble brings a living soul to a home. Every slab tells a geological story millions of years in the making.”',
          listItems: [
            'Requires penetrating sealer application every 6 to 12 months.',
            'Ideal for breakfast counters, dry kitchen displays, and wall cladding.',
            'Honed finishes mask micro-scratches better than high-gloss polishes.'
          ]
        },
        {
          heading: '02 / Engineered Quartz & Sintered Stone: High-Performance Resilience',
          body: 'Engineered quartz surfaces consist of 90-93% natural quartz crystals bound with resin polymers. Sintered stone (like Dekton or Neolith) undergoes extreme heat and pressure to mimic natural metamorphism. Both materials offer non-porous surfaces that are virtually impervious to turmeric staining, oil spills, and knife scratches.',
          listItems: [
            'Zero porosity: Eliminates bacteria absorption and mustard/turmeric staining.',
            'High heat endurance: Sintered stone withstands hot cookware placed directly on the counter.',
            'Seamless book-matched veining available for waterfall island edges.'
          ]
        },
        {
          heading: '03 / SAID Studio Architectural Recommendation',
          body: 'For modern luxury residences, SAID Studio frequently crafts a dual-zone kitchen strategy: utilizing ultra-durable sintered quartz for heavy-prep wet kitchens, paired with book-matched Italian Statuario marble for the central island and formal dining display.',
        }
      ],
      keyTakeaways: [
        'Use sintered stone or quartz for heavy Indian cooking prep zones where turmeric and oil are used frequently.',
        'Choose sealed Italian marble for low-impact accent islands, pantry counters, and backdrop cladding.',
        'Insist on mitered edge fabrication with subtle chamfering to prevent chipping along sink cutouts.'
      ]
    }
  },
  {
    slug: 'ergonomic-rules-high-performance-modular-kitchens',
    title: 'Ergonomic Rules for Designing High-Performance Modular Kitchens',
    category: 'Interiors',
    readTime: '7 min read',
    date: 'August 15, 2026',
    isoDate: '2026-08-15',
    author: 'SAID Design Atelier',
    authorRole: 'Interior Architecture Division',
    excerpt: 'From work triangle dynamics to German Blum hardware, discover how spatial flow optimizes daily culinary efficiency without compromising luxury.',
    image: '/images/hero-interior.png',
    featured: false,
    tags: ['Interiors', 'Modular Kitchens', 'Ergonomics', 'Blum Hardware', 'Space Planning'],
    content: {
      subtitle: 'Optimizing movement, storage accessibility, and hardware precision in contemporary kitchens.',
      introduction: 'A truly luxurious kitchen is measured not only by its stone surfaces and wood veneers, but by how effortlessly it moves around the user. Ergonomic interior architecture ensures that cooking, cleaning, and hosting feel fluid, structured, and enjoyable.',
      sections: [
        {
          heading: '01 / The Ergonomic Work Triangle & Zone Planning',
          body: 'The golden rule of kitchen spatial planning relies on the distance between three core elements: the hob (cooking), the sink (cleaning), and the refrigerator (storage). The sum of these three legs should ideally measure between 12 to 26 feet, ensuring effortless transitions without unnecessary steps.',
          quote: '“Good kitchen ergonomics reduces physical strain by 40% and keeps countertop surfaces clear and calm.”',
          listItems: [
            'Prep Zone: Minimum 36 inches of uninterrupted counter space between sink and hob.',
            'Consumable Zone: Refrigerator situated near the entrance for easy access without interrupting the cook.',
            'Cleaning Zone: Integrated dishwasher positioned adjacent to the main sink bowl.'
          ]
        },
        {
          heading: '02 / HDMR Moisture Resistance & Hardware Precision',
          body: 'Given South Indian cooking humidity and water exposure, kitchen carcasses must utilize High-Density Moisture-Resistant (HDMR) green ply boards with polyurethane edge-banding. For drawer runners and lift-up wall cabinets, SAID integrates Blum Legrabox and Aventos systems for silent, soft-closing operation.',
          listItems: [
            'Blum Servo-Drive electronic opening for hands-free waste bin access.',
            'Full-extension tandem drawers supporting up to 70kg of cookware.',
            'Corner carousel units and tall pantry pull-out columns for max storage.'
          ]
        },
        {
          heading: '03 / Task Lighting & Countertop Illumination',
          body: 'Ceiling downlights alone cast shadows over workspace prep areas. We incorporate concealed warm-white (3000K) continuous LED profile channels beneath overhead cabinets, illuminating countertops evenly without glare.',
        }
      ],
      keyTakeaways: [
        'Maintain a 36-inch minimum clearance between island counters and main kitchen cabinets for dual-person movement.',
        'Use HDMR grade carcasses with 1mm factory edge-banding to prevent water swelling.',
        'Incorporate under-cabinet LED task lights to ensure shadow-free prep surfaces.'
      ]
    }
  },
  {
    slug: 'executive-workspaces-biophilic-acoustic-design',
    title: 'Designing Executive Commercial Workspaces Post-2026',
    category: 'Commercial',
    readTime: '8 min read',
    date: 'July 12, 2026',
    isoDate: '2026-07-12',
    author: 'G. Ramesh Goud',
    authorRole: 'Principal Architect, SAID Atelier',
    excerpt: 'Combining acoustic timber baffles, biophilic greenery, and concealed cable infrastructure for high-productivity corporate offices.',
    image: '/images/walnut/walnut_1.jpg',
    featured: false,
    tags: ['Commercial', 'Executive Office', 'Acoustics', 'Biophilic Design', 'Hyderabad Architecture'],
    content: {
      subtitle: 'Creating corporate environments that blend acoustic calm, executive hospitality, and warm timber palettes.',
      introduction: 'Corporate workspaces have evolved from rigid cubicle grids into calm, hospitality-inspired environments. At SAID Studio, our commercial interior projects—such as The Walnut Office and Sri BioAesthetics Executive Suites—focus on acoustic quietness, organic materials, and intuitive technology integration.',
      sections: [
        {
          heading: '01 / Acoustic Engineering with Natural Timber Baffles',
          body: 'Open office noise causes cognitive fatigue. By deploying micro-perforated acoustic timber panels and suspended ceiling baffles, we achieve optimal sound reverberation control (NRC > 0.85). Conference boardrooms are further insulated with double-glazed acoustic glass walls and acoustic fabric wall paneling.',
          quote: '“A quiet office inspires deep concentration. Acoustics should be felt through calm, not seen through heavy padding.”',
          listItems: [
            'Micro-perforated wood veneer paneling absorbing ambient voice reflections.',
            'Drop-down perimeter door seals to prevent sound leakage into corridors.',
            'Acoustic felt ceiling baffles integrated with linear magnetic tracking lights.'
          ]
        },
        {
          heading: '02 / Biophilic Light Integration & Organic Planters',
          body: 'Incorporating living greenery into executive lounges and reception zones enhances air quality and reduces stress. Integrated recessed planters with automated drip irrigation ensure low maintenance while providing natural spatial dividers between department teams.',
        },
        {
          heading: '03 / Concealed Infrastructure & Invisible Power Modules',
          body: 'Clutter-free workspaces require meticulous electrical engineering. We design custom walnut conference tables with pop-up motorized wireless charging docks, concealed HDMI/Type-C channels, and under-floor cable raceways.',
        }
      ],
      keyTakeaways: [
        'Prioritize acoustic control with micro-perforated timber panels in executive boardrooms.',
        'Conceal cable management inside table legs and under-floor raceways for clean aesthetics.',
        'Use warm 3000K LED illumination paired with biophilic greenery to create a welcoming executive atmosphere.'
      ]
    }
  },
  {
    slug: 'bespoke-teak-and-veneer-care-guide',
    title: 'Bespoke Teak & Veneer Care: Preserving Artisan Joinery',
    category: 'Craftsmanship',
    readTime: '4 min read',
    date: 'June 28, 2026',
    isoDate: '2026-06-28',
    author: 'SAID Joinery Atelier',
    authorRole: 'Master Craftsmanship Division',
    excerpt: 'Essential maintenance practices, humidity control, and Italian PU coat protection to keep custom wardrobes and dining tables looking brand new for decades.',
    image: '/images/kitchen-detail.png',
    featured: false,
    tags: ['Craftsmanship', 'Teak Wood', 'Natural Veneer', 'Furniture Maintenance', 'Joinery'],
    content: {
      subtitle: 'Preserving the natural grain, luster, and structural integrity of custom wood joinery.',
      introduction: 'Bespoke natural teak and timber veneer joinery form the heart of SAID Studio’s residential interiors. Natural wood is a living material that responds to ambient humidity and sunlight. Proper care ensures your custom furniture retains its rich tone and tactile warmth for generations.',
      sections: [
        {
          heading: '01 / Italian Polyurethane (PU) Finish Protection',
          body: 'All SAID custom joinery receives multi-coat Italian PU polyurethane finishes (available in dead-matt, silk-matt, or high-gloss). This creates a protective barrier against moisture penetration, micro-scratches, and household spills.',
          quote: '“Respecting natural timber means understanding its grain. A light microfiber wipe preserves decades of artisan polishing.”',
          listItems: [
            'Clean daily with a soft, dry microfiber cloth.',
            'Avoid harsh chemical sprays, ammonia, or abrasive sponges.',
            'Wipe liquid spills immediately along the direction of the wood grain.'
          ]
        },
        {
          heading: '02 / Managing Tropical Humidity & Direct Sunlight',
          body: 'Direct afternoon sunlight can cause natural UV fading or subtle color shift in natural wood veneers over time. Sheer linen drapes or UV-filtered glass help maintain even wood tones across large wardrobe doors and wall paneling.',
        }
      ],
      keyTakeaways: [
        'Use microfiber cloths for daily dusting without scratching PU coats.',
        'Apply high-grade beeswax polish once every 12 months for unsealed natural teak furniture.',
        'Shield solid wood dining tables from direct hot pans using felt or cork coasters.'
      ]
    }
  }
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPostsData.find((p) => p.slug === slug)
}

export function getAllBlogSlugs(): string[] {
  return blogPostsData.map((p) => p.slug)
}
