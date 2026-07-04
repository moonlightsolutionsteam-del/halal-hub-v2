
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, Upload, FileText, Download, 
  Trash2, AlertCircle, History, CheckCircle2,
  Lock, Award, ExternalLink, Calendar,
  FlaskConical
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CosmeticsDocumentsPage() {
  const documents = [
    { id: "DOC-COS-001", name: "Breathability Lab Report", type: "Lab Result", status: "Verified", expiry: "Dec 31, 2024", issuer: "Beauty Ethics Lab" },
    { id: "DOC-COS-002", name: "Alcohol-Free Declaration", type: "Compliance", status: "Active", expiry: "Jun 15, 2025", issuer: "Brand Internal" },
    { id: "DOC-COS-003", name: "Manufacturing License", type: "Legal", status: "Verified", expiry: "N/A", issuer: "Municipal Corp" },
    { id: "DOC-COS-004", name: "Ingredient Source Log", type: "Traceability", status: "Under Review", expiry: "N/A", issuer: "Supplier A" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-rose-600 font-black uppercase tracking-widest text-[10px]">
            <ShieldCheck className="h-3 w-3" /> Compliance Vault
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Lab Certs & Compliance</h1>
          <p className="text-muted-foreground font-medium">Manage your brand's medical licenses, lab-verified formulation reports, and purity logs.</p>
        </div>
        <Button className="bg-rose-600 hover:bg-rose-700 rounded-full px-8 font-black shadow-lg shadow-rose-200 h-12 text-white">
          <Upload className="mr-2 h-4 w-4" /> Upload New Doc
        </Button>
      </div>

      <Alert className="bg-blue-50 border-blue-200 text-blue-900 rounded-[2rem]">
        <Info className="h-5 w-5 text-blue-600" />
        <AlertTitle className="font-black">Verification Reminder</AlertTitle>
        <AlertDescription className="font-medium text-xs">
          Your Breathability Lab Report is due for renewal in 45 days. Ensure you have scheduled your next batch test.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden border-2 border-transparent hover:border-rose-100 transition-all group">
                <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground group-hover:text-rose-600 group-hover:bg-rose-50 transition-colors shadow-inner">
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
                <h3 className="text-2xl font-black font-headline">Verification Grade</h3>
                <p className="text-sm text-muted-foreground font-medium">Your current brand integrity score is elite.</p>
              </div>
              <div className="text-6xl font-black text-emerald-400 tracking-tighter">A+</div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-card/5 p-4 rounded-2xl border border-white/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  <span className="text-xs font-bold text-white/80">Breathability Badge Active</span>
                </div>
              </div>
              <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-2xl h-14 font-black text-xs uppercase tracking-widest shadow-xl">
                Request Re-Audit
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Info(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}
