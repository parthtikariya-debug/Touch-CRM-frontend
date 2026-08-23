"use client"
import { motion } from "framer-motion"

export type BotExpression =
  | "happy"
  | "robot"
  | "thinking"
  | "laughing"
  | "excited"
  | "studious"
  | "waving"

/**
 * Mouth path definitions. All paths are drawn inside a viewBox = bot size.
 * The Face component receives `size` and produces the correct path for the current expression.
 */
function mouthPath(expression: BotExpression, size: number): string {
  const cx = size / 2
  const cy = size * 0.7
  const w = size * 0.18 // half-width of mouth
  switch (expression) {
    case "happy":
      // gentle smile arc
      return `M ${cx - w} ${cy} Q ${cx} ${cy + w * 0.55} ${cx + w} ${cy}`
    case "robot":
      // straight horizontal line
      return `M ${cx - w * 0.9} ${cy + 1} L ${cx + w * 0.9} ${cy + 1}`
    case "thinking":
      // small o (approximate with tight arc)
      return `M ${cx - w * 0.28} ${cy + 1} q ${w * 0.28} ${w * 0.4} ${w * 0.56} 0 q -${w * 0.28} -${w * 0.4} -${w * 0.56} 0 z`
    case "laughing":
      // wide open smile
      return `M ${cx - w * 1.1} ${cy - 1} Q ${cx} ${cy + w * 1.1} ${cx + w * 1.1} ${cy - 1} Q ${cx} ${cy + w * 0.2} ${cx - w * 1.1} ${cy - 1} z`
    case "excited":
      // big open oval smile
      return `M ${cx - w} ${cy} Q ${cx} ${cy + w * 0.9} ${cx + w} ${cy} Q ${cx} ${cy + w * 0.35} ${cx - w} ${cy} z`
    case "studious":
      // small serious smile (subtle up-curve)
      return `M ${cx - w * 0.8} ${cy} Q ${cx} ${cy + w * 0.28} ${cx + w * 0.8} ${cy}`
    case "waving":
      // asymmetric happy smirk
      return `M ${cx - w} ${cy} Q ${cx - w * 0.2} ${cy + w * 0.6} ${cx + w * 1.05} ${cy - w * 0.15}`
  }
}

export interface FaceProps {
  size: number
  expression: BotExpression
}

/**
 * Nose + mouth + optional decorations (glasses for studious, dollar cheeks for excited).
 */
export default function Face({ size, expression }: FaceProps) {
  const path = mouthPath(expression, size)
  const filled = expression === "laughing" || expression === "excited" || expression === "thinking"

  return (
    <g>
      {/* Nose — small black dot */}
      <circle cx={size / 2} cy={size * 0.58} r={size * 0.022} fill="#0A0A0A" />

      {/* Mouth */}
      <motion.path
        d={path}
        initial={false}
        animate={{ d: path }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        stroke="#0A0A0A"
        strokeWidth={size * 0.028}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? "#0A0A0A" : "none"}
      />

      {/* Studious: draw glasses across the eyes */}
      {expression === "studious" && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          stroke="#0A0A0A"
          strokeWidth={size * 0.02}
          fill="none"
        >
          <circle cx={size / 2 - size * 0.16} cy={size * 0.44} r={size * 0.15} />
          <circle cx={size / 2 + size * 0.16} cy={size * 0.44} r={size * 0.15} />
          <line x1={size / 2 - size * 0.01} y1={size * 0.44} x2={size / 2 + size * 0.01} y2={size * 0.44} />
        </motion.g>
      )}

      {/* Excited: subtle cheek blush */}
      {(expression === "excited" || expression === "laughing") && (
        <>
          <circle cx={size * 0.22} cy={size * 0.55} r={size * 0.06} fill="#FF8AB0" opacity={0.35} />
          <circle cx={size * 0.78} cy={size * 0.55} r={size * 0.06} fill="#FF8AB0" opacity={0.35} />
        </>
      )}
    </g>
  )
}
