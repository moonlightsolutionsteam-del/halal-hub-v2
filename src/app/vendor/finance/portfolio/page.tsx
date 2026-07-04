
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3, TrendingUp, PieChart, Landmark,
  ArrowUpRight, ArrowDownRight, Search, Filter,
  ShieldCheck, AlertCircle, Plus, Layers,
  ChevronRight, MoreVertical, LayoutGrid,
  Briefcase, Activity
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FinancePortfolioPage() {
  const [showRiskModal, setShowRiskModal] = useState(false)
  const [showNewAssetModal, setShowNewAssetModal] = useState(false)
  const [showAuditModal, setShowAuditModal] = useState(false)

  const assets = [
    { id: "AST-901", name: "Dubai Real Estate Sukuk", type: "Asset-Backed", value: "₹12.4M", yield: "+12.5%", status: "Deployed", allocation: "35%" },
    { id: "AST-902", name: "SME Mudarabah Fund", type: "Profit Sharing", value: "₹8.5M", yield: "+10.2%", status: "Active", allocation: "22%" },
    { id: "AST-903", name: "Ethical Equity ETF", type: "Public Equities", value: "₹5.2M", yield: "-2.4%", status: "Deployed", allocation: "15%" },
    { id: "AST-904", name: "Liquid Murabaha Cash", type: "Liquidity", value: "₹4.8M", yield: "+4.2%", status: "Ready", allocation: "28%" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-[10px]">
            <Briefcase className="h-3 w-3" /> Asset Deployment
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Portfolio Hub</h1>
          <p className="text-muted-foreground font-medium">Manage your institution's active deployments, asset allocations, and risk scores.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12" onClick={() => setShowRiskModal(true)}>
            Risk Analysis
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-8 font-black shadow-lg shadow-indigo-200 h-12 text-white" onClick={() => setShowNewAssetModal(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Asset Entry
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Total AUM", value: "₹45.2M", icon: Landmark, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Portfolio Health", value: "AA+", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Active Deployments", value: "12", icon: Layers, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Volatility Index", value: "Low", icon: Activity, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-sm p-6 bg-card flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-foreground">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-card">
            <CardHeader className="p-8 border-b flex flex-col md:flex-row items-center justify-between gap-4">
              <CardTitle className="text-xl font-black">Asset Registry</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search Asset..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">ID / Asset Name</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Yield</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Value</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Allocation</TableHead>
                    <TableHead className="text-right px-8 font-black text-[10px] uppercase tracking-widest text-muted-foreground">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow key={asset.id} className="border-border hover:bg-muted/50 transition-colors group">
                      <TableCell className="px-8 py-5">
                        <div className="font-bold text-foreground text-sm">{asset.name}</div>
                        <div className="text-[9px] font-black text-indigo-600 uppercase">{asset.type}</div>
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-1.5 font-black text-sm ${asset.yield.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {asset.yield.startsWith('+') ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {asset.yield}
                        </div>
                      </TableCell>
                      <TableCell className="font-black text-foreground">{asset.value}</TableCell>
                      <TableCell>
                        <div className="space-y-1.5">
                          <div className="h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 rounded-full" style={{ width: asset.allocation }} />
                          </div>
                          <span className="text-[10px] font-bold text-muted-foreground">{asset.allocation}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right px-8">
                        <Badge variant="outline" className="rounded-full px-3 text-[9px] font-black uppercase border-emerald-200 text-emerald-600 bg-emerald-50">
                          {asset.status}
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
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-10 space-y-8 relative overflow-hidden">
            <PieChart className="absolute top-0 right-0 p-4 h-24 w-24 opacity-10 text-indigo-600" />
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-black font-headline leading-tight">Shariah Audit Required</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Your portfolio has 3 new asset deployments that require independent Shariah board verification to maintain "Hub Verified" status.
              </p>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-14 font-black text-xs uppercase tracking-widest shadow-xl" onClick={() => setShowAuditModal(true)}>
                Start Asset Audit
              </Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6">
            <h3 className="text-xl font-black text-foreground">Allocation Strategy</h3>
            <div className="space-y-4">
              {[
                { name: "Infrastructure Sukuk", target: "40%", current: "35%" },
                { name: "SME Equity", target: "20%", current: "22%" },
                { name: "Public Shariah ETFs", target: "15%", current: "15%" },
                { name: "Murabaha Cash", target: "25%", current: "28%" },
              ].map((strat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-muted-foreground">{strat.name}</span>
                    <span className="text-indigo-600">Target: {strat.target}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: strat.current }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Risk Analysis Modal */}
      <Dialog open={showRiskModal} onOpenChange={setShowRiskModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Portfolio Risk Analysis</DialogTitle>
            <DialogDescription>Review your current risk exposure and scoring across asset classes.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Overall Risk Score", value: "Low", color: "text-emerald-600" },
                { label: "Volatility Index", value: "2.4%", color: "text-blue-600" },
                { label: "Shariah Compliance", value: "100%", color: "text-emerald-600" },
                { label: "Concentration Risk", value: "Moderate", color: "text-amber-600" },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-muted rounded-2xl space-y-1">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{item.label}</p>
                  <p className={`text-xl font-black ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Risk Tolerance Level</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="Select tolerance" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="low">Low — Capital Preservation</SelectItem>
                  <SelectItem value="moderate">Moderate — Balanced Growth</SelectItem>
                  <SelectItem value="high">High — Aggressive Yield</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowRiskModal(false)}>Generate Risk Report</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Asset Entry Modal */}
      <Dialog open={showNewAssetModal} onOpenChange={setShowNewAssetModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">New Asset Entry</DialogTitle>
            <DialogDescription>Register a new Shariah-compliant asset in your portfolio.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Asset Name</Label>
              <Input placeholder="e.g. Dubai Real Estate Sukuk" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Asset Type</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="sukuk">Asset-Backed Sukuk</SelectItem>
                  <SelectItem value="mudarabah">Profit Sharing (Mudarabah)</SelectItem>
                  <SelectItem value="equities">Public Equities</SelectItem>
                  <SelectItem value="liquidity">Liquidity (Murabaha)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Asset Value (₹)</Label>
              <Input placeholder="e.g. 12,400,000" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Target Allocation %</Label>
              <Input placeholder="e.g. 35" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Expected Yield %</Label>
              <Input placeholder="e.g. 12.5" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowNewAssetModal(false)}>Register Asset</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Start Asset Audit Modal */}
      <Dialog open={showAuditModal} onOpenChange={setShowAuditModal}>
        <DialogContent className="rounded-[2rem] max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-black">Start Asset Audit</DialogTitle>
            <DialogDescription>Submit your portfolio for independent Shariah board verification.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Audit Scope</Label>
              <Select>
                <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                  <SelectValue placeholder="Select scope" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl">
                  <SelectItem value="full">Full Portfolio Review</SelectItem>
                  <SelectItem value="new">New Deployments Only</SelectItem>
                  <SelectItem value="targeted">Targeted Asset Class</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Assigned Shariah Board Member</Label>
              <Input placeholder="e.g. Sheikh Abdullah Hassan" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase tracking-widest">Preferred Review Date</Label>
              <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold" />
            </div>
            <Button className="w-full h-12 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => setShowAuditModal(false)}>Submit for Audit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
