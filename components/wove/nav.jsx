'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { LimeCTA } from './liquid-glass'
import { Sparkles, ArrowRight } from 'lucide-react'

const NAV = [
  { label: 'Products', href: '#features' },
  { label: 'Resources', href: '#automation' },
  { label: 'Partners', href: '#integrations' },
  { label: 'Pricing', href: '#pricing' },
]

export function FloatingNav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 md:top-6 inset-x-0 z-50 flex justify-center px-4"
    >
      <div className={`relative flex items-center gap-2 md:gap-6 px-2 md:px-3 h-14 md:h-16 rounded-full transition-all duration-500 glass-light ${scrolled ? 'w-[min(920px,100%)]' : 'w-[min(1000px,100%)]'}`}>
        <span aria-hidden className="absolute inset-x-4 top-0 h-1/2 rounded-t-full opacity-70 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.7), transparent)' }} />

        <a href="#" data-magnetic data-cursor="home" className="relative flex items-center gap-2 pl-3 md:pl-4">
          <span className="w-7 h-7 rounded-full grid place-items-center"
            style={{ background: '#000', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)' }}>
            <Sparkles className="w-3.5 h-3.5 text-[#FEF48D]" strokeWidth={2.5} />
          </span>
          <span className="font-serif-display text-[22px] leading-none text-black">Wove</span>
        </a>

        <nav className="relative hidden md:flex items-center gap-1 mx-auto">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} data-magnetic
              className="relative px-3.5 py-2 rounded-full text-[13.5px] text-black/60 hover:text-black transition-colors">
              <span className="relative z-10">{n.label}</span>
              <span className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity" style={{ background: 'rgba(0,0,0,0.05)' }} />
            </a>
          ))}
        </nav>

        <div className="relative ml-auto flex items-center gap-2 pr-1.5">
          <a href="#login" data-magnetic className="hidden sm:inline-flex text-[13.5px] text-black/70 hover:text-black px-3.5 h-9 items-center rounded-full">Sign in</a>
          <LimeCTA size="sm" data-cursor="book">Book Demo <ArrowRight className="w-3.5 h-3.5" /></LimeCTA>
        </div>
      </div>
    </motion.header>
  )
}
