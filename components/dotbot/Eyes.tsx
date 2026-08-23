"use client"
import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import Pupil from "./Pupil"
import { useEyeTracking } from "./hooks/useEyeTracking"
import type { MousePosition } from "./hooks/useMousePosition"

export interface EyesProps {
  botSize: number
  mouse: MousePosition
  /** Force pupil positions (used by expressions like laughing / winking). */
  closed?: boolean
  winkRight?: boolean
}

/**
 * Two eyes. Pupils track mouse via useEyeTracking hook and are spring-driven for smoothness.
 * Random natural blink every 5–8s. Blinks scale-Y the pupil group.
 */
export default function Eyes({ botSize, mouse, closed = false, winkRight = false }: EyesProps) {
  const eyeR = botSize * 0.13 // eye white radius
  const eyeGap = botSize * 0.16 // half distance between eye centers
  const eyeY = botSize * 0.44 // vertical center of eyes
  const pupilR = eyeR * 0.55
  const maxOffset = eyeR - pupilR - 1 // px, clamp pupil inside

  const leftRef = useRef<SVGCircleElement | null>(null)
  const rightRef = useRef<SVGCircleElement | null>(null)

  const leftTarget = useEyeTracking(leftRef.current, mouse, maxOffset)
  const rightTarget = useEyeTracking(rightRef.current, mouse, maxOffset)

  const springCfg = { damping: 22, stiffness: 260, mass: 0.6 }
  const lx = useSpring(useMotionValue(0), springCfg)
  const ly = useSpring(useMotionValue(0), springCfg)
  const rx = useSpring(useMotionValue(0), springCfg)
  const ry = useSpring(useMotionValue(0), springCfg)

  useEffect(() => { lx.set(leftTarget.x); ly.set(leftTarget.y) }, [leftTarget.x, leftTarget.y, lx, ly])
  useEffect(() => { rx.set(rightTarget.x); ry.set(rightTarget.y) }, [rightTarget.x, rightTarget.y, rx, ry])

  // Natural blink loop
  const [blinking, setBlinking] = useState(false)
  useEffect(() => {
    let cancelled = false
    const loop = () => {
      const delay = 5000 + Math.random() * 3000
      setTimeout(() => {
        if (cancelled) return
        setBlinking(true)
        setTimeout(() => {
          if (cancelled) return
          setBlinking(false)
          // Chance for a double-blink
          if (Math.random() < 0.25) {
            setTimeout(() => { if (!cancelled) { setBlinking(true); setTimeout(() => { if (!cancelled) setBlinking(false); loop() }, 120) } }, 180)
          } else loop()
        }, 130)
      }, delay)
    }
    loop()
    return () => { cancelled = true }
  }, [])

  const leftClosed = closed || blinking
  const rightClosed = closed || blinking || winkRight

  const leftCx = botSize / 2 - eyeGap
  const rightCx = botSize / 2 + eyeGap

  return (
    <g>
      {/* subtle eye shadow ellipse behind */}
      <ellipse cx={leftCx} cy={eyeY + eyeR * 0.9} rx={eyeR * 0.75} ry={eyeR * 0.18} fill="#0000000c" />
      <ellipse cx={rightCx} cy={eyeY + eyeR * 0.9} rx={eyeR * 0.75} ry={eyeR * 0.18} fill="#0000000c" />

      {/* Left eye */}
      <g>
        <motion.g
          animate={{ scaleY: leftClosed ? 0.08 : 1 }}
          style={{ transformOrigin: `${leftCx}px ${eyeY}px`, transformBox: "fill-box" }}
          transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          <circle ref={leftRef} cx={leftCx} cy={eyeY} r={eyeR} fill="#FFFFFF" />
          <circle cx={leftCx} cy={eyeY} r={eyeR} fill="none" stroke="#0000001A" strokeWidth={0.5} />
        </motion.g>
        {/* pupil positioned relative to eye center */}
        <g transform={`translate(${leftCx}, ${eyeY})`}>
          <Pupil x={lx} y={ly} size={pupilR * 2} closed={leftClosed} />
        </g>
      </g>

      {/* Right eye */}
      <g>
        <motion.g
          animate={{ scaleY: rightClosed ? 0.08 : 1 }}
          style={{ transformOrigin: `${rightCx}px ${eyeY}px`, transformBox: "fill-box" }}
          transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          <circle ref={rightRef} cx={rightCx} cy={eyeY} r={eyeR} fill="#FFFFFF" />
          <circle cx={rightCx} cy={eyeY} r={eyeR} fill="none" stroke="#0000001A" strokeWidth={0.5} />
        </motion.g>
        <g transform={`translate(${rightCx}, ${eyeY})`}>
          <Pupil x={rx} y={ry} size={pupilR * 2} closed={rightClosed} />
        </g>
      </g>
    </g>
  )
}
