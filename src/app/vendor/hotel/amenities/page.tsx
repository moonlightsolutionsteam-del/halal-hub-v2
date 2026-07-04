"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Coffee, Moon, Waves, ShieldCheck, 
  CheckCircle2, Plus, ArrowRight,
  Info, Sparkles, Utensils, Zap,
  Smartphone, UserCircle, Car
} from "lucide-react";

export default function HotelAmenitiesPage() {
  const amenities = [
    { title: "Halal Breakfast", status: "Active", desc: "Full service certified halal buffet", icon: Coffee, color: "text-amber-600", bg: "bg-amber-50" },
    { title: "Prayer Room", status: "Active", desc: "Dedicated quiet space with prayer mats", icon: Moon, color: "text-sky-600", bg: "bg-sky-50" },
    { title: "Modest Spa Hours", status: "Active", desc: "Gender-segregated hours for pool/spa", icon: Waves, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Airport Shuttle", status: "Premium Only", desc: "VIP transport for suite guests", icon: Car, color: "text-muted-foreground", bg: "bg-muted" },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-6xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sky-600 font-black uppercase tracking-widest text-[10px]">
            <Sparkles className="h-3 w-3" /> Guest Experience
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Amenities & Services</h1>
          <p className="text-muted-foreground font-medium">Manage property features, dining options, and specialized hospitality services.</p>
        </div>
        <Button className="bg-sky-600 hover:bg-sky-700 rounded-full px-8 font-black shadow-lg shadow-sky-200 h-12 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Amenity
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {amenities.map((item, i) => (
          <Card key={i} className="rounded-[2.5rem] border-none shadow-sm bg-card overflow-hidden group hover:shadow-xl transition-all duration-500 border-2 border-transparent hover:border-sky-100">
            <div className="p-5 sm:p-10 flex gap-10">
              <div className={`h-24 w-24 rounded-[2.5rem] ${item.bg} flex items-center justify-center ${item.color} shrink-0 group-hover:scale-110 transition-transform shadow-inner`}>
                <item.icon className="h-12 w-12" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-black text-foreground tracking-tight">{item.title}</h3>
                    <Badge variant="secondary" className="bg-emerald-50 text-emerald-600 border-none font-black text-[9px] uppercase">{item.status}</Badge>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
                <Button variant="ghost" className="p-0 h-auto font-black text-[10px] uppercase tracking-widest text-sky-600 group-hover:gap-2 transition-all">
                  Configure Settings <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-xl bg-zinc-900 text-white p-12 overflow-hidden relative">
        <Zap className="absolute -bottom-4 -right-4 h-48 w-48 opacity-10" />
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-black tracking-tight">Food & Beverage Audit</h2>
              <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                Ensure your in-house kitchen and breakfast menus are strictly compliant with Halal Hub culinary standards.
              </p>
            </div>
            <Button className="bg-sky-600 hover:bg-sky-700 text-white rounded-2xl h-16 px-10 font-black uppercase text-sm tracking-widest shadow-2xl">
              Request F&B Audit
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-8 bg-card/5 rounded-[2rem] border border-white/10 text-center space-y-2">
              <div className="h-10 w-10 bg-sky-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <Utensils className="h-5 w-5 text-sky-400" />
              </div>
              <p className="text-sm font-black uppercase tracking-widest">Dining Cert</p>
              <Badge className="bg-emerald-500/20 text-emerald-400 border-none">ACTIVE</Badge>
            </div>
            <div className="p-8 bg-card/5 rounded-[2rem] border border-white/10 text-center space-y-2">
              <div className="h-10 w-10 bg-sky-500/20 rounded-xl flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="h-5 w-5 text-sky-400" />
              </div>
              <p className="text-sm font-black uppercase tracking-widest">Hygiene Lvl</p>
              <p className="text-2xl font-black text-white">5 Star</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
