
"use client"

import * as React from "react"
import {
  LayoutDashboard,
  PenTool,
  Users,
  Star,
  Tag,
  TrendingUp,
  ImageIcon,
  Settings,
  Headset,
  ExternalLink,
  UserCircle,
  Wallet,
  CheckCircle,
  FileText,
  BookOpen,
  Upload,
  ChevronDown,
  LayoutGrid,
  Users2,
  Banknote,
  Link as LinkIcon
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

export function CreativeSidebar() {
  const pathname = usePathname()

  const studioGroups = [
    {
      title: "Identity & Studio",
      icon: UserCircle,
      items: [
        { title: "Profile & Identity", icon: UserCircle, url: "/vendor/creative/profile" },
        { title: "Connected Accounts", icon: LinkIcon, url: "/vendor/creative/accounts" },
      ]
    },
    {
      title: "Content Manager",
      icon: LayoutGrid,
      items: [
        { title: "Upload New", icon: Upload, url: "/vendor/creative/content/upload" },
        { title: "Published", icon: CheckCircle, url: "/vendor/creative/content/published" },
        { title: "Drafts", icon: FileText, url: "/vendor/creative/content/drafts" },
        { title: "Blog", icon: BookOpen, url: "/vendor/creative/content/blog" },
      ]
    },
    {
      title: "Collaboration & Earnings",
      icon: Wallet,
      items: [
        { title: "Collaborations Hub", icon: Users2, url: "/vendor/creative/collaborations" },
        { title: "Earnings & Payouts", icon: Banknote, url: "/vendor/creative/earnings" },
        { title: "Brand Deals & Ads", icon: Tag, url: "/vendor/creative/deals" },
      ]
    },
    {
      title: "Growth & Insights",
      icon: TrendingUp,
      items: [
        { title: "Subscriber Base", icon: Users, url: "/vendor/creative/audience" },
        { title: "Analytics & Growth", icon: TrendingUp, url: "/vendor/creative/analytics" },
        { title: "Reviews & Feedback", icon: Star, url: "/vendor/creative/feedback" },
      ]
    },
    {
      title: "Account",
      icon: Settings,
      items: [
        { title: "Wallet & Billing", icon: Wallet, url: "/vendor/creative/account/wallet" },
        { title: "Certifications", icon: CheckCircle, url: "/vendor/verification" },
        { title: "Support Center", icon: Headset, url: "/vendor/account/support" },
      ]
    }
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-card">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/creative/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <PenTool className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-primary font-headline tracking-tight">Studio Panel</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-card">
        <SidebarMenu className="mb-4 px-1">
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={pathname === "/vendor/creative/dashboard"} 
              className="h-10 font-bold rounded-lg text-muted-foreground hover:bg-muted data-[active=true]:bg-primary data-[active=true]:text-white transition-all"
            >
              <Link href="/vendor/creative/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-3" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {studioGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-muted-foreground hover:bg-muted">
                    <group.icon className="h-4 w-4 mr-3 opacity-70" />
                    <span className="text-sm">{group.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-border">
                    {group.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton asChild isActive={pathname === sub.url} className="h-9 font-bold text-muted-foreground rounded-lg hover:text-primary hover:bg-emerald-50/50">
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
        <Link href="/" className="flex items-center gap-3 text-primary cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-xs">IS</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">Iman Studio</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
