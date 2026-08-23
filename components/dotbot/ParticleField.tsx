"use client"
import { useMemo } from "react"
import { motion } from "framer-motion"

/**
 * Renders N tiny particles distributed around a circle, gently drifting.
 * SVG only (no canvas). Uses per-particle CSS transforms via framer-motion.
 */
export interface ParticleFieldProps {
  size: number // outer diameter in px (same as bot body)
  count?: number
  active?: boolean // when true, particles shimmer more aggressively
}

export default function ParticleField({
  size,
  count = 70,
  active = false,
}: ParticleFieldProps) {
  const particles = useMemo(() => {
    // Seeded-ish deterministic distribution using golden-ratio angle to avoid clumping
    const g = Math.PI * (3 - Math.sqrt(5))
    return Array.from({ length: count }, (_, i) => {
      const t = (i + 0.5) / count
      const r = Math.sqrt(t) * (size / 2 - 3) // stay inside body
      const a = i * g
      const cx = size / 2 + Math.cos(a) * r
      const cy = size / 2 + Math.sin(a) * r
      const dur = 4 + ((i * 0.37) % 4) // 4–8s
      const delay = (i * 0.11) % 3
      const radius = 0.5 + ((i * 0.13) % 1.4)
      // small drift vector
      const driftX = Math.cos(a + 1.2) * 4
      const driftY = Math.sin(a + 1.2) * 4
      return { cx, cy, dur, delay, radius, driftX, driftY, key: i }
    })
  }, [count, size])

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="absolute inset-0 pointer-events-none"
      aria-hidden
    >
      <defs>
        <radialGradient id="dotbot-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF9A6" stopOpacity="1" />
          <stop offset="70%" stopColor="#FFF59D" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFF59D" stopOpacity="0" />
        </radialGradient>
        <clipPath id="dotbot-clip">
          <circle cx={size / 2} cy={size / 2} r={size / 2 - 1} />
        </clipPath>
      </defs>

      <g clipPath="url(#dotbot-clip)">
        {particles.map((p) => (
          <motion.circle
            key={p.key}
            cx={p.cx}
            cy={p.cy}
            r={p.radius}
            fill="#F4C518"
            fillOpacity={active ? 0.85 : 0.55}
            animate={{
              x: [0, p.driftX, -p.driftX, 0],
              y: [0, p.driftY, -p.driftY, 0],
              opacity: active ? [0.6, 1, 0.7, 0.9] : [0.4, 0.75, 0.5, 0.6],
            }}
            transition={{
              duration: active ? p.dur * 0.6 : p.dur,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </g>
    </svg>
  )
}
