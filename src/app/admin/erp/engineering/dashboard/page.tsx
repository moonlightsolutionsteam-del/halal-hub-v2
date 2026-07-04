"use client"

import {
  Bug,
  Timer,
  Rocket,
  AlertTriangle,
  FileText,
  GitCommit,
  CheckCircle2,
  KanbanSquare,
  Users,
  HardDrive,
  BarChart,
  TrendingUp,
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock Data
const deliveryStatus = {
    sprintName: "Sprint 24.8.1 (Summer Features)",
    tasksCompleted: 24,
    tasksTotal: 32,
    blockedTasks: 1,
    overdueTasks: 2,
};

const bugHealth = {
    criticalBugs: 1,
    highPriorityBugs: 3,
    avgResolutionTime: "8.2 hours",
    trend: "-15%", // compared to last week
};

const releasePipeline = [
    { version: "v2.1.3 (web)", features: "Hotfix for login", status: "Deployed", timestamp: "2h ago" },
    { version: "v2.2.0 (app)", features: "Creator Profile Revamp", status: "In QA", timestamp: "1d ago" },
];

const infraHealth = [
    { name: "Firebase Auth", status: "Operational", statusColor: "text-green-500" },
    { name: "Firestore", status: "Operational", statusColor: "text-green-500" },
    { name: "Payment Gateway (Stripe)", status: "Degraded Performance", statusColor: "text-yellow-500" },
    { name: "WhatsApp/SMS API (Twilio)", status: "Operational", statusColor: "text-green-500" },
];

const vendorPerformance = [
    { name: "Splintzer (Dev Agency)", activeTasks: 5, delayedTasks: 1, slaBreaches: 0, lastDelivery: "2024-07-28" },
    { name: "Jeho (Design Contractor)", activeTasks: 3, delayedTasks: 0, slaBreaches: 0, lastDelivery: "2024-07-30" },
];

const techRiskAlerts = [
    { level: "Critical", description: "Google Maps API key expires in 3 days." },
    { level: "Warning", description: "No documented rollback plan for release v2.2.0." },
    { level: "Warning", description: "Code ownership unclear for 'legacy-payment' module." },
];

const kpiData = {
    uptime: "99.98%",
    apiErrorRate: "0.15%",
};


export default function EngineeringDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Engineering Dashboard</h1>
        <p className="text-muted-foreground">Control panel for system health, delivery, and technical risks.</p>
      </div>
      
       {techRiskAlerts.some(alert => alert.level === 'Critical') && (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Critical Technical Risk Alert!</AlertTitle>
                <AlertDescription>
                    {techRiskAlerts.find(alert => alert.level === 'Critical')?.description} Please take immediate action.
                </AlertDescription>
            </Alert>
       )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Section A: Delivery Status */}
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><KanbanSquare className="text-primary"/> Delivery Status</CardTitle>
                <CardDescription>{deliveryStatus.sprintName}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Progress value={(deliveryStatus.tasksCompleted / deliveryStatus.tasksTotal) * 100} className="h-4" />
                    <div className="flex justify-between items-center mt-2 text-sm">
                        <p>{deliveryStatus.tasksCompleted} / {deliveryStatus.tasksTotal} tasks completed</p>
                        <p className="font-bold">{Math.round((deliveryStatus.tasksCompleted / deliveryStatus.tasksTotal) * 100)}%</p>
                    </div>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-red-100/50 dark:bg-red-900/20 rounded-lg">
                        <p className="font-bold text-xl text-red-600 dark:text-red-400">{deliveryStatus.blockedTasks}</p>
                        <p className="text-xs font-medium text-red-700 dark:text-red-300">Blocked Tasks</p>
                    </div>
                    <div className="p-3 bg-yellow-100/50 dark:bg-yellow-900/20 rounded-lg">
                        <p className="font-bold text-xl text-yellow-600 dark:text-yellow-400">{deliveryStatus.overdueTasks}</p>
                        <p className="text-xs font-medium text-yellow-700 dark:text-yellow-300">Overdue Tasks</p>
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* Section B: Bug Health */}
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bug className="text-primary"/> Bug Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-around text-center">
                    <div>
                        <p className="text-3xl font-bold text-red-500">{bugHealth.criticalBugs}</p>
                        <p className="text-xs font-semibold">Critical</p>
                    </div>
                     <div>
                        <p className="text-3xl font-bold text-yellow-500">{bugHealth.highPriorityBugs}</p>
                        <p className="text-xs font-semibold">High Priority</p>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-sm">Avg. Resolution Time</p>
                    <p className="font-bold">{bugHealth.avgResolutionTime}</p>
                </div>
                 <div className="text-center">
                    <p className="text-sm">Weekly Trend</p>
                    <p className={`font-bold ${bugHealth.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>{bugHealth.trend}</p>
                </div>
            </CardContent>
        </Card>
      </div>

       <div className="grid gap-6 md:grid-cols-2">
            {/* Section C: Release Pipeline */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Rocket className="text-primary"/> Release Pipeline</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Version</TableHead>
                                <TableHead>Features</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {releasePipeline.map((release) => (
                                <TableRow key={release.version}>
                                    <TableCell className="font-medium">{release.version}</TableCell>
                                    <TableCell className="max-w-[200px] truncate">{release.features}</TableCell>
                                    <TableCell>
                                        <Badge variant={release.status === "Deployed" ? "secondary" : "default"}>{release.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

             {/* Section D: Infrastructure Health */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><HardDrive className="text-primary"/> Infrastructure Health</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {infraHealth.map((service) => (
                                <TableRow key={service.name}>
                                    <TableCell className="font-medium">{service.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={service.status === 'Operational' ? 'secondary' : 'destructive'} className={service.status === 'Operational' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                                            {service.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                             <TableRow>
                                <TableCell>API Error Rate</TableCell>
                                <TableCell className="text-right font-semibold">{kpiData.apiErrorRate}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>System Uptime (24h)</TableCell>
                                <TableCell className="text-right font-semibold">{kpiData.uptime}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        
         <div className="grid gap-6 md:grid-cols-2">
            {/* Section E: Vendor Performance */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users className="text-primary"/> Vendor Performance</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Vendor</TableHead>
                                <TableHead>Active Tasks</TableHead>
                                <TableHead>Delayed</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vendorPerformance.map((vendor) => (
                                <TableRow key={vendor.name}>
                                    <TableCell className="font-medium">{vendor.name}</TableCell>
                                    <TableCell>{vendor.activeTasks}</TableCell>
                                    <TableCell className={vendor.delayedTasks > 0 ? "text-red-500 font-bold" : ""}>{vendor.delayedTasks}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

             {/* Section F: Technical Risk Alerts */}
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><AlertTriangle className="text-primary"/> Technical Risk Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {techRiskAlerts.map((alert, index) => (
                            <Alert key={index} variant={alert.level === 'Critical' ? 'destructive' : 'default'} className={alert.level === 'Warning' ? "bg-yellow-100/50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/50" : ""}>
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>{alert.level}</AlertTitle>
                                <AlertDescription>{alert.description}</AlertDescription>
                            </Alert>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}