
"use client"

import { useState } from "react"
import {
  MoreHorizontal,
  PlusCircle,
  Search,
  ListTodo,
  Rocket,
  Flag,
  FileText,
  TrendingUp,
  DollarSign,
  Heart,
  Gauge,
  User,
  Link as LinkIcon,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link";
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const featuresData = [
  {
    id: "FEAT-007",
    title: "Family Tree Module",
    module: "Family",
    priority: "High",
    status: "Backlog",
    impact: ["UX", "Engagement"],
    owner: "Ovais",
    spec: "https://figma.com/...",
  },
  {
    id: "FEAT-008",
    title: "Social Feed Algorithm",
    module: "Feed",
    priority: "High",
    status: "In Dev",
    impact: ["Performance", "Engagement"],
    owner: "Ovais",
    spec: "https://figma.com/...",
  },
  {
    id: "FEAT-009",
    title: "Gamification & Badges",
    module: "Rewards",
    priority: "Medium",
    status: "In QA",
    impact: ["Engagement", "Retention"],
    owner: "Sheikh",
    spec: "https://figma.com/...",
  },
  {
    id: "FEAT-010",
    title: "Business Analytics Dashboard",
    module: "Business",
    priority: "Medium",
    status: "Done",
    impact: ["Revenue", "Retention"],
    owner: "Vinayak",
    spec: "https://figma.com/...",
  },
  {
    id: "FEAT-011",
    title: "Advanced Search Filters",
    module: "Search",
    priority: "Low",
    status: "Parked",
    impact: ["UX"],
    owner: "Unassigned",
    spec: "",
  },
];

const kpiData = [
    { title: "Features in Backlog", value: "85", icon: <ListTodo /> },
    { title: "In Development", value: "12", icon: <Rocket /> },
    { title: "Ready for QA", value: "5", icon: <Flag /> },
    { title: "Completed (Q3)", value: "18", icon: <CheckCircle2 /> },
];

const impactTypes = ["Revenue", "Trust", "Performance", "UX", "Engagement", "Retention"];
const priorityLevels = ["Critical", "High", "Medium", "Low"];
const statusLevels = ["Idea", "Approved", "In Dev", "In QA", "Ready", "Done", "Parked"];
const modules = ["Restaurants", "Events", "ERP", "Rewards", "Family", "Feed", "Search", "Business"];
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

const getStatusBadgeVariant = (status: string) => {
    switch (status) {
        case "Done": return "secondary";
        case "In Dev":
        case "In QA":
            return "default";
        case "Parked":
        case "Idea":
             return "outline";
        default: return "outline";
    }
}

const getImpactBadgeVariant = (impact: string) => {
    switch(impact) {
        case "Revenue": return "bg-green-100 text-green-800";
        case "Trust": return "bg-blue-100 text-blue-800";
        case "Performance": return "bg-purple-100 text-purple-800";
        case "UX": return "bg-pink-100 text-pink-800";
        default: return "secondary";
    }
}

const FeatureDialog = ({ open, onOpenChange, feature }: { open: boolean, onOpenChange: (open: boolean) => void, feature: typeof featuresData[0] | null }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{feature ? 'Edit Feature' : 'Create New Feature'}</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4 max-h-[70vh] overflow-y-auto pr-4">
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="feat-title">Feature Title</Label>
                            <Input id="feat-title" placeholder="e.g., Family Tree Module" defaultValue={feature?.title} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="feat-module">Module</Label>
                            <Select defaultValue={feature?.module}><SelectTrigger id="feat-module"><SelectValue placeholder="Select module" /></SelectTrigger><SelectContent>{modules.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="feat-desc">Description</Label>
                        <Textarea id="feat-desc" placeholder="Describe the feature and its purpose..." defaultValue={feature?.title}/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="feat-priority">Priority</Label>
                            <Select defaultValue={feature?.priority}><SelectTrigger id="feat-priority"><SelectValue placeholder="Set priority" /></SelectTrigger><SelectContent>{priorityLevels.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent></Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="feat-status">Status</Label>
                            <Select defaultValue={feature?.status}><SelectTrigger id="feat-status"><SelectValue placeholder="Set status" /></SelectTrigger><SelectContent>{statusLevels.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label>Business Impact</Label>
                        <div className="grid grid-cols-3 gap-2 p-4 border rounded-md">
                            {impactTypes.map(item => (
                                <div key={item} className="flex items-center gap-2">
                                    <Checkbox id={`impact-${item}`} defaultChecked={feature?.impact.includes(item)}/>
                                    <Label htmlFor={`impact-${item}`} className="text-sm font-normal">{item}</Label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="feat-owner">Assigned To</Label>
                            <Select defaultValue={feature?.owner}><SelectTrigger id="feat-owner"><SelectValue placeholder="Assign owner" /></SelectTrigger><SelectContent>{teamMembers.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="feat-spec">Spec / Wireframe Link</Label>
                            <Input id="feat-spec" placeholder="https://figma.com/..." defaultValue={feature?.spec}/>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button>Save Feature</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function ProductDevelopmentPage() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedFeature, setSelectedFeature] = useState<typeof featuresData[0] | null>(null);

    const handleEditFeature = (feature: typeof featuresData[0]) => {
        setSelectedFeature(feature);
        setIsDialogOpen(true);
    }
    
    const handleCreateFeature = () => {
        setSelectedFeature(null);
        setIsDialogOpen(true);
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold font-headline">Product Development</h1>
                <p className="text-muted-foreground">Manage product roadmaps, feature backlogs, and development sprints.</p>
            </div>
            
            <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
                {kpiData.map((item) => (
                    <Card key={item.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                            <div className="text-muted-foreground">{item.icon}</div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{item.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="backlog">
                <TabsList>
                    <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
                    <TabsTrigger value="backlog">Backlog</TabsTrigger>
                    <TabsTrigger value="sprint">Current Sprint</TabsTrigger>
                </TabsList>
                <TabsContent value="backlog" className="mt-4">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Feature Backlog</CardTitle>
                                <Button onClick={handleCreateFeature}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    New Feature
                                </Button>
                            </div>
                             <div className="flex flex-col sm:flex-row gap-4 mt-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input placeholder="Search features..." className="pl-10" />
                                </div>
                                <div className="flex gap-2">
                                    <Select><SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Filter by Module" /></SelectTrigger><SelectContent>{modules.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select>
                                    <Select><SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Filter by Status" /></SelectTrigger><SelectContent>{statusLevels.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select>
                                    <Select><SelectTrigger className="w-full sm:w-[150px]"><SelectValue placeholder="Filter by Priority" /></SelectTrigger><SelectContent>{priorityLevels.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent></Select>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                <TableRow>
                                    <TableHead>Feature</TableHead>
                                    <TableHead className="hidden md:table-cell">Module</TableHead>
                                    <TableHead>Priority</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="hidden lg:table-cell">Impact</TableHead>
                                    <TableHead className="hidden lg:table-cell">Owner</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                                </TableHeader>
                                <TableBody>
                                {featuresData.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <div className="font-medium">{item.title}</div>
                                            <div className="text-xs text-muted-foreground">{item.id}</div>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">{item.module}</TableCell>
                                        <TableCell><Badge variant={getPriorityBadgeVariant(item.priority)}>{item.priority}</Badge></TableCell>
                                        <TableCell><Badge variant={getStatusBadgeVariant(item.status)}>{item.status}</Badge></TableCell>
                                        <TableCell className="hidden lg:table-cell">
                                            <div className="flex gap-1 flex-wrap">
                                                {item.impact.map(i => <Badge key={i} variant="outline" className={getImpactBadgeVariant(i)}>{i}</Badge>)}
                                            </div>
                                        </TableCell>
                                        <TableCell className="hidden lg:table-cell">{item.owner}</TableCell>
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
                                                <DropdownMenuItem onClick={() => handleEditFeature(item)}>Edit</DropdownMenuItem>
                                                {item.spec && <DropdownMenuItem asChild><Link href={item.spec} target="_blank">View Spec</Link></DropdownMenuItem>}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="roadmap" className="mt-4">
                     <Card>
                        <CardHeader>
                            <CardTitle>Product Roadmap</CardTitle>
                            <CardDescription>High-level goals organized by quarter.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                            {['Q3 2024', 'Q4 2024', 'Q1 2025', 'Q2 2025'].map(quarter => (
                                <Card key={quarter}>
                                    <CardHeader><CardTitle>{quarter}</CardTitle></CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="p-3 bg-secondary rounded-md">
                                            <h4 className="font-semibold text-sm">Launch Family Tree</h4>
                                            <p className="text-xs text-muted-foreground">High Priority</p>
                                        </div>
                                        <div className="p-3 bg-secondary rounded-md">
                                            <h4 className="font-semibold text-sm">Gamification v1</h4>
                                            <p className="text-xs text-muted-foreground">Medium Priority</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="sprint" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Sprint: 24.8.1 (Summer Features)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Progress value={75} />
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                                <Card>
                                    <CardHeader><CardTitle>To Do (5)</CardTitle></CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="p-2 border rounded-md text-sm">Task A</div>
                                        <div className="p-2 border rounded-md text-sm">Task B</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader><CardTitle>In Progress (3)</CardTitle></CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="p-2 border rounded-md text-sm">Task C</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader><CardTitle>Done (12)</CardTitle></CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="p-2 border rounded-md text-sm bg-green-100/50 line-through text-muted-foreground">Task D</div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
            <FeatureDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} feature={selectedFeature} />
        </div>
    );
}
