'use client'
import React from 'react'
import { cn } from '@/lib/utils'

/**
 * SectionBg: wraps a section-producing component with a coloured background.
 * When `theme` is provided we add a `data-theme` attribute so descendants can
 * choose contrasting styles (e.g. text-white on dark/blue bgs).
 */
export function SectionBg({ tone = 'white', className = '', cv = true, children, ...props }) {
  const map = {
    white: 'bg-white text-black',
    cream: 'bg-[#F5EFE1] text-black',
    frost: 'bg-[#F2F5F8] text-black',
    butter: 'bg-[#FEF48D] text-black',
    ocean: 'bg-[#007DCC] text-white',
    ink: 'bg-black text-white',
  }
  const dataTheme = tone === 'ocean' || tone === 'ink' ? 'dark' : 'light'
  return (
    <div data-theme={dataTheme} className={cn('relative', map[tone] || map.white, cv && 'cv-auto', className)} {...props}>
      {children}
    </div>
  )
}

/**
 * ParallaxStack: a container with sticky-top children that create a stacking parallax
 * as you scroll (CloudStudio-style). Wrap 2-3 sections and each becomes a panel.
 * Direct children should use the `parallax-panel` class.
 */
export function ParallaxStack({ children, className = '' }) {
  return <div className={cn('parallax-stack', className)}>{children}</div>
}

export function ParallaxPanel({ tone = 'white', className = '', children }) {
  return (
    <SectionBg tone={tone} className={cn('parallax-panel', className)}>
      {children}
    </SectionBg>
  )
}
