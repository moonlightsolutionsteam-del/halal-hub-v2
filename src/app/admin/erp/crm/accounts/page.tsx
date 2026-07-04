
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  Users,
  Briefcase,
  ArrowUpRight,
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


const accountsData = [
  { 
    name: "The Kebab Shop",
    contact: "Aisha Begum",
    industry: "Food & Beverage",
    status: "Active Customer",
    owner: "Yasar",
    ownerInitials: "YK",
  },
  { 
    name: "Modern Abayas",
    contact: "Fatima Al-Sayed",
    industry: "Fashion",
    status: "Active Customer",
    owner: "Huzaifa",
    ownerInitials: "MH",
  },
  { 
    name: "Heritage Books",
    contact: "Zainab Ibrahim",
    industry: "Retail",
    status: "Prospect",
    owner: "Vinayak",
    ownerInitials: "VK",
  },
  { 
    name: "Global Halal Meats",
    contact: "Omar Abdullah",
    industry: "Meat Supplier",
    status: "Past Customer",
    owner: "Yasar",
    ownerInitials: "YK",
  },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Active Customer": return "secondary";
        case "Past Customer": return "destructive";
        case "Prospect": return "default";
        default: return "outline";
    }
}


export default function AccountsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Accounts</h1>
            <p className="text-muted-foreground">Manage all companies and organizations your team interacts with.</p>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Accounts</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">450</div>
                <p className="text-xs text-muted-foreground">+25 this month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Accounts (Week)</CardTitle>
                <PlusCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+12</div>
                <p className="text-xs text-muted-foreground">From all sources</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Industry</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Food</div>
                <p className="text-xs text-muted-foreground">35% of all accounts</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>All Accounts</CardTitle>
                 <div className="flex gap-2">
                    <Button variant="outline">
                        <File className="mr-2 h-4 w-4" />
                        Import
                    </Button>
                    <Button>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Account
                    </Button>
                 </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search accounts by name or industry..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="active">Active Customer</SelectItem>
                            <SelectItem value="past">Past Customer</SelectItem>
                            <SelectItem value="prospect">Prospect</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Name</TableHead>
                <TableHead className="hidden md:table-cell">Primary Contact</TableHead>
                <TableHead className="hidden lg:table-cell">Industry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accountsData.map((account) => (
                <TableRow key={account.name}>
                  <TableCell>
                      <div className="font-medium">{account.name}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {account.contact}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{account.industry}</TableCell>
                   <TableCell>
                    <Badge variant={getStatusBadgeVariant(account.status)}>{account.status}</Badge>
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
                        <DropdownMenuItem>View Account</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Add Contact</DropdownMenuItem>
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
