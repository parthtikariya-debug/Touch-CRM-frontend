"use client"
import { useEffect, RefObject } from "react"

/** Fires the handler when a click or Escape key occurs outside of `ref.current`. */
export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutside: () => void,
  active: boolean,
) {
  useEffect(() => {
    if (!active) return
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const el = ref.current
      const target = e.target as Node | null
      if (!el || !target) return
      if (!el.contains(target)) onOutside()
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOutside()
    }
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("touchstart", handleClick, { passive: true })
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("mousedown", handleClick)
      document.removeEventListener("touchstart", handleClick)
      document.removeEventListener("keydown", handleKey)
    }
  }, [ref, onOutside, active])
}
