import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendWelcomeEmail } from '@/lib/email/send'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/account/dashboard'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      const user = data.user
      const isNewUser = user.created_at === user.last_sign_in_at

      // Fire welcome email for brand-new accounts (non-blocking)
      if (isNewUser && user.email) {
        const name =
          user.user_metadata?.name ??
          user.user_metadata?.full_name ??
          user.user_metadata?.display_name
        sendWelcomeEmail(user.email, name).catch((e) =>
          console.error('[auth/callback] welcome email failed:', e)
        )
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`)
}
