"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Loader2, Lock } from "lucide-react"

const phases = [
  {
    label: "Design",
    date: "Oct – Dec 2025",
    status: "done" as const,
    description: "Brand identity, wireframes, and all design assets approved by client",
    assignee: "Sarah K.",
    progress: 100,
  },
  {
    label: "UX",
    date: "Jan – Feb 2026",
    status: "done" as const,
    description: "User flows, prototype testing with 12 users, iteration rounds completed",
    assignee: "Tom R.",
    progress: 100,
  },
  {
    label: "Building",
    date: "Mar – May 2026",
    status: "active" as const,
    description: "Front-end & back-end development in progress — Sprint 3 of 5",
    assignee: "Dev Team",
    progress: 65,
  },
  {
    label: "Testing",
    date: "Jun 2026",
    status: "upcoming" as const,
    description: "QA, load testing, and final client acceptance testing",
    assignee: "QA Team",
    progress: 0,
  },
]

export function InteractiveTimeline() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="relative">
      {/* Track */}
      <div className="absolute top-[18px] left-[18px] right-[18px] h-1.5 bg-accent/80 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400/50 rounded-full transition-all duration-1000"
          style={{ width: "65%" }}
        />
      </div>

      {/* Nodes */}
      <div className="relative flex justify-between">
        {phases.map((phase, i) => {
          const isHovered = hovered === i
          return (
            <div
              key={i}
              className="flex flex-col items-center gap-0 cursor-pointer group"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Node */}
              <div className="relative z-10 mb-3">
                {phase.status === "done" && (
                  <div className={`w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center ring-4 ring-background shadow-lg shadow-blue-500/30 transition-all duration-200 ${isHovered ? "scale-110 shadow-blue-500/50" : ""}`}>
                    <CheckCircle2 className="h-4 w-4 text-white" />
                  </div>
                )}
                {phase.status === "active" && (
                  <div className={`w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center ring-4 ring-background shadow-lg shadow-blue-500/40 transition-all duration-200 animate-pulse-glow ${isHovered ? "scale-110" : ""}`}>
                    <Loader2 className="h-4 w-4 text-white animate-spin" />
                  </div>
                )}
                {phase.status === "upcoming" && (
                  <div className={`w-9 h-9 rounded-full bg-accent flex items-center justify-center ring-4 ring-background transition-all duration-200 ${isHovered ? "scale-110" : ""}`}>
                    <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Label */}
              <span className={`text-xs font-semibold transition-colors duration-200 ${
                phase.status === "done" ? "text-blue-400" :
                phase.status === "active" ? "text-foreground" :
                "text-muted-foreground/60"
              } ${isHovered ? "text-blue-400" : ""}`}>
                {phase.label}
              </span>
              <span className="text-[10px] text-muted-foreground/50 mt-0.5 hidden sm:block">{phase.date.split(" – ")[0]}</span>

              {/* Tooltip */}
              {isHovered && (
                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-56 z-50 pointer-events-none">
                  <div className="bg-popover border border-border/60 rounded-xl p-4 shadow-2xl shadow-black/40 animate-fade-in">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-foreground">{phase.label} Phase</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        phase.status === "done" ? "text-blue-400 bg-blue-500/10" :
                        phase.status === "active" ? "text-amber-400 bg-amber-500/10" :
                        "text-muted-foreground bg-accent"
                      }`}>
                        {phase.status === "done" ? "Complete" : phase.status === "active" ? "In Progress" : "Upcoming"}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mb-3">{phase.description}</p>
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>{phase.date}</span>
                      <span className="font-medium text-foreground/70">{phase.assignee}</span>
                    </div>
                    {phase.status !== "upcoming" && (
                      <div className="mt-3">
                        <div className="flex justify-between text-[10px] mb-1.5">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold text-foreground">{phase.progress}%</span>
                        </div>
                        <div className="h-1 bg-accent/80 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${phase.progress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-border/60" />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
