
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Briefcase,
  Users,
  Clock,
  AlertTriangle,
  FileText,
  DollarSign,
  TrendingDown,
  Code2,
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

const vendorsData = [
  {
    name: "Splintzer (Dev Agency)",
    contractType: "Retainer",
    monthlyCost: "₹1,50,000",
    assignedProjects: ["Creator Portal", "Mobile App v2.2"],
    tasksAssigned: 25,
    tasksDelayed: 2,
    slaBreaches: 0,
    codeAccess: "Full",
    repoOwnership: "Client",
    escalationContact: "Mr. Splintzer",
  },
  {
    name: "Jeho (Design Contractor)",
    contractType: "Per Task",
    monthlyCost: "Variable",
    assignedProjects: ["UI/UX Redesign"],
    tasksAssigned: 8,
    tasksDelayed: 0,
    slaBreaches: 0,
    codeAccess: "Read-only (Figma)",
    repoOwnership: "N/A",
    escalationContact: "Mr. Jeho",
  },
];

const kpiData = [
    { title: "Active Vendors", value: vendorsData.length, icon: <Briefcase /> },
    { title: "Total Monthly Cost", value: "₹1,50,000+", icon: <DollarSign /> },
    { title: "Total Delayed Tasks", value: "2", icon: <Clock /> },
    { title: "SLA Breaches", value: "0", icon: <AlertTriangle /> },
];

export default function TechVendorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Tech Vendor Management</h1>
        <p className="text-muted-foreground">Manage relationships, contracts, and performance of external development teams.</p>
      </div>

       <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
            <Card key={kpi.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                    <div className="text-muted-foreground">{kpi.icon}</div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpi.value}</div>
                </CardContent>
            </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>All Vendors</CardTitle>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Vendor
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Add New Vendor</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
                            <div className="space-y-2">
                                <Label htmlFor="vendor-name">Vendor Name</Label>
                                <Input id="vendor-name" placeholder="e.g., Splintzer Inc." />
                            </div>
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="contract-type">Contract Type</Label>
                                    <Select><SelectTrigger id="contract-type"><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent><SelectItem value="retainer">Retainer</SelectItem><SelectItem value="per-task">Per Task</SelectItem><SelectItem value="project-based">Project-based</SelectItem></SelectContent></Select>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="monthly-cost">Monthly Cost (₹)</Label>
                                    <Input id="monthly-cost" type="number" placeholder="Enter cost or leave blank if variable"/>
                                </div>
                             </div>
                             <div className="space-y-2">
                                <Label htmlFor="projects">Assigned Projects (comma-separated)</Label>
                                <Input id="projects" placeholder="e.g., Creator Portal, Mobile App v2.2" />
                            </div>
                            <Separator />
                             <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="tasks-assigned">Tasks Assigned</Label>
                                    <Input id="tasks-assigned" type="number" placeholder="0"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tasks-delayed">Tasks Delayed</Label>
                                    <Input id="tasks-delayed" type="number" placeholder="0"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sla-breaches">SLA Breaches</Label>
                                    <Input id="sla-breaches" type="number" placeholder="0"/>
                                </div>
                             </div>
                            <Separator />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="code-access">Code Access Level</Label>
                                    <Select><SelectTrigger id="code-access"><SelectValue placeholder="Select level" /></SelectTrigger><SelectContent><SelectItem value="full">Full</SelectItem><SelectItem value="read-only">Read-only</SelectItem><SelectItem value="none">None</SelectItem></SelectContent></Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="repo-owner">Repository Ownership</Label>
                                    <Select><SelectTrigger id="repo-owner"><SelectValue placeholder="Select owner" /></SelectTrigger><SelectContent><SelectItem value="client">Client</SelectItem><SelectItem value="vendor">Vendor</SelectItem></SelectContent></Select>
                                </div>
                            </div>
                            <Separator />
                             <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="contact-name">Escalation Contact Name</Label>
                                    <Input id="contact-name" placeholder="e.g., Mr. Splintzer" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contact-email">Escalation Contact Email</Label>
                                    <Input id="contact-email" type="email" placeholder="e.g., escalation@splintzer.com" />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Vendor</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead className="hidden md:table-cell">Contract</TableHead>
                <TableHead className="hidden lg:table-cell">Assigned Tasks</TableHead>
                <TableHead className="hidden lg:table-cell">Delayed Tasks</TableHead>
                <TableHead className="hidden lg:table-cell">SLA Breaches</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendorsData.map((vendor) => (
                <TableRow key={vendor.name}>
                  <TableCell>
                      <div className="font-medium">{vendor.name}</div>
                      <div className="text-xs text-muted-foreground">{vendor.escalationContact}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{vendor.contractType}</Badge>
                    <p className="text-xs text-muted-foreground">{vendor.monthlyCost}</p>
                  </TableCell>
                   <TableCell className="hidden lg:table-cell">{vendor.tasksAssigned}</TableCell>
                   <TableCell className={`hidden lg:table-cell ${vendor.tasksDelayed > 0 ? "text-destructive font-bold" : ""}`}>{vendor.tasksDelayed}</TableCell>
                    <TableCell className={`hidden lg:table-cell ${vendor.slaBreaches > 0 ? "text-destructive font-bold" : ""}`}>{vendor.slaBreaches}</TableCell>
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
                        <DropdownMenuItem>View Tasks</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Terminate Contract
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
