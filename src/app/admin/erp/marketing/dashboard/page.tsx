"use client"

import * as React from "react"
import { Users, Target, Megaphone, TrendingUp, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

type Campaign = { id: string; name: string; campaign_type: string | null; status: string | null; reach: number | null; clicks: number | null; conversions: number | null }
type Lead = { id: string; name: string; company: string | null; status: string | null }

function statusVariant(s: string | null) {
  if (s === "Active" || s === "Running") return "secondary" as const
  if (s === "Completed" || s === "Published") return "default" as const
  return "outline" as const
}

export default function MarketingDashboardPage() {
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([])
  const [leads, setLeads] = React.useState<Lead[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("erp_campaigns").select("id, name, campaign_type, status, reach, clicks, conversions").order("created_at", { ascending: false }).limit(30),
      supabase.from("erp_leads").select("id, name, company, status").order("created_at", { ascending: false }).limit(10),
    ]).then(([camp, lead]) => {
      setCampaigns(camp.data ?? [])
      setLeads(lead.data ?? [])
      setLoading(false)
    })
  }, [])

  const activeCampaigns = campaigns.filter(c => c.status === "Active" || c.status === "Running")
  const totalReach = campaigns.reduce((s, c) => s + (c.reach ?? 0), 0)
  const totalConversions = campaigns.reduce((s, c) => s + (c.conversions ?? 0), 0)
  const newLeads = leads.filter(l => l.status === "New" || l.status === "Open").length

  if (loading) return <div className="flex justify-center py-24"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Marketing Dashboard</h1>
        <p className="text-muted-foreground">An overview of all marketing activities and performance.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle><Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{totalReach.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversions</CardTitle><TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{totalConversions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{totalReach > 0 ? ((totalConversions / totalReach) * 100).toFixed(1) : "0.0"}% conversion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle><Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newLeads}</div>
            <p className="text-xs text-muted-foreground">{leads.length} total leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle><Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeCampaigns.length}</div>
            <p className="text-xs text-muted-foreground">{campaigns.length} total campaigns</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Campaigns</CardTitle>
              <Button asChild size="sm" variant="outline"><Link href="/admin/erp/marketing/campaigns">View All</Link></Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead className="hidden sm:table-cell">Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right hidden md:table-cell">Reach</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campaigns.length === 0 ? (
                  <TableRow><TableCell colSpan={4} className="text-center py-6 text-muted-foreground">No campaigns yet.</TableCell></TableRow>
                ) : campaigns.slice(0, 5).map(c => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{c.campaign_type ?? "—"}</TableCell>
                    <TableCell><Badge variant={statusVariant(c.status)}>{c.status ?? "Draft"}</Badge></TableCell>
                    <TableCell className="text-right hidden md:table-cell tabular-nums">{(c.reach ?? 0).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Leads</CardTitle>
              <Button asChild size="sm" variant="outline"><Link href="/admin/erp/crm/leads">View All</Link></Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Company</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="text-center py-6 text-muted-foreground">No leads yet.</TableCell></TableRow>
                ) : leads.slice(0, 6).map(l => (
                  <TableRow key={l.id}>
                    <TableCell className="font-medium">{l.name}</TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">{l.company ?? "—"}</TableCell>
                    <TableCell><Badge variant={l.status === "Converted" ? "secondary" : l.status === "Lost" ? "destructive" : "outline"}>{l.status ?? "Open"}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
