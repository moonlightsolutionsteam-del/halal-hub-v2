
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
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline tracking-tight text-foreground">Fashion Brand Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your brand identity, collections, and modesty standards.</p>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700 rounded-2xl px-8 font-black shadow-lg shadow-pink-200 h-12 text-white">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-card border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
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
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Brand Name</Label>
                  <Input placeholder="e.g., Noor Collective" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Origin Country</Label>
                  <Input placeholder="e.g., UAE" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Brand Story</Label>
                  <Textarea placeholder="Tell customers about your design philosophy and ethical commitments..." className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium" />
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
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {STYLES.map((s) => (
                  <div key={s} className="flex items-center space-x-3 bg-muted p-3 rounded-xl">
                    <Checkbox id={`s-${s}`} />
                    <label htmlFor={`s-${s}`} className="text-xs font-bold text-foreground">{s}</label>
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
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MODESTY_FEATURES.map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-4 bg-muted rounded-2xl hover:bg-pink-50 transition-colors">
                    <Checkbox id={`m-${item}`} />
                    <label htmlFor={`m-${item}`} className="text-sm font-bold text-foreground">{item}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <Card className="rounded-[2.5rem] border-none shadow-xl bg-zinc-900 text-white p-10 space-y-8">
            <h3 className="text-2xl font-black font-headline">Modesty Declaration</h3>
            <p className="text-sm text-muted-foreground font-medium">I confirm that our brand strictly adheres to the modesty silhouettes and fabric standards indicated above.</p>
            <Button className="w-full h-16 rounded-[1.5rem] bg-pink-600 hover:bg-pink-700 text-white font-black text-xl shadow-2xl">Publish Brand Profile</Button>
          </Card>
        </TabsContent>

        <TabsContent value="catalog" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-pink-600" /> Catalog Setup
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Configure your pricing, shipping, and return policies for customers.</p>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Price Range (Low – High)</Label>
                  <Input placeholder="e.g., ₹500 – ₹15,000" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Shipping Coverage</Label>
                  <Input placeholder="e.g., India, UAE, UK, Global" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Average Delivery Time</Label>
                  <Input placeholder="e.g., 3–7 business days" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Return Policy</Label>
                  <Input placeholder="e.g., 7-day return, exchange only" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Custom Order Available?</Label>
                  <Input placeholder="e.g., Yes, 2–3 weeks lead time" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Total SKUs / Products Listed</Label>
                  <Input placeholder="e.g., 120 products" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="gallery" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Camera className="h-5 w-5 text-pink-600" /> Lookbooks & Campaign Images
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Upload seasonal campaign images, editorial lookbooks, and lifestyle photography.</p>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <label className="flex flex-col items-center gap-4 p-12 rounded-2xl border-2 border-dashed border-border hover:border-pink-300 transition-colors cursor-pointer">
                <div className="h-16 w-16 bg-pink-50 dark:bg-pink-950/30 rounded-3xl flex items-center justify-center">
                  <Upload className="h-8 w-8 text-pink-500" />
                </div>
                <div className="text-center space-y-1">
                  <p className="font-black text-foreground">Upload Lookbook Images</p>
                  <p className="text-sm font-medium text-muted-foreground">JPG or PNG — max 5MB per image. Up to 20 images.</p>
                </div>
                <input type="file" accept="image/*" multiple className="hidden" />
              </label>
            </Card>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Collection Video (Optional)</Label>
                <Input placeholder="Paste YouTube or Vimeo URL" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                <p className="text-xs text-muted-foreground font-medium">Add a walkthrough video or seasonal collection reel to boost engagement.</p>
              </div>
            </Card>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
