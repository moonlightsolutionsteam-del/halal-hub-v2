
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Ticket, Wallet, ArrowUpRight, TrendingUp, 
  History, Download, Search, Filter,
  CreditCard, Banknote, Calendar, Info
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function EventSalesPage() {
  const transactions = [
    { id: "TXN-EVT-901", event: "Islamic Wedding Gala", type: "Package Payment", amount: "₹85,000", date: "Nov 01, 2024", status: "Completed" },
    { id: "TXN-EVT-902", event: "Community Expo", type: "Ticket Sale", amount: "₹1,250", date: "Nov 01, 2024", status: "Completed" },
    { id: "TXN-EVT-903", event: "Tech Seminar", type: "Booth Rental", amount: "₹15,000", date: "Oct 30, 2024", status: "Processing" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-purple-600 font-black uppercase tracking-widest text-[10px]">
            <Wallet className="h-3 w-3" /> Financial Ledger
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Revenue & Tickets</h1>
          <p className="text-muted-foreground font-medium">Track event package payments, ticket sales, and vendor commissions.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <Download className="mr-2 h-4 w-4" /> Statements
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 rounded-full px-8 font-black shadow-lg shadow-purple-200 h-12 text-white">
            <TrendingUp className="mr-2 h-4 w-4" /> Sales Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-6">
          <div className="flex justify-between items-start">
            <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Settled Earnings</p>
            <TrendingUp className="h-5 w-5 text-emerald-400" />
          </div>
          <h2 className="text-5xl font-black tracking-tighter">₹8.4M</h2>
          <p className="text-xs font-bold text-slate-400 uppercase">Life-time revenue</p>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 flex flex-col justify-between">
          <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Active Tickets</p>
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-purple-600">₹1.2M</h2>
            <p className="text-xs font-bold text-emerald-600 uppercase">For upcoming Expo</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 flex flex-col justify-between">
          <p className="text-xs font-black uppercase text-slate-400 tracking-widest">Pending Signatures</p>
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-slate-900">₹450k</h2>
            <p className="text-xs font-bold text-amber-600 uppercase">In draft proposals</p>
          </div>
        </Card>
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
        <CardHeader className="p-8 border-b flex flex-col md:flex-row items-center justify-between gap-4">
          <CardTitle className="text-xl font-black">Transaction Ledger</CardTitle>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search ID..." className="pl-9 h-11 rounded-2xl bg-slate-50 border-none" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">ID / Date</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Event & Type</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Amount</TableHead>
                <TableHead className="h-14 text-right px-8 font-black text-[10px] uppercase tracking-widest text-slate-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((txn) => (
                <TableRow key={txn.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="px-8 py-5">
                    <div className="font-black text-slate-900 text-xs">{txn.id}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">{txn.date}</div>
                  </TableCell>
                  <TableCell>
                    <p className="font-bold text-slate-800">{txn.event}</p>
                    <p className="text-[10px] font-black text-purple-600 uppercase">{txn.type}</p>
                  </TableCell>
                  <TableCell className="font-black text-slate-900">{txn.amount}</TableCell>
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
  );
}
