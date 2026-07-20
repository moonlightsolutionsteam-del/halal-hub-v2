// @ts-nocheck

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
import { Separator } from "@/components/ui/separator";
import {
  Building2, Camera, Upload, Trash2,
  Plus, Save, Info, Search,
  UtensilsCrossed, ShieldCheck,
  Beef, Droplets, Star, Wifi,
  CreditCard, Loader2, X, FileText,
  ImagePlus, CheckCircle2, Sparkles
} from "lucide-react";
import Image from "next/image";

const CUISINES = [
  "Biryani", "BBQ", "Mughlai", "Italian", "Arabian", "European", "Pizza", "Chinese", "Asian", "Kerala",
  "American", "South Indian", "Tibetan", "Finger Food", "Burger", "Ice Cream", "Mithai", "Andhra",
  "Healthy Food", "Desserts", "Beverages", "Bengali", "Chettinad", "Lebanese", "Mediterranean",
  "Modern Indian", "Middle Eastern", "Rolls", "Kebab", "Juices", "Seafood", "Sushi", "Korean",
  "Mangalorean", "Thai", "Assamese", "Charcoal Chicken", "Spanish", "Tamil", "Mexican",
  "Maharashtrian", "Rajasthani", "Lucknowi", "Vietnamese", "Bohri", "Japanese", "Goan",
  "South American", "Kashmiri", "Naga", "Konkan", "Oriya", "Momos", "Hyderabadi", "Bihari",
  "Turkish", "North Eastern", "Awadhi", "African", "Gujarati", "Burmese", "Malaysian",
  "Singaporean", "Coffee", "Parsi", "Iranian", "Nepalese", "Afghan", "Bubble Tea", "Greek",
  "Wraps", "Mongolian", "Indonesian", "Paan", "Sindhi", "Indian", "Pan Asian", "Raw Meats",
  "Grill", "Cantonese", "Jewish", "Sri Lankan", "Vegan", "Other"
];

const MEAT_TYPES = [
  "Chicken", "Mutton (Goat)", "Beef", "Buffalo", "Fish & Seafood", "Lamb", "Duck", "Turkey",
  "Eggs", "Vegetarian Only", "Vegan Only", "Other"
];

const HIGHLIGHTS = [
  "Family Friendly", "Quick Bites", "Budget Meals", "Late Night", "Student Friendly", "Premium Dining"
];

const SERVICE_OPTIONS = [
  "Dine-In", "Takeaway", "Delivery", "Drive-Thru", "Outdoor Seating", "Rooftop Seating",
  "Family Seating", "Private Dining", "Buffet Available"
];

const AMENITIES = [
  "Air Conditioned", "Parking Available", "Bike Parking", "Car Parking", "Wheelchair Accessible",
  "Prayer Space", "Washroom Facility", "Wi-Fi Available", "Kids Friendly", "Pet Friendly",
  "CCTV Surveillance", "Waiting Area"
];

const PAYMENT_METHODS = [
  "UPI", "Cash", "Credit/Debit Cards", "Net Banking", "Wallets (Paytm/PhonePe/etc.)"
];

function toggleSet(s: Set<string>, val: string): Set<string> {
  const next = new Set(s);
  if (next.has(val)) next.delete(val);
  else next.add(val);
  return next;
}

