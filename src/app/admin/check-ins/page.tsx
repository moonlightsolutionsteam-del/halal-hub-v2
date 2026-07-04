
"use client"

import {
  MoreHorizontal,
  Search,
  CheckSquare,
  Users,
  Building,
  ShieldAlert,
  BarChart,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart as RechartsBarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from "recharts"


const checkInsData = [
  { user: "Aisha Khan", userInitials: "AK", location: "Karim's Restaurant", type: "Restaurant", time: "2 hours ago" },
  { user: "Yusuf Ibrahim", userInitials: "YI", location: "Al-Naseeb Meats", type: "Meat Shop", time: "5 hours ago" },
  { user: "Zoya Akhtar", userInitials: "ZA", location: "Jama Masjid", type: "Mosque", time: "Yesterday" },
  { user: "Omar Abdullah", userInitials: "OA", location: "Al-Noor Islamic Center", type: "Mosque", time: "Yesterday" },
  { user: "Halal Food Reviews", userInitials: "HF", location: "Al Bake", type: "Restaurant", time: "2 days ago" },
];

const flaggedCheckinsData = [
    { user: "Suspicious User 1", userInitials: "S1", location: "Karim's Restaurant", reason: "Rapid Check-ins", time: "1 min ago" },
    { user: "Suspicious User 2", userInitials: "S2", location: "Al Bake", reason: "GPS Mismatch", time: "10 mins ago" },
];

const weeklyCheckinData = [
  { day: "Mon", checkins: 650 },
  { day: "Tue", checkins: 590 },
  { day: "Wed", checkins: 800 },
  { day: "Thu", checkins: 810 },
  { day: "Fri", checkins: 1200 },
  { day: "Sat", checkins: 1500 },
  { day: "Sun", checkins: 950 },
];

const chartConfig = {
  checkins: {
    label: "Check-ins",
    color: "hsl(var(--primary))",
  },
};


export default function SuperAdminCheckInsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Check-in Management</h1>
            <p className="text-muted-foreground">Monitor and manage all user check-ins across the platform.</p>
        </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Check-ins</CardTitle>
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">18,520</div>
                <p className="text-xs text-muted-foreground">+2,100 this month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Check-ins Today</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">215</div>
                <p className="text-xs text-muted-foreground">+30 from yesterday</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Most Checked-in Place</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Jama Masjid</div>
                <p className="text-xs text-muted-foreground">1,500+ check-ins total</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Flagged Check-ins</CardTitle>
                <ShieldAlert className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">2</div>
                <p className="text-xs text-muted-foreground">Require review</p>
            </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><BarChart className="h-5 w-5 text-primary"/> Weekly Check-in Analytics</CardTitle>
            <CardDescription>Total check-ins across the platform over the last 7 days.</CardDescription>
        </CardHeader>
        <CardContent>
             <ChartContainer config={chartConfig} className="w-full h-64">
                <RechartsBarChart data={weeklyCheckinData} margin={{ top: 20, right: 20, bottom: 20, left: -10 }}>
                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                    <YAxis />
                    <Tooltip 
                        cursor={false} 
                        content={
                            <ChartTooltipContent 
                                indicator="dot"
                            />
                        } 
                    />
                    <Bar dataKey="checkins" fill="var(--color-checkins)" radius={4} />
                </RechartsBarChart>
            </ChartContainer>
        </CardContent>
      </Card>
      
       <Tabs defaultValue="all">
        <TabsList>
            <TabsTrigger value="all">All Check-ins</TabsTrigger>
            <TabsTrigger value="flagged">Flagged for Review</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search by user or location..." className="pl-10" />
                        </div>
                        <div className="flex gap-2">
                            <Select>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Filter by Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="restaurant">Restaurant</SelectItem>
                                    <SelectItem value="mosque">Mosque</SelectItem>
                                    <SelectItem value="meat">Meat Shop</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="hidden md:table-cell">Type</TableHead>
                        <TableHead className="hidden lg:table-cell">Time</TableHead>
                        <TableHead>
                        <span className="sr-only">Actions</span>
                        </TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {checkInsData.map((checkIn, index) => (
                        <TableRow key={index}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                            <Avatar>
                                <AvatarFallback>{checkIn.userInitials}</AvatarFallback>
                            </Avatar>
                            <div className="font-medium">{checkIn.user}</div>
                            </div>
                        </TableCell>
                        <TableCell className="font-medium">{checkIn.location}</TableCell>
                        <TableCell className="hidden md:table-cell">
                            <Badge variant="outline">{checkIn.type}</Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">{checkIn.time}</TableCell>
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
                                <DropdownMenuItem>View User Profile</DropdownMenuItem>
                                <DropdownMenuItem>View Location</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                Invalidate Check-in
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
        </TabsContent>
         <TabsContent value="flagged" className="mt-4">
             <Card>
                <CardHeader>
                    <CardTitle>Flagged Check-ins</CardTitle>
                    <CardDescription>Review these check-ins for suspicious activity.</CardDescription>
                </CardHeader>
                 <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {flaggedCheckinsData.map((checkIn, index) => (
                            <TableRow key={index} className="bg-destructive/5">
                            <TableCell>
                                <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarFallback>{checkIn.userInitials}</AvatarFallback>
                                </Avatar>
                                <div className="font-medium">{checkIn.user}</div>
                                </div>
                            </TableCell>
                            <TableCell>{checkIn.location}</TableCell>
                            <TableCell>
                                <Badge variant="destructive">{checkIn.reason}</Badge>
                            </TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button size="sm" variant="outline">Dismiss</Button>
                                <Button size="sm" variant="destructive">Suspend User</Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                 </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
