
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
  Info, Save, ShieldCheck, Truck, ShoppingBag,
  Beef, Layers, Smartphone, Wallet
} from "lucide-react";

const HIGHLIGHTS = [
  "Local Farm Sourcing", "Organic Meat", "Daily Fresh", "Hand-Slaughtered", "HMC Certified", "Bulk Orders", "Home Delivery", "Marinated Items", "Wholesale Available"
];

const CERTIFICATIONS = [
  "HMC Certified", "HFA Approved", "JAKIM (Malaysia)", "MUI (Indonesia)", "Organic Certified", "Antibiotic Free", "Grass-fed Only", "Local Farm Direct"
];

const MEAT_TYPES = [
  "Chicken", "Mutton (Goat)", "Beef", "Buffalo", "Fish & Seafood", "Lamb", "Duck", "Turkey", "Quail", "Other"
];

const AMENITIES = [
  "Air Conditioned", "Parking Available", "Cold Storage Facility", "Wheelchair Accessible", "Washroom Facility", "Waiting Area", "Home Delivery", "Vacuum Packing", "Custom Cuts"
];

const PAYMENT_METHODS = [
  "UPI", "Cash", "Credit/Debit Cards", "Net Banking", "Business Wallet"
];

export default function ButcherProfilePage() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline tracking-tight">Butcher Shop Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your shop's traceability logs, sourcing, and customer offerings.</p>
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
          <TabsTrigger value="sourcing" className="rounded-xl px-8 font-bold text-sm h-full">Sourcing & Logs</TabsTrigger>
          <TabsTrigger value="documents" className="rounded-xl px-8 font-bold text-sm h-full">Certificates</TabsTrigger>
          <TabsTrigger value="gallery" className="rounded-xl px-8 font-bold text-sm h-full">Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" /> Basic Information
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Core brand and contact details for your meat shop.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Shop Name</Label>
                  <Input placeholder="e.g., Al-Barakah Premium Meats" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Contact Number</Label>
                  <Input placeholder="+91 98765 43210" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">About the Shop</Label>
                  <Textarea placeholder="Describe your meat quality, sourcing ethics, and history..." className="min-h-[120px] rounded-2xl bg-slate-50 border-none p-4 font-medium resize-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Shop Highlights</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {HIGHLIGHTS.map((item) => (
                      <div key={item} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                        <Checkbox id={item} className="rounded-md border-slate-300" />
                        <label htmlFor={item} className="text-xs font-bold text-slate-700 cursor-pointer">{item}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Beef className="h-5 w-5 text-primary" /> Products & Sourcing
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Manage types of meat and certification standards.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 space-y-8">
              <div className="space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Available Meat Types</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {MEAT_TYPES.map((m) => (
                    <div key={m} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors">
                      <Checkbox id={`m-${m}`} />
                      <label htmlFor={`m-${m}`} className="text-xs font-bold text-slate-700">{m}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Primary Certifications</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {CERTIFICATIONS.map((c) => (
                    <div key={c} className="flex items-center space-x-3 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 hover:bg-emerald-50 transition-colors">
                      <Checkbox id={`c-${c}`} />
                      <label htmlFor={`c-${c}`} className="text-xs font-bold text-emerald-900">{c}</label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" /> Location & Delivery
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Physical address and service radius.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Full Address</Label>
                  <Input placeholder="Shop address..." className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Delivery Availability</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl bg-slate-50 border-none font-bold">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Available</SelectItem>
                      <SelectItem value="no">In-store Only</SelectItem>
                      <SelectItem value="limited">Within 5km Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Minimum Order for Delivery</Label>
                  <Input placeholder="e.g. 500" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <Card className="rounded-[2.5rem] border-none shadow-xl bg-slate-900 text-white p-10 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck className="h-32 w-32" />
              </div>
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-black font-headline text-white">Butcher Integrity Declaration</h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-3xl">
                  By submitting this profile, you declare that all meat sourcing information is accurate and that you adhere to strict hand-slaughtering or certified machine-slaughtering protocols as stated. Providing false sourcing information will result in immediate delisting and platform ban.
                </p>
              </div>
              
              <div className="space-y-4 relative z-10">
                {[
                  "I confirm all meat sources are 100% halal certified.",
                  "I take full responsibility for traceability documentation.",
                  "I understand platform audits can happen without prior notice."
                ].map((conf, i) => (
                  <div key={i} className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                    <Checkbox id={`conf-butcher-${i}`} className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                    <label htmlFor={`conf-butcher-${i}`} className="text-sm font-bold text-white/80 cursor-pointer">{conf}</label>
                  </div>
                ))}
              </div>

              <Button className="w-full h-16 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white font-black text-xl shadow-2xl transition-transform active:scale-[0.98]">
                Submit Butcher Profile
              </Button>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="sourcing" className="animate-in fade-in duration-500">
          <Card className="rounded-[2.5rem] border-none shadow-sm p-12 text-center bg-white space-y-6">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <Layers className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">Sourcing Logs</h3>
              <p className="text-muted-foreground font-medium max-w-sm mx-auto">Upload weekly supply invoices and farm traceability logs to maintain your "Source Verified" status.</p>
            </div>
            <Button variant="outline" className="rounded-2xl h-12 px-8 border-2 font-black uppercase text-xs tracking-widest">
              <Upload className="mr-2 h-4 w-4" /> Upload Invoices
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
