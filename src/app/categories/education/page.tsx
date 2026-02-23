
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, MapPin, Star, Filter, ArrowLeft, 
  GraduationCap, BookOpen, Users, Info,
  ChevronRight, Library, CheckCircle2,
  Zap, Sparkles, Map as MapIcon, ClipboardList,
  ShieldCheck, School, Globe
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const EDUCATION_TYPES = ["All Programs", "Madrasas", "Academic Schools", "Quranic Centers", "Pro Training", "Online Classes"];

const MOCK_INSTITUTIONS = [
  { 
    id: "edu1", 
    name: "Iman Knowledge Academy", 
    type: "Academic & Islamic School", 
    focus: "K-12 Holistic Education", 
    rate: 4.9, 
    ver: true, 
    img: "https://picsum.photos/seed/edu1/800/600",
    features: ["Hifz Program", "Stem Curriculum", "Sports Facilities"],
    enrollment: "Open for 2025",
    location: "London, UK"
  },
  { 
    id: "edu2", 
    name: "Darul Uloom Central", 
    type: "Traditional Madrasa", 
    focus: "Advanced Islamic Studies", 
    rate: 4.8, 
    ver: true, 
    img: "https://picsum.photos/seed/edu2/800/600",
    features: ["Residential Facility", "Scholar-led", "Extensive Library"],
    enrollment: "Interviews Active",
    location: "New York, USA"
  },
  { 
    id: "edu3", 
    name: "Global Tajweed Hub", 
    type: "Online Learning", 
    focus: "Quranic Excellence", 
    rate: 4.7, 
    ver: true, 
    img: "https://picsum.photos/seed/edu3/800/600",
    features: ["1-on-1 Coaching", "Flexible Hours", "Digital Materials"],
    enrollment: "Rolling Admission",
    location: "Global / Remote"
  },
  { 
    id: "edu4", 
    name: "Crescent Business School", 
    type: "Professional Training", 
    focus: "Islamic Finance & Ethics", 
    rate: 4.5, 
    ver: false, 
    img: "https://picsum.photos/seed/edu4/800/600",
    features: ["Industry Certs", "Expert Mentors", "Job Placement"],
    enrollment: "Closing Soon",
    location: "Dubai, UAE"
  },
];

