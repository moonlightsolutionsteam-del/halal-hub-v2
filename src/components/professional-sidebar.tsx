
"use client"

import * as React from "react"
import {
  LayoutDashboard,
  UserCircle,
  Briefcase,
  GraduationCap,
  Layers,
  FolderOpen,
  Star,
  MessageSquare,
  Users,
  Handshake,
  Lightbulb,
  BarChart2,
  ShieldCheck,
  Lock,
  Wallet,
  Headset,
  ExternalLink,
  ChevronDown,
  Zap,
  BookOpen,
  PenTool,
  Award,
  Search,
  TrendingUp,
  Heart,
  CalendarCheck,
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

export function ProfessionalSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isActive = (url: string) => mounted && pathname === url

  const toolGroups = [
    {
      title: "Profile & Identity",
      icon: UserCircle,
      items: [
        { title: "Edit Profile", icon: UserCircle, url: "/vendor/professional/profile" },
        { title: "Experience", icon: Briefcase, url: "/vendor/professional/experience" },
        { title: "Skills", icon: Zap, url: "/vendor/professional/skills" },
        { title: "Education & Certs", icon: GraduationCap, url: "/vendor/professional/education" },
      ]
    },
    {
      title: "Portfolio",
      icon: FolderOpen,
      items: [
        { title: "My Work", icon: Layers, url: "/vendor/professional/portfolio" },
        { title: "Projects", icon: FolderOpen, url: "/vendor/professional/projects" },
        { title: "Testimonials", icon: Star, url: "/vendor/professional/testimonials" },
      ]
    },
    {
      title: "Network",
      icon: Users,
      items: [
        { title: "Connections", icon: Users, url: "/vendor/professional/network" },
        { title: "Recommendations", icon: Heart, url: "/vendor/professional/recommendations" },
        { title: "Messages", icon: MessageSquare, url: "/vendor/professional/messages" },
      ]
    },
    {
      title: "Opportunities",
      icon: Search,
      items: [
        { title: "Discover", icon: Search, url: "/vendor/professional/opportunities" },
        { title: "Collaborations", icon: Handshake, url: "/vendor/professional/collaborations" },
        { title: "Job Board", icon: Lightbulb, url: "/vendor/professional/jobs" },
      ]
    },
    {
      title: "Services",
      icon: CalendarCheck,
      items: [
        { title: "My Services", icon: Briefcase, url: "/vendor/professional/services" },
        { title: "Bookings", icon: CalendarCheck, url: "/vendor/professional/bookings" },
        { title: "Social Posts", icon: PenTool, url: "/vendor/professional/posts" },
        { title: "Blog", icon: BookOpen, url: "/vendor/professional/blog" },
      ]
    },
    {
      title: "Analytics & Growth",
      icon: TrendingUp,
      items: [
        { title: "Profile Analytics", icon: BarChart2, url: "/vendor/professional/analytics" },
        { title: "Buy Credits", icon: Zap, url: "/vendor/credits/pricing" },
      ]
    },
    {
      title: "Account",
      icon: ShieldCheck,
      items: [
        { title: "Verification", icon: Award, url: "/vendor/professional/verification" },
        { title: "Privacy Settings", icon: Lock, url: "/vendor/professional/settings" },
        { title: "Wallet & Billing", icon: Wallet, url: "/vendor/account/wallet" },
        { title: "Support", icon: Headset, url: "/vendor/professional/support" },
      ]
    }
  ]

  return (
    <Sidebar variant="sidebar" className="border-r bg-card">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/professional/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-violet-200 dark:shadow-none">
            <Users className="h-4 w-4" />
          </div>
          <span className="font-black text-xl text-foreground font-headline tracking-tight">Pro Network</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-card">
        <SidebarMenu className="space-y-1 mb-4">
          {[
            { title: "Dashboard", icon: LayoutDashboard, url: "/vendor/professional/dashboard" },
            { title: "Public Profile", icon: UserCircle, url: "/vendor/professional/profile" },
          ].map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.url)}
                className="h-10 font-bold rounded-lg text-muted-foreground hover:bg-muted data-[active=true]:bg-violet-600 data-[active=true]:text-white transition-all"
              >
                <Link href={item.url}>
                  <item.icon className="h-4 w-4 mr-3" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        {toolGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-violet-600 dark:text-violet-400 bg-violet-50/50 dark:bg-violet-950/40 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/40 transition-colors">
                    <group.icon className="h-4 w-4 mr-3" />
                    <span className="text-sm">{group.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-violet-100 dark:border-violet-900/40">
                    {group.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive(sub.url)}
                          className="h-9 font-bold text-muted-foreground rounded-lg hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 data-[active=true]:text-violet-600 data-[active=true]:bg-violet-50 dark:data-[active=true]:bg-violet-950/30 transition-all"
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
        <Link href="/" className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-violet-600 rounded-full flex items-center justify-center text-white font-black text-xs">YQ</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">Yusuf Al-Qahtani</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
