
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  DollarSign,
  ArrowUpCircle,
  Receipt,
  Clock,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"


const expensesData = [
  { 
    id: "EXP-001",
    category: "Salaries",
    vendor: "Internal",
    amount: "₹1,50,000",
    date: "2024-07-31",
    status: "Paid"
  },
  { 
    id: "EXP-002",
    category: "Hosting (GCP)",
    vendor: "Google Cloud",
    amount: "₹25,000",
    date: "2024-07-28",
    status: "Paid"
  },
  { 
    id: "EXP-003",
    category: "Marketing",
    vendor: "Google Ads",
    amount: "₹10,000",
    date: "2024-07-25",
    status: "Paid"
  },
    { 
    id: "EXP-004",
    category: "Tools & Software",
    vendor: "Figma",
    amount: "₹5,000",
    date: "2024-08-01",
    status: "Pending Approval"
  },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Paid": return "secondary";
        case "Pending Approval": return "default";
        case "Rejected": return "destructive";
        default: return "outline";
    }
}

export default function ExpensesPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Expense Management</h1>
            <p className="text-muted-foreground">Track and manage all company expenses.</p>
        </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Expenses (Month)</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹1,85,000</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Top Category</CardTitle>
                <ArrowUpCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">Salaries</div>
                <p className="text-xs text-muted-foreground">81% of total expenses</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">Requires review</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bills &amp; Receipts</CardTitle>
                <Receipt className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">3 Uploaded</div>
                <p className="text-xs text-muted-foreground">1 missing receipt</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>All Expenses</CardTitle>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Expense
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Log New Expense</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                             <div className="space-y-2">
                                <Label htmlFor="exp-category">Category</Label>
                                <Select>
                                    <SelectTrigger id="exp-category">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="hosting">Hosting (Firebase/GCP)</SelectItem>
                                        <SelectItem value="marketing">Marketing</SelectItem>
                                        <SelectItem value="salaries">Salaries</SelectItem>
                                        <SelectItem value="legal">Legal &amp; Compliance</SelectItem>
                                        <SelectItem value="tools">Tools &amp; Software</SelectItem>
                                        <SelectItem value="travel">Travel &amp; Events</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="exp-vendor">Vendor</Label>
                                <Input id="exp-vendor" placeholder="e.g., AWS, Local Vendor" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="exp-amount">Amount (₹)</Label>
                                <Input id="exp-amount" type="number" placeholder="e.g., 15000" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="exp-date">Date</Label>
                                <Input id="exp-date" type="date" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="exp-receipt">Receipt (Optional)</Label>
                                <Input id="exp-receipt" type="file" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline">Cancel</Button>
                            <Button>Save Expense</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search expenses..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            <SelectItem value="salaries">Salaries</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="server">Server Costs</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expensesData.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.category}</TableCell>
                  <TableCell>{expense.vendor}</TableCell>
                  <TableCell>{expense.date}</TableCell>
                   <TableCell>
                    <Badge variant={getStatusBadgeVariant(expense.status)}>{expense.status}</Badge>
                   </TableCell>
                  <TableCell className="text-right font-semibold">{expense.amount}</TableCell>
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
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Approve</DropdownMenuItem>
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
