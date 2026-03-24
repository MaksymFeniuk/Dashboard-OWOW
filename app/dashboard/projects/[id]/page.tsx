import { notFound } from "next/navigation"
import { getProjectById } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Circle, Clock } from "lucide-react"

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const p = await params
  const project = getProjectById(p.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{project.name}</h2>
          <p className="text-muted-foreground mt-1">Project Details and timeline tracking</p>
        </div>
        <div className="flex gap-2">
          <Badge variant={project.status === 'On Track' ? 'default' : 'secondary'} className="text-sm px-3 py-1">
            {project.status}
          </Badge>
          <Badge variant="outline" className="text-sm px-3 py-1">
            {project.currentSprint}
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Core Info */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{project.overallProgress}%</span>
              </div>
              <Progress value={project.overallProgress} className="h-2" />
            </div>
            {project.budgetUsed > 0 && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Budget Consumed</span>
                  <span className="text-sm text-muted-foreground">{project.budgetUsed}%</span>
                </div>
                <Progress value={project.budgetUsed} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Milestones Card */}
        <Card>
          <CardHeader>
            <CardTitle>Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {project.milestones.map((milestone) => (
                <div key={milestone.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    {milestone.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div className="h-full w-px bg-border my-1"></div>
                  </div>
                  <div className="flex flex-col pb-2">
                    <span className={`text-sm font-medium ${milestone.completed ? '' : 'text-muted-foreground'}`}>
                      {milestone.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(milestone.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sprints Section */}
      <h3 className="text-xl font-bold tracking-tight mt-4">Sprints & Timeline</h3>
      <div className="grid gap-4">
        {project.sprints.map((sprint) => (
          <Card key={sprint.id} className={sprint.status === 'In Progress' ? 'border-primary/50 bg-primary/5' : ''}>
            <CardHeader className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-base">{sprint.name}</CardTitle>
                  <CardDescription className="text-xs mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(sprint.startDate).toLocaleDateString()} - {new Date(sprint.endDate).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end hidden sm:flex">
                    <span className="text-xs text-muted-foreground">{sprint.progress}% Complete</span>
                    <Progress value={sprint.progress} className="h-2 w-24 mt-1" />
                  </div>
                  <Badge variant={sprint.status === 'Done' ? 'secondary' : sprint.status === 'In Progress' ? 'default' : 'outline'}>
                    {sprint.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
