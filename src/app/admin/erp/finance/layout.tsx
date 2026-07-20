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

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black font-headline">Finance</h2>
        <p className="text-sm text-muted-foreground font-medium">Budget planning, cash flow, MIS reports, fundraising, and TDS compliance.</p>
      </div>
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
        <NavLink href="/admin/erp/finance/budget">Budget</NavLink>
        <NavLink href="/admin/erp/finance/cash-flow">Cash Flow</NavLink>
        <NavLink href="/admin/erp/finance/mis-reports">MIS Reports</NavLink>
        <NavLink href="/admin/erp/finance/fundraising">Fundraising</NavLink>
        <NavLink href="/admin/erp/finance/tds">TDS</NavLink>
      </div>
      <div>{children}</div>
    </div>
  )
}
