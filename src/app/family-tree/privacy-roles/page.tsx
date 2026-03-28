"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ShieldCheck, Lock, UserCheck, Users, 
  Settings, ArrowLeft, ChevronRight, Eye,
  EyeOff, ShieldAlert, CheckCircle2, Info,
  Key, Database, Globe, Zap, AlertTriangle,
  Network
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function PrivacyRolesPage() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const members = [
    { id: 1, name: "Ibrahim Al-Sayed", role: "Admin", status: "Active", img: "av1" },
    { id: 2, name: "Fatima Al-Sayed", role: "Parent", status: "Active", img: "av2" },
    { id: 3, name: "Zaid Al-Sayed", role: "Child", status: "Active", img: "av3" },
    { id: 4, name: "Omar Farooq", role: "Extended", status: "Active", img: "av4" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-10 max-w-5xl pb-24 text-slate-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-emerald-600 transition-colors w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Hub
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-inner">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-black font-headline tracking-tight">Privacy & Roles</h1>
          </div>
          <p className="text-muted-foreground font-medium italic">Manage who sees what and who controls the family ecosystem.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Member Roles */}
        <div className="lg:col-span-8 space-y-10">
          <section className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Users className="h-5 w-5 text-emerald-600" /> Member Permissions
              </h2>
              <Badge variant="outline" className="text-[10px] font-black border-emerald-200 text-emerald-600 uppercase tracking-widest">4 Verified Members</Badge>
            </div>
            
            <div className="space-y-4">
              {members.map((member) => (
                <Card key={member.id} className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden border-2 border-transparent hover:border-emerald-100 transition-all group">
                  <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <Avatar className="h-14 w-14 border-2 border-white shadow-md">
                        <AvatarImage src={`https://picsum.photos/seed/${member.img}/150/150`} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-lg font-black text-slate-900 leading-tight">{member.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">ID: HUB-F-882{member.id}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="space-y-1 text-right hidden sm:block">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Assigned Role</p>
                        <Select defaultValue={member.role.toLowerCase()}>
                          <SelectTrigger className="h-9 w-32 rounded-xl bg-slate-50 border-none font-black text-[10px] uppercase">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-none shadow-2xl">
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="child">Child</SelectItem>
                            <SelectItem value="extended">Extended</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical className="h-5 w-5 text-slate-300" /></Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black px-2 flex items-center gap-2">
              <Eye className="h-5 w-5 text-emerald-600" /> Visibility Controls
            </h2>
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-8">
              {[
                { title: "Extended Family Visibility", desc: "Allow members with 'Extended' role to see the Family Board.", icon: Globe, default: false },
                { title: "Ancestry Roots Access", desc: "Restrict root ancestor editing to Admins only.", icon: Network, default: true },
                { title: "Kitchen Secret Vault", desc: "Hide specific Heritage Kitchen recipes from 'Extended' members.", icon: Lock, default: true },
                { title: "Location Sharing", desc: "Show member location relative to saved discovery spots.", icon: MapPin, default: false },
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between gap-10">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                      <pref.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-black text-slate-900">{pref.title}</p>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{pref.desc}</p>
                    </div>
                  </div>
                  <Switch defaultChecked={pref.default} className="data-[state=checked]:bg-emerald-600" />
                </div>
              ))}
            </Card>
          </section>
        </div>

        {/* Right Column: Roles Info & Security */}
        <div className="lg:col-span-4 space-y-10">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Key className="h-32 w-32" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="h-14 w-14 rounded-2xl bg-white/10 flex items-center justify-center text-emerald-400 border border-white/10 shadow-2xl">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight">Security Audit</h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed italic">
                  Your family data is end-to-end encrypted. We follow strict theological data privacy standards.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Data Encrypted</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Private Registry</span>
                </div>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 font-black uppercase text-[10px] tracking-widest shadow-2xl relative z-10">
                Download Trust Report
              </Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
            <h3 className="text-xl font-black text-slate-900">Role Guide</h3>
            <div className="space-y-6">
              {[
                { role: "Admin", access: "Full Control", color: "bg-slate-900" },
                { role: "Parent", access: "Edit & Create", color: "bg-emerald-600" },
                { role: "Child", access: "Limited Action", color: "bg-blue-500" },
                { role: "Extended", access: "View Only", color: "bg-slate-400" },
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-4 last:border-none last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className={cn("h-2 w-2 rounded-full", r.color)} />
                    <span className="text-xs font-black uppercase tracking-widest text-slate-900">{r.role}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{r.access}</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-emerald-50 rounded-2xl flex items-start gap-3">
              <Info className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-[10px] font-medium text-emerald-800 leading-relaxed">
                Roles define the user's interface complexity. Kids Mode is automatically applied to 'Child' roles.
              </p>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-rose-50 p-8 space-y-4 border-2 border-rose-100">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle className="h-5 w-5" />
              <h4 className="text-sm font-black uppercase tracking-widest">Delete Ecosystem</h4>
            </div>
            <p className="text-[11px] text-rose-900/70 font-medium leading-relaxed italic">
              Permanently remove this family hub and all associated lineage data. This action is irreversible.
            </p>
            <Button variant="outline" size="sm" className="w-full rounded-xl border-rose-200 text-rose-700 bg-white font-black text-[9px] uppercase tracking-widest h-10 hover:bg-rose-600 hover:text-white transition-all">Delete Family Hub</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MoreVertical(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  )
}

function MapPin(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
