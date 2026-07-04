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
  UploadCloud, Instagram, Facebook, Youtube, Save,
  Building2, Globe, Phone, Mail, FileText,
  Linkedin, BookOpen, Shield, CheckCircle2, Users
} from "lucide-react"

export default function OrganizationProfilePage() {
  const [activeTab, setActiveTab] = useState("basic")

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-600 font-black uppercase tracking-widest text-[10px]">
            <Building2 className="h-3 w-3" /> Organisation Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">Organization Profile</h1>
          <p className="text-sm font-bold text-muted-foreground">Update your organization's public information, branding, and registration details.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-2xl px-8 font-black shadow-lg shadow-indigo-200 h-12 text-white">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-card border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="basic" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all">Basic Info</TabsTrigger>
          <TabsTrigger value="branding" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Branding</TabsTrigger>
          <TabsTrigger value="registration" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Registration</TabsTrigger>
          <TabsTrigger value="social" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Social & Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-8 animate-in fade-in duration-500">
          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" /> Who You Are
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Organization Name</Label>
                  <Input placeholder="e.g., Noor Foundation" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Organization Type</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none shadow-xl">
                      <SelectItem value="ngo">NGO / Charity</SelectItem>
                      <SelectItem value="community">Community Group</SelectItem>
                      <SelectItem value="education">Educational Institute</SelectItem>
                      <SelectItem value="dawah">Da'wah Foundation</SelectItem>
                      <SelectItem value="waqf">Waqf / Endowment</SelectItem>
                      <SelectItem value="youth">Youth Organisation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Year Founded</Label>
                  <Input type="number" placeholder="e.g., 2012" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Mission Statement</Label>
                  <Textarea
                    placeholder="Describe your organization's mission, values, and community impact..."
                    className="min-h-[140px] rounded-2xl bg-muted border-none p-4 font-medium"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Areas of Focus</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["Education", "Poverty Relief", "Healthcare", "Da'wah", "Orphan Care", "Disaster Relief", "Women's Empowerment", "Youth Development", "Environmental"].map((area) => (
                      <label key={area} className="flex items-center gap-2.5 p-3 bg-muted rounded-xl cursor-pointer hover:bg-indigo-50 transition-colors">
                        <input type="checkbox" className="accent-indigo-600" />
                        <span className="text-xs font-bold text-foreground">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="branding" className="space-y-8 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <UploadCloud className="h-5 w-5 text-indigo-600" /> Visual Identity
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Upload your logo and cover photo for your public listing page.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {[
                { label: "Organization Logo", hint: "PNG or SVG (1:1) · Max 5MB" },
                { label: "Cover / Banner Photo", hint: "PNG or JPG (16:9) · Max 10MB" },
              ].map(({ label, hint }) => (
                <Card key={label} className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
                  <div className="relative border-2 border-dashed border-border rounded-[1.5rem] m-4 p-10 text-center hover:border-indigo-300 transition-colors flex flex-col justify-center items-center gap-3">
                    <UploadCloud className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm font-black text-muted-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{hint}</p>
                    <Input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-600" /> Brand Story
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-6">
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Tagline / Slogan</Label>
                <Input placeholder="e.g., Empowering Communities Through Faith" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Impact Statement (for public listing)</Label>
                <Textarea
                  placeholder="A short paragraph for your Halal Hub listing — what impact have you made?"
                  className="min-h-[100px] rounded-2xl bg-muted border-none p-4 font-medium"
                />
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="registration" className="space-y-8 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-600" /> Legal Registration
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Add your official registration details to establish trust and unlock verified badge.</p>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Registration Type</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none shadow-xl">
                      <SelectItem value="trust">Charitable Trust</SelectItem>
                      <SelectItem value="section8">Section 8 Company</SelectItem>
                      <SelectItem value="society">Registered Society</SelectItem>
                      <SelectItem value="charity">UK Registered Charity</SelectItem>
                      <SelectItem value="501c3">US 501(c)(3)</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Registration Number</Label>
                  <Input placeholder="e.g., 12345/MH/2012" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Governing / Registering Authority</Label>
                  <Input placeholder="e.g., Charity Commission, FCRA" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Country of Registration</Label>
                  <Input placeholder="e.g., India, United Kingdom" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Shield className="h-5 w-5 text-indigo-600" /> Document Uploads
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["Registration Certificate", "Latest Annual Report", "Audited Accounts", "FCRA / Foreign Funding Permit"].map((doc) => (
                <Card key={doc} className="rounded-[2rem] border-none shadow-sm bg-card p-6 flex items-center justify-between group hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-black text-sm text-foreground">{doc}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase">PDF · Max 10MB</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl font-black text-xs h-9 border-2 border-indigo-100 text-indigo-600 hover:bg-indigo-50">
                    Upload
                  </Button>
                </Card>
              ))}
            </div>
          </section>

          <Card className="rounded-[2.5rem] border-none shadow-xl bg-zinc-900 text-white p-10 space-y-6 relative overflow-hidden">
            <CheckCircle2 className="absolute -top-4 -right-4 h-32 w-32 opacity-10" />
            <div className="relative z-10 space-y-3">
              <h3 className="text-2xl font-black font-headline">Verified Organisation Badge</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                Completing registration details and uploading documents qualifies you for a verified badge on your public listing. This builds donor and community trust.
              </p>
            </div>
            <Button className="w-full h-14 rounded-[1.5rem] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg shadow-2xl relative z-10">
              Submit for Verification
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-8 animate-in fade-in duration-500">
          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Phone className="h-5 w-5 text-indigo-600" /> Contact Details
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-6">
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Office / HQ Address</Label>
                <Input placeholder="e.g., 4th Floor, Community Centre, Bengaluru" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Contact Number</Label>
                  <Input type="tel" placeholder="+91 98765 43210" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Email Address</Label>
                  <Input type="email" placeholder="contact@organization.org" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Website</Label>
                  <Input placeholder="https://yourorg.org" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Donation Page URL</Label>
                  <Input placeholder="https://donate.yourorg.org" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Globe className="h-5 w-5 text-indigo-600" /> Social Media
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-4">
              {[
                { label: "Instagram", icon: Instagram },
                { label: "Facebook", icon: Facebook },
                { label: "YouTube", icon: Youtube },
                { label: "LinkedIn", icon: Linkedin },
              ].map(({ label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input placeholder={`${label} URL`} className="h-11 rounded-2xl bg-muted border-none font-bold" />
                </div>
              ))}
            </Card>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}
