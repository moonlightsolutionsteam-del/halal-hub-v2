import type {Metadata} from 'next';
import './globals.css';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/toaster";

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
        <SidebarProvider defaultOpen={true}>
          <div className="flex min-h-screen w-full overflow-hidden bg-[#F8F9FA]">
            <AppSidebar />
            <main className="flex-1 overflow-y-auto relative">
              <div className="min-h-full pb-24 md:pb-8">
                {children}
              </div>
            </main>
          </div>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
