
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  File,
  GitMerge,
  Download,
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
import Link from "next/link";


const employeesData = [
  { id: "EMP001", name: "Yasar Khan", initials: "YK", department: "Sales", role: "Sales Executive", status: "Active", email: "yasar.k@example.com", manager: "Vinayak kainthla", employmentType: "Full-time", joinDate: "2023-01-15" },
  { id: "EMP002", name: "MOHAMMED HUZAIFA", initials: "MH", department: "Sales", role: "Sales Executive", status: "Active", email: "huzaifa.m@example.com", manager: "Vinayak kainthla", employmentType: "Full-time", joinDate: "2023-02-01" },
  { id: "EMP003", name: "Vinayak kainthla", initials: "VK", department: "Sales", role: "Sales Head", status: "Active", email: "vinayak.k@example.com", manager: "Super Admin", employmentType: "Full-time", joinDate: "2022-11-10" },
  { id: "EMP004", name: "Ovais", initials: "OV", department: "Engineering", role: "Lead Developer", status: "Active", email: "ovais@example.com", manager: "Super Admin", employmentType: "Full-time", joinDate: "2022-09-01" },
  { id: "EMP005", name: "Sheikh", initials: "SH", department: "Marketing", role: "Content Creator", status: "On Leave", email: "sheikh.s@example.com", manager: "Vinayak kainthla", employmentType: "Intern", joinDate: "2024-06-01" },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Active": return "secondary";
        case "On Leave": return "outline";
        case "Terminated": return "destructive";
        default: return "default";
    }
}


export default function TeamDirectoryPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Team Directory</h1>
            <p className="text-muted-foreground">Manage all employee profiles and roles.</p>
        </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>All Employees</CardTitle>
                 <div className="flex gap-2">
                    <Link href="/admin/erp/hr/team/org-chart">
                        <Button variant="outline">
                            <GitMerge className="mr-2 h-4 w-4" />
                            View Org Chart
                        </Button>
                    </Link>
                    <Button asChild>
                        <Link href="/admin/erp/hr/team/create">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Employee
                        </Link>
                    </Button>
                 </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by name, role, or department..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by Department" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Departments</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Employee</TableHead>
                <TableHead className="hidden md:table-cell">Role</TableHead>
                <TableHead className="hidden lg:table-cell">Manager</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeesData.map((employee) => (
                <TableRow key={employee.email}>
                  <TableCell>
                      <div className="flex items-center gap-3">
                         <Avatar>
                            <AvatarFallback>{employee.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">{employee.email}</div>
                        </div>
                      </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="font-medium">{employee.role}</div>
                    <div className="text-sm text-muted-foreground">{employee.department}</div>
                  </TableCell>
                   <TableCell className="hidden lg:table-cell">{employee.manager}</TableCell>
                   <TableCell>
                    <Badge variant={getStatusBadgeVariant(employee.status)}>{employee.status}</Badge>
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
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Performance</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Terminate
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
    
