
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Download, Search, Filter, 
  BarChart3, TrendingUp, PieChart, Landmark,
  ShieldCheck, History, Calendar, Info,
  MoreVertical, ArrowUpRight
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function FinanceReportsPage() {
  const reports = [
    { id: "REP-101", name: "Monthly Compliance Audit", date: "Nov 01, 2024", type: "Internal", status: "Published" },
    { id: "REP-102", name: "Quarterly Asset Yield Report", date: "Oct 15, 2024", type: "Public", status: "Published" },
    { id: "REP-103", name: "Shariah Board Annual Charter", date: "Sep 30, 2024", type: "Regulatory", status: "Draft" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-[10px]">
            <BarChart3 className="h-3 w-3" /> Data Intelligence
          </div>
          <h1 className="text-3xl font-black font-headline text-foreground">Institutional Reports</h1>
          <p className="text-muted-foreground font-medium">Access detailed analytics on portfolio health, Shariah compliance, and market trends.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            Schedule Report
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-8 font-black shadow-lg shadow-indigo-200 h-12 text-white">
            <TrendingUp className="mr-2 h-4 w-4" /> Generate Analytics
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <PieChart className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active Assets</p>
            <h2 className="text-3xl font-black text-foreground">12 Deployments</h2>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Audit Score</p>
            <h2 className="text-3xl font-black text-foreground">100% Valid</h2>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-4">
          <div className="h-12 w-12 rounded-2xl bg-card/10 flex items-center justify-center text-indigo-400">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest opacity-60">Avg. Annual Yield</p>
            <h2 className="text-3xl font-black">12.4%</h2>
          </div>
        </Card>
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Report ID / Date</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Title & Class</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                <TableHead className="h-14 text-right px-8 font-black text-[10px] uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id} className="border-border hover:bg-muted/50 transition-colors group">
                  <TableCell className="px-8 py-5">
                    <div className="font-black text-foreground text-xs">{report.id}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">{report.date}</div>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-foreground">{report.name}</p>
                    <p className="text-[10px] font-black text-indigo-600 uppercase">{report.type}</p>
                  </TableCell>
                  <TableCell>
                    <Badge className={report.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border-none' : 'bg-muted text-muted-foreground border-none'}>
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="rounded-xl"><Download className="h-4 w-4 text-muted-foreground" /></Button>
                      <Button size="icon" variant="ghost" className="rounded-xl"><MoreVertical className="h-4 w-4 text-muted-foreground" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
