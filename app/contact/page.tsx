'use client'

import Link from 'next/link'
import { ArrowUpRight, LocateFixed, Mail, Phone, ArrowLeft, MapPin } from 'lucide-react'
import { FormEvent, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { RevealSection } from '@/components/ScrollAnimation'

function ContactFormContent() {
  const searchParams = useSearchParams()
  const project = searchParams.get('project')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [senderName, setSenderName] = useState('')
  const [location, setLocation] = useState('Location not shared yet')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setErrorMessage('')

    const formElement = event.currentTarget
    const formData = new FormData(formElement)
    const nameVal = (formData.get('name') as string) || ''
    const emailVal = (formData.get('email') as string) || ''
    const projectLocVal = (formData.get('projectLocation') as string) || ''
    const messageVal = (formData.get('message') as string) || ''
    const botcheckVal = formData.get('botcheck')

    const payload = {
      subject: `New SAID Studio Project Inquiry ${project ? `(${project})` : ''}`,
      name: nameVal,
      email: emailVal,
      projectLocation: projectLocVal,
      message: messageVal,
      client_coordinates: location !== 'Location not shared yet' ? location : undefined,
      botcheck: botcheckVal ? 'true' : undefined,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      const rawText = await response.text()
      let data: any
      try {
        data = JSON.parse(rawText)
      } catch (e) {}

      if (data && data.success) {
        setSenderName(nameVal || 'there')
        setSubmitted(true)
        formElement.reset()
        setLocation('Location not shared yet')
        return
      }
    } catch (err) {}

    try {
      const directData = new FormData()
      directData.append('access_key', '2e493c0c-8a06-48cd-a31d-9d1d8725a9a7')
      directData.append('subject', `New SAID Studio Project Inquiry ${project ? `(${project})` : ''}`)
      directData.append('from_name', 'SAID Studio Client Portal')
      directData.append('name', nameVal)
      directData.append('email', emailVal)
      directData.append('replyto', emailVal)
      directData.append('projectLocation', projectLocVal)
      directData.append('message', messageVal)
      if (location !== 'Location not shared yet') directData.append('client_coordinates', location)

      const directRes = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: directData,
      })
      const directText = await directRes.text()
      let directJson: any
      try {
        directJson = JSON.parse(directText)
      } catch (e) {}

      if (directRes.ok || (directJson && directJson.success)) {
        setSenderName(nameVal || 'there')
        setSubmitted(true)
        formElement.reset()
        setLocation('Location not shared yet')
      } else {
        setErrorMessage(
          (directJson && directJson.message) ||
            'Something went wrong while sending your enquiry. Please try again.'
        )
      }
    } catch (directErr) {
      setErrorMessage(
        'Network error occurred. Please check your connection or email us directly at Say@said.archi'
      )
    } finally {
      setSubmitting(false)
    }
  }

  function locate() {
    if (!navigator.geolocation) return setLocation('Geolocation is not supported by this browser.')
    setLocation('Requesting your location…')
    navigator.geolocation.getCurrentPosition(
      (position) =>
        setLocation(
          `Latitude ${position.coords.latitude.toFixed(5)} · Longitude ${position.coords.longitude.toFixed(5)}`
        ),
      () => setLocation('Location permission was declined. You can still send your enquiry.')
    )
  }

  return (
    <div className="contact-layout">
      <RevealSection className="contact-intro">
        <p className="eyebrow flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#b89768]" />
          Start a conversation
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-normal leading-[0.88] tracking-tight my-6">
          Let&apos;s make room for <i className="font-serif italic text-[#b89768]">something good.</i>
        </h1>
        <p className="text-[#262626] dark:text-[#ddd] text-lg md:text-xl leading-relaxed max-w-lg font-normal">
          Tell us a little about your space, your brief and where you are in the process. We will come back with the right next step.
        </p>
        {project && (
          <p className="contact-project-context text-xs md:text-sm uppercase tracking-widest text-[#b89768] mt-4 font-mono font-bold">
            Enquiring about <strong>{project}</strong>
          </p>
        )}
        <div className="contact-details mt-12 text-base md:text-lg">
          <a href="mailto:Say@said.archi" className="group text-[#171717] dark:text-[#f4f1ea] font-medium flex items-center gap-3">
            <Mail className="w-5 h-5 text-[#b89768]" /> Say@said.archi
          </a>
          <a href="tel:+919908001558" className="group text-[#171717] dark:text-[#f4f1ea] font-medium flex items-center gap-3">
            <Phone className="w-5 h-5 text-[#b89768]" /> +91 99080 01558
          </a>
          <span className="text-[#171717] dark:text-[#f4f1ea] font-medium flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#b89768] flex-shrink-0 mt-1" /> Block 21, F-1, Vignanpuri Colony<br />Vidya Nagar, Hyderabad - 44
          </span>
        </div>
      </RevealSection>

      {submitted ? (
        <RevealSection delay={0.2} className="form-success-card" role="alert">
          <div className="form-success-icon">✓</div>
          <h3>Enquiry Received</h3>
          <p>
            Thank you, <strong>{senderName}</strong>. Your enquiry has been transmitted directly to our principal architects at SAID Studio.
          </p>
          <p className="form-success-note">We typically review project briefs and respond within 24 business hours.</p>
          <button
            type="button"
            className="button button-dark inline-flex items-center gap-3 bg-[#171717] text-[#f4f1ea] px-7 py-4 text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-[#b89768] transition-colors"
            onClick={() => {
              setSubmitted(false)
              setSenderName('')
            }}
          >
            Send another message <ArrowUpRight />
          </button>
        </RevealSection>
      ) : (
        <RevealSection delay={0.25} className="enquiry-form-container">
          <form className="enquiry-form" onSubmit={submit}>
            <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
            <label>
              Name
              <input name="name" required placeholder="Your name" />
            </label>
            <label>
              Email
              <input name="email" type="email" required placeholder="you@example.com" />
            </label>
            <label>
              Project location
              <input name="projectLocation" required placeholder="City / area" />
            </label>
            <label>
              Tell us about the project
              <textarea name="message" required rows={5} placeholder="A home, office, renovation or something else…" />
            </label>
            <div className="location-box">
              <div>
                <LocateFixed className="w-5 h-5 text-[#b89768]" />
                <span className="text-sm font-medium">{location}</span>
              </div>
              <button type="button" onClick={locate}>
                Use my location
              </button>
            </div>
            <button className="button button-dark group inline-flex items-center gap-3 bg-[#171717] text-[#f4f1ea] px-8 py-5 text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-[#b89768] transition-all duration-300 shadow-xl" type="submit" disabled={submitting}>
              {submitting ? 'Transmitting enquiry…' : 'Send enquiry'}{' '}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            {errorMessage && (
              <p className="form-status-error" role="alert">
                {errorMessage}
              </p>
            )}
          </form>
        </RevealSection>
      )}
    </div>
  )
}

