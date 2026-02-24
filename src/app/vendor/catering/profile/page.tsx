
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
  Info, Save, CookingPot, Users, 
  Calendar, Utensils, ShieldCheck, 
  ClipboardList, Sparkles, Search,
  Smartphone, Wallet, Mail, FileText,
  Image as ImageIcon, GripVertical, Video
} from "lucide-react";

const CUISINES = [
  "Biryani", "BBQ", "Mughlai", "Italian", "Arabian", "European", "Pizza", "Chinese", "Asian", "Kerala", "American", "South Indian", "Tibetan", "Finger Food", "Burger", "Ice Cream", "Mithai", "Andhra", "Healthy Food", "Desserts", "Beverages", "Bengali", "Chettinad", "Lebanese", "Mediterranean", "Modern Indian", "Middle Eastern", "Rolls", "Kebab", "Juices", "Seafood", "Sushi", "Korean", "Mangalorean", "Thai", "Assamese", "Charcoal Chicken", "Spanish", "Tamil", "Mexican", "Maharashtrian", "Rajasthani", "Lucknowi", "Vietnamese", "Bohri", "Japanese", "Goan", "South American", "Kashmiri", "Naga", "Konkan", "Oriya", "Momos", "Hyderabadi", "Bihari", "Turkish", "North Eastern", "Awadhi", "African", "Gujarati", "Burmese", "Malaysian", "Singaporean", "Coffee", "Parsi", "Iranian", "Nepalese", "Afghan", "Bubble Tea", "Greek", "Wraps", "Mongolian", "Indonesian", "Paan", "Sindhi", "Indian", "Pan Asian", "Raw Meats", "Grill", "Cantonese", "Jewish", "Sri Lankan", "Vegan", "Aceh", "Aegean", "Algerian", "Amazonian", "Angolan", "Apulian", "Arab-latin", "Argentine", "Armenian", "Arunachalese", "Asian Fusion", "Azerbaijani", "Azorean", "Balinese", "Bangladeshi", "Basque", "Brazilian", "Breakfast", "Cambodian", "Cape Malay", "Caribbean", "Catalan", "Chaat", "Chilean", "Chinese Muslim", "Coastal", "Coffee and Tea", "Colombian", "Cơm", "Contemporary", "Creole", "Cuban", "Curry", "Cypriot", "Deli", "Delight Goodies", "Dimsum", "Dominican", "Donuts", "Doughnuts", "Dumplings", "Egyptian", "Emilian", "Emirati", "Empanadas", "Ethiopian", "Falafel", "Fast Food", "Fijian", "Filipino", "First Nations", "Fish and Chips", "Fondue", "Foul", "Fresh Fish", "Fried Chicken", "Fujian", "Fusion", "Garhwali", "Georgian", "Gourmet Fast Food", "Grill House", "Grilled Chicken", "Gulf Food", "Guyanese", "Hainanese", "Hakka Chinese", "Haute Cuisine", "Hawaiian", "Himachali", "Home-made", "Hong Kong Style", "Hot Pot", "Hunan", "Ikan Bakar", "Indian Cuisine", "Indo-Chinese", "International", "Iraqi", "Israeli", "Jamaican", "Japanese BBQ", "Jawa", "Jiangnan", "K-mex", "Kaak", "Kalimantan", "Kapampangan", "Kazakh", "Kebabs", "Khaleeji", "Kiwi", "Korean BBQ", "Kulfi", "Kumpir", "Kyrgyz", "Laotian", "Latin American", "Ligurian", "Lombok", "Lounge", "Madeiran", "Makassar", "Malatang", "Malay", "Malwani", "Manado", "Manakish", "Mandi", "Manipuri", "Martabak", "Mauritian", "Meat Pie", "Medan", "Mediterania", "Meghalayan", "Mineira", "Minhota", "Mishti", "Mizo", "Moldovan", "Moroccan", "Mozambican", "Multi Cuisine", "Native Australian", "Neapolitan", "New American", "New Mexican", "Nigerian", "Nikkei", "Northern Chinese", "Nyonya", "Odia", "Oriental", "Ottoman", "Pacific", "Pakistani", "Palestinian", "Pancake", "Panini", "Pasta", "Pastry", "Peranakan", "Persian", "Peruvian", "Petiscos", "Pho", "Pilav", "Poké", "Polish", "Prasad", "Pub Food", "Punjabi", "Qatari", "Quebecois", "Ramen", "Restaurant Cafe", "Roast", "Roman", "Saj", "Salvadorean", "Sardinian", "Satay", "Satvik", "Senegalese", "Shake", "Shanghai", "Shawarma", "Sichuan", "Sicilian", "Sikkimese", "Sizzlers", "Snack Bar", "Snacks", "Somali", "Soto", "Soul Food", "South African", "South East Asian", "Southern American", "Southwestern", "Steamboat", "Sulawesi", "Sumatera", "Sunda", "Swedish", "Swiss", "Syrian", "Taco", "Taiwanese", "Tanzanian", "Tapas", "Tea House", "Teochew", "Teppanyaki", "Teriyaki", "Tex Mex", "Tibetian", "Tunisian", "Turkish Pizza", "Tuscan", "Ukrainian", "Uruguayan", "Uyghur", "Vegetarian", "Venezuelan", "Waffle", "West Indian", "World Cuisine", "Xinjiang", "Yemeni", "Yogyakarta", "Yugoslavian", "Yum Cha", "Yunnan", "Zambian", "Other"
];

