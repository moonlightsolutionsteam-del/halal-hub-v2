
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, CheckCircle2, History, AlertCircle, 
  FileText, Download, Award, Microscope, Globe,
  HeartPulse, Activity, Zap
} from "lucide-react";

export default function HealthcareTransparencyPage() {
  const auditLogs = [
    { id: "HC-AUD-101", topic: "Gender Privacy Standards (Awrah)", status: "Pass", date: "Nov 01, 2024", score: "100%" },
    { id: "HC-AUD-102", topic: "Hijama Practitioner Certification", status: "Verified", date: "Oct 28, 2024", score: "100%" },
    { id: "HC-AUD-103", topic: "Facility Hygiene & Sterilization", status: "Pass", date: "Oct 15, 2024", score: "99%" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-600 font-black uppercase tracking-widest text-[10px]">
            <ShieldCheck className="h-3 w-3" /> Ethical Care Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Trust & Ethics Transparency</h1>
          <p className="text-muted-foreground font-medium">Manage your medical ethical audits, Sunnah care certifications, and privacy protocols.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <History className="mr-2 h-4 w-4" /> Full Audit Trail
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 rounded-full px-8 font-black shadow-lg shadow-teal-200 h-12 text-white">
            <Award className="mr-2 h-4 w-4" /> Request Ethical Audit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-teal-600 text-white p-10 text-center space-y-4">
          <div className="h-20 w-20 bg-card/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-md">
            <ShieldCheck className="h-10 w-10 text-white" />
          </div>
          <div className="space-y-1">
            <h2 className="text-5xl font-black tracking-tighter">99.8%</h2>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Ethical Care Score</p>
          </div>
          <Badge className="bg-card text-teal-600 font-black border-none uppercase text-[9px] px-4 py-1.5 rounded-full">TOP 1% Verified</Badge>
        </Card>

        <Card className="md:col-span-2 rounded-[2.5rem] border-none shadow-sm bg-card p-10 grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-foreground leading-tight">Care Standards Accreditation</h3>
            <div className="space-y-4">
              {[
                { label: "Awrah Privacy Protocol", status: "Active", expiry: "Dec 31, 2024" },
                { label: "Sunnah Care Verified", status: "Active", expiry: "Ongoing" },
                { label: "Hygiene Standard Lvl 5", status: "Verified", expiry: "Jun 2025" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-muted rounded-2xl border border-transparent hover:border-teal-100 transition-all">
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
            <Microscope className="absolute -top-4 -right-4 h-24 w-24 opacity-10 text-teal-600" />
            <h4 className="text-xl font-black relative z-10">Scan-to-Verify Compliance</h4>
            <p className="text-xs text-muted-foreground leading-relaxed relative z-10">
              Patients can scan your facility codes to see verified reports on gender segregation, practitioner backgrounds, and ingredient purity.
            </p>
            <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] h-10 uppercase tracking-widest relative z-10">Enable QR Logs</Button>
          </div>
        </Card>
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
        <CardHeader className="p-8 border-b">
          <CardTitle className="text-xl font-black">Clinical Compliance Logs</CardTitle>
          <p className="text-sm text-muted-foreground font-medium">Historical logs of your facility's ethical and medical audits.</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-50">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-muted/50 transition-colors group">
                <div className="flex items-center gap-6">
                  <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground group-hover:text-teal-600 group-hover:bg-teal-50 transition-all">
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
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Pass Score</p>
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
