
"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MapPin, Clock, Phone, Globe, Camera, 
  Upload, Trash2, Plus, CheckCircle2, 
  Info, Save, ShoppingCart, Truck, 
  Package, Boxes, ShieldCheck, Search
} from "lucide-react";

const HIGHLIGHTS = [
  "Fresh Produce", "Organic Section", "Bulk Wholesale", "Imported Goods", "Dairy & Eggs", "Meat Counter", "Bakery On-site", "Home Delivery", "24/7 Service", "Loyalty Program"
];

const DEPARTMENTS = [
  "Fresh Fruits", "Fresh Vegetables", "Meat & Poultry", "Dairy Products", "Frozen Foods", "Pantry Essentials", "Beverages", "Household Items", "Personal Care", "Bakery", "Spices & Herbs", "Rice & Grains", "Oils & Ghee", "Snacks & Sweets", "Baby Care", "Health & Wellness"
];

export default function GroceryProfilePage() {
  const [activeTab, setActiveTab] = useState("details");
  const [searchDept, setSearchDept] = useState("");

  const filteredDepts = DEPARTMENTS.filter(d => d.toLowerCase().includes(searchDept.toLowerCase()));

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline tracking-tight">Supermarket Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your inventory departments, delivery zones, and store settings.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-primary hover:bg-primary/90 rounded-2xl px-8 font-black shadow-lg shadow-primary/20 h-12">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-white border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="details" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-primary data-[state=active]:text-white">Store Details</TabsTrigger>
          <TabsTrigger value="departments" className="rounded-xl px-8 font-bold text-sm h-full">Inventory & Depts</TabsTrigger>
          <TabsTrigger value="delivery" className="rounded-xl px-8 font-bold text-sm h-full">Delivery Ops</TabsTrigger>
          <TabsTrigger value="gallery" className="rounded-xl px-8 font-bold text-sm h-full">Media</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" /> Basic Information
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Update your store branding and contact information.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Store Name</Label>
                  <Input placeholder="e.g., Amanah Hypermarket" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Contact Office</Label>
                  <Input placeholder="+91 11 2345 6789" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Store Tagline</Label>
                  <Input placeholder="e.g., Your Trusted Partner for Ethical Essentials" className="h-12 rounded-2xl bg-slate-50 border-none font-medium" />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Service Highlights</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {HIGHLIGHTS.map((item) => (
                      <div key={item} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                        <Checkbox id={item} className="rounded-md border-slate-300" />
                        <label htmlFor={item} className="text-xs font-bold text-slate-700 cursor-pointer">{item}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" /> Location & Hours
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Physical store location and timings.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Full Address</Label>
                  <Input placeholder="Hypermarket building, street..." className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Primary City</Label>
                  <Input placeholder="e.g. Dubai" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Operating Status</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl bg-slate-50 border-none font-bold">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="open">Open Now</SelectItem>
                      <SelectItem value="temp-closed">Temporarily Closed</SelectItem>
                      <SelectItem value="relocated">Relocated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="departments" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Boxes className="h-5 w-5 text-primary" /> Department Listing
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Select all departments available in your store for accurate customer filtering.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input 
                    placeholder="Search departments..." 
                    className="pl-10 h-12 rounded-2xl bg-slate-50 border-none"
                    value={searchDept}
                    onChange={(e) => setSearchDept(e.target.value)}
                  />
                </div>
                <ScrollArea className="h-80 rounded-2xl bg-slate-50/50 p-6 border border-slate-100">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredDepts.map((d) => (
                      <div key={d} className="flex items-center space-x-3 p-3 hover:bg-white rounded-xl transition-all cursor-pointer group shadow-sm border border-transparent hover:border-primary/10">
                        <Checkbox id={`d-${d}`} className="rounded-md border-slate-300 group-hover:border-primary" />
                        <label htmlFor={`d-${d}`} className="text-xs font-bold text-slate-700 cursor-pointer truncate">{d}</label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </Card>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
