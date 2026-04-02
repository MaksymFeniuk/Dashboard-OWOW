"use client"
<<<<<<< HEAD

import { useState, type ElementType, type KeyboardEvent } from "react"
import {
  ArrowUpRight,
  Blocks,
  Briefcase,
  FolderKanban,
  Layers3,
  Palette,
  ShieldCheck,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react"

type TeamGroup = "structure" | "design" | "features" | "platform"
type TeamFilter = "all" | TeamGroup

interface TeamMember {
  id: number
  name: string
  role: string
  group: TeamGroup
  image: string
  imageClassName?: string
  tag: string
  summary: string
  focus: string
  ownership: string
  deliverables: string
  responsibilities: string[]
  isLead?: boolean
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Karim",
    role: "Frontend and Backend Lead / Project Structure",
    group: "structure",
    image: "/team/karim_pic.png?v=3",
    imageClassName: "object-contain scale-[1.12] bg-[#3f6f95]",
    tag: "Lead",
    summary:
      "Responsible for the overall structure and integration of the dashboard, making sure all pages and components work together consistently.",
    focus:
      "Project setup, application structure, dashboard overview, and integration across the team.",
    ownership:
      "Owns the Next.js foundation, shared layout structure, and final integration of team deliverables.",
    deliverables:
      "Project setup, folder structure, sidebar and topbar layout, overview page, and integrated dashboard experience.",
    responsibilities: [
      "Setting up the Next.js project and folder structure",
      "Creating the main layout, including the sidebar and topbar",
      "Developing the dashboard overview page",
      "Integrating components and pages from other team members",
      "Maintaining consistency across the application",
    ],
    isLead: true,
  },
  {
    id: 2,
    name: "Mirthe",
    role: "UI/UX Designer",
    group: "design",
    image: "/team/mirthe_pic.png",
    tag: "Design",
    summary:
      "Responsible for the visual design and user experience of the dashboard, ensuring the interface is clean, modern, and easy to use.",
    focus:
      "Design system definition, visual direction, and screen design in Figma.",
    ownership:
      "Owns the dashboard's visual language, interaction direction, and design consistency.",
    deliverables:
      "Figma designs, color system, typography, spacing rules, and design guidelines for the team.",
    responsibilities: [
      "Designing the dashboard in Figma",
      "Defining color schemes, typography, and spacing",
      "Designing key screens such as the login page, dashboard, and project pages",
      "Creating a consistent design system",
      "Providing design guidelines for the team",
    ],
  },
  {
    id: 3,
    name: "Maksym",
    role: "Component Developer",
    group: "features",
    image: "/team/maksym_pic.png",
    tag: "Components",
    summary:
      "Focuses on building reusable UI components that support consistency and speed across the dashboard.",
    focus:
      "Reusable interface building blocks used throughout multiple pages.",
    ownership:
      "Owns shared UI components and supports other members with reusable front-end elements.",
    deliverables:
      "Cards, buttons, badges, progress bars, and Tailwind-based component styling.",
    responsibilities: [
      "Developing reusable components such as cards, buttons, badges, and progress bars",
      "Styling components using Tailwind CSS",
      "Ensuring consistency with the design system",
      "Supporting other team members with UI components",
    ],
  },
  {
    id: 4,
    name: "Maurice",
    role: "Project Detail and Data Handling",
    group: "features",
    image: "/team/maurice_pic.png",
    tag: "Data",
    summary:
      "Responsible for the logic and structure of the project detail pages so project data is presented clearly and effectively.",
    focus:
      "Project detail structure, data presentation, and mock data organization.",
    ownership:
      "Owns project detail logic, layout structure, and how milestones, deadlines, and budget information are shown.",
    deliverables:
      "Project detail page, structured mock data, and connected project information views.",
    responsibilities: [
      "Developing the project detail page",
      "Displaying project information such as progress, milestones, deadlines, and budget",
      "Structuring and managing mock data",
      "Connecting data to the user interface components",
    ],
  },
  {
    id: 5,
    name: "Merlijn",
    role: "Documents and Demo Pages",
    group: "features",
    image: "/team/merlijn_pic.png",
    tag: "Content",
    summary:
      "Focuses on content-related pages so project resources and demo environments stay accessible and well-organized.",
    focus:
      "Documents, demos, and resource presentation for project-specific content.",
    ownership:
      "Owns the pages that organize files, links, and demo environments for the dashboard.",
    deliverables:
      "Documents page, demo pages, and clear resource organization for each project.",
    responsibilities: [
      "Developing the documents page",
      "Creating the demo environments page",
      "Displaying files and links for each project",
      "Organizing content in a clear and structured way",
    ],
  },
  {
    id: 6,
    name: "Omar",
    role: "Authentication and Settings",
    group: "platform",
    image: "/team/omar_pic.png",
    tag: "Access",
    summary:
      "Responsible for user-related features, including login functionality, user profile elements, and dashboard settings.",
    focus:
      "Authentication flow, settings management, and user-specific dashboard features.",
    ownership:
      "Owns access-related flows and user settings, including login, redirect behavior, and profile-oriented features.",
    deliverables:
      "Login page, basic authentication flow, settings page, and optional enhancements such as theme switching.",
    responsibilities: [
      "Designing and developing the login page",
      "Implementing a basic authentication flow with login and redirect",
      "Creating the settings page",
      "Adding user profile elements",
      "Implementing optional features such as theme switching",
    ],
  },
]

