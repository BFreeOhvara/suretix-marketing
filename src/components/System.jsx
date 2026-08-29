import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { PhoneIncoming, MessageSquareText, Scale, ClipboardCheck, HeartHandshake } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const CAPABILITIES = [
  {
    n: '01',
    icon: PhoneIncoming,
    title: 'Lead capture & qualification',
    body: 'Every inquiry — call, text, or web — answered and scored in seconds, then routed by urgency so cases that need a bondsman first reach one first.',
  },
  {
    n: '02',
    icon: MessageSquareText,
    title: 'Missed-call recovery',
    body: 'An unanswered call instantly triggers a text-back and callback sequence, so the inquiry your marketing paid for never reaches a competitor.',
  },
  {
    n: '03',
    icon: Scale,
    title: 'Charge & bond-amount triage',
    body: 'A voice agent that asks the right questions — charge, bond amount, jurisdiction, collateral — on brand, around the clock, and routes each caller to the right next step.',
  },
  {
    n: '04',
    icon: ClipboardCheck,
    title: 'Structured intake & dispatch',
    body: 'Intake collected conversationally and written straight to your case system — no double entry, no details lost between shifts.',
  },
  {
    n: '05',
    icon: HeartHandshake,
    title: 'Follow-up & nurture',
    body: "Persistent, appropriate follow-up that keeps an undecided family supported until they're ready to move — never pushy, always human when it matters.",
  },
]

// Scroll-linked active-step tracking: whichever capability block is nearest the
// viewport's vertical center becomes "active." rootMargin shrinks the observed
// band to 45% from each edge, so the swap happens as a block crosses mid-screen.
// Works both scroll directions by construction.
function useActiveCapability(count) {
  const itemRefs = useRef([])
  const [active, setActive] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const idx = itemRefs.current.indexOf(entry.target)
          if (idx !== -1) setActive(idx)
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    itemRefs.current.slice(0, count).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [count])

  return { itemRefs, active }
}

// A vertical scroll-fill line down the left side of the stacked cards, driven by
// the same `active` scroll-spy state — a step-progress fill. The active icon
// badge gets a glow (amber accent); inactive badges stay a plain outline.
export default function System() {
  const { itemRefs, active } = useActiveCapability(CAPABILITIES.length)
  const fillPct = ((active + 1) / CAPABILITIES.length) * 100

  return (
    <section id="system" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="The Suretix System"
            title="Not a chatbot. A connected response layer."
            body="Five capabilities, architected as one system around your agency. Each part hands off to the next — capture to qualify, recover to dispatch, dispatch to follow-up — so no inquiry falls through the gaps between tools."
          />
          <Reveal direction="left" delay={0.15}>
            <span className="hidden shrink-0 rounded-full border border-accent/30 bg-surface px-5 py-2 font-display text-sm font-medium tracking-tight text-accent-deep md:inline-block">
              Suretix<span className="text-accent">CORE</span>
            </span>
          </Reveal>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-7 top-2 bottom-2 hidden w-px bg-line md:block" />
          <motion.div
            className="absolute left-7 top-2 hidden w-px origin-top bg-accent md:block"
            initial={false}
            animate={{ height: `${fillPct}%` }}
            transition={{ duration: 0.4, ease: [0.22, 0.68, 0.32, 0.99] }}
          />

          <div className="space-y-8">
            {CAPABILITIES.map((c, i) => {
              const isActive = active === i
              return (
                <div key={c.n} ref={(el) => (itemRefs.current[i] = el)} className="relative md:pl-16">
                  <span
                    className={clsx(
                      'absolute left-0 top-0 z-10 hidden h-14 w-14 items-center justify-center rounded-full border-2 bg-elevated transition-all duration-300 md:flex',
                      isActive
                        ? 'border-accent text-accent shadow-[0_0_0_6px_rgba(180,83,9,0.15),0_0_22px_-2px_rgba(180,83,9,0.55)]'
                        : 'border-line text-fg-faint'
                    )}
                  >
                    <c.icon size={20} strokeWidth={1.75} />
                  </span>
                  <Reveal direction="up" delay={i * 0.05}>
                    <div
                      className={clsx(
                        'rounded-card border p-7 transition-colors duration-300 md:max-w-2xl',
                        isActive ? 'border-accent/40 bg-elevated' : 'border-line bg-surface'
                      )}
                    >
                      <div className="flex items-center gap-3 md:hidden">
                        <span
                          className={clsx(
                            'flex h-9 w-9 items-center justify-center rounded-full border-2 bg-elevated transition-all duration-300',
                            isActive ? 'border-accent text-accent shadow-[0_0_16px_-2px_rgba(180,83,9,0.55)]' : 'border-line text-fg-faint'
                          )}
                        >
                          <c.icon size={16} strokeWidth={1.75} />
                        </span>
                        <span className="eyebrow">{c.n}</span>
                      </div>
                      <span className="eyebrow hidden md:inline">{c.n}</span>
                      <h3 className="mt-2 font-display text-lg font-medium text-fg-primary md:mt-1">
                        {c.title}
                      </h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-fg-secondary">{c.body}</p>
                    </div>
                  </Reveal>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
