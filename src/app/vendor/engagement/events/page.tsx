"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Calendar, Plus, Users, Clock, Edit2, Trash2, CheckCircle2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"
import { useToast } from "@/hooks/use-toast"

type BusinessEvent = {
  id: string
  title: string
  event_type: string | null
  event_date: string
  event_time: string | null
  location: string | null
  description: string | null
  status: string
  attendees: number
}

const EMPTY_FORM = {
  title: "", event_type: "In-Store Event", event_date: "", event_time: "",
  location: "", description: "", status: "upcoming",
}

const EVENT_TYPES = ["In-Store Event", "Promotion", "Community", "Webinar", "Workshop", "Tasting Day"]

const STATUS_STYLES: Record<string, string> = {
  upcoming: "bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400",
  completed: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400",
  cancelled: "bg-red-50 text-red-700 dark:bg-red-950/30 dark:text-red-400",
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
}

export default function EngagementEventsPage() {
  const { user, loading: authLoading } = useAuth()
  const { toast } = useToast()
  const [bizId, setBizId] = React.useState<string | null>(null)
  const [events, setEvents] = React.useState<BusinessEvent[]>([])
  const [loading, setLoading] = React.useState(true)
  const [showCreate, setShowCreate] = React.useState(false)
  const [editingEvent, setEditingEvent] = React.useState<BusinessEvent | null>(null)
  const [deletingId, setDeletingId] = React.useState<string | null>(null)
  const [form, setForm] = React.useState(EMPTY_FORM)
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;(supabase as any)
      .from("businesses").select("id").eq("owner_id", user.uid).limit(1).maybeSingle()
      .then(({ data }: { data: { id: string } | null }) => {
        if (!data) { setLoading(false); return }
        setBizId(data.id)
        loadEvents(data.id)
      })
  }, [user?.uid, authLoading])

  function loadEvents(id: string) {
    const supabase = createClient()
    ;(supabase as any)
      .from("business_events")
      .select("id, title, event_type, event_date, event_time, location, description, status, attendees")
      .eq("business_id", id)
      .order("event_date", { ascending: false })
      .then(({ data }: { data: BusinessEvent[] | null }) => {
        setEvents(data ?? [])
        setLoading(false)
      })
  }

  async function saveEvent() {
    if (!bizId || !form.title.trim() || !form.event_date) return
    setSaving(true)
    const supabase = createClient()

    const payload = {
      business_id: bizId,
      title: form.title,
      event_type: form.event_type || null,
      event_date: form.event_date,
      event_time: form.event_time || null,
      location: form.location || null,
      description: form.description || null,
      status: form.status,
    }

    if (editingEvent) {
      const { error } = await (supabase as any).from("business_events").update(payload).eq("id", editingEvent.id)
      setSaving(false)
      if (error) { toast({ variant: "destructive", title: "Couldn't update event", description: error.message }); return }
      setEditingEvent(null)
      toast({ title: "Event updated" })
    } else {
      const { error } = await (supabase as any).from("business_events").insert(payload)
      setSaving(false)
      if (error) { toast({ variant: "destructive", title: "Couldn't create event", description: error.message }); return }
      setShowCreate(false)
      toast({ title: form.status === "upcoming" ? "Event published" : "Event saved" })
    }
    setForm(EMPTY_FORM)
    loadEvents(bizId)
  }

  async function deleteEvent(id: string) {
    if (!bizId) return
    setDeletingId(id)
    const supabase = createClient()
    const { error } = await (supabase as any).from("business_events").delete().eq("id", id)
    setDeletingId(null)
    if (error) { toast({ variant: "destructive", title: "Couldn't delete event", description: error.message }); return }
    setEvents(prev => prev.filter(e => e.id !== id))
    toast({ title: "Event deleted" })
  }

  async function markCompleted(ev: BusinessEvent) {
    if (!bizId) return
    const supabase = createClient()
    const { error } = await (supabase as any).from("business_events").update({ status: "completed" }).eq("id", ev.id)
    if (error) { toast({ variant: "destructive", title: "Update failed", description: error.message }); return }
    setEvents(prev => prev.map(e => e.id === ev.id ? { ...e, status: "completed" } : e))
    toast({ title: "Marked as completed" })
  }

  function openEdit(ev: BusinessEvent) {
    setForm({
      title: ev.title, event_type: ev.event_type ?? "In-Store Event",
      event_date: ev.event_date, event_time: ev.event_time ?? "",
      location: ev.location ?? "", description: ev.description ?? "",
      status: ev.status,
    })
    setEditingEvent(ev)
  }

  const upcoming = events.filter(e => e.status === "upcoming").length
  const totalAttendees = events.reduce((s, e) => s + (e.attendees ?? 0), 0)

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  const EventForm = () => (
    <div className="space-y-4 pt-2">
      <div className="space-y-2">
        <Label className="font-black text-xs uppercase tracking-widest">Event Title *</Label>
        <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
          placeholder="e.g. Eid Grand Sale, Halal Tasting Day"
          className="h-12 rounded-2xl bg-muted border-none font-bold" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label className="font-black text-xs uppercase tracking-widest">Type</Label>
          <select value={form.event_type} onChange={e => setForm(f => ({ ...f, event_type: e.target.value }))}
            className="w-full h-12 rounded-2xl bg-muted border-none font-bold px-3 text-sm text-foreground">
            {EVENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <Label className="font-black text-xs uppercase tracking-widest">Status</Label>
          <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
            className="w-full h-12 rounded-2xl bg-muted border-none font-bold px-3 text-sm text-foreground">
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label className="font-black text-xs uppercase tracking-widest">Date *</Label>
          <Input type="date" value={form.event_date} onChange={e => setForm(f => ({ ...f, event_date: e.target.value }))}
            className="h-12 rounded-2xl bg-muted border-none font-bold" />
        </div>
        <div className="space-y-2">
          <Label className="font-black text-xs uppercase tracking-widest">Time</Label>
          <Input type="time" value={form.event_time} onChange={e => setForm(f => ({ ...f, event_time: e.target.value }))}
            className="h-12 rounded-2xl bg-muted border-none font-bold" />
        </div>
      </div>
      <div className="space-y-2">
        <Label className="font-black text-xs uppercase tracking-widest">Location / Venue</Label>
        <Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
          placeholder="e.g. In-store, Community Hall, Online"
          className="h-12 rounded-2xl bg-muted border-none font-bold" />
      </div>
      <div className="space-y-2">
        <Label className="font-black text-xs uppercase tracking-widest">Description</Label>
        <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          placeholder="Describe your event..."
          className="min-h-[100px] rounded-2xl bg-muted border-none font-medium resize-none" />
      </div>
      <Button disabled={saving || !form.title.trim() || !form.event_date}
        className="w-full h-12 rounded-2xl font-black bg-primary hover:bg-primary/90 text-white"
        onClick={saveEvent}>
        {saving ? "Saving…" : (editingEvent ? "Save Changes" : "Publish Event")}
      </Button>
    </div>
  )

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Calendar className="h-3 w-3" /> Events & Promotions
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Events & Promotions</h1>
          <p className="text-muted-foreground font-medium">Create in-store events, seasonal promotions, and community days to drive footfall.</p>
        </div>
        <Button onClick={() => { setForm(EMPTY_FORM); setEditingEvent(null); setShowCreate(true) }}
          className="bg-primary rounded-full px-8 font-black shadow-lg shadow-primary/20 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Create Event
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="rounded-[2rem] border-none shadow-sm bg-primary text-primary-foreground p-6 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Total Events</p>
          <p className="text-4xl font-black tracking-tighter">{events.length}</p>
        </Card>
        <Card className="rounded-[2rem] border-none shadow-sm bg-amber-50 dark:bg-amber-950/20 p-6 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-400">Upcoming</p>
          <p className="text-4xl font-black tracking-tighter text-amber-700 dark:text-amber-400">{upcoming}</p>
        </Card>
        <Card className="rounded-[2rem] border-none shadow-sm bg-card p-6 space-y-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Total Attendees</p>
          <p className="text-4xl font-black tracking-tighter text-foreground">{totalAttendees}</p>
        </Card>
      </div>

      <div className="space-y-4">
        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground px-1">{events.length} event{events.length !== 1 ? "s" : ""}</p>

        {events.length === 0 ? (
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-16 text-center space-y-3">
            <Calendar className="h-10 w-10 text-muted-foreground/30 mx-auto" />
            <p className="font-black text-foreground">No events yet</p>
            <p className="text-sm text-muted-foreground">Create your first event to start attracting customers.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {events.map(ev => (
              <Card key={ev.id} className="rounded-[2rem] border-none shadow-sm bg-card">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div className="space-y-1.5 min-w-0">
                        <p className="font-black text-foreground leading-tight">{ev.title}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-muted-foreground">
                          {ev.event_type && (
                            <Badge className="bg-primary/10 text-primary border-none font-black text-[9px] uppercase">
                              {ev.event_type}
                            </Badge>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />{formatDate(ev.event_date)}
                            {ev.event_time && ` · ${ev.event_time}`}
                          </span>
                          {ev.attendees > 0 && (
                            <span className="flex items-center gap-1"><Users className="h-3 w-3" />{ev.attendees} attended</span>
                          )}
                        </div>
                        {ev.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">{ev.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge className={`text-[9px] font-black uppercase border-none ${STATUS_STYLES[ev.status] ?? "bg-muted text-muted-foreground"}`}>
                        {ev.status}
                      </Badge>
                      <Button variant="ghost" size="icon" onClick={() => openEdit(ev)} className="rounded-xl h-9 w-9">
                        <Edit2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon"
                        className="rounded-xl h-9 w-9 hover:text-red-600"
                        disabled={deletingId === ev.id}
                        onClick={() => deleteEvent(ev.id)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                  {ev.status === "upcoming" && (
                    <Button size="sm" variant="outline"
                      className="h-8 rounded-xl text-xs font-black border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-400"
                      onClick={() => markCompleted(ev)}>
                      <CheckCircle2 className="h-3.5 w-3.5 mr-1.5" /> Mark as Completed
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={showCreate} onOpenChange={open => { setShowCreate(open); if (!open) setForm(EMPTY_FORM) }}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Create Event</DialogTitle>
            <DialogDescription>Add a new event or promotion for your business.</DialogDescription>
          </DialogHeader>
          <EventForm />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingEvent} onOpenChange={open => { if (!open) { setEditingEvent(null); setForm(EMPTY_FORM) } }}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Edit Event</DialogTitle>
            <DialogDescription>Update your event details.</DialogDescription>
          </DialogHeader>
          <EventForm />
        </DialogContent>
      </Dialog>
    </div>
  )
}