export default function ContactPage() {
  return (
    <main className="contact-page min-h-screen bg-[#f4f1ea] text-[#171717] dark:bg-[#080808] dark:text-[#f4f1ea]">
      <header className="simple-header border-b border-[#dfd8cb] dark:border-[#222] px-6 md:px-16 py-5 flex justify-between items-center w-full relative">
        <Link href="/" className="brand-mark flex items-center" aria-label="Satwika Architecture and Interior Design">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hF6nxSDYqKL9yPKHjxBYzPnCEcrMbw.png"
            alt="Satwika Architecture and Interior Design"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>
        <div className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <Link href="/" className="flex flex-col items-center group">
            <span className="font-serif text-lg md:text-xl tracking-[0.2em] font-light uppercase text-inherit">
              SATWIKA
            </span>
            <span className="font-mono text-[8px] md:text-[10px] tracking-[0.3em] text-[#b89768] uppercase font-bold mt-0.5 whitespace-nowrap">
              INTERIOR &amp; ARCHITECTURE DESIGN
            </span>
          </Link>
        </div>
        <Link href="/" className="text-link group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-semibold">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back home</span>
        </Link>
      </header>
      <Suspense fallback={<div className="p-8 text-center font-mono text-xs uppercase tracking-widest">Loading contact form…</div>}>
        <ContactFormContent />
      </Suspense>
      <footer className="simple-footer border-t border-[#dfd8cb] dark:border-[#222]">
        <span>© 2026 SAID Studio</span>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-[#b89768] transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-[#b89768] transition-colors">Terms</Link>
        </div>
      </footer>
    </main>
  )
}
