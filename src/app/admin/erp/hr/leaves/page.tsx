
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  CheckCircle2,
  AlertTriangle,
  CalendarClock,
  UserCheck,
  FileText,
  Clock,
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
import { DatePickerWithRange } from "@/components/ui/date-range-picker"


const leaveRequestsData = [
  { name: "Sheikh", initials: "SH", from: "2024-08-05", to: "2024-08-07", type: "Casual Leave", reason: "Family Function" },
  { name: "MOHAMMED HUZAIFA", initials: "MH", from: "2024-08-12", to: "2024-08-12", type: "Sick Leave", reason: "Personal Work" },
];

const allLeavesData = [
    { employee: "Yasar Khan", type: "Paid Leave", dates: "2024-07-20 to 2024-07-22", status: "Approved" },
    { employee: "Ovais", type: "WFH", dates: "2024-07-25", status: "Approved" },
    ...leaveRequestsData.map(lr => ({ employee: lr.name, type: lr.type, dates: `${lr.from} to ${lr.to}`, status: "Pending" }))
]

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Approved": return "secondary";
        case "Pending": return "default";
        case "Rejected": return "destructive";
        default: return "outline";
    }
}

export default function LeaveManagementPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Leave Management</h1>
            <p className="text-muted-foreground">Approve leave requests and track team availability.</p>
        </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-yellow-600">2</div>
                <p className="text-xs text-muted-foreground">Require your approval</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team on Leave Today</CardTitle>
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Sheikh (On Leave)</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved (This Month)</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">15</div>
                <p className="text-xs text-muted-foreground">Total leave days</p>
            </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>Pending Leave Requests</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequestsData.map((item) => (
                <TableRow key={item.name}>
                  <TableCell>
                      <div className="flex items-center gap-3">
                         <Avatar className="h-9 w-9">
                            <AvatarFallback>{item.initials}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{item.name}</div>
                      </div>
                  </TableCell>
                  <TableCell>{item.from} to {item.to}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.type}</Badge>
                   </TableCell>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">Approve</Button>
                        <Button variant="destructive" size="sm">Reject</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>All Leave Records</CardTitle>
                 <Dialog>
                    <DialogTrigger asChild>
                         <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Log Leave
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Log Leave Manually</DialogTitle>
                            <DialogDescription>
                                Manually add a leave record for an employee.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="log-employee">Employee</Label>
                                <Select>
                                    <SelectTrigger id="log-employee">
                                        <SelectValue placeholder="Select an employee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="yasar">Yasar Khan</SelectItem>
                                        <SelectItem value="huzaifa">MOHAMMED HUZAIFA</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="log-type">Leave Type</Label>
                                 <Select>
                                    <SelectTrigger id="log-type">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="casual">Casual Leave</SelectItem>
                                        <SelectItem value="sick">Sick Leave</SelectItem>
                                        <SelectItem value="paid">Paid Leave</SelectItem>
                                        <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                                        <SelectItem value="wfh">WFH</SelectItem>
                                        <SelectItem value="emergency">Emergency Leave</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Dates</Label>
                                <DatePickerWithRange />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="log-reason">Reason</Label>
                                <Textarea id="log-reason" placeholder="Reason for leave..." />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Record</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by employee..." className="pl-10" />
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allLeavesData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.employee}</TableCell>
                   <TableCell>
                    <Badge variant="outline">{item.type}</Badge>
                   </TableCell>
                  <TableCell>{item.dates}</TableCell>
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Modify</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Cancel Leave
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
