"use client"

import { useCallback, useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"

/** Real Supabase-backed save/unsave for a single business (saved_businesses table). */
export function useSavedBusiness(businessId: string) {
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  const [rowId, setRowId] = useState<string | null>(null)

  useEffect(() => {
    if (!user?.uid) { setSaved(false); setRowId(null); return }
    const supabase = createClient()
    ;supabase.from("saved_businesses").select("id")
      .eq("user_id", user.uid).eq("business_id", businessId).maybeSingle()
      .then(({ data }: { data: { id: string } | null }) => {
        setSaved(!!data)
        setRowId(data?.id ?? null)
      })
  }, [user?.uid, businessId])

  const toggle = useCallback(async () => {
    if (!user?.uid) return { requiresAuth: true as const }
    const supabase = createClient()
    if (saved && rowId) {
      const { error } = await supabase.from("saved_businesses").delete().eq("id", rowId)
      if (!error) { setSaved(false); setRowId(null) }
      return { requiresAuth: false as const, saved: false, error }
    }
    const { data, error } = await supabase.from("saved_businesses")
      .insert({ user_id: user.uid, business_id: businessId })
      .select("id").single()
    if (!error) { setSaved(true); setRowId(data.id) }
    return { requiresAuth: false as const, saved: true, error }
  }, [user?.uid, businessId, saved, rowId])

  return { saved, toggle }
}
