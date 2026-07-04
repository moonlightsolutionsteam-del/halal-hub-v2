
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Bug,
  Clock,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Users,
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
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/datepicker"

const bugsData = [
  { id: "BUG-001", title: "Login button unresponsive on Safari", priority: "Critical", status: "Open", assignee: "Ovais", assigneeInitials: "OV", reported: "2h ago" },
  { id: "BUG-002", title: "Incorrect calculation in monthly report", priority: "High", status: "In Progress", assignee: "Yasar", assigneeInitials: "YK", reported: "1d ago" },
  { id: "BUG-003", title: "Image upload fails for PNG files", priority: "Medium", status: "Open", assignee: "Unassigned", assigneeInitials: "?", reported: "3d ago" },
  { id: "BUG-004", title: "Typo on pricing page", priority: "Low", status: "Completed", assignee: "Sheikh", assigneeInitials: "SH", reported: "5d ago" },
];

const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
        case "Critical":
        case "High": return "destructive";
        case "Medium": return "default";
        case "Low": return "secondary";
        default: return "outline";
    }
}

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Completed": return "secondary";
        case "In Progress":
        case "Open":
            return "default";
        default: return "outline";
    }
}


export default function BugsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Bug Tracking</h1>
            <p className="text-muted-foreground">Monitor, prioritize, and assign bug reports.</p>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical Bugs</CardTitle>
                <Bug className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">1</div>
                <p className="text-xs text-muted-foreground">Requires immediate attention</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New This Week</CardTitle>
                <PlusCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+3 from last week</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">8.2 hours</div>
                <p className="text-xs text-muted-foreground">-15% from last week</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unresolved Bugs</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">25</div>
                <p className="text-xs text-muted-foreground">Across all projects</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>All Bugs</CardTitle>
                 <Dialog>
                    <DialogTrigger asChild>
                         <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Log New Bug
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Log New Bug Report</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="bug-title">Bug Title</Label>
                                <Input id="bug-title" placeholder="A brief, clear title for the bug" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bug-description">Description & Steps to Reproduce</Label>
                                <Textarea id="bug-description" placeholder="Describe the bug in detail, including steps to reproduce." />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bug-module">Module</Label>
                                    <Select>
                                        <SelectTrigger id="bug-module"><SelectValue placeholder="Select module" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="auth">Authentication</SelectItem>
                                            <SelectItem value="dashboard">Dashboard</SelectItem>
                                            <SelectItem value="payments">Payments</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bug-env">Environment</Label>
                                    <Select>
                                        <SelectTrigger id="bug-env"><SelectValue placeholder="Select environment" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="production">Production</SelectItem>
                                            <SelectItem value="staging">Staging</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="bug-assignee">Assignee</Label>
                                    <Select>
                                        <SelectTrigger id="bug-assignee">
                                            <SelectValue placeholder="Assign to..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ovais">Ovais</SelectItem>
                                            <SelectItem value="unassigned">Unassigned</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bug-priority">Severity</Label>
                                    <Select>
                                        <SelectTrigger id="bug-priority">
                                            <SelectValue placeholder="Set priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="high">High</SelectItem>
                                            <SelectItem value="critical">Critical</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bug-media">Screenshot / Video</Label>
                                <Input id="bug-media" type="file" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Bug</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search bugs..." className="pl-10" />
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bug Report</TableHead>
                <TableHead className="hidden md:table-cell">Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Assignee</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bugsData.map((bug) => (
                <TableRow key={bug.id}>
                  <TableCell>
                      <div className="font-medium">{bug.title}</div>
                      <div className="text-sm text-muted-foreground">{bug.id} • {bug.reported}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={getPriorityBadgeVariant(bug.priority)}>{bug.priority}</Badge>
                  </TableCell>
                   <TableCell>
                    <Badge variant={getStatusBadgeVariant(bug.status)}>{bug.status}</Badge>
                   </TableCell>
                   <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                             <Avatar className="h-7 w-7">
                                <AvatarFallback>{bug.assigneeInitials}</AvatarFallback>
                            </Avatar>
                            <span>{bug.assignee}</span>
                        </div>
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
                        <DropdownMenuItem>Change Status</DropdownMenuItem>
                        <DropdownMenuItem>Re-assign</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete
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
