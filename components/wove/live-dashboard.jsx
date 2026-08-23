'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ResponsiveContainer, Area, AreaChart } from 'recharts'
import { MessageCircle, Sparkles, ArrowUpRight, CheckCircle2, Bot, Bell, TrendingUp } from 'lucide-react'
import { GlassCard, GlassBadge } from './liquid-glass'

const REV_A = [{v:22},{v:28},{v:24},{v:32},{v:30},{v:42},{v:38},{v:55},{v:62},{v:58},{v:74},{v:82}]
const REV_B = [{v:12},{v:20},{v:18},{v:22},{v:30},{v:28},{v:40},{v:44},{v:55},{v:60},{v:68},{v:78}]
const PIPELINE = [
  { stage: 'Qualified', count: 128, amount: '$1.24M', bg: 'bg-black/[0.04]' },
  { stage: 'Proposal', count: 74, amount: '$860K', bg: 'bg-[#97BAFF]/25' },
  { stage: 'Negotiation', count: 32, amount: '$420K', bg: 'bg-[#FEF48D]/35' },
  { stage: 'Won', count: 18, amount: '$312K', bg: 'bg-black text-white' },
]
const MESSAGES = [
  { name: 'Aarav Mehta', msg: 'Can I get the bulk pricing sheet?', tag: 'D2C', tone: 'lime', unread: 2 },
  { name: 'Priya S.', msg: 'Confirmed for Thursday demo ✅', tag: 'B2B', tone: 'blue', unread: 0 },
  { name: 'Nathan Cole', msg: 'Loved the automation flow!', tag: 'Enterprise', tone: 'lime', unread: 5 },
  { name: 'Sofia A.', msg: 'Escalating to procurement team', tag: 'B2B', tone: 'blue', unread: 1 },
]
const NOTIFS = [
  { icon: CheckCircle2, text: 'Deal closed — Acme Corp · $84K', time: 'now' },
  { icon: Bot, text: 'AI Agent booked 3 demos overnight', time: '2m' },
  { icon: TrendingUp, text: 'Revenue up 24% vs. last week', time: '11m' },
  { icon: Bell, text: '17 leads auto-qualified', time: '18m' },
]

