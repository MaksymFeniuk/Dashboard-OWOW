"use client"

import { X, AlertTriangle, Clock, TrendingUp, CheckCircle2 } from "lucide-react"
import { useState } from "react"

const alerts = [
  {
    id: 1,
    type: "warning" as const,
    icon: AlertTriangle,
    title: "Budget Alert",
    message: "Project budget is 50% consumed with 3 months remaining.",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    dot: "bg-amber-400",
  },
  {
    id: 2,
    type: "info" as const,
    icon: Clock,
    title: "Sprint Review",
    message: "Sprint 3 review scheduled for March 30, 2026 — 2 days away.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    dot: "bg-blue-400",
  },
  {
    id: 3,
    type: "success" as const,
    icon: TrendingUp,
    title: "Milestone Achieved",
    message: "UX phase completed ahead of schedule. Building phase is on track.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    dot: "bg-emerald-400",
  },
]

export function SmartAlerts() {
  const [dismissed, setDismissed] = useState<number[]>([])
  const active = alerts.filter((a) => !dismissed.includes(a.id))

  if (active.length === 0) return null

  return (
    <div className="space-y-2.5">
      {active.map((alert, i) => {
        const Icon = alert.icon
        return (
          <div
            key={alert.id}
            className={`flex items-start gap-3 px-4 py-3 rounded-xl border ${alert.bg} transition-all duration-300 animate-fade-in group`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span className={`relative flex-shrink-0 mt-0.5`}>
              <span className={`absolute inline-flex h-2 w-2 rounded-full ${alert.dot} animate-ping opacity-75`} />
              <span className={`relative inline-flex h-2 w-2 rounded-full ${alert.dot}`} />
            </span>
            <Icon className={`h-4 w-4 ${alert.color} flex-shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
              <span className={`text-xs font-semibold ${alert.color}`}>{alert.title}:&ensp;</span>
              <span className="text-xs text-muted-foreground">{alert.message}</span>
            </div>
            <button
              onClick={() => setDismissed((d) => [...d, alert.id])}
              className="flex-shrink-0 p-1 rounded-lg hover:bg-accent/60 text-muted-foreground/50 hover:text-muted-foreground transition-all opacity-0 group-hover:opacity-100"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
