
"use client"

import * as React from "react"
import {
  LayoutDashboard,
  CircleDollarSign,
  TrendingUp,
  ShieldCheck,
  FileText,
  Users,
  Star,
  Tag,
  Settings,
  Headset,
  ExternalLink,
  Wallet,
  ArrowUpRight,
  UserCircle,
  History,
  Scale,
  Lock,
  ChevronDown,
  BarChart3,
  MessageSquare,
  Landmark,
  Briefcase,
  PenTool,
  BookOpen
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function FinanceSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toolGroups = [
    {
      title: "Asset Management",
      icon: Briefcase,
      items: [
        { title: "Portfolio Hub", icon: BarChart3, url: "/vendor/finance/portfolio" },
        { title: "Product Catalog", icon: CircleDollarSign, url: "/vendor/finance/products" },
        { title: "Transactions", icon: History, url: "/vendor/finance/transactions" },
      ]
    },
    {
      title: "Governance & Trust",
      icon: Scale,
      items: [
        { title: "Shariah Audits", icon: ShieldCheck, url: "/vendor/finance/compliance" },
        { title: "KYC Registry", icon: Users, url: "/vendor/finance/kyc" },
        { title: "Risk Reports", icon: FileText, url: "/vendor/finance/reports" },
      ]
    },
    {
      title: "Engagement",
      icon: PenTool,
      items: [
        { title: "Social Posts", icon: PenTool, url: "/vendor/engagement/posts" },
        { title: "Finance Blog", icon: BookOpen, url: "/vendor/engagement/blog" },
        { title: "Enquiries", icon: MessageSquare, url: "/vendor/engagement/enquiry" },
      ]
    },
    {
      title: "Growth & CRM",
      icon: TrendingUp,
      items: [
        { title: "Investor Leads", icon: ArrowUpRight, url: "/vendor/finance/leads" },
        { title: "Offers & Rates", icon: Tag, url: "/vendor/finance/offers" },
        { title: "Reputation", icon: Star, url: "/vendor/finance/reviews" },
        { title: "Collaborate", icon: Users, url: "/vendor/marketing/collaborate" },
        { title: "Loyalty Programme", icon: Lock, url: "/vendor/marketing/loyalty" },
        { title: "Trust & Transparency", icon: ShieldCheck, url: "/vendor/marketing/transparency" },
      ]
    },
    {
      title: "Institutional",
      icon: Settings,
      items: [
        { title: "Wallet & Settlement", icon: Wallet, url: "/vendor/finance/wallet" },
        { title: "Support Center", icon: Headset, url: "/vendor/finance/support" },
      ]
    }
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-card">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/finance/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Landmark className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-foreground font-headline tracking-tight">Finance Panel</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-card">
        <SidebarMenu className="space-y-1 mb-4">
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={mounted && pathname === "/vendor/finance/dashboard"} 
              className="h-10 font-bold rounded-lg text-muted-foreground hover:bg-muted data-[active=true]:bg-indigo-600 data-[active=true]:text-white transition-all"
            >
              <Link href="/vendor/finance/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-3" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={mounted && pathname === "/vendor/finance/profile"} 
              className="h-10 font-bold rounded-lg text-muted-foreground hover:bg-muted data-[active=true]:bg-indigo-600 data-[active=true]:text-white transition-all"
            >
              <Link href="/vendor/finance/profile">
                <UserCircle className="h-4 w-4 mr-3" />
                <span>Entity Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {toolGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-indigo-600 bg-indigo-50/50 rounded-lg hover:bg-indigo-50 transition-colors">
                    <group.icon className="h-4 w-4 mr-3" />
                    <span className="text-sm">{group.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-indigo-100">
                    {group.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={mounted && pathname === sub.url}
                          className="h-9 font-bold text-muted-foreground rounded-lg hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                        >
                          <Link href={sub.url}>
                            <sub.icon className="h-4 w-4 mr-3 opacity-60" />
                            <span className="text-[13px]">{sub.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-6 border-t bg-muted/50">
        <Link href="/" className="flex items-center gap-3 text-indigo-600 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-black text-xs">IB</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">Amanah Islamic Bank</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
