
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Search, Filter, MoreVertical, 
  ShieldCheck, Star, ArrowUpRight,
  BarChart3, MapPin, Users, Download,
  MessageSquare, Clock, CheckCircle2,
  Tag, Plus, Heart, Activity, 
  FileText, Landmark, Calendar, Eye, 
  XCircle, Trash2, Edit2, ShieldAlert,
  Coins, Wallet, Layers, Award, Percent,
  TrendingUp, Scale, Settings, ExternalLink, Gift,
  Network, Share2, Database, Lock, Users2,
  HardDrive, LineChart, PieChart, GitBranch,
  Merge, AlertTriangle, UserPlus, Info
} from "lucide-react"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function FamilyTreeAdminManagement() {
  const [activeTab, setActiveTab] = React.useState("dashboard")

  const MOCK_TREES = [
    { id: "TR-001", name: "Al-Sayed Lineage", head: "Shaykh Omar", members: 450, privacy: "Private", status: "Verified", created: "Oct 2023", duplicates: 2 },
    { id: "TR-002", name: "Abdullah Family", head: "Ahmed Abdullah", members: 120, privacy: "Restricted", status: "Verified", created: "Nov 2023", duplicates: 0 },
    { id: "TR-003", name: "The Malik Estate", head: "Sara Malik", members: 85, privacy: "Public", status: "Under Review", created: "Jan 2024", duplicates: 5 },
    { id: "TR-004", name: "Quraishi Global Hub", head: "Hamza Q.", members: 1240, privacy: "Private", status: "Verified", created: "Sept 2023", duplicates: 12 },
  ];

  const PENDING_NODES = [
    { id: "NODE-101", name: "Hassan Al-Basri", relationship: "Great Grandfather", submittedBy: "Zaid Ali", tree: "Al-Basri Root", type: "New Node" },
    { id: "NODE-102", name: "Fatima Malik", relationship: "Spouse", submittedBy: "Omar K.", tree: "Malik Estate", type: "Connection" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-24">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-slate-900 uppercase tracking-tighter">Family Tree Management</h1>
        <p className="text-muted-foreground font-medium text-lg italic">Oversight for global lineages, relationship verifications, and ancestry groups.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex items-center justify-between bg-white p-2 rounded-2xl shadow-sm border overflow-x-auto no-scrollbar">
          <TabsList className="bg-transparent h-auto p-0 gap-1 flex justify-start min-w-max">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "all", label: "All Trees" },
              { id: "verification", label: "Approvals & Links" },
              { id: "privacy", label: "Privacy Standards" },
              { id: "governance", label: "Clans & Roots" },
              { id: "reviews", label: "Disputes" },
              { id: "growth", label: "Growth" },
              { id: "loyalty", label: "Loyalty" },
              { id: "billing", label: "Billing & Storage" }
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="rounded-xl data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-6 py-2.5 font-bold transition-all shadow-none border-none whitespace-nowrap uppercase text-[10px] tracking-widest"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* DASHBOARD */}
        <TabsContent value="dashboard" className="space-y-8 m-0 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Active Lineages</span>
                <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <Network className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">4,250</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">+12 new today</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Total Nodes</span>
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">85.4k</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Avg 20 per tree</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Pending Approvals</span>
                <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">124</p>
                <p className="text-[10px] font-bold text-red-500 uppercase">Action Required</p>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden">
              <CardHeader className="p-8 flex flex-row items-center justify-between border-b bg-slate-50/30">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-black text-slate-900">Node Approval Queue</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium">New member additions and relationship connections.</p>
                </div>
                <Button variant="outline" size="sm" className="rounded-xl font-black text-xs border-2">
                  View Full List
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableBody>
                    {PENDING_NODES.map((node) => (
                      <TableRow key={node.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <TableCell className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
                              <UserPlus className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="font-black text-slate-900 text-base">{node.name}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{node.relationship} in {node.tree}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none font-black text-[9px] uppercase px-3">
                            {node.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right px-8">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="icon" variant="ghost" className="rounded-xl text-emerald-600 hover:bg-emerald-50"><CheckCircle2 className="h-5 w-5" /></Button>
                            <Button size="icon" variant="ghost" className="rounded-xl text-rose-600 hover:bg-rose-50"><XCircle className="h-5 w-5" /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-slate-900 text-white p-10 relative overflow-hidden flex flex-col justify-between">
              <GitBranch className="absolute -top-4 -right-4 h-48 w-48 opacity-10 text-primary" />
              <div className="relative z-10 space-y-4">
                <h3 className="text-3xl font-black text-primary uppercase tracking-tighter">Root Ancestry</h3>
                <p className="text-slate-400 text-lg leading-relaxed italic">
                  Define high-level root ancestors to unify global clan branches and resolve ancestral overlaps.
                </p>
              </div>
              <div className="relative z-10 pt-8">
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 font-black uppercase text-xs tracking-widest shadow-2xl">
                  Add Root Ancestor
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* ALL TREES */}
        <TabsContent value="all" className="animate-in fade-in duration-500 m-0 space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 border-b space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input placeholder="Search lineages, IDs or heads..." className="pl-9 h-12 rounded-2xl bg-slate-50 border-none font-medium" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-xl h-12 gap-2 border-2 font-bold hover:bg-slate-50"><Merge className="h-4 w-4" /> Duplicate Tool</Button>
                  <Button variant="outline" className="rounded-xl h-12 gap-2 border-2 font-bold hover:bg-slate-50"><Filter className="h-4 w-4" /> Filters</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">ID / Created</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Lineage Name</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Family Head</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-center">Nodes</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-center">Dupes</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_TREES.map((tree) => (
                    <TableRow key={tree.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                      <TableCell className="px-8 py-5 font-black text-slate-900 text-xs">
                        {tree.id}<br /><span className="text-slate-400 font-bold uppercase">{tree.created}</span>
                      </TableCell>
                      <TableCell className="font-black text-slate-800 text-base">{tree.name}</TableCell>
                      <TableCell className="text-sm font-bold text-slate-500">{tree.head}</TableCell>
                      <TableCell className="text-center font-black text-sm text-primary">{tree.members}</TableCell>
                      <TableCell className="text-center">
                        {tree.duplicates > 0 ? (
                          <Badge className="bg-amber-50 text-amber-600 border-none font-black text-[9px] px-2">{tree.duplicates} Detected</Badge>
                        ) : (
                          <span className="text-slate-200">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <div className="flex items-center justify-end gap-2">
                          <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] px-3">
                            {tree.status}
                          </Badge>
                          <Button size="icon" variant="ghost" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical className="h-4 w-4" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* VERIFICATION & LINKS */}
        <TabsContent value="verification" className="animate-in fade-in duration-500 m-0 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
                <CardHeader className="p-8 border-b">
                  <CardTitle className="text-xl font-black">Connection Requests</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium italic">Moderation center for relationship links and user-to-node mapping.</p>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableBody>
                      {[
                        { name: "Ahmed Abdullah", action: "Link Request", target: "Abdullah Tree Node #44", date: "2 mins ago" },
                        { name: "Sara Malik", action: "Relationship Claim", target: "Father: Dr. Ibrahim Malik", date: "45 mins ago" },
                        { name: "Yusuf Sheikh", action: "New Node Addition", target: "Great Uncle: Omar Sheikh", date: "3 hours ago" },
                      ].map((item, i) => (
                        <TableRow key={i} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                          <TableCell className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner shrink-0">
                                <Share2 className="h-6 w-6" />
                              </div>
                              <div>
                                <p className="font-black text-slate-900 text-base">{item.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none font-black text-[9px] uppercase px-3">
                                {item.action}
                              </Badge>
                              <p className="text-[10px] font-medium text-slate-400 italic">{item.target}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right px-8">
                            <Button className="bg-primary hover:bg-primary/90 rounded-full font-black text-[10px] uppercase tracking-widest h-9 px-6 text-white shadow-md">Moderate</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-6">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-6 relative overflow-hidden">
                <ShieldCheck className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
                <div className="space-y-2 relative z-10">
                  <h3 className="text-xl font-black">Audit SLA Alert</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    12 relationship claims have been in the queue for more than 48 hours. Scholarly verification required for 3 claims.
                  </p>
                </div>
                <Button variant="secondary" className="w-full rounded-xl font-black text-xs h-12 shadow-2xl">Notify Scholars</Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* GOVERNANCE: CLANS & ROOTS */}
        <TabsContent value="governance" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10">
            <div className="space-y-10">
              <div className="space-y-2 border-b pb-6">
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Ancestral Governance</h3>
                <p className="text-muted-foreground font-medium text-lg italic">Define the rules for relationship validation and root ancestor management.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  {[
                    { label: "Mandatory Birth/Death Proof for Roots", active: true },
                    { label: "Scholar-Vetted Lineage Over 100 Years", active: true },
                    { label: "Multiple-Source Verification Rule", active: true },
                    { label: "Community Crowdsourcing for Public Roots", active: false },
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-pointer group shadow-sm">
                      <span className="font-bold text-slate-700 text-sm">{rule.label}</span>
                      <Badge className={rule.active ? "bg-emerald-500 text-white font-black text-[8px]" : "bg-slate-200 text-slate-500 font-black text-[8px]"}>
                        {rule.active ? "MANDATORY" : "OPTIONAL"}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-6 relative overflow-hidden flex flex-col justify-between">
                  <Scale className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-primary" />
                  <div className="space-y-2 relative z-10">
                    <h4 className="text-xl font-black text-primary uppercase tracking-tighter">Scholarly Oversight</h4>
                    <p className="text-slate-400 text-sm">Automated reminders for ancestral history re-audits.</p>
                  </div>
                  <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] h-12 uppercase tracking-widest relative z-10 shadow-xl bg-white text-slate-900">Manage Board</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* REVIEWS: DISPUTES */}
        <TabsContent value="reviews" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden border-2 border-rose-50">
            <CardHeader className="p-8 border-b flex flex-row items-center justify-between bg-rose-50/20">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black text-rose-600">Dispute Resolution Center</CardTitle>
                <p className="text-sm text-muted-foreground font-medium">Moderate conflicting relationship claims or ancestral overlaps.</p>
              </div>
              <Badge className="bg-rose-50 text-rose-600 border-none font-black px-4 h-8 flex items-center text-[9px] tracking-widest uppercase">5 PENDING DISPUTES</Badge>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-rose-50/10">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-rose-400">Claim ID</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-rose-400">Context & Nodes</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-rose-400 text-center">Type</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black uppercase text-[10px] tracking-widest text-rose-400">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: "DIS-901", context: "Al-Basri Tree", nodes: "Node #42 vs Node #88", reason: "Ancestral Overlap", date: "2h ago" },
                    { id: "DIS-902", context: "Malik Estate", nodes: "Parent Claim", reason: "Conflicting Records", date: "5h ago" },
                  ].map((dis, i) => (
                    <TableRow key={i} className="border-rose-50 hover:bg-rose-50/5 transition-colors group">
                      <TableCell className="px-8 py-6">
                        <div className="font-black text-slate-900 text-xs">{dis.id}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">{dis.date}</div>
                      </TableCell>
                      <TableCell>
                        <p className="font-black text-slate-800 text-base">{dis.nodes}</p>
                        <p className="text-[10px] font-bold text-rose-600 uppercase">in {dis.context}</p>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="border-rose-100 text-rose-600 bg-rose-50 font-black text-[9px] px-3 uppercase tracking-tighter">
                          {dis.reason}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="sm" className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black text-[10px] uppercase h-9 shadow-lg">Resolve</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* OTHER TABS - PLACEHOLDERS */}
        {["privacy", "growth", "loyalty", "billing"].map((tab) => (
          <TabsContent key={tab} value={tab} className="animate-in fade-in duration-500 m-0">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-20 text-center space-y-6">
              <div className="h-20 w-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-200 mx-auto">
                <Settings className="h-10 w-10 animate-spin-slow" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{tab.replace(/-/g, ' ')} Module</h3>
                <p className="text-muted-foreground font-medium max-w-sm mx-auto italic">
                  Advanced administrative engine for genealogy ecosystem oversight.
                </p>
              </div>
              <Button variant="outline" className="rounded-xl border-2 font-bold px-8">Refresh Console</Button>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Link href="/admin/dashboard">
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group">
          <div className="flex flex-col items-center">
            <ExternalLink className="h-5 w-5" />
            <span className="text-[8px] font-black uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Exit Panel</span>
          </div>
        </button>
      </Link>
    </div>
  )
}
