// @ts-nocheck
"use client"

import * as React from "react"
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
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

type StaffMember = {
  id: string
  name: string | null
  role: string | null
  phone: string | null
  email: string | null
  image_url: string | null
}

export default function HealthcareStaffPage() {
  const { user, loading: authLoading } = useAuth()
  const [staff, setStaff] = React.useState<StaffMember[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (authLoading || !user?.uid) { setLoading(false); return }
    const supabase = createClient()
    ;supabase
      .from("businesses").select("id").eq("owner_id", user.uid).limit(1).maybeSingle()
      .then(({ data }: { data: { id: string } | null }) => {
        if (!data) { setLoading(false); return }
        ;supabase
          .from("business_staff")
          .select("id, name, role, phone, email, image_url")
          .eq("business_id", data.id)
          .order("created_at", { ascending: true })
          .then(({ data: rows }: { data: StaffMember[] | null }) => {
            setStaff(rows ?? [])
            setLoading(false)
          })
      })
  }, [user?.uid, authLoading])

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-600 font-black uppercase tracking-widest text-[10px]">
            <Activity className="h-3 w-3" /> Clinical Workforce
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Practitioners & Staff</h1>
          <p className="text-muted-foreground font-medium">Manage your team of doctors, specialists, and wellness experts.</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 rounded-full px-8 font-black shadow-lg shadow-teal-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Team Member
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {[
          { label: "Total Staff", value: loading ? "—" : staff.length.toString(), icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Vetted Pros", value: loading ? "—" : staff.length.toString(), icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Patient Rating", value: "4.9", icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Next Shift", value: "14:00", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
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

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : staff.length === 0 ? (
        <Card className="rounded-[2rem] border-none shadow-sm bg-card p-12 text-center space-y-3">
          <Users className="h-10 w-10 text-muted-foreground/30 mx-auto" />
          <p className="font-black text-foreground">No staff added yet</p>
          <p className="text-sm text-muted-foreground">Add your first practitioner to get started.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {staff.map((s) => (
            <Card key={s.id} className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden border-2 border-transparent hover:border-teal-100 transition-all group">
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="flex items-center gap-6">
                  <Avatar className="h-16 w-16 border-4 border-border shadow-md">
                    <AvatarImage src={s.image_url ?? ""} />
                    <AvatarFallback>{(s.name ?? "S")[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xl font-black text-foreground">{s.name ?? "—"}</p>
                      <Badge variant="secondary" className="bg-teal-50 text-teal-600 border-none font-black text-[9px] uppercase">{s.role ?? "Staff"}</Badge>
                    </div>
                    {s.email && <p className="text-xs font-medium text-muted-foreground">{s.email}</p>}
                    {s.phone && <p className="text-xs font-bold text-muted-foreground">{s.phone}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" className="rounded-xl"><Phone className="h-4 w-4 text-muted-foreground" /></Button>
                    <Button size="icon" variant="ghost" className="rounded-xl"><MoreVertical className="h-4 w-4 text-muted-foreground" /></Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
