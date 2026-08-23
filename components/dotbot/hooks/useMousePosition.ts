"use client"
import { useEffect, useRef, useState } from "react"

/** Reactive mouse position (viewport coordinates). Updates on mousemove only when needed. */
export type MousePosition = { x: number; y: number; active: boolean }

export function useMousePosition() {
  const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0, active: false })
  const ref = useRef<MousePosition>({ x: 0, y: 0, active: false })
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const isTouch = window.matchMedia("(hover: none)").matches
    if (isTouch) return

    const flush = () => {
      setPos({ ...ref.current })
      rafRef.current = null
    }

    const onMove = (e: MouseEvent) => {
      ref.current = { x: e.clientX, y: e.clientY, active: true }
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(flush)
    }
    const onLeave = () => {
      ref.current = { ...ref.current, active: false }
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(flush)
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    window.addEventListener("mouseleave", onLeave)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return pos
}
