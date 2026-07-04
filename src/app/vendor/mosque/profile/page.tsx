"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accessibility, BookOpen, Building, Car, Droplets,
  Facebook, Instagram, Library, ParkingSquare, Shield,
  UploadCloud, User, Wind, Youtube, Save, Moon,
  Clock, MapPin, Phone, Heart, GraduationCap, Users
} from "lucide-react"

const facilities = [
  { id: "womens-area", label: "Women's Prayer Area", icon: User },
  { id: "wudhu-area", label: "Wudhu Area", icon: Droplets },
  { id: "parking", label: "Parking", icon: ParkingSquare },
  { id: "wheelchair", label: "Wheelchair Accessible", icon: Accessibility },
  { id: "ac", label: "Air Conditioning", icon: Wind },
  { id: "water", label: "Water Facility", icon: Droplets },
  { id: "community-hall", label: "Community Hall", icon: Building },
  { id: "madrasa", label: "Madrasa / Classes", icon: BookOpen },
  { id: "library", label: "Islamic Library", icon: Library },
  { id: "funeral", label: "Funeral Support", icon: Heart },
  { id: "security", label: "Security", icon: Shield },
  { id: "cctv", label: "CCTV Surveillance", icon: Car },
  { id: "shoe-racks", label: "Shoe Racks", icon: Users },
  { id: "womens-wudhu", label: "Separate Women's Wudhu", icon: Droplets },
]

const SERVICES = [
  "Daily Jumu'ah Khutbah",
  "Eid Prayer (Eid ul-Fitr & Adha)",
  "Janazah / Funeral Prayers",
  "Nikah Ceremonies",
  "Islamic Classes (Adults)",
  "Quran Hifz Programme",
  "Children's Weekend School",
  "Ramadan Tarawih",
  "I'tikaf Facility",
  "Zakat Collection",
  "Community Iftar",
  "Da'wah Activities",
]

export default function MosqueProfilePage() {
  const [activeTab, setActiveTab] = useState("basic")

  return (
    <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8 max-w-5xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-600 font-black uppercase tracking-widest text-[10px]">
            <Moon className="h-3 w-3" /> Masjid Management
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground tracking-tight">About Masjid</h1>
          <p className="text-sm font-bold text-muted-foreground">Update your mosque's public profile, facilities, and services.</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 rounded-2xl px-8 font-black shadow-lg shadow-teal-200 h-12 text-white">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-card border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="basic" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-teal-600 data-[state=active]:text-white transition-all">Basic Info</TabsTrigger>
          <TabsTrigger value="facilities" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Facilities</TabsTrigger>
          <TabsTrigger value="services" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Prayer & Services</TabsTrigger>
          <TabsTrigger value="contact" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Contact & Gallery</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-8 animate-in fade-in duration-500">
          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Building className="h-5 w-5 text-teal-600" /> Basic Information
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Mosque Name</Label>
                  <Input placeholder="e.g., Jama Masjid" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Mosque Type</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none shadow-xl">
                      <SelectItem value="mosque">Mosque (Masjid)</SelectItem>
                      <SelectItem value="musallah">Musallah / Prayer Room</SelectItem>
                      <SelectItem value="jama">Jama Masjid</SelectItem>
                      <SelectItem value="eidgah">Eidgah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Year Established</Label>
                  <Input type="number" placeholder="e.g., 1656" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Committee / Trust Name</Label>
                  <Input placeholder="e.g., Delhi Waqf Board" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Imam / Khatib Name</Label>
                  <Input placeholder="e.g., Syed Shaban Bukhari" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">About Mosque</Label>
                  <Textarea
                    placeholder="Tell the community about your mosque's history, tradition, and mission..."
                    className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium"
                  />
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="facilities" className="space-y-8 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Users className="h-5 w-5 text-teal-600" /> Available Facilities
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Select all facilities available at your mosque.</p>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {facilities.map((facility) => (
                  <div key={facility.id} className="flex items-center space-x-3 p-4 bg-muted rounded-2xl border border-transparent hover:border-teal-200 transition-all cursor-pointer">
                    <Checkbox id={facility.id} className="border-teal-300" />
                    <Label htmlFor={facility.id} className="flex items-center gap-2.5 text-sm font-bold cursor-pointer">
                      <facility.icon className="h-4 w-4 text-teal-600 shrink-0" />
                      {facility.label}
                    </Label>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-6">
            <h3 className="text-lg font-black flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-teal-600" /> Capacity
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Main Hall Capacity</Label>
                <Input type="number" placeholder="e.g., 2000" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Women's Section Capacity</Label>
                <Input type="number" placeholder="e.g., 500" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Parking Spaces</Label>
                <Input type="number" placeholder="e.g., 120" className="h-12 rounded-2xl bg-muted border-none font-bold" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-8 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Moon className="h-5 w-5 text-teal-600" /> Services & Programmes
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Select all services and programmes your mosque offers.</p>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {SERVICES.map((svc) => (
                  <div key={svc} className="flex items-center space-x-3 p-4 bg-muted rounded-2xl border border-transparent hover:border-teal-200 transition-all cursor-pointer">
                    <Checkbox id={`svc-${svc}`} className="border-teal-300" />
                    <Label htmlFor={`svc-${svc}`} className="text-sm font-bold cursor-pointer">{svc}</Label>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Clock className="h-5 w-5 text-teal-600" /> Prayer Times Display
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha", "Jumu'ah"].map((prayer) => (
                  <div key={prayer} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-black text-teal-600">{prayer}</div>
                    <Input placeholder="e.g., 05:30 AM" className="h-11 rounded-2xl bg-muted border-none font-bold flex-1" />
                  </div>
                ))}
              </div>
              <p className="text-xs font-bold text-muted-foreground mt-6">These times are displayed on your public mosque listing and updated manually. Automatic prayer time sync is available on Pro plan.</p>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="contact" className="space-y-8 animate-in fade-in duration-500">
          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <MapPin className="h-5 w-5 text-teal-600" /> Location
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Full Address</Label>
                  <Input placeholder="e.g., Jama Masjid, Chandni Chowk, Old Delhi" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-6">
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Area / Locality</Label>
                    <Input placeholder="e.g., Old Delhi" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">City</Label>
                    <Input placeholder="e.g., New Delhi" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                  </div>
                </div>
                <div className="h-40 bg-muted rounded-2xl flex items-center justify-center">
                  <p className="text-sm text-muted-foreground font-medium">Map preview appears here</p>
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <Phone className="h-5 w-5 text-teal-600" /> Contact & Social
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Contact Number</Label>
                  <Input type="tel" placeholder="+91 11 2345 6789" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">WhatsApp (Optional)</Label>
                  <Input type="tel" placeholder="+91 98765 43210" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
              </div>
              <div className="space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Social Media</Label>
                {[
                  { label: "Instagram", icon: Instagram },
                  { label: "Facebook", icon: Facebook },
                  { label: "YouTube", icon: Youtube },
                ].map(({ label, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input placeholder={`${label} URL`} className="h-11 rounded-2xl bg-muted border-none font-bold" />
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2">
              <UploadCloud className="h-5 w-5 text-teal-600" /> Branding
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {["Mosque Logo (1:1)", "Cover Photo (16:9)"].map((label) => (
                <Card key={label} className="rounded-[2rem] border-none shadow-sm bg-card overflow-hidden">
                  <div className="relative border-2 border-dashed border-border rounded-[1.5rem] m-4 p-8 text-center hover:border-teal-300 transition-colors flex flex-col justify-center items-center gap-3">
                    <UploadCloud className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm font-black text-muted-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">PNG or JPG · Max 5MB</p>
                    <Input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}
