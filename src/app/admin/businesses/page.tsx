import { createClient } from "@/lib/supabase/server"
import BusinessReviewClient from "./BusinessReviewClient"

export default async function BusinessSubmissionsPage() {
  const supabase = await createClient()

  const { data: businesses } = await (supabase as any)
    .from("businesses")
    .select("id, name, category, city, country, phone, halal_verified, under_no_cert, full_responsibility, status, created_at, compliance_docs, description")
    .in("status", ["pending", "active", "rejected"])
    .order("created_at", { ascending: false })
    .limit(200)

  return <BusinessReviewClient businesses={businesses ?? []} />
}
