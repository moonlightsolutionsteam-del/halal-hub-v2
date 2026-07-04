
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, MapPin, Star, Filter, ArrowLeft, 
  Stethoscope, Activity, Heart, Info,
  ChevronRight, Pill, CheckCircle2,
  Zap, Sparkles, Map as MapIcon, ClipboardList,
  ShieldCheck, Users, Microscope
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const HEALTHCARE_TYPES = ["All Services", "Medical Clinics", "Wellness Centers", "Hijama Therapy", "Pharmacies", "Nutritionists"];

const MOCK_HEALTHCARE = [
  { 
    id: "hW1", 
    name: "Safe Care Medical Hub", 
    type: "Multi-Specialty Clinic", 
    focus: "General & Family Medicine", 
    rate: 4.9, 
    ver: true, 
    img: "https://picsum.photos/seed/health1/800/600",
    features: ["Female Doctors", "Gender Segregated", "Prayer Room"],
    specialty: "Family Health",
    status: "Open Now"
  },
  { 
    id: "hW2", 
    name: "Sunnah Wellness Center", 
    type: "Holistic Health", 
    focus: "Hijama & Nutrition", 
    rate: 4.8, 
    ver: true, 
    img: "https://picsum.photos/seed/health2/800/600",
    features: ["Sunnah Based", "Certified Hijama", "Organic Supplements"],
    specialty: "Holistic Healing",
    status: "By Appt Only"
  },
  { 
    id: "hW3", 
    name: "Amanah Pharmacy", 
    type: "Community Pharmacy", 
    focus: "Certified Halal Meds", 
    rate: 4.7, 
    ver: true, 
    img: "https://picsum.photos/seed/health3/800/600",
    features: ["Home Delivery", "Halal Supplements", "Pharmacist Chat"],
    specialty: "Prescription Care",
    status: "24/7 Open"
  },
  { 
    id: "hW4", 
    name: "Zenith Dental Care", 
    type: "Specialist Dental", 
    focus: "Cosmetic & General", 
    rate: 4.5, 
    ver: false, 
    img: "https://picsum.photos/seed/health4/800/600",
    features: ["Modern Tech", "Painless Treatment", "Affordable"],
    specialty: "Oral Health",
    status: "Closing Soon"
  },
];

