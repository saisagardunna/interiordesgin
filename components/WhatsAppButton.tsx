'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function WhatsAppButton() {
  const pathname = usePathname()
  const [whatsappPhone, setWhatsappPhone] = useState('919908001558')

  // Hide WhatsApp button on all Admin panel routes
  if (pathname?.startsWith('/admin')) {
    return null
  }

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const cached = localStorage.getItem('said_cached_settings')
        if (cached) {
          const parsed = JSON.parse(cached)
          if (parsed.whatsappPhone || parsed.contactPhone) {
            const raw = parsed.whatsappPhone || parsed.contactPhone
            const cleanDigits = raw.replace(/\D/g, '')
            if (cleanDigits) setWhatsappPhone(cleanDigits)
          }
        }

        const res = await fetch('/api/admin/settings')
        const data = await res.json()
        if (data.success && data.settings) {
          const raw = data.settings.whatsappPhone || data.settings.contactPhone
          if (raw) {
            const cleanDigits = raw.replace(/\D/g, '')
            if (cleanDigits) setWhatsappPhone(cleanDigits)
          }
        }
      } catch {}
    }
    loadSettings()
  }, [])

  const message = encodeURIComponent('Hello SAID Studio, I would like to inquire about interior architecture and design services.')
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${message}`

  return (
    <div className="fixed right-0 top-[65%] sm:top-[68%] -translate-y-1/2 z-[999]">
      {/* Pure WhatsApp Logo attached directly to the right edge with zero extra effects */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact SAID Studio on WhatsApp"
        className="w-11 h-11 md:w-13 md:h-13 bg-[#25D366] text-white rounded-l-full flex items-center justify-center cursor-pointer shadow-lg pl-1.5 pr-1"
      >
        <svg
          className="w-6 h-6 md:w-7 md:h-7 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.002 3.66 3.745-.993zm11.367-8.335c-.345-.173-2.042-1.007-2.357-1.123-.316-.116-.546-.173-.776.173-.23.345-.892 1.123-1.093 1.353-.201.23-.402.259-.747.086-1.594-.798-2.646-1.41-3.693-3.208-.278-.477.278-.443.795-1.477.087-.173.043-.325-.022-.455-.065-.13-.776-1.871-1.064-2.563-.28-.673-.564-.582-.776-.593l-.662-.011c-.23 0-.603.086-.919.431-.316.345-1.206 1.18-1.206 2.879 0 1.699 1.235 3.339 1.408 3.57.173.23 2.427 3.707 5.879 5.197.821.356 1.462.568 1.961.727.824.262 1.574.225 2.167.137.661-.098 2.042-.834 2.33-1.639.288-.806.288-1.496.201-1.639-.087-.143-.316-.23-.661-.403z" />
        </svg>
      </a>
    </div>
  )
}
