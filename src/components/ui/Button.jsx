import clsx from 'clsx'

// TODO(Brayden): confirm the real Suretix booking destination — this mailbox
// may not exist yet. restorix-marketing used mailto:hello@restorix.io; mirrored
// to the suretix.co domain here as a placeholder.
const BOOKING_HREF = 'mailto:hello@suretix.co?subject=Strategy%20Call%20Request'

export function PrimaryButton({ children, href = BOOKING_HREF, className, ...props }) {
  return (
    <a
      href={href}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3',
        'font-sans text-sm font-semibold text-white transition-all duration-300',
        'hover:bg-accent-deep hover:shadow-[0_0_0_1px_var(--accent-deep)]',
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}

export function SecondaryButton({ children, href = '#system', className, ...props }) {
  return (
    <a
      href={href}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3',
        'font-sans text-sm font-medium text-fg-primary transition-all duration-300',
        'hover:border-fg-primary/40 hover:bg-elevated',
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}

export { BOOKING_HREF }
