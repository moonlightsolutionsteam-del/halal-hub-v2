
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users2, Search, Filter, MessageSquare, 
  ArrowUpRight, Plus, CheckCircle2, UserPlus,
  ShieldCheck, Zap, HandHeart, Info,
  Store, Briefcase, Landmark, Smartphone,
  ArrowLeft, Star
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const REQUESTS = [
  { id: 1, vendor: "The Bosphorus Kitchen", type: "Food Review", amount: "₹15,000", status: "New", date: "2h ago", img: "food1" },
  { id: 2, name: "Pure Glow Beauty", type: "Product Spotlight", amount: "₹25,000", status: "In Discussion", date: "5h ago", img: "beauty1" },
  { id: 3, name: "Umrah Deluxe Tours", type: "Full Itinerary Feature", amount: "₹85,000", status: "Active", date: "Yesterday", img: "travel1" },
];

export default function CollaborationsHubPage() {
  return (
    <div className="container mx-auto p-6 space-y-10 max-w-6xl pb-24 text-slate-900">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <Link href="/vendor/creative/dashboard" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner">
              <Users2 className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-black font-headline text-slate-900">Collaborations Hub</h1>
          </div>
          <p className="text-muted-foreground font-medium">Manage brand partnerships, sponsorships, and community reviews.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 font-black shadow-lg shadow-primary/20 h-12">
          <Zap className="mr-2 h-4 w-4" /> Find Brand Deals
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Active Collabs", value: "4", icon: HandHeart, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Pipeline Value", value: "₹1.2M", icon: Landmark, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Partner Rating", value: "4.9", icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat, i) => (
          <Card key={i} className="rounded-3xl border-none shadow-sm p-6 bg-white flex items-center gap-4 group hover:shadow-md transition-all">
            <div className={`h-12 w-12 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-black px-2">Partnership Requests</h2>
        <div className="grid grid-cols-1 gap-4">
          {REQUESTS.map((req) => (
            <Card key={req.id} className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden border-2 border-transparent hover:border-blue-100 transition-all group">
              <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="flex items-center gap-8">
                  <div className="h-20 w-20 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-110 transition-transform relative overflow-hidden">
                    <Image src={`https://picsum.photos/seed/biz-col-${req.id}/200/200`} alt="Biz" fill className="object-cover opacity-20" />
                    <Store className="h-10 w-10 relative z-10" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-black text-slate-900 leading-tight">{req.vendor || req.name}</h3>
                      <Badge className={req.status === 'New' ? 'bg-blue-50 text-blue-600 border-none px-3 text-[9px] font-black uppercase' : 'bg-slate-50 text-slate-400 border-none px-3 text-[9px] font-black uppercase'}>
                        {req.status}
                      </Badge>
                    </div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{req.type}</p>
                    <p className="text-xs font-black text-blue-600 pt-1 tracking-tighter">Value: {req.amount}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <Button className="flex-1 sm:flex-none rounded-xl h-12 px-10 font-black text-xs uppercase tracking-widest bg-slate-900 text-white shadow-xl hover:bg-primary transition-all">Review Proposal</Button>
                  <Button variant="ghost" size="icon" className="rounded-xl h-12 w-12 bg-slate-50 text-slate-400"><MessageSquare className="h-5 w-5" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
