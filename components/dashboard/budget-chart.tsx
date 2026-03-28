"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

const data = [
  { month: "Oct", spent: 8000 },
  { month: "Nov", spent: 22000 },
  { month: "Dec", spent: 38000 },
  { month: "Jan", spent: 52000 },
  { month: "Feb", spent: 68000 },
  { month: "Mar", spent: 75000 },
]

const totalBudget = 150000

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{ value: number }>
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const spent = payload[0].value
    const pct = ((spent / totalBudget) * 100).toFixed(0)
    return (
      <div className="bg-popover border border-border/50 rounded-xl px-4 py-3 shadow-xl text-xs">
        <p className="text-muted-foreground mb-1">{label}</p>
        <p className="font-semibold text-foreground">${spent.toLocaleString()}</p>
        <p className="text-emerald-400 mt-0.5">{pct}% of budget</p>
      </div>
    )
  }
  return null
}

export function BudgetChart() {
  const currentSpent = data[data.length - 1].spent
  const percentUsed = ((currentSpent / totalBudget) * 100).toFixed(0)
  const remaining = totalBudget - currentSpent

  return (
    <div className="flex flex-col h-full">
      {/* Header stats */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider mb-1">Total Budget</p>
          <p className="text-3xl font-bold tracking-tight text-foreground">${totalBudget.toLocaleString()}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
              {percentUsed}% used
            </span>
            <span className="text-xs text-muted-foreground">on track</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[11px] text-muted-foreground mb-1">Remaining</p>
          <p className="text-lg font-semibold text-foreground">${remaining.toLocaleString()}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-accent/80 rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000"
          style={{ width: `${percentUsed}%` }}
        />
      </div>

      {/* Chart */}
      <div className="flex-1 min-h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
            <defs>
              <linearGradient id="budgetGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(16,185,129,0.2)", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="spent"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#budgetGrad)"
              dot={false}
              activeDot={{ r: 5, fill: "#10b981", stroke: "var(--background)", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
