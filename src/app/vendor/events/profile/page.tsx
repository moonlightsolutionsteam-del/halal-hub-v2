
"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Users, Info, Building2, Eye
} from "lucide-react";

const EVENT_TYPES = ["Weddings", "Conferences", "Nikah Ceremonies", "Expos", "Religious Seminars", "Private Parties", "Workshops"];
const PRIVACY_FEATURES = ["Gender Segregated Halls", "Private Entrance", "No Alcohol Policy", "Female Staff Only", "Prayer Room On-site", "Wudu Stations"];
const AMENITIES = ["Audio/Visual System", "Stage Setup", "Catering Kitchen", "Parking Available", "Air Conditioning", "Wi-Fi", "Decoration Service"];

export default function EventsProfilePage() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline tracking-tight text-slate-900">Event Venue Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your venue details, event packages, and privacy protocols.</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 rounded-2xl px-8 font-black shadow-lg shadow-purple-200 h-12 text-white">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-white border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="details" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-purple-600 data-[state=active]:text-white">Venue Details</TabsTrigger>
          <TabsTrigger value="privacy" className="rounded-xl px-8 font-bold text-sm h-full">Privacy & Trust</TabsTrigger>
          <TabsTrigger value="packages" className="rounded-xl px-8 font-bold text-sm h-full">Packages</TabsTrigger>
          <TabsTrigger value="gallery" className="rounded-xl px-8 font-bold text-sm h-full">Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Info className="h-5 w-5 text-purple-600" /> Basic Information
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Venue Name</Label>
                  <Input placeholder="e.g., The Grand Halal Ballroom" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Primary Contact</Label>
                  <Input placeholder="+91 11 2345 6789" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Venue Description</Label>
                  <Textarea placeholder="Describe your venue space, history, and unique features..." className="min-h-[120px] rounded-2xl bg-slate-50 border-none p-4 font-medium resize-none" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Max Capacity</Label>
                  <Input type="number" placeholder="e.g., 500" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Starting Price</Label>
                  <Input placeholder="e.g., ₹25,000" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" /> Event Specialization
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 space-y-8">
              <div className="space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Types of Events Hosted</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {EVENT_TYPES.map((t) => (
                    <div key={t} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl">
                      <Checkbox id={`t-${t}`} />
                      <label htmlFor={`t-${t}`} className="text-xs font-bold text-slate-700">{t}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Amenities Provided</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {AMENITIES.map((a) => (
                    <div key={a} className="flex items-center space-x-3 bg-purple-50/50 p-3 rounded-xl border border-purple-100">
                      <Checkbox id={`a-${a}`} />
                      <label htmlFor={`a-${a}`} className="text-xs font-bold text-purple-900">{a}</label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="privacy" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-purple-600" /> Privacy & Shariah Compliance
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PRIVACY_FEATURES.map((f) => (
                  <div key={f} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl">
                    <Checkbox id={`f-${f}`} />
                    <label htmlFor={`f-${f}`} className="text-sm font-bold text-slate-700">{f}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <Card className="rounded-[2.5rem] border-none shadow-xl bg-slate-900 text-white p-10 space-y-8">
            <h3 className="text-2xl font-black font-headline">Compliance Declaration</h3>
            <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-3xl">
              I declare that this venue adheres to the privacy and halal standards selected above. I understand that misrepresentation of facilities (e.g., gender segregation) may result in immediate delisting.
            </p>
            <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl">
              <Checkbox id="conf-events" className="border-white/30" />
              <label htmlFor="conf-events" className="text-sm font-bold text-white/80">I accept responsibility for venue compliance.</label>
            </div>
            <Button className="w-full h-16 rounded-[1.5rem] bg-purple-600 hover:bg-purple-700 text-white font-black text-xl shadow-2xl">
              Submit Venue Profile
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
