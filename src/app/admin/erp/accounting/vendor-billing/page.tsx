
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  FileText,
  CreditCard,
  DollarSign,
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
    vendorName: "Karim's Restaurant",
    owner: "Ahmed Khan",
    plan: "Premium (Monthly)",
    billingStatus: "Active",
    totalPaid: "₹15,000",
    creditsConsumed: 8500,
    pendingAmount: "₹0",
    lastInvoice: "2024-07-25"
  },
  {
    vendorName: "Al Bake",
    owner: "Fatima Syed",
    plan: "Pro (Yearly)",
    billingStatus: "Active",
    totalPaid: "₹50,000",
    creditsConsumed: 12000,
    pendingAmount: "₹0",
    lastInvoice: "2024-07-15"
  },
  {
    vendorName: "Khan Chacha",
    owner: "Yusuf Ibrahim",
    plan: "Basic (Monthly)",
    billingStatus: "Due",
    totalPaid: "₹5,000",
    creditsConsumed: 3500,
    pendingAmount: "₹1,500",
    lastInvoice: "2024-06-28"
  },
  {
    vendorName: "Suspended Eatery",
    owner: "John Doe",
    plan: "Free",
    billingStatus: "Blocked",
    totalPaid: "₹0",
    creditsConsumed: 0,
    pendingAmount: "₹0",
    lastInvoice: "N/A"
  },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Active": return "secondary";
        case "Due": return "default";
        case "Blocked": return "destructive";
        default: return "outline";
    }
}


export default function VendorBillingPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Vendor Billing</h1>
            <p className="text-muted-foreground">Track and manage billing profiles for all vendors.</p>
        </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Paid Vendors</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">150</div>
                <p className="text-xs text-muted-foreground">+15 this month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹1,25,231</div>
                <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Outstanding Dues</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">₹1,500</div>
                <p className="text-xs text-muted-foreground">From 1 vendor</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Blocked Accounts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">1</div>
                <p className="text-xs text-muted-foreground">Due to non-payment</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>All Vendors</CardTitle>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Invoice
                 </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search vendors..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="due">Due</SelectItem>
                            <SelectItem value="blocked">Blocked</SelectItem>
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
                <TableHead className="hidden md:table-cell">Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Pending Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendorsData.map((vendor) => (
                <TableRow key={vendor.vendorName}>
                  <TableCell>
                      <div className="font-medium">{vendor.vendorName}</div>
                      <div className="text-sm text-muted-foreground">{vendor.owner}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{vendor.plan}</Badge>
                  </TableCell>
                   <TableCell>
                    <Badge variant={getStatusBadgeVariant(vendor.billingStatus)}>{vendor.billingStatus}</Badge>
                   </TableCell>
                  <TableCell className="hidden lg:table-cell font-semibold">{vendor.pendingAmount}</TableCell>
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
                        <DropdownMenuItem>View Billing Profile</DropdownMenuItem>
                        <DropdownMenuItem>Send Payment Reminder</DropdownMenuItem>
                        <DropdownMenuItem>Generate Invoice</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Block Account
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
  );
}
