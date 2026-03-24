import Link from "next/link"
import { mockClients } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Calendar, Clock, LayoutDashboard } from "lucide-react"

export default function DashboardPage() {
  const client = mockClients[0] // Assuming logged in as Acme Corp

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {client.name}</h2>
        <p className="text-muted-foreground mt-2">
          Here is an overview of your active projects and their current status.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {client.projects.map((project) => (
          <Card key={project.id} className="flex flex-col flex-1 hover:border-primary/50 transition-colors">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start gap-4">
                <CardTitle className="text-lg line-clamp-2">{project.name}</CardTitle>
                <Badge variant={project.status === 'On Track' ? 'default' : project.status === 'Delayed' ? 'destructive' : 'secondary'}>
                  {project.status}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2 mt-2">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Current: <strong className="text-foreground">{project.currentSprint}</strong></span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Deadline: <strong className="text-foreground">{new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}</strong></span>
                </div>

                <div className="space-y-2 mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">Overall Progress</span>
                    <span>{project.overallProgress}%</span>
                  </div>
                  <Progress value={project.overallProgress} className="h-2" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Link href={`/dashboard/projects/${project.id}`} className="w-full">
                <div className="flex w-full items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/80 transition-colors">
                  View Project Details
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