const groupMeta: Record<
  TeamGroup,
  {
    title: string
    description: string
    accent: string
    badge: string
    bar: string
    icon: ElementType
  }
> = {
  structure: {
    title: "Structure and Integration",
    description: "Project setup, layout, architecture, and overall consistency.",
    accent: "from-blue-500/[0.16] via-blue-500/[0.05] to-transparent",
    badge: "text-blue-300 bg-blue-500/10 border-blue-500/20",
    bar: "from-blue-400 to-cyan-300",
    icon: ShieldCheck,
  },
  design: {
    title: "Design System",
    description: "Visual direction, UX quality, and interface guidelines.",
    accent: "from-emerald-500/[0.16] via-emerald-500/[0.05] to-transparent",
    badge: "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
    bar: "from-emerald-400 to-teal-300",
    icon: Palette,
  },
  features: {
    title: "Feature Delivery",
    description: "Components, project data, documents, and demo pages.",
    accent: "from-violet-500/[0.16] via-violet-500/[0.05] to-transparent",
    badge: "text-violet-300 bg-violet-500/10 border-violet-500/20",
    bar: "from-violet-400 to-fuchsia-300",
    icon: FolderKanban,
  },
  platform: {
    title: "User Systems",
    description: "Authentication, settings, and user-facing access flows.",
    accent: "from-amber-500/[0.16] via-amber-500/[0.05] to-transparent",
    badge: "text-amber-300 bg-amber-500/10 border-amber-500/20",
    bar: "from-amber-400 to-orange-300",
    icon: UserRound,
  },
}

const filters: Array<{ key: TeamFilter; label: string }> = [
  { key: "all", label: "All roles" },
  { key: "structure", label: "Structure" },
  { key: "design", label: "Design" },
  { key: "features", label: "Features" },
  { key: "platform", label: "Platform" },
]

function handleSelectWithKeyboard(
  event: KeyboardEvent<HTMLDivElement>,
  onSelect: () => void
) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault()
    onSelect()
  }
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

function TeamAvatar({
  name,
  image,
  className,
  textClassName,
  imageClassName,
}: {
  name: string
  image: string
  className: string
  textClassName: string
  imageClassName?: string
}) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className={className}>
        <span className={textClassName}>{getInitials(name)}</span>
      </div>
    )
=======

import { Mail } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { getProjectById } from "@/lib/mock-data"

