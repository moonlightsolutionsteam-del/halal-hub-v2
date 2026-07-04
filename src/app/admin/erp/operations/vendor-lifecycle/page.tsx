
"use client"

import {
  MoreHorizontal,
  Search,
  Users,
  Briefcase,
  UserPlus,
  UserX,
  TrendingDown,
  RefreshCcw,
  AlertTriangle,
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


const vendorsData = [
  { 
    vendor: "Karim's Restaurant",
    contact: "Ahmed Khan",
    stage: "Active",
    onboarded: "2023-01-15",
    health: "Good"
  },
  { 
    vendor: "Al Bake",
    contact: "Fatima Syed",
    stage: "Onboarding",
    onboarded: "2024-07-25",
    health: "N/A"
  },
  { 
    vendor: "Khan Chacha",
    contact: "Yusuf Ibrahim",
    stage: "Churned",
    onboarded: "2023-05-10",
    health: "Poor"
  },
  { 
    vendor: "Sultan's Dine",
    contact: "Aisha Begum",
    stage: "Off-boarding",
    onboarded: "2023-03-20",
    health: "At Risk"
  },
  { 
    vendor: "Delhi Darbar",
    contact: "Omar Abdullah",
    stage: "Active",
    onboarded: "2023-02-18",
    health: "Good"
  },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Active": return "secondary";
        case "Churned":
        case "At Risk":
             return "destructive";
        case "Onboarding": return "default";
        case "Off-boarding": return "outline";
        default: return "outline";
    }
}


export default function VendorLifecyclePage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Vendor Lifecycle Management</h1>
            <p className="text-muted-foreground">Manage all stages of the vendor lifecycle from onboarding to offboarding.</p>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Active Vendors</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1,250</div>
                <p className="text-xs text-muted-foreground">+25 this month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Vendors (Onboarding)</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">In the pipeline</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">At Risk Vendors</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-yellow-600">12</div>
                <p className="text-xs text-muted-foreground">Low engagement or pending dues</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Churn Rate (Q3)</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">2.5%</div>
                <p className="text-xs text-muted-foreground">vs 3.1% in Q2</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>Vendor Directory</CardTitle>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search vendors..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by Stage" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Stages</SelectItem>
                            <SelectItem value="onboarding">Onboarding</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="offboarding">Off-boarding</SelectItem>
                            <SelectItem value="churned">Churned</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="hidden md:table-cell">Stage</TableHead>
                <TableHead className="hidden lg:table-cell">Health</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendorsData.map((vendor, index) => (
                <TableRow key={index}>
                  <TableCell>
                      <div className="font-medium">{vendor.vendor}</div>
                  </TableCell>
                  <TableCell>
                    {vendor.contact}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={getStatusBadgeVariant(vendor.stage)}>{vendor.stage}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                     <Badge variant={getStatusBadgeVariant(vendor.health)}>{vendor.health}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
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
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Change Stage</DropdownMenuItem>
                        <DropdownMenuItem>View Activity Log</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Initiate Off-boarding</DropdownMenuItem>
                        <DropdownMenuItem>Re-engage</DropdownMenuItem>
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
    
