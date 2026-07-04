"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Store, Wrench, Building2, Users, 
  PenTool, Calendar, Award, ChevronRight,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";

const PARTNER_TYPES = [
  {
    title: "Business",
    highlight: "Create & Manage Your Business Profile",
    description: "List your restaurant, meat shop, retail store, or service-based business on Halal Hub. Upload menus, photos, offers, and connect with halal-conscious customers.",
    icon: Store,
    url: "/partner/onboarding/business/category"
  },
  {
    title: "Professionals",
    highlight: "For Service-Based Professionals",
    description: "Register and manage your professional services, such as legal, medical, or financial expertise. Connect with clients seeking trusted professionals.",
    icon: Wrench,
    url: "/vendor/professional/dashboard"
  },
  {
    title: "Mosque",
    highlight: "Create and Manage a Masjid",
    description: "Add a new masjid or connect with an existing one as a Musalli or Masjid Admin. Manage prayer timings, announcements, events, and programs.",
    icon: Building2,
    url: "/vendor/mosque/dashboard"
  },
  {
    title: "Muslim Organization",
    highlight: "For Cause-Driven Initiatives",
    description: "Register and manage your Islamic organization—NGOs, community groups, educational institutes, da'wah foundations, and more.",
    icon: Users,
    url: "/vendor/organization/dashboard"
  },
  {
    title: "Creator Studio",
    highlight: "For Digital Content Creators & Islamic Representatives",
    description: "For influencers, speakers, educators, scholars, counselors, and digital creators who want to grow their online presence, manage collaborations, publish content, and professionally represent their work on Halal Hub.",
    icon: PenTool,
    url: "/vendor/creative/dashboard"
  },
  {
    title: "Events & Conferences",
    highlight: "For Event Organizers",
    description: "Manage your conferences, expos, and large-scale community events from a dedicated dashboard.",
    icon: Calendar,
    url: "/vendor/events/dashboard"
  },
  {
    title: "Certification Body",
    highlight: "For Halal Certification Bodies",
    description: "Manage your certification services, client businesses, and compliance reporting.",
    icon: Award,
    url: "/admin/certification-body"
  }
];

export default function PartnerPortalPage() {
  return (
    <div className="min-h-screen bg-muted/50 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="space-y-1 border-b pb-8">
          <h1 className="text-3xl font-black font-headline text-foreground">Welcome On Board</h1>
          <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs opacity-60">Sign Up as Partner / Admin</p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PARTNER_TYPES.map((type) => (
            <Link key={type.title} href={type.url}>
              <Card className="group h-full rounded-[2rem] border-none shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden bg-card/80 backdrop-blur-sm cursor-pointer border-2 border-transparent hover:border-primary/20">
                <CardContent className="p-8 flex gap-6">
                  <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 text-primary">
                    <type.icon className="h-8 w-8" />
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-foreground">{type.title}</h3>
                      <p className="text-sm font-bold text-primary">{type.highlight}</p>
                    </div>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed line-clamp-3">
                      {type.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Admin Section */}
        <div className="space-y-8 pt-12">
          <div className="text-center">
            <p className="text-sm font-black text-muted-foreground uppercase tracking-[0.2em]">For Internal Team</p>
          </div>
          <Card className="max-w-md mx-auto rounded-[2.5rem] border-none shadow-2xl overflow-hidden bg-card p-2">
            <CardContent className="p-8 space-y-6 text-center">
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-black text-foreground">Halal Hub Super Admin</h3>
              <Link href="/admin/dashboard">
                <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 font-black text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95">
                  Admin Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
