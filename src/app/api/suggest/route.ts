import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { rateLimit, getRequestIdentifier } from '@/lib/rate-limit'

export async function POST(request: Request) {
  const rl = rateLimit(getRequestIdentifier(request, 'suggest'), { limit: 5, windowSecs: 60 * 60 })
  if (!rl.success) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const { category, placeName, address, reason, link } = body

    if (!category?.trim() || !placeName?.trim()) {
      return NextResponse.json({ error: 'Category and name are required.' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.from('suggestions').insert({
      category: category.trim(),
      place_name: placeName.trim(),
      address: address?.trim() || null,
      reason: reason?.trim() || null,
      link: link?.trim() || null,
      user_id: user?.id ?? null,
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Suggest API error:', err)
    return NextResponse.json({ error: 'Failed to submit suggestion. Please try again.' }, { status: 500 })
  }
}
