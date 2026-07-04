"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, GraduationCap, Users, BookOpen, 
  Star, Tag, ShieldCheck, AlertCircle,
  ArrowUpRight, PlusCircle, Settings,
  Clock, MapPin, CheckCircle2, TrendingUp,
  Library, Calendar
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function EducationDashboard() {
  const kpis = [
    { label: "Revenue (Month)", value: "₹1,25,000", trend: "+5.2%", icon: Wallet },
    { label: "Total Students", value: "450", trend: "+12 new today", icon: Users },
    { label: "Pending Admissions", value: "18", trend: "Action required", icon: GraduationCap, variant: "destructive" as const },
    { label: "Active Courses", value: "24", trend: "3 starting soon", icon: BookOpen },
    { label: "Attendance Rate", value: "94%", trend: "Last 7 days", icon: CheckCircle2 },
    { label: "Avg. Review", value: "4.8", trend: "from 80 parents", icon: Star },
    { label: "Certification Pts", value: "12", trend: "Verified status", icon: ShieldCheck },
    { label: "Fee Overdue", value: "₹8,500", trend: "5 accounts", icon: AlertCircle, variant: "warning" as const },
  ];

  const upcomingClasses = [
    { id: "CLS-101", subject: "Quranic Arabic", teacher: "Shaykh Omar", time: "04:30 PM", status: "Online" },
    { id: "CLS-102", subject: "Islamic History", teacher: "Ustadha Fatima", time: "05:15 PM", status: "Room 202" },
    { id: "CLS-103", subject: "Fiqh Basics", teacher: "Ustadh Zaid", time: "06:00 PM", status: "Main Hall" },
  ];

  const quickActions = [
    { label: "New Admission", icon: PlusCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Add Course", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Schedule", icon: Calendar, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Library", icon: Library, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Marketing", icon: TrendingUp, color: "text-muted-foreground", bg: "bg-muted" },
    { label: "Settings", icon: Settings, color: "text-muted-foreground", bg: "bg-muted" },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Education &amp; Training Dashboard</h1>
        <p className="text-muted-foreground font-medium opacity-60">Manage your Madrasa, school, or training center's academic and operational activities.</p>
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
              <CardTitle className="text-xl font-black">Upcoming Classes Today</CardTitle>
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-6 h-10">
                View Full Calendar <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Class / ID</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Teacher</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-muted-foreground">Time</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingClasses.map((cls, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-8 py-5">
                        <div className="font-bold text-foreground text-sm">{cls.subject}</div>
                        <div className="text-[9px] font-bold text-muted-foreground uppercase">{cls.id}</div>
                      </TableCell>
                      <TableCell className="font-bold text-muted-foreground text-xs">{cls.teacher}</TableCell>
                      <TableCell className="font-bold text-muted-foreground text-sm">{cls.time}</TableCell>
                      <TableCell className="text-right px-8">
                        <Badge variant="outline" className="rounded-full px-4 text-[9px] font-black uppercase border-primary/20 text-primary bg-primary/5">
                          {cls.status}
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
              <CardTitle className="text-xl font-black">Program Demand</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              {[
                { name: "Hifz Program", status: "Full Capacity", val: 100 },
                { name: "Arabic Intensive", status: "Steady", val: 65, variant: "warning" },
                { name: "Kids Weekend Club", status: "High Demand", val: 88 },
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
            <ShieldCheck className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-black">Accreditation Audit?</h3>
              <p className="text-sm font-medium opacity-80 leading-relaxed">
                Apply for official "Halal Educational Standards" certification to boost your institution's credibility.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs uppercase tracking-widest">Start Audit</Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Latest Enrollment</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="p-4 bg-muted/30 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-card rounded-full flex items-center justify-center text-primary font-black text-[10px] shadow-sm">AA</div>
                  <div>
                    <p className="text-xs font-black text-foreground">Aisha Abdullah</p>
                    <p className="text-[10px] text-muted-foreground font-bold">Kids Tajweed • 2h ago</p>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground font-medium line-clamp-2 italic">
                  "Applied for the upcoming Tajweed intensive starting next month for 2 students..."
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 rounded-xl font-black text-[10px] h-8 border-primary/20 text-primary">Review</Button>
                  <Button variant="outline" size="sm" className="flex-1 rounded-xl font-black text-[10px] h-8 border-primary/20 text-primary">Approve</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
