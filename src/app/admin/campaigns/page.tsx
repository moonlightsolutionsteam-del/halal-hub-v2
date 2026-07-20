"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs"
import {
  Megaphone, Plus, Search, Loader2, Users, Coins, CheckCircle2,
  XCircle, Clock, ChevronRight, CalendarDays,
} from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"

type Campaign = {
  id: string
  title: string
  description: string | null
  brand_name: string | null
  campaign_type: string
  status: string
  coin_cost: number
  max_slots: number
  slots_filled: number
  deadline: string | null
  deliverable: string | null
  reward_value: string | null
  created_at: string
}

type Application = {
  id: string
  campaign_id: string
  user_id: string
  status: string
  pitch: string | null
  coins_burned: number
  applied_at: string
  reviewed_at: string | null
  profile: { name: string | null; email: string | null } | null
  campaign: { title: string } | null
}

const STATUS_META: Record<string, { label: string; color: string }> = {
  draft:     { label: "Draft",     color: "bg-muted text-muted-foreground border-border" },
  active:    { label: "Active",    color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  closed:    { label: "Closed",    color: "bg-amber-100 text-amber-700 border-amber-200" },
  completed: { label: "Completed", color: "bg-blue-100 text-blue-700 border-blue-200" },
}

const APP_STATUS_META: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending:   { label: "Pending",   color: "bg-amber-100 text-amber-700",   icon: Clock },
  approved:  { label: "Approved",  color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  rejected:  { label: "Rejected",  color: "bg-red-100 text-red-700",       icon: XCircle },
  completed: { label: "Completed", color: "bg-blue-100 text-blue-700",     icon: CheckCircle2 },
}

export default function AdminCampaignsPage() {
  const { toast } = useToast()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [reviewing, setReviewing] = useState<string | null>(null)

  const [form, setForm] = useState({
    title: "",
    description: "",
    brand_name: "",
    campaign_type: "creator",
    status: "draft",
    coin_cost: "50",
    max_slots: "10",
    deadline: "",
    deliverable: "",
    reward_value: "",
  })

  async function load() {
    setLoading(true)
    const supabase = createClient()
    const [camRes, appRes] = await Promise.all([
      supabase.from("campaigns").select("*").order("created_at", { ascending: false }),
      supabase
        .from("campaign_applications")
        .select("*, profile:profiles!campaign_applications_user_id_fkey(name, email), campaign:campaigns!campaign_applications_campaign_id_fkey(title)")
        .order("applied_at", { ascending: false })
        .limit(300),
    ])
    setCampaigns(camRes.data ?? [])
    setApplications(appRes.data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleCreate() {
    if (!form.title) {
      toast({ title: "Title required", variant: "destructive" }); return
    }
    setSubmitting(true)
    const supabase = createClient()
    const { error } = await supabase.from("campaigns").insert({
      title: form.title,
      description: form.description || null,
      brand_name: form.brand_name || null,
      campaign_type: form.campaign_type,
      status: form.status,
      coin_cost: parseInt(form.coin_cost) || 0,
      max_slots: parseInt(form.max_slots) || 10,
      deadline: form.deadline || null,
      deliverable: form.deliverable || null,
      reward_value: form.reward_value || null,
    })
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      await supabase.from("admin_actions").insert({
        action_type: "CAMPAIGN_CREATED",
        module: "campaigns",
        description: `Campaign "${form.title}" created (${form.status})`,
        admin_name: "Super Admin",
        admin_tier: "T1",
      })
      toast({ title: "Campaign created" })
      setOpen(false)
      setForm({ title: "", description: "", brand_name: "", campaign_type: "creator", status: "draft", coin_cost: "50", max_slots: "10", deadline: "", deliverable: "", reward_value: "" })
      load()
    }
    setSubmitting(false)
  }

  async function updateStatus(id: string, status: string) {
    const supabase = createClient()
    await supabase.from("campaigns").update({ status }).eq("id", id)
    setCampaigns(cs => cs.map(c => c.id === id ? { ...c, status } : c))
  }

  async function reviewApplication(id: string, status: "approved" | "rejected") {
    setReviewing(id)
    const supabase = createClient()
    await supabase.from("campaign_applications").update({ status, reviewed_at: new Date().toISOString() }).eq("id", id)
    setApplications(as => as.map(a => a.id === id ? { ...a, status, reviewed_at: new Date().toISOString() } : a))
    toast({ title: status === "approved" ? "Application approved" : "Application rejected" })
    setReviewing(null)
  }

  const filtered = campaigns.filter(c => {
    const q = search.toLowerCase()
    return !q || c.title.toLowerCase().includes(q) || (c.brand_name ?? "").toLowerCase().includes(q)
  })

  const activeCampaigns = campaigns.filter(c => c.status === "active").length
  const totalApps = applications.length
  const pendingApps = applications.filter(a => a.status === "pending").length
  const totalCoinsBurned = applications.filter(a => a.status !== "rejected").reduce((s, a) => s + a.coins_burned, 0)

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-foreground">Campaigns</h1>
          <p className="text-sm text-muted-foreground font-medium">
            Creator and consumer campaigns. Applicants burn Halal Coins to apply.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl gap-2 font-bold"><Plus className="h-4 w-4" /> New Campaign</Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle className="font-black">Create Campaign</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              {[
                { label: "Campaign Title *", key: "title", placeholder: "e.g. Ramadan Content Series" },
                { label: "Brand Name", key: "brand_name", placeholder: "e.g. HalalHub" },
                { label: "Reward / Prize", key: "reward_value", placeholder: "e.g. ₹5,000 product voucher" },
              ].map(({ label, key, placeholder }) => (
                <div key={key} className="space-y-1.5">
                  <Label className="text-xs font-bold">{label}</Label>
                  <Input
                    placeholder={placeholder}
                    value={(form as any)[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="rounded-xl"
                  />
                </div>
              ))}

              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Description</Label>
                <Textarea
                  placeholder="What is this campaign about?"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="rounded-xl resize-none" rows={3}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Deliverable</Label>
                <Textarea
                  placeholder="What must the creator deliver? (e.g. 3 reels, 1 blog post)"
                  value={form.deliverable}
                  onChange={e => setForm(f => ({ ...f, deliverable: e.target.value }))}
                  className="rounded-xl resize-none" rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">Type</Label>
                  <Select value={form.campaign_type} onValueChange={v => setForm(f => ({ ...f, campaign_type: v }))}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="creator">Creator</SelectItem>
                      <SelectItem value="consumer">Consumer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">Status</Label>
                  <Select value={form.status} onValueChange={v => setForm(f => ({ ...f, status: v }))}>
                    <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">Coin Cost to Apply</Label>
                  <Input type="number" min="0" value={form.coin_cost} onChange={e => setForm(f => ({ ...f, coin_cost: e.target.value }))} className="rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">Max Slots</Label>
                  <Input type="number" min="1" value={form.max_slots} onChange={e => setForm(f => ({ ...f, max_slots: e.target.value }))} className="rounded-xl" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold">Application Deadline</Label>
                <Input type="datetime-local" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} className="rounded-xl" />
              </div>

              <Button className="w-full rounded-xl font-bold" onClick={handleCreate} disabled={submitting}>
                {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Create Campaign
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Active Campaigns", value: activeCampaigns, color: "text-emerald-600" },
          { label: "Total Applications", value: totalApps, color: "text-blue-600" },
          { label: "Pending Review", value: pendingApps, color: "text-amber-600" },
          { label: "Coins Burned", value: totalCoinsBurned.toLocaleString(), color: "text-rose-600" },
        ].map(({ label, value, color }) => (
          <Card key={label} className="rounded-2xl border-none shadow-sm">
            <CardContent className="p-4 text-center">
              <p className={`text-2xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-muted-foreground font-medium mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="campaigns">
        <TabsList className="rounded-full h-11">
          <TabsTrigger value="campaigns" className="rounded-full">
            Campaigns <Badge className="ml-2 text-[10px] h-5 px-1.5">{filtered.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="applications" className="rounded-full">
            Applications
            {pendingApps > 0 && <Badge className="ml-2 text-[10px] h-5 px-1.5 bg-amber-500">{pendingApps}</Badge>}
          </TabsTrigger>
        </TabsList>

        {/* Campaigns list */}
        <TabsContent value="campaigns" className="mt-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search campaigns…" value={search} onChange={e => setSearch(e.target.value)} className="pl-9 h-11 rounded-xl" />
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Megaphone className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No campaigns yet. Create one to get started.</p>
            </div>
          ) : (
            filtered.map(c => {
              const meta = STATUS_META[c.status] ?? STATUS_META.draft
              const slotsLeft = c.max_slots - c.slots_filled
              const pct = Math.min(100, Math.round((c.slots_filled / c.max_slots) * 100))
              const apps = applications.filter(a => a.campaign_id === c.id)
              return (
                <Card key={c.id} className="rounded-2xl border-none shadow-sm">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-black text-foreground">{c.title}</span>
                          <Badge className={`text-[10px] px-2 py-0.5 border ${meta.color}`}>{meta.label}</Badge>
                          <Badge className="text-[10px] px-2 py-0.5 bg-muted text-muted-foreground border-border">
                            {c.campaign_type}
                          </Badge>
                        </div>
                        {c.brand_name && <p className="text-xs text-muted-foreground mt-0.5">{c.brand_name}</p>}
                        {c.description && <p className="text-sm text-foreground/80 mt-1 line-clamp-2">{c.description}</p>}
                        <div className="flex items-center gap-3 mt-2 flex-wrap text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Coins className="h-3 w-3" />{c.coin_cost} HC to apply</span>
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{slotsLeft} slot{slotsLeft !== 1 ? "s" : ""} left</span>
                          {c.deadline && <span className="flex items-center gap-1"><CalendarDays className="h-3 w-3" />{new Date(c.deadline).toLocaleDateString()}</span>}
                          {c.reward_value && <span className="font-bold text-emerald-600">{c.reward_value}</span>}
                        </div>
                      </div>
                      <div className="text-right shrink-0 space-y-1">
                        <p className="text-lg font-black text-foreground">{apps.length}</p>
                        <p className="text-xs text-muted-foreground">applicants</p>
                      </div>
                    </div>

                    {/* Slots progress */}
                    <div>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>{c.slots_filled}/{c.max_slots} slots filled</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    </div>

                    {/* Quick status actions */}
                    <div className="flex justify-end gap-2">
                      {c.status === "draft" && (
                        <Button size="sm" className="rounded-xl h-8 text-xs font-bold gap-1" onClick={() => updateStatus(c.id, "active")}>
                          Publish
                        </Button>
                      )}
                      {c.status === "active" && (
                        <Button size="sm" variant="outline" className="rounded-xl h-8 text-xs font-bold" onClick={() => updateStatus(c.id, "closed")}>
                          Close
                        </Button>
                      )}
                      {c.status === "closed" && (
                        <Button size="sm" variant="outline" className="rounded-xl h-8 text-xs font-bold" onClick={() => updateStatus(c.id, "completed")}>
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>

        {/* Applications */}
        <TabsContent value="applications" className="mt-4 space-y-2">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : applications.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Users className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No applications yet.</p>
            </div>
          ) : (
            applications.map(a => {
              const meta = APP_STATUS_META[a.status] ?? APP_STATUS_META.pending
              const Icon = meta.icon
              return (
                <Card key={a.id} className="rounded-2xl border-none shadow-sm">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-black text-foreground">{a.profile?.name ?? "Unknown"}</span>
                          <ChevronRight className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs font-bold text-muted-foreground">{a.campaign?.title ?? "Unknown Campaign"}</span>
                          <span className={`flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold ${meta.color}`}>
                            <Icon className="h-3 w-3" />{meta.label}
                          </span>
                        </div>
                        {a.profile?.email && <p className="text-xs text-muted-foreground">{a.profile.email}</p>}
                        {a.pitch && <p className="text-sm text-foreground/80 mt-1 line-clamp-2">{a.pitch}</p>}
                        <p className="text-xs text-muted-foreground mt-1">
                          Applied {new Date(a.applied_at).toLocaleDateString()} · {a.coins_burned} HC burned
                        </p>
                      </div>
                      {a.status === "pending" && (
                        <div className="flex gap-2 shrink-0">
                          <Button
                            size="sm"
                            className="rounded-xl h-8 text-xs font-bold gap-1 bg-emerald-600 hover:bg-emerald-700"
                            disabled={reviewing === a.id}
                            onClick={() => reviewApplication(a.id, "approved")}
                          >
                            {reviewing === a.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle2 className="h-3 w-3" />}
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-xl h-8 text-xs font-bold gap-1 text-red-600 border-red-200 hover:bg-red-50"
                            disabled={reviewing === a.id}
                            onClick={() => reviewApplication(a.id, "rejected")}
                          >
                            <XCircle className="h-3 w-3" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
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
