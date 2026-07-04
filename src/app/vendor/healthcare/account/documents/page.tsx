
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, Upload, FileText, Download, 
  Trash2, AlertCircle, History, CheckCircle2,
  Lock, Award, ExternalLink, Calendar,
  Stethoscope, Activity, HeartPulse, Info
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function HealthcareDocumentsPage() {
  const documents = [
    { id: "DOC-HC-001", name: "Facility Medical License", type: "Mandatory", status: "Active", expiry: "Dec 31, 2024", issuer: "State Medical Board" },
    { id: "DOC-HC-002", name: "Ethical Care Charter", type: "Trust Badge", status: "Verified", expiry: "Ongoing", issuer: "Halal Hub Ethics" },
    { id: "DOC-HC-003", name: "Bio-Waste Disposal Cert", type: "Legal", status: "Verified", expiry: "Jun 2025", issuer: "Municipal Authority" },
    { id: "DOC-HC-004", name: "Hijama Therapy Certs", type: "Specialty", status: "Under Review", expiry: "N/A", issuer: "Wellness Guild" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-600 font-black uppercase tracking-widest text-[10px]">
            <ShieldCheck className="h-3 w-3" /> Compliance Vault
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Facility Accreditation</h1>
          <p className="text-muted-foreground font-medium">Manage your clinical licenses, ethical care charters, and medical audit reports.</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 rounded-full px-8 font-black shadow-lg shadow-teal-200 h-12 text-white">
          <Upload className="mr-2 h-4 w-4" /> Upload New Credential
        </Button>
      </div>

      <Alert className="bg-amber-50 border-amber-200 text-amber-900 rounded-[2rem]">
        <AlertCircle className="h-5 w-5 text-amber-600" />
        <AlertTitle className="font-black">Renewal Alert</AlertTitle>
        <AlertDescription className="font-medium text-xs">
          Your Facility Medical License expires in 60 days. Please ensure your renewal application is logged to maintain your "Verified Clinical Partner" badge.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden border-2 border-transparent hover:border-teal-100 transition-all group">
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground group-hover:text-teal-600 group-hover:bg-teal-50 transition-colors shadow-inner">
                      <FileText className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-lg font-black text-foreground leading-tight">{doc.name}</p>
                        <Badge variant="outline" className="text-[9px] font-black uppercase border-border text-muted-foreground">{doc.type}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase tracking-widest">
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
                      <Button size="icon" variant="ghost" className="rounded-xl"><Download className="h-4 w-4 text-muted-foreground" /></Button>
                      <Button size="icon" variant="ghost" className="rounded-xl hover:text-rose-600"><Trash2 className="h-4 w-4 text-muted-foreground" /></Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-10 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Award className="h-24 w-24" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-black font-headline">Verification Score</h3>
                <p className="text-sm text-muted-foreground font-medium">Your current clinical integrity score is excellent.</p>
              </div>
              <div className="text-6xl font-black text-emerald-400 tracking-tighter">99.2%</div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-card/5 p-4 rounded-2xl border border-white/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="text-xs font-bold text-white/80">Awrah Privacy Badge Active</span>
                </div>
              </div>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-2xl h-14 font-black text-xs uppercase tracking-widest shadow-xl">
                Request Re-Audit
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
