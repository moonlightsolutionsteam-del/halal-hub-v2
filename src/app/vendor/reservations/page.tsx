
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, Calendar, Clock, MapPin, 
  Search, Filter, CheckCircle2, XCircle,
  Phone, MessageSquare, AlertCircle,
  MoreVertical, ArrowUpRight, ChefHat
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";

export default function VendorReservationsPage() {
  const reservations = [
    { id: "RES-991", name: "Zaid Ali", guests: 4, time: "7:30 PM", date: "Tonight", status: "Confirmed", note: "Window seat preferred" },
    { id: "RES-992", name: "Fatima S.", guests: 2, time: "8:00 PM", date: "Tonight", status: "Arrived", note: "Birthday celebration" },
    { id: "RES-993", name: "Omar Sheikh", guests: 12, time: "1:00 PM", date: "Tomorrow", status: "Pending", note: "Prayer area needed nearby" },
    { id: "RES-994", name: "Layla K.", guests: 6, time: "6:45 PM", date: "Tonight", status: "Confirmed", note: "No high chairs needed" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <ChefHat className="h-3 w-3" /> Dining Hall
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">Table Reservations</h1>
          <p className="text-muted-foreground font-medium">Manage floor capacity and specialized guest requirements.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2">Floor Plan View</Button>
          <Button className="bg-primary rounded-full px-8 font-bold shadow-lg shadow-primary/20">New Walk-in</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
            <CardHeader className="p-8 border-b flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black">Today's Guest List</CardTitle>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Total Guests: 24</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-48">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input placeholder="Search guest..." className="pl-8 h-9 rounded-xl bg-muted/30 border-none text-xs" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/10">
                  <TableRow className="hover:bg-transparent border-none">
                    <TableHead className="px-8 font-black text-[10px] uppercase tracking-widest">Guest</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest">Time / Date</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest">Pax</TableHead>
                    <TableHead className="font-black text-[10px] uppercase tracking-widest">Status</TableHead>
                    <TableHead className="text-right px-8 font-black text-[10px] uppercase tracking-widest">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((res) => (
                    <TableRow key={res.id} className="hover:bg-muted/5 border-muted/20">
                      <TableCell className="px-8 py-5">
                        <div className="font-bold text-foreground">{res.name}</div>
                        <div className="text-[10px] text-muted-foreground italic line-clamp-1">{res.note}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-foreground">{res.time}</span>
                          <span className="text-[10px] font-bold text-primary uppercase">{res.date}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs font-black text-muted-foreground">
                          <Users className="h-3.5 w-3.5" /> {res.guests}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          res.status === 'Arrived' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                          res.status === 'Confirmed' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-muted text-muted-foreground border-border'
                        }>
                          {res.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="icon" variant="ghost" className="rounded-xl"><Phone className="h-4 w-4 text-muted-foreground" /></Button>
                          <Button size="icon" variant="ghost" className="rounded-xl hover:text-emerald-600"><CheckCircle2 className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-primary text-primary-foreground p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Calendar className="h-24 w-24" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl font-black">Capacity Summary</h3>
                <p className="text-xs font-bold opacity-70 uppercase tracking-[0.2em]">Tonight's Session</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card/10 backdrop-blur-md rounded-2xl p-4 text-center">
                  <p className="text-2xl font-black">85%</p>
                  <p className="text-[9px] font-bold uppercase opacity-60">Fullness</p>
                </div>
                <div className="bg-card/10 backdrop-blur-md rounded-2xl p-4 text-center">
                  <p className="text-2xl font-black">12</p>
                  <p className="text-[9px] font-bold uppercase opacity-60">Left</p>
                </div>
              </div>
              <Button variant="secondary" className="w-full h-12 rounded-2xl font-black text-xs uppercase tracking-widest">Optimize Seating</Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm p-8 space-y-6 bg-card">
            <h3 className="text-xl font-black text-foreground">Waitlist</h3>
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border border-transparent hover:border-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 bg-card rounded-xl flex items-center justify-center text-primary font-black text-xs shadow-sm">P{i}</div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Pending Guest {i}</p>
                      <p className="text-[10px] text-muted-foreground font-bold">Waiting: 15m</p>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" className="rounded-xl"><ArrowUpRight className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
