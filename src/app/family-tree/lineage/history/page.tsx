
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  History, Search, Filter, ShieldCheck, 
  CheckCircle2, Clock, AlertCircle, FileText,
  ArrowLeft, Download, MoreVertical, Eye,
  Zap, Database, Users, Plus
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import Link from "next/link"

export default function HeritageLogsPage() {
  const logs = [
    { id: "LOG-8821", user: "Ibrahim (Admin)", action: "Verified 'Hassan Al-Sayed' lineage node", time: "2 hours ago", type: "Verification", color: "text-emerald-600", bg: "bg-emerald-50" },
    { id: "LOG-8822", user: "System", action: "Detected potential duplicate in 'Malik' branch", time: "5 hours ago", type: "Security", color: "text-amber-600", bg: "bg-amber-50" },
    { id: "LOG-8823", user: "Fatima", action: "Uploaded 'Family Hajj Record 1982'", time: "Yesterday", type: "Media", color: "text-blue-600", bg: "bg-blue-50" },
    { id: "LOG-8824", user: "Ibrahim (Admin)", action: "Updated 'Root Origin' to Old Delhi", time: "2 days ago", type: "Lineage", color: "text-purple-600", bg: "bg-purple-50" },
    { id: "LOG-8825", user: "System", action: "Role changed for member 'Omar' to Extended", time: "3 days ago", type: "Roles", color: "text-muted-foreground", bg: "bg-muted" },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-10 max-w-6xl pb-24">
      <div className="flex flex-col gap-6">
        <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-emerald-600 transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Hub
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-muted text-muted-foreground shadow-inner">
                <History className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl font-black font-headline text-foreground tracking-tight">Heritage Logs</h1>
                <p className="text-muted-foreground font-medium text-xl">Full audit trail of family ecosystem changes and ancestral data edits.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="h-14 rounded-2xl bg-card border-none shadow-sm gap-2 font-black px-8 hover:bg-muted">
              <Download className="h-5 w-5 text-muted-foreground" /> Export Full Audit
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-[2.5rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search logs..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
        </div>
        <div className="flex items-center gap-2">
          {["All", "Verification", "Security", "Media", "Roles"].map(f => (
            <Badge key={f} variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted transition-all border-border text-muted-foreground font-black text-[10px] uppercase tracking-widest">{f}</Badge>
          ))}
          <Button variant="ghost" size="icon" className="rounded-full h-11 w-11"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <Card className="rounded-[3rem] border-none shadow-sm overflow-hidden bg-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-none">
                <TableHead className="px-10 h-16 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Log ID / Time</TableHead>
                <TableHead className="h-16 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Activity</TableHead>
                <TableHead className="h-16 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Member</TableHead>
                <TableHead className="h-16 font-black text-[10px] uppercase tracking-widest text-muted-foreground text-center">Type</TableHead>
                <TableHead className="text-right px-10 h-16 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id} className="border-border hover:bg-muted/50 transition-colors group">
                  <TableCell className="px-10 py-6">
                    <div className="font-black text-foreground text-sm">{log.id}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">{log.time}</div>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-foreground text-base leading-snug">{log.action}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground font-black text-[10px] shadow-sm">
                        {log.user[0]}
                      </div>
                      <span className="text-xs font-bold text-muted-foreground">{log.user}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="secondary" className={`${log.bg} ${log.color} border-none text-[9px] font-black uppercase px-3 h-6`}>
                      {log.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-10">
                    <Button size="icon" variant="ghost" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical className="h-4 w-4 text-muted-foreground" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Displaying last 50 logs</p>
        <Button variant="outline" className="rounded-full px-12 font-black border-2 h-14 hover:bg-muted transition-all">Load Historical Logs</Button>
      </div>
    </div>
  );
}
