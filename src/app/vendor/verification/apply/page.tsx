// @ts-nocheck

"use client"

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, CheckCircle2, ShieldCheck, 
  Award, Sparkles, Upload, FileText,
  Users, Star, ArrowRight, Zap,
  CreditCard, Loader2
} from "lucide-react";

const PARTNERS = [
  { id: 1, name: "Elite Audit Solutions", tag: "Fast Approval", rating: 5.0, price: "₹18,000", speed: "14 Days", icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
  { id: 2, name: "Global Trust Compliance", tag: "Premium Quality", rating: 4.9, price: "₹25,000", speed: "21 Days", icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50" },
  { id: 3, name: "Eco Certify India", tag: "Budget Friendly", rating: 4.7, price: "₹12,500", speed: "30 Days", icon: Users, color: "text-muted-foreground", bg: "bg-muted" },
];

export default function CertificationApplyPageWrapper() {
  return (
    <Suspense fallback={<div className="container mx-auto p-6 text-center text-muted-foreground">Loading...</div>}>
      <CertificationApplyPage />
    </Suspense>
  );
}

function CertificationApplyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "halal";
  
  const [step, setStep] = useState(1);
  const [selectedPartner, setSelectedPartner] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const getTitle = () => {
    switch(type) {
      case 'fssai': return "FSSAI License";
      case 'hygiene': return "Hygiene Audit";
      default: return "Halal Certification";
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      setLoading(true);
      setTimeout(() => {
        router.push('/vendor/verification');
      }, 2000);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-10 max-w-4xl pb-24">
      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" className="rounded-2xl bg-card shadow-sm" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Apply for {getTitle()}</h1>
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 w-12 rounded-full transition-all ${step >= i ? 'bg-primary' : 'bg-muted'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-foreground">Step 1: Choose Your Audit Partner</h2>
              <p className="text-muted-foreground font-medium">Select a verified 3rd party partner to facilitate your certification.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {PARTNERS.map((partner) => (
                <Card 
                  key={partner.id} 
                  className={`rounded-[2rem] border-4 transition-all cursor-pointer group ${selectedPartner === partner.id ? 'border-primary bg-primary/5' : 'border-transparent bg-card hover:border-border shadow-sm'}`}
                  onClick={() => setSelectedPartner(partner.id)}
                >
                  <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6">
                      <div className={`h-16 w-16 rounded-2xl ${partner.bg} ${partner.color} flex items-center justify-center shrink-0`}>
                        <partner.icon className="h-8 w-8" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-black text-foreground">{partner.name}</h3>
                          <Badge variant="secondary" className="bg-card text-foreground border font-black text-[8px] uppercase tracking-widest">{partner.tag}</Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase tracking-widest">
                          <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {partner.rating}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {partner.speed}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center md:text-right">
                        <p className="text-[10px] font-black uppercase text-muted-foreground mb-1">Audit Fee</p>
                        <p className="text-2xl font-black text-foreground">{partner.price}</p>
                      </div>
                      <div className={`h-10 w-10 rounded-full border-4 flex items-center justify-center transition-all ${selectedPartner === partner.id ? 'border-primary bg-primary text-white' : 'border-border'}`}>
                        {selectedPartner === partner.id && <CheckCircle2 className="h-6 w-6" />}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-foreground">Step 2: Business Details & Documents</h2>
              <p className="text-muted-foreground font-medium">Provide the necessary data for the audit partner to begin the review.</p>
            </div>
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Contact Person Name</Label>
                  <Input placeholder="Enter name" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Direct Mobile Number</Label>
                  <Input placeholder="+91 98765 43210" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Current Trade License / Shop Act Proof</Label>
                  <div className="p-5 sm:p-10 border-2 border-dashed border-border rounded-[2rem] flex flex-col items-center justify-center gap-4 bg-muted/50 hover:bg-card transition-all cursor-pointer group">
                    <div className="h-12 w-12 bg-card rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                      <Upload className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-bold text-muted-foreground">Upload PDF or JPG (Max 5MB)</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-foreground">Step 3: Summary & Payment</h2>
              <p className="text-muted-foreground font-medium">Review your application and complete the facilitation fee payment.</p>
            </div>
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden">
              <div className="p-5 sm:p-10 space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-muted-foreground">Audit Fee ({PARTNERS.find(p => p.id === selectedPartner)?.name})</span>
                    <span className="text-foreground">{PARTNERS.find(p => p.id === selectedPartner)?.price}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-muted-foreground">Hub Facilitation Fee</span>
                    <span className="text-foreground">₹1,000</span>
                  </div>
                  <div className="h-px bg-muted" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-black text-foreground">Total Payable</span>
                    <span className="text-3xl font-black text-primary">₹{parseInt(PARTNERS.find(p => p.id === selectedPartner)?.price.replace('₹', '').replace(',', '') || '0') + 1000}</span>
                  </div>
                </div>
                <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-100 flex items-start gap-4">
                  <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-xs font-medium text-blue-900 leading-relaxed">
                    By proceeding, you agree to allow the selected audit partner to access your business profile and contact you for the inspection schedule.
                  </p>
                </div>
              </div>
              <CardFooter className="bg-muted p-8 flex justify-center">
                <div className="flex items-center gap-4 text-muted-foreground font-bold text-xs uppercase tracking-widest">
                  <ShieldCheck className="h-4 w-4" /> Secure SSL Encrypted Payment
                </div>
              </CardFooter>
            </Card>
          </div>
        )}

        <div className="flex justify-between gap-4">
          <Button 
            variant="ghost" 
            className="rounded-2xl h-14 px-10 font-bold text-muted-foreground"
            disabled={step === 1 || loading}
            onClick={() => setStep(step - 1)}
          >
            Previous
          </Button>
          <Button 
            className="rounded-2xl h-14 px-12 font-black uppercase text-sm tracking-widest bg-primary hover:bg-primary/90 text-white shadow-xl flex-1 md:flex-none"
            disabled={(step === 1 && !selectedPartner) || loading}
            onClick={handleNext}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              step === 3 ? "Complete & Pay" : "Continue to Next Step"
            )}
          </Button>
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
