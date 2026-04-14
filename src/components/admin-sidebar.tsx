
"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  PenTool,
  Building,
  Church,
  CheckSquare,
  Rss,
  Gift,
  MapPin,
  Image as ImageIcon,
  Network,
  Globe,
  Store,
  Calendar,
  Users2,
  Database,
  Settings,
  ExternalLink,
  ChevronDown,
  UtensilsCrossed,
  ShoppingCart,
  CookingPot,
  Sparkles,
  Hotel,
  Plane,
  Shirt,
  CircleDollarSign,
  Stethoscope,
  GraduationCap,
  BookOpen,
  Wrench,
  LayoutGrid,
  Ticket,
  Megaphone,
  List,
  BarChart3,
  Headset,
  Bell,
  Target,
  UserPlus,
  CalendarDays,
  Contact,
  Briefcase,
  FileText,
  Phone,
  Share2,
  Wallet,
  Receipt,
  ShieldCheck,
  Search,
  History,
  TrendingUp,
  CreditCard,
  Book,
  HandCoins,
  Percent,
  ArrowUpRight,
  ClipboardList,
  Truck,
  RefreshCw,
  LifeBuoy,
  Library,
  Box,
  Zap,
  Code2,
  Bug,
  Rocket,
  Server,
  HardDrive,
  AlertTriangle,
  Cpu,
  Shield,
  Sliders,
  FolderOpen,
  Award,
  MessageSquare,
  ShieldAlert,
  Scale
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const MeatIcon = (props: any) => (
  <svg
    {...props}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12.5 2a2.5 2.5 0 0 0-2.5 2.5V6a3 3 0 0 0 3 3h1a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3h-1a3 3 0 0 1-3-3v-1.5" />
    <path d="M15 22a7 7 0 0 0 7-7c0-2.5-2-4.5-4.5-4.5h-1a2.5 2.5 0 0 0-2.5 2.5V15a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-1" />
    <circle cx="15" cy="15" r="1" />
  </svg>
);

