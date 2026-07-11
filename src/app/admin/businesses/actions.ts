"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateBusinessStatus(id: string, status: "active" | "rejected" | "pending") {
  const supabase = await createClient()
  const { error } = await (supabase.from("businesses") as any).update({ status }).eq("id", id)
  if (error) throw new Error(error.message)
  revalidatePath("/admin/businesses")
}
