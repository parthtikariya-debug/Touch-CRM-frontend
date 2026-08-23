'use client'

export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: '#FFFFFF' }} />
      {/* Very soft yellow blob — tuned for white bg */}
      <div className="absolute -top-40 -right-32 w-[720px] h-[720px] rounded-full blur-[130px] anim-drift anim-pulse-soft"
        style={{ background: 'radial-gradient(circle at 40% 40%, rgba(254,244,141,0.55), rgba(254,244,141,0) 65%)' }} />
      {/* Soft blue blob */}
      <div className="absolute top-1/3 -left-40 w-[680px] h-[680px] rounded-full blur-[140px] anim-float-slow"
        style={{ background: 'radial-gradient(circle at 60% 40%, rgba(151,186,255,0.4), rgba(151,186,255,0) 65%)' }} />
      {/* Bottom accent */}
      <div className="absolute -bottom-56 left-1/3 w-[900px] h-[600px] rounded-full blur-[150px] anim-drift"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(254,244,141,0.35), transparent 70%)' }} />
      {/* faint grid */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.7) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
        maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 30%, transparent 75%)',
      }} />
    </div>
  )
}
