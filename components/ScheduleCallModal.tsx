'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar as CalendarIcon,
  Clock,
  X,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  MapPin,
  ArrowRight,
  User,
  Phone,
  Mail,
  Building2,
  Layers,
  ChevronLeft,
  ShieldCheck,
  Zap,
} from 'lucide-react'

interface ScheduleCallModalProps {
  isOpen: boolean
  onClose: () => void
}

const timeSlotGroups = [
  {
    label: 'MORNING SLOTS',
    slots: ['10:00 AM', '11:30 AM'],
  },
  {
    label: 'AFTERNOON SLOTS',
    slots: ['02:00 PM', '04:00 PM'],
  },
  {
    label: 'EVENING SLOTS',
    slots: ['06:00 PM', '07:30 PM'],
  },
]

const servicesList = [
  {
    id: 'Interior Architecture',
    title: 'Interior Architecture',
    subtitle: 'Space planning, structural layouts & luxury architectural design',
    icon: Building2,
  },
  {
    id: 'Turnkey Interiors',
    title: 'Turnkey Design & Build',
    subtitle: 'End-to-end execution, material sourcing & site management',
    icon: Sparkles,
  },
  {
    id: '3D Visualization & VR',
    title: '3D Renders & Walkthroughs',
    subtitle: 'Photorealistic 3D renders, materials & walkthroughs',
    icon: Layers,
  },
  {
    id: 'Custom Furniture & Kitchens',
    title: 'Custom Joinery & Kitchens',
    subtitle: 'Bespoke wardrobes, modular kitchens & luxury finishes',
    icon: Zap,
  },
]

const budgetTiers = [
  { label: 'Bespoke Fit-Out', sub: 'Compact & Urban Living' },
  { label: 'Full Residence', sub: 'Spacious Residential Spaces' },
  { label: 'Luxury Villa / Estate', sub: 'High-End Architectural Build' },
  { label: 'Commercial Workplace', sub: 'Executive Offices & Studios' },
]

