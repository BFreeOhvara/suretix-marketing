import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const STEPS = [
  {
    n: '01',
    title: 'Consult',
    lead: 'We map how inquiries actually reach you.',
    body: 'Before a single line of automation, we audit your real intake funnel — channels, call volume, response times, and exactly where inquiries drop. No templates, no assumptions.',
    tags: ['FUNNEL AUDIT', 'CALL REVIEW', 'DROP-OFF MAPPING'],
  },
  {
    n: '02',
    title: 'Architect',
    lead: 'We design the system around your agency.',
    body: 'A clear blueprint: which agents, which scripts, which handoffs, and what writes back to your case management system and calendar. You see and approve the entire flow before anything ships.',
    tags: ['AGENT DESIGN', 'SCRIPT LOGIC', 'INTEGRATION PLAN'],
  },
  {
    n: '03',
    title: 'Install',
    lead: 'We build, integrate, and go live with you.',
    body: 'We configure the agents on your jurisdictions, bond types, and compliance requirements, connect them to your stack, and launch — with you watching every conversation from day one.',
    tags: ['BUILD', 'INTEGRATE', 'SUPERVISED LAUNCH'],
  },
  {
    n: '04',
    title: 'Optimize',
    lead: 'We tune relentlessly for bonds written.',
    body: 'Weekly review of real conversations and conversion data. We refine qualification, timing, and tone until the numbers move — then keep them moving as you grow.',
    tags: ['CONVERSATION QA', 'CONVERSION TUNING', 'REPORTING'],
  },
]

export default function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-shell px-6">
        <SectionHeading eyebrow="How It Works" title="A four-step install, not a software handoff." />

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-line lg:block" />
          <div className="grid items-stretch gap-8 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} direction="up" scale delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col">
                  <div className="relative flex items-center gap-3 lg:block">
                    <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-base font-mono text-sm text-accent-deep">
                      {s.n}
                    </span>
                    <h3 className="font-display text-xl font-medium text-fg-primary lg:mt-4">{s.title}</h3>
                  </div>
                  <p className="mt-3 font-sans text-sm text-fg-secondary lg:min-h-[2.5rem]">{s.lead}</p>
                  <div className="mt-4 flex-1 rounded-card border border-line bg-surface p-5">
                    <p className="font-sans text-sm leading-relaxed text-fg-secondary">{s.body}</p>
                    <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2 border-t border-line pt-4">
                      {s.tags.map((t) => (
                        <span key={t} className="eyebrow !text-fg-faint">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
