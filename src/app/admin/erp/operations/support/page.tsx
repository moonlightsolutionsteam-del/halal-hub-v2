
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Headset,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  User,
  ShieldAlert,
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

const escalatedTickets = [
  { id: "ESC-001", subject: "Vendor payment dispute", from: "Finance Team", priority: "High", status: "Open", assignedTo: "Yasar", initials: "YK" },
  { id: "ESC-002", subject: "Harassment claim on community post", from: "Content Moderation", priority: "Critical", status: "In Progress", assignedTo: "Huzaifa", initials: "MH" },
  { id: "ESC-003", subject: "Legal query from a business", from: "Sales Team", priority: "High", status: "Open", assignedTo: "Unassigned", initials: "?" },
  { id: "ESC-004", subject: "Repeated API failures for Enterprise client", from: "Engineering", priority: "Medium", status: "Resolved", assignedTo: "Ovais", initials: "OV" },
];

const kpiData = [
    { title: "Open Escalations", value: "3", icon: <AlertTriangle /> },
    { title: "Resolved Today", value: "1", icon: <CheckCircle2 /> },
    { title: "Avg. Resolution Time", value: "24h", icon: <Clock /> },
    { title: "SLA Breaches", value: "0", icon: <ShieldAlert /> },
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
        case "Resolved": return "secondary";
        case "In Progress":
        case "Open":
            return "default";
        default: return "outline";
    }
}


export default function SupportPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Support & Escalations</h1>
            <p className="text-muted-foreground">Manage escalated support tickets and complex customer issues.</p>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi, index) => (
            <Card key={index}>
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
                 <CardTitle>Escalated Tickets</CardTitle>
                 <Button disabled>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Escalation
                 </Button>
            </div>
            <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search tickets by ID, subject, or business..." className="pl-10" />
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead className="hidden md:table-cell">Escalated From</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {escalatedTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>
                      <div className="font-medium">{ticket.subject}</div>
                      <div className="text-sm text-muted-foreground">{ticket.id}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {ticket.from}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadgeVariant(ticket.priority)}>{ticket.priority}</Badge>
                  </TableCell>
                   <TableCell>
                    <Badge variant={getStatusBadgeVariant(ticket.status)}>{ticket.status}</Badge>
                   </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                            <AvatarFallback>{ticket.initials}</AvatarFallback>
                        </Avatar>
                        <span>{ticket.assignedTo}</span>
                    </div>
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Assign Owner</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Close Ticket
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
