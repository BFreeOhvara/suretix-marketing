import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, body, footnote, align = 'left' }) {
  return (
    <Reveal className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl font-medium leading-tight tracking-tight text-fg-primary md:text-4xl">
        {title}
      </h2>
      {body && <p className="mt-4 font-sans text-base text-fg-secondary md:text-lg">{body}</p>}
      {footnote && <p className="eyebrow mt-6 !text-fg-faint">{footnote}</p>}
    </Reveal>
  )
}
