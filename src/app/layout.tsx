"use client"

import * as React from 'react';
import { usePathname } from 'next/navigation';
import './globals.css';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/user-sidebar";
import { AdminSidebar } from "@/components/admin-sidebar";
import { VendorSidebar } from "@/components/vendor-sidebar";
import { ButcherSidebar } from "@/components/butcher-sidebar";
import { GrocerySidebar } from "@/components/grocery-sidebar";
import { EventsSidebar } from "@/components/events-sidebar";
import { CateringSidebar } from "@/components/catering-sidebar";
import { HotelSidebar } from "@/components/hotel-sidebar";
import { TravelSidebar } from "@/components/travel-sidebar";
import { FashionSidebar } from "@/components/fashion-sidebar";
import { CosmeticsSidebar } from "@/components/cosmetics-sidebar";
import { FinanceSidebar } from "@/components/finance-sidebar";
import { HealthcareSidebar } from "@/components/healthcare-sidebar";
import { EducationSidebar } from "@/components/education-sidebar";
import { MediaSidebar } from "@/components/media-sidebar";
import { CreativeSidebar } from "@/components/creative-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { MessageSquare, Home, Search, Compass, Globe, User, ShieldCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isAdminPath = pathname?.startsWith('/admin');
  const isVendorPath = pathname?.startsWith('/vendor');
  const isButcherPath = pathname?.startsWith('/vendor/butcher');
  const isGroceryPath = pathname?.startsWith('/vendor/grocery');
  const isEventsPath = pathname?.startsWith('/vendor/events');
  const isCateringPath = pathname?.startsWith('/vendor/catering');
  const isHotelPath = pathname?.startsWith('/vendor/hotel');
  const isTravelPath = pathname?.startsWith('/vendor/travel');
  const isFashionPath = pathname?.startsWith('/vendor/fashion');
  const isCosmeticsPath = pathname?.startsWith('/vendor/cosmetics');
  const isFinancePath = pathname?.startsWith('/vendor/finance');
  const isHealthcarePath = pathname?.startsWith('/vendor/healthcare');
  const isEducationPath = pathname?.startsWith('/vendor/education');
  const isMediaPath = pathname?.startsWith('/vendor/media');
  const isCreativePath = pathname?.startsWith('/vendor/creative');

  const getSidebar = () => {
    if (isAdminPath) return <AdminSidebar />;
    if (isButcherPath) return <ButcherSidebar />;
    if (isGroceryPath) return <GrocerySidebar />;
    if (isEventsPath) return <EventsSidebar />;
    if (isCateringPath) return <CateringSidebar />;
    if (isHotelPath) return <HotelSidebar />;
    if (isTravelPath) return <TravelSidebar />;
    if (isFashionPath) return <FashionSidebar />;
    if (isCosmeticsPath) return <CosmeticsSidebar />;
    if (isFinancePath) return <FinanceSidebar />;
    if (isHealthcarePath) return <HealthcareSidebar />;
    if (isEducationPath) return <EducationSidebar />;
    if (isMediaPath) return <MediaSidebar />;
    if (isCreativePath) return <CreativeSidebar />;
    if (isVendorPath) return <VendorSidebar />;
    return <UserSidebar />;
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-primary/20 overflow-x-hidden">
        <SidebarProvider defaultOpen={false}>
          <div className="flex min-h-screen w-full bg-[#FBFBFB]">
            {getSidebar()}
            
            <div className="flex flex-1 flex-col overflow-hidden relative">
              {/* Global High-Fidelity Header */}
              <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md px-4 sm:px-6 py-4 flex items-center justify-between border-b shadow-sm">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="text-slate-600 hover:text-primary transition-colors h-10 w-10" />
                  <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-xl shadow-primary/20 transition-transform group-hover:scale-105">
                      <MessageSquare className="h-5 w-5 fill-current" />
                    </div>
                    <span className="text-xl font-black text-primary font-headline tracking-tight whitespace-nowrap hidden sm:block">Halal Hub</span>
                  </Link>
                </div>

                {!isAdminPath && !isVendorPath && (
                  <div className="hidden md:flex items-center relative w-96 max-w-lg mx-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search for food, products, mosques..." 
                      className="pl-9 h-11 rounded-2xl bg-muted/30 border-none font-medium text-sm focus:ring-primary/20"
                    />
                  </div>
                )}
                
                <div className="flex items-center gap-4">
                  <div className="hidden lg:flex flex-col items-end">
                    <span className="text-[10px] font-black uppercase text-slate-400 leading-none mb-1">Your Location</span>
                    <span className="text-xs font-bold text-slate-700">New York, USA</span>
                  </div>
                  <Link href="/account/dashboard">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-md hover:shadow-lg transition-all ring-2 ring-primary/10">
                      <AvatarImage src="https://picsum.photos/seed/user/100/100" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Link>
                </div>
              </header>

              <main className="flex-1 overflow-y-auto relative bg-[#F8FAFB]">
                <div className="max-w-[1440px] mx-auto pb-24 md:pb-8">
                  {children}
                </div>
              </main>

              {/* Mobile Floating Bottom Nav - Only for Consumer view */}
              {!isAdminPath && !isVendorPath && (
                <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[90%] max-w-[400px]">
                  <div className="bg-white/90 backdrop-blur-xl border border-white/50 rounded-full h-16 shadow-2xl flex items-center justify-around px-2 ring-1 ring-black/5">
                    <Link href="/" className={`p-3 rounded-full transition-all ${mounted && pathname === '/' ? 'text-primary bg-primary/10 scale-110' : 'text-slate-400'}`}>
                      <Home className="h-6 w-6" />
                    </Link>
                    <Link href="/verifier" className={`p-3 rounded-full transition-all ${mounted && pathname === '/verifier' ? 'text-primary bg-primary/10 scale-110' : 'text-slate-400'}`}>
                      <ShieldCheck className="h-6 w-6" />
                    </Link>
                    <Link href="/restaurants" className={`p-3 rounded-full transition-all ${mounted && pathname === '/restaurants' ? 'text-primary bg-primary/10 scale-110' : 'text-slate-400'}`}>
                      <Compass className="h-6 w-6" />
                    </Link>
                    <Link href="/community" className={`p-3 rounded-full transition-all ${mounted && pathname === '/community' ? 'text-primary bg-primary/10 scale-110' : 'text-slate-400'}`}>
                      <Globe className="h-6 w-6" />
                    </Link>
                    <Link href="/account/dashboard" className={`p-3 rounded-full transition-all ${mounted && pathname?.startsWith('/account') ? 'text-primary bg-primary/10 scale-110' : 'text-slate-400'}`}>
                      <User className="h-6 w-6" />
                    </Link>
                  </div>
                </nav>
              )}
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
