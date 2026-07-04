
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
          <h1 className="text-2xl sm:text-3xl font-black font-headline tracking-tight text-foreground">Beauty Brand Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your product formulations, lab certifications, and brand story.</p>
        </div>
        <Button className="bg-rose-600 hover:bg-rose-700 rounded-2xl px-8 font-black shadow-lg shadow-rose-200 h-12 text-white">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-card border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
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
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Brand Name</Label>
                  <Input placeholder="e.g., Pure Glow Beauty" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Lab HQ City</Label>
                  <Input placeholder="e.g., London" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Brand Mission</Label>
                  <Textarea placeholder="Explain your purity standards and ethical sourcing..." className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium" />
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
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {CATEGORIES.map((c) => (
                  <div key={c} className="flex items-center space-x-3 bg-muted p-3 rounded-xl">
                    <Checkbox id={`c-${c}`} />
                    <label htmlFor={`c-${c}`} className="text-xs font-bold text-foreground">{c}</label>
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
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {LAB_BADGES.map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-4 bg-muted rounded-2xl border border-transparent hover:border-rose-200 transition-all">
                    <Checkbox id={`l-${item}`} />
                    <label htmlFor={`l-${item}`} className="text-sm font-bold text-foreground">{item}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <Card className="rounded-[2.5rem] border-none shadow-xl bg-zinc-900 text-white p-10 space-y-8">
            <h3 className="text-2xl font-black font-headline">Beauty Integrity Declaration</h3>
            <p className="text-sm text-muted-foreground font-medium">I declare that our products are formulated without non-permissible alcohols or animal-derived active ingredients. I agree to provide lab audit reports upon platform request.</p>
            <Button className="w-full h-16 rounded-[1.5rem] bg-rose-600 hover:bg-rose-700 text-white font-black text-xl">Confirm & Publish Profile</Button>
          </Card>
        </TabsContent>

        <TabsContent value="certs" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-rose-600" /> Halal Lab Certifications
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Upload lab test reports and halal certification documents for your formulations.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["IFANCA Halal Certificate", "HFA Certification Letter", "MUI Lab Report", "Cruelty-Free Audit", "Ingredient Safety Sheet", "Alcohol-Free Lab Test"].map((doc) => (
                <Card key={doc} className="rounded-[2rem] border-none shadow-sm bg-card p-6 flex items-center justify-between group hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600">
                      <Info className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-black text-sm text-foreground">{doc}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">PDF or JPG · Max 5MB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl font-black text-xs h-9 border-2 border-rose-100 text-rose-600 hover:bg-rose-50">
                    <Upload className="mr-1.5 h-3.5 w-3.5" /> Upload
                  </Button>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <BeakerIcon className="h-5 w-5 text-rose-600" /> Certifying Bodies
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["IFANCA", "HFA", "MUI Indonesia", "JAKIM Malaysia", "ESMA UAE", "HDC", "GCC", "UK HMC"].map((body) => (
                  <div key={body} className="flex items-center space-x-3 bg-muted p-3 rounded-xl">
                    <Checkbox id={`body-${body}`} />
                    <label htmlFor={`body-${body}`} className="text-xs font-bold text-foreground">{body}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="gallery" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Camera className="h-5 w-5 text-rose-600" /> Brand Visual Assets
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Upload product photography, brand imagery, and packaging shots.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Logo (SVG/PNG)", "Brand Banner", "Hero Product Shot", "Packaging Detail", "Lifestyle Photography", "Lab / Process Shot"].map((slot, i) => (
                <Card key={slot} className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden group hover:shadow-md transition-all">
                  <div className="aspect-video bg-muted flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border group-hover:border-rose-300 transition-all m-4 rounded-2xl">
                    <Camera className="h-8 w-8 text-muted-foreground group-hover:text-rose-400 transition-colors" />
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">{slot}</p>
                  </div>
                  <div className="px-4 pb-4">
                    <Button variant="outline" className="w-full rounded-xl font-black text-xs h-10 border-2 border-rose-100 text-rose-600 hover:bg-rose-50">
                      <Upload className="mr-1.5 h-3.5 w-3.5" /> Choose File
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
