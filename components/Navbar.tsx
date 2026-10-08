'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const navItems = [
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Our Services', href: '/services' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Testimonials', href: '/testimonials' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'About Us', href: '/about' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const isActive = (href: string) => {
    if (href === '/portfolio' && (pathname === '/portfolio' || pathname === '/projects')) return true
    if (href === '/about' && (pathname === '/about' || pathname === '/about-us')) return true
    return pathname === href
  }

  return (
    <>
      <header className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#e8e4dc] shadow-md'
          : 'bg-white border-b border-[#e8e4dc] shadow-sm'
      }`}>
        {/* Top Logo & Title Bar */}
        <div className={`max-w-[1440px] mx-auto px-6 flex items-center justify-between relative transition-all duration-300 ${
          scrolled ? 'py-1.5 min-h-[50px]' : 'py-3 min-h-[66px]'
        }`}>
          {/* Logo Left */}
          <div className="flex items-center">
            <Link href="/" className="brand-mark flex items-center group" aria-label="Satwika Architecture and Interior Design">
              <motion.img
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.3 }}
                src="/images/satwika-logo.png"
                alt="Satwika Architecture and Interior Design"
                className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-8 md:h-10' : 'h-10 md:h-13'}`}
              />
            </Link>
          </div>

          {/* Center Brand Title */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto">
            <Link href="/" className="flex flex-col items-center group" aria-label="Satwika Interior and Architecture Design">
              <span className={`font-serif tracking-[0.24em] font-medium uppercase text-[#171717] transition-all duration-300 group-hover:text-[#8f6530] ${
                scrolled ? 'text-sm sm:text-base md:text-lg' : 'text-lg sm:text-xl md:text-2xl'
              }`}>
                SATWIKA
              </span>
              <span className={`font-sans tracking-[0.3em] text-[#8f6530] uppercase font-semibold transition-all duration-300 whitespace-nowrap ${
                scrolled ? 'text-[7.5px] sm:text-[8.5px] mt-0' : 'text-[8.5px] sm:text-[9.5px] mt-0.5'
              }`}>
                INTERIOR &amp; ARCHITECTURE DESIGN
              </span>
            </Link>
          </div>

          {/* Mobile Menu Right */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 text-[#171717] hover:text-[#8f6530] transition-colors rounded-full hover:bg-[#faf8f5]"
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Primary Desktop Navigation Bar */}
        <nav className={`hidden lg:flex items-center justify-center border-t border-[#e8e4dc] transition-all duration-300 font-sans text-xs md:text-[13px] uppercase tracking-[0.16em] font-semibold text-[#171717] ${
          scrolled ? 'py-1.5 px-6 bg-white/95 backdrop-blur-md' : 'py-2.5 px-6 bg-white'
        }`}>
          <div className="flex flex-wrap justify-center items-center gap-6 xl:gap-9">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="relative py-1 px-1.5 transition-colors duration-300 group"
                >
                  <span className={`relative z-10 transition-colors ${active ? 'font-bold text-[#8f6530]' : 'text-[#171717] font-semibold group-hover:text-[#8f6530]'}`}>
                    {item.label}
                  </span>

                  {active ? (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8f6530]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : (
                    <span className="absolute bottom-0 left-1/2 right-1/2 h-[2px] bg-[#8f6530] opacity-0 group-hover:left-0 group-hover:right-0 group-hover:opacity-100 transition-all duration-300" />
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Mobile Animated Nav Drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mobile-menu fixed inset-0 z-50 bg-white/98 backdrop-blur-xl text-[#171717] flex flex-col justify-between p-6 sm:p-8 lg:hidden"
            >
              <div className="flex justify-between items-center border-b border-[#e8e4dc] pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8f6530]" />
                  <span className="font-sans text-xs tracking-widest text-[#8f6530] font-bold">SAID NAVIGATION</span>
                </div>
                <button onClick={closeMenu} className="p-2 text-[#171717] hover:text-[#8f6530] transition-colors rounded-full bg-[#faf8f5]">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-3 my-auto font-serif text-xl sm:text-2xl overflow-y-auto py-6">
                {navItems.map((item, idx) => {
                  const active = isActive(item.href)
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className={`border-b border-[#e8e4dc]/60 pb-3 flex items-center justify-between transition-colors ${
                          active ? 'text-[#8f6530] font-bold pl-2' : 'hover:text-[#8f6530] hover:pl-2'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="font-sans text-xs text-[#8f6530] font-normal">0{idx + 1}</span>
                          <span>{item.label}</span>
                        </span>
                        <ArrowUpRight className={`w-5 h-5 transition-transform ${active ? 'text-[#8f6530]' : 'opacity-30'}`} />
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              <div className="pt-4 border-t border-[#e8e4dc]">
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="w-full bg-[#8f6530] text-white py-4 text-center font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#171717] transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Start A Project Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}
