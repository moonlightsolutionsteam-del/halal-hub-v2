
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Search, Filter, CheckCircle2, 
  SmartphoneNfc, ArrowUpRight, LayoutGrid,
  MoreVertical, UserPlus, ShieldCheck, Zap,
  Ticket
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function VenueAttendeesPage() {
  const attendees = [
    { id: 1, name: "Ibrahim Malik", event: "Nikah Gala", status: "Checked-in", time: "10 mins ago", type: "VIP Guest" },
    { id: 2, name: "Sara Abdullah", event: "Nikah Gala", status: "Confirmed", time: "Pending", type: "Guest" },
    { id: 3, name: "Sami Sheikh", event: "Islamic Expo", status: "Checked-in", time: "1h ago", type: "Exhibitor" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-purple-600 font-black uppercase tracking-widest text-[10px]">
            <Ticket className="h-3 w-3" /> Live Check-in
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Event Attendees</h1>
          <p className="text-muted-foreground font-medium">Monitor live event entries, manage guest lists, and issue digital passes.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            Export Registry
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-8 font-black shadow-lg shadow-purple-200 h-12 text-white">
            <SmartphoneNfc className="mr-2 h-4 w-4" /> Launch Scan App
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex items-center gap-6">
          <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">Total Checked In</p>
            <p className="text-3xl font-black text-foreground">452</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex items-center gap-6">
          <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
            <Users className="h-7 w-7" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">Total Guests Expected</p>
            <p className="text-3xl font-black text-foreground">1,250</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 flex items-center gap-6 relative overflow-hidden">
          <Zap className="absolute -top-4 -right-4 h-24 w-24 opacity-10 text-purple-600" />
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">Live Entry Flow</p>
            <p className="text-3xl font-black text-white">+8 / min</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {attendees.map((a) => (
          <Card key={a.id} className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden border-2 border-transparent hover:border-purple-100 transition-all group">
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-12 w-12 border-2 border-border shadow-sm">
                  <AvatarImage src={`https://picsum.photos/seed/att-${a.id}/100/100`} />
                  <AvatarFallback>{a.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-black text-foreground leading-tight">{a.name}</p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[9px] font-black uppercase border-purple-200 text-purple-600 bg-purple-50">
                      {a.type}
                    </Badge>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">• {a.event}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-10">
                <div className="text-center md:text-right">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Presence</p>
                  <Badge className={
                    a.status === 'Checked-in' ? 'bg-emerald-50 text-emerald-600 border-none font-black text-[9px] px-3' : 'bg-muted text-muted-foreground border-none font-black text-[9px] px-3'
                  }>
                    {a.status}
                  </Badge>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Log Time</p>
                  <p className="text-sm font-black text-foreground">{a.time}</p>
                </div>
                <Button variant="ghost" size="icon" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical className="h-5 w-5 text-muted-foreground" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