const EVENT_TYPES = [
  "Weddings / Nikah", "Corporate Events", "Aqiqah / Naming", "Religious Seminars", "Family Parties", "Hajj & Umrah Groups", "Charity Galas", "Conferences", "School Events", "Social Gatherings"
];

const SERVICE_LEVELS = [
  "Full Service (Staff included)", "Buffet Only", "Drop-off Catering", "Live Cooking Stations", "Boxed Meals / VIP", "Table Decor & Cutlery Rental", "Silver Service", "Disposable Setup"
];

const MEAT_TYPES = [
  "Chicken", "Mutton (Goat)", "Lamb", "Beef", "Buffalo", "Fish & Seafood", "Duck", "Turkey", "Vegetarian Only", "Vegan Only"
];

const HIGHLIGHTS = [
  "Uniformed Staff", "Female Staff Only Option", "Live Tandoor", "Traditional Deg Cooking", "Premium Crockery", "On-site Kitchen Setup", "Global Logistics", "Custom Menu Planning"
];

const COMPLIANCE_DOCS = [
  { id: "halal", label: "Halal Logistics Certificate" },
  { id: "fssai", label: "FSSAI License (Catering)" },
  { id: "hygiene", label: "Hygiene Audit Rating" },
  { id: "municipal", label: "Municipal Trade License" },
  { id: "gst", label: "GST Certificate" },
  { id: "insurance", label: "Liability Insurance" },
];

