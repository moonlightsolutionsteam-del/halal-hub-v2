
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MapPin, Clock, Phone, Globe, Camera, 
  Upload, Trash2, Plus, CheckCircle2, 
  Info, Save, ShoppingCart, Truck, 
  Package, Boxes, ShieldCheck, Search,
  Smartphone, Wallet, Mail, Calendar,
  FileText, Image as ImageIcon, GripVertical, Video
} from "lucide-react";

const HIGHLIGHTS = [
  "Fresh Produce", "Organic Section", "Bulk Wholesale", "Imported Goods", "Dairy & Eggs", "Meat Counter", "Bakery On-site", "Home Delivery", "24/7 Service", "Loyalty Program"
];

const DEPARTMENTS = [
  "Fresh Fruits", "Fresh Vegetables", "Meat & Poultry", "Dairy Products", "Frozen Foods", "Pantry Essentials", "Beverages", "Household Items", "Personal Care", "Bakery", "Spices & Herbs", "Rice & Grains", "Oils & Ghee", "Snacks & Sweets", "Baby Care", "Health & Wellness", "Pet Supplies", "Stationery", "Home Decor", "Electronics"
];

const DELIVERY_OPTIONS = [
  "In-store Pickup", "Local Store Delivery", "Hyperlocal Delivery (e.g. Swiggy/Zomato)", "Click & Collect", "Self-service Lockers"
];

const PAYMENT_METHODS = [
  "Cash", "UPI", "Credit/Debit Cards", "Net Banking", "Store Wallet", "Food Cards (Sodexo/etc.)"
];

const COMPLIANCE_DOCS = [
  { id: "fssai", label: "FSSAI License" },
  { id: "halal", label: "Halal Audit (Meat Dept)" },
  { id: "trade", label: "Municipal Trade License" },
  { id: "shop", label: "Shop & Establishment Act" },
  { id: "gst", label: "GST Certificate" },
  { id: "owner_id", label: "Owner Identity Proof" },
];

