
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Zap,
  Clock,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  PauseCircle,
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

const automationsData = [
  { id: "AUTO-001", name: "Assign New Leads", trigger: "New Lead Created", action: "Assign to Sales team round-robin", status: "Active" },
  { id: "AUTO-002", name: "Send Overdue Invoice Reminder", trigger: "Invoice > 30 days overdue", action: "Send reminder email", status: "Active" },
  { id: "AUTO-003", name: "Flag Inactive Businesses", trigger: "No login in 90 days", action: "Change status to 'Inactive'", status: "Paused" },
  { id: "AUTO-004", name: "Welcome Email to New Users", trigger: "User Sign-up", action: "Send 'Welcome' email template", status: "Active" },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Active": return "secondary";
        case "Paused": return "outline";
        default: return "default";
    }
}

export default function AutomationPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Process Automation</h1>
            <p className="text-muted-foreground">Manage and create automated workflows for operational tasks.</p>
        </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Automations</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">out of 4 total</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasks Automated (Today)</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1,258</div>
                <p className="text-xs text-muted-foreground">Across all active workflows</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Time Saved (Est.)</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">~8 hours</div>
                <p className="text-xs text-muted-foreground">Per day for the team</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Errors Encountered</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">1</div>
                <p className="text-xs text-muted-foreground">In the last 24 hours</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>Automation Workflows</CardTitle>
                 <Dialog>
                    <DialogTrigger asChild>
                         <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create Workflow
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Workflow</DialogTitle>
                            <DialogDescription>
                                Set up a new automated process.
                            </DialogDescription>
                        </DialogHeader>
                        {/* A simplified form for demonstration */}
                        <div className="py-4">
                           <p className="text-center text-muted-foreground">(Workflow creation form would go here)</p>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Workflow</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Workflow</TableHead>
                <TableHead>Trigger</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {automationsData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.trigger}</TableCell>
                  <TableCell>{item.action}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
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
                        <DropdownMenuItem>View Logs</DropdownMenuItem>
                        <DropdownMenuItem>Edit Workflow</DropdownMenuItem>
                        <DropdownMenuItem>
                            {item.status === 'Active' ? (
                                <><PauseCircle className="mr-2 h-4 w-4" />Pause</>
                            ) : (
                                <><PlayCircle className="mr-2 h-4 w-4" />Activate</>
                            )}
                        </DropdownMenuItem>
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
