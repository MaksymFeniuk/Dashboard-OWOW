import { mockClients } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MonitorPlay, ExternalLink } from "lucide-react"

export default function GlobalDemosPage() {
  const client = mockClients[0] // Assuming logged in as Acme Corp

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Demo Environments</h2>
        <p className="text-muted-foreground">
          Access the live staging environments for all your active projects.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {client.projects.map((project) => (
          <Card key={project.id} className="bg-secondary/30 flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary text-primary-foreground rounded-lg">
                  <MonitorPlay className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription className="mt-1">
                    Staging Build
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-col gap-2 text-sm">
                <span className="text-muted-foreground">Environment URL:</span>
                <span className="font-medium text-foreground truncate" title={project.demoUrl}>
                  {project.demoUrl}
                </span>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 mt-auto">
              <Button className="w-full gap-2">
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  Open Demo <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
