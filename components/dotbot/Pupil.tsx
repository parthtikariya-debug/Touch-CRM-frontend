"use client"
import { motion, MotionValue } from "framer-motion"

export interface PupilProps {
  /** Motion value for x offset (spring-driven from parent). */
  x: MotionValue<number>
  y: MotionValue<number>
  size: number
  /** True when the eye should be closed (blink or expressive). */
  closed?: boolean
}

/** Single pupil rendered as an SVG group. Motion values drive its translate. */
export default function Pupil({ x, y, size, closed = false }: PupilProps) {
  return (
    <motion.g style={{ x, y }} initial={false}>
      <motion.circle
        cx={0}
        cy={0}
        r={size / 2}
        fill="#0A0A0A"
        animate={{ scaleY: closed ? 0.05 : 1 }}
        transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* tiny catchlight */}
      <circle
        cx={-size * 0.18}
        cy={-size * 0.22}
        r={size * 0.14}
        fill="#FFFFFF"
        opacity={closed ? 0 : 0.9}
      />
    </motion.g>
  )
}
