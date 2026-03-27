
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Network, Users, ShieldCheck, GitBranch, 
  ArrowUpRight, Clock, MapPin, UserPlus,
  Search, Filter, ChevronRight, History,
  Database, Share2, Info, CheckCircle2,
  Trash2, Edit2, Zap
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

const FamilyTreeIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v8" />
    <path d="m16 12-4-4-4 4" />
    <rect width="8" height="4" x="8" y="12" rx="1" />
    <path d="M12 16v6" />
    <path d="M8 22h8" />
  </svg>
);

export default function FamilyTreePage() {
  return (
    <div className="container mx-auto p-6 space-y-10 max-w-6xl pb-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-[10px]">
            <Network className="h-3 w-3" /> Ancestral Lineage
          </div>
          <h1 className="text-4xl font-black font-headline text-slate-900 tracking-tight">Family Tree</h1>
          <p className="text-muted-foreground font-medium text-lg italic">Map your roots, verify relationships, and preserve your legacy.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl px-8 font-black border-2 h-14 bg-white shadow-sm">
            <Share2 className="h-4 w-4 mr-2" /> Share Tree
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-2xl px-10 font-black shadow-lg shadow-emerald-200 h-14 text-white">
            <UserPlus className="h-4 w-4 mr-2" /> Add Member
          </Button>
        </div>
      </div>

      {/* Legacy Stats & Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="md:col-span-2 rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-10 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
          <FamilyTreeIcon className="absolute -top-4 -right-4 h-48 w-48 opacity-10 text-emerald-400" />
          <div className="relative z-10 space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Verified Lineage</p>
              <h2 className="text-6xl font-black tracking-tighter">Al-Sayed Family</h2>
              <div className="flex items-center gap-2 text-sm font-bold bg-white/10 w-fit px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                <MapPin className="h-4 w-4" /> Root Origin: Old Delhi, India
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <p className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-1">Total Nodes</p>
                <p className="text-2xl font-black">124</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-1">Generations</p>
                <p className="text-2xl font-black">5</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-1">Verified %</p>
                <p className="text-2xl font-black text-emerald-400">92%</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900">Connections</h3>
              <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px]">3 PENDING</Badge>
            </div>
            <div className="space-y-4">
              {[
                { name: "Ahmed Abdullah", role: "Cousin (Claim)", time: "2h ago" },
                { name: "Sara Malik", role: "Spouse (Verify)", time: "1d ago" },
              ].map((conn, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-emerald-100 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                      <AvatarImage src={`https://picsum.photos/seed/con${i}/100/100`} />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-black text-slate-800 leading-none">{conn.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{conn.role}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-emerald-600 transition-all" />
                </div>
              ))}
            </div>
          </div>
          <Button variant="ghost" className="w-full font-black text-xs uppercase tracking-widest text-emerald-600 hover:bg-emerald-50">View All Requests</Button>
        </Card>
      </div>

      {/* Visual Tree Placeholder */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Lineage Map</h2>
          <Button variant="ghost" className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Screen View</Button>
        </div>
        <Card className="rounded-[3rem] border-none shadow-md bg-white h-[500px] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-50" />
          <div className="relative z-10 flex flex-col items-center gap-12">
            {/* Root Node */}
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-20 w-20 border-4 border-emerald-500 shadow-xl">
                <AvatarImage src="https://picsum.photos/seed/root/200/200" />
                <AvatarFallback>RA</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <p className="text-lg font-black text-slate-900">Dr. Ibrahim Al-Sayed</p>
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] uppercase mt-1">HEAD OF LINEAGE</Badge>
              </div>
            </div>
            
            {/* Branch Lines Mockup */}
            <div className="h-16 w-px bg-slate-200 relative">
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[300px] h-px bg-slate-200" />
            </div>

            {/* Child Nodes */}
            <div className="grid grid-cols-3 gap-24">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col items-center gap-3">
                  <div className="h-16 w-px bg-slate-200" />
                  <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
                    <AvatarImage src={`https://picsum.photos/seed/child${i}/150/150`} />
                    <AvatarFallback>C</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-bold text-slate-700">Member {i}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute bottom-8 right-8 flex flex-col gap-2">
            <Button size="icon" className="rounded-xl shadow-xl bg-white text-slate-900 hover:bg-slate-50 border h-12 w-12"><Zap className="h-5 w-5" /></Button>
            <Button size="icon" className="rounded-xl shadow-xl bg-white text-slate-900 hover:bg-slate-50 border h-12 w-12"><Filter className="h-5 w-5" /></Button>
          </div>
        </Card>
      </section>

      {/* Tools & Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="p-8 border-b flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black">History & Audits</CardTitle>
                <p className="text-sm text-muted-foreground font-medium">Recent changes and relationship verifications.</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-xl"><History className="h-5 w-5 text-slate-300" /></Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {[
                  { user: "Super Admin", action: "verified 'Hassan Al-Sayed' lineage claim.", time: "2h ago", icon: ShieldCheck, color: "text-emerald-500" },
                  { user: "System", action: "detected a potential duplicate in 'Delhi Branch'.", time: "5h ago", icon: AlertCircle, color: "text-amber-500" },
                  { user: "You", action: "added a new document to 'Grandfather records'.", time: "Yesterday", icon: FileText, color: "text-blue-500" },
                ].map((log, i) => (
                  <div key={i} className="p-6 flex items-center gap-4 hover:bg-slate-50/50 transition-colors cursor-default group">
                    <div className={`h-10 w-10 rounded-xl ${log.color} bg-opacity-10 flex items-center justify-center shrink-0`}>
                      <log.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-600 font-medium">
                        <span className="font-black text-slate-900">{log.user}</span> {log.action}
                      </p>
                      <p className="text-[10px] font-black text-slate-300 uppercase mt-0.5">{log.time}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical className="h-4 w-4" /></Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
            <h3 className="text-xl font-black text-slate-900">Legacy Documents</h3>
            <div className="space-y-4">
              {[
                { name: "Birth Certificate - 1945", type: "PDF", size: "1.2 MB" },
                { name: "Family Hajj Record", type: "JPG", size: "4.5 MB" },
                { name: "Property Deed (Historical)", type: "PDF", size: "850 KB" },
              ].map((doc, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-emerald-100 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-emerald-600 shadow-sm transition-colors">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-800 leading-tight">{doc.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">{doc.type} • {doc.size}</p>
                    </div>
                  </div>
                  <Download className="h-4 w-4 text-slate-300 group-hover:text-emerald-600 transition-all" />
                </div>
              ))}
            </div>
            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-2xl h-14 font-black uppercase text-xs tracking-widest shadow-xl">
              <Upload className="h-4 w-4 mr-2" /> Upload Legacy
            </Button>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-emerald-50 p-8 space-y-4 border-2 border-emerald-100">
            <div className="flex items-center gap-3 text-emerald-600">
              <ShieldCheck className="h-6 w-6" />
              <h4 className="text-base font-black uppercase tracking-widest">Heritage Trust</h4>
            </div>
            <p className="text-[11px] text-emerald-900/70 font-medium leading-relaxed italic">
              Your lineage data is encrypted and only visible to confirmed family members. We follow strict theological data privacy standards.
            </p>
            <Button variant="outline" className="w-full rounded-xl border-emerald-200 text-emerald-700 bg-white font-black text-[9px] uppercase tracking-widest h-10">Read Trust Policy</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Download(props: any) {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  )
}
