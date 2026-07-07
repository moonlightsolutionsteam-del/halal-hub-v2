import { redirect } from "next/navigation";

export default function RevenuePage() {
  // Canonical revenue view lives at revenue-dashboard.
  redirect("/admin/erp/accounting/revenue-dashboard");
}
