"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Calendar, MapPin, Users } from "lucide-react"
import Link from "next/link"

const events = [
  { title: "Annual Fundraising Gala", date: "Apr 5, 2026", location: "Community Hall", attendees: 400, status: "Upcoming" },
  { title: "Volunteer Orientation", date: "Every 2nd Saturday", location: "Main Office", attendees: 30, status: "Recurring" },
  { title: "Orphan Sponsorship Drive", date: "Mar 25, 2026", location: "Online", attendees: 150, status: "Upcoming" },
]

export default function OrganizationEventsPage() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Events</h1>
          <p className="text-sm font-bold text-muted-foreground">Manage your organization&apos;s events and drives.</p>
        </div>
        <Link href="/vendor/organization/events/create">
          <Button className="rounded-full"><PlusCircle className="h-4 w-4 mr-2" />Create Event</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
