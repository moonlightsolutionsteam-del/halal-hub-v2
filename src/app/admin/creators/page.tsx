
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
  PenTool, Video, Mic, Play, Film, Globe,
  Zap, Share2, HeartPulse, UserPlus
} from "lucide-react"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function SuperAdminCreatorsManagement() {
  const [activeTab, setActiveTab] = React.useState("dashboard")

  const MOCK_CREATORS = [
    { id: "CRT-001", name: "Shaykh Hamza", type: "Scholar", specialty: "Modern Fiqh", reach: "250k", status: "Verified", rating: 5.0 },
    { id: "CRT-002", name: "The Halal Foodie", type: "Influencer", specialty: "Fine Dining", reach: "120k", status: "Verified", rating: 4.8 },
    { id: "CRT-003", name: "Amina's Art", type: "Artist", specialty: "Calligraphy", reach: "45k", status: "Vetting", rating: 4.9 },
    { id: "CRT-004", name: "Zaid's Wellness", type: "Educator", specialty: "Sunnah Health", reach: "15k", status: "Verified", rating: 4.7 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-24">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-slate-900 uppercase tracking-tighter text-blue-600">Creators & Studio</h1>
        <p className="text-muted-foreground font-medium text-lg italic">Oversight for global influencers, scholars, and digital reps within the ecosystem.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex items-center justify-between bg-white p-2 rounded-2xl shadow-sm border overflow-x-auto no-scrollbar">
          <TabsList className="bg-transparent h-auto p-0 gap-1 flex justify-start min-w-max">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "all", label: "All Creators" },
              { id: "verification", label: "Identity Vetting" },
              { id: "governance", label: "Content Standards" },
              { id: "reviews", label: "Sentiment" },
              { id: "offers", label: "Brand Deals" },
              { id: "loyalty", label: "Rewards" },
              { id: "certificates", label: "Badges" },
              { id: "categories", label: "Specialties" },
              { id: "billing", label: "Royalties" }
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="rounded-xl data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 px-6 py-2.5 font-bold transition-all shadow-none border-none whitespace-nowrap uppercase text-[10px] tracking-widest"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* DASHBOARD TAB */}
        <TabsContent value="dashboard" className="space-y-8 m-0 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Active Creators</span>
                <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <PenTool className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">4,250</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">+124 this month</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Global Reach</span>
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Play className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">1.2M+</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Monthly impressions</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Creator Revenue</span>
                <div className="h-10 w-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                  <Wallet className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-slate-900">₹8.4M</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Total disbursements</p>
              </div>
            </Card>
          </div>

          <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black text-slate-900">Vetting Queue</CardTitle>
                <p className="text-sm text-muted-foreground font-medium italic">Pending creator profiles awaiting identity and scholarship verification.</p>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 rounded-xl font-black text-xs h-10 px-6 text-white group shadow-lg shadow-blue-200">
                Full Queue <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Creator</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Type</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-slate-400 text-center">Reach</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black uppercase text-[10px] tracking-widest text-slate-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Dr. Aisha Khalil", type: "Scholar", reach: "12k", status: "Identity Checked" },
                    { name: "Modest Fit Sam", type: "Influencer", reach: "85k", status: "Pending Audit" },
                  ].map((item, i) => (
                    <TableRow key={i} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="px-8 py-5 font-bold text-slate-800 text-sm">{item.name}</TableCell>
                      <TableCell className="font-bold text-slate-500 text-xs italic">{item.type}</TableCell>
                      <TableCell className="text-center font-black text-[10px] text-blue-600 uppercase">{item.reach}</TableCell>
                      <TableCell className="text-right px-8">
                        <Badge className="bg-amber-50 text-amber-600 border-none font-black text-[9px] px-3 uppercase tracking-widest">
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ALL CREATORS TAB */}
        <TabsContent value="all" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-8 border-b space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input placeholder="Search creators by name, ID or specialty..." className="pl-9 h-12 rounded-2xl bg-slate-50 border-none font-medium" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-xl h-12 gap-2 border-2 font-bold"><Filter className="h-4 w-4" /> Filters</Button>
                  <Button className="bg-blue-600 hover:bg-blue-700 rounded-2xl h-12 px-8 font-black text-white shadow-lg shadow-blue-200">
                    <UserPlus className="mr-2 h-4 w-4" /> Add Creator
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Creator Identity</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Reach</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-center">Trust Rating</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Status</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_CREATORS.map((crt) => (
                    <TableRow key={crt.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                      <TableCell className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-10 w-10 border-2 border-slate-50">
                            <AvatarImage src={`https://picsum.photos/seed/${crt.id}/100/100`} />
                            <AvatarFallback>{crt.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-black text-slate-800 text-base">{crt.name}</p>
                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">{crt.id} • {crt.type}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-black text-slate-900 text-sm">
                        {crt.reach}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-1.5 font-black text-sm text-amber-500">
                          <Star className="h-3.5 w-3.5 fill-current border-none" /> {crt.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          crt.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 font-black text-[9px] px-3' : 'bg-amber-50 text-amber-600 border-amber-200 font-black text-[9px] px-3'
                        }>
                          {crt.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="ghost" className="rounded-xl"><Edit2 className="h-4 w-4 text-slate-400" /></Button>
                          <Button size="icon" variant="ghost" className="rounded-xl hover:text-rose-600 transition-colors"><Trash2 className="h-4 w-4 text-slate-400" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* VERIFICATION TAB */}
        <TabsContent value="verification" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
                <CardHeader className="p-8 border-b">
                  <CardTitle className="text-xl font-black">Identity Audit Queue</CardTitle>
                  <p className="text-sm text-muted-foreground font-medium italic">Creators awaiting KYC, scholarly credential vetting, or social profile linkage.</p>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableBody>
                      {[
                        { name: "Global Tajweed Hub", docs: 5, date: "2 mins ago", type: "Scholar Audit" },
                        { name: "Cooking with Zaid", docs: 3, date: "45 mins ago", type: "Social Link" },
                        { name: "The Modest Runway", docs: 8, date: "3 hours ago", type: "Business KYC" },
                      ].map((item, i) => (
                        <TableRow key={i} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                          <TableCell className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner shrink-0">
                                <FileText className="h-6 w-6" />
                              </div>
                              <div>
                                <p className="font-black text-slate-900 text-base">{item.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none font-black text-[9px] uppercase px-3">
                              {item.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                              <Layers className="h-3.5 w-3.5" /> {item.docs} Certificates
                            </div>
                          </TableCell>
                          <TableCell className="text-right px-8">
                            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full font-black text-[10px] uppercase tracking-widest h-9 px-6 text-white shadow-md">Begin Vetting</Button>
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
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    12 high-reach profiles have been in the queue for more than 48 hours. Fresh campaign deployments are prioritized.
                  </p>
                </div>
                <Button variant="secondary" className="w-full rounded-xl font-black text-xs h-12 shadow-2xl">Prioritize Queue</Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* GOVERNANCE TAB */}
        <TabsContent value="governance" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10">
            <div className="space-y-10">
              <div className="space-y-2 border-b pb-6">
                <h3 className="text-3xl font-black text-slate-900">Content Integrity Standards</h3>
                <p className="text-muted-foreground font-medium text-lg italic">Define protocols for digital content, scholarly accuracy, and community ethics.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  {[
                    { label: "Scholar-Vetted Theological Content", active: true },
                    { label: "Mandatory Modesty Disclosure (Reels)", active: true },
                    { label: "Zero Ad-Support for Spiritual Media", active: true },
                    { label: "Authentic Source Metadata Rule", active: false },
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-600/20 transition-all cursor-pointer group shadow-sm">
                      <span className="font-bold text-slate-700">{rule.label}</span>
                      <Badge className={rule.active ? "bg-emerald-500 text-white font-black text-[8px]" : "bg-slate-200 text-slate-500 font-black text-[8px]"}>
                        {rule.active ? "MANDATORY" : "OPTIONAL"}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-6 relative overflow-hidden flex flex-col justify-between">
                  <Scale className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-blue-400" />
                  <div className="space-y-2 relative z-10">
                    <h4 className="text-xl font-black text-blue-400 uppercase tracking-tighter">Scholarly Audit</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Automated reminders for religious content re-vetting. Set the frequency for platform-wide re-verification.
                    </p>
                  </div>
                  <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] h-12 uppercase tracking-widest relative z-10 shadow-xl bg-white text-slate-900">Manage Audit Board</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* BILLING TAB */}
        <TabsContent value="billing" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-black text-slate-900">Royalty & Payout Ledger</h3>
                  <Button variant="ghost" className="font-black text-xs text-blue-600 uppercase tracking-widest">Policy PDF <ExternalLink className="ml-2 h-4 w-4" /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-slate-50 rounded-[2rem] space-y-2 border shadow-inner text-center">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Commission Rate</p>
                    <p className="text-3xl font-black text-slate-900">10.0% <span className="text-sm font-bold text-slate-400 italic">flat</span></p>
                    <p className="text-xs font-bold text-emerald-600">On brand collaboration deals</p>
                  </div>
                  <div className="p-8 bg-slate-50 rounded-[2rem] space-y-2 border shadow-inner text-center">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Net Payouts (MTD)</p>
                    <p className="text-3xl font-black text-slate-900">₹842k</p>
                    <p className="text-xs font-bold text-slate-400 uppercase">Creator vertical activity</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-black uppercase text-slate-400 tracking-widest px-2">Recent Settlements</h4>
                  <div className="divide-y border rounded-[2rem] overflow-hidden">
                    {[
                      { id: "SET-CRT-991", merchant: "The Halal Grill Master", amount: "₹45,000", status: "Released", date: "Nov 01" },
                      { id: "SET-CRT-992", merchant: "Noor Studio", amount: "₹12,200", status: "Processing", date: "Oct 30" },
                    ].map((set, i) => (
                      <div key={i} className="p-6 bg-white flex items-center justify-between text-xs font-bold hover:bg-slate-50 transition-colors">
                        <span className="text-slate-400">{set.id}</span>
                        <span className="text-slate-900 flex-1 px-8 font-black">{set.merchant}</span>
                        <span className="text-blue-600 px-8 font-black">{set.amount}</span>
                        <Badge className={set.status === 'Released' ? 'bg-emerald-50 text-emerald-600 border-none px-3 font-black text-[8px]' : 'bg-blue-50 text-blue-600 border-none px-3 font-black text-[8px]'}>{set.status}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-6 relative overflow-hidden flex flex-col justify-between h-full">
                <Wallet className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-blue-400" />
                <div className="relative z-10 space-y-2">
                  <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Vertical Liquidity</p>
                  <h2 className="text-5xl font-black tracking-tighter text-blue-400">₹1.2M</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase leading-relaxed">
                    Reserve budget for creator payouts, bonus incentives, and ad-rev mitigation.
                  </p>
                </div>
                <div className="space-y-4 relative z-10">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-14 font-black uppercase text-[10px] tracking-widest shadow-xl">Financial Health</Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 rounded-xl h-14 font-black uppercase text-[10px] tracking-widest">Audit Payout Rules</Button>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* OTHER TABS - Consistent High-Fidelity Placeholder UI */}
        {["reviews", "offers", "loyalty", "certificates", "categories"].map((tab) => (
          <TabsContent key={tab} value={tab} className="animate-in fade-in duration-500 m-0">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-20 text-center space-y-6">
              <div className="h-20 w-20 rounded-[2rem] bg-slate-50 flex items-center justify-center text-slate-200 mx-auto">
                <Settings className="h-10 w-10 animate-spin-slow" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{tab.replace(/-/g, ' ')} Engine</h3>
                <p className="text-muted-foreground font-medium max-w-sm mx-auto italic">
                  Managing global creator standards and engagement metrics across the network.
                </p>
              </div>
              <Button variant="outline" className="rounded-xl border-2 font-bold px-8 h-12 border-blue-100 text-blue-600 hover:bg-blue-50 uppercase text-xs tracking-widest">Refresh Registry</Button>
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
