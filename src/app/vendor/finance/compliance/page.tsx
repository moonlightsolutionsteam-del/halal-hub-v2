
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, CheckCircle2, History, AlertCircle, 
  FileText, Download, Award, Microscope, Globe,
  Scale, Lock, Info, Landmark, Users
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function FinanceCompliancePage() {
  const auditLogs = [
    { id: "FIN-AUD-101", topic: "Annual Shariah Board Audit", status: "Verified", date: "Nov 01, 2024", score: "100%" },
    { id: "FIN-AUD-102", topic: "Capital Adequacy Check", status: "Pass", date: "Oct 28, 2024", score: "98%" },
    { id: "FIN-AUD-103", topic: "Asset Deployment Ethics Review", status: "Pass", date: "Oct 15, 2024", score: "100%" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-[10px]">
            <ShieldCheck className="h-3 w-3" /> Institutional Integrity
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Governance & Compliance</h1>
          <p className="text-muted-foreground font-medium">Manage your institution's Shariah board records, annual audits, and regulatory certifications.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <History className="mr-2 h-4 w-4" /> Audit History
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-8 font-black shadow-lg shadow-indigo-200 h-12 text-white">
            <Award className="mr-2 h-4 w-4" /> Request Official Audit
          </Button>
        </div>
      </div>

      <Alert className="bg-indigo-50 border-indigo-200 text-indigo-900 rounded-[2rem]">
        <Info className="h-5 w-5 text-indigo-600" />
        <AlertTitle className="font-black">Compliance Renewal</AlertTitle>
        <AlertDescription className="font-medium text-xs">
          Your Shariah Board Annual Audit is due in 45 days. Please ensure all asset deployment logs are updated for the committee review.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-indigo-600 text-white p-10 text-center space-y-4">
          <div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-md">
            <ShieldCheck className="h-10 w-10 text-white" />
          </div>
          <div className="space-y-1">
            <h2 className="text-5xl font-black tracking-tighter">99.2%</h2>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">Trust Integrity Score</p>
          </div>
          <Badge className="bg-white text-indigo-600 font-black border-none uppercase text-[9px] px-4 py-1.5 rounded-full shadow-lg">ELITE STATUS</Badge>
        </Card>

        <Card className="md:col-span-2 rounded-[2.5rem] border-none shadow-sm bg-white p-10 grid grid-cols-1 sm:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900 leading-tight">Regulatory Accreditation</h3>
            <div className="space-y-4">
              {[
                { label: "Shariah Board Charter", status: "Active", expiry: "Dec 31, 2024" },
                { label: "AAOIFI Compliance Seal", status: "Verified", expiry: "Jun 2025" },
                { label: "Capital Shield Audited", status: "Pass", expiry: "Ongoing" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-indigo-100 transition-colors">
                  <div>
                    <p className="text-sm font-black text-slate-700">{item.label}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{item.expiry}</p>
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] uppercase px-3">
                    <CheckCircle2 className="h-2.5 w-2.5 mr-1" /> {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6 bg-slate-900 text-white p-8 rounded-[2rem] relative overflow-hidden">
            <Microscope className="absolute -top-4 -right-4 h-24 w-24 opacity-10 text-indigo-600" />
            <h4 className="text-xl font-black relative z-10">Smart Audit Bridge</h4>
            <p className="text-xs text-slate-400 leading-relaxed relative z-10">
              Enable your Shariah board members to view real-time asset deployment logs directly through their specialized audit portal.
            </p>
            <Button variant="secondary" className="w-full rounded-xl font-black text-[10px] h-10 uppercase tracking-widest relative z-10">Launch Auditor App</Button>
          </div>
        </Card>
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
        <CardHeader className="p-8 border-b">
          <CardTitle className="text-xl font-black">Official Verification Logs</CardTitle>
          <p className="text-sm text-muted-foreground font-medium">Historical logs of your institution's compliance and ethics checks.</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-50">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors group">
                <div className="flex items-center gap-6">
                  <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-black text-slate-900 text-base">{log.topic}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{log.id}</span>
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">• {log.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-10">
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Pass Score</p>
                    <p className="text-xl font-black text-emerald-600">{log.score}</p>
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-600 border-none px-4 h-8 flex items-center font-black uppercase text-[10px] tracking-widest">
                    {log.status}
                  </Badge>
                  <Button size="icon" variant="ghost" className="rounded-xl"><Download className="h-5 w-5 text-slate-300" /></Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
