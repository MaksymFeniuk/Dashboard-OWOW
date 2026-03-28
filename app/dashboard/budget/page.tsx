"use client"

import { useState } from "react"
import {
  DollarSign, TrendingUp, TrendingDown, AlertCircle,
  CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, Info
} from "lucide-react"
import {
  PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid
} from "recharts"

/* ────── Data ────── */
const totalBudget = 150000
const spent = 75000
const remaining = totalBudget - spent
const percentUsed = Math.round((spent / totalBudget) * 100)

const spendingTrend = [
  { month: "Oct", spent: 8000, projected: 12000 },
  { month: "Nov", spent: 22000, projected: 24000 },
  { month: "Dec", spent: 38000, projected: 36000 },
  { month: "Jan", spent: 52000, projected: 48000 },
  { month: "Feb", spent: 68000, projected: 60000 },
  { month: "Mar", spent: 75000, projected: 72000 },
  { month: "Apr", projected: 90000 },
  { month: "May", projected: 110000 },
  { month: "Jun", projected: 130000 },
]

const breakdown = [
  {
    phase: "Design & UX", allocated: 40000, spent: 40000, percent: 100,
    color: "#3b82f6", status: "Complete", statusColor: "text-emerald-400",
    statusBg: "bg-emerald-500/10", statusIcon: CheckCircle2,
    detail: "Phase wrapped on Feb 15. All deliverables approved by client and dev team.",
    team: "Sarah K., Design Lead", risk: "none",
  },
  {
    phase: "Frontend Dev", allocated: 60000, spent: 25000, percent: 42,
    color: "#10b981", status: "On Track", statusColor: "text-emerald-400",
    statusBg: "bg-emerald-500/10", statusIcon: CheckCircle2,
    detail: "Sprint 3 in progress. Velocity is above baseline — expected to finish within budget.",
    team: "Dev Team (3 engineers)", risk: "low",
  },
  {
    phase: "Backend Dev", allocated: 30000, spent: 10000, percent: 33,
    color: "#8b5cf6", status: "On Track", statusColor: "text-emerald-400",
    statusBg: "bg-emerald-500/10", statusIcon: CheckCircle2,
    detail: "API and database work progressing well. Auth and core endpoints complete.",
    team: "Tom R., Backend Lead", risk: "low",
  },
  {
    phase: "QA & Testing", allocated: 20000, spent: 0, percent: 0,
    color: "#6b7280", status: "Not Started", statusColor: "text-muted-foreground",
    statusBg: "bg-accent/50", statusIcon: Info,
    detail: "QA phase scheduled to begin after Sprint 5 frontend completion in late May.",
    team: "QA Team", risk: "none",
  },
]

const pieData = breakdown.map(b => ({ name: b.phase, value: b.allocated }))
const COLORS = breakdown.map(b => b.color)

/* ────── Custom Tooltip Components ────── */
interface TooltipProps { active?: boolean; payload?: Array<{ name: string; value: number; payload?: { name?: string } }> }

function TrendTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-popover border border-border/50 rounded-xl px-4 py-3 shadow-xl text-xs space-y-1.5">
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: i === 0 ? "#10b981" : "#3b82f6" }} />
          <span className="text-muted-foreground">{p.name === "spent" ? "Actual" : "Projected"}:</span>
          <span className="font-semibold text-foreground">${(p.value / 1000).toFixed(0)}k</span>
        </div>
      ))}
    </div>
  )
}

function PieTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null
  const item = payload[0]
  return (
    <div className="bg-popover border border-border/50 rounded-xl px-4 py-3 shadow-xl text-xs">
      <p className="font-semibold text-foreground mb-1">{item.payload?.name}</p>
      <p className="text-muted-foreground">${(item.value / 1000).toFixed(0)}k allocated</p>
    </div>
  )
}

