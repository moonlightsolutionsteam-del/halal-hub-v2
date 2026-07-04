
"use client"

import {
  MoreHorizontal,
  Search,
  Users,
  Map,
  ClipboardList,
  BarChart,
  PlusCircle,
  File,
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


const visitLogsData = [
  { agent: "Yasar Khan", agentInitials: "YK", business: "Sultan's Dine", location: "South Delhi", purpose: "Onboarding", date: "2024-07-30" },
  { agent: "MOHAMMED HUZAIFA", agentInitials: "MH", business: "The Kebab Shop", location: "Old Delhi", purpose: "Initial Contact", date: "2024-07-30" },
  { agent: "Vinayak kainthla", agentInitials: "VK", business: "Modern Abayas", location: "Bangalore", purpose: "Follow-up", date: "2024-07-29" },
  { agent: "Yasar Khan", agentInitials: "YK", business: "New Biryani House", location: "South Delhi", purpose: "Initial Contact", date: "2024-07-29" },
  { agent: "MOHAMMED HUZAIFA", agentInitials: "MH", business: "Old City Cafe", location: "Old Delhi", purpose: "Scheduled", date: "2024-07-31" },
];

const territoryData = [
    { zone: "South Delhi", agent: "Yasar Khan", agentInitials: "YK", businesses: 150, conversion: "15%" },
    { zone: "Old Delhi", agent: "MOHAMMED HUZAIFA", agentInitials: "MH", businesses: 220, conversion: "12%" },
    { zone: "Bangalore", agent: "Vinayak kainthla", agentInitials: "VK", businesses: 300, conversion: "18%" },
    { zone: "West Delhi", agent: "Unassigned", agentInitials: "?", businesses: 180, conversion: "N/A" },
]


export default function SuperAdminFieldSalesPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Field Sales</h1>
            <p className="text-muted-foreground">Manage territories, track visits, and monitor field team performance.</p>
        </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">2 onboarding</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visits Today</CardTitle>
                <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">+10 from yesterday</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leads Generated (Week)</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">85</div>
                <p className="text-xs text-muted-foreground">22 converted</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Yasar Khan</div>
                <p className="text-xs text-muted-foreground">15 conversions this month</p>
            </CardContent>
        </Card>
      </div>

       <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
         <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Territory Assignments</CardTitle>
                    <Button size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Assign Territory
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Zone</TableHead>
                            <TableHead>Agent</TableHead>
                            <TableHead className="text-right">Conversion</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {territoryData.map(item => (
                             <TableRow key={item.zone}>
                                <TableCell className="font-medium">{item.zone}</TableCell>
                                <TableCell>
                                     <div className="flex items-center gap-2">
                                        <Avatar className="h-7 w-7">
                                            <AvatarFallback>{item.agentInitials}</AvatarFallback>
                                        </Avatar>
                                        <span>{item.agent}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">{item.conversion}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Recent Visit Logs</CardTitle>
                    <Button size="sm">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Log Visit
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Business</TableHead>
                            <TableHead>Agent</TableHead>
                            <TableHead className="text-right">Purpose</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {visitLogsData.slice(0, 4).map(item => (
                             <TableRow key={item.business}>
                                <TableCell>
                                    <div className="font-medium">{item.business}</div>
                                    <div className="text-sm text-muted-foreground">{item.location}</div>
                                </TableCell>
                                <TableCell>{item.agent}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant="outline">{item.purpose}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
       </div>
    </div>
  )
}
