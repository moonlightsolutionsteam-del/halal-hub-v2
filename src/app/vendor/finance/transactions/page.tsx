
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  History, Search, Filter, Clock, 
  CheckCircle2, Download, Phone,
  Printer, MoreVertical, Eye, MapPin,
  TrendingUp, Timer, Banknote, ArrowUpRight,
  CreditCard, Wallet, Landmark
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";

export default function FinanceTransactionsPage() {
  const transactions = [
    { id: "TXN-9021", user: "Ahmed Abdullah", type: "Portfolio Top-up", total: "₹1,25,000", status: "Cleared", time: "12 mins ago", method: "RTGS" },
    { id: "TXN-9022", user: "Sara Khan", type: "Quarterly Profit", total: "₹12,400", status: "Processing", time: "45 mins ago", method: "Internal" },
    { id: "TXN-9023", user: "Omar Farooq", type: "Withdrawal", total: "₹45,000", status: "Cleared", time: "2 hours ago", typeColor: "text-rose-600", method: "Bank Trans" },
    { id: "TXN-9024", user: "Hussain S.", type: "New Investment", total: "₹5,00,000", status: "Pending Audit", time: "Just now", method: "Wire" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-[10px]">
            <History className="h-3 w-3" /> Financial Ledger
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Transaction History</h1>
          <p className="text-muted-foreground font-medium">Monitor all institutional fund movements, investor payouts, and capital deployments.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <Printer className="mr-2 h-4 w-4" /> Print Statements
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-8 font-black shadow-lg shadow-indigo-200 h-12 text-white">
            <Download className="mr-2 h-4 w-4" /> Export Audit Log
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Today's Volume", value: "₹8.4M", icon: Banknote, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Settled Stays", value: "₹4.2M", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pending Clear", value: "₹1.5M", icon: Timer, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Internal Fees", value: "₹124k", icon: Wallet, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-sm p-6 bg-white flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
        <CardHeader className="p-8 border-b flex flex-col md:flex-row items-center justify-between gap-4">
          <CardTitle className="text-xl font-black">Settlement Registry</CardTitle>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Transaction ID..." className="pl-9 h-11 rounded-2xl bg-slate-50 border-none font-medium" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-none">
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">ID / Time</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">User & Type</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Method</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Total</TableHead>
                <TableHead className="text-right px-8 font-black text-[10px] uppercase tracking-widest text-slate-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((order) => (
                <TableRow key={order.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                  <TableCell className="px-8 py-5">
                    <div className="font-black text-slate-900 text-sm">{order.id}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">{order.time}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-slate-800">{order.user}</div>
                    <div className={`text-[10px] font-black uppercase ${order.typeColor || 'text-indigo-600'}`}>{order.type}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-xs font-bold text-slate-600">{order.method}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-black text-slate-900">{order.total}</TableCell>
                  <TableCell className="text-right px-8">
                    <Badge variant="outline" className={
                      order.status === 'Cleared' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 font-black text-[9px] px-3' : 
                      order.status === 'Processing' ? 'bg-blue-50 text-blue-600 border-blue-200 font-black text-[9px] px-3' : 
                      'bg-amber-50 text-amber-600 border-amber-200 font-black text-[9px] px-3'
                    }>
                      {order.status}
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
