"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, CreditCard, 
  History, Settings, ShieldCheck, Download,
  TrendingUp, Banknote, Calendar, Info,
  MoreVertical, RefreshCcw, Plus
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import Image from "next/image";

export default function AccountWalletPage() {
  const transactions = [
    { id: "TXN-8821", type: "Order Payout", date: "Nov 02, 2024", amount: "+₹1,240", status: "Completed", method: "System Wallet" },
    { id: "TXN-8822", type: "Withdrawal", date: "Nov 01, 2024", amount: "-₹15,000", status: "Processing", method: "Bank Transfer" },
    { id: "TXN-8823", type: "Marketing Fee", date: "Oct 30, 2024", amount: "-₹2,500", status: "Completed", method: "Credits" },
    { id: "TXN-8824", type: "Order Payout", date: "Oct 29, 2024", amount: "+₹4,800", status: "Completed", method: "System Wallet" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Wallet className="h-3 w-3" /> Financial Management
          </div>
          <h1 className="text-3xl font-black font-headline">Wallet & Settlements</h1>
          <p className="text-muted-foreground font-medium">Monitor your earnings, request withdrawals, and manage billing methods.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2">
            <History className="mr-2 h-4 w-4" /> Settlement Logs
          </Button>
          <Button className="bg-primary rounded-full px-8 font-black shadow-lg shadow-primary/20 h-12 text-white">
            <ArrowUpRight className="mr-2 h-4 w-4" /> Request Payout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-10 space-y-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Banknote className="h-32 w-32" />
              </div>
              <div className="space-y-2 relative z-10">
                <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Available Balance</p>
                <h2 className="text-6xl font-black tracking-tighter">₹24,850</h2>
              </div>
              <div className="flex items-center gap-4 relative z-10 pt-4">
                <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-slate-400">Next Auto-Payout</p>
                  <p className="text-sm font-bold">Nov 05, 2024</p>
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
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Active Bank</p>
                    <p className="text-sm font-bold text-slate-900">HDFC •••• 8821</p>
                  </div>
                </div>
                <Settings className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors" />
              </Card>
              <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 flex items-center justify-between group cursor-pointer hover:shadow-md transition-all">
                <div className="flex items-center gap-6">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Security Status</p>
                    <p className="text-sm font-bold text-slate-900">2FA Enabled</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-slate-300" />
              </Card>
            </div>
          </div>

          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="p-8 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black">Transaction History</CardTitle>
              <Button variant="ghost" className="font-bold text-primary">View All <ArrowUpRight className="ml-2 h-4 w-4" /></Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest">ID / Date</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest">Description</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest">Amount</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-right px-8">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((txn) => (
                    <TableRow key={txn.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="px-8 py-5">
                        <div className="font-black text-slate-900 text-xs">{txn.id}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase">{txn.date}</div>
                      </TableCell>
                      <TableCell>
                        <p className="font-bold text-slate-700 text-sm">{txn.type}</p>
                        <p className="text-[10px] font-medium text-slate-400">{txn.method}</p>
                      </TableCell>
                      <TableCell className={`font-black text-sm ${txn.amount.startsWith('+') ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {txn.amount}
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <Badge variant={txn.status === 'Completed' ? 'secondary' : 'outline'} className={
                          txn.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-none px-3' : 'bg-amber-50 text-amber-600 border-amber-200 px-3'
                        }>
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
            <h3 className="text-xl font-black">Linked Accounts</h3>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-500">Linked Accounts</h3>
              <Button size="icon" variant="ghost" className="rounded-xl bg-slate-50"><Plus className="h-4 w-4" /></Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border-2 border-transparent hover:border-blue-100 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <Image src="https://placehold.co/100x100/png?text=Bank" alt="Bank" width={20} height={20} className="opacity-40 grayscale" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">HDFC Bank</p>
                    <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">•••• 8821</p>
                  </div>
                </div>
                <Badge className="bg-emerald-50 text-emerald-600 border-none text-[9px] font-black">PRIMARY</Badge>
              </div>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
            <div className="flex items-center gap-3 text-amber-600">
              <Info className="h-5 w-5" />
              <h3 className="text-base font-black">Fee Disclosure</h3>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Standard marketplace fee of 5% applies to all digital orders. Bank settlement fees vary by provider. Access your billing documents for a full breakdown.
            </p>
            <Button variant="outline" className="w-full h-12 rounded-2xl border-2 font-black text-xs uppercase tracking-widest">
              Full Fee Schedule
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
