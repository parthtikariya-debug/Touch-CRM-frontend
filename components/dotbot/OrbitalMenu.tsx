"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"

export interface OrbitalItem {
  id: string
  label: string
  isPrimary?: boolean
}

export interface OrbitalMenuProps {
  open: boolean
  items: OrbitalItem[]
  activeId: string | null
  onSelect: (id: string) => void
  botSize: number
}

/**
 * When open, N labelled balls fly out of the bot and enter continuous circular orbits
 * around the bot. Each ball has its own radius, speed, phase and tilt.
 * On hover, its label expands. On click, we navigate.
 */
export default function OrbitalMenu({ open, items, activeId, onSelect, botSize }: OrbitalMenuProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const orbits = useMemo(
    () =>
      items.map((item, i) => {
        // Deterministic but varied orbit parameters
        const seed = i + 1
        const radius = 130 + ((seed * 37) % 90) // 130–220 px
        const speed = 0.35 + ((seed * 53) % 40) / 100 // 0.35–0.75 rad/s
        const direction = i % 2 === 0 ? 1 : -1
        const phase = (i / items.length) * Math.PI * 2
        const tilt = ((seed * 29) % 40) - 20 // -20..20 deg (visual elliptical tilt)
        return { item, radius, speed: speed * direction, phase, tilt }
      }),
    [items],
  )

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop portalled to document.body to escape transformed parent (position:fixed is broken inside a transformed ancestor). */}
          {mounted && createPortal(
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0"
              style={{
                background: "rgba(255,255,255,0.4)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
                zIndex: 998,
                pointerEvents: "none",
              }}
            />,
            document.body,
          )}
          <div className="absolute inset-0 pointer-events-none">
            {orbits.map((o, i) => (
              <OrbitBall
                key={`${o.item.id}-${o.item.label}-${i}`}
                orbit={o}
                index={i}
                botSize={botSize}
                active={activeId === o.item.id}
                onSelect={onSelect}
              />
            ))}
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

interface OrbitBallProps {
  orbit: { item: OrbitalItem; radius: number; speed: number; phase: number; tilt: number }
  index: number
  botSize: number
  active: boolean
  onSelect: (id: string) => void
}

function OrbitBall({ orbit, index, botSize, active, onSelect }: OrbitBallProps) {
  const { item, radius, speed, phase, tilt } = orbit
  const [pos, setPos] = useState({ x: 0, y: 0, z: 0 })
  const [hover, setHover] = useState(false)
  const startedRef = useRef(false)

  useEffect(() => {
    let raf = 0
    const start = performance.now()
    startedRef.current = false
    const tiltRad = (tilt * Math.PI) / 180
    const cosT = Math.cos(tiltRad)
    const sinT = Math.sin(tiltRad)

    const loop = (now: number) => {
      const t = (now - start) / 1000
      const angle = phase + speed * t
      const bx = Math.cos(angle) * radius
      const by = Math.sin(angle) * radius
      // Apply tilt (rotate around x-axis so orbit becomes elliptical, some balls go slightly behind/in front)
      const y2 = by * cosT
      const z2 = by * sinT
      setPos({ x: bx, y: y2, z: z2 })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [radius, speed, phase, tilt])

  // Depth [-1,1] normalized by radius
  const depth = radius === 0 ? 0 : pos.z / radius
  const depthScale = 0.85 + 0.25 * ((depth + 1) * 0.5) // 0.85..1.10
  const depthOpacity = 0.5 + 0.5 * ((depth + 1) * 0.5) // 0.5..1.0
  const zIndex = Math.round((depth + 1) * 10) // 0..20 layered by depth

  const isPrimary = !!item.isPrimary
  const containerCenter = botSize / 2

  return (
    <motion.button
      type="button"
      aria-label={item.label}
      data-magnetic
      onClick={() => onSelect(item.id)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      // Initial: at bot center. Animate: to orbit start. Exit: back to bot.
      initial={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
      animate={{ opacity: depthOpacity, scale: depthScale, x: pos.x, y: pos.y }}
      exit={{ opacity: 0, scale: 0.2, x: 0, y: 0 }}
      transition={{
        opacity: { duration: 0.25, delay: 0.02 * index },
        scale: { type: "spring", stiffness: 260, damping: 22, delay: 0.02 * index },
        // pos updates are set via state, framer handles as tween:
        x: { type: "tween", duration: 0 },
        y: { type: "tween", duration: 0 },
      }}
      className={[
        "absolute pointer-events-auto rounded-full flex items-center justify-center gap-2",
        "font-medium tracking-tight whitespace-nowrap outline-none",
        "transition-[padding,background,border,transform] duration-300",
        active ? "text-black" : isPrimary ? "text-black" : "text-black/85",
      ].join(" ")}
      style={{
        left: containerCenter,
        top: containerCenter,
        translate: "-50% -50%",
        zIndex,
        height: hover ? 38 : 32,
        paddingLeft: 12,
        paddingRight: 14,
        fontSize: 12.5,
        background: active
          ? "#FEF48D"
          : isPrimary
          ? "linear-gradient(180deg, #FFFDD8, #FEF48D)"
          : "rgba(255,255,255,0.85)",
        border: active
          ? "1px solid rgba(0,0,0,0.35)"
          : "1px solid rgba(0,0,0,0.08)",
        boxShadow: isPrimary
          ? "0 10px 24px -8px rgba(254,244,141,0.85), inset 0 1px 0 rgba(255,255,255,0.9), 0 0 0 1px rgba(0,0,0,0.06)"
          : "0 8px 20px -10px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.9)",
        backdropFilter: "blur(16px) saturate(160%)",
        WebkitBackdropFilter: "blur(16px) saturate(160%)",
      }}
    >
      {/* Leading dot marker */}
      <span
        aria-hidden
        className="rounded-full shrink-0"
        style={{
          width: 6,
          height: 6,
          background: active ? "#000" : isPrimary ? "#000" : "#000",
        }}
      />
      <span>{item.label}</span>
    </motion.button>
  )
}
