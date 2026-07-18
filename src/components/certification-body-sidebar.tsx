"use client"

import * as React from "react"
import {
  LayoutDashboard, Award, ShieldCheck, Link2,
  FileText, Bell, FileQuestion, Settings, Headset,
  ExternalLink, ChevronDown, Wallet, Briefcase,
  ClipboardList, Microscope, BadgeCheck
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar, SidebarContent, SidebarGroup, SidebarMenu,
  SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function CertificationBodySidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => { setMounted(true) }, [])

  const topItems = [
    { title: "Dashboard",            icon: LayoutDashboard, url: "/vendor/certification-body/dashboard" },
    { title: "Organisation Profile", icon: Briefcase,       url: "/vendor/certification-body/profile" },
  ]

  const toolGroups = [
    {
      title: "Certification Hub",
      icon: ShieldCheck,
      items: [
        { title: "Certificate Management", icon: Award,         url: "/vendor/certification-body/certificates" },
        { title: "Business Links",         icon: Link2,         url: "/vendor/certification-body/businesses" },
        { title: "Pending Requests",       icon: ClipboardList, url: "/vendor/certification-body/requests" },
        { title: "Active Audits",          icon: Microscope,    url: "/vendor/certification-body/audits" },
        { title: "Claim Your Organisation", icon: BadgeCheck,   url: "/vendor/certification-body/claim" },
      ]
    },
    {
      title: "Compliance",
      icon: FileText,
      items: [
        { title: "Compliance & Reports", icon: FileText,     url: "/vendor/certification-body/compliance" },
        { title: "Notifications",        icon: Bell,         url: "/vendor/certification-body/notifications" },
        { title: "Business Enquiries",   icon: FileQuestion, url: "/vendor/certification-body/enquiries" },
      ]
    },
    {
      title: "Administration",
      icon: Settings,
      items: [
        { title: "Wallet & Billing", icon: Wallet,   url: "/vendor/certification-body/account/wallet" },
        { title: "Settings",         icon: Settings, url: "/vendor/certification-body/settings" },
        { title: "Support Center",   icon: Headset,  url: "/vendor/certification-body/support" },
      ]
    }
  ]

  const ACCENT = "emerald"

  return (
    <Sidebar variant="sidebar" className="border-r bg-card">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/certification-body/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-200">
            <Award className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-foreground font-headline tracking-tight">Cert Body</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-card">
        <SidebarMenu className="space-y-1 mb-2">
          {topItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={mounted && pathname === item.url}
                className="h-10 font-bold rounded-lg text-muted-foreground hover:bg-muted data-[active=true]:bg-emerald-600 data-[active=true]:text-white"
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
                          className="h-9 font-bold text-muted-foreground rounded-lg hover:text-emerald-600 hover:bg-emerald-50 data-[active=true]:text-emerald-600 data-[active=true]:bg-emerald-50 transition-all"
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
        <Link href="/" className="flex items-center gap-3 text-emerald-600 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-black text-xs">
            <Award className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-foreground">Certification Body</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
