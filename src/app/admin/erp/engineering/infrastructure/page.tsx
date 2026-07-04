
"use client"

import {
  Server,
  Cloud,
  HardDrive,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock,
  Key,
  Webhook,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
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
import { Label } from "@/components/ui/label"

const kpiData = [
  { title: "Overall System Status", value: "All Systems Operational", icon: <CheckCircle2 className="h-4 w-4 text-green-500" />, description: "No active incidents" },
  { title: "API Error Rate (24h)", value: "0.02%", icon: <AlertTriangle className="h-4 w-4 text-muted-foreground" />, description: "Below threshold" },
  { title: "Estimated Monthly Cost", value: "₹45,000", icon: <DollarSign className="h-4 w-4 text-muted-foreground" />, description: "+2% from last month" },
  { title: "Cloud Storage Used", value: "52.8 GB / 100 GB", icon: <HardDrive className="h-4 w-4 text-muted-foreground" />, description: "52.8% usage" },
];

const infraHealth = {
    firebase: {
        projectName: "halal-hub-prod",
        environment: "Production",
        errorRate: "0.01%",
        apiLatency: "85ms"
    },
    gcp: {
        projectName: "halal-hub-services",
        environment: "Production",
        errorRate: "0.03%",
        apiLatency: "120ms"
    }
};

const thirdPartyIntegrations = [
  { name: "Razorpay (Payment)", status: "Operational", lastFailure: "45 days ago", apiKeyExpiry: "Jan 15, 2025", webhookHealth: "Healthy" },
  { name: "Twilio (SMS/WhatsApp)", status: "Operational", lastFailure: "12 days ago", apiKeyExpiry: "Sep 30, 2024", webhookHealth: "Healthy" },
  { name: "Google Analytics", status: "Operational", lastFailure: "N/A", apiKeyExpiry: "N/A", webhookHealth: "N/A" },
  { name: "Postmark (Transactional Email)", status: "Degraded Performance", lastFailure: "2 hours ago", apiKeyExpiry: "Dec 10, 2024", webhookHealth: "Delayed" },
];

const getStatusBadge = (status: string) => {
    switch (status) {
        case "Operational":
            return <Badge variant="secondary" className="bg-green-100 text-green-800">{status}</Badge>;
        case "Degraded Performance":
            return <Badge variant="default" className="bg-yellow-100 text-yellow-800">{status}</Badge>;
        case "Outage":
            return <Badge variant="destructive">{status}</Badge>;
        default:
            return <Badge variant="outline">{status}</Badge>;
    }
};

export default function InfrastructurePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Infrastructure & DevOps</h1>
        <p className="text-muted-foreground">Monitor the health and stability of all technical services.</p>
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
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                </CardContent>
            </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Server className="text-primary"/> Backend Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">Firebase</h3>
                    <p className="text-sm text-muted-foreground">Project: {infraHealth.firebase.projectName} ({infraHealth.firebase.environment})</p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <p><strong>Error Rate:</strong> {infraHealth.firebase.errorRate}</p>
                        <p><strong>API Latency:</strong> {infraHealth.firebase.apiLatency}</p>
                    </div>
                 </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">Google Cloud</h3>
                    <p className="text-sm text-muted-foreground">Project: {infraHealth.gcp.projectName} ({infraHealth.gcp.environment})</p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <p><strong>Error Rate:</strong> {infraHealth.gcp.errorRate}</p>
                        <p><strong>API Latency:</strong> {infraHealth.gcp.apiLatency}</p>
                    </div>
                 </div>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Cloud className="text-primary"/> Cloud Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label className="text-xs font-semibold">Storage</Label>
                    <Progress value={52.8} className="mt-1 h-3" />
                    <p className="text-xs text-muted-foreground text-right mt-1">52.8 GB / 100 GB</p>
                </div>
                 <div>
                    <Label className="text-xs font-semibold">Database</Label>
                    <Progress value={75} className="mt-1 h-3" />
                    <p className="text-xs text-muted-foreground text-right mt-1">75 GB / 100 GB</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Usage trend is stable.</span>
                </div>
            </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Third-Party Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Last Failure</TableHead>
                <TableHead className="hidden lg:table-cell">API Key Expiry</TableHead>
                <TableHead className="hidden lg:table-cell">Webhook Health</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {thirdPartyIntegrations.map((item) => (
                <TableRow key={item.name}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    {getStatusBadge(item.status)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{item.lastFailure}</TableCell>
                  <TableCell className="hidden lg:table-cell">{item.apiKeyExpiry}</TableCell>
                   <TableCell className="hidden lg:table-cell">
                        <Badge variant={item.webhookHealth === "Healthy" ? "secondary" : "default"}>{item.webhookHealth}</Badge>
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
