
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, CheckCircle2, History, AlertCircle, 
  FileText, Download, Award, Microscope, Globe
} from "lucide-react";

export default function ButcherTransparencyPage() {
  const auditLogs = [
    { id: "MT-AUD-101", topic: "Slaughterhouse Proof (Batch #442)", status: "Verified", date: "Nov 01, 2024", score: "100%" },
    { id: "MT-AUD-102", topic: "Cold-Chain Temp Audit", status: "Pass", date: "Oct 28, 2024", score: "98%" },
    { id: "MT-AUD-103", topic: "Knife Sharpening & Prep Hygiene", status: "Pass", date: "Oct 15, 2024", score: "100%" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-600 font-black uppercase tracking-widest text-[10px]">
            <ShieldCheck className="h-3 w-3" /> Integrity Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Trust & Transparency</h1>
          <p className="text-muted-foreground font-medium">Manage your slaughterhouse proofs, cold-chain logs, and official certifications.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <History className="mr-2 h-4 w-4" /> Full Audit Trail
          </Button>
          <Button className="bg-red-600 hover:bg-red-700 rounded-full px-8 font-black shadow-lg shadow-red-200 h-12 text-white">
            <Award className="mr-2 h-4 w-4" /> Request Official Audit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-red-600 text-white p-10 text-center space-y-4">
          <div className="h-20 w-20 bg-card/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-md">
            <ShieldCheck className="h-10 w-10 text-white" />
          </div>
          <div className="space-y-1">
            <h2 className="text-5xl font-black tracking-tighter">99.2%</h2>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Source Verified Score</p>
          </div>
          <Badge className="bg-card text-red-600 font-black border-none uppercase text-[9px] px-4 py-1.5 rounded-full">TOP 5% IN CITY</Badge>
        </Card>

        <Card className="md:col-span-2 rounded-[2.5rem] border-none shadow-sm bg-card p-10 grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-foreground leading-tight">Accreditation Status</h3>
            <div className="space-y-4">
              {[
                { label: "HMC Main Certificate", status: "Active", expiry: "Dec 31, 2024" },
                { label: "Cold-Chain Verification", status: "Active", expiry: "Ongoing" },
                { label: "Hygiene Standard Lvl 5", status: "Verified", expiry: "Jun 2025" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-2xl">
                  <div>
                    <p className="text-sm font-black text-foreground">{item.label}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{item.expiry}</p>
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] uppercase px-3">
                    <CheckCircle2 className="h-2.5 w-2.5 mr-1" /> {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6 bg-zinc-900 text-white p-8 rounded-[2rem] relative overflow-hidden">
            <Microscope className="absolute -top-4 -right-4 h-24 w-24 opacity-10 text-red-600" />
            <h4 className="text-xl font-black relative z-10">Batch Traceability</h4>
            <p className="text-xs text-muted-foreground leading-relaxed relative z-10">
              Customers can scan your QR codes to see exactly which farm and batch their specific meat cut came from.
            </p>
            <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] h-10 uppercase tracking-widest relative z-10">Enable QR Logs</Button>
          </div>
        </Card>
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
        <CardHeader className="p-8 border-b">
          <CardTitle className="text-xl font-black">Integrity Audit Logs</CardTitle>
          <p className="text-sm text-muted-foreground font-medium">Historical logs of your shop's compliance checks.</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-50">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-black text-foreground text-base">{log.topic}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{log.id}</span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">• {log.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Score</p>
                    <p className="text-xl font-black text-emerald-600">{log.score}</p>
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-600 border-none px-4 h-8 flex items-center font-black uppercase text-[10px] tracking-widest">
                    {log.status}
                  </Badge>
                  <Button size="icon" variant="ghost" className="rounded-xl"><Download className="h-5 w-5 text-muted-foreground" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
