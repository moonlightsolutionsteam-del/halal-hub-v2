"use client"

import { Microscope, Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const AUDITS = [
  { id: "AUD-001", business: "Al-Noor Catering",    type: "Initial",  date: "2024-12-10", auditor: "Sr. Ibrahim",   status: "scheduled" },
  { id: "AUD-002", business: "Pure Life Cosmetics", type: "Follow-up",date: "2024-12-08", auditor: "Sr. Fatima",    status: "in_progress" },
  { id: "AUD-003", business: "Green Fields Grocery",type: "Renewal",  date: "2024-12-05", auditor: "Sr. Ibrahim",   status: "in_progress" },
  { id: "AUD-004", business: "Medina Meats",        type: "Initial",  date: "2024-11-25", auditor: "Sr. Fatima",    status: "completed" },
  { id: "AUD-005", business: "Karim's Restaurant",  type: "Renewal",  date: "2024-11-20", auditor: "Sr. Yusuf",     status: "completed" },
]

const STATUS_STYLES: Record<string, string> = {
  scheduled:   "bg-blue-50 text-blue-600 border-blue-200",
  in_progress: "bg-amber-50 text-amber-600 border-amber-200",
  completed:   "bg-emerald-50 text-emerald-600 border-emerald-200",
}
const STATUS_LABELS: Record<string, string> = {
  scheduled: "Scheduled", in_progress: "In Progress", completed: "Completed"
}

export default function AuditsPage() {
  const scheduled    = AUDITS.filter(a => a.status === "scheduled").length
  const inProgress   = AUDITS.filter(a => a.status === "in_progress").length
  const completed    = AUDITS.filter(a => a.status === "completed").length

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Certification Hub</div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Active Audits</h1>
          <p className="text-muted-foreground font-medium text-sm">Track and manage ongoing field audits.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-12 px-8 font-black gap-2">
          <Calendar className="h-4 w-4" /> Schedule Audit
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {[
          { label: "Scheduled",   value: scheduled,  icon: Calendar,     bg: "bg-blue-50",    color: "text-blue-600" },
          { label: "In Progress", value: inProgress, icon: Clock,         bg: "bg-amber-50",   color: "text-amber-600" },
          { label: "Completed",   value: completed,  icon: CheckCircle2,  bg: "bg-emerald-50", color: "text-emerald-600" },
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

      <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
        <CardHeader className="p-6 sm:p-8 border-b">
          <CardTitle className="text-xl font-black">Audit Schedule</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Business</TableHead>
                <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Type</TableHead>
                <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Date</TableHead>
                <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Auditor</TableHead>
                <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                <TableHead className="text-right px-8 h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {AUDITS.map((audit) => (
                <TableRow key={audit.id} className="border-border hover:bg-muted/50 transition-colors">
                  <TableCell className="px-8 py-5">
                    <p className="font-black text-foreground">{audit.business}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{audit.id}</p>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge variant="secondary" className="bg-muted font-black text-[9px] uppercase">{audit.type}</Badge>
                  </TableCell>
                  <TableCell className="text-sm font-bold text-muted-foreground hidden sm:table-cell">{audit.date}</TableCell>
                  <TableCell className="text-sm font-bold text-muted-foreground hidden sm:table-cell">{audit.auditor}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`font-black text-[9px] uppercase px-3 ${STATUS_STYLES[audit.status]}`}>
                      {STATUS_LABELS[audit.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    {audit.status !== "completed" && (
                      <Button size="sm" className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] h-9 px-5">
                        View Report
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
