import type {Metadata} from 'next';
import './globals.css';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Search, Compass, Home, UtensilsCrossed, ShieldCheck, Users, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Halal Hub - Your Global Halal Platform',
  description: 'The complete ecosystem for halal dining, product verification, and spiritual community.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/20">
        <SidebarProvider defaultOpen={false}>
          <div className="flex min-h-screen w-full bg-[#F8F9FA]">
            <AppSidebar />
            <div className="flex flex-1 flex-col overflow-hidden relative">
              {/* Global Header - Lower z-index to stay below Sidebar Drawer Overlay */}
              <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b px-4 md:px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <SidebarTrigger className="md:hidden text-primary" />
                  <div className="w-8 h-8 md:w-9 md:h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 shrink-0">
                    <Compass className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  <span className="text-lg md:text-xl font-black text-primary font-headline tracking-tight whitespace-nowrap">Halal Hub</span>
                </div>
                <div className="flex items-center gap-4 flex-1 justify-center max-w-2xl px-4 md:px-8">
                  <div className="relative w-full hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="Search products, places..." 
                      className="w-full bg-muted/50 border-none rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Link href="/account/dashboard">
                    <Avatar className="h-8 w-8 md:h-9 md:h-9 border-2 border-primary/10 hover:border-primary/30 transition-colors">
                      <AvatarImage src="https://picsum.photos/seed/user/100/100" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Link>
                </div>
              </header>

              <main className="flex-1 overflow-y-auto relative p-4 md:p-6">
                <div className="min-h-full pb-28 md:pb-8 max-w-7xl mx-auto">
                  {children}
                </div>
              </main>

              {/* Mobile Bottom Navigation - z-40 to stay behind Sidebar Drawer but above content */}
              <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-xl border border-primary/10 shadow-2xl rounded-full px-6 py-3 flex items-center gap-8 z-40 transition-all active:scale-95">
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  <Home className="h-6 w-6" />
                </Link>
                <Link href="/restaurants" className="text-muted-foreground hover:text-primary transition-colors">
                  <UtensilsCrossed className="h-6 w-6" />
                </Link>
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30 -translate-y-1 scale-110">
                  <Link href="/verifier">
                    <ShieldCheck className="h-6 w-6" />
                  </Link>
                </div>
                <Link href="/community" className="text-muted-foreground hover:text-primary transition-colors">
                  <Users className="h-6 w-6" />
                </Link>
                <Link href="/account/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  <User className="h-6 w-6" />
                </Link>
              </nav>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
