import { notFound } from "next/navigation"
import { getProjectById } from "@/lib/mock-data"
import { CheckCircle2, Circle, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ProjectViewSwitcher } from "@/components/projects/project-view-switcher"

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const p = await params
  const project = getProjectById(p.id)

  if (!project) {
    notFound()
  }

  const statusColors: Record<string, string> = {
    'On Track': 'text-emerald-400 bg-emerald-500/10',
    'Delayed': 'text-rose-400 bg-rose-500/10',
    'At Risk': 'text-amber-400 bg-amber-500/10',
    'Completed': 'text-blue-400 bg-blue-500/10',
  }

  const sprintStatusColors: Record<string, string> = {
    'Done': 'text-emerald-400 bg-emerald-500/10',
    'In Progress': 'text-blue-400 bg-blue-500/10',
    'Review': 'text-amber-400 bg-amber-500/10',
    'To Do': 'text-muted-foreground bg-accent/80',
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/projects" className="p-2 rounded-lg hover:bg-accent/80 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">{project.name}</h2>
            <p className="text-sm text-muted-foreground mt-1">Project details and timeline tracking</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${statusColors[project.status] || 'text-muted-foreground bg-accent/80'}`}>
            {project.status}
          </span>
          <span className="text-xs font-semibold px-3 py-1.5 rounded-full text-muted-foreground bg-accent/80">
            {project.currentSprint}
          </span>
        </div>
      </div>

      <ProjectViewSwitcher projectId={p.id} current="view" />

      <div className="grid gap-5 md:grid-cols-3">
        {/* Overview */}
        <div className="md:col-span-2 glass-card-static p-7">
          <h3 className="text-base font-semibold text-foreground mb-2">Overview</h3>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{project.description}</p>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Overall Progress</span>
                <span className="text-xs text-foreground font-semibold">{project.overallProgress}%</span>
              </div>
              <div className="h-2 bg-accent/80 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000" style={{ width: `${project.overallProgress}%` }} />
              </div>
            </div>
            {project.budgetUsed > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Budget Consumed</span>
                  <span className="text-xs text-foreground font-semibold">{project.budgetUsed}%</span>
                </div>
                <div className="h-2 bg-accent/80 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-1000" style={{ width: `${project.budgetUsed}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Milestones */}
        <div className="glass-card-static p-7">
          <h3 className="text-base font-semibold text-foreground mb-6">Milestones</h3>
          <div className="space-y-5">
            {project.milestones.map((milestone) => (
              <div key={milestone.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  {milestone.completed ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <Circle className="h-4 w-4 text-muted-foreground/80 flex-shrink-0" />
                  )}
                  <div className="h-full w-px bg-accent/80 my-1" />
                </div>
                <div className="flex flex-col pb-1">
                  <span className={`text-sm font-medium ${milestone.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {milestone.title}
                  </span>
                  <span className="text-[11px] text-muted-foreground/80 mt-0.5">
                    {new Date(milestone.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sprints */}
      <div>
        <h3 className="text-base font-semibold text-foreground mb-4">Sprints & Timeline</h3>
        <div className="grid gap-3">
          {project.sprints.map((sprint) => (
            <div
              key={sprint.id}
              className={`glass-card-static p-5 relative overflow-hidden ${sprint.status === 'In Progress' ? 'ring-1 ring-blue-500/20' : ''}`}
            >
              {sprint.status === 'In Progress' && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-transparent" />
              )}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <h4 className="text-sm font-medium text-foreground">{sprint.name}</h4>
                  <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {new Date(sprint.startDate).toLocaleDateString()} — {new Date(sprint.endDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-[11px] text-muted-foreground">{sprint.progress}%</span>
                    <div className="h-1.5 w-20 bg-accent/80 rounded-full overflow-hidden mt-1">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${sprint.status === 'Done' ? 'bg-emerald-500' : sprint.status === 'In Progress' ? 'bg-blue-500' : 'bg-gray-600'}`}
                        style={{ width: `${sprint.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${sprintStatusColors[sprint.status] || 'text-muted-foreground bg-accent/80'}`}>
                    {sprint.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
