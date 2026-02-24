
"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, Clock, Phone, Globe, Camera, 
  Upload, Trash2, Plus, CheckCircle2, 
  Info, Save, CookingPot, Users, 
  Calendar, Utensils, ShieldCheck, 
  ClipboardList, Sparkles
} from "lucide-react";

const EVENT_TYPES = [
  "Weddings / Nikah", "Corporate Events", "Aqiqah / Naming", "Religious Seminars", "Family Parties", "Hajj & Umrah Groups", "Charity Galas", "Conferences", "School Events"
];

const SERVICE_LEVELS = [
  "Full Service (Staff included)", "Buffet Only", "Drop-off Catering", "Live Cooking Stations", "Boxed Meals / VIP", "Table Decor & Cutlery Rental"
];

const CUISINE_SPECIALTIES = [
  "Traditional Mughlai", "Arabic & Mezze", "Turkish Grill", "Malay / Indonesian", "Western / Continental", "Healthy / Organic", "Dessert Bar"
];

export default function CateringProfilePage() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline tracking-tight">Catering Service Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your event specializations, menus, and booking policies.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-primary hover:bg-primary/90 rounded-2xl px-8 font-black shadow-lg shadow-primary/20 h-12">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-white border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="details" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-primary data-[state=active]:text-white">Details</TabsTrigger>
          <TabsTrigger value="events" className="rounded-xl px-8 font-bold text-sm h-full">Event Types</TabsTrigger>
          <TabsTrigger value="menu" className="rounded-xl px-8 font-bold text-sm h-full">Menu Packages</TabsTrigger>
          <TabsTrigger value="documents" className="rounded-xl px-8 font-bold text-sm h-full">Certs & Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" /> Basic Information
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Core branding and contact for your catering business.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Business Name</Label>
                  <Input placeholder="e.g., Elite Halal Catering" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Primary Office Phone</Label>
                  <Input placeholder="+91 11 4567 8901" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Service Description</Label>
                  <Textarea placeholder="Detail your catering expertise, staff quality, and halal commitment..." className="min-h-[120px] rounded-2xl bg-slate-50 border-none p-4 font-medium resize-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:col-span-2">
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Min Guests</Label>
                    <Input type="number" placeholder="e.g. 50" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Max Capacity</Label>
                    <Input type="number" placeholder="e.g. 5000" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Min Notice (Days)</Label>
                    <Input type="number" placeholder="e.g. 14" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" /> Service Scope
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Define your service levels and specialized cuisines.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 space-y-8">
              <div className="space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Catering Service Levels</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {SERVICE_LEVELS.map((item) => (
                    <div key={item} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors">
                      <Checkbox id={`sl-${item}`} />
                      <label htmlFor={`sl-${item}`} className="text-xs font-bold text-slate-700">{item}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Cuisine Specialties</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {CUISINE_SPECIALTIES.map((item) => (
                    <div key={item} className="flex items-center space-x-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100 hover:bg-blue-50 transition-colors">
                      <Checkbox id={`cs-${item}`} />
                      <label htmlFor={`cs-${item}`} className="text-xs font-bold text-blue-900">{item}</label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="events" className="animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" /> Event Coverage
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Which occasions do you cater for?</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {EVENT_TYPES.map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-pointer">
                    <Checkbox id={`et-${item}`} />
                    <label htmlFor={`et-${item}`} className="text-sm font-bold text-slate-700 cursor-pointer">{item}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