/* ────── Metric Card ────── */
function MetricCard({ icon: Icon, label, value, badge, badgeClass, sub, glowColor }: {
  icon: React.ElementType; label: string; value: string
  badge?: string; badgeClass?: string; sub?: string; glowColor: string
}) {
  return (
    <div className="glass-card p-7 flex flex-col justify-between relative overflow-hidden group hover:shadow-2xl hover:shadow-black/30 hover:border-border/60 transition-all duration-300">
      <div className={`absolute top-0 right-0 w-24 h-24 ${glowColor} rounded-full blur-[40px] transition-all duration-300`} />
      <div className="flex items-center gap-3 mb-5 relative">
        <div className={`p-2.5 rounded-xl ${badgeClass?.includes("emerald") ? "bg-emerald-500/10 ring-1 ring-emerald-500/20" : badgeClass?.includes("blue") ? "bg-blue-500/10 ring-1 ring-blue-500/20" : "bg-amber-500/10 ring-1 ring-amber-500/20"} group-hover:ring-2 transition-all`}>
          <Icon className={`w-4 h-4 ${badgeClass?.includes("emerald") ? "text-emerald-400" : badgeClass?.includes("blue") ? "text-blue-400" : "text-amber-400"}`} />
        </div>
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
      </div>
      <div className="relative">
        <div className="text-3xl font-bold text-foreground tracking-tight">{value}</div>
        {badge && <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full mt-2 inline-block ${badgeClass}`}>{badge}</span>}
        {sub && <div className="text-xs text-muted-foreground mt-2">{sub}</div>}
      </div>
    </div>
  )
}

/* ────── Main Page ────── */
export default function BudgetPage() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [hoveredPieIndex, setHoveredPieIndex] = useState<number | null>(null)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header + insight banner */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Budget Overview</h2>
          <p className="text-sm text-muted-foreground mt-1">Financial transparency and project burn rate.</p>
        </div>
        <div className="flex items-center gap-2 text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-2 rounded-xl">
          <CheckCircle2 className="h-3.5 w-3.5" />
          <span><strong>On Track</strong> — spending within projected range</span>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid gap-5 lg:grid-cols-3">
        <MetricCard icon={DollarSign} label="Total Budget" value="$150,000" sub="Allocated for Q1 – Q2 2026" badgeClass="text-emerald-400 bg-emerald-500/10" glowColor="bg-emerald-500/[0.05]" />
        <MetricCard icon={TrendingUp} label="Amount Spent" value="$75,000" badge={`${percentUsed}% Utilized`} badgeClass="text-blue-400 bg-blue-500/10" glowColor="bg-blue-500/[0.05]" />
        <MetricCard icon={AlertCircle} label="Remaining" value="$75,000" badge="Est. complete: $130k" badgeClass="text-amber-400 bg-amber-500/10" sub="3 months remaining" glowColor="bg-amber-500/[0.05]" />
      </div>

      {/* ── Charts Row ── */}
      <div className="grid gap-5 lg:grid-cols-5">

        {/* Spending Trend (col-span-3) */}
        <div className="lg:col-span-3 glass-card p-7 group hover:shadow-2xl hover:shadow-black/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-foreground">Spending Trend</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Actual vs projected burn rate</p>
            </div>
            <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-400 rounded inline-block" />Actual</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-blue-400 rounded inline-block border-dashed border-t border-blue-400" />Projected</span>
            </div>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingTrend} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
                <defs>
                  <linearGradient id="gSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gProj" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={v => `$${v / 1000}k`} />
                <RechartsTooltip content={<TrendTooltip />} cursor={{ stroke: "rgba(255,255,255,0.06)", strokeWidth: 1 }} />
                <Area type="monotone" dataKey="projected" stroke="#3b82f6" strokeWidth={1.5} strokeDasharray="4 3" fill="url(#gProj)" dot={false} />
                <Area type="monotone" dataKey="spent" stroke="#10b981" strokeWidth={2} fill="url(#gSpent)" dot={false} activeDot={{ r: 4, fill: "#10b981", stroke: "var(--background)", strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Distribution (col-span-2) */}
        <div className="lg:col-span-2 glass-card p-7 group hover:shadow-2xl hover:shadow-black/30 transition-all duration-300">
          <div className="mb-5">
            <h3 className="text-base font-semibold text-foreground">Distribution</h3>
            <p className="text-xs text-muted-foreground mt-0.5">By phase allocation</p>
          </div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData} cx="50%" cy="50%" innerRadius={52} outerRadius={72}
                  paddingAngle={3} dataKey="value"
                  onMouseEnter={(_, i) => setHoveredPieIndex(i)}
                  onMouseLeave={() => setHoveredPieIndex(null)}
                >
                  {pieData.map((_, i) => (
                    <Cell
                      key={i} fill={COLORS[i]}
                      opacity={hoveredPieIndex === null || hoveredPieIndex === i ? 1 : 0.4}
                      className="transition-all duration-200 cursor-pointer"
                    />
                  ))}
                </Pie>
                <RechartsTooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="mt-4 space-y-2">
            {breakdown.map((b, i) => (
              <div key={i} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: b.color }} />
                  <span className="text-muted-foreground truncate">{b.phase}</span>
                </div>
                <span className="font-semibold text-foreground">${(b.allocated / 1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cost Breakdown ── */}
      <div className="glass-card-static p-7">
        <div className="flex items-center gap-3 mb-7">
          <div className="p-2.5 rounded-xl bg-purple-500/10 ring-1 ring-purple-500/20">
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">Cost Breakdown</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Click any row for details</p>
          </div>
        </div>

        <div className="space-y-3">
          {breakdown.map((item, idx) => {
            const isExpanded = expandedRow === idx
            const StatusIcon = item.statusIcon
            const overBudget = item.percent >= 90 && item.phase !== "Design & UX"
            return (
              <div
                key={idx}
                onClick={() => setExpandedRow(isExpanded ? null : idx)}
                className={`rounded-xl border transition-all duration-300 cursor-pointer overflow-hidden
                  ${isExpanded
                    ? "bg-accent/40 border-border/60 shadow-lg shadow-black/20"
                    : "bg-accent/20 border-border/30 hover:bg-accent/35 hover:border-border/50 hover:-translate-y-0.5"
                  }`}
              >
                <div className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Phase name + status */}
                    <div className="flex items-center gap-3 md:w-1/4 min-w-0">
                      <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.color }} />
                      <div className="min-w-0">
                        <span className="font-semibold text-sm text-foreground block truncate">{item.phase}</span>
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold mt-0.5 ${item.statusColor}`}>
                          <StatusIcon className="h-2.5 w-2.5" /> {item.status}
                        </span>
                      </div>
                    </div>

                    {/* Allocated + Spent */}
                    <div className="flex gap-8 md:w-1/3">
                      <div>
                        <span className="text-[10px] text-muted-foreground/80 uppercase tracking-wider block">Allocated</span>
                        <span className="text-sm text-foreground font-semibold">${item.allocated.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-muted-foreground/80 uppercase tracking-wider block">Spent</span>
                        <span className={`text-sm font-semibold ${overBudget ? "text-rose-400" : "text-foreground"}`}>${item.spent.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Progress bar + trend */}
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-1 h-2 bg-accent/80 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${item.percent}%`, background: item.color }}
                        />
                      </div>
                      <span className="text-xs font-bold text-foreground w-10 text-right">{item.percent}%</span>
                      {item.percent === 100
                        ? <TrendingDown className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                        : item.risk === "low"
                        ? <TrendingUp className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />
                        : <span className="w-3.5 h-3.5 flex-shrink-0" />
                      }
                      {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                    </div>
                  </div>
                </div>

                {/* Expandable detail panel */}
                <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-40" : "max-h-0"}`}>
                  <div className="px-5 pb-5 pt-0 border-t border-border/30">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 pt-4">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground leading-relaxed">{item.detail}</p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Team</p>
                        <p className="text-xs font-semibold text-foreground mt-0.5">{item.team}</p>
                        <p className="text-[10px] text-muted-foreground mt-2 uppercase tracking-wider">Remaining</p>
                        <p className="text-xs font-semibold text-foreground mt-0.5">${(item.allocated - item.spent).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Summary footer */}
        <div className="mt-6 pt-5 border-t border-border/30 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span>Projected total spend: <strong className="text-foreground">~$130,000</strong> by end of Q2</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Projected surplus</span>
            <span className="text-sm font-bold text-emerald-400">$20,000</span>
          </div>
        </div>
      </div>
    </div>
  )
}
