import { useEffect, useState } from 'react'
import { PrimaryButton } from './ui/Button'

const LINKS = [
  { href: '#leak', label: 'The Leak' },
  { href: '#system', label: 'The System' },
  { href: '#process', label: 'Process' },
  { href: '#who', label: "Who It's For" },
]

// Prompt 484 — found while restoring the Live Intake card's glass panel:
// this bar's own scroll-glass background was silently broken the whole
// time. `bg-base/80` never generated any CSS rule at all, because
// tailwind.config.js defines `base` (and every other custom color here)
// as a plain `var(--x)` string rather than the `rgb(var(--x-rgb) /
// <alpha-value>)` form Tailwind's opacity-modifier syntax needs — the
// same already-flagged, still-open app-wide bug from Prompt 477
// (`task_569e9ca8`), now confirmed a second time on a different
// element. Worked around here the same way 477 did: a literal
// `bg-[rgba(...)]` arbitrary value, which bypasses the broken
// CSS-var + opacity-modifier pipeline entirely.
export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(229,236,234,0.8)] backdrop-blur-md border-b border-line'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-shell items-center justify-between px-6 py-5">
        {/* No Suretix logo asset exists yet — plain-text wordmark stands in
            until Brayden supplies real brand assets (same as restorix-portal
            Prompt 549). */}
        <a href="#top" className="flex items-center gap-2.5">
          <span className="font-display text-lg font-semibold tracking-tight text-fg-primary">
            Suretix
          </span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-sm text-fg-secondary transition-colors hover:text-fg-primary"
            >
              {l.label}
            </a>
          ))}
        </div>
        <PrimaryButton className="!px-5 !py-2.5 text-xs md:text-sm">Book a Strategy Call</PrimaryButton>
      </nav>
    </header>
  )
}
