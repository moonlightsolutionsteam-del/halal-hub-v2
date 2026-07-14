
"use client"

import * as React from "react"
import {
  LayoutDashboard, GraduationCap, Users, BookOpen, Calendar,
  Star, Tag, Headset, Wallet, UserCircle, ExternalLink,
  TrendingUp, Heart, Users2, ShieldCheck, Zap, PenTool,
  MessageSquare, ChevronDown, ImageIcon
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar, SidebarContent, SidebarGroup, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function EducationSidebar() {
  const pathname = usePathname()

  const topItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/vendor/education/dashboard" },
    { title: "Institution Profile", icon: UserCircle, url: "/vendor/education/profile" },
  ]

  const toolGroups = [
    {
      title: "Academic",
      icon: GraduationCap,
      items: [
        { title: "Students & Enrollment", icon: Users, url: "/vendor/education/students" },
        { title: "Courses & Curriculum", icon: BookOpen, url: "/vendor/education/curriculum" },
        { title: "Class Schedules", icon: Calendar, url: "/vendor/education/schedule" },
        { title: "Fees & Finance", icon: Wallet, url: "/vendor/education/finance" },
      ]
    },
    {
      title: "Engagement",
      icon: PenTool,
      items: [
        { title: "Social Posts", icon: PenTool, url: "/vendor/engagement/posts" },
        { title: "Institute Blog", icon: BookOpen, url: "/vendor/engagement/blog" },
        { title: "Enquiries", icon: MessageSquare, url: "/vendor/engagement/enquiry" },
        { title: "Student Reviews", icon: Star, url: "/vendor/education/reviews" },
      ]
    },
    {
      title: "Marketing & Growth",
      icon: TrendingUp,
      items: [
        { title: "Buy Credits", icon: Zap, url: "/vendor/credits/pricing" },
        { title: "Offers & Scholarships", icon: Tag, url: "/vendor/education/offers" },
        { title: "Collaborate", icon: Users2, url: "/vendor/marketing/collaborate" },
        { title: "Loyalty Programme", icon: Heart, url: "/vendor/marketing/loyalty" },
        { title: "Trust & Transparency", icon: ShieldCheck, url: "/vendor/marketing/transparency" },
      ]
    },
    {
      title: "Account",
      icon: ShieldCheck,
      items: [
        { title: "Wallet & Billing", icon: Wallet, url: "/vendor/education/account/wallet" },
        { title: "Certifications", icon: ShieldCheck, url: "/vendor/verification" },
        { title: "Media Gallery", icon: ImageIcon, url: "/vendor/engagement/check-ins" },
        { title: "Support Center", icon: Headset, url: "/vendor/education/support" },
      ]
    }
  ]

  return (
    <Sidebar variant="sidebar" className="border-r bg-card">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/education/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-violet-200">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-foreground font-headline tracking-tight">Education Panel</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-card">
        <SidebarMenu className="space-y-1 mb-2">
          {topItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url}
                className="h-10 font-bold rounded-lg text-muted-foreground hover:bg-muted data-[active=true]:bg-violet-600 data-[active=true]:text-white">
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
                  <SidebarMenuButton className="h-10 font-bold text-violet-600 bg-violet-50 dark:bg-violet-950/30 rounded-lg hover:bg-violet-100 transition-colors">
                    <group.icon className="h-4 w-4 mr-3" />
                    <span>{group.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-violet-100 dark:border-violet-900">
                    {group.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton asChild isActive={pathname === sub.url}
                          className="h-9 font-bold text-muted-foreground rounded-lg hover:text-violet-600 hover:bg-violet-50 transition-all data-[active=true]:text-violet-600">
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
        <Link href="/" className="flex items-center gap-3 text-violet-600 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-10 w-10 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 font-black text-xs">IK</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">Iman Knowledge Acad.</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
