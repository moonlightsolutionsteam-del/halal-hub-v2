// @ts-nocheck
import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Clock, Ticket, ArrowRight, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Halal Events — HalalHub",
  description: "Browse Islamic and halal-friendly events happening near you — exhibitions, seminars, celebrations and community gatherings.",
}

type EventRow = {
  id: string
  title: string
  event_type: string | null
  event_date: string
  event_time: string | null
  location: string | null
  description: string | null
  attendees: number | null
  status: string | null
  business: { id: string; name: string; image_url: string | null } | null
}

export default async function EventsPage() {
  const supabase = await createClient()

  const { data } = await supabase
    .from("business_events")
    .select("id, title, event_type, event_date, event_time, location, description, attendees, status, business:businesses(id, name, image_url)")
    .eq("status", "upcoming")
    .gte("event_date", new Date().toISOString().split("T")[0])
    .order("event_date", { ascending: true })
    .limit(24)

  const events: EventRow[] = data ?? []

  return (
    <div className="container mx-auto p-4 space-y-4 sm:space-y-8 md:p-8 max-w-7xl">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-4xl font-black font-headline text-primary tracking-tight">Halal Events</h1>
        <p className="text-muted-foreground font-medium text-sm sm:text-lg">Find seminars, festivals, and community gatherings near you.</p>
      </div>

      {events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
          <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center">
            <Calendar className="h-10 w-10 text-primary" />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-black text-foreground">No upcoming events</p>
            <p className="text-muted-foreground font-medium">Check back soon — vendors are adding events regularly.</p>
          </div>
          <Link href="/vendor/engagement/events">
            <Button className="bg-primary text-white rounded-full px-8 font-bold h-12">
              Post Your Event
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
          {events.map(event => {
            const dateStr = new Date(event.event_date).toLocaleDateString([], { month: "short", day: "numeric" })
            const bizImage = event.business?.image_url
            return (
              <Card key={event.id} className="overflow-hidden flex flex-col group rounded-xl sm:rounded-[2.5rem] border-none shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="relative aspect-square sm:aspect-[16/9] bg-muted">
                  {bizImage ? (
                    <Image
                      src={bizImage}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
                      <Calendar className="h-12 w-12 text-primary/30" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                    <Badge className="bg-card/90 backdrop-blur-md text-primary font-black shadow-lg border-none px-2 py-0.5 sm:px-4 sm:py-1 rounded-full text-[9px] sm:text-[10px] uppercase tracking-widest">
                      {event.event_type ?? "Event"}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-3 pb-1 sm:p-6 sm:pb-2">
                  <CardTitle className="text-xs sm:text-2xl font-black group-hover:text-primary transition-colors leading-tight line-clamp-2">{event.title}</CardTitle>
                  {event.business?.name && (
                    <p className="text-[9px] sm:text-xs text-muted-foreground font-bold mt-0.5">by {event.business.name}</p>
                  )}
                  <CardDescription className="flex items-center gap-1 sm:gap-1.5 pt-1 sm:pt-2 font-bold text-muted-foreground uppercase text-[9px] sm:text-[10px] tracking-widest">
                    <CalendarDays className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary shrink-0" />
                    {dateStr}{event.event_time ? ` · ${event.event_time}` : ""}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-3 pb-2 pt-0 sm:p-6 sm:pt-0 flex-1 space-y-1 sm:space-y-3">
                  {event.location && (
                    <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm font-bold text-muted-foreground">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 text-primary" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  )}
                  {event.attendees !== null && event.attendees > 0 && (
                    <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-sm font-bold text-muted-foreground">
                      <Clock className="h-3 w-3 sm:h-4 sm:w-4 shrink-0 text-primary" />
                      {event.attendees} attending
                    </div>
                  )}
                </CardContent>
                <CardFooter className="p-2 sm:p-6 border-t bg-muted/50">
                  <Link href={event.business?.id ? `/entities/${event.business.id}` : "#"} className="w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90 rounded-lg sm:rounded-2xl h-8 sm:h-12 font-black uppercase text-[10px] sm:text-xs tracking-widest shadow-lg shadow-primary/20 transition-all active:scale-95">
                      View <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}

      <section className="bg-zinc-900 rounded-[3rem] p-12 text-center space-y-8 mt-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Ticket className="h-64 w-64 text-primary" />
        </div>
        <div className="max-w-2xl lg:max-w-5xl mx-auto space-y-4 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-black font-headline text-white tracking-tight">Hosting an Event?</h2>
          <p className="text-muted-foreground font-medium text-lg leading-relaxed">
            Get your event listed on HalalHub and reach thousands of community members. Manage bookings and check-ins from your vendor dashboard.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link href="/vendor/engagement/events">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 px-10 font-black uppercase text-xs tracking-widest shadow-2xl">
                Post Your Event
              </Button>
            </Link>
            <Link href="/partner/onboarding/business/category">
              <Button variant="outline" className="border-white/20 text-white hover:bg-card/10 rounded-2xl h-14 px-10 font-black uppercase text-xs tracking-widest">
                Join as Vendor
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
