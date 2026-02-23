
"use client"

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Clock, Phone, Globe, ShieldCheck, 
  Star, Share2, Heart, Info, MessageSquare,
  CheckCircle2, AlertCircle, Calendar, ArrowLeft,
  ChevronRight, Utensils, Store, ShoppingBag, 
  Sparkles, Plane, CircleDollarSign,
  Coffee, Users, Zap, ShieldAlert,
  Beef, Truck, FileText, Download
} from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useState } from "react";

export default function EntityProfilePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Logic to switch between Mock Restaurant and Mock Butcher for demonstration
  const isButcher = id === "1"; // "1" is the ID we assigned to Al-Barakah in the meat page

  const restaurantData = {
    name: "The Bosphorus Kitchen",
    category: "Food & Dining",
    type: "Fine Dining",
    location: "123 Broadway, Manhattan, NY 10001",
    rating: 4.8,
    reviews: 124,
    verified: true,
    verifiedBy: "HMC Global",
    joined: "May 2021",
    description: "The Bosphorus Kitchen brings the authentic flavors of Istanbul to the heart of New York. Specializing in charcoal-grilled meats, traditional mezes, and handcrafted desserts, we pride ourselves on using only the finest halal-certified ingredients.",
    contact: { phone: "+1 (212) 555-0198", website: "https://bosphorus-nyc.com", hours: "Mon - Sat: 11:00 AM - 11:00 PM" },
    items: [
      { name: "Premium Adana Kebab", desc: "Charcoal grilled lamb skewers.", price: "$24.00", popular: true },
      { name: "Mixed Mezze Platter", desc: "Hummus, babaganoush, tabbouleh.", price: "$18.50", popular: true },
    ]
  };

  const butcherData = {
    name: "Al-Barakah Premium Meats",
    category: "Meat & Butchers",
    type: "Wholesale & Retail",
    location: "452 Atlantic Ave, Brooklyn, NY 11217",
    rating: 4.9,
    reviews: 312,
    verified: true,
    verifiedBy: "HMC Audit Board",
    joined: "Aug 2019",
    description: "Al-Barakah is Brooklyn's premier destination for ethically sourced, high-grade halal meats. We partner directly with local organic farms to ensure a transparent supply chain. From our signature dry-aged beef to custom-cut lamb, every product is prepared with precision and strictly follows HMC guidelines.",
    contact: { phone: "+1 (718) 555-0241", website: "https://albarakah-meats.com", hours: "Mon - Sun: 08:00 AM - 08:00 PM" },
    items: [
      { name: "A5 Grade Wagyu Ribeye", desc: "Exquisite marbling, grass-fed and finished on organic grain. Halal certified sourcing.", price: "$85.00/lb", popular: true },
      { name: "Dry-Aged Prime Striploin", desc: "Aged for 28 days in our custom Himalayan salt-brick room for deep flavor.", price: "$42.00/lb", popular: true },
      { name: "Organic Heritage Chicken", desc: "Free-range, antibiotic-free birds from upstate New York farms.", price: "$12.00/ea", popular: false },
      { name: "Premium Mutton Shoulder", desc: "Expertly trimmed, perfect for slow-cooked traditional stews.", price: "$18.00/lb", popular: false },
    ]
  };

  const entityData = isButcher ? butcherData : restaurantData;

  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBFB] pb-24 selection:bg-primary/10">
      {/* Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b">
        <div className="container mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <Link href={isButcher ? "/categories/meat" : "/categories/food"} className="flex items-center gap-2 text-sm font-black text-slate-600 hover:text-primary transition-all group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
            Back to {isButcher ? "Meat & Butchers" : "Dining Guide"}
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-slate-50"><Share2 className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-rose-50 text-rose-500"><Heart className="h-5 w-5" /></Button>
            <Button className="bg-primary rounded-2xl font-black text-xs uppercase px-6 hidden sm:flex">
              {isButcher ? "Pre-Order Now" : "Reserve Now"}
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[500px] w-full overflow-hidden">
        <Image 
          src={isButcher ? "https://picsum.photos/seed/meat-profile-1/1600/1000" : `https://picsum.photos/seed/food-profile-${id}/1600/1000`}
          alt="Entity Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className={`${isButcher ? 'bg-red-600' : 'bg-primary'} text-white border-none font-black px-5 py-1.5 rounded-full text-xs shadow-2xl uppercase tracking-[0.2em]`}>{entityData.category}</Badge>
                <Badge variant="outline" className="bg-white/10 backdrop-blur-md text-emerald-400 border-emerald-500/30 font-black px-5 py-1.5 rounded-full text-xs uppercase tracking-widest flex items-center gap-2">
                  <div className="h-2 w-2 bg-emerald-400 rounded-full animate-pulse" /> Open Now
                </Badge>
              </div>
              <h1 className="text-6xl md:text-7xl font-black text-white font-headline tracking-tighter drop-shadow-2xl">{entityData.name}</h1>
              <div className="flex flex-wrap items-center gap-8 text-white font-bold">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-3xl border border-white/20 shadow-2xl">
                  <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
                  <span className="text-3xl tracking-tight">{entityData.rating}</span>
                  <span className="text-xs uppercase font-black opacity-60 tracking-widest">({entityData.reviews} Reviews)</span>
                </div>
                <div className="flex items-center gap-3 drop-shadow-lg">
                  <div className={`h-10 w-10 ${isButcher ? 'bg-red-600' : 'bg-primary'} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl">{entityData.location.split(',')[1].trim()}</span>
                </div>
              </div>
            </div>
            <Card className="p-8 rounded-[3rem] bg-white border-none shadow-2xl w-full md:w-96 mb-[-4rem] z-10 relative">
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">{isButcher ? "Order for Pickup" : "Make a Reservation"}</h3>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Powered by Halal Hub</p>
                </div>
                {isButcher ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-bold">Home Delivery</span>
                      </div>
                      <Badge className="bg-emerald-50 text-emerald-600 border-none text-[10px]">Available</Badge>
                    </div>
                    <Button className="w-full h-16 rounded-[1.5rem] bg-red-600 hover:bg-red-700 font-black text-lg shadow-xl shadow-red-600/20">Build Your Box</Button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <Button variant="outline" className="rounded-2xl h-12 font-bold border-2">Today</Button>
                      <Button variant="outline" className="rounded-2xl h-12 font-bold border-2">7:30 PM</Button>
                    </div>
                    <Button className="w-full h-16 rounded-[1.5rem] bg-primary hover:bg-primary/90 font-black text-lg shadow-xl shadow-primary/20">Find a Table</Button>
                  </>
                )}
                <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-tighter">Verified Halal supply chain certified</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 pt-24 pb-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-16">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-[2.5rem] bg-white border shadow-sm h-20 p-2">
                <TabsTrigger value="overview" className={`rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all data-[state=active]:text-white ${isButcher ? 'data-[state=active]:bg-red-600' : 'data-[state=active]:bg-primary'}`}>Overview</TabsTrigger>
                <TabsTrigger value="items" className={`rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all data-[state=active]:text-white ${isButcher ? 'data-[state=active]:bg-red-600' : 'data-[state=active]:bg-primary'}`}>{isButcher ? "Price List" : "Digital Menu"}</TabsTrigger>
                <TabsTrigger value="reviews" className={`rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all data-[state=active]:text-white ${isButcher ? 'data-[state=active]:bg-red-600' : 'data-[state=active]:bg-primary'}`}>Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-12 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <div className={`h-1 w-8 rounded-full ${isButcher ? 'bg-red-600' : 'bg-primary'}`} />
                    <h2 className="text-4xl font-black tracking-tight text-slate-900">{isButcher ? "Our Butchery" : "About the Kitchen"}</h2>
                  </div>
                  <p className="text-xl text-slate-600 leading-relaxed font-medium">
                    {entityData.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="flex items-center gap-6 p-8 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 group hover:shadow-xl transition-all">
                      <div className={`h-16 w-16 ${isButcher ? 'bg-red-50 text-red-600' : 'bg-primary/5 text-primary'} rounded-[1.5rem] flex items-center justify-center group-hover:rotate-12 transition-transform shadow-inner`}>
                        <ShieldCheck className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Audited By</p>
                        <p className="text-xl font-black text-slate-900">{entityData.verifiedBy}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 p-8 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 group hover:shadow-xl transition-all">
                      <div className={`h-16 w-16 ${isButcher ? 'bg-red-50 text-red-600' : 'bg-primary/5 text-primary'} rounded-[1.5rem] flex items-center justify-center group-hover:rotate-12 transition-transform shadow-inner`}>
                        <Calendar className="h-8 w-8" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Hub Partner Since</p>
                        <p className="text-xl font-black text-slate-900">{entityData.joined}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <div className="h-1 bg-emerald-500 w-8 rounded-full" />
                    <h3 className="text-3xl font-black tracking-tight text-slate-900">Sourcing & Compliance</h3>
                  </div>
                  <Card className="rounded-[3rem] border-none bg-emerald-50/50 p-10 overflow-hidden group hover:bg-emerald-50 transition-all border-2 border-emerald-100/50">
                    <CardContent className="p-0 flex flex-col md:flex-row items-start gap-10">
                      <div className="h-24 w-24 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center text-white shrink-0 shadow-2xl shadow-emerald-200 group-hover:scale-110 transition-transform">
                        <ShieldCheck className="h-14 w-14" />
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-2xl font-black text-emerald-900">{isButcher ? "100% Traceable Halal Sourcing" : "Verified Halal Supply Chain"}</h4>
                        <p className="text-emerald-800/80 font-medium text-lg leading-relaxed">
                          {isButcher 
                            ? "All animals are sourced from grass-fed farms in the Hudson Valley. Slaughter is performed by certified professionals under strict supervision, with no stunning or electric immobilization used." 
                            : "We have meticulously verified the sourcing of all meats and ingredients. Their supply chain is 100% free from non-permissible additives."}
                        </p>
                        <div className="pt-4 flex flex-wrap gap-4">
                          <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-black text-xs uppercase px-8 h-12">View Certificates</Button>
                          <Button variant="outline" className="border-emerald-200 bg-white text-emerald-700 rounded-2xl font-black text-xs uppercase px-8 h-12 shadow-sm">Audit Report</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {isButcher && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="h-1 bg-red-600 w-8 rounded-full" />
                      <h3 className="text-3xl font-black tracking-tight text-slate-900">Traceability Logs</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { date: "Oct 28, 2024", item: "Wagyu Beef Batch #882", source: "Green Valley Farm", status: "Verified" },
                        { date: "Oct 25, 2024", item: "Heritage Lamb Batch #412", source: "Upstate Organic", status: "Verified" },
                      ].map((log, i) => (
                        <div key={i} className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-red-200 transition-all">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="text-sm font-black text-slate-900">{log.item}</p>
                              <p className="text-[10px] text-muted-foreground font-bold">{log.source} • {log.date}</p>
                            </div>
                          </div>
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="items" className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-3xl font-black tracking-tight text-slate-900">{isButcher ? "Premium Cuts" : "Popular Dishes"}</h3>
                  <Button variant="outline" className="rounded-full font-black text-xs border-2 uppercase tracking-tighter h-10 px-6">
                    <Download className="h-3.5 w-3.5 mr-2" /> Download Catalog
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {entityData.items.map((item, i) => (
                    <Card key={i} className={`rounded-[2.5rem] border-none shadow-sm overflow-hidden flex items-center gap-8 p-8 hover:shadow-2xl transition-all cursor-pointer group bg-white border-2 border-transparent ${isButcher ? 'hover:border-red-100' : 'hover:border-primary/10'}`}>
                      <div className="relative h-32 w-32 rounded-[2rem] overflow-hidden shrink-0 shadow-xl group-hover:scale-105 transition-transform duration-700">
                        <Image src={`https://picsum.photos/seed/${isButcher ? 'meat' : 'dish'}-${i}-${id}/300/300`} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="space-y-2.5 flex-1">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className={`text-xl font-black text-slate-900 leading-tight group-hover:${isButcher ? 'text-red-600' : 'text-primary'} transition-colors`}>{item.name}</h4>
                          <span className={`${isButcher ? 'text-red-600' : 'text-primary'} font-black text-xl tracking-tighter whitespace-nowrap`}>{item.price}</span>
                        </div>
                        <p className="text-sm font-medium text-slate-500 line-clamp-2 italic">{item.desc}</p>
                        {item.popular && (
                          <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 border-emerald-100/50 px-3 py-1 rounded-full">Best Seller</Badge>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-12 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex flex-col md:flex-row gap-12 items-center bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm">
                  <div className="text-center space-y-3 shrink-0 md:px-12 md:border-r border-slate-100">
                    <div className="text-8xl font-black text-slate-900 tracking-tighter">{entityData.rating}</div>
                    <div className="flex gap-1.5 justify-center">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-5 w-5 fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{entityData.reviews} Verified Buyers</p>
                  </div>
                  <div className="flex-1 w-full space-y-4">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-6">
                        <span className="text-sm font-black text-slate-500 w-4">{star}</span>
                        <div className="h-3 bg-slate-100 rounded-full flex-1 overflow-hidden shadow-inner">
                          <div className={`h-full ${isButcher ? 'bg-red-500' : 'bg-amber-400'} rounded-full transition-all duration-1000`} style={{ width: star === 5 ? '90%' : star === 4 ? '8%' : '2%' }} />
                        </div>
                        <span className="text-xs font-black text-slate-400 w-12 text-right">{star === 5 ? '90%' : star === 4 ? '8%' : '2%'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  {[1, 2].map(i => (
                    <Card key={i} className={`rounded-[3rem] border-none shadow-sm p-10 bg-white border border-slate-100 group hover:shadow-xl transition-all ${isButcher ? 'hover:border-red-100' : 'hover:border-primary/20'}`}>
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-6">
                          <Avatar className="h-16 w-16 border-4 border-slate-50 shadow-md">
                            <AvatarImage src={`https://picsum.photos/seed/reviewer-${i}/150/150`} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <p className="text-xl font-black text-slate-900">Ahmed Malik</p>
                            <div className="flex items-center gap-3">
                              <Badge className="bg-emerald-50 text-emerald-600 text-[10px] font-black border-none uppercase px-3 py-1 rounded-full">Top Contributor</Badge>
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Ordered 3 days ago</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1 bg-slate-50 p-2 rounded-2xl">
                          {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                        </div>
                      </div>
                      <p className="text-slate-600 font-medium leading-relaxed italic text-xl">
                        {isButcher 
                          ? "\"The quality of the Wagyu is unmatched. You can truly tell the difference in ethics and preparation. Their home delivery was prompt and the meat was perfectly vacuum-sealed.\""
                          : "\"Absolutely incredible experience. Having full confidence in the halal status allowed our family to truly relax and enjoy.\""}
                      </p>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Info (Right) */}
          <div className="lg:col-span-4 space-y-10">
            <Card className="rounded-[3rem] border-none shadow-2xl overflow-hidden bg-white sticky top-28 border border-slate-100">
              <div className="h-64 bg-muted relative group overflow-hidden">
                <Image src={`https://placehold.co/800x600/png?text=Interactive+Map+Preview`} alt="Map" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary" className="rounded-full font-black text-xs shadow-2xl px-8 h-12 uppercase tracking-widest"><MapPin className="h-4 w-4 mr-2" /> Navigate Now</Button>
                </div>
              </div>
              <CardContent className="p-10 space-y-10">
                <div className="space-y-8">
                  <div className="flex items-start gap-6">
                    <div className={`h-12 w-12 rounded-2xl ${isButcher ? 'bg-red-50 text-red-600' : 'bg-primary/5 text-primary'} flex items-center justify-center shrink-0 shadow-inner`}>
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Our Location</p>
                      <p className="text-base font-bold text-slate-900 leading-snug">{entityData.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className={`h-12 w-12 rounded-2xl ${isButcher ? 'bg-red-50 text-red-600' : 'bg-primary/5 text-primary'} flex items-center justify-center shrink-0 shadow-inner`}>
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Store Hours</p>
                      <p className="text-base font-bold text-slate-900 leading-snug">{entityData.contact.hours}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-6">
                    <div className={`h-12 w-12 rounded-2xl ${isButcher ? 'bg-red-50 text-red-600' : 'bg-primary/5 text-primary'} flex items-center justify-center shrink-0 shadow-inner`}>
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Direct Line</p>
                      <p className="text-base font-bold text-slate-900 leading-snug">{entityData.contact.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-8 border-t border-slate-50 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button className={`${isButcher ? 'bg-red-600 hover:bg-red-700' : 'bg-primary'} rounded-2xl font-black text-xs uppercase tracking-widest h-14 shadow-xl`}>Call Now</Button>
                    <Button variant="outline" className="rounded-2xl font-black text-xs uppercase tracking-widest h-14 border-2"><Globe className="h-4 w-4 mr-2" /> Website</Button>
                  </div>
                  <Button variant="secondary" className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-2xl font-black text-xs uppercase tracking-widest h-14 shadow-lg transition-all">Claim This Listing</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[3rem] border-none bg-slate-900 shadow-2xl p-12 text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <ShieldAlert className="h-32 w-32 text-white" />
              </div>
              <div className="relative z-10 space-y-6">
                <div className={`h-20 w-20 bg-white/10 backdrop-blur-xl rounded-[2rem] flex items-center justify-center ${isButcher ? 'text-red-500' : 'text-primary'} mx-auto shadow-2xl border border-white/10`}>
                  <Info className="h-10 w-10 text-white" />
                </div>
                <div className="space-y-3">
                  <h4 className="text-3xl font-black text-white tracking-tight">Need Support?</h4>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed px-2">
                    Found an issue with the {isButcher ? 'meat sourcing' : 'halal'} information? Report it to help our community.
                  </p>
                </div>
                <Button className="w-full rounded-2xl font-black bg-white text-slate-900 hover:bg-slate-100 h-16 shadow-2xl text-base tracking-tight transition-transform active:scale-95">Report Discrepancy</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
