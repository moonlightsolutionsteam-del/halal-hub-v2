
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
          <h1 className="text-2xl sm:text-3xl font-black font-headline tracking-tight text-foreground">Educational Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your institution details, curriculum, and enrollment settings.</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 rounded-2xl px-8 font-black shadow-lg shadow-violet-200 h-12 text-white">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-card border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
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
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Institution Name</Label>
                  <Input placeholder="e.g., Iman Knowledge Academy" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Registration #</Label>
                  <Input placeholder="Enter reg details" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Vision & Mission</Label>
                  <Textarea placeholder="Explain your educational philosophy and student goals..." className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium" />
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
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PROGRAMS.map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-4 bg-muted rounded-2xl border border-transparent hover:border-violet-200 transition-all">
                    <Checkbox id={`prog-${item}`} />
                    <label htmlFor={`prog-${item}`} className="text-sm font-bold text-foreground">{item}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <Card className="rounded-[2.5rem] border-none shadow-xl bg-zinc-900 text-white p-10 space-y-8">
            <h3 className="text-2xl font-black font-headline text-white">Educational Integrity Declaration</h3>
            <p className="text-sm text-muted-foreground font-medium">I declare that our institution provides a balanced curriculum integrated with Islamic moral and spiritual guidance as stated. I confirm that all listed programs are taught by vetted educators.</p>
            <Button className="w-full h-16 rounded-[1.5rem] bg-violet-600 hover:bg-violet-700 text-white font-black text-xl shadow-2xl">Confirm Institution Profile</Button>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <School className="h-5 w-5 text-violet-600" /> Islamic Environment Policies
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Indicate the Islamic practices and standards upheld at your institution.</p>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {POLICIES.map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-4 bg-muted rounded-2xl border border-transparent hover:border-violet-200 transition-all">
                    <Checkbox id={`pol-${item}`} />
                    <label htmlFor={`pol-${item}`} className="text-sm font-bold text-foreground">{item}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>
          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Users className="h-5 w-5 text-violet-600" /> Enrollment Info
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Total Enrolled Students</Label>
                  <Input placeholder="e.g., 450" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Age Range</Label>
                  <Input placeholder="e.g., 5 – 18 years" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Fees (Monthly / Annual)</Label>
                  <Input placeholder="e.g., ₹2,500/month" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Admission Status</Label>
                  <Input placeholder="e.g., Open, Waitlisted, Closed" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="documents" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Library className="h-5 w-5 text-violet-600" /> Accreditation Documents
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Upload your school registration, board affiliation, and Islamic authority approvals.</p>
            </div>
            {[
              { label: "Institution Registration Certificate", hint: "Govt / State education authority" },
              { label: "Islamic Board / Darululoom Approval", hint: "Recognized Islamic scholarly body" },
              { label: "Curriculum Approval Letter", hint: "State or national board endorsement" },
              { label: "Safety & Compliance Certificate", hint: "Fire, sanitation, and building safety" },
            ].map((doc) => (
              <Card key={doc.label} className="rounded-[2rem] border-none shadow-sm bg-card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="font-black text-sm text-foreground">{doc.label}</p>
                    <p className="text-xs text-muted-foreground font-medium">{doc.hint}</p>
                  </div>
                  <Button variant="outline" className="rounded-2xl h-10 px-6 border-2 font-bold text-xs shrink-0">
                    Upload
                  </Button>
                </div>
              </Card>
            ))}
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
