'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion'
import { ArrowDown, Sparkles } from 'lucide-react'

interface HeadphoneScrollProps {
  totalFrames?: number
  framePrefix?: string
  frameExtension?: string
  digits?: number
  bgColor?: string
}

export default function HeadphoneScroll({
  totalFrames = 40,
  framePrefix = '/frames/frame_',
  frameExtension = '.jpg',
  digits = 3,
  bgColor = '#050505',
}: HeadphoneScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])

  const [isLoaded, setIsLoaded] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [currentFrameDisplay, setCurrentFrameDisplay] = useState(1)

  const lastRenderedIndexRef = useRef<number>(0)
  const animFrameId = useRef<number | null>(null)

  // Track scroll position across dedicated container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Responsive spring physics for 90-frame scrubbing
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.0001,
  })

  // Format frame number with leading zeros (e.g. 1 -> "001")
  const formatFrameNumber = useCallback(
    (num: number) => {
      return String(num).padStart(digits, '0')
    },
    [digits]
  )

  // Preload all 90 images sequence with Promise.all and img.decode()
  useEffect(() => {
    let isCancelled = false
    let loadedCount = 0

    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = new Array(totalFrames)

      const promises = Array.from({ length: totalFrames }, (_, i) => {
        const frameIndex = i + 1
        const frameStr = formatFrameNumber(frameIndex)
        const src = `${framePrefix}${frameStr}${frameExtension}`

        return new Promise<void>((resolve) => {
          const img = new Image()
          img.src = src

          const onReady = () => {
            if (isCancelled) return
            loadedCount++
            setLoadProgress(Math.floor((loadedCount / totalFrames) * 100))
            loadedImages[i] = img
            resolve()
          }

          if (img.complete && img.naturalWidth > 0) {
            onReady()
          } else {
            img.onload = () => {
              if ('decode' in img) {
                img.decode().then(onReady).catch(onReady)
              } else {
                onReady()
              }
            }
            img.onerror = () => {
              // Still resolve on error so frame loading never freezes
              onReady()
            }
          }
        })
      })

      await Promise.all(promises)

      if (!isCancelled) {
        imagesRef.current = loadedImages
        setIsLoaded(true)
      }
    }

    loadImages()

    return () => {
      isCancelled = true
    }
  }, [totalFrames, framePrefix, frameExtension, formatFrameNumber])

  // Canvas render logic with CONTAIN scaling & fallback protection
  const renderFrame = useCallback(
    (targetIndex: number) => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d', { alpha: false })
      if (!ctx) return

      const images = imagesRef.current
      if (!images || images.length === 0) return

      const safeTargetIndex = Math.min(totalFrames - 1, Math.max(0, targetIndex))
      let activeIndex = safeTargetIndex
      let img = images[safeTargetIndex]

      // Defensive fallback to last successfully rendered frame so canvas NEVER turns black
      if (!img || !img.complete || img.naturalWidth === 0) {
        activeIndex = lastRenderedIndexRef.current
        img = images[activeIndex]
      }

      if (!img || !img.complete || img.naturalWidth === 0) {
        const readyIdx = images.findIndex((item) => item && item.complete && item.naturalWidth > 0)
        if (readyIdx !== -1) {
          activeIndex = readyIdx
          img = images[readyIdx]
        } else {
          return // Do not clear canvas if no frame is loaded yet
        }
      }

      // Synchronize frame badge counter directly with rendered frame
      lastRenderedIndexRef.current = activeIndex
      setCurrentFrameDisplay(activeIndex + 1)

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const displayWidth = canvas.clientWidth || (typeof window !== 'undefined' ? window.innerWidth : 1920)
      const displayHeight = canvas.clientHeight || (typeof window !== 'undefined' ? window.innerHeight : 1080)

      const targetWidth = Math.floor(displayWidth * dpr)
      const targetHeight = Math.floor(displayHeight * dpr)

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth
        canvas.height = targetHeight
      }

      ctx.save()
      ctx.scale(dpr, dpr)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, displayWidth, displayHeight)

      // COVER SCALING (Math.max): Fills 100% of the screen with ZERO blank space or black bars
      const scale = Math.max(displayWidth / img.naturalWidth, displayHeight / img.naturalHeight)
      const renderWidth = Math.ceil(img.naturalWidth * scale)
      const renderHeight = Math.ceil(img.naturalHeight * scale)

      const x = Math.floor((displayWidth - renderWidth) / 2)
      const y = Math.floor((displayHeight - renderHeight) / 2)

      ctx.drawImage(img, x, y, renderWidth, renderHeight)
      ctx.restore()
    },
    [bgColor, totalFrames]
  )

  // Map 0.0 -> 1.0 continuously to play all 90 frames smoothly through scroll
  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    if (!isLoaded || imagesRef.current.length === 0) return

    const clampedProgress = Math.min(1, Math.max(0, latest))
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.max(0, Math.floor(clampedProgress * (totalFrames - 1)))
    )

    if (animFrameId.current !== null) {
      cancelAnimationFrame(animFrameId.current)
    }
    animFrameId.current = requestAnimationFrame(() => renderFrame(frameIndex))
  })

  // Initial & Resize renders
  useEffect(() => {
    if (isLoaded) {
      renderFrame(0)
    }
  }, [isLoaded, renderFrame])

  useEffect(() => {
    const handleResize = () => {
      if (!isLoaded) return
      const currentProgress = smoothProgress.get()
      const frameIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(currentProgress * (totalFrames - 1)))
      )
      renderFrame(frameIndex)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current)
      }
    }
  }, [isLoaded, smoothProgress, totalFrames, renderFrame])

  // Story overlay progress across 90 frames
  const text0Opacity = useTransform(smoothProgress, [0, 0.18, 0.28], [1, 1, 0])
  const text0Y = useTransform(smoothProgress, [0, 0.28], [0, -35])

  const text30Opacity = useTransform(smoothProgress, [0.35, 0.48, 0.65, 0.78], [0, 1, 1, 0])
  const text30Y = useTransform(smoothProgress, [0.35, 0.48, 0.78], [35, 0, -35])

  const text90Opacity = useTransform(smoothProgress, [0.82, 0.92, 1], [0, 1, 1])
  const text90Y = useTransform(smoothProgress, [0.82, 0.92, 1], [35, 0, 0])

  return (
    <div
      ref={containerRef}
      className="relative w-full text-white font-sans bg-[#050505] touch-pan-y"
      style={{ height: '130vh' }}
    >
      {/* Preloader */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white">
          <div className="relative flex items-center justify-center mb-6">
            <div className="w-14 h-14 border-2 border-white/10 border-t-white rounded-full animate-spin" />
            <Sparkles className="absolute w-5 h-5 text-white/80 animate-pulse" />
          </div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60 font-mono mb-2">
            Loading Experience ({totalFrames} Frames)
          </p>
          <span className="text-xl font-light font-mono text-white/90">{loadProgress}%</span>
        </div>
      )}

      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block will-change-transform"
          style={{ backgroundColor: bgColor }}
        />

        {/* Story Overlay 1 */}
        <motion.div
          style={{ opacity: text0Opacity, y: text0Y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-20"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white max-w-4xl leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            Spaces <br />
            <span className="italic font-serif text-white/90">designed to belong.</span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/80 font-light max-w-lg leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Architecture, interiors and execution brought together around the way you live.
          </p>
          <div className="mt-10 flex items-center gap-3 text-xs uppercase tracking-widest text-white/70 font-mono drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            <span>Scroll down to explore</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </motion.div>

        {/* Story Overlay 2 */}
        <motion.div
          style={{ opacity: text30Opacity, y: text30Y }}
          className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-20 lg:px-32 max-w-3xl pointer-events-none z-20"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-emerald-400 font-mono mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            01 / Spatial Flow
          </span>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            Architectural <br />
            <span className="italic font-serif text-white/90">Precision.</span>
          </h2>
          <p className="mt-4 text-base text-white/80 font-light leading-relaxed border-l-2 border-white/40 pl-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            Fluid movement between light, materials and open residential living.
          </p>
        </motion.div>

        {/* Story Overlay 3 */}
        <motion.div
          style={{ opacity: text90Opacity, y: text90Y }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none z-20"
        >
          <span className="text-xs uppercase tracking-[0.35em] text-white/90 font-mono mb-4 border border-white/20 px-4 py-1.5 rounded-full backdrop-blur-md bg-black/40 shadow-lg">
            02 / The Living Experience
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white max-w-4xl leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            Enter <br />
            <span className="italic font-serif text-white/90">The Studio.</span>
          </h2>
        </motion.div>
      </div>
    </div>
  )
}
