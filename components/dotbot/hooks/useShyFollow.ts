"use client"
import { useEffect, useRef, useState } from "react"
import { useMotionValue, useSpring } from "framer-motion"
import type { MousePosition } from "./useMousePosition"

interface Options {
  /** Preferred distance to keep from cursor when following. */
  offset: number
  /** If cursor comes closer than this, bot freezes (so user can click). */
  freezeInside: number
  /** Bot resumes following once cursor moves further than this. */
  unfreezeOutside: number
  /** Home resting position (bottom-right). */
  restingX: number
  restingY: number
}

/**
 * The bot follows the cursor with a fixed trailing distance, but behaves
 * like a shy pet: when the cursor moves TOWARD the bot and enters `freezeInside`,
 * the bot freezes so the user can click it. It resumes following only once the
 * cursor moves out beyond `unfreezeOutside` (hysteresis prevents jitter).
 */
export function useShyFollow(mouse: MousePosition, opts: Options) {
  const x = useMotionValue(opts.restingX)
  const y = useMotionValue(opts.restingY)
  const sx = useSpring(x, { damping: 26, stiffness: 90, mass: 1 })
  const sy = useSpring(y, { damping: 26, stiffness: 90, mass: 1 })
  const [frozen, setFrozen] = useState(false)
  const frozenRef = useRef(false)
  const lastDistRef = useRef<number>(Infinity)

  useEffect(() => {
    if (!mouse.active) return
    const bx = x.get()
    const by = y.get()
    const dx = mouse.x - bx
    const dy = mouse.y - by
    const dist = Math.hypot(dx, dy)

    // Update frozen state with hysteresis + intent detection (approaching = distance shrinking)
    if (!frozenRef.current) {
      if (dist < opts.freezeInside && dist < lastDistRef.current) {
        frozenRef.current = true
        setFrozen(true)
      }
    } else {
      if (dist > opts.unfreezeOutside) {
        frozenRef.current = false
        setFrozen(false)
      }
    }
    lastDistRef.current = dist

    if (!frozenRef.current) {
      // Follow: sit at (cursor - offsetVec) so bot trails behind cursor at fixed distance.
      const angle = Math.atan2(dy, dx)
      const tx = mouse.x - Math.cos(angle) * opts.offset
      const ty = mouse.y - Math.sin(angle) * opts.offset
      // Keep within viewport bounds with small padding
      const pad = 40
      const clampedX = Math.max(pad, Math.min(window.innerWidth - pad, tx))
      const clampedY = Math.max(pad, Math.min(window.innerHeight - pad, ty))
      x.set(clampedX)
      y.set(clampedY)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mouse.x, mouse.y, mouse.active])

  return { x: sx, y: sy, frozen }
}
