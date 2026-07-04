
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
  Users,
  UserPlus,
  UserX,
  Clock,
  Star,
  Briefcase,
  Calendar,
  TrendingDown,
  ClipboardList,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const attendanceData = [
  { name: "Yasar Khan", initials: "YK", checkIn: "09:25 AM", checkOut: "06:30 PM", status: "On Time" },
  { name: "MOHAMMED HUZAIFA", initials: "MH", checkIn: "09:45 AM", checkOut: "06:40 PM", status: "Late" },
  { name: "Vinayak kainthla", initials: "VK", checkIn: "09:30 AM", checkOut: "---", status: "Present" },
  { name: "Ovais", initials: "OV", checkIn: "---", checkOut: "---", status: "On Leave" },
];

const leaveRequestsData = [
  { name: "Sheikh", initials: "SH", from: "2024-08-05", to: "2024-08-07", reason: "Family Function" },
  { name: "MOHAMMED HUZAIFA", initials: "MH", from: "2024-08-12", to: "2024-08-12", reason: "Personal Work" },
];

const topPerformers = [
    { name: "Vinayak kainthla", initials: "VK", metric: "110% Target Achieved" },
    { name: "Yasar Khan", initials: "YK", metric: "15 Deals Closed" },
]

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "On Time":
        case "Present":
            return "secondary";
        case "Late": return "destructive";
        case "On Leave": return "outline";
        default: return "default";
    }
}

export default function HrDashboardPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">HR Dashboard</h1>
            <p className="text-muted-foreground">Real-time view of your team's health and performance.</p>
        </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+2 new hires this month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Present Today</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">9/12</div>
                <p className="text-xs text-muted-foreground">75% attendance</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">On Leave Today</CardTitle>
                <CalendarClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">1 sick, 1 casual</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Leave Requests</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-yellow-600">2</div>
                <p className="text-xs text-muted-foreground">Action required</p>
            </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Today's Attendance Log</CardTitle>
            </CardHeader>
            <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Check-in</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {attendanceData.map((item) => (
                            <TableRow key={item.name}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>{item.initials}</AvatarFallback>
                                        </Avatar>
                                        <div className="font-medium">{item.name}</div>
                                    </div>
                                </TableCell>
                                <TableCell>{item.checkIn}</TableCell>
                                <TableCell>
                                    <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Pending Leave Requests</CardTitle>
            </CardHeader>
             <CardContent>
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Employee</TableHead>
                            <TableHead>Dates</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaveRequestsData.map((item) => (
                            <TableRow key={item.name}>
                                <TableCell>
                                     <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>{item.initials}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{item.name}</div>
                                            <div className="text-xs text-muted-foreground">{item.reason}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{item.from} to {item.to}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex gap-2 justify-end">
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
      </div>

       <div className="grid gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Performance Highlights</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">Top Performers (This Month)</h3>
                        {topPerformers.map(performer => (
                            <div key={performer.name} className="flex items-center gap-3 p-2 bg-secondary/50 rounded-lg">
                                <Avatar className="h-8 w-8"><AvatarFallback>{performer.initials}</AvatarFallback></Avatar>
                                <div>
                                    <p className="font-medium">{performer.name}</p>
                                    <p className="text-xs text-primary">{performer.metric}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Low Engagement Alerts</h3>
                        <div className="flex items-center gap-3 p-2 bg-destructive/10 rounded-lg">
                           <TrendingDown className="h-6 w-6 text-destructive"/>
                           <p className="text-sm">2 employees have not logged in for over a week.</p>
                        </div>
                    </div>
                     <div>
                        <h3 className="font-semibold mb-2">Pending Reviews</h3>
                         <div className="flex items-center gap-3 p-2 bg-yellow-500/10 rounded-lg">
                           <ClipboardList className="h-6 w-6 text-yellow-600"/>
                           <p className="text-sm">3 quarterly performance reviews are due.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Recruitment Pipeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div>
                    <h3 className="font-semibold mb-2">Open Positions</h3>
                    <div className="flex justify-between p-3 bg-secondary/50 rounded-lg">
                        <span>Lead Developer</span>
                        <Badge>2 Candidates</Badge>
                    </div>
                 </div>
                 <div>
                    <h3 className="font-semibold mb-2">Interviews Scheduled</h3>
                    <div className="flex justify-between p-3 bg-secondary/50 rounded-lg">
                        <span>Aisha Khan (Final Round)</span>
                        <span>Tomorrow, 11 AM</span>
                    </div>
                 </div>
            </CardContent>
        </Card>
      </div>

    </div>
  )
}
