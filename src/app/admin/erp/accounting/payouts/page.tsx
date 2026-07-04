
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  DollarSign,
  Banknote,
  Clock,
  CheckCircle2,
  Download,
  AlertTriangle,
  UserCheck,
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


const payoutsData = [
  { 
    id: "PAY-001",
    payee: "Karim's Restaurant",
    type: "Vendor",
    amount: "₹12,500",
    date: "2024-08-05",
    method: "Bank Transfer",
    status: "Pending"
  },
  { 
    id: "PAY-002",
    payee: "Al-Naseeb Meats",
    type: "Vendor",
    amount: "₹8,500",
    date: "2024-08-05",
    method: "UPI",
    status: "Pending"
  },
  { 
    id: "PAY-003",
    payee: "Aisha's Kitchen",
    type: "Creator",
    amount: "₹5,000",
    date: "2024-07-28",
    method: "Bank Transfer",
    status: "Processed"
  },
  { 
    id: "PAY-004",
    payee: "Sultan's Dine",
    type: "Vendor",
    amount: "₹22,000",
    date: "2024-07-25",
    method: "Bank Transfer",
    status: "Failed"
  },
    { 
    id: "PAY-005",
    payee: "Jamiat Trust",
    type: "Certification Body",
    amount: "₹18,000",
    date: "2024-08-02",
    method: "Bank Transfer",
    status: "Pending"
  },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Processed": return "secondary";
        case "Pending": return "default";
        case "Failed": return "destructive";
        default: return "outline";
    }
}

export default function PayoutsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Payouts Management</h1>
            <p className="text-muted-foreground">Manage and process payouts to vendors and creators.</p>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pending Payouts</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹38,500</div>
                <p className="text-xs text-muted-foreground">Across 3 payouts</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Paid Out (Month)</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹78,450</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Payout Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">24 Hours</div>
                <p className="text-xs text-muted-foreground">For processed requests</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Failed Payouts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">1</div>
                <p className="text-xs text-muted-foreground">Action required</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>All Payouts</CardTitle>
                 <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Report
                 </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by payee or payout ID..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processed">Processed</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payee</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead className="hidden lg:table-cell">Date</TableHead>
                <TableHead className="hidden lg:table-cell">Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payoutsData.map((payout) => (
                <TableRow key={payout.id}>
                  <TableCell>
                      <div className="font-medium">{payout.payee}</div>
                      <div className="text-sm text-muted-foreground">{payout.id}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">{payout.type}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{payout.date}</TableCell>
                  <TableCell className="hidden lg:table-cell">{payout.method}</TableCell>
                   <TableCell>
                    <Badge variant={getStatusBadgeVariant(payout.status)}>{payout.status}</Badge>
                   </TableCell>
                  <TableCell className="text-right font-semibold">{payout.amount}</TableCell>
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>View Payee Profile</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><UserCheck className="mr-2 h-4 w-4"/>Approve Payout</DropdownMenuItem>
                        <DropdownMenuItem><CheckCircle2 className="mr-2 h-4 w-4"/>Mark as Paid</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Reject Payout
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
