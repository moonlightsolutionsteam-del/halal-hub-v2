
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

export default function GroceryDocumentsPage() {
  const documents = [
    { id: "DOC-GRO-001", name: "FSSAI Retailer License", type: "Mandatory", status: "Active", expiry: "Dec 31, 2024", issuer: "Food Safety Board" },
    { id: "DOC-GRO-002", name: "Halal Audit (Meat Counter)", type: "Trust Badge", status: "Active", expiry: "Jun 15, 2025", issuer: "HMC Global" },
    { id: "DOC-GRO-003", name: "Trade License #882", type: "Legal", status: "Verified", expiry: "Oct 2025", issuer: "Municipal Corp" },
    { id: "DOC-GRO-004", name: "Pollution Clearance Cert", type: "Compliance", status: "Active", expiry: "N/A", issuer: "Environment Dept" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-[10px]">
            <ShieldCheck className="h-3 w-3" /> Compliance Vault
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Store Documents</h1>
          <p className="text-muted-foreground font-medium">Manage your supermarket licenses, departmental certifications, and tax records.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-8 font-black shadow-lg shadow-emerald-200 h-12 text-white">
          <Upload className="mr-2 h-4 w-4" /> Upload New Doc
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden border-2 border-transparent hover:border-emerald-100 transition-all group">
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors shadow-inner">
                      <FileText className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-lg font-black text-slate-900 leading-tight">{doc.name}</p>
                        <Badge variant="outline" className="text-[9px] font-black uppercase border-slate-200 text-slate-400">{doc.type}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span>Issuer: {doc.issuer}</span>
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
                      <Button size="icon" variant="ghost" className="rounded-xl hover:text-rose-600"><Trash2 className="h-4 w-4 text-slate-400" /></Button>
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
                <h3 className="text-2xl font-black font-headline">Trust Badge</h3>
                <p className="text-sm text-slate-400 font-medium">Your current retail integrity score is high.</p>
              </div>
              <div className="text-6xl font-black text-emerald-400 tracking-tighter">96%</div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="text-xs font-bold text-white/80">Departmental Audits Met</span>
                </div>
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-14 font-black text-xs uppercase tracking-widest shadow-xl">
                Request Re-Audit
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
