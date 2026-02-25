
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, Upload, FileText, Download, 
  Trash2, AlertCircle, History, CheckCircle2,
  Lock, Award, ExternalLink, Calendar
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ButcherDocumentsPage() {
  const documents = [
    { id: "DOC-001", name: "Main Halal Certificate", type: "Certification", status: "Active", expiry: "Dec 31, 2024", issuer: "HMC Global" },
    { id: "DOC-002", name: "Municipal Trade License", type: "License", status: "Active", expiry: "Jun 15, 2025", issuer: "City Council" },
    { id: "DOC-003", name: "Slaughterhouse Proof (Batch #442)", type: "Sourcing", status: "Verified", expiry: "N/A", issuer: "Al-Noor Farm" },
    { id: "DOC-004", name: "Hygiene Rating Cert", type: "Audit", status: "Pending Renewal", expiry: "Oct 30, 2024", issuer: "Food Safety Board" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-600 font-black uppercase tracking-widest text-[10px]">
            <ShieldCheck className="h-3 w-3" /> Compliance Vault
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Source Documents</h1>
          <p className="text-muted-foreground font-medium">Manage your shop's licenses, halal certifications, and sourcing logs.</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 rounded-full px-8 font-black shadow-lg shadow-red-200 h-12 text-white">
          <Upload className="mr-2 h-4 w-4" /> Upload New Document
        </Button>
      </div>

      <Alert className="bg-amber-50 border-amber-200 text-amber-900 rounded-[2rem]">
        <AlertCircle className="h-5 w-5 text-amber-600" />
        <AlertTitle className="font-black">Certification Renewal</AlertTitle>
        <AlertDescription className="font-medium">
          Your Hygiene Rating Certificate expires in 5 days. Please upload the new version to avoid trust badge suspension.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden border-2 border-transparent hover:border-red-100 transition-all group">
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-red-600 group-hover:bg-red-50 transition-colors shadow-inner">
                      <FileText className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-lg font-black text-slate-900 leading-tight">{doc.name}</p>
                        <Badge variant="outline" className="text-[9px] font-black uppercase border-slate-200 text-slate-400">{doc.type}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span>Issued by: {doc.issuer}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Exp: {doc.expiry}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Badge className={
                      doc.status === 'Active' || doc.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-none' : 'bg-amber-50 text-amber-600 border-none'
                    }>
                      {doc.status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="rounded-xl"><Download className="h-4 w-4 text-slate-400" /></Button>
                      <Button size="icon" variant="ghost" className="rounded-xl hover:text-red-600"><Trash2 className="h-4 w-4 text-slate-400" /></Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-10 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Award className="h-24 w-24" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black font-headline">Verification Score</h3>
                <p className="text-sm text-slate-400 font-medium">Your current document integrity score is high.</p>
              </div>
              <div className="text-6xl font-black text-emerald-400 tracking-tighter">98%</div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="text-xs font-bold text-white/80">Source Verified Badge Active</span>
                </div>
              </div>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-2xl h-14 font-black text-xs uppercase tracking-widest shadow-xl">
                Request Platform Audit
              </Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
            <h3 className="text-xl font-black text-slate-900">Audit History</h3>
            <div className="space-y-4">
              {[
                { label: "Annual Halal Check", result: "Passed", date: "Jan 2024" },
                { label: "Hygiene Spot Audit", result: "Passed", date: "Dec 2023" },
              ].map((audit, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-red-100 transition-all group">
                  <div>
                    <p className="text-sm font-bold text-slate-700">{audit.label}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase">{audit.date}</p>
                  </div>
                  <Badge variant="secondary" className="bg-white text-emerald-600 font-black text-[9px] uppercase">{audit.result}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
