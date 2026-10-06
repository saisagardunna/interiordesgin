'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { MessageSquare, X, Send, Sparkles, Phone, Building, DollarSign, Layers, ChevronDown } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

const QUICK_PROMPTS = [
  { label: '💰 2BHK & 4BHK Rates', query: 'What are your rates and pricing for 2BHK, 3BHK, and 4BHK luxury interior design projects?' },
  { label: '🏛️ Selected Projects', query: 'Can you list your famous projects and their locations?' },
  { label: '📞 Contact Info', query: 'What is your contact number, email, and office address?' },
  { label: '📐 Services Offered', query: 'What interior architecture and turnkey services do you provide?' },
]

function formatTimestamp(): string {
  const now = new Date()
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Simple Markdown Formatter for clean rendering of bold text, bullet lists, and paragraphs
function FormattedMessage({ content }: { content: string }) {
  const paragraphs = content.split('\n\n')

  return (
    <div className="space-y-2 text-xs md:text-sm leading-relaxed text-[#e5e0d8]">
      {paragraphs.map((para, pIdx) => {
        const lines = para.split('\n')
        const isList = lines.every((line) => line.trim().startsWith('- ') || line.trim().startsWith('* ') || /^\d+\./.test(line.trim()))

        if (isList) {
          return (
            <ul key={pIdx} className="space-y-1 my-1 pl-3 list-disc list-outside text-[#dfd7ca]">
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
    </div>
  )
}

function renderInlineMarkdown(text: string): string {
  let html = text
  // Escape HTML tags to prevent XSS
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  // Bold **text**
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
  // Italic *text*
  html = html.replace(/\*(.*?)\*/g, '<em class="italic text-[#c9c0b2]">$1</em>')
  // Highlight code/numbers `code`
  html = html.replace(/`(.*?)`/g, '<code class="bg-[#262626] text-[#9a8060] px-1 py-0.5 rounded font-mono text-[11px]">$1</code>')
  return html
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasUnread, setHasUnread] = useState(true)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Welcome to **SAID** (Satwika Architecture and Interior Design).\n\nI am your AI design consultant. How can I assist you with your project today? Feel free to ask about our **2BHK/4BHK rates**, **project portfolio**, or **contact details**.',
      timestamp: formatTimestamp(),
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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
        const assistantMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.message,
          timestamp: formatTimestamp(),
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
        content: 'I apologize, but I am having trouble connecting right now. Please reach out directly to our studio team at **satwikaarchitects@gmail.com** or call **+91 99080 01558**.',
        timestamp: formatTimestamp(),
      }
      setMessages((prev) => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating GIF Avatar Trigger Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
          {/* Transparent Floating GIF Avatar Trigger (No Circle) */}
          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open SAID AI Assistant"
            className="group relative w-32 h-32 sm:w-40 sm:h-40 bg-transparent border-0 outline-none cursor-pointer flex items-center justify-center hover:scale-105 transition-transform duration-300 focus:outline-none"
          >
            <div className="relative w-full h-full flex items-center justify-center bg-transparent">
              <img
                src="/chatbot.gif"
                alt="SAID AI Assistant"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)] transition-transform duration-300 group-hover:scale-110"
              />
              {/* Green Online Pulse Indicator */}
              <span className="absolute bottom-3 right-4 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0d0d0d] rounded-full shadow-lg animate-pulse" />
            </div>
          </button>
        </div>
      )}

      {/* Floating Chatbot Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-[calc(100vw-2.5rem)] sm:w-[440px] bg-[#0d0d0d] border border-[#262626] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl flex flex-col transition-all duration-300 ${
            isMinimized ? 'h-20' : 'h-[640px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#141414] border-b border-[#262626] select-none">
            <div className="flex items-center gap-3">
              {/* Transparent Mini GIF Avatar */}
              <div className="relative w-12 h-12 bg-transparent flex-shrink-0 flex items-center justify-center">
                <img
                  src="/chatbot.gif"
                  alt="SAID AI Assistant"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.2)]"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-[#0d0d0d] rounded-full" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wide">SAID AI Consultant</h3>
                <p className="text-[11px] text-[#aaa] flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online · Architecture & Rates Expert
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 text-[#999] hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title={isMinimized ? 'Expand Chat' : 'Minimize Chat'}
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${isMinimized ? 'rotate-180' : ''}`} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#999] hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          {!isMinimized && (
            <>
              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#0a0a0a]/90 scrollbar-thin scrollbar-thumb-white/10">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-md ${
                        msg.role === 'user'
                          ? 'bg-[#9a8060] text-white rounded-br-none'
                          : 'bg-[#181818] border border-[#282828] rounded-bl-none'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <FormattedMessage content={msg.content} />
                      ) : (
                        <p className="text-xs md:text-sm text-white font-normal leading-relaxed">{msg.content}</p>
                      )}
                    </div>
                    <span className="text-[10px] text-[#666] mt-1 px-1 font-mono">{msg.timestamp}</span>
                  </div>
                ))}

                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex flex-col items-start">
                    <div className="bg-[#181818] border border-[#282828] rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#9a8060] animate-spin" />
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-[#9a8060] rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 bg-[#9a8060] rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 bg-[#9a8060] rounded-full animate-bounce" />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestion Chips */}
              <div className="px-3 py-2 bg-[#121212] border-t border-[#222] flex gap-1.5 overflow-x-auto scrollbar-none">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt.label}
                    onClick={() => handleSend(prompt.query)}
                    disabled={isLoading}
                    className="flex-shrink-0 text-[11px] text-[#c9c0b2] bg-[#1d1d1d] hover:bg-[#9a8060]/20 hover:text-white border border-[#2a2a2a] hover:border-[#9a8060]/50 px-2.5 py-1 rounded-full transition-all duration-200"
                  >
                    {prompt.label}
                  </button>
                ))}
              </div>

              {/* Input Footer */}
              <div className="p-3 bg-[#141414] border-t border-[#262626]">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSend()
                  }}
                  className="flex items-center gap-2 bg-[#1a1a1a] border border-[#2e2e2e] focus-within:border-[#9a8060] rounded-xl px-3 py-2 transition-colors"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about 2BHK/4BHK rates, projects, contact..."
                    disabled={isLoading}
                    className="flex-1 bg-transparent text-xs md:text-sm text-white placeholder-[#777] outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    aria-label="Send Message"
                    className="p-1.5 text-[#9a8060] hover:text-white disabled:opacity-30 disabled:hover:text-[#9a8060] transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
                <div className="flex items-center justify-between text-[10px] text-[#666] mt-2 px-1">
                  <span>SAID Studio · Satwika Architecture</span>
                  <span>satwikaarchitects@gmail.com · +91 99080 01558</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
