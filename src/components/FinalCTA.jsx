import Reveal from './ui/Reveal'
import { PrimaryButton } from './ui/Button'

const TICKER = ['30-MINUTE STRATEGY CALL', 'WE MAP YOUR FUNNEL LIVE', 'NO OBLIGATION']

export default function FinalCTA() {
  return (
    <section id="cta" className="relative py-24 md:py-32">
      <div className="relative mx-auto max-w-shell px-6">
        <Reveal scale>
          <div className="relative overflow-hidden rounded-card border border-line bg-surface px-8 py-16 text-center md:px-16 md:py-20">
            <div className="glow left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-30" />
            <div className="relative">
              <p className="eyebrow">Book a Strategy Call</p>
              <h2 className="mx-auto mt-5 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight text-fg-primary md:text-5xl">
                Stop paying to attract bonds you never write.
              </h2>
              <p className="mx-auto mt-5 max-w-xl font-sans text-base text-fg-secondary md:text-lg">
                In 30 minutes we'll map your current intake funnel, show you exactly where it
                leaks, and outline the Suretix system that closes it. If it's not a fit, we'll
                tell you.
              </p>
              <div className="mt-9">
                <PrimaryButton className="!px-8 !py-3.5 text-base">Book a Strategy Call</PrimaryButton>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {TICKER.map((t, i) => (
                  <span key={t} className="flex items-center gap-3">
                    <span className="eyebrow !text-fg-faint">{t}</span>
                    {i < TICKER.length - 1 && <span className="h-1 w-1 rounded-full bg-fg-faint" />}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
