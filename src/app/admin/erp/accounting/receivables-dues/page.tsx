
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  DollarSign,
  AlertTriangle,
  Clock,
  ThumbsDown,
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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"


const receivablesData = [
  { 
    vendor: "Khan Chacha",
    owner: "Yusuf Ibrahim",
    dueAmount: "₹1,500",
    daysOverdue: 15,
    status: "Reminder Sent",
    lastContact: "3 days ago"
  },
  { 
    vendor: "Downtown Cafe",
    owner: "Aarav Sharma",
    dueAmount: "₹5,000",
    daysOverdue: 45,
    status: "Payment Plan",
    lastContact: "1 day ago"
  },
  { 
    name: "Burger Singh",
    owner: "Kabir Singh",
    dueAmount: "₹800",
    daysOverdue: 92,
    status: "Unresponsive",
    lastContact: "1 month ago"
  },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Payment Plan": return "secondary";
        case "Unresponsive": return "destructive";
        case "Reminder Sent": return "default";
        default: return "outline";
    }
}

export default function ReceivablesDuesPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Receivables & Dues</h1>
            <p className="text-muted-foreground">Monitor and manage outstanding payments from vendors.</p>
        </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Amount Due</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">₹22,500</div>
                <p className="text-xs text-muted-foreground">Across 8 vendors</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue ({'>'} 30 days)</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-yellow-600">₹5,800</div>
                <p className="text-xs text-muted-foreground">From 2 vendors</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bad Debt Risk ({'>'} 90 days)</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">₹800</div>
                <p className="text-xs text-muted-foreground">From 1 vendor</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reminders Sent Today</CardTitle>
                <PlusCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">Automatic and manual</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>Overdue Vendors</CardTitle>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search vendors..." className="pl-10" />
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Days Overdue</TableHead>
                <TableHead>Amount Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receivablesData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                      <div className="font-medium">{item.vendor}</div>
                      <div className="text-sm text-muted-foreground">{item.owner}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.daysOverdue > 30 ? "destructive" : "default"}>{item.daysOverdue} days</Badge>
                  </TableCell>
                  <TableCell className="font-semibold">{item.dueAmount}</TableCell>
                   <TableCell>
                    <Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge>
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
                        <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        <DropdownMenuItem>Negotiate Settlement</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Freeze Features</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Mark as Bad Debt
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

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Aging Report</CardTitle>
                <CardDescription>A breakdown of receivables by aging buckets.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Bucket</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>No. of Vendors</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>0-30 Days</TableCell>
                            <TableCell>₹12,500</TableCell>
                            <TableCell>5</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>31-60 Days</TableCell>
                            <TableCell>₹5,000</TableCell>
                            <TableCell>1</TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>61-90 Days</TableCell>
                            <TableCell>₹0</TableCell>
                            <TableCell>0</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-semibold text-destructive">90+ Days</TableCell>
                            <TableCell className="font-semibold text-destructive">₹800</TableCell>
                            <TableCell className="font-semibold text-destructive">1</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Automation Rules</CardTitle>
                <CardDescription>Configure automatic reminders and actions for overdue payments.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label htmlFor="auto-reminders" className="font-semibold">Automated Reminders</Label>
                        <p className="text-sm text-muted-foreground">Send reminders at 15, 30, and 60 days overdue.</p>
                    </div>
                    <Switch id="auto-reminders" defaultChecked />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                        <Label htmlFor="auto-block" className="font-semibold">Credit Blocking</Label>
                        <p className="text-sm text-muted-foreground">Automatically freeze credit usage after 60 days.</p>
                    </div>
                    <Switch id="auto-block" defaultChecked />
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
