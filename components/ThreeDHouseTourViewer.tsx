'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  RotateCcw,
  Play,
  Pause,
  Compass,
  Maximize2,
  Minimize2,
  Move,
  Layers,
} from 'lucide-react'

interface ThreeDHouseTourViewerProps {
  totalFrames?: number
  framePrefix?: string
  frameExtension?: string
  digits?: number
  className?: string
}

const ROOM_HOTSPOTS = [
  { name: 'Entrance & Foyer', frame: 1 },
  { name: 'Iconic Living Space', frame: 25 },
  { name: 'Courtyard Light', frame: 55 },
  { name: 'Kitchen & Dining', frame: 80 },
]

export default function ThreeDHouseTourViewer({
  totalFrames = 90,
  framePrefix = '/frames/frame_',
  frameExtension = '.jpg',
  digits = 3,
  className = '',
}: ThreeDHouseTourViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLImageElement[]>([])

  const [isLoaded, setIsLoaded] = useState(false)
  const [loadProgress, setLoadProgress] = useState(0)
  const [currentFrame, setCurrentFrame] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const [playbackSpeed, setPlaybackSpeed] = useState(0.85)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const dragStartXRef = useRef(0)
  const frameAtDragStartRef = useRef(1)
  const targetFrameRef = useRef(1)
  const currentFrameRef = useRef(1)
  const animFrameIdRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  const formatFrameNumber = useCallback(
    (num: number) => {
      return String(num).padStart(digits, '0')
    },
    [digits]
  )

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
            img.onerror = () => resolve()
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

  // High-performance Canvas draw algorithm filling 100% of container cleanly
  const drawFrame = useCallback((frameNum: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const images = imagesRef.current
    if (!images || images.length === 0) return

    const safeIndex = Math.min(totalFrames - 1, Math.max(0, Math.floor(frameNum) - 1))
    const img = images[safeIndex]
    if (!img || !img.complete || img.naturalWidth === 0) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const displayWidth = canvas.clientWidth || 800
    const displayHeight = canvas.clientHeight || 500

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

    // Full cover mode - completely covers the canvas area without leaving black bars
    const scale = Math.max(displayWidth / img.naturalWidth, displayHeight / img.naturalHeight)
    const renderWidth = Math.ceil(img.naturalWidth * scale)
    const renderHeight = Math.ceil(img.naturalHeight * scale)
    const x = Math.floor((displayWidth - renderWidth) / 2)
    const y = Math.floor((displayHeight - renderHeight) / 2)

    ctx.drawImage(img, x, y, renderWidth, renderHeight)
    ctx.restore()

    setCurrentFrame(safeIndex + 1)
  }, [totalFrames])

  useEffect(() => {
    if (!isLoaded) return

    const loop = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp
      const deltaTime = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp

      if (autoRotate && !isDragging) {
        targetFrameRef.current = (targetFrameRef.current + (deltaTime * 0.004 * playbackSpeed)) % totalFrames
        if (targetFrameRef.current <= 0) targetFrameRef.current += totalFrames
      }

      const diff = targetFrameRef.current - currentFrameRef.current
      if (Math.abs(diff) > 0.0005) {
        currentFrameRef.current += diff * 0.08
        drawFrame(currentFrameRef.current)
      }

      animFrameIdRef.current = requestAnimationFrame(loop)
    }

    animFrameIdRef.current = requestAnimationFrame(loop)

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current)
    }
  }, [isLoaded, autoRotate, isDragging, playbackSpeed, totalFrames, drawFrame])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setAutoRotate(false)
    dragStartXRef.current = e.clientX
    frameAtDragStartRef.current = targetFrameRef.current
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const deltaX = e.clientX - dragStartXRef.current
    const frameDelta = deltaX * 0.08
    let newFrame = (frameAtDragStartRef.current - frameDelta) % totalFrames
    if (newFrame <= 0) newFrame += totalFrames
    targetFrameRef.current = newFrame
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return
    setIsDragging(true)
    setAutoRotate(false)
    dragStartXRef.current = e.touches[0].clientX
    frameAtDragStartRef.current = targetFrameRef.current
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return
    const deltaX = e.touches[0].clientX - dragStartXRef.current
    const frameDelta = deltaX * 0.08
    let newFrame = (frameAtDragStartRef.current - frameDelta) % totalFrames
    if (newFrame <= 0) newFrame += totalFrames
    targetFrameRef.current = newFrame
  }

  const jumpToHotspot = (frameNum: number) => {
    setAutoRotate(false)
    targetFrameRef.current = frameNum
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
      setIsFullscreen(false)
    }
  }

  return (
    <div
      ref={containerRef}
      className={`relative w-full aspect-[16/10] min-h-[360px] sm:min-h-[440px] bg-[#121212] border border-[#dfd8cb] rounded-xs overflow-hidden select-none group shadow-lg ${className}`}
    >
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#171717] text-white">
          <div className="w-10 h-10 border-2 border-[#b89768]/30 border-t-[#b89768] rounded-full animate-spin mb-4" />
          <p className="font-sans text-xs uppercase tracking-[0.25em] text-white/80 mb-1 font-bold">
            Loading 3D House Tour
          </p>
          <span className="font-sans text-base font-bold text-[#b89768]">{loadProgress}%</span>
        </div>
      )}

      {/* Main 3D Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        className="w-full h-full block cursor-grab active:cursor-grabbing object-cover"
      />

      {/* Top HUD Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-2 bg-black/65 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-white">
          <Compass className="w-3.5 h-3.5 text-[#b89768]" />
          <span className="font-sans text-[10px] uppercase tracking-widest text-white/90 font-semibold">
            3D Orbit View · {Math.round((currentFrame / totalFrames) * 360)}°
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => {
              if (playbackSpeed === 0.5) setPlaybackSpeed(0.85)
              else if (playbackSpeed === 0.85) setPlaybackSpeed(1.2)
              else setPlaybackSpeed(0.5)
            }}
            className="px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white hover:text-[#b89768] hover:border-[#b89768] transition-colors font-sans text-[10px] font-bold"
            title="Toggle Rotation Speed"
          >
            {playbackSpeed}x
          </button>
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className="p-2 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white hover:text-[#b89768] hover:border-[#b89768] transition-colors"
            title={autoRotate ? 'Pause Auto Rotate' : 'Start Auto Rotate'}
          >
            {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-white hover:text-[#b89768] hover:border-[#b89768] transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Center Drag Badge Prompt */}
      {!isDragging && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2.2 }}
            className="flex items-center gap-2.5 bg-black/75 backdrop-blur-md text-white px-5 py-2.5 rounded-full border border-[#b89768]/50 shadow-xl"
          >
            <Move className="w-4 h-4 text-[#b89768]" />
            <span className="font-sans text-xs uppercase tracking-widest text-white/90 font-semibold">
              Drag mouse to rotate 3D house ↔
            </span>
          </motion.div>
        </div>
      )}

      {/* Bottom Controls & Hotspots Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-auto">
        <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-md p-1.5 rounded-lg border border-white/20 max-w-full overflow-x-auto">
          <Layers className="w-3.5 h-3.5 text-[#b89768] ml-2 mr-1 hidden sm:block" />
          {ROOM_HOTSPOTS.map((hotspot) => (
            <button
              key={hotspot.name}
              onClick={() => jumpToHotspot(hotspot.frame)}
              className={`px-3 py-1.5 rounded-md font-sans text-[10px] uppercase tracking-wider transition-colors whitespace-nowrap font-bold ${
                Math.abs(currentFrame - hotspot.frame) < 12
                  ? 'bg-[#8f6530] text-white shadow-md'
                  : 'text-white/80 hover:text-white hover:bg-white/15'
              }`}
            >
              {hotspot.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/20 text-white">
          <span className="font-sans text-[10px] uppercase tracking-widest text-white/80 font-semibold">
            Frame {currentFrame}/{totalFrames}
          </span>
          <button
            onClick={() => jumpToHotspot(1)}
            className="p-1 hover:text-[#b89768] transition-colors"
            title="Reset 3D View"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
