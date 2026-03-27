
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Network, UserPlus, Phone, Mail, 
  Link as LinkIcon, ArrowRight, ArrowLeft,
  Users, CheckCircle2, ShieldCheck, Zap,
  Save, Trash2, Edit2, UserCircle, Settings
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function FamilySetupPage() {
  const router = useRouter();
  const [step, setStep] = React.useState(1);

  return (
    <div className="container mx-auto p-6 space-y-10 max-w-3xl pb-24">
      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" className="rounded-2xl bg-white shadow-sm border" onClick={() => step === 1 ? router.back() : setStep(step - 1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline text-slate-900">Family Setup</h1>
          <div className="flex gap-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1.5 w-12 rounded-full transition-all ${step >= i ? 'bg-emerald-600' : 'bg-slate-200'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900">Step 1: Family Basics</h2>
              <p className="text-muted-foreground font-medium">Every ecosystem needs a name. How should we refer to your family?</p>
            </div>
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-8">
              <div className="space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Family Display Name</Label>
                <Input placeholder="e.g., The Al-Sayed Family" className="h-14 rounded-2xl bg-slate-50 border-none font-black text-lg" />
              </div>
              <div className="p-6 bg-emerald-50 rounded-2xl border-2 border-emerald-100 flex items-start gap-4">
                <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs font-medium text-emerald-900 leading-relaxed">
                  Your family group is strictly private. Only members you invite can see board items, events, or lineage data.
                </p>
              </div>
            </Card>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900">Step 2: Invite Core Members</h2>
              <p className="text-muted-foreground font-medium">Add your parents, spouse, or children to the shared hub.</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: "Invite via Mobile", icon: Phone, color: "text-blue-600", bg: "bg-blue-50" },
                { label: "Invite via Email", icon: Mail, color: "text-purple-600", bg: "bg-purple-50" },
                { label: "Copy Invite Link", icon: LinkIcon, color: "text-emerald-600", bg: "bg-emerald-50" },
              ].map((opt, i) => (
                <Card key={i} className="rounded-[2rem] border-none shadow-sm bg-white p-6 group hover:border-emerald-100 border-2 border-transparent transition-all cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={`h-14 w-14 rounded-2xl ${opt.bg} ${opt.color} flex items-center justify-center`}>
                        <opt.icon className="h-6 w-6" />
                      </div>
                      <span className="text-lg font-black text-slate-900">{opt.label}</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-300 group-hover:translate-x-1 transition-all" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900">Step 3: Assign Roles</h2>
              <p className="text-muted-foreground font-medium">Define who manages the board and who just views.</p>
            </div>
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden">
              <div className="p-8 space-y-6">
                {[
                  { name: "You", role: "Family Admin", badge: "Admin" },
                  { name: "Pending Member", role: "Can edit board", badge: "Parent" },
                  { name: "Pending Member", role: "View & Tasks only", badge: "Child" },
                ].map((m, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center font-black text-slate-300 text-xs">M{i+1}</div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{m.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{m.role}</p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] uppercase px-3">{m.badge}</Badge>
                  </div>
                ))}
              </div>
              <CardFooter className="bg-slate-50 p-8 flex justify-center border-t">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center max-w-xs">Role permissions can be adjusted anytime by the Admin.</p>
              </CardFooter>
            </Card>
          </div>
        )}

        <div className="flex justify-between gap-4 pt-8">
          <Button 
            className="rounded-2xl h-16 px-12 font-black uppercase text-sm tracking-widest bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl flex-1 md:flex-none ml-auto"
            onClick={() => step === 3 ? router.push('/family-tree') : setStep(step + 1)}
          >
            {step === 3 ? "Complete Setup" : "Continue"} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
