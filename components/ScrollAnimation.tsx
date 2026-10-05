'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'

const luxuryEase = [0.22, 1, 0.36, 1] as const

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
  distance = 30,
  duration = 0.8,
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
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: luxuryEase,
      }}
      className={className}
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
  staggerDelay = 0.12,
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
      viewport={{ once: true, margin: '-50px' }}
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
    hidden: { opacity: 0, y: 35, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.85,
        ease: luxuryEase,
      },
    },
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  )
}

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: string
  speed?: number // Range -10 to 10
}

export function ParallaxImage({
  src,
  alt,
  className = '',
  speed = 8,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Movement range 5% - 12%
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1.01, 1.04])

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
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, ease: luxuryEase }}
      className={`sharp-frame relative group cursor-pointer overflow-hidden border border-[#d8d0c3] bg-white text-[#171717] shadow-md transition-shadow duration-500 hover:shadow-2xl ${className}`}
    >
      {/* Inner sharp mat line */}
      <div className="absolute inset-1.5 border border-black/10 z-10 pointer-events-none transition-colors duration-500 group-hover:border-black/20" />

      {/* Number Badge */}
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

      {/* Frame Content */}
      <div className="w-full h-full relative overflow-hidden">{children}</div>
    </motion.div>
  )
}
