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

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black font-headline">Legal & Compliance</h2>
        <p className="text-sm text-muted-foreground font-medium">Contracts, compliance calendar, DPDP, legal cases, and policies.</p>
      </div>
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
        <NavLink href="/admin/erp/legal/contracts">Contracts</NavLink>
        <NavLink href="/admin/erp/legal/compliance">Compliance</NavLink>
        <NavLink href="/admin/erp/legal/dpdp">DPDP</NavLink>
        <NavLink href="/admin/erp/legal/cases">Cases</NavLink>
        <NavLink href="/admin/erp/legal/policies">Policies</NavLink>
      </div>
      <div>{children}</div>
    </div>
  )
}