export default function EducationListingPage() {
  const [selectedType, setSelectedType] = useState("All Programs");

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
              <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-violet-100 text-violet-600 shadow-inner">
                <GraduationCap className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h1 className="text-5xl font-black font-headline text-slate-900 tracking-tight">Education & Training</h1>
                <p className="text-muted-foreground font-medium text-xl">World-class educational institutions and training programs aligned with Islamic values.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button variant="outline" className="h-14 rounded-2xl bg-white border-none shadow-sm gap-2 font-bold px-6 hover:bg-slate-50">
              <Library className="h-5 w-5 text-violet-600" /> Curriculum Guide
            </Button>
            <div className="relative flex-1 md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search schools, courses, or subjects..." className="pl-12 h-14 rounded-2xl bg-white border-none shadow-sm font-medium text-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Accredited Partners", value: "85+ Institutions", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Active Students", value: "12k+ Community", icon: Users, color: "text-violet-600", bg: "bg-violet-50" },
          { label: "Global Presence", value: "15 Countries", icon: Globe, color: "text-blue-600", bg: "bg-blue-50" },
        ].map((stat, i) => (
          <Card key={i} className="p-6 border-none shadow-sm bg-white flex items-center gap-6 rounded-[2rem]">
            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
              <stat.icon className="h-7 w-7" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Type Quick Selection */}
      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-2 px-2">
        {EDUCATION_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap shadow-sm border-2 ${
              selectedType === type 
                ? "bg-violet-600 text-white border-violet-600 shadow-lg shadow-violet-600/20 scale-105" 
                : "bg-white text-slate-600 border-transparent hover:border-violet-200"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Advanced Filters Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-md p-8 bg-white space-y-8 sticky top-24">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm uppercase tracking-widest text-slate-400">Refine Education</h3>
                <Button variant="ghost" size="sm" className="text-[10px] font-black text-violet-600 p-0 h-auto uppercase tracking-tighter">Reset</Button>
              </div>
              
              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-slate-900 tracking-widest">Environment Policy</p>
                <div className="space-y-3">
                  {["Gender Segregated", "Prayer Integrated", "Halal Canteen", "Uniform Policy"].map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div className="h-5 w-5 border-2 rounded-lg border-slate-200 group-hover:border-violet-600 transition-colors flex items-center justify-center">
                        <div className="h-2.5 w-2.5 rounded-sm bg-violet-600 scale-0 group-hover:scale-100 transition-transform" />
                      </div>
                      <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-slate-100 w-full" />

              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-slate-900 tracking-widest">Academic Level</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Early Years", "Primary", "Secondary", "Higher Ed", "Professional"].map(p => (
                    <button key={p} className="py-2 rounded-xl bg-slate-50 text-slate-400 font-black text-xs hover:bg-violet-50 hover:text-violet-600 transition-colors border border-transparent hover:border-violet-100">
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Card className="rounded-3xl border-none bg-violet-900 text-white p-8 space-y-4 relative overflow-hidden">
              <div className="absolute -top-4 -right-4 opacity-20">
                <School className="h-24 w-24" />
              </div>
              <h3 className="font-black text-lg leading-tight relative z-10">Scholarship Aid</h3>
              <p className="text-xs text-white/80 leading-relaxed relative z-10">
                Are you an educator or student leader? Apply for our Halal Hub grants to support your academic journey.
              </p>
              <Button variant="secondary" className="w-full rounded-2xl font-black text-xs h-12 shadow-xl bg-white text-violet-900 hover:bg-violet-50">View Programs</Button>
            </Card>
          </Card>
        </aside>

        {/* Listings Grid */}
        <div className="lg:col-span-9 space-y-8">
          <div className="flex items-center justify-between px-2">
            <p className="text-sm font-bold text-muted-foreground tracking-tight">Found <span className="text-slate-900">{MOCK_INSTITUTIONS.length}</span> verified entities</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sort by:</span>
              <select className="bg-transparent font-black text-xs uppercase tracking-tighter outline-none cursor-pointer text-slate-900">
                <option>Trust Score</option>
                <option>Enrollment Status</option>
                <option>Newest Added</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_INSTITUTIONS.map((item) => (
              <Link key={item.id} href={`/entities/${item.id}`}>
                <Card className="group rounded-[3rem] border-none shadow-sm overflow-hidden bg-white hover:shadow-2xl transition-all duration-700 flex flex-col h-full border-2 border-transparent hover:border-violet-100/50">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={item.img} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                      <Badge className="bg-white/90 backdrop-blur-md text-violet-600 font-black border-none shadow-xl px-4 py-1.5 rounded-full flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 fill-violet-600 text-violet-600" /> {item.rate}
                      </Badge>
                    </div>
                    <div className="absolute bottom-6 left-6 flex gap-2">
                      {item.ver && (
                        <Badge className="bg-emerald-500 text-white font-black border-none shadow-xl px-5 py-2 rounded-full uppercase text-[10px] tracking-widest flex items-center gap-2">
                          <CheckCircle2 className="h-3 w-3" /> Standard Audited
                        </Badge>
                      )}
                      <Badge className="bg-white text-violet-600 font-black border-none shadow-xl px-5 py-2 rounded-full uppercase text-[10px] tracking-widest flex items-center gap-2">
                        {item.enrollment}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="p-8 pb-4">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-violet-600">{item.type} • {item.focus}</p>
                      <CardTitle className="text-3xl font-black group-hover:text-violet-600 transition-colors leading-tight">{item.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground mt-2">
                        <MapPin className="h-4 w-4 text-violet-600" /> {item.location}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="px-8 pb-8 flex-1 space-y-6">
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Core Capabilities</p>
                      <div className="flex flex-wrap gap-2">
                        {item.features.map(f => (
                          <span key={f} className="text-[10px] font-bold bg-slate-50 text-slate-500 px-3 py-1 rounded-lg border border-slate-100">{f}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
                        <BookOpen className="h-4 w-4 text-blue-500" /> Verified Curriculum
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
                        <Zap className="h-4 w-4 text-amber-500" /> Fast Enrol
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="px-8 pb-8 pt-0 mt-auto">
                    <Button className="w-full bg-slate-900 hover:bg-violet-600 text-white rounded-[1.5rem] font-black text-sm uppercase tracking-widest h-16 shadow-2xl transition-all group-hover:scale-[1.02]">
                      Apply for Admission <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="flex flex-col items-center justify-center py-16 gap-6">
            <div className="flex items-center gap-2">
              <div className="h-1 w-12 bg-slate-200 rounded-full" />
              <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">End of Institution List</p>
              <div className="h-1 w-12 bg-slate-200 rounded-full" />
            </div>
            <Button variant="outline" className="rounded-full px-16 font-black border-2 h-16 hover:bg-violet-600 hover:text-white hover:border-violet-600 transition-all text-lg shadow-sm">Explore Global Networks</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
