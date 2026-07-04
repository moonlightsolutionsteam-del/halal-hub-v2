
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Users,
  Target,
  BarChart,
  UserPlus,
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


const leadsData = [
  { 
    name: "Aisha Begum",
    company: "The Kebab Shop",
    status: "New",
    source: "Website Form",
    owner: "Yasar",
    ownerInitials: "YK",
    lastUpdate: "2 hours ago"
  },
  { 
    name: "Fatima Al-Sayed",
    company: "Modern Abayas",
    status: "Contacted",
    source: "Social Media",
    owner: "Huzaifa",
    ownerInitials: "MH",
    lastUpdate: "1 day ago"
  },
  { 
    name: "Zainab Ibrahim",
    company: "Heritage Books",
    status: "Qualified",
    source: "Referral",
    owner: "Vinayak",
    ownerInitials: "VK",
    lastUpdate: "3 days ago"
  },
  { 
    name: "Omar Abdullah",
    company: "Global Halal Meats",
    status: "Unqualified",
    source: "Cold Call",
    owner: "Yasar",
    ownerInitials: "YK",
    lastUpdate: "5 days ago"
  },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Qualified": return "secondary";
        case "Unqualified": return "destructive";
        case "New":
        case "Contacted":
            return "default";
        default: return "outline";
    }
}


export default function LeadsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Leads</h1>
            <p className="text-muted-foreground">Manage and qualify potential customers for your sales pipeline.</p>
        </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Leads (This Week)</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">52</div>
                <p className="text-xs text-muted-foreground">+15 from last week</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">18%</div>
                <p className="text-xs text-muted-foreground">Lead to Deal conversion</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Lead Source</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Website</div>
                <p className="text-xs text-muted-foreground">45% of all new leads</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unassigned Leads</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Awaiting assignment</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>All Leads</CardTitle>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Lead
                 </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search leads by name, company, or source..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="qualified">Qualified</SelectItem>
                            <SelectItem value="unqualified">Unqualified</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lead</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell">Source</TableHead>
                <TableHead className="hidden lg:table-cell">Owner</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leadsData.map((lead) => (
                <TableRow key={lead.name}>
                  <TableCell>
                      <div className="font-medium">{lead.name}</div>
                      <div className="text-sm text-muted-foreground">{lead.company}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={getStatusBadgeVariant(lead.status)}>{lead.status}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{lead.source}</TableCell>
                   <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                             <Avatar className="h-7 w-7">
                                <AvatarFallback>{lead.ownerInitials}</AvatarFallback>
                            </Avatar>
                            <span>{lead.owner}</span>
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
                        <DropdownMenuItem>View Lead</DropdownMenuItem>
                        <DropdownMenuItem>Convert to Deal</DropdownMenuItem>
                        <DropdownMenuItem>Assign Owner</DropdownMenuItem>
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
