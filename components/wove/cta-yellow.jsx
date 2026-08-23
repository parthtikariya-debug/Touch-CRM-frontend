'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { LimeCTA, DarkCTA } from './liquid-glass'

/* ---------------- Yellow Dome CTA ---------------- */

const SCATTERED_PILLS = [
  { label: 'Book Demo',       x: '4%',  y: '4%',  rot: -8,  size: 'md' },
  { label: 'Start Free',      x: '14%', y: '30%', rot: 6,   size: 'md' },
  { label: 'Talk to Sales',   x: '22%', y: '58%', rot: -3,  size: 'sm' },
  { label: 'Watch Demo',      x: '52%', y: '2%',  rot: 5,   size: 'sm' },
  { label: 'Explore Features',x: '68%', y: '30%', rot: -6,  size: 'md' },
  { label: 'For D2C',         x: '82%', y: '4%',  rot: 9,   size: 'sm' },
  { label: 'For B2B',         x: '88%', y: '38%', rot: -10, size: 'sm' },
  { label: 'Read Docs',       x: '2%',  y: '62%', rot: 4,   size: 'sm' },
  { label: 'Case Studies',    x: '78%', y: '62%', rot: -4,  size: 'sm' },
]

function ScatteredPill({ label, x, y, rot, size, delay }) {
  const sizeCls =
    size === 'lg' ? 'h-11 md:h-12 px-5 md:px-6 text-[13.5px] md:text-[15px]' :
    size === 'md' ? 'h-10 md:h-11 px-4 md:px-5 text-[12.5px] md:text-[14px]' :
                    'h-9 md:h-10 px-4 text-[12px] md:text-[13px]'
  return (
    <motion.button
      initial={{ opacity: 0, y: 20, rotate: rot - 8 }}
      whileInView={{ opacity: 1, y: 0, rotate: rot }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, scale: 1.06 }}
      data-magnetic
      className={`absolute font-medium tracking-wider uppercase whitespace-nowrap rounded-full border border-black text-black ${sizeCls}`}
      style={{
        left: x,
        top: y,
        background: '#FEF48D',
        boxShadow: '0 6px 16px -6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.5)',
        transformOrigin: 'center center',
      }}
    >
      {label}
    </motion.button>
  )
}

/** Big white eye with a spring-driven black pupil that tracks the cursor. */
function BigEye({ side, botSectionRef }) {
  const eyeRef = useRef(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spx = useSpring(px, { damping: 22, stiffness: 220, mass: 0.7 })
  const spy = useSpring(py, { damping: 22, stiffness: 220, mass: 0.7 })

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onMove = (e) => {
      const el = eyeRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy) || 1
      const angle = Math.atan2(dy, dx)
      // Pupil radius: keep pupil inside white eye. eye half-width ~= r.width/2, pupil radius ~35% of eye.
      const maxOffX = r.width * 0.22
      const maxOffY = r.height * 0.24
      const scale = Math.min(1, dist / 400)
      px.set(Math.cos(angle) * maxOffX * scale)
      py.set(Math.sin(angle) * maxOffY * scale)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [px, py])

  return (
    <div
      ref={eyeRef}
      className="relative rounded-full bg-white border border-black/25 overflow-hidden"
      style={{
        width: 'clamp(90px, 12vw, 190px)',
        height: 'clamp(130px, 17vw, 260px)',
        boxShadow: 'inset 0 6px 14px rgba(0,0,0,0.06)',
      }}
      aria-hidden
    >
      <motion.div
        className="absolute rounded-full bg-black"
        style={{
          width: '52%',
          height: '38%',
          left: '24%',
          top: '31%',
          x: spx,
          y: spy,
        }}
      >
        {/* subtle catchlight */}
        <span className="absolute rounded-full bg-white/80"
          style={{ width: '22%', height: '18%', left: '18%', top: '18%' }} />
      </motion.div>
    </div>
  )
}

/** Wavy circle "scribble" underline decoration around the word "Hesitate". */
function Scribble() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 340 130"
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
    >
      <ellipse
        cx="170"
        cy="65"
        rx="160"
        ry="52"
        fill="none"
        stroke="#FEF48D"
        strokeWidth="4"
        transform="rotate(-8 170 65)"
      />
      <ellipse
        cx="170"
        cy="65"
        rx="158"
        ry="58"
        fill="none"
        stroke="#FEF48D"
        strokeWidth="3"
        opacity="0.65"
        transform="rotate(6 170 65)"
      />
    </svg>
  )
}

