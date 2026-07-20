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

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black font-headline">Security</h2>
        <p className="text-sm text-muted-foreground font-medium">Access logs, permissions audit, incident tracking, and data privacy controls.</p>
      </div>
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
        <NavLink href="/admin/erp/security/access-logs">Access Logs</NavLink>
        <NavLink href="/admin/erp/security/audit">Permissions Audit</NavLink>
        <NavLink href="/admin/erp/security/incidents">Incidents</NavLink>
        <NavLink href="/admin/erp/security/privacy">Privacy (DPDP)</NavLink>
      </div>
      <div>{children}</div>
    </div>
  )
}
