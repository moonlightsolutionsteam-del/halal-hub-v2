
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, Upload, Calendar, AlertCircle, 
  CheckCircle2, FileText, Download, Trash2 
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function VendorVerificationPage() {
  const certificates = [
    { id: 1, name: "HMC Halal Certificate 2024", type: "Main Audit", status: "Active", expiry: "Dec 31, 2024" },
    { id: 2, name: "Hygiene Rating Level 5", type: "Compliance", status: "Active", expiry: "Jun 15, 2025" },
    { id: 3, name: "Meat Supply Log - May", type: "Log", status: "Under Review", expiry: "N/A" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline">Verification Center</h1>
          <p className="text-muted-foreground font-medium">Manage your halal certifications and compliance documents.</p>
        </div>
        <Button className="bg-primary rounded-full px-8 font-bold shadow-lg shadow-primary/20">
          <Upload className="mr-2 h-4 w-4" /> Upload New Certificate
        </Button>
      </div>

      <Alert className="bg-amber-50 border-amber-200 text-amber-900 rounded-[2rem]">
        <AlertCircle className="h-5 w-5 text-amber-600" />
        <AlertTitle className="font-black">Action Required</AlertTitle>
        <AlertDescription className="font-medium">
          Your main Halal Certificate (HMC-2024) is expiring in 45 days. Please ensure you have scheduled your re-audit.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 rounded-[2.5rem] border-none shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle>Active Certificates</CardTitle>
            <CardDescription>All documents currently visible to platform auditors.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {certificates.map((cert) => (
              <div key={cert.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-3xl border border-transparent hover:border-primary/20 transition-all">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{cert.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[10px] font-black uppercase tracking-tighter">{cert.type}</Badge>
                      <span className="text-[10px] text-muted-foreground font-medium">Expires: {cert.expiry}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={cert.status === "Active" ? "bg-emerald-500" : "bg-amber-500"}>
                    {cert.status}
                  </Badge>
                  <Button variant="ghost" size="icon" className="rounded-full"><Download className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="rounded-full text-red-500 hover:text-red-600"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-[2.5rem] border-none bg-primary text-primary-foreground shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" /> Overall Trust
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-8">
              <div className="text-6xl font-black mb-2">98%</div>
              <p className="text-xs font-bold uppercase opacity-80 tracking-widest">Compliance Score</p>
              <div className="mt-6 flex items-center justify-center gap-2 bg-white/20 rounded-full py-2 px-4">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-xs font-bold">Top Verified Business</span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm p-6 space-y-4">
            <h3 className="font-black text-lg">Next Steps</h3>
            <div className="space-y-3">
              {[
                { text: "Update hygiene rating", done: true },
                { text: "Renew HMC certificate", done: false },
                { text: "Verify water supply", done: true },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`h-5 w-5 rounded-full flex items-center justify-center ${step.done ? "bg-emerald-100 text-emerald-600" : "bg-muted text-muted-foreground"}`}>
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <span className={`text-sm font-bold ${step.done ? "text-slate-400 line-through" : "text-slate-700"}`}>
                    {step.text}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
