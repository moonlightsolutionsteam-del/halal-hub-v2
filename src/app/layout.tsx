
import type {Metadata} from 'next';
import './globals.css';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";
import { MessageSquare } from "lucide-react";
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
      <body className="antialiased selection:bg-primary/20">
        <SidebarProvider defaultOpen={false}>
          <div className="flex min-h-screen w-full bg-[#FBFBFB]">
            <AppSidebar />
            <div className="flex flex-1 flex-col overflow-hidden relative">
              {/* High-Fidelity Header matching screenshot */}
              <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <SidebarTrigger className="text-slate-600 hover:text-primary transition-colors h-10 w-10" />
                  <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-xl shadow-primary/20 transition-transform group-hover:scale-105">
                      <MessageSquare className="h-6 w-6 fill-current" />
                    </div>
                    <span className="text-2xl font-black text-primary font-headline tracking-tight">Halal Hub</span>
                  </Link>
                </div>
                
                <div className="flex items-center gap-6">
                  <span className="text-sm font-bold text-slate-700 hidden sm:block">Delhi</span>
                  <Link href="/account/dashboard">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-md hover:shadow-lg transition-all">
                      <AvatarImage src="https://picsum.photos/seed/user/100/100" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Link>
                </div>
              </header>

              <main className="flex-1 overflow-y-auto relative p-6">
                <div className="max-w-[1440px] mx-auto pb-20">
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
