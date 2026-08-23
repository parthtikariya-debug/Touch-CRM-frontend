"use client"
import { useEffect, useMemo, useRef } from "react"

export interface DotSphereProps {
  size: number
  count?: number
  color?: string
  accentColor?: string
  rotationSpeed?: number
  active?: boolean
  wobble?: boolean
}

/**
 * A rotating sphere of dots rendered purely in SVG.
 * Uses direct DOM writes inside a rAF loop — no React re-renders per frame.
 * Fibonacci sphere distribution for perfectly even dots.
 */
export default function DotSphere({
  size,
  count = 90,
  color = "#000000",
  accentColor = "#FEF48D",
  rotationSpeed = 0.006,
  active = false,
  wobble = true,
}: DotSphereProps) {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const angleRef = useRef({ ry: 0 })
  const activeRef = useRef(active)
  useEffect(() => { activeRef.current = active }, [active])

  // Precompute Fibonacci sphere unit points (deterministic, indexed).
  const points = useMemo(() => {
    const g = Math.PI * (3 - Math.sqrt(5))
    return Array.from({ length: count }, (_, i) => {
      const y = 1 - (i / (count - 1)) * 2 // -1..1
      const rXZ = Math.sqrt(1 - y * y)
      const theta = i * g
      return { x: Math.cos(theta) * rXZ, y, z: Math.sin(theta) * rXZ }
    })
  }, [count])

  useEffect(() => {
    let raf = 0
    const R = size / 2 - 3
    const cx = size / 2
    const cy = size / 2

    const loop = () => {
      const speed = activeRef.current ? rotationSpeed * 2.2 : rotationSpeed
      angleRef.current.ry += speed
      const ry = angleRef.current.ry
      const rx = wobble ? Math.sin(Date.now() * 0.00035) * 0.28 : 0
      const cosY = Math.cos(ry), sinY = Math.sin(ry)
      const cosX = Math.cos(rx), sinX = Math.sin(rx)

      const svg = svgRef.current
      if (svg) {
        const dots = svg.querySelectorAll<SVGCircleElement>("circle[data-i]")
        for (let i = 0; i < dots.length; i++) {
          const p = points[i]
          // Rotate around Y
          const x1 = p.x * cosY + p.z * sinY
          const z1 = -p.x * sinY + p.z * cosY
          const y1 = p.y
          // Rotate around X (wobble)
          const y2 = y1 * cosX - z1 * sinX
          const z2 = y1 * sinX + z1 * cosX
          // Orthographic project + slight foreshortening
          const scaleDepth = 0.6 + 0.4 * ((z2 + 1) * 0.5) // 0.6..1.0
          const px = cx + x1 * R
          const py = cy + y2 * R
          const r = 0.9 + 0.9 * scaleDepth
          const opacity = 0.18 + 0.72 * scaleDepth
          const dot = dots[i]
          dot.setAttribute("cx", px.toString())
          dot.setAttribute("cy", py.toString())
          dot.setAttribute("r", r.toString())
          dot.setAttribute("fill-opacity", opacity.toString())
        }
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [points, size, rotationSpeed, wobble])

  // Render dots — half in accent color (front-facing), half in base for premium feel.
  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden
      style={{ overflow: "visible" }}
    >
      {/* soft radial glow behind */}
      <defs>
        <radialGradient id="ds-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.55" />
          <stop offset="70%" stopColor={accentColor} stopOpacity="0.08" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={size / 2} fill="url(#ds-glow)" />
      {points.map((_, i) => (
        <circle
          key={i}
          data-i={i}
          cx={size / 2}
          cy={size / 2}
          r={1.2}
          fill={i % 6 === 0 ? accentColor : color}
        />
      ))}
    </svg>
  )
}
