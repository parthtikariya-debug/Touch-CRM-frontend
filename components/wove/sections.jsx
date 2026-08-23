'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Bot, Users, MessageCircle, Workflow, LineChart as LineIcon, ShieldCheck,
  Zap, Mail, Phone, Instagram, Sparkles, ArrowRight, Globe, Send, Layers,
} from 'lucide-react'
import { LimeCTA, DarkCTA } from './liquid-glass'

/* -------------------- shared design language (CTA-inspired) -------------------- */

function Reveal({ children, delay = 0, y = 20, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function PillTag({ children }) {
  return (
    <span
      className="inline-flex items-center gap-2 h-9 px-4 rounded-full border border-black text-black font-medium tracking-[0.14em] uppercase text-[11.5px]"
      style={{ background: '#FEF48D', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)' }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-black" />
      {children}
    </span>
  )
}

/** Wavy ellipse scribble that wraps a word/phrase inside a headline. */
function Scribble({ color = '#FEF48D' }) {
  return (
    <svg aria-hidden viewBox="0 0 340 130" preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none">
      <ellipse cx="170" cy="65" rx="160" ry="52" fill="none" stroke={color} strokeWidth="4" transform="rotate(-8 170 65)" />
      <ellipse cx="170" cy="65" rx="158" ry="58" fill="none" stroke={color} strokeWidth="3" opacity="0.6" transform="rotate(6 170 65)" />
    </svg>
  )
}

function Wow({ children, color = '#FEF48D', padded = true }) {
  return (
    <span className={`relative inline-block ${padded ? 'px-6' : ''}`}>
      <Scribble color={color} />
      <span className="relative italic font-serif-display">{children}</span>
    </span>
  )
}

/** Uniform section header used by every section. */
function SectionHeader({ tag, title, wow, wowColor = '#FEF48D', sub, align = 'center' }) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  return (
    <Reveal>
      <div className={`flex flex-col ${alignCls} max-w-[900px] ${align === 'center' ? 'mx-auto' : ''}`}>
        <PillTag>{tag}</PillTag>
        <h2 className="mt-6 font-serif-display text-[46px] leading-[0.98] md:text-[80px] md:leading-[0.95] tracking-[-0.02em] text-black">
          {title}{' '}
          {wow && <><br className="hidden md:block" /><Wow color={wowColor}>{wow}</Wow></>}
        </h2>
        {sub && (
          <p className={`mt-6 text-[15px] md:text-[17px] text-black/65 max-w-[560px] leading-[1.55] ${align === 'center' ? 'mx-auto' : ''}`}>
            {sub}
          </p>
        )}
      </div>
    </Reveal>
  )
}

/** Rounded soft card used across sections. */
function SoftCard({ children, className = '', style = {}, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div
        className={`relative rounded-[28px] border border-black/10 p-6 md:p-7 h-full bg-white ${className}`}
        style={{ boxShadow: '0 20px 40px -30px rgba(0,0,0,0.15)', ...style }}
        data-magnetic
      >
        {children}
      </div>
    </Reveal>
  )
}

const SECTION = 'relative py-24 md:py-32 overflow-hidden'

/* ---------------- 2. Trusted ---------------- */
const LOGOS = ['Ripple', 'Northwind', 'Kite Labs', 'Orbit', 'Helios', 'Vellum', 'Aster', 'Meridian', 'Loop', 'Corvus']
export function TrustedSection() {
  return (
    <section id="trusted" className="relative py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <Reveal>
          <div className="flex items-center justify-center gap-3 mb-8">
            <PillTag>Step 02 · Trust</PillTag>
          </div>
        </Reveal>
        <div className="relative overflow-hidden"
          style={{ maskImage: 'linear-gradient(90deg,transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(90deg,transparent, black 10%, black 90%, transparent)' }}>
          <div className="flex gap-14 anim-marquee w-max">
            {[...LOGOS, ...LOGOS].map((l, i) => (
              <span key={i} className="text-[26px] md:text-[30px] font-serif-display text-black/55 hover:text-black transition-colors shrink-0 italic">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- 3. Problem ---------------- */
const PAINS = [
  { k: '7+', l: 'Disconnected tools per brand' },
  { k: '68%', l: 'Of first-time buyers never return' },
  { k: '$1.2M', l: 'Lost to abandoned carts, yearly' },
]
export function ProblemSection() {
  return (
    <section id="problem" className={SECTION}>
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <SectionHeader
          tag="Step 03 · Problem"
          title="Growing revenue is easy."
          wow="Keeping customers isn't."
          sub="Your stack is stitched together, your data is scattered, and your best customers slip through the cracks. Wove fixes that."
        />
        <div className="mt-14 md:mt-20 grid md:grid-cols-3 gap-4 md:gap-5 max-w-[1100px] mx-auto">
          {PAINS.map((p, i) => (
            <SoftCard key={p.k} delay={i * 0.08}>
              <div className="font-serif-display text-[56px] md:text-[72px] leading-none text-black">{p.k}</div>
              <div className="mt-3 text-[15px] text-black/70">{p.l}</div>
            </SoftCard>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- 4. AI Agents / Solution ---------------- */
const AGENTS = [
  { name: 'Atlas', role: 'SDR', task: 'Qualifies 428 leads' },
  { name: 'Nova', role: 'Success', task: 'Onboards 12 accounts' },
  { name: 'Orion', role: 'RevOps', task: 'Cleans records' },
  { name: 'Vega', role: 'Marketing', task: 'Runs 3 A/B tests' },
]
export function AIAgentsSection() {
  return (
    <section id="ai-agents" className={SECTION}>
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <SectionHeader
          tag="Step 04 · Solution"
          title="A team of"
          wow="agents that never sleep."
          wowColor="#FEF48D"
          sub="Purpose-built AI that owns outcomes, not just chats. Trained on your voice, guardrailed by your rules."
        />
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-[1100px] mx-auto">
          {AGENTS.map((a, i) => (
            <SoftCard key={a.name} delay={i * 0.06} className="text-center" style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.2)' }}>
              <div className="w-14 h-14 mx-auto rounded-full grid place-items-center font-serif-display text-[22px] text-black mb-3"
                style={{ background: i % 2 ? '#FEF48D' : '#F5EFE1' }}>
                {a.name[0]}
              </div>
              <div className="text-[15px] font-medium">{a.name}</div>
              <div className="text-[12px] opacity-70">{a.role}</div>
              <div className="mt-2 text-[12.5px] opacity-60">{a.task}</div>
            </SoftCard>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- 5. Features ---------------- */
const FEATS = [
  { icon: Bot, title: 'AI Agents', desc: 'Close deals 24/7 in your voice.' },
  { icon: Users, title: 'Unified CRM', desc: 'One source of truth.' },
  { icon: MessageCircle, title: 'Omnichannel', desc: 'WhatsApp · Email · Web · IG.' },
  { icon: Workflow, title: 'Automation', desc: 'Drag-drop workflows.' },
  { icon: LineIcon, title: 'Analytics', desc: 'Live revenue insight.' },
  { icon: ShieldCheck, title: 'Enterprise Secure', desc: 'SOC 2 · GDPR · SSO.' },
]
export function FeaturesSection() {
  return (
    <section id="features" className={SECTION}>
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <SectionHeader
          tag="Step 05 · Features"
          title="One platform."
          wow="Zero silos."
          sub="Everything a D2C team needs — deeply integrated and orchestrated by AI."
        />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-[1100px] mx-auto">
          {FEATS.map((f, i) => {
            const Icon = f.icon
            return (
              <SoftCard key={f.title} delay={i * 0.05}>
                <div className="w-11 h-11 rounded-2xl grid place-items-center border border-black/15"
                  style={{ background: '#FEF48D' }}>
                  <Icon className="w-5 h-5 text-black" strokeWidth={1.8} />
                </div>
                <div className="mt-4 text-[18px] font-medium text-black">{f.title}</div>
                <div className="mt-1 text-[13.5px] text-black/60">{f.desc}</div>
              </SoftCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------- 6. Journey ---------------- */
const JOURNEY = [
  'Visitor', 'Lead', 'Purchase', 'Order Updates',
  'Cross-sell', 'Repeat', 'VIP', 'Win-back',
]
export function JourneySection() {
  return (
    <section id="journey" className={SECTION}>
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <SectionHeader
          tag="Customer Journey"
          title="One lifecycle."
          wow="Every touchpoint."
          wowColor="#FFFFFF"
          sub="From first click to VIP win-back — Wove orchestrates the entire relationship, automatically."
        />
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-[1100px] mx-auto">
          {JOURNEY.map((step, i) => (
            <SoftCard key={step} delay={i * 0.04} className="text-center" style={{ background: 'rgba(0,0,0,0.06)', borderColor: 'rgba(0,0,0,0.15)' }}>
              <div className="w-9 h-9 mx-auto rounded-full grid place-items-center bg-black text-[#FEF48D] font-medium text-[13px] mb-3">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="text-[15px] font-medium text-black">{step}</div>
            </SoftCard>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- 7. CRM ---------------- */
const STAGES = ['New', 'Qualified', 'Negotiation', 'Won']
export function CRMSection() {
  return (
    <section id="crm" className={SECTION}>
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <SectionHeader
          tag="Unified CRM"
          title="Your CRM,"
          wow="finally alive."
          sub="Every conversation, click and deal — auto-logged. No more chasing spreadsheets."
        />
        <Reveal delay={0.2}>
          <div className="mt-14 rounded-[28px] border border-black/10 bg-white p-4 md:p-6 max-w-[1100px] mx-auto"
            style={{ boxShadow: '0 30px 60px -40px rgba(0,0,0,0.2)' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {STAGES.map((s, i) => (
                <div key={s} className={`rounded-2xl p-4 border ${i === 3 ? 'bg-black text-white border-black' : 'bg-[#F5EFE1] border-black/10 text-black'}`}>
                  <div className="text-[11px] uppercase tracking-wider opacity-60 mb-3">{s}</div>
                  <div className="space-y-1.5">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className={`h-8 rounded-lg ${i === 3 ? 'bg-white/10' : 'bg-white'}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- 8. Omnichannel ---------------- */
const CHANNELS = [
  { icon: MessageCircle, name: 'WhatsApp' },
  { icon: Mail, name: 'Email' },
  { icon: Instagram, name: 'Instagram' },
  { icon: Phone, name: 'Voice' },
  { icon: Globe, name: 'Web Chat' },
  { icon: Send, name: 'SMS' },
]
export function OmniSection() {
  return (
    <section id="omnichannel" className={SECTION}>
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <SectionHeader
          tag="Omnichannel"
          title="Every channel."
          wow="One inbox."
          wowColor="#FEF48D"
          sub="Customers don't care about your channel silos. Neither should you."
        />
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-[1100px] mx-auto">
          {CHANNELS.map((c, i) => {
            const Icon = c.icon
            return (
              <SoftCard key={c.name} delay={i * 0.05} className="text-center">
                <div className="w-11 h-11 mx-auto rounded-2xl grid place-items-center mb-3 border border-black/15"
                  style={{ background: '#FEF48D' }}>
                  <Icon className="w-5 h-5 text-black" strokeWidth={1.8} />
                </div>
                <div className="text-[14px] font-medium">{c.name}</div>
              </SoftCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------- 9. Automation ---------------- */
const NODES = [
  { label: 'Trigger', desc: 'New lead', tone: 'cream' },
  { label: 'AI Step', desc: 'Qualify & enrich', tone: 'yellow' },
  { label: 'Action', desc: 'Create deal', tone: 'white' },
  { label: 'Notify', desc: 'Slack ping', tone: 'ink' },
]
export function AutomationSection() {
  return (
    <section id="automation" className={SECTION}>
      <div className="container mx-auto px-4 md:px-6 max-w-[1320px]">
        <SectionHeader
          tag="Ease of Use"
          title="Automate anything."
          wow="In minutes."
          sub="Drag-drop workflows with native AI steps. Ship in an afternoon what used to take a quarter."
        />
        <Reveal delay={0.2}>
          <div className="mt-14 rounded-[28px] border border-black/10 bg-white p-6 md:p-8 max-w-[880px] mx-auto"
            style={{ boxShadow: '0 30px 60px -40px rgba(0,0,0,0.2)' }}>
            <div className="space-y-3">
              {NODES.map((n, i) => {
                const bg = n.tone === 'yellow' ? '#FEF48D' : n.tone === 'cream' ? '#F5EFE1' : n.tone === 'ink' ? '#0A0A0A' : '#FFFFFF'
                const isDark = n.tone === 'ink'
                return (
                  <Reveal key={n.label} delay={i * 0.1}>
                    <div className="flex items-center gap-4 p-4 rounded-2xl border" style={{ background: bg, color: isDark ? '#fff' : '#000', borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)' }}>
                      <div className="w-10 h-10 rounded-xl grid place-items-center bg-black/5 shrink-0" style={{ background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)' }}>
                        <span className="text-[13px] font-medium">{String(i + 1).padStart(2, '0')}</span>
                      </div>
                      <div>
                        <div className="text-[11px] uppercase tracking-wider opacity-60">{n.label}</div>
                        <div className="text-[15px] font-medium">{n.desc}</div>
                      </div>
                    </div>
                    {i < NODES.length - 1 && <div className="flex justify-center py-1"><div className="w-px h-4 bg-black/20" /></div>}
                  </Reveal>
                )
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
