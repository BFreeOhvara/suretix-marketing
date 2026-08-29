# suretix-marketing

Marketing site for **Suretix** — AI infrastructure for surety bond agencies.

Vite + React + Tailwind + framer-motion. Cloned from `restorix-marketing`'s
structure (Prompt 550), re-skinned with Suretix copy and the amber accent ramp.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run lint     # oxlint
```

## Notes

- **Placeholder branding.** No real Suretix logo or brand palette exists yet —
  plain-text wordmark + the amber ramp from `restorix-portal`'s
  `[data-brand="suretix"]` block stand in until brand assets are supplied.
- **Light-only.** No dark mode (same as `restorix-marketing`).
- **ChatWidget is not mounted** — its `marketing-chat` backend is
  behavioral-health-specific. Needs a Suretix-aware backend before enabling.
- **Booking link** (`ui/Button.jsx`) points at `mailto:hello@suretix.co` as a
  placeholder — confirm the real destination.
- No favicon/app-icon assets yet.
