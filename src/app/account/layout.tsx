import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your Halal Hub profile, saved places, wallet, settings, and activity.",
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
