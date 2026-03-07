
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Plus, Search, Filter, Phone, 
  ShieldCheck, Star, Activity, MoreVertical,
  Mail, Calendar, Clock, CheckCircle2
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function HealthcareStaffPage() {
  const staff = [
    { id: 1, name: "Dr. Fatima Khalil", role: "Sr. Physician", status: "In Clinic", rating: 5.0, specialty: "Internal Med" },
    { id: 2, name: "Dr. Zaid Hussain", role: "Wellness Specialist", status: "On Trip", rating: 4.9, specialty: "Hijama Expert" },
    { id: 3, name: "Ust. Amina Malik", role: "Nutritionist", status: "Available", rating: 4.8, specialty: "Sunnah Nutrition" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-600 font-black uppercase tracking-widest text-[10px]">
            <Activity className="h-3 w-3" /> Clinical Workforce
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Practitioners & Staff</h1>
          <p className="text-muted-foreground font-medium">Manage your team of doctors, specialists, and wellness experts.</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 rounded-full px-8 font-black shadow-lg shadow-teal-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Team Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Active Today", value: "8", icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Vetted Pros", value: "15", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Patient Rating", value: "4.9", icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Next Shift", value: "14:00", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
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

      <div className="grid grid-cols-1 gap-4">
        {staff.map((s) => (
          <Card key={s.id} className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden border-2 border-transparent hover:border-teal-100 transition-all group">
            <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-10">
              <div className="flex items-center gap-6">
                <Avatar className="h-16 w-16 border-4 border-slate-50 shadow-md">
                  <AvatarImage src={`https://picsum.photos/seed/doc-${s.id}/150/150`} />
                  <AvatarFallback>{s.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xl font-black text-slate-900">{s.name}</p>
                    <Badge variant="secondary" className="bg-teal-50 text-teal-600 border-none font-black text-[9px] uppercase">{s.role}</Badge>
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{s.specialty}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-12">
                <div className="text-center md:text-right">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Rating</p>
                  <div className="flex items-center gap-1 font-black text-slate-900 justify-center md:justify-end">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400 border-none" /> {s.rating}
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={s.status === 'In Clinic' ? 'bg-emerald-50 text-emerald-600 border-none' : 'bg-slate-100 text-slate-400 border-none'}>
                    {s.status}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" className="rounded-xl"><Phone className="h-4 w-4 text-slate-400" /></Button>
                  <Button size="icon" variant="ghost" className="rounded-xl"><MoreVertical className="h-4 w-4 text-slate-400" /></Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