export function AdminSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const platformGroups = [
    {
      title: "Directory",
      icon: Users,
      items: [
        { title: "Users", icon: Users, url: "/admin/users" },
        { title: "Creators", icon: PenTool, url: "/admin/creators" },
        { title: "Organizations", icon: Building, url: "#" },
        { title: "Mosques", icon: Church, url: "/admin/mosques" },
      ]
    },
    {
      title: "Trust & Safety",
      icon: ShieldCheck,
      items: [
        { title: "Verification", icon: CheckSquare, url: "/admin/verification" },
        { title: "Audit Logs", icon: History, url: "#" },
        { title: "Reports", icon: Bell, url: "#" },
      ]
    },
    {
      title: "Engagement",
      icon: Globe,
      items: [
        { title: "Content Feed", icon: Rss, url: "#" },
        { title: "Reward Engine", icon: Gift, url: "#" },
        { title: "Check-ins", icon: MapPin, url: "#" },
        { title: "Reviews & Media", icon: ImageIcon, url: "#" },
        { title: "Family Tree", icon: Network, url: "/admin/family-tree" },
        { title: "Community", icon: Globe, url: "/community" },
      ]
    }
  ];

  const eventManagementGroup = {
    title: "Events Management",
    icon: Calendar,
    items: [
      { title: "Events Dashboard", icon: LayoutGrid, url: "/admin/events" },
      { title: "Venue Registry", icon: Building, url: "/admin/events" },
      { title: "Ticketing Ops", icon: Ticket, url: "/admin/events" },
      { title: "Moderation", icon: ShieldAlert, url: "/admin/events" },
      { title: "Lead Pipeline", icon: MessageSquare, url: "/admin/events" },
      { title: "Attendee Hub", icon: Users, url: "/admin/events" },
      { title: "Governance", icon: Scale, url: "/admin/events" },
      { title: "Event Reports", icon: BarChart3, url: "/admin/events" },
    ]
  };

  const businessSubItems = [
    { title: "Restaurants", icon: UtensilsCrossed, url: "/admin/restaurants" },
    { title: "Meat Shops", icon: MeatIcon, url: "/admin/meat" },
    { title: "Grocery", icon: ShoppingCart, url: "/admin/grocery" },
    { title: "Catering", icon: CookingPot, url: "/admin/catering" },
    { title: "Event Services", icon: Sparkles, url: "/admin/events" },
    { title: "Hotels", icon: Hotel, url: "/admin/hotels" },
    { title: "Travel", icon: Plane, url: "/admin/travel" },
    { title: "Fashion", icon: Shirt, url: "/admin/fashion" },
    { title: "Cosmetics", icon: Sparkles, url: "/admin/cosmetics" },
    { title: "Finance", icon: CircleDollarSign, url: "/admin/finance" },
    { title: "Healthcare", icon: Stethoscope, url: "/admin/healthcare" },
    { title: "Education", icon: GraduationCap, url: "/admin/education" },
    { title: "Bookstores", icon: BookOpen, url: "/admin/media" },
    { title: "Professionals", icon: Wrench, url: "#" },
  ];

  const erpGroups = [
    {
      title: "HR",
      icon: Users2,
      items: [
        { title: "Dashboard", icon: LayoutGrid, url: "#" },
        { title: "Team Directory", icon: Users, url: "#" },
        { title: "Attendance", icon: CheckSquare, url: "#" },
        { title: "Leaves", icon: CalendarDays, url: "#" },
        { title: "Recruitment", icon: UserPlus, url: "#" },
        { title: "Performance", icon: BarChart3, url: "#" },
      ]
    },
    {
      title: "CRM",
      icon: Target,
      items: [
        { title: "Deals / Pipeline", icon: Target, url: "#" },
        { title: "Leads", icon: UserPlus, url: "#" },
        { title: "Contacts", icon: Contact, url: "#" },
        { title: "Accounts", icon: Briefcase, url: "#" },
        { title: "Tasks", icon: FileText, url: "#" },
        { title: "Meetings", icon: Calendar, url: "#" },
        { title: "Calls", icon: Phone, url: "#" },
        { title: "Campaigns", icon: Megaphone, url: "#" },
        { title: "Reports", icon: BarChart3, url: "#" },
      ]
    },
    {
      title: "Marketing",
      icon: Megaphone,
      items: [
        { title: "Dashboard", icon: LayoutGrid, url: "#" },
        { title: "Blog", icon: Rss, url: "#" },
        { title: "Campaigns", icon: Megaphone, url: "#" },
        { title: "Social Media", icon: Share2, url: "#" },
        { title: "Analytics", icon: BarChart3, url: "#" },
      ]
    },
    {
      title: "Accounting",
      icon: Wallet,
      items: [
        { title: "Revenue Dashboard", icon: TrendingUp, url: "#" },
        { title: "Vendor Billing", icon: CreditCard, url: "#" },
        { title: "Credits Ledger", icon: Book, url: "#" },
        { title: "Invoices", icon: FileText, url: "#" },
        { title: "Receivables & Dues", icon: HandCoins, url: "#" },
        { title: "Expenses", icon: Receipt, url: "#" },
        { title: "Payouts", icon: ArrowUpRight, url: "#" },
        { title: "Taxes & GST", icon: Percent, url: "#" },
        { title: "Reports", icon: BarChart3, url: "#" },
        { title: "Audit Logs", icon: History, url: "#" },
        { title: "Settings", icon: Settings, url: "#" },
      ]
    },
    {
      title: "Operations",
      icon: Wrench,
      items: [
        { title: "Ops Dashboard", icon: LayoutGrid, url: "#" },
        { title: "Task & Project Management", icon: ClipboardList, url: "#" },
        { title: "Lead & Onboarding Ops", icon: UserPlus, url: "#" },
        { title: "Field Team Mgt", icon: Truck, url: "#" },
        { title: "Vendor Lifecycle", icon: RefreshCw, url: "#" },
        { title: "Support & Escalations", icon: LifeBuoy, url: "#" },
        { title: "SOP & Knowledge Base", icon: Library, url: "#" },
        { title: "Asset Management", icon: Box, url: "#" },
        { title: "Process Automation", icon: Zap, url: "#" },
        { title: "Ops Settings", icon: Settings, url: "#" },
      ]
    },
    {
      title: "Engineering",
      icon: Cpu,
      items: [
        { title: "Dashboard", icon: LayoutGrid, url: "#" },
        { title: "Product Development", icon: Code2, url: "#" },
        { title: "Tech Tasks", icon: CheckSquare, url: "#" },
        { title: "Bugs", icon: Bug, url: "#" },
        { title: "Releases", icon: Rocket, url: "#" },
        { title: "Infrastructure", icon: Server, url: "#" },
        { title: "Tech Vendors", icon: HardDrive, url: "#" },
        { title: "Technical Risks", icon: AlertTriangle, url: "#" },
        { title: "Systems", icon: Settings, url: "#" },
      ]
    }
  ];

  const systemGroups = [
    {
      title: "Data & Systems",
      icon: Database,
      items: [
        { title: "Analytics", icon: BarChart3, url: "#" },
        { title: "Notification Engine", icon: Bell, url: "#" },
        { title: "Audit Logs", icon: History, url: "#" },
      ]
    },
    {
      title: "Settings",
      icon: Settings,
      items: [
        { title: "Roles, Permissions & Security", icon: Shield, url: "#" },
        { title: "Global Settings", icon: Sliders, url: "#" },
        { title: "File Manager", icon: FolderOpen, url: "#" },
        { title: "Pages", icon: FileText, url: "#" },
        { title: "Certifications", icon: Award, url: "#" },
        { title: "Enquiries", icon: MessageSquare, url: "#" },
      ]
    }
  ];

  return (
    <Sidebar variant="sidebar" className="border-r bg-white">
      <SidebarHeader className="p-6 border-b">
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <span className="font-black text-xl text-slate-900 font-headline tracking-tight">Super Admin</span>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4 bg-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={mounted && pathname === "/admin/dashboard"} className="h-10 font-bold rounded-lg text-slate-600 hover:bg-slate-50 data-[active=true]:bg-slate-100 data-[active=true]:text-slate-900">
              <Link href="/admin/dashboard">
                <LayoutDashboard className="h-4 w-4 mr-3" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest mt-4 mb-2">Platform</SidebarGroupLabel>
          <SidebarMenu className="px-1 space-y-1">
            {platformGroups.map((group) => (
              <Collapsible key={group.title} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="h-10 font-bold text-slate-600 rounded-lg hover:bg-slate-50">
                      <group.icon className="h-4 w-4 mr-3 opacity-70" />
                      <span>{group.title}</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenu className="ml-4 mt-1 border-l border-slate-100">
                      {group.items.map((sub) => (
                        <SidebarMenuItem key={sub.title}>
                          <SidebarMenuButton asChild isActive={mounted && pathname === sub.url} className="h-9 font-bold text-slate-500 rounded-lg hover:text-primary hover:bg-emerald-50/50">
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
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest mt-4 mb-2">Business Verticals</SidebarGroupLabel>
          <SidebarMenu className="px-1 space-y-1">
            <Collapsible className="group/collapsible-biz">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100">
                    <Store className="h-4 w-4 mr-3" />
                    <span>Businesses</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible-biz:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-emerald-100">
                    {businessSubItems.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton asChild isActive={mounted && pathname === sub.url} className="h-9 font-bold text-slate-500 rounded-lg hover:text-emerald-600 hover:bg-emerald-50/50">
                          <Link href={sub.url}>
                            <sub.icon className="h-4 w-4 mr-3 opacity-70" />
                            <span className="text-[13px]">{sub.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>

        {/* New Events Management Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest mt-4 mb-2">Events & Conferences</SidebarGroupLabel>
          <SidebarMenu className="px-1 space-y-1">
            <Collapsible className="group/collapsible-events">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton className="h-10 font-bold text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100">
                    <Calendar className="h-4 w-4 mr-3" />
                    <span>Events Management</span>
                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible-events:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu className="ml-4 mt-1 border-l border-purple-100">
                    {eventManagementGroup.items.map((sub) => (
                      <SidebarMenuItem key={sub.title}>
                        <SidebarMenuButton asChild isActive={mounted && pathname === sub.url} className="h-9 font-bold text-slate-500 rounded-lg hover:text-purple-600 hover:bg-purple-50/50">
                          <Link href={sub.url}>
                            <sub.icon className="h-4 w-4 mr-3 opacity-70" />
                            <span className="text-[13px]">{sub.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest mt-4 mb-2">Internal ERP</SidebarGroupLabel>
          <SidebarMenu className="px-1 space-y-1">
            {erpGroups.map((group) => (
              <Collapsible key={group.title} className="group/collapsible-erp">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="h-10 font-bold text-emerald-600 bg-emerald-50/50 rounded-lg hover:bg-emerald-100/50">
                      <group.icon className="h-4 w-4 mr-3 opacity-80" />
                      <span>{group.title}</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible-erp:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenu className="ml-4 mt-1 border-l border-emerald-100">
                      {group.items.map((sub) => (
                        <SidebarMenuItem key={sub.title}>
                          <SidebarMenuButton asChild className="h-9 font-bold text-slate-500 rounded-lg hover:text-emerald-600 hover:bg-emerald-50/50">
                            <Link href={sub.url}>
                              <sub.icon className="h-4 w-4 mr-3 opacity-70" />
                              <span className="text-[13px]">{sub.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="px-4 text-[10px] font-black uppercase text-slate-400 tracking-widest mt-4 mb-2">Systems</SidebarGroupLabel>
          <SidebarMenu className="px-1 space-y-1">
            {systemGroups.map((group) => (
              <Collapsible key={group.title} className="group/collapsible-system">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="h-10 font-bold text-slate-600 rounded-lg hover:bg-slate-50">
                      <group.icon className="h-4 w-4 mr-3 opacity-70" />
                      <span>{group.title}</span>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible-system:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenu className="ml-4 mt-1 border-l border-slate-100">
                      {group.items.map((sub) => (
                        <SidebarMenuItem key={sub.title}>
                          <SidebarMenuButton asChild className="h-9 font-bold text-slate-500 rounded-lg hover:text-primary hover:bg-emerald-50/50">
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
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-6 border-t bg-slate-50/50">
        <Link href="/" className="flex items-center gap-3 text-red-500 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center text-white font-black text-xs">SA</div>
          <span className="text-sm font-bold">Exit Admin</span>
          <ExternalLink className="h-3 w-3 ml-auto" />
        </Link>
      </SidebarFooter>
    </Sidebar>
  )
}
