import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Activity,
  ArrowLeft,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  Gauge,
  Target,
} from "lucide-react"

import { ProjectViewSwitcher } from "@/components/projects/project-view-switcher"
import { getProjectById } from "@/lib/mock-data"

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export default async function ProjectAnalyticsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const p = await params
  const project = getProjectById(p.id)

  if (!project) {
    notFound()
  }

  const completedMilestones = project.milestones.filter(
    (milestone) => milestone.completed
  ).length
  const milestoneRate = Math.round(
    (completedMilestones / project.milestones.length) * 100
  )
  const activeSprint =
    project.sprints.find((sprint) => sprint.status === "In Progress") ??
    project.sprints[project.sprints.length - 1]
  const averageVelocity = Math.round(
    project.sprints.reduce((sum, sprint) => sum + sprint.progress, 0) /
      project.sprints.length
  )
  const nextMilestone = project.milestones.find((milestone) => !milestone.completed)

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={`/dashboard/projects/${p.id}`}
            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent/80 hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Project Analytics
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Delivery health and sprint performance for{" "}
              <strong className="text-gray-300">{project.name}</strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-400">
            {project.currentSprint}
          </span>
          <span className="rounded-full bg-accent/80 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
            Deadline {formatDate(project.deadline)}
          </span>
        </div>
      </div>

      <ProjectViewSwitcher projectId={p.id} current="analytics" />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Overall Progress",
            value: `${project.overallProgress}%`,
            detail: "Current delivery completion",
            icon: Gauge,
            tone: "text-blue-400 bg-blue-500/10",
          },
          {
            label: "Budget Used",
            value: `${project.budgetUsed}%`,
            detail: "Consumed against approved spend",
            icon: BarChart3,
            tone: "text-emerald-400 bg-emerald-500/10",
          },
          {
            label: "Milestones Complete",
            value: `${completedMilestones}/${project.milestones.length}`,
            detail: `${milestoneRate}% milestone completion`,
            icon: CheckCircle2,
            tone: "text-violet-400 bg-violet-500/10",
          },
          {
            label: "Average Velocity",
            value: `${averageVelocity}%`,
            detail: "Average sprint completion rate",
            icon: Activity,
            tone: "text-amber-400 bg-amber-500/10",
          },
        ].map((metric) => {
          const Icon = metric.icon
          return (
            <div key={metric.label} className="glass-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className={`rounded-xl p-3 ${metric.tone}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
                  {metric.label}
                </span>
              </div>
              <div className="text-3xl font-bold tracking-tight text-foreground">
                {metric.value}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{metric.detail}</p>
            </div>
          )
        })}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        <div className="glass-card-static p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Sprint Performance
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Progress by sprint and current delivery rhythm.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {project.sprints.map((sprint) => (
              <div
                key={sprint.id}
                className="rounded-2xl border border-border/50 bg-accent/20 p-4"
              >
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">
                      {sprint.name}
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatDate(sprint.startDate)} to {formatDate(sprint.endDate)}
                    </p>
                  </div>
                  <span className="rounded-full bg-accent/80 px-3 py-1 text-[11px] font-semibold text-muted-foreground">
                    {sprint.status}
                  </span>
                </div>

                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Completion</span>
                  <span className="font-semibold text-foreground">
                    {sprint.progress}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-accent/80">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      sprint.status === "Done"
                        ? "bg-emerald-500"
                        : sprint.status === "In Progress"
                          ? "bg-blue-500"
                          : sprint.status === "Review"
                            ? "bg-amber-500"
                            : "bg-muted-foreground/60"
                    }`}
                    style={{ width: `${sprint.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass-card-static p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Milestone Health
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Completion against committed project checkpoints.
                </p>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Completion Rate</span>
              <span className="font-semibold text-foreground">
                {milestoneRate}%
              </span>
            </div>
            <div className="mb-6 h-2 overflow-hidden rounded-full bg-accent/80">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"
                style={{ width: `${milestoneRate}%` }}
              />
            </div>

            <div className="space-y-3">
              {project.milestones.map((milestone) => (
                <div
                  key={milestone.id}
                  className="flex items-center justify-between rounded-xl border border-border/50 bg-accent/20 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {milestone.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Due {formatDate(milestone.dueDate)}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                      milestone.completed
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-amber-500/10 text-amber-400"
                    }`}
                  >
                    {milestone.completed ? "Done" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card-static p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl bg-violet-500/10 p-3 text-violet-400">
                <CalendarClock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  Delivery Outlook
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Current sprint and next milestone forecast.
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="rounded-2xl border border-border/50 bg-accent/20 p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Active Sprint
                </p>
                <p className="mt-2 font-semibold text-foreground">
                  {activeSprint.name}
                </p>
                <p className="mt-1 text-muted-foreground">
                  {activeSprint.progress}% complete and currently marked as{" "}
                  {activeSprint.status.toLowerCase()}.
                </p>
              </div>

              <div className="rounded-2xl border border-border/50 bg-accent/20 p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Next Milestone
                </p>
                <p className="mt-2 font-semibold text-foreground">
                  {nextMilestone ? nextMilestone.title : "All milestones completed"}
                </p>
                <p className="mt-1 text-muted-foreground">
                  {nextMilestone
                    ? `Target date: ${formatDate(nextMilestone.dueDate)}`
                    : `Project deadline remains ${formatDate(project.deadline)}.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
