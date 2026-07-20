"use client"

import Link from "next/link"
import { useAdminRole } from "@/hooks/use-admin-role"
import { useAuth } from "@/hooks/use-auth"
import {
  Users,
  BarChart3,
  DollarSign,
  Megaphone,
  Headset,
  Wrench,
  Shield,
  Scale,
  TrendingUp,
  Activity,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const ERP_MODULES = [
  {
    key: "hr",
    label: "Human Resources",
    description: "Team, payroll, attendance, recruitment",
    icon: Users,
    href: "/admin/erp/hr",
    color: "bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400",
  },
  {
    key: "accounting",
    label: "Accounting",
    description: "Revenue, invoices, GST, vendor billing",
    icon: DollarSign,
    href: "/admin/erp/accounting",
    color: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  },
  {
    key: "crm",
    label: "CRM",
    description: "Leads, contacts, deals, campaigns",
    icon: Headset,
    href: "/admin/erp/crm",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  },
  {
    key: "marketing",
    label: "Marketing",
    description: "Campaigns, blog, social, analytics",
    icon: Megaphone,
    href: "/admin/erp/marketing",
    color: "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400",
  },
  {
    key: "operations",
    label: "Operations",
    description: "Field team, SOPs, vendor lifecycle, tasks",
    icon: Wrench,
    href: "/admin/erp/operations",
    color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
  },
  {
    key: "finance",
    label: "Finance",
    description: "Budget, cash flow, MIS reports, fundraising",
    icon: TrendingUp,
    href: "/admin/erp/finance",
    color: "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400",
  },
  {
    key: "bi",
    label: "Business Intelligence",
    description: "KPIs, cohorts, geo analytics, unit economics",
    icon: BarChart3,
    href: "/admin/erp/bi",
    color: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
  },
  {
    key: "engineering",
    label: "Engineering",
    description: "Bugs, releases, infrastructure, product dev",
    icon: Activity,
    href: "/admin/erp/engineering",
    color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400",
  },
  {
    key: "legal",
    label: "Legal & Compliance",
    description: "Contracts, cases, DPDP, policies",
    icon: Scale,
    href: "/admin/erp/legal",
    color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  },
  {
    key: "security",
    label: "Security",
    description: "Access logs, incidents, audit, privacy",
    icon: Shield,
    href: "/admin/erp/security",
    color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  },
]

export default function ErpHubPage() {
  const { user } = useAuth()
  const { tier } = useAdminRole()

  const greeting = user?.name ? `Welcome, ${user.name.split(" ")[0]}` : "Welcome"
  const tierLabel: Record<string, string> = {
    viewer: "Viewer",
    editor: "Editor",
    manager: "Manager",
    super_admin: "Super Admin",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground text-xs font-black">HH</span>
            </div>
            <div>
              <span className="text-sm font-black text-foreground">Halal Hub ERP</span>
              {tier && (
                <span className="ml-2 text-[10px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                  {tierLabel[tier] ?? tier}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm" className="text-xs font-bold rounded-lg h-8">
                Platform Admin
              </Button>
            </Link>
            <Link href="/employee/login">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg text-muted-foreground">
                <LogOut className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 space-y-8">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-black text-foreground">{greeting}</h1>
          <p className="text-sm text-muted-foreground mt-1">Select a module to get started</p>
        </div>

        {/* Quick links row */}
        <div className="flex gap-2 flex-wrap">
          <Link href="/admin/erp/activity-logs">
            <Button variant="outline" size="sm" className="rounded-xl h-8 text-xs font-bold gap-1.5">
              <Activity className="h-3.5 w-3.5" />
              Activity Logs
            </Button>
          </Link>
          <Link href="/admin/dashboard">
            <Button variant="outline" size="sm" className="rounded-xl h-8 text-xs font-bold gap-1.5">
              <BarChart3 className="h-3.5 w-3.5" />
              Platform Dashboard
            </Button>
          </Link>
        </div>

        {/* Module grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ERP_MODULES.map(mod => {
            const Icon = mod.icon
            return (
              <Link key={mod.key} href={mod.href}>
                <div className="group rounded-2xl border border-border/60 bg-card hover:border-primary/30 hover:shadow-md transition-all p-4 flex items-start gap-4 cursor-pointer">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${mod.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors">
                      {mod.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {mod.description}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary/60 shrink-0 mt-0.5 transition-colors" />
                </div>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
