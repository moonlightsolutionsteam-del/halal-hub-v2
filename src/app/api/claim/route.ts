import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { rateLimit, getRequestIdentifier } from '@/lib/rate-limit'

export async function POST(request: Request) {
  const rl = rateLimit(getRequestIdentifier(request, 'claim'), { limit: 3, windowSecs: 60 * 60 })
  if (!rl.success) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const { fullName, mobile, role, businessName } = body

    if (!fullName?.trim() || !mobile?.trim() || !role?.trim()) {
      return NextResponse.json({ error: 'Full name, mobile, and role are required.' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.from('claims').insert({
      full_name: fullName.trim(),
      mobile: mobile.trim(),
      role: role.trim(),
      business_name: businessName?.trim() || null,
      user_id: user?.id ?? null,
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Claim API error:', err)
    return NextResponse.json({ error: 'Failed to submit claim. Please try again.' }, { status: 500 })
  }
}
