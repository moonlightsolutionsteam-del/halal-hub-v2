
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
  Trash2, Edit2, Zap, AlertCircle, FileText,
  Upload, MoreVertical, ClipboardList, Calendar,
  Star, Heart, Sparkles, Plus, Settings
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

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
  const [activeTab, setActiveTab] = React.useState("hub")

  return (
    <div className="container mx-auto p-6 space-y-10 max-w-6xl pb-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-[10px]">
            <Network className="h-3 w-3" /> Ancestral Lineage & Hub
          </div>
          <h1 className="text-4xl font-black font-headline text-slate-900 tracking-tight">Family Ecosystem</h1>
          <p className="text-muted-foreground font-medium text-lg italic">Coordinate your daily life and preserve your ancestral legacy.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/family-tree/setup">
            <Button variant="outline" className="rounded-2xl px-8 font-black border-2 h-14 bg-white shadow-sm">
              <Settings className="h-4 w-4 mr-2" /> Hub Settings
            </Button>
          </Link>
          <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-2xl px-10 font-black shadow-lg shadow-emerald-200 h-14 text-white">
            <UserPlus className="h-4 w-4 mr-2" /> Invite Member
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-white border rounded-2xl h-16 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="hub" className="rounded-xl px-8 font-black text-xs uppercase tracking-widest h-full data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all">Family Hub</TabsTrigger>
          <TabsTrigger value="legacy" className="rounded-xl px-8 font-black text-xs uppercase tracking-widest h-full data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all">Legacy & Roots</TabsTrigger>
        </TabsList>

        {/* Tab 1: Family Hub (Coordination) */}
        <TabsContent value="hub" className="space-y-8 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Family Members Strip */}
            <Card className="md:col-span-3 rounded-[2.5rem] border-none shadow-sm bg-white p-6">
              <div className="flex items-center justify-between mb-6 px-2">
                <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">Family Members</h3>
                <Link href="/family-tree/setup" className="text-xs font-bold text-emerald-600 hover:underline">Manage Roles</Link>
              </div>
              <div className="flex gap-6 overflow-x-auto pb-2 no-scrollbar">
                {[
                  { name: "Ibrahim", role: "Admin", img: "av1" },
                  { name: "Fatima", role: "Parent", img: "av2" },
                  { name: "Zaid", role: "Child", img: "av3" },
                  { name: "Sarah", role: "Child", img: "av4" },
                  { name: "Omar", role: "Extended", img: "av5" },
                ].map((member, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer shrink-0">
                    <div className="relative">
                      <Avatar className="h-16 w-16 border-4 border-white shadow-md group-hover:scale-110 transition-transform">
                        <AvatarImage src={`https://picsum.photos/seed/${member.img}/150/150`} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                        <CheckCircle2 className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-black text-slate-900">{member.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{member.role}</p>
                    </div>
                  </div>
                ))}
                <button className="h-16 w-16 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:border-emerald-300 hover:text-emerald-500 transition-all shrink-0">
                  <Plus className="h-6 w-6" />
                </button>
              </div>
            </Card>

            {/* Family Board Preview */}
            <Card className="md:col-span-2 rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <ClipboardList className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Shared Board</h3>
                </div>
                <Link href="/family-tree/board">
                  <Button variant="ghost" size="sm" className="text-xs font-black uppercase text-emerald-600">Open Board <ChevronRight className="ml-1 h-4 w-4" /></Button>
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Buy Groceries", assigned: "Fatima", priority: true, time: "Due Today" },
                  { title: "Plan Weekend Outing", assigned: "Ibrahim", priority: false, time: "Oct 12" },
                  { title: "Update Vaccine Records", assigned: "Zaid", priority: false, time: "Pending" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-emerald-100 transition-all">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "h-3 w-3 rounded-full",
                        item.priority ? "bg-amber-500 animate-pulse" : "bg-slate-200"
                      )} />
                      <div>
                        <p className="text-sm font-bold text-slate-800">{item.title}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Assigned: {item.assigned}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-slate-300 uppercase">{item.time}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Upcoming Events Preview */}
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-black">Family Events</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Nikah Anniversary", date: "Oct 15", loc: "The Halal Grill" },
                    { title: "Shopping Trip", date: "Oct 18", loc: "City Mall" },
                  ].map((event, i) => (
                    <div key={i} className="space-y-1 group cursor-pointer">
                      <p className="text-sm font-bold group-hover:text-emerald-400 transition-colors">{event.title}</p>
                      <div className="flex flex-col gap-1 opacity-80">
                        <p className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                          <Clock className="h-3 w-3" /> {event.date}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                          <MapPin className="h-3 w-3" /> {event.loc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/family-tree/events">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 font-black uppercase text-[10px] tracking-widest">Open Planner</Button>
              </Link>
            </Card>

            {/* Halal Discovery Strip */}
            <Card className="md:col-span-3 rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Family Suggestions</h3>
                </div>
                <Link href="/family-tree/discovery">
                  <Button variant="link" className="text-emerald-600 font-black text-xs uppercase tracking-widest">Explore Directory</Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { name: "The Halal Grill", type: "Restaurant", img: "food1", rate: 4.9 },
                  { name: "Islamic Expo 2024", type: "Event", img: "event1", rate: 5.0 },
                  { name: "City Library Hub", type: "Education", img: "edu1", rate: 4.7 },
                ].map((place, i) => (
                  <div key={i} className="group flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-emerald-100 transition-all cursor-pointer">
                    <div className="relative h-16 w-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
                      <Image src={`https://picsum.photos/seed/${place.img}/200/200`} alt={place.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-black text-slate-900 truncate">{place.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{place.type}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                        <span className="text-[10px] font-black text-slate-700">{place.rate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 2: Legacy & Roots (Existing Content) */}
        <TabsContent value="legacy" className="space-y-8 animate-in fade-in duration-500">
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
                <Button size="icon" className="rounded-xl shadow-xl bg-white text-slate-900 hover:bg-slate-50 border h-12 w-12"><Filter className="h-4 w-4" /></Button>
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
                      <DownloadIcon className="h-4 w-4 text-slate-300 group-hover:text-emerald-600 transition-all" />
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DownloadIcon(props: any) {
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
