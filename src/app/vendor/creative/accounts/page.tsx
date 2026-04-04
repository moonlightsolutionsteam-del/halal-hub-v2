
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Link as LinkIcon, Youtube, Instagram, 
  MessageSquare, Globe, ArrowUpRight,
  Plus, CheckCircle2, ShieldCheck, Zap,
  Smartphone, Share2, MoreVertical
} from "lucide-react"
import Link from "next/link"

const ACCOUNTS = [
  { id: 1, name: "YouTube", handle: "Shaykh Hamza", icon: Youtube, status: "Connected", stats: "125k Subs", color: "text-red-600", bg: "bg-red-50" },
  { id: 2, name: "Instagram", handle: "@hamza_legacy", icon: Instagram, status: "Connected", stats: "85k Follow", color: "text-pink-600", bg: "bg-pink-50" },
  { id: 3, name: "Twitter / X", handle: "@hamza_deen", icon: Globe, status: "Connected", stats: "42k Follow", color: "text-slate-900", bg: "bg-slate-50" },
];

export default function ConnectedAccountsPage() {
  return (
    <div className="container mx-auto p-6 space-y-10 max-w-4xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <LinkIcon className="h-3 w-3" /> Sync Hub
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Connected Accounts</h1>
          <p className="text-muted-foreground font-medium">Link your external platforms to Halal Hub for unified analytics and verification.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 font-black shadow-lg shadow-primary/20 h-12">
          <Plus className="mr-2 h-4 w-4" /> Link New Account
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {ACCOUNTS.map((acc) => (
          <Card key={acc.id} className="rounded-[2.5rem] border-none shadow-sm bg-white overflow-hidden border-2 border-transparent hover:border-primary/10 transition-all group">
            <div className="p-8 flex flex-col sm:flex-row items-center justify-between gap-10">
              <div className="flex items-center gap-8">
                <div className={cn("h-20 w-20 rounded-3xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform", acc.bg, acc.color)}>
                  <acc.icon className="h-10 w-10" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-black text-slate-900">{acc.name}</h3>
                    <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] px-3 h-6 flex items-center uppercase">{acc.status}</Badge>
                  </div>
                  <p className="text-base font-bold text-slate-500 leading-none">{acc.handle}</p>
                  <p className="text-xs font-black text-slate-300 uppercase tracking-widest pt-1">{acc.stats}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <Button variant="outline" className="flex-1 sm:flex-none rounded-xl h-12 px-8 font-black text-xs uppercase tracking-widest border-2">Sync Data</Button>
                <Button variant="ghost" size="icon" className="rounded-xl h-12 w-12 bg-slate-50 text-slate-400"><MoreVertical className="h-5 w-5" /></Button>
              </div>
            </div>
          </Card>
        ))}

        <Card className="rounded-[2.5rem] border-4 border-dashed border-slate-100 bg-slate-50/30 flex flex-col items-center justify-center p-12 text-center gap-4 hover:bg-white hover:border-primary/20 transition-all cursor-pointer group">
          <div className="h-16 w-16 bg-white rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Plus className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-xl text-slate-900">Add Platform</p>
            <p className="text-sm text-slate-400 font-medium px-4">Connect TikTok, Substack, or your own Podcast RSS</p>
          </div>
        </Card>
      </div>

      <div className="p-10 bg-slate-900 text-white rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <ShieldCheck className="h-48 w-48" />
        </div>
        <div className="relative z-10 space-y-4 text-center md:text-left flex-1">
          <h2 className="text-3xl font-black font-headline">Privacy & API Security</h2>
          <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-2xl">
            Linking accounts only pulls public analytics metadata. We never store your passwords or have access to your private direct messages on other platforms.
          </p>
        </div>
        <Button variant="outline" className="h-16 px-12 rounded-2xl border-2 border-white/20 text-white font-black uppercase text-sm tracking-widest hover:bg-white/10 relative z-10">Data Privacy Charter</Button>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
