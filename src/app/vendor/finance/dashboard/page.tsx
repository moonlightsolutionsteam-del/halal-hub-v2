"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Wallet, CircleDollarSign, TrendingUp, ShieldCheck, 
  Users, Tag, ArrowUpRight, PlusCircle, Settings,
  Clock, CheckCircle2, AlertCircle, FileText
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function FinanceDashboard() {
  const kpis = [
    { label: "Total AUM", value: "₹45.2M", trend: "+8.4% YoY", icon: Wallet },
    { label: "Active Investors", value: "1,240", trend: "+12 new today", icon: Users },
    { label: "Compliance Score", value: "99.2%", trend: "Shariah Audited", icon: ShieldCheck },
    { label: "Pending Approvals", value: "15", trend: "Action required", icon: Clock, variant: "destructive" as const },
    { label: "Avg. Return", value: "12.5%", trend: "Annualized", icon: TrendingUp },
    { label: "Digital Loans", value: "₹8.5M", trend: "Active capital", icon: CircleDollarSign },
    { label: "Documents Due", value: "4", trend: "KYC verification", icon: FileText, variant: "destructive" as const },
    { label: "Growth Rating", value: "A+", trend: "Investment grade", icon: ArrowUpRight },
  ];

  const recentTransactions = [
    { id: "TXN-9021", customer: "Omar Malik", type: "Investment", total: "₹50,000", status: "Completed" },
    { id: "TXN-9022", customer: "Sarah Siddiqui", type: "Withdrawal", total: "₹12,000", status: "Processing" },
    { id: "TXN-9023", customer: "Yusuf Khan", type: "Profit Share", total: "₹3,800", status: "Completed" },
  ];

  const quickActions = [
    { label: "New Product", icon: PlusCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "Shariah Audit", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "KYC Portal", icon: Users, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Reports", icon: FileText, color: "text-slate-500", bg: "bg-slate-50" },
    { label: "Marketing", icon: Tag, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Settings", icon: Settings, color: "text-slate-500", bg: "bg-slate-50" },
  ];

  return (
    <div className="p-8 space-y-8 bg-[#F8FBF9] min-h-screen">
      <div className="space-y-1">
        <h1 className="text-3xl font-black font-headline text-slate-900">Finance &amp; Banking Dashboard</h1>
        <p className="text-muted-foreground font-medium opacity-60">Manage your Shariah-compliant financial products and customer portfolios.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl bg-white p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{kpi.label}</span>
              <kpi.icon className={`h-4 w-4 ${kpi.variant === 'destructive' ? 'text-red-400' : 'text-slate-300'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-black ${kpi.variant === 'destructive' ? 'text-red-600' : 'text-slate-800'}`}>
                {kpi.value}
              </div>
              <p className={`text-[10px] font-bold mt-1 uppercase tracking-tight ${kpi.variant === 'destructive' ? 'text-red-400' : 'text-slate-400'}`}>
                {kpi.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="p-8 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black">Recent Transactions</CardTitle>
              <Button size="sm" className="bg-primary hover:bg-primary/90 rounded-full font-black text-xs px-6 h-10">
                All Activity <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Transaction / User</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Type</TableHead>
                    <TableHead className="font-black uppercase text-[10px] tracking-widest text-slate-400">Amount</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest text-slate-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((txn, i) => (
                    <TableRow key={i} className="border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <TableCell className="px-8 py-5">
                        <div className="font-bold text-slate-800 text-sm">{txn.customer}</div>
                        <div className="text-[9px] font-bold text-muted-foreground uppercase">{txn.id}</div>
                      </TableCell>
                      <TableCell className="font-bold text-slate-600 text-xs">{txn.type}</TableCell>
                      <TableCell className="font-bold text-slate-500 text-sm">{txn.total}</TableCell>
                      <TableCell className="text-right px-8">
                        <Badge variant="outline" className="rounded-full px-4 text-[9px] font-black uppercase border-primary/20 text-primary bg-primary/5">
                          {txn.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="px-0 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {quickActions.map((action, i) => (
                <button key={i} className="group flex flex-col items-center justify-center p-6 bg-slate-50/50 rounded-[2rem] hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-primary/10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black text-slate-700 uppercase tracking-tighter text-center">{action.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Portfolio Mix</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              {[
                { name: "Real Estate Sukuk", status: "Healthy", val: 95 },
                { name: "SME Mudarabah", status: "High Demand", val: 78 },
                { name: "Equity Funds", status: "Moderate", val: 62, variant: "warning" },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-500">{item.name}</span>
                    <span className={item.variant === 'warning' ? 'text-amber-500' : 'text-emerald-500'}>{item.status}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${item.variant === 'warning' ? 'bg-amber-400' : 'bg-primary'} transition-all`}
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-primary text-primary-foreground p-8 overflow-hidden relative">
            <ShieldCheck className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-black">Shariah Certified?</h3>
              <p className="text-sm font-medium opacity-80 leading-relaxed">
                Display your fatwa certificates and Shariah board approvals to build trust with ethical investors.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs uppercase tracking-widest">Upload Certificates</Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Latest Enquiry</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="p-4 bg-muted/30 rounded-2xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center text-primary font-black text-[10px] shadow-sm">HA</div>
                  <div>
                    <p className="text-xs font-black text-slate-800">Hamza Ahmed</p>
                    <p className="text-[10px] text-muted-foreground font-bold">Sukuk Query • 1h ago</p>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 font-medium line-clamp-2 italic">
                  "Interested in the new sustainable energy sukuk. What is the minimum entry and expected maturity..."
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 rounded-xl font-black text-[10px] h-8 border-primary/20 text-primary">Call</Button>
                  <Button variant="outline" size="sm" className="flex-1 rounded-xl font-black text-[10px] h-8 border-primary/20 text-primary">Email</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
