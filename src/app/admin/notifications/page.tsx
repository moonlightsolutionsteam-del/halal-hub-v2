
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  BellRing,
  CheckCircle2,
  TrendingUp,
  BarChart,
  Mail,
  Smartphone,
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
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

const campaignsData = [
  { 
    id: "CAMP-001",
    name: "Ramadan Daily Reminder",
    type: "Push",
    status: "Active",
    sent: "1.2M",
    openRate: "25%"
  },
  { 
    id: "CAMP-002",
    name: "New Feature Announcement",
    type: "Email",
    status: "Completed",
    sent: "25,000",
    openRate: "45%"
  },
  { 
    id: "CAMP-003",
    name: "Weekend Deals",
    type: "SMS",
    status: "Draft",
    sent: "0",
    openRate: "N/A"
  },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Active": return "secondary";
        case "Completed": return "default";
        default: return "outline";
    }
}

const getTypeIcon = (type: string) => {
    switch(type) {
        case "Push": return <BellRing className="h-4 w-4" />;
        case "Email": return <Mail className="h-4 w-4" />;
        case "SMS": return <Smartphone className="h-4 w-4" />;
        default: return null;
    }
}

export default function NotificationEnginePage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Notification Engine</h1>
            <p className="text-muted-foreground">Manage and monitor all platform notifications (Push, SMS, Email).</p>
        </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Sent (This Month)</CardTitle>
                <BellRing className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1,500,000</div>
                <p className="text-xs text-muted-foreground">+10% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Delivery Rate</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">98.5%</div>
                <p className="text-xs text-muted-foreground">Across all channels</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Open Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">22.3%</div>
                <p className="text-xs text-muted-foreground">+2% this week</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. CTR</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">5.8%</div>
                <p className="text-xs text-muted-foreground">Based on tracked links</p>
            </CardContent>
        </Card>
      </div>
      
       <Tabs defaultValue="campaigns">
            <TabsList>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="transactional">Transactional</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="campaigns" className="mt-4">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle>Notification Campaigns</CardTitle>
                            <Button>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Create Campaign
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>Campaign</TableHead>
                            <TableHead className="hidden md:table-cell">Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden lg:table-cell">Sent</TableHead>
                            <TableHead className="hidden lg:table-cell">Open Rate</TableHead>
                            <TableHead>
                            <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {campaignsData.map((campaign) => (
                            <TableRow key={campaign.id}>
                                <TableCell className="font-medium">{campaign.name}</TableCell>
                                <TableCell className="hidden md:table-cell">
                                    <Badge variant="outline" className="flex items-center gap-1 w-fit">
                                        {getTypeIcon(campaign.type)}
                                        {campaign.type}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getStatusBadgeVariant(campaign.status)}>{campaign.status}</Badge>
                                </TableCell>
                                <TableCell className="hidden lg:table-cell">{campaign.sent}</TableCell>
                                <TableCell className="hidden lg:table-cell">{campaign.openRate}</TableCell>
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
                                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                        <DropdownMenuItem>Pause</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive">
                                        Archive
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
            <TabsContent value="transactional" className="text-center py-12 text-muted-foreground">
                Feature coming soon.
            </TabsContent>
            <TabsContent value="templates" className="text-center py-12 text-muted-foreground">
                Feature coming soon.
            </TabsContent>
            <TabsContent value="history" className="text-center py-12 text-muted-foreground">
                Feature coming soon.
            </TabsContent>
        </Tabs>
    </div>
  )
}
