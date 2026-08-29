import { ArrowRight } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { PrimaryButton } from './ui/Button'

const SEGMENTS = [
  {
    n: '01',
    title: 'County & municipal bail agencies',
    body: 'Time-critical release calls qualified and dispatched before a family calls the next bondsman — with charge, bond amount, and jurisdiction confirmed on first contact.',
  },
  {
    n: '02',
    title: 'Felony & high-bond cases',
    body: 'Complex, high-value bonds handled with the right collateral and co-signer questions in the right order, every time — no detail lost between shifts.',
  },
  {
    n: '03',
    title: 'Immigration bond agencies',
    body: 'ICE detention calls are a different urgency and a different script. Screened and routed correctly from the first ring, any hour a family reaches out.',
  },
  {
    n: '04',
    title: 'Multi-jurisdiction & multi-county agencies',
    body: "Consistent intake no matter which county jail is calling — the same accurate first response whether it's your home county or three hours away.",
  },
  {
    n: '05',
    title: 'Federal bond agents',
    body: 'Higher-stakes federal cases get the qualification depth they require — always-on capture that turns a 2am call into a dispatched agent.',
  },
]

export default function WhoItsFor() {
  return (
    <section id="who" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Who It's For"
            title="Built for serious surety bond agencies."
            body="Suretix is purpose-built for agencies where the release journey is urgent, high-stakes, and easy to lose to whoever answers first."
          />

          <div className="border-t border-line">
            {SEGMENTS.map((s, i) => (
              <Reveal key={s.n} direction="right" delay={i * 0.05}>
                <div className="grid grid-cols-[3.5rem_1fr] gap-6 border-b border-line py-7 md:grid-cols-[4.5rem_1fr]">
                  <span className="font-display text-3xl font-medium text-fg-faint md:text-4xl">{s.n}</span>
                  <div>
                    <h3 className="font-display text-lg font-medium text-fg-primary md:text-xl">{s.title}</h3>
                    <p className="mt-2 max-w-xl font-sans text-sm leading-relaxed text-fg-secondary">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal direction="right" delay={SEGMENTS.length * 0.05}>
              <div className="flex flex-col items-start gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-display text-lg font-medium text-fg-primary">
                  Adjacent specialty? If your clients call before they're released, Suretix fits.
                </p>
                <PrimaryButton className="shrink-0">
                  Check your fit <ArrowRight size={15} />
                </PrimaryButton>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
