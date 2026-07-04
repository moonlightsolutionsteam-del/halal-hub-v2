
"use client"

import * as React from "react"
import {
  LayoutDashboard, Calendar, Ticket, MessageSquare,
  ImageIcon, Star, Tag, Users, Headset, ExternalLink,
  Sparkles, UserCircle, TrendingUp, Heart, Users2,
  ShieldCheck, Zap, PenTool, BookOpen, Wallet, ChevronDown
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar, SidebarContent, SidebarGroup, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function EventsSidebar() {
  const pathname = usePathname()

  const topItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/vendor/events/dashboard" },
    { title: "Venue Profile", icon: UserCircle, url: "/vendor/events/profile" },
  ]

  const toolGroups = [
    {
      title: "Event Management",
      icon: Sparkles,
      items: [
        { title: "Event Packages", icon: Sparkles, url: "/vendor/events/packages" },
        { title: "Bookings & Calendar", icon: Calendar, url: "/vendor/events/bookings" },
        { title: "Tickets & Sales", icon: Ticket, url: "/vendor/events/sales" },
        { title: "Leads & Inquiries", icon: MessageSquare, url: "/vendor/events/leads" },
        { title: "Attendees", icon: Users, url: "/vendor/events/attendees" },
        { title: "Media Gallery", icon: ImageIcon, url: "/vendor/events/gallery" },
      ]
    },
    {
      title: "Engagement",
      icon: PenTool,
      items: [
        { title: "Social Posts", icon: PenTool, url: "/vendor/engagement/posts" },
        { title: "Venue Blog", icon: BookOpen, url: "/vendor/engagement/blog" },
        { title: "Enquiries", icon: MessageSquare, url: "/vendor/engagement/enquiry" },
        { title: "Venue Reviews", icon: Star, url: "/vendor/events/reviews" },
      ]
    },
    {
      title: "Marketing & Growth",
      icon: TrendingUp,
      items: [
        { title: "Buy Credits", icon: Zap, url: "/vendor/credits/pricing" },
        { title: "Offers & Promos", icon: Tag, url: "/vendor/events/offers" },
        { title: "Collaborate", icon: Users2, url: "/vendor/marketing/collaborate" },
        { title: "Loyalty Programme", icon: Heart, url: "/vendor/marketing/loyalty" },
        { title: "Trust & Transparency", icon: ShieldCheck, url: "/vendor/marketing/transparency" },
      ]
    },
    {
      title: "Account",
      icon: ShieldCheck,
      items: [
        { title: "Wallet & Billing", icon: Wallet, url: "/vendor/account/wallet" },
        { title: "Certifications", icon: ShieldCheck, url: "/vendor/verification" },
        { title: "Support", icon: Headset, url: "/vendor/events/support" },
      ]
    }
  ]

  return (
    <Sidebar variant="sidebar" className="border-r bg-card">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/events/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-purple-200">
            <Calendar className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-foreground font-headline tracking-tight">Events Panel</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-card">
        <SidebarMenu className="space-y-1 mb-2">
          {topItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url}
                className="h-10 font-bold rounded-lg text-muted-foreground hover:bg-muted data-[active=true]:bg-purple-600 data-[active=true]:text-white">
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
                  <SidebarMenuButton className="h-10 font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/30 rounded-lg hover:bg-purple-100 transition-colors">
                    <group.icon className="h-4 w-4 mr-3" />
                    <span>{group.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-purple-100 dark:border-purple-900">
                    {group.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton asChild isActive={pathname === sub.url}
                          className="h-9 font-bold text-muted-foreground rounded-lg hover:text-purple-600 hover:bg-purple-50 transition-all data-[active=true]:text-purple-600">
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
        <Link href="/" className="flex items-center gap-3 text-purple-600 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-black text-xs">EV</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">Grand Hall Events</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
