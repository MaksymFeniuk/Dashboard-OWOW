import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account preferences and notification settings.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full max-w-3xl">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>Update your personal information and contact details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue="Karim Massaoud" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" defaultValue="karim@owow.io" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="Acme Corp" disabled />
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose what updates you want to receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex flex-col gap-1">
                  <span className="font-medium">Sprint Updates</span>
                  <span className="text-muted-foreground">Receive an email when a sprint is completed.</span>
                </div>
                <Button variant="outline" size="sm">Enabled</Button>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex flex-col gap-1">
                  <span className="font-medium">New Documents</span>
                  <span className="text-muted-foreground">Notify me when new PRDs or documents are uploaded.</span>
                </div>
                <Button variant="secondary" size="sm">Disabled</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the look and feel of the dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-muted text-center text-sm text-muted-foreground">
                Theme toggling works via your system preferences by default.
                <br /><br />
                (More appearance settings coming soon)
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
