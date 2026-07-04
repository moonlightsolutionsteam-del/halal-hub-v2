"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Plus, Users, MapPin, Clock, CheckCircle2 } from "lucide-react"

const EVENTS = [
  { id: 1, title: "Eid al-Adha Grand Sale", type: "Promotion", date: "9 Jun 2026", attendees: 0, status: "Upcoming" },
  { id: 2, title: "Halal Meat Tasting Day", type: "In-Store Event", date: "14 May 2026", attendees: 64, status: "Completed" },
  { id: 3, title: "Ramadan Night Market", type: "Community", date: "28 Mar 2026", attendees: 142, status: "Completed" },
]

export default function EngagementEventsPage() {
  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Calendar className="h-3 w-3" /> Events & Promotions
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Events & Promotions</h1>
          <p className="text-sm font-bold text-muted-foreground">Create in-store events, seasonal promotions, and community days to drive footfall.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-2xl px-8 font-black h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Create Event
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: "Total Events", value: "3", icon: Calendar, color: "bg-primary/10 text-primary" },
          { label: "Total Attendees", value: "206", icon: Users, color: "bg-emerald-50 text-emerald-600" },
          { label: "Upcoming", value: "1", icon: Clock, color: "bg-amber-50 text-amber-600" },
        ].map((s) => (
          <Card key={s.label} className="rounded-[2rem] border-none shadow-sm bg-card p-6">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${s.color}`}><s.icon className="h-5 w-5" /></div>
              <div><p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{s.label}</p><p className="text-2xl font-black">{s.value}</p></div>
            </div>
          </Card>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-black flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" /> Your Events
        </h2>
        <div className="space-y-4">
          {EVENTS.map((event) => (
            <Card key={event.id} className="rounded-[2rem] border-none shadow-sm bg-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-foreground">{event.title}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-muted-foreground">
                      <Badge className="bg-primary/10 text-primary border-none font-black text-[10px]">{event.type}</Badge>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{event.date}</span>
                      {event.attendees > 0 && <span className="flex items-center gap-1"><Users className="h-3 w-3" />{event.attendees} attended</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge className={`font-black text-[10px] border-none ${event.status === "Upcoming" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}>{event.status}</Badge>
                  <Button variant="outline" size="sm" className="rounded-xl font-black text-xs h-9 border-2 border-primary/20 text-primary hover:bg-primary/5">Edit</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-black flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" /> Create New Event
        </h2>
        <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Event Title</Label>
              <Input placeholder="e.g., Eid Grand Sale, Tasting Day" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Event Date</Label>
              <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Time</Label>
              <Input type="time" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Location / Venue</Label>
              <Input placeholder="e.g., In-store, Community Hall, Online" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label className="font-black text-xs uppercase text-muted-foreground tracking-widest">Description</Label>
              <Textarea placeholder="Describe your event..." className="min-h-[100px] rounded-2xl bg-muted border-none p-4 font-medium" />
            </div>
          </div>
          <Button className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-sm tracking-widest">
            Publish Event
          </Button>
        </Card>
      </section>
    </div>
  )
}