export function CTAYellowSection() {
  const sectionRef = useRef(null)
  return (
    <section id="cta" ref={sectionRef} className="relative overflow-hidden bg-[#F5EFE1] pt-28 md:pt-36 pb-0">
      {/* Playful headline (centered) with scattered yellow pills overlaid around it */}
      <div className="relative container mx-auto px-4 md:px-6 max-w-[1320px] text-center z-10">
        {/* Scattered pills absolutely positioned around the headline */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          {SCATTERED_PILLS.map((p, i) => (
            <div key={p.label} className="pointer-events-auto">
              <ScatteredPill {...p} delay={i * 0.06} />
            </div>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative font-serif-display text-[64px] leading-[0.95] md:text-[112px] md:leading-[0.92] tracking-[-0.02em] text-black"
        >
          Don&rsquo;t{' '}
          <span className="relative inline-block px-6">
            <Scribble />
            <span className="relative">Hesitate</span>
          </span>
          <br />
          to Reach <span className="italic">Out!</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.8 }}
          className="relative mt-6 md:mt-8 text-[15.5px] md:text-[17px] text-black/70 max-w-[540px] mx-auto"
        >
          Ready to build a brand customers keep coming back to? Join 2,400+ D2C teams running their engagement on Wove.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="relative mt-8 md:mt-10 flex flex-wrap justify-center gap-3"
        >
          <DarkCTA size="lg">Book Demo <ArrowRight className="w-4 h-4" /></DarkCTA>
        </motion.div>
      </div>

      {/* Yellow dome with cursor-tracking eyes */}
      <div className="relative mt-16 md:mt-24">
        <div
          className="relative mx-auto"
          style={{
            width: '112%',
            marginLeft: '-6%',
            height: 'clamp(360px, 44vw, 620px)',
            background: '#FEF48D',
            borderTopLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderTop: '1px solid rgba(0,0,0,0.15)',
          }}
        >
          {/* Eyes */}
          <div className="absolute inset-x-0 top-[38%] flex items-center justify-center gap-6 md:gap-10">
            <BigEye side="left" />
            <BigEye side="right" />
          </div>

          {/* Small quack/sparkle badges on the dome */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="absolute top-[16%] left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 text-black/70 text-[12px] uppercase font-medium"
            style={{ letterSpacing: '0.22em' }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span style={{ paddingLeft: '0.22em' }}>SAY HI</span>
            <Sparkles className="w-3.5 h-3.5" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/** Yellow footer that visually continues from the dome. */
export function FooterYellowSection() {
  const cols = [
    { h: 'Product', l: ['AI Agents', 'CRM', 'Omnichannel', 'Automation', 'Integrations'] },
    { h: 'Solutions', l: ['D2C', 'B2B SaaS', 'Financial Services', 'Enterprise'] },
    { h: 'Company', l: ['About', 'Customers', 'Careers', 'Press', 'Security'] },
    { h: 'Resources', l: ['Docs', 'Blog', 'Changelog', 'API', 'Status'] },
  ]
  return (
    <footer className="relative bg-[#FEF48D]">
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px] pt-16 pb-14">
        <div className="grid md:grid-cols-6 gap-10 md:gap-8">
          <div className="md:col-span-2">
            <a href="#" className="inline-flex items-center gap-2">
              <span className="w-8 h-8 rounded-full grid place-items-center bg-black">
                <Sparkles className="w-4 h-4 text-[#FEF48D]" strokeWidth={2.5} />
              </span>
              <span className="font-serif-display text-[28px] text-black">Wove</span>
            </a>
            <p className="mt-4 text-[14px] text-black/70 max-w-[280px] leading-relaxed">
              The AI Customer Engagement Suite for D2C brands.
            </p>
          </div>
          {cols.map((c) => (
            <div key={c.h}>
              <div className="text-[12px] uppercase tracking-wider text-black/55">{c.h}</div>
              <ul className="mt-4 space-y-2.5">
                {c.l.map((it) => (
                  <li key={it}>
                    <a href="#" className="text-[14px] text-black/80 hover:text-black transition-colors">
                      {it}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 h-px bg-black/15" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          <div className="text-[12.5px] text-black/60">© 2025 Wove Technologies. All rights reserved.</div>
          <div className="flex items-center gap-6 text-[12.5px] text-black/60">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Security</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
