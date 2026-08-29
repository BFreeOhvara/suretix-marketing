import clsx from 'clsx'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const STAGES = [
  {
    n: '01',
    title: 'The Missed Call',
    body: "Bail inquiries hit voicemail at 2am, over weekends, mid-transport. Most callers don't wait — they call the next bondsman in the search results.",
    stat: 'Nights & weekends',
    caption: 'when most arrests — and most calls — happen',
  },
  {
    n: '02',
    title: 'The Slow Follow-Up',
    body: "By the time someone calls back, the family may have already found another agency — or a decision's been made without you. Manual callback queues can't keep pace with how fast this decision gets made.",
    stat: '9–21×',
    caption: 'more likely to convert when contacted within 5 minutes',
  },
  {
    n: '03',
    title: 'The Cold Lead',
    body: "Without someone qualifying the charge, bond amount, and collateral fast, a real inquiry goes cold within hours — the person's released another way, or the family moves on to whoever answered first.",
    stat: 'Hours, not days',
    caption: 'before the person is released another way or moved to arraignment',
  },
  {
    n: '04',
    title: 'The Buried Front Desk',
    body: "Confirming jurisdiction, running the charge, and manually calling jails back eat hours that should go to the clients you're already bonding out.",
    stat: '18.5%',
    caption: 'click-to-call conversion, vs. 2.8% for form fills',
  },
]

export default function Leak() {
  return (
    <section id="leak" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6">
        <SectionHeading
          eyebrow="The Leak"
          title="Most agencies lose the bonds they've already won."
          body="You spend real money and reputation to be the name someone finds at 2am. Then the funnel leaks between “they called” and “you wrote the bond.” It's rarely a marketing problem — it's an infrastructure problem."
          footnote="The 5-minute response stat is general lead-response-time research (Velocify/InsideSales.com, Harvard Business Review), not bail-specific — treat the others as directional, not cited."
        />

        <div className="mt-16 divide-y divide-line border-y border-line">
          {STAGES.map((s, i) => {
            const reversed = i % 2 === 1
            // Some Suretix stats are short phrases ("Nights & weekends") rather
            // than a compact figure ("18.5%") — scale those down so they don't
            // overflow the stat column on narrow viewports.
            const phraseStat = s.stat.includes(' ')
            return (
              <Reveal key={s.n} direction={reversed ? 'left' : 'right'} delay={i * 0.05}>
                <div
                  className={clsx(
                    'grid items-center gap-6 py-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-16',
                    reversed && 'md:[&>*:first-child]:order-2'
                  )}
                >
                  <div>
                    <span className="eyebrow">{s.n} / The Leak</span>
                    <h3 className="mt-3 font-display text-2xl font-medium text-fg-primary">{s.title}</h3>
                    {/* Inline color mirrors restorix-marketing's Prompt 485 fix:
                        the `text-fg-secondary` class alone resolved to the wrong
                        custom property on exactly these body paragraphs. An
                        inline style always wins regardless of root cause. */}
                    <p
                      className="mt-3 max-w-md font-sans text-sm leading-relaxed text-fg-secondary md:text-base"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {s.body}
                    </p>
                  </div>
                  <div className={clsx('flex flex-col', reversed ? 'md:items-start' : 'md:items-end')}>
                    <span
                      className={clsx(
                        'font-display font-medium leading-none text-accent',
                        phraseStat
                          ? 'max-w-[14rem] text-2xl md:text-3xl'
                          : 'text-5xl md:text-6xl',
                        reversed ? 'md:text-left' : 'md:text-right'
                      )}
                    >
                      {s.stat}
                    </span>
                    <p
                      className={clsx(
                        'eyebrow mt-3 max-w-[14rem] !text-fg-faint',
                        reversed ? 'md:text-left' : 'md:text-right'
                      )}
                    >
                      {s.caption}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
