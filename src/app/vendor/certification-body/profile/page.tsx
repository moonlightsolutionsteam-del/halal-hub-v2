"use client"

import { Award, Globe, Phone, Mail, MapPin, Upload, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function OrganisationProfilePage() {
  return (
    <div className="p-4 sm:p-8 space-y-6 sm:space-y-8 bg-background min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Certification Body</div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline text-foreground">Organisation Profile</h1>
          <p className="text-muted-foreground font-medium text-sm">Manage your public listing and accreditation details on Halal Hub.</p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-12 px-8 font-black gap-2">
          <Save className="h-4 w-4" /> Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-[2rem] border-none shadow-sm bg-card">
            <CardHeader className="p-6 sm:p-8 border-b">
              <CardTitle className="text-xl font-black">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 space-y-5">
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest">Organisation Name</Label>
                <Input defaultValue="Halal Integrity Council" className="rounded-2xl h-12 font-medium" />
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest">About / Description</Label>
                <Textarea
                  defaultValue="An accredited halal certification body providing audit, inspection and certification services across food, cosmetics, pharmaceuticals and logistics."
                  className="rounded-2xl font-medium min-h-[120px]"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-black text-xs uppercase tracking-widest">Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input defaultValue="halalintegrity.org" className="pl-9 rounded-2xl h-12 font-medium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-black text-xs uppercase tracking-widest">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input defaultValue="+91 22 1234 5678" className="pl-9 rounded-2xl h-12 font-medium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-black text-xs uppercase tracking-widest">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input defaultValue="info@halalintegrity.org" className="pl-9 rounded-2xl h-12 font-medium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="font-black text-xs uppercase tracking-widest">City / Country</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input defaultValue="Mumbai, India" className="pl-9 rounded-2xl h-12 font-medium" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border-none shadow-sm bg-card">
            <CardHeader className="p-6 sm:p-8 border-b">
              <CardTitle className="text-xl font-black">Accreditation & Standards</CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 space-y-5">
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest">Accreditation Body</Label>
                <Input defaultValue="JAKIM, MUI, ESMA" className="rounded-2xl h-12 font-medium" />
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest">Halal Standards Followed</Label>
                <Input defaultValue="MS 1500:2019, GSO 2055-1, OIC/SMIIC 1" className="rounded-2xl h-12 font-medium" />
              </div>
              <div className="space-y-2">
                <Label className="font-black text-xs uppercase tracking-widest">Sectors Covered</Label>
                <Input defaultValue="Food, Cosmetics, Pharmaceuticals, Logistics, Finance" className="rounded-2xl h-12 font-medium" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-6 sm:p-8">
            <CardHeader className="px-0 pt-0 pb-4">
              <CardTitle className="text-xl font-black">Organisation Logo</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-4">
              <div className="h-32 w-32 rounded-3xl bg-emerald-50 flex items-center justify-center mx-auto border-2 border-dashed border-emerald-200">
                <Award className="h-12 w-12 text-emerald-400" />
              </div>
              <Button variant="outline" className="w-full rounded-2xl border-2 font-black text-xs uppercase tracking-widest h-12 gap-2">
                <Upload className="h-4 w-4" /> Upload Logo
              </Button>
              <p className="text-[10px] text-muted-foreground text-center font-medium">PNG or JPG, max 2MB. Recommended 400×400px.</p>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-6 sm:p-8">
            <CardHeader className="px-0 pt-0 pb-4">
              <CardTitle className="text-xl font-black">Accreditation Docs</CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-3">
              {["Accreditation Certificate", "Scope of Accreditation", "Insurance Certificate"].map((doc) => (
                <div key={doc} className="flex items-center justify-between p-3 rounded-2xl bg-muted/50">
                  <span className="text-sm font-bold text-foreground">{doc}</span>
                  <Button size="sm" variant="outline" className="rounded-xl font-black text-[10px] h-8 px-3 gap-1">
                    <Upload className="h-3 w-3" /> Upload
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
