"use client"
import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import type { MousePosition } from "./hooks/useMousePosition"

export interface SphereEyesProps {
  botSize: number
  mouse: MousePosition
  containerRef: React.RefObject<HTMLElement | null>
  /** When true, eyes squint / close (hover, waving, etc.). */
  closed?: boolean
  /** When bot is "frozen" (approach detected), eyes go wide-open. */
  frozen?: boolean
}

/**
 * Two eyes overlaid on the dot-sphere. Pupils track the cursor via spring physics
 * so the bot feels alive. Uses viewport coords → offset from each eye center,
 * clamped to a max radius inside the eye white.
 */
export default function SphereEyes({ botSize, mouse, containerRef, closed = false, frozen = false }: SphereEyesProps) {
  const eyeR = botSize * 0.14 // eye-white radius
  const eyeGap = botSize * 0.17 // half-distance between eye centers
  const eyeYOffset = -botSize * 0.05 // slight above middle
  const pupilR = eyeR * 0.5
  const maxOffset = eyeR - pupilR - 1

  // Motion values per eye
  const lx = useMotionValue(0), ly = useMotionValue(0)
  const rx = useMotionValue(0), ry = useMotionValue(0)
  const springCfg = { damping: 22, stiffness: 260, mass: 0.6 }
  const lxS = useSpring(lx, springCfg)
  const lyS = useSpring(ly, springCfg)
  const rxS = useSpring(rx, springCfg)
  const ryS = useSpring(ry, springCfg)

  // Compute pupil offsets on every mouse update using the CONTAINER position (not the eyes themselves,
  // which are hard to query on transformed parents). This keeps the math correct wherever the bot is.
  useEffect(() => {
    if (!containerRef.current || !mouse.active) {
      lx.set(0); ly.set(0); rx.set(0); ry.set(0)
      return
    }
    const rect = containerRef.current.getBoundingClientRect()
    const centerY = rect.top + rect.height / 2 + eyeYOffset
    const leftCx = rect.left + rect.width / 2 - eyeGap
    const rightCx = rect.left + rect.width / 2 + eyeGap

    const compute = (cx: number, cy: number) => {
      const dx = mouse.x - cx
      const dy = mouse.y - cy
      const dist = Math.hypot(dx, dy) || 1
      const angle = Math.atan2(dy, dx)
      const magnitude = Math.min(maxOffset, dist * 0.06 + maxOffset * 0.5)
      return { x: Math.cos(angle) * magnitude, y: Math.sin(angle) * magnitude }
    }
    const L = compute(leftCx, centerY)
    const R = compute(rightCx, centerY)
    lx.set(L.x); ly.set(L.y)
    rx.set(R.x); ry.set(R.y)
  }, [mouse.x, mouse.y, mouse.active, containerRef, eyeGap, eyeYOffset, maxOffset, lx, ly, rx, ry])

  const cx = botSize / 2
  const cy = botSize / 2 + eyeYOffset

  return (
    <svg
      width={botSize}
      height={botSize}
      viewBox={`0 0 ${botSize} ${botSize}`}
      className="absolute inset-0 pointer-events-none"
      aria-hidden
    >
      {/* Eye whites */}
      <motion.circle
        cx={cx - eyeGap} cy={cy} r={eyeR}
        fill="#FFFFFF"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth={0.5}
        animate={{ scaleY: closed ? 0.05 : frozen ? 1.15 : 1 }}
        style={{ transformOrigin: `${cx - eyeGap}px ${cy}px`, transformBox: "fill-box" }}
        transition={{ duration: 0.2 }}
      />
      <motion.circle
        cx={cx + eyeGap} cy={cy} r={eyeR}
        fill="#FFFFFF"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth={0.5}
        animate={{ scaleY: closed ? 0.05 : frozen ? 1.15 : 1 }}
        style={{ transformOrigin: `${cx + eyeGap}px ${cy}px`, transformBox: "fill-box" }}
        transition={{ duration: 0.2 }}
      />

      {/* Left pupil */}
      <motion.g style={{ x: lxS, y: lyS }}>
        <circle cx={cx - eyeGap} cy={cy} r={pupilR} fill="#0A0A0A" />
        <circle cx={cx - eyeGap - pupilR * 0.3} cy={cy - pupilR * 0.35} r={pupilR * 0.28} fill="#FFFFFF" opacity={0.9} />
      </motion.g>
      {/* Right pupil */}
      <motion.g style={{ x: rxS, y: ryS }}>
        <circle cx={cx + eyeGap} cy={cy} r={pupilR} fill="#0A0A0A" />
        <circle cx={cx + eyeGap - pupilR * 0.3} cy={cy - pupilR * 0.35} r={pupilR * 0.28} fill="#FFFFFF" opacity={0.9} />
      </motion.g>
    </svg>
  )
}
