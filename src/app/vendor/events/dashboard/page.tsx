"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, Calendar, Ticket, MessageSquare, 
  Users, Star, Sparkles, AlertCircle,
  ArrowUpRight, PlusCircle, Settings,
  Clock, MapPin, CheckCircle2
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function EventsVendorDashboard() {
  const kpis = [
    { label: "Revenue (Month)", value: "₹2,45,000", trend: "+15.4%", icon: Wallet },
    { label: "Active Bookings", value: "12", trend: "4 this weekend", icon: Calendar },
    { label: "Pending Inquiries", value: "28", trend: "Action required", icon: MessageSquare, variant: "destructive" as const },
    { label: "Tickets Sold", value: "840", trend: "For upcoming Expo", icon: Ticket },
    { label: "Venue Visitors", value: "2.4k", trend: "+120 today", icon: Users },
    { label: "Average Rating", value: "4.9", trend: "from 150 reviews", icon: Star },
    { label: "Active Packages", value: "6", trend: "Wedding/Corporate", icon: Sparkles },
    { label: "Unread Leads", value: "5", trend: "New this morning", icon: AlertCircle, variant: "destructive" as const },
  ];

  const upcomingEvents = [
    { id: "EVT-881", title: "Islamic Wedding Gala", date: "Oct 12, 2024", guests: 400, status: "Confirmed" },
    { id: "EVT-882", title: "Corporate Halal Seminar", date: "Oct 15, 2024", guests: 150, status: "Pending Final Pay" },
    { id: "EVT-883", title: "Community Eid Prep", date: "Oct 18, 2024", guests: 1000, status: "Planning" },
  ];

  const quickActions = [
    { label: "Add Package", icon: PlusCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Bookings", icon: Calendar, color: "text-muted-foreground", bg: "bg-muted" },
    { label: "Inquiries", icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Tickets", icon: Ticket, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Marketing", icon: Sparkles, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Settings", icon: Settings, color: "text-muted-foreground", bg: "bg-muted" },
  ];

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-foreground">Events &amp; Venues Dashboard</h1>
        <p className="text-muted-foreground font-medium opacity-60">Manage your event spaces, bookings, and inquiries.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl bg-card p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">{kpi.label}</span>
              <kpi.icon className={`h-4 w-4 ${kpi.variant === 'destructive' ? 'text-red-400' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-black ${kpi.variant === 'destructive' ? 'text-red-600' : 'text-foreground'}`}>
                {kpi.value}
              </div>
              <p className={`text-[10px] font-bold mt-1 uppercase tracking-tight ${kpi.variant === 'destructive' ? 'text-red-400' : 'text-muted-foreground'}`}>
                {kpi.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-card">
            <CardHeader className="p-8 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black">Upcoming Bookings</CardTitle>
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-6 h-10">
                View Calendar <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Event</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Date</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Guests</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingEvents.map((event, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-8 py-5">
                        <div className="font-bold text-foreground text-sm">{event.title}</div>
                        <div className="text-[9px] font-bold text-muted-foreground uppercase">{event.id}</div>
                      </TableCell>
                      <TableCell className="font-bold text-muted-foreground text-xs">{event.date}</TableCell>
                      <TableCell className="font-bold text-muted-foreground text-sm">{event.guests}</TableCell>
                      <TableCell className="text-right px-8">
                        <Badge variant="outline" className="rounded-full px-4 text-[9px] font-black uppercase border-primary/20 text-primary bg-primary/5">
                          {event.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="px-0 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {quickActions.map((action, i) => (
                <button key={i} className="group flex flex-col items-center justify-center p-6 bg-muted/50 rounded-[2rem] hover:bg-card hover:shadow-md transition-all border border-transparent hover:border-primary/10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black text-foreground uppercase tracking-tighter text-center">{action.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Lead Health</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              {[
                { name: "Weddings", status: "High Demand", val: 92 },
                { name: "Corporate", status: "Moderate", val: 45, variant: "warning" },
                { name: "Community", status: "High Demand", val: 88 },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className={item.variant === 'warning' ? 'text-amber-500' : 'text-emerald-500'}>{item.status}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.variant === 'warning' ? 'bg-amber-400' : 'bg-primary'} transition-all`}
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-primary text-primary-foreground p-8 overflow-hidden relative">
            <Sparkles className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-black">Featured Venue?</h3>
              <p className="text-sm font-medium opacity-80 leading-relaxed">
                Boost your venue visibility to the top of the Halal Hub events list and get 3x more inquiries.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs uppercase tracking-widest">Boost Now</Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Recent Inquiry</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="p-4 bg-muted/30 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-card rounded-full flex items-center justify-center text-primary font-black text-[10px] shadow-sm">NK</div>
                  <div>
                    <p className="text-xs font-black text-foreground">Nadia Khan</p>
                    <p className="text-[10px] text-muted-foreground font-bold">Wedding Inquiry • 2h ago</p>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground font-medium line-clamp-2 italic">
                  "Hi, looking for a hall that can accommodate 300 guests for a nikah ceremony in December..."
                </p>
                <Button variant="outline" size="sm" className="w-full rounded-xl font-black text-[10px] h-8 border-primary/20 text-primary">Respond</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
