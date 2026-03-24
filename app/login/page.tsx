import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FolderKanban } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow">
            <span className="text-xl font-bold">O</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">OWOW Client Portal</h1>
          <p className="text-sm text-muted-foreground text-center">
            Sign in to access your project dashboard, sprints, and milestones.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Sign in</CardTitle>
            <CardDescription>Enter your email below to login.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="client@owow.io"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="#"
                      className="ml-auto inline-block text-sm text-muted-foreground underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input id="password" type="password" placeholder="••••••••" required />
                </div>
                <Link href="/dashboard" className="w-full mt-2">
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          By clicking Login, you agree to OWOW's Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
