"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, GitMerge } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

type Employee = {
  id: string
  emp_id: string
  name: string
  initials: string | null
  department: string | null
  role: string | null
  status: string | null
  email: string | null
  manager: string | null
  employment_type: string | null
  join_date: string | null
}

function getStatusVariant(status: string | null) {
  if (status === "Active") return "secondary"
  if (status === "On Leave") return "outline"
  if (status === "Terminated") return "destructive"
  return "default"
}

export default function TeamDirectoryPage() {
  const [employees, setEmployees] = React.useState<Employee[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [dept, setDept] = React.useState("all")

  React.useEffect(() => {
    const supabase = createClient()
    ;(supabase as any)
      .from("erp_employees")
      .select("id, emp_id, name, initials, department, role, status, email, manager, employment_type, join_date")
      .order("emp_id", { ascending: true })
      .then(({ data }: { data: Employee[] | null }) => {
        setEmployees(data ?? [])
        setLoading(false)
      })
  }, [])

  const filtered = employees.filter(e => {
    const matchSearch = !search ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      (e.role ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (e.department ?? "").toLowerCase().includes(search.toLowerCase())
    const matchDept = dept === "all" || (e.department ?? "").toLowerCase() === dept.toLowerCase()
    return matchSearch && matchDept
  })

  const departments = [...new Set(employees.map(e => e.department).filter(Boolean))] as string[]

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
                <Button variant="outline"><GitMerge className="mr-2 h-4 w-4" />View Org Chart</Button>
              </Link>
              <Link href="/admin/erp/hr/team/create">
                <Button><PlusCircle className="mr-2 h-4 w-4" />Add Employee</Button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, role, or department..."
                className="pl-10"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <Select value={dept} onValueChange={setDept}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(d => (
                  <SelectItem key={d} value={d.toLowerCase()}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[200px]">Employee</TableHead>
                  <TableHead className="hidden md:table-cell">Role</TableHead>
                  <TableHead className="hidden md:table-cell">Emp ID</TableHead>
                  <TableHead className="hidden lg:table-cell">Manager</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(emp => (
                  <TableRow key={emp.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{emp.initials ?? emp.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{emp.name}</div>
                          <div className="text-sm text-muted-foreground">{emp.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="font-medium">{emp.role}</div>
                      <div className="text-sm text-muted-foreground">{emp.department}</div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm">{emp.emp_id}</TableCell>
                    <TableCell className="hidden lg:table-cell">{emp.manager ?? "—"}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(emp.status)}>{emp.status ?? "Active"}</Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
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
                          <DropdownMenuItem className="text-destructive">Terminate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
