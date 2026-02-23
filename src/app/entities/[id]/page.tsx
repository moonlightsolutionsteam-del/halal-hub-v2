
"use client"

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Clock, Phone, Globe, ShieldCheck, 
  Star, Share2, Heart, Info, MessageSquare,
  CheckCircle2, AlertCircle, Calendar, ArrowLeft,
  ChevronRight, Utensils, Store, ShoppingBag, 
  Sparkles, Plane, CircleDollarSign
} from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export default function EntityProfilePage() {
  const { id } = useParams();

  // Mock data based on the ID for high-fidelity demonstration
  const entityData = {
    name: "The Bosphorus Kitchen",
    category: "Restaurant",
    type: "Fine Dining",
    location: "123 Broadway, Manhattan, NY 10001",
    rating: 4.8,
    reviews: 124,
    verified: true,
    verifiedBy: "HMC Global",
    joined: "May 2021",
    description: "The Bosphorus Kitchen brings the authentic flavors of Istanbul to the heart of New York. Specializing in charcoal-grilled meats, traditional mezes, and handcrafted desserts, we pride ourselves on using only the finest halal-certified ingredients.",
    contact: {
      phone: "+1 (212) 555-0198",
      website: "https://bosphorus-nyc.com",
      hours: "Mon - Sat: 11:00 AM - 11:00 PM"
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FBFBFB] pb-24">
      {/* Navigation Bar */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b">
        <div className="container mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/categories" className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to Search
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full"><Share2 className="h-5 w-5" /></Button>
            <Button variant="ghost" size="icon" className="rounded-full text-rose-500"><Heart className="h-5 w-5" /></Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[45vh] min-h-[400px] w-full overflow-hidden">
        <Image 
          src={`https://picsum.photos/seed/entity${id}/1200/800`}
          alt="Entity Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-12">
          <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-primary text-white border-none font-black px-4 py-1 rounded-full text-xs shadow-lg shadow-primary/20 uppercase tracking-widest">{entityData.category}</Badge>
                <Badge variant="outline" className="bg-emerald-500/20 backdrop-blur-md text-emerald-400 border-emerald-500/30 font-black px-4 py-1 rounded-full text-xs uppercase tracking-widest flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse" /> Open Now
                </Badge>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-white font-headline tracking-tighter drop-shadow-2xl">{entityData.name}</h1>
              <div className="flex flex-wrap items-center gap-6 text-white font-bold">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="text-xl">{entityData.rating}</span>
                  <span className="text-sm opacity-60 ml-1">({entityData.reviews} Reviews)</span>
                </div>
                <div className="flex items-center gap-2 drop-shadow-md">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-lg">{entityData.location.split(',')[1].trim()}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Button className="rounded-2xl bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/40 h-14 px-8 font-black text-lg group">
                Reserve a Table <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content (Left) */}
          <div className="lg:col-span-8 space-y-12">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-[2rem] bg-white border shadow-sm h-16 p-1.5">
                <TabsTrigger value="overview" className="rounded-3xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Overview</TabsTrigger>
                <TabsTrigger value="menu" className="rounded-3xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Menu & Catalog</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-3xl font-black text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white transition-all">Reviews ({entityData.reviews})</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-10 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-6">
                  <h2 className="text-3xl font-black tracking-tight text-slate-900">About this Entity</h2>
                  <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    {entityData.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 group hover:border-primary/20 transition-colors">
                      <div className="h-14 w-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <ShieldCheck className="h-7 w-7" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Certified By</p>
                        <p className="text-lg font-black text-slate-900">{entityData.verifiedBy}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-6 bg-white rounded-[2rem] shadow-sm border border-slate-100 group hover:border-primary/20 transition-colors">
                      <div className="h-14 w-14 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Calendar className="h-7 w-7" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Member Since</p>
                        <p className="text-lg font-black text-slate-900">{entityData.joined}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-black tracking-tight text-slate-900">Verification & Compliance</h3>
                  <Card className="rounded-[2.5rem] border-2 border-emerald-100 bg-emerald-50/50 overflow-hidden group hover:bg-emerald-50 transition-colors">
                    <CardContent className="p-8 flex items-start gap-6">
                      <div className="h-16 w-16 bg-emerald-500 rounded-3xl flex items-center justify-center text-white shrink-0 shadow-xl shadow-emerald-200 group-hover:rotate-12 transition-transform">
                        <ShieldCheck className="h-10 w-10" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-black text-emerald-900">Fully Verified Halal Hub Entity</h4>
                        <p className="text-slate-700 font-medium leading-relaxed">
                          This business has provided valid halal certification documents verified by our audit team. We have also inspected their supply chain for compliance with international halal standards.
                        </p>
                        <div className="pt-4 flex flex-wrap gap-3">
                          <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-xl font-black text-xs uppercase px-6">View Certificates</Button>
                          <Button variant="outline" className="border-emerald-200 bg-white/50 text-emerald-700 rounded-xl font-black text-xs uppercase px-6">Trust Report</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-black tracking-tight text-slate-900">Specialized Services</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {["Prayer Room", "Family Area", "Wudhu Space", "Halal Certified"].map((amenity) => (
                      <div key={amenity} className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm text-center gap-3 group hover:border-primary/20 transition-all">
                        <div className="h-10 w-10 bg-slate-50 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-black uppercase text-slate-700 tracking-tighter">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="menu" className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <Card key={i} className="rounded-[2rem] border-none shadow-sm overflow-hidden flex items-center gap-6 p-6 hover:shadow-xl transition-all cursor-pointer group bg-white border border-transparent hover:border-primary/10">
                      <div className="relative h-24 w-24 rounded-3xl overflow-hidden shrink-0 shadow-lg group-hover:scale-105 transition-transform duration-500">
                        <Image src={`https://picsum.photos/seed/dish${i}/200/200`} alt="Dish" fill className="object-cover" />
                      </div>
                      <div className="space-y-1.5 flex-1">
                        <h4 className="text-lg font-black text-slate-900 leading-tight group-hover:text-primary transition-colors">Premium Adana Kebab</h4>
                        <p className="text-xs font-medium text-slate-500 line-clamp-2 italic">Charcoal grilled hand-minced meat skewers served with authentic flatbread.</p>
                        <div className="flex items-center justify-between pt-2">
                          <p className="text-primary font-black text-xl">$24.00</p>
                          <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 border-emerald-100">Most Popular</Badge>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-10 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <div className="text-center space-y-2 shrink-0 px-8 border-r">
                    <div className="text-6xl font-black text-slate-900">4.8</div>
                    <div className="flex gap-1 justify-center">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{entityData.reviews} Total Reviews</p>
                  </div>
                  <div className="flex-1 w-full space-y-3">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-4">
                        <span className="text-xs font-black text-slate-500 w-4">{star}</span>
                        <div className="h-2 bg-slate-100 rounded-full flex-1 overflow-hidden">
                          <div className="h-full bg-amber-400 rounded-full" style={{ width: star === 5 ? '85%' : star === 4 ? '10%' : '5%' }} />
                        </div>
                        <span className="text-xs font-bold text-slate-400 w-10 text-right">{star === 5 ? '85%' : star === 4 ? '10%' : '5%'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  {[1, 2].map(i => (
                    <Card key={i} className="rounded-[2.5rem] border-none shadow-sm p-8 bg-white border border-slate-100 group hover:border-primary/20 transition-all">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-14 w-14 border-4 border-slate-50 shadow-sm">
                            <AvatarImage src={`https://picsum.photos/seed/rev${i}/100/100`} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-lg font-black text-slate-900">Sarah Ahmed</p>
                            <div className="flex items-center gap-2">
                              <Badge className="bg-emerald-50 text-emerald-600 text-[9px] font-black border-none uppercase px-2">Verified Diner</Badge>
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">2 days ago</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                        </div>
                      </div>
                      <p className="text-slate-600 font-medium leading-relaxed italic text-lg">
                        "Absolutely incredible experience. The meat was tender and the service was impeccable. 
                        Knowing everything is strictly halal gave us total peace of mind. Must try the baklava!"
                      </p>
                      <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
                        {[1, 2].map(img => (
                          <div key={img} className="relative h-20 w-20 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                            <Image src={`https://picsum.photos/seed/revimg${i}${img}/200/200`} alt="Review" fill className="object-cover" />
                          </div>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
                <Button variant="outline" className="w-full rounded-2xl font-black py-8 border-2 text-slate-600 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all">Write Your Review</Button>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Info (Right) */}
          <div className="lg:col-span-4 space-y-8">
            <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white sticky top-24 border border-slate-100">
              <div className="h-48 bg-muted relative group">
                <Image src={`https://placehold.co/600x400/png?text=Map+Preview`} alt="Map" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="secondary" className="rounded-full font-black text-xs shadow-xl"><MapPin className="h-4 w-4 mr-2" /> Open in Maps</Button>
                </div>
              </div>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Location</p>
                      <p className="text-sm font-bold text-slate-900 leading-tight mt-1">{entityData.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Opening Hours</p>
                      <p className="text-sm font-bold text-slate-900 leading-tight mt-1">{entityData.contact.hours}</p>
                      <p className="text-[10px] text-emerald-600 font-bold mt-1 uppercase">Closes soon: 11:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Contact</p>
                      <p className="text-sm font-bold text-slate-900 leading-tight mt-1">{entityData.contact.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Button className="bg-primary rounded-2xl font-black text-xs uppercase tracking-widest h-12 shadow-lg shadow-primary/20">Call Now</Button>
                    <Button variant="outline" className="rounded-2xl font-black text-xs uppercase tracking-widest h-12 border-2"><Globe className="h-4 w-4 mr-2" /> Website</Button>
                  </div>
                  <Button variant="secondary" className="w-full bg-slate-900 text-white hover:bg-slate-800 rounded-2xl font-black text-xs uppercase tracking-widest h-12">Claim This Listing</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2.5rem] border-none bg-slate-900 shadow-2xl p-10 text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <AlertCircle className="h-24 w-24 text-white" />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="h-16 w-16 bg-white/10 backdrop-blur-xl rounded-3xl flex items-center justify-center text-primary mx-auto shadow-inner">
                  <Info className="h-8 w-8 text-white" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-white tracking-tight">Found a discrepancy?</h4>
                  <p className="text-sm text-slate-400 font-medium leading-relaxed px-4">
                    Help the community by reporting outdated or incorrect halal information. Verified reporters earn Hub Rewards.
                  </p>
                </div>
                <Button className="w-full rounded-2xl font-black bg-white text-slate-900 hover:bg-slate-100 h-14 shadow-xl">Report Information</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
