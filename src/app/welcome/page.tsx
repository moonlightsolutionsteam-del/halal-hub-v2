"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Globe, ShieldCheck, Users, Zap, 
  Sparkles, ArrowRight, ChevronRight, 
  Star, MessageSquare, LayoutGrid,
  TrendingUp, HandHeart, Trophy,
  UtensilsCrossed, ShoppingCart, Plane,
  Shirt, CircleDollarSign, Stethoscope,
  GraduationCap, BookOpen, UserCheck,
  Store, PenTool, Network, Landmark,
  Map as MapIcon
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

const VERTICALS = [
  { name: "Food & Dining", slug: "food", icon: UtensilsCrossed, color: "text-orange-600", bg: "bg-orange-50", desc: "1,240+ Verified Spots" },
  { name: "Fashion & Design", slug: "fashion", icon: Shirt, color: "text-pink-600", bg: "bg-pink-50", desc: "340+ Modest Brands" },
  { name: "Travel & Tourism", slug: "travel", icon: Plane, color: "text-amber-600", bg: "bg-amber-50", desc: "156+ Halal Itineraries" },
  { name: "Finance & Banking", slug: "finance", icon: CircleDollarSign, color: "text-indigo-600", bg: "bg-indigo-50", desc: "42+ Shariah Institutions" },
];

const STATS = [
  { label: "Global Users", value: "1.2M", icon: Users, color: "text-blue-600" },
  { label: "Verified Entities", value: "45k+", icon: ShieldCheck, color: "text-emerald-600" },
  { label: "Active Hubs", value: "125", icon: Globe, color: "text-purple-600" },
  { label: "Daily Interactions", value: "842k", icon: Zap, color: "text-amber-600" },
];

