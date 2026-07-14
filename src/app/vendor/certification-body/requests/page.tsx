"use client"

import { useState } from "react"
import { ClipboardList, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ALL_REQUESTS = [
  { id: "REQ-001", business: "Al-Noor Catering",    vertical: "Catering",  submitted: "2024-12-01", status: "pending" },
  { id: "REQ-002", business: "Pure Life Cosmetics", vertical: "Cosmetics", submitted: "2024-11-28", status: "in_review" },
  { id: "REQ-003", business: "Green Fields Grocery", vertical: "Grocery",  submitted: "2024-11-25", status: "docs_needed" },
  { id: "REQ-004", business: "Medina Meats",         vertical: "Butcher",  submitted: "2024-11-20", status: "approved" },
  { id: "REQ-005", business: "Zam Zam Finance",      vertical: "Finance",  submitted: "2024-11-15", status: "approved" },
  { id: "REQ-006", business: "Noor Fashion",         vertical: "Fashion",  submitted: "2024-11-10", status: "declined" },
]

const STATUS_STYLES: Record<string, string> = {
  pending:    "bg-amber-50 text-amber-600 border-amber-200",
  in_review:  "bg-blue-50 text-blue-600 border-blue-200",
  docs_needed:"bg-purple-50 text-purple-600 border-purple-200",
  approved:   "bg-emerald-50 text-emerald-600 border-emerald-200",
  declined:   "bg-red-50 text-red-600 border-red-200",
}

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending", in_review: "In Review", docs_needed: "Docs Needed",
  approved: "Approved", declined: "Declined"
}

export default function RequestsPage() {
  const pending  = ALL_REQUESTS.filter(r => ["pending","in_review","docs_needed"].includes(r.status))
  const resolved = ALL_REQUESTS.filter(r => ["approved","declined"].includes(r.status))

  const RequestTable = ({ items }: { items: typeof ALL_REQUESTS }) => (
    <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="border-none">
              <TableHead className="px-8 h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Business</TableHead>
              <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Vertical</TableHead>
              <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Submitted</TableHead>
              <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
              <TableHead className="text-right px-8 h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((req) => (
              <TableRow key={req.id} className="border-border hover:bg-muted/50 transition-colors">
                <TableCell className="px-8 py-5">
                  <p className="font-black text-foreground">{req.business}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">{req.id}</p>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="secondary" className="bg-muted text-muted-foreground font-black text-[9px] uppercase">{req.vertical}</Badge>
                </TableCell>
                <TableCell className="text-sm font-bold text-muted-foreground hidden sm:table-cell">{req.submitted}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`font-black text-[9px] uppercase px-3 ${STATUS_STYLES[req.status]}`}>
                    {STATUS_LABELS[req.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right px-8">
                  {["pending","in_review","docs_needed"].includes(req.status) ? (
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] h-9 px-4 gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Approve
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-full font-black text-[10px] h-9 px-4 border-2 gap-1">
                        <XCircle className="h-3 w-3" /> Decline
                      </Button>
                    </div>
                  ) : (
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{STATUS_LABELS[req.status]}</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Certification Hub</div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Pending Requests</h1>
        <p className="text-muted-foreground font-medium text-sm">Review and action incoming certification requests.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {[
          { label: "Action Required", value: pending.length,  icon: AlertCircle,  bg: "bg-amber-50",   color: "text-amber-600" },
          { label: "Approved",        value: resolved.filter(r => r.status === "approved").length, icon: CheckCircle2, bg: "bg-emerald-50", color: "text-emerald-600" },
          { label: "Declined",        value: resolved.filter(r => r.status === "declined").length, icon: XCircle,      bg: "bg-red-50",     color: "text-red-600" },
        ].map((s, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl bg-card p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">{s.label}</span>
              <div className={`h-8 w-8 rounded-xl flex items-center justify-center ${s.bg}`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
            </CardHeader>
            <CardContent><div className="text-2xl font-black text-foreground">{s.value}</div></CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="pending">
        <div className="bg-card p-2 rounded-2xl shadow-sm border">
          <TabsList className="bg-transparent h-auto p-0 gap-1">
            <TabsTrigger value="pending" className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-600 px-6 py-2.5 font-bold text-[10px] uppercase tracking-widest">
              Active ({pending.length})
            </TabsTrigger>
            <TabsTrigger value="resolved" className="rounded-xl data-[state=active]:bg-emerald-50 data-[state=active]:text-emerald-600 px-6 py-2.5 font-bold text-[10px] uppercase tracking-widest">
              Resolved ({resolved.length})
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="pending" className="mt-4 m-0"><RequestTable items={pending} /></TabsContent>
        <TabsContent value="resolved" className="mt-4 m-0"><RequestTable items={resolved} /></TabsContent>
      </Tabs>
    </div>
  )
}
