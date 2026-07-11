
"use client"

import * as React from "react";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
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
import { Separator } from "@/components/ui/separator";
import { 
  Building2, MapPin, Clock, Phone, 
  Globe, Camera, Upload, Trash2,
  Plus, CheckCircle2, AlertCircle,
  MessageSquare, Save, Info, Search,
  UtensilsCrossed, Smartphone, Receipt,
  Share2, ShieldCheck, CreditCard,
  Wifi, Bike, Car, Accessibility,
  Baby, Dog, Monitor, User,
  Layers, Package, Beef, Droplets
} from "lucide-react";
import Image from "next/image";

const CUISINES = [
  "Biryani", "BBQ", "Mughlai", "Italian", "Arabian", "European", "Pizza", "Chinese", "Asian", "Kerala", "American", "South Indian", "Tibetan", "Finger Food", "Burger", "Ice Cream", "Mithai", "Andhra", "Healthy Food", "Desserts", "Beverages", "Bengali", "Chettinad", "Lebanese", "Mediterranean", "Modern Indian", "Middle Eastern", "Rolls", "Kebab", "Juices", "Seafood", "Sushi", "Korean", "Mangalorean", "Thai", "Assamese", "Charcoal Chicken", "Spanish", "Tamil", "Mexican", "Maharashtrian", "Rajasthani", "Lucknowi", "Vietnamese", "Bohri", "Japanese", "Goan", "South American", "Kashmiri", "Naga", "Konkan", "Oriya", "Momos", "Hyderabadi", "Bihari", "Turkish", "North Eastern", "Awadhi", "African", "Gujarati", "Burmese", "Malaysian", "Singaporean", "Coffee", "Parsi", "Iranian", "Nepalese", "Afghan", "Bubble Tea", "Greek", "Wraps", "Mongolian", "Indonesian", "Paan", "Sindhi", "Indian", "Pan Asian", "Raw Meats", "Grill", "Cantonese", "Jewish", "Sri Lankan", "Vegan", "Other"
];

const MEAT_TYPES = [
  "Chicken", "Mutton (Goat)", "Beef", "Buffalo", "Fish & Seafood", "Lamb", "Duck", "Turkey", "Eggs", "Vegetarian Only", "Vegan Only", "Other"
];

const HIGHLIGHTS = [
  "Family Friendly", "Quick Bites", "Budget Meals", "Late Night", "Student Friendly", "Premium Dining"
];

const SERVICE_OPTIONS = [
  "Dine-In", "Takeaway", "Delivery", "Drive-Thru", "Outdoor Seating", "Rooftop Seating", "Family Seating", "Private Dining", "Buffet Available"
];

const AMENITIES = [
  "Air Conditioned", "Parking Available", "Bike Parking", "Car Parking", "Wheelchair Accessible", "Prayer Space", "Washroom Facility", "Wi-Fi Available", "Kids Friendly", "Pet Friendly", "CCTV Surveillance", "Waiting Area"
];

const TECH_OPTIONS = [
  "Pre-Order Facility", "WhatsApp Ordering", "Online Ordering", "QR Menu", "Digital Table Ordering", "Reservation System", "Contactless Payment", "Cash on Delivery"
];

const PAYMENT_METHODS = [
  "UPI", "Cash", "Credit/Debit Cards", "Net Banking", "Wallets (Paytm/PhonePe/etc.)"
];