export default function WelcomeHubPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/10 pb-32">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://picsum.photos/seed/hub-welcome/1600/900" 
            alt="Welcome Hero" 
            fill 
            className="object-cover brightness-[0.3]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-[#FBFBFB]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 space-y-6">
            <Badge variant="outline" className="px-6 py-2 rounded-full border-white/20 text-white font-black uppercase text-xs tracking-[0.3em] bg-card/5 backdrop-blur-md">
              THE UNIFIED UMMAH NETWORK
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black font-headline text-white tracking-tighter leading-none">
              One Hub. <br />
              <span className="text-primary italic">Infinite</span> Connections.
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-medium max-w-3xl mx-auto leading-relaxed">
              Explore the world's most trusted ecosystem for halal lifestyle, ethical trade, and family lineage preservation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Link href="/categories">
              <Button size="lg" className="h-16 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase text-sm tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95">
                Start Exploring
              </Button>
            </Link>
            <Link href="/partner/portal">
              <Button size="lg" variant="outline" className="h-16 px-12 rounded-2xl border-white/20 text-white hover:bg-card/10 font-black uppercase text-sm tracking-widest backdrop-blur-md">
                Join as Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 -mt-20 relative z-20">
        {/* Global Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {STATS.map((stat, i) => (
            <Card key={i} className="rounded-[2.5rem] border-none shadow-2xl bg-card p-8 group hover:shadow-primary/10 transition-all duration-500">
              <div className="flex flex-col items-center text-center gap-4">
                <div className={cn("h-14 w-14 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform bg-muted", stat.color)}>
                  <stat.icon className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-4xl font-black text-foreground tracking-tighter">{stat.value}</p>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Verticals Section */}
        <section className="space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 px-4">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-4xl font-black text-foreground tracking-tight">Core Industries</h2>
              <p className="text-lg text-muted-foreground font-medium italic">High-fidelity directories for every halal vertical.</p>
            </div>
            <Link href="/categories">
              <Button variant="ghost" className="font-black text-xs uppercase tracking-widest text-primary">Explore All 13 Verticals <ChevronRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VERTICALS.map((v, i) => (
              <Link key={i} href={`/categories/${v.slug}`}>
                <Card className="rounded-[3rem] border-none shadow-sm bg-card overflow-hidden group hover:shadow-2xl transition-all duration-700 h-full border-2 border-transparent hover:border-primary/10">
                  <div className="p-5 sm:p-10 space-y-8 text-center flex flex-col items-center">
                    <div className={cn("h-20 w-20 rounded-[2rem] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform", v.bg, v.color)}>
                      <v.icon className="h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-foreground tracking-tight">{v.name}</h3>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{v.desc}</p>
                    </div>
                    <div className="h-12 w-12 rounded-full border-2 border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Feature Hubs */}
        <section className="mt-32 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Creator Studio Hub */}
            <Card className="rounded-[4rem] border-none bg-zinc-900 text-white p-16 relative overflow-hidden group hover:shadow-2xl transition-all duration-700">
              <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:scale-110 transition-transform duration-[10s]">
                <PenTool className="h-64 w-64 text-primary" />
              </div>
              <div className="relative z-10 space-y-10">
                <div className="space-y-4">
                  <Badge className="bg-primary text-white border-none font-black text-xs uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-2xl">CREATOR STUDIO</Badge>
                  <h2 className="text-5xl font-black tracking-tighter leading-tight">Elevate Your Voice</h2>
                  <p className="text-xl text-muted-foreground font-medium leading-relaxed italic max-w-md">
                    "The high-fidelity workspace for scholars, influencers, and digital educators."
                  </p>
                </div>
                <Link href="/vendor/creative/dashboard" className="block">
                  <Button className="h-16 px-12 rounded-2xl bg-card text-foreground hover:bg-muted font-black uppercase text-sm tracking-widest shadow-2xl transition-all active:scale-95">
                    Launch Studio
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Family Hub */}
            <Card className="rounded-[4rem] border-none bg-emerald-600 text-white p-16 relative overflow-hidden group hover:shadow-2xl transition-all duration-700">
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-[10s]">
                <Network className="h-64 w-64 text-white" />
              </div>
              <div className="relative z-10 space-y-10">
                <div className="space-y-4">
                  <Badge className="bg-card/20 text-white border-none font-black text-xs uppercase tracking-[0.2em] px-6 py-2 rounded-full backdrop-blur-md">FAMILY HUB</Badge>
                  <h2 className="text-5xl font-black tracking-tighter leading-tight">Preserve Your Legacy</h2>
                  <p className="text-xl text-emerald-100 font-medium leading-relaxed italic max-w-md">
                    "Coordinate daily life and map your ancestral lineage in one secure, private ecosystem."
                  </p>
                </div>
                <Link href="/family-tree" className="block">
                  <Button className="h-16 px-12 rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800 font-black uppercase text-sm tracking-widest shadow-2xl transition-all active:scale-95">
                    Enter Family Hub
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>

        {/* Community Section */}
        <section className="mt-32 bg-card rounded-[4rem] p-16 shadow-sm border space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <Badge variant="secondary" className="bg-primary/5 text-primary border-none font-black text-[10px] px-4 py-1.5 rounded-full uppercase tracking-widest">Global Community</Badge>
            <h2 className="text-5xl font-black tracking-tighter text-foreground">Join the Conversation</h2>
            <p className="text-sm sm:text-xl text-muted-foreground font-medium">Connect with millions of members in our moderated community forums.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Product Vetting", desc: "Is this gelatin halal? Ask the experts.", icon: ShieldCheck, color: "text-emerald-600" },
              { title: "Travel Guides", desc: "Best spots in Istanbul from real travelers.", icon: MapIcon, color: "text-amber-600" },
              { title: "Spiritual Support", desc: "Connect with scholarly advice and guidance.", icon: HandHeart, color: "text-indigo-600" },
            ].map((topic, i) => (
              <div key={i} className="p-5 sm:p-10 rounded-[2.5rem] bg-muted border border-transparent hover:border-primary/20 hover:bg-card transition-all duration-500 group">
                <topic.icon className={cn("h-10 w-10 mb-6 transition-transform group-hover:scale-110", topic.color)} />
                <h3 className="text-2xl font-black text-foreground mb-2">{topic.title}</h3>
                <p className="text-muted-foreground font-medium leading-relaxed mb-6 italic">"{topic.desc}"</p>
                <Button variant="link" className="p-0 h-auto font-black text-xs uppercase text-primary tracking-widest">Join Thread <ChevronRight className="h-3 w-3 ml-1" /></Button>
              </div>
            ))}
          </div>
          
          <div className="text-center pt-8">
            <Link href="/community">
              <Button className="h-16 px-16 rounded-2xl bg-zinc-900 text-white hover:bg-zinc-800 font-black uppercase text-sm tracking-widest shadow-2xl transition-all">
                Enter Community Hub
              </Button>
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-32 text-center space-y-10 pb-20">
          <Sparkles className="h-16 w-16 text-primary mx-auto animate-pulse" />
          <div className="space-y-4">
            <h2 className="text-5xl font-black tracking-tight">Ready to join the Hub?</h2>
            <p className="text-xl text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
              Create your account today and start your journey towards an ethical, verified lifestyle.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="h-16 px-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase text-sm tracking-widest shadow-2xl">Create Free Account</Button>
            <Button variant="outline" className="h-16 px-12 rounded-2xl border-2 border-border bg-card font-black uppercase text-sm tracking-widest shadow-sm">Merchant Sign Up</Button>
          </div>
        </section>
      </div>
    </div>
  )
}
