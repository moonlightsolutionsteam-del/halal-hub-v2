
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
import { 
  Save, ShieldCheck, CircleDollarSign, TrendingUp, 
  Scale, FileText, Info, Building2, Lock,
  Globe, Phone, Mail, Award, Users,
  CheckCircle2, Plus, Smartphone, Trash2,
  Camera, Upload, Landmark, Microscope
} from "lucide-react";

const PRODUCTS = ["Shariah Savings", "Mudarabah Funds", "Real Estate Sukuk", "Islamic Mortgages", "Business Takaful", "Venture Equity", "Hajj Savings Plan"];
const COMPLIANCE_STANDARDS = ["Shariah Board Oversight", "AAOIFI Compliant", "Independent Annual Audit", "Fatwa Certificates Available", "Zero-Riba Guaranteed", "Ethical-Only Portfolio", "Transparent Fee Structure"];

export default function FinanceProfilePage() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black font-headline tracking-tight text-foreground">Institutional Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your institutional identity, Shariah board details, and global compliance status.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-2xl px-8 font-black shadow-lg shadow-indigo-200 h-12 text-white">
            <Save className="mr-2 h-4 w-4" /> Save Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-card border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="details" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-indigo-600 data-[state=active]:text-white transition-all">Basic Info</TabsTrigger>
          <TabsTrigger value="compliance" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Governance</TabsTrigger>
          <TabsTrigger value="products" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Products</TabsTrigger>
          <TabsTrigger value="documents" className="rounded-xl px-8 font-bold text-sm h-full transition-all">Verification</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Building2 className="h-5 w-5 text-indigo-600" /> Institution Profile
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Legal Entity Name</Label>
                  <Input placeholder="e.g., Amanah Islamic Bank" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Institution Type</Label>
                  <Select>
                    <SelectTrigger className="h-12 rounded-2xl bg-muted border-none font-bold">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-none shadow-xl">
                      <SelectItem value="bank">Retail Bank</SelectItem>
                      <SelectItem value="investment">Investment Firm</SelectItem>
                      <SelectItem value="fintech">Fintech Provider</SelectItem>
                      <SelectItem value="micro">Micro-Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">License Number</Label>
                  <Input placeholder="Central Bank / Reg Auth #" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Headquarters</Label>
                  <Input placeholder="e.g., Dubai, UAE" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Executive Summary</Label>
                  <Textarea placeholder="Detail your financial philosophy, ethical commitment, and AUM history..." className="min-h-[120px] rounded-2xl bg-muted border-none p-4 font-medium resize-none focus:ring-2 focus:ring-indigo-600/20" />
                </div>
              </div>
            </Card>
          </section>

          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Globe className="h-5 w-5 text-indigo-600" /> Global Presence
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Primary Contact Phone</Label>
                  <Input placeholder="+91 1800 555 0198" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Institutional Website</Label>
                  <Input placeholder="https://..." className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="compliance" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <Scale className="h-5 w-5 text-indigo-600" /> Shariah Governance
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Define your board structure and compliance methodology.</p>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8 space-y-10">
              <div className="space-y-4">
                <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Governance Standards</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {COMPLIANCE_STANDARDS.map((item) => (
                    <div key={item} className="flex items-center space-x-3 p-4 bg-muted rounded-2xl border border-transparent hover:border-indigo-200 transition-all cursor-pointer group">
                      <Checkbox id={`std-${item}`} className="border-indigo-300" />
                      <label htmlFor={`std-${item}`} className="text-xs font-bold text-foreground cursor-pointer">{item}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Shariah Board Chair</Label>
                  <Input placeholder="Enter Scholar Name" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-muted-foreground">Board Size</Label>
                  <Input type="number" placeholder="Number of Members" className="h-12 rounded-2xl bg-muted border-none font-bold" />
                </div>
              </div>
            </Card>
          </section>

          <Card className="rounded-[2.5rem] border-none shadow-xl bg-zinc-900 text-white p-10 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <CheckCircle2 className="h-32 w-32" />
            </div>
            <div className="relative z-10 space-y-4">
              <h3 className="text-2xl font-black font-headline">Compliance Commitment</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-3xl">
                I declare that our institution strictly adheres to AAOIFI standards and that all products listed are governed by our Shariah Supervisory Board. We commit to transparency in all asset deployments and fee structures.
              </p>
            </div>
            <div className="flex items-center space-x-4 bg-card/5 p-4 rounded-2xl border border-white/10 relative z-10">
              <Checkbox id="decl-fin" className="border-white/30" />
              <label htmlFor="decl-fin" className="text-sm font-bold text-white/80 cursor-pointer">I confirm that all institutional data is accurate.</label>
            </div>
            <Button className="w-full h-16 rounded-[1.5rem] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xl shadow-2xl relative z-10">
              Publish Institutional Profile
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-8 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <CircleDollarSign className="h-5 w-5 text-indigo-600" /> Active Product Catalog
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRODUCTS.map((prod, i) => (
                <Card key={i} className="rounded-[2rem] border-none shadow-sm bg-card p-6 flex flex-col justify-between group hover:shadow-md transition-all">
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                      <Landmark className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-black text-foreground">{prod}</h3>
                  </div>
                  <div className="pt-6 mt-6 border-t border-border flex justify-between items-center">
                    <Badge variant="outline" className="text-[10px] font-black uppercase border-indigo-100 text-indigo-600">Active</Badge>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50 rounded-xl"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </Card>
              ))}
              <button className="rounded-[2rem] border-4 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center p-8 text-center gap-4 hover:bg-card hover:border-indigo-200 transition-all cursor-pointer group">
                <div className="h-12 w-12 bg-card rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Plus className="h-6 w-6 text-indigo-600" />
                </div>
                <p className="font-black text-sm text-foreground">Add Product</p>
              </button>
            </div>
          </section>
        </TabsContent>

        <TabsContent value="documents" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
                <FileText className="h-5 w-5 text-indigo-600" /> Regulatory Documents
              </h2>
              <p className="text-sm text-muted-foreground font-medium">Upload your regulatory licenses, central bank approvals, and compliance certificates.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Central Bank License", hint: "PDF · Max 10MB" },
                { label: "Shariah Supervisory Board Fatwa", hint: "PDF · Max 10MB" },
                { label: "Annual Shariah Audit Report", hint: "PDF · Max 10MB" },
                { label: "AAOIFI Compliance Certificate", hint: "PDF · Max 10MB" },
                { label: "KYC/AML Policy Document", hint: "PDF · Max 10MB" },
                { label: "Board of Directors Resolution", hint: "PDF · Max 10MB" },
              ].map((doc) => (
                <Card key={doc.label} className="rounded-[2rem] border-none shadow-sm bg-card p-6 flex items-center justify-between group hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <Lock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-black text-sm text-foreground">{doc.label}</p>
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{doc.hint}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl font-black text-xs h-9 border-2 border-indigo-100 text-indigo-600 hover:bg-indigo-50">
                    <Camera className="mr-1.5 h-3.5 w-3.5" /> Upload
                  </Button>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-black flex items-center gap-2 text-foreground">
              <Award className="h-5 w-5 text-indigo-600" /> Active Accreditations
            </h2>
            <Card className="rounded-[2rem] border-none shadow-sm bg-card p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["AAOIFI", "IFSB", "CIBAFI", "IDB Group", "IsDB Member", "GCC Central Bank", "FCA (UK)", "MAS (SG)"].map((body) => (
                  <div key={body} className="flex items-center space-x-3 bg-muted p-3 rounded-xl">
                    <Checkbox id={`acc-${body}`} className="border-indigo-300" />
                    <label htmlFor={`acc-${body}`} className="text-xs font-bold text-foreground">{body}</label>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <Card className="rounded-[2.5rem] border-none shadow-xl bg-zinc-900 text-white p-10 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Microscope className="h-32 w-32" />
            </div>
            <div className="relative z-10 space-y-3">
              <h3 className="text-2xl font-black font-headline">Verification Commitment</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed max-w-3xl">
                I declare that all uploaded documents are genuine, current, and accurately represent our institution's regulatory standing. False submissions will result in immediate de-listing.
              </p>
            </div>
            <div className="flex items-center space-x-4 bg-white/5 p-4 rounded-2xl border border-white/10 relative z-10">
              <Checkbox id="decl-docs" className="border-white/30" />
              <label htmlFor="decl-docs" className="text-sm font-bold text-white/80 cursor-pointer">I confirm all documents are authentic and up to date.</label>
            </div>
            <Button className="w-full h-16 rounded-[1.5rem] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xl shadow-2xl relative z-10">
              Submit for Verification
            </Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
