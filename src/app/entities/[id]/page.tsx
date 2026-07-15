import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import BusinessDetailClient from "./BusinessDetailClient"

export default async function EntityPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: business } = await supabase
    .from("businesses")
    .select(
      "id, name, description, category, subcategory, address, city, state, country, phone, whatsapp, email, website, image_url, cover_url, logo_url, images, ambience_images, menu_images, youtube_links, rating, review_count, halal_verified, halal_cert_url, opening_hours, hours_open, hours_from, hours_to, selected_cuisines, selected_amenities, selected_dining, selected_highlights, selected_meat, selected_payment, alcohol_served, separate_kitchen, separate_storage, separate_utensils, under_no_cert, full_responsibility, price_range, popular_dishes, signature_dish, primary_cuisine, social_links, prayer_times, latitude, longitude, firebase_business_id"
    )
    .eq("id", id)
    .single()

  if (!business) notFound()

  return <BusinessDetailClient business={business as any} />
}
