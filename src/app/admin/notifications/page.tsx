"use client"

import * as React from "react"
import { MoreHorizontal, PlusCircle, BellRing, CheckCircle2, TrendingUp, BarChart, Mail, Smartphone, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"

type Campaign = { id: string; name: string; campaign_type: string | null; status: string | null; reach: number | null; clicks: number | null }
type Notification = { id: string }

function getStatusVariant(s: string | null) {
  if (s === "Active" || s === "Running") return "secondary"
  if (s === "Completed" || s === "Published") return "default"
  return "outline"
}

function getTypeIcon(t: string | null) {
  if (t === "SMS") return <Smartphone className="h-4 w-4" />
  if (t === "Email") return <Mail className="h-4 w-4" />
  return <BellRing className="h-4 w-4" />
}

export default function NotificationEnginePage() {
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([])
  const [notifications, setNotifications] = React.useState<Notification[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("erp_campaigns").select("id, name, campaign_type, status, reach, clicks").order("created_at", { ascending: false }).limit(50),
      supabase.from("notifications").select("id", { count: "exact", head: true }),
    ]).then(([camp, notif]) => {
      setCampaigns(camp.data ?? [])
      setNotifications(notif.count ? Array.from({ length: notif.count }) as Notification[] : [])
      setLoading(false)
    })
  }, [])

  const activeCampaigns = campaigns.filter(c => c.status === "Active" || c.status === "Running")
  const totalReach = campaigns.reduce((s, c) => s + (c.reach ?? 0), 0)
  const totalClicks = campaigns.reduce((s, c) => s + (c.clicks ?? 0), 0)
  const avgCtr = totalReach > 0 ? ((totalClicks / totalReach) * 100).toFixed(1) : "0.0"

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold font-headline">Notification Engine</h1>
        <p className="text-muted-foreground">Manage and monitor all platform notifications (Push, SMS, Email).</p>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notifications Sent</CardTitle><BellRing className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : notifications.length.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">User notifications total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle><CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : activeCampaigns.length}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Campaign Reach</CardTitle><TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : totalReach.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across all campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. CTR</CardTitle><BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : `${avgCtr}%`}</div>
            <p className="text-xs text-muted-foreground">Clicks ÷ reach</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="transactional">Transactional</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="campaigns" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Notification Campaigns</CardTitle>
                <Button><PlusCircle className="mr-2 h-4 w-4" />Create Campaign</Button>
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
                      <TableHead><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {campaigns.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No campaigns yet.</TableCell></TableRow>
                    ) : campaigns.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline" className="flex items-center gap-1 w-fit">
                            {getTypeIcon(c.campaign_type)}
                            {c.campaign_type ?? "Push"}
                          </Badge>
                        </TableCell>
                        <TableCell><Badge variant={getStatusVariant(c.status)}>{c.status ?? "Draft"}</Badge></TableCell>
                        <TableCell className="hidden lg:table-cell tabular-nums">{(c.reach ?? 0).toLocaleString()}</TableCell>
                        <TableCell className="hidden lg:table-cell tabular-nums">{(c.clicks ?? 0).toLocaleString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button aria-haspopup="true" size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" /><span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Duplicate</DropdownMenuItem>
                              <DropdownMenuItem>Pause</DropdownMenuItem>
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
        </TabsContent>
        <TabsContent value="transactional" className="text-center py-12 text-muted-foreground">Feature coming soon.</TabsContent>
        <TabsContent value="templates" className="text-center py-12 text-muted-foreground">Feature coming soon.</TabsContent>
        <TabsContent value="history" className="text-center py-12 text-muted-foreground">Feature coming soon.</TabsContent>
      </Tabs>
    </div>
  )
}
