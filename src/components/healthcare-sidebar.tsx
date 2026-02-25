
"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  Calendar,
  Pill,
  Activity,
  ShieldCheck,
  Star,
  Tag,
  Settings,
  Headset,
  ExternalLink,
  FileText,
  Image as ImageIcon,
  UserCircle,
  ChevronDown,
  TrendingUp,
  FlaskConical,
  HeartPulse,
  Wallet,
  ClipboardList,
  History,
  Briefcase
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

export function HealthcareSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toolGroups = [
    {
      title: "Clinical Ops",
      icon: Stethoscope,
      items: [
        { title: "Dashboard", icon: LayoutDashboard, url: "/vendor/healthcare/dashboard" },
        { title: "Appointments", icon: Calendar, url: "/vendor/healthcare/appointments" },
        { title: "Service Catalog", icon: HeartPulse, url: "/vendor/healthcare/services" },
      ]
    },
    {
      title: "Patient Care",
      icon: Users,
      items: [
        { title: "Patient Directory", icon: Users, url: "/vendor/healthcare/patients" },
        { title: "Medical Records", icon: FileText, url: "/vendor/healthcare/records" },
        { title: "Staff Roster", icon: Activity, url: "/vendor/healthcare/staff" },
      ]
    },
    {
      title: "Growth & Trust",
      icon: TrendingUp,
      items: [
        { title: "Marketing Offers", icon: Tag, url: "/vendor/healthcare/offers" },
        { title: "Patient Reviews", icon: Star, url: "/vendor/healthcare/reviews" },
        { title: "Ethics & Purity", icon: ShieldCheck, url: "/vendor/healthcare/marketing/transparency" },
      ]
    },
    {
      title: "Facility Account",
      icon: Settings,
      items: [
        { title: "Facility Profile", icon: UserCircle, url: "/vendor/healthcare/profile" },
        { title: "Wallet & Billing", icon: Wallet, url: "/vendor/healthcare/account/wallet" },
        { title: "Compliance Vault", icon: ShieldCheck, url: "/vendor/healthcare/account/documents" },
        { title: "Visual Gallery", icon: ImageIcon, url: "/vendor/healthcare/account/gallery" },
        { title: "Support Center", icon: Headset, url: "/vendor/healthcare/support" },
      ]
    }
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-white">
      <SidebarHeader className="p-6 border-b">
        <Link href="/vendor/healthcare/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-teal-200">
            <Stethoscope className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-slate-900 font-headline tracking-tight">Health Panel</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-white">
        {toolGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <Collapsible defaultOpen className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-teal-600 bg-teal-50/50 rounded-lg hover:bg-teal-50 transition-colors">
                    <group.icon className="h-4 w-4 mr-3" />
                    <span className="text-sm">{group.title}</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-teal-100">
                    {group.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton 
                          asChild 
                          isActive={mounted && pathname === sub.url}
                          className="h-9 font-bold text-slate-500 rounded-lg hover:text-teal-600 hover:bg-teal-50 transition-all"
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

      <SidebarFooter className="p-6 border-t bg-slate-50/50">
        <Link href="/" className="flex items-center gap-3 text-teal-600 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-black text-xs">SC</div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-900">Safe Care Hub</span>
            <span className="text-[10px] text-muted-foreground font-medium">Exit to App</span>
          </div>
          <ExternalLink className="h-3 w-3 ml-auto opacity-40" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
