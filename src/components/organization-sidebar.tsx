
"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Building,
  Calendar,
  Megaphone,
  CircleDollarSign,
  Sparkles,
  Image as ImageIcon,
  BookOpen,
  Headset,
  ExternalLink,
  ChevronDown,
  PenTool,
  MessageSquare,
  Star,
  TrendingUp,
  Zap,
  Tag,
  Users2,
  Heart,
  ShieldCheck,
  Wallet,
  FileText
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

export function OrganizationSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toolGroups = [
    {
      title: "Community",
      icon: Calendar,
      items: [
        { title: "Events", icon: Calendar, url: "/vendor/organization/events" },
        { title: "Announcements", icon: Megaphone, url: "/vendor/organization/announcements" },
        { title: "Services & Programs", icon: Sparkles, url: "/vendor/organization/services" },
        { title: "Donations", icon: CircleDollarSign, url: "/vendor/organization/donations" },
      ]
    },
    {
      title: "Engagement",
      icon: PenTool,
      items: [
        { title: "Social Posts", icon: PenTool, url: "/vendor/engagement/posts" },
        { title: "Org Blog", icon: BookOpen, url: "/vendor/engagement/blog" },
        { title: "Enquiries", icon: MessageSquare, url: "/vendor/engagement/enquiry" },
        { title: "Reviews", icon: Star, url: "/vendor/engagement/reviews" },
      ]
    },
    {
      title: "Marketing & Growth",
      icon: TrendingUp,
      items: [
        { title: "Buy Credits", icon: Zap, url: "/vendor/credits/pricing" },
        { title: "Collaborate", icon: Users2, url: "/vendor/marketing/collaborate" },
        { title: "Loyalty Programme", icon: Heart, url: "/vendor/marketing/loyalty" },
        { title: "Trust & Transparency", icon: ShieldCheck, url: "/vendor/marketing/transparency" },
      ]
    },
    {
      title: "Account",
      icon: ImageIcon,
      items: [
        { title: "Wallet & Billing", icon: Wallet, url: "/vendor/organization/account/wallet" },
        { title: "Media Gallery", icon: ImageIcon, url: "/vendor/organization/gallery" },
        { title: "Documents", icon: FileText, url: "/vendor/organization/documents" },
        { title: "Support Center", icon: Headset, url: "/vendor/organization/support" },
      ]
    }
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-card">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/organization/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200 dark:shadow-none">
            <Building className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-foreground font-headline tracking-tight">Org Panel</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-card">
        <SidebarMenu className="space-y-1 mb-4">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={mounted && pathname === "/vendor/organization/dashboard"}
              className="h-10 font-bold rounded-lg text-muted-foreground hover:bg-muted data-[active=true]:bg-indigo-600 data-[active=true]:text-white transition-all"
            >
              <Link href="/vendor/organization/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-3" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={mounted && pathname === "/vendor/organization/profile"}
              className="h-10 font-bold rounded-lg text-muted-foreground hover:bg-muted data-[active=true]:bg-indigo-600 data-[active=true]:text-white transition-all"
            >
              <Link href="/vendor/organization/profile">
                <Building className="h-4 w-4 mr-3" />
                <span>Organization Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {toolGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/40 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition-colors">
                    <group.icon className="h-4 w-4 mr-3" />
                    <span className="text-sm">{group.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-indigo-100 dark:border-indigo-900/40">
                    {group.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={mounted && pathname === sub.url}
                          className="h-9 font-bold text-muted-foreground rounded-lg hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all"
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
        <Link href="/" className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-black text-xs">NO</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">Noor Foundation</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