export default function VendorProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = React.useState("details");
  const [searchCuisine, setSearchCuisine] = React.useState("");

  // Core business fields — pre-populated from Supabase
  const [bizId, setBizId] = React.useState<string | null>(null)
  const [bizName, setBizName] = React.useState("")
  const [bizPhone, setBizPhone] = React.useState("")
  const [bizTagline, setBizTagline] = React.useState("")
  const [bizDescription, setBizDescription] = React.useState("")
  const [bizCuisine, setBizCuisine] = React.useState("")
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    if (!user?.id) return
    const supabase = createClient()
    ;(supabase as any)
      .from("businesses")
      .select("id, name, phone, description, primary_cuisine")
      .eq("owner_id", user.id)
      .limit(1)
      .then(({ data }: { data: any[] | null }) => {
        const biz = data?.[0]
        if (!biz) return
        setBizId(biz.id)
        setBizName(biz.name ?? "")
        setBizPhone(biz.phone ?? "")
        setBizDescription(biz.description ?? "")
        setBizCuisine(biz.primary_cuisine ?? "")
      })
  }, [user?.id])

  const handleSave = async () => {
    if (!bizId) {
      toast({ title: "No business found", description: "Register your business first.", variant: "destructive" })
      return
    }
    setSaving(true)
    const supabase = createClient()
    const { error } = await (supabase as any)
      .from("businesses")
      .update({
        name: bizName || undefined,
        phone: bizPhone || undefined,
        description: bizDescription || undefined,
        primary_cuisine: bizCuisine || undefined,
      })
      .eq("id", bizId)
    setSaving(false)
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" })
    } else {
      toast({ title: "Profile saved!", description: "Your business listing has been updated." })
    }
  }

  const filteredCuisines = CUISINES.filter(c => c.toLowerCase().includes(searchCuisine.toLowerCase()));

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-7xl pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline tracking-tight">Edit Restaurant</h1>
          <p className="text-muted-foreground font-medium">Manage your restaurant's profile, documents, and gallery.</p>
        </div>
        <div className="flex gap-3">
          <Button
            className="bg-primary hover:bg-primary/90 rounded-2xl px-8 font-black shadow-lg shadow-primary/20 h-12 text-white"
            onClick={handleSave}
            disabled={saving}
          >
            <Save className="mr-2 h-4 w-4" /> {saving ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-card border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="details" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-primary data-[state=active]:text-white">Details</TabsTrigger>
          <TabsTrigger value="sourcing" className="rounded-xl px-8 font-bold text-sm h-full">Sourcing & Traceability</TabsTrigger>
          <TabsTrigger value="documents" className="rounded-xl px-8 font-bold text-sm h-full">Documents</TabsTrigger>
          <TabsTrigger value="gallery" className="rounded-xl px-8 font-bold text-sm h-full">Gallery</TabsTrigger>
          <TabsTrigger value="branches" className="rounded-xl px-8 font-bold text-sm h-full">Branches</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" /> Basic Information
              </h2>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Business Name</Label>
                  <Input value={bizName} onChange={e => setBizName(e.target.value)} placeholder="e.g., Karim's Restaurant" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Alternate / Brand Name (Optional)</Label>
                  <Input placeholder="e.g., Karim's Hotel" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Contact Number</Label>
                  <Input value={bizPhone} onChange={e => setBizPhone(e.target.value)} placeholder="+91 11 2326 9880" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">WhatsApp Number</Label>
                  <Input placeholder="+91 98765 43210" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Short Description (Tagline)</Label>
                  <Input value={bizTagline} onChange={e => setBizTagline(e.target.value)} placeholder="e.g., The Original from Old Delhi since 1913" className="h-12 rounded-2xl bg-muted border-none font-medium" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">About Your Business</Label>
                  <Textarea value={bizDescription} onChange={e => setBizDescription(e.target.value)} placeholder="Tell customers what makes your business special..." className="min-h-[150px] rounded-2xl bg-muted border-none p-4 font-medium resize-none focus:ring-2 focus:ring-primary/20" />
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <UtensilsCrossed className="h-5 w-5 text-primary" /> Cuisine & Menu
              </h2>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Food Category</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual Dining</SelectItem>
                      <SelectItem value="fine">Fine Dining</SelectItem>
                      <SelectItem value="cafe">Cafe</SelectItem>
                      <SelectItem value="fast">Quick Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Primary Cuisine</Label>
                  <Input value={bizCuisine} onChange={e => setBizCuisine(e.target.value)} placeholder="e.g., Mughlai" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">What types of meat do you serve?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {MEAT_TYPES.map((m) => (
                      <div key={m} className="flex items-center space-x-3 bg-muted p-3 rounded-xl hover:bg-muted transition-colors">
                        <Checkbox id={`m-${m}`} />
                        <label htmlFor={`m-${m}`} className="text-xs font-bold text-foreground leading-none">{m}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="sourcing" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Beef className="h-5 w-5 text-primary" /> Meat Source Transparency
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Add details about your meat suppliers to get the "Source Verified" badge.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
              <CardHeader className="p-8 border-b bg-muted/50 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-black">Supplier Entry #1</CardTitle>
                  <CardDescription className="font-medium text-xs">Primary meat or poultry source.</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 rounded-xl"><Trash2 className="h-5 w-5" /></Button>
              </CardHeader>
              <CardContent className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Supplier / Brand Name</Label>
                    <Input placeholder="Enter name" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Location (City/Area)</Label>
                    <Input placeholder="e.g., Delhi" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Items Supplied</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {MEAT_TYPES.slice(0, 6).map((m) => (
                        <div key={m} className="flex items-center space-x-3 bg-muted p-3 rounded-xl">
                          <Checkbox id={`sup-${m}`} />
                          <label htmlFor={`sup-${m}`} className="text-xs font-bold text-foreground leading-none">{m}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Upload Purchase Proof / Slaughterhouse Certificate</Label>
                    <div className="p-8 border-2 border-dashed border-border rounded-[2rem] flex flex-col items-center justify-center gap-3 bg-muted/50 hover:bg-card transition-colors cursor-pointer group">
                      <div className="h-12 w-12 bg-card rounded-2xl flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors shadow-sm">
                        <Upload className="h-6 w-6" />
                      </div>
                      <p className="text-xs font-bold text-muted-foreground">Click or drag image/PDF</p>
                    </div>
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
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Droplets className="h-5 w-5 text-primary" /> Oil & Dairy Sourcing
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Cooking Oil Used</Label>
                  <Input placeholder="e.g., Saffola, Fortune" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Dairy Supplier</Label>
                  <Input placeholder="e.g., Amul, Mother Dairy" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <Card className="rounded-[2.5rem] border-none shadow-xl bg-zinc-900 text-white p-10 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck className="h-32 w-32" />
              </div>
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-black font-headline">Transparency Declaration</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-3xl">
                  By submitting these details, you confirm that all meat and ingredients served in your restaurant are sourced as stated. False information regarding halal supply chains will lead to immediate delisting.
                </p>
              </div>
              <div className="flex items-center space-x-4 bg-card/5 p-4 rounded-2xl border border-white/10 relative z-10">
                <Checkbox id="decl-trans" className="border-white/30" />
                <label htmlFor="decl-trans" className="text-sm font-bold text-white/80 cursor-pointer">I declare that all sourcing info is accurate.</label>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="documents" className="animate-in fade-in duration-500">
          <Card className="rounded-[2.5rem] border-none shadow-sm p-12 text-center bg-card space-y-6">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-foreground">Certificate Vault</h3>
              <p className="text-muted-foreground font-medium max-w-sm mx-auto">Upload your Halal certificates, hygiene ratings, and business licenses here.</p>
            </div>
            <Button variant="outline" className="rounded-2xl h-12 px-8 border-2 font-black uppercase text-xs tracking-widest">
              <Upload className="mr-2 h-4 w-4" /> Manage Certificates
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="animate-in fade-in duration-500">
          <Card className="rounded-[2.5rem] border-none shadow-sm p-12 text-center bg-card space-y-6">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <Camera className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-foreground">Visual Showcase</h3>
              <p className="text-muted-foreground font-medium max-w-sm mx-auto">Update your menu photos, interior shots, and logo to attract customers.</p>
            </div>
            <Button variant="outline" className="rounded-2xl h-12 px-8 border-2 font-black uppercase text-xs tracking-widest">
              <Plus className="mr-2 h-4 w-4" /> Add Media
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="branches" className="animate-in fade-in duration-500">
          <Card className="rounded-[2.5rem] border-none shadow-sm p-12 text-center bg-card space-y-6">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <Building2 className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-foreground">Branch Management</h3>
              <p className="text-muted-foreground font-medium max-w-sm mx-auto">List multiple outlets and manage their individual details from one dashboard.</p>
            </div>
            <Button variant="outline" className="rounded-2xl h-12 px-8 border-2 font-black uppercase text-xs tracking-widest">
              <Plus className="mr-2 h-4 w-4" /> Add New Branch
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
