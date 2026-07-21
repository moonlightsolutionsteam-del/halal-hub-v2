"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Plus, Trash2, Loader2, X, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

type FamilyEvent = {
  id: string
  title: string
  event_type: string
  event_date: string | null
  location: string | null
  description: string | null
  creator_name: string | null
  created_at: string
}

const EVENT_TYPES = ["Eid", "Wedding", "Birthday", "Funeral", "Reunion", "Religious", "General"]

function fmtDate(d: string | null) {
  if (!d) return null
  return new Date(d).toLocaleDateString([], { weekday: "short", month: "short", day: "numeric", year: "numeric" })
}

export default function FamilyEventsPage() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [groupId, setGroupId] = React.useState<string | null>(null)
  const [events, setEvents] = React.useState<FamilyEvent[]>([])
  const [loading, setLoading] = React.useState(true)
  const [showAdd, setShowAdd] = React.useState(false)
  const [saving, setSaving] = React.useState(false)

  const [title, setTitle] = React.useState("")
  const [eventType, setEventType] = React.useState("General")
  const [eventDate, setEventDate] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [description, setDescription] = React.useState("")

  React.useEffect(() => {
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    async function load() {
      const { data: myRow } = await (supabase as any)
        .from("family_members").select("group_id").eq("user_id", user!.uid).maybeSingle()
      if (!myRow) { setLoading(false); return }
      setGroupId(myRow.group_id)
      const { data } = await (supabase as any)
        .from("family_events")
        .select("id, title, event_type, event_date, location, description, creator_name, created_at")
        .eq("group_id", myRow.group_id)
        .order("event_date", { ascending: true })
      setEvents(data ?? [])
      setLoading(false)
    }
    load()
  }, [user?.uid])

  const handleAdd = async () => {
    if (!title.trim() || !groupId) return
    setSaving(true)
    const supabase = createClient()
    const { data, error } = await (supabase as any)
      .from("family_events")
      .insert({
        group_id: groupId,
        title: title.trim(),
        event_type: eventType,
        event_date: eventDate || null,
        location: location.trim() || null,
        description: description.trim() || null,
        created_by: user?.uid,
        creator_name: user?.name ?? user?.email ?? "Member",
      })
      .select("id, title, event_type, event_date, location, description, creator_name, created_at")
      .single()

    if (error) {
      toast({ title: "Failed to save", description: error.message, variant: "destructive" })
    } else {
      setEvents(prev => [...prev, data].sort((a, b) =>
        (a.event_date ?? "").localeCompare(b.event_date ?? "")))
      setTitle(""); setEventType("General"); setEventDate(""); setLocation(""); setDescription("")
      setShowAdd(false)
      toast({ title: "Event added!" })
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    const supabase = createClient()
    await (supabase as any).from("family_events").delete().eq("id", id)
    setEvents(prev => prev.filter(e => e.id !== id))
    toast({ title: "Event removed" })
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  )

  return (
    <div className="container mx-auto p-4 sm:p-6 max-w-2xl space-y-5 pb-24">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground mb-3 w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Hub
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-2xl bg-indigo-100 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl font-black">Family Events</h1>
              <p className="text-xs text-muted-foreground font-bold">{events.length} event{events.length !== 1 ? "s" : ""}</p>
            </div>
          </div>
        </div>
        <Button onClick={() => setShowAdd(v => !v)} className="rounded-full h-10 px-5 font-black bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg mt-8">
          {showAdd ? <X className="h-4 w-4" /> : <><Plus className="h-4 w-4 mr-1.5" /> Add</>}
        </Button>
      </div>

      {showAdd && (
        <Card className="rounded-2xl border-none shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <CardContent className="p-5 space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Event Name</Label>
              <Input placeholder="e.g. Eid-ul-Fitr Gathering" className="h-12 rounded-xl bg-muted border-none font-bold"
                value={title} onChange={e => setTitle(e.target.value)} autoFocus />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Type</Label>
              <div className="flex gap-2 flex-wrap">
                {EVENT_TYPES.map(t => (
                  <button key={t} onClick={() => setEventType(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-colors ${eventType === t ? "bg-indigo-600 text-white" : "bg-muted text-muted-foreground"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Date</Label>
                <Input type="date" className="h-11 rounded-xl bg-muted border-none font-medium"
                  value={eventDate} onChange={e => setEventDate(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Location</Label>
                <Input placeholder="e.g. Grandma's house" className="h-11 rounded-xl bg-muted border-none font-medium"
                  value={location} onChange={e => setLocation(e.target.value)} />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Details (optional)</Label>
              <Textarea placeholder="Any extra info…" className="rounded-xl bg-muted border-none resize-none min-h-[64px] font-medium"
                value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div className="flex justify-end">
              <Button onClick={handleAdd} disabled={saving || !title.trim()} className="rounded-xl h-10 px-6 font-black bg-indigo-600 hover:bg-indigo-700 text-white">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Event"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {!groupId && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <Calendar className="h-10 w-10 text-muted-foreground/20" />
          <p className="font-black">No family group yet</p>
          <Button asChild className="rounded-xl font-bold"><Link href="/family-tree/setup">Set Up Family Hub</Link></Button>
        </div>
      )}

      {groupId && events.length === 0 && !showAdd && (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
          <Calendar className="h-10 w-10 text-muted-foreground/20" />
          <p className="font-black">No events yet</p>
          <p className="text-sm text-muted-foreground">Add family milestones and upcoming gatherings.</p>
        </div>
      )}

      {events.length > 0 && (
        <div className="space-y-2">
          {events.map(ev => (
            <Card key={ev.id} className="rounded-2xl border-none shadow-sm group">
              <CardContent className="p-4 flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 shrink-0 mt-0.5">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-black text-sm">{ev.title}</p>
                    <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 border-none text-[9px] font-black uppercase">{ev.event_type}</Badge>
                  </div>
                  {ev.event_date && <p className="text-[11px] text-muted-foreground font-medium mt-0.5">{fmtDate(ev.event_date)}</p>}
                  {ev.location && (
                    <p className="text-[11px] text-muted-foreground font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="h-2.5 w-2.5" /> {ev.location}
                    </p>
                  )}
                  {ev.description && <p className="text-xs text-muted-foreground font-medium mt-1 italic">"{ev.description}"</p>}
                </div>
                <button onClick={() => handleDelete(ev.id)}
                  className="h-8 w-8 rounded-xl flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors opacity-0 group-hover:opacity-100 shrink-0">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
