"use client"
import { useMemo } from "react"
import type { MousePosition } from "./useMousePosition"

/**
 * Given a DOM element (the eye white) and current mouse position,
 * returns an (x, y) offset in px representing where the pupil should sit
 * inside the eye white, clamped to a maximum radius.
 *
 * The offset is intended to be fed into a spring so the motion feels alive.
 */
export function useEyeTracking(
  eyeEl: HTMLElement | SVGElement | null,
  mouse: MousePosition,
  maxOffsetPx: number,
) {
  return useMemo(() => {
    if (!eyeEl || !mouse.active) return { x: 0, y: 0 }
    const r = (eyeEl as HTMLElement).getBoundingClientRect()
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    const dx = mouse.x - cx
    const dy = mouse.y - cy
    const dist = Math.hypot(dx, dy) || 1
    const angle = Math.atan2(dy, dx)
    const magnitude = Math.min(maxOffsetPx, dist * 0.08 + maxOffsetPx * 0.4)
    return { x: Math.cos(angle) * magnitude, y: Math.sin(angle) * magnitude }
  }, [eyeEl, mouse.x, mouse.y, mouse.active, maxOffsetPx])
}
