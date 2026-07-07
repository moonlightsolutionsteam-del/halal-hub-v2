import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Saved Places",
  description: "Your bookmarked halal businesses, mosques, and events on Halal Hub.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
