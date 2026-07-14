"use client"

import { FileText, Download, CheckCircle2, AlertTriangle, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const REPORTS = [
  { title: "Q4 2024 Audit Summary",        period: "Oct–Dec 2024", status: "ready",   date: "2024-12-01" },
  { title: "Q3 2024 Compliance Report",    period: "Jul–Sep 2024", status: "ready",   date: "2024-10-05" },
  { title: "Annual Certificate Overview",  period: "2023",         status: "ready",   date: "2024-01-15" },
  { title: "Q1 2025 Audit Summary",        period: "Jan–Mar 2025", status: "pending", date: "—" },
]

const REQUIREMENTS = [
  { label: "JAKIM Compliance Filing",     due: "2024-12-31", status: "on_track" },
  { label: "MUI Halal Standard Review",   due: "2025-01-15", status: "on_track" },
  { label: "ISO 22000 Renewal",           due: "2024-12-15", status: "at_risk" },
  { label: "ESMA Accreditation Update",   due: "2025-03-01", status: "on_track" },
]

export default function CompliancePage() {
  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Compliance</div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Compliance & Reports</h1>
        <p className="text-muted-foreground font-medium text-sm">Track regulatory requirements and download audit reports.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
          <CardHeader className="p-6 sm:p-8 border-b">
            <CardTitle className="text-xl font-black">Regulatory Requirements</CardTitle>
            <CardDescription>Upcoming compliance filings and certifications.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 space-y-4">
            {REQUIREMENTS.map((req, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors">
                <div className="space-y-0.5">
                  <p className="font-black text-foreground text-sm">{req.label}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Due: {req.due}</p>
                </div>
                {req.status === "on_track"
                  ? <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  : <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
                }
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
          <CardHeader className="p-6 sm:p-8 border-b">
            <CardTitle className="text-xl font-black">Audit Reports</CardTitle>
            <CardDescription>Downloadable compliance reports by period.</CardDescription>
          </CardHeader>
          <CardContent className="p-6 sm:p-8 space-y-4">
            {REPORTS.map((rep, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/50 hover:bg-muted transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${rep.status === "ready" ? "bg-emerald-50" : "bg-muted"}`}>
                    {rep.status === "ready"
                      ? <FileText className="h-5 w-5 text-emerald-600" />
                      : <Clock className="h-5 w-5 text-muted-foreground" />
                    }
                  </div>
                  <div>
                    <p className="font-black text-foreground text-sm">{rep.title}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{rep.period}{rep.date !== "—" ? ` · ${rep.date}` : ""}</p>
                  </div>
                </div>
                {rep.status === "ready" ? (
                  <Button size="icon" variant="ghost" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <Download className="h-4 w-4 text-emerald-600" />
                  </Button>
                ) : (
                  <Badge variant="outline" className="bg-muted text-muted-foreground font-black text-[9px] uppercase">Pending</Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