export default function GroceryProfilePage() {
  const [activeTab, setActiveTab] = useState("details");
  const [searchDept, setSearchDept] = useState("");

  const filteredDepts = DEPARTMENTS.filter(d => d.toLowerCase().includes(searchDept.toLowerCase()));

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline tracking-tight text-foreground">Grocery Store Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your supermarket's inventory departments, logistics, and verification status.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-2xl px-8 font-black shadow-lg shadow-emerald-200 h-12 text-white">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-card border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="details" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-emerald-600 data-[state=active]:text-white transition-all">Basic Info</TabsTrigger>
          <TabsTrigger value="departments" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Departments</TabsTrigger>
          <TabsTrigger value="logistics" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Logistics & Payments</TabsTrigger>
          <TabsTrigger value="documents" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Documents</TabsTrigger>
          <TabsTrigger value="branding" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Media & Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <Info className="h-5 w-5 text-emerald-600" /> Core Details
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Store Name</Label>
                  <Input placeholder="e.g., Green Garden Hypermarket" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Store Category</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hyper">Hypermarket</SelectItem>
                      <SelectItem value="super">Supermarket</SelectItem>
                      <SelectItem value="mini">Mini-Mart</SelectItem>
                      <SelectItem value="organic">Specialty / Organic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Year Established</Label>
                  <Input placeholder="e.g., 2005" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Store Tagline</Label>
                  <Input placeholder="e.g., Freshness Guaranteed, Halal Always" className="h-12 rounded-2xl bg-muted border-none font-medium" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">About Store</Label>
                  <Textarea placeholder="Detail your store's mission, fresh produce standards, and community focus..." className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium resize-none focus:ring-2 focus:ring-emerald-600/20" />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Business Highlights</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {HIGHLIGHTS.map((item) => (
                      <div key={item} className="flex items-center space-x-3 bg-muted p-3 rounded-xl hover:bg-muted transition-colors cursor-pointer">
                        <Checkbox id={`h-${item}`} />
                        <label htmlFor={`h-${item}`} className="text-xs font-bold text-foreground leading-none cursor-pointer">{item}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <MapPin className="h-5 w-5 text-emerald-600" /> Location & Timing
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Full Address</Label>
                  <Input placeholder="Store number, complex, street..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Landmark</Label>
                  <Input placeholder="e.g., Opposite Central Park" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">City</Label>
                  <Input placeholder="e.g., Mumbai" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Pincode</Label>
                  <Input placeholder="e.g., 400001" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Operating Timings</Label>
                  <div className="space-y-3">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                      <div key={day} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-muted rounded-xl gap-4">
                        <span className="font-bold text-xs text-muted-foreground min-w-[100px] uppercase tracking-wider">{day}</span>
                        <div className="flex items-center gap-3">
                          <Input type="time" defaultValue="09:00" className="w-32 h-9 rounded-lg bg-card border-none shadow-sm text-xs font-bold" />
                          <span className="text-[10px] font-black text-muted-foreground">TO</span>
                          <Input type="time" defaultValue="22:00" className="w-32 h-9 rounded-lg bg-card border-none shadow-sm text-xs font-bold" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="departments" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <Boxes className="h-5 w-5 text-emerald-600" /> Active Departments
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Select all departments available in your store to help customers find you.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="space-y-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search departments (e.g. Dairy, Fruits)..." 
                    className="pl-10 h-12 rounded-2xl bg-muted border-none font-medium"
                    value={searchDept}
                    onChange={(e) => setSearchDept(e.target.value)}
                  />
                </div>
                <ScrollArea className="h-[400px] rounded-2xl bg-muted/50 p-6 border border-border shadow-inner">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredDepts.map((d) => (
                      <div key={d} className="flex items-center space-x-3 p-3 bg-card rounded-xl shadow-sm border border-transparent hover:border-emerald-600/20 transition-all cursor-pointer group">
                        <Checkbox id={`dept-${d}`} className="rounded-md border-border group-hover:border-emerald-600" />
                        <label htmlFor={`dept-${d}`} className="text-xs font-bold text-foreground cursor-pointer truncate">{d}</label>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="logistics" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <Truck className="h-5 w-5 text-emerald-600" /> Delivery & Pickup
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-10">
              <div className="space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Fulfillment Options</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {DELIVERY_OPTIONS.map((opt) => (
                    <div key={opt} className="flex items-center space-x-3 bg-muted p-3 rounded-xl hover:bg-muted transition-colors cursor-pointer">
                      <Checkbox id={`del-${opt}`} />
                      <label htmlFor={`del-${opt}`} className="text-xs font-bold text-foreground leading-none cursor-pointer">{opt}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Min Order Value (₹)</Label>
                  <Input placeholder="e.g., 500" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Base Delivery Fee (₹)</Label>
                  <Input placeholder="e.g., 40" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Free Delivery Threshold (₹)</Label>
                  <Input placeholder="e.g., 1500" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Delivery Radius (km)</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">Within 2 km</SelectItem>
                      <SelectItem value="5">Within 5 km</SelectItem>
                      <SelectItem value="10">Within 10 km</SelectItem>
                      <SelectItem value="city">City-wide</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <Wallet className="h-5 w-5 text-emerald-600" /> Payments
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {PAYMENT_METHODS.map((method) => (
                  <div key={method} className="flex items-center space-x-3 bg-muted p-3 rounded-xl hover:bg-muted transition-colors cursor-pointer">
                    <Checkbox id={`p-${method}`} />
                    <label htmlFor={`p-${method}`} className="text-xs font-bold text-foreground leading-none cursor-pointer">{method}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </TabsContent>

        {/* Tab 4: Documents */}
        <TabsContent value="documents" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <ShieldCheck className="h-5 w-5 text-emerald-600" /> Compliance & Licenses
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Upload your certifications to build consumer trust and gain verification badges.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {COMPLIANCE_DOCS.map((doc) => (
                  <div key={doc.id} className="space-y-3">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">{doc.label}</Label>
                    <div className="p-6 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-3 bg-muted/50 hover:bg-card transition-colors cursor-pointer group">
                      <div className="h-10 w-10 bg-card rounded-full flex items-center justify-center text-muted-foreground group-hover:text-emerald-600 transition-colors shadow-sm">
                        <Upload className="h-5 w-5" />
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-black uppercase text-emerald-600 group-hover:underline">Upload file</p>
                        <p className="text-[9px] text-muted-foreground mt-1">No file chosen</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </TabsContent>

        {/* Tab 5: Branding */}
        <TabsContent value="branding" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <Smartphone className="h-5 w-5 text-emerald-600" /> Visual Identity
              </h2>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Store Logo</Label>
                  <div className="flex items-center gap-8">
                    <div className="h-32 w-32 rounded-3xl bg-muted border-2 border-dashed border-border flex items-center justify-center text-muted-foreground overflow-hidden relative group">
                      <Camera className="h-8 w-8 group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="rounded-xl font-black text-[10px] h-9 border-2 uppercase tracking-tighter">Choose Logo</Button>
                      <p className="text-[10px] font-bold text-muted-foreground leading-tight">1:1 Ratio<br />Max 2MB</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Store Banner / Cover</Label>
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
                <Plus className="h-5 w-5 text-emerald-600" /> Multi-Media Gallery
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Add photos of your aisles, checkout, and exterior to attract customers.</p>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group border border-border shadow-sm">
                    <img src={`https://picsum.photos/seed/grocery-img-${i}/400/400`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="icon" variant="destructive" className="h-8 w-8 rounded-xl"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
                <button className="aspect-square rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 bg-muted hover:bg-card hover:border-emerald-600/40 transition-all text-muted-foreground hover:text-emerald-600">
                  <Plus className="h-6 w-6" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Add Photo</span>
                </button>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <Card className="rounded-[2.5rem] border-none shadow-xl bg-zinc-900 text-white p-10 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <CheckCircle2 className="h-32 w-32" />
              </div>
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-black font-headline">Store Compliance Declaration</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-3xl">
                  By publishing this profile, you declare that all grocery products sold as "Halal" are sourced from verified suppliers. You take full responsibility for the accuracy of inventory labels and hygiene standards.
                </p>
              </div>
              <div className="flex items-center space-x-4 bg-card/5 p-4 rounded-2xl border border-white/10 relative z-10">
                <Checkbox id="final-declaration" className="border-white/30" />
                <label htmlFor="final-declaration" className="text-sm font-bold text-white/80 cursor-pointer">I confirm that all provided data is accurate.</label>
              </div>
              <Button className="w-full h-16 rounded-[1.5rem] bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xl shadow-2xl relative z-10">
                Submit & Go Live
              </Button>
            </Card>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
