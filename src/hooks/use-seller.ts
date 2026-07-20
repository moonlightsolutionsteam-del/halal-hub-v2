"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "@/hooks/use-auth"

export type SellerProfile = {
  id: string
  store_name: string
  store_slug: string
  description: string | null
  seller_type: string
  category: string | null
  city: string
  status: "pending" | "active" | "suspended" | "banned"
  is_verified: boolean
  rating: number | null
  total_sales: number
  total_gmv: number
  rejection_reason: string | null
  created_at: string
  approved_at: string | null
  bank_account_number: string | null
  bank_ifsc: string | null
  bank_name: string | null
  gstin: string | null
  pan: string | null
}

export function useSeller() {
  const { user, loading: authLoading } = useAuth()
  const [seller, setSeller] = useState<SellerProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!user?.uid) { setLoading(false); return }

    const supabase = createClient()
    supabase
      .from("mp_sellers")
      .select("*")
      .eq("user_id", user.uid)
      .maybeSingle()
      .then(({ data }) => {
        setSeller(data as SellerProfile | null)
        setLoading(false)
      })
  }, [user, authLoading])

  function refresh() {
    if (!user?.uid) return
    setLoading(true)
    const supabase = createClient()
    supabase
      .from("mp_sellers")
      .select("*")
      .eq("user_id", user.uid)
      .maybeSingle()
      .then(({ data }) => {
        setSeller(data as SellerProfile | null)
        setLoading(false)
      })
  }

  return { seller, loading, refresh }
}
