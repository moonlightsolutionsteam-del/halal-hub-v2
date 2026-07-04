
"use client"

import {
  MoreHorizontal,
  Search,
  FileText,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
    user: "Yasar Khan", 
    userInitials: "YK", 
    action: "Suspended User", 
    target: "user:ovais", 
    details: "Reason: Spamming reviews",
    timestamp: "2024-07-30 10:15 AM"
  },
  { 
    user: "Super Admin", 
    userInitials: "SA", 
    action: "Approved Verification", 
    target: "business:karims-restaurant", 
    details: "All documents verified.",
    timestamp: "2024-07-30 09:45 AM"
  },
  { 
    user: "MOHAMMED HUZAIFA", 
    userInitials: "MH", 
    action: "Deleted Content", 
    target: "review:rev-003", 
    details: "Reason: Inappropriate language",
    timestamp: "2024-07-29 03:20 PM"
  },
   { 
    user: "Vinayak kainthla", 
    userInitials: "VK", 
    action: "Changed Role", 
    target: "user:sheikh", 
    details: "Role changed from Consumer to Creator.",
    timestamp: "2024-07-29 11:00 AM"
  },
];


export default function SuperAdminAuditLogsPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Audit Logs</h1>
            <p className="text-muted-foreground">Track all significant actions taken by admins and privileged users.</p>
        </div>

      <Card>
        <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by user, action, or target..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by Action" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Actions</SelectItem>
                            <SelectItem value="user_management">User Management</SelectItem>
                            <SelectItem value="content_moderation">Content Moderation</SelectItem>
                            <SelectItem value="verification">Verification</SelectItem>
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
                <TableHead>Actor</TableHead>
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
                                <AvatarFallback>{log.userInitials}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium">{log.user}</div>
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
