'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock, Filter, User } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { RevealSection, SharpPhotoFrame } from '@/components/ScrollAnimation'

const blogPosts = [
  {
    id: 1,
    title: 'The Art of Natural Light in Modern Hyderabad Villas',
    category: 'Architecture',
    readTime: '6 min read',
    date: 'October 2026',
    author: 'G. Ramesh Goud',
    excerpt: 'How courtyard architecture and strategic skylights transform indoor temperature and ambient mood in South Indian luxury residences.',
    image: '/images/courtyard-residence.png',
    featured: true,
  },
  {
    id: 2,
    title: 'Choosing Between Sintered Italian Marble & Quartz Countertops',
    category: 'Material Study',
    readTime: '5 min read',
    date: 'September 2026',
    author: 'SAID Design Team',
    excerpt: 'A comprehensive technical comparison of porosity, scratch resistance, heat endurance, and maintenance for high-end kitchens.',
    image: '/images/kitchen-detail.png',
  },
  {
    id: 3,
    title: 'Ergonomic Rules for Designing High-Performance Modular Kitchens',
    category: 'Interiors',
    readTime: '7 min read',
    date: 'August 2026',
    author: 'SAID Design Team',
    excerpt: 'From work triangle dynamics to German soft-close mechanisms, discover how to optimize space efficiency without compromising luxury.',
    image: '/images/hero-interior.png',
  },
  {
    id: 4,
    title: 'Designing Executive Commercial Workspaces Post-2025',
    category: 'Commercial',
    readTime: '8 min read',
    date: 'July 2026',
    author: 'G. Ramesh Goud',
    excerpt: 'Combining acoustic warmth, biophilic greenery, and concealed cable infrastructure for high-productivity corporate offices.',
    image: '/images/walnut/walnut_1.jpg',
  },
  {
    id: 5,
    title: 'Bespoke Teak & Veneer Care: Preserving Artisan Joinery',
    category: 'Craftsmanship',
    readTime: '4 min read',
    date: 'June 2026',
    author: 'SAID Joinery Atelier',
    excerpt: 'Essential maintenance practices and Italian PU finish care to keep custom wardrobes and dining tables looking brand new.',
    image: '/images/kitchen-detail.png',
  },
]

const categories = ['All', 'Architecture', 'Material Study', 'Interiors', 'Commercial', 'Craftsmanship']

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter((post) => post.category === selectedCategory)

  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0]

  return (
    <main className="blogs-page min-h-screen w-full bg-[#faf8f5] text-[#171717] selection:bg-[#b89768] selection:text-white flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <div>
        {/* Blogs Hero */}
        <section className="relative py-24 lg:py-32 px-6 md:px-16 border-b border-[#e8e4dc] bg-[#faf8f5]">
          <div className="max-w-[1440px] mx-auto">
            <RevealSection className="max-w-4xl space-y-6">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[#8f6530] block">
                THE JOURNAL &amp; INSIGHTS · SAID
              </span>

              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal text-[#171717] tracking-tight leading-[0.95] mb-8">
                Articles, Trends &amp;<br />
                <i className="font-serif italic text-[#8f6530]">Design Philosophy.</i>
              </h1>

              <p className="text-lg md:text-xl text-[#4e4a43] leading-relaxed font-light max-w-3xl">
                Explore our curated journal on architectural spatial planning, material selection guides, interior styling, and construction craftsmanship written by our lead designers.
              </p>
            </RevealSection>
          </div>
        </section>

        {/* Featured Post Banner */}
        <section className="py-20 px-6 md:px-16 max-w-[1440px] mx-auto w-full border-b border-[#e8e4dc]">
          <RevealSection className="space-y-6">
            <span className="font-sans text-xs text-[#8f6530] uppercase tracking-widest font-bold block">
              FEATURED STORY
            </span>
            <div className="bg-white border border-[#e8e4dc] rounded-xs grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="lg:col-span-7 relative min-h-[360px] sm:min-h-[440px]">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between bg-white space-y-6">
                <div>
                  <div className="flex items-center gap-4 text-xs font-sans text-[#8f6530] uppercase font-bold mb-4">
                    <span>{featuredPost.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}</span>
                  </div>
                  <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#171717] mb-4 hover:text-[#8f6530] transition-colors cursor-pointer leading-snug">
                    {featuredPost.title}
                  </h2>
                  <p className="text-sm text-[#4e4a43] leading-relaxed font-normal">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#e8e4dc] flex items-center justify-between">
                  <span className="text-xs font-sans text-[#666055] flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#8f6530]" /> By {featuredPost.author}
                  </span>
                  <button className="text-xs font-sans uppercase tracking-widest font-bold text-[#8f6530] flex items-center gap-1.5 hover:text-[#171717] transition-colors">
                    Read Article <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* Category Filters + Grid */}
        <section className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 border-b border-[#e8e4dc] pb-8">
            <span className="font-sans text-xs uppercase tracking-widest text-[#171717] font-bold flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#8f6530]" /> Filter By Topic:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs uppercase tracking-widest font-sans font-bold rounded-full border transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#8f6530] text-white border-[#8f6530]'
                      : 'bg-white text-[#171717] border-[#e8e4dc] hover:border-[#8f6530]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post) => (
              <RevealSection key={post.id}>
                <div className="bg-white border border-[#e8e4dc] hover:border-[#8f6530] transition-all duration-300 hover:shadow-xl rounded-xs flex flex-col justify-between h-full group">
                  <div>
                    <SharpPhotoFrame badgeText={post.category} className="w-full aspect-[16/10]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </SharpPhotoFrame>
                    <div className="p-8 space-y-4">
                      <div className="flex items-center justify-between text-[11px] font-sans text-[#8f6530] uppercase font-bold">
                        <span>{post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                      </div>
                      <h3 className="font-serif text-2xl font-normal text-[#171717] group-hover:text-[#8f6530] transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#4e4a43] leading-relaxed font-normal">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="px-8 pb-8 pt-0 flex items-center justify-between font-sans text-xs text-[#8f6530] font-semibold border-t border-[#faf8f5] mt-4">
                    <span>By {post.author}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
