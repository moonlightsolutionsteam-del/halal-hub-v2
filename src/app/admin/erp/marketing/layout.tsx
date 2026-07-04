
"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link 
      href={href} 
      className={cn(
        "px-4 py-2 text-muted-foreground font-semibold hover:text-primary whitespace-nowrap",
        isActive && "border-b-2 border-primary text-primary"
      )}
    >
      {children}
    </Link>
  );
};


export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="space-y-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Marketing</h2>
          <p className="text-muted-foreground">
            Manage blog content, campaigns, social media, and analytics.
          </p>
        </div>
        <div className="flex items-center border-b overflow-x-auto no-scrollbar">
            <NavLink href="/SKIP_ADMIN_ERP/marketing/dashboard">Dashboard</NavLink>
            <NavLink href="/SKIP_ADMIN_ERP/marketing/blog">Blog</NavLink>
            <NavLink href="/SKIP_ADMIN_ERP/marketing/campaigns">Campaigns</NavLink>
            <NavLink href="/SKIP_ADMIN_ERP/marketing/social">Social Media</NavLink>
            <NavLink href="/SKIP_ADMIN_ERP/marketing/analytics">Analytics</NavLink>
        </div>
        <div className="mt-4">
            {children}
        </div>
    </div>
  );
}
