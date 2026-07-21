// @ts-nocheck

"use client"

import * as React from "react"
import {
  Search, Filter, MoreVertical, Plus,
  Wrench, Star, MapPin, ShieldCheck,
  CheckCircle2, Clock, XCircle, ArrowUpRight,
  Edit2, Trash2, Download
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAdminCategory } from "@/hooks/use-admin-category"

export default function SuperAdminProfessionalsPage() {
  const [activeTab, setActiveTab] = React.useState("all")
  const [search, setSearch] = React.useState("")
  const cat = useAdminCategory(["Professional Services", "Healthcare", "Legal", "Finance", "Architecture", "IT Services", "Consulting"])

  const allProfessionals = cat.businesses.map(b => ({
    id: b.id,
    name: b.name,
    type: b.subcategory ?? b.category,
    city: b.city ?? "—",
    country: b.country ?? "—",
    rating: b.rating ?? 0,
    status: b.status ?? "unknown",
    halal_verified: b.halal_verified ?? false,
  }))

  const MOCK_PROFESSIONALS = search
    ? allProfessionals.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.city.toLowerCase().includes(search.toLowerCase()))
    : allProfessionals

  const total = allProfessionals.length
  const active = allProfessionals.filter(p => p.status === "active").length
  const pending = allProfessionals.filter(p => p.status === "pending").length
  const verified = allProfessionals.filter(p => p.halal_verified).length

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen pb-24">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-4 border-b">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-blue-600 font-black uppercase tracking-widest text-[10px]">
            <Wrench className="h-3 w-3" /> Directory Hub
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-headline text-foreground tracking-tighter">PROFESSIONALS</h1>
          <p className="text-muted-foreground font-medium text-sm sm:text-lg italic">Manage verified service professionals across all disciplines.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-2xl px-6 font-black border-2 h-12 gap-2 bg-card hover:bg-muted shadow-sm">
            <Download className="h-4 w-4" /> Export
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-8 font-black shadow-2xl h-12 gap-2">
            <Plus className="h-4 w-4" /> Add Professional
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {[
          { label: "Total Professionals", value: total, sub: "All disciplines", icon: Wrench, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Active Profiles", value: active, sub: "Live on platform", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Review", value: pending, sub: "Awaiting approval", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Halal Verified", value: verified, sub: "Trust certified", icon: ShieldCheck, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm rounded-[2.5rem] p-8 bg-card group hover:shadow-xl transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none">{stat.label}</span>
                <div className="text-4xl font-black text-foreground tracking-tighter">{stat.value}</div>
              </div>
              <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{stat.sub}</p>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="bg-card p-2 rounded-2xl shadow-sm border overflow-x-auto no-scrollbar">
          <TabsList className="bg-transparent h-auto p-0 gap-1 flex justify-start min-w-max">
            {[
              { id: "all", label: "All Professionals" },
              { id: "pending", label: "Pending Review" },
              { id: "verified", label: "Halal Verified" },
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

        <TabsContent value="all" className="m-0 animate-in fade-in duration-500">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-8 border-b">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by name, type, or city..." className="pl-9 h-12 rounded-2xl bg-muted border-none font-medium" value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <Button variant="outline" className="rounded-xl h-12 gap-2 border-2 font-bold">
                  <Filter className="h-4 w-4" /> Filters
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Professional</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Location</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground text-center">Rating</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_PROFESSIONALS.map((pro) => (
                    <TableRow key={pro.id} className="border-border hover:bg-muted/50 transition-colors group">
                      <TableCell className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                            <Wrench className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-black text-foreground text-base">{pro.name}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">{pro.type}</p>
                              {pro.halal_verified && (
                                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                              )}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {pro.city}, {pro.country}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1 font-black text-sm text-amber-500">
                          <Star className="h-3.5 w-3.5 fill-current" /> {pro.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={
                          pro.status === 'active'
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200 font-black text-[9px] px-3'
                            : 'bg-amber-50 text-amber-600 border-amber-200 font-black text-[9px] px-3'
                        }>
                          {pro.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button size="icon" variant="ghost" className="rounded-xl"><Edit2 className="h-4 w-4 text-muted-foreground" /></Button>
                          <Button size="icon" variant="ghost" className="rounded-xl hover:text-rose-600"><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="m-0 animate-in fade-in duration-500">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Professional</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Location</TableHead>
                    <TableHead className="text-right px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_PROFESSIONALS.filter(p => p.status === "pending").map((pro) => (
                    <TableRow key={pro.id} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-8 py-5">
                        <p className="font-black text-foreground text-base">{pro.name}</p>
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">{pro.type}</p>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-muted-foreground">{pro.city}, {pro.country}</TableCell>
                      <TableCell className="text-right px-8">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full font-black text-[10px] uppercase tracking-widest h-9 px-6 shadow-md">
                          Begin Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verified" className="m-0 animate-in fade-in duration-500">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Professional</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Location</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground text-center">Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_PROFESSIONALS.filter(p => p.halal_verified).map((pro) => (
                    <TableRow key={pro.id} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                          <div>
                            <p className="font-black text-foreground text-base">{pro.name}</p>
                            <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">{pro.type}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-bold text-muted-foreground">{pro.city}, {pro.country}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1 font-black text-sm text-amber-500">
                          <Star className="h-3.5 w-3.5 fill-current" /> {pro.rating}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Link href="/admin/dashboard">
        <button className="fixed bottom-8 right-8 w-16 h-16 bg-zinc-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 group border-4 border-white active:scale-95">
          <div className="flex flex-col items-center">
            <ExternalLink className="h-6 w-6" />
            <span className="text-[8px] font-black uppercase mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Exit Panel</span>
          </div>
        </button>
      </Link>
    </div>
  )
}