function CheckboxGrid({
  items,
  selected,
  onToggle,
  cols = 3,
}: {
  items: string[];
  selected: Set<string>;
  onToggle: (val: string) => void;
  cols?: number;
}) {
  return (
    <div className={`grid gap-3 ${cols === 2 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3"}`}>
      {items.map((item) => (
        <div
          key={item}
          onClick={() => onToggle(item)}
          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
            selected.has(item)
              ? "bg-primary/10 border-primary/30 text-primary"
              : "bg-muted border-transparent hover:border-muted-foreground/20"
          }`}
        >
          <Checkbox
            id={`cb-${item}`}
            checked={selected.has(item)}
            onCheckedChange={() => onToggle(item)}
            onClick={(e) => e.stopPropagation()}
          />
          <label htmlFor={`cb-${item}`} className="text-xs font-bold leading-none cursor-pointer select-none">
            {item}
          </label>
        </div>
      ))}
    </div>
  );
}

function ImageUploadGrid({
  images,
  uploading,
  onUpload,
  onRemove,
  label,
  accept = "image/*",
  multiple = true,
}: {
  images: string[];
  uploading: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (url: string) => void;
  label: string;
  accept?: string;
  multiple?: boolean;
}) {
  const ref = React.useRef<HTMLInputElement>(null);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground">{label}</p>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl border-2 font-bold gap-1.5 h-8 text-xs"
          onClick={() => ref.current?.click()}
          disabled={uploading}
        >
          {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />}
          Upload
        </Button>
        <input ref={ref} type="file" accept={accept} multiple={multiple} className="hidden" onChange={onUpload} />
      </div>
      {images.length > 0 ? (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((url) => (
            <div key={url} className="relative group rounded-2xl overflow-hidden aspect-square bg-muted">
              <Image src={url} alt="" fill className="object-cover" sizes="200px" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  size="icon"
                  variant="destructive"
                  className="h-8 w-8 rounded-full"
                  onClick={() => onRemove(url)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          onClick={() => ref.current?.click()}
          className="border-2 border-dashed border-border rounded-2xl flex items-center justify-center gap-3 p-8 text-muted-foreground hover:border-primary/40 hover:text-primary transition-all cursor-pointer"
        >
          <ImagePlus className="h-5 w-5" />
          <span className="text-sm font-medium">Click to add photos</span>
        </div>
      )}
    </div>
  );
}

export default function VendorProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState("details");
  const [searchCuisine, setSearchCuisine] = React.useState("");

  // Text fields
  const [bizId, setBizId] = React.useState<string | null>(null);
  const [bizName, setBizName] = React.useState("");
  const [bizPhone, setBizPhone] = React.useState("");
  const [bizWhatsapp, setBizWhatsapp] = React.useState("");
  const [bizDescription, setBizDescription] = React.useState("");
  const [bizCuisine, setBizCuisine] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  // Checkbox arrays
  const [selectedMeat, setSelectedMeat] = React.useState<Set<string>>(new Set());
  const [selectedHighlights, setSelectedHighlights] = React.useState<Set<string>>(new Set());
  const [selectedDining, setSelectedDining] = React.useState<Set<string>>(new Set());
  const [selectedAmenities, setSelectedAmenities] = React.useState<Set<string>>(new Set());
  const [selectedPayment, setSelectedPayment] = React.useState<Set<string>>(new Set());

  // Gallery
  const [coverUrl, setCoverUrl] = React.useState("");
  const [logoUrl, setLogoUrl] = React.useState("");
  const [galleryImages, setGalleryImages] = React.useState<string[]>([]);
  const [menuImages, setMenuImages] = React.useState<string[]>([]);
  const [ambienceImages, setAmbienceImages] = React.useState<string[]>([]);
  const [uploadingGallery, setUploadingGallery] = React.useState<string | null>(null);

  // Documents
  const [halalCertUrl, setHalalCertUrl] = React.useState("");
  const [uploadingDoc, setUploadingDoc] = React.useState(false);

  React.useEffect(() => {
    if (!user?.uid) return;
    const supabase = createClient();
    supabase
      .from("businesses")
      .select(
        "id, name, phone, whatsapp, description, primary_cuisine, selected_meat, selected_highlights, selected_dining, selected_amenities, selected_payment, cover_url, logo_url, images, ambience_images, menu_images, halal_cert_url"
      )
      .eq("owner_id", user.uid)
      .limit(1)
      .then(({ data }: { data: any[] | null }) => {
        const biz = data?.[0];
        if (!biz) return;
        setBizId(biz.id);
        setBizName(biz.name ?? "");
        setBizPhone(biz.phone ?? "");
        setBizWhatsapp(biz.whatsapp ?? "");
        setBizDescription(biz.description ?? "");
        setBizCuisine(biz.primary_cuisine ?? "");
        setSelectedMeat(new Set(biz.selected_meat ?? []));
        setSelectedHighlights(new Set(biz.selected_highlights ?? []));
        setSelectedDining(new Set(biz.selected_dining ?? []));
        setSelectedAmenities(new Set(biz.selected_amenities ?? []));
        setSelectedPayment(new Set(biz.selected_payment ?? []));
        setCoverUrl(biz.cover_url ?? "");
        setLogoUrl(biz.logo_url ?? "");
        setGalleryImages(biz.images ?? []);
        setMenuImages(biz.menu_images ?? []);
        setAmbienceImages(biz.ambience_images ?? []);
        setHalalCertUrl(biz.halal_cert_url ?? "");
      });
  }, [user?.uid]);

  const handleSave = async () => {
    if (!bizId) {
      toast({ title: "No business found", description: "Register your business first.", variant: "destructive" });
      return;
    }
    setSaving(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("businesses")
      .update({
        name: bizName || undefined,
        phone: bizPhone || undefined,
        whatsapp: bizWhatsapp || undefined,
        description: bizDescription || undefined,
        primary_cuisine: bizCuisine || undefined,
        selected_meat: Array.from(selectedMeat),
        selected_highlights: Array.from(selectedHighlights),
        selected_dining: Array.from(selectedDining),
        selected_amenities: Array.from(selectedAmenities),
        selected_payment: Array.from(selectedPayment),
      })
      .eq("id", bizId);
    setSaving(false);
    if (error) {
      toast({ title: "Save failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile saved!", description: "Your business listing has been updated." });
    }
  };

  const uploadToStorage = async (file: File, pathPrefix: string): Promise<string | null> => {
    if (!bizId) return null;
    const supabase = createClient();
    const ext = file.name.split(".").pop() ?? "jpg";
    const filePath = `${bizId}/${pathPrefix}_${Date.now()}.${ext}`;
    const { error } = await supabase.storage
      .from("business-media")
      .upload(filePath, file, { upsert: true, contentType: file.type });
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
      return null;
    }
    const { data } = supabase.storage.from("business-media").getPublicUrl(filePath);
    return data.publicUrl as string;
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !bizId) return;
    setUploadingGallery("cover");
    const url = await uploadToStorage(file, "cover");
    if (url) {
      const supabase = createClient();
      await supabase.from("businesses").update({ cover_url: url }).eq("id", bizId);
      setCoverUrl(url);
      toast({ title: "Cover photo updated!" });
    }
    setUploadingGallery(null);
    e.target.value = "";
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !bizId) return;
    setUploadingGallery("logo");
    const url = await uploadToStorage(file, "logo");
    if (url) {
      const supabase = createClient();
      await supabase.from("businesses").update({ logo_url: url }).eq("id", bizId);
      setLogoUrl(url);
      toast({ title: "Logo updated!" });
    }
    setUploadingGallery(null);
    e.target.value = "";
  };

  const handleGalleryUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "images" | "menu_images" | "ambience_images"
  ) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length || !bizId) return;
    setUploadingGallery(type);
    const supabase = createClient();
    const newUrls: string[] = [];
    for (const file of files) {
      const url = await uploadToStorage(file, type);
      if (url) newUrls.push(url);
    }
    if (newUrls.length) {
      let updated: string[] = [];
      if (type === "images") { updated = [...galleryImages, ...newUrls]; setGalleryImages(updated); }
      else if (type === "menu_images") { updated = [...menuImages, ...newUrls]; setMenuImages(updated); }
      else { updated = [...ambienceImages, ...newUrls]; setAmbienceImages(updated); }
      await supabase.from("businesses").update({ [type]: updated }).eq("id", bizId);
      toast({ title: `${newUrls.length} photo${newUrls.length > 1 ? "s" : ""} uploaded!` });
    }
    setUploadingGallery(null);
    e.target.value = "";
  };

  const removeGalleryImage = async (url: string, type: "images" | "menu_images" | "ambience_images") => {
    if (!bizId) return;
    const supabase = createClient();
    let updated: string[] = [];
    if (type === "images") { updated = galleryImages.filter((u) => u !== url); setGalleryImages(updated); }
    else if (type === "menu_images") { updated = menuImages.filter((u) => u !== url); setMenuImages(updated); }
    else { updated = ambienceImages.filter((u) => u !== url); setAmbienceImages(updated); }
    await supabase.from("businesses").update({ [type]: updated }).eq("id", bizId);
  };

  const handleCertUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !bizId) return;
    setUploadingDoc(true);
    const url = await uploadToStorage(file, "halal-cert");
    if (url) {
      const supabase = createClient();
      await supabase.from("businesses").update({ halal_cert_url: url }).eq("id", bizId);
      setHalalCertUrl(url);
      toast({ title: "Certificate uploaded!" });
    }
    setUploadingDoc(false);
    e.target.value = "";
  };

  const coverInputRef = React.useRef<HTMLInputElement>(null);
  const logoInputRef = React.useRef<HTMLInputElement>(null);
  const certInputRef = React.useRef<HTMLInputElement>(null);

  const filteredCuisines = CUISINES.filter((c) =>
    c.toLowerCase().includes(searchCuisine.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline tracking-tight">Edit Restaurant</h1>
          <p className="text-muted-foreground font-medium">
            Manage your restaurant's profile, documents, and gallery.
          </p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 rounded-2xl px-8 font-black shadow-lg shadow-primary/20 h-12 text-white"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
          {saving ? "Saving…" : "Save Changes"}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-card border rounded-2xl h-14 p-1 shadow-sm w-full overflow-x-auto justify-start">
          <TabsTrigger value="details" className="rounded-xl px-6 font-bold text-sm h-full data-[state=active]:bg-primary data-[state=active]:text-white">
            Details
          </TabsTrigger>
          <TabsTrigger value="sourcing" className="rounded-xl px-6 font-bold text-sm h-full data-[state=active]:bg-primary data-[state=active]:text-white">
            Sourcing
          </TabsTrigger>
          <TabsTrigger value="documents" className="rounded-xl px-6 font-bold text-sm h-full data-[state=active]:bg-primary data-[state=active]:text-white">
            Documents
          </TabsTrigger>
          <TabsTrigger value="gallery" className="rounded-xl px-6 font-bold text-sm h-full data-[state=active]:bg-primary data-[state=active]:text-white">
            Gallery
          </TabsTrigger>
          <TabsTrigger value="branches" className="rounded-xl px-6 font-bold text-sm h-full data-[state=active]:bg-primary data-[state=active]:text-white">
            Branches
          </TabsTrigger>
        </TabsList>

        {/* ── DETAILS TAB ─────────────────────────────────────────────── */}
        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          {/* Basic Information */}
          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" /> Basic Information
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Business Name</Label>
                  <Input
                    value={bizName}
                    onChange={(e) => setBizName(e.target.value)}
                    placeholder="e.g., Karim's Restaurant"
                    className="h-12 rounded-2xl bg-muted border-none font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Contact Number</Label>
                  <Input
                    value={bizPhone}
                    onChange={(e) => setBizPhone(e.target.value)}
                    placeholder="+91 11 2326 9880"
                    className="h-12 rounded-2xl bg-muted border-none font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">WhatsApp Number</Label>
                  <Input
                    value={bizWhatsapp}
                    onChange={(e) => setBizWhatsapp(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="h-12 rounded-2xl bg-muted border-none font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Primary Cuisine</Label>
                  <Input
                    value={bizCuisine}
                    onChange={(e) => setBizCuisine(e.target.value)}
                    placeholder="e.g., Mughlai"
                    className="h-12 rounded-2xl bg-muted border-none font-bold"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">About Your Business</Label>
                  <Textarea
                    value={bizDescription}
                    onChange={(e) => setBizDescription(e.target.value)}
                    placeholder="Tell customers what makes your business special..."
                    className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium resize-none"
                  />
                </div>
              </div>
            </Card>
          </section>

          {/* Cuisine & Meat */}
          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <UtensilsCrossed className="h-5 w-5 text-primary" /> Cuisine & Meat
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-8">
              <div className="space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">What types of meat do you serve?</Label>
                <CheckboxGrid items={MEAT_TYPES} selected={selectedMeat} onToggle={(v) => setSelectedMeat(toggleSet(selectedMeat, v))} cols={2} />
              </div>
            </Card>
          </section>

          {/* Highlights */}
          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> Highlights
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <CheckboxGrid items={HIGHLIGHTS} selected={selectedHighlights} onToggle={(v) => setSelectedHighlights(toggleSet(selectedHighlights, v))} />
            </Card>
          </section>

          {/* Service Options */}
          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Star className="h-5 w-5 text-primary" /> Service Options
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <CheckboxGrid items={SERVICE_OPTIONS} selected={selectedDining} onToggle={(v) => setSelectedDining(toggleSet(selectedDining, v))} />
            </Card>
          </section>

          {/* Amenities */}
          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Wifi className="h-5 w-5 text-primary" /> Amenities
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <CheckboxGrid items={AMENITIES} selected={selectedAmenities} onToggle={(v) => setSelectedAmenities(toggleSet(selectedAmenities, v))} />
            </Card>
          </section>

          {/* Payment Methods */}
          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" /> Payment Methods Accepted
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <CheckboxGrid items={PAYMENT_METHODS} selected={selectedPayment} onToggle={(v) => setSelectedPayment(toggleSet(selectedPayment, v))} />
            </Card>
          </section>

          <div className="flex justify-end pt-4">
            <Button
              className="bg-primary hover:bg-primary/90 rounded-2xl px-10 font-black shadow-lg shadow-primary/20 h-12 text-white"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {saving ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </TabsContent>

        {/* ── SOURCING TAB ────────────────────────────────────────────── */}
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
                <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 rounded-xl">
                  <Trash2 className="h-5 w-5" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 sm:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Supplier / Brand Name</Label>
                    <Input placeholder="Enter name" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Location (City/Area)</Label>
                    <Input placeholder="e.g., Delhi" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-4 block">Items Supplied</Label>
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
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Upload Purchase Proof / Certificate</Label>
                    <div className="p-8 border-2 border-dashed border-border rounded-[2rem] flex flex-col items-center justify-center gap-3 bg-muted/50 hover:bg-card transition-colors cursor-pointer">
                      <div className="h-12 w-12 bg-card rounded-2xl flex items-center justify-center text-muted-foreground shadow-sm">
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
            <h2 className="text-xl font-black flex items-center gap-2">
              <Droplets className="h-5 w-5 text-primary" /> Oil & Dairy Sourcing
            </h2>
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
        </TabsContent>

        {/* ── DOCUMENTS TAB ───────────────────────────────────────────── */}
        <TabsContent value="documents" className="space-y-8 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" /> Halal Certificate
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Upload your HMC, FSSAI, or other halal certification to earn the Verified Halal badge.</p>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              {halalCertUrl ? (
                <div className="flex items-center justify-between p-5 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-emerald-800">Certificate Uploaded</p>
                      <p className="text-xs text-emerald-600 font-medium">Your certificate is under review</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-emerald-200 text-emerald-700 font-bold h-9"
                      onClick={() => window.open(halalCertUrl, "_blank")}
                    >
                      <FileText className="mr-1.5 h-3.5 w-3.5" /> View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-2 font-bold h-9"
                      onClick={() => certInputRef.current?.click()}
                      disabled={uploadingDoc}
                    >
                      {uploadingDoc ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Upload className="mr-1.5 h-3.5 w-3.5" />}
                      Replace
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => certInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-[2rem] flex flex-col items-center justify-center gap-4 p-12 text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all cursor-pointer"
                >
                  {uploadingDoc ? (
                    <Loader2 className="h-10 w-10 animate-spin" />
                  ) : (
                    <div className="h-16 w-16 bg-muted rounded-2xl flex items-center justify-center">
                      <Upload className="h-8 w-8" />
                    </div>
                  )}
                  <div className="text-center">
                    <p className="font-black text-base">{uploadingDoc ? "Uploading…" : "Upload Halal Certificate"}</p>
                    <p className="text-xs font-medium mt-1">PDF, JPG, or PNG · Max 10MB</p>
                  </div>
                </div>
              )}
              <input
                ref={certInputRef}
                type="file"
                accept=".pdf,image/*"
                className="hidden"
                onChange={handleCertUpload}
              />
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" /> Other Documents
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Business license, FSSAI certificate, GST registration, hygiene ratings.</p>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 text-center space-y-4">
              <div className="h-14 w-14 bg-muted rounded-2xl flex items-center justify-center mx-auto text-muted-foreground">
                <FileText className="h-7 w-7" />
              </div>
              <p className="font-bold text-muted-foreground">Document management for FSSAI, GST, and hygiene ratings coming soon.</p>
            </Card>
          </section>
        </TabsContent>

        {/* ── GALLERY TAB ─────────────────────────────────────────────── */}
        <TabsContent value="gallery" className="space-y-8 animate-in fade-in duration-500">
          {/* Cover Photo */}
          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" /> Cover Photo
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-muted mb-4">
                {coverUrl ? (
                  <Image src={coverUrl} alt="Cover" fill className="object-cover" sizes="800px" />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <Camera className="h-12 w-12" />
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="rounded-2xl border-2 font-bold gap-2 flex-1 h-11"
                  onClick={() => coverInputRef.current?.click()}
                  disabled={uploadingGallery === "cover"}
                >
                  {uploadingGallery === "cover" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  {coverUrl ? "Change Cover" : "Upload Cover"}
                </Button>
                {coverUrl && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl text-destructive hover:bg-destructive/10 h-11 w-11"
                    onClick={async () => {
                      if (!bizId) return;
                      const supabase = createClient();
                      await supabase.from("businesses").update({ cover_url: null }).eq("id", bizId);
                      setCoverUrl("");
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
            </Card>
          </section>

          {/* Logo */}
          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" /> Logo
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="flex items-center gap-6">
                <div className="relative h-24 w-24 rounded-2xl overflow-hidden bg-muted flex-shrink-0">
                  {logoUrl ? (
                    <Image src={logoUrl} alt="Logo" fill className="object-cover" sizes="96px" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      <Building2 className="h-8 w-8" />
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="rounded-2xl border-2 font-bold gap-2 h-11"
                    onClick={() => logoInputRef.current?.click()}
                    disabled={uploadingGallery === "logo"}
                  >
                    {uploadingGallery === "logo" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    {logoUrl ? "Change Logo" : "Upload Logo"}
                  </Button>
                  {logoUrl && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl text-destructive hover:bg-destructive/10 h-11 w-11"
                      onClick={async () => {
                        if (!bizId) return;
                        const supabase = createClient();
                        await supabase.from("businesses").update({ logo_url: null }).eq("id", bizId);
                        setLogoUrl("");
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
            </Card>
          </section>

          {/* Gallery Photos */}
          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <ImagePlus className="h-5 w-5 text-primary" /> Gallery Photos
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-8">
              <ImageUploadGrid
                images={galleryImages}
                uploading={uploadingGallery === "images"}
                onUpload={(e) => handleGalleryUpload(e, "images")}
                onRemove={(url) => removeGalleryImage(url, "images")}
                label="Interior & Exterior"
              />
              <div className="border-t border-border" />
              <ImageUploadGrid
                images={menuImages}
                uploading={uploadingGallery === "menu_images"}
                onUpload={(e) => handleGalleryUpload(e, "menu_images")}
                onRemove={(url) => removeGalleryImage(url, "menu_images")}
                label="Menu Photos"
              />
              <div className="border-t border-border" />
              <ImageUploadGrid
                images={ambienceImages}
                uploading={uploadingGallery === "ambience_images"}
                onUpload={(e) => handleGalleryUpload(e, "ambience_images")}
                onRemove={(url) => removeGalleryImage(url, "ambience_images")}
                label="Ambience & Atmosphere"
              />
            </Card>
          </section>
        </TabsContent>

        {/* ── BRANCHES TAB ────────────────────────────────────────────── */}
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
