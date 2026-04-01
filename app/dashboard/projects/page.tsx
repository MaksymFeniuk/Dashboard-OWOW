import Link from "next/link"
import { ArrowRight, Calendar, LayoutDashboard } from "lucide-react"
import { mockClients } from "@/lib/mock-data"

export default function ProjectsPage() {
  const projects = mockClients[0]?.projects ?? []

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Track":
        return { text: "text-emerald-400", dot: "bg-emerald-500" }
      case "Delayed":
        return { text: "text-rose-400", dot: "bg-rose-500" }
      case "At Risk":
        return { text: "text-amber-400", dot: "bg-amber-500" }
      case "Completed":
        return { text: "text-blue-400", dot: "bg-blue-500" }
      default:
        return { text: "text-gray-400", dot: "bg-gray-500" }
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Projects</h2>
        <p className="text-sm text-gray-500 mt-1">Active engagements with OWOW.</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => {
          const colors = getStatusColor(project.status)
          return (
            <Link
              key={project.id}
              href={`/dashboard?projectId=${project.id}`}
              className={`glass-card p-6 flex flex-col relative overflow-hidden animate-slide-up stagger-${idx + 1} group hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200 cursor-pointer select-none`}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-base font-semibold text-white">{project.name}</h3>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
                  <span className={`text-xs font-medium ${colors.text}`}>{project.status}</span>
                </div>
              </div>

              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  <span>Current: <strong className="text-white font-medium">{project.currentSprint}</strong></span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Status: <strong className={`font-medium ${colors.text}`}>{project.status}</strong></span>
                </div>

                <div className="pt-4">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-500">Progress</span>
                    <span className="text-white font-medium">{project.overallProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${colors.dot} rounded-full transition-all duration-1000`}
                      style={{ width: `${project.overallProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex justify-between items-center text-xs font-medium text-gray-500 group-hover:text-blue-400 transition-colors">
                <span>View Project</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
