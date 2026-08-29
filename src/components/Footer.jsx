const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-shell flex-col items-center justify-between gap-4 px-6 text-sm text-fg-faint md:flex-row">
        {/* Prompt 552 — real Suretix icon mark, replaces the text placeholder. */}
        <span className="flex items-center gap-2 font-display font-medium text-fg-secondary">
          <img src="/logo-icon.png" alt="Suretix" className="h-5 w-auto" />
        </span>
        <span>© {YEAR} Suretix. AI infrastructure for surety bond agencies.</span>
      </div>
    </footer>
  )
}
