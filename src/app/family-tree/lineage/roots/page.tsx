
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Network, GitBranch, Plus, ArrowLeft, 
  MapPin, Globe, History, ShieldCheck,
  Zap, Search, Filter, ArrowUpRight,
  Database, GitMerge, Info
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

export default function AncestryRootsPage() {
  return (
    <div className="container mx-auto p-6 space-y-10 max-w-6xl pb-24">
      <div className="flex flex-col gap-6">
        <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-emerald-600 transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Hub
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-emerald-100 text-emerald-600 shadow-inner">
                <Network className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h1 className="text-5xl font-black font-headline text-slate-900 tracking-tight">Ancestry Roots</h1>
                <p className="text-muted-foreground font-medium text-xl">Manage high-level root ancestors and unify global family branches.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-8 font-black shadow-lg shadow-emerald-200 h-14 text-white">
              <Plus className="mr-2 h-4 w-4" /> Add Root Ancestor
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Roots Explorer */}
        <div className="lg:col-span-8 space-y-8">
          <Card className="rounded-[3rem] border-none shadow-sm bg-white overflow-hidden">
            <CardHeader className="p-10 border-b bg-slate-50/30 flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="text-2xl font-black">Primary Lineages</CardTitle>
                <CardDescription className="text-base font-medium">Verified root branches connecting multiple trees.</CardDescription>
              </div>
              <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px] uppercase tracking-widest px-4 h-8">2 Verified Roots</Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-50">
                {[
                  { name: "Al-Sayed Primary Branch", root: "Sheikh Ibrahim Al-Sayed", origin: "Old Delhi, India", count: 124, year: "1895" },
                  { name: "Malik Merchant Clan", root: "Haji Yusuf Malik", origin: "Fes, Morocco", count: 85, year: "1912" },
                ].map((root, i) => (
                  <div key={i} className="p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors group">
                    <div className="flex items-center gap-6">
                      <div className="h-16 w-16 rounded-[1.5rem] bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner group-hover:scale-110 transition-transform">
                        <GitBranch className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-slate-900 leading-tight">{root.name}</h3>
                        <p className="text-sm font-bold text-slate-400 mt-1">Root: {root.root}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest flex items-center gap-1"><MapPin className="h-3 w-3" /> {root.origin}</span>
                          <span className="text-[10px] font-black uppercase text-slate-300 tracking-widest flex items-center gap-1"><History className="h-3 w-3" /> Est. {root.year}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-center md:text-right">
                        <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Total Nodes</p>
                        <p className="text-2xl font-black text-slate-900">{root.count}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="rounded-xl"><ArrowUpRight className="h-5 w-5 text-slate-300" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interactive Clan Map Placeholder */}
          <Card className="rounded-[3rem] border-none shadow-sm bg-slate-900 text-white p-12 overflow-hidden relative min-h-[400px] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-5" />
            <div className="relative z-10 text-center space-y-6">
              <div className="h-24 w-24 rounded-[2rem] bg-white/10 flex items-center justify-center mx-auto border border-white/10 shadow-2xl">
                <Globe className="h-12 w-12 text-emerald-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black tracking-tight">Global Lineage Map</h3>
                <p className="text-slate-400 font-medium text-lg max-w-sm mx-auto">
                  Visualize how your family roots branch out across different continents and generations.
                </p>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-14 px-12 font-black uppercase text-xs tracking-widest shadow-2xl">Launch Explorer</Button>
            </div>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <GitMerge className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-black text-slate-900">Merge Logs</h3>
            </div>
            <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
              Recent attempts to link similar branches detected in the global database.
            </p>
            <div className="space-y-4">
              {[
                { label: "Abdullah Root", status: "Potential Match", date: "2h ago" },
                { label: "Delhi Silk Clan", status: "Conflict Resolved", date: "1d ago" },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-100 transition-all cursor-pointer group">
                  <div>
                    <p className="text-sm font-black text-slate-700">{log.label}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{log.date}</p>
                  </div>
                  <Badge variant="secondary" className="bg-white text-blue-600 font-black text-[9px] uppercase border border-blue-50">{log.status}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-amber-50 p-8 space-y-4 border-2 border-amber-100">
            <div className="flex items-center gap-3 text-amber-600">
              <Info className="h-5 w-5" />
              <h4 className="text-sm font-black uppercase tracking-widest text-amber-900">Roots Governance</h4>
            </div>
            <p className="text-xs text-amber-900/70 font-medium leading-relaxed">
              Adding a Root Ancestor requires at least 2 verified historical documents (Birth Cert, Hajj Record, or Land Deed) to ensure the integrity of the global lineage.
            </p>
            <Button variant="outline" className="w-full rounded-xl border-amber-200 text-amber-700 bg-white font-black text-[10px] uppercase tracking-widest h-10 shadow-sm">View Verification Rules</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
