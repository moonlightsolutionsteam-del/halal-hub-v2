
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
  Upload, Save, ShieldCheck, Bed,
  Coffee, Moon, Info, Building2
} from "lucide-react";

const AMENITIES = ["Alcohol-Free Site", "Halal Breakfast", "Prayer Room On-site", "Qibla Direction in Rooms", "Prayer Mats Available", "Modest Pool Hours", "Gender-Segregated Spa", "No Casino Policy"];
const ROOM_TYPES = ["Standard Single", "Superior Double", "Executive Suite", "Family Apartment", "Royal Penthouse", "Connecting Rooms"];

export default function HotelProfilePage() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline tracking-tight text-foreground">Hotel Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your property details, room availability, and halal hospitality standards.</p>
        </div>
        <Button className="bg-sky-600 hover:bg-sky-700 rounded-2xl px-8 font-black shadow-lg shadow-sky-200 h-12 text-white">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-card border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="details" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-sky-600 data-[state=active]:text-white">Property Info</TabsTrigger>
          <TabsTrigger value="amenities" className="rounded-xl px-8 font-bold text-sm h-full">Amenities</TabsTrigger>
          <TabsTrigger value="rooms" className="rounded-xl px-8 font-bold text-sm h-full">Room Catalog</TabsTrigger>
          <TabsTrigger value="documents" className="rounded-xl px-8 font-bold text-sm h-full">Trust Certs</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Building2 className="h-5 w-5 text-sky-600" /> Basic Information
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Property Name</Label>
                  <Input placeholder="e.g., Royal Halal Suites" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Star Rating</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 Star</SelectItem>
                      <SelectItem value="4">4 Star</SelectItem>
                      <SelectItem value="5">5 Star</SelectItem>
                      <SelectItem value="boutique">Boutique / Unrated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Description</Label>
                  <Textarea placeholder="Detail your hospitality vision, dining options, and guest services..." className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Check-in Time</Label>
                  <Input type="time" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Check-out Time</Label>
                  <Input type="time" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="amenities" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Moon className="h-5 w-5 text-sky-600" /> Halal Amenities
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {AMENITIES.map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-4 bg-muted rounded-2xl hover:bg-sky-50 transition-colors">
                    <Checkbox id={`a-${item}`} />
                    <label htmlFor={`a-${item}`} className="text-sm font-bold text-foreground">{item}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <Card className="rounded-[2.5rem] border-none shadow-xl bg-zinc-900 text-white p-10 space-y-8">
            <h3 className="text-2xl font-black">Hospitality Charter</h3>
            <p className="text-sm text-muted-foreground font-medium">By listing here, you commit to providing a strictly compliant environment according to our "Halal Hospitality Charter."</p>
            <Button className="w-full h-16 rounded-[1.5rem] bg-sky-600 hover:bg-sky-700 text-white font-black text-xl">Sign & Submit Profile</Button>
          </Card>
        </TabsContent>

        <TabsContent value="rooms" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Bed className="h-5 w-5 text-sky-600" /> Room Catalog
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Configure your room types, rates, and availability.</p>
            </div>
            <div className="space-y-4">
              {ROOM_TYPES.map((room) => (
                <Card key={room} className="rounded-[2rem] border-none shadow-sm bg-card p-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Checkbox id={`r-${room}`} />
                      <label htmlFor={`r-${room}`} className="font-black text-sm text-foreground">{room}</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Input placeholder="Nightly rate (USD)" className="h-10 rounded-2xl bg-muted border-none font-bold w-44 text-sm" />
                      <Input placeholder="Max guests" className="h-10 rounded-2xl bg-muted border-none font-bold w-28 text-sm" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Coffee className="h-5 w-5 text-sky-600" /> Dining & Food Offerings
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Restaurant Name (On-site)</Label>
                  <Input placeholder="e.g., The Saffron Kitchen" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Halal Certification (Food)</Label>
                  <Input placeholder="e.g., JAKIM, HFSAA" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="documents" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-sky-600" /> Trust Certificates
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Upload your hotel license, halal hospitality certification, and safety compliance docs.</p>
            </div>
            {[
              { label: "Hotel Operating License", hint: "Ministry of tourism registration" },
              { label: "Halal Hospitality Certificate", hint: "Issued by recognized halal authority" },
              { label: "Fire & Safety Compliance", hint: "Latest inspection certificate" },
              { label: "Food Safety Certificate", hint: "For on-site dining facilities" },
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
