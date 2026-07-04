
"use client"

import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  Search,
  Building,
  ShieldCheck,
  Clock,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const organizationsData = [
  { name: "Mercy Foundation", category: "Charity", location: "Mumbai", status: "Verified", plan: "Free" },
  { name: "Al-Hidayah Trust", category: "Education", location: "Delhi", status: "Verified", plan: "Free" },
  { name: "Unity Community Group", category: "Community", location: "Bangalore", status: "Pending", plan: "Free" },
  { name: "Dawah Vision", category: "Dawah", location: "Hyderabad", status: "Verified", plan: "Free" },
];


export default function SuperAdminOrganizationsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Organization Listings</h1>
            <p className="text-muted-foreground">View, manage, and verify all organizations on the platform.</p>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Organizations</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1,250</div>
                <p className="text-xs text-muted-foreground">+12 this month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New This Month</CardTitle>
                <UserPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">Awaiting documents</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Ready for review</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by name, category, or location..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="charity">Charity</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="community">Community</SelectItem>
                            <SelectItem value="dawah">Dawah</SelectItem>
                        </SelectContent>
                    </Select>
                     <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="verified">Verified</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Organization Name</TableHead>
                <TableHead className="hidden md:table-cell">Category</TableHead>
                <TableHead className="hidden lg:table-cell">Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizationsData.map((org) => (
                <TableRow key={org.name}>
                  <TableCell className="font-medium">{org.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{org.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{org.location}</TableCell>
                   <TableCell>
                    <Badge variant={org.status === "Verified" ? "secondary" : "default"}>{org.status}</Badge>
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
                        <DropdownMenuItem>Verify</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Suspend
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
