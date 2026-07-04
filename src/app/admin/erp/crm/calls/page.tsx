
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Phone,
  Clock,
  BarChart,
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


const callsData = [
  { 
    contact: "Aisha Begum",
    account: "The Kebab Shop",
    subject: "Follow-up on proposal",
    duration: "5m 30s",
    owner: "Yasar",
    ownerInitials: "YK",
    date: "2024-08-01 10:00 AM"
  },
  { 
    contact: "Fatima Al-Sayed",
    account: "Modern Abayas",
    subject: "Initial introduction",
    duration: "8m 15s",
    owner: "Huzaifa",
    ownerInitials: "MH",
    date: "2024-07-31 03:00 PM"
  },
  { 
    contact: "Zainab Ibrahim",
    account: "Heritage Books",
    subject: "Scheduled a demo",
    duration: "12m 45s",
    owner: "Vinayak",
    ownerInitials: "VK",
    date: "2024-07-31 11:30 AM"
  },
];


export default function CallsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Call Logs</h1>
            <p className="text-muted-foreground">Track and manage all sales calls made by your team.</p>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Calls Today</CardTitle>
                <Phone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">+5 from yesterday</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Duration (Today)</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">2h 15m</div>
                <p className="text-xs text-muted-foreground">Across all agents</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Call Duration</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">6m 45s</div>
                <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Caller (Today)</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Yasar</div>
                <p className="text-xs text-muted-foreground">8 calls logged</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>All Call Logs</CardTitle>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Log a Call
                 </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search calls..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by Agent" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Agents</SelectItem>
                            <SelectItem value="yasar">Yasar</SelectItem>
                            <SelectItem value="huzaifa">Huzaifa</SelectItem>
                             <SelectItem value="vinayak">Vinayak</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contact</TableHead>
                <TableHead className="hidden md:table-cell max-w-xs truncate">Subject</TableHead>
                <TableHead className="hidden lg:table-cell">Duration</TableHead>
                <TableHead className="hidden lg:table-cell">Agent</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {callsData.map((call, index) => (
                <TableRow key={index}>
                  <TableCell>
                      <div className="font-medium">{call.contact}</div>
                      <div className="text-sm text-muted-foreground">{call.account}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-xs truncate">{call.subject}</TableCell>
                  <TableCell className="hidden lg:table-cell">{call.duration}</TableCell>
                   <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                             <Avatar className="h-7 w-7">
                                <AvatarFallback>{call.ownerInitials}</AvatarFallback>
                            </Avatar>
                            <span>{call.owner}</span>
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
                        <DropdownMenuItem>View Call Details</DropdownMenuItem>
                        <DropdownMenuItem>Listen to Recording</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete Log
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
