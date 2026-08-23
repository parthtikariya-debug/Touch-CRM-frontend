"use client"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"

export interface MenuItem {
  id: string // section id
  label: string
  emoji?: string
  isPrimary?: boolean
}

export interface RadialMenuProps {
  open: boolean
  items: MenuItem[]
  activeId: string | null
  onSelect: (id: string) => void
  botSize: number
  /** Radius from bot center to menu items. */
  radius: number
}

/**
 * Radial fan menu. Items are placed on a quarter-arc that fans up-and-to-the-left
 * from the bot (which lives at bottom-right). Each item is a floating Apple
 * liquid-glass pill. Items stagger and spring in from the bot.
 */
export default function RadialMenu({ open, items, activeId, onSelect, botSize, radius }: RadialMenuProps) {
  // Arc from 170° (west, slightly up) to 268° (nearly north) — fans up-left, keeps items inside viewport.
  const startAngle = 170
  const endAngle = 268
  const arc = endAngle - startAngle

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Menu-scoped backdrop — soft blur circle around the bot for depth */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none absolute rounded-full"
            style={{
              width: radius * 2.6,
              height: radius * 2.6,
              left: botSize / 2 - radius * 1.3,
              top: botSize / 2 - radius * 1.3,
              background: "radial-gradient(circle, rgba(255,245,157,0.35), rgba(255,245,157,0) 60%)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          />

          {items.map((item, i) => {
            const t = items.length === 1 ? 0.5 : i / (items.length - 1)
            const angleDeg = startAngle + t * arc
            const angleRad = (angleDeg * Math.PI) / 180
            const dx = Math.cos(angleRad) * radius
            const dy = Math.sin(angleRad) * radius
            const isActive = activeId === item.id
            const isPrimary = !!item.isPrimary

            return (
              <motion.button
                key={`${item.id}-${item.label}-${i}`}
                type="button"
                aria-label={item.label}
                data-magnetic
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.6 }}
                animate={{ x: dx, y: dy, opacity: 1, scale: 1 }}
                exit={{ x: 0, y: 0, opacity: 0, scale: 0.6 }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 22,
                  mass: 0.7,
                  delay: 0.03 * i,
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => onSelect(item.id)}
                className={[
                  "absolute origin-center",
                  "pointer-events-auto",
                  "h-11 md:h-12 px-4 md:px-5 rounded-full",
                  "flex items-center gap-2 whitespace-nowrap",
                  "text-[13px] md:text-[14px] font-medium tracking-tight",
                  "transition-colors",
                  isPrimary
                    ? "text-black"
                    : isActive
                    ? "text-black"
                    : "text-black/85",
                ].join(" ")}
                style={{
                  // center on bot origin, then translate via animate x/y
                  left: botSize / 2,
                  top: botSize / 2,
                  translate: "-50% -50%",
                  background: isPrimary
                    ? "linear-gradient(180deg, #FFF9A6, #FFE44E)"
                    : isActive
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(255,255,255,0.55)",
                  border: isActive
                    ? "1px solid rgba(0,0,0,0.18)"
                    : "1px solid rgba(255,255,255,0.75)",
                  boxShadow: isPrimary
                    ? "0 10px 26px -8px rgba(225,254,3,0.55), inset 0 1px 0 rgba(255,255,255,0.9)"
                    : "0 8px 22px -10px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.9)",
                  backdropFilter: "blur(20px) saturate(160%)",
                  WebkitBackdropFilter: "blur(20px) saturate(160%)",
                }}
              >
                {item.emoji && (
                  <span aria-hidden className="text-[15px] leading-none">
                    {item.emoji}
                  </span>
                )}
                <span>{item.label}</span>
                {isPrimary && <ArrowRight className="w-3.5 h-3.5" />}
                {isActive && !isPrimary && (
                  <span aria-hidden className="ml-1 w-1.5 h-1.5 rounded-full bg-[#FEF48D] ring-1 ring-black" />
                )}
              </motion.button>
            )
          })}
        </>
      )}
    </AnimatePresence>
  )
}
