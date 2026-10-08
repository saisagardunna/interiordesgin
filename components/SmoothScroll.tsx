'use client'

import { useEffect, useState, ReactNode } from 'react'
import { motion } from 'framer-motion'
import Lenis from 'lenis'
import { ArrowUp } from 'lucide-react'

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const [showTopBtn, setShowTopBtn] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.8,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const rafId = requestAnimationFrame(raf)

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true)
      } else {
        setShowTopBtn(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
      lenis.destroy()
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {children}

      {/* Scroll To Top Button */}
      {showTopBtn && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 left-6 z-40 w-11 h-11 bg-[#141414]/90 hover:bg-[#8f6530] text-[#b89768] hover:text-white border border-[#2e2a24] rounded-full shadow-2xl backdrop-blur-md flex items-center justify-center transition-all duration-300 group cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </motion.button>
      )}
    </>
  )
}
