
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CircleDollarSign, ShieldCheck, TrendingUp, 
  ArrowRight, Search, Info, Globe, 
  Lock, CheckCircle2, SlidersHorizontal
} from "lucide-react";
import Link from "next/link";

const MOCK_FINANCE = [
  { id: "1", name: "Amanah Islamic Bank", type: "Retail Banking", focus: "Personal & Business", rate: "99.8% Compliance", ver: true },
  { id: "2", name: "Sunnah Wealth Mgt", type: "Investment Firm", focus: "Mudarabah Funds", rate: "Shariah Audited", ver: true },
];

export default function FinanceListingPage() {
  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-indigo-100 text-indigo-600">
            <CircleDollarSign className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black font-headline text-slate-900 tracking-tight">Finance & Banking</h1>
            <p className="text-muted-foreground font-medium">Shariah-compliant financial institutions and ethical investment services.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border-none shadow-sm bg-white flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trust Score</p>
              <p className="text-lg font-black text-slate-900">AA+ Rated</p>
            </div>
          </Card>
          <Card className="p-6 border-none shadow-sm bg-white flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Avg. Returns</p>
              <p className="text-lg font-black text-slate-900">8.4% - 12.5%</p>
            </div>
          </Card>
          <Card className="p-6 border-none shadow-sm bg-white flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Reach</p>
              <p className="text-lg font-black text-slate-900">12 Countries</p>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">Featured Institutions</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-full font-bold h-9 px-4 border-2">Filters <SlidersHorizontal className="ml-2 h-3.5 w-3.5" /></Button>
            </div>
          </div>

          <div className="space-y-4">
            {MOCK_FINANCE.map((inst) => (
              <Link key={inst.id} href={`/entities/${inst.id}`}>
                <Card className="group p-8 rounded-[2.5rem] border-none shadow-sm hover:shadow-xl transition-all duration-500 bg-white border-2 border-transparent hover:border-indigo-100 flex flex-col md:flex-row items-center gap-8">
                  <div className="h-20 w-20 rounded-3xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      <Badge className="bg-indigo-600 text-white font-black text-[9px] uppercase tracking-tighter px-2">{inst.type}</Badge>
                      <Badge variant="outline" className="text-[9px] font-black uppercase tracking-tighter text-emerald-600 border-emerald-100 bg-emerald-50">Shariah Compliant</Badge>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight">{inst.name}</h3>
                    <p className="text-sm font-medium text-muted-foreground">{inst.focus}</p>
                  </div>
                  <div className="shrink-0 flex flex-col items-center md:items-end gap-3">
                    <p className="text-lg font-black text-indigo-600">{inst.rate}</p>
                    <Button className="rounded-2xl bg-slate-900 hover:bg-indigo-600 font-black text-xs px-8">
                      View Products <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <Card className="rounded-[2.5rem] border-none bg-indigo-900 text-white p-10 space-y-6 shadow-2xl relative overflow-hidden">
            <Lock className="absolute -top-4 -right-4 h-32 w-32 opacity-10" />
            <div className="space-y-2 relative z-10">
              <h3 className="text-2xl font-black leading-tight">Shariah Audit Reports</h3>
              <p className="text-sm text-indigo-200 font-medium leading-relaxed">
                Access transparent annual reports from independent Shariah boards for every listed entity.
              </p>
            </div>
            <Button className="w-full bg-white text-indigo-900 hover:bg-indigo-50 font-black h-14 rounded-2xl relative z-10 shadow-xl">
              Download Latest (2024)
            </Button>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm p-8 bg-white space-y-4">
            <h3 className="font-black text-lg">Knowledge Base</h3>
            <div className="space-y-3">
              {["What is Mudarabah?", "Ethical Investing 101", "Zakat Calculation Tools"].map((item, i) => (
                <Link key={i} href="#" className="flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50 text-sm font-bold text-slate-600 transition-colors group">
                  {item} <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
