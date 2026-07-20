"use client"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export interface AdminCategoryBusiness {
  id: string
  name: string
  subcategory: string | null
  city: string | null
  country: string | null
  status: string
  rating: number | null
  halal_verified: boolean | null
  created_at: string | null
}

export interface AdminCategoryStats {
  businesses: AdminCategoryBusiness[]
  total: number
  active: number
  pending: number
  rejected: number
  loading: boolean
}

const EMPTY: AdminCategoryStats = {
  businesses: [], total: 0, active: 0, pending: 0, rejected: 0, loading: true
}

export function useAdminCategory(category: string | string[]): AdminCategoryStats {
  const [state, setState] = useState<AdminCategoryStats>(EMPTY)

  useEffect(() => {
    const supabase = createClient()
    async function load() {
      const q = supabase
        .from("businesses")
        .select("id, name, subcategory, city, country, status, rating, halal_verified, created_at")
        .order("created_at", { ascending: false })

      const query = Array.isArray(category) ? q.in("category", category) : q.eq("category", category)
      const { data } = await query
      const rows: AdminCategoryBusiness[] = (data ?? []) as any
      setState({
        businesses: rows,
        total: rows.length,
        active: rows.filter(r => r.status === "active").length,
        pending: rows.filter(r => r.status === "pending").length,
        rejected: rows.filter(r => r.status === "rejected").length,
        loading: false,
      })
    }
    load()
  }, [])

  return state
}
