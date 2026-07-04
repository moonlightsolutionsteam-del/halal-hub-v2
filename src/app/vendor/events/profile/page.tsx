"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, Clock, Phone, Camera, 
  Upload, Save, ShieldCheck, Sparkles,
  Users, Info, Building2, Eye,
  Trash2, Plus, Image as ImageIcon,
  CheckCircle2, Smartphone, Globe,
  Calendar
} from "lucide-react";

const EVENT_TYPES = [
  "Weddings / Nikah", "Conferences", "Religious Seminars", "Expos & Exhibitions", 
  "Private Parties", "Aqiqah / Naming", "Workshops", "Charity Galas", "Corporate Events"
];

const PRIVACY_FEATURES = [
  "Gender Segregated Halls", "Private Entrance", "No Alcohol Policy", 
  "Female Staff Only Option", "Prayer Room On-site", "Permanent Wudu Stations",
  "Privacy Screens Available", "No Pork Policy"
];

const AMENITIES = [
  "Audio/Visual System", "Built-in Stage", "Commercial Catering Kitchen", 
  "Ample Parking", "Central Air Conditioning", "High-speed Wi-Fi", 
  "Internal Decoration Service", "VIP Holding Room", "Bridal Suite"
];

const COMPLIANCE_DOCS = [
  { id: "fire", label: "Fire Safety Certificate" },
  { id: "halal", label: "Halal Hospitality Charter" },
  { id: "trade", label: "Municipal Trade License" },
  { id: "health", label: "Health & Hygiene Permit" },
  { id: "insurance", label: "Liability Insurance" },
  { id: "id", label: "Owner Identity Proof" },
];

