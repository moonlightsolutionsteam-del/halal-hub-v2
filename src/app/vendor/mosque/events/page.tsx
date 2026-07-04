"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"

const events = [
  { title: "Friday Jummah Khutbah", date: "Every Friday", location: "Main Hall", attendees: 250, status: "Recurring" },
  { title: "Eid al-Fitr Prayer", date: "Mar 30, 2026", location: "Main Hall & Courtyard", attendees: 800, status: "Upcoming" },
  { title: "Weekly Tafsir Circle", date: "Every Sunday", location: "Community Room", attendees: 45, status: "Recurring" },
  { title: "Youth Islamic Quiz Night", date: "Apr 12, 2026", location: "Community Hall", attendees: 60, status: "Upcoming" },
]

export default function MosqueEventsPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Events</h1>
          <p className="text-sm font-bold text-muted-foreground">Manage prayers, gatherings, and community programs.</p>
        </div>
        <Link href="/vendor/mosque/events/create">
          <Button className="rounded-full"><PlusCircle className="h-4 w-4 mr-2" />Create Event</Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {events.map((event, i) => (
          <Card key={i} className="rounded-[2rem] border-none shadow-soft">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-base font-black text-foreground">{event.title}</h3>
                <Badge variant="secondary" className="shrink-0">{event.status}</Badge>
              </div>
              <div className="space-y-1.5 text-sm text-muted-foreground font-medium">
                <div className="flex items-center gap-2"><Calendar className="h-4 w-4" />{event.date}</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />{event.location}</div>
                <div className="flex items-center gap-2"><Users className="h-4 w-4" />{event.attendees} expected</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
