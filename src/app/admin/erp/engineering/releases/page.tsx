
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Rocket,
  CheckCircle2,
  AlertTriangle,
  GitCommit,
  Store,
  Apple
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

const releasesData = [
  {
    version: "v2.1.3 (web)",
    type: "Web",
    features: "Hotfix for login button on Safari",
    bugsFixed: "BUG-001",
    deploymentDate: "2024-07-31",
    deployedBy: "Ovais",
    status: "Deployed"
  },
  {
    version: "v2.2.0 (app)",
    type: "App",
    features: "Creator Profile Revamp, New Badge System",
    bugsFixed: "BUG-002, BUG-004",
    deploymentDate: "---",
    deployedBy: "Pending",
    status: "In QA"
  },
    {
    version: "v2.1.2 (web)",
    type: "Web",
    features: "Performance improvements for image loading",
    bugsFixed: "N/A",
    deploymentDate: "2024-07-28",
    deployedBy: "Ovais",
    status: "Deployed"
  },
  {
    version: "v2.1.0 (backend)",
    type: "Backend",
    features: "New API endpoint for creator analytics",
    bugsFixed: "N/A",
    deploymentDate: "2024-07-25",
    deployedBy: "Sheikh",
    status: "Deployed"
  },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Deployed": return "secondary";
        case "In QA": return "default";
        case "Rolled Back": return "destructive";
        default: return "outline";
    }
}

export default function ReleasesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Release Management</h1>
        <p className="text-muted-foreground">Plan and track software releases and deployments.</p>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Latest Live Version</CardTitle>
                <GitCommit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">v2.1.3</div>
                <p className="text-xs text-muted-foreground">Deployed 2h ago</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Release</CardTitle>
                <Rocket className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">v2.2.0</div>
                <p className="text-xs text-muted-foreground">Scheduled for Aug 15</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Successful Deployments</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">This quarter</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rollbacks</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">0</div>
                <p className="text-xs text-muted-foreground">This quarter</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>Release History</CardTitle>
                 <Dialog>
                    <DialogTrigger asChild>
                         <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create New Release
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Create New Release</DialogTitle>
                            <DialogDescription>
                                Plan a new release and document its contents.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="release-version">Version Number</Label>
                                    <Input id="release-version" placeholder="e.g., v2.3.0" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="release-type">Release Type</Label>
                                    <Select><SelectTrigger id="release-type"><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent><SelectItem value="web">Web</SelectItem><SelectItem value="app">App</SelectItem><SelectItem value="backend">Backend</SelectItem></SelectContent></Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="release-features">Features Included</Label>
                                <Textarea id="release-features" placeholder="List the main features, one per line..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="release-bugs">Bugs Fixed</Label>
                                <Textarea id="release-bugs" placeholder="List bug IDs, e.g., BUG-001, BUG-005..." />
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="release-date">Deployment Date</Label>
                                    <Input id="release-date" type="date" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="release-by">Deployed By</Label>
                                    <Select><SelectTrigger id="release-by"><SelectValue placeholder="Select team member" /></SelectTrigger><SelectContent><SelectItem value="ovais">Ovais</SelectItem><SelectItem value="sheikh">Sheikh</SelectItem></SelectContent></Select>
                                </div>
                             </div>
                              <div className="space-y-2">
                                <Label htmlFor="rollback-plan">Rollback Plan</Label>
                                <Textarea id="rollback-plan" placeholder="Describe the steps to roll back this release if needed." />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="release-issues">Post-Release Issues</Label>
                                <Textarea id="release-issues" placeholder="Log any issues found after deployment." />
                            </div>
                             <Separator />
                             <h4 className="font-semibold">App Store Submission Status</h4>
                             <div className="grid grid-cols-2 gap-4">
                                 <div className="space-y-2">
                                    <Label htmlFor="play-store-status">Google Play Store</Label>
                                    <Select><SelectTrigger id="play-store-status"><SelectValue placeholder="Select status" /></SelectTrigger><SelectContent><SelectItem value="na">N/A</SelectItem><SelectItem value="submitted">Submitted</SelectItem><SelectItem value="in-review">In Review</SelectItem><SelectItem value="approved">Approved</SelectItem><SelectItem value="rejected">Rejected</SelectItem></SelectContent></Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="app-store-status">Apple App Store</Label>
                                    <Select><SelectTrigger id="app-store-status"><SelectValue placeholder="Select status" /></SelectTrigger><SelectContent><SelectItem value="na">N/A</SelectItem><SelectItem value="submitted">Submitted</SelectItem><SelectItem value="in-review">In Review</SelectItem><SelectItem value="approved">Approved</SelectItem><SelectItem value="rejected">Rejected</SelectItem></SelectContent></Select>
                                </div>
                             </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Release</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Version</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead>Features</TableHead>
                <TableHead className="hidden lg:table-cell">Deployed By</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {releasesData.map((release) => (
                <TableRow key={release.version}>
                  <TableCell className="font-semibold">{release.version}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{release.type}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{release.features}</TableCell>
                   <TableCell className="hidden lg:table-cell">{release.deployedBy}</TableCell>
                   <TableCell>
                    <Badge variant={getStatusBadgeVariant(release.status)}>{release.status}</Badge>
                   </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Deployed</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Initiate Rollback
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
