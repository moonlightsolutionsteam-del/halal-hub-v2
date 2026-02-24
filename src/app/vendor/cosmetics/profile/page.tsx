
"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Save, ShieldCheck, Sparkles, Beaker, 
  FlaskConical, Info, Camera, Upload, BeakerIcon
} from "lucide-react";

const CATEGORIES = ["Skincare", "Makeup", "Fragrance", "Haircare", "Personal Care", "Sun Care", "Oral Care"];
const LAB_BADGES = ["100% Alcohol-Free", "Zero Animal Derivatives", "Breathability Verified", "Wudu-Friendly Formula", "Cruelty-Free", "Paraben-Free", "Organic Active Bases"];

export default function CosmeticsProfilePage() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline tracking-tight text-slate-900">Beauty Brand Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your product formulations, lab certifications, and brand story.</p>
        </div>
        <Button className="bg-rose-600 hover:bg-rose-700 rounded-2xl px-8 font-black shadow-lg shadow-rose-200 h-12 text-white">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-white border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="details" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-rose-600 data-[state=active]:text-white">Brand Info</TabsTrigger>
          <TabsTrigger value="formulation" className="rounded-xl px-8 font-bold text-sm h-full">Formulation Logs</TabsTrigger>
          <TabsTrigger value="certs" className="rounded-xl px-8 font-bold text-sm h-full">Lab Certs</TabsTrigger>
          <TabsTrigger value="gallery" className="rounded-xl px-8 font-bold text-sm h-full">Visuals</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-rose-600" /> Basic Information
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Brand Name</Label>
                  <Input placeholder="e.g., Pure Glow Beauty" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Lab HQ City</Label>
                  <Input placeholder="e.g., London" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Brand Mission</Label>
                  <Textarea placeholder="Explain your purity standards and ethical sourcing..." className="min-h-[120px] rounded-2xl bg-slate-50 border-none p-4 font-medium" />
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Beaker className="h-5 w-5 text-rose-600" /> Formulation Categories
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CATEGORIES.map((c) => (
                  <div key={c} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl">
                    <Checkbox id={`c-${c}`} />
                    <label htmlFor={`c-${c}`} className="text-xs font-bold text-slate-700">{c}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="formulation" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-rose-600" /> Purity & Trust Badges
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {LAB_BADGES.map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-rose-200 transition-all">
                    <Checkbox id={`l-${item}`} />
                    <label htmlFor={`l-${item}`} className="text-sm font-bold text-slate-700">{item}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <Card className="rounded-[2.5rem] border-none shadow-xl bg-slate-900 text-white p-10 space-y-8">
            <h3 className="text-2xl font-black font-headline">Beauty Integrity Declaration</h3>
            <p className="text-sm text-slate-400 font-medium">I declare that our products are formulated without non-permissible alcohols or animal-derived active ingredients. I agree to provide lab audit reports upon platform request.</p>
            <Button className="w-full h-16 rounded-[1.5rem] bg-rose-600 hover:bg-rose-700 text-white font-black text-xl">Confirm & Publish Profile</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
