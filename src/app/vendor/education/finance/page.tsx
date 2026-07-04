
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, TrendingUp, History, Download, 
  Search, Filter, CreditCard, Banknote,
  Plus, ArrowUpRight, Receipt, Info,
  CheckCircle2, Clock
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function EducationFinancePage() {
  const payments = [
    { id: "FEE-8821", student: "Zaid Abdullah", type: "Term Fee", amount: "₹15,000", date: "Nov 01, 2024", status: "Cleared" },
    { id: "FEE-8822", student: "Sara Malik", type: "Exam Fee", amount: "₹1,200", date: "Oct 28, 2024", status: "Cleared" },
    { id: "FEE-8823", student: "Yusuf Khan", type: "Monthly Subscription", amount: "₹2,500", date: "Oct 15, 2024", status: "Overdue" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <Wallet className="h-3 w-3" /> Institutional Ledger
          </div>
          <h1 className="text-3xl font-black font-headline text-foreground">Fees & Grants</h1>
          <p className="text-muted-foreground font-medium">Monitor tuition collection, manage scholarships, and track institutional payouts.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <Download className="mr-2 h-4 w-4" /> Statements
          </Button>
          <Button className="bg-violet-600 hover:bg-violet-700 rounded-full px-8 font-black shadow-lg shadow-violet-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Issue Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-10 space-y-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Banknote className="h-32 w-32 text-violet-600" />
          </div>
          <div className="space-y-2 relative z-10">
            <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Net Tuition Collected</p>
            <h2 className="text-6xl font-black tracking-tighter">₹1.2M</h2>
          </div>
          <div className="flex items-center gap-4 relative z-10 pt-4">
            <div className="h-10 w-10 bg-card/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground">Term-to-Date</p>
              <p className="text-sm font-bold">+12.4% vs Last Year</p>
            </div>
          </div>
        </Card>

        <div className="grid grid-rows-2 gap-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex items-center justify-between group hover:shadow-md transition-all">
            <div className="flex items-center gap-6">
              <div className="h-12 w-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Fee Overdue</p>
                <p className="text-xl font-black text-foreground">₹8,500</p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Card>
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex items-center justify-between group hover:shadow-md transition-all">
            <div className="flex items-center gap-6">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Scholarships Paid</p>
                <p className="text-xl font-black text-foreground">₹12,400</p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </Card>
        </div>
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
        <CardHeader className="p-8 border-b flex flex-col md:flex-row items-center justify-between gap-4">
          <CardTitle className="text-xl font-black">Transaction Ledger</CardTitle>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Student or ID..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">ID / Date</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Student & Type</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Amount</TableHead>
                <TableHead className="h-14 text-right px-8 font-black text-[10px] uppercase tracking-widest">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((p) => (
                <TableRow key={p.id} className="border-border hover:bg-muted/50 transition-colors group">
                  <TableCell className="px-8 py-5 text-xs font-black text-foreground">
                    {p.id}<br /><span className="text-muted-foreground font-bold uppercase">{p.date}</span>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-foreground">{p.student}</p>
                    <p className="text-[10px] font-black text-violet-600 uppercase">{p.type}</p>
                  </TableCell>
                  <TableCell className="font-black text-foreground">{p.amount}</TableCell>
                  <TableCell className="text-right px-8">
                    <Badge className={
                      p.status === 'Cleared' ? 'bg-emerald-50 text-emerald-600 border-none font-black text-[9px] px-3' : 'bg-amber-50 text-amber-600 border-none font-black text-[9px] px-3'
                    }>
                      {p.status}
                    </Badge>
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
