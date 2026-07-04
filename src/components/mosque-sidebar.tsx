
"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Landmark,
  Users2,
  Sparkles,
  Clock,
  Calendar,
  Megaphone,
  BarChart3,
  PenTool,
  BookOpen,
  CircleDollarSign,
  Wallet,
  Image as ImageIcon,
  Headset,
  ExternalLink,
  ChevronDown,
  Tv,
  LayoutTemplate,
  FileText,
  Settings,
  UserCheck,
  Zap,
  Heart,
  ShieldCheck
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

export function MosqueSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toolGroups = [
    {
      title: "Community",
      icon: Users2,
      items: [
        { title: "Leadership", icon: Users2, url: "/vendor/mosque/leadership" },
        { title: "Services", icon: Sparkles, url: "/vendor/mosque/services" },
        { title: "Salat Timings", icon: Clock, url: "/vendor/mosque/salat" },
        { title: "Events", icon: Calendar, url: "/vendor/mosque/events" },
        { title: "Announcements", icon: Megaphone, url: "/vendor/mosque/announcements" },
        { title: "Programs", icon: BarChart3, url: "/vendor/mosque/programs" },
        { title: "Musalli Dashboard", icon: UserCheck, url: "/vendor/mosque/musalli-dashboard" },
      ]
    },
    {
      title: "Engagement",
      icon: PenTool,
      items: [
        { title: "Community Posts", icon: PenTool, url: "/vendor/mosque/engagement/posts" },
        { title: "Mosque Blog", icon: BookOpen, url: "/vendor/mosque/engagement/blog" },
      ]
    },
    {
      title: "Financial",
      icon: CircleDollarSign,
      items: [
        { title: "Donations", icon: CircleDollarSign, url: "/vendor/mosque/donations" },
        { title: "Payments", icon: Wallet, url: "/vendor/mosque/payments" },
        { title: "Wallet & Payouts", icon: Wallet, url: "/vendor/mosque/account/wallet" },
      ]
    },
    {
      title: "Tools",
      icon: Tv,
      items: [
        { title: "Connect TV", icon: Tv, url: "/vendor/mosque/connect-tv" },
        { title: "Web Widgets", icon: LayoutTemplate, url: "/vendor/mosque/web-widgets" },
        { title: "Flyers", icon: FileText, url: "/vendor/mosque/flyers" },
      ]
    },
    {
      title: "Marketing & Growth",
      icon: Megaphone,
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
        { title: "Media Gallery", icon: ImageIcon, url: "/vendor/mosque/gallery" },
        { title: "Documents", icon: BookOpen, url: "/vendor/mosque/documents" },
        { title: "Support Center", icon: Headset, url: "/vendor/mosque/support" },
        { title: "Settings", icon: Settings, url: "/vendor/mosque/settings" },
      ]
    }
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-card">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/mosque/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-teal-200 dark:shadow-none">
            <Landmark className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-foreground font-headline tracking-tight">Masjid Panel</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-card">
        <SidebarMenu className="space-y-1 mb-4">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={mounted && pathname === "/vendor/mosque/dashboard"}
              className="h-10 font-bold rounded-lg text-muted-foreground hover:bg-muted data-[active=true]:bg-teal-600 data-[active=true]:text-white transition-all"
            >
              <Link href="/vendor/mosque/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-3" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={mounted && pathname === "/vendor/mosque/profile"}
              className="h-10 font-bold rounded-lg text-muted-foreground hover:bg-muted data-[active=true]:bg-teal-600 data-[active=true]:text-white transition-all"
            >
              <Link href="/vendor/mosque/profile">
                <Landmark className="h-4 w-4 mr-3" />
                <span>About Masjid</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {toolGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-teal-600 dark:text-teal-400 bg-teal-50/50 dark:bg-teal-950/40 rounded-lg hover:bg-teal-50 dark:hover:bg-teal-900/40 transition-colors">
                    <group.icon className="h-4 w-4 mr-3" />
                    <span className="text-sm">{group.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-teal-100 dark:border-teal-900/40">
                    {group.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={mounted && pathname === sub.url}
                          className="h-9 font-bold text-muted-foreground rounded-lg hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/30 transition-all"
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
        <Link href="/" className="flex items-center gap-3 text-teal-600 dark:text-teal-400 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-black text-xs">JM</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">Jama Masjid</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
