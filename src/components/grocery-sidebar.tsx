"use client"

import * as React from "react"
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Boxes,
  Truck,
  Users,
  Tag,
  Star,
  Receipt,
  Settings,
  Headset,
  ExternalLink,
  PlusCircle,
  BarChart3,
  Store,
  UserCircle,
  ChevronDown,
  PenTool,
  BookOpen,
  MessageSquare,
  TrendingUp,
  Heart,
  ShieldCheck,
  Wallet,
  ImageIcon
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

export function GrocerySidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toolGroups = [
    {
      title: "Store Tools",
      icon: ShoppingCart,
      items: [
        { title: "Inventory / Stock", icon: Boxes, url: "/vendor/grocery/inventory" },
        { title: "Store Orders", icon: ShoppingCart, url: "/vendor/grocery/orders" },
        { title: "Digital Bills (POS)", icon: Receipt, url: "/vendor/grocery/bills" },
      ]
    },
    {
      title: "Engagement",
      icon: PenTool,
      items: [
        { title: "Social Posts", icon: PenTool, url: "/vendor/grocery/engagement/posts" },
        { title: "Store Blog", icon: BookOpen, url: "/vendor/grocery/engagement/blog" },
        { title: "Customer Enquiry", icon: MessageSquare, url: "/vendor/grocery/engagement/enquiry" },
        { title: "Reviews", icon: Star, url: "/vendor/grocery/engagement/reviews" },
      ]
    },
    {
      title: "Marketing",
      icon: TrendingUp,
      items: [
        { title: "Special Offers", icon: Tag, url: "/vendor/grocery/marketing/offers" },
        { title: "Loyalty Hub", icon: Heart, url: "/vendor/grocery/marketing/loyalty" },
        { title: "Collaborate", icon: Users, url: "/vendor/grocery/marketing/collaborate" },
        { title: "Trust & Audits", icon: ShieldCheck, url: "/vendor/grocery/marketing/transparency" },
      ]
    },
    {
      title: "Account",
      icon: Settings,
      items: [
        { title: "Wallet & Billing", icon: Wallet, url: "/vendor/grocery/account/wallet" },
        { title: "Store Documents", icon: ShieldCheck, url: "/vendor/grocery/documents" },
        { title: "Media Gallery", icon: ImageIcon, url: "/vendor/grocery/gallery" },
        { title: "Support Center", icon: Headset, url: "/vendor/grocery/account/support" },
      ]
    }
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-white">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/grocery/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <Store className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-slate-900 font-headline tracking-tight">Grocery Panel</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-white">
        <SidebarMenu className="space-y-1 mb-4">
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={mounted && pathname === "/vendor/grocery/dashboard"} 
              className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50 data-[active=true]:bg-emerald-600 data-[active=true]:text-white transition-all"
            >
              <Link href="/vendor/grocery/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-3" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={mounted && pathname === "/vendor/grocery/profile"} 
              className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50 data-[active=true]:bg-emerald-600 data-[active=true]:text-white transition-all"
            >
              <Link href="/vendor/grocery/profile">
                <UserCircle className="h-4 w-4 mr-3" />
                <span>Store Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {toolGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-emerald-600 bg-emerald-50/50 rounded-lg hover:bg-emerald-50 transition-colors">
                    <group.icon className="h-4 w-4 mr-3" />
                    <span className="text-sm">{group.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-emerald-100">
                    {group.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={mounted && pathname === sub.url}
                          className="h-9 font-bold text-slate-500 rounded-lg hover:text-emerald-600 hover:bg-emerald-50 transition-all"
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

        <SidebarGroup>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              isActive={mounted && pathname === "/vendor/grocery/delivery"} 
              className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50 data-[active=true]:bg-emerald-600 data-[active=true]:text-white transition-all"
            >
              <Link href="/vendor/grocery/delivery">
                <Truck className="h-4 w-4 mr-3" />
                <span>Logistics Mgt</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t bg-slate-50/50">
        <Link href="/" className="flex items-center gap-3 text-emerald-600 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-black text-xs">GS</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">Green Garden Mart</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}