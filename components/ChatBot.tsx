'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Send,
  Sparkles,
  Building,
  ChevronDown,
  Download,
  RotateCcw,
  Check,
  Copy,
  ArrowRight,
  ExternalLink,
  Calculator,
  MessageCircle,
  Palette,
  CheckSquare,
  Search,
  Compass,
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  suggestions?: string[]
}

interface ProjectCard {
  id: string
  title: string
  location: string
  category: string
  image: string
}

const FEATURED_PROJECTS: ProjectCard[] = [
  {
    id: 'sri-bio',
    title: 'Sri BioAesthetics Laboratory',
    location: 'Hyderabad',
    category: 'Commercial Fit-Out',
    image: '/images/sri-bio/sri-bio-1.jpg',
  },
  {
    id: 'sai-vanamali',
    title: 'Sai Vanamali (3 Flat Interiors)',
    location: 'Miyapur, Hyderabad',
    category: 'Residential Turnkey',
    image: '/images/sai-vanamali/sai-vanamali-1.jpg',
  },
  {
    id: 'courtyard-residence',
    title: 'The Courtyard Residence',
    location: 'Hyderabad',
    category: 'Residential Villa',
    image: '/images/courtyard-residence.png',
  },
  {
    id: 'walnut-office',
    title: 'The Walnut Office',
    location: 'Hyderabad',
    category: 'Commercial Workspace',
    image: '/images/walnut/walnut_1.jpg',
  },
]

const QUICK_PROMPTS = [
  { label: '📐 Design Process', query: 'What is your architectural design approach and step-by-step process?' },
  { label: '🏛️ Featured Projects', query: 'Can you show me your famous completed projects?' },
  { label: '🎨 Design Style Quiz', query: 'Help me find my design aesthetic and material palette.' },
  { label: '💰 Scope & Cost', query: 'How do you structure design estimates for residential & commercial spaces?' },
  { label: '📞 Contact Info', query: 'What is your contact number, email, and studio address?' },
]

const STORAGE_KEY = 'said_chatbot_messages_clean_v2'

