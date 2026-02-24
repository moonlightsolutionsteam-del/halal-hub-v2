
"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Save, ShieldCheck, CircleDollarSign, TrendingUp, 
  Scale, FileText, Info, Building2, Lock
} from "lucide-react";

const PRODUCTS = ["Shariah Savings", "Mudarabah Funds", "Real Estate Sukuk", "Islamic Mortgages", "Business Takaful", "Venture Equity"];
const COMPLIANCE_STANDARDS = ["Shariah Board Oversight", "AAOIFI Compliant", "Independent Annual Audit", "Fatwa Certificates Available", "Zero-Riba Guaranteed", "Ethical-Only Portfolio"];

export default function FinanceProfilePage() {
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-7xl pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black font-headline tracking-tight text-slate-900">Financial Entity Profile</h1>
          <p className="text-muted-foreground font-medium">Manage your institutional identity, Shariah board details, and product catalog.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-2xl px-8 font-black shadow-lg shadow-indigo-200 h-12 text-white">
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="bg-white border rounded-2xl h-14 p-1 shadow-sm w-full md:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="details" className="rounded-xl px-8 font-bold text-sm h-full data-[state=active]:bg-indigo-600 data-[state=active]:text-white">Institution Info</TabsTrigger>
          <TabsTrigger value="compliance" className="rounded-xl px-8 font-bold text-sm h-full">Compliance</TabsTrigger>
          <TabsTrigger value="products" className="rounded-xl px-8 font-bold text-sm h-full">Product Catalog</TabsTrigger>
          <TabsTrigger value="documents" className="rounded-xl px-8 font-bold text-sm h-full">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-10 animate-in fade-in duration-500">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Building2 className="h-5 w-5 text-indigo-600" /> Institutional Profile
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Entity Name</Label>
                  <Input placeholder="e.g., Amanah Islamic Bank" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Regulatory License #</Label>
                  <Input placeholder="Enter license number" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Executive Summary</Label>
                  <Textarea placeholder="Detail your financial philosophy and history..." className="min-h-[120px] rounded-2xl bg-slate-50 border-none p-4 font-medium" />
                </div>
              </div>
            </Card>
          </section>
        </TabsContent>

        <TabsContent value="compliance" className="animate-in fade-in duration-500 space-y-10">
          <section className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black flex items-center gap-2">
                <Scale className="h-5 w-5 text-indigo-600" /> Shariah Governance
              </h2>
            </div>
            <Card className="rounded-[2rem] border-none shadow-sm bg-white p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {COMPLIANCE_STANDARDS.map((item) => (
                  <div key={item} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-indigo-200 transition-all">
                    <Checkbox id={`comp-${item}`} />
                    <label htmlFor={`comp-${item}`} className="text-sm font-bold text-slate-700">{item}</label>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-xs uppercase tracking-widest text-slate-500">Shariah Board Lead Member</Label>
                <Input placeholder="Enter Scholar Name" className="h-12 rounded-2xl bg-slate-50 border-none font-bold" />
              </div>
            </Card>
          </section>

          <Card className="rounded-[2.5rem] border-none shadow-xl bg-slate-900 text-white p-10 space-y-8">
            <h3 className="text-2xl font-black font-headline text-white">Trust & Compliance Declaration</h3>
            <p className="text-sm text-slate-400 font-medium">I declare that our institution strictly adheres to AAOIFI standards and that all products listed are governed by our Shariah Supervisory Board. Misrepresentation will result in immediate termination.</p>
            <Button className="w-full h-16 rounded-[1.5rem] bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xl shadow-2xl">Confirm Institutional Status</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
