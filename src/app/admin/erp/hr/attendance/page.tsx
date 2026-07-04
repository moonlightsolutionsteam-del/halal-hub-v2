
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  UserCheck,
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
import { DatePicker } from "@/components/ui/datepicker";
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


const attendanceData = [
  { name: "Yasar Khan", initials: "YK", checkIn: "09:25 AM", checkOut: "06:30 PM", hours: "9h 5m", status: "On Time" },
  { name: "MOHAMMED HUZAIFA", initials: "MH", checkIn: "09:45 AM", checkOut: "06:40 PM", hours: "8h 55m", status: "Late" },
  { name: "Vinayak kainthla", initials: "VK", checkIn: "09:30 AM", checkOut: "---", hours: "---", status: "Present" },
  { name: "Ovais", initials: "OV", checkIn: "---", checkOut: "---", hours: "---", status: "On Leave" },
  { name: "Sheikh", initials: "SH", checkIn: "---", checkOut: "---", hours: "---", status: "Absent" },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "On Time":
        case "Present":
            return "secondary";
        case "Late": return "destructive";
        case "On Leave": return "outline";
        case "Absent": return "destructive";
        default: return "default";
    }
}


export default function AttendancePage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Attendance Management</h1>
            <p className="text-muted-foreground">Track and manage employee attendance logs.</p>
        </div>
        
      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Present Today</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">9/12</div>
                <p className="text-xs text-muted-foreground">75% of team is present</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">On Time</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-muted-foreground">vs 2 Late</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">On Leave</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">1 sick, 1 casual</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">1</div>
                <p className="text-xs text-muted-foreground">Unplanned absence</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>Attendance Log</CardTitle>
                 <Dialog>
                    <DialogTrigger asChild>
                         <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Mark Attendance
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Manual Attendance Entry</DialogTitle>
                             <DialogDescription>
                                Manually log attendance for an employee.
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
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="checkin-time">Check-in</Label>
                                    <Input id="checkin-time" type="time" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="checkout-time">Check-out</Label>
                                    <Input id="checkout-time" type="time" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Date</Label>
                                <DatePicker />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="log-status">Status</Label>
                                <Select>
                                    <SelectTrigger id="log-status">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="present">Present</SelectItem>
                                        <SelectItem value="on-leave">On Leave</SelectItem>
                                        <SelectItem value="wfh">Work From Home</SelectItem>
                                        <SelectItem value="absent">Absent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="log-notes">Notes (Optional)</Label>
                                <Textarea id="log-notes" placeholder="e.g., Left early for appointment." />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Entry</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by employee name..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <DatePicker />
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="on-time">On Time</SelectItem>
                            <SelectItem value="late">Late</SelectItem>
                            <SelectItem value="present">Present</SelectItem>
                            <SelectItem value="on-leave">On Leave</SelectItem>
                            <SelectItem value="absent">Absent</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Working Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendanceData.map((item) => (
                <TableRow key={item.name}>
                  <TableCell>
                      <div className="flex items-center gap-3">
                         <Avatar className="h-9 w-9">
                            <AvatarFallback>{item.initials}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{item.name}</div>
                      </div>
                  </TableCell>
                  <TableCell>{item.checkIn}</TableCell>
                  <TableCell>{item.checkOut}</TableCell>
                  <TableCell>{item.hours}</TableCell>
                   <TableCell>
                    <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
                   </TableCell>
                  <TableCell>
                     <Button variant="outline" size="sm">Edit</Button>
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
