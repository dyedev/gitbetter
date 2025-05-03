import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@radix-ui/react-separator";
import {
  AlertCircle,
  Book,
  Check,
  Database,
  FileCode,
  Layers,
  Layout,
  Palette,
  Plus,
  Server,
} from "lucide-react";

export default function Dashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column (2/3 width on desktop) */}
        <div className="md:col-span-2 space-y-6">
          {/* Active Pull Requests */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Active Pull Requests</CardTitle>
              <Button variant="link" className="text-sm">
                View all
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {/* PR 1 */}
                <div>
                  <div className="flex items-start gap-2 mb-2">
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-600">
                      <AlertCircle className="h-4 w-4" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">
                          Fix authentication middleware (#1423)
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          Updated 2h ago
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        repo/auth-service · 3 commits · 2 comments
                      </p>
                    </div>
                  </div>
                  <div className="ml-8 bg-muted p-3 rounded-md text-sm font-mono text-red-500 whitespace-pre-wrap">
                    Error: Failed to compile. src/middleware/auth.ts:42:5
                    TypeError: Cannot read property 'token' of undefined
                  </div>
                  <div className="ml-8 mt-2 flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage
                        src="/placeholder.svg?height=20&width=20"
                        alt="@user"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      Assigned to you
                    </span>
                  </div>
                </div>

                <Separator />

                {/* PR 2 */}
                <div>
                  <div className="flex items-start gap-2 mb-2">
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <Check className="h-4 w-4" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">
                          Add dark mode support (#982)
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          Updated 5h ago
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        repo/frontend-app · 8 commits · 5 comments
                      </p>
                    </div>
                  </div>
                  <div className="ml-8 mt-2 flex items-center gap-2">
                    <Avatar className="h-5 w-5">
                      <AvatarImage
                        src="/placeholder.svg?height=20&width=20"
                        alt="@user"
                      />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      Created by Alex Smith
                    </span>
                  </div>
                </div>

                <Separator />

                {/* PR 3 */}
                <div>
                  <div className="flex items-start gap-2 mb-2">
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                      <AlertCircle className="h-4 w-4" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">
                          Update dependencies (#1024)
                        </h3>
                        <span className="text-sm text-muted-foreground">
                          Updated 30m ago
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        repo/shared-libs · 1 commit · 0 comments
                      </p>
                    </div>
                  </div>
                  <div className="ml-8 mt-2 flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border bg-background text-xs">
                      CI
                    </span>
                    <span className="text-sm text-muted-foreground">
                      CI in progress (3/5 checks)
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Reviews */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Pending Reviews</CardTitle>
              <Button variant="link" className="text-sm">
                View all
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {/* Review 1 */}
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <span className="text-xs font-bold">R</span>
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">
                        Implement new API endpoints (#876)
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        Requested 1d ago
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      repo/backend-api · 12 files changed · +342/-128
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Review 2 */}
                <div className="flex items-start gap-2">
                  <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <span className="text-xs font-bold">R</span>
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">
                        Fix accessibility issues (#1102)
                      </h3>
                      <span className="text-sm text-muted-foreground">
                        Requested 4h ago
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      repo/frontend-app · 5 files changed · +87/-42
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column (1/3 width on desktop) */}
        <div className="space-y-6">
          {/* Recent Repositories */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Repositories</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  New
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {/* Repo 1 */}
                <div className="flex items-start gap-3">
                  <span className="text-purple-500">
                    <Layout className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-medium">frontend-app</h3>
                    <p className="text-sm text-muted-foreground">
                      Updated 2h ago
                    </p>
                  </div>
                </div>

                {/* Repo 2 */}
                <div className="flex items-start gap-3">
                  <span className="text-green-500">
                    <Server className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-medium">auth-service</h3>
                    <p className="text-sm text-muted-foreground">
                      Updated 1d ago
                    </p>
                  </div>
                </div>

                {/* Repo 3 */}
                <div className="flex items-start gap-3">
                  <span className="text-blue-500">
                    <Layers className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-medium">shared-libs</h3>
                    <p className="text-sm text-muted-foreground">
                      Updated 3d ago
                    </p>
                  </div>
                </div>

                {/* Repo 4 */}
                <div className="flex items-start gap-3">
                  <span className="text-amber-500">
                    <Database className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-medium">backend-api</h3>
                    <p className="text-sm text-muted-foreground">
                      Updated 5d ago
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Teams */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Your Teams</CardTitle>
              <Button variant="link" className="text-sm">
                View all
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {/* Team 1 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-purple-500">
                      <Layout className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-medium">Frontend</h3>
                      <p className="text-sm text-muted-foreground">
                        3 open issues
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50">
                    8 members
                  </Badge>
                </div>

                {/* Team 2 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-green-500">
                      <Server className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-medium">Backend</h3>
                      <p className="text-sm text-muted-foreground">
                        7 open issues
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50">
                    6 members
                  </Badge>
                </div>

                {/* Team 3 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-500">
                      <FileCode className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-medium">DevOps</h3>
                      <p className="text-sm text-muted-foreground">
                        2 open issues
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50">
                    4 members
                  </Badge>
                </div>

                {/* Team 4 */}
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-pink-500">
                      <Palette className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-medium">Design</h3>
                      <p className="text-sm text-muted-foreground">
                        1 open issue
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50">
                    5 members
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
