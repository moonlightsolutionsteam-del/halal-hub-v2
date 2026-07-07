import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Business Details",
  description: "Halal-verified business details, reviews, menus, and booking on Halal Hub.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