export default function EventsProfilePage() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline tracking-tight text-foreground">Event Venue Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your venue details, event packages, and privacy protocols.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-purple-600 hover:bg-purple-700 rounded-2xl px-8 font-black shadow-lg shadow-purple-200 h-12 text-white">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-card border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="details" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-purple-600 data-[state=active]:text-white transition-all">Basic Info</TabsTrigger>
          <TabsTrigger value="privacy" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Privacy & Shariah</TabsTrigger>
          <TabsTrigger value="amenities" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Amenities & Capacity</TabsTrigger>
          <TabsTrigger value="documents" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Accreditation</TabsTrigger>
          <TabsTrigger value="branding" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Branding & Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <Info className="h-5 w-5 text-purple-600" /> Core Information
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Update your venue's name, description, and primary business settings.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Venue / Business Name</Label>
                  <Input placeholder="e.g., The Grand Halal Ballroom" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Venue Type</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none shadow-xl">
                      <SelectItem value="banquet">Banquet Hall</SelectItem>
                      <SelectItem value="hotel_hall">Hotel Ballroom</SelectItem>
                      <SelectItem value="outdoor">Outdoor / Garden Space</SelectItem>
                      <SelectItem value="community">Community Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Contact Number</Label>
                  <Input placeholder="+91 11 2345 6789" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Website (Optional)</Label>
                  <Input placeholder="https://..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Venue Description</Label>
                  <Textarea placeholder="Describe your venue space, its history, and unique features..." className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium resize-none focus:ring-2 focus:ring-purple-600/20" />
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <MapPin className="h-5 w-5 text-purple-600" /> Location
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Full Address</Label>
                  <Input placeholder="Plot number, street, landmark..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">City</Label>
                  <Input placeholder="e.g., Delhi" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Pincode</Label>
                  <Input placeholder="e.g., 110001" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <ShieldCheck className="h-5 w-5 text-purple-600" /> Shariah Compliance & Privacy
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Toggle features that help build trust with the community.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PRIVACY_FEATURES.map((feature) => (
                  <div key={feature} className="flex items-center space-x-3 bg-purple-50/50 p-4 rounded-2xl border border-purple-100/50 hover:bg-purple-50 transition-colors cursor-pointer group">
                    <Checkbox id={feature} className="rounded-md border-purple-300" />
                    <label htmlFor={feature} className="text-xs font-bold text-purple-900 leading-tight cursor-pointer">{feature}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <Card className="rounded-[2.5rem] border-none shadow-xl bg-zinc-900 text-white p-10 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <CheckCircle2 className="h-32 w-32" />
              </div>
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-black font-headline">Venue Trust Declaration</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-3xl">
                  By checking these features, you confirm that your venue strictly adheres to the stated privacy and Shariah guidelines. Misrepresenting facilities (e.g., claiming gender segregation when not provided) may result in immediate profile suspension.
                </p>
              </div>
              <div className="flex items-center space-x-4 bg-card/5 p-4 rounded-2xl border border-white/10 relative z-10">
                <Checkbox id="final-decl" className="border-white/30" />
                <label htmlFor="final-decl" className="text-sm font-bold text-white/80 cursor-pointer">I declare that all compliance details are accurate.</label>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="amenities" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <Users className="h-5 w-5 text-purple-600" /> Capacity & Pricing
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Max Guest Capacity</Label>
                  <Input type="number" placeholder="e.g., 500" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Starting Price per Event (₹)</Label>
                  <Input placeholder="e.g., 25,000" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Min. Advance Notice (Days)</Label>
                  <Input type="number" placeholder="e.g., 30" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Booking Advance Required (%)</Label>
                  <Input type="number" placeholder="e.g., 50" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <Calendar className="h-5 w-5 text-purple-600" /> Event Specialization
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {EVENT_TYPES.map((type) => (
                  <div key={type} className="flex items-center space-x-3 p-4 bg-muted rounded-2xl hover:bg-muted transition-colors">
                    <Checkbox id={`et-${type}`} />
                    <label htmlFor={`et-${type}`} className="text-xs font-bold text-foreground cursor-pointer">{type}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="documents" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <ShieldCheck className="h-5 w-5 text-purple-600" /> Compliance Documents
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Upload mandatory permits to verify your venue status.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {COMPLIANCE_DOCS.map((doc) => (
                  <div key={doc.id} className="space-y-3">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">{doc.label}</Label>
                    <div className="p-6 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-3 bg-muted/50 hover:bg-card transition-colors cursor-pointer group">
                      <div className="h-10 w-10 bg-card rounded-full flex items-center justify-center text-muted-foreground group-hover:text-purple-600 transition-colors shadow-sm">
                        <Upload className="h-5 w-5" />
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-black uppercase text-purple-600 group-hover:underline">Upload file</p>
                        <p className="text-[9px] text-muted-foreground mt-1">No file chosen</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="branding" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <Smartphone className="h-5 w-5 text-purple-600" /> Visual Branding
              </h2>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Venue Logo</Label>
                  <div className="flex items-center gap-8">
                    <div className="h-32 w-32 rounded-3xl bg-muted border-2 border-dashed border-border flex items-center justify-center text-muted-foreground overflow-hidden relative group">
                      <Camera className="h-8 w-8 group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="rounded-xl font-black text-[10px] h-9 border-2 uppercase tracking-tighter">Choose Logo</Button>
                      <p className="text-[10px] font-bold text-muted-foreground leading-tight">PNG, JPG (1:1)<br />Max 2MB</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Main Banner / Cover</Label>
                  <div className="aspect-video w-full rounded-[2rem] bg-muted border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground relative group overflow-hidden shadow-inner">
                    <ImageIcon className="h-8 w-8 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Select Banner</span>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="secondary" className="rounded-full font-black text-xs h-10 px-6 uppercase tracking-widest">Upload</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <Plus className="h-5 w-5 text-purple-600" /> Venue Showcase Gallery
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Add photos of your halls, décor, and specialized facilities.</p>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group border border-border shadow-sm">
                    <img src={`https://picsum.photos/seed/venue-img-${i}/400/400`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="icon" variant="destructive" className="h-8 w-8 rounded-xl"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
                <button className="aspect-square rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 bg-muted hover:bg-card hover:border-purple-600/40 transition-all text-muted-foreground hover:text-purple-600">
                  <Plus className="h-6 w-6" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Add Photo</span>
                </button>
              </div>
            </Card>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
