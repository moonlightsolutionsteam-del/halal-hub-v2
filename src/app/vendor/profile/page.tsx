
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
import { Separator } from "@/components/ui/separator";
import { 
  Building2, MapPin, Clock, Phone, 
  Globe, Camera, Upload, Trash2,
  Plus, CheckCircle2, AlertCircle,
  MessageSquare, Save, Info, Search,
  UtensilsCrossed, Smartphone, Receipt,
  Share2, ShieldCheck, CreditCard,
  Wifi, Bike, Car, Accessibility,
  Baby, Dog, Monitor, User
} from "lucide-react";
import Image from "next/image";

const CUISINES = [
  "Biryani", "BBQ", "Mughlai", "Italian", "Arabian", "European", "Pizza", "Chinese", "Asian", "Kerala", "American", "South Indian", "Tibetan", "Finger Food", "Burger", "Ice Cream", "Mithai", "Andhra", "Healthy Food", "Desserts", "Beverages", "Bengali", "Chettinad", "Lebanese", "Mediterranean", "Modern Indian", "Middle Eastern", "Rolls", "Kebab", "Juices", "Seafood", "Sushi", "Korean", "Mangalorean", "Thai", "Assamese", "Charcoal Chicken", "Spanish", "Tamil", "Mexican", "Maharashtrian", "Rajasthani", "Lucknowi", "Vietnamese", "Bohri", "Japanese", "Goan", "South American", "Kashmiri", "Naga", "Konkan", "Oriya", "Momos", "Hyderabadi", "Bihari", "Turkish", "North Eastern", "Awadhi", "African", "Gujarati", "Burmese", "Malaysian", "Singaporean", "Coffee", "Parsi", "Iranian", "Nepalese", "Afghan", "Bubble Tea", "Greek", "Wraps", "Mongolian", "Indonesian", "Paan", "Sindhi", "Indian", "Pan Asian", "Raw Meats", "Grill", "Cantonese", "Jewish", "Sri Lankan", "Vegan", "Aceh", "Aegean", "Algerian", "Amazonian", "Angolan", "Apulian", "Arab-latin", "Argentine", "Armenian", "Arunachalese", "Asian Fusion", "Azerbaijani", "Azorean", "Balinese", "Bangladeshi", "Basque", "Brazilian", "Breakfast", "Cambodian", "Cape Malay", "Caribbean", "Catalan", "Chaat", "Chilean", "Chinese Muslim", "Coastal", "Coffee and Tea", "Colombian", "Cơm", "Contemporary", "Creole", "Cuban", "Curry", "Cypriot", "Deli", "Delight Goodies", "Dimsum", "Dominican", "Donuts", "Doughnuts", "Dumplings", "Egyptian", "Emilian", "Emirati", "Empanadas", "Ethiopian", "Falafel", "Fast Food", "Fijian", "Filipino", "First Nations", "Fish and Chips", "Fondue", "Foul", "Fresh Fish", "Fried Chicken", "Fujian", "Fusion", "Garhwali", "Georgian", "Gourmet Fast Food", "Grill House", "Grilled Chicken", "Gulf Food", "Guyanese", "Hainanese", "Hakka Chinese", "Haute Cuisine", "Hawaiian", "Himachali", "Home-made", "Hong Kong Style", "Hot Pot", "Hunan", "Ikan Bakar", "Indian Cuisine", "Indo-Chinese", "International", "Iraqi", "Israeli", "Jamaican", "Japanese BBQ", "Jawa", "Jiangnan", "K-mex", "Kaak", "Kalimantan", "Kapampangan", "Kazakh", "Kebabs", "Khaleeji", "Kiwi", "Korean BBQ", "Kulfi", "Kumpir", "Kyrgyz", "Laotian", "Latin American", "Ligurian", "Lombok", "Lounge", "Madeiran", "Makassar", "Malatang", "Malay", "Malwani", "Manado", "Manakish", "Mandi", "Manipuri", "Martabak", "Mauritian", "Meat Pie", "Medan", "Mediterania", "Meghalayan", "Mineira", "Minhota", "Mishti", "Mizo", "Moldovan", "Moroccan", "Mozambican", "Multi Cuisine", "Native Australian", "Neapolitan", "New American", "New Mexican", "Nigerian", "Nikkei", "Northern Chinese", "Nyonya", "Odia", "Oriental", "Ottoman", "Pacific", "Pakistani", "Palestinian", "Pancake", "Panini", "Pasta", "Pastry", "Peranakan", "Persian", "Peruvian", "Petiscos", "Pho", "Pilav", "Poké", "Polish", "Prasad", "Pub Food", "Punjabi", "Qatari", "Quebecois", "Ramen", "Restaurant Cafe", "Roast", "Roman", "Saj", "Salvadorean", "Sardinian", "Satay", "Satvik", "Senegalese", "Shake", "Shanghai", "Shawarma", "Sichuan", "Sicilian", "Sikkimese", "Sizzlers", "Snack Bar", "Snacks", "Somali", "Soto", "Soul Food", "South African", "South East Asian", "Southern American", "Southwestern", "Steamboat", "Sulawesi", "Sumatera", "Sunda", "Swedish", "Swiss", "Syrian", "Taco", "Taiwanese", "Tanzanian", "Tapas", "Tea House", "Teochew", "Teppanyaki", "Teriyaki", "Tex Mex", "Tibetian", "Tunisian", "Turkish Pizza", "Tuscan", "Ukrainian", "Uruguayan", "Uyghur", "Vegetarian", "Venezuelan", "Waffle", "West Indian", "World Cuisine", "Xinjiang", "Yemeni", "Yogyakarta", "Yugoslavian", "Yum Cha", "Yunnan", "Zambian", "Other"
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
  const [activeTab, setActiveTab] = useState("details");
  const [searchCuisine, setSearchCuisine] = useState("");

  const filteredCuisines = CUISINES.filter(c => c.toLowerCase().includes(searchCuisine.toLowerCase()));

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline tracking-tight">Edit Restaurant</h1>
          <p className="text-muted-foreground font-medium">Manage your restaurant's profile, documents, and gallery.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-primary hover:bg-primary/90 rounded-2xl px-8 font-black shadow-lg shadow-primary/20 h-12">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-white border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="details" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-primary data-[state=active]:text-white">Details</TabsTrigger>
          <TabsTrigger value="documents" className="rounded-xl px-8 font-bold text-sm h-full">Documents</TabsTrigger>
          <TabsTrigger value="gallery" className="rounded-xl px-8 font-bold text-sm h-full">Gallery</TabsTrigger>
          <TabsTrigger value="branches" className="rounded-xl px-8 font-bold text-sm h-full">Branches</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          {/* Basic Information */}
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" /> Basic Information
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Update your business name, description, and essential information.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Restaurant Name</Label>
                  <Input placeholder="e.g., Karim's Restaurant" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Alternate / Brand Name (Optional)</Label>
                  <Input placeholder="e.g., Karim's Hotel" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Contact Number</Label>
                  <Input placeholder="+91 11 2326 9880" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">WhatsApp Number</Label>
                  <Input placeholder="+91 98765 43210" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Short Description (Tagline)</Label>
                  <Input placeholder="e.g., The Original from Old Delhi since 1913" className="h-12 rounded-2xl bg-slate-50 border-none font-medium" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">About Restaurant (Long Description)</Label>
                  <Textarea placeholder="Tell customers what makes your business special..." className="min-h-[150px] rounded-2xl bg-slate-50 border-none p-4 font-medium resize-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Business Highlights</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {HIGHLIGHTS.map((item) => (
                      <div key={item} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                        <Checkbox id={item} className="rounded-md border-slate-300" />
                        <label htmlFor={item} className="text-xs font-bold text-slate-700 leading-none cursor-pointer">{item}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Cuisine & Menu */}
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <UtensilsCrossed className="h-5 w-5 text-primary" /> Cuisine & Menu
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Define your flavors and pricing details.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Food & Dining Category</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl bg-slate-50 border-none font-bold">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none shadow-xl">
                      <SelectItem value="casual">Casual Dining</SelectItem>
                      <SelectItem value="fine">Fine Dining</SelectItem>
                      <SelectItem value="cafe">Cafe</SelectItem>
                      <SelectItem value="fast">Quick Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Primary Cuisine</Label>
                  <Input placeholder="e.g., Mughlai" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Price Range</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl bg-slate-50 border-none font-bold">
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none shadow-xl">
                      <SelectItem value="1">$ - Budget</SelectItem>
                      <SelectItem value="2">$$ - Moderate</SelectItem>
                      <SelectItem value="3">$$$ - Premium</SelectItem>
                      <SelectItem value="4">$$$$ - Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <Separator className="bg-slate-100" />
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Advanced Pricing Fields (Optional)</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="font-bold text-xs text-slate-500">Approx. Price for Two</Label>
                      <Input placeholder="e.g., 1200" className="h-11 rounded-xl bg-slate-50 border-none font-bold" />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold text-xs text-slate-500">Avg. Cost per Person</Label>
                      <Input placeholder="e.g., 600" className="h-11 rounded-xl bg-slate-50 border-none font-bold" />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold text-xs text-slate-500">Starting Price</Label>
                      <Input placeholder="e.g., 250" className="h-11 rounded-xl bg-slate-50 border-none font-bold" />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Cuisine Types</Label>
                  <div className="relative mb-2">
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
                          <Checkbox id={`c-${c}`} className="rounded-sm border-slate-300 group-hover:border-primary" />
                          <label htmlFor={`c-${c}`} className="text-[11px] font-bold text-slate-600 truncate cursor-pointer">{c}</label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Popular Dishes (comma separated)</Label>
                  <Input placeholder="e.g., Biryani, Shawarma, Kebab" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Signature Dish (Optional)</Label>
                  <Input placeholder="e.g., Mutton Seekh Kebab" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>

                <div className="md:col-span-2 space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">What types of meat do you serve?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {MEAT_TYPES.map((m) => (
                      <div key={m} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors">
                        <Checkbox id={`m-${m}`} />
                        <label htmlFor={`m-${m}`} className="text-xs font-bold text-slate-700 leading-none">{m}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Location */}
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" /> Location
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Set your physical address and delivery reach.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Full Address</Label>
                  <Input placeholder="e.g., 16, Gali Kababian, Jama Masjid" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Landmark</Label>
                  <Input placeholder="e.g., Near Gate no. 1" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">City</Label>
                  <Input placeholder="e.g., Old Delhi" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Pincode</Label>
                  <Input placeholder="e.g., 110006" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Delivery Radius (for kitchens)</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl bg-slate-50 border-none font-bold">
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
                <div className="md:col-span-2 space-y-4">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Google Map Embed URL</Label>
                  <Input placeholder="Paste GMap Embed URL" className="h-12 rounded-2xl bg-slate-50 border-none font-medium" />
                  <div className="aspect-video w-full rounded-[2rem] bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs uppercase tracking-[0.2em] border-2 border-dashed">
                    Map preview will appear here
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Opening Hours */}
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" /> Opening Hours
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Set your daily operational timings.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden p-8">
              <div className="space-y-4">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <div key={day} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50 rounded-2xl gap-4">
                    <span className="font-black text-sm text-slate-700 min-w-[100px]">{day}</span>
                    <div className="flex items-center gap-4 flex-1 justify-end">
                      <div className="flex items-center gap-2">
                        <Input type="time" className="w-32 h-10 rounded-xl bg-white border-none shadow-sm font-bold" />
                        <span className="text-xs font-black text-slate-400">TO</span>
                        <Input type="time" className="w-32 h-10 rounded-xl bg-white border-none shadow-sm font-bold" />
                      </div>
                      <Badge variant="outline" className="rounded-full bg-emerald-50 text-emerald-600 border-emerald-100 font-black text-[9px] uppercase">Open</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* Services & Facilities */}
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" /> Services & Facilities
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Toggle amenities and ordering technologies you offer.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden p-8 space-y-10">
              <div className="space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Dining & Service Options</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {SERVICE_OPTIONS.map((item) => (
                    <div key={item} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors">
                      <Checkbox id={`s-${item}`} />
                      <label htmlFor={`s-${item}`} className="text-xs font-bold text-slate-700 leading-none">{item}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Facilities & Amenities</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {AMENITIES.map((item) => (
                    <div key={item} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors">
                      <Checkbox id={`a-${item}`} />
                      <label htmlFor={`a-${item}`} className="text-xs font-bold text-slate-700 leading-none">{item}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Ordering Technology</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {TECH_OPTIONS.map((item) => (
                    <div key={item} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors">
                      <Checkbox id={`t-${item}`} />
                      <label htmlFor={`t-${item}`} className="text-xs font-bold text-slate-700 leading-none">{item}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Payment Methods</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {PAYMENT_METHODS.map((item) => (
                    <div key={item} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl hover:bg-slate-100 transition-colors">
                      <Checkbox id={`p-${item}`} />
                      <label htmlFor={`p-${item}`} className="text-xs font-bold text-slate-700 leading-none">{item}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Custom Facility (Optional)</Label>
                <Input placeholder="Enter any other facility you offer" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
              </div>
            </Card>
          </section>

          {/* Online Presence */}
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" /> Online Presence & Platforms
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Link your profiles from various platforms to enhance your business page.</p>
            </div>
            
            <Card className="rounded-[2rem] border-none shadow-sm bg-white overflow-hidden p-8">
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4">Food Delivery</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-600">Swiggy</Label>
                      <Input placeholder="Enter Swiggy link" className="h-11 rounded-xl bg-slate-50 border-none font-medium" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-600">Zomato</Label>
                      <Input placeholder="Enter Zomato link" className="h-11 rounded-xl bg-slate-50 border-none font-medium" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-600">MagicPin</Label>
                      <Input placeholder="Enter MagicPin link" className="h-11 rounded-xl bg-slate-50 border-none font-medium" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-600">EatSure</Label>
                      <Input placeholder="Enter EatSure link" className="h-11 rounded-xl bg-slate-50 border-none font-medium" />
                    </div>
                  </div>
                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-600">Other Delivery Platform Name</Label>
                      <Input placeholder="e.g. Uber Eats" className="h-11 rounded-xl bg-slate-50 border-none font-medium" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold text-slate-600">Platform Link</Label>
                      <Input placeholder="https://..." className="h-11 rounded-xl bg-slate-50 border-none font-medium" />
                    </div>
                  </div>
                </div>

                <Separator className="bg-slate-100" />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors">
                    <Plus className="h-5 w-5 text-slate-400" />
                    <span className="text-[10px] font-black uppercase text-slate-500">Dining Reservations</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors">
                    <Plus className="h-5 w-5 text-slate-400" />
                    <span className="text-[10px] font-black uppercase text-slate-500">Discovery / Maps</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors">
                    <Plus className="h-5 w-5 text-slate-400" />
                    <span className="text-[10px] font-black uppercase text-slate-500">Deals Platforms</span>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 transition-colors">
                    <Plus className="h-5 w-5 text-slate-400" />
                    <span className="text-[10px] font-black uppercase text-slate-500">Social Platforms</span>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Declaration */}
          <section className="space-y-6">
            <Card className="rounded-[2.5rem] border-none shadow-xl bg-slate-900 text-white p-10 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck className="h-32 w-32" />
              </div>
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-black font-headline">Restaurant Declaration & Disclaimer</h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-3xl">
                  Halal Hub does not certify or guarantee halal status. All halal claims, meat sourcing information, supplier details, and documents provided by this business are submitted under their full responsibility. Halal Hub displays this information as provided by the vendor and is not liable for inaccuracies or misrepresentation. Providing false information may result in suspension or delisting.
                </p>
              </div>
              
              <div className="space-y-4 relative z-10">
                {[
                  "I confirm all submitted details are accurate.",
                  "I understand Halal Hub does not certify halal status.",
                  "I take full responsibility for my halal claims and sourcing."
                ].map((conf, i) => (
                  <div key={i} className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
                    <Checkbox id={`conf-${i}`} className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                    <label htmlFor={`conf-${i}`} className="text-sm font-bold text-white/80 cursor-pointer">{conf}</label>
                  </div>
                ))}
              </div>

              <Button className="w-full h-16 rounded-[1.5rem] bg-primary hover:bg-primary/90 text-white font-black text-xl shadow-2xl transition-transform active:scale-[0.98]">
                Submit & Accept Disclaimer
              </Button>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="documents" className="animate-in fade-in duration-500">
          <Card className="rounded-[2.5rem] border-none shadow-sm p-12 text-center bg-white space-y-6">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <ShieldCheck className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">Certificate Vault</h3>
              <p className="text-muted-foreground font-medium max-w-sm mx-auto">Upload your Halal certificates, hygiene ratings, and business licenses here.</p>
            </div>
            <Button variant="outline" className="rounded-2xl h-12 px-8 border-2 font-black uppercase text-xs tracking-widest">
              <Upload className="mr-2 h-4 w-4" /> Manage Certificates
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="animate-in fade-in duration-500">
          <Card className="rounded-[2.5rem] border-none shadow-sm p-12 text-center bg-white space-y-6">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <Camera className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">Visual Showcase</h3>
              <p className="text-muted-foreground font-medium max-w-sm mx-auto">Update your menu photos, interior shots, and logo to attract customers.</p>
            </div>
            <Button variant="outline" className="rounded-2xl h-12 px-8 border-2 font-black uppercase text-xs tracking-widest">
              <Plus className="mr-2 h-4 w-4" /> Add Media
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="branches" className="animate-in fade-in duration-500">
          <Card className="rounded-[2.5rem] border-none shadow-sm p-12 text-center bg-white space-y-6">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <Building2 className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">Branch Management</h3>
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
