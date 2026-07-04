
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  ShieldAlert,
  Clock,
  TrendingUp,
  UserX,
  FileText,
  CheckCircle2,
  AlertTriangle,
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
import { DatePicker } from "@/components/ui/datepicker"
import { useState } from "react"

const risksData = [
  { 
    id: "RISK-001",
    title: "Single vendor dependency on Firebase backend",
    type: "Vendor Dependency",
    impact: "High",
    likelihood: "Medium",
    mitigationPlan: "Explore multi-cloud or alternative database solutions. Document a clear migration strategy.",
    owner: "Ovais",
    ownerInitials: "OV",
    reviewDate: "2024-10-01",
    status: "Open"
  },
  {
    id: "RISK-002",
    title: "Google Maps API key expires in 30 days",
    type: "Infrastructure",
    impact: "Critical",
    likelihood: "High",
    mitigationPlan: "Renew API key immediately and set a calendar reminder for next year.",
    owner: "Super Admin",
    ownerInitials: "SA",
    reviewDate: "2024-08-15",
    status: "Open"
  },
  {
    id: "RISK-003",
    title: "No documented rollback plan for release v2.2.0",
    type: "Security",
    impact: "High",
    likelihood: "Low",
    mitigationPlan: "Document and test rollback procedures before the next major release.",
    owner: "Ovais",
    ownerInitials: "OV",
    reviewDate: "2024-09-01",
    status: "In Progress"
  },
  {
    id: "RISK-004",
    title: "Code ownership unclear for 'legacy-payment' module",
    type: "Vendor Dependency",
    impact: "Medium",
    likelihood: "High",
    mitigationPlan: "Assign a dedicated owner and schedule knowledge transfer sessions.",
    owner: "Unassigned",
    ownerInitials: "?",
    reviewDate: "2024-08-20",
    status: "Open"
  },
];


const getBadgeVariant = (level: string) => {
    switch (level) {
        case "Critical":
        case "High": return "destructive";
        case "Medium": return "default";
        case "Low": return "secondary";
        default: return "outline";
    }
}

const owners = ["Ovais", "Sheikh", "Vinayak", "Yasar", "Huzaifa", "Super Admin", "Unassigned"];
const riskTypes = ["Vendor Dependency", "Security", "Infrastructure", "Scalability", "Legal"];
const impactLevels = ["Critical", "High", "Medium", "Low"];
const likelihoodLevels = ["High", "Medium", "Low"];
const statusLevels = ["Open", "In Progress", "Mitigated", "Closed"];

export default function TechnicalRisksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Technical Risk Register</h1>
        <p className="text-muted-foreground">
          Identify, assess, and mitigate technical risks to ensure platform stability and growth.
        </p>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Critical/High Risks</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">3</div>
                <p className="text-xs text-muted-foreground">Currently open</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unassigned Risks</CardTitle>
                <UserX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Requires ownership</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue for Review</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">All reviews up-to-date</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mitigated This Quarter</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Successfully resolved</p>
            </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Risks</CardTitle>
             <Dialog>
                <DialogTrigger asChild>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add New Risk
                    </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Add New Technical Risk</DialogTitle>
                    </DialogHeader>
                     <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
                        <div className="space-y-2">
                            <Label htmlFor="risk-title">Risk Title</Label>
                            <Input id="risk-title" placeholder="A concise summary of the risk" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label htmlFor="risk-type">Risk Type</Label>
                                <Select><SelectTrigger id="risk-type"><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent>{riskTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="risk-status">Status</Label>
                                <Select><SelectTrigger id="risk-status"><SelectValue placeholder="Set status" /></SelectTrigger><SelectContent>{statusLevels.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
                            </div>
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="risk-impact">Impact Level</Label>
                                <Select><SelectTrigger id="risk-impact"><SelectValue placeholder="Select impact" /></SelectTrigger><SelectContent>{impactLevels.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="risk-likelihood">Likelihood</Label>
                                <Select><SelectTrigger id="risk-likelihood"><SelectValue placeholder="Select likelihood" /></SelectTrigger><SelectContent>{likelihoodLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent></Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mitigation-plan">Mitigation Plan</Label>
                            <Textarea id="mitigation-plan" placeholder="Describe the steps to mitigate this risk..." />
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="risk-owner">Owner</Label>
                                <Select><SelectTrigger id="risk-owner"><SelectValue placeholder="Assign an owner" /></SelectTrigger><SelectContent>{owners.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Next Review Date</Label>
                                <DatePicker />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Save Risk</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Risk</TableHead>
                <TableHead className="hidden md:table-cell">Impact</TableHead>
                <TableHead className="hidden md:table-cell">Likelihood</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {risksData.map((risk) => (
                <TableRow key={risk.id}>
                  <TableCell>
                    <div className="font-medium max-w-xs truncate">{risk.title}</div>
                    <div className="text-xs text-muted-foreground">{risk.type}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={getBadgeVariant(risk.impact)}>{risk.impact}</Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={getBadgeVariant(risk.likelihood)}>{risk.likelihood}</Badge>
                  </TableCell>
                   <TableCell>{risk.owner}</TableCell>
                   <TableCell>
                    <Badge variant={risk.status === 'Open' ? 'default' : 'secondary'}>{risk.status}</Badge>
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
                        <DropdownMenuItem>View/Edit</DropdownMenuItem>
                        <DropdownMenuItem>Set Review Date</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Mitigated</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Close Risk
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
