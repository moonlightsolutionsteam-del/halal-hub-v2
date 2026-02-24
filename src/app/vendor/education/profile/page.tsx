
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
  Save, ShieldCheck, GraduationCap, BookOpen, 
  Library, School, Info, Building2, Users
} from "lucide-react";

const PROGRAMS = ["Hifz (Memorization)", "Tajweed Masterclass", "Islamic Finance Certificate", "K-12 Academic School", "Early Years Madrasa", "Scholarly Alim Course", "Arabic Intensive"];
const POLICIES = ["Gender Segregated Learning", "Prayer Integrated Schedule", "Verified Halal Nutrition", "Scholar Oversight", "Moral/Ethics Education", "On-site Prayer Hall"];

export default function EducationProfilePage() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline tracking-tight text-slate-900">Educational Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your institution details, curriculum, and enrollment settings.</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 rounded-2xl px-8 font-black shadow-lg shadow-violet-200 h-12 text-white">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-white border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="details" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-violet-600 data-[state=active]:text-white">Institution Info</TabsTrigger>
          <TabsTrigger value="curriculum" className="rounded-xl px-8 font-bold text-sm h-full">Curriculum</TabsTrigger>
          <TabsTrigger value="policies" className="rounded-xl px-8 font-bold text-sm h-full">Environment</TabsTrigger>
          <TabsTrigger value="documents" className="rounded-xl px-8 font-bold text-sm h-full">Accreditation</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <School className="h-5 w-5 text-violet-600" /> Basic Information
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Institution Name</Label>
                  <Input placeholder="e.g., Iman Knowledge Academy" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Registration #</Label>
                  <Input placeholder="Enter reg details" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Vision & Mission</Label>
                  <Textarea placeholder="Explain your educational philosophy and student goals..." className="min-h-[120px] rounded-2xl bg-slate-50 border-none p-4 font-medium" />
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="curriculum" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-violet-600" /> Program Offerings
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PROGRAMS.map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-violet-200 transition-all">
                    <Checkbox id={`prog-${item}`} />
                    <label htmlFor={`prog-${item}`} className="text-sm font-bold text-slate-700">{item}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <Card className="rounded-[2.5rem] border-none shadow-xl bg-slate-900 text-white p-10 space-y-8">
            <h3 className="text-2xl font-black font-headline text-white">Educational integrity Declaration</h3>
            <p className="text-sm text-slate-400 font-medium">I declare that our institution provides a balanced curriculum integrated with Islamic moral and spiritual guidance as stated. I confirm that all listed programs are taught by vetted educators.</p>
            <Button className="w-full h-16 rounded-[1.5rem] bg-violet-600 hover:bg-violet-700 text-white font-black text-xl shadow-2xl">Confirm Institution Profile</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