export default function TeamPage() {
  const searchParams = useSearchParams()
  const projectId = searchParams.get('projectId')
  
  const project = useMemo(() => {
    if (!projectId) return null
    return getProjectById(projectId)
  }, [projectId])

  const defaultTeam = [
    { name: "Sarah Jenkins", role: "Project Manager", image: "https://i.pravatar.cc/150?u=sarah", email: "sarah@owow.io", color: "from-blue-500/20 to-purple-500/20" },
    { name: "David Chen", role: "Lead Designer", image: "https://i.pravatar.cc/150?u=david", email: "david@owow.io", color: "from-emerald-500/20 to-teal-500/20" },
    { name: "Maria Garcia", role: "Frontend Developer", image: "https://i.pravatar.cc/150?u=maria", email: "maria@owow.io", color: "from-amber-500/20 to-orange-500/20" },
    { name: "James Wilson", role: "Backend Developer", image: "https://i.pravatar.cc/150?u=james", email: "james@owow.io", color: "from-purple-500/20 to-pink-500/20" },
    { name: "Karim Massaoud", role: "QA Engineer", image: "https://i.pravatar.cc/150?u=karim", email: "karim@owow.io", color: "from-rose-500/20 to-red-500/20" },
  ]

  const team = project ? (project.team || defaultTeam) : defaultTeam

  const roleColors: Record<string, string> = {
    "Project Manager": "text-blue-400 bg-blue-500/10",
    "Lead Designer": "text-emerald-400 bg-emerald-500/10",
    "Frontend Developer": "text-amber-400 bg-amber-500/10",
    "Backend Developer": "text-purple-400 bg-purple-500/10",
    "QA Engineer": "text-rose-400 bg-rose-500/10",
>>>>>>> Maksym-component-developer
  }

  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className={`h-full w-full object-cover ${imageClassName ?? ""}`}
        onError={(event) => {
          event.currentTarget.style.display = "none"
          setHasError(true)
        }}
      />
      <span className="sr-only">{name}</span>
    </div>
  )
}

