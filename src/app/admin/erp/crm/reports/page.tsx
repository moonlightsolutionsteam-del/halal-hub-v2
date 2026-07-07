import { redirect } from "next/navigation";

export default function CrmReportsPage() {
  // No standalone reports view yet — send to the CRM dashboard.
  redirect("/admin/erp/crm");
}
