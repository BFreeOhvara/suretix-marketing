import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const METRICS = [
  { label: 'Average first-response time', note: 'Target: under 60 seconds, day or night' },
  { label: 'Inquiry-to-bond-written lift', note: 'Measured within the first 90 days live' },
  { label: 'Missed calls re-engaged', note: 'Automatic text-back & callback' },
  { label: 'Hours reclaimed each week', note: 'Dispatch admin removed' },
]

export default function Outcomes() {
  return (
    <section id="outcomes" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Outcomes" title="The numbers an agency owner actually cares about." />
          <Reveal direction="left" delay={0.1}>
            <div className="flex items-center gap-3 rounded-full border border-line bg-surface px-5 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-bright" />
              <span className="font-sans text-sm text-fg-secondary">Suretix is early — real client data, not averages</span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-14">
          <div className="grid divide-y divide-line rounded-card border border-line bg-surface sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
            {METRICS.map((m) => (
              <div key={m.label} className="p-8">
                <span className="font-display text-5xl font-medium text-fg-faint">—</span>
                <p className="mt-4 font-sans text-sm font-medium text-fg-primary">{m.label}</p>
                <p className="eyebrow mt-2 !text-fg-faint">{m.note}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
