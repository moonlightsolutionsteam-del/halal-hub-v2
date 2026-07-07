import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Search",
  description: "Search across all halal businesses, mosques, events, and services in Mumbai.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
