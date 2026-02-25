
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Search, Filter, Clock, 
  MapPin, Users, Phone, ArrowUpRight,
  ChevronRight, CalendarDays, Plus, CheckCircle2,
  Printer, MoreVertical, Eye, Briefcase
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function CateringBookingsPage() {
  const events = [
    { id: "EVT-CAT-101", customer: "Sarah Abdullah", type: "Nikah Ceremony", date: "Nov 15, 2024", guests: 350, status: "Confirmed", location: "Grand Hall, Manhattan" },
    { id: "EVT-CAT-102", customer: "TechCorp Inc.", type: "Product Launch", date: "Nov 22, 2024", guests: 150, status: "Contract Sent", location: "Jersey City Office" },
    { id: "EVT-CAT-103", customer: "Omar Farooq", type: "Aqiqah Celebration", date: "Nov 30, 2024", guests: 80, status: "Pending Payment", location: "Private Residence" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px]">
            <Calendar className="h-3 w-3" /> Event Pipeline
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Event Bookings</h1>
          <p className="text-muted-foreground font-medium">Manage your event calendar, confirmed bookings, and preparation schedules.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <Printer className="mr-2 h-4 w-4" /> Weekly Prep List
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 font-black shadow-lg shadow-blue-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Manual Booking
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Confirmed Events", value: "12", icon: CalendarDays, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Pending Contracts", value: "5", icon: Briefcase, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Total Guests", value: "2.4k", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Audit Readiness", value: "Active", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-sm p-6 bg-white flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
        <CardHeader className="p-8 border-b flex flex-col md:flex-row items-center justify-between gap-4">
          <CardTitle className="text-xl font-black">Booking Registry</CardTitle>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Customer..." className="pl-9 h-11 rounded-2xl bg-slate-50 border-none font-medium" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Date / ID</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Customer & Event</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Location</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Pax</TableHead>
                <TableHead className="h-14 text-right px-8 font-black text-[10px] uppercase tracking-widest text-slate-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="px-8 py-5">
                    <div className="font-black text-slate-900 text-sm">{event.date}</div>
                    <div className="text-[9px] font-bold text-muted-foreground uppercase">{event.id}</div>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-slate-800">{event.customer}</p>
                    <p className="text-[10px] font-black text-blue-600 uppercase">{event.type}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 italic">
                      <MapPin className="h-3 w-3" /> {event.location}
                    </div>
                  </TableCell>
                  <TableCell className="font-black text-slate-900">{event.guests}</TableCell>
                  <TableCell className="text-right px-8">
                    <Badge variant="outline" className={
                      event.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 font-black text-[9px] px-3' : 
                      event.status === 'Pending Payment' ? 'bg-amber-50 text-amber-600 border-amber-200 font-black text-[9px] px-3' : 
                      'bg-blue-50 text-blue-600 border-blue-200 font-black text-[9px] px-3'
                    }>
                      {event.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
