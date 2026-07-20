// @ts-nocheck

"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Users, Plus, Search, Filter, Phone,
  Mail, Calendar, ArrowUpRight, CheckCircle2,
  Clock, User, Info, MoreVertical, ShieldCheck,
  Zap, Star
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

export default function CateringStaffPage() {
  const { user, loading: authLoading } = useAuth()
  const [showRosterModal, setShowRosterModal] = React.useState(false)
  const [showAddMemberModal, setShowAddMemberModal] = React.useState(false)
  const [showPhoneModal, setShowPhoneModal] = React.useState(false)
  const [showMoreModal, setShowMoreModal] = React.useState(false)
  const [activeStaff, setActiveStaff] = React.useState<{ name: string; role: string } | null>(null)
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
          <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px]">
            <Users className="h-3 w-3" /> Human Resources
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Staff & Captains</h1>
          <p className="text-muted-foreground font-medium">Manage your field team, uniforms, certifications, and shift rotations.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setShowRosterModal(true)} className="rounded-full px-6 font-bold border-2 h-12">
            Schedule Roster
          </Button>
          <Button onClick={() => setShowAddMemberModal(true)} className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 font-black shadow-lg shadow-blue-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add Team Member
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {[
          { label: "Total Staff", value: loading ? "—" : staff.length.toString(), icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Uniform Check", value: "100%", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Avg Staff Rating", value: "4.9", icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Next Shift", value: "12:00 PM", icon: Clock, color: "text-purple-600", bg: "bg-purple-50" },
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

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2">
          <h2 className="text-xl font-black">Field Force Feed</h2>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Staff..." className="pl-9 h-11 rounded-2xl bg-card border-none shadow-sm font-medium" />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : staff.length === 0 ? (
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-12 text-center space-y-3">
            <Users className="h-10 w-10 text-muted-foreground/30 mx-auto" />
            <p className="font-black text-foreground">No staff added yet</p>
            <p className="text-sm text-muted-foreground">Add your first team member to get started.</p>
          </Card>
        ) : (
        <div className="grid grid-cols-1 gap-4">
          {staff.map((s) => (
            <Card key={s.id} className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden border-2 border-transparent hover:border-blue-100 transition-all group">
              <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="flex items-center gap-6">
                  <Avatar className="h-16 w-16 border-4 border-border shadow-md">
                    <AvatarImage src={s.image_url ?? ""} />
                    <AvatarFallback>{(s.name ?? "S")[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-xl font-black text-foreground">{s.name ?? "—"}</p>
                      <Badge className="bg-blue-50 text-blue-600 border-none font-black text-[9px] uppercase px-2">{s.role ?? "Staff"}</Badge>
                    </div>
                    {s.email && <p className="text-xs font-medium text-muted-foreground">{s.email}</p>}
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {s.phone && <p className="text-xs font-bold text-muted-foreground">{s.phone}</p>}
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => { setActiveStaff({ name: s.name ?? "", role: s.role ?? "" }); setShowPhoneModal(true); }} className="rounded-xl"><Phone className="h-4 w-4 text-muted-foreground" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => { setActiveStaff({ name: s.name ?? "", role: s.role ?? "" }); setShowMoreModal(true); }} className="rounded-xl"><MoreVertical className="h-4 w-4 text-muted-foreground" /></Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        )}
      </div>

      {/* Schedule Roster Modal */}
      <Dialog open={showRosterModal} onOpenChange={setShowRosterModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Schedule Roster</DialogTitle>
            <DialogDescription>Plan upcoming shifts and assign staff to events.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Event / Shift Name</Label>
              <Input placeholder="e.g. Amara Wedding – Nov 02" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Date</Label>
              <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Shift Time</Label>
              <Input placeholder="e.g. 08:00 AM – 06:00 PM" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Staff Required</Label>
              <Input placeholder="e.g. 5 serving staff, 2 chefs" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowRosterModal(false)}>Save Roster</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Team Member Modal */}
      <Dialog open={showAddMemberModal} onOpenChange={setShowAddMemberModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Add Team Member</DialogTitle>
            <DialogDescription>Register a new staff member to your catering team.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Full Name</Label>
              <Input placeholder="e.g. Ahmed Siddiqui" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Role</Label>
              <Input placeholder="e.g. Sous Chef, Serving Staff" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Certifications</Label>
              <Input placeholder="e.g. Food Hygiene Lvl 2" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Phone Number</Label>
              <Input placeholder="e.g. +1 555 000 0000" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowAddMemberModal(false)}>Add Member</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Phone / Contact Modal */}
      <Dialog open={showPhoneModal} onOpenChange={setShowPhoneModal}>
        <DialogContent className="rounded-[2rem] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Contact {activeStaff?.name}</DialogTitle>
            <DialogDescription>Send a message or initiate a call to this staff member.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Quick Message</Label>
              <Input placeholder="e.g. Please report to event location by 8 AM" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowPhoneModal(false)}>Send Message</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* More Options Modal */}
      <Dialog open={showMoreModal} onOpenChange={setShowMoreModal}>
        <DialogContent className="rounded-[2rem] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">{activeStaff?.name}</DialogTitle>
            <DialogDescription>{activeStaff?.role} — Staff Actions</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 pt-2">
            <Button variant="outline" className="w-full h-12 rounded-2xl font-black" onClick={() => setShowMoreModal(false)}>View Profile</Button>
            <Button variant="outline" className="w-full h-12 rounded-2xl font-black" onClick={() => setShowMoreModal(false)}>Edit Details</Button>
            <Button className="w-full h-12 rounded-2xl font-black bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setShowMoreModal(false)}>Assign to Event</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
