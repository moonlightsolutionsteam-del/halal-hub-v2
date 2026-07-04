
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
  MapPin, Clock, Phone, Globe, Camera, 
  Upload, Trash2, Plus, CheckCircle2, 
  Info, Save, ShieldCheck, Truck, ShoppingBag,
  Beef, Layers, Smartphone, Wallet,
  Mail, Calendar, FileText, AlertCircle,
  Video, Image as ImageIcon, GripVertical
} from "lucide-react";

const DELIVERY_OPTIONS = [
  "In-store Pickup", "Local Delivery", "Hyperlocal Delivery (e.g. Swiggy/Zomato)", "Statewide Shipping", "National Shipping"
];

const PAYMENT_METHODS = [
  "Cash", "UPI", "Credit/Debit Cards", "Wallets"
];

const MEAT_TYPES = [
  "Chicken", "Mutton (Goat)", "Lamb", "Beef", "Buffalo", "Seafood", "Duck", "Turkey", "Eggs"
];

const COMPLIANCE_DOCS = [
  { id: "halal", label: "Halal Certificate" },
  { id: "fssai", label: "FSSAI Certificate" },
  { id: "trade", label: "Trade / Municipal License" },
  { id: "shop", label: "Shop & Establishment License" },
  { id: "id", label: "Owner ID Proof" },
  { id: "address", label: "Address Proof" },
];

