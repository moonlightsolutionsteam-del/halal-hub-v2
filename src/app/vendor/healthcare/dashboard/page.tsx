
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, Stethoscope, Calendar, Users, 
  Star, Tag, ShieldCheck, AlertCircle,
  ArrowUpRight, PlusCircle, Settings,
  Clock, MapPin, CheckCircle2, TrendingUp,
  Activity, Pill, HeartPulse
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function HealthcareDashboard() {
  const kpis = [
    { label: "Revenue (Month)", value: "₹2,15,000", trend: "+8.4%", icon: Wallet },
    { label: "Total Patients", value: "1,240", trend: "+15 new today", icon: Users },
    { label: "Upcoming Appts", value: "12", trend: "Action required", icon: Calendar, variant: "destructive" as const },
    { label: "Ethical Care Score", value: "99.8%", trend: "Audit verified", icon: ShieldCheck },
    { label: "Avg. Review", value: "4.9", trend: "from 450 reviews", icon: Star },
    { label: "Active Services", value: "24", trend: "Hijama, Consults", icon: Stethoscope },
    { label: "Staff On Duty", value: "8", trend: "Shift: Morning", icon: Activity },
    { label: "Supplies Alert", value: "3", trend: "Low stock", icon: Pill, variant: "warning" as const },
  ];

  const upcomingAppointments = [
    { id: "APP-7021", patient: "Omar Malik", service: "Hijama Therapy", time: "10:30 AM", status: "Confirmed" },
    { id: "APP-7022", patient: "Sara Siddiqui", service: "GP Consultation", time: "11:15 AM", status: "Arrived" },
    { id: "APP-7023", patient: "Yusuf Khan", service: "Nutrition Plan", time: "12:00 PM", status: "Waitlist" },
  ];

  const quickActions = [
    { label: "New Appt", icon: PlusCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Patient Record", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Add Service", icon: HeartPulse, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Inventory", icon: Pill, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Trust Reports", icon: ShieldCheck, color: "text-teal-500", bg: "bg-teal-50" },
    { label: "Settings", icon: Settings, color: "text-muted-foreground", bg: "bg-muted" },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen pb-24">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Healthcare Management</h1>
        <p className="text-muted-foreground font-medium opacity-60">Manage clinical appointments, ethical care standards, and patient wellness.</p>
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
              <p className={`text-[10px] font-bold mt-1 uppercase tracking-tight ${kpi.variant === 'destructive' ? 'text-red-400' : 'text-emerald-600'}`}>
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
              <CardTitle className="text-xl font-black">Live Appointment Queue</CardTitle>
              <Button size="sm" className="bg-teal-600 hover:bg-teal-700 rounded-full font-black text-xs px-6 h-10 text-white">
                Full Calendar <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Patient / ID</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Service</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Time</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingAppointments.map((appt, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors group">
                      <TableCell className="px-8 py-5">
                        <div className="font-bold text-foreground text-sm">{appt.patient}</div>
                        <div className="text-[9px] font-bold text-muted-foreground uppercase">{appt.id}</div>
                      </TableCell>
                      <TableCell className="font-bold text-muted-foreground text-xs">{appt.service}</TableCell>
                      <TableCell className="font-bold text-muted-foreground text-sm">{appt.time}</TableCell>
                      <TableCell className="text-right px-8">
                        <Badge variant="outline" className="rounded-full px-4 text-[9px] font-black uppercase border-teal-200 text-teal-600 bg-teal-50/50">
                          {appt.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <section className="space-y-4">
            <h2 className="text-xl font-black px-2">Clinical Management</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {quickActions.map((action, i) => (
                <button key={i} className="group flex flex-col items-center justify-center p-6 bg-card rounded-[2rem] shadow-sm hover:shadow-md transition-all border border-transparent hover:border-teal-100">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black text-foreground uppercase tracking-tighter text-center">{action.label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Treatment Demand</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              {[
                { name: "Hijama Therapy", status: "Peak Interest", val: 95 },
                { name: "Family GP", status: "Steady", val: 65, variant: "warning" },
                { name: "Nutrition Plans", status: "Rising", val: 82 },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className={item.variant === 'warning' ? 'text-amber-500' : 'text-emerald-500'}>{item.status}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.variant === 'warning' ? 'bg-amber-400' : 'bg-teal-600'} transition-all`}
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-teal-600 text-white p-8 overflow-hidden relative">
            <ShieldCheck className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-black">Ethical Standards Audit</h3>
              <p className="text-sm font-medium opacity-80 leading-relaxed">
                Gain the "Shariah-Compliant Clinic" badge by verifying your privacy and hygiene protocols.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs uppercase tracking-widest h-12 shadow-xl">Apply for Audit</Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Patient Spotlight</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="p-4 bg-muted/30 rounded-2xl border-2 border-transparent hover:border-teal-100 transition-all cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-card rounded-xl flex items-center justify-center text-teal-600 font-black text-xs shadow-sm">SA</div>
                  <div>
                    <p className="text-sm font-black text-foreground">Sarah Ahmed</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase">Loyalty Lvl 5 • 1d ago</p>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground font-medium italic mt-3 line-clamp-2 leading-relaxed">
                  "Exceeded expectations! The female practitioner was very professional and the privacy screens were excellent..."
                </p>
                <div className="flex gap-0.5 mt-2">
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
