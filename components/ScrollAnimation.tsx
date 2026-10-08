'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'

// Classic luxury architectural ease
const classicProfessionalEase = [0.16, 1, 0.3, 1] as const

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  distance?: number
  duration?: number
  role?: string
}

export function RevealSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 16,
  duration = 0.7,
  role,
}: RevealProps) {
  const getInitialY = () => {
    if (direction === 'up') return distance
    if (direction === 'down') return -distance
    return 0
  }

  const getInitialX = () => {
    if (direction === 'left') return distance
    if (direction === 'right') return -distance
    return 0
  }

  return (
    <motion.div
      role={role}
      initial={{
        opacity: 0,
        y: getInitialY(),
        x: getInitialX(),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      viewport={{ once: true, margin: '-15px' }}
      transition={{
        duration,
        delay,
        ease: classicProfessionalEase,
      }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  )
}

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
  delay?: number
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.08,
  delay = 0,
}: StaggerContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-15px' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: classicProfessionalEase,
      },
    },
  }

  return (
    <motion.div variants={itemVariants} className={`transform-gpu ${className}`}>
      {children}
    </motion.div>
  )
}

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: string
  speed?: number
}

export function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 3,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Subtle classic depth
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.02, 1.005, 1.02])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="w-full h-full object-cover will-change-transform"
      />
    </div>
  )
}

interface SharpPhotoFrameProps {
  children: React.ReactNode
  className?: string
  number?: string
  badgeText?: string
  onClick?: () => void
}

export function SharpPhotoFrame({
  children,
  className = '',
  number,
  badgeText,
}: SharpPhotoFrameProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.4, ease: classicProfessionalEase }}
      className={`sharp-frame relative group cursor-pointer overflow-hidden border border-[#d8d0c3] bg-white text-[#171717] shadow-sm transition-all duration-500 hover:shadow-lg ${className}`}
    >
      <div className="absolute inset-1.5 border border-black/10 z-10 pointer-events-none transition-colors duration-500 group-hover:border-black/20" />

      {number && (
        <span className="absolute top-4 left-4 z-20 font-mono text-[11px] font-semibold tracking-widest text-[#171717] px-2.5 py-1 bg-white/90 backdrop-blur-md border border-black/10 rounded-xs shadow-sm">
          {number}
        </span>
      )}

      {badgeText && (
        <span className="absolute top-4 right-4 z-20 text-[10px] font-mono tracking-wider text-[#8f6530] uppercase bg-white/90 backdrop-blur-md px-2.5 py-1 border border-[#8f6530]/30 rounded-xs font-bold">
          {badgeText}
        </span>
      )}

      <div className="w-full h-full relative overflow-hidden">{children}</div>
    </motion.div>
  )
}
