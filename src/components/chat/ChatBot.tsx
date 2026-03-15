'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { MessageSquare, X, Send, Loader2, Bot } from 'lucide-react'
import { LIMAC } from '@/lib/constants'
import type { ChatMessage } from '@/lib/types'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Hi! 👋 I'm Limac's AI assistant. I can help you with information about our LiFePO4 batteries, pricing, and technical specs. How can I help you today?`,
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [streamingText, setStreamingText] = useState('')
  const [botImageAvailable, setBotImageAvailable] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || isLoading) return

    const userMessage: ChatMessage = { role: 'user', content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)
    setStreamingText('')

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      })

      if (!res.ok || !res.body) throw new Error('Failed to get response')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      setIsLoading(false)

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        fullText += chunk
        setStreamingText(fullText)
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: fullText }])
      setStreamingText('')
    } catch (_err) {
      setIsLoading(false)
      setStreamingText('')
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Sorry, I couldn't connect right now. Please call us directly at ${LIMAC.phone.primary} or WhatsApp us for immediate assistance.`,
        },
      ])
    }
  }

  return (
    <>
      {/* Chat window */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-[1001] w-[340px] h-[460px] bg-limac-black border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.7), 0 0 40px rgba(57,210,80,0.1)' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-limac-navy to-limac-black border-b border-gray-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-limac-green/20 border border-limac-green/40 rounded-full flex items-center justify-center">
                {botImageAvailable ? (
                  <Image
                    src="/bot.png"
                    alt="Chat bot"
                    width={22}
                    height={22}
                    className="rounded-full object-cover"
                    onError={() => setBotImageAvailable(false)}
                  />
                ) : (
                  <Bot size={16} className="text-limac-green" />
                )}
              </div>
              <div>
                <div className="text-white text-sm font-semibold">Limac AI Assistant</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-limac-green rounded-full animate-pulse" />
                  <span className="text-limac-muted text-xs">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-limac-muted hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-limac-green text-limac-black font-medium'
                      : 'bg-gray-900 border border-gray-800 text-limac-muted'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Streaming response */}
            {streamingText && (
              <div className="flex justify-start">
                <div className="max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed bg-gray-900 border border-gray-800 text-limac-muted">
                  {streamingText}
                </div>
              </div>
            )}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-limac-green rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-limac-green rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 bg-limac-green rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-800 bg-limac-black">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Ask about our batteries..."
                className="flex-1 bg-gray-900 border border-gray-700 text-white placeholder-gray-600 text-sm px-3 py-2 rounded-lg outline-none focus:border-limac-green transition-colors"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="p-2 bg-limac-green hover:bg-green-400 disabled:opacity-40 disabled:cursor-not-allowed text-limac-black rounded-lg transition-colors"
              >
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI chat assistant"
        className="fixed bottom-6 right-6 z-[1001] w-12 h-12 bg-limac-blue hover:bg-blue-500 text-white rounded-full shadow-lg hover:shadow-blue-500/30 flex items-center justify-center transition-all duration-300 overflow-hidden"
      >
        {isOpen ? (
          <X size={20} />
        ) : botImageAvailable ? (
          <Image
            src="/bot.png"
            alt="Open chat"
            width={48}
            height={48}
            className="w-full h-full rounded-full object-cover"
            onError={() => setBotImageAvailable(false)}
          />
        ) : (
          <MessageSquare size={20} />
        )}
      </button>
    </>
  )
}
