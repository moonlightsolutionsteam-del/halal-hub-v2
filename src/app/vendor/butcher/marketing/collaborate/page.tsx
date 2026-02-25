
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users2, Search, Filter, Star, 
  MessageSquare, ArrowUpRight,
  Zap, TrendingUp, CheckCircle2, Plus
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export default function ButcherCollaboratePage() {
  const influencers = [
    { id: 1, name: "The Halal Grill Master", specialty: "Meat & BBQ Expert", reach: "85k", rating: 4.9 },
    { id: 2, name: "Sarah's Kitchen", specialty: "Organic Cooking", reach: "120k", rating: 4.8 },
    { id: 3, name: "Zaid's Food Quest", specialty: "Street Food & Local Gems", reach: "45k", rating: 4.7 },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-600 font-black uppercase tracking-widest text-[10px]">
            <Users2 className="h-3 w-3" /> Creator Hub
          </div>
          <h1 className="text-3xl font-black font-headline text-slate-900">Partner with Foodies</h1>
          <p className="text-muted-foreground font-medium">Work with verified halal creators to showcase your premium meat quality.</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 rounded-full px-8 font-black shadow-lg shadow-red-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Create Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-slate-900 text-white p-8 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Zap className="h-24 w-24 text-red-600" />
          </div>
          <div className="space-y-2 relative z-10">
            <h3 className="text-2xl font-black tracking-tight">Active Collabs</h3>
            <p className="text-sm text-slate-400 font-medium">You have 1 pending meat tasting invitation.</p>
          </div>
          <Button variant="secondary" className="w-full rounded-2xl h-12 font-black text-xs uppercase tracking-widest">Manage Projects</Button>
        </Card>
        
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Influencer Reach</p>
            <h2 className="text-3xl font-black text-slate-900">250k+</h2>
            <p className="text-xs font-bold text-emerald-600 uppercase">Potential Views</p>
          </div>
          <TrendingUp className="h-6 w-6 text-emerald-500 mt-4" />
        </Card>

        <Card className="rounded-[2.5rem] border-none shadow-sm bg-white p-8 flex flex-col justify-between group hover:shadow-md transition-all">
          <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">New Requests</p>
            <h2 className="text-3xl font-black text-slate-900">8</h2>
            <p className="text-xs font-bold text-red-600 uppercase">Awaiting Response</p>
          </div>
          <MessageSquare className="h-6 w-6 text-red-500 mt-4" />
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2">
          <h2 className="text-xl font-black">Verified Meat Critics</h2>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search creators..." className="pl-9 h-11 rounded-2xl bg-white border-none shadow-sm" />
            </div>
            <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl bg-white border-none shadow-sm"><Filter className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {influencers.map((influencer) => (
            <Card key={influencer.id} className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden border-2 border-transparent hover:border-red-100 transition-all group">
              <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <Avatar className="h-16 w-16 border-2 border-slate-50 shadow-sm">
                    <AvatarImage src={`https://picsum.photos/seed/influencer-meat${influencer.id}/100/100`} />
                    <AvatarFallback>{influencer.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xl font-black text-slate-900">{influencer.name}</p>
                      <CheckCircle2 className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none px-3 text-[10px] font-black uppercase tracking-tighter">
                        {influencer.specialty}
                      </Badge>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 border-none" /> {influencer.rating}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-12">
                  <div className="text-center md:text-right">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Avg. Reach</p>
                    <p className="text-2xl font-black text-slate-900">{influencer.reach}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="rounded-xl h-12 px-8 font-black uppercase text-[10px] tracking-widest border-2">Portfolio</Button>
                    <Button className="rounded-xl h-12 px-8 font-black uppercase text-[10px] tracking-widest bg-red-600 text-white shadow-lg shadow-red-200">Invite to Taste</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
