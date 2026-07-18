"use client"

import * as React from "react"
import { Server, Cloud, HardDrive, DollarSign, AlertTriangle, CheckCircle2, TrendingUp, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"

type Bug = { id: string; title: string; priority: string | null; status: string | null }

const thirdPartyIntegrations = [
  { name: "Supabase (DB + Auth + Storage)", status: "Operational", lastCheck: "Live", webhookHealth: "Healthy" },
  { name: "Firebase (Legacy Auth)", status: "Operational", lastCheck: "Monitored", webhookHealth: "Healthy" },
  { name: "Twilio (SMS/WhatsApp)", status: "Operational", lastCheck: "24h ago", webhookHealth: "Healthy" },
  { name: "Google Analytics", status: "Operational", lastCheck: "N/A", webhookHealth: "N/A" },
  { name: "Vercel (Hosting)", status: "Operational", lastCheck: "Live", webhookHealth: "Healthy" },
]

function statusBadge(s: string) {
  if (s === "Operational") return <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">{s}</Badge>
  if (s === "Degraded Performance") return <Badge variant="default" className="bg-yellow-100 text-yellow-800">{s}</Badge>
  return <Badge variant="destructive">{s}</Badge>
}

export default function InfrastructurePage() {
  const [bugs, setBugs] = React.useState<Bug[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_bugs")
      .select("id, title, priority, status")
      .neq("status", "Closed")
      .in("priority", ["Critical", "High"])
      .limit(20)
      .then(({ data }) => { setBugs(data ?? []); setLoading(false) })
  }, [])

  const criticalBugs = bugs.filter(b => b.priority === "Critical")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Infrastructure & DevOps</h1>
        <p className="text-muted-foreground">Monitor the health and stability of all technical services.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle><CheckCircle2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-600">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : criticalBugs.length === 0 ? "Operational" : "Degraded"}</div>
            <p className="text-xs text-muted-foreground">{loading ? "—" : criticalBugs.length > 0 ? `${criticalBugs.length} critical issues` : "No active incidents"}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open High/Critical Bugs</CardTitle><AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${bugs.length > 0 ? "text-destructive" : ""}`}>{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : bugs.length}</div>
            <p className="text-xs text-muted-foreground">{criticalBugs.length} critical, {bugs.length - criticalBugs.length} high</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Integrations Active</CardTitle><Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thirdPartyIntegrations.filter(t => t.status === "Operational").length}</div>
            <p className="text-xs text-muted-foreground">of {thirdPartyIntegrations.length} monitored</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cloud Storage</CardTitle><HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 Buckets</div>
            <p className="text-xs text-muted-foreground">Supabase Storage — all active</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Server className="text-primary h-5 w-5" /> Backend Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Supabase</h3>
              <p className="text-sm text-muted-foreground">Project: halal-hub-prod (Production)</p>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <p><strong>DB:</strong> PostgreSQL (75 tables)</p>
                <p><strong>Auth:</strong> RLS on all tables</p>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold">Firebase (Legacy)</h3>
              <p className="text-sm text-muted-foreground">Read-only — source of truth for legacy UID mapping</p>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <p><strong>Access:</strong> Read-only</p>
                <p><strong>Migration:</strong> In Progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Cloud className="text-primary h-5 w-5" /> Cloud Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-xs font-semibold">Supabase Storage</Label>
              <Progress value={30} className="mt-1 h-3" />
              <p className="text-xs text-muted-foreground text-right mt-1">4 buckets active — business-media, post-media, review-photos, proofs</p>
            </div>
            <div>
              <Label className="text-xs font-semibold">Database</Label>
              <Progress value={45} className="mt-1 h-3" />
              <p className="text-xs text-muted-foreground text-right mt-1">75 tables — all with RLS policies</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span>Usage trend is stable.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {bugs.length > 0 && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Open Critical/High Bugs</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bugs.map(b => (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium">{b.title}</TableCell>
                    <TableCell>
                      <Badge variant={b.priority === "Critical" ? "destructive" : "default"}>{b.priority}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{b.status ?? "Open"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Third-Party Integrations</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Last Check</TableHead>
                <TableHead className="hidden lg:table-cell">Webhook Health</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {thirdPartyIntegrations.map(item => (
                <TableRow key={item.name}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{statusBadge(item.status)}</TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{item.lastCheck}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge variant={item.webhookHealth === "Healthy" ? "secondary" : "outline"}>{item.webhookHealth}</Badge>
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
