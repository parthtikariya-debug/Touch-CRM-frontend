'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * CloudStudio-style cursor:
 *   - Small dot follows mouse with tight spring
 *   - Larger elastic ring follows with softer spring
 *   - Scales up + reveals label when hovering [data-cursor]
 *   - Magnetic pull toward [data-magnetic] targets
 *   - Uses mix-blend-mode: difference for contrast on any bg
 */
export function CustomCursor() {
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const ringX = useMotionValue(-100)
  const ringY = useMotionValue(-100)

  const dotSX = useSpring(dotX, { damping: 30, stiffness: 800, mass: 0.3 })
  const dotSY = useSpring(dotY, { damping: 30, stiffness: 800, mass: 0.3 })
  const ringSX = useSpring(ringX, { damping: 20, stiffness: 180, mass: 0.6 })
  const ringSY = useSpring(ringY, { damping: 20, stiffness: 180, mass: 0.6 })

  const [label, setLabel] = useState('')
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const rafRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) return

    let mouseX = -100, mouseY = -100

    const onMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY
      setVisible(true)

      // Magnetic pull: check element under cursor
      const el = document.elementFromPoint(e.clientX, e.clientY)
      const magnet = el?.closest?.('[data-magnetic]')
      if (magnet) {
        const r = magnet.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        // Pull ring toward center by ~25%
        ringX.set(mouseX + (cx - mouseX) * 0.25)
        ringY.set(mouseY + (cy - mouseY) * 0.25)
      } else {
        ringX.set(mouseX)
        ringY.set(mouseY)
      }
      dotX.set(mouseX)
      dotY.set(mouseY)

      const cursorTarget = el?.closest?.('[data-cursor]')
      if (cursorTarget) {
        setHovering(true)
        setLabel(cursorTarget.getAttribute('data-cursor') || '')
      } else if (magnet || el?.closest?.('a, button')) {
        setHovering(true)
        setLabel('')
      } else {
        setHovering(false)
        setLabel('')
      }
    }

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('mouseenter', onEnter)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('mouseenter', onEnter)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full"
        style={{
          x: ringSX, y: ringSY,
          translateX: '-50%', translateY: '-50%',
          width: hovering ? 84 : 38,
          height: hovering ? 84 : 38,
          border: '1px solid rgba(255,255,255,0.7)',
          background: hovering ? 'rgba(255,255,255,0.06)' : 'transparent',
          mixBlendMode: 'difference',
          opacity: visible ? 1 : 0,
          transition: 'width 260ms cubic-bezier(.2,.9,.2,1), height 260ms cubic-bezier(.2,.9,.2,1), background 200ms',
        }}
      >
        {label && (
          <span className="absolute inset-0 flex items-center justify-center text-[11px] tracking-wider uppercase text-white">
            {label}
          </span>
        )}
      </motion.div>
      {/* Dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full bg-white"
        style={{
          x: dotSX, y: dotSY,
          translateX: '-50%', translateY: '-50%',
          width: hovering ? 0 : 6, height: hovering ? 0 : 6,
          mixBlendMode: 'difference',
          opacity: visible ? 1 : 0,
          transition: 'width 200ms, height 200ms',
        }}
      />
    </>
  )
}