export default function HealthcareListingPage() {
  const [selectedType, setSelectedType] = useState("All Services");

  return (
    <div className="container mx-auto p-6 space-y-10 max-w-7xl">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col gap-6">
        <Link href="/categories" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Categories
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-teal-100 text-teal-600 shadow-inner">
                <Stethoscope className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h1 className="text-5xl font-black font-headline text-foreground tracking-tight">Healthcare & Wellness</h1>
                <p className="text-muted-foreground font-medium text-xl">Trusted medical care and wellness services aligned with your ethical values.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="h-14 rounded-2xl bg-card border-none shadow-sm gap-2 font-bold px-6 hover:bg-muted">
              <Activity className="h-5 w-5 text-teal-600" /> Symptoms Checker
            </Button>
            <div className="relative flex-1 md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search clinics, treatments, or doctors..." className="pl-12 h-14 rounded-2xl bg-card border-none shadow-sm font-medium text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Verified Partners", value: "115+ Clinics", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Specialist Care", value: "24 Disciplines", icon: Microscope, color: "text-teal-600", bg: "bg-teal-50" },
          { label: "Patient Trust", value: "4.9 Avg Rating", icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
        ].map((stat, i) => (
          <Card key={i} className="p-6 border-none shadow-sm bg-card flex items-center gap-6 rounded-[2rem]">
            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
              <stat.icon className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-foreground">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Type Quick Selection */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
        {HEALTHCARE_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border-2 ${
              selectedType === type 
                ? "bg-teal-600 text-white border-teal-600 shadow-lg shadow-teal-600/20 scale-105" 
                : "bg-card text-muted-foreground border-transparent hover:border-teal-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Advanced Filters Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-md p-8 bg-card space-y-8 sticky top-24">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm uppercase tracking-widest text-muted-foreground">Refine Search</h3>
                <Button variant="ghost" size="sm" className="text-[10px] font-black text-teal-600 p-0 h-auto uppercase tracking-tighter">Reset</Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-foreground tracking-widest">Care Policy</p>
                <div className="space-y-3">
                  {["Female Practitioners", "Gender Segregated", "Sunnah Based", "Prayer Area On-site"].map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div className="h-5 w-5 border-2 rounded-lg border-border group-hover:border-teal-600 transition-colors flex items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-sm bg-teal-600 scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                      <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-muted w-full" />

              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-foreground tracking-widest">Service Options</p>
                <div className="grid grid-cols-2 gap-2">
                  {["In-Person", "Virtual", "Home Visit", "Urgent"].map(p => (
                    <button key={p} className="py-2 rounded-xl bg-muted text-muted-foreground font-black text-xs hover:bg-teal-50 hover:text-teal-600 transition-colors border border-transparent hover:border-teal-100">
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Card className="rounded-3xl border-none bg-teal-900 text-white p-8 space-y-4 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 opacity-20">
                <Heart className="h-24 w-24" />
              </div>
              <h3 className="font-black text-lg leading-tight relative z-10">Holistic Hub</h3>
              <p className="text-xs text-white/80 leading-relaxed relative z-10">
                Find certified practitioners for Hijama therapy and Sunnah-based nutritional guidance.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs h-12 shadow-xl bg-card text-teal-900 hover:bg-teal-50">Explore Wellness</Button>
            </Card>
          </Card>
        </aside>

        {/* Listings Grid */}
        <div className="lg:col-span-9 space-y-8">
          <div className="flex items-center justify-between px-2">
            <p className="text-sm font-bold text-muted-foreground tracking-tight">Found <span className="text-foreground">{MOCK_HEALTHCARE.length}</span> verified providers</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Sort by:</span>
              <select className="bg-transparent font-black text-xs uppercase tracking-tighter outline-none cursor-pointer text-foreground">
                <option>Most Recommended</option>
                <option>Distance</option>
                <option>Audit Score</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_HEALTHCARE.map((item) => (
              <Link key={item.id} href={`/entities/${item.id}`}>
                <Card className="group rounded-[3rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-2xl transition-all duration-700 flex flex-col h-full border-2 border-transparent hover:border-teal-100/50">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <Badge className="bg-card/90 backdrop-blur-md text-teal-600 font-black border-none shadow-xl px-4 py-1.5 rounded-full flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 fill-teal-600 text-teal-600" /> {item.rate}
                      </Badge>
                    </div>
                    <div className="absolute bottom-6 left-6 flex gap-2">
                      {item.ver && (
                        <Badge className="bg-emerald-500 text-white font-black border-none shadow-xl px-5 py-2 rounded-full uppercase text-[10px] tracking-widest flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3" /> Fully Vetted
                        </Badge>
                      )}
                      <Badge className="bg-card text-teal-600 font-black border-none shadow-xl px-5 py-2 rounded-full uppercase text-[10px] tracking-widest flex items-center gap-2">
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="p-8 pb-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-teal-600">{item.type} • {item.specialty}</p>
                      <CardTitle className="text-3xl font-black group-hover:text-teal-600 transition-colors leading-tight">{item.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground mt-2">
                        <MapPin className="h-4 w-4 text-teal-600" /> {item.focus}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-8 pb-8 flex-1 space-y-6">
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Key Amenities</p>
                      <div className="flex flex-wrap gap-2">
                        {item.features.map(f => (
                          <span key={f} className="text-[10px] font-bold bg-muted text-muted-foreground px-3 py-1 rounded-lg border border-border">{f}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                        <Users className="h-4 w-4 text-teal-500" /> Family Focused
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                        <Zap className="h-4 w-4 text-amber-500" /> Fast Booking
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="px-8 pb-8 pt-0 mt-auto">
                    <Button className="w-full bg-zinc-900 hover:bg-teal-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest h-16 shadow-2xl transition-all group-hover:scale-[1.02]">
                      Book Appointment <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="flex flex-col items-center justify-center py-16 gap-6">
            <div className="flex items-center gap-2">
              <div className="h-1 w-12 bg-muted rounded-full" />
              <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em]">End of Result List</p>
              <div className="h-1 w-12 bg-muted rounded-full" />
            </div>
            <Button variant="outline" className="rounded-full px-16 font-black border-2 h-16 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all text-lg shadow-sm">Show National Providers</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
