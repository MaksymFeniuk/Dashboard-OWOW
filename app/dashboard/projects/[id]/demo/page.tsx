import { notFound } from "next/navigation"
import { getProjectById } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MonitorPlay, ExternalLink } from "lucide-react"

export default async function DemoPage({ params }: { params: Promise<{ id: string }> }) {
  const p = await params
  const project = getProjectById(p.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Demo Environment</h2>
        <p className="text-muted-foreground">
          Access the live staging environment for <strong>{project.name}</strong>.
        </p>
      </div>

      <Card className="max-w-2xl bg-secondary/30">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary text-primary-foreground rounded-lg">
              <MonitorPlay className="h-8 w-8" />
            </div>
            <div>
              <CardTitle className="text-xl">Staging Build</CardTitle>
              <CardDescription className="mt-1">
                This environment reflects the latest updates from the current sprint. It is safe to use for testing.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-foreground">URL:</span>
            <span className="text-muted-foreground underline">{project.demoUrl}</span>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button className="gap-2">
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              Open Demo <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
