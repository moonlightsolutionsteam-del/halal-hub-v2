
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
  Save, ShieldCheck, Shirt, ShoppingBag, 
  Globe, Info, Camera, Upload, Ruler, Sparkles
} from "lucide-react";

const STYLES = ["Abayas & Kimonos", "Hijabs & Wraps", "Modest Activewear", "Maternity Modest", "Occasion Wear", "Children's Modest", "Accessories"];
const MODESTY_FEATURES = ["Opaque Fabrics Only", "Loose Fit Options", "Full Length Coverage", "Detachable Hijab Incl.", "Breathable Fabrics", "Ethical Labor Certified"];

export default function FashionProfilePage() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline tracking-tight text-slate-900">Fashion Brand Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your brand identity, collections, and modesty standards.</p>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700 rounded-2xl px-8 font-black shadow-lg shadow-pink-200 h-12 text-white">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-white border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="details" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-pink-600 data-[state=active]:text-white">Brand Info</TabsTrigger>
          <TabsTrigger value="standards" className="rounded-xl px-8 font-bold text-sm h-full">Modesty Standards</TabsTrigger>
          <TabsTrigger value="catalog" className="rounded-xl px-8 font-bold text-sm h-full">Catalog Setup</TabsTrigger>
          <TabsTrigger value="gallery" className="rounded-xl px-8 font-bold text-sm h-full">Lookbooks</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Shirt className="h-5 w-5 text-pink-600" /> Basic Information
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Brand Name</Label>
                  <Input placeholder="e.g., Noor Collective" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Origin Country</Label>
                  <Input placeholder="e.g., UAE" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Brand Story</Label>
                  <Textarea placeholder="Tell customers about your design philosophy and ethical commitments..." className="min-h-[120px] rounded-2xl bg-slate-50 border-none p-4 font-medium" />
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-pink-600" /> Product Scope
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {STYLES.map((s) => (
                  <div key={s} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl">
                    <Checkbox id={`s-${s}`} />
                    <label htmlFor={`s-${s}`} className="text-xs font-bold text-slate-700">{s}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="standards" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Ruler className="h-5 w-5 text-pink-600" /> Modesty & Ethics
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MODESTY_FEATURES.map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl hover:bg-pink-50 transition-colors">
                    <Checkbox id={`m-${item}`} />
                    <label htmlFor={`m-${m}`} className="text-sm font-bold text-slate-700">{item}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <Card className="rounded-[2.5rem] border-none shadow-xl bg-slate-900 text-white p-10 space-y-8">
            <h3 className="text-2xl font-black font-headline">Modesty Declaration</h3>
            <p className="text-sm text-slate-400 font-medium">I confirm that our brand strictly adheres to the modesty silhouettes and fabric standards indicated above.</p>
            <Button className="w-full h-16 rounded-[1.5rem] bg-pink-600 hover:bg-pink-700 text-white font-black text-xl shadow-2xl">Publish Brand Profile</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