export function LiveDashboard() {
  return (
    <div className="relative w-full h-[620px] md:h-[680px]">
      <div aria-hidden className="absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(50% 50% at 60% 40%, rgba(225,254,3,0.35), transparent 70%)' }} />

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-4 right-8 md:left-8 md:right-16">
        <FloatingWrap delay={0}>
          <GlassCard className="p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[11px] tracking-wider text-black/50 uppercase">Revenue · Last 30 days</div>
                <div className="mt-1 flex items-end gap-2">
                  <span className="font-serif-display text-[38px] md:text-[44px] leading-none text-black">$4.82M</span>
                  <span className="inline-flex items-center gap-1 text-[12px] text-black bg-[#FEF48D] px-2 py-0.5 rounded-full pb-1 font-medium">
                    <ArrowUpRight className="w-3 h-3" /> +23.7%
                  </span>
                </div>
              </div>
              <GlassBadge>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FEF48D] ring-2 ring-black animate-pulse" /> Live
              </GlassBadge>
            </div>
            <div className="h-24 md:h-28">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REV_A} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
                  <defs>
                    <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#000" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#000" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gradB" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#97BAFF" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="#97BAFF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area dataKey="v" data={REV_B} stroke="#97BAFF" strokeWidth={1.5} fill="url(#gradB)" isAnimationActive animationDuration={1600} />
                  <Area dataKey="v" stroke="#000" strokeWidth={2} fill="url(#gradA)" isAnimationActive animationDuration={1800} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 pt-3 border-t border-black/5">
              <Stat label="Pipeline" value="$12.4M" trend="+8%" />
              <Stat label="Win rate" value="38.2%" trend="+3.1%" />
              <Stat label="AI touches" value="7,204" trend="+42%" />
            </div>
          </GlassCard>
        </FloatingWrap>
      </motion.div>

      <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.55, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-6 left-0 w-[74%] md:w-[62%]">
        <FloatingWrap delay={0.5}>
          <GlassCard className="p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg grid place-items-center bg-black"><MessageCircle className="w-3.5 h-3.5 text-[#FEF48D]" /></div>
                <div>
                  <div className="text-[13px] text-black font-medium">WhatsApp Inbox</div>
                  <div className="text-[11px] text-black/50">4 new · AI auto-replies on</div>
                </div>
              </div>
              <GlassBadge className="text-black"><Bot className="w-3 h-3" /> Agent live</GlassBadge>
            </div>
            <div className="space-y-2">
              {MESSAGES.map((m, i) => (
                <motion.div key={m.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.12, duration: 0.6 }}
                  className="flex items-center gap-3 p-2.5 rounded-2xl bg-white/50 hover:bg-white/80 transition-colors border border-black/5">
                  <div className={`w-8 h-8 rounded-full grid place-items-center text-[11px] font-medium ${m.tone === 'lime' ? 'bg-[#FEF48D] text-black' : 'bg-[#97BAFF] text-black'}`}>
                    {m.name.split(' ').map(s => s[0]).slice(0, 2).join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2"><span className="text-[12.5px] text-black truncate">{m.name}</span><span className="text-[10px] text-black/40">· {m.tag}</span></div>
                    <div className="text-[11.5px] text-black/55 truncate">{m.msg}</div>
                  </div>
                  {m.unread > 0 && <span className="shrink-0 h-5 min-w-[20px] px-1.5 rounded-full text-[10px] font-medium grid place-items-center bg-black text-[#FEF48D]">{m.unread}</span>}
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </FloatingWrap>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: -16, x: 20 }} animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 0.7, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[220px] md:top-[240px] right-0 w-[56%] md:w-[48%]">
        <FloatingWrap delay={1.1}>
          <GlassCard className="p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[13px] text-black font-medium">CRM Pipeline</div>
              <span className="text-[11px] text-black/50">Q3 · $2.6M</span>
            </div>
            <div className="space-y-2">
              {PIPELINE.map((p, i) => (
                <motion.div key={p.stage} initial={{ opacity: 0, width: '20%' }} animate={{ opacity: 1, width: '100%' }}
                  transition={{ delay: 1.0 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative overflow-hidden rounded-xl px-3 py-2 ${p.bg} border border-black/5`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[12px]">{p.stage}</span>
                    <span className="text-[11.5px] opacity-70">{p.count} · <span className="opacity-100 font-medium">{p.amount}</span></span>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </FloatingWrap>
      </motion.div>

      <NotificationsCard />

      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.7 }}
        className="absolute top-[268px] md:top-[286px] -left-3 md:-left-6 w-[218px]">
        <FloatingWrap delay={0.9}>
          <GlassCard className="p-3.5">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full grid place-items-center relative"
                style={{ background: 'radial-gradient(circle at 30% 30%, #fff, #FEF48D 60%, #97BAFF 100%)' }}>
                <Sparkles className="w-3.5 h-3.5 text-black" />
                <span className="absolute -inset-1 rounded-full blur-md opacity-60" style={{ background: '#FEF48D' }} />
              </div>
              <div>
                <div className="text-[12.5px] text-black">Wove Copilot</div>
                <div className="text-[10.5px] text-black/50">Analyzing 428 deals</div>
              </div>
            </div>
            <div className="text-[11.5px] text-black/70 leading-relaxed">
              Suggestion: Follow up with <span className="text-black font-medium">18 warm leads</span> today to hit Q3 target.
            </div>
            <div className="mt-2 flex gap-1.5"><span className="h-1 flex-1 rounded-full bg-black/10 overflow-hidden"><span className="block h-full w-2/3 bg-black" /></span></div>
          </GlassCard>
        </FloatingWrap>
      </motion.div>
    </div>
  )
}

function Stat({ label, value, trend }) {
  return (
    <div>
      <div className="text-[10.5px] text-black/45 uppercase tracking-wider">{label}</div>
      <div className="mt-0.5 flex items-baseline gap-1.5"><span className="text-[15px] text-black font-medium">{value}</span><span className="text-[10.5px] text-black/60">{trend}</span></div>
    </div>
  )
}
function FloatingWrap({ children, delay = 0 }) {
  return <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6 + delay, repeat: Infinity, ease: 'easeInOut', delay }} style={{ willChange: 'transform' }}>{children}</motion.div>
}
function NotificationsCard() {
  const [index, setIndex] = useState(0)
  useEffect(() => { const t = setInterval(() => setIndex((i) => (i + 1) % NOTIFS.length), 2600); return () => clearInterval(t) }, [])
  const n = NOTIFS[index]; const Icon = n.icon
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.9 }}
      className="absolute bottom-[180px] md:bottom-[210px] right-2 md:right-6 w-[260px]">
      <FloatingWrap delay={1.4}>
        <GlassCard className="p-3 pr-4" style={{ boxShadow: '0 0 0 1px rgba(225,254,3,0.5), 0 20px 60px -10px rgba(225,254,3,0.55)' }}>
          <AnimatePresence mode="wait">
            <motion.div key={index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.4 }} className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl grid place-items-center shrink-0 bg-[#FEF48D] border border-black/10"><Icon className="w-4 h-4 text-black" /></span>
              <div className="min-w-0"><div className="text-[12.5px] text-black truncate">{n.text}</div><div className="text-[10.5px] text-black/45">{n.time}</div></div>
            </motion.div>
          </AnimatePresence>
        </GlassCard>
      </FloatingWrap>
    </motion.div>
  )
}
