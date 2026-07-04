
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
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


const meetingsData = [
  { 
    title: "Intro Call with The Kebab Shop",
    attendee: "Aisha Begum",
    account: "The Kebab Shop",
    dateTime: "2024-08-05 11:00 AM",
    owner: "Yasar",
    ownerInitials: "YK",
    status: "Scheduled"
  },
  { 
    title: "Proposal Review",
    attendee: "Fatima Al-Sayed",
    account: "Modern Abayas",
    dateTime: "2024-08-06 02:30 PM",
    owner: "Vinayak",
    ownerInitials: "VK",
    status: "Scheduled"
  },
  { 
    title: "Onboarding Kick-off",
    attendee: "Omar Abdullah",
    account: "Global Halal Meats",
    dateTime: "2024-07-29 10:00 AM",
    owner: "Yasar",
    ownerInitials: "YK",
    status: "Completed"
  },
  { 
    name: "Follow-up",
    attendee: "Zainab Ibrahim",
    account: "Heritage Books",
    dateTime: "2024-07-28 04:00 PM",
    owner: "Huzaifa",
    ownerInitials: "MH",
    status: "Canceled"
  },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Completed": return "secondary";
        case "Canceled": return "destructive";
        case "Scheduled": return "default";
        default: return "outline";
    }
}


export default function MeetingsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Meetings</h1>
            <p className="text-muted-foreground">Schedule, track, and manage all team meetings.</p>
        </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Scheduled for this week</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Meetings Today</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">2 remaining</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed (This Week)</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">75% attendance rate</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Canceled / No-shows</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">2</div>
                <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>All Meetings</CardTitle>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Schedule Meeting
                 </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search meetings..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="canceled">Canceled</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Meeting</TableHead>
                <TableHead className="hidden md:table-cell">Date & Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Owner</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {meetingsData.map((meeting, index) => (
                <TableRow key={index}>
                  <TableCell>
                      <div className="font-medium truncate">{meeting.title || "Follow-up"}</div>
                      <div className="text-sm text-muted-foreground">{meeting.attendee} ({meeting.account})</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{meeting.dateTime}</TableCell>
                   <TableCell>
                    <Badge variant={getStatusBadgeVariant(meeting.status)}>{meeting.status}</Badge>
                   </TableCell>
                   <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                             <Avatar className="h-7 w-7">
                                <AvatarFallback>{meeting.ownerInitials}</AvatarFallback>
                            </Avatar>
                            <span>{meeting.owner}</span>
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
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Cancel Meeting
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
