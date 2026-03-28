"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, Search, Filter, Clock, 
  CheckCircle2, XCircle, Info, MapPin, 
  Sparkles, Star, ChevronRight, MoreVertical,
  Plus, Share2
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

const SUGGESTIONS = [
  { 
    id: "s1", 
    name: "The Halal Grill & Bistro", 
    status: "ADDED TO HUB", 
    statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    date: "Oct 12, 2023", 
    points: "+50 Points",
    img: "food1",
    location: "Brooklyn, NY",
    type: "Restaurant"
  },
  { 
    id: "s2", 
    name: "Istanbul Spice Market", 
    status: "VERIFICATION IN PROGRESS", 
    statusColor: "bg-blue-50 text-blue-600 border-blue-100",
    date: "Oct 24, 2023", 
    info: "Our team is verifying certificates",
    img: "cat2",
    location: "Manhattan, NY",
    type: "Grocery"
  },
  { 
    id: "s3", 
    name: "Al-Noor Islamic Center", 
    status: "REJECTED", 
    statusColor: "bg-red-50 text-red-600 border-red-100",
    date: "Sept 15, 2023", 
    info: "Insufficient documentation provided",
    img: "mosque1",
    location: "Queens, NY",
    type: "Mosque"
  },
  { 
    id: "s4", 
    name: "Global Halal Expo", 
    status: "ADDED TO HUB", 
    statusColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    date: "Jan 10, 2024", 
    points: "+100 Points",
    img: "event1",
    location: "Jersey City, NJ",
    type: "Event"
  }
];

export default function MySuggestionsPage() {
  return (
    <div className="min-h-screen bg-[#FBFBFB] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b px-6 h-20 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-6">
          <Link href="/account/dashboard">
            <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-slate-50 border shadow-sm h-12 w-12">
              <ArrowLeft className="h-5 w-5 text-slate-600" />
            </Button>
          </Link>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black font-headline text-slate-900 tracking-tight">My Suggestions</h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Community Contributions</p>
          </div>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-12 px-8 font-black uppercase text-xs tracking-widest shadow-lg shadow-emerald-200">
          <Plus className="h-4 w-4 mr-2" /> Suggest New
        </Button>
      </header>

      <div className="container mx-auto max-w-4xl px-6 py-10 space-y-10">
        {/* Stats Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Total Submitted", value: "24", icon: MapPin, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Verified Hubs", value: "18", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Contribution Pts", value: "850", icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
          ].map((stat, i) => (
            <Card key={i} className="rounded-[2rem] border-none shadow-sm bg-white p-6 flex items-center gap-6 group hover:shadow-md transition-all">
              <div className={`h-14 w-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform`}>
                <stat.icon className="h-7 w-7" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2.5rem] shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input placeholder="Search your suggestions..." className="pl-12 h-14 rounded-2xl bg-slate-50 border-none font-medium text-lg" />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
            {["All", "Verified", "Pending", "Archived"].map((f, i) => (
              <Badge 
                key={f} 
                variant={i === 0 ? "default" : "outline"} 
                className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest cursor-pointer transition-all ${i === 0 ? 'bg-emerald-600 border-none' : 'border-slate-100 text-slate-400 hover:bg-slate-50'}`}
              >
                {f}
              </Badge>
            ))}
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl border shadow-sm shrink-0">
              <Filter className="h-5 w-5 text-slate-400" />
            </Button>
          </div>
        </div>

        {/* List */}
        <div className="grid grid-cols-1 gap-6">
          {SUGGESTIONS.map((suggestion) => (
            <Card key={suggestion.id} className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden group hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-emerald-100">
              <div className="p-8 flex flex-col md:flex-row gap-8 items-start">
                <div className="relative h-32 w-full md:w-32 rounded-[2rem] overflow-hidden shrink-0 shadow-lg">
                  <Image 
                    src={`https://picsum.photos/seed/${suggestion.img}/400/400`} 
                    alt={suggestion.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="flex-1 space-y-4 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge className={`${suggestion.statusColor} border-none font-black text-[9px] uppercase tracking-[0.15em] h-6 px-3`}>
                          {suggestion.status}
                        </Badge>
                        <Badge variant="outline" className="border-slate-100 text-slate-400 font-black text-[9px] uppercase tracking-tighter h-6 px-2">
                          {suggestion.type}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-emerald-600 transition-colors">{suggestion.name}</h3>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-50"><Share2 className="h-4 w-4 text-slate-400" /></Button>
                      <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-50"><MoreVertical className="h-4 w-4 text-slate-400" /></Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      <MapPin className="h-3.5 w-3.5 text-emerald-500" /> {suggestion.location}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                      <Clock className="h-3.5 w-3.5 text-blue-500" /> Submitted: {suggestion.date}
                    </div>
                    {suggestion.points && (
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-600 tracking-widest">
                        <Sparkles className="h-3.5 w-3.5" /> {suggestion.points}
                      </div>
                    )}
                  </div>

                  {suggestion.info && (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                      <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-xs font-medium text-slate-500 italic leading-relaxed">
                        "{suggestion.info}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <CardFooter className="bg-slate-50/50 p-6 flex justify-end border-t border-slate-50">
                <Button variant="link" className="text-xs font-black uppercase tracking-widest text-emerald-600 p-0 h-auto group-hover:gap-2 transition-all">
                  View Public Profile <ChevronRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">End of History</p>
          <Button variant="outline" className="rounded-full px-12 font-black border-2 h-14 hover:bg-slate-50 transition-all">Load More History</Button>
        </div>
      </div>
    </div>
  );
}
