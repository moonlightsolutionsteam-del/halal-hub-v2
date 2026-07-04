"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Search, Filter, Clock, 
  MapPin, Users, Phone, ArrowUpRight,
  ChevronRight, CalendarDays, Plus, CheckCircle2,
  Printer, MoreVertical, Eye, Bed
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function HotelBookingsPage() {
  const bookings = [
    { id: "BK-9021", guest: "Omar Abdullah", room: "Suite 301", checkIn: "Nov 15", checkOut: "Nov 18", pax: 2, status: "Confirmed", total: "₹37,500" },
    { id: "BK-9022", guest: "Sara Khan", room: "Double 204", checkIn: "Nov 16", checkOut: "Nov 17", pax: 1, status: "Checked In", total: "₹6,800" },
    { id: "BK-9023", guest: "Zaid Ali", room: "Family 102", checkIn: "Nov 20", checkOut: "Nov 25", pax: 4, status: "Pending Final", total: "₹75,000" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sky-600 font-black uppercase tracking-widest text-[10px]">
            <Calendar className="h-3 w-3" /> Property Pipeline
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Reservations</h1>
          <p className="text-muted-foreground font-medium">Manage your stay calendar, active check-ins, and future bookings.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <Printer className="mr-2 h-4 w-4" /> Arrival List
          </Button>
          <Button className="bg-sky-600 hover:bg-sky-700 rounded-full px-8 font-black shadow-lg shadow-sky-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Manual Booking
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {[
          { label: "Check-ins Today", value: "8", icon: CalendarDays, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Active Stays", value: "42", icon: Bed, color: "text-sky-600", bg: "bg-sky-50" },
          { label: "Occupancy", value: "82%", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Task", value: "5", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
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
          <CardTitle className="text-xl font-black">Booking Registry</CardTitle>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Guest / ID..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">ID / Guest</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Dates</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Room</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Amount</TableHead>
                <TableHead className="h-14 text-right px-8 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id} className="border-border hover:bg-muted/50 transition-colors group">
                  <TableCell className="px-8 py-5">
                    <div className="font-bold text-foreground">{booking.guest}</div>
                    <div className="text-[9px] font-black text-muted-foreground uppercase">{booking.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-xs font-black text-foreground">{booking.checkIn} - {booking.checkOut}</div>
                  </TableCell>
                  <TableCell className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{booking.room}</TableCell>
                  <TableCell className="font-black text-foreground">{booking.total}</TableCell>
                  <TableCell className="text-right px-8">
                    <Badge variant="outline" className={
                      booking.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 font-black text-[9px] px-3' : 
                      booking.status === 'Checked In' ? 'bg-blue-50 text-blue-600 border-blue-200 font-black text-[9px] px-3' : 
                      'bg-amber-50 text-amber-600 border-amber-200 font-black text-[9px] px-3'
                    }>
                      {booking.status}
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
