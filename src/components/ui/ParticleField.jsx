import { useEffect, useRef } from 'react'

const DOT_COUNT = 42
// Prompt 496 — live review against Regenix side-by-side: dots read as too
// small/sparse and links too thin to register as a real constellation.
// LINK_DISTANCE roughly doubled (130 -> 250) rather than bumped
// incrementally — pair-count-within-radius grows with the *square* of the
// radius for a fixed random dot distribution, so this alone is what pushes
// average connections-per-dot from ~2 into Brayden's "clusters up to ~12"
// ballpark, verified with a real before/after count rather than assumed
// from the ratio (see commit message). Line opacity/width bumped to match
// (LINK_OPACITY 0.18->0.28, stroke width 1->1.25) so the denser network
// reads distinctly, not just as more faint hairlines.
const LINK_DISTANCE = 250
const LINK_OPACITY = 0.28
const LINE_WIDTH = 1.25
const SPEED = 0.12
const REPEL_RADIUS = 90
const REPEL_STRENGTH = 42
const EASE = 0.12

// Hero's ambient background — a slow constellation field, tinted with the
// Suretix amber accent (#B45309 / #F59E0B). Canvas rather than
// 40+ animated DOM/SVG nodes — cheaper to redraw as pixels every frame
// than to diff as a tree, same reasoning Prompt 450 gave for hand-rolling
// chart SVGs instead of pulling in a library. Paused via
// IntersectionObserver once the hero scrolls out of view, and skipped
// entirely under prefers-reduced-motion (draws one static frame instead)
// — both specifically because an unmanaged full-viewport rAF loop is
// exactly the kind of thing that tanks a Lighthouse perf score.
//
// Removed in Prompt 472 (over-literal read of "more life via subtle
// animation" as this exact effect, too close a copy of Regenix's own
// hero), replaced by Prompts 479-486's various ambient-glow/wave attempts
// — Brayden ultimately rejected all of those too and asked for this back,
// confirmed deliberately after more thought (Prompt 490): a dot network
// isn't uniquely Regenix's, it's a generic tech-aesthetic pattern, so the
// concept was never the actual problem. Restored from git history
// (commit 23dcb3a) as the real starting point rather than rebuilt from
// scratch, plus two genuine upgrades beyond what existed then:
//   1. Mouse-repulsion — each dot tracks a "home" position (the same
//      random-walk drift as before) separately from its rendered
//      position; on every frame the rendered position eases toward
//      home + an outward push when the cursor is within REPEL_RADIUS,
//      scaled by proximity. Moving the cursor away lets the push
//      naturally fall to zero and the easing pulls dots back to their
//      drift path on its own — no separate "return" state needed.
//   2. `onPointerMove`/`onPointerLeave` live on the *parent* section, not
//      the canvas — the canvas itself is `pointer-events-none` (so it
//      never blocks clicks on real content), which means it can never
//      receive its own pointer events either. Coordinates are converted
//      from the parent's event into canvas-local space via the canvas's
//      own bounding rect.
// Both new pieces are gated by the exact same reduced-motion check as the
// rest of the effect — under `prefers-reduced-motion: reduce`, the rAF
// loop never starts at all, so dots render once at their seeded position
// with no drift and no repulsion, consistent with "skip or heavily
// simplify motion."
export default function ParticleField({ className = '' }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!canvas || !parent) return

    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0
    let dots = []
    let rafId = null

    function resize() {
      const rect = parent.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function seed() {
      dots = Array.from({ length: DOT_COUNT }, () => {
        const x = Math.random() * width
        const y = Math.random() * height
        return {
          x, y, // "home" position — the original drift path
          rx: x, ry: y, // rendered position — home plus eased repulsion
          vx: (Math.random() - 0.5) * SPEED,
          vy: (Math.random() - 0.5) * SPEED,
          // Prompt 496 — radius range roughly doubled from the original
          // 0.6-2.0 (min +83%, max +80%), inside Brayden's requested
          // 75-100% larger range.
          r: Math.random() * 2.6 + 1.1,
        }
      })
    }

    function draw(animate) {
      ctx.clearRect(0, 0, width, height)
      const mouse = mouseRef.current
      for (const d of dots) {
        if (animate) {
          d.x += d.vx
          d.y += d.vy
          if (d.x < 0 || d.x > width) d.vx *= -1
          if (d.y < 0 || d.y > height) d.vy *= -1
        }

        let targetX = d.x
        let targetY = d.y
        const distX = d.x - mouse.x
        const distY = d.y - mouse.y
        const dist = Math.hypot(distX, distY)
        if (dist < REPEL_RADIUS && dist > 0.01) {
          const force = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH
          targetX += (distX / dist) * force
          targetY += (distY / dist) * force
        }

        if (animate) {
          d.rx += (targetX - d.rx) * EASE
          d.ry += (targetY - d.ry) * EASE
        } else {
          d.rx = targetX
          d.ry = targetY
        }
      }

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i]
          const b = dots[j]
          const dist = Math.hypot(a.rx - b.rx, a.ry - b.ry)
          if (dist < LINK_DISTANCE) {
            // rgba mirrors the Suretix --accent (#B45309) — canvas
            // fillStyle/strokeStyle can't resolve CSS custom properties, so the
            // value is hardcoded here rather than read from the design token.
            ctx.strokeStyle = `rgba(180, 83, 9, ${LINK_OPACITY * (1 - dist / LINK_DISTANCE)})`
            ctx.lineWidth = LINE_WIDTH
            ctx.beginPath()
            ctx.moveTo(a.rx, a.ry)
            ctx.lineTo(b.rx, b.ry)
            ctx.stroke()
          }
        }
      }
      // rgba mirrors the Suretix --accent-bright (#F59E0B), same reason as above.
      ctx.fillStyle = 'rgba(245, 158, 11, 0.6)'
      for (const d of dots) {
        ctx.beginPath()
        ctx.arc(d.rx, d.ry, d.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function loop() {
      draw(true)
      rafId = requestAnimationFrame(loop)
    }

    let seeded = false

    // ResizeObserver, not a window `resize` listener: on first mount the
    // parent's rect can legitimately still be 0-width (the grid layout
    // hasn't settled yet at the point this effect runs), and a
    // window-resize-only listener would leave the canvas permanently
    // zero-sized until the user actually resized the browser. ResizeObserver
    // fires once immediately on observe() with whatever the current size
    // is, then again the moment it changes — so it self-corrects.
    const sizeObserver = new ResizeObserver(() => {
      resize()
      if (!seeded && width > 0 && height > 0) {
        seed()
        seeded = true
      }
      draw(false)
    })
    sizeObserver.observe(parent)

    function onPointerMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    function onPointerLeave() {
      mouseRef.current = { x: -9999, y: -9999 }
    }
    if (!reduceMotion) {
      parent.addEventListener('pointermove', onPointerMove)
      parent.addEventListener('pointerleave', onPointerLeave)
    }

    let intersectionObserver = null
    if (!reduceMotion) {
      intersectionObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          if (rafId == null) rafId = requestAnimationFrame(loop)
        } else if (rafId != null) {
          cancelAnimationFrame(rafId)
          rafId = null
        }
      })
      intersectionObserver.observe(canvas)
    }

    return () => {
      sizeObserver.disconnect()
      if (rafId != null) cancelAnimationFrame(rafId)
      if (intersectionObserver) intersectionObserver.disconnect()
      parent.removeEventListener('pointermove', onPointerMove)
      parent.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
