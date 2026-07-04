
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Search, Filter, Star, 
  MessageSquare, ArrowUpRight,
  Zap, TrendingUp, CheckCircle2, Plus,
  MoreVertical, Phone, Mail, UserCircle,
  Activity, HeartPulse, ShieldAlert
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function HealthcarePatientsPage() {
  const patients = [
    { id: 1, name: "Ibrahim Malik", status: "Ongoing Care", visits: 12, rating: 4.9, condition: "Post-Surgical Recovery" },
    { id: 2, name: "Sara Abdullah", status: "Wellness Member", visits: 5, rating: 4.8, condition: "General Nutrition" },
    { id: 3, name: "Zaid Ali", status: "New Patient", visits: 1, rating: 5.0, condition: "Hijama Specialist Consult" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-600 font-black uppercase tracking-widest text-[10px]">
            <Users className="h-3 w-3" /> Care Directory
          </div>
          <h1 className="text-3xl font-black font-headline text-foreground">Patient Registry</h1>
          <p className="text-muted-foreground font-medium">Manage patient demographics, securely store visit history, and monitor loyalty.</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 rounded-full px-8 font-black shadow-lg shadow-teal-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Register New Patient
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Patients", value: "1,240", icon: Users, color: "text-teal-600", bg: "bg-teal-50" },
          { label: "Critical Care", value: "12", icon: ShieldAlert, color: "text-rose-600", bg: "bg-rose-50" },
          { label: "Loyalty Returns", value: "62%", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-sm p-8 bg-card flex items-center gap-6">
            <div className={`h-14 w-14 rounded-[1.5rem] ${stat.bg} flex items-center justify-center ${stat.color} shadow-inner`}>
              <stat.icon className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-foreground">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2">
          <h2 className="text-xl font-black">Live Patient Registry</h2>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search patients..." className="pl-9 h-11 rounded-2xl bg-card border-none shadow-sm font-medium" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {patients.map((p) => (
            <Card key={p.id} className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden border-2 border-transparent hover:border-teal-100 transition-all group">
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-16 w-16 border-4 border-border shadow-md">
                    <AvatarImage src={`https://picsum.photos/seed/patient-${p.id}/150/150`} />
                    <AvatarFallback>{p.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-black text-foreground">{p.name}</p>
                      <Badge className="bg-teal-50 text-teal-600 border-none text-[9px] font-black uppercase px-2 h-5 flex items-center">{p.status}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      <span>Total Visits: {p.visits}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><HeartPulse className="h-3 w-3 text-teal-500" /> {p.condition}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-12">
                  <div className="text-center md:text-right">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Last Interaction</p>
                    <p className="text-sm font-black text-foreground">2 days ago</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="rounded-xl h-12 px-8 font-black uppercase text-[10px] tracking-widest border-2">Full Record</Button>
                    <Button className="rounded-xl h-12 px-8 font-black uppercase text-[10px] tracking-widest bg-teal-600 text-white shadow-lg shadow-teal-200">Message</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
