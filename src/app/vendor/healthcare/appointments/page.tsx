
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, Search, Filter, Clock, 
  MapPin, Users, Phone, ArrowUpRight,
  ChevronRight, CalendarDays, Plus, CheckCircle2,
  Printer, MoreVertical, Eye, Stethoscope,
  HeartPulse, User
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function HealthcareAppointmentsPage() {
  const appointments = [
    { id: "APP-7021", guest: "Omar Malik", service: "Hijama Therapy", date: "Nov 02, 2024", time: "10:30 AM", status: "Confirmed", practitioner: "Dr. Zaid" },
    { id: "APP-7022", guest: "Sara Siddiqui", service: "GP Consultation", date: "Nov 02, 2024", time: "11:15 AM", status: "Arrived", practitioner: "Dr. Fatima" },
    { id: "APP-7023", guest: "Yusuf Khan", service: "Nutrition Plan", date: "Nov 03, 2024", time: "09:00 AM", status: "Waitlist", practitioner: "Ustadha Amina" },
    { id: "APP-7024", guest: "Zainab Ali", service: "Physiotherapy", date: "Nov 03, 2024", time: "02:00 PM", status: "Pending", practitioner: "Dr. Zaid" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-600 font-black uppercase tracking-widest text-[10px]">
            <Calendar className="h-3 w-3" /> Clinical Pipeline
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Appointment Registry</h1>
          <p className="text-muted-foreground font-medium">Manage patient bookings, practitioner schedules, and real-time clinic arrivals.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <Printer className="mr-2 h-4 w-4" /> Daily Roster
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 rounded-full px-8 font-black shadow-lg shadow-teal-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> New Booking
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Today's Appts", value: "12", icon: CalendarDays, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Waiting Room", value: "3", icon: Users, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Completed Today", value: "8", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Avg. Wait Time", value: "14m", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
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
          <CardTitle className="text-xl font-black">Daily Appointment Ledger</CardTitle>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Patient..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Time / ID</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Patient & Service</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Practitioner</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Date</TableHead>
                <TableHead className="h-14 text-right px-8 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt.id} className="border-border hover:bg-muted/50 transition-colors group">
                  <TableCell className="px-8 py-5">
                    <div className="font-black text-foreground text-sm">{appt.time}</div>
                    <div className="text-[9px] font-bold text-muted-foreground uppercase">{appt.id}</div>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-foreground">{appt.guest}</p>
                    <p className="text-[10px] font-black text-teal-600 uppercase">{appt.service}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                      <User className="h-3 w-3 text-muted-foreground" /> {appt.practitioner}
                    </div>
                  </TableCell>
                  <TableCell className="font-black text-foreground text-xs">{appt.date}</TableCell>
                  <TableCell className="text-right px-8">
                    <Badge variant="outline" className={
                      appt.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 font-black text-[9px] px-3' : 
                      appt.status === 'Arrived' ? 'bg-blue-50 text-blue-600 border-blue-200 font-black text-[9px] px-3' : 
                      'bg-amber-50 text-amber-600 border-amber-200 font-black text-[9px] px-3'
                    }>
                      {appt.status}
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
