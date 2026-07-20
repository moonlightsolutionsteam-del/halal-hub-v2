import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendWelcomeEmail } from "@/lib/email/send"

// Internal route — called by auth callback on first sign-up.
// Validates the caller is an authenticated Supabase session (not public).
export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json().catch(() => ({}))
    const email = body.email ?? user.email
    const name  = body.name  ?? user.user_metadata?.name ?? user.user_metadata?.full_name

    if (!email) return NextResponse.json({ error: "No email" }, { status: 400 })

    const result = await sendWelcomeEmail(email, name)
    return NextResponse.json(result)
  } catch (err) {
    console.error("[api/email/welcome]", err)
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
