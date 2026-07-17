"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export interface CategoryBusiness {
  id: string
  name: string
  subcategory: string
  city: string
  rating: number
  halal_verified: boolean
  image_url: string
  features: string[]
  is_open: boolean
  price_range: string | null
  description: string | null
}

function mapRow(b: any): CategoryBusiness {
  return {
    id: b.id,
    name: b.name,
    subcategory: b.subcategory || "",
    city: [b.city, b.country].filter(Boolean).join(", "),
    rating: b.rating ?? 4.5,
    halal_verified: b.halal_verified ?? false,
    image_url: b.cover_url || b.image_url || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&auto=format&q=80",
    features: Array.isArray(b.selected_highlights) ? b.selected_highlights : [],
    is_open: b.is_open ?? true,
    price_range: b.price_range ?? null,
    description: b.description ?? null,
  }
}

export function useCategoryBusinesses<T>(
  category: string | string[],
  fallback: T[],
  transform?: (b: CategoryBusiness) => T
): T[] {
  const [items, setItems] = useState<T[]>(fallback)

  useEffect(() => {
    const supabase = createClient()
    const q = supabase.from("businesses")
      .select("id, name, subcategory, city, country, rating, halal_verified, image_url, cover_url, selected_highlights, description, is_open, price_range")
      .eq("status", "active")
      .order("rating", { ascending: false })

    const query = Array.isArray(category)
      ? q.in("category", category)
      : q.eq("category", category)

    query.then(({ data }: { data: any[] | null }) => {
      if (!data || data.length === 0) return
      const mapped = data.map(mapRow)
      setItems(transform ? mapped.map(transform) : (mapped as unknown as T[]))
    })
  }, [])

  return items
}
