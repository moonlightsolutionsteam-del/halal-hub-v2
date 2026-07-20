import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin-client'

export async function POST(req: NextRequest) {
  try {
    // Verify caller is authenticated and is a super_admin
    const supabase = await createClient()
    const { data: { user: caller } } = await supabase.auth.getUser()

    if (!caller) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: callerRole } = await supabase
      .from('admin_roles')
      .select('tier')
      .eq('user_id', caller.id)
      .single()

    if (callerRole?.tier !== 'super_admin') {
      return NextResponse.json({ error: 'Only super_admins can create employee accounts' }, { status: 403 })
    }

    const { name, email, password, tier, department, notes } = await req.json()

    if (!name || !email || !password || !tier) {
      return NextResponse.json({ error: 'name, email, password and tier are required' }, { status: 400 })
    }

    const adminClient = createAdminClient()

    // Create the auth user
    const { data: authData, error: authError } = await adminClient.auth.admin.createUser({
      email,
      password,
      email_confirm: true,  // skip email confirmation — internal accounts
      user_metadata: { full_name: name },
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    const userId = authData.user.id

    // Upsert profile
    await adminClient
      .from('profiles')
      .upsert({
        id: userId,
        full_name: name,
        email,
        updated_at: new Date().toISOString(),
      })

    // Assign admin role
    const { error: roleError } = await adminClient
      .from('admin_roles')
      .upsert({
        user_id: userId,
        tier,
        notes: [department, notes].filter(Boolean).join(' · ') || null,
      })

    if (roleError) {
      return NextResponse.json({ error: roleError.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, userId, email, name, tier })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Server error' }, { status: 500 })
  }
}
