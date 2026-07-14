"use client"

import { FileQuestion, MessageSquare, Clock, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const ENQUIRIES = [
  { id: "ENQ-001", business: "Al-Noor Catering",    subject: "Scope of certification for buffet services", date: "2024-12-01", status: "open" },
  { id: "ENQ-002", business: "Pure Life Cosmetics",  subject: "Ingredient substitution approval required", date: "2024-11-30", status: "open" },
  { id: "ENQ-003", business: "Green Fields Grocery", subject: "Cross-contamination protocol query",        date: "2024-11-28", status: "pending_reply" },
  { id: "ENQ-004", business: "Medina Meats",         subject: "Certificate reissue after address change",  date: "2024-11-20", status: "resolved" },
  { id: "ENQ-005", business: "Karim's Restaurant",   subject: "New menu items require re-audit?",          date: "2024-11-15", status: "resolved" },
]

const STATUS_STYLES: Record<string, string> = {
  open:          "bg-blue-50 text-blue-600 border-blue-200",
  pending_reply: "bg-amber-50 text-amber-600 border-amber-200",
  resolved:      "bg-emerald-50 text-emerald-600 border-emerald-200",
}
const STATUS_LABELS: Record<string, string> = {
  open: "Open", pending_reply: "Pending Reply", resolved: "Resolved"
}

export default function EnquiriesPage() {
  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Compliance</div>
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Business Enquiries</h1>
        <p className="text-muted-foreground font-medium text-sm">Manage questions and requests from certified businesses.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {[
          { label: "Open",          value: ENQUIRIES.filter(e => e.status === "open").length,          icon: FileQuestion,  bg: "bg-blue-50",    color: "text-blue-600" },
          { label: "Pending Reply", value: ENQUIRIES.filter(e => e.status === "pending_reply").length, icon: Clock,          bg: "bg-amber-50",   color: "text-amber-600" },
          { label: "Resolved",      value: ENQUIRIES.filter(e => e.status === "resolved").length,      icon: CheckCircle2,   bg: "bg-emerald-50", color: "text-emerald-600" },
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
          <CardTitle className="text-xl font-black">All Enquiries</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Business</TableHead>
                <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Subject</TableHead>
                <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground hidden sm:table-cell">Date</TableHead>
                <TableHead className="h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                <TableHead className="text-right px-8 h-12 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ENQUIRIES.map((enq) => (
                <TableRow key={enq.id} className="border-border hover:bg-muted/50 transition-colors">
                  <TableCell className="px-8 py-5">
                    <p className="font-black text-foreground">{enq.business}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{enq.id}</p>
                  </TableCell>
                  <TableCell className="text-sm font-medium text-muted-foreground hidden sm:table-cell max-w-xs truncate">{enq.subject}</TableCell>
                  <TableCell className="text-sm font-bold text-muted-foreground hidden sm:table-cell">{enq.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`font-black text-[9px] uppercase px-3 ${STATUS_STYLES[enq.status]}`}>
                      {STATUS_LABELS[enq.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    {enq.status !== "resolved" && (
                      <Button size="sm" className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-[10px] h-9 px-5 gap-1">
                        <MessageSquare className="h-3 w-3" /> Reply
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
