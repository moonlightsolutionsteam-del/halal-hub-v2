
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  FileText,
  Calendar,
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
import { DatePickerWithRange } from "@/components/ui/date-range-picker"


const auditLogsData = [
  { 
    admin: "Yasar Khan", 
    adminInitials: "YK", 
    action: "Payout Approval", 
    target: "payout:PAY-001", 
    details: "Approved payout of ₹12,500 to Karim's Restaurant.",
    timestamp: "2024-07-31 11:00 AM"
  },
  { 
    admin: "Super Admin", 
    adminInitials: "SA", 
    action: "Credit Edit", 
    target: "wallet:biz-002", 
    details: "Balance changed from 3500 to 3000. Reason: Good will gesture for service delay.",
    timestamp: "2024-07-30 09:45 AM"
  },
  { 
    admin: "MOHAMMED HUZAIFA", 
    adminInitials: "MH", 
    action: "Invoice Voided", 
    target: "invoice:INV-002", 
    details: "Reason: Incorrect billing items.",
    timestamp: "2024-07-29 03:20 PM"
  },
   { 
    admin: "Vinayak kainthla", 
    adminInitials: "VK", 
    action: "Manual Override", 
    target: "user:sheikh", 
    details: "Role changed from Consumer to Creator. Reason: User is a known community figure.",
    timestamp: "2024-07-29 11:00 AM"
  },
  { 
    admin: "Yasar Khan", 
    adminInitials: "YK", 
    action: "Refund Processed", 
    target: "txn:TRX-005", 
    details: "Refund of ₹2,999 processed for failed subscription.",
    timestamp: "2024-07-28 10:15 AM"
  },
];


export default function SuperAdminAuditLogsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Financial Audit Logs</h1>
            <p className="text-muted-foreground">Trace every financial action, manual override, and approval on the platform.</p>
        </div>

      <Card>
        <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by Admin, Action, or Target..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by Action Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Actions</SelectItem>
                            <SelectItem value="credit">Credit Edit</SelectItem>
                            <SelectItem value="invoice">Invoice Change</SelectItem>
                            <SelectItem value="payout">Payout Approval</SelectItem>
                            <SelectItem value="refund">Refund</SelectItem>
                            <SelectItem value="override">Manual Override</SelectItem>
                        </SelectContent>
                    </Select>
                     <DatePickerWithRange />
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="hidden md:table-cell">Target</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogsData.map((log, index) => (
                <TableRow key={index}>
                    <TableCell className="hidden md:table-cell">{log.timestamp}</TableCell>
                    <TableCell>
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>{log.adminInitials}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium">{log.admin}</div>
                                <div className="text-sm text-muted-foreground md:hidden">{log.timestamp}</div>
                            </div>
                        </div>
                    </TableCell>
                  <TableCell>
                    <div className="font-semibold">{log.action}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell font-mono text-xs">{log.target}</TableCell>
                  <TableCell className="max-w-xs truncate">{log.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
