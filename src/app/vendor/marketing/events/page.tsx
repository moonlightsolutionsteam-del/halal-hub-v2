
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Plus, MapPin, Users, 
  Clock, Star, Share2, MoreVertical,
  ChevronRight, ArrowUpRight, CheckCircle2,
  Trophy, Sparkles
} from "lucide-react";
import Image from "next/image";

export default function MarketingEventsPage() {
  const events = [
    { id: 1, title: "Community Iftar Night", date: "Apr 12, 2024", guests: "85/100", status: "Active", type: "Community", img: "https://picsum.photos/seed/iftar/800/400" },
    { id: 2, title: "Halal BBQ Workshop", date: "May 05, 2024", guests: "12/20", status: "Draft", type: "Workshop", img: "https://picsum.photos/seed/bbq/800/400" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Calendar className="h-3 w-3" /> Event Management
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Business Events</h1>
          <p className="text-muted-foreground font-medium">Create and host community gatherings, workshops, and festive celebrations.</p>
        </div>
        <Button className="bg-primary rounded-full px-8 font-black shadow-lg shadow-primary/20 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Create New Event
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex items-center gap-6">
          <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Calendar className="h-7 w-7" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">Upcoming</p>
            <p className="text-3xl font-black text-foreground">3 Events</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex items-center gap-6">
          <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Users className="h-7 w-7" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">RSVPs Received</p>
            <p className="text-3xl font-black text-foreground">156</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 flex items-center gap-6 relative overflow-hidden">
          <div className="h-14 w-14 rounded-2xl bg-card/10 flex items-center justify-center text-primary relative z-10">
            <Trophy className="h-7 w-7" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">Event Reach</p>
            <p className="text-3xl font-black text-white">12.4k</p>
          </div>
          <Sparkles className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event) => (
          <Card key={event.id} className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 group border-2 border-transparent hover:border-primary/10">
            <div className="relative aspect-video">
              <Image src={event.img} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <Badge className="absolute top-6 left-6 bg-card/90 backdrop-blur-md text-foreground font-black border-none uppercase text-[10px] tracking-widest">{event.type}</Badge>
              <div className="absolute bottom-6 left-6">
                <Badge className={event.status === 'Active' ? 'bg-emerald-500 text-white border-none' : 'bg-muted0 text-white border-none'}>
                  {event.status}
                </Badge>
              </div>
            </div>
            <CardHeader className="p-8">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-black text-foreground tracking-tight">{event.title}</h3>
                <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="h-5 w-5 text-muted-foreground" /></Button>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  <Calendar className="h-4 w-4 text-primary" /> {event.date}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                  <Users className="h-4 w-4 text-primary" /> {event.guests} Booked
                </div>
              </div>
            </CardHeader>
            <CardFooter className="px-8 pb-8 pt-0 gap-3">
              <Button className="flex-1 bg-primary text-white rounded-xl h-12 font-black text-xs uppercase tracking-widest">Manage Attendees</Button>
              <Button variant="outline" className="rounded-xl h-12 px-6 font-bold border-2">Edit</Button>
            </CardFooter>
          </Card>
        ))}
        
        <button className="rounded-[2.5rem] border-4 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center p-12 text-center gap-4 hover:bg-card hover:border-primary/20 transition-all cursor-pointer group min-h-[300px]">
          <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Plus className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-xl text-foreground">Host New Event</p>
            <p className="text-sm text-muted-foreground font-medium max-w-[200px]">Promote your restaurant with community sessions.</p>
          </div>
        </button>
      </div>
    </div>
  );
}
