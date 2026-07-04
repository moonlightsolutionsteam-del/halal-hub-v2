
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  ListTodo,
  Clock,
  AlertCircle,
  CheckCircle2,
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


const tasksData = [
  { 
    task: "Follow-up call with The Kebab Shop",
    relatedTo: "Deal: The Kebab Shop",
    dueDate: "2024-08-01",
    priority: "High",
    status: "To-do",
    owner: "Yasar",
    ownerInitials: "YK",
  },
  { 
    task: "Prepare proposal for Modern Abayas",
    relatedTo: "Deal: Modern Abayas",
    dueDate: "2024-08-02",
    priority: "High",
    status: "In Progress",
    owner: "Vinayak",
    ownerInitials: "VK",
  },
  { 
    task: "Send onboarding email to Global Halal Meats",
    relatedTo: "Account: Global Halal Meats",
    dueDate: "2024-07-29",
    priority: "Medium",
    status: "Completed",
    owner: "Yasar",
    ownerInitials: "YK",
  },
  { 
    task: "Add Zainab Ibrahim to mailing list",
    relatedTo: "Contact: Zainab Ibrahim",
    dueDate: "2024-08-05",
    priority: "Low",
    status: "To-do",
    owner: "Huzaifa",
    ownerInitials: "MH",
  },
];

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Completed": return "secondary";
        case "In Progress": return "default";
        default: return "outline";
    }
}

const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
        case "High": return "destructive";
        case "Medium": return "default";
        default: return "secondary";
    }
}


export default function TasksPage() {
  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Tasks</h1>
            <p className="text-muted-foreground">Track and manage all activities for your sales team.</p>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                <ListTodo className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">150</div>
                <p className="text-xs text-muted-foreground">+20 this week</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">3 new today</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-destructive">8</div>
                <p className="text-xs text-muted-foreground">Require immediate action</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completed (This Week)</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">+10% from last week</p>
            </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                 <CardTitle>All Tasks</CardTitle>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Task
                 </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search tasks..." className="pl-10" />
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="to-do">To-do</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead className="hidden md:table-cell">Priority</TableHead>
                <TableHead className="hidden lg:table-cell">Due Date</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasksData.map((task, index) => (
                <TableRow key={index}>
                  <TableCell>
                      <div className="font-medium">{task.task}</div>
                      <div className="text-sm text-muted-foreground">{task.relatedTo}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={getPriorityBadgeVariant(task.priority)}>{task.priority}</Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{task.dueDate}</TableCell>
                   <TableCell className="hidden md:table-cell">
                    <Badge variant={getStatusBadgeVariant(task.status)}>{task.status}</Badge>
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
                        <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                        <DropdownMenuItem>Assign</DropdownMenuItem>
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
