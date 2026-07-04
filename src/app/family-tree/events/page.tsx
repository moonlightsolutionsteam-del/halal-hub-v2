"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar, Plus, Search, Filter,
  Clock, MapPin, Users, Info,
  ChevronRight, ArrowLeft, MoreVertical,
  Bell, BellOff, MapIcon, Sparkles,
  Zap, CheckCircle2
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function FamilyEventsPage() {
  const events = [
    { id: 1, title: "Family Dinner Plan", date: "Tonight, 7:30 PM", loc: "The Halal Grill", type: "Dining", attending: 4, reminder: true },
    { id: 2, title: "Weekend Grocery Run", date: "Saturday, 10 AM", loc: "Amanah Hypermarket", type: "Shopping", attending: 2, reminder: false },
    { id: 3, title: "Aqiqah Celebration", date: "Oct 24, 1 PM", loc: "Grand Hall Venue", type: "Ceremony", attending: 12, reminder: true },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-5xl pb-24 text-foreground">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-emerald-600 transition-colors w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Hub
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
              <Calendar className="h-6 w-6" />
            </div>
            <h1 className="text-xl sm:text-3xl font-black font-headline">Family Events</h1>
          </div>
          <p className="text-muted-foreground font-medium">Coordinate outings, dinners, and special occasions with ease.</p>
        </div>
        <Link href="/family-tree/events/create">
          <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-8 font-black shadow-lg shadow-emerald-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Create Event
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card group hover:shadow-xl transition-all border-2 border-transparent hover:border-emerald-100">
            <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-8 flex-1">
                <div className="h-20 w-20 rounded-[2rem] bg-muted flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform shadow-inner shrink-0">
                  <Calendar className="h-10 w-10 opacity-40" />
                </div>
                <div className="space-y-2 min-w-0">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none text-[9px] font-black uppercase tracking-tighter">{event.type}</Badge>
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {event.date}</span>
                  </div>
                  <h3 className="text-2xl font-black text-foreground tracking-tight leading-tight truncate">{event.title}</h3>
                  <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                    <MapPin className="h-4 w-4 text-emerald-500" /> {event.loc}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-12 w-full md:w-auto border-t md:border-t-0 pt-6 md:pt-0">
                <div className="text-center md:text-right">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Attending</p>
                  <div className="flex items-center gap-2 justify-center md:justify-end">
                    <Users className="h-4 w-4 text-emerald-600" />
                    <span className="text-xl font-black text-foreground">{event.attending}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="rounded-xl h-12 w-12 border">
                    {event.reminder ? <Bell className="h-5 w-5 text-emerald-600 fill-current" /> : <BellOff className="h-5 w-5 text-muted-foreground" />}
                  </Button>
                  <Button className="rounded-xl h-12 px-8 font-black uppercase text-[10px] tracking-widest bg-emerald-600 text-white shadow-lg">View Details</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2.5rem] border-none bg-emerald-50 p-10 flex flex-col md:flex-row items-center justify-between gap-8 border-2 border-emerald-100">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-black text-emerald-900">Need inspiration?</h3>
          <p className="text-sm font-medium text-emerald-800/70 italic">Discover nearby family-friendly halal venues for your next outing.</p>
        </div>
        <Link href="/family-tree/discovery">
          <Button variant="secondary" className="rounded-2xl h-14 px-10 font-black uppercase text-xs tracking-widest bg-card text-emerald-600 shadow-sm border-none">Browse Suggestions <Sparkles className="ml-2 h-4 w-4" /></Button>
        </Link>
      </Card>
    </div>
  );
}
