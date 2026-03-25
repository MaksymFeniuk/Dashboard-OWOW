import { ArrowRight, Calendar, LayoutDashboard } from "lucide-react"

export default function ProjectsPage() {
  const projects = [
    { title: "Dashboard Redesign", status: "On Track", statusColor: "text-emerald-400", dotColor: "bg-emerald-500", sprint: "Sprint 3", progress: 50 },
    { title: "Mobile App Beta", status: "On Track", statusColor: "text-emerald-400", dotColor: "bg-emerald-500", sprint: "Sprint 5", progress: 80 },
    { title: "Marketing Site V2", status: "Delayed", statusColor: "text-rose-400", dotColor: "bg-rose-500", sprint: "Sprint 2", progress: 25 },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Projects</h2>
        <p className="text-sm text-gray-500 mt-1">Active engagements with OWOW.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className={`glass-card p-6 flex flex-col relative overflow-hidden animate-slide-up stagger-${idx + 1}`}
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-base font-semibold text-white">{project.title}</h3>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${project.dotColor}`} />
                <span className={`text-xs font-medium ${project.statusColor}`}>{project.status}</span>
              </div>
            </div>

            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span>Current: <strong className="text-white font-medium">{project.sprint}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <Calendar className="h-3.5 w-3.5" />
                <span>Status: <strong className={`font-medium ${project.statusColor}`}>{project.status}</strong></span>
              </div>

              <div className="pt-4">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-500">Progress</span>
                  <span className="text-white font-medium">{project.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${project.dotColor} rounded-full transition-all duration-1000`}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06] flex justify-between items-center text-xs font-medium text-gray-500 group-hover:text-white transition-colors">
              <span className="hover:text-blue-400 transition-colors cursor-pointer">View Project</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
