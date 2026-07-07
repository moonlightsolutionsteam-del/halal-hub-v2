"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Target, Heart, Activity, Plus, 
  ArrowLeft, CheckCircle2, TrendingUp,
  Zap, Users, HandHeart, Trophy
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function FamilyGoalsPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-5xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <Link href="/family-tree" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-emerald-600 transition-colors w-fit">
            <ArrowLeft className="h-4 w-4" /> Back to Hub
          </Link>
          <div className="flex items-center gap-3 mt-4">
            <div className="h-12 w-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 shadow-inner">
              <Target className="h-6 w-6" />
            </div>
            <h1 className="text-xl sm:text-3xl font-black font-headline text-foreground">Goals & Wellness</h1>
          </div>
          <p className="text-muted-foreground font-medium">Coordinate family charity targets and physical wellness milestones.</p>
        </div>
        <Link href="/family-tree/goals/create">
          <Button className="bg-rose-600 hover:bg-rose-700 rounded-full px-8 font-black shadow-lg shadow-rose-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> Create New Goal
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Charity/Sadaqah Tracker */}
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden flex flex-col group">
          <div className="p-5 sm:p-10 space-y-8 flex-1">
            <div className="flex justify-between items-start">
              <div className="h-16 w-16 rounded-[1.5rem] bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner group-hover:scale-110 transition-transform">
                <HandHeart className="h-8 w-8" />
              </div>
              <Badge className="bg-emerald-50 text-emerald-600 border-none font-black text-[10px] uppercase tracking-widest px-4 h-8">SADAQAH TRACKER</Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-foreground tracking-tight">Family Well Project</h3>
              <p className="text-muted-foreground font-medium leading-relaxed italic">"Raising funds together to build a water well in Gaza."</p>
            </div>
            <div className="space-y-4 pt-4">
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Raised So Far</p>
                  <p className="text-2xl sm:text-4xl font-black text-emerald-600 tracking-tighter">$8,500</p>
                </div>
                <p className="text-sm font-bold text-muted-foreground">of $10,000</p>
              </div>
              <Progress value={85} className="h-3 bg-muted" />
            </div>
          </div>
          <CardFooter className="bg-muted p-8 border-t">
            <Button className="w-full h-14 rounded-2xl bg-zinc-900 text-white font-black uppercase text-xs tracking-widest shadow-xl">Contribute Coins</Button>
          </CardFooter>
        </Card>

        {/* Wellness Challenge */}
        <Card className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden flex flex-col group">
          <div className="p-5 sm:p-10 space-y-8 flex-1">
            <div className="flex justify-between items-start">
              <div className="h-16 w-16 rounded-[1.5rem] bg-blue-50 flex items-center justify-center text-blue-600 shadow-inner group-hover:scale-110 transition-transform">
                <Activity className="h-8 w-8" />
              </div>
              <Badge className="bg-blue-50 text-blue-600 border-none font-black text-[10px] uppercase tracking-widest px-4 h-8">HEALTH CHALLENGE</Badge>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-foreground tracking-tight">50k Steps Week</h3>
              <p className="text-muted-foreground font-medium leading-relaxed italic">"Let's stay active together this week before the winter starts!"</p>
            </div>
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-2xl text-center">
                  <p className="text-2xl font-black text-blue-600">42,850</p>
                  <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Group Steps</p>
                </div>
                <div className="p-4 bg-muted rounded-2xl text-center">
                  <p className="text-2xl font-black text-foreground">2</p>
                  <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Days Left</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase text-muted-foreground tracking-widest px-1">
                  <span>Target Progress</span>
                  <span className="text-foreground">85% Completed</span>
                </div>
                <Progress value={85} className="h-2 bg-muted" />
              </div>
            </div>
          </div>
          <CardFooter className="bg-muted p-8 border-t">
            <Button variant="outline" className="w-full h-14 rounded-2xl border-2 font-black uppercase text-xs tracking-widest">View Leaderboard</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Rewards Notice */}
      <Card className="rounded-[3rem] border-none bg-zinc-900 text-white p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
        <Trophy className="absolute -bottom-4 -right-4 h-48 w-48 opacity-10 text-amber-400" />
        <div className="h-24 w-24 rounded-[2rem] bg-card/10 flex items-center justify-center text-amber-400 border border-white/10 shadow-2xl shrink-0">
          <Zap className="h-12 w-12 fill-current" />
        </div>
        <div className="space-y-4 relative z-10 text-center md:text-left flex-1">
          <h2 className="text-3xl font-black tracking-tight">Earn Hub Coins Together</h2>
          <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-xl">
            Completing family goals awards bonus coins to every member's wallet. Keep your family streak alive to unlock exclusive group perks.
          </p>
        </div>
        <Button className="h-16 px-12 rounded-2xl bg-amber-400 hover:bg-amber-500 text-foreground font-black uppercase text-sm tracking-widest shadow-2xl relative z-10">Manage Rewards</Button>
      </Card>
    </div>
  );
}
