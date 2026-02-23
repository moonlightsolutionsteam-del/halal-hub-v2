import type {Metadata} from 'next';
import './globals.css';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Search, Compass } from "lucide-react";
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
            <div className="flex flex-1 flex-col overflow-hidden">
              {/* Global Header */}
              <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
                    <Compass className="h-5 w-5" />
                  </div>
                  <span className="text-xl font-black text-primary font-headline tracking-tight">Halal Hub</span>
                </div>
                <div className="flex items-center gap-4 flex-1 justify-center max-w-2xl px-8">
                  <div className="relative w-full">
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
                    <Avatar className="h-9 w-9 border-2 border-primary/10 hover:border-primary/30 transition-colors">
                      <AvatarImage src="https://picsum.photos/seed/user/100/100" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Link>
                </div>
              </header>
              <main className="flex-1 overflow-y-auto relative p-6">
                <div className="min-h-full pb-24 md:pb-8 max-w-7xl mx-auto">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