export default function TeamPage() {
  const [selectedId, setSelectedId] = useState(teamMembers[0].id)
  const [teamFilter, setTeamFilter] = useState<TeamFilter>("all")

  const visibleMembers =
    teamFilter === "all"
      ? teamMembers
      : teamMembers.filter((member) => member.group === teamFilter)

  const effectiveSelectedId = visibleMembers.some(
    (member) => member.id === selectedId
  )
    ? selectedId
    : visibleMembers[0]?.id ?? teamMembers[0].id

  const selectedMember =
    teamMembers.find((member) => member.id === effectiveSelectedId) ?? teamMembers[0]

  const groupedMembers = (
    Object.entries(groupMeta) as Array<
      [TeamGroup, (typeof groupMeta)[TeamGroup]]
    >
  )
    .map(([key, meta]) => ({
      key,
      meta,
      members: visibleMembers.filter((member) => member.group === key),
    }))
    .filter((section) => section.members.length > 0)

  const totalResponsibilities = teamMembers.reduce(
    (sum, member) => sum + member.responsibilities.length,
    0
  )

  const distribution = (
    Object.entries(groupMeta) as Array<
      [TeamGroup, (typeof groupMeta)[TeamGroup]]
    >
  ).map(([key, meta]) => ({
    key,
    meta,
    count: teamMembers.filter((member) => member.group === key).length,
  }))

  return (
    <div className="space-y-6 animate-fade-in">
<<<<<<< HEAD
      <section className="grid gap-5 xl:grid-cols-[1.55fr,1fr]">
        <div className="glass-card relative overflow-hidden p-6 md:p-7">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 right-0 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-violet-500/[0.08] blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:28px_28px] opacity-[0.35]" />
          </div>
=======
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Team</h2>
        <p className="text-sm text-gray-500 mt-1">{project ? `Team members for ${project.name}` : 'The core OWOW team members dedicated to your project.'}</p>
      </div>
>>>>>>> Maksym-component-developer

          <div className="relative flex h-full flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[11px] font-semibold text-blue-300">
              <Sparkles className="h-3.5 w-3.5" />
              Real Team Responsibilities
            </div>

            <div className="space-y-3">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    Team
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    A structured view of the actual team behind the dashboard,
                    showing who owns each part of the project and what they are
                    responsible for.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-muted-foreground">
                  <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground/80">
                    Selected member
                  </span>
                  <p className="mt-1 font-medium text-foreground">
                    {selectedMember.name} owns {selectedMember.focus.toLowerCase()}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    type="button"
                    onClick={() => setTeamFilter(filter.key)}
                    className={`rounded-full border px-3.5 py-2 text-xs font-medium transition-all ${
                      teamFilter === filter.key
                        ? "border-blue-500/30 bg-blue-500/[0.15] text-blue-200 shadow-lg shadow-blue-950/30"
                        : "border-white/[0.08] bg-white/[0.03] text-muted-foreground hover:border-white/[0.14] hover:text-foreground"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  label: "Team members",
                  value: String(teamMembers.length),
                  hint: "Clear ownership across the project",
                  accent: "text-blue-300",
                },
                {
                  label: "Focus areas",
                  value: String(Object.keys(groupMeta).length),
                  hint: "Structure, design, features, and platform",
                  accent: "text-emerald-300",
                },
                {
                  label: "Responsibilities",
                  value: String(totalResponsibilities),
                  hint: "Documented tasks distributed across the team",
                  accent: "text-amber-300",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/[0.08] bg-black/10 px-4 py-4 backdrop-blur-sm"
                >
                  <span className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {item.label}
                  </span>
                  <div className={`mt-2 text-2xl font-semibold ${item.accent}`}>
                    {item.value}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{item.hint}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card-static relative overflow-hidden rounded-[28px] p-6">
          <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative space-y-5">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-violet-500/10 p-2.5 ring-1 ring-violet-500/20">
                <Layers3 className="h-4 w-4 text-violet-300" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Team insights
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  The project is organized around four clear ownership areas,
                  making collaboration easier and reducing overlap.
                </p>
              </div>
            </div>

            <div className="grid gap-3">
              {distribution.map((item) => {
                const Icon = item.meta.icon

                return (
                  <div
                    key={item.key}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-white/[0.04] p-2 ring-1 ring-white/10">
                          <Icon className="h-4 w-4 text-foreground" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {item.meta.title}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.meta.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-lg font-semibold text-foreground">
                        {item.count}
                      </span>
                    </div>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${item.meta.bar}`}
                        style={{
                          width: `${(item.count / teamMembers.length) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.65fr,0.95fr]">
        <div className="space-y-5">
          {groupedMembers.map((section) => (
            <section
              key={section.key}
              className="glass-card-static relative overflow-hidden rounded-[28px] p-5 md:p-6"
            >
              <div
                className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r ${section.meta.accent}`}
              />

              <div className="relative">
                <div className="flex flex-col gap-3 border-b border-white/[0.06] pb-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {section.meta.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {section.meta.description}
                    </p>
                  </div>

                  <span
                    className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[11px] font-semibold ${section.meta.badge}`}
                  >
                    {section.members.length} member
                    {section.members.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {section.members.map((member) => {
                    const isSelected = member.id === effectiveSelectedId

                    return (
                      <div
                        key={member.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedId(member.id)}
                        onKeyDown={(event) =>
                          handleSelectWithKeyboard(event, () =>
                            setSelectedId(member.id)
                          )
                        }
                        className={`group/member rounded-[24px] border p-4 text-left transition-all duration-300 ${
                          isSelected
                            ? "border-blue-500/30 bg-blue-500/[0.08] shadow-[0_18px_40px_rgba(30,41,59,0.35)]"
                            : "border-white/[0.08] bg-white/[0.03] hover:-translate-y-1 hover:border-white/[0.14] hover:bg-white/[0.05]"
                        } ${
                          member.isLead
                            ? "bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.16),transparent_40%)]"
                            : ""
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <TeamAvatar
                              name={member.name}
                              image={member.image}
                              className="h-14 w-14 overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.13] to-white/[0.04] ring-1 ring-white/10"
                              textClassName="flex h-full w-full items-center justify-center text-sm font-semibold text-foreground"
                              imageClassName={member.imageClassName}
                            />

                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="truncate text-sm font-semibold text-foreground">
                                  {member.name}
                                </h4>
                                {member.isLead ? (
                                  <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-200">
                                    Lead
                                  </span>
                                ) : null}
                              </div>
                              <p className="mt-1 text-xs text-muted-foreground">
                                {member.role}
                              </p>
                            </div>
                          </div>

                          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold text-foreground">
                            {member.tag}
                          </span>
                        </div>

                        <div className="mt-4 space-y-3">
                          <div className="rounded-2xl border border-white/[0.06] bg-black/10 px-3.5 py-3">
                            <span className="text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                              Responsibility summary
                            </span>
                            <p className="mt-2 text-sm leading-relaxed text-foreground">
                              {member.summary}
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                            <span>{member.responsibilities.length} responsibilities</span>
                            <span>{groupMeta[member.group].title}</span>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2 opacity-100 transition-all duration-200 md:translate-y-1 md:opacity-0 md:group-hover/member:translate-y-0 md:group-hover/member:opacity-100">
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation()
                              setSelectedId(member.id)
                            }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <ArrowUpRight className="h-3.5 w-3.5" />
                            View details
                          </button>
                          <button
                            type="button"
                            onClick={(event) => {
                              event.stopPropagation()
                              setSelectedId(member.id)
                            }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                          >
                            <Blocks className="h-3.5 w-3.5" />
                            See tasks
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>
          ))}

          {groupedMembers.length === 0 ? (
            <div className="glass-card-static rounded-[28px] p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.03]">
                <Users className="h-5 w-5 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                No team members in this view
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Change the filter to show the full team again.
              </p>
            </div>
          ) : null}
        </div>

        <aside className="glass-card-static h-fit rounded-[28px] p-6 xl:sticky xl:top-6">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-blue-500/10 p-2.5 ring-1 ring-blue-500/20">
              <Briefcase className="h-4 w-4 text-blue-300" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Member details
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Organized by role, ownership, and concrete responsibilities.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-5">
            <div className="flex items-start gap-4">
              <TeamAvatar
                name={selectedMember.name}
                image={selectedMember.image}
                className="h-[4.5rem] w-[4.5rem] overflow-hidden rounded-[22px] bg-gradient-to-br from-white/[0.13] to-white/[0.04] ring-1 ring-white/10"
                textClassName="flex h-full w-full items-center justify-center text-lg font-semibold text-foreground"
                imageClassName={selectedMember.imageClassName}
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-lg font-semibold text-foreground">
                    {selectedMember.name}
                  </h4>
                  {selectedMember.isLead ? (
                    <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-semibold text-blue-200">
                      Project lead
                    </span>
                  ) : null}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {selectedMember.role}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold ${groupMeta[selectedMember.group].badge}`}
                  >
                    {groupMeta[selectedMember.group].title}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                    {selectedMember.tag}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-blue-500/[0.15] bg-blue-500/[0.06] px-4 py-4">
              <span className="text-[10px] uppercase tracking-[0.24em] text-blue-200/80">
                Main focus
              </span>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {selectedMember.focus}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {[
              {
                icon: ShieldCheck,
                label: "Ownership",
                value: selectedMember.ownership,
              },
              {
                icon: FolderKanban,
                label: "Deliverables",
                value: selectedMember.deliverables,
              },
            ].map((item) => {
              const Icon = item.icon

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4"
                >
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <Icon className="h-3.5 w-3.5" />
                    {item.label}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">
                    {item.value}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-5 rounded-[24px] border border-white/[0.08] bg-white/[0.03] p-5">
            <div className="flex items-center gap-2">
              <div className="rounded-xl bg-white/[0.04] p-2 ring-1 ring-white/10">
                <Blocks className="h-4 w-4 text-foreground" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  Responsibilities
                </h4>
                <p className="text-xs text-muted-foreground">
                  Actual tasks assigned to {selectedMember.name}.
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              {selectedMember.responsibilities.map((responsibility) => (
                <div
                  key={responsibility}
                  className="rounded-2xl border border-white/[0.06] bg-black/10 px-3.5 py-3 text-sm text-foreground"
                >
                  {responsibility}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
