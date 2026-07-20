"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname()
  return (
    <Link href={href} className={cn(
      "px-4 py-1.5 text-sm font-bold text-muted-foreground hover:text-foreground whitespace-nowrap rounded-full transition-colors",
      pathname.startsWith(href) && "bg-primary/10 text-primary"
    )}>
      {children}
    </Link>
  )
}

export default function BiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black font-headline">Business Intelligence</h2>
        <p className="text-sm text-muted-foreground font-medium">Platform KPIs, growth cohorts, geo analytics, and unit economics.</p>
      </div>
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
        <NavLink href="/admin/erp/bi/kpis">Platform KPIs</NavLink>
        <NavLink href="/admin/erp/bi/cohorts">Cohorts</NavLink>
        <NavLink href="/admin/erp/bi/geo">Geo Analytics</NavLink>
        <NavLink href="/admin/erp/bi/unit-economics">Unit Economics</NavLink>
        <NavLink href="/admin/erp/bi/google-analytics">Google Analytics</NavLink>
      </div>
      <div>{children}</div>
    </div>
  )
}
