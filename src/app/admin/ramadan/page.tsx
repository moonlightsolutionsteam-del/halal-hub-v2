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
  Loader2, Moon, Save, Zap, Plus, Trash2, Star,
  Utensils, BookOpen, Heart, Church, ShoppingBag,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type Settings = {
  enabled: boolean
  year: number
  start_date: string
  end_date: string
  city: string
  banner_title: string
  banner_subtitle: string
  iftar_cta_text: string
  coin_multiplier: number
}

type ContentItem = {
  id: string
  section: string
  title: string
  description: string | null
  sort_order: number
  active: boolean
}

const SECTION_META: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  iftar_deals:     { label: "Iftar Deals",        icon: Utensils,    color: "text-amber-600" },
  tarawih_mosques: { label: "Tarawih Mosques",     icon: Church,      color: "text-emerald-600" },
  charity:         { label: "Charity / Zakat",     icon: Heart,       color: "text-red-500" },
  recipes:         { label: "Recipes",             icon: BookOpen,    color: "text-blue-600" },
  products:        { label: "Halal Products",      icon: ShoppingBag, color: "text-violet-600" },
}

const CITIES = ["Mumbai", "Delhi", "Hyderabad", "Chennai", "Kolkata", "Bangalore", "Pune", "Lucknow"]

