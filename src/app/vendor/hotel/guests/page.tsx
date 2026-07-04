
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Search, Filter, Star, 
  MessageSquare, ArrowUpRight,
  Zap, TrendingUp, CheckCircle2, Plus,
  MoreVertical, Phone, Mail, UserCircle
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function HotelGuestsPage() {
  const guests = [
    { id: 1, name: "Ibrahim Malik", loyalty: "Gold Member", stays: 12, rating: 4.9, status: "In-House" },
    { id: 2, name: "Sara Abdullah", loyalty: "Silver Member", stays: 5, rating: 4.8, status: "Checking Out" },
    { id: 3, name: "Zaid Ali", loyalty: "New Member", stays: 1, rating: 5.0, status: "Expected" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sky-600 font-black uppercase tracking-widest text-[10px]">
            <Users className="h-3 w-3" /> Guest Relations
          </div>
          <h1 className="text-3xl font-black font-headline text-foreground">Guest Registry</h1>
          <p className="text-muted-foreground font-medium">Manage your guest profiles, loyalty statuses, and historical stay data.</p>
        </div>
        <Button className="bg-sky-600 hover:bg-sky-700 rounded-full px-8 font-black shadow-lg shadow-sky-200 h-12 text-white">
          <Mail className="mr-2 h-4 w-4" /> Guest Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex items-center gap-6">
          <div className="h-14 w-14 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 shadow-inner">
            <Users className="h-7 w-7" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">Total Guests</p>
            <p className="text-3xl font-black text-foreground">1,240</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex items-center gap-6">
          <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
            <TrendingUp className="h-7 w-7" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">Returning Guests</p>
            <p className="text-3xl font-black text-foreground">42%</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 flex items-center gap-6 relative overflow-hidden">
          <div className="h-14 w-14 rounded-2xl bg-card/10 flex items-center justify-center text-sky-400 relative z-10">
            <Star className="h-7 w-7" />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">Elite Members</p>
            <p className="text-3xl font-black text-white">156</p>
          </div>
          <div className="absolute -top-4 -right-4 h-24 w-24 bg-sky-600/10 rounded-full blur-2xl" />
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2">
          <h2 className="text-xl font-black">Active Stay Guests</h2>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search guests..." className="pl-9 h-11 rounded-2xl bg-card border-none shadow-sm font-medium" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {guests.map((g) => (
            <Card key={g.id} className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden border-2 border-transparent hover:border-sky-100 transition-all group">
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-16 w-16 border-4 border-border shadow-md">
                    <AvatarImage src={`https://picsum.photos/seed/guest-${g.id}/150/150`} />
                    <AvatarFallback>{g.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-black text-foreground">{g.name}</p>
                      <Badge className={cn(
                        "text-[9px] font-black px-2 uppercase tracking-widest",
                        g.loyalty === 'Gold Member' ? 'bg-amber-50 text-amber-600 border-none' : 
                        g.loyalty === 'Silver Member' ? 'bg-muted text-muted-foreground border-none' : 'bg-sky-50 text-sky-600 border-none'
                      )}>
                        {g.loyalty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      <span>Total Stays: {g.stays}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {g.rating} Guest Rating</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-12">
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Presence</p>
                    <Badge variant="secondary" className="bg-sky-50 text-sky-600 border-none font-black text-[9px] uppercase px-3">{g.status}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="rounded-xl"><Phone className="h-4 w-4 text-muted-foreground" /></Button>
                    <Button variant="ghost" size="icon" className="rounded-xl"><MoreVertical className="h-4 w-4 text-muted-foreground" /></Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
