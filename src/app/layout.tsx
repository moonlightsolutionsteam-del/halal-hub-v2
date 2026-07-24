import type { Metadata } from "next";
import './globals.css';
import RootLayoutClient from "./layout-client";

export const metadata: Metadata = {
  title: {
    default: "Halal Hub — Mumbai's Halal Directory",
    template: "%s | Halal Hub",
  },
  description: "Discover halal restaurants, mosques, professionals, events, and services across Mumbai and India. Your all-in-one Islamic lifestyle platform.",
  keywords: ["halal", "halal food Mumbai", "mosques Mumbai", "Islamic services India", "halal restaurants", "prayer times Mumbai", "halal check"],
  authors: [{ name: "Halal Hub" }],
  creator: "Halal Hub",
  metadataBase: new URL("https://halalhub.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Halal Hub",
    title: "Halal Hub — Mumbai's Halal Directory",
    description: "Discover halal restaurants, mosques, professionals, events, and services across Mumbai and India.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Halal Hub" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Halal Hub — Mumbai's Halal Directory",
    description: "Discover halal restaurants, mosques, professionals, events, and services across Mumbai and India.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#04A15A" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-primary/20 overflow-x-hidden bg-background text-foreground">
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