export default function AdminRamadanPage() {
  const { toast } = useToast()
  const [settings, setSettings] = React.useState<Settings | null>(null)
  const [content, setContent] = React.useState<ContentItem[]>([])
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)
  const [addOpen, setAddOpen] = React.useState(false)
  const [addForm, setAddForm] = React.useState({ section: "iftar_deals", title: "", description: "" })

  React.useEffect(() => {
    const supabase = createClient()
    Promise.all([
      supabase.from("ramadan_settings").select("*").eq("id", 1).single(),
      supabase.from("ramadan_content").select("*").order("section").order("sort_order"),
    ]).then(([settingsRes, contentRes]) => {
      setSettings(settingsRes.data)
      setContent(contentRes.data ?? [])
      setLoading(false)
    })
  }, [])

  async function saveSettings() {
    if (!settings) return
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase
      .from("ramadan_settings")
      .update({ ...settings, updated_at: new Date().toISOString() })
      .eq("id", 1)

    // Sync feature_flags.enabled
    await supabase.from("feature_flags").update({ enabled: settings.enabled }).eq("key", "ramadan_mode")

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Ramadan settings saved" })
    }
    setSaving(false)
  }

  async function toggleContent(id: string, active: boolean) {
    const supabase = createClient()
    await supabase.from("ramadan_content").update({ active }).eq("id", id)
    setContent(cs => cs.map(c => c.id === id ? { ...c, active } : c))
  }

  async function deleteContent(id: string) {
    const supabase = createClient()
    await supabase.from("ramadan_content").delete().eq("id", id)
    setContent(cs => cs.filter(c => c.id !== id))
    toast({ title: "Content removed" })
  }

  async function addContent() {
    if (!addForm.title) return
    const supabase = createClient()
    const { data, error } = await supabase.from("ramadan_content").insert({
      section: addForm.section,
      title: addForm.title,
      description: addForm.description || null,
      sort_order: content.filter(c => c.section === addForm.section).length + 1,
    }).select().single()
    if (!error && data) {
      setContent(cs => [...cs, data])
      setAddOpen(false)
      setAddForm({ section: "iftar_deals", title: "", description: "" })
      toast({ title: "Content added" })
    }
  }

  const now = new Date()
  const isRamadanLive = settings
    ? settings.enabled && new Date(settings.start_date) <= now && new Date(settings.end_date) >= now
    : false

  const grouped = Object.keys(SECTION_META).map(sec => ({
    key: sec,
    items: content.filter(c => c.section === sec),
  }))

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-black text-foreground flex items-center gap-2">
            <Moon className="h-6 w-6 text-primary" /> Ramadan Platform Mode
          </h1>
          <p className="text-sm text-muted-foreground font-medium">
            Toggle Ramadan mode, configure the hub banner, curate content, and set the coin multiplier.
          </p>
        </div>
        {isRamadanLive && (
          <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 font-bold px-3 py-1.5 shrink-0">
            <Zap className="h-3 w-3 mr-1" /> Live Now
          </Badge>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
      ) : settings ? (
        <Tabs defaultValue="settings">
          <TabsList className="rounded-full h-11">
            <TabsTrigger value="settings"  className="rounded-full gap-1.5"><Moon className="h-3.5 w-3.5" /> Settings</TabsTrigger>
            <TabsTrigger value="content"   className="rounded-full gap-1.5"><Star className="h-3.5 w-3.5" /> Content</TabsTrigger>
          </TabsList>

          {/* ── Settings ── */}
          <TabsContent value="settings" className="mt-4 space-y-4">

            {/* Master toggle */}
            <Card className={`rounded-2xl border-none shadow-sm ${settings.enabled ? "ring-1 ring-primary/30 bg-primary/5" : ""}`}>
              <CardContent className="p-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black text-foreground">Ramadan Mode</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Enables the /ramadan hub, themed banner, Suhoor/Iftar countdown, and coin multiplier.
                    Flips the <code className="text-[10px] bg-muted px-1 rounded">ramadan_mode</code> feature flag.
                  </p>
                </div>
                <Switch
                  checked={settings.enabled}
                  onCheckedChange={v => setSettings(s => s ? { ...s, enabled: v } : s)}
                />
              </CardContent>
            </Card>

            {/* Dates & city */}
            <Card className="rounded-2xl border-none shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-black">Dates & Location</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">Year</Label>
                  <Input
                    type="number"
                    value={settings.year}
                    onChange={e => setSettings(s => s ? { ...s, year: +e.target.value } : s)}
                    className="rounded-xl h-10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">Start Date</Label>
                  <Input
                    type="date"
                    value={settings.start_date}
                    onChange={e => setSettings(s => s ? { ...s, start_date: e.target.value } : s)}
                    className="rounded-xl h-10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">End Date</Label>
                  <Input
                    type="date"
                    value={settings.end_date}
                    onChange={e => setSettings(s => s ? { ...s, end_date: e.target.value } : s)}
                    className="rounded-xl h-10"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label className="text-xs font-bold">City for Prayer Times</Label>
                  <div className="flex flex-wrap gap-2">
                    {CITIES.map(city => (
                      <button
                        key={city}
                        onClick={() => setSettings(s => s ? { ...s, city } : s)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-colors ${
                          settings.city === city
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-muted text-muted-foreground border-border hover:border-primary/50"
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">Coin Multiplier</Label>
                  <Input
                    type="number"
                    min="1"
                    max="5"
                    step="0.5"
                    value={settings.coin_multiplier}
                    onChange={e => setSettings(s => s ? { ...s, coin_multiplier: +e.target.value } : s)}
                    className="rounded-xl h-10"
                  />
                  <p className="text-[10px] text-muted-foreground">Applied to all eligible gamification actions</p>
                </div>
              </CardContent>
            </Card>

            {/* Banner copy */}
            <Card className="rounded-2xl border-none shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-black">Hub Banner Copy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">Banner Title</Label>
                  <Input
                    value={settings.banner_title}
                    onChange={e => setSettings(s => s ? { ...s, banner_title: e.target.value } : s)}
                    className="rounded-xl h-10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">Banner Subtitle</Label>
                  <Input
                    value={settings.banner_subtitle}
                    onChange={e => setSettings(s => s ? { ...s, banner_subtitle: e.target.value } : s)}
                    className="rounded-xl h-10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold">Iftar CTA Text</Label>
                  <Input
                    value={settings.iftar_cta_text}
                    onChange={e => setSettings(s => s ? { ...s, iftar_cta_text: e.target.value } : s)}
                    className="rounded-xl h-10"
                  />
                </div>

                {/* Preview */}
                <div className="rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 p-5 text-white space-y-1 mt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Moon className="h-4 w-4 text-emerald-300" />
                    <span className="text-[10px] font-black text-emerald-300 uppercase tracking-widest">Preview</span>
                  </div>
                  <p className="text-xl font-black">{settings.banner_title || "Ramadan Mubarak"}</p>
                  <p className="text-sm text-emerald-200">{settings.banner_subtitle || "Subtitle here"}</p>
                  <button className="mt-3 text-xs font-bold bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors">
                    {settings.iftar_cta_text || "Find Iftar near you"}
                  </button>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button className="rounded-xl gap-2 h-11 px-6 font-bold" onClick={saveSettings} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save Settings
              </Button>
            </div>
          </TabsContent>

          {/* ── Content ── */}
          <TabsContent value="content" className="mt-4 space-y-4">
            <div className="flex justify-end">
              <Dialog open={addOpen} onOpenChange={setAddOpen}>
                <DialogTrigger asChild>
                  <Button className="rounded-xl gap-2 font-bold" size="sm">
                    <Plus className="h-4 w-4" /> Add Content
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-2xl max-w-sm">
                  <DialogHeader><DialogTitle className="font-black">Add Ramadan Content</DialogTitle></DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold">Section</Label>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(SECTION_META).map(([key, { label }]) => (
                          <button
                            key={key}
                            onClick={() => setAddForm(f => ({ ...f, section: key }))}
                            className={`text-xs font-bold px-2.5 py-1 rounded-full border transition-colors ${
                              addForm.section === key
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-muted text-muted-foreground border-border"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold">Title *</Label>
                      <Input
                        placeholder="e.g. Karim's Iftar Special"
                        value={addForm.title}
                        onChange={e => setAddForm(f => ({ ...f, title: e.target.value }))}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-bold">Description</Label>
                      <Input
                        placeholder="Short description"
                        value={addForm.description}
                        onChange={e => setAddForm(f => ({ ...f, description: e.target.value }))}
                        className="rounded-xl"
                      />
                    </div>
                    <Button className="w-full rounded-xl font-bold" onClick={addContent} disabled={!addForm.title}>
                      Add Content
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {grouped.map(({ key, items }) => {
              const meta = SECTION_META[key]
              const Icon = meta.icon
              return (
                <Card key={key} className="rounded-2xl border-none shadow-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${meta.color}`} />
                      <CardTitle className="text-sm font-black">{meta.label}</CardTitle>
                      <Badge className="text-[10px] px-2 py-0 bg-muted text-muted-foreground border-border ml-auto">
                        {items.length} items
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {items.length === 0 ? (
                      <p className="text-xs text-muted-foreground py-2">No content yet for this section.</p>
                    ) : items.map(item => (
                      <div key={item.id} className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${item.active ? "border-border bg-muted/20" : "border-border/40 bg-muted/5 opacity-50"}`}>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-foreground truncate">{item.title}</p>
                          {item.description && <p className="text-xs text-muted-foreground truncate">{item.description}</p>}
                        </div>
                        <Switch
                          checked={item.active}
                          onCheckedChange={v => toggleContent(item.id, v)}
                        />
                        <button onClick={() => deleteContent(item.id)} className="text-muted-foreground hover:text-red-500 transition-colors p-1">
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            })}
          </TabsContent>
        </Tabs>
      ) : (
        <p className="text-muted-foreground">Settings not found.</p>
      )}
    </div>
  )
}
