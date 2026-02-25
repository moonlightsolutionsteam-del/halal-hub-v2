"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, ArrowUpRight, CreditCard, 
  History, ShieldCheck, Download,
  TrendingUp, Banknote, Info, Plus,
  CheckCircle2, Receipt
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import Image from "next/image";

export default function HotelWalletPage() {
  const transactions = [
    { id: "HTL-TXN-101", type: "Stay Settlement", date: "Nov 02, 2024", amount: "+₹45,200", status: "Completed" },
    { id: "HTL-TXN-102", type: "Hub Booking Fee", date: "Nov 01, 2024", amount: "-₹2,250", status: "Completed" },
    { id: "HTL-TXN-103", type: "System Withdrawal", date: "Oct 30, 2024", amount: "-₹1,50,000", status: "Processing" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sky-600 font-black uppercase tracking-widest text-[10px]">
            <Wallet className="h-3 w-3" /> Financial Operations
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Wallet & Settlements</h1>
          <p className="text-muted-foreground font-medium">Manage property earnings, stay payouts, and settlement bank accounts.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <History className="mr-2 h-4 w-4" /> Statements
          </Button>
          <Button className="bg-sky-600 hover:bg-sky-700 rounded-full px-8 font-black shadow-lg shadow-sky-200 h-12 text-white">
            <ArrowUpRight className="mr-2 h-4 w-4" /> Request Payout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-10 space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Banknote className="h-32 w-32 text-sky-600" />
              </div>
              <div className="space-y-2 relative z-10">
                <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Settled Balance</p>
                <h2 className="text-6xl font-black tracking-tighter">₹2,84,250</h2>
              </div>
              <div className="flex items-center gap-4 relative z-10 pt-4">
                <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400">Monthly Yield</p>
                  <p className="text-sm font-bold">+24.2% vs Last Month</p>
                </div>
              </div>
            </Card>

            <div className="grid grid-rows-2 gap-6">
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 flex items-center justify-between group cursor-pointer hover:shadow-md transition-all">
                <div className="flex items-center gap-6">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Linked Account</p>
                    <p className="text-sm font-bold text-slate-900">ICICI •••• 8821</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-300" />
              </Card>
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 flex items-center justify-between group cursor-pointer hover:shadow-md transition-all">
                <div className="flex items-center gap-6">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Account Status</p>
                    <p className="text-sm font-bold text-slate-900">Fully Verified</p>
                  </div>
                </div>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              </Card>
            </div>
          </div>

          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="p-8 border-b">
              <CardTitle className="text-xl font-black">Transaction Registry</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">ID / Date</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Description</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Amount</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-right px-8">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((txn) => (
                    <TableRow key={txn.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="px-8 py-5 text-xs font-black text-slate-900">
                        {txn.id}<br /><span className="text-slate-400 font-bold uppercase">{txn.date}</span>
                      </TableCell>
                      <TableCell className="text-sm font-bold text-slate-700">{txn.type}</TableCell>
                      <TableCell className={`font-black text-sm ${txn.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {txn.amount}
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <Badge className={txn.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-none' : 'bg-amber-50 text-amber-600 border-none'}>
                          {txn.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black uppercase text-slate-400 tracking-widest">Bank Details</h3>
              <Button size="icon" variant="ghost" className="rounded-xl bg-slate-50"><Plus className="h-4 w-4" /></Button>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border-2 border-transparent hover:border-sky-600 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Receipt className="h-5 w-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">ICICI Bank</p>
                  <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Business Current</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
            <div className="flex items-center gap-3 text-amber-600">
              <Info className="h-5 w-5" />
              <h3 className="text-base font-black">Fee Schedule</h3>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Standard booking fee of 10% applies to all Platform Bookings. Property direct bookings managed through our engine incur a 2% platform maintenance fee.
            </p>
            <Button variant="outline" className="w-full h-12 rounded-2xl border-2 font-black text-xs uppercase tracking-widest text-sky-600 border-sky-100 hover:bg-sky-50">
              Full Payout Policy
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
