
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
  Merge, AlertTriangle, UserPlus, Info,
  Globe, Zap, ArrowRight, Save,
  BarChart, History, RefreshCcw
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
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-24">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground uppercase tracking-tighter">Family Tree Management</h1>
        <p className="text-muted-foreground font-medium text-sm sm:text-lg italic">Oversight for global lineages, relationship verifications, and ancestry groups.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex items-center justify-between bg-card p-2 rounded-2xl shadow-sm border overflow-x-auto no-scrollbar">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active Lineages</span>
                <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
                  <Network className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-4xl font-black text-foreground">4,250</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">+12 new today</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Total Nodes</span>
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-4xl font-black text-foreground">85.4k</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Avg 20 per tree</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Pending Approvals</span>
                <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-4xl font-black text-foreground">124</p>
                <p className="text-[10px] font-bold text-red-500 uppercase">Action Required</p>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
              <CardHeader className="p-8 flex flex-row items-center justify-between border-b bg-muted/30">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-black text-foreground">Node Approval Queue</CardTitle>
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
                      <TableRow key={node.id} className="border-border hover:bg-muted/50 transition-colors">
                        <TableCell className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner">
                              <UserPlus className="h-6 w-6" />
                            </div>
                            <div>
                              <p className="font-black text-foreground text-base">{node.name}</p>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{node.relationship} in {node.tree}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-muted text-muted-foreground border-none font-black text-[9px] uppercase px-3">
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

            <Card className="rounded-[2rem] border-none shadow-sm bg-zinc-900 text-white p-10 relative overflow-hidden flex flex-col justify-between">
              <GitBranch className="absolute -top-4 -right-4 h-48 w-48 opacity-10 text-primary" />
              <div className="relative z-10 space-y-4">
                <h3 className="text-3xl font-black text-primary uppercase tracking-tighter">Root Ancestry</h3>
                <p className="text-muted-foreground text-lg leading-relaxed italic">
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
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-8 border-b space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search lineages, IDs or heads..." className="pl-9 h-12 rounded-2xl bg-muted border-none font-medium" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-xl h-12 gap-2 border-2 font-bold hover:bg-muted"><Merge className="h-4 w-4" /> Duplicate Tool</Button>
                  <Button variant="outline" className="rounded-xl h-12 gap-2 border-2 font-bold hover:bg-muted"><Filter className="h-4 w-4" /> Filters</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">ID / Created</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Lineage Name</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Family Head</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-center">Nodes</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-center">Dupes</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_TREES.map((tree) => (
                    <TableRow key={tree.id} className="border-border hover:bg-muted/50 transition-colors group">
                      <TableCell className="px-8 py-5 font-black text-foreground text-xs">
                        {tree.id}<br /><span className="text-muted-foreground font-bold uppercase">{tree.created}</span>
                      </TableCell>
                      <TableCell className="font-black text-foreground text-base">{tree.name}</TableCell>
                      <TableCell className="text-sm font-bold text-muted-foreground">{tree.head}</TableCell>
                      <TableCell className="text-center font-black text-sm text-primary">{tree.members}</TableCell>
                      <TableCell className="text-center">
                        {tree.duplicates > 0 ? (
                          <Badge className="bg-amber-50 text-amber-600 border-none font-black text-[9px] px-2">{tree.duplicates} Detected</Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
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
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
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
                        <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                          <TableCell className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner shrink-0">
                                <Share2 className="h-6 w-6" />
                              </div>
                              <div>
                                <p className="font-black text-foreground text-base">{item.name}</p>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.date}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Badge variant="secondary" className="bg-muted text-muted-foreground border-none font-black text-[9px] uppercase px-3">
                                {item.action}
                              </Badge>
                              <p className="text-[10px] font-medium text-muted-foreground italic">{item.target}</p>
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
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-6 relative overflow-hidden">
                <ShieldCheck className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
                <div className="space-y-2 relative z-10">
                  <h3 className="text-xl font-black">Audit SLA Alert</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
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
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10">
            <div className="space-y-10">
              <div className="space-y-2 border-b pb-6">
                <h3 className="text-3xl font-black text-foreground uppercase tracking-tight">Ancestral Governance</h3>
                <p className="text-muted-foreground font-medium text-sm sm:text-lg italic">Define the rules for relationship validation and root ancestor management.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  {[
                    { label: "Mandatory Birth/Death Proof for Roots", active: true },
                    { label: "Scholar-Vetted Lineage Over 100 Years", active: true },
                    { label: "Multiple-Source Verification Rule", active: true },
                    { label: "Community Crowdsourcing for Public Roots", active: false },
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-muted rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-pointer group shadow-sm">
                      <span className="font-bold text-foreground text-sm">{rule.label}</span>
                      <Badge className={rule.active ? "bg-emerald-500 text-white font-black text-[8px]" : "bg-muted text-muted-foreground font-black text-[8px]"}>
                        {rule.active ? "MANDATORY" : "OPTIONAL"}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="bg-zinc-900 rounded-[2.5rem] p-10 text-white space-y-6 relative overflow-hidden flex flex-col justify-between">
                  <Scale className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-primary" />
                  <div className="space-y-2 relative z-10">
                    <h4 className="text-xl font-black text-primary uppercase tracking-tighter">Scholarly Oversight</h4>
                    <p className="text-muted-foreground text-sm">Automated reminders for ancestral history re-audits.</p>
                  </div>
                  <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] h-12 uppercase tracking-widest relative z-10 shadow-xl bg-card text-foreground">Manage Board</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* REVIEWS: DISPUTES */}
        <TabsContent value="reviews" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden border-2 border-rose-50">
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
                        <div className="font-black text-foreground text-xs">{dis.id}</div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase">{dis.date}</div>
                      </TableCell>
                      <TableCell>
                        <p className="font-black text-foreground text-base">{dis.nodes}</p>
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

        {/* GROWTH */}
        <TabsContent value="growth" className="animate-in fade-in duration-500 m-0 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">New Node Velocity</p>
                <h2 className="text-3xl font-black text-foreground">+850 / week</h2>
                <p className="text-xs font-bold text-emerald-600 uppercase">+12% vs Last Month</p>
              </div>
            </Card>
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Globe className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">Global Coverage</p>
                <h2 className="text-3xl font-black text-foreground">42 Countries</h2>
                <p className="text-xs font-bold text-blue-600 uppercase">Top: UAE, UK, India</p>
              </div>
            </Card>
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-4 relative overflow-hidden">
              <Zap className="absolute -top-4 -right-4 h-24 w-24 opacity-10 text-primary" />
              <div className="space-y-4 relative z-10">
                <p className="text-xs font-black uppercase tracking-widest opacity-80">Premium Upgrade Rate</p>
                <h2 className="text-3xl font-black leading-snug">18.4%</h2>
                <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] uppercase h-10 bg-primary text-white border-none">Analysis Hub</Button>
              </div>
            </Card>
          </div>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-8 border-b flex flex-row items-center justify-between bg-muted/30">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black">Regional Lineage Density</CardTitle>
                <p className="text-sm text-muted-foreground font-medium">Distribution of verified trees by geographic region.</p>
              </div>
              <Button variant="outline" className="rounded-xl border-2 font-black text-xs h-10 px-6">Export Map Data</Button>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="aspect-square bg-muted rounded-[3rem] border-4 border-white shadow-inner flex items-center justify-center relative overflow-hidden group">
                  <Globe className="h-48 w-48 text-muted-foreground group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-primary/5" />
                  <div className="absolute top-1/4 left-1/4 h-4 w-4 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50" />
                  <div className="absolute bottom-1/3 right-1/4 h-6 w-6 bg-primary/60 rounded-full animate-pulse shadow-lg shadow-primary/50" />
                  <div className="absolute top-1/2 right-1/2 h-3 w-3 bg-primary/80 rounded-full animate-pulse shadow-lg shadow-primary/50" />
                </div>
                <div className="space-y-6">
                  {[
                    { region: "Middle East", count: "1,240", val: 85, color: "bg-primary" },
                    { region: "Europe", count: "850", val: 62, color: "bg-blue-500" },
                    { region: "South Asia", count: "1,142", val: 78, color: "bg-amber-500" },
                    { region: "North America", count: "420", val: 35, color: "bg-rose-500" },
                  ].map((reg, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center text-sm font-black text-foreground">
                        <span>{reg.region}</span>
                        <span className="text-muted-foreground">{reg.count} Trees</span>
                      </div>
                      <Progress value={reg.val} className={`h-2.5 ${reg.color}`} />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* LOYALTY */}
        <TabsContent value="loyalty" className="animate-in fade-in duration-500 m-0 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-primary text-primary-foreground p-10 relative overflow-hidden">
                <Coins className="absolute -top-4 -right-4 h-48 w-48 opacity-10" />
                <div className="relative z-10 space-y-8">
                  <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Legacy Coins Issued</p>
                    <h2 className="text-4xl sm:text-7xl font-black tracking-tighter">1.24M</h2>
                    <div className="flex items-center gap-2 text-sm font-bold bg-card/20 w-fit px-4 py-1.5 rounded-full backdrop-blur-md">
                      <TrendingUp className="h-4 w-4" /> +15.4% Contribution Lift
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-1">Top Contributors</p>
                      <p className="text-2xl font-black">450 Scholars</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-1">Avg Earn Rate</p>
                      <p className="text-2xl font-black">50 Pts/Node</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase opacity-60 tracking-widest mb-1">Total Redeemed</p>
                      <p className="text-2xl font-black">840k</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
                <CardHeader className="p-8 border-b bg-muted/30">
                  <CardTitle className="text-xl font-black">Contributor Leaderboard</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium italic">Rewarding users for verified historical data and document uploads.</p>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-muted/50">
                      <TableRow className="border-none">
                        <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Rank / Contributor</TableHead>
                        <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Contributions</TableHead>
                        <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground text-center">Trust Rating</TableHead>
                        <TableHead className="text-right px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Earnings</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { rank: 1, name: "Shaykh Hamza", contribs: 124, rating: 5.0, earnings: "12,450" },
                        { rank: 2, name: "Dr. Aisha Khalil", contribs: 85, rating: 4.9, earnings: "8,500" },
                        { rank: 3, name: "Omar Siddiqui", contribs: 42, rating: 4.8, earnings: "4,200" },
                      ].map((con, i) => (
                        <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                          <TableCell className="px-8 py-5">
                            <div className="flex items-center gap-4">
                              <span className="font-black text-muted-foreground">#0{con.rank}</span>
                              <p className="font-bold text-foreground text-sm">{con.name}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-bold text-muted-foreground text-xs">{con.contribs} Verified Nodes</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1 font-black text-sm text-amber-500">
                              <Star className="h-3.5 w-3.5 fill-current" /> {con.rating}
                            </div>
                          </TableCell>
                          <TableCell className="text-right px-8 font-black text-primary text-sm">
                            {con.earnings} <span className="text-[9px] opacity-60">COINS</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6">
                <h3 className="text-xl font-black text-foreground">Points Management</h3>
                <div className="space-y-4">
                  {[
                    { label: "Document Upload", pts: "100 Pts" },
                    { label: "New Relationship Link", pts: "25 Pts" },
                    { label: "Duplicate Fix", pts: "50 Pts" },
                    { label: "Scholarly Review", pts: "500 Pts" },
                  ].map((perk, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-2xl border border-transparent hover:border-primary/20 transition-all group cursor-pointer">
                      <span className="text-xs font-bold text-foreground uppercase tracking-tighter">{perk.label}</span>
                      <Badge variant="outline" className="border-primary/30 text-primary font-black text-[10px]">{perk.pts}</Badge>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-12 font-black uppercase text-[10px] tracking-widest shadow-xl">
                  Adjust Ratios
                </Button>
              </Card>

              <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-6 relative overflow-hidden">
                <Award className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-primary" />
                <div className="relative z-10 space-y-2">
                  <h4 className="text-xl font-black text-primary uppercase tracking-tighter">Contributor Badges</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Automatically award "Historian" or "Verified Scholar" badges to users reaching 10k points.
                  </p>
                </div>
                <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] h-12 uppercase tracking-widest relative z-10">Configure Badges</Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* BILLING & STORAGE */}
        <TabsContent value="billing" className="animate-in fade-in duration-500 m-0 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">Ancestry Infrastructure</h3>
                  <Button variant="ghost" className="font-black text-xs text-primary uppercase tracking-widest">Pricing PDF <ExternalLink className="ml-2 h-4 w-4" /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-muted rounded-[2rem] space-y-4 border shadow-inner">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">Storage Utilization</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-end">
                        <p className="text-2xl sm:text-4xl font-black text-foreground">4.2TB</p>
                        <p className="text-xs font-bold text-muted-foreground">/ 5.0TB Cap</p>
                      </div>
                      <Progress value={84} className="h-3 bg-muted" />
                    </div>
                    <p className="text-[10px] font-bold text-amber-600 uppercase">Approaching 85% Warning</p>
                  </div>
                  <div className="p-8 bg-muted rounded-[2rem] space-y-4 border shadow-inner">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">Premium MRR</p>
                    <div className="space-y-1">
                      <p className="text-2xl sm:text-4xl font-black text-foreground">₹842k</p>
                      <p className="text-xs font-bold text-emerald-600 uppercase">+15% Monthly Growth</p>
                    </div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">From 1,240 Ancestry Plus users</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h4 className="text-sm font-black uppercase text-muted-foreground tracking-widest px-2">Cloud Provider Invoices</h4>
                  <div className="divide-y border rounded-[2rem] overflow-hidden">
                    {[
                      { id: "INV-CLD-991", service: "Google Cloud Storage", amount: "₹45,000", date: "Nov 01", status: "Paid" },
                      { id: "INV-CLD-992", service: "Media Optimization CDN", amount: "₹12,200", date: "Oct 28", status: "Paid" },
                    ].map((inv, i) => (
                      <div key={i} className="p-6 bg-card flex items-center justify-between text-xs font-bold group hover:bg-muted transition-colors">
                        <span className="text-muted-foreground">{inv.id}</span>
                        <span className="text-foreground flex-1 px-8">{inv.service}</span>
                        <span className="text-primary px-8">{inv.amount}</span>
                        <Badge className="bg-emerald-50 text-emerald-600 border-none px-3">{inv.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-10 space-y-8 relative overflow-hidden flex flex-col justify-between h-full">
                <Database className="absolute -top-4 -right-4 h-48 w-48 opacity-10 text-primary" />
                <div className="relative z-10 space-y-6">
                  <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Resource Reserve</p>
                    <h2 className="text-3xl sm:text-6xl font-black tracking-tighter text-primary">₹1.2M</h2>
                    <p className="text-xs font-bold text-muted-foreground uppercase leading-relaxed">
                      Infrastructure budget allocated for ancestry media optimization.
                    </p>
                  </div>
                  <div className="p-6 bg-card/5 rounded-2xl border border-white/10 space-y-4">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-muted-foreground">Media Compression</span>
                      <span className="text-emerald-400">OPTIMAL</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                      <span className="text-muted-foreground">Archive Indexing</span>
                      <span className="text-primary">RUNNING</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 relative z-10">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-2xl h-14 font-black uppercase text-xs tracking-widest shadow-xl">Infrastructure Hub</Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-card/10 rounded-2xl h-14 font-black uppercase text-xs tracking-widest">Manage Storage Cap</Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Link href="/admin/dashboard">
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-zinc-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group">
          <div className="flex flex-col items-center">
            <ExternalLink className="h-5 w-5" />
            <span className="text-[8px] font-black uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Exit Panel</span>
          </div>
        </button>
      </Link>
    </div>
  )
}
