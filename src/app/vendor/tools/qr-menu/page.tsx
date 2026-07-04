"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  QrCode, Download, Printer, Settings, 
  Smartphone, Share2, Eye, Layout,
  Palette, SmartphoneNfc, Plus
} from "lucide-react";
import Image from "next/image";

export default function QRMenuGeneratorPage() {
  return (
    <div className="container mx-auto p-6 space-y-8 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px]">
            <QrCode className="h-3 w-3" /> Digital Hospitality
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-headline">QR Menu Generator</h1>
          <p className="text-muted-foreground font-medium">Create and customize contactless dining experiences for your guests.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="rounded-full px-6 font-bold border-2">
            <Layout className="mr-2 h-4 w-4" /> Layouts
          </Button>
          <Button className="bg-primary rounded-full px-8 font-bold shadow-lg shadow-primary/20">
            <SmartphoneNfc className="mr-2 h-4 w-4" /> Go Live
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8">
        <div className="lg:col-span-7 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 flex flex-col items-center text-center space-y-8">
            <div className="relative p-8 bg-muted rounded-[3rem] border-4 border-white shadow-inner">
              <div className="w-64 h-64 bg-card rounded-3xl flex items-center justify-center p-4 shadow-xl">
                <div className="w-full h-full relative">
                  <div className="absolute inset-0 bg-zinc-900 grid grid-cols-10 grid-rows-10 gap-1 p-2 opacity-10">
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div key={i} className="bg-zinc-900 rounded-sm" style={{ opacity: Math.random() > 0.5 ? 1 : 0 }} />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-card rounded-xl shadow-lg flex items-center justify-center border-2 border-primary/20">
                      <QrCode className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
              <Badge className="absolute -top-2 -right-2 bg-primary text-white border-4 border-white h-10 px-4 rounded-full font-black shadow-xl">ACTIVE</Badge>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-foreground">Your Contactless Menu</h3>
              <p className="text-sm text-muted-foreground font-medium max-w-sm">
                Customers can scan this code to view your full verified halal menu and place orders from their table.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="rounded-2xl h-14 px-8 font-black uppercase text-xs tracking-widest bg-zinc-900 text-white">
                <Download className="mr-2 h-4 w-4" /> Download QR
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl h-14 px-8 font-black uppercase text-xs tracking-widest border-2">
                <Printer className="mr-2 h-4 w-4" /> Print Sticker
              </Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8">
            <CardHeader className="px-0 pt-0 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-black">Visual Customization</CardTitle>
              <Button variant="ghost" className="font-bold text-primary">Reset to Default</Button>
            </CardHeader>
            <CardContent className="px-0 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">Brand Palette</p>
                <div className="flex gap-3">
                  {['#10B981', '#F59E0B', '#3B82F6', '#EF4444', '#000000'].map(color => (
                    <button key={color} className="h-10 w-10 rounded-xl shadow-sm border-2 border-white hover:scale-110 transition-transform" style={{ backgroundColor: color }} />
                  ))}
                  <button className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground"><Plus className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">QR Style</p>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-12 rounded-xl font-bold border-primary/20 bg-primary/5 text-primary">Rounded</Button>
                  <Button variant="outline" className="h-12 rounded-xl font-bold">Standard</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <Card className="rounded-[2.5rem] border-none shadow-sm bg-zinc-900 text-white p-8 relative overflow-hidden">
            <Smartphone className="absolute -top-4 -right-4 h-24 w-24 opacity-10" />
            <div className="relative z-10 space-y-6">
              <h3 className="text-xl font-black">Menu Preview</h3>
              <div className="aspect-[9/16] bg-card rounded-3xl overflow-hidden shadow-2xl border-4 border-border">
                <div className="bg-primary p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="h-2 w-8 bg-card/30 rounded-full" />
                    <div className="h-2 w-2 bg-card/30 rounded-full" />
                  </div>
                  <div className="h-4 w-24 bg-card/50 rounded-full" />
                </div>
                <div className="p-4 space-y-4 text-foreground">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-3 items-center">
                      <div className="h-10 w-10 bg-muted rounded-lg" />
                      <div className="space-y-1.5 flex-1">
                        <div className="h-2 w-20 bg-muted rounded-full" />
                        <div className="h-1.5 w-full bg-muted rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button className="w-full h-14 rounded-2xl bg-card text-foreground font-black text-xs uppercase tracking-widest hover:bg-muted">
                <Eye className="mr-2 h-4 w-4" /> Full Mobile Preview
              </Button>
            </div>
          </Card>

          <Card className="rounded-[2.5rem] border-none shadow-sm bg-card p-8 space-y-6">
            <h3 className="text-xl font-black">Scan Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-2xl">
                <p className="text-2xl font-black text-foreground">1,240</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Total Scans</p>
              </div>
              <div className="p-4 bg-muted rounded-2xl">
                <p className="text-2xl font-black text-primary">85%</p>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Conversion</p>
              </div>
            </div>
            <Button variant="outline" className="w-full rounded-2xl h-12 border-2 font-black text-xs uppercase tracking-widest">
              View Detailed Analytics
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
