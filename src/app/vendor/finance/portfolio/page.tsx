
"use client"

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

export default function FinancePortfolioPage() {
  const assets = [
    { id: "AST-901", name: "Dubai Real Estate Sukuk", type: "Asset-Backed", value: "₹12.4M", yield: "+12.5%", status: "Deployed", allocation: "35%" },
    { id: "AST-902", name: "SME Mudarabah Fund", type: "Profit Sharing", value: "₹8.5M", yield: "+10.2%", status: "Active", allocation: "22%" },
    { id: "AST-903", name: "Ethical Equity ETF", type: "Public Equities", value: "₹5.2M", yield: "-2.4%", status: "Deployed", allocation: "15%" },
    { id: "AST-904", name: "Liquid Murabaha Cash", type: "Liquidity", value: "₹4.8M", yield: "+4.2%", status: "Ready", allocation: "28%" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-[10px]">
            <Briefcase className="h-3 w-3" /> Asset Deployment
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Portfolio Hub</h1>
          <p className="text-muted-foreground font-medium">Manage your institution's active deployments, asset allocations, and risk scores.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            Risk Analysis
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-full px-8 font-black shadow-lg shadow-indigo-200 h-12 text-white">
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="p-8 border-b flex flex-col md:flex-row items-center justify-between gap-4">
              <CardTitle className="text-xl font-black">Asset Registry</CardTitle>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search Asset..." className="pl-9 h-11 rounded-2xl bg-slate-50 border-none font-medium" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/50">
                  <TableRow className="border-none">
                    <TableHead className="px-8 h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">ID / Asset Name</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Yield</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Value</TableHead>
                    <TableHead className="h-14 font-black text-[10px] uppercase tracking-widest text-slate-400">Allocation</TableHead>
                    <TableHead className="text-right px-8 font-black text-[10px] uppercase tracking-widest text-slate-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assets.map((asset) => (
                    <TableRow key={asset.id} className="border-slate-100 hover:bg-slate-50/50 transition-colors group">
                      <TableCell className="px-8 py-5">
                        <div className="font-bold text-slate-800 text-sm">{asset.name}</div>
                        <div className="text-[9px] font-black text-indigo-600 uppercase">{asset.type}</div>
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-1.5 font-black text-sm ${asset.yield.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {asset.yield.startsWith('+') ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {asset.yield}
                        </div>
                      </TableCell>
                      <TableCell className="font-black text-slate-900">{asset.value}</TableCell>
                      <TableCell>
                        <div className="space-y-1.5">
                          <div className="h-1.5 w-24 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-600 rounded-full" style={{ width: asset.allocation }} />
                          </div>
                          <span className="text-[10px] font-bold text-slate-400">{asset.allocation}</span>
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
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-10 space-y-8 relative overflow-hidden">
            <PieChart className="absolute top-0 right-0 p-4 h-24 w-24 opacity-10 text-indigo-600" />
            <div className="relative z-10 space-y-6">
              <h3 className="text-2xl font-black font-headline leading-tight">Shariah Audit Required</h3>
              <p className="text-sm text-slate-400 font-medium leading-relaxed">
                Your portfolio has 3 new asset deployments that require independent Shariah board verification to maintain "Hub Verified" status.
              </p>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-14 font-black text-xs uppercase tracking-widest shadow-xl">
                Start Asset Audit
              </Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
            <h3 className="text-xl font-black text-slate-900">Allocation Strategy</h3>
            <div className="space-y-4">
              {[
                { name: "Infrastructure Sukuk", target: "40%", current: "35%" },
                { name: "SME Equity", target: "20%", current: "22%" },
                { name: "Public Shariah ETFs", target: "15%", current: "15%" },
                { name: "Murabaha Cash", target: "25%", current: "28%" },
              ].map((strat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-500">{strat.name}</span>
                    <span className="text-indigo-600">Target: {strat.target}</span>
                  </div>
                  <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full" style={{ width: strat.current }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
