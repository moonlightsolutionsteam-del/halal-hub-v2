
"use client"

import * as React from "react"
import {
  LayoutDashboard, BookOpen, Library, Users, ShoppingCart,
  Download, Star, Tag, Headset, ExternalLink, TrendingUp,
  UserCircle, PenTool, MessageSquare, Heart, Users2,
  ShieldCheck, Zap, Wallet, ChevronDown, ImageIcon
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar, SidebarContent, SidebarGroup, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function MediaSidebar() {
  const pathname = usePathname()

  const topItems = [
    { title: "Dashboard", icon: LayoutDashboard, url: "/vendor/media/dashboard" },
    { title: "Publisher Profile", icon: UserCircle, url: "/vendor/media/profile" },
  ]

  const toolGroups = [
    {
      title: "Catalog",
      icon: BookOpen,
      items: [
        { title: "Book Inventory", icon: BookOpen, url: "/vendor/media/inventory" },
        { title: "Digital Media", icon: Library, url: "/vendor/media/digital" },
        { title: "Authors & Publishers", icon: Users, url: "/vendor/media/authors" },
      ]
    },
    {
      title: "Commerce",
      icon: ShoppingCart,
      items: [
        { title: "Orders & Shipping", icon: ShoppingCart, url: "/vendor/media/orders" },
        { title: "Downloads & Licensing", icon: Download, url: "/vendor/media/licenses" },
      ]
    },
    {
      title: "Engagement",
      icon: PenTool,
      items: [
        { title: "Social Posts", icon: PenTool, url: "/vendor/engagement/posts" },
        { title: "Publisher Blog", icon: BookOpen, url: "/vendor/engagement/blog" },
        { title: "Enquiries", icon: MessageSquare, url: "/vendor/engagement/enquiry" },
        { title: "Reader Reviews", icon: Star, url: "/vendor/engagement/reviews" },
      ]
    },
    {
      title: "Marketing & Growth",
      icon: TrendingUp,
      items: [
        { title: "Buy Credits", icon: Zap, url: "/vendor/credits/pricing" },
        { title: "Offers & Deals", icon: Tag, url: "/vendor/media/offers" },
        { title: "Author Collaborations", icon: Users2, url: "/vendor/marketing/collaborate" },
        { title: "Reader Loyalty", icon: Heart, url: "/vendor/marketing/loyalty" },
        { title: "Trust & Transparency", icon: ShieldCheck, url: "/vendor/marketing/transparency" },
      ]
    },
    {
      title: "Account",
      icon: ShieldCheck,
      items: [
        { title: "Wallet & Billing", icon: Wallet, url: "/vendor/account/wallet" },
        { title: "Media Gallery", icon: ImageIcon, url: "/vendor/media/gallery" },
        { title: "Certifications", icon: ShieldCheck, url: "/vendor/verification" },
        { title: "Support", icon: Headset, url: "/vendor/account/support" },
      ]
    }
  ]

  return (
    <Sidebar variant="sidebar" className="border-r bg-card">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/media/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-primary font-headline tracking-tight">Media Panel</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-card">
        <SidebarMenu className="space-y-1 mb-2">
          {topItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url}
                className="h-10 font-bold rounded-lg text-muted-foreground hover:bg-muted data-[active=true]:bg-primary data-[active=true]:text-white">
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
                  <SidebarMenuButton className="h-10 font-bold text-primary bg-primary/5 rounded-lg hover:bg-primary/10 transition-colors">
                    <group.icon className="h-4 w-4 mr-3" />
                    <span>{group.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-primary/10">
                    {group.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton asChild isActive={pathname === sub.url}
                          className="h-9 font-bold text-muted-foreground rounded-lg hover:text-primary hover:bg-primary/5 transition-all data-[active=true]:text-primary">
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
          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-xs">BM</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">Noor Islamic Media</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
