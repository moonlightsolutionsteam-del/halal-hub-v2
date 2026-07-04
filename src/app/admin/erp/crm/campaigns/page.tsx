
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Users,
  Target,
  BarChart,
  Percent,
  Mail,
  Megaphone,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const campaignsData = [
  { 
    name: "Eid Promotion 2024",
    type: "Email",
    status: "Completed",
    reach: "15,000",
    conversion: "5.2%",
  },
  { 
    name: "New Restaurant Onboarding",
    type: "Social Media",
    status: "Active",
    reach: "50,000",
    conversion: "2.8%",
  },
  { 
    name: "Summer Deals",
    type: "Multi-channel",
    status: "Active",
    reach: "25,000",
    conversion: "4.1%",
  },
  { 
    name: "Q4 Strategy",
    type: "Internal",
    status: "Draft",
    reach: "N/A",
    conversion: "N/A",
  },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Active": return "secondary";
        case "Completed": return "default";
        case "Draft": return "outline";
        default: return "destructive";
    }
}


export default function CampaignsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Marketing Campaigns</h1>
            <p className="text-muted-foreground">Plan, execute, and track all your marketing campaigns.</p>
        </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                <Megaphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">75,000</div>
                <p className="text-xs text-muted-foreground">Across active campaigns</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Conversion Rate</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">3.5%</div>
                <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leads Generated</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+520</div>
                <p className="text-xs text-muted-foreground">This month from campaigns</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>All Campaigns</CardTitle>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Campaign
                 </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search campaigns..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="social">Social Media</SelectItem>
                            <SelectItem value="multi-channel">Multi-channel</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Reach</TableHead>
                <TableHead className="hidden lg:table-cell">Conversion</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaignsData.map((campaign, index) => (
                <TableRow key={index}>
                  <TableCell>
                      <div className="font-medium">{campaign.name}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{campaign.type}</TableCell>
                   <TableCell>
                    <Badge variant={getStatusBadgeVariant(campaign.status)}>{campaign.status}</Badge>
                   </TableCell>
                  <TableCell className="hidden lg:table-cell">{campaign.reach}</TableCell>
                  <TableCell className="hidden lg:table-cell">{campaign.conversion}</TableCell>
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
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Report</DropdownMenuItem>
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
    </div>
  )
}