export default function ButcherProfilePage() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline tracking-tight text-foreground">Butcher Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your shop's traceability, documents, and branding.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-primary hover:bg-primary/90 rounded-2xl px-8 font-black shadow-lg shadow-primary/20 h-12 text-white">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-card border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="details" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Details</TabsTrigger>
          <TabsTrigger value="documents" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Documents & Sourcing</TabsTrigger>
          <TabsTrigger value="branding" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Branding</TabsTrigger>
        </TabsList>

        {/* Tab 1: Details */}
        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <Info className="h-5 w-5 text-primary" /> Basic Information
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Update your shop's name, description, and essential information.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Business Name</Label>
                  <Input placeholder="e.g., Al-Naseeb Meats" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Business Type</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail Butcher</SelectItem>
                      <SelectItem value="wholesale">Wholesale Supplier</SelectItem>
                      <SelectItem value="farm">Farm Direct</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Year Established</Label>
                  <Input placeholder="e.g., 1995" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">About Business</Label>
                  <Textarea placeholder="Tell customers what makes your business special..." className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium resize-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <Phone className="h-5 w-5 text-primary" /> Contact Details
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Owner Name</Label>
                  <Input placeholder="Enter the owner's name" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                  <Input placeholder="+91 98765 43210" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">WhatsApp Number</Label>
                  <Input placeholder="+91 98765 43210" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Email Address</Label>
                  <Input type="email" placeholder="contact@example.com" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <MapPin className="h-5 w-5 text-primary" /> Location
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Full Address</Label>
                  <Input placeholder="e.g., 16, Gali Kababian, Jama Masjid" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Area / City</Label>
                  <Input placeholder="e.g., Old Delhi" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Pincode</Label>
                  <Input placeholder="e.g., 110006" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Google Map Embed URL</Label>
                  <Input placeholder="Paste GMap Embed URL" className="h-12 rounded-2xl bg-muted border-none font-medium" />
                  <div className="aspect-video w-full rounded-[2rem] bg-muted flex items-center justify-center text-muted-foreground font-bold text-xs uppercase tracking-[0.2em] border-2 border-dashed border-border mt-4">
                    Map preview will appear here
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <Truck className="h-5 w-5 text-primary" /> Delivery & Ordering
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-8">
              <div className="space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Delivery Options</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {DELIVERY_OPTIONS.map((opt) => (
                    <div key={opt} className="flex items-center space-x-3 bg-muted p-3 rounded-xl hover:bg-muted transition-colors">
                      <Checkbox id={opt} />
                      <label htmlFor={opt} className="text-xs font-bold text-foreground leading-none">{opt}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Minimum Order (₹)</Label>
                  <Input placeholder="e.g., 300" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Delivery Charges (₹)</Label>
                  <Input placeholder="e.g., 50" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Delivery Timings</Label>
                  <Input placeholder="e.g., 10 AM - 8 PM" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Delivery Radius (km)</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                      <SelectValue placeholder="Select radius" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 km</SelectItem>
                      <SelectItem value="5">5 km</SelectItem>
                      <SelectItem value="10">10 km</SelectItem>
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
                <Clock className="h-5 w-5 text-primary" /> Opening Hours
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="space-y-4">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <div key={day} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-muted rounded-2xl gap-4">
                    <span className="font-black text-sm text-foreground min-w-[100px]">{day}</span>
                    <div className="flex items-center gap-4 flex-1 justify-end">
                      <div className="flex items-center gap-2">
                        <Input type="time" className="w-32 h-10 rounded-xl bg-card border-none shadow-sm font-bold" />
                        <span className="text-xs font-black text-muted-foreground">TO</span>
                        <Input type="time" className="w-32 h-10 rounded-xl bg-card border-none shadow-sm font-bold" />
                      </div>
                      <Badge variant="outline" className="rounded-full bg-emerald-50 text-emerald-600 border-emerald-100 font-black text-[9px] uppercase">Open</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <Wallet className="h-5 w-5 text-primary" /> Payment Methods
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {PAYMENT_METHODS.map((method) => (
                  <div key={method} className="flex items-center space-x-3 bg-muted p-3 rounded-xl hover:bg-muted transition-colors">
                    <Checkbox id={method} />
                    <label htmlFor={method} className="text-xs font-bold text-foreground leading-none">{method}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </TabsContent>

        {/* Tab 2: Documents & Sourcing */}
        <TabsContent value="documents" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <ShieldCheck className="h-5 w-5 text-primary" /> Compliance Documents
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Upload mandatory licenses to get your profile verified and build trust with customers.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {COMPLIANCE_DOCS.map((doc) => (
                  <div key={doc.id} className="space-y-3">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">{doc.label}</Label>
                    <div className="p-6 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-3 bg-muted/50 hover:bg-card transition-colors cursor-pointer group">
                      <div className="h-10 w-10 bg-card rounded-full flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors shadow-sm">
                        <Upload className="h-5 w-5" />
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-black uppercase text-primary group-hover:underline">Upload file</p>
                        <p className="text-[9px] text-muted-foreground mt-1">No file chosen</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <Layers className="h-5 w-5 text-primary" /> Meat Source Transparency
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Add details about your meat suppliers to increase customer trust.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
              <CardHeader className="p-8 border-b bg-muted/50 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-black">Supplier #1</CardTitle>
                  <CardDescription className="font-medium text-xs">Manage supplier info and slaughterhouse proofs.</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 rounded-xl"><Trash2 className="h-5 w-5" /></Button>
              </CardHeader>
              <CardContent className="p-8 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Supplier Name</Label>
                    <Input placeholder="Enter supplier name" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Supplier Location (Optional)</Label>
                    <Input placeholder="e.g., Shivajinagar, Bangalore" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Meat Types Supplied</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {MEAT_TYPES.map((m) => (
                        <div key={m} className="flex items-center space-x-3 bg-muted p-3 rounded-xl">
                          <Checkbox id={`sup-${m}`} />
                          <label htmlFor={`sup-${m}`} className="text-xs font-bold text-foreground leading-none">{m}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Supplier Phone (Optional)</Label>
                    <Input placeholder="Phone Number" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Supplier Email (Optional)</Label>
                    <Input placeholder="Email Address" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Upload Slaughterhouse / Supplier Proof (Optional)</Label>
                    <div className="p-8 border-2 border-dashed border-border rounded-[2rem] flex flex-col items-center justify-center gap-3 bg-muted/50">
                      <div className="h-12 w-12 bg-card rounded-2xl flex items-center justify-center text-primary shadow-sm">
                        <Upload className="h-6 w-6" />
                      </div>
                      <p className="text-xs font-bold text-muted-foreground">Upload invoice, bill, or screenshot (JPG, PNG, PDF)</p>
                      <p className="text-[10px] text-muted-foreground">No file chosen</p>
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Notes (Optional)</Label>
                    <Textarea placeholder="Add any additional comments about this supplier..." className="h-24 rounded-2xl bg-muted border-none p-4 resize-none" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-8 border-t bg-muted/50 justify-center">
                <Button variant="outline" className="rounded-2xl border-2 font-black uppercase text-[10px] tracking-widest h-12 px-8">
                  <Plus className="mr-2 h-4 w-4" /> Add Another Supplier
                </Button>
              </CardFooter>
            </Card>
          </section>

          <section className="space-y-6">
            <Card className="rounded-[2.5rem] border-none shadow-xl bg-zinc-900 text-white p-10 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <CheckCircle2 className="h-32 w-32" />
              </div>
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-black font-headline">Vendor Declaration</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-3xl">
                  Please confirm the accuracy of the information provided. By checking this box, you take full responsibility for the accuracy of all submitted details and documents.
                </p>
              </div>
              
              <div className="flex items-center space-x-4 bg-card/5 p-6 rounded-2xl border border-white/10 hover:bg-card/10 transition-colors cursor-pointer group relative z-10">
                <Checkbox id="declaration" className="border-white/30 h-6 w-6 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                <label htmlFor="declaration" className="text-sm font-bold text-white/80 cursor-pointer">I declare that all information provided is correct.</label>
              </div>

              <Button className="w-full h-16 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white font-black text-xl shadow-2xl transition-transform active:scale-[0.98]">
                Submit & Accept Disclaimer
              </Button>
            </Card>
          </section>
        </TabsContent>

        {/* Tab 3: Branding */}
        <TabsContent value="branding" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <Smartphone className="h-5 w-5 text-primary" /> Branding
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Upload your shop's logo and a cover photo.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Shop Logo</Label>
                  <div className="flex items-center gap-8">
                    <div className="h-32 w-32 rounded-3xl bg-muted border-2 border-dashed border-border flex items-center justify-center text-muted-foreground overflow-hidden relative group">
                      <Camera className="h-8 w-8 group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="rounded-xl font-black text-[10px] h-9 border-2 uppercase tracking-tighter">Upload Logo</Button>
                      <p className="text-[10px] font-bold text-muted-foreground leading-tight">PNG, JPG (1:1)<br />Max 2MB</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Cover Photo</Label>
                  <div className="aspect-video w-full rounded-[2rem] bg-muted border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 text-muted-foreground relative group overflow-hidden">
                    <ImageIcon className="h-8 w-8 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Upload Cover</span>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="secondary" className="rounded-full font-black text-xs h-10 px-6 uppercase tracking-widest">Select Image</Button>
                    </div>
                  </div>
                  <p className="text-[10px] font-bold text-muted-foreground text-center uppercase tracking-tighter">Recommended: 16:9 ratio</p>
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <Layers className="h-5 w-5 text-primary" /> Manage Gallery
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Drag to reorder images. The first image will be your primary cover photo.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[
                  { id: 1, label: "Fresh mutton cuts", img: "https://picsum.photos/seed/meat1/400/400" },
                  { id: 2, label: "Clean shop interior", img: "https://picsum.photos/seed/meat2/400/400" },
                  { id: 3, label: "Chicken selection", img: "https://picsum.photos/seed/meat3/400/400" },
                ].map((item) => (
                  <div key={item.id} className="relative aspect-square rounded-2xl overflow-hidden group cursor-grab active:cursor-grabbing border border-border shadow-sm">
                    <img src={item.img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                      <div className="flex justify-end gap-1">
                        <Button size="icon" className="h-7 w-7 rounded-lg bg-card/20 backdrop-blur-md hover:bg-card/40 text-white border-none"><Trash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                      <p className="text-[9px] font-bold text-white leading-tight truncate">{item.label}</p>
                    </div>
                    <div className="absolute top-2 left-2 h-6 w-6 rounded-lg bg-card/80 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <GripVertical className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                ))}
                <button className="aspect-square rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2 bg-muted hover:bg-card hover:border-primary/40 transition-all text-muted-foreground hover:text-primary">
                  <Plus className="h-6 w-6" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Add More</span>
                </button>
              </div>
            </Card>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-black text-sm text-foreground">Shop Exterior</h3>
                <p className="text-[10px] text-muted-foreground font-medium">Photos of your storefront.</p>
              </div>
              <div className="p-8 border-2 border-dashed border-border rounded-[2rem] bg-card flex flex-col items-center justify-center gap-2 hover:border-primary/40 transition-colors cursor-pointer group">
                <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-bold text-muted-foreground">Click or drag files</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-black text-sm text-foreground">Shop Interior</h3>
                <p className="text-[10px] text-muted-foreground font-medium">Photos of the inside of your shop.</p>
              </div>
              <div className="p-8 border-2 border-dashed border-border rounded-[2rem] bg-card flex flex-col items-center justify-center gap-2 hover:border-primary/40 transition-colors cursor-pointer group">
                <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-bold text-muted-foreground">Click or drag files</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="font-black text-sm text-foreground">Meat Display</h3>
                <p className="text-[10px] text-muted-foreground font-medium">Showcase your fresh meat display.</p>
              </div>
              <div className="p-8 border-2 border-dashed border-border rounded-[2rem] bg-card flex flex-col items-center justify-center gap-2 hover:border-primary/40 transition-colors cursor-pointer group">
                <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-bold text-muted-foreground">Click or drag files</span>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-foreground">Optional Uploads</h2>
              <p className="text-sm text-muted-foreground font-medium">Providing these can increase customer trust and transparency.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { title: "Cutting Area", desc: "Show cleanliness" },
                { title: "Cold Storage", desc: "Refrigeration photos" },
                { title: "Product Photos", desc: "Cuts & marinades" },
                { title: "Shop Videos", desc: "Quick shop tour", icon: Video },
              ].map((item) => (
                <div key={item.title} className="space-y-3">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">{item.title}</Label>
                  <div className="p-6 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 bg-muted/50 hover:bg-card transition-all cursor-pointer group">
                    {item.icon ? <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary" /> : <Upload className="h-5 w-5 text-muted-foreground group-hover:text-primary" />}
                    <span className="text-[9px] font-bold text-muted-foreground group-hover:text-primary">Upload</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
