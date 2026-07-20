// @ts-nocheck
"use client"

import * as React from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  BellRing, Loader2, Send, Users, BookOpen, Zap, Search,
  CheckCircle2, Mail, Smartphone, Bell, Plus,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type NotifRow = {
  id: string
  user_id: string | null
  type: string
  title: string
  body: string | null
  link: string | null
  read: boolean
  created_at: string
  profile?: { name: string | null; email: string | null } | null
}

type Template = {
  id: string
  key: string
  label: string
  type: string
  title: string
  body: string
  link: string | null
  trigger_event: string | null
  active: boolean
}

const TYPE_ICON: Record<string, React.ElementType> = {
  in_app: Bell,
  push:   BellRing,
  email:  Mail,
  sms:    Smartphone,
}

const TYPE_COLOR: Record<string, string> = {
  in_app: "bg-blue-100 text-blue-700 border-blue-200",
  push:   "bg-amber-100 text-amber-700 border-amber-200",
  email:  "bg-violet-100 text-violet-700 border-violet-200",
  sms:    "bg-emerald-100 text-emerald-700 border-emerald-200",
}

export default function NotificationEnginePage() {
  const { toast } = useToast()
  const [notifications, setNotifications] = React.useState<NotifRow[]>([])
  const [templates, setTemplates] = React.useState<Template[]>([])
  const [loading, setLoading] = React.useState(true)
  const [search, setSearch] = React.useState("")
  const [broadcasting, setBroadcasting] = React.useState(false)
  const [broadcastOpen, setBroadcastOpen] = React.useState(false)
  const [saving, setSaving] = React.useState<string | null>(null)

  const [broadcast, setBroadcast] = React.useState({
    title: "", body: "", link: "", type: "in_app",
  })

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase
        .from("notifications")
        .select("id, user_id, type, title, body, link, read, created_at, profile:profiles!notifications_user_id_fkey(name, email)")
        .order("created_at", { ascending: false })
        .limit(200),
      supabase
        .from("notification_templates")
        .select("*")
        .order("label"),
    ]).then(([notifRes, tplRes]) => {
      setNotifications(notifRes.data ?? [])
      setTemplates(tplRes.data ?? [])
      setLoading(false)
    })
  }, [])

  // Stats
  const total   = notifications.length
  const unread  = notifications.filter(n => !n.read).length
  const today   = notifications.filter(n => new Date(n.created_at).toDateString() === new Date().toDateString()).length
  const byType  = ["in_app","push","email","sms"].map(t => ({
    type: t, count: notifications.filter(n => n.type === t).length,
  }))

  async function sendBroadcast() {
    if (!broadcast.title || !broadcast.body) return
    setBroadcasting(true)
    const supabase = createClient()

    // Get all user IDs
    const { data: profiles } = await supabase.from("profiles").select("id").limit(1000)
    if (!profiles?.length) {
      toast({ title: "No users found", variant: "destructive" })
      setBroadcasting(false)
      return
    }

    const rows = profiles.map(p => ({
      user_id: p.id,
      type: broadcast.type,
      title: broadcast.title,
      body: broadcast.body,
      link: broadcast.link || null,
      read: false,
    }))

    const { error } = await supabase.from("notifications").insert(rows)
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({ title: `Broadcast sent to ${rows.length} users` })
      setBroadcastOpen(false)
      setBroadcast({ title: "", body: "", link: "", type: "in_app" })
      // Refresh
      const { data } = await supabase
        .from("notifications")
        .select("id, user_id, type, title, body, link, read, created_at, profile:profiles!notifications_user_id_fkey(name, email)")
        .order("created_at", { ascending: false })
        .limit(200)
      setNotifications(data ?? [])
    }
    setBroadcasting(false)
  }

  async function toggleTemplate(id: string, active: boolean) {
    setSaving(id)
    const supabase = createClient()
    await supabase.from("notification_templates").update({ active }).eq("id", id)
    setTemplates(ts => ts.map(t => t.id === id ? { ...t, active } : t))
    setSaving(null)
  }

  const filtered = notifications.filter(n => {
    const q = search.toLowerCase()
    return !q || n.title.toLowerCase().includes(q)
      || (n.body ?? "").toLowerCase().includes(q)
      || (n.profile?.name ?? "").toLowerCase().includes(q)
  })

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
            <BellRing className="h-6 w-6 text-primary" /> Notification Engine
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Broadcast, template management, delivery history, and trigger rules.
          </p>
        </div>
        <Dialog open={broadcastOpen} onOpenChange={setBroadcastOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl gap-2 font-bold shrink-0">
              <Send className="h-4 w-4" /> Broadcast
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl max-w-md">
            <DialogHeader><DialogTitle className="font-black">Send Broadcast</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Channel</Label>
                <div className="flex gap-2">
                  {["in_app","push","email","sms"].map(t => (
                    <button
                      key={t}
                      onClick={() => setBroadcast(b => ({ ...b, type: t }))}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
                        broadcast.type === t
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      {t.replace("_", " ")}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Title *</Label>
                <Input
                  placeholder="e.g. Ramadan Mubarak from HalalHub 🌙"
                  value={broadcast.title}
                  onChange={e => setBroadcast(b => ({ ...b, title: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Body *</Label>
                <Input
                  placeholder="Short notification message"
                  value={broadcast.body}
                  onChange={e => setBroadcast(b => ({ ...b, body: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Link (optional)</Label>
                <Input
                  placeholder="/ramadan"
                  value={broadcast.link}
                  onChange={e => setBroadcast(b => ({ ...b, link: e.target.value }))}
                  className="rounded-xl"
                />
              </div>
              <Button
                className="w-full rounded-xl font-bold gap-2"
                onClick={sendBroadcast}
                disabled={broadcasting || !broadcast.title || !broadcast.body}
              >
                {broadcasting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Send to All Users
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Sent",   value: total,  icon: BellRing,     color: "text-primary" },
          { label: "Unread",       value: unread, icon: Bell,         color: "text-amber-600" },
          { label: "Sent Today",   value: today,  icon: Zap,          color: "text-emerald-600" },
          { label: "Active Templates", value: templates.filter(t => t.active).length, icon: BookOpen, color: "text-violet-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <Card key={label} className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2 rounded-xl bg-muted ${color}`}><Icon className="h-4 w-4" /></div>
              <div>
                <p className="text-xl font-black text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Channel breakdown */}
      <div className="grid grid-cols-4 gap-2">
        {byType.map(({ type, count }) => {
          const Icon = TYPE_ICON[type] ?? Bell
          return (
            <Card key={type} className="rounded-2xl border-none shadow-sm">
              <CardContent className="p-3 flex items-center gap-2">
                <Icon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-sm font-black text-foreground">{count}</p>
                  <p className="text-[10px] text-muted-foreground capitalize">{type.replace("_", " ")}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Tabs defaultValue="history">
        <TabsList className="rounded-full h-11">
          <TabsTrigger value="history"   className="rounded-full gap-1.5"><Bell className="h-3.5 w-3.5" /> History</TabsTrigger>
          <TabsTrigger value="templates" className="rounded-full gap-1.5"><BookOpen className="h-3.5 w-3.5" /> Templates</TabsTrigger>
          <TabsTrigger value="triggers"  className="rounded-full gap-1.5"><Zap className="h-3.5 w-3.5" /> Triggers</TabsTrigger>
        </TabsList>

        {/* ── History ── */}
        <TabsContent value="history" className="mt-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notifications…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 h-11 rounded-xl"
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <BellRing className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No notifications yet. Use Broadcast to send the first one.</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium px-1">Showing {filtered.length} notifications</p>
              {filtered.map(n => {
                const Icon = TYPE_ICON[n.type] ?? Bell
                return (
                  <Card key={n.id} className="rounded-2xl border-none shadow-sm">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${n.read ? "bg-muted" : "bg-primary/10"}`}>
                        <Icon className={`h-3.5 w-3.5 ${n.read ? "text-muted-foreground" : "text-primary"}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-black text-foreground truncate">{n.title}</p>
                          <Badge className={`text-[10px] px-2 py-0 border ${TYPE_COLOR[n.type] ?? TYPE_COLOR.in_app}`}>
                            {n.type.replace("_", " ")}
                          </Badge>
                          {!n.read && <Badge className="text-[10px] px-2 py-0 bg-primary/10 text-primary border-primary/20">unread</Badge>}
                        </div>
                        {n.body && <p className="text-xs text-muted-foreground mt-0.5 truncate">{n.body}</p>}
                        <p className="text-[10px] text-muted-foreground/60 mt-1">
                          {n.profile?.name ?? "All users"} · {new Date(n.created_at).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        {/* ── Templates ── */}
        <TabsContent value="templates" className="mt-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground font-medium">{templates.length} templates · toggle to enable/disable auto-send</p>
            <Button size="sm" variant="outline" className="rounded-xl gap-1.5 font-bold text-xs" disabled>
              <Plus className="h-3.5 w-3.5" /> New Template
            </Button>
          </div>
          {loading ? (
            <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : (
            templates.map(tpl => {
              const Icon = TYPE_ICON[tpl.type] ?? Bell
              return (
                <Card key={tpl.id} className={`rounded-2xl border-none shadow-sm ${tpl.active ? "" : "opacity-60"}`}>
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className={`h-9 w-9 rounded-xl flex items-center justify-center shrink-0 ${TYPE_COLOR[tpl.type] ?? TYPE_COLOR.in_app}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-black text-foreground">{tpl.label}</p>
                        <Badge className={`text-[10px] px-2 py-0 border ${TYPE_COLOR[tpl.type] ?? TYPE_COLOR.in_app}`}>
                          {tpl.type.replace("_", " ")}
                        </Badge>
                      </div>
                      <p className="text-xs font-bold text-foreground/80 mt-0.5">{tpl.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{tpl.body}</p>
                      {tpl.trigger_event && (
                        <p className="text-[10px] text-muted-foreground/60 mt-1 flex items-center gap-1">
                          <Zap className="h-2.5 w-2.5" /> Trigger: <code className="font-mono">{tpl.trigger_event}</code>
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {saving === tpl.id && <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />}
                      <Switch
                        checked={tpl.active}
                        onCheckedChange={v => toggleTemplate(tpl.id, v)}
                        disabled={saving === tpl.id}
                      />
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>

        {/* ── Triggers ── */}
        <TabsContent value="triggers" className="mt-4">
          <Card className="rounded-2xl border-none shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-black">Trigger Event Rules</CardTitle>
              <CardDescription>System events that auto-fire notifications when they occur.</CardDescription>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-xs font-black text-muted-foreground">Event</th>
                    <th className="text-left py-2 pr-4 text-xs font-black text-muted-foreground">Fires</th>
                    <th className="text-left py-2 pr-4 text-xs font-black text-muted-foreground">Channel</th>
                    <th className="text-left py-2 text-xs font-black text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {[
                    { event: "coin_ledger.insert",             fires: "Coins Earned",            ch: "in_app", active: true },
                    { event: "user_levels.update",             fires: "Level Up",                ch: "in_app", active: true },
                    { event: "feed_posts.update (approved)",   fires: "Review Published",        ch: "in_app", active: true },
                    { event: "campaign_applications.update",   fires: "Campaign Accepted",       ch: "in_app", active: true },
                    { event: "support_tickets.update (resolved)", fires: "Ticket Resolved",     ch: "in_app", active: true },
                    { event: "profiles.insert",                fires: "Welcome",                 ch: "in_app", active: true },
                    { event: "scheduled (Iftar -30min)",       fires: "Iftar Reminder",          ch: "push",   active: false },
                  ].map(row => (
                    <tr key={row.event} className="hover:bg-muted/30 transition-colors">
                      <td className="py-2.5 pr-4 font-mono text-[11px] text-foreground">{row.event}</td>
                      <td className="py-2.5 pr-4 text-xs font-bold text-foreground">{row.fires}</td>
                      <td className="py-2.5 pr-4">
                        <Badge className={`text-[10px] px-2 py-0 border ${TYPE_COLOR[row.ch] ?? TYPE_COLOR.in_app}`}>
                          {row.ch.replace("_", " ")}
                        </Badge>
                      </td>
                      <td className="py-2.5">
                        {row.active
                          ? <span className="flex items-center gap-1 text-emerald-600 text-[11px] font-bold"><CheckCircle2 className="h-3 w-3" />Active</span>
                          : <span className="text-muted-foreground text-[11px]">Inactive</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-none shadow-sm mt-3">
            <CardContent className="p-4 space-y-2">
              <p className="text-xs font-black text-foreground">Implementation Note</p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">·</span> Triggers are wired via Supabase database functions + webhooks</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">·</span> Push notifications require FCM token registration (Phase 2)</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">·</span> Email/SMS require provider integration — Twilio / SendGrid</li>
                <li className="flex items-start gap-2"><span className="text-primary font-bold mt-0.5">·</span> In-app notifications are live via Supabase Realtime</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
