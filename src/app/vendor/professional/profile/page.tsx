"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  UploadCloud, Save, Briefcase, Users, Award,
  FileText, Plus, Trash2, ShieldCheck, CheckCircle2,
  Phone, Mail, MapPin, Globe, Star
} from "lucide-react"

const SPECIALIZATIONS = [
  "Family Medicine", "Internal Medicine", "Paediatrics", "Obstetrics & Gynaecology",
  "Dermatology", "Psychiatry / Counselling", "Orthopaedics", "Cardiology",
  "Corporate Law", "Family Law", "Immigration", "Contract Law",
  "Financial Planning", "Tax Advisory", "Zakat Consultancy", "Business Accounting",
  "IT Consulting", "Cybersecurity", "Software Architecture", "Data Engineering",
]

const LICENSES = [
  "Medical Council License",
  "Bar Association Certificate",
  "CPA / CA Qualification",
  "Professional Indemnity Insurance",
  "DBS / Background Check",
  "Halal Practice Certification",
]

export default function ProfessionalProfilePage() {
  const [activeTab, setActiveTab] = useState("practice")
  const [practitioners, setPractitioners] = useState([
    { id: 1, name: "Dr. Aisha Rahman", specialization: "General Physician" },
    { id: 2, name: "Br. Yusuf Malik", specialization: "Business Consultant" },
  ])

  const addPractitioner = () => {
    setPractitioners(prev => [...prev, { id: Date.now(), name: "", specialization: "" }])
  }

  const removePractitioner = (id: number) => {
    setPractitioners(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-violet-600 font-black uppercase tracking-widest text-[10px]">
            <Briefcase className="h-3 w-3" /> Practice Management
          </div>
          <h1 className="text-3xl font-black font-headline text-foreground tracking-tight">Business Profile</h1>
          <p className="text-sm font-bold text-muted-foreground">Update your practice information, team, specialties, and credentials.</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 rounded-2xl px-8 font-black shadow-lg shadow-violet-200 h-12 text-white">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-card border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="practice" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-violet-600 data-[state=active]:text-white transition-all">Practice Info</TabsTrigger>
          <TabsTrigger value="practitioners" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Practitioners</TabsTrigger>
          <TabsTrigger value="specialties" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Specialties</TabsTrigger>
          <TabsTrigger value="documents" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="practice" className="space-y-8 animate-in fade-in duration-500">
          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-violet-600" /> Practice Details
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Practice / Business Name</Label>
                  <Input placeholder="e.g., Dr. Aisha Rahman Family Clinic" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Profession Type</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none shadow-xl">
                      <SelectItem value="medical">Medical / Healthcare</SelectItem>
                      <SelectItem value="legal">Legal Services</SelectItem>
                      <SelectItem value="financial">Financial / Accounting</SelectItem>
                      <SelectItem value="it">IT / Technology</SelectItem>
                      <SelectItem value="counselling">Counselling / Mental Health</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Years of Experience</Label>
                  <Input type="number" placeholder="e.g., 12" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">About Your Practice</Label>
                  <Textarea
                    placeholder="Describe your services, approach, and what makes your practice unique..."
                    className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium"
                  />
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <MapPin className="h-5 w-5 text-violet-600" /> Contact & Location
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-6">
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Office Address</Label>
                <Input placeholder="e.g., 12 Park Avenue, Suite 400, London" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Contact Number</Label>
                  <Input type="tel" placeholder="+44 20 7946 0958" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Email Address</Label>
                  <Input type="email" placeholder="contact@practice.com" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Website</Label>
                  <Input placeholder="https://yourpractice.com" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Appointment Booking URL</Label>
                  <Input placeholder="https://calendly.com/..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="practitioners" className="space-y-8 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-black flex items-center gap-2">
                  <Users className="h-5 w-5 text-violet-600" /> Team Members
                </h2>
                <p className="text-sm text-muted-foreground font-medium">List all practitioners in your practice with their specializations.</p>
              </div>
              <Button
                onClick={addPractitioner}
                className="bg-violet-600 hover:bg-violet-700 rounded-2xl px-6 font-black h-11 text-white text-xs uppercase tracking-widest shadow-lg shadow-violet-200"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Member
              </Button>
            </div>

            <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
              <div className="p-6 border-b border-border bg-muted/30 grid grid-cols-12 gap-4">
                <div className="col-span-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Full Name</div>
                <div className="col-span-5 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Specialization / Role</div>
                <div className="col-span-2" />
              </div>
              <div className="divide-y divide-border">
                {practitioners.map((p) => (
                  <div key={p.id} className="grid grid-cols-12 gap-4 items-center p-6 hover:bg-muted/30 transition-colors group">
                    <div className="col-span-5">
                      <Input
                        defaultValue={p.name}
                        placeholder="e.g., Dr. Fatima Ali"
                        className="h-11 rounded-2xl bg-muted border-none font-bold"
                      />
                    </div>
                    <div className="col-span-5">
                      <Input
                        defaultValue={p.specialization}
                        placeholder="e.g., Cardiologist"
                        className="h-11 rounded-2xl bg-muted border-none font-bold"
                      />
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl text-muted-foreground hover:text-rose-600 hover:bg-rose-50 opacity-0 group-hover:opacity-100 transition-all"
                        onClick={() => removePractitioner(p.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {practitioners.length === 0 && (
                  <div className="p-12 text-center text-muted-foreground font-medium">
                    No practitioners added yet. Click "Add Member" to get started.
                  </div>
                )}
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="specialties" className="space-y-8 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Star className="h-5 w-5 text-violet-600" /> Areas of Specialization
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Select all specializations covered by your practice. These appear in search filters.</p>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {SPECIALIZATIONS.map((spec) => (
                  <label key={spec} className="flex items-center gap-3 p-4 bg-muted rounded-2xl cursor-pointer hover:bg-violet-50 hover:border-violet-200 border border-transparent transition-all">
                    <input type="checkbox" className="accent-violet-600 h-4 w-4" />
                    <span className="text-sm font-bold text-foreground">{spec}</span>
                  </label>
                ))}
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Globe className="h-5 w-5 text-violet-600" /> Languages
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Languages Spoken (comma separated)</Label>
                <Input placeholder="e.g., English, Arabic, Urdu, French" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="documents" className="space-y-8 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Award className="h-5 w-5 text-violet-600" /> Professional Licenses & Credentials
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Upload certifications to earn a verified practice badge on your public listing.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LICENSES.map((doc) => (
                <Card key={doc} className="rounded-[2rem] border-none shadow-sm bg-card p-6 flex items-center justify-between group hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-600">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-black text-sm text-foreground">{doc}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">PDF or JPG · Max 5MB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl font-black text-xs h-9 border-2 border-violet-100 text-violet-600 hover:bg-violet-50">
                    Upload
                  </Button>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <UploadCloud className="h-5 w-5 text-violet-600" /> Branding
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {["Practice Logo (1:1)", "Office / Cover Photo (16:9)"].map((label) => (
                <Card key={label} className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
                  <div className="relative border-2 border-dashed border-border rounded-[1.5rem] m-4 p-8 text-center hover:border-violet-300 transition-colors flex flex-col justify-center items-center gap-3">
                    <UploadCloud className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm font-black text-muted-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">PNG or JPG · Max 5MB</p>
                    <Input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Card className="rounded-[2.5rem] border-none shadow-xl bg-zinc-900 text-white p-10 space-y-6 relative overflow-hidden">
            <ShieldCheck className="absolute -top-4 -right-4 h-32 w-32 opacity-10" />
            <div className="relative z-10 space-y-3">
              <h3 className="text-2xl font-black font-headline">Verified Practice Badge</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Uploading your licenses unlocks a verified badge and increases trust with clients searching for halal-conscious professionals.
              </p>
            </div>
            <Button className="w-full h-14 rounded-[1.5rem] bg-violet-600 hover:bg-violet-700 text-white font-black text-lg shadow-2xl relative z-10">
              Submit for Verification
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
