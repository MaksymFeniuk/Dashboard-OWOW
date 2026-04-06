import {
  Mail,
  MessageSquare,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react"

type TeamGroup = "structure" | "design" | "features" | "platform"

interface TeamMember {
  id: number
  name: string
  role: string
  group: TeamGroup
  image: string
  summary: string
  responsibilities: string[]
  email: string
  slack: string
  phone?: string
  isLead?: boolean
}

const groupLabels: Record<TeamGroup, string> = {
  structure: "Structure",
  design: "Design",
  features: "Features",
  platform: "Platform",
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Karim",
    role: "Frontend and Backend Lead / Project Structure",
    group: "structure",
    image: "/team/karim_pic.png?v=3",
    summary:
      "Owns the overall project setup, integration, and final dashboard consistency.",
    responsibilities: [
      "Project setup and folder structure",
      "Dashboard overview and shared layout",
      "Integration of team deliverables",
    ],
    email: "karim@owow-dashboard.test",
    slack: "https://owow-dashboard.slack.com/team/karim",
    phone: "+31 6 12 34 56 78",
    isLead: true,
  },
  {
    id: 2,
    name: "Mirthe",
    role: "UI/UX Designer",
    group: "design",
    image: "/team/mirthe_pic.png",
    summary:
      "Leads the visual direction, design system, and user experience decisions.",
    responsibilities: [
      "Figma designs and screen flows",
      "Typography, color, and spacing rules",
      "Visual consistency across the dashboard",
    ],
    email: "mirthe@owow-dashboard.test",
    slack: "https://owow-dashboard.slack.com/team/mirthe",
  },
  {
    id: 3,
    name: "Maksym",
    role: "Component Developer",
    group: "features",
    image: "/team/maksym_pic.png",
    summary:
      "Builds reusable interface components that support speed and consistency.",
    responsibilities: [
      "Shared cards, buttons, and badges",
      "Reusable UI patterns",
      "Tailwind styling support",
    ],
    email: "maksym@owow-dashboard.test",
    slack: "https://owow-dashboard.slack.com/team/maksym",
  },
  {
    id: 4,
    name: "Maurice",
    role: "Project Detail and Data Handling",
    group: "features",
    image: "/team/maurice_pic.png",
    summary:
      "Shapes the project detail views and the structure behind the dashboard data.",
    responsibilities: [
      "Project detail page structure",
      "Progress, milestones, and deadlines",
      "Mock data organization",
    ],
    email: "maurice@owow-dashboard.test",
    slack: "https://owow-dashboard.slack.com/team/maurice",
  },
  {
    id: 5,
    name: "Merlijn",
    role: "Documents and Demo Pages",
    group: "features",
    image: "/team/merlijn_pic.png",
    summary:
      "Owns document organization and demo-related content across the project.",
    responsibilities: [
      "Documents page experience",
      "Demo pages and links",
      "Resource organization",
    ],
    email: "merlijn@owow-dashboard.test",
    slack: "https://owow-dashboard.slack.com/team/merlijn",
  },
  {
    id: 6,
    name: "Omar",
    role: "Authentication and Settings",
    group: "platform",
    image: "/team/omar_pic.png",
    summary:
      "Handles the login flow, settings page, and user-facing access features.",
    responsibilities: [
      "Login flow and redirect behavior",
      "Settings and account interactions",
      "User-focused dashboard polish",
    ],
    email: "omar@owow-dashboard.test",
    slack: "https://owow-dashboard.slack.com/team/omar",
  },
]

export default function TeamPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <section className="glass-card relative overflow-hidden p-6 md:p-7">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 right-0 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-violet-500/[0.08] blur-3xl" />
        </div>

        <div className="relative flex flex-col gap-5">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[11px] font-semibold text-blue-300">
            <Sparkles className="h-3.5 w-3.5" />
            Contact-ready team overview
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Team
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                A lighter team page focused on who is responsible for each part
                of the dashboard and how to contact them quickly.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-muted-foreground">
              <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground/80">
                Team size
              </span>
              <p className="mt-1 font-medium text-foreground">
                {teamMembers.length} contributors across 4 focus areas
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        {teamMembers.map((member) => (
          <article
            key={member.id}
            className="glass-card-static overflow-hidden rounded-[28px] border border-border/70 p-6"
          >
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="h-[4.5rem] w-[4.5rem] flex-shrink-0 overflow-hidden rounded-[22px] bg-accent/40 ring-1 ring-border/60">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">
                      {member.name}
                    </h3>
                    {member.isLead ? (
                      <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-semibold text-blue-200">
                        Lead developer
                      </span>
                    ) : null}
                    <span className="rounded-full border border-border/60 bg-accent/30 px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                      {groupLabels[member.group]}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">
                    {member.summary}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 bg-accent/20 p-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Main responsibilities
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {member.responsibilities.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-3 rounded-2xl border border-border/50 bg-accent/20 px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="truncate">{member.email}</span>
                </a>

                <a
                  href={member.slack}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-border/50 bg-accent/20 px-4 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <MessageSquare className="h-4 w-4 text-violet-400" />
                  <span className="truncate">Slack profile</span>
                </a>
              </div>

              {member.phone ? (
                <a
                  href={`tel:${member.phone.replace(/\s+/g, "")}`}
                  className="flex items-center gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm text-blue-100 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 text-blue-300" />
                  <span>{member.phone}</span>
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </section>

      <p className="text-sm text-muted-foreground">
        Contact details on this page are demo placeholders and can be replaced
        with the team&apos;s real information before handoff.
      </p>
    </div>
  )
}
