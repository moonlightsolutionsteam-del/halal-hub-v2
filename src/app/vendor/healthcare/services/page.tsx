
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, Search, Filter, Edit2, 
  Trash2, Eye, MoreVertical, HeartPulse,
  ShieldCheck, Beaker, Zap, Scale,
  Stethoscope, Activity, Clock
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function HealthcareServicesPage() {
  const services = [
    { id: 1, name: "Premium Hijama Therapy", category: "Wellness", price: "₹1,850", status: "Active", duration: "45m", code: "HC-HJ-01" },
    { id: 2, name: "Family GP Consultation", category: "Medical", price: "₹1,200", status: "Active", duration: "20m", code: "HC-GP-42" },
    { id: 3, name: "Sunnah Nutrition Plan", category: "Nutrition", price: "₹850", status: "Active", duration: "30m", code: "HC-NT-08" },
    { id: 4, name: "Child Vaccination Hub", category: "Pediatrics", price: "Varies", status: "High Demand", duration: "15m", code: "HC-PD-12" },
  ];

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-6xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-600 font-black uppercase tracking-widest text-[10px]">
            <HeartPulse className="h-3 w-3" /> Care Catalog
          </div>
          <h1 className="text-3xl font-black font-headline text-foreground">Clinical Services</h1>
          <p className="text-muted-foreground font-medium">Manage your medical treatments, therapy sessions, and wellness packages.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2 h-12">
            Service Ranks
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700 rounded-full px-8 font-black shadow-lg shadow-teal-200 h-12 text-white">
            <Plus className="mr-2 h-4 w-4" /> New Service Entry
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card p-4 rounded-[2rem] shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search services by name or code..." className="pl-9 h-11 rounded-2xl bg-muted border-none font-medium" />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-4 py-2 rounded-full cursor-pointer bg-teal-50 text-teal-600 border-none">All Types</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer border-border">Wellness</Badge>
          <Badge variant="outline" className="px-4 py-2 rounded-full cursor-pointer border-border">Medical</Badge>
          <Button variant="ghost" size="icon" className="rounded-full"><Filter className="h-4 w-4 text-muted-foreground" /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {services.map((service) => (
          <Card key={service.id} className="group rounded-[3rem] border-none shadow-sm overflow-hidden bg-card hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-teal-100">
            <div className="p-8 flex flex-col sm:flex-row gap-8">
              <div className="relative h-32 w-full sm:w-32 rounded-[2rem] bg-teal-50 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-700">
                <HeartPulse className="h-12 w-12 text-teal-600 opacity-40" />
                <Badge className="absolute -top-2 -right-2 bg-card text-teal-600 font-black border-2 border-teal-50 text-[8px] h-6 px-2 flex items-center shadow-lg">NEW</Badge>
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest bg-teal-50 text-teal-600 border-none">{service.category}</Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost" className="rounded-full h-8 w-8"><MoreVertical className="h-4 w-4 text-muted-foreground" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="rounded-2xl p-2 border-none shadow-xl">
                        <DropdownMenuItem className="rounded-xl font-bold gap-2"><Edit2 className="h-4 w-4" /> Edit Service</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl font-bold gap-2"><ShieldCheck className="h-4 w-4" /> Update Ethics Log</DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl font-bold gap-2 text-red-500"><Trash2 className="h-4 w-4" /> Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <h3 className="text-2xl font-black text-foreground tracking-tight leading-tight">{service.name}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                      <Clock className="h-3 w-3" /> Duration: {service.duration}
                    </div>
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Code: {service.code}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-xl font-black text-teal-600">{service.price}</span>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${service.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{service.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
        
        <button className="rounded-[3rem] border-4 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center p-12 text-center gap-4 hover:bg-card hover:border-teal-200 transition-all cursor-pointer group min-h-[200px]">
          <div className="h-16 w-16 bg-card rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
            <Plus className="h-8 w-8 text-teal-600" />
          </div>
          <div className="space-y-1">
            <p className="font-black text-xl text-foreground">Add New Service</p>
            <p className="text-sm text-muted-foreground font-medium px-4">Register a new medical or wellness treatment</p>
          </div>
        </button>
      </div>
    </div>
  );
}
