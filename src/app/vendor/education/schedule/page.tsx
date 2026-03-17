
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Clock, MapPin, Plus, 
  ChevronLeft, ChevronRight, MoreVertical,
  Printer, Grid, List, Search, User
} from "lucide-react";

export default function EducationSchedulePage() {
  const sessions = [
    { id: 1, time: "04:30 PM", subject: "Quranic Arabic", teacher: "Shaykh Omar", room: "Main Hall", status: "Live" },
    { id: 2, time: "05:15 PM", subject: "Islamic History", teacher: "Ustadha Fatima", room: "Room 202", status: "Starting Soon" },
    { id: 3, time: "06:00 PM", subject: "Fiqh Basics", teacher: "Ustadh Zaid", room: "Main Hall", status: "Scheduled" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <Calendar className="h-3 w-3" /> Academic Calendar
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Class Schedule</h1>
          <p className="text-muted-foreground font-medium">Manage daily class timings, exam dates, and teacher assignments.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <Printer className="mr-2 h-4 w-4" /> Print Daily Plan
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-700 rounded-full px-8 font-black shadow-lg shadow-violet-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add Session
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 border-b flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-4">
                <Button size="icon" variant="ghost" className="rounded-xl"><ChevronLeft className="h-5 w-5" /></Button>
                <CardTitle className="text-xl font-black">Nov 02, 2024</CardTitle>
                <Button size="icon" variant="ghost" className="rounded-xl"><ChevronRight className="h-5 w-5" /></Button>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="rounded-xl bg-white shadow-sm border font-bold h-10"><Grid className="h-4 w-4 mr-2" /> Grid</Button>
                <Button size="sm" variant="ghost" className="rounded-xl font-bold h-10"><List className="h-4 w-4 mr-2" /> List</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {sessions.map((s) => (
                  <div key={s.id} className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors group">
                    <div className="flex items-center gap-8">
                      <div className="text-center w-20 shrink-0">
                        <p className="text-sm font-black text-slate-900">{s.time}</p>
                        <Badge variant="secondary" className={
                          s.status === 'Live' ? 'bg-rose-50 text-rose-600 border-none animate-pulse px-2 text-[8px]' : 'bg-slate-100 text-slate-400 border-none px-2 text-[8px]'
                        }>
                          {s.status}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">{s.subject}</h3>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest"><User className="h-3.5 w-3.5 text-violet-500" /> {s.teacher}</span>
                          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest"><MapPin className="h-3.5 w-3.5 text-blue-500" /> {s.room}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical className="h-5 w-5 text-slate-300" /></Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-6">
            <h3 className="text-xl font-black">Room Availability</h3>
            <div className="space-y-4">
              {[
                { name: "Main Hall", status: "Occupied", pax: "45/50" },
                { name: "Room 202", status: "Starting Soon", pax: "12/20" },
                { name: "Seminar Room", status: "Available", pax: "0/15" },
              ].map((room, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <p className="text-sm font-bold">{room.name}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase">{room.status}</p>
                  </div>
                  <span className="text-xs font-black text-violet-400">{room.pax}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
