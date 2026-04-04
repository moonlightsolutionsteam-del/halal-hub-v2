"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Banknote, ArrowUpRight, ArrowDownLeft, TrendingUp,
  History, PieChart, Wallet, CreditCard,
  Plus, Search, Filter, ArrowLeft,
  ChevronRight, MoreVertical, ShieldCheck,
  Zap, MapPin, CheckCircle2, Sparkles,
  Download, FileText, Settings, Clock
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"

const TRANSACTIONS = [
  { id: "CRT-TXN-101", type: "Brand Deal Payout", desc: "The Bosphorus Kitchen Feature", amount: "+₹15,000", date: "Nov 02, 2024", status: "Completed" },
  { id: "CRT-TXN-102", type: "Ad Revenue", desc: "Studio Feed Ads - Oct", amount: "+₹4,200", date: "Nov 01, 2024", status: "Completed" },
  { id: "CRT-TXN-103", type: "Withdrawal", desc: "Transfer to HDFC", amount: "-₹20,000", date: "Oct 30, 2024", status: "Processing" },
  { id: "CRT-TXN-104", type: "Gift Coins", desc: "From @sarah_ali", amount: "+₹500", date: "Oct 28, 2024", status: "Completed" },
];

export default function CreativeEarningsPage() {
  return (
    <div className="container mx-auto p-6 space-y-10 max-w-6xl pb-24 text-slate-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <Link href="/vendor/creative/dashboard" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
              <Banknote className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl font-black font-headline tracking-tight text-slate-900">Earnings & Payouts</h1>
              <p className="text-muted-foreground font-medium text-lg italic">Track your revenue from sponsorships, ad-rev, and community gifting.</p>
            </div>
          </div>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-10 font-black shadow-lg shadow-emerald-200 h-16 text-white transition-all active:scale-95 text-lg">
          <ArrowUpRight className="mr-2 h-6 w-6" /> Withdraw Funds
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Summary & Activity */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Summary Card */}
          <Card className="rounded-[3rem] border-none shadow-sm bg-slate-900 text-white p-12 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
            <div className="absolute top-0 right-0 p-10 opacity-10">
              <TrendingUp className="h-48 w-48 text-emerald-400" />
            </div>
            <div className="relative z-10 space-y-8">
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Available Studio Balance</p>
                <div className="flex items-baseline gap-4">
                  <h2 className="text-7xl font-black tracking-tighter">₹48,250</h2>
                  <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-xs px-4 h-8 flex items-center shadow-lg">
                    <TrendingUp className="h-4 w-4 mr-1" /> +18.4% YoY
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-1">Brand Revenue</p>
                  <p className="text-xl font-black">₹32,400</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-1">Ad Support</p>
                  <p className="text-xl font-black">₹12,850</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase opacity-40 tracking-widest mb-1">Gifts</p>
                  <p className="text-xl font-black">₹3,000</p>
                </div>
              </div>
            </div>
          </Card>

          <section className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight px-4">Ledger Activity</h3>
            <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/50">
                    <TableRow className="border-none">
                      <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">ID / Date</TableHead>
                      <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Description</TableHead>
                      <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Value</TableHead>
                      <TableHead className="text-right px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {TRANSACTIONS.map((txn) => (
                      <TableRow key={txn.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                        <TableCell className="px-8 py-5">
                          <div className="font-black text-slate-900 text-sm leading-none mb-1">{txn.id}</div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase">{txn.date}</div>
                        </TableCell>
                        <TableCell>
                          <p className="font-bold text-slate-800 text-sm">{txn.type}</p>
                          <p className="text-[10px] font-medium text-slate-400 italic line-clamp-1">{txn.desc}</p>
                        </TableCell>
                        <TableCell className={cn("font-black text-base", txn.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-900')}>
                          {txn.amount}
                        </TableCell>
                        <TableCell className="text-right px-8">
                          <Badge className={txn.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-none px-3 font-black text-[9px] uppercase' : 'bg-amber-50 text-amber-600 border-none px-3 font-black text-[9px] uppercase'}>
                            {txn.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900">Payout Method</h3>
              <Button size="icon" variant="ghost" className="rounded-xl bg-slate-50"><Settings className="h-4 w-4" /></Button>
            </div>
            <div className="p-6 bg-slate-50 rounded-[2rem] border-2 border-transparent hover:border-emerald-100 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-widest">HDFC Bank</p>
                  <p className="text-xs font-bold text-slate-400">•••• 8821 (Current)</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-emerald-50 rounded-[2rem] border-2 border-emerald-100 space-y-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <h4 className="text-sm font-black text-emerald-900 uppercase">Auto-Payout On</h4>
              </div>
              <p className="text-[10px] font-medium text-emerald-800 leading-relaxed italic">
                Balance above ₹10,000 is automatically settled every Tuesday at 9:00 AM UTC.
              </p>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-10 space-y-6">
            <h3 className="text-xl font-black text-slate-900">Revenue Breakdown</h3>
            <div className="space-y-6">
              {[
                { label: "Sponsorships", val: 65, color: "bg-blue-500" },
                { label: "Ad Revenue", val: 25, color: "bg-purple-500" },
                { label: "Community", val: 10, color: "bg-emerald-500" },
              ].map((r, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-500">{r.label}</span>
                    <span className="text-slate-900">{r.val}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-50 rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all duration-1000", r.color)} style={{ width: `${r.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
