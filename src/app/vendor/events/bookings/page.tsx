
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

export default function EventBookingsPage() {
  const events = [
    { id: "EVT-8821", customer: "Sarah Abdullah", type: "Nikah Gala", date: "Nov 15, 2024", guests: 450, status: "Confirmed", deposit: "Paid" },
    { id: "EVT-8822", customer: "Global Halal Expo", type: "Exhibition", date: "Nov 22 - 24, 2024", guests: "2k+", status: "Preparation", deposit: "Paid" },
    { id: "EVT-8823", customer: "Zaid Ali", type: "Seminar", date: "Dec 01, 2024", guests: 120, status: "Pending Final", deposit: "Partial" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-purple-600 font-black uppercase tracking-widest text-[10px]">
            <Calendar className="h-3 w-3" /> Reservation Pipeline
          </div>
          <h1 className="text-3xl font-black font-headline text-foreground">Booking Calendar</h1>
          <p className="text-muted-foreground font-medium">Manage your venue's event schedule, hall assignments, and reservation statuses.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <Printer className="mr-2 h-4 w-4" /> Weekly Schedule
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-8 font-black shadow-lg shadow-purple-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add Manual Booking
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Bookings", value: "15", icon: CalendarDays, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Pending Signatures", value: "4", icon: Briefcase, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Hall Occupancy", value: "82%", icon: MapPin, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Trust Audits", value: "Pass", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-sm p-6 bg-card flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-foreground">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
        <CardHeader className="p-8 border-b flex flex-col md:flex-row items-center justify-between gap-4">
          <CardTitle className="text-xl font-black">Upcoming Event Registry</CardTitle>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search bookings..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Date / ID</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Client & Event</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Pax</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                <TableHead className="h-14 text-right px-8 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id} className="border-border hover:bg-muted/50 transition-colors group">
                  <TableCell className="px-8 py-5">
                    <div className="font-black text-foreground text-sm">{event.date}</div>
                    <div className="text-[9px] font-bold text-muted-foreground uppercase">{event.id}</div>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-foreground">{event.customer}</p>
                    <p className="text-[10px] font-black text-purple-600 uppercase">{event.type}</p>
                  </TableCell>
                  <TableCell className="font-black text-foreground">{event.guests}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      event.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                      event.status === 'Preparation' ? 'bg-blue-50 text-blue-600 border-blue-200' : 
                      'bg-amber-50 text-amber-600 border-amber-200'
                    }>
                      {event.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="rounded-xl"><Eye className="h-4 w-4 text-muted-foreground" /></Button>
                      <Button size="icon" variant="ghost" className="rounded-xl"><MoreVertical className="h-4 w-4 text-muted-foreground" /></Button>
                    </div>
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
