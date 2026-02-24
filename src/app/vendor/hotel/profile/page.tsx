
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
          <h1 className="text-3xl font-black font-headline tracking-tight text-slate-900">Hotel Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your property details, room availability, and halal hospitality standards.</p>
        </div>
        <Button className="bg-sky-600 hover:bg-sky-700 rounded-2xl px-8 font-black shadow-lg shadow-sky-200 h-12 text-white">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-white border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
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
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Property Name</Label>
                  <Input placeholder="e.g., Royal Halal Suites" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Star Rating</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl bg-slate-50 border-none font-bold">
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
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Description</Label>
                  <Textarea placeholder="Detail your hospitality vision, dining options, and guest services..." className="min-h-[120px] rounded-2xl bg-slate-50 border-none p-4 font-medium" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Check-in Time</Label>
                  <Input type="time" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Check-out Time</Label>
                  <Input type="time" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
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
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {AMENITIES.map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl hover:bg-sky-50 transition-colors">
                    <Checkbox id={`a-${item}`} />
                    <label htmlFor={`a-${item}`} className="text-sm font-bold text-slate-700">{item}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <Card className="rounded-[2.5rem] border-none shadow-xl bg-slate-900 text-white p-10 space-y-8">
            <h3 className="text-2xl font-black">Hospitality Charter</h3>
            <p className="text-sm text-slate-400 font-medium">By listing here, you commit to providing a strictly compliant environment according to our "Halal Hospitality Charter."</p>
            <Button className="w-full h-16 rounded-[1.5rem] bg-sky-600 hover:bg-sky-700 text-white font-black text-xl">Sign & Submit Profile</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
