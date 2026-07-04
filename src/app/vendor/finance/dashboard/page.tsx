
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Wallet, CircleDollarSign, TrendingUp, ShieldCheck,
  Users, Tag, ArrowUpRight, PlusCircle, Settings,
  Clock, CheckCircle2, AlertCircle, FileText,
  BarChart3, Landmark, Briefcase, Activity
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function FinanceDashboard() {
  const [showViewLedgerModal, setShowViewLedgerModal] = useState(false)
  const [showDeployFundsModal, setShowDeployFundsModal] = useState(false)
  const [showAcceptLeadModal, setShowAcceptLeadModal] = useState(false)
  const [showArchiveModal, setShowArchiveModal] = useState(false)
  const [showQuickActionModal, setShowQuickActionModal] = useState<string | null>(null)

  const kpis = [
    { label: "Total AUM", value: "₹45.2M", trend: "+8.4% YoY", icon: Wallet },
    { label: "Active Investors", value: "1,240", trend: "+12 new today", icon: Users },
    { label: "Compliance Score", value: "99.2%", trend: "Shariah Audited", icon: ShieldCheck },
    { label: "Pending Approvals", value: "15", trend: "KYC Pending", icon: Clock, variant: "destructive" as const },
    { label: "Avg. Portfolio Yield", value: "12.5%", trend: "Annualized", icon: TrendingUp },
    { label: "Asset Deployment", value: "₹38.5M", trend: "Capital at work", icon: CircleDollarSign },
    { label: "Audit Readiness", value: "High", trend: "Next audit: 12d", icon: FileText },
    { label: "Growth Rating", value: "AA+", trend: "Investment grade", icon: ArrowUpRight },
  ];

  const recentTransactions = [
    { id: "FIN-TXN-901", user: "Omar Malik", type: "Investment", total: "₹50,000", status: "Completed" },
    { id: "FIN-TXN-902", user: "Sara Siddiqui", type: "Withdrawal", total: "₹12,000", status: "Processing" },
    { id: "FIN-TXN-903", user: "Yusuf Khan", type: "Profit Share", total: "₹3,800", status: "Completed" },
  ];

  const quickActions = [
    { label: "New Product", icon: PlusCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "KYC Check", icon: ShieldCheck, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Deploy Capital", icon: Landmark, color: "text-indigo-500", bg: "bg-indigo-50" },
    { label: "Risk Analysis", icon: Activity, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Market News", icon: BarChart3, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "System Config", icon: Settings, color: "text-muted-foreground", bg: "bg-muted" },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Finance & Banking Hub</h1>
        <p className="text-muted-foreground font-medium opacity-60">Welcome back. Your Shariah governance score is optimal.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm rounded-3xl bg-card p-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-tighter">{kpi.label}</span>
              <kpi.icon className={`h-4 w-4 ${kpi.variant === 'destructive' ? 'text-red-400' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-black ${kpi.variant === 'destructive' ? 'text-red-600' : 'text-foreground'}`}>
                {kpi.value}
              </div>
              <p className={`text-[10px] font-bold mt-1 uppercase tracking-tight ${kpi.variant === 'destructive' ? 'text-red-400' : 'text-emerald-600'}`}>
                {kpi.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden bg-card">
            <CardHeader className="p-8 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black">Institutional Activity</CardTitle>
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 rounded-full font-black text-xs px-6 h-10 text-white" onClick={() => setShowViewLedgerModal(true)}>
                View Ledger <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black uppercase text-[10px] tracking-widest text-muted-foreground">ID / Investor</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Type</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Value</TableHead>
                    <TableHead className="text-right px-8 font-black uppercase text-[10px] tracking-widest text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentTransactions.map((txn, i) => (
                    <TableRow key={i} className="border-border hover:bg-muted/50 transition-colors">
                      <TableCell className="px-8 py-5">
                        <div className="font-bold text-foreground text-sm">{txn.user}</div>
                        <div className="text-[9px] font-bold text-muted-foreground uppercase">{txn.id}</div>
                      </TableCell>
                      <TableCell className="font-bold text-muted-foreground text-xs">{txn.type}</TableCell>
                      <TableCell className="font-black text-foreground text-sm">{txn.total}</TableCell>
                      <TableCell className="text-right px-8">
                        <Badge variant="outline" className="rounded-full px-4 text-[9px] font-black uppercase border-indigo-200 text-indigo-600 bg-indigo-50/50">
                          {txn.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <section className="space-y-4">
            <h2 className="text-xl font-black px-2">Rapid Deployment Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {quickActions.map((action, i) => (
                <button key={i} className="group flex flex-col items-center justify-center p-6 bg-card rounded-[2rem] shadow-sm hover:shadow-md transition-all border border-transparent hover:border-indigo-100" onClick={() => setShowQuickActionModal(action.label)}>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-2 ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-black text-foreground uppercase tracking-tighter">{action.label}</span>
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Compliance Monitor</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
              {[
                { name: "Shariah Board Review", status: "Verified", val: 100 },
                { name: "Capital Adequacy", status: "Strong", val: 92 },
                { name: "Portfolio Ethics", status: "Audit Due", val: 45, variant: "warning" },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-muted-foreground">{item.name}</span>
                    <span className={item.variant === 'warning' ? 'text-amber-500' : 'text-emerald-500'}>{item.status}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.variant === 'warning' ? 'bg-amber-400' : 'bg-indigo-600'} transition-all`}
                      style={{ width: `${item.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-indigo-600 text-white p-8 overflow-hidden relative">
            <Briefcase className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
            <div className="relative z-10 space-y-4">
              <h3 className="text-xl font-black">Asset Deployment</h3>
              <p className="text-sm font-medium opacity-80 leading-relaxed">
                You have ₹1.2M in unallocated capital. Review high-yield Sukuk opportunities in the partner network.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs uppercase tracking-widest h-12 shadow-xl" onClick={() => setShowDeployFundsModal(true)}>Deploy Funds</Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="text-xl font-black">Recent HNW Inquiry</CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="p-4 bg-indigo-50/50 rounded-2xl border-2 border-indigo-100 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-card rounded-xl flex items-center justify-center text-indigo-600 font-black text-xs shadow-sm">HA</div>
                  <div>
                    <p className="text-sm font-black text-foreground">Hamza Ali</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase">Mudarabah Query • 2h ago</p>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground font-medium italic line-clamp-2 leading-relaxed">
                  "Requesting details on the upcoming Real Estate Sukuk. Minimum entry and Shariah board fatwa..."
                </p>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-[10px] h-9" onClick={() => setShowAcceptLeadModal(true)}>Accept Lead</Button>
                  <Button size="sm" variant="ghost" className="flex-1 rounded-xl font-black text-[10px] h-9" onClick={() => setShowArchiveModal(true)}>Archive</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* View Ledger Modal */}
      <Dialog open={showViewLedgerModal} onOpenChange={setShowViewLedgerModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Full Transaction Ledger</DialogTitle>
            <DialogDescription>View and filter all institutional activity across the platform.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Date Range</Label>
              <div className="grid grid-cols-2 gap-3">
                <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Transaction Type</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="investment">Investment</SelectItem>
                  <SelectItem value="withdrawal">Withdrawal</SelectItem>
                  <SelectItem value="profit">Profit Share</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowViewLedgerModal(false)}>View Ledger</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Deploy Funds Modal */}
      <Dialog open={showDeployFundsModal} onOpenChange={setShowDeployFundsModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Deploy Funds</DialogTitle>
            <DialogDescription>Allocate ₹1.2M of undeployed capital to a Shariah-compliant opportunity.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Deployment Target</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="Select opportunity" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="sukuk">Dubai Real Estate Sukuk</SelectItem>
                  <SelectItem value="sme">SME Mudarabah Fund</SelectItem>
                  <SelectItem value="etf">Ethical Equity ETF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Amount (₹)</Label>
              <Input placeholder="e.g. 1,200,000" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Deployment Notes</Label>
              <Textarea placeholder="Additional notes for this deployment..." className="rounded-2xl bg-muted border-none font-bold resize-none" rows={3} />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowDeployFundsModal(false)}>Confirm Deployment</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Accept Lead Modal */}
      <Dialog open={showAcceptLeadModal} onOpenChange={setShowAcceptLeadModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Accept Lead — Hamza Ali</DialogTitle>
            <DialogDescription>Assign this inquiry to your team and set next steps.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Assigned Relationship Manager</Label>
              <Input placeholder="e.g. Usman Sheikh" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Follow-up Date</Label>
              <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Initial Response Notes</Label>
              <Textarea placeholder="Notes for the initial outreach..." className="rounded-2xl bg-muted border-none font-bold resize-none" rows={3} />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowAcceptLeadModal(false)}>Accept & Assign</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Archive Confirmation Modal */}
      <Dialog open={showArchiveModal} onOpenChange={setShowArchiveModal}>
        <DialogContent className="rounded-[2rem] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Archive Inquiry?</DialogTitle>
            <DialogDescription>This will move the Hamza Ali inquiry to your archive. You can retrieve it later.</DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1 h-12 rounded-2xl font-black border-2" onClick={() => setShowArchiveModal(false)}>Cancel</Button>
            <Button className="flex-1 h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowArchiveModal(false)}>Archive</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Quick Action Modal */}
      <Dialog open={!!showQuickActionModal} onOpenChange={() => setShowQuickActionModal(null)}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">{showQuickActionModal}</DialogTitle>
            <DialogDescription>Launch the {showQuickActionModal} tool from your rapid deployment panel.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="p-6 bg-muted rounded-2xl text-center space-y-2">
              <p className="font-black text-foreground">Module launching...</p>
              <p className="text-sm text-muted-foreground font-medium">The {showQuickActionModal} tool is being prepared for you.</p>
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowQuickActionModal(null)}>Open Tool</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
