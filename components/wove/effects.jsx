'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, animate as fmAnimate } from 'framer-motion'

/** CountUp: animates a number when scrolled into view */
export function CountUp({ to, from = 0, duration = 1.6, decimals = 0, prefix = '', suffix = '', className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [val, setVal] = useState(from)
  useEffect(() => {
    if (!inView) return
    const ctrl = fmAnimate(from, to, {
      duration, ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    })
    return () => ctrl.stop()
  }, [inView, to, from, duration])
  return <span ref={ref} className={className}>{prefix}{val.toFixed(decimals)}{suffix}</span>
}

/** Dot Bot: intelligent floating particle. Idle drift, mouse tracking, click to open menu, scroll-navigate. */
export function DotBot() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { damping: 22, stiffness: 140, mass: 0.8 })
  const sy = useSpring(y, { damping: 22, stiffness: 140, mass: 0.8 })
  const [open, setOpen] = useState(false)
  const [wave, setWave] = useState(false)
  const idleRef = useRef({ px: 0, py: 0, vx: 0.4, vy: 0.3 })
  const targetRef = useRef({ tx: 0, ty: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) return

    let mouseX = window.innerWidth * 0.85
    let mouseY = window.innerHeight * 0.8
    let following = false
    let lastMove = 0

    // Initial position: bottom-right corner
    x.set(window.innerWidth - 100)
    y.set(window.innerHeight - 100)
    idleRef.current.px = window.innerWidth - 100
    idleRef.current.py = window.innerHeight - 100

    const onMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY; lastMove = performance.now()
      const dx = mouseX - idleRef.current.px
      const dy = mouseY - idleRef.current.py
      const dist = Math.hypot(dx, dy)
      following = dist < 260
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let raf
    const loop = () => {
      const state = idleRef.current
      if (following) {
        // magnetic follow, offset behind cursor
        const angle = Math.atan2(mouseY - state.py, mouseX - state.px)
        const targetX = mouseX - Math.cos(angle) * 90
        const targetY = mouseY - Math.sin(angle) * 90
        state.px += (targetX - state.px) * 0.12
        state.py += (targetY - state.py) * 0.12
      } else {
        // idle drift with soft bounds
        state.px += state.vx; state.py += state.vy
        const margin = 40
        if (state.px < margin || state.px > window.innerWidth - margin) state.vx *= -1
        if (state.py < margin + 100 || state.py > window.innerHeight - margin) state.vy *= -1
        // gentle random accel
        state.vx += (Math.random() - 0.5) * 0.05
        state.vy += (Math.random() - 0.5) * 0.05
        const speed = Math.hypot(state.vx, state.vy)
        if (speed > 1.6) { state.vx *= 0.9; state.vy *= 0.9 }
      }
      x.set(state.px); y.set(state.py)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [x, y])

  const navTo = (id) => {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const options = [
    { id: 'features', label: 'Features' },
    { id: 'ai-agents', label: 'AI Agents' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'faq', label: 'FAQ' },
  ]

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9990]"
      style={{ x: sx, y: sy }}
    >
      <div className="relative pointer-events-auto" style={{ transform: 'translate(-50%,-50%)' }}>
        {/* Menu popover */}
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute bottom-full right-0 mb-3 min-w-[180px] p-2 rounded-2xl glass-light"
          >
            <div className="px-2 py-1.5 text-[11px] uppercase tracking-wider text-black/50">Jump to</div>
            {options.map((o) => (
              <button key={o.id} onClick={() => navTo(o.id)} data-magnetic
                className="w-full text-left px-3 py-2 rounded-xl text-[13px] text-black hover:bg-black/5 transition-colors">
                {o.label}
              </button>
            ))}
          </motion.div>
        )}
        {/* Bot body */}
        <button
          data-cursor="hey"
          onClick={() => { setOpen(o => !o); setWave(true); setTimeout(() => setWave(false), 800) }}
          className="relative w-11 h-11 rounded-full grid place-items-center"
          style={{
            background: 'radial-gradient(circle at 35% 30%, #ffffff, #FEF48D 55%, #97BAFF 100%)',
            boxShadow: '0 8px 24px -6px rgba(225,254,3,0.6), 0 0 0 1px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.9)',
          }}
        >
          {/* eyes */}
          <span className="absolute inset-0 grid place-items-center">
            <span className="flex gap-1.5">
              <motion.span className="w-1.5 h-1.5 rounded-full bg-black"
                animate={{ scaleY: wave ? [1, 0.15, 1] : [1, 0.15, 1, 1] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.03, 0.06, 1] }} />
              <motion.span className="w-1.5 h-1.5 rounded-full bg-black"
                animate={{ scaleY: wave ? [1, 0.15, 1] : [1, 0.15, 1, 1] }} transition={{ duration: 3, repeat: Infinity, times: [0, 0.03, 0.06, 1] }} />
            </span>
          </span>
          {/* halo */}
          <span aria-hidden className="absolute -inset-3 rounded-full blur-xl opacity-60"
            style={{ background: 'radial-gradient(circle, rgba(225,254,3,0.5), transparent 60%)' }} />
        </button>
      </div>
    </motion.div>
  )
}

/** Reveal wrapper for section fade+slide+blur */
export function Reveal({ children, delay = 0, y = 24, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
