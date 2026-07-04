"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Receipt, Search, Filter, Printer, 
  Download, Eye, CreditCard, Wallet,
  Calendar, ArrowUpRight, CheckCircle2,
  TrendingUp, History
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

export default function DigitalBillsPage() {
  const bills = [
    { id: "INV-2021", table: "T-04", customer: "Zaid Ali", total: "₹2,450", status: "Paid", method: "UPI", time: "10 mins ago" },
    { id: "INV-2022", table: "T-01", customer: "Aisha Malik", total: "₹1,800", status: "Paid", method: "Card", time: "25 mins ago" },
    { id: "INV-2023", table: "T-08", customer: "Sami Sheikh", total: "₹4,200", status: "Unpaid", method: "-", time: "Active" },
    { id: "INV-2024", table: "T-02", customer: "Farah K.", total: "₹950", status: "Paid", method: "Cash", time: "1 hour ago" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Receipt className="h-3 w-3" /> Financial Ops
          </div>
          <h1 className="text-3xl font-black font-headline">Digital Bills</h1>
          <p className="text-muted-foreground font-medium">Manage invoicing, track payments, and access your billing history.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2">
            <Calendar className="mr-2 h-4 w-4" /> Day Closing
          </Button>
          <Button className="bg-primary rounded-full px-8 font-bold shadow-lg shadow-primary/20">
            <Download className="mr-2 h-4 w-4" /> Export Ledger
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-primary text-primary-foreground p-8">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <p className="text-xs font-black uppercase tracking-[0.2em] opacity-80">Today's Total</p>
              <TrendingUp className="h-5 w-5 opacity-60" />
            </div>
            <div className="space-y-1">
              <h2 className="text-5xl font-black tracking-tighter">₹42,850</h2>
              <p className="text-xs font-bold opacity-60 uppercase">+12% from yesterday</p>
            </div>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex flex-col justify-between">
          <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Pending Payment</p>
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-amber-500">₹8,420</h2>
            <p className="text-xs font-bold text-muted-foreground uppercase">Across 5 tables</p>
          </div>
        </Card>
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 flex flex-col justify-between">
          <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Digital Payouts</p>
          <div className="space-y-1">
            <h2 className="text-4xl font-black text-blue-500">₹32,100</h2>
            <p className="text-xs font-bold text-muted-foreground uppercase">92% of total sales</p>
          </div>
        </Card>
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
        <CardHeader className="p-8 border-b flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl font-black">Recent Invoices</CardTitle>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Audit Ready Ledger</p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search Invoice ID..." className="pl-9 h-11 rounded-2xl bg-muted/30 border-none" />
            </div>
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl bg-card border-none shadow-sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/10">
              <TableRow className="border-none">
                <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest">Invoice / ID</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest">Customer & Table</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest">Payment Method</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest">Amount</TableHead>
                <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest">Status</TableHead>
                <TableHead className="h-14 text-right px-8 font-black text-[10px] uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill) => (
                <TableRow key={bill.id} className="hover:bg-muted/5 border-muted/20">
                  <TableCell className="px-8 py-5">
                    <div className="font-black text-foreground">{bill.id}</div>
                    <div className="text-[10px] font-bold text-muted-foreground uppercase">{bill.time}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-foreground">{bill.customer}</div>
                    <div className="text-[10px] font-black text-primary uppercase">Table: {bill.table}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {bill.method !== '-' ? <CreditCard className="h-3.5 w-3.5 text-blue-500" /> : <Wallet className="h-3.5 w-3.5 text-muted-foreground" />}
                      <span className="text-xs font-bold text-muted-foreground">{bill.method}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-black text-foreground text-base">{bill.total}</TableCell>
                  <TableCell>
                    <Badge variant={bill.status === 'Paid' ? 'secondary' : 'outline'} className={
                      bill.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-none px-3' : 'bg-amber-50 text-amber-600 border-amber-200 px-3'
                    }>
                      {bill.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-8">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="icon" variant="ghost" className="rounded-xl"><Printer className="h-4 w-4 text-muted-foreground" /></Button>
                      <Button size="icon" variant="ghost" className="rounded-xl"><Download className="h-4 w-4 text-muted-foreground" /></Button>
                      <Button size="icon" variant="ghost" className="rounded-xl hover:text-primary"><Eye className="h-4 w-4" /></Button>
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
