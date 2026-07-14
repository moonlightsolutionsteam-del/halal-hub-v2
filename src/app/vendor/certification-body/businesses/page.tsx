"use client"

import { useState } from "react"
import { Search, Link2, Clock, ShieldCheck, ArrowUpRight, CheckCircle2, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const PENDING = [
  { business: "Al-Noor Catering",   submitted: "1 day ago",  status: "pending" },
  { business: "Pure Life Cosmetics", submitted: "3 days ago", status: "docs_needed" },
]

const CERTIFIED = [
  { business: "Medina Meats",      certNum: "HI-IND-2024-091", expiry: "2025-06-30", status: "active" },
  { business: "Zam Zam Finance",   certNum: "HI-IND-2024-085", expiry: "2025-03-15", status: "active" },
  { business: "Barakah Grocers",   certNum: "HI-IND-2023-072", expiry: "2024-08-01", status: "expiring" },
  { business: "Karim's Restaurant",certNum: "HI-IND-2022-045", expiry: "2023-06-30", status: "expired" },
]

const STATUS_STYLES: Record<string, string> = {
  active:    "bg-emerald-50 text-emerald-600 border-emerald-200",
  expiring:  "bg-amber-50 text-amber-600 border-amber-200",
  expired:   "bg-red-50 text-red-600 border-red-200",
}

export default function BusinessLinksPage() {
  const [search, setSearch] = useState("")
  const filtered = CERTIFIED.filter(b => b.business.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Certification Hub</div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Business Links</h1>
        <p className="text-muted-foreground font-medium text-sm">Manage businesses linked to your certification.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {[
          { label: "Total Linked",      value: String(CERTIFIED.length + PENDING.length), icon: Link2,      bg: "bg-blue-50",    color: "text-blue-600" },
          { label: "Pending Requests",  value: String(PENDING.length),                   icon: Clock,      bg: "bg-amber-50",   color: "text-amber-600" },
          { label: "Active Certs",      value: String(CERTIFIED.filter(c => c.status === "active").length), icon: ShieldCheck, bg: "bg-emerald-50", color: "text-emerald-600" },
        ].map((s, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl bg-card p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">{s.label}</span>
              <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${s.bg}`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-foreground">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="pending">
        <div className="bg-card p-2 rounded-2xl shadow-sm border">
          <TabsList className="bg-transparent h-auto p-0 gap-1">
            <TabsTrigger value="pending" className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-600 px-6 py-2.5 font-bold text-[10px] uppercase tracking-widest">
              Pending Requests
            </TabsTrigger>
            <TabsTrigger value="certified" className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-600 px-6 py-2.5 font-bold text-[10px] uppercase tracking-widest">
              Certified Businesses
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="pending" className="mt-4 m-0">
          <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-6 sm:p-8 border-b">
              <CardTitle className="text-xl font-black">Verification Requests</CardTitle>
              <CardDescription>Businesses requesting certification from your organisation.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Business</TableHead>
                    <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Submitted</TableHead>
                    <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                    <TableHead className="text-right px-8 h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PENDING.map((req) => (
                    <TableRow key={req.business} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-8 py-5 font-black text-foreground">{req.business}</TableCell>
                      <TableCell className="text-sm font-bold text-muted-foreground">{req.submitted}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={req.status === "pending" ? "bg-amber-50 text-amber-600 border-amber-200 font-black text-[9px]" : "bg-blue-50 text-blue-600 border-blue-200 font-black text-[9px]"}>
                          {req.status === "pending" ? "Pending Review" : "Docs Needed"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] uppercase tracking-widest h-9 px-5 gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Approve
                          </Button>
                          <Button size="sm" variant="outline" className="rounded-full font-black text-[10px] uppercase tracking-widest h-9 px-5 gap-1 border-2">
                            <XCircle className="h-3.5 w-3.5" /> Decline
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certified" className="mt-4 m-0">
          <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
            <CardHeader className="p-6 sm:p-8 border-b">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <CardTitle className="text-xl font-black">Certified Businesses</CardTitle>
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search businesses..."
                    className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Business</TableHead>
                    <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Certificate No.</TableHead>
                    <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Expiry</TableHead>
                    <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((biz) => (
                    <TableRow key={biz.certNum} className="border-border hover:bg-muted/50 transition-colors group">
                      <TableCell className="px-8 py-5 font-black text-foreground">{biz.business}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground hidden sm:table-cell">{biz.certNum}</TableCell>
                      <TableCell className="text-sm font-bold text-muted-foreground hidden sm:table-cell">{biz.expiry}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`font-black text-[9px] uppercase px-3 ${STATUS_STYLES[biz.status]}`}>
                          {biz.status === "expiring" ? "Expiring Soon" : biz.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
