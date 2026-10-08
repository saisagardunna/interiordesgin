'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  CheckCircle2,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Send,
  Clock,
  Compass,
  Crosshair,
  AlertCircle,
  ExternalLink,
  Calendar,
  PhoneCall,
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { RevealSection } from '@/components/ScrollAnimation'

const timeSlots = [
  '10:00 AM',
  '11:30 AM',
  '02:00 PM',
  '04:00 PM',
  '06:00 PM',
]

export default function ContactPage() {
  const getTomorrowDate = () => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toISOString().split('T')[0]
  }

  const getNextDaysList = () => {
    const list = []
    const today = new Date()
    for (let i = 1; i <= 7; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      const iso = d.toISOString().split('T')[0]
      const dayName = i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' })
      const monthNum = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      list.push({ iso, dayName, monthNum })
    }
    return list
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Interior Architecture',
    budget: '₹20L - ₹50L',
    location: '',
    latitude: '',
    longitude: '',
    maps_link: '',
    scheduledDate: getTomorrowDate(),
    scheduledTime: '11:30 AM',
    message: '',
  })

  const [geoStatus, setGeoStatus] = useState<'idle' | 'locating' | 'success' | 'error'>('idle')
  const [geoMessage, setGeoMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  // Live GPS Tracking function using HTML5 Geolocation API
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus('error')
      setGeoMessage('Geolocation is not supported by your browser.')
      return
    }

    setGeoStatus('locating')
    setGeoMessage('Fetching live GPS coordinates...')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6)
        const lng = position.coords.longitude.toFixed(6)
        const gmapsUrl = `https://www.google.com/maps?q=${lat},${lng}`

        setFormData((prev) => ({
          ...prev,
          latitude: lat,
          longitude: lng,
          maps_link: gmapsUrl,
          location: prev.location ? prev.location : `Lat: ${lat}, Long: ${lng}`,
        }))
        setGeoStatus('success')
        setGeoMessage(`Live GPS Tracked: Lat: ${lat}, Long: ${lng}`)
      },
      (error) => {
        setGeoStatus('error')
        const fallbackLat = '17.399500'
        const fallbackLng = '78.504200'
        const fallbackGmapsUrl = `https://www.google.com/maps?q=${fallbackLat},${fallbackLng}`

        setFormData((prev) => ({
          ...prev,
          latitude: fallbackLat,
          longitude: fallbackLng,
          maps_link: fallbackGmapsUrl,
        }))
        setGeoMessage(`Permission denied. Set to Studio GPS (Lat: ${fallbackLat}, Long: ${fallbackLng})`)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  const submitWeb3FormsNative = async (fields: Record<string, string>) => {
    try {
      const fd = new FormData()
      Object.entries(fields).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') fd.append(k, String(v))
      })
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: fd,
      })
    } catch (e) {
      console.error('Web3Forms submit error:', e)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const fullMessage = [
        `Client Name: ${formData.name}`,
        `Phone Number: ${formData.phone}`,
        `Email Address: ${formData.email || 'N/A'}`,
        `Service Required: ${formData.service}`,
        `Estimated Budget: ${formData.budget}`,
        `Site Location: ${formData.location || 'N/A'}`,
        `Scheduled Call: ${formData.scheduledDate} at ${formData.scheduledTime}`,
        formData.latitude && formData.longitude ? `GPS Location: Lat: ${formData.latitude}, Long: ${formData.longitude}` : '',
        formData.maps_link ? `Google Maps Link: ${formData.maps_link}` : '',
        '',
        `Client Message:`,
        formData.message || 'No additional notes provided.'
      ].filter(Boolean).join('\n')

      // 1. Submit natively to Web3Forms to deliver email directly to satwikaarchitects@gmail.com
      submitWeb3FormsNative({
        access_key: '2e493c0c-8a06-48cd-a31d-9d1d8725a9a7',
        subject: `New SAID Studio Project Inquiry - ${formData.name || 'Client'}`,
        from_name: 'SAID Studio Client Portal',
        name: formData.name,
        email: formData.email || 'satwikaarchitects@gmail.com',
        phone: formData.phone,
        service: formData.service,
        budget: formData.budget,
        location: formData.location,
        message: fullMessage,
      })

      // 2. Save Inquiry to Admin Terminal for WEB3 & CONTACT INQUIRIES tab (with GPS Location & Open Maps)
      const inqPayload = {
        id: `inq-${Date.now()}`,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        location: formData.location,
        service: formData.service,
        budget: formData.budget,
        message: formData.message,
        coordinates: formData.latitude && formData.longitude ? `Lat: ${formData.latitude}, Long: ${formData.longitude}` : '',
        googleMapsUrl: formData.maps_link || (formData.latitude && formData.longitude ? `https://www.google.com/maps?q=${formData.latitude},${formData.longitude}` : ''),
        submittedAt: new Date().toISOString(),
      }

      await fetch('/api/admin/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inqPayload),
      })

      try {
        const localInq = JSON.parse(localStorage.getItem('said_custom_inquiries') || '[]')
        localStorage.setItem('said_custom_inquiries', JSON.stringify([inqPayload, ...localInq]))
      } catch {}

      // 3. Save Scheduled Call entry so it populates SCHEDULED CALLS & CALENDAR in Admin Dashboard
      const callPayload = {
        id: `call-${Date.now()}`,
        clientName: formData.name,
        clientPhone: formData.phone,
        clientEmail: formData.email,
        location: formData.location,
        serviceRequired: formData.service,
        estimatedBudget: formData.budget,
        scheduledDate: formData.scheduledDate,
        scheduledTime: formData.scheduledTime,
        notes: formData.message,
        status: 'Pending' as const,
        createdAt: new Date().toISOString(),
      }

      await fetch('/api/admin/schedule-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(callPayload),
      })

      try {
        const localCalls = JSON.parse(localStorage.getItem('said_custom_calls') || '[]')
        localStorage.setItem('said_custom_calls', JSON.stringify([callPayload, ...localCalls]))
      } catch {}

      setSubmitted(true)
    } catch (err) {
      console.error('Contact submit error:', err)
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  const mapDirectionsUrl = "https://www.google.com/maps/search/?api=1&query=Vidya+Nagar+Hyderabad+Vignanpuri+Colony"

  return (
    <main className="contact-page min-h-screen w-full bg-[#faf8f5] text-[#171717] selection:bg-[#b89768] selection:text-white flex flex-col justify-between overflow-x-hidden">
      <Navbar />

      <div>
        {/* Contact Hero */}
        <section className="relative py-20 lg:py-28 px-6 md:px-16 border-b border-[#e8e4dc] bg-[#faf8f5]">
          <div className="max-w-[1440px] mx-auto">
            <RevealSection className="max-w-4xl">
              <span className="font-sans text-xs uppercase tracking-[0.2em] font-bold text-[#8f6530] block mb-6">
                START A PROJECT · CONTACT US
              </span>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] tracking-tight leading-[1.1] mb-8">
                Let&apos;s Build Something <br />
                <i className="font-serif italic text-[#8f6530]">Quietly Extraordinary.</i>
              </h1>

              <p className="text-lg md:text-xl text-[#4e4a43] leading-relaxed font-light max-w-3xl">
                We invite you to visit our studio in Vidya Nagar, Hyderabad or fill out the consultation form below to schedule a direct architectural call with our design team.
              </p>
            </RevealSection>
          </div>
        </section>

        {/* Live Studio Location & Map Banner */}
        <section className="py-16 px-6 md:px-16 bg-white border-b border-[#e8e4dc]">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Location Details & Tracker Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-emerald-800 text-xs font-sans font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Studio Status: Open Today (10:00 AM – 7:00 PM)</span>
              </div>

              <div>
                <span className="font-sans text-xs text-[#8f6530] uppercase tracking-[0.2em] font-bold block mb-2">
                  OUR LOCATION TRACKER
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#171717]">
                  Vidya Nagar, Hyderabad
                </h2>
                <p className="text-sm text-[#4e4a43] leading-relaxed mt-2">
                  Block 21, F-1, Vignanpuri Colony, Vidya Nagar, Hyderabad - 44, Telangana, India
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-sans border-t border-b border-[#e8e4dc] py-4">
                <div>
                  <span className="text-[#8f6530] font-bold block mb-1">STUDIO GPS FORMAT</span>
                  <a
                    href="https://www.google.com/maps?q=17.399500,78.504200"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#171717] font-mono hover:text-[#8f6530] hover:underline inline-flex items-center gap-1 font-semibold"
                  >
                    Lat: 17.399500, Long: 78.504200 <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div>
                  <span className="text-[#8f6530] font-bold block mb-1">REGION COVERAGE</span>
                  <span className="text-[#171717]">Hyderabad, Vizag, Bengaluru</span>
                </div>
              </div>

              <a
                href={mapDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#8f6530] text-white font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#724f24] transition-all rounded-xs shadow-md group"
              >
                <Navigation className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                <span>Get Directions via Google Maps</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Embedded Live Interactive Google Map Frame */}
            <div className="lg:col-span-7 h-[380px] sm:h-[420px] rounded-xs border border-[#e8e4dc] overflow-hidden shadow-xl relative group">
              <iframe
                title="SAID Studio Hyderabad Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.245842858172!2d78.5020113!3d17.3995001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99c9c34d31e9%3A0x6b9d628889bc63e0!2sVidya%20Nagar%2C%20Adikmet%2C%20Hyderabad%2C%20Telangana%20500044!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md px-3 py-1.5 border border-[#e8e4dc] text-[11px] font-sans font-bold text-[#171717] shadow-md flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#8f6530]" /> SAID Studio Location Pin
              </div>
            </div>
          </div>
        </section>

        {/* Form + Studio Contact Details */}
        <section className="py-24 px-6 md:px-16 max-w-[1440px] mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Project Consultation Form with Integrated Schedule Call */}
            <div className="lg:col-span-7 bg-white p-8 md:p-12 border border-[#e8e4dc] shadow-xl rounded-xs">
              {submitted ? (
                <div className="py-12 text-center space-y-6">
                  <div className="w-16 h-16 rounded-full bg-[#8f6530]/10 text-[#8f6530] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#171717]">
                    Call Consultation <i className="font-serif italic text-[#8f6530]">Scheduled!</i>
                  </h2>
                  <p className="text-sm text-[#4e4a43] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#171717]">{formData.name}</strong>. Our senior architectural consultant will call you at <strong className="text-[#8f6530]">{formData.phone}</strong> on:
                  </p>

                  <div className="bg-[#faf8f5] border border-[#e8e4dc] p-6 max-w-md mx-auto rounded-xs font-mono text-xs space-y-2 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-[#666055] uppercase">Scheduled Date:</span>
                      <span className="font-bold text-[#8f6530]">{formData.scheduledDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#666055] uppercase">Preferred Time Slot:</span>
                      <span className="font-bold text-[#8f6530]">{formData.scheduledTime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#666055] uppercase">Selected Service:</span>
                      <span className="font-bold text-[#171717]">{formData.service}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="font-sans text-xs uppercase tracking-widest text-[#8f6530] font-bold underline"
                  >
                    Submit another consultation request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <span className="font-sans text-xs text-[#8f6530] font-bold uppercase tracking-widest block mb-1">
                      DIRECT ARCHITECTURAL CONSULTATION &amp; SCHEDULE CALL
                    </span>
                    <h2 className="font-serif text-3xl font-normal text-[#171717]">
                      Project Consultation Form
                    </h2>
                  </div>

                  {/* Personal Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-[#171717] font-bold mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Goud"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8e4dc] focus:border-[#8f6530] focus:outline-none text-sm text-[#171717]"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-[#171717] font-bold mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8e4dc] focus:border-[#8f6530] focus:outline-none text-sm text-[#171717]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-[#171717] font-bold mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8e4dc] focus:border-[#8f6530] focus:outline-none text-sm text-[#171717]"
                      />
                    </div>
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-[#171717] font-bold mb-2">
                        Project Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Jubilee Hills, Hyderabad"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8e4dc] focus:border-[#8f6530] focus:outline-none text-sm text-[#171717]"
                      />
                    </div>
                  </div>

                  {/* SCHEDULE CALL SECTION WITH INTERACTIVE CALENDAR & QUICK CHIPS */}
                  <div className="p-5 bg-white border border-[#8f6530]/40 rounded-xs space-y-5 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e8e4dc] pb-3">
                      <div className="flex items-center gap-2">
                        <PhoneCall className="w-4 h-4 text-[#8f6530]" />
                        <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#8f6530]">
                          SCHEDULE CALL CONSULTATION &amp; PICK DATE
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#8f6530]/10 border border-[#8f6530]/30 rounded-full text-xs font-mono font-bold text-[#8f6530]">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formData.scheduledDate} at {formData.scheduledTime}</span>
                      </div>
                    </div>

                    {/* Quick Interactive Calendar Date Selector Pills */}
                    <div>
                      <label className="block font-sans text-[11px] uppercase tracking-wider text-[#171717] font-bold mb-2 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#8f6530]" /> Select Consultation Date (1-Click Interactive Calendar) *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {getNextDaysList().map((item) => {
                          const isSelected = formData.scheduledDate === item.iso
                          return (
                            <button
                              key={item.iso}
                              type="button"
                              onClick={() => setFormData({ ...formData, scheduledDate: item.iso })}
                              className={`p-2.5 rounded-xs border text-left transition-all flex flex-col justify-between ${
                                isSelected
                                  ? 'bg-[#8f6530] text-white border-[#8f6530] shadow-md ring-2 ring-[#8f6530]/30'
                                  : 'bg-[#faf8f5] text-[#171717] border-[#e8e4dc] hover:border-[#8f6530] hover:bg-white'
                              }`}
                            >
                              <span className={`text-[10px] uppercase font-mono font-bold block ${isSelected ? 'text-white/80' : 'text-[#8f6530]'}`}>
                                {item.dayName}
                              </span>
                              <span className="text-xs font-bold font-sans mt-1">
                                {item.monthNum}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Manual Custom Calendar Picker Input */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div>
                        <label className="block font-sans text-[11px] uppercase tracking-wider text-[#666055] font-bold mb-1">
                          Or Choose Custom Date:
                        </label>
                        <input
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={formData.scheduledDate}
                          onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                          className="w-full px-3 py-2.5 bg-[#faf8f5] border border-[#e8e4dc] focus:border-[#8f6530] text-xs font-mono text-[#171717] font-bold rounded-xs"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-sans text-[11px] uppercase tracking-wider text-[#666055] font-bold mb-1 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#8f6530]" /> Select Time Slot *
                        </label>
                        <div className="grid grid-cols-3 gap-1.5">
                          {timeSlots.map((slot) => {
                            const isTimeSelected = formData.scheduledTime === slot
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setFormData({ ...formData, scheduledTime: slot })}
                                className={`py-2 px-1 text-center font-mono text-[11px] font-bold rounded-xs border transition-colors ${
                                  isTimeSelected
                                    ? 'bg-[#171717] text-white border-[#171717]'
                                    : 'bg-[#faf8f5] text-[#4e4a43] border-[#e8e4dc] hover:border-[#8f6530]'
                                }`}
                              >
                                {slot}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Live GPS Tracking Integration Section */}
                  <div className="p-4 bg-[#faf8f5] border border-[#e8e4dc] rounded-xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Crosshair className="w-4 h-4 text-[#8f6530]" />
                        <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#171717]">
                          Live GPS Location Tracker (Lat: number, Long: number)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleDetectLocation}
                        className="px-3.5 py-2 bg-[#8f6530] text-white font-sans text-[11px] uppercase tracking-widest font-bold hover:bg-[#724f24] transition-colors inline-flex items-center gap-1.5 rounded-xs w-fit shadow-sm"
                      >
                        <Compass className={`w-3.5 h-3.5 ${geoStatus === 'locating' ? 'animate-spin' : ''}`} />
                        <span>{geoStatus === 'locating' ? 'Locating...' : 'Detect My GPS'}</span>
                      </button>
                    </div>

                    {geoStatus !== 'idle' && (
                      <div className={`p-3 rounded-xs text-xs font-sans flex flex-wrap items-center justify-between gap-2 ${
                        geoStatus === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                        geoStatus === 'locating' ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                        'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}>
                        <div className="flex items-center gap-2">
                          {geoStatus === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                          <span className="font-mono font-semibold">{geoMessage}</span>
                        </div>
                        {formData.maps_link && (
                          <a
                            href={formData.maps_link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-700 text-white rounded-xs text-[11px] font-mono font-bold hover:bg-emerald-900 transition-colors"
                          >
                            <span>Open in Google Maps</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div>
                        <label className="block font-sans text-[11px] uppercase tracking-wider text-[#666055] font-semibold mb-1">
                          Latitude (e.g. 17.489842)
                        </label>
                        <input
                          type="text"
                          readOnly
                          placeholder="17.489842"
                          value={formData.latitude}
                          className="w-full px-3 py-2 bg-white border border-[#e8e4dc] text-xs font-mono text-[#171717] font-semibold"
                        />
                      </div>
                      <div>
                        <label className="block font-sans text-[11px] uppercase tracking-wider text-[#666055] font-semibold mb-1">
                          Longitude (e.g. 78.400996)
                        </label>
                        <input
                          type="text"
                          readOnly
                          placeholder="78.400996"
                          value={formData.longitude}
                          className="w-full px-3 py-2 bg-white border border-[#e8e4dc] text-xs font-mono text-[#171717] font-semibold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-[#171717] font-bold mb-2">
                        Service Required
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8e4dc] focus:border-[#8f6530] focus:outline-none text-sm text-[#171717]"
                      >
                        <option>Interior Architecture</option>
                        <option>Interior Fit-Out</option>
                        <option>Turnkey Interiors</option>
                        <option>3D Visualization</option>
                        <option>Custom Furniture</option>
                        <option>Modular Kitchens</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest text-[#171717] font-bold mb-2">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8e4dc] focus:border-[#8f6530] focus:outline-none text-sm text-[#171717]"
                      >
                        <option>₹15L - ₹30L</option>
                        <option>₹30L - ₹60L</option>
                        <option>₹60L - ₹1.5 Cr</option>
                        <option>₹1.5 Cr+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest text-[#171717] font-bold mb-2">
                      Tell Us About Your Project
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share details about plot size, timelines, or architectural preferences..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-[#faf8f5] border border-[#e8e4dc] focus:border-[#8f6530] focus:outline-none text-sm text-[#171717]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#8f6530] text-white py-4 px-8 font-sans text-xs uppercase tracking-widest font-bold inline-flex items-center justify-center gap-3 hover:bg-[#724f24] transition-colors shadow-lg rounded-xs border border-[#8f6530]"
                  >
                    <span>{loading ? 'Scheduling Call Consultation...' : 'Schedule Call Consultation & Submit'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Right Studio Information Card */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="bg-white p-8 border border-[#e8e4dc] rounded-xs shadow-sm space-y-6">
                <span className="font-sans text-xs text-[#8f6530] uppercase tracking-[0.2em] font-bold block">
                  STUDIO DIRECTORY &amp; CONTACTS
                </span>

                <div className="flex items-start gap-4 pt-2">
                  <div className="p-3 bg-[#faf8f5] border border-[#e8e4dc] rounded-xs text-[#8f6530]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#171717]">Studio Address</h3>
                    <p className="text-xs text-[#4e4a43] leading-relaxed font-sans uppercase mt-1">
                      Block 21, F-1, Vignanpuri Colony,<br />
                      Vidya Nagar, Hyderabad - 44, Telangana, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#faf8f5] border border-[#e8e4dc] rounded-xs text-[#8f6530]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#171717]">Direct Phone</h3>
                    <a href="tel:+919908001558" className="text-xs text-[#8f6530] font-sans font-bold hover:underline block mt-1">
                      +91 99080 01558
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#faf8f5] border border-[#e8e4dc] rounded-xs text-[#8f6530]">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#171717]">Direct Email</h3>
                    <a href="mailto:satwikaarchitects@gmail.com" className="text-xs text-[#8f6530] font-sans font-bold hover:underline block mt-1">
                      satwikaarchitects@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Operating Hours Card */}
              <div className="bg-[#8f6530] text-white p-8 rounded-xs space-y-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-white" />
                  <span className="font-sans text-xs text-white uppercase tracking-widest font-bold block">
                    STUDIO OPERATING HOURS
                  </span>
                </div>
                <p className="text-xs font-sans flex justify-between border-b border-white/20 pb-2.5">
                  <span>Monday — Saturday:</span> <span>10:00 AM – 7:00 PM IST</span>
                </p>
                <p className="text-xs font-sans flex justify-between text-white/80">
                  <span>Sunday:</span> <span>By Prior Appointment</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