function formatTimestamp(): string {
  const now = new Date()
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Helper to parse message content and optional SUGGESTIONS: line
function parseMessagePayload(rawContent: string): { cleanContent: string; suggestions: string[] } {
  let cleanContent = rawContent
  let suggestions: string[] = []

  const suggestionMatch = rawContent.match(/SUGGESTIONS:\s*(.*)$/i)
  if (suggestionMatch) {
    const rawSuggestions = suggestionMatch[1]
    suggestions = rawSuggestions
      .split('|')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
    cleanContent = rawContent.replace(/SUGGESTIONS:\s*.*$/i, '').trim()
  }

  return { cleanContent, suggestions }
}

function FormattedMessage({
  content,
  onToggleEstimator,
  onToggleQuiz,
  onToggleChecklist,
}: {
  content: string
  onToggleEstimator: () => void
  onToggleQuiz: () => void
  onToggleChecklist: () => void
}) {
  const { cleanContent } = parseMessagePayload(content)

  const strippedText = cleanContent
    .replace(/\[ACTION:BOOK_CONSULTATION\]/g, '')
    .replace(/\[ACTION:WHATSAPP\]/g, '')
    .replace(/\[ACTION:ESTIMATE\]/g, '')
    .replace(/\[ACTION:VIEW_PROJECTS\]/g, '')
    .replace(/\[ACTION:STYLE_QUIZ\]/g, '')
    .replace(/\[ACTION:CHECKLIST\]/g, '')
    .trim()

  const hasWhatsappAction = content.includes('[ACTION:WHATSAPP]')
  const hasEstimateAction = content.includes('[ACTION:ESTIMATE]')
  const hasQuizAction = content.includes('[ACTION:STYLE_QUIZ]')
  const hasChecklistAction = content.includes('[ACTION:CHECKLIST]')

  const paragraphs = strippedText.split('\n\n')

  return (
    <div className="space-y-2 text-xs md:text-sm leading-relaxed text-[#e5e0d8]">
      {paragraphs.map((para, pIdx) => {
        const lines = para.split('\n')
        const isList = lines.every((line) => line.trim().startsWith('- ') || line.trim().startsWith('* ') || /^\d+\./.test(line.trim()))

        if (isList) {
          return (
            <ul key={pIdx} className="space-y-1 my-1 pl-3.5 list-disc list-outside text-[#dfd7ca]">
              {lines.map((line, lIdx) => {
                const cleaned = line.replace(/^[-*]\s+|\d+\.\s+/, '')
                return <li key={lIdx} dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(cleaned) }} />
              })}
            </ul>
          )
        }

        return (
          <p key={pIdx} className="my-1">
            {lines.map((line, lIdx) => (
              <span key={lIdx}>
                <span dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(line) }} />
                {lIdx < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        )
      })}

      {(hasWhatsappAction || hasEstimateAction || hasQuizAction || hasChecklistAction) && (
        <div className="pt-2 border-t border-white/10 mt-2.5 space-y-2">
          {hasWhatsappAction && (
            <a
              href="https://wa.me/919908001558?text=Hi%20SAID%20Studio%20team,%20I%20would%20like%20to%20discuss%20my%20interior%20design%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between hover:bg-emerald-900/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-emerald-200 font-medium">WhatsApp Concierge (+91 99080 01558)</span>
              </div>
              <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-medium rounded flex items-center gap-1">
                Chat <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </a>
          )}

          {hasQuizAction && (
            <button
              onClick={onToggleQuiz}
              className="w-full p-2 bg-[#1f1a14] hover:bg-[#2e261e] border border-[#8f6530]/40 rounded-xl text-left flex items-center justify-between text-xs text-[#d4af37] transition-colors"
            >
              <span className="flex items-center gap-1.5 font-medium">
                <Palette className="w-3.5 h-3.5 text-[#8f6530]" /> Interactive Design Style Quiz
              </span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

          {hasChecklistAction && (
            <button
              onClick={onToggleChecklist}
              className="w-full p-2 bg-[#1f1a14] hover:bg-[#2e261e] border border-[#8f6530]/40 rounded-xl text-left flex items-center justify-between text-xs text-[#d4af37] transition-colors"
            >
              <span className="flex items-center gap-1.5 font-medium">
                <CheckSquare className="w-3.5 h-3.5 text-[#8f6530]" /> Room-by-Room Scope Planner
              </span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}

          {hasEstimateAction && (
            <button
              onClick={onToggleEstimator}
              className="w-full p-2 bg-[#1f1a14] hover:bg-[#2e261e] border border-[#8f6530]/40 rounded-xl text-left flex items-center justify-between text-xs text-[#d4af37] transition-colors"
            >
              <span className="flex items-center gap-1.5 font-medium">
                <Calculator className="w-3.5 h-3.5 text-[#8f6530]" /> Launch Scope &amp; Budget Calculator
              </span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

function renderInlineMarkdown(text: string): string {
  let html = text
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em class="italic text-[#c9c0b2]">$1</em>')
  html = html.replace(/`(.*?)`/g, '<code class="bg-[#262626] text-[#b89768] px-1 py-0.5 rounded font-mono text-[11px]">$1</code>')
  return html
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)
  const [activeDrawer, setActiveDrawer] = useState<'estimator' | 'projects' | 'quiz' | 'checklist' | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  // Estimator State
  const [estimatorSpace, setEstimatorSpace] = useState('3bhk')
  const [estimatorStyle, setEstimatorStyle] = useState('luxury')

  // Quiz State
  const [quizMaterial, setQuizMaterial] = useState('walnut')
  const [quizMood, setQuizMood] = useState('warm')

  // Checklist State
  const [checkedScope, setCheckedScope] = useState<string[]>([
    'Modular Kitchen',
    'False Ceiling & Lighting',
    'Custom Wardrobes',
  ])

  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved) {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed) && parsed.length > 0) return parsed
        }
      } catch (e) {
        console.error('Failed to load saved messages', e)
      }
    }
    return [
      {
        id: 'welcome',
        role: 'assistant',
        content: `Welcome to **SAID Studio Concierge** (Satwika Architecture & Interior Design).

I am your dedicated spatial design consultant. How can I assist you with your residential or commercial space today?

[ACTION:WHATSAPP]
SUGGESTIONS: Help me find my design style | Show me completed projects | How does your process work?`,
        timestamp: formatTimestamp(),
      },
    ]
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch (e) {
      console.error('Failed to persist messages', e)
    }
  }, [messages])

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      setHasUnread(false)
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [isOpen, messages, scrollToBottom])

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input
    if (!query.trim() || isLoading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query.trim(),
      timestamp: formatTimestamp(),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInput('')
    setIsLoading(true)

    try {
      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      const data = await res.json()

      if (res.ok && data.message) {
        const { cleanContent, suggestions } = parseMessagePayload(data.message)
        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: cleanContent,
          timestamp: formatTimestamp(),
          suggestions,
        }
        setMessages((prev) => [...prev, assistantMsg])
      } else {
        throw new Error(data.error || 'Failed to generate response')
      }
    } catch (err) {
      console.error('Chat error:', err)
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I apologize, but I am having trouble connecting right now. Please reach out directly to our studio team at **satwikaarchitects@gmail.com** or call **+91 99080 01558**.

[ACTION:WHATSAPP]`,
        timestamp: formatTimestamp(),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = (id: string, text: string) => {
    const cleaned = text.replace(/\[ACTION:.*?\]/g, '')
    navigator.clipboard.writeText(cleaned)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleClearHistory = () => {
    if (confirm('Clear chat history?')) {
      const welcomeMsg: Message = {
        id: 'welcome-' + Date.now(),
        role: 'assistant',
        content: `Chat history cleared. How can I assist you with your space today?

[ACTION:WHATSAPP]
SUGGESTIONS: Help me find my design style | Show me completed projects`,
        timestamp: formatTimestamp(),
      }
      setMessages([welcomeMsg])
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const handleExportTranscript = () => {
    const transcriptText = messages
      .map((m) => `[${m.timestamp}] ${m.role.toUpperCase()}: ${m.content.replace(/\[ACTION:.*?\]/g, '')}`)
      .join('\n\n')
    const blob = new Blob([transcriptText], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `SAID-Studio-Chat-${new Date().toISOString().slice(0, 10)}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const toggleChecklistScope = (item: string) => {
    setCheckedScope((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    )
  }

  const handleScrollIsolation = (e: React.WheelEvent | React.TouchEvent) => {
    e.stopPropagation()
  }

  const filteredMessages = searchQuery.trim()
    ? messages.filter((m) => m.content.toLowerCase().includes(searchQuery.toLowerCase()))
    : messages

  return (
    <>
      {/* Floating Trigger Button - Transparent GIF without circular background */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-6 right-6 z-50 flex items-center select-none"
        >
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open SAID Studio Concierge"
            className="group relative w-22 h-22 sm:w-28 sm:h-28 bg-transparent border-0 outline-none p-0 cursor-pointer flex items-center justify-center transition-transform duration-300 hover:scale-110 focus:outline-none"
          >
            <img
              src="/chatbot.gif"
              alt="SAID Studio Concierge"
              className="w-full h-full object-contain filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-105"
            />
            <span className="absolute bottom-2 right-2 w-3.5 h-3.5 bg-emerald-500 rounded-full border border-black shadow-md animate-pulse" />
          </button>
        </motion.div>
      )}

      {/* Sleek Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={handleScrollIsolation}
            onTouchMove={handleScrollIsolation}
            className={`fixed bottom-6 right-6 z-50 w-[calc(100vw-2.5rem)] sm:w-[480px] bg-[#0c0c0e] border border-[#2a251e] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl flex flex-col overscroll-contain transition-all duration-300 ${
              isMinimized ? 'h-16' : 'h-[670px] max-h-[88vh]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#141311] border-b border-[#242019] select-none shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 bg-transparent flex-shrink-0 flex items-center justify-center">
                  <img src="/chatbot.gif" alt="SAID Concierge" className="w-full h-full object-contain filter drop-shadow-sm" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-white tracking-wide font-sans">SAID Studio Concierge</h3>
                  <p className="text-[10px] text-[#999] flex items-center gap-1.5 mt-0.5 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online · Studio Design Assistant
                  </p>
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-1 text-[#888]">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className={`p-1.5 rounded-lg transition-colors ${showSearch ? 'text-[#d4af37]' : 'hover:text-white'}`}
                  title="Search Chat"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleExportTranscript}
                  className="p-1.5 hover:text-white rounded-lg transition-colors"
                  title="Export Chat"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleClearHistory}
                  className="p-1.5 hover:text-white rounded-lg transition-colors"
                  title="Clear Chat"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:text-white rounded-lg transition-colors"
                  title={isMinimized ? 'Expand' : 'Minimize'}
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:text-white rounded-lg transition-colors"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Quick Search Bar toggle */}
            {!isMinimized && showSearch && (
              <div className="p-2 bg-[#12100e] border-b border-[#221e18] flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search in chat history..."
                  className="flex-1 bg-[#1a1815] border border-[#2a241d] px-2.5 py-1 text-xs text-white placeholder-[#777] rounded outline-none"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-xs text-[#888] hover:text-white">
                    Clear
                  </button>
                )}
              </div>
            )}

            {/* Quick Navigation Tool Bar */}
            {!isMinimized && (
              <div className="px-3 py-2 bg-[#0e0d0b] border-b border-[#1f1b16] flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px] font-sans">
                <button
                  onClick={() => setActiveDrawer(activeDrawer === 'quiz' ? null : 'quiz')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md border transition-all flex-shrink-0 ${
                    activeDrawer === 'quiz'
                      ? 'bg-[#8f6530] text-white border-[#b89768]'
                      : 'bg-[#161412] text-[#c9c0b2] border-[#26201a] hover:border-[#8f6530]'
                  }`}
                >
                  <Palette className="w-3.5 h-3.5" /> Style Quiz
                </button>
                <button
                  onClick={() => setActiveDrawer(activeDrawer === 'checklist' ? null : 'checklist')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md border transition-all flex-shrink-0 ${
                    activeDrawer === 'checklist'
                      ? 'bg-[#8f6530] text-white border-[#b89768]'
                      : 'bg-[#161412] text-[#c9c0b2] border-[#26201a] hover:border-[#8f6530]'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" /> Scope Planner
                </button>
                <button
                  onClick={() => setActiveDrawer(activeDrawer === 'estimator' ? null : 'estimator')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md border transition-all flex-shrink-0 ${
                    activeDrawer === 'estimator'
                      ? 'bg-[#8f6530] text-white border-[#b89768]'
                      : 'bg-[#161412] text-[#c9c0b2] border-[#26201a] hover:border-[#8f6530]'
                  }`}
                >
                  <Calculator className="w-3.5 h-3.5" /> Estimator
                </button>
                <button
                  onClick={() => setActiveDrawer(activeDrawer === 'projects' ? null : 'projects')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-md border transition-all flex-shrink-0 ${
                    activeDrawer === 'projects'
                      ? 'bg-[#8f6530] text-white border-[#b89768]'
                      : 'bg-[#161412] text-[#c9c0b2] border-[#26201a] hover:border-[#8f6530]'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" /> Projects
                </button>
              </div>
            )}

            {/* Interactive Tool Drawers */}
            <AnimatePresence>
              {!isMinimized && activeDrawer === 'quiz' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  data-lenis-prevent="true"
                  data-lenis-prevent-wheel="true"
                  data-lenis-prevent-touch="true"
                  onWheel={handleScrollIsolation}
                  onTouchMove={handleScrollIsolation}
                  className="bg-[#12100e] border-b border-[#242019] p-3 text-xs space-y-2.5 shrink-0 overflow-hidden overscroll-contain"
                >
                  <div className="flex items-center justify-between border-b border-[#221e18] pb-1.5">
                    <span className="font-serif text-xs font-semibold text-white flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5 text-[#8f6530]" /> Find My Architectural Style &amp; Palette
                    </span>
                    <button onClick={() => setActiveDrawer(null)} className="text-[#888] hover:text-white p-0.5">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] uppercase font-mono text-[#888] block mb-1">Wood &amp; Veneer Preference</label>
                      <select
                        value={quizMaterial}
                        onChange={(e) => setQuizMaterial(e.target.value)}
                        className="w-full bg-[#1a1815] border border-[#28221b] text-white rounded p-1 text-xs outline-none"
                      >
                        <option value="walnut">American Walnut &amp; Fluted Baffles</option>
                        <option value="teak">Warm Teak &amp; Organic Rattan</option>
                        <option value="monochrome">Dark Charcoal &amp; Bronze Metal</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-mono text-[#888] block mb-1">Lighting Mood</label>
                      <select
                        value={quizMood}
                        onChange={(e) => setQuizMood(e.target.value)}
                        className="w-full bg-[#1a1815] border border-[#28221b] text-white rounded p-1 text-xs outline-none"
                      >
                        <option value="warm">3000K Warm Ambient Strip Lights</option>
                        <option value="daylight">Sunlit &amp; Frameless Glass</option>
                        <option value="executive">Moody Architectural COB Spotlights</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveDrawer(null)
                      handleSend(`Suggest an architectural design palette based on my selections: Wood (${quizMaterial}), Lighting (${quizMood}).`)
                    }}
                    className="w-full py-1.5 bg-[#8f6530] text-white text-xs font-semibold rounded shadow hover:bg-[#b89768] transition-colors flex items-center justify-center gap-1"
                  >
                    Generate Material Profile <ArrowRight className="w-3 h-3" />
                  </button>
                </motion.div>
              )}

              {!isMinimized && activeDrawer === 'checklist' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  data-lenis-prevent="true"
                  data-lenis-prevent-wheel="true"
                  data-lenis-prevent-touch="true"
                  onWheel={handleScrollIsolation}
                  onTouchMove={handleScrollIsolation}
                  className="bg-[#12100e] border-b border-[#242019] p-3 text-xs space-y-2.5 shrink-0 overflow-hidden overscroll-contain"
                >
                  <div className="flex items-center justify-between border-b border-[#221e18] pb-1.5">
                    <span className="font-serif text-xs font-semibold text-white flex items-center gap-1.5">
                      <CheckSquare className="w-3.5 h-3.5 text-[#8f6530]" /> Room-by-Room Scope Selection
                    </span>
                    <button onClick={() => setActiveDrawer(null)} className="text-[#888] hover:text-white p-0.5">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      'Modular Kitchen',
                      'False Ceiling & Lighting',
                      'Custom Wardrobes',
                      'TV Unit & Wall Panelling',
                      'Living Room Furniture',
                      'Bathroom Fit-Outs',
                    ].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleChecklistScope(item)}
                        className={`p-1.5 text-left rounded border text-[11px] font-medium transition-colors flex items-center gap-1.5 ${
                          checkedScope.includes(item)
                            ? 'bg-[#8f6530]/20 border-[#8f6530] text-white'
                            : 'bg-[#181613] border-[#26201a] text-[#888]'
                        }`}
                      >
                        <span className={`w-3 h-3 rounded-xs border flex items-center justify-center text-[9px] ${
                          checkedScope.includes(item) ? 'bg-[#8f6530] border-[#b89768] text-white' : 'border-[#555]'
                        }`}>
                          {checkedScope.includes(item) && '✓'}
                        </span>
                        <span className="truncate">{item}</span>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setActiveDrawer(null)
                      handleSend(`Can you guide me on designing these selected scope items: ${checkedScope.join(', ')}?`)
                    }}
                    className="w-full py-1.5 bg-[#8f6530] text-white text-xs font-semibold rounded shadow hover:bg-[#b89768] transition-colors flex items-center justify-center gap-1"
                  >
                    Ask Concierge About Selected Scope <ArrowRight className="w-3 h-3" />
                  </button>
                </motion.div>
              )}

              {!isMinimized && activeDrawer === 'estimator' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  data-lenis-prevent="true"
                  data-lenis-prevent-wheel="true"
                  data-lenis-prevent-touch="true"
                  onWheel={handleScrollIsolation}
                  onTouchMove={handleScrollIsolation}
                  className="bg-[#12100e] border-b border-[#242019] p-3 text-xs space-y-2.5 shrink-0 overflow-hidden overscroll-contain"
                >
                  <div className="flex items-center justify-between border-b border-[#221e18] pb-1.5">
                    <span className="font-serif text-xs font-semibold text-white flex items-center gap-1.5">
                      <Calculator className="w-3.5 h-3.5 text-[#8f6530]" /> Scope &amp; Budget Estimator
                    </span>
                    <button onClick={() => setActiveDrawer(null)} className="text-[#888] hover:text-white p-0.5">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] uppercase font-mono text-[#888] block mb-1">Property Type</label>
                      <select
                        value={estimatorSpace}
                        onChange={(e) => setEstimatorSpace(e.target.value)}
                        className="w-full bg-[#1a1815] border border-[#28221b] text-white rounded p-1 text-xs outline-none"
                      >
                        <option value="2bhk">2BHK Residence</option>
                        <option value="3bhk">3BHK Residence</option>
                        <option value="villa">Villa / Estate</option>
                        <option value="office">Executive Office</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-mono text-[#888] block mb-1">Style</label>
                      <select
                        value={estimatorStyle}
                        onChange={(e) => setEstimatorStyle(e.target.value)}
                        className="w-full bg-[#1a1815] border border-[#28221b] text-white rounded p-1 text-xs outline-none"
                      >
                        <option value="luxury">Modern Luxury</option>
                        <option value="minimalist">Minimalist Stone</option>
                        <option value="classic">Heritage Walnut</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-2.5 bg-[#090807] border border-[#8f6530]/30 rounded-lg space-y-1 text-left">
                    <div className="font-serif text-xs text-[#d4af37] font-semibold font-bold">
                      {estimatorSpace === '2bhk' && '2BHK Residence (1,200 – 1,600 sq.ft)'}
                      {estimatorSpace === '3bhk' && '3BHK Residence (1,800 – 2,600 sq.ft)'}
                      {estimatorSpace === 'villa' && 'Luxury Villa / Estate (3,500+ sq.ft)'}
                      {estimatorSpace === 'office' && 'Executive Office Workplace'}
                    </div>
                    <p className="text-[11px] text-[#c9c0b2]">
                      Bespoke space planning, custom joinery, veneer panelling, ergonomic kitchen, acoustic ceiling &amp; 3000K warm lighting architecture.
                    </p>
                  </div>
                </motion.div>
              )}

              {!isMinimized && activeDrawer === 'projects' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  data-lenis-prevent="true"
                  data-lenis-prevent-wheel="true"
                  data-lenis-prevent-touch="true"
                  onWheel={handleScrollIsolation}
                  onTouchMove={handleScrollIsolation}
                  className="bg-[#12100e] border-b border-[#242019] p-3 text-xs space-y-2.5 shrink-0 overflow-hidden overscroll-contain"
                >
                  <div className="flex items-center justify-between border-b border-[#221e18] pb-1.5">
                    <span className="font-serif text-xs font-semibold text-white flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-[#8f6530]" /> Portfolio Showcase
                    </span>
                    <button onClick={() => setActiveDrawer(null)} className="text-[#888] hover:text-white p-0.5">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div
                    data-lenis-prevent="true"
                    data-lenis-prevent-wheel="true"
                    data-lenis-prevent-touch="true"
                    onWheel={handleScrollIsolation}
                    onTouchMove={handleScrollIsolation}
                    className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1 overscroll-contain"
                  >
                    {FEATURED_PROJECTS.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-1.5 bg-[#181613] border border-[#26201a] rounded flex items-center gap-2 hover:border-[#8f6530] transition-colors cursor-pointer"
                        onClick={() => {
                          setActiveDrawer(null)
                          handleSend(`Tell me more about: ${proj.title}`)
                        }}
                      >
                        <div className="w-10 h-10 bg-[#221e18] rounded overflow-hidden flex-shrink-0">
                          <img
                            src={proj.image}
                            alt={proj.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = '/images/hero-interior.png'
                            }}
                          />
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="text-[11px] font-semibold text-white truncate">{proj.title}</h4>
                          <p className="text-[9px] text-[#888] truncate">{proj.location}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages Container with strict scroll isolation */}
            {!isMinimized && (
              <>
                <div
                  data-lenis-prevent="true"
                  data-lenis-prevent-wheel="true"
                  data-lenis-prevent-touch="true"
                  onWheel={handleScrollIsolation}
                  onTouchMove={handleScrollIsolation}
                  className="flex-1 overflow-y-auto p-3.5 space-y-3 bg-[#080809] overscroll-contain scrollbar-thin scrollbar-thumb-white/10"
                >
                  {filteredMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`relative max-w-[88%] rounded-xl px-3.5 py-2.5 shadow-md ${
                          msg.role === 'user'
                            ? 'bg-[#8f6530] text-white rounded-br-none'
                            : 'bg-[#141311] border border-[#242019] rounded-bl-none text-[#e5e0d8]'
                        }`}
                      >
                        {msg.role === 'assistant' ? (
                          <FormattedMessage
                            content={msg.content}
                            onToggleEstimator={() => setActiveDrawer('estimator')}
                            onToggleQuiz={() => setActiveDrawer('quiz')}
                            onToggleChecklist={() => setActiveDrawer('checklist')}
                          />
                        ) : (
                          <p className="text-xs text-white leading-relaxed">{msg.content}</p>
                        )}

                        {msg.role === 'assistant' && (
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="absolute top-2 right-2 opacity-40 hover:opacity-100 text-[#888] hover:text-white transition-opacity"
                            title="Copy text"
                          >
                            {copiedId === msg.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        )}
                      </div>

                      {/* Render Dynamic Context-Aware Follow-Up Suggestion Pills */}
                      {msg.role === 'assistant' && msg.suggestions && msg.suggestions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5 max-w-[90%]">
                          {msg.suggestions.map((sug, sIdx) => (
                            <button
                              key={sIdx}
                              onClick={() => handleSend(sug)}
                              disabled={isLoading}
                              className="text-[10px] text-[#d4af37] bg-[#161411] hover:bg-[#8f6530]/30 border border-[#8f6530]/40 px-2 py-0.5 rounded-full transition-colors font-sans flex items-center gap-1"
                            >
                              <span>{sug}</span> <ArrowRight className="w-2.5 h-2.5" />
                            </button>
                          ))}
                        </div>
                      )}

                      <span className="text-[9px] text-[#666] mt-1 px-1 font-mono">{msg.timestamp}</span>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex flex-col items-start">
                      <div className="bg-[#141311] border border-[#242019] rounded-xl rounded-bl-none px-3.5 py-2.5 flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-[#8f6530] animate-spin" />
                        <div className="flex items-center gap-1 text-xs text-[#c9c0b2]">
                          <span>Thinking</span>
                          <span className="w-1 h-1 bg-[#8f6530] rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="w-1 h-1 bg-[#8f6530] rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="w-1 h-1 bg-[#8f6530] rounded-full animate-bounce" />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts */}
                <div
                  data-lenis-prevent="true"
                  data-lenis-prevent-wheel="true"
                  data-lenis-prevent-touch="true"
                  onWheel={handleScrollIsolation}
                  onTouchMove={handleScrollIsolation}
                  className="px-3 py-1.5 bg-[#0d0c0a] border-t border-[#1a1714] flex gap-1.5 overflow-x-auto scrollbar-none shrink-0 overscroll-contain"
                >
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt.label}
                      onClick={() => handleSend(prompt.query)}
                      disabled={isLoading}
                      className="flex-shrink-0 text-[10px] text-[#c9c0b2] bg-[#141210] hover:bg-[#8f6530]/20 hover:text-white border border-[#221d17] hover:border-[#8f6530]/50 px-2 py-0.5 rounded-full transition-all"
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>

                {/* Text Input Footer */}
                <div className="p-2.5 bg-[#11100e] border-t border-[#201c17] shrink-0">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSend()
                    }}
                    className="flex items-center gap-2 bg-[#181613] border border-[#26201a] focus-within:border-[#8f6530] rounded-xl px-3 py-1.5 transition-colors"
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      className="flex-1 bg-transparent text-xs text-white placeholder-[#777] outline-none"
                    />

                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      aria-label="Send"
                      className="p-1 text-[#8f6530] hover:text-white disabled:opacity-30 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>

                  <div className="flex items-center justify-between text-[9px] text-[#666] mt-1.5 px-1 font-mono">
                    <span>SAID Studio · Satwika Design</span>
                    <span>WhatsApp +91 99080 01558</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
