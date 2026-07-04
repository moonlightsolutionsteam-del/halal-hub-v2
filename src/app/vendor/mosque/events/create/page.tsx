"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function CreateMosqueEventPage() {
  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <Link href="/vendor/mosque/events" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
        <ArrowLeft className="h-4 w-4" />Back to Events
      </Link>
      <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Create Event</h1>

      <Card className="rounded-[2rem] border-none shadow-soft">
        <CardHeader><CardTitle className="text-lg font-black">Event Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="event-title">Event Title</Label>
            <Input id="event-title" placeholder="e.g., Eid al-Fitr Prayer" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event-date">Date</Label>
              <Input id="event-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-time">Time</Label>
              <Input id="event-time" type="time" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-location">Location</Label>
            <Input id="event-location" placeholder="e.g., Main Hall" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-desc">Description</Label>
            <Textarea id="event-desc" placeholder="Tell the community about this event..." className="min-h-[100px]" />
          </div>
          <Button className="w-full rounded-full h-12 font-bold">Publish Event</Button>
        </CardContent>
      </Card>
    </div>
  )
}
