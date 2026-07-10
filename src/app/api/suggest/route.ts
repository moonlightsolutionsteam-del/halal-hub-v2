import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { category, placeName, address, reason } = body

    if (!category?.trim() || !placeName?.trim()) {
      return NextResponse.json({ error: 'Category and place name are required.' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase.from('suggestions').insert({
      category: category.trim(),
      place_name: placeName.trim(),
      address: address?.trim() || null,
      reason: reason?.trim() || null,
      user_id: user?.id ?? null,
    })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Suggest API error:', err)
    return NextResponse.json({ error: 'Failed to submit suggestion. Please try again.' }, { status: 500 })
  }
}
