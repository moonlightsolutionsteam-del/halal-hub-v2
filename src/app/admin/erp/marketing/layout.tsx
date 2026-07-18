
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
        "px-4 py-1.5 text-sm font-bold text-muted-foreground hover:text-foreground whitespace-nowrap rounded-full transition-colors",
        isActive && "bg-primary/10 text-primary"
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
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black font-headline">Marketing</h2>
          <p className="text-sm text-muted-foreground font-medium">
            Manage blog content, campaigns, social media, and analytics.
          </p>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
            <NavLink href="/admin/erp/marketing/dashboard">Dashboard</NavLink>
            <NavLink href="/admin/erp/marketing/blog">Blog</NavLink>
            <NavLink href="/admin/erp/marketing/campaigns">Campaigns</NavLink>
            <NavLink href="/admin/erp/marketing/social">Social Media</NavLink>
            <NavLink href="/admin/erp/marketing/analytics">Analytics</NavLink>
        </div>
        <div>
            {children}
        </div>
    </div>
  );
}
