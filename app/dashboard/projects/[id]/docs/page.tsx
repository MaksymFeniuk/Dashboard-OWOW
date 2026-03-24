import { notFound } from "next/navigation"
import { getProjectById } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, ExternalLink } from "lucide-react"
import Link from "next/link"

export default async function DocumentationPage({ params }: { params: Promise<{ id: string }> }) {
  const p = await params
  const project = getProjectById(p.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Documentation</h2>
        <p className="text-muted-foreground">
          Important documents, PRDs, and migration plans for <strong>{project.name}</strong>.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {project.documents.map((doc) => (
          <Card key={doc.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-lg">{doc.title}</CardTitle>
                <CardDescription className="text-xs uppercase mt-1 tracking-wider">{doc.type}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-1 text-sm text-muted-foreground">
              Last updated: {new Date(doc.lastUpdated).toLocaleDateString()}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full gap-2">
                <Link href={doc.url}>
                  <Download className="h-4 w-4" /> Download
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
