
"use client"

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, Clock, Phone, Globe, ShieldCheck, 
  Star, Share2, Heart, Info, MessageSquare,
  CheckCircle2, AlertCircle, Calendar
} from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function EntityProfilePage() {
  const { id } = useParams();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-12">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] w-full overflow-hidden">
        <Image 
          src={`https://picsum.photos/seed/entity${id}/1200/600`}
          alt="Entity Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge className="bg-primary text-white border-none font-bold px-3">Restaurant</Badge>
                <Badge variant="outline" className="bg-white/20 backdrop-blur-md text-white border-white/30 font-bold">Open Now</Badge>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white font-headline tracking-tight">The Bosphorus Kitchen</h1>
              <div className="flex items-center gap-4 text-white/90 font-medium">
                <div className="flex items-center gap-1.5">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="font-black text-lg">4.8</span>
                  <span className="text-sm opacity-80">(124 reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-5 w-5" />
                  <span>Downtown, New York</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-full bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20">
                <Share2 className="h-4 w-4 mr-2" /> Share
              </Button>
              <Button className="rounded-full bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30">
                <Heart className="h-4 w-4 mr-2" /> Save to Favorites
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto p-6 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 rounded-2xl bg-white shadow-sm h-14 p-1">
                <TabsTrigger value="overview" className="rounded-xl font-bold">Overview</TabsTrigger>
                <TabsTrigger value="menu" className="rounded-xl font-bold">Products/Menu</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-xl font-bold">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-8">
                <Card className="rounded-[2rem] border-none shadow-sm overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl font-black">About this Entity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      The Bosphorus Kitchen brings the authentic flavors of Istanbul to the heart of New York. 
                      Specializing in charcoal-grilled meats, traditional mezes, and handcrafted desserts, 
                      we pride ourselves on using only the finest halal-certified ingredients.
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl">
                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-muted-foreground">Certified By</p>
                          <p className="text-sm font-bold text-slate-900">HMC Global</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-2xl">
                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase text-muted-foreground">Joined Since</p>
                          <p className="text-sm font-bold text-slate-900">May 2021</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <section className="space-y-4">
                  <h3 className="text-xl font-black px-2">Verification & Compliance</h3>
                  <div className="bg-emerald-50 border-2 border-emerald-100 rounded-3xl p-6 flex items-start gap-4">
                    <div className="h-12 w-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-emerald-200">
                      <ShieldCheck className="h-7 w-7" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-black text-emerald-900">Fully Verified Entity</h4>
                      <p className="text-sm text-emerald-700/80 font-medium">
                        This business has provided valid halal certification documents verified by our audit team on Jan 12, 2024.
                      </p>
                      <Button variant="link" className="p-0 h-auto text-emerald-600 font-black text-xs underline">View Certificate Details</Button>
                    </div>
                  </div>
                </section>
              </TabsContent>

              <TabsContent value="menu" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <Card key={i} className="rounded-3xl border-none shadow-sm overflow-hidden flex items-center gap-4 p-4 hover:shadow-md transition-shadow cursor-pointer group">
                      <div className="relative h-20 w-20 rounded-2xl overflow-hidden shrink-0">
                        <Image src={`https://picsum.photos/seed/dish${i}/200/200`} alt="Dish" fill className="object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-bold text-slate-900">Signature Adana Kebab</h4>
                        <p className="text-xs text-muted-foreground line-clamp-1">Spiced minced meat grilled on broad skewers</p>
                        <p className="text-primary font-black">$24.00</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6 space-y-6">
                {[1, 2].map(i => (
                  <Card key={i} className="rounded-[2rem] border-none shadow-sm p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={`https://picsum.photos/seed/rev${i}/100/100`} />
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">Sarah Ahmed</p>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase">Local Guide • 2 days ago</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      "Absolutely incredible experience. The meat was tender and the service was impeccable. 
                      Knowing everything is strictly halal gave us total peace of mind. Must try the baklava!"
                    </p>
                  </Card>
                ))}
                <Button variant="outline" className="w-full rounded-2xl font-bold py-6">Write a Review</Button>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6">
            <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden">
              <div className="h-40 bg-muted relative">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-bold">
                  Map Preview Component
                </div>
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">Location</p>
                      <p className="text-xs text-muted-foreground">123 Broadway, Manhattan, NY 10001</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">Opening Hours</p>
                      <p className="text-xs text-muted-foreground">Mon - Sat: 11:00 AM - 11:00 PM</p>
                      <p className="text-xs text-muted-foreground">Sun: 12:00 PM - 10:00 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">Contact</p>
                      <p className="text-xs text-muted-foreground">+1 (212) 555-0198</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-primary rounded-2xl font-bold">Order Now</Button>
                  <Button variant="outline" size="icon" className="rounded-2xl border-2"><Globe className="h-4 w-4" /></Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[2.5rem] border-none bg-accent/10 shadow-sm p-6 text-center space-y-4 border-2 border-accent/20">
              <div className="h-12 w-12 bg-accent rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-accent/20">
                <Info className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-slate-900">Found a discrepancy?</h4>
                <p className="text-xs text-muted-foreground">Help the community by reporting outdated or incorrect halal information.</p>
              </div>
              <Button variant="secondary" className="w-full rounded-xl font-bold bg-white hover:bg-white/90">Report Issue</Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