export default function CateringProfilePage() {
  const [activeTab, setActiveTab] = useState("details");
  const [searchCuisine, setSearchCuisine] = useState("");

  const filteredCuisines = CUISINES.filter(c => c.toLowerCase().includes(searchCuisine.toLowerCase()));

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline tracking-tight text-slate-900">Catering Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your event specializations, logistics, and service standards.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700 rounded-2xl px-8 font-black shadow-lg shadow-blue-200 h-12 text-white">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-white border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="details" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all">Basic Info</TabsTrigger>
          <TabsTrigger value="menu" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Menu & Cuisine</TabsTrigger>
          <TabsTrigger value="capacity" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Logistics & Capacity</TabsTrigger>
          <TabsTrigger value="documents" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Documents</TabsTrigger>
          <TabsTrigger value="branding" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Media & Branding</TabsTrigger>
        </TabsList>

        {/* Tab 1: Basic Info */}
        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-slate-900">
                <Info className="h-5 w-5 text-blue-600" /> Core Information
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Catering Business Name</Label>
                  <Input placeholder="e.g., Royal Feast Caterers" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Business Type</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl bg-slate-50 border-none font-bold">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full">Full Service Agency</SelectItem>
                      <SelectItem value="kitchen">Cloud Kitchen / Drop-off</SelectItem>
                      <SelectItem value="boutique">Boutique / Specialist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Tagline</Label>
                  <Input placeholder="e.g., Premium Halal Catering for Grand Nikahs" className="h-12 rounded-2xl bg-slate-50 border-none font-medium" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Primary Contact Phone</Label>
                  <Input placeholder="+91 98765 43210" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">About the Service</Label>
                  <Textarea placeholder="Describe your experience, staff quality, and commitment to Shariah-compliant logistics..." className="min-h-[120px] rounded-2xl bg-slate-50 border-none p-4 font-medium resize-none focus:ring-2 focus:ring-blue-600/20" />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Service Highlights</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {HIGHLIGHTS.map((item) => (
                      <div key={item} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                        <Checkbox id={`h-${item}`} />
                        <label htmlFor={`h-${item}`} className="text-xs font-bold text-slate-700 leading-none cursor-pointer">{item}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        {/* Tab 2: Menu & Cuisine */}
        <TabsContent value="menu" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-slate-900">
                <Utensils className="h-5 w-5 text-blue-600" /> Menu Specialization
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Signature Dish</Label>
                    <Input placeholder="e.g., Awadhi Dum Biryani" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Price per Person (₹)</Label>
                    <Input placeholder="e.g., 800" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Cuisine Expertise</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                      placeholder="Search cuisines..." 
                      className="pl-10 h-11 rounded-2xl bg-slate-50 border-none"
                      value={searchCuisine}
                      onChange={(e) => setSearchCuisine(e.target.value)}
                    />
                  </div>
                  <ScrollArea className="h-64 rounded-2xl bg-slate-50/50 p-4 border border-slate-100">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {filteredCuisines.map((c) => (
                        <div key={c} className="flex items-center space-x-2 p-2 hover:bg-white rounded-lg transition-all cursor-pointer group">
                          <Checkbox id={`c-${c}`} />
                          <label htmlFor={`c-${c}`} className="text-[11px] font-bold text-slate-600 cursor-pointer">{c}</label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div className="space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Meat Types Available</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {MEAT_TYPES.map((m) => (
                      <div key={m} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                        <Checkbox id={`m-${m}`} />
                        <label htmlFor={`m-${m}`} className="text-xs font-bold text-slate-700 leading-none cursor-pointer">{m}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        {/* Tab 3: Capacity */}
        <TabsContent value="capacity" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-slate-900">
                <Users className="h-5 w-5 text-blue-600" /> Capacity & Service
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Min Guest Count</Label>
                  <Input type="number" placeholder="e.g., 50" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Max Capacity</Label>
                  <Input type="number" placeholder="e.g., 2000" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Min Notice (Days)</Label>
                  <Input type="number" placeholder="e.g., 14" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Service Levels Provided</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {SERVICE_LEVELS.map((sl) => (
                    <div key={sl} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                      <Checkbox id={`sl-${sl}`} />
                      <label htmlFor={`sl-${sl}`} className="text-xs font-bold text-slate-700 leading-none cursor-pointer">{sl}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Specialized Events</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {EVENT_TYPES.map((et) => (
                    <div key={et} className="flex items-center space-x-3 bg-blue-50/50 p-3 rounded-xl border border-blue-100 hover:bg-blue-50 transition-colors cursor-pointer group">
                      <Checkbox id={`et-${et}`} />
                      <label htmlFor={`et-${et}`} className="text-xs font-bold text-blue-900 leading-none cursor-pointer">{et}</label>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        {/* Tab 4: Documents */}
        <TabsContent value="documents" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-slate-900">
                <ShieldCheck className="h-5 w-5 text-blue-600" /> Compliance Vault
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Upload mandatory catering licenses and hygiene certifications to get verified.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {COMPLIANCE_DOCS.map((doc) => (
                  <div key={doc.id} className="space-y-3">
                    <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">{doc.label}</Label>
                    <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 bg-slate-50/50 hover:bg-white transition-colors cursor-pointer group">
                      <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors shadow-sm">
                        <Upload className="h-5 w-5" />
                      </div>
                      <div className="text-center">
                        <p className="text-[10px] font-black uppercase text-blue-600 group-hover:underline">Upload file</p>
                        <p className="text-[9px] text-slate-400 mt-1">No file chosen</p>
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
              <h2 className="text-xl font-black flex items-center gap-2 text-slate-900">
                <Smartphone className="h-5 w-5 text-blue-600" /> Visual Identity
              </h2>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Business Logo</Label>
                  <div className="flex items-center gap-8">
                    <div className="h-32 w-32 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 overflow-hidden relative group">
                      <Camera className="h-8 w-8 group-hover:scale-110 transition-transform" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Upload className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="rounded-xl font-black text-[10px] h-9 border-2 uppercase tracking-tighter">Choose Logo</Button>
                      <p className="text-[10px] font-bold text-slate-400 leading-tight">PNG, JPG (1:1)<br />Max 2MB</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Catering Showcase Banner</Label>
                  <div className="aspect-video w-full rounded-[2rem] bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 text-slate-400 relative group overflow-hidden shadow-inner">
                    <ImageIcon className="h-8 w-8 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Upload Banner</span>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="secondary" className="rounded-full font-black text-xs h-10 px-6 uppercase tracking-widest">Select Image</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-slate-900">
                <Plus className="h-5 w-5 text-blue-600" /> Event Gallery
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Showcase past wedding setups, buffet displays, and signature dish plating.</p>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group border border-slate-100 shadow-sm">
                    <img src={`https://picsum.photos/seed/catering-setup-${i}/400/400`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="icon" variant="destructive" className="h-8 w-8 rounded-xl"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
                <button className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 bg-slate-50 hover:bg-white hover:border-blue-600/40 transition-all text-slate-400 hover:text-blue-600">
                  <Plus className="h-6 w-6" />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Add Photo</span>
                </button>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <Card className="rounded-[2.5rem] border-none shadow-xl bg-slate-900 text-white p-10 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <CheckCircle2 className="h-32 w-32" />
              </div>
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-black font-headline text-white">Catering Compliance Declaration</h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-3xl">
                  By publishing this profile, you declare that all catering services marked as "Halal" utilize 100% verified halal meat and zero non-permissible cross-contamination in both base and on-site kitchens. You take full responsibility for the accuracy of these claims.
                </p>
              </div>
              <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl border border-white/10 relative z-10">
                <Checkbox id="final-declaration" className="border-white/30" />
                <label htmlFor="final-declaration" className="text-sm font-bold text-white/80 cursor-pointer">I confirm that all provided data is accurate.</label>
              </div>
              <Button className="w-full h-16 rounded-[1.5rem] bg-blue-600 hover:bg-blue-700 text-white font-black text-xl shadow-2xl relative z-10">
                Submit & Go Live
              </Button>
            </Card>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  );
}
