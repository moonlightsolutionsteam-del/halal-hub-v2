"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  ArrowLeft, Target, Heart, Activity, 
  GraduationCap, Plus, Users, Calendar,
  Trophy, Sparkles, CheckCircle2, ShieldCheck,
  ChevronRight, ArrowRight, Info, Zap,
  HandHeart, Scale
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

const GOAL_CATEGORIES = [
  { id: 'charity', label: 'Sadaqah / Charity', icon: HandHeart, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'wellness', label: 'Health & Wellness', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'education', label: 'Learning / Deen', icon: GraduationCap, color: 'text-violet-600', bg: 'bg-violet-50' },
  { id: 'activity', label: 'Family Rituals', icon: Users, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const FAMILY_MEMBERS = [
  { id: 'm1', name: 'Ibrahim (Admin)', initials: 'I' },
  { id: 'm2', name: 'Fatima', initials: 'F' },
  { id: 'm3', name: 'Zaid', initials: 'Z' },
  { id: 'm4', name: 'Sarah', initials: 'S' },
];

export default function CreateFamilyGoalPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = React.useState("charity");
  const [targetAmount, setTargetAmount] = React.useState([5000]);

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-10 max-w-3xl pb-24 text-foreground">
      <div className="flex items-center gap-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-2xl bg-card shadow-sm border h-12 w-12" 
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="space-y-1">
          <h1 className="text-xl sm:text-3xl font-black font-headline tracking-tight">Create New Family Goal</h1>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest opacity-60">Collective Growth Milestone</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {/* Category Selection */}
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
              <Sparkles className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-black">Choose Category</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {GOAL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex flex-col items-center justify-center p-6 rounded-[2rem] transition-all border-4 ${
                  selectedCategory === cat.id 
                    ? 'bg-card border-rose-500 shadow-xl scale-105' 
                    : 'bg-card border-transparent text-muted-foreground hover:border-border hover:bg-muted'
                }`}
              >
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-3 ${selectedCategory === cat.id ? 'bg-rose-50 text-rose-600' : 'bg-muted text-muted-foreground'}`}>
                  <cat.icon className="h-6 w-6" />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-tighter text-center leading-tight ${selectedCategory === cat.id ? 'text-rose-600' : 'text-muted-foreground'}`}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Goal Content */}
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Target className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-black">Goal Details</h2>
          </div>
          
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-8">
            <div className="space-y-4">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Goal Title</Label>
              <Input placeholder="e.g., Save for Community Water Well" className="h-14 rounded-2xl bg-muted border-none font-black text-lg" />
            </div>

            <div className="space-y-4">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Target Objective</Label>
              <div className="p-6 bg-muted rounded-3xl space-y-6 border border-border">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-muted-foreground">Set Amount / Count</span>
                  <span className="text-2xl font-black text-rose-600">${targetAmount[0].toLocaleString()}</span>
                </div>
                <Slider 
                  defaultValue={targetAmount} 
                  max={50000} 
                  step={500} 
                  onValueChange={setTargetAmount}
                  className="py-4"
                />
                <div className="flex justify-between text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  <span>$500</span>
                  <span>$50,000+</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Deadline (Optional)</Label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold pl-12" />
              </div>
            </div>
          </Card>
        </section>

        {/* Participants */}
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
              <Users className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-black">Assign Members</h2>
          </div>
          
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FAMILY_MEMBERS.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-muted rounded-2xl border-2 border-transparent hover:border-rose-100 transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-card rounded-xl flex items-center justify-center font-black text-xs shadow-sm text-muted-foreground group-hover:text-rose-600 transition-colors">
                      {member.initials}
                    </div>
                    <span className="text-sm font-bold text-foreground">{member.name}</span>
                  </div>
                  <Checkbox className="rounded-full h-6 w-6 border-border data-[state=checked]:bg-rose-600 data-[state=checked]:border-rose-600" />
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Action Button */}
        <div className="pt-10 flex flex-col items-center gap-4">
          <Button className="w-full h-16 rounded-[1.5rem] bg-rose-600 hover:bg-rose-700 text-white font-black text-xl shadow-2xl transition-transform active:scale-[0.98]">
            Activate Family Goal
          </Button>
          <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-center">
            <Trophy className="h-3 w-3" /> Completing goals awards Hub Coins to all members
          </div>
        </div>
      </div>
    </div>
  );
}
