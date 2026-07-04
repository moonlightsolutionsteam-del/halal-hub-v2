
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
  Save, ShieldCheck, BookOpen, Library, 
  FileText, Mic, Video, Info, Building2
} from "lucide-react";

const FORMATS = ["Classical Texts", "Modern Scholarship", "Children's Literature", "Audiobooks", "Digital Courses", "Academic Journals", "Podcasts"];
const STANDARDS = ["Scholar Vetted Content", "Authentic Sources Only", "Family Friendly Themes", "Zero Ad-Support Policy", "Integrity Audited Supply Chain", "Accurate Translations"];

export default function MediaProfilePage() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline tracking-tight text-foreground">Media & Bookstore Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your catalog, content standards, and distribution details.</p>
        </div>
        <Button className="bg-muted-foreground hover:bg-muted rounded-2xl px-8 font-black shadow-lg shadow-slate-200 h-12 text-white">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-card border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="details" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-muted-foreground data-[state=active]:text-white">Outlet Info</TabsTrigger>
          <TabsTrigger value="formats" className="rounded-xl px-8 font-bold text-sm h-full">Media Formats</TabsTrigger>
          <TabsTrigger value="standards" className="rounded-xl px-8 font-bold text-sm h-full">Standards</TabsTrigger>
          <TabsTrigger value="gallery" className="rounded-xl px-8 font-bold text-sm h-full">Visuals</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-muted-foreground" /> Basic Information
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Outlet / Platform Name</Label>
                  <Input placeholder="e.g., Noor Islamic Media" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Base Location</Label>
                  <Input placeholder="e.g., London, UK" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Mission Statement</Label>
                  <Textarea placeholder="Explain your content curation standards and educational goals..." className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium" />
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="formats" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Library className="h-5 w-5 text-slate-600" /> Media Formats Offered
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Select all content formats your store or platform carries.</p>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {FORMATS.map((fmt) => (
                  <div key={fmt} className="flex items-center space-x-3 p-4 bg-muted rounded-2xl border border-transparent hover:border-border transition-all cursor-pointer">
                    <Checkbox id={`fmt-${fmt}`} />
                    <label htmlFor={`fmt-${fmt}`} className="text-sm font-bold text-foreground cursor-pointer">{fmt}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Mic className="h-5 w-5 text-slate-600" /> Distribution Channels
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Physical Storefront</Label>
                  <Input placeholder="Street address or 'Online Only'" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Online Store URL</Label>
                  <Input placeholder="https://..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">App / Platform Name</Label>
                  <Input placeholder="e.g., Noor App, Apple Books" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Languages Available</Label>
                  <Input placeholder="e.g., English, Arabic, Urdu" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="standards" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-muted-foreground" /> Content Integrity
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {STANDARDS.map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-4 bg-muted rounded-2xl border border-transparent hover:border-border transition-all">
                    <Checkbox id={`std-${item}`} />
                    <label htmlFor={`std-${item}`} className="text-sm font-bold text-foreground">{item}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <Card className="rounded-[2.5rem] border-none shadow-xl bg-zinc-900 text-white p-10 space-y-8">
            <h3 className="text-2xl font-black font-headline text-white">Media integrity Declaration</h3>
            <p className="text-sm text-muted-foreground font-medium">I declare that all content distributed through this outlet adheres to authentic Islamic sources and has been vetted for scholarly accuracy where applicable.</p>
            <Button className="w-full h-16 rounded-[1.5rem] bg-muted-foreground hover:bg-muted text-white font-black text-xl shadow-2xl">Confirm Media Profile</Button>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <FileText className="h-5 w-5 text-slate-600" /> Store & Brand Visuals
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Upload storefront photography, featured book covers, and brand assets.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {["Store Logo", "Storefront Banner", "Featured Collection", "Author Spotlights", "Event Photography", "Social Media Kit"].map((slot) => (
                <Card key={slot} className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden group hover:shadow-md transition-all">
                  <div className="aspect-video bg-muted flex flex-col items-center justify-center gap-3 border-2 border-dashed border-border group-hover:border-slate-400 transition-all m-4 rounded-2xl">
                    <Info className="h-8 w-8 text-muted-foreground group-hover:text-slate-500 transition-colors" />
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-widest">{slot}</p>
                  </div>
                  <div className="px-4 pb-4">
                    <Button variant="outline" className="w-full rounded-xl font-black text-xs h-10 border-2">
                      <Building2 className="mr-1.5 h-3.5 w-3.5" /> Upload Image
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
