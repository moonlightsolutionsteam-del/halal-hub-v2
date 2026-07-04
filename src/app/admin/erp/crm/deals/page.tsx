
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Users,
  Briefcase,
  UserPlus,
  FileText,
  Target,
  BarChart,
  DollarSign,
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


const dealsData = [
  { 
    businessName: "Sultan's Dine",
    contact: "Mr. Ahmed",
    stage: "Proposal",
    value: "15,000",
    owner: "Yasar",
    ownerInitials: "YK",
    lastUpdate: "2 days ago"
  },
  { 
    businessName: "The Kebab Shop",
    contact: "Mrs. Fatima",
    stage: "Lead",
    value: "10,000",
    owner: "Huzaifa",
    ownerInitials: "MH",
    lastUpdate: "5 hours ago"
  },
  { 
    businessName: "Modern Abayas",
    contact: "Ms. Ayesha",
    stage: "Negotiation",
    value: "25,000",
    owner: "Vinayak",
    ownerInitials: "VK",
    lastUpdate: "1 day ago"
  },
  { 
    businessName: "Global Halal Meats",
    contact: "Mr. Ibrahim",
    stage: "Won",
    value: "20,000",
    owner: "Yasar",
    ownerInitials: "YK",
    lastUpdate: "1 week ago"
  },
  { 
    businessName: "Heritage Books",
    contact: "Mr. Owais",
    stage: "Lost",
    value: "12,000",
    owner: "Huzaifa",
    ownerInitials: "MH",
    lastUpdate: "3 days ago"
  },
];

const getStageBadgeVariant = (stage: string) => {
    switch (stage) {
        case "Won": return "secondary";
        case "Lost": return "destructive";
        case "Proposal":
        case "Negotiation":
            return "default";
        default: return "outline";
    }
}


export default function DealsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Sales CRM - Deals</h1>
            <p className="text-muted-foreground">Manage your sales pipeline and track business onboarding.</p>
        </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">52</div>
                <p className="text-xs text-muted-foreground">+15 this week</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Deals</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">125</div>
                <p className="text-xs text-muted-foreground">₹2,50,000 in pipeline</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">25%</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Closed Won (This Month)</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹85,000</div>
                <p className="text-xs text-muted-foreground">12 new businesses</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>Sales Pipeline</CardTitle>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Lead
                 </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search deals..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by Stage" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Stages</SelectItem>
                            <SelectItem value="lead">Lead</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="proposal">Proposal</SelectItem>
                            <SelectItem value="won">Won</SelectItem>
                            <SelectItem value="lost">Lost</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business / Contact</TableHead>
                <TableHead className="hidden md:table-cell">Stage</TableHead>
                <TableHead className="hidden lg:table-cell">Value</TableHead>
                <TableHead className="hidden lg:table-cell">Owner</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dealsData.map((deal) => (
                <TableRow key={deal.businessName}>
                  <TableCell>
                      <div className="font-medium">{deal.businessName}</div>
                      <div className="text-sm text-muted-foreground">{deal.contact}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={getStageBadgeVariant(deal.stage)}>{deal.stage}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">₹{deal.value}</TableCell>
                   <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                             <Avatar className="h-7 w-7">
                                <AvatarFallback>{deal.ownerInitials}</AvatarFallback>
                            </Avatar>
                            <span>{deal.owner}</span>
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
                        <DropdownMenuItem>View Deal</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Change Stage</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete
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
