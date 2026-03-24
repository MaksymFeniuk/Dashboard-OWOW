import { mockClients } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react"
import Link from "next/link"

export default function GlobalDocumentsPage() {
  const client = mockClients[0] // Assuming logged in as Acme Corp
  
  // Aggregate all documents from all projects
  const allDocs = client.projects.flatMap(project => 
    project.documents.map(doc => ({ ...doc, projectName: project.name, projectId: project.id }))
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">All Documents</h2>
        <p className="text-muted-foreground">
          A centralized view of all PRDs, migration plans, and documentation across your projects.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {allDocs.map((doc, idx) => (
          <Card key={`${doc.id}-${idx}`} className="flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-lg">
                <FileText className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-lg truncate" title={doc.title}>{doc.title}</CardTitle>
                <CardDescription className="text-xs mt-1 truncate">
                  {doc.projectName} • {doc.type}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-1 text-sm text-muted-foreground">
              Last updated: {new Date(doc.lastUpdated).toLocaleDateString()}
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button variant="outline" className="w-full gap-2">
                <Link href={doc.url} className="flex items-center gap-2">
                  <Download className="h-4 w-4" /> Download
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
        {allDocs.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground bg-card rounded-xl border border-dashed">
            No documents found across your projects.
          </div>
        )}
      </div>
    </div>
  )
}
