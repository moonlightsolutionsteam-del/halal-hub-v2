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
  ArrowLeft, Calendar, Clock, MapPin, 
  Users, Bell, CheckCircle2, ShieldCheck,
  Plus, Search, Info, ChevronRight,
  Utensils, ShoppingBag, PartyPopper, Sparkles
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const EVENT_TYPES = [
  { id: 'dining', label: 'Dinner Plan', icon: Utensils, color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'shopping', label: 'Grocery Run', icon: ShoppingBag, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'ceremony', label: 'Family Ceremony', icon: PartyPopper, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'outing', label: 'General Outing', icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-50' },
];

const FAMILY_MEMBERS = [
  { id: 'm1', name: 'Ibrahim (Admin)', initials: 'I' },
  { id: 'm2', name: 'Fatima', initials: 'F' },
  { id: 'm3', name: 'Zaid', initials: 'Z' },
  { id: 'm4', name: 'Sarah', initials: 'S' },
];

export default function CreateFamilyEventPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = React.useState("dining");
  const [remindersEnabled, setRemindersEnabled] = React.useState(true);

  return (
    <div className="container mx-auto p-6 space-y-10 max-w-3xl pb-24 text-foreground">
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
          <h1 className="text-3xl font-black font-headline tracking-tight">Schedule Family Event</h1>
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest opacity-60">New Activity Entry</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {/* Section 1: Basics */}
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
              <Sparkles className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-black">Event Basics</h2>
          </div>
          
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-8">
            <div className="space-y-4">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Event Title</Label>
              <Input placeholder="e.g., Weekly Family Dinner" className="h-14 rounded-2xl bg-muted border-none font-black text-lg" />
            </div>

            <div className="space-y-4">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Event Type</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {EVENT_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={React.useMemo(() => {
                      return `flex flex-col items-center justify-center p-4 rounded-3xl transition-all border-4 ${
                        selectedType === type.id 
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-600' 
                          : 'bg-muted border-transparent text-muted-foreground hover:bg-muted'
                      }`;
                    }, [selectedType, type.id])}
                  >
                    <type.icon className="h-6 w-6 mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-tighter text-center leading-tight">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </section>

        {/* Section 2: Timing & Venue */}
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-75">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
              <Clock className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-black">When & Where</h2>
          </div>
          
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Select Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="date" className="h-12 rounded-2xl bg-muted border-none font-bold pl-12" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Select Time</Label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="time" className="h-12 rounded-2xl bg-muted border-none font-bold pl-12" />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Location / Venue</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search venue or enter address..." className="h-12 rounded-2xl bg-muted border-none font-bold pl-12" />
                </div>
                <div className="pt-2">
                  <Link href="/family-tree/discovery" className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline flex items-center gap-1.5">
                    <Info className="h-3 w-3" /> Browse family-friendly directory suggestions
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Section 3: Participation */}
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
          <div className="flex items-center gap-3 px-2">
            <div className="h-8 w-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600">
              <Users className="h-4 w-4" />
            </div>
            <h2 className="text-xl font-black">Who's Coming?</h2>
          </div>
          
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-8">
            <div className="space-y-4">
              <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Invited Members</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FAMILY_MEMBERS.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-muted rounded-2xl border-2 border-transparent hover:border-emerald-100 transition-all cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-card rounded-xl flex items-center justify-center font-black text-xs shadow-sm text-muted-foreground group-hover:text-emerald-600 transition-colors">
                        {member.initials}
                      </div>
                      <span className="text-sm font-bold text-foreground">{member.name}</span>
                    </div>
                    <Checkbox className="rounded-full h-6 w-6 border-border data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600" />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between p-6 bg-emerald-50 rounded-[2rem] border-2 border-emerald-100">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-card flex items-center justify-center text-emerald-600 shadow-sm">
                  <Bell className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-black text-emerald-900">Send Reminders</p>
                  <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">30 mins before event</p>
                </div>
              </div>
              <Checkbox 
                checked={remindersEnabled} 
                onCheckedChange={(checked) => setRemindersEnabled(!!checked)}
                className="h-6 w-6 rounded-full border-emerald-300 data-[state=checked]:bg-emerald-600" 
              />
            </div>
          </Card>
        </section>

        {/* Action Button */}
        <div className="pt-10 flex flex-col items-center gap-4">
          <Button className="w-full h-16 rounded-[1.5rem] bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xl shadow-2xl transition-transform active:scale-[0.98]">
            Schedule Family Event
          </Button>
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] text-center">
            This will be posted to the shared Family Hub board instantly
          </p>
        </div>
      </div>
    </div>
  );
}
