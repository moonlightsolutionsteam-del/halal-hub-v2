"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, Search, Users, Target, Percent, Megaphone, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"

type Campaign = { id: string; name: string; campaign_type: string | null; status: string | null; reach: number | null; clicks: number | null; conversions: number | null; budget: number | null; spend: number | null; start_date: string | null; end_date: string | null }

function statusVariant(s: string | null) {
  if (s === "Active") return "secondary" as const
  if (s === "Completed") return "default" as const
  if (s === "Draft") return "outline" as const
  return "destructive" as const
}

function fmtNum(n: number | null) { return n != null ? n.toLocaleString("en-IN") : "—" }

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [typeFilter, setTypeFilter] = React.useState("all")

  React.useEffect(() => {
    const supabase = createClient()
    supabase.from("erp_campaigns")
      .select("id, name, campaign_type, status, reach, clicks, conversions, budget, spend, start_date, end_date")
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data }) => { setCampaigns(data ?? []); setLoading(false) })
  }, [])

  const filtered = campaigns.filter(c => {
    const q = search.toLowerCase()
    const ms = !q || c.name.toLowerCase().includes(q) || (c.campaign_type ?? "").toLowerCase().includes(q)
    const tf = typeFilter === "all" || (c.campaign_type ?? "").toLowerCase().replace(/\s+/g, "-") === typeFilter
    return ms && tf
  })

  const active = campaigns.filter(c => c.status === "Active")
  const totalReach = active.reduce((s, c) => s + (c.reach ?? 0), 0)
  const totalClicks = campaigns.reduce((s, c) => s + (c.clicks ?? 0), 0)
  const totalReachAll = campaigns.reduce((s, c) => s + (c.reach ?? 0), 0)
  const avgCtr = totalReachAll > 0 ? ((totalClicks / totalReachAll) * 100).toFixed(1) : "0.0"
  const totalConversions = campaigns.reduce((s, c) => s + (c.conversions ?? 0), 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Marketing Campaigns</h1>
        <p className="text-muted-foreground">Plan, execute, and track all your marketing campaigns.</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle><Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : active.length}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle><Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : fmtNum(totalReach)}</div>
            <p className="text-xs text-muted-foreground">Across active campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. CTR</CardTitle><Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : `${avgCtr}%`}</div>
            <p className="text-xs text-muted-foreground">Clicks / reach</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Conversions</CardTitle><Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tabular-nums">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : fmtNum(totalConversions)}</div>
            <p className="text-xs text-muted-foreground">Across all campaigns</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Campaigns</CardTitle>
            <Button><PlusCircle className="mr-2 h-4 w-4" />New Campaign</Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search campaigns..." className="pl-10" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Filter by Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="social-media">Social Media</SelectItem>
                <SelectItem value="multi-channel">Multi-channel</SelectItem>
                <SelectItem value="push">Push</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Campaign</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Reach</TableHead>
                  <TableHead className="hidden lg:table-cell">Clicks</TableHead>
                  <TableHead className="hidden lg:table-cell">Conversions</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No campaigns found.</TableCell></TableRow>
                ) : filtered.map(c => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{c.campaign_type ?? "—"}</TableCell>
                    <TableCell><Badge variant={statusVariant(c.status)}>{c.status ?? "Draft"}</Badge></TableCell>
                    <TableCell className="hidden lg:table-cell tabular-nums text-sm">{fmtNum(c.reach)}</TableCell>
                    <TableCell className="hidden lg:table-cell tabular-nums text-sm">{fmtNum(c.clicks)}</TableCell>
                    <TableCell className="hidden lg:table-cell tabular-nums text-sm">{fmtNum(c.conversions)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4" /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Report</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
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