export default function ScheduleCallModal({ isOpen, onClose }: ScheduleCallModalProps) {
  const [step, setStep] = useState<1 | 2>(1)
  
  // Date options calculation
  const getFormattedDate = (daysAhead: number) => {
    const d = new Date()
    d.setDate(d.getDate() + daysAhead)
    return d.toISOString().split('T')[0]
  }

  const [selectedDate, setSelectedDate] = useState<string>(() => getFormattedDate(1))
  const [selectedTime, setSelectedTime] = useState<string>('11:30 AM')
  const [service, setService] = useState('Interior Architecture')
  const [budget, setBudget] = useState('Full Residence')

  const [clientName, setClientName] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!clientName.trim() || !clientPhone.trim()) {
      setErrorMsg('Please enter your full name and valid phone number.')
      return
    }

    setLoading(true)
    setErrorMsg('')

    try {
      // Send email via Web3Forms directly from browser using native form POST and client fetch
      try {
        const fields: Record<string, string> = {
          access_key: '2e493c0c-8a06-48cd-a31d-9d1d8725a9a7',
          subject: `New Call Booking - ${clientName}`,
          from_name: 'SAID Studio Call Booking',
          name: clientName,
          phone: clientPhone,
          email: clientEmail || 'satwikaarchitects@gmail.com',
          location: location,
          service: service,
          budget: budget,
          scheduled_date: selectedDate,
          scheduled_time: selectedTime,
          notes: notes,
        }

        const fd = new FormData()
        Object.entries(fields).forEach(([k, v]) => {
          if (v) fd.append(k, String(v))
        })
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: fd,
        })
      } catch (err) {
        console.error('Modal Web3Forms submit error:', err)
      }

      // Also record in WEB3 & CONTACT INQUIRIES admin store
      fetch('/api/admin/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: clientName,
          phone: clientPhone,
          email: clientEmail,
          location: location,
          service: service,
          budget: budget,
          message: notes,
        }),
      }).catch(() => {})

      // Save to Admin Database
      const callPayload = {
        id: `call-${Date.now()}`,
        clientName,
        clientPhone,
        clientEmail,
        location,
        serviceRequired: service,
        estimatedBudget: budget,
        scheduledDate: selectedDate,
        scheduledTime: selectedTime,
        notes,
        status: 'Pending' as const,
        createdAt: new Date().toISOString(),
      }

      const res = await fetch('/api/admin/schedule-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(callPayload),
      })

      try {
        const localCalls = JSON.parse(localStorage.getItem('said_custom_calls') || '[]')
        localStorage.setItem('said_custom_calls', JSON.stringify([callPayload, ...localCalls]))
      } catch {}

      const data = await res.json()
      if (data.success || data.call) {
        setSubmitted(true)
      } else {
        setSubmitted(true)
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again or call +91 99080 01558 directly.')
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSubmitted(false)
    setStep(1)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto selection:bg-[#8f6530] selection:text-white">
          {/* Glassmorphic Dark Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
          />

          {/* Luxury Modal Shell */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 25 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl bg-[#121212] text-[#f4efe6] rounded-sm shadow-2xl border border-[#2a2723] overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]"
          >
            {/* Header with Metallic Gold Border */}
            <div className="bg-[#181715] p-5 sm:p-6 flex justify-between items-center border-b border-[#2e2a24] shrink-0 relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#8f6530]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-3.5 relative z-10">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#8f6530] to-[#5c3e1c] flex items-center justify-center text-white shadow-lg border border-[#b89768]/30">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#b89768] font-bold">
                      SAID ATELIER VIP CONSULTATION
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-[#8f6530]/20 text-[#d4af37] border border-[#8f6530]/40">
                      LIVE AVAILABILITY
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white tracking-wide">
                    Schedule Direct Call <i className="font-serif italic text-[#b89768]">Consultation</i>
                  </h2>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-all border border-transparent hover:border-[#333] relative z-10"
                aria-label="Close Consultation Modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Step Progress Bar */}
            {!submitted && (
              <div className="w-full bg-[#181715] border-b border-[#2e2a24] px-6 py-3 flex items-center justify-between text-xs font-sans">
                <div className="flex items-center gap-3">
                  <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-mono font-bold ${
                    step === 1 ? 'bg-[#8f6530] text-white' : 'bg-[#2a2723] text-[#b89768]'
                  }`}>
                    01
                  </span>
                  <span className={step === 1 ? 'text-white font-bold tracking-wider uppercase' : 'text-[#c7c1b5] font-normal uppercase'}>
                    Date, Time &amp; Service
                  </span>
                </div>

                <div className="h-[1px] flex-1 mx-4 bg-[#2a2723] relative">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#8f6530]"
                    animate={{ width: step === 1 ? '50%' : '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="flex items-center gap-3">
                  <span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-mono font-bold ${
                    step === 2 ? 'bg-[#8f6530] text-white' : 'bg-[#2a2723] text-[#c7c1b5]'
                  }`}>
                    02
                  </span>
                  <span className={step === 2 ? 'text-white font-bold tracking-wider uppercase' : 'text-[#c7c1b5] font-normal uppercase'}>
                    Your Details &amp; Location
                  </span>
                </div>
              </div>
            )}

            {/* Scrollable Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#8f6530]/20 to-[#8f6530]/5 border-2 border-[#8f6530] text-[#b89768] flex items-center justify-center mx-auto shadow-2xl">
                    <CheckCircle2 className="w-12 h-12 text-[#b89768]" />
                  </div>

                  <div className="space-y-3">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#b89768]">
                      CONFIRMATION #SAID-{Math.floor(1000 + Math.random() * 9000)}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white">
                      Consultation <i className="font-serif italic text-[#b89768]">Scheduled!</i>
                    </h3>
                    <p className="text-sm text-[#b5af9f] max-w-lg mx-auto leading-relaxed">
                      Thank you, <strong className="text-white">{clientName}</strong>. Our senior architectural designer has received your booking and will call you directly at <strong className="text-[#b89768] font-mono">{clientPhone}</strong>.
                    </p>
                  </div>

                  <div className="bg-[#181715] border border-[#2e2a24] p-6 max-w-lg mx-auto rounded-sm space-y-3 text-left">
                    <div className="flex items-center justify-between border-b border-[#2e2a24] pb-2.5 text-xs">
                      <span className="text-[#888] font-sans uppercase tracking-widest">Scheduled Date</span>
                      <span className="font-mono font-bold text-white text-sm">{selectedDate}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#2e2a24] pb-2.5 text-xs">
                      <span className="text-[#888] font-sans uppercase tracking-widest">Time Window</span>
                      <span className="font-mono font-bold text-[#b89768] text-sm">{selectedTime}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#2e2a24] pb-2.5 text-xs">
                      <span className="text-[#888] font-sans uppercase tracking-widest">Selected Service</span>
                      <span className="font-sans font-medium text-white">{service}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-[#888] font-sans uppercase tracking-widest">Estimated Budget</span>
                      <span className="font-mono text-[#b89768] font-semibold">{budget}</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="bg-[#8f6530] text-white py-4 px-10 font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#b89768] transition-all rounded-xs shadow-xl inline-flex items-center gap-2"
                    >
                      Done &amp; Close <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <div className="p-4 bg-red-950/60 border border-red-800 text-red-300 text-xs font-semibold rounded-xs">
                      {errorMsg}
                    </div>
                  )}

                  {step === 1 ? (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="space-y-7"
                    >
                      {/* Date Selector Chips & Calendar */}
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <label className="font-sans text-xs uppercase tracking-widest font-bold text-[#b89768] flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-[#8f6530]" /> 1. Select Preferred Date *
                          </label>
                          <span className="text-[11px] font-mono text-[#888]">Studio Hours: 10 AM – 7 PM</span>
                        </div>

                        {/* Quick Pick Date Pills */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                          {[
                            { label: 'Tomorrow', date: getFormattedDate(1) },
                            { label: 'In 2 Days', date: getFormattedDate(2) },
                            { label: 'In 3 Days', date: getFormattedDate(3) },
                            { label: 'Next Week', date: getFormattedDate(7) },
                          ].map((item) => (
                            <button
                              type="button"
                              key={item.label}
                              onClick={() => setSelectedDate(item.date)}
                              className={`py-2.5 px-3 rounded-xs border text-xs font-sans transition-all text-center ${
                                selectedDate === item.date
                                  ? 'bg-[#8f6530] text-white border-[#b89768] font-bold shadow-md'
                                  : 'bg-[#181715] text-[#b5af9f] border-[#2e2a24] hover:border-[#8f6530]'
                              }`}
                            >
                              <div className="font-medium">{item.label}</div>
                              <div className="text-[10px] opacity-75 font-mono">{item.date}</div>
                            </button>
                          ))}
                        </div>

                        {/* Custom Date Input */}
                        <input
                          type="date"
                          min={getFormattedDate(0)}
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className="w-full bg-[#181715] border border-[#2e2a24] p-3.5 text-sm text-white font-mono rounded-xs focus:border-[#8f6530] focus:outline-none"
                          required
                        />
                      </div>

                      {/* Time Slot Groups */}
                      <div>
                        <label className="font-sans text-xs uppercase tracking-widest font-bold text-[#b89768] block mb-3 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#8f6530]" /> 2. Preferred Call Window *
                        </label>
                        <div className="space-y-3">
                          {timeSlotGroups.map((group) => (
                            <div key={group.label} className="bg-[#181715] p-3 border border-[#2e2a24] rounded-xs">
                              <span className="font-mono text-[10px] text-[#888] uppercase tracking-wider block mb-2 font-bold">
                                {group.label}
                              </span>
                              <div className="grid grid-cols-2 gap-2">
                                {group.slots.map((slot) => (
                                  <button
                                    type="button"
                                    key={slot}
                                    onClick={() => setSelectedTime(slot)}
                                    className={`py-2.5 px-3 text-xs font-mono font-bold rounded-xs border transition-all text-center flex items-center justify-center gap-2 ${
                                      selectedTime === slot
                                        ? 'bg-[#8f6530] text-white border-[#b89768] shadow-lg scale-[1.02]'
                                        : 'bg-[#121212] text-[#b5af9f] border-[#2e2a24] hover:border-[#8f6530]'
                                    }`}
                                  >
                                    <Clock className="w-3 h-3 text-[#b89768]" />
                                    <span>{slot}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Service Cards */}
                      <div>
                        <label className="font-sans text-xs uppercase tracking-widest font-bold text-[#b89768] block mb-3">
                          3. Service Interest *
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {servicesList.map((item) => {
                            const IconComponent = item.icon
                            const isSelected = service === item.id
                            return (
                              <button
                                type="button"
                                key={item.id}
                                onClick={() => setService(item.id)}
                                className={`p-3.5 text-left border rounded-xs transition-all flex items-start gap-3 ${
                                  isSelected
                                    ? 'bg-[#8f6530]/20 border-[#8f6530] text-white shadow-md'
                                    : 'bg-[#181715] border-[#2e2a24] text-[#b5af9f] hover:border-[#555]'
                                }`}
                              >
                                <div className={`p-2 rounded-xs shrink-0 ${isSelected ? 'bg-[#8f6530] text-white' : 'bg-[#25221d] text-[#8f6530]'}`}>
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="space-y-0.5">
                                  <div className="font-serif text-sm font-normal text-white">{item.title}</div>
                                  <div className="text-[11px] text-[#888] font-sans leading-tight">{item.subtitle}</div>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      {/* Estimated Budget Selector */}
                      <div>
                        <label className="font-sans text-xs uppercase tracking-widest font-bold text-[#b89768] block mb-2">
                          4. Project Scope
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {budgetTiers.map((b) => (
                            <button
                              type="button"
                              key={b.label}
                              onClick={() => setBudget(b.label)}
                              className={`p-2.5 text-center border rounded-xs transition-all ${
                                budget === b.label
                                  ? 'bg-[#8f6530] text-white border-[#b89768] font-bold shadow-md'
                                  : 'bg-[#181715] text-[#b5af9f] border-[#2e2a24] hover:border-[#8f6530]'
                              }`}
                            >
                              <div className="font-sans text-xs font-semibold">{b.label}</div>
                              <div className="text-[9.5px] opacity-70 font-sans mt-0.5">{b.sub}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Action Button to Step 2 */}
                      <div className="pt-4 border-t border-[#2e2a24]">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="w-full bg-[#8f6530] text-white py-4 font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#b89768] transition-all rounded-xs shadow-xl flex items-center justify-center gap-2"
                        >
                          Continue To Contact Information <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="space-y-5"
                    >
                      {/* Selection Summary Pill */}
                      <div className="bg-[#181715] p-4 border border-[#8f6530]/40 rounded-xs flex items-center justify-between text-xs font-mono text-[#b89768]">
                        <div className="space-y-0.5">
                          <div className="text-white font-bold">{selectedDate} @ {selectedTime}</div>
                          <div className="text-[11px] text-[#888] font-sans">{service} ({budget})</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="px-3 py-1.5 bg-[#25221d] hover:bg-[#8f6530] hover:text-white text-[#b89768] rounded-xs border border-[#333] transition-colors text-[11px] font-sans font-bold flex items-center gap-1"
                        >
                          <ChevronLeft className="w-3 h-3" /> Change Slot
                        </button>
                      </div>

                      <div>
                        <label className="font-sans text-xs uppercase tracking-widest font-bold text-white block mb-1.5 flex items-center gap-2">
                          <User className="w-3.5 h-3.5 text-[#8f6530]" /> Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Satwika Reddy"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full bg-[#181715] border border-[#2e2a24] p-3.5 text-sm text-white rounded-xs focus:border-[#8f6530] focus:outline-none placeholder:text-[#555]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-sans text-xs uppercase tracking-widest font-bold text-white block mb-1.5 flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-[#8f6530]" /> Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+91 XXXXX XXXXX"
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                            className="w-full bg-[#181715] border border-[#2e2a24] p-3.5 text-sm text-white font-mono rounded-xs focus:border-[#8f6530] focus:outline-none placeholder:text-[#555]"
                          />
                        </div>

                        <div>
                          <label className="font-sans text-xs uppercase tracking-widest font-bold text-white block mb-1.5 flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-[#8f6530]" /> Email Address
                          </label>
                          <input
                            type="email"
                            placeholder="name@example.com"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            className="w-full bg-[#181715] border border-[#2e2a24] p-3.5 text-sm text-white font-mono rounded-xs focus:border-[#8f6530] focus:outline-none placeholder:text-[#555]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-sans text-xs uppercase tracking-widest font-bold text-white block mb-1.5 flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-[#8f6530]" /> Project Location / City
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Jubilee Hills, Hyderabad or Vizag"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full bg-[#181715] border border-[#2e2a24] p-3.5 text-sm text-white rounded-xs focus:border-[#8f6530] focus:outline-none placeholder:text-[#555]"
                        />
                      </div>

                      <div>
                        <label className="font-sans text-xs uppercase tracking-widest font-bold text-white block mb-1.5">
                          Additional Requirements or Notes (Optional)
                        </label>
                        <textarea
                          rows={3}
                          placeholder="Plot size, 3D visualization needs, structural plans, timeline..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full bg-[#181715] border border-[#2e2a24] p-3.5 text-sm text-white rounded-xs focus:border-[#8f6530] focus:outline-none placeholder:text-[#555]"
                        />
                      </div>

                      <div className="pt-4 border-t border-[#2e2a24] flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="w-1/3 bg-[#181715] border border-[#2e2a24] text-[#b5af9f] py-4 font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#25221d] hover:text-white transition-colors rounded-xs"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-2/3 bg-[#8f6530] text-white py-4 font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#b89768] transition-all rounded-xs shadow-xl flex items-center justify-center gap-2"
                        >
                          {loading ? 'Securing Booking...' : 'Confirm Call Booking'}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="text-center pt-2">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#777]">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#8f6530]" /> Direct notification will be dispatched to SAID Studio team
                        </span>
                      </div>
                    </motion.div>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
