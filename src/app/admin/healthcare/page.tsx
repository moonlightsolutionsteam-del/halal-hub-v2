
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
  Stethoscope, HeartPulse, Pill, Microscope, Zap
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import Link from "next/link"

export default function SuperAdminHealthcareManagement() {
  const [activeTab, setActiveTab] = React.useState("dashboard")

  const MOCK_CLINICS = [
    { id: "HC-001", name: "Safe Care Medical Hub", city: "New York, USA", type: "Clinic", status: "Verified", rating: 4.9, staff: 15 },
    { id: "HC-002", name: "Sunnah Wellness", city: "London, UK", type: "Wellness", status: "Verified", rating: 4.8, staff: 8 },
    { id: "HC-003", name: "Amanah Pharmacy", city: "Dubai, UAE", type: "Pharmacy", status: "Audit Needed", rating: 4.7, staff: 5 },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-7xl mx-auto pb-24">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground uppercase tracking-tighter text-teal-600">Healthcare & Wellness</h1>
        <p className="text-muted-foreground font-medium text-sm sm:text-lg italic">Manage clinical partners, ethical care standards, and wellness audits.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <div className="flex items-center justify-between bg-card p-2 rounded-2xl shadow-sm border overflow-x-auto no-scrollbar">
          <TabsList className="bg-transparent h-auto p-0 gap-1 flex justify-start min-w-max">
            {[
              { id: "dashboard", label: "Dashboard" },
              { id: "all", label: "All Facilities" },
              { id: "verification", label: "Verification" },
              { id: "governance", label: "Ethical Standards" },
              { id: "reviews", label: "Reviews" },
              { id: "offers", label: "Offers" },
              { id: "loyalty", label: "Loyalty" },
              { id: "certificates", label: "Certificates" },
              { id: "categories", label: "Specialties" },
              { id: "billing", label: "Wallet & Billing" }
            ].map((tab) => (
              <TabsTrigger 
                key={tab.id}
                value={tab.id} 
                className="rounded-xl data-[state=active]:bg-teal-50 data-[state=active]:text-teal-600 px-6 py-2.5 font-bold transition-all shadow-none border-none whitespace-nowrap uppercase text-[10px] tracking-widest"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="dashboard" className="space-y-8 m-0 animate-in fade-in duration-500">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Certified Clinics</span>
                <div className="h-10 w-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
                  <Stethoscope className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-4xl font-black text-foreground">115</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase">+4 since last month</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Ethical Care Score</span>
                <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-4xl font-black text-foreground">99.8%</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Patient trust rating</p>
              </div>
            </Card>

            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active Patients</span>
                <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Users className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-4xl font-black text-foreground">12.4k</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Community members</p>
              </div>
            </Card>
          </div>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-8 flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-black text-foreground">Ethical Standards Audits</CardTitle>
                <p className="text-sm text-muted-foreground font-medium">Monitoring gender privacy protocols and ingredient purity in pharmacies.</p>
              </div>
              <Button size="sm" className="bg-teal-600 hover:bg-teal-700 rounded-xl font-black text-xs h-10 px-6 text-white group shadow-lg shadow-teal-200">
                Begin Audit <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Facility</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Audit Type</TableHead>
                    <TableHead className="h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground text-center">Score</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black uppercase text-[10px] tracking-widest">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: "Safe Care Medical Hub", type: "Awrah Privacy", score: "100%", status: "Verified" },
                    { name: "Amanah Pharmacy", type: "Ingredient Purity", score: "99%", status: "Active" },
                  ].map((item, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-8 py-5 font-bold text-foreground text-sm">{item.name}</TableCell>
                      <TableCell className="font-bold text-muted-foreground text-xs italic">{item.type}</TableCell>
                      <TableCell className="text-center font-black text-[10px] text-emerald-600 uppercase">{item.score}</TableCell>
                      <TableCell className="text-right px-8">
                        <Badge className={item.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-none px-3 font-black text-[9px]' : 'bg-blue-50 text-blue-600 border-none px-3 font-black text-[9px]'}>
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

        <TabsContent value="governance" className="animate-in fade-in duration-500 m-0">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10">
            <div className="space-y-10">
              <div className="space-y-2 border-b pb-6">
                <h3 className="text-3xl font-black text-foreground uppercase tracking-tight">Clinical & Ethical Standards</h3>
                <p className="text-muted-foreground font-medium text-sm sm:text-lg italic">Define the mandatory criteria for clinical and wellness partners.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  {[
                    { label: "Awrah Privacy Protocol (Gender Segregation)", active: true },
                    { label: "Sunnah-Based Wellness Certification", active: true },
                    { label: "Pharmaceutical Ingredient Transparency", active: true },
                    { label: "Sterilization & Hygiene Registry", active: true },
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-muted rounded-2xl border border-transparent hover:border-teal-200 transition-all cursor-pointer group shadow-sm">
                      <span className="font-bold text-foreground text-sm">{rule.label}</span>
                      <Badge className={rule.active ? "bg-emerald-500 text-white font-black text-[8px]" : "bg-muted text-muted-foreground font-black text-[8px]"}>
                        {rule.active ? "MANDATORY" : "OPTIONAL"}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="bg-zinc-900 rounded-[2.5rem] p-10 text-white space-y-6 relative overflow-hidden flex flex-col justify-between">
                  <Activity className="absolute -top-4 -right-4 h-32 w-32 opacity-10 text-teal-400" />
                  <div className="space-y-2 relative z-10">
                    <h4 className="text-xl font-black text-teal-400 uppercase tracking-tighter">Practitioner Audit</h4>
                    <p className="text-muted-foreground text-sm">Schedule board reviews for clinical staff qualifications.</p>
                  </div>
                  <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] h-12 uppercase tracking-widest relative z-10 shadow-xl bg-card text-foreground">Begin Staff Review</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="loyalty" className="animate-in fade-in duration-500 m-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-teal-600 text-white p-10 relative overflow-hidden">
                <Coins className="absolute -top-4 -right-4 h-48 w-48 opacity-10" />
                <div className="relative z-10 space-y-8">
                  <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Wellness Coin Distribution</p>
                    <h2 className="text-4xl sm:text-7xl font-black tracking-tighter">1.2M</h2>
                    <div className="flex items-center gap-2 text-sm font-bold bg-card/20 w-fit px-4 py-1.5 rounded-full backdrop-blur-md">
                      <TrendingUp className="h-4 w-4" /> +15% patient retention
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase opacity-60 tracking-widest leading-none mb-1">Loyal Patients</p>
                      <p className="text-2xl font-black">8.4k</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase opacity-60 tracking-widest leading-none mb-1">Redemptions</p>
                      <p className="text-2xl font-black">5.2k</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase opacity-60 tracking-widest leading-none mb-1">Avg Saving</p>
                      <p className="text-2xl font-black">₹120</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-black text-foreground">Care Tiers</h3>
                  <p className="text-sm text-muted-foreground font-medium italic">Manage how patients earn Hub Coins for clinical visits and wellness therapies.</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Standard Consult", rate: "5 Coins / Visit" },
                    { label: "Wellness Member Multiplier", rate: "1.5x Multiplier" },
                    { label: "Health Check Bonus", rate: "100 Flat Coins" },
                  ].map((tier, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-2xl border">
                      <span className="text-[10px] font-black text-muted-foreground uppercase tracking-tighter">{tier.label}</span>
                      <span className="text-sm font-black text-teal-600">{tier.rate}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl h-12 font-black uppercase text-[10px] tracking-widest">Adjust Ratios</Button>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Other Tabs - Wrapped for consistent high-fidelity UI */}
        {["all", "verification", "reviews", "offers", "certificates", "categories", "billing"].map((tab) => (
          <TabsContent key={tab} value={tab} className="animate-in fade-in duration-500 m-0">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-20 text-center space-y-6">
              <div className="h-20 w-20 rounded-[2rem] bg-muted flex items-center justify-center text-muted-foreground mx-auto">
                <Settings className="h-10 w-10 animate-spin-slow" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">{tab.replace(/-/g, ' ')} Module</h3>
                <p className="text-muted-foreground font-medium max-w-sm mx-auto italic">
                  Managing the ethical clinical network and global healthcare standards.
                </p>
              </div>
              <Button variant="outline" className="rounded-xl border-2 font-bold px-8 h-12 border-teal-100 text-teal-600 hover:bg-teal-50">Refresh Registry</Button>
            </Card>
          </TabsContent>
        ))}
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
