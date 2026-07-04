"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, Bed, Calendar, Users, 
  Star, Tag, Coffee, AlertCircle,
  ArrowUpRight, PlusCircle, Settings,
  Clock, MapPin, CheckCircle2, TrendingUp
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function HotelDashboard() {
  const kpis = [
    { label: "Revenue (Month)", value: "₹4,25,000", trend: "+18.4%", icon: Wallet },
    { label: "Occupancy Rate", value: "82%", trend: "9 rooms left", icon: Bed },
    { label: "Today's Check-ins", value: "12", trend: "5 arriving PM", icon: Users },
    { label: "Pending Requests", value: "8", trend: "Action required", icon: AlertCircle, variant: "destructive" as const },
    { label: "Average Rating", value: "4.9", trend: "from 210 reviews", icon: Star },
    { label: "Active Offers", value: "4", trend: "Early bird special", icon: Tag },
    { label: "Staff On Duty", value: "15", trend: "Shift: Morning", icon: Users },
    { label: "Maintenance", value: "2", trend: "Room 402, 105", icon: Settings, variant: "warning" as const },
  ];

  const recentBookings = [
    { id: "BK-9901", guest: "Omar Abdullah", room: "Deluxe Suite 301", date: "Nov 02 - Nov 05", status: "Confirmed" },
    { id: "BK-9902", guest: "Fatima Zahra", room: "Superior Queen 204", date: "Nov 02 - Nov 03", status: "Checked In" },
    { id: "BK-9903", guest: "Ahmed Khan", room: "Family Room 102", date: "Nov 04 - Nov 08", status: "Pending Payment" },
  ];

  const quickActions = [
    { label: "New Booking", icon: PlusCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Update Status", icon: Bed, color: "text-muted-foreground", bg: "bg-muted" },
    { label: "Housekeeping", icon: Settings, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Guest Messages", icon: Users, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Offers", icon: Tag, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Reports", icon: TrendingUp, color: "text-muted-foreground", bg: "bg-muted" },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Hotel & Homestay Dashboard</h1>
        <p className="text-muted-foreground font-medium opacity-60">Manage your property, bookings, and guest experiences.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
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
              <CardTitle className="text-xl font-black">Recent Bookings</CardTitle>
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-6 h-10">
                All Bookings <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Guest / ID</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Room</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Dates</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBookings.map((booking, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-8 py-5">
                        <div className="font-bold text-foreground text-sm">{booking.guest}</div>
                        <div className="text-[9px] font-bold text-muted-foreground uppercase">{booking.id}</div>
                      </TableCell>
                      <TableCell className="font-bold text-muted-foreground text-xs">{booking.room}</TableCell>
                      <TableCell className="font-bold text-muted-foreground text-sm">{booking.date}</TableCell>
                      <TableCell className="text-right px-8">
                        <Badge variant="outline" className="rounded-full px-4 text-[9px] font-black uppercase border-primary/20 text-primary bg-primary/5">
                          {booking.status}
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
              <CardTitle className="text-xl font-black">Room Availability</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              {[
                { name: "Deluxe Suites", status: "High Demand", val: 95 },
                { name: "Superior Rooms", status: "Steady", val: 65, variant: "warning" },
                { name: "Standard Rooms", status: "Low Availability", val: 88 },
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
            <Bed className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-black">Boost Your Property?</h3>
              <p className="text-sm font-medium opacity-80 leading-relaxed">
                Reach more halal-conscious travelers by featuring your suites on the Halal Hub travel guide.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs uppercase tracking-widest">Featured Boost</Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Latest Guest Review</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="p-4 bg-muted/30 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-card rounded-full flex items-center justify-center text-primary font-black text-[10px] shadow-sm">ZA</div>
                  <div>
                    <p className="text-xs font-black text-foreground">Zaid Ali</p>
                    <p className="text-[10px] text-muted-foreground font-bold">Standard Single • 1d ago</p>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground font-medium line-clamp-2 italic">
                  "Exceeded expectations! The prayer room was very clean and the breakfast options were 100% certified..."
                </p>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
