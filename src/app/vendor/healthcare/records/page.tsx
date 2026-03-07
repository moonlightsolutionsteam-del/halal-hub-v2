
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, Search, Filter, Download, 
  Eye, Lock, ShieldCheck, History,
  Plus, MoreVertical, User, Calendar,
  Activity, Clock
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function HealthcareRecordsPage() {
  const records = [
    { id: "REC-9021", patient: "Omar Malik", type: "Therapy Log", date: "Nov 02, 2024", privacy: "Confidential", dr: "Dr. Zaid" },
    { id: "REC-9022", patient: "Sara Siddiqui", type: "Lab Result", date: "Oct 28, 2024", privacy: "Restricted", dr: "Dr. Fatima" },
    { id: "REC-9023", patient: "Zaid Ali", type: "Consultation", date: "Oct 15, 2024", privacy: "Confidential", dr: "Dr. Zaid" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-600 font-black uppercase tracking-widest text-[10px]">
            <Lock className="h-3 w-3" /> Secure Data Hub
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Medical Records</h1>
          <p className="text-muted-foreground font-medium">Access and manage encrypted patient visit logs and diagnostic reports.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            Audit Trail
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 rounded-full px-8 font-black shadow-lg shadow-teal-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add Record
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-[2.5rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search records by ID or patient..." className="pl-9 h-11 rounded-2xl bg-slate-50 border-none font-medium" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer bg-teal-50 text-teal-600 border-none">All Types</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer hover:bg-muted border-slate-200">Lab Results</Badge>
          <Button variant="ghost" size="icon" className="rounded-full"><Filter className="h-4 w-4" /></Button>
        </div>
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Record ID / Date</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Patient & Type</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Practitioner</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Privacy</TableHead>
                <TableHead className="h-14 text-right px-8 font-black text-[10px] uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {records.map((rec) => (
                <TableRow key={rec.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="px-8 py-5">
                    <div className="font-black text-slate-900 text-xs">{rec.id}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">{rec.date}</div>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-slate-800">{rec.patient}</p>
                    <p className="text-[10px] font-black text-teal-600 uppercase">{rec.type}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                      <User className="h-3 w-3 text-slate-400" /> {rec.dr}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-slate-200 text-slate-400 font-black text-[9px] px-2">{rec.privacy}</Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="rounded-xl"><Eye className="h-4 w-4 text-slate-400" /></Button>
                      <Button size="icon" variant="ghost" className="rounded-xl"><Download className="h-4 w-4 text-slate-400" /></Button>
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
