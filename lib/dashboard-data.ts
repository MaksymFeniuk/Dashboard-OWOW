export const totalBudget = 150000

export const timelineStats = [
  {
    label: "Current Phase",
    value: "Building",
    accent: "text-blue-400",
    tooltip: "Engineering is the active phase for the current delivery window.",
  },
  {
    label: "Progress",
    value: "65%",
    accent: "text-emerald-400",
    tooltip: "Project progress reflects the current sprint completion rate.",
  },
  {
    label: "Deadline",
    value: "Jun 15, 2026",
    accent: "text-amber-400",
    tooltip: "Latest committed delivery date for the current project scope.",
  },
] as const

export const timelinePhases = [
  {
    label: "Design",
    date: "Oct - Dec 2025",
    status: "Complete",
    progress: 100,
    accent: "bg-blue-500",
    text: "text-blue-400",
    note: "Brand identity, wireframes, and design assets were approved.",
  },
  {
    label: "UX",
    date: "Jan - Feb 2026",
    status: "Complete",
    progress: 100,
    accent: "bg-blue-500",
    text: "text-blue-400",
    note: "Prototype testing and iteration rounds are finished.",
  },
  {
    label: "Building",
    date: "Mar - May 2026",
    status: "In Progress",
    progress: 65,
    accent: "bg-emerald-500",
    text: "text-foreground",
    note: "Front-end and back-end delivery is moving through sprint 3 of 5.",
  },
  {
    label: "Testing",
    date: "Jun 2026",
    status: "Upcoming",
    progress: 0,
    accent: "bg-accent",
    text: "text-muted-foreground",
    note: "QA, load testing, and final client acceptance are queued next.",
  },
] as const

export const recentUpdates = [
  {
    title: "Beta Release v1.0",
    date: "March 20, 2026",
    color: "bg-emerald-500",
    badge: "Release",
    badgeColor: "text-emerald-400 bg-emerald-500/10",
  },
  {
    title: "Auth Redirect Bugfix",
    date: "Febuary 26, 2026",
    color: "bg-blue-500",
    badge: "Deploy",
    badgeColor: "text-blue-400 bg-blue-500/10",
  },
  {
    title: "Alpha Release v1.0",
    date: "February 15, 2026",
    color: "bg-muted-foreground/40",
    badge: "Approved",
    badgeColor: "text-muted-foreground bg-accent/60",
  },
] as const

export const overviewDocuments = [
  { name: "Master Services Agreement", type: "PDF", date: "Jan 10, 2026" },
  { name: "Brand Guidelines v2", type: "PDF", date: "Feb 05, 2026" },
  { name: "Sprint Review Deck", type: "PPTX", date: "Feb 20, 2026" },
] as const

export const progressHighlights = [
  {
    label: "Next milestone",
    value: "Beta release review",
    note: "Stakeholder walkthrough scheduled for April 8, 2026.",
  },
  {
    label: "Current sprint",
    value: "Sprint 3 of 5",
    note: "Focus is on feature polish, dashboard integration, and QA readiness.",
  },
  {
    label: "Testing window",
    value: "June 2026",
    note: "Testing starts once the final build phase closes.",
  },
] as const
