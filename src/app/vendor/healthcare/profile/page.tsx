
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
  Save, ShieldCheck, Stethoscope, HeartPulse, 
  Users, Activity, Info, Building2, Pill
} from "lucide-react";

const SPECIALTIES = ["General Medicine", "Pediatrics", "Gynecology", "Nutrition & Dietetics", "Physiotherapy", "Hijama Therapy", "Mental Health", "Dentistry"];
const ETHICAL_POLICIES = ["Gender Segregated Waiting Area", "Female Practitioners Available", "Sunnah-Based Treatments", "Halal Medicine Certified", "Privacy Protocols (Awrah)", "Prayer Area for Patients"];

export default function HealthcareProfilePage() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline tracking-tight text-foreground">Healthcare Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your clinic details, medical specialties, and ethical practice policies.</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 rounded-2xl px-8 font-black shadow-lg shadow-teal-200 h-12 text-white">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-card border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="details" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-teal-600 data-[state=active]:text-white">Facility Info</TabsTrigger>
          <TabsTrigger value="policies" className="rounded-xl px-8 font-bold text-sm h-full">Ethical Policies</TabsTrigger>
          <TabsTrigger value="specialties" className="rounded-xl px-8 font-bold text-sm h-full">Specialties</TabsTrigger>
          <TabsTrigger value="documents" className="rounded-xl px-8 font-bold text-sm h-full">Accreditation</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Stethoscope className="h-5 w-5 text-teal-600" /> Basic Information
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Clinic / Pharmacy Name</Label>
                  <Input placeholder="e.g., Safe Care Medical Hub" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Medical License #</Label>
                  <Input placeholder="Enter license details" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">About the Practice</Label>
                  <Textarea placeholder="Explain your clinical approach and commitment to patient care..." className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium" />
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="policies" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-teal-600" /> Ethical Care Policy
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ETHICAL_POLICIES.map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-4 bg-muted rounded-2xl border border-transparent hover:border-teal-200 transition-all">
                    <Checkbox id={`p-${item}`} />
                    <label htmlFor={`p-${item}`} className="text-sm font-bold text-foreground">{item}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <Card className="rounded-[2.5rem] border-none shadow-xl bg-zinc-900 text-white p-10 space-y-8">
            <h3 className="text-2xl font-black font-headline text-white">Medical Ethics Declaration</h3>
            <p className="text-sm text-muted-foreground font-medium">I declare that our medical practice strictly adheres to Shariah-compliant patient dignity and privacy protocols as indicated above. I commit to providing authentic medical guidance aligned with these ethical values.</p>
            <Button className="w-full h-16 rounded-[1.5rem] bg-teal-600 hover:bg-teal-700 text-white font-black text-xl shadow-2xl">Publish Clinic Profile</Button>
          </Card>
        </TabsContent>

        <TabsContent value="specialties" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Activity className="h-5 w-5 text-teal-600" /> Medical Specialties
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Select all departments and specialties available at your facility.</p>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SPECIALTIES.map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-4 bg-muted rounded-2xl border border-transparent hover:border-teal-200 transition-all">
                    <Checkbox id={`sp-${item}`} />
                    <label htmlFor={`sp-${item}`} className="text-sm font-bold text-foreground">{item}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>
          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Users className="h-5 w-5 text-teal-600" /> Practitioner Details
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Total Doctors</Label>
                  <Input placeholder="e.g., 5" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Female Doctors Available</Label>
                  <Input placeholder="e.g., 3" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Languages Spoken</Label>
                  <Input placeholder="e.g., Arabic, English, Urdu" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Appointment Lead Time</Label>
                  <Input placeholder="e.g., Same-day, 24 hrs, 3 days" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="documents" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Pill className="h-5 w-5 text-teal-600" /> Accreditation & Certificates
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Upload your clinical licenses, staff credentials, and halal medicine certificates.</p>
            </div>
            {[
              { label: "Medical Practice License", hint: "Issued by local health authority" },
              { label: "Halal Medicine Certificate", hint: "From a recognized halal body" },
              { label: "Lead Physician Registration", hint: "Medical council certificate" },
              { label: "Facility Inspection Report", hint: "Latest compliance report" },
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
