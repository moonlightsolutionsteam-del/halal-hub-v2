
"use client"

import * as React from "react"
import {
  LayoutDashboard, Bed, Calendar, Users, Star, Tag, ShieldCheck,
  Image as ImageIcon, Headset, Settings, ExternalLink, Coffee, Wallet,
  UserCircle, ChevronDown, Sparkles, PenTool, BookOpen, MessageSquare,
  TrendingUp, Zap, Heart, Users2
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar, SidebarContent, SidebarGroup, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function HotelSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const topItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/vendor/hotel/dashboard" },
    { title: "Property Profile", icon: UserCircle, url: "/vendor/hotel/profile" },
  ]

  const toolGroups = [
    {
      title: "Operations",
      icon: Bed,
      items: [
        { title: "Room Management", icon: Bed, url: "/vendor/hotel/rooms" },
        { title: "Bookings", icon: Calendar, url: "/vendor/hotel/bookings" },
        { title: "Guest List", icon: Users, url: "/vendor/hotel/guests" },
        { title: "Amenities & Food", icon: Coffee, url: "/vendor/hotel/amenities" },
        { title: "Media Gallery", icon: ImageIcon, url: "/vendor/hotel/gallery" },
      ]
    },
    {
      title: "Engagement",
      icon: PenTool,
      items: [
        { title: "Social Posts", icon: PenTool, url: "/vendor/engagement/posts" },
        { title: "Hotel Blog", icon: BookOpen, url: "/vendor/engagement/blog" },
        { title: "Enquiries", icon: MessageSquare, url: "/vendor/engagement/enquiry" },
        { title: "Guest Reviews", icon: Star, url: "/vendor/hotel/reviews" },
      ]
    },
    {
      title: "Marketing & Growth",
      icon: TrendingUp,
      items: [
        { title: "Buy Credits", icon: Zap, url: "/vendor/credits/pricing" },
        { title: "Offers & Promos", icon: Tag, url: "/vendor/hotel/offers" },
        { title: "Collaborate", icon: Users2, url: "/vendor/marketing/collaborate" },
        { title: "Loyalty Programme", icon: Heart, url: "/vendor/marketing/loyalty" },
        { title: "Trust & Transparency", icon: ShieldCheck, url: "/vendor/marketing/transparency" },
      ]
    },
    {
      title: "Property Admin",
      icon: Settings,
      items: [
        { title: "Wallet & Billing", icon: Wallet, url: "/vendor/hotel/account/wallet" },
        { title: "Certifications", icon: ShieldCheck, url: "/vendor/verification" },
        { title: "Support Center", icon: Headset, url: "/vendor/hotel/support" },
      ]
    }
  ]

  return (
    <Sidebar variant="sidebar" className="border-r bg-card">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/hotel/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-amber-200">
            <Bed className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-foreground font-headline tracking-tight">Hotel Panel</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-card">
        <SidebarMenu className="space-y-1 mb-2">
          {topItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={mounted && pathname === item.url}
                className="h-10 font-bold rounded-lg text-muted-foreground hover:bg-muted data-[active=true]:bg-amber-600 data-[active=true]:text-white">
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
                  <SidebarMenuButton className="h-10 font-bold text-amber-600 bg-amber-50/50 rounded-lg hover:bg-amber-50 transition-colors">
                    <group.icon className="h-4 w-4 mr-3" />
                    <span className="text-sm">{group.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-amber-100">
                    {group.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton asChild isActive={mounted && pathname === sub.url}
                          className="h-9 font-bold text-muted-foreground rounded-lg hover:text-amber-600 hover:bg-amber-50 transition-all">
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
        <Link href="/" className="flex items-center gap-3 text-amber-600 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-amber-600 rounded-full flex items-center justify-center text-white font-black text-xs">RH</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">Royal Halal Suites</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
