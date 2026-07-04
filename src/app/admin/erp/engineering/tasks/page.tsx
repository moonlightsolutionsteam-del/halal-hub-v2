
"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  ListTodo,
  Clock,
  AlertTriangle,
  CheckCircle2,
  FileText,
  User,
  Flag,
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
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { cn } from "@/lib/utils"

const tasksData = [
  { id: "TASK-001", title: "Fix login button CSS on mobile", feature: "FEAT-006", assignee: "Ovais", assigneeInitials: "OV", priority: "High", status: "In Progress", dueDate: "2024-08-05", estimatedTime: "4h", blockerReason: "" },
  { id: "TASK-002", title: "Implement new creator profile UI", feature: "FEAT-007", assignee: "Ovais", assigneeInitials: "OV", priority: "High", status: "To Do", dueDate: "2024-08-10", estimatedTime: "3d", blockerReason: "" },
  { id: "TASK-003", title: "Add indexing to Firestore 'users' collection", feature: "FEAT-005", assignee: "Unassigned", assigneeInitials: "?", priority: "Medium", status: "To Do", dueDate: "2024-08-12", estimatedTime: "1d", blockerReason: "" },
  { id: "TASK-004", title: "Write unit tests for payment module", feature: "FEAT-004", assignee: "Sheikh", assigneeInitials: "SH", priority: "Low", status: "QA", dueDate: "2024-08-08", estimatedTime: "5d", blockerReason: "" },
  { id: "TASK-005", title: "Deploy security patch v2.1.4", feature: "FEAT-003", assignee: "Super Admin", assigneeInitials: "SA", priority: "Critical", status: "Done", dueDate: "2024-07-30", estimatedTime: "2h", blockerReason: "" },
  { id: "TASK-006", title: "API integration for social login", feature: "FEAT-006", assignee: "Vinayak", assigneeInitials: "VK", priority: "High", status: "Blocked", dueDate: "2024-08-06", estimatedTime: "2d", blockerReason: "Awaiting API keys from third-party" },
];

const teamMembers = ["Ovais", "Sheikh", "Vinayak", "Yasar", "Huzaifa", "Unassigned"];

const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
        case "Critical": return "destructive";
        case "High": return "destructive";
        case "Medium": return "default";
        case "Low": return "secondary";
        default: return "outline";
    }
}

const KanbanTaskCard = ({ task }: { task: typeof tasksData[0] }) => {
    return (
        <Card className="bg-background">
            <CardContent className="p-3 space-y-2">
                <p className="font-semibold text-sm leading-tight">{task.title}</p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                         <Badge variant={getPriorityBadgeVariant(task.priority)}>{task.priority}</Badge>
                         <span className="text-xs text-muted-foreground">{task.id}</span>
                    </div>
                     <Avatar className="h-6 w-6">
                        <AvatarFallback>{task.assigneeInitials}</AvatarFallback>
                    </Avatar>
                </div>
                 {task.status === "Blocked" && <p className="text-xs text-destructive truncate">Reason: {task.blockerReason}</p>}
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{task.dueDate}</span>
                </div>
            </CardContent>
        </Card>
    );
}

const KanbanColumn = ({ title, tasks }: { title: string, tasks: typeof tasksData }) => {
    return (
        <div className="w-72 flex-shrink-0">
            <Card className="bg-secondary/50">
                <CardHeader className="p-3">
                    <CardTitle className="text-base">{title} ({tasks.length})</CardTitle>
                </CardHeader>
                <CardContent className="p-3 space-y-3 h-[60vh] overflow-y-auto">
                    {tasks.map(task => (
                        <KanbanTaskCard key={task.id} task={task} />
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}

export default function TechTasksPage() {
    const statuses = ["To Do", "In Progress", "Blocked", "QA", "Done"];

  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold font-headline">Technical Tasks</h1>
            <p className="text-muted-foreground">Plan and track engineering work items.</p>
        </div>

        <Card>
            <CardHeader>
                 <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search tasks by title or ID..." className="pl-10" />
                    </div>
                    <div className="flex gap-2">
                        <Select>
                            <SelectTrigger className="w-full sm:w-[180px]">
                                <SelectValue placeholder="Filter by Assignee" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Assignees</SelectItem>
                                {teamMembers.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                            </SelectContent>
                        </Select>
                         <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create Task
                        </Button>
                    </div>
                </div>
            </CardHeader>
        </Card>

        <div className="flex gap-6 overflow-x-auto pb-4">
            {statuses.map(status => (
                 <KanbanColumn 
                    key={status} 
                    title={status} 
                    tasks={tasksData.filter(t => t.status === status)} 
                />
            ))}
        </div>
    </div>
  )
}
