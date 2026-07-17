"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

export default function CreateOrganizationEventPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [title, setTitle] = React.useState("")
  const [date, setDate] = React.useState("")
  const [time, setTime] = React.useState("")
  const [location, setLocation] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  async function handlePublish() {
    if (!user?.uid || !title.trim()) return
    setSubmitting(true)
    const lines = []
    if (date) lines.push(`Date: ${date}`)
    if (time) lines.push(`Time: ${time}`)
    if (location) lines.push(`Location: ${location}`)
    const content = [...lines, "", description.trim()].join("\n").trim()
    const supabase = createClient()
    await (supabase as any)
      .from("community_posts")
      .insert({ title: title.trim(), content, category: "event", author_id: user.uid })
    setSubmitting(false)
    router.back()
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <Link href="/vendor/organization/events" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
        <ArrowLeft className="h-4 w-4" />Back to Events
      </Link>
      <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Create Event</h1>

      <Card className="rounded-[2rem] border-none shadow-soft">
        <CardHeader><CardTitle className="text-lg font-black">Event Details</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="event-title">Event Title</Label>
            <Input id="event-title" placeholder="e.g., Annual Fundraising Gala" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event-date">Date</Label>
              <Input id="event-date" type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-time">Time</Label>
              <Input id="event-time" type="time" value={time} onChange={e => setTime(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-location">Location</Label>
            <Input id="event-location" placeholder="e.g., Community Hall" value={location} onChange={e => setLocation(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-desc">Description</Label>
            <Textarea id="event-desc" placeholder="Tell the community about this event..." className="min-h-[100px]" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <Button className="w-full rounded-full h-12 font-bold" onClick={handlePublish} disabled={submitting || !title.trim()}>
            {submitting ? "Publishing…" : "Publish Event"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
