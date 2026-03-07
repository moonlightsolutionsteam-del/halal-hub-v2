
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Search, Filter, ShieldCheck, 
  CheckCircle2, Clock, MoreVertical, Eye,
  Lock, ArrowUpRight, UserPlus, FileCheck
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function FinanceKYCPage() {
  const kycList = [
    { id: "KYC-8821", name: "Ahmed Abdullah", level: "HNWI", status: "Verified", date: "Nov 01, 2024" },
    { id: "KYC-8822", name: "Sarah Khan", level: "Corporate", status: "Pending Docs", date: "Oct 28, 2024" },
    { id: "KYC-8823", name: "Zaid Ali", level: "Retail", status: "Verified", date: "Oct 15, 2024" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-[10px]">
            <Lock className="h-3 w-3" /> Identity Security
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">KYC Registry</h1>
          <p className="text-muted-foreground font-medium">Verify investor identities and manage institutional compliance requirements.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-8 font-black shadow-lg shadow-indigo-200 h-12 text-white">
          <UserPlus className="mr-2 h-4 w-4" /> New Verification
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Verified Users", value: "1,240", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending KYC", value: "15", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Compliance Rate", value: "99.2%", icon: ShieldCheck, color: "text-indigo-600", bg: "bg-indigo-50" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-sm p-6 bg-white flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
        <CardHeader className="p-8 border-b flex flex-col md:flex-row items-center justify-between gap-4">
          <CardTitle className="text-xl font-black">Verification Registry</CardTitle>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by name or ID..." className="pl-9 h-11 rounded-2xl bg-slate-50 border-none font-medium" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">ID / Date</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">User Name</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Level</TableHead>
                <TableHead className="h-14 text-right px-8 font-black text-[10px] uppercase tracking-widest">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kycList.map((kyc) => (
                <TableRow key={kyc.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="px-8 py-5">
                    <div className="font-black text-slate-900 text-sm">{kyc.id}</div>
                    <div className="text-[9px] font-bold text-muted-foreground uppercase">{kyc.date}</div>
                  </TableCell>
                  <TableCell className="font-bold text-slate-800">{kyc.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-indigo-100 text-indigo-600 font-black text-[9px] uppercase px-2">{kyc.level}</Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <Badge className={kyc.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-none' : 'bg-amber-50 text-amber-600 border-none'}>
                      {kyc.status}
                    </Badge>
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
