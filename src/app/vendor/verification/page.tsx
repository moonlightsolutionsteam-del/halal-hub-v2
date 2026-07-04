
"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, Upload, Calendar, AlertCircle, 
  CheckCircle2, FileText, Download, Trash2,
  Plus, ArrowRight, Zap, Award, 
  Search, Filter, Landmark, Clock,
  FileCheck, Star, Sparkles
} from "lucide-react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

export default function VendorCertificationHub() {
  const activeApplications = [
    { id: "APP-8821", name: "Halal Certification", partner: "HMC Global", status: "Inspection Scheduled", date: "Nov 12, 2024", progress: 65, color: "text-blue-600", bg: "bg-blue-50" },
    { id: "APP-8822", name: "FSSAI License Renewal", partner: "Fast-Track Compliance", status: "Under Review", date: "Nov 01, 2024", progress: 30, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const availableCerts = [
    { 
      id: "fssai", 
      title: "FSSAI License", 
      tag: "Mandatory", 
      desc: "Required for all food businesses in India. Compliance with safety standards.", 
      price: "From ₹2,500", 
      icon: ShieldCheck, 
      color: "text-emerald-600", 
      bg: "bg-emerald-50" 
    },
    { 
      id: "halal", 
      title: "Halal Certification", 
      tag: "Top Choice", 
      desc: "Get verified by recognized bodies. The core trust mark for our community.", 
      price: "From ₹15,000", 
      icon: Award, 
      color: "text-primary", 
      bg: "bg-primary/5" 
    },
    { 
      id: "hygiene", 
      title: "Hygiene Rated", 
      tag: "Marketing Boost", 
      desc: "Third-party audit of your kitchen and prep areas. Drives 2x customer trust.", 
      price: "₹5,000", 
      icon: Sparkles, 
      color: "text-purple-600", 
      bg: "bg-purple-50" 
    },
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-10 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <ShieldCheck className="h-3 w-3" /> Compliance OS
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-headline text-foreground">Certification Marketplace</h1>
          <p className="text-muted-foreground font-medium text-lg">Apply, manage, and track all your business certifications in one place.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            <FileText className="mr-2 h-4 w-4" /> Download Guide
          </Button>
        </div>
      </div>

      {/* Active Applications Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-black text-foreground">Active Applications</h2>
          <Badge variant="secondary" className="rounded-full px-3 py-1 font-black text-[10px] uppercase">{activeApplications.length} In Progress</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeApplications.map((app) => (
            <Card key={app.id} className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden group hover:shadow-md transition-all">
              <div className="p-5 sm:p-8 space-y-4 sm:space-y-6">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl ${app.bg} ${app.color} flex items-center justify-center shrink-0`}>
                      <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-xl font-black text-foreground leading-tight">{app.name}</h3>
                      <p className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-widest line-clamp-1">Partner: {app.partner}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${app.color} border-current font-black text-[10px] uppercase px-2 sm:px-3 h-6 sm:h-7 flex items-center whitespace-nowrap shrink-0`}>
                    {app.status}
                  </Badge>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-muted-foreground uppercase tracking-tighter">Application Progress</span>
                    <span className="text-foreground">{app.progress}%</span>
                  </div>
                  <Progress value={app.progress} className="h-2 bg-muted" />
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-border">
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Est. Completion: {app.date}</p>
                  <Button variant="ghost" size="sm" className="font-black text-[10px] uppercase text-primary p-0 h-auto hover:bg-transparent">
                    View Details <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Marketplace Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-xl font-black text-foreground">Available Certifications</h2>
          <Button variant="ghost" className="text-primary font-black text-xs uppercase tracking-widest">View Phase 2 <Plus className="ml-1 h-3 w-3" /></Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          {availableCerts.map((cert) => (
            <Card key={cert.id} className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-primary/10">
              <div className="p-8 flex-1 space-y-6">
                <div className="flex justify-between items-start">
                  <div className={`h-16 w-16 rounded-[1.5rem] ${cert.bg} ${cert.color} flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>
                    <cert.icon className="h-8 w-8" />
                  </div>
                  <Badge className="bg-zinc-900 text-white border-none font-black text-[9px] uppercase tracking-widest px-3 py-1">{cert.tag}</Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-foreground leading-tight">{cert.title}</h3>
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed italic">{cert.desc}</p>
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <span className="text-xl font-black text-primary">{cert.price}</span>
                  <Link href={`/vendor/verification/apply?type=${cert.id}`}>
                    <Button size="sm" className="rounded-xl font-black text-[10px] uppercase tracking-widest bg-zinc-900 text-white shadow-lg h-10 px-6">Apply Now</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Bundle Upsell Card */}
      <Card className="rounded-[3rem] border-none shadow-xl bg-zinc-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <ShieldCheck className="h-64 w-64" />
        </div>
        <div className="p-6 sm:p-12 relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <Badge className="bg-primary text-white border-none font-black text-xs uppercase tracking-[0.2em] px-6 py-2 rounded-full">Best Value</Badge>
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-5xl font-black font-headline tracking-tight">Compliance Starter Pack</h2>
              <p className="text-muted-foreground font-medium text-xl leading-relaxed max-w-2xl">
                Get your business fully verified and trusted in one go. Includes FSSAI registration, Halal Hub Audit, and a professional Hygiene Rating.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 pt-4">
              {["₹15,000 onwards", "3 Verified Partners", "VIP Processing"].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                  <CheckCircle2 className="h-4 w-4" /> {f}
                </div>
              ))}
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-2xl h-16 px-12 font-black uppercase text-sm tracking-widest shadow-2xl shadow-primary/20">Get The Pack</Button>
          </div>
          <div className="w-full lg:w-80 shrink-0 bg-card/5 backdrop-blur-xl rounded-[2.5rem] p-10 border border-white/10 text-center space-y-6 shadow-2xl">
            <div className="h-20 w-20 bg-primary/20 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
              <Zap className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Average ROI</p>
              <p className="text-4xl font-black text-white">+40%</p>
              <p className="text-[10px] font-bold text-muted-foreground">Increased listing engagement</p>
            </div>
          </div>
        </div>
      </Card>

      <div className="p-8 text-center bg-muted rounded-[2rem] border-2 border-dashed border-border">
        <p className="text-xs font-bold text-muted-foreground max-w-2xl mx-auto leading-relaxed italic uppercase tracking-tighter">
          * Halal Hub facilitates certification through third-party partners. The responsibility of certification lies with the issuing authority. We ensure you are matched with the most trusted professionals in the ecosystem.
        </p>
      </div>
    </div>
  );
}
