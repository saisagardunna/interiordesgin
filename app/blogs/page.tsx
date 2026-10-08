'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock, Filter, Search, User } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { RevealSection, SharpPhotoFrame } from '@/components/ScrollAnimation'
import { blogPostsData } from '@/lib/blogsData'

const categories = ['All', 'Architecture', 'Material Study', 'Interiors', 'Commercial', 'Craftsmanship']

export default function BlogsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = blogPostsData.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch =
      searchQuery.trim() === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  const featuredPost = blogPostsData.find((p) => p.featured) || blogPostsData[0]

  return (
    <main className="blogs-page min-h-screen w-full bg-[#faf8f5] text-[#171717] selection:bg-[#b89768] selection:text-white flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <div>
        {/* Blogs Hero */}
        <section className="relative py-24 lg:py-32 px-6 md:px-16 border-b border-[#e8e4dc] bg-[#faf8f5]">
          <div className="max-w-[1440px] mx-auto">
            <RevealSection className="max-w-4xl space-y-6">
              <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#8f6530] block">
                THE JOURNAL &amp; INSIGHTS · SAID
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] tracking-tight leading-[1.1] mb-8">
                Articles, Insights &amp;<br />
                <i className="font-serif italic text-[#8f6530]">Design Philosophy.</i>
              </h1>

              <p className="text-lg md:text-xl text-[#2d2a25] leading-relaxed font-light max-w-3xl">
                Explore our curated journal on architectural spatial planning, material selection guides, interior styling, and construction craftsmanship written by our lead designers.
              </p>
            </RevealSection>
          </div>
        </section>

        {/* Featured Post Banner */}
        <section className="py-20 px-6 md:px-16 max-w-[1440px] mx-auto w-full border-b border-[#e8e4dc]">
          <RevealSection className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="font-sans text-xs text-[#8f6530] uppercase tracking-widest font-bold block">
                FEATURED STORY
              </span>
              <span className="font-mono text-xs text-[#888]">Updated Real-Time · {featuredPost.date}</span>
            </div>

            <div className="bg-white border border-[#e8e4dc] rounded-xs grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-lg hover:shadow-xl transition-all group">
              <Link href={`/blogs/${featuredPost.slug}`} className="lg:col-span-7 relative min-h-[360px] sm:min-h-[440px] block overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </Link>

              <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between bg-white space-y-6">
                <div>
                  <div className="flex items-center gap-4 text-xs font-sans text-[#8f6530] uppercase font-bold mb-4">
                    <span>{featuredPost.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}</span>
                  </div>

                  <Link href={`/blogs/${featuredPost.slug}`}>
                    <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#171717] mb-4 group-hover:text-[#8f6530] transition-colors leading-snug">
                      {featuredPost.title}
                    </h2>
                  </Link>

                  <p className="text-sm text-[#2d2a25] leading-relaxed font-normal mb-4">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#e8e4dc] flex items-center justify-between">
                  <span className="text-xs font-sans text-[#2d2a25] flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#8f6530]" /> {featuredPost.author}
                  </span>
                  <Link
                    href={`/blogs/${featuredPost.slug}`}
                    className="text-xs font-sans uppercase tracking-widest font-bold text-[#8f6530] flex items-center gap-1.5 hover:text-[#171717] transition-colors"
                  >
                    Read Full Article <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* Category Filters + Search Bar */}
        <section className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-16 border-b border-[#e8e4dc] pb-8">
            {/* Categories */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              <span className="font-sans text-xs uppercase tracking-widest text-[#171717] font-bold flex items-center gap-2 shrink-0 mr-2">
                <Filter className="w-4 h-4 text-[#8f6530]" /> Filter Topic:
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-xs uppercase tracking-widest font-sans font-bold rounded-full border transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#8f6530] text-white border-[#8f6530] shadow-sm'
                        : 'bg-white text-[#171717] border-[#e8e4dc] hover:border-[#8f6530]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Search input */}
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-[#888] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by keyword..."
                className="w-full bg-white border border-[#e8e4dc] pl-10 pr-4 py-2.5 text-xs text-[#171717] rounded-full focus:border-[#8f6530] focus:outline-none shadow-sm placeholder:text-[#888]"
              />
            </div>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-16 bg-white border border-[#e8e4dc] rounded-xs p-8 space-y-4">
              <p className="font-serif text-2xl text-[#171717]">No journal articles found matching "{searchQuery}"</p>
              <button
                onClick={() => {
                  setSelectedCategory('All')
                  setSearchQuery('')
                }}
                className="text-xs uppercase tracking-widest text-[#8f6530] font-bold underline"
              >
                Reset Topic Filters &amp; Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredPosts.map((post) => (
                <RevealSection key={post.slug}>
                  <article className="bg-white border border-[#e8e4dc] hover:border-[#8f6530] transition-all duration-300 hover:shadow-xl rounded-xs flex flex-col justify-between h-full group">
                    <div>
                      <Link href={`/blogs/${post.slug}`}>
                        <SharpPhotoFrame badgeText={post.category} className="w-full aspect-[16/10]">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                        </SharpPhotoFrame>
                      </Link>

                      <div className="p-8 space-y-4">
                        <div className="flex items-center justify-between text-[11px] font-sans text-[#8f6530] uppercase font-bold">
                          <span>{post.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                        </div>

                        <Link href={`/blogs/${post.slug}`}>
                          <h3 className="font-serif text-2xl font-normal text-[#171717] group-hover:text-[#8f6530] transition-colors leading-snug">
                            {post.title}
                          </h3>
                        </Link>

                        <p className="text-xs text-[#2d2a25] leading-relaxed font-normal">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-8 pb-8 pt-4 flex items-center justify-between font-sans text-xs text-[#8f6530] font-bold border-t border-[#faf8f5] mt-4">
                      <span className="text-[#2d2a25] font-semibold">By {post.author}</span>
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="inline-flex items-center gap-1 text-[#8f6530] hover:text-[#171717] transition-colors"
                      >
                        Read Article <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </article>
                </RevealSection>
              ))}
            </div>
          )}
        </section>
      </div>

      <Footer />
    </main>
  )
}
