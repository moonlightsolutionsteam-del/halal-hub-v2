"use client"

import { useSeller } from "@/hooks/use-seller"
import { useAuth } from "@/hooks/use-auth"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Package, ShoppingBag, Settings, Loader2, Store, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const NAV = [
  { href: "/seller/dashboard", label: "Overview",  icon: LayoutDashboard },
  { href: "/seller/products",  label: "Products",  icon: Package },
  { href: "/seller/orders",    label: "Orders",    icon: ShoppingBag },
  { href: "/seller/settings",  label: "Settings",  icon: Settings },
]

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth()
  const { seller, loading } = useSeller()
  const pathname = usePathname()
  const router = useRouter()

  // Allow apply flow through without any gate
  if (pathname.startsWith("/seller/apply")) return <>{children}</>

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="p-6 max-w-sm mx-auto text-center space-y-4 mt-16">
        <Store className="h-10 w-10 text-primary mx-auto" />
        <p className="font-black text-lg">Sign in to access your seller portal</p>
        <Button className="rounded-xl w-full font-bold" onClick={() => router.push("/login")}>
          Sign In
        </Button>
      </div>
    )
  }

  if (!seller) {
    return (
      <div className="p-6 max-w-sm mx-auto text-center space-y-4 mt-16">
        <Store className="h-10 w-10 text-primary mx-auto" />
        <p className="font-black text-lg">You don't have a seller account yet</p>
        <p className="text-sm text-muted-foreground">Apply in 3 quick steps and start selling on HalalHub</p>
        <Button className="rounded-xl w-full font-bold" onClick={() => router.push("/seller/apply")}>
          Apply to Sell
        </Button>
      </div>
    )
  }

  if (seller.status === "pending") {
    return (
      <div className="p-6 max-w-sm mx-auto space-y-4 mt-16">
        <Card className="rounded-2xl border-none shadow-sm">
          <CardContent className="p-6 text-center space-y-3">
            <div className="h-14 w-14 rounded-2xl bg-amber-100 dark:bg-amber-950/30 flex items-center justify-center mx-auto">
              <Clock className="h-7 w-7 text-amber-600" />
            </div>
            <p className="font-black text-lg text-foreground">Application Under Review</p>
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">{seller.store_name}</span> is being reviewed by our team.
              We'll notify you within 48 hours.
            </p>
          </CardContent>
        </Card>
        <Button variant="outline" className="rounded-xl w-full font-bold" onClick={() => router.push("/explore")}>
          Back to HalalHub
        </Button>
      </div>
    )
  }

  if (seller.status === "suspended" || seller.status === "banned") {
    return (
      <div className="p-6 max-w-sm mx-auto text-center space-y-4 mt-16">
        <p className="font-black text-lg text-red-600">Store {seller.status === "suspended" ? "Suspended" : "Banned"}</p>
        <p className="text-sm text-muted-foreground">{seller.rejection_reason ?? "Contact support for more information."}</p>
        <Button variant="outline" className="rounded-xl w-full font-bold" onClick={() => router.push("/explore")}>
          Back to HalalHub
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Store className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-black text-foreground leading-none">{seller.store_name}</p>
            <p className="text-[10px] text-muted-foreground">Seller Portal</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/30 text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" />
          Active
        </div>
      </div>

      {/* Page content */}
      <div className="flex-1">{children}</div>

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-20 bg-background/95 backdrop-blur border-t border-border/50">
        <div className="flex max-w-lg mx-auto">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== "/seller/dashboard" && pathname.startsWith(href))
            return (
              <Link
                key={href}
                href={href}
                className={`flex-1 flex flex-col items-center gap-1 py-3 transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-bold">{label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
