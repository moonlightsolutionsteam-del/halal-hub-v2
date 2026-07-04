"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Receipt, Search, Filter, Printer, 
  Download, Eye, CreditCard, Wallet,
  Calendar, ArrowUpRight, CheckCircle2,
  TrendingUp, History, Banknote
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function GroceryBillsPage() {
  const bills = [
    { id: "INV-GRO-201", type: "Store Sale", customer: "Ahmed Abdullah", total: "₹4,250", status: "Paid", method: "UPI", time: "5 mins ago" },
    { id: "INV-GRO-202", type: "Web Order", customer: "Sara Khan", total: "₹1,800", status: "Paid", method: "Card", time: "15 mins ago" },
    { id: "INV-GRO-203", type: "Store Sale", customer: "Omar Malik", total: "₹950", status: "Paid", method: "Cash", time: "45 mins ago" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-emerald-600 font-black uppercase tracking-widest text-[10px]">
            <Receipt className="h-3 w-3" /> Financial Ledger
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Digital Bills & POS</h1>
          <p className="text-muted-foreground font-medium">Track all store transactions, digital payouts, and daily closing reports.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <History className="mr-2 h-4 w-4" /> Closing Logs
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-8 font-black shadow-lg shadow-emerald-200 h-12 text-white">
            <Banknote className="mr-2 h-4 w-4" /> New Transaction
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 space-y-6">
          <div className="flex justify-between items-start">
            <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Today's Sales</p>
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </div>
          <h2 className="text-5xl font-black tracking-tighter">₹84,250</h2>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase">
            <CheckCircle2 className="h-3.5 w-3.5" /> All systems verified
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex flex-col justify-between">
          <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Digital Payouts</p>
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-foreground">₹62,100</h2>
            <p className="text-xs font-bold text-emerald-600 uppercase">74% of total sales</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex flex-col justify-between">
          <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Cash in Hand</p>
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-foreground">₹22,150</h2>
            <p className="text-xs font-bold text-amber-600 uppercase">Daily Float: ₹5,000</p>
          </div>
        </Card>
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
        <CardHeader className="p-8 border-b flex flex-col md:flex-row items-center justify-between gap-4">
          <CardTitle className="text-xl font-black">Recent Invoices</CardTitle>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Invoice ID..." className="pl-9 h-11 rounded-2xl bg-muted border-none" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Invoice / ID</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Customer & Type</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Method</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Amount</TableHead>
                <TableHead className="h-14 text-right px-8 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.id} className="border-border hover:bg-muted/50 transition-colors group">
                  <TableCell className="px-8 py-5">
                    <div className="font-black text-foreground text-xs">{bill.id}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">{bill.time}</div>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-foreground">{bill.customer}</p>
                    <p className="text-[10px] font-black text-emerald-600 uppercase">{bill.type}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-3.5 w-3.5 text-blue-500" />
                      <span className="text-xs font-bold text-muted-foreground">{bill.method}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-black text-foreground">{bill.total}</TableCell>
                  <TableCell className="text-right px-8">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="icon" variant="ghost" className="rounded-xl"><Printer className="h-4 w-4 text-muted-foreground" /></Button>
                      <Button size="icon" variant="ghost" className="rounded-xl"><Download className="h-4 w-4 text-muted-foreground" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}