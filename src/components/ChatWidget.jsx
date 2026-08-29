import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import clsx from 'clsx'

// NOT MOUNTED YET (see App.jsx). This widget is copied over from
// restorix-marketing ready to enable, but its backend — the `marketing-chat`
// Supabase edge function — carries a behavioral-health-specific system
// prompt/context. Pointing the Suretix site at it as-is would produce a chat
// that talks about treatment centers on a bail-bonds site. Enabling this needs
// a scoping decision first: a `niche` parameter on `marketing-chat`, or a
// dedicated Suretix edge function. Endpoint + copy below are placeholders until
// that's settled.
const CHAT_ENDPOINT = 'https://avgvmzshujwphneykuvu.supabase.co/functions/v1/marketing-chat'

const GREETING = {
  role: 'assistant',
  content: "Hi — I can answer questions about how Suretix works for your agency. What's on your mind?",
}

// Proactive greeting bubble.
const GREETING_BUBBLE_DELAY_MS = 4000
const GREETING_BUBBLE_TEXT = 'Have a question about how this works for your agency? Happy to walk you through it.'

// Stateless per page load — no chat history persisted anywhere.
export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const scrollRef = useRef(null)

  const [showGreetingBubble, setShowGreetingBubble] = useState(false)
  const greetingBubbleDismissedRef = useRef(false)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, sending])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!greetingBubbleDismissedRef.current) setShowGreetingBubble(true)
    }, GREETING_BUBBLE_DELAY_MS)
    return () => clearTimeout(timer)
  }, [])

  function dismissGreetingBubble() {
    greetingBubbleDismissedRef.current = true
    setShowGreetingBubble(false)
  }

  function toggleChat() {
    setOpen((o) => {
      const next = !o
      if (next) dismissGreetingBubble()
      return next
    })
  }

  async function send(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || sending) return

    const nextMessages = [...messages, { role: 'user', content: text }]
    setMessages(nextMessages)
    setInput('')
    setError('')
    setSending(true)

    try {
      const resp = await fetch(CHAT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          // Only real prior turns, not the client-side-only greeting.
          history: nextMessages.filter((m) => m !== GREETING).slice(0, -1),
        }),
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data?.error || 'Something went wrong')
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch (err) {
      setError(err.message || 'Chat is temporarily unavailable — please try again shortly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 0.68, 0.32, 0.99] }}
            className="flex h-[28rem] w-[22rem] max-w-[90vw] flex-col overflow-hidden rounded-card border border-line bg-elevated shadow-[0_30px_60px_-25px_rgba(15,31,27,0.35)]"
          >
            <div className="border-b border-line px-5 py-4">
              <p className="eyebrow">Chat with Suretix</p>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={clsx(
                    'max-w-[85%] rounded-lg px-3.5 py-2.5 font-sans text-sm leading-relaxed',
                    m.role === 'user'
                      ? 'ml-auto bg-accent text-white'
                      : 'bg-surface text-fg-primary'
                  )}
                >
                  {m.content}
                </div>
              ))}
              {sending && (
                <div className="flex items-center gap-2 rounded-lg bg-surface px-3.5 py-2.5 font-sans text-sm text-fg-faint">
                  <Loader2 size={14} className="animate-spin" /> Thinking…
                </div>
              )}
              {error && (
                <div className="rounded-lg bg-[#fbe2de] px-3.5 py-2.5 font-sans text-sm text-danger">
                  {error}
                </div>
              )}
            </div>

            <form onSubmit={send} className="flex items-center gap-2 border-t border-line p-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question…"
                disabled={sending}
                className="flex-1 rounded-full border border-line bg-base px-4 py-2 font-sans text-sm text-fg-primary outline-none focus:border-accent disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={sending || !input.trim()}
                aria-label="Send"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showGreetingBubble && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 0.68, 0.32, 0.99] }}
            className="relative max-w-[16rem] rounded-2xl border border-line bg-elevated py-3 pl-4 pr-8 shadow-[0_20px_40px_-20px_rgba(15,31,27,0.35)]"
          >
            <button
              type="button"
              onClick={dismissGreetingBubble}
              aria-label="Dismiss"
              className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full text-fg-faint transition-colors hover:bg-surface hover:text-fg-primary"
            >
              <X size={12} />
            </button>
            <p className="font-sans text-sm leading-snug text-fg-primary">{GREETING_BUBBLE_TEXT}</p>
            {/* Prompt 497 — a small connector so the bubble reads as
                attached to the launcher beneath it rather than a floating,
                unrelated box (Regenix's own bubble has the same visual
                link). A rotated square showing only its bottom/right
                border+fill, half-overlapped into the bubble's own bottom
                edge so the seam disappears; horizontally centered under
                the 56px launcher button below (both share the container's
                right-aligned edge, so right-6 lands the diamond's own
                center within a pixel or two of the launcher's center). */}
            <span
              aria-hidden="true"
              className="absolute -bottom-[5px] right-6 h-2.5 w-2.5 rotate-45 border-b border-r border-line bg-elevated"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggleChat}
        aria-label={open ? 'Close chat' : 'Open chat'}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_20px_40px_-15px_rgba(36,70,158,0.6)] transition-transform duration-300 hover:scale-105 hover:bg-accent-deep"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  )
}
