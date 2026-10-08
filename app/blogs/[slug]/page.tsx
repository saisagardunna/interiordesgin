import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  Clock,
  Share2,
  Tag,
  User,
  CheckCircle2,
  Quote,
  ChevronRight,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { RevealSection, SharpPhotoFrame, StaggerContainer, StaggerItem } from '@/components/ScrollAnimation'
import { blogPostsData, getBlogPostBySlug, getAllBlogSlugs } from '@/lib/blogsData'

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = getBlogPostBySlug(resolvedParams.slug)

  if (!post) {
    return {
      title: 'Article Not Found | SAID Studio Journal',
    }
  }

  return {
    title: `${post.title} | SAID Studio Architectural Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  }
}

export default async function BlogArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = getBlogPostBySlug(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  // Related articles (excluding current post)
  const relatedPosts = blogPostsData.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <main className="blog-detail-page min-h-screen w-full bg-[#faf8f5] text-[#171717] selection:bg-[#b89768] selection:text-white flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <div>
        {/* Article Breadcrumbs & Header */}
        <section className="pt-24 pb-16 px-6 md:px-16 border-b border-[#e8e4dc] bg-[#faf8f5]">
          <div className="max-w-[1440px] mx-auto space-y-6">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-sans text-[#8f6530] font-semibold tracking-wider">
              <Link href="/" className="hover:text-[#171717] transition-colors">HOME</Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#bbb]" />
              <Link href="/blogs" className="hover:text-[#171717] transition-colors">JOURNAL</Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#bbb]" />
              <span className="text-[#2d2a25] uppercase font-bold">{post.category}</span>
            </div>

            <div className="max-w-4xl space-y-6">
              <div className="flex flex-wrap items-center gap-4 text-xs font-sans font-bold text-[#8f6530]">
                <span className="bg-[#8f6530] text-white px-3 py-1 rounded-full uppercase tracking-widest">
                  {post.category}
                </span>
                <span className="flex items-center gap-1.5 text-[#2d2a25]">
                  <Calendar className="w-3.5 h-3.5 text-[#8f6530]" /> {post.date}
                </span>
                <span className="text-[#ccc]">•</span>
                <span className="flex items-center gap-1.5 text-[#2d2a25]">
                  <Clock className="w-3.5 h-3.5 text-[#8f6530]" /> {post.readTime}
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#171717] leading-[1.15] tracking-tight">
                {post.title}
              </h1>

              {post.content.subtitle && (
                <p className="text-lg md:text-2xl text-[#2d2a25] leading-relaxed font-light italic border-l-2 border-[#8f6530] pl-6 py-1">
                  {post.content.subtitle}
                </p>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-[#e8e4dc]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#8f6530] text-white flex items-center justify-center font-serif text-lg font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <span className="block text-sm font-sans font-bold text-[#171717]">{post.author}</span>
                    <span className="block text-xs font-sans text-[#8f6530]">{post.authorRole}</span>
                  </div>
                </div>

                <Link
                  href="/blogs"
                  className="text-xs uppercase tracking-widest font-bold text-[#8f6530] hover:text-[#171717] flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Back To Journal
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Feature Image */}
        <section className="py-12 px-6 md:px-16 max-w-[1440px] mx-auto">
          <SharpPhotoFrame badgeText={`SAID JOURNAL / ${post.category}`} className="w-full aspect-[21/9] min-h-[360px] sm:min-h-[500px] rounded-xs shadow-xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover"
            />
          </SharpPhotoFrame>
        </section>

        {/* Main Body Content */}
        <section className="py-16 px-6 md:px-16 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Main Article Body */}
            <article className="lg:col-span-8 space-y-12 bg-white p-8 md:p-14 border border-[#e8e4dc] rounded-xs shadow-sm">
              {/* Introduction */}
              <div className="space-y-4">
                <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[#8f6530] block">
                  ARCHITECTURAL PERSPECTIVE
                </span>
                <p className="text-base sm:text-lg text-[#2d2a25] leading-relaxed font-normal">
                  {post.content.introduction}
                </p>
              </div>

              {/* Sections */}
              {post.content.sections.map((section, index) => (
                <div key={index} className="space-y-5 pt-8 border-t border-[#e8e4dc]">
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#171717] leading-snug">
                    {section.heading}
                  </h2>
                  <p className="text-base text-[#2d2a25] leading-relaxed">
                    {section.body}
                  </p>

                  {section.quote && (
                    <div className="bg-[#faf8f5] p-6 border-l-4 border-[#8f6530] rounded-xs my-6 space-y-2">
                      <Quote className="w-6 h-6 text-[#8f6530] opacity-80" />
                      <p className="font-serif text-lg md:text-xl text-[#171717] italic leading-snug">
                        {section.quote}
                      </p>
                    </div>
                  )}

                  {section.listItems && section.listItems.length > 0 && (
                    <div className="bg-[#faf8f5] p-6 border border-[#e8e4dc] rounded-xs space-y-3 my-6">
                      <span className="font-sans text-xs text-[#8f6530] uppercase font-bold tracking-widest block mb-2">
                        KEY TECHNICAL SPECIFICATIONS &amp; INSIGHTS
                      </span>
                      <ul className="space-y-2.5">
                        {section.listItems.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-[#2d2a25]">
                            <CheckCircle2 className="w-4 h-4 text-[#8f6530] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}

              {/* Key Takeaways Box */}
              {post.content.keyTakeaways && (
                <div className="bg-[#181715] text-[#f4efe6] p-8 rounded-xs space-y-4 border border-[#2e2a24] mt-12">
                  <span className="font-sans text-xs uppercase tracking-[0.25em] font-bold text-[#b89768] block">
                    SUMMARY TAKEAWAYS FOR HOMEOWNERS &amp; VILLA CLIENTS
                  </span>
                  <ul className="space-y-3">
                    {post.content.keyTakeaways.map((takeaway, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-[#dcd7cb] leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-[#8f6530] text-white flex items-center justify-center font-mono text-xs shrink-0 mt-0.5 font-bold">
                          0{i + 1}
                        </span>
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags & Footer Meta */}
              <div className="pt-8 border-t border-[#e8e4dc] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-[#8f6530]" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#faf8f5] border border-[#e8e4dc] text-[11px] font-sans text-[#666055] rounded-full uppercase tracking-wider font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-sans text-[#888]">Published:</span>
                  <span className="text-xs font-mono font-bold text-[#8f6530]">{post.date}</span>
                </div>
              </div>
            </article>

            {/* Sidebar Sticky Panel */}
            <aside className="lg:col-span-4 space-y-8">
              {/* Author Atelier Profile Card */}
              <div className="bg-white p-8 border border-[#e8e4dc] rounded-xs space-y-5 shadow-sm sticky top-28">
                <span className="font-sans text-xs text-[#8f6530] uppercase tracking-widest font-bold block">
                  WRITTEN BY
                </span>
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#8f6530] text-white flex items-center justify-center font-serif text-2xl font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-normal text-[#171717]">{post.author}</h4>
                    <p className="text-xs font-sans text-[#8f6530] font-semibold">{post.authorRole}</p>
                  </div>
                </div>

                <p className="text-xs text-[#2d2a25] leading-relaxed">
                  SAID Studio shaping deeply personal residential villas, commercial workplaces, and architectural interiors across South India.
                </p>

                <div className="pt-4 border-t border-[#e8e4dc] space-y-3">
                  <span className="font-sans text-[11px] text-[#888] uppercase tracking-wider block font-bold">
                    WANT A CUSTOM CONSULTATION?
                  </span>
                  <p className="text-xs text-[#2d2a25]">
                    Discuss spatial planning, material palettes, or 3D visualization for your upcoming residence or workspace.
                  </p>
                  <Link
                    href="/contact"
                    className="w-full bg-[#8f6530] text-white py-3.5 px-4 font-sans text-xs uppercase tracking-widest font-bold inline-flex items-center justify-center gap-2 hover:bg-[#724f24] transition-colors rounded-xs shadow-md"
                  >
                    Schedule Consultation <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* Related Journal Articles */}
        <section className="py-24 px-6 md:px-16 bg-white border-t border-[#e8e4dc]">
          <div className="max-w-[1440px] mx-auto space-y-12">
            <RevealSection className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <span className="font-sans text-xs text-[#8f6530] uppercase tracking-[0.2em] font-bold block mb-2">
                  MORE FROM THE JOURNAL
                </span>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#171717]">
                  Related <i className="font-serif italic text-[#8f6530]">Articles</i>
                </h2>
              </div>
              <Link
                href="/blogs"
                className="font-sans text-xs uppercase tracking-widest font-bold text-[#8f6530] flex items-center gap-1 hover:text-[#171717] transition-colors"
              >
                View All Journal Articles <ArrowUpRight className="w-4 h-4" />
              </Link>
            </RevealSection>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.1}>
              {relatedPosts.map((rel) => (
                <StaggerItem key={rel.slug}>
                  <Link href={`/blogs/${rel.slug}`} className="group block bg-[#faf8f5] p-6 border border-[#e8e4dc] hover:border-[#8f6530] transition-all rounded-xs hover:shadow-lg h-full flex flex-col justify-between">
                    <div>
                      <SharpPhotoFrame badgeText={rel.category} className="w-full aspect-[16/10] mb-5">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </SharpPhotoFrame>
                      <div className="flex items-center justify-between text-[11px] font-sans text-[#8f6530] uppercase font-bold mb-3">
                        <span>{rel.date}</span>
                        <span>{rel.readTime}</span>
                      </div>
                      <h3 className="font-serif text-xl font-normal text-[#171717] group-hover:text-[#8f6530] transition-colors leading-snug mb-3">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-[#4e4a43] leading-relaxed line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 mt-6 border-t border-[#e8e4dc] flex items-center justify-between text-xs font-sans text-[#8f6530] font-bold">
                      <span>Read Story</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
