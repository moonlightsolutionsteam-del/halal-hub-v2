
"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "px-4 py-1.5 text-sm font-bold text-muted-foreground hover:text-foreground whitespace-nowrap rounded-full transition-colors",
        isActive && "bg-primary/10 text-primary"
      )}
    >
      {children}
    </Link>
  );
};


export default function AccountingLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black font-headline">Finance & Accounting</h2>
          <p className="text-sm text-muted-foreground font-medium">
            Manage revenue, expenses, payouts, and financial reporting.
          </p>
        </div>
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
            <NavLink href="/admin/erp/accounting/revenue-dashboard">Revenue Dashboard</NavLink>
            <NavLink href="/admin/erp/accounting/vendor-billing">Vendor Billing</NavLink>
            <NavLink href="/admin/erp/accounting/credits-ledger">Credits Ledger</NavLink>
            <NavLink href="/admin/erp/accounting/invoices">Invoices</NavLink>
            <NavLink href="/admin/erp/accounting/receivables-dues">Receivables & Dues</NavLink>
            <NavLink href="/admin/erp/accounting/expenses">Expenses</NavLink>
            <NavLink href="/admin/erp/accounting/payouts">Payouts</NavLink>
            <NavLink href="/admin/erp/accounting/taxes-gst">Taxes & GST</NavLink>
            <NavLink href="/admin/erp/accounting/reports">Reports</NavLink>
            <NavLink href="/admin/erp/accounting/audit-logs">Audit Logs</NavLink>
            <NavLink href="/admin/erp/accounting/settings">Settings</NavLink>
        </div>
        <div>
            {children}
        </div>
    </div>
  );
}
