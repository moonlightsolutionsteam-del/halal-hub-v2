
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, MapPin, Clock, Phone, 
  Globe, Camera, Upload, Trash2,
  Plus, CheckCircle2, AlertCircle
} from "lucide-react";
import Image from "next/image";

export default function VendorProfilePage() {
  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <Building2 className="h-3 w-3" /> Business Management
          </div>
          <h1 className="text-3xl font-black font-headline">Business Profile</h1>
          <p className="text-muted-foreground font-medium">Control how your business appears to the HalalSphere community.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2">Preview Public Page</Button>
          <Button className="bg-primary rounded-full px-8 font-bold shadow-lg shadow-primary/20">Publish Changes</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* General Information */}
          <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden">
            <CardHeader className="p-8 border-b">
              <CardTitle className="text-xl font-black">General Information</CardTitle>
              <CardDescription>Update your brand identity and description.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Business Name</Label>
                  <Input defaultValue="The Bosphorus Kitchen" className="h-12 rounded-xl bg-muted/30 border-none px-4 font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Tagline / Short Catchphrase</Label>
                  <Input defaultValue="Authentic Turkish Flavors in NYC" className="h-12 rounded-xl bg-muted/30 border-none px-4 font-medium" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Detailed Description</Label>
                  <Textarea 
                    className="min-h-[150px] rounded-xl bg-muted/30 border-none p-4 font-medium resize-none focus:ring-2 focus:ring-primary/20"
                    defaultValue="The Bosphorus Kitchen brings the authentic flavors of Istanbul to the heart of New York. Specializing in charcoal-grilled meats, traditional mezes, and handcrafted desserts..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Media Gallery */}
          <Card className="rounded-[2.5rem] border-none shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
              <div className="space-y-1">
                <h3 className="text-xl font-black">Media Gallery</h3>
                <p className="text-sm text-muted-foreground font-medium">Showcase your products and interior.</p>
              </div>
              <Button size="sm" variant="outline" className="rounded-full font-bold border-2">
                <Upload className="h-4 w-4 mr-2" /> Upload New
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden group">
                  <Image src={`https://picsum.photos/seed/biz${i}/400/400`} alt="Gallery" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button size="icon" variant="ghost" className="text-white hover:text-red-400"><Trash2 className="h-5 w-5" /></Button>
                  </div>
                </div>
              ))}
              <button className="aspect-square rounded-2xl border-2 border-dashed border-muted flex flex-col items-center justify-center gap-2 text-muted-foreground hover:bg-muted/30 transition-colors">
                <Plus className="h-6 w-6" />
                <span className="text-[10px] font-bold uppercase">Add Photo</span>
              </button>
            </div>
          </Card>
        </div>

        {/* Contact & Verification Status */}
        <div className="space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm p-8 space-y-6">
            <h3 className="text-xl font-black">Verification Status</h3>
            <div className="bg-emerald-50 border-2 border-emerald-100 rounded-3xl p-6 text-center space-y-3">
              <div className="h-14 w-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-emerald-200">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <p className="font-black text-emerald-900">Status: Verified</p>
                <p className="text-[10px] text-emerald-700 font-bold uppercase">Expires: Dec 2024</p>
              </div>
              <Button size="sm" variant="link" className="text-emerald-600 font-black text-xs">Manage Certificates</Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm p-8 space-y-6">
            <h3 className="text-xl font-black">Business Contact</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-3 w-3" /> Street Address
                </Label>
                <Input defaultValue="123 Broadway, NYC" className="rounded-xl bg-muted/30 border-none h-10 font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase text-muted-foreground flex items-center gap-2">
                  <Phone className="h-3 w-3" /> Phone Number
                </Label>
                <Input defaultValue="+1 212 555 0198" className="rounded-xl bg-muted/30 border-none h-10 font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase text-muted-foreground flex items-center gap-2">
                  <Globe className="h-3 w-3" /> Website URL
                </Label>
                <Input defaultValue="https://bosphorus-nyc.com" className="rounded-xl bg-muted/30 border-none h-10 font-bold" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
