"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { ClipboardCheck, Users, LayoutDashboard, BarChart2, UserPlus, CalendarCheck, Settings } from "lucide-react";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link 
      href={href} 
      className={cn(
        "px-4 py-2 text-muted-foreground font-semibold hover:text-primary whitespace-nowrap flex items-center gap-2",
        isActive && "border-b-2 border-primary text-primary"
      )}
    >
      {children}
    </Link>
  );
};


export default function HRLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const hrNav = [
    { href: "/SKIP_ADMIN_ERP/hr/dashboard", icon: <LayoutDashboard className="h-4 w-4" />, label: "Dashboard" },
    { href: "/SKIP_ADMIN_ERP/hr/team", icon: <Users className="h-4 w-4" />, label: "Team Directory" },
    { href: "/SKIP_ADMIN_ERP/hr/attendance", icon: <ClipboardCheck className="h-4 w-4" />, label: "Attendance" },
    { href: "/SKIP_ADMIN_ERP/hr/leaves", icon: <CalendarCheck className="h-4 w-4" />, label: "Leaves" },
    { href: "/SKIP_ADMIN_ERP/hr/recruitment", icon: <UserPlus className="h-4 w-4" />, label: "Recruitment" },
    { href: "/SKIP_ADMIN_ERP/hr/performance", icon: <BarChart2 className="h-4 w-4" />, label: "Performance" },
    { href: "/SKIP_ADMIN_ERP/hr/settings", icon: <Settings className="h-4 w-4" />, label: "Settings" },
  ];

  return (
    <div className="space-y-6">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Human Resources</h2>
          <p className="text-muted-foreground">
            Manage employees, attendance, and recruitment.
          </p>
        </div>
        <div className="flex items-center border-b overflow-x-auto no-scrollbar">
            {hrNav.map(item => (
                <NavLink key={item.label} href={item.href}>
                    {item.icon} {item.label}
                </NavLink>
            ))}
        </div>
        <div className="mt-4">
            {children}
        </div>
    </div>
  );
}
