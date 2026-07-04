"use client"

import {
  MoreHorizontal,
  PlusCircle,
  Search,
  ListTodo,
  Clock,
  AlertCircle,
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { DatePicker } from "@/components/ui/datepicker"


const tasksData = [
  { id: "OPS-001", title: "Verify new restaurant 'The Kebab Shop'", project: "Vendor Onboarding", assignee: "Yasar", assigneeInitials: "YK", priority: "High", status: "In Progress", dueDate: "2024-08-01", blockerReason: "" },
  { id: "OPS-002", title: "Follow up with 'Modern Abayas' for documents", project: "Vendor Onboarding", assignee: "Huzaifa", assigneeInitials: "MH", priority: "Medium", status: "To Do", dueDate: "2024-08-02", blockerReason: "" },
  { id: "OPS-003", title: "Resolve support ticket #TKT-123", project: "Support Escalations", assignee: "Vinayak", assigneeInitials: "VK", priority: "High", status: "To Do", dueDate: "2024-08-01", blockerReason: "" },
  { id: "OPS-004", title: "Prepare weekly operations report", project: "Internal Reporting", assignee: "Super Admin", assigneeInitials: "SA", priority: "Low", status: "Done", dueDate: "2024-07-30", blockerReason: "" },
  { id: "OPS-005", title: "Onboard new sales executive", project: "HR Ops", assignee: "Sheikh", assigneeInitials: "SH", priority: "Medium", status: "Blocked", dueDate: "2024-08-05", blockerReason: "Laptop not delivered yet." },
];

const teamMembers = ["Yasar", "Huzaifa", "Vinayak", "Ovais", "Sheikh", "Unassigned"];
const projects = ["Vendor Onboarding", "Support Escalations", "Internal Reporting", "HR Ops"];
const priorities = ["High", "Medium", "Low"];
const statuses = ["To Do", "In Progress", "Blocked", "Done"];

const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
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

export default function OperationsTasksPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Task &amp; Project Management</h1>
                <p className="text-muted-foreground">Manage and track all operational tasks.</p>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Kanban Board</CardTitle>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Create Task
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Create New Task</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
                                     <div className="space-y-2">
                                        <Label htmlFor="task-title">Task Title</Label>
                                        <Input id="task-title" placeholder="e.g., Follow up with new leads" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="task-desc">Description</Label>
                                        <Textarea id="task-desc" placeholder="Add more details about the task..." />
                                    </div>
                                     <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="task-project">Project</Label>
                                            <Select><SelectTrigger id="task-project"><SelectValue placeholder="Select project" /></SelectTrigger><SelectContent>{projects.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent></Select>
                                        </div>
                                         <div className="space-y-2">
                                            <Label htmlFor="task-assignee">Assign To</Label>
                                            <Select><SelectTrigger id="task-assignee"><SelectValue placeholder="Assign" /></SelectTrigger><SelectContent>{teamMembers.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="task-priority">Priority</Label>
                                            <Select><SelectTrigger id="task-priority"><SelectValue placeholder="Set priority" /></SelectTrigger><SelectContent>{priorities.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent></Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="task-status">Status</Label>
                                            <Select><SelectTrigger id="task-status"><SelectValue placeholder="Set status" /></SelectTrigger><SelectContent>{statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Due Date</Label>
                                        <DatePicker />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                    <Button>Save Task</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent className="flex gap-6 overflow-x-auto pb-4">
                    {statuses.map(status => (
                        <KanbanColumn 
                            key={status} 
                            title={status} 
                            tasks={tasksData.filter(t => t.status === status)} 
                        />
                    ))}
                </CardContent>
            </Card>
        </div>
    )
}
