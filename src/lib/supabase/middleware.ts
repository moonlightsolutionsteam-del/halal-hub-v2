import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

function getRoles(user: any): string[] {
  return user?.app_metadata?.roles ?? []
}

function redirect(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone()
  url.pathname = pathname
  url.search = ''
  return NextResponse.redirect(url)
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname
  const roles = getRoles(user)

  // ── Unauthenticated guard ─────────────────────────────────────────
  const authRequiredPaths = ['/account', '/messages', '/family-tree', '/vendor', '/partner', '/admin']
  const needsAuth = authRequiredPaths.some(p => path.startsWith(p))

  if (needsAuth && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('redirectTo', path)
    return NextResponse.redirect(url)
  }

  // ── Role guards (only checked when user is authenticated) ─────────
  if (user) {
    const isAdmin = roles.includes('admin') || roles.includes('super_admin')
    const isBusinessOwner = roles.includes('business_owner')

    // Admin portal — admin / super_admin only
    if (path.startsWith('/admin') && !isAdmin) {
      return redirect(request, '/account/dashboard')
    }

    // Vendor / partner portal — business_owner (or admin) only
    if ((path.startsWith('/vendor') || path.startsWith('/partner')) && !isBusinessOwner && !isAdmin) {
      return redirect(request, '/account/dashboard')
    }
  }

  return supabaseResponse
}
