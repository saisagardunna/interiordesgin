'use client'

import Link from 'next/link'
import { MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="footer bg-gradient-to-b from-[#171717] via-[#1c1916] to-[#121212] text-white py-20 px-6 md:px-16 border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#8f6530]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 border-b border-white/10 pb-16 relative z-10">
        {/* Brand Column */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <Link href="/" className="brand-mark inline-block group" aria-label="SAID home">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-3 rounded-md inline-block shadow-lg"
            >
              <img
                src="/images/satwika-logo.png"
                alt="Satwika Architecture and Interior Design"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </motion.div>
          </Link>
          <p className="text-sm text-[#e5e0d8] max-w-sm leading-relaxed font-normal">
            Satwika Architecture &amp; Interior Design · Crafting personal luxury spaces, architecture, and interior fit-outs across Hyderabad, South India, and beyond.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-sans text-[#b89768] font-bold uppercase tracking-widest pt-2">
            <span>Architectural Excellence &amp; Turnkey Delivery</span>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="md:col-span-4 grid grid-cols-2 gap-8 font-sans text-xs uppercase tracking-widest text-[#e5e0d8] font-medium">
          <div className="flex flex-col gap-4">
            <span className="text-[#b89768] font-bold mb-1">NAVIGATION</span>
            <Link href="/portfolio" className="hover:text-[#b89768] transition-colors">Portfolio</Link>
            <Link href="/our-story" className="hover:text-[#b89768] transition-colors">Our Story</Link>
            <Link href="/brands" className="hover:text-[#b89768] transition-colors">Brands We Work With</Link>
            <Link href="/services" className="hover:text-[#b89768] transition-colors">Our Services</Link>
          </div>
          <div className="flex flex-col gap-4 pt-6 sm:pt-0">
            <span className="text-[#b89768] font-bold mb-1">EXPLORE</span>
            <Link href="/blogs" className="hover:text-[#b89768] transition-colors">Blogs</Link>
            <Link href="/testimonials" className="hover:text-[#b89768] transition-colors">Testimonials</Link>
            <Link href="/contact" className="hover:text-[#b89768] transition-colors">Contact Us</Link>
            <Link href="/about" className="hover:text-[#b89768] transition-colors">About Us</Link>
          </div>
        </div>

        {/* Contact Info Column */}
        <div className="md:col-span-4 flex flex-col gap-4 font-sans text-xs uppercase tracking-widest text-[#e5e0d8] font-medium">
          <span className="text-[#b89768] font-bold mb-1">STUDIO CONTACT</span>
          <div className="flex items-start gap-3.5">
            <MapPin className="w-4 h-4 text-[#b89768] shrink-0 mt-0.5" />
            <span className="leading-relaxed text-[#f4efe6]">Block 21, F-1, Vignanpuri Colony, Vidya Nagar, Hyderabad - 44</span>
          </div>
          <div className="flex flex-col gap-3 mt-2">
            <a href="mailto:arsatwikag@gmail.com" className="hover:text-[#b89768] text-[#f4efe6] transition-colors flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#b89768]" /> arsatwikag@gmail.com
            </a>
            <a href="tel:+919908001558" className="hover:text-[#b89768] text-[#f4efe6] transition-colors flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#b89768]" /> +91 99080 01558
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-sans uppercase tracking-widest text-[#c7c1b5] font-medium relative z-10">
        <span>© 2026 SAID Studio (Satwika Architecture &amp; Interior Design). All rights reserved.</span>
        <div className="flex items-center gap-8">
          <a href="https://instagram.com/saidsays_" target="_blank" rel="noreferrer" className="hover:text-[#b89768] transition-colors inline-flex items-center gap-1">
            Instagram <ArrowUpRight className="w-3 h-3" />
          </a>
          <a href="https://youtube.com/@ArchitectsandInteriorDesigners" target="_blank" rel="noreferrer" className="hover:text-[#b89768] transition-colors inline-flex items-center gap-1">
            YouTube <ArrowUpRight className="w-3 h-3" />
          </a>
          <Link href="/privacy" className="hover:text-[#b89768] transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-[#b89768] transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
