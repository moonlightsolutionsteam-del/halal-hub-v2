
"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ShieldCheck, Lock, FileText, Scale, 
  ArrowLeft, ChevronRight, Info, Zap,
  CheckCircle2, Globe, Clock, History
} from "lucide-react"
import Link from "next/link"

export default function TermsPage() {
  const sections = [
    {
      title: "1. Data Integrity & Trust",
      icon: ShieldCheck,
      content: "All information provided on Halal Hub regarding the halal status of entities is based on user submissions and independent audits. While we strive for 100% accuracy, we do not guarantee the status of any establishment. Users should always exercise their own judgment and verify certifications on-site."
    },
    {
      title: "2. User Conduct & Community",
      icon: Globe,
      content: "As a member of the Hub, you agree to interact with the community with respect and theological integrity. Any hate speech, misinformation regarding halal status, or spamming will lead to immediate account suspension."
    },
    {
      title: "3. Vendor Responsibility",
      icon: Scale,
      content: "Vendors are legally responsible for the documentation they upload. Any misrepresentation of halal supply chains is a violation of our core charter and will result in permanent removal from the directory."
    },
    {
      title: "4. Privacy & Encryption",
      icon: Lock,
      content: "Your data is end-to-end encrypted. We follow strict theological data privacy standards, ensuring that private family hub data and personal information are never sold to 3rd party advertising networks."
    }
  ];

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6 sm:space-y-12 max-w-4xl pb-32 text-foreground">
      <div className="flex flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors w-fit">
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-primary/5 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-headline text-foreground tracking-tight">Terms & Privacy</h1>
          </div>
          <p className="text-muted-foreground font-medium text-lg italic">The governing principles of our trusted community ecosystem.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          <Badge className="bg-primary text-white border-none font-black text-[10px] px-4 py-2 uppercase tracking-widest rounded-xl">Main Charter</Badge>
          <Badge variant="outline" className="text-muted-foreground border-border font-black text-[10px] px-4 py-2 uppercase tracking-widest rounded-xl">Privacy Policy</Badge>
          <Badge variant="outline" className="text-muted-foreground border-border font-black text-[10px] px-4 py-2 uppercase tracking-widest rounded-xl">Vendor Agreement</Badge>
          <Badge variant="outline" className="text-muted-foreground border-border font-black text-[10px] px-4 py-2 uppercase tracking-widest rounded-xl">Cookie Policy</Badge>
        </div>

        <section className="space-y-6">
          {sections.map((section, i) => (
            <Card key={i} className="rounded-[2.5rem] border-none shadow-sm bg-card p-10 space-y-6 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
                  <section.icon className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black text-foreground">{section.title}</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                {section.content}
              </p>
            </Card>
          ))}
        </section>

        <Card className="rounded-[3rem] border-none bg-zinc-900 text-white p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-10">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <ShieldCheck className="h-48 w-48 text-primary" />
          </div>
          <div className="h-20 w-20 rounded-[2rem] bg-card/10 flex items-center justify-center text-primary border border-white/10 shadow-2xl shrink-0 group hover:rotate-12 transition-transform">
            <Zap className="h-10 w-10 fill-current" />
          </div>
          <div className="space-y-4 relative z-10 text-center md:text-left flex-1">
            <h2 className="text-xl sm:text-3xl font-black font-headline">Latest Updates: Oct 2024</h2>
            <p className="text-muted-foreground font-medium text-lg leading-relaxed max-w-xl italic">
              "We've updated our data handling protocols to match the new high-fidelity Family Hub encryption standards. Your heritage is now safer than ever."
            </p>
          </div>
          <Button variant="outline" className="h-16 px-12 rounded-2xl border-2 border-white/20 text-white hover:bg-card/10 font-black uppercase text-sm tracking-widest relative z-10">Download PDF</Button>
        </Card>
      </div>
    </div>
  );
}
