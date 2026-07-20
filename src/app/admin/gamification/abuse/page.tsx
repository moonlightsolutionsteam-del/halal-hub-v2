// @ts-nocheck
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle, CheckCircle2, Loader2, Plus, Zap, CalendarDays, Shield,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

type AbuseFlag = {
  id: string
  user_id: string
  reason: string
  action_type: string | null
  coins_at_risk: number | null
  resolved: boolean
  resolved_at: string | null
  created_at: string
  profile: { name: string | null; email: string | null } | null
}

type Season = {
  id: string
  name: string
  multiplier: number
  starts_at: string
  ends_at: string
  active: boolean
  created_at: string
}

export default function AbuseMonitorPage() {
  const { toast } = useToast()
  const [flags, setFlags] = useState<AbuseFlag[]>([])
  const [seasons, setSeasons] = useState<Season[]>([])
  const [loading, setLoading] = useState(true)
  const [resolving, setResolving] = useState<string | null>(null)
  const [seasonOpen, setSeasonOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    name: "", multiplier: "2", starts_at: "", ends_at: "",
  })

  async function load() {
    setLoading(true)
    const supabase = createClient()
    const [flagRes, seasonRes] = await Promise.all([
      supabase
        .from("coin_abuse_flags")
        .select("*, profile:profiles!coin_abuse_flags_user_id_fkey(name, email)")
        .order("created_at", { ascending: false })
        .limit(200),
      supabase
        .from("coin_seasons")
        .select("*")
        .order("starts_at", { ascending: false }),
    ])
    setFlags(flagRes.data ?? [])
    setSeasons(seasonRes.data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function resolve(id: string) {
    setResolving(id)
    const supabase = createClient()
    await supabase.from("coin_abuse_flags").update({
      resolved: true,
      resolved_at: new Date().toISOString(),
    }).eq("id", id)
    setFlags(fs => fs.map(f => f.id === id ? { ...f, resolved: true, resolved_at: new Date().toISOString() } : f))
    toast({ title: "Flag resolved" })
    setResolving(null)
  }

  async function toggleSeason(id: string, active: boolean) {
    const supabase = createClient()
    await supabase.from("coin_seasons").update({ active }).eq("id", id)
    setSeasons(ss => ss.map(s => s.id === id ? { ...s, active } : s))
    toast({ title: active ? "Season activated" : "Season deactivated" })
  }

  async function createSeason() {
    if (!form.name || !form.starts_at || !form.ends_at) {
      toast({ title: "Fill all fields", variant: "destructive" }); return
    }
    setSubmitting(true)
    const supabase = createClient()
    const { error } = await supabase.from("coin_seasons").insert({
      name: form.name,
      multiplier: parseFloat(form.multiplier) || 2,
      starts_at: new Date(form.starts_at).toISOString(),
      ends_at: new Date(form.ends_at).toISOString(),
      active: true,
    })
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Season created" })
      setSeasonOpen(false)
      setForm({ name: "", multiplier: "2", starts_at: "", ends_at: "" })
      load()
    }
    setSubmitting(false)
  }

  const openFlags = flags.filter(f => !f.resolved)
  const resolvedFlags = flags.filter(f => f.resolved)
  const now = new Date()
  const activeSeason = seasons.find(s => s.active && new Date(s.starts_at) <= now && new Date(s.ends_at) >= now)

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-foreground">Anti-Abuse & Seasons</h1>
        <p className="text-sm text-muted-foreground font-medium">
          Velocity flags, resolved cases, and seasonal coin multipliers.
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Open Flags", value: openFlags.length, color: openFlags.length > 0 ? "text-red-600" : "text-muted-foreground" },
          { label: "Resolved", value: resolvedFlags.length, color: "text-emerald-600" },
          { label: "Active Season", value: activeSeason ? `×${activeSeason.multiplier}` : "None", color: activeSeason ? "text-amber-600" : "text-muted-foreground" },
        ].map(({ label, value, color }) => (
          <Card key={label} className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {activeSeason && (
        <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30">
          <Zap className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-black text-amber-700 dark:text-amber-400">
              {activeSeason.name} — ×{activeSeason.multiplier} multiplier active
            </p>
            <p className="text-xs text-amber-600 dark:text-amber-500 mt-0.5">
              Ends {new Date(activeSeason.ends_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      <Tabs defaultValue="flags">
        <TabsList className="rounded-full h-11">
          <TabsTrigger value="flags" className="rounded-full gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5" /> Flags
            {openFlags.length > 0 && (
              <Badge className="ml-1 text-[10px] h-5 px-1.5 bg-red-500">{openFlags.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="seasons" className="rounded-full gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" /> Seasons
          </TabsTrigger>
        </TabsList>

        {/* Abuse flags */}
        <TabsContent value="flags" className="mt-4 space-y-3">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : flags.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Shield className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No abuse flags. System is clean.</p>
            </div>
          ) : (
            <>
              {openFlags.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-red-600 px-1">Open ({openFlags.length})</p>
                  {openFlags.map(f => (
                    <Card key={f.id} className="rounded-2xl border-none shadow-sm ring-1 ring-red-200 bg-red-50/30 dark:bg-red-950/10 dark:ring-red-900/30">
                      <CardContent className="p-4 flex items-start gap-3">
                        <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-black text-foreground">
                              {f.profile?.name ?? f.profile?.email ?? f.user_id.slice(0, 8)}
                            </span>
                            {f.action_type && (
                              <Badge className="text-[10px] px-2 py-0.5 bg-muted text-muted-foreground border-border">
                                {f.action_type.replace(/_/g, " ")}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-foreground/80">{f.reason}</p>
                          {f.coins_at_risk != null && (
                            <p className="text-xs text-red-600 font-bold">{f.coins_at_risk} HC at risk</p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {new Date(f.created_at).toLocaleString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        <Button
                          size="sm"
                          className="rounded-xl h-8 text-xs font-bold gap-1 bg-emerald-600 hover:bg-emerald-700 shrink-0"
                          disabled={resolving === f.id}
                          onClick={() => resolve(f.id)}
                        >
                          {resolving === f.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle2 className="h-3 w-3" />}
                          Resolve
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {resolvedFlags.length > 0 && (
                <div className="space-y-2 mt-4">
                  <p className="text-xs font-bold text-muted-foreground px-1">Resolved ({resolvedFlags.length})</p>
                  {resolvedFlags.map(f => (
                    <Card key={f.id} className="rounded-2xl border-none shadow-sm opacity-60">
                      <CardContent className="p-4 flex items-start gap-3">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-black text-foreground">
                            {f.profile?.name ?? f.profile?.email ?? f.user_id.slice(0, 8)}
                          </span>
                          <p className="text-xs text-muted-foreground mt-0.5">{f.reason}</p>
                          <p className="text-xs text-muted-foreground">
                            Resolved {f.resolved_at ? new Date(f.resolved_at).toLocaleDateString() : "—"}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </TabsContent>

        {/* Seasons */}
        <TabsContent value="seasons" className="mt-4 space-y-3">
          <div className="flex justify-end">
            <Dialog open={seasonOpen} onOpenChange={setSeasonOpen}>
              <DialogTrigger asChild>
                <Button className="rounded-xl gap-2 font-bold" size="sm">
                  <Plus className="h-4 w-4" /> New Season
                </Button>
              </DialogTrigger>
              <DialogContent className="rounded-2xl max-w-md">
                <DialogHeader><DialogTitle className="font-black">Create Season</DialogTitle></DialogHeader>
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold">Season Name *</Label>
                    <Input placeholder="e.g. Eid ul-Adha 2026" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="rounded-xl" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold">Multiplier</Label>
                    <Input type="number" min="1" max="10" step="0.5" value={form.multiplier} onChange={e => setForm(f => ({ ...f, multiplier: e.target.value }))} className="rounded-xl" />
                    <p className="text-xs text-muted-foreground">e.g. 2 = double coins on eligible actions</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold">Start Date *</Label>
                      <Input type="datetime-local" value={form.starts_at} onChange={e => setForm(f => ({ ...f, starts_at: e.target.value }))} className="rounded-xl" />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold">End Date *</Label>
                      <Input type="datetime-local" value={form.ends_at} onChange={e => setForm(f => ({ ...f, ends_at: e.target.value }))} className="rounded-xl" />
                    </div>
                  </div>
                  <Button className="w-full rounded-xl font-bold" onClick={createSeason} disabled={submitting}>
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                    Create Season
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : seasons.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <CalendarDays className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No seasons configured.</p>
            </div>
          ) : (
            seasons.map(s => {
              const isLive = s.active && new Date(s.starts_at) <= now && new Date(s.ends_at) >= now
              const isPast = new Date(s.ends_at) < now
              const isFuture = new Date(s.starts_at) > now
              return (
                <Card key={s.id} className={`rounded-2xl border-none shadow-sm ${isLive ? "ring-1 ring-amber-300 bg-amber-50/30 dark:bg-amber-950/10" : ""}`}>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                      <Zap className={`h-5 w-5 ${isLive ? "text-amber-500" : "text-muted-foreground/40"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-black text-foreground">{s.name}</span>
                        <Badge className={`text-[10px] px-2 py-0.5 border ${isLive ? "bg-emerald-100 text-emerald-700 border-emerald-200" : isPast ? "bg-muted text-muted-foreground border-border" : "bg-blue-100 text-blue-700 border-blue-200"}`}>
                          {isLive ? "Live" : isPast ? "Ended" : "Upcoming"}
                        </Badge>
                        <span className="text-sm font-black text-amber-600">×{s.multiplier}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(s.starts_at).toLocaleDateString()} → {new Date(s.ends_at).toLocaleDateString()}
                      </p>
                    </div>
                    {!isPast && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl h-8 text-xs font-bold shrink-0"
                        onClick={() => toggleSeason(s.id, !s.active)}
                      >
                        {s.active ? "Deactivate" : "Activate"}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
