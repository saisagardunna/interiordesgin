'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Lock, Mail, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (data.success) {
        try { sessionStorage.setItem('said_admin_session_active', '1') } catch {}
        router.push('/admin')
      } else {
        setErrorMsg(data.error || 'Invalid credentials. Please verify your email and password.')
      }
    } catch (err) {
      setErrorMsg('Failed to log in. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen w-full bg-[#121212] text-[#f4efe6] flex flex-col justify-between selection:bg-[#8f6530] selection:text-white">
      {/* Top Header Bar */}
      <header className="w-full p-6 border-b border-[#2a2a2a] flex justify-between items-center max-w-[1440px] mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/images/satwika-logo.png"
            alt="Satwika Studio Logo"
            className="h-9 w-auto object-contain brightness-200"
          />
          <span className="font-serif text-lg tracking-[0.2em] uppercase text-white font-medium">
            SAID ATELIER
          </span>
        </Link>
        <span className="font-mono text-xs text-[#8f6530] uppercase tracking-widest font-bold">
          ADMIN PORTAL ACCESS
        </span>
      </header>

      {/* Main Login Form Container */}
      <div className="my-auto py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto bg-[#1a1a1a] border border-[#2a2a2a] p-8 sm:p-10 rounded-xs shadow-2xl space-y-8"
        >
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#8f6530]/20 border border-[#8f6530] flex items-center justify-center mx-auto text-[#b89768]">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-3xl font-normal text-white">
              Studio Admin <i className="font-serif italic text-[#b89768]">Authentication</i>
            </h1>
            <p className="text-xs text-[#a09a8e] font-sans">
              Enter your administrative credentials to manage terminal settings, scheduled calls, inquiries &amp; reviews.
            </p>
          </div>

          {errorMsg && (
            <div className="p-4 bg-red-950/50 border border-red-800 text-red-300 text-xs font-semibold rounded-xs">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="font-sans text-xs uppercase tracking-widest font-bold text-[#b89768] block mb-2 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" /> Admin Email
              </label>
              <input
                type="email"
                value={email}
                placeholder="Enter admin email address"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#121212] border border-[#333] p-4 text-sm text-white font-mono rounded-xs focus:border-[#8f6530] focus:outline-none placeholder:text-[#555]"
                required
              />
            </div>

            <div>
              <label className="font-sans text-xs uppercase tracking-widest font-bold text-[#b89768] block mb-2 flex items-center gap-2">
                <Lock className="w-3.5 h-3.5" /> Admin Password
              </label>
              <input
                type="password"
                value={password}
                placeholder="Enter admin password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#121212] border border-[#333] p-4 text-sm text-white font-mono rounded-xs focus:border-[#8f6530] focus:outline-none placeholder:text-[#555]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8f6530] text-white py-4 font-sans text-xs uppercase tracking-widest font-bold hover:bg-[#b89768] transition-colors rounded-xs shadow-lg flex items-center justify-center gap-2 pt-4"
            >
              {loading ? 'Authenticating...' : 'Sign In To Admin Portal'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-[#2a2a2a] text-center text-[11px] font-mono text-[#777]">
            <span className="flex items-center justify-center gap-1 text-[#b89768]">
              <ShieldCheck className="w-3.5 h-3.5" /> Encrypted Session Security Active
            </span>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="w-full p-6 text-center text-xs font-mono text-[#666] border-t border-[#2a2a2a]">
        © 2026 SAID Studio Admin Panel · All Rights Reserved.
      </footer>
    </main>
  )
}
