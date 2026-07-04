
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
  Save, ShieldCheck, Plane, Globe, Compass, 
  MapPin, Info, Briefcase, Camera, Upload
} from "lucide-react";

const PACKAGE_TYPES = ["Hajj Packages", "Umrah Packages", "Guided Tours", "Adventure Travel", "Family Getaways", "Honeymoon Specials", "Custom Itineraries"];
const TRUST_BADGES = ["IATA Member", "ATOL Protected", "Scholar-Led Tours", "100% Halal Board", "Prayer-Safe Itinerary", "Female Guides Avail."];

export default function TravelProfilePage() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline tracking-tight text-foreground">Travel Agency Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your tours, destinations, and accreditation details.</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700 rounded-2xl px-8 font-black shadow-lg shadow-amber-200 h-12 text-white">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-card border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="details" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-amber-600 data-[state=active]:text-white">Agency Info</TabsTrigger>
          <TabsTrigger value="packages" className="rounded-xl px-8 font-bold text-sm h-full">Package Types</TabsTrigger>
          <TabsTrigger value="destinations" className="rounded-xl px-8 font-bold text-sm h-full">Destinations</TabsTrigger>
          <TabsTrigger value="documents" className="rounded-xl px-8 font-bold text-sm h-full">Accreditation</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-amber-600" /> Basic Information
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Agency Name</Label>
                  <Input placeholder="e.g., Saffron Travels" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Contact Email</Label>
                  <Input placeholder="info@travelagency.com" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Agency Bio</Label>
                  <Textarea placeholder="Describe your experience, network, and specializations..." className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium" />
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-amber-600" /> Trust & Compliance
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {TRUST_BADGES.map((badge) => (
                  <div key={badge} className="flex items-center space-x-3 p-4 bg-muted rounded-2xl border border-transparent hover:border-amber-200 transition-all">
                    <Checkbox id={`b-${badge}`} />
                    <label htmlFor={`b-${badge}`} className="text-sm font-bold text-foreground">{badge}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="packages" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Compass className="h-5 w-5 text-amber-600" /> Package Categories
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PACKAGE_TYPES.map((pkg) => (
                  <div key={pkg} className="flex items-center space-x-3 p-4 bg-muted rounded-2xl">
                    <Checkbox id={`p-${pkg}`} />
                    <label htmlFor={`p-${pkg}`} className="text-sm font-bold text-foreground">{pkg}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <Card className="rounded-[2.5rem] border-none shadow-xl bg-zinc-900 text-white p-10 space-y-8">
            <h3 className="text-2xl font-black font-headline">Pilgrim Trust Commitment</h3>
            <p className="text-sm text-muted-foreground font-medium">I confirm that all Hajj/Umrah packages are provided through licensed operators and that halal board is guaranteed as stated in itineraries.</p>
            <Button className="w-full h-16 rounded-[1.5rem] bg-amber-600 hover:bg-amber-700 text-white font-black text-xl">Submit Agency Profile</Button>
          </Card>
        </TabsContent>

        <TabsContent value="destinations" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Globe className="h-5 w-5 text-amber-600" /> Key Destinations
              </h2>
              <p className="text-sm text-muted-foreground font-medium">List the countries and cities your agency covers most frequently.</p>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Primary Destination Countries</Label>
                  <Input placeholder="e.g., Saudi Arabia, Turkey, Malaysia" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Annual Tours Conducted</Label>
                  <Input placeholder="e.g., 25 tours per year" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Group Size (Min – Max)</Label>
                  <Input placeholder="e.g., 10 – 50 pilgrims" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Languages of Guidance</Label>
                  <Input placeholder="e.g., Arabic, English, Urdu" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Featured Itinerary Description</Label>
                  <textarea className="w-full min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium text-sm resize-none focus:ring-2 focus:ring-amber-300 outline-none" placeholder="Describe your most popular package itinerary..." />
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="documents" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-amber-600" /> Accreditation & Licences
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Upload your travel agency registration, Hajj operator approval, and insurance documents.</p>
            </div>
            {[
              { label: "Travel Agency License", hint: "Issued by ministry of tourism" },
              { label: "IATA / ATOL Certificate", hint: "International accreditation" },
              { label: "Hajj / Umrah Operator Approval", hint: "Ministry of Haj & Endowments" },
              { label: "Travel Insurance Policy", hint: "Covers all tour participants" },
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
